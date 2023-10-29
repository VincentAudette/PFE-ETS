import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from "csv-parser";

// Structure des différents objets
interface Etudiant {
  Courriel: string;
  Choix1: string;
  Choix2: string;
  Choix3: string;
  Choix4: string;
}

interface Projet {
  Nom: string;
  MinEtudiants: number;
  MaxEtudiants: number;
}

interface Equipe {
  Projet: Projet;
  Etudiants: Etudiant[];
  EstFonctionnelle: boolean;
  EstComplete: boolean;
}

async function readStudents(filePath: string): Promise<Etudiant[]> {
  return new Promise((resolve, reject) => {
    const resultsStudents: Etudiant[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const etudiant: Etudiant = {
          Courriel: data.Courriel,
          Choix1: data.Choix1,
          Choix2: data.Choix2,
          Choix3: data.Choix3,
          Choix4: data.Choix4,
        };
        resultsStudents.push(etudiant);
      })
      .on("end", () => resolve(resultsStudents))
      .on("error", (error) => reject(error));
  });
}

async function readProjects(filePath: string): Promise<Projet[]> {
  return new Promise((resolve, reject) => {
    const resultsProjects: Projet[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const projet: Projet = {
          Nom: data.Nom,
          MinEtudiants: parseInt(data.Min, 10),
          MaxEtudiants: parseInt(data.Max, 10),
        };
        resultsProjects.push(projet);
      })
      .on("end", () => resolve(resultsProjects))
      .on("error", (error) => reject(error));
  });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Chemins des différents fichiers
  const filePathStudents = "public/etudiants.csv";
  const filePathProjects = "public/projets.csv";

  try {
    const listeEtudiants = await readStudents(filePathStudents);
    const listeProjets = await readProjects(filePathProjects);
    const listeEquipes: Equipe[] = [];

    // Début de l'algorithme
    listeEtudiants.forEach((etudiant, index) => {
      const { Choix1, Choix2, Choix3, Choix4 } = etudiant;

      // Vérifier si les 4 choix sont identiques
      if (Choix1 === Choix2 && Choix2 === Choix3 && Choix3 === Choix4) {
        console.log(
          `Étudiant trouvé avec les 4 mêmes choix: ${etudiant.Courriel}`,
        );
        // Rechercher dans les équipes si une équipe avec ce projet existe
        const equipeExistante = listeEquipes.find(
          (equipe) => equipe.Projet.Nom === Choix1,
        );

        if (equipeExistante) {
          equipeExistante.Etudiants.push(etudiant);
          // Retirer l'étudiant de la liste des étudiants
          listeEtudiants.splice(index, 1);
        } else {
          const projet = listeProjets.find((projet) => projet.Nom === Choix1);
          if (projet) {
            const nouvelleEquipe: Equipe = {
              Etudiants: [etudiant],
              Projet: projet,
              EstFonctionnelle: false,
              EstComplete: false,
            };
            listeEquipes.push(nouvelleEquipe);
            // Retirer l'étudiant de la liste des étudiants
            listeEtudiants.splice(index, 1);
          }
        }
      }
    });

    // Console logs pour vérifier les équipes et les étudiants restants
    listeEquipes.forEach((equipe) => {
      console.log("Équipe associée au projet " + equipe.Projet.Nom + " : ");
      console.log(equipe);
    });

    console.log("Étudiants restants : ");
    console.log(listeEtudiants);

    res.status(200).json({
      etudiantsRestants: listeEtudiants,
      equipesFormees: listeEquipes,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default handler;
