import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from 'csv-parser';
import OpenAI from 'openai';

const { Configuration, OpenAIApi } = require('openai');
const configuration = {
    apiKey: process.env.OPENAI_API_KEY
  };
  
  const openai = new OpenAI(configuration);

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
        
        const result = await openai.completions.create({
            model: "text-davinci-003",
            prompt:"Hey! What's up?",
            temperature: 0.6,
            max_tokens: 100,
        });

        res.status(200).json({ result: res });
            
        // Renvoi du JSON formatté
        //res.status(200).pipe(res)
    } catch (error) {
        console.log(openai.apiKey)
        console.error(error);
        res.status(400).json(error);
    }
};

export default handler;
