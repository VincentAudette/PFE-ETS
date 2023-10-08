import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import csv from 'csv-parser';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// https://sdk.vercel.ai/docs/getting-started
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//export const runtime = 'edge';
export const config = {
    runtime: "edge"
};

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
        
        // Create a chat completion using OpenAI
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            stream: true,
            temperature: 0.6,
            max_tokens: 300,
            prompt: `What's up?`,
        });

        // Convert the response into a friendly text-stream
        const stream = OpenAIStream(response);
        // Respond with the stream
        return new StreamingTextResponse(stream);
            
        // Renvoi du JSON formatté
        res.status(200).pipe(res)
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

export default handler;
