import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from "csv-parser";
import { randomInt } from 'crypto';

// Structure des différents objets
interface Etudiant {
  courriel: string;
  choix: string[];
  satisfaction: number;
}

interface Projet {
  nom: string;
  minEtudiants: number;
  maxEtudiants: number;
  etudiants: Etudiant[];
  satisfaction: number;
  appreciation: number;
}

async function readStudents(filePath: string): Promise<Etudiant[]> {
  return new Promise((resolve, reject) => {
    const resultsStudents: Etudiant[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const etudiant: Etudiant = {
          courriel: data.Courriel,
          choix: [
            data.Choix1,
            data.Choix2,
            data.Choix3,
            data.Choix4,
            data.Choix5
          ],
          satisfaction: 0
        };
        resultsStudents.push(etudiant);
      })
      .on("end", () => resolve(resultsStudents))
      .on("error", (error) => reject(error));
  });
}

// async function readProjects(filePath: string): Promise<Projet[]> {
//   return new Promise((resolve, reject) => {
//     const resultsProjects: Projet[] = [];

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (data) => {
//         const projet: Projet = {
//           Nom: data.Nom,
//           MinEtudiants: parseInt(data.Min, 10),
//           MaxEtudiants: parseInt(data.Max, 10),
//         };
//         resultsProjects.push(projet);
//       })
//       .on("end", () => resolve(resultsProjects))
//       .on("error", (error) => reject(error));
//   });
// }

async function extractUniqueProjects(etudiants: Etudiant[]): Promise<Projet[]> {
  return new Promise((resolve) => {
    const uniqueProjectNames: Set<string> = new Set();
    etudiants.forEach((etudiant) => {
      etudiant.choix.forEach((choix) => {
        uniqueProjectNames.add(choix);
      });
    });

    const uniqueProjects: Projet[] = Array.from(uniqueProjectNames).map((projectName) => {
      const projet: Projet = {
        nom: projectName,
        minEtudiants: 3,  // À définir
        maxEtudiants: 5,  // À définir
        etudiants: [],
        satisfaction: 0,
        appreciation: 0
      };
      return projet;
    });

    resolve(uniqueProjects);
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Chemins des différents fichiers
  const filePathStudents = "public/etudiants2.csv";
  //const filePathProjects = "public/projets.csv";

  try {
    let listeEtudiants = await readStudents(filePathStudents);
    let listeProjets = await extractUniqueProjects(listeEtudiants);

    console.log(listeEtudiants.length);

    // Calculer le score d'appréciation des projets
    //listeProjets = calculerScoreAppreciationProjets(listeEtudiants, listeProjets);

    // sélectionner les projets les plus appréciés
    //listeProjets = selectionnerProjet(listeEtudiants, listeProjets);

    // Filtrer les étudiants qui ont déjà une équipe formée
    filtrerEtudiantDejaEnEquipe(listeEtudiants, listeProjets);

    let listeFinaleProjets = trouverMeilleurScenario(listeEtudiants, listeProjets, 10000);

    const totalEtudiants = listeFinaleProjets.reduce((total, projet) => total + projet.etudiants.length, 0);

    const reponseFormatee = {
      totalEtudiants: totalEtudiants,
      satisfactionGlobale: calculerSatisfactionScenario(listeFinaleProjets),
      projets: listeFinaleProjets.map((projet) => {
        const etudiantsAvecSatisfaction = projet.etudiants.map((etudiant) => ({
          courriel: etudiant.courriel,
          satisfaction: etudiant.satisfaction,
        }));
    
        return {
          projet: projet.nom,
          etudiants: etudiantsAvecSatisfaction,
          satisfaction: projet.satisfaction,
        };
      }),
    };

    res.status(200).json({
      equipesFormees: reponseFormatee,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

function calculerScoreAppreciationProjets(etudiants: Etudiant[], projets: Projet[]): Projet[] {
  // Parcourir chaque étudiant
  etudiants.forEach(etudiant => {
    etudiant.choix.forEach((choix, index) => {
      // Rechercher le projet correspondant au choix de l'étudiant
      const projet = projets.find(p => p.nom === choix);
      if (projet) {
        // Augmenter le score d'appréciation en fonction de l'indice du choix
        projet.appreciation += etudiants.length - index;
      }
    });
  });

  // Trier les projets par score d'appréciation décroissant
  projets.sort((a, b) => b.appreciation - a.appreciation);

  return projets;
}

/**
 * Analyse si une équipe est complète en fonction du nombre maximum d'étudiants autorisés pour le projet.
 * Met à jour la propriété "equipeComplete" du projet en conséquence.
 *
 * @param projet - L'objet projet à analyser.
 */
const estEquipeComplete = (projet: Projet) => {
  if (projet.etudiants.length >= projet.maxEtudiants) {
    return true;
  } else {
    return false;
  }
}

/**
 * Analyse si une équipe est fonctionnelle en fonction du nombre minimum d'étudiants requis pour le projet.
 * Met à jour la propriété "EstFonctionnelle" du projet en conséquence.
 *
 * @param projet - L'objet projet à analyser.
 */
const estEquipeFonctionnelle = (projet: Projet) => {
  if (projet.etudiants.length >= projet.minEtudiants) {
    return true;
  } else {
    return false;
  }
}

function selectionnerProjet(etudiants: Etudiant[], projets: Projet[]): Projet[] {
  const nombreTotalEtudiants = etudiants.length;
  let nombreEtudiants = 0;
  let nombreProjets = 0;
  let index = 0;

  while (nombreEtudiants < nombreTotalEtudiants) {
    nombreEtudiants += projets[index].minEtudiants;
    nombreProjets++;
    index++;
  }

  // Sélectionnez les premiers projets en fonction du nombre maximal
  const projetsSelectionnes = projets.slice(0, nombreProjets);

  return projetsSelectionnes;
}

function filtrerEtudiantDejaEnEquipe(etudiants: Etudiant[], projets: Projet[]): void {
  // Parcourir chaque étudiant
  etudiants.forEach(etudiant => {
    // Créer un ensemble (Set) pour stocker les choix uniques de l'étudiant (en ignorant les choix vides)
    const choixUniques = new Set<string>();

    // Parcourir les choix de l'étudiant
    etudiant.choix.forEach(choix => {
      // Ignorer les choix vides
      if (choix) {
        choixUniques.add(choix);
      }
    });

    // Vérifier si tous les choix de l'étudiant sont les mêmes
    if (choixUniques.size === 1) {
      // Obtenir le choix unique de l'étudiant
      const choixUnique = Array.from(choixUniques)[0];

      // Parcourir les projets pour trouver le projet correspondant
      const projet = projets.find(p => p.nom === choixUnique);

      if (projet) {
        etudiant.satisfaction = 100;
        projet.etudiants.push(etudiant);
        etudiants.splice(etudiants.indexOf(etudiant), 1);
      }
    }
  });
}

function trouverMeilleurScenario(etudiants: Etudiant[], projets: Projet[], iterationMax: number): Projet[] {
  let iteration = 0;
  let meilleurScenario: Projet[] = [];
  let meilleurScenarioSatisfaction = 0;
  let copieProjets: Projet[];
  let copieEtudiants: Etudiant[];
  let etudiantsEquipeIncomplete: Etudiant[] = [];
  let projetsEquipeIncomplete: Projet[] = [];

  boucleIteration: while (iteration < iterationMax) {
    copieProjets = JSON.parse(JSON.stringify(projets));
    copieEtudiants = JSON.parse(JSON.stringify(etudiants));
    copieEtudiants = randomizeArrayOrder(copieEtudiants);
    let scenario: Projet[] = [];

    boucleEtudiant: for (const etudiant of copieEtudiants) {
      for (const choix of etudiant.choix) {
        let projet = copieProjets.find(p => p.nom === choix);
        if (projet) {
          if (!estEquipeComplete(projet)) {
            projet.etudiants.push(etudiant);
            if (estEquipeComplete(projet)) {
              scenario.push(projet);
              copieProjets.splice(copieProjets.indexOf(projet), 1);
            }
            continue boucleEtudiant;
          }
        }
      }
      let index = 0;
      if (copieProjets.length > 1) {
        index = randomInt(0, copieProjets.length - 1)
      }
      let projet = copieProjets[index]; // Choisir un projet aléatoire
      if (projet) {
        projet.etudiants.push(etudiant);
        if (estEquipeComplete(projet)) {
          scenario.push(projet);
          copieProjets.splice(index, 1);
        }
      }
    }

    for (const projet of copieProjets) {
      scenario.push(projet);
    }

    // Gérer les équipes incomplètes
    while (!estScenarioValide(scenario)) {
      etudiantsEquipeIncomplete = [];
      projetsEquipeIncomplete = [];

      // Repérage des équipes incomplètes
      for (const projet of scenario) {
        if (!estEquipeComplete(projet)) {
          projetsEquipeIncomplete.push(projet);
        }
      }

      // Repérage des étudiants des équipes incomplètes
      for (const projet of projetsEquipeIncomplete) {
        for (const etudiant of [...projet.etudiants]) {
          etudiantsEquipeIncomplete.push(etudiant);
          projet.etudiants.splice(projet.etudiants.indexOf(etudiant), 1);
        }
        scenario.splice(scenario.indexOf(projet), 1);
      }

      // Mélange de l'ordre des étudiants des équipes incomplètes
      etudiantsEquipeIncomplete = randomizeArrayOrder(etudiantsEquipeIncomplete);

      // Calcul de l'appréciation des étudiants des équipes incomplètes
      let projetsApprecies = calculerScoreAppreciationProjets(etudiantsEquipeIncomplete, projetsEquipeIncomplete);
      projetsApprecies.pop(); // Retrait du projet le moins apprécié

      boucleEtudiant2: for (const etudiant of etudiantsEquipeIncomplete) {
        for (const choix of etudiant.choix) {
          let projet = projetsApprecies.find(p => p.nom === choix);
          if (projet) {
            if (!estEquipeComplete(projet)) {
              projet.etudiants.push(etudiant);
              if (estEquipeComplete(projet)) {
                scenario.push(projet);
                projetsApprecies.splice(projetsApprecies.indexOf(projet), 1);
              }
              continue boucleEtudiant2;
            }
          }
        }
        let index = 0;
        if (projetsApprecies.length > 1) {
          index = randomInt(0, projetsApprecies.length - 1)
        }
        let projet = projetsApprecies[index]; // Choisir un projet aléatoire
        if (projet) {
          projet.etudiants.push(etudiant);
          if (estEquipeComplete(projet)) {
            scenario.push(projet);
            projetsApprecies.splice(index, 1);
          }
        }
      }

      for (const projet of projetsApprecies) {
        scenario.push(projet);
      }
    }


    let satisfaction = calculerSatisfactionScenario(scenario);
    if (satisfaction > meilleurScenarioSatisfaction) {
      meilleurScenario = JSON.parse(JSON.stringify(scenario));
      meilleurScenarioSatisfaction = satisfaction;
    }

    iteration++;
  }

  return meilleurScenario;
}

function estScenarioValide(scenario: Projet[]): boolean {
  let estValide = true;
  for (const projet of scenario) {
    if (!estEquipeFonctionnelle(projet) && projet.etudiants.length !== 0) {
      estValide = false;
    }
  }
  return estValide;
}

function calculerSatisfactionScenario(scenario: Projet[]) {
  let satisfaction = 0;
  for (const projet of scenario) {
    calculerSatisfactionProjet(projet);
    satisfaction += projet.satisfaction;
  }
  return satisfaction;
}

function calculerSatisfactionProjet(projet: Projet) {
  let satisfaction = 0;

  for (const etudiant of projet.etudiants) {
    calculerSatisfactionEtudiant(etudiant, projet);
    satisfaction += etudiant.satisfaction;
  }
  projet.satisfaction = satisfaction;
}

function calculerSatisfactionEtudiant(etudiant: Etudiant, projet: Projet) {
  let satisfaction = 0;
  if (etudiant.choix[0] == projet.nom) {
    satisfaction = 100;
  }
  else if (etudiant.choix[1] == projet.nom) {
    satisfaction = 90;
  }
  else if (etudiant.choix[2] == projet.nom) {
    satisfaction = 80;
  }
  else if (etudiant.choix[3] == projet.nom) {
    satisfaction = 70;
  }
  else if (etudiant.choix[4] == projet.nom) {
    satisfaction = 60;
  }
  else {
    satisfaction = 0;
  }
  etudiant.satisfaction = satisfaction;
}

function randomizeArrayOrder(arr: any[]) {
  // Fonction de comparaison aléatoire
  function compareRandom() {
    return Math.random() - 0.5; // Génère un nombre aléatoire entre -0.5 et 0.5
  }

  // Utilisez la fonction de comparaison pour trier le tableau de manière aléatoire
  return arr.sort(compareRandom);
}

export default handler;
