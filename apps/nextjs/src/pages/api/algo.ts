import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from 'csv-parser';

async function readCSVFile(filePath: string): Promise<object[]> {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

const filePath = 'public/etudiants.csv';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Code de l'algorithme
    const data = await readCSVFile(filePath);
    data.forEach( (etudiant:any) => {
      console.log(etudiant.Choix1)
    });
    // Renvoi du JSON formatté
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default handler;
