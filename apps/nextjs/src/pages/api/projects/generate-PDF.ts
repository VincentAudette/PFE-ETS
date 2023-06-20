import { NextApiRequest, NextApiResponse } from "next";
import { generate } from "@pdfme/generator";
import { prisma } from "../../../../../../packages/db/index";
import { template, generateInputs } from "./generate-PDF-Helper";
import fs from "fs";
import * as path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const project = await prisma.project.findUnique({
    where: { id: req.body.id },
  });

  if (project) {
    const inputs = await generateInputs(project);

    const pdf = await generate({ template, inputs });

    // Node.js
    const pdfFileName = "test4.pdf";
    fs.writeFileSync(path.join(__dirname, pdfFileName), pdf);

    res.status(200);
    res.json({
      data: `PDF generated at: ${__dirname} with name ${pdfFileName}.`,
    });
    res.end();
  } else {
    res.status(500);
    res.json({
      error: "The given project ID does not exist.",
    });
    res.end();
  }
}
