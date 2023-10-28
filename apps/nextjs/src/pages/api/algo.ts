import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from "csv-parser";

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
    const ListeEtudiants = await readStudents(filePathStudents);
    const ListeProjets = await readProjects(filePathProjects);

    // Algorithme
    ListeEtudiants.forEach((etudiant) => {
      console.log(etudiant);
    });

    ListeProjets.forEach((projet) => {
      console.log(projet);
    });

    res.status(200).json({ etudiants: ListeEtudiants, projets: ListeProjets });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default handler;
