import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //console.log("req", req);

  try {
    


    res.status(200).json("hello world");
  } catch (error) {
    console.log("error", error);

    res.status(400).json(error);
  }
};

export default handler;
