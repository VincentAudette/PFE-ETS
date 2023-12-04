import type { NextApiRequest, NextApiResponse } from "next";
import * as xlsx from "xlsx";
import { randomInt } from "crypto";
import { Formidable } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Interface représentant la structure d'un étudiant.
 *
 * @interface
 * @property {string} courriel - L'adresse e-mail de l'étudiant.
 * @property {string[]} choix - Les choix de projets de l'étudiant, classés par ordre de préférence.
 * @property {number} satisfaction - Le niveau de satisfaction de l'étudiant.
 *
 * @example
 * const etudiant: Etudiant = {
 *   courriel: 'example@student.com',
 *   choix: ['ProjetA', 'ProjetB', 'ProjetC'],
 *   satisfaction: 85,
 * };
 */
interface Etudiant {
  courriel: string;
  choix: string[];
  satisfaction: number;
}

/**
 * Interface représentant la structure d'un projet.
 *
 * @interface
 * @property {string} nom - Le nom du projet.
 * @property {number} minEtudiants - Le nombre minimum d'étudiants requis pour le projet.
 * @property {number} maxEtudiants - Le nombre maximum d'étudiants autorisés dans le projet.
 * @property {Etudiant[]} etudiants - La liste des étudiants affectés au projet.
 * @property {number} satisfaction - Le niveau de satisfaction globale du projet.
 * @property {number} appreciation - Le score d'appréciation du projet.
 * @property {boolean} obligatoire - Indique si le projet est obligatoire dans un scénario. Un projet est obligatoire dans un scénario s'il s'agit d'une équipe déjà formée auparavant.
 *
 * @example
 * const projet: Projet = {
 *   nom: 'ProjetA',
 *   minEtudiants: 3,
 *   maxEtudiants: 5,
 *   etudiants: [{...}, {...}],
 *   satisfaction: 92,
 *   appreciation: 1200,
 *   obligatoire: true,
 * };
 */
interface Projet {
  nom: string;
  minEtudiants: number;
  maxEtudiants: number;
  etudiants: Etudiant[];
  satisfaction: number;
  appreciation: number;
  obligatoire: boolean;
}

/**
 * Lit les données des étudiants à partir d'un fichier Excel et retourne une liste d'étudiants.
 *
 * @param {string} filePath - Le chemin du fichier Excel contenant les données des étudiants.
 * @returns {Promise<Etudiant[]>} - Une promesse qui se résout avec la liste des étudiants.
 *
 * @example
 * const filePath = 'chemin/vers/fichier.xlsx';
 * const listeEtudiants = await readStudents(filePath);
 * console.log(listeEtudiants); // Exemple de sortie : [{...}, {...}, ...]
 *
 * @remarks
 * Cette fonction utilise la bibliothèque xlsx pour lire les données du fichier Excel et génère une
 * liste d'étudiants avec leurs informations, y compris l'adresse e-mail, les choix de projets, et initialise la satisfaction.
 */
async function readStudents(filePath: string): Promise<Etudiant[]> {
  return new Promise((resolve, reject) => {
    const resultsStudents: Etudiant[] = [];

    const workbook = xlsx.readFile(filePath);

    let sheetName: string | null | undefined = null;
    let sheet: xlsx.WorkSheet | undefined;
    let data: any[] = [];

    if (workbook.SheetNames.length > 0) {
      sheetName = workbook.SheetNames[0];
      if (sheetName) sheet = workbook.Sheets[sheetName];
      if (sheet) data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    } else {
      // Handle the case when there are no sheets in the workbook
      console.error("No sheets found in the workbook.");
    }

    // Assuming the first row contains headers
    const headers = data[0];

    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const etudiant: Etudiant = {
        courriel: rowData[headers.indexOf("Courriel")],
        choix: [
          rowData[headers.indexOf("Choix1")] || "",
          rowData[headers.indexOf("Choix2")] || "",
          rowData[headers.indexOf("Choix3")] || "",
          rowData[headers.indexOf("Choix4")] || "",
          rowData[headers.indexOf("Choix5")] || "",
        ].filter((choice) => choice !== ""),
        satisfaction: 0,
      };
      resultsStudents.push(etudiant);
      console.log(etudiant);
    }

    resolve(resultsStudents);
  });
}

/**
 * Extrait la liste des projets uniques à partir de la liste des étudiants en utilisant leurs choix.
 *
 * @param {Etudiant[]} etudiants - La liste des étudiants à partir desquels extraire les projets uniques.
 * @returns {Promise<Projet[]>} - Une promesse qui se résout avec la liste des projets uniques.
 *
 * @example
 * const etudiants = [...]; // Liste des étudiants
 * const projetsUniques = await extractUniqueProjects(etudiants);
 * console.log(projetsUniques); // Exemple de sortie : [{...}, {...}, ...]
 *
 * @remarks
 * Cette fonction parcourt chaque étudiant, extrait les noms de projet à partir de leurs choix,
 * et crée une liste de projets uniques avec des valeurs par défaut pour les autres propriétés.
 */
async function extractUniqueProjects(etudiants: Etudiant[]): Promise<Projet[]> {
  return new Promise((resolve) => {
    const uniqueProjectNames: Set<string> = new Set();
    etudiants.forEach((etudiant) => {
      etudiant.choix.forEach((choix) => {
        uniqueProjectNames.add(choix);
      });
    });

    const uniqueProjects: Projet[] = Array.from(uniqueProjectNames).map(
      (projectName) => {
        const projet: Projet = {
          nom: projectName,
          minEtudiants: 3, // À définir
          maxEtudiants: 4, // À définir
          etudiants: [],
          satisfaction: 0,
          appreciation: 0,
          obligatoire: false,
        };
        return projet;
      },
    );

    resolve(uniqueProjects);
  });
}

/**
 * Interface représentant la structure des données provenant du formulaire.
 *
 * @interface
 * @property {any} err - Les éventuelles erreurs provenant du traitement du formulaire.
 * @property {any} fields - Les champs du formulaire.
 * @property {any} files - Les fichiers du formulaire.
 *
 * @example
 * const formData: FormData = {
 *   err: null,
 *   fields: { ... },
 *   files: { ... }
 * };
 */
interface FormData {
  err: any;
  fields: any;
  files: any;
}

/**
 * Cette fonction est la fonction principale de l'algorithme. Elle extrait les étudiants, les projets, filtre les étudiants déjà en équipe, trouve le meilleur
 * scénario, calcule la satisfaction globale, et renvoie une réponse JSON formatée contenant des informations
 * sur les projets, les étudiants et la satisfaction globale.
 */
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await new Promise<FormData>((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  //return the data back or just do whatever you want with it
  const listeEtudiants = await readStudents(data.files.file[0].filepath);
  const listeProjets = await extractUniqueProjects(listeEtudiants);
  filtrerEtudiantDejaEnEquipe(listeEtudiants, listeProjets);

  const listeFinaleProjets = trouverMeilleurScenario(
    listeEtudiants,
    listeProjets,
    100000,
  );

  const totalEtudiants = listeFinaleProjets.reduce(
    (total, projet) => total + projet.etudiants.length,
    0,
  );

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
    reponseFormatee,
  });
}

/**
 * Calcule le score d'appréciation de chaque projet en fonction des choix des étudiants.
 *
 * @param {Etudiant[]} etudiants - La liste des étudiants avec leurs choix.
 * @param {Projet[]} projets - La liste des projets à évaluer.
 * @returns {Projet[]} - La liste des projets triés par score d'appréciation décroissant.
 *
 * @example
 * const etudiants = [...]; // Liste des étudiants avec leurs choix
 * const projets = [...]; // Liste des projets à évaluer
 * const projetsTries = calculerScoreAppreciationProjets(etudiants, projets);
 * console.log(projetsTries); // Exemple de sortie : [{...}, {...}, ...]
 *
 * @remarks
 * Cette fonction parcourt chaque étudiant, attribue des scores d'appréciation aux projets en fonction
 * de l'indice du choix de l'étudiant, et trie ensuite les projets en fonction de leur score d'appréciation.
 */
function calculerScoreAppreciationProjets(
  etudiants: Etudiant[],
  projets: Projet[],
): Projet[] {
  // Parcourir chaque étudiant
  etudiants.forEach((etudiant) => {
    etudiant.choix.forEach((choix, index) => {
      // Rechercher le projet correspondant au choix de l'étudiant
      const projet = projets.find((p) => p.nom === choix);
      if (projet) {
        // Augmenter le score d'appréciation en fonction de l'indice du choix
        projet.appreciation += etudiants.length - index;

        // Si le projet est obligatoire, ajouter un score supplémentaire
        if (projet.obligatoire) {
          projet.appreciation += 1000;
        }
      }
    });
  });

  // Trier les projets par score d'appréciation décroissant
  projets.sort((a, b) => b.appreciation - a.appreciation);

  return projets;
}

/**
 * Vérifie si une équipe dans un projet est complète en respectant le nombre maximum d'étudiants.
 *
 * @param {Projet} projet - Le projet contenant l'équipe à évaluer.
 * @returns {boolean} - Retourne vrai si l'équipe est complète, sinon faux.
 *
 * @example
 * const projet = {...}; // Un projet spécifique
 * const equipeComplete = estEquipeComplete(projet);
 * console.log(equipeComplete); // Exemple de sortie : true
 *
 * @remarks
 * Cette fonction évalue si le nombre d'étudiants dans l'équipe d'un projet est égal ou supérieur au
 * nombre maximum d'étudiants requis pour que l'équipe soit considérée comme complète.
 */
const estEquipeComplete = (projet: Projet) => {
  if (projet.etudiants.length >= projet.maxEtudiants) {
    return true;
  } else {
    return false;
  }
};

/**
 * Vérifie si une équipe dans un projet est fonctionnelle en respectant le nombre minimum d'étudiants.
 *
 * @param {Projet} projet - Le projet contenant l'équipe à évaluer.
 * @returns {boolean} - Retourne vrai si l'équipe est fonctionnelle, sinon faux.
 *
 * @example
 * const projet = {...}; // Un projet spécifique
 * const equipeFonctionnelle = estEquipeFonctionnelle(projet);
 * console.log(equipeFonctionnelle); // Exemple de sortie : true
 *
 * @remarks
 * Cette fonction évalue si le nombre d'étudiants dans l'équipe d'un projet est égal ou supérieur au
 * nombre minimum d'étudiants requis pour que l'équipe soit considérée comme fonctionnelle.
 */
const estEquipeFonctionnelle = (projet: Projet) => {
  if (projet.etudiants.length >= projet.minEtudiants) {
    return true;
  } else {
    return false;
  }
};

/**
 * Filtrer les étudiants déjà assignés à une équipe dans les projets et mettre à jour leur satisfaction.
 *
 * @param {Etudiant[]} etudiants - La liste des étudiants à filtrer.
 * @param {Projet[]} projets - La liste des projets dans lesquels rechercher les étudiants déjà assignés.
 * @returns {void} - La fonction met à jour la satisfaction des étudiants et la composition des équipes.
 *
 * @example
 * const etudiants = [...]; // Liste des étudiants à filtrer
 * const projets = [...]; // Liste des projets dans lesquels rechercher les étudiants déjà assignés
 * filtrerEtudiantDejaEnEquipe(etudiants, projets);
 *
 * @remarks
 * Cette fonction parcourt chaque étudiant, identifie les étudiants ayant un seul choix, vérifie si
 * ce choix correspond à un projet, et si c'est le cas, met à jour la satisfaction de l'étudiant,
 * l'ajoute à l'équipe du projet, ajuste la composition de l'équipe, et retire l'étudiant de la liste
 * générale des étudiants.
 */
function filtrerEtudiantDejaEnEquipe(
  etudiants: Etudiant[],
  projets: Projet[],
): void {
  // Parcourir chaque étudiant
  etudiants.forEach((etudiant) => {
    // Créer un ensemble (Set) pour stocker les choix uniques de l'étudiant (en ignorant les choix vides)
    const choixUniques = new Set<string>();

    // Parcourir les choix de l'étudiant
    etudiant.choix.forEach((choix) => {
      // Ignorer les choix vides
      if (choix && choix != "") {
        choixUniques.add(choix);
      }
    });

    // Vérifier si tous les choix de l'étudiant sont les mêmes
    if (choixUniques.size === 1) {
      // Obtenir le choix unique de l'étudiant
      const choixUnique = Array.from(choixUniques)[0];

      // Parcourir les projets pour trouver le projet correspondant
      const projet = projets.find((p) => p.nom === choixUnique);

      if (projet) {
        etudiant.satisfaction = 100;
        projet.etudiants.push(etudiant);
        etudiants.splice(etudiants.indexOf(etudiant), 1);

        // Une équipe déjà formée peut avoir 5 étudiants
        if (projet.etudiants.length == 5) {
          projet.maxEtudiants = 5;
        }
        projet.obligatoire = true;
        console.log(etudiant);
      }
    }
  });
}

/**
 * Trouve le meilleur scénario d'affectation des étudiants aux projets en maximisant la satisfaction globale.
 *
 * @param {Etudiant[]} etudiants - La liste des étudiants à affecter aux projets.
 * @param {Projet[]} projets - La liste des projets disponibles.
 * @param {number} iterationMax - Le nombre maximal d'itérations pour trouver le meilleur scénario.
 * @returns {Projet[]} - La liste des projets avec les étudiants affectés, représentant le meilleur scénario.
 *
 * @example
 * const etudiants = [...]; // Liste des étudiants
 * const projets = [...]; // Liste des projets
 * const meilleurScenario = trouverMeilleurScenario(etudiants, projets, 1000);
 * console.log(meilleurScenario); // Exemple de sortie : [{...}, {...}, ...]
 *
 * @remarks
 * Cette fonction effectue plusieurs itérations pour trouver le meilleur scénario d'affectation des étudiants
 * aux projets en maximisant la satisfaction globale. Elle utilise une approche itérative avec des mécanismes
 * pour gérer les équipes incomplètes et applique une stratégie de choix aléatoire pondéré pour les affectations.
 * 
 * Pour plus de détails, référez-vous à la documentation de l'algorithme dans le wiki du repo github de ce projet.
 */
function trouverMeilleurScenario(
  etudiants: Etudiant[],
  projets: Projet[],
  iterationMax: number,
): Projet[] {
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
    const scenario: Projet[] = [];

    boucleEtudiant: for (const etudiant of copieEtudiants) {
      for (const choix of etudiant.choix) {
        const projet = copieProjets.find((p) => p.nom === choix);
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
        index = randomInt(0, copieProjets.length - 1);
      }
      const projet = copieProjets[index]; // Choisir un projet aléatoire
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
      etudiantsEquipeIncomplete = randomizeArrayOrder(
        etudiantsEquipeIncomplete,
      );

      // Calcul de l'appréciation des étudiants des équipes incomplètes
      const projetsApprecies = calculerScoreAppreciationProjets(
        etudiantsEquipeIncomplete,
        projetsEquipeIncomplete,
      );

      // Calculate weights based on project indices
      const weights = projetsApprecies.map((_, index) => index + 1);

      // Calculate the total weight
      const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

      // Generate a random number between 0 and the total weight
      const randomValue = Math.random() * totalWeight;

      // Choose the project based on the weighted random value
      let cumulativeWeight = 0;
      let chosenIndex = 0;

      for (const [index, weight] of weights.entries()) {
        cumulativeWeight += weight;

        if (randomValue <= cumulativeWeight) {
          chosenIndex = index;
          break;
        }
      }

      // Pop the chosen project
      projetsApprecies.splice(chosenIndex, 1)[0];

      boucleEtudiant2: for (const etudiant of etudiantsEquipeIncomplete) {
        for (const choix of etudiant.choix) {
          const projet = projetsApprecies.find((p) => p.nom === choix);
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
          index = randomInt(0, projetsApprecies.length - 1);
        }
        const projet = projetsApprecies[index]; // Choisir un projet aléatoire
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

    const satisfaction = calculerSatisfactionScenario(scenario);
    if (satisfaction > meilleurScenarioSatisfaction) {
      meilleurScenario = JSON.parse(JSON.stringify(scenario));
      meilleurScenarioSatisfaction = satisfaction;
    }

    iteration++;
  }

  return meilleurScenario;
}

/**
 * Vérifie si un scénario est valide en s'assurant que chaque projet a une équipe fonctionnelle (ou aucun étudiant).
 *
 * @param {Projet[]} scenario - La liste des projets du scénario à vérifier.
 * @returns {boolean} - Retourne vrai si le scénario est valide, sinon faux.
 *
 * @example
 * const scenarioValide = estScenarioValide([...]); // Liste des projets du scénario
 * console.log(scenarioValide); // Exemple de sortie : true
 *
 * @remarks
 * Cette fonction parcourt chaque projet dans le scénario et utilise la fonction estEquipeFonctionnelle
 * pour vérifier si l'équipe du projet est fonctionnelle. Le scénario est considéré comme valide si
 * chaque projet a une équipe fonctionnelle ou s'il n'a aucun étudiant.
 *
 * @see {@link estEquipeFonctionnelle}
 */
function estScenarioValide(scenario: Projet[]): boolean {
  let estValide = true;
  for (const projet of scenario) {
    if (!estEquipeFonctionnelle(projet) && projet.etudiants.length !== 0) {
      estValide = false;
    }
  }
  return estValide;
}

/**
 * Calcule la satisfaction totale d'un scénario en agrégeant la satisfaction de chaque projet.
 *
 * @param {Projet[]} scenario - La liste des projets du scénario.
 * @returns {number} - La satisfaction totale du scénario.
 *
 * @example
 * const scenario = [...]; // Liste des projets du scénario
 * const satisfactionTotale = calculerSatisfactionScenario(scenario);
 * console.log(satisfactionTotale); // Exemple de sortie : 245
 *
 * @remarks
 * Cette fonction parcourt chaque projet dans le scénario, calcule leur satisfaction individuelle
 * en utilisant la fonction calculerSatisfactionProjet, puis agrège ces valeurs pour obtenir la
 * satisfaction totale du scénario.
 */
function calculerSatisfactionScenario(scenario: Projet[]) {
  let satisfaction = 0;
  for (const projet of scenario) {
    calculerSatisfactionProjet(projet);
    satisfaction += projet.satisfaction;
  }
  return satisfaction;
}

/**
 * Calcule la satisfaction d'un projet en agrégeant la satisfaction de chaque étudiant participant.
 *
 * @param {Projet} projet - Le projet pour lequel calculer la satisfaction.
 * @returns {void} - La fonction met à jour la satisfaction du projet.
 *
 * @example
 * const projet = {...}; // Un projet spécifique
 * calculerSatisfactionProjet(projet);
 * console.log(projet.satisfaction); // Exemple de sortie : 85
 *
 * @remarks
 * Cette fonction parcourt chaque étudiant dans le projet, calcule leur satisfaction individuelle
 * en utilisant la fonction calculerSatisfactionEtudiant, puis agrège ces valeurs pour obtenir la
 * satisfaction totale du projet.
 */
function calculerSatisfactionProjet(projet: Projet) {
  let satisfaction = 0;

  for (const etudiant of projet.etudiants) {
    calculerSatisfactionEtudiant(etudiant, projet);
    satisfaction += etudiant.satisfaction;
  }
  projet.satisfaction = satisfaction;
}

/**
 * Calcule la satisfaction d'un étudiant pour un projet donné en fonction de ses choix.
 *
 * @param {Etudiant} etudiant - L'étudiant pour lequel calculer la satisfaction.
 * @param {Projet} projet - Le projet en question.
 * @returns {void} - La fonction met à jour la satisfaction de l'étudiant.
 *
 * @example
 * const etudiant = {...}; // Un étudiant spécifique
 * const projet = {...}; // Le projet associé
 * calculerSatisfactionEtudiant(etudiant, projet);
 * console.log(etudiant.satisfaction); // Exemple de sortie : 90
 *
 * @remarks
 * La satisfaction de l'étudiant dépend de son choix pour le projet, attribuant des points
 * en fonction de la correspondance entre le choix et le nom du projet.
 * 
 * Choix 1 : 100
 * Choix 2 : 90
 * Choix 3 : 80
 * Choix 4 : 70
 * Choix 5 : 60
 * Aucun choix : 0
 */
function calculerSatisfactionEtudiant(etudiant: Etudiant, projet: Projet) {
  let satisfaction = 0;
  if (etudiant.choix[0] == projet.nom) {
    satisfaction = 100;
  } else if (etudiant.choix[1] == projet.nom) {
    satisfaction = 90;
  } else if (etudiant.choix[2] == projet.nom) {
    satisfaction = 80;
  } else if (etudiant.choix[3] == projet.nom) {
    satisfaction = 70;
  } else if (etudiant.choix[4] == projet.nom) {
    satisfaction = 60;
  } else {
    satisfaction = 0;
  }
  etudiant.satisfaction = satisfaction;
}

/**
 * Randomise l'ordre des éléments dans un tableau en utilisant une fonction de comparaison aléatoire.
 *
 * @param {any[]} arr - Le tableau à randomiser.
 * @returns {any[]} - Un nouveau tableau avec des éléments ordonnés de manière aléatoire.
 *
 * @example
 * const tableauOriginal = [1, 2, 3, 4, 5];
 * const tableauRandomisé = randomizeArrayOrder(tableauOriginal);
 * console.log(tableauRandomisé); // Exemple de sortie : [3, 1, 5, 2, 4]
 *
 * @remarks
 * Cette fonction utilise l'algorithme de Fisher-Yates pour mélanger les éléments du tableau.
 * La randomisation est obtenue en utilisant une fonction de comparaison qui génère des valeurs
 * aléatoires entre -0.5 et 0.5 pendant le processus de tri.
 *
 * @see {@link https://fr.wikipedia.org/wiki/M%C3%A9lange_de_Fisher-Yates Mélange de Fisher-Yates}
 * @see {@link https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort Array.prototype.sort()}
 */
function randomizeArrayOrder(arr: any[]) {
  // Fonction de comparaison aléatoire
  function compareRandom() {
    return Math.random() - 0.5; // Génère un nombre aléatoire entre -0.5 et 0.5
  }

  // Utilisez la fonction de comparaison pour trier le tableau de manière aléatoire
  return arr.sort(compareRandom);
}
