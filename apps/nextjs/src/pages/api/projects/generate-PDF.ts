import { NextApiRequest, NextApiResponse } from "next";
import { generate } from "@pdfme/generator";
import { prisma } from "../../../../../../packages/db/index";
import { template, generateInputs } from "./generate-PDF-Helper";
import { BlobServiceClient } from "@azure/storage-blob";
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

    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CONNECTION_STRING ?? "",
    );

    const containerClient = blobServiceClient.getContainerClient("pdf-blob");

    const blobName = `TestUpload${Date.now()}`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(
      pdf,
      pdf.byteLength,
    );

    /* Save to local
    // Node.js
    const pdfFileName = "test4.pdf";
    fs.writeFileSync(path.join(__dirname, pdfFileName), pdf);
    */

    res.status(200);
    res.json({
      data: `File uploaded to Blob Storage with name: ${blobName}.`,
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
