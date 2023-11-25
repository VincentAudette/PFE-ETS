import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    console.log("req: ",req.body);
    return res.status(200).json("FICHIER RECU OK");

  }