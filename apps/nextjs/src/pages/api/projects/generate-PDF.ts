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

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_CONNECTION_STRING ?? "",
    );

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient("pdf-blob");

    // Create a unique name for the blob
    const blobName = `TestUpload${Date.now()}`;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(
      pdf,
      pdf.byteLength,
    );

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
