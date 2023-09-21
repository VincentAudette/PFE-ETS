import { generate } from "@pdfme/generator";
import { prisma, FileType } from "@acme/db";
import { template, generateInputs } from "./generate-PDF-Helper";
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
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

    const blobName = generateBlobName(project);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.upload(
      pdf,
      pdf.byteLength,
    );

    const createdFile = await prisma.file.create({
      data: {
        key: blobName,
        name: null,
        type: FileType.PDF, // Assuming you have a function to determine the file type
        url: `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${blobName}`,
        //organizationId: project.organizationId,
        projectId: project.id,
      },
    });

    /* Save to local
    // Node.js
    const pdfFileName = "test4.pdf";
    fs.writeFileSync(path.join(__dirname, pdfFileName), pdf);
    */

    res.status(200).json({
      message: `File uploaded to Blob Storage with name: ${blobName}.`,
      file: createdFile,
    });
  } else {
    res.status(500).json({
      error: "The given project ID does not exist.",
    });
  }
}

function generateBlobName(project) {
  return `${project.pfeId}-${Date.now()}-PDF.pdf`;
}
