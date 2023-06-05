/** server/uploadthing.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
const f = createUploadthing();

import { getAuth } from "@clerk/nextjs/server";
import { FileType } from "@acme/db";

// FileRouter for your app, can contain multiple FileRoutes
export const pfeEtsFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f
    // Set permissions and file types for this FileRoute
    .fileTypes(["image", "video"])
    .maxSize("1GB")
    .middleware(async (req) => {
      // This code runs on your server before upload
      const { userId } = await getAuth(req);

      // If you throw, the user will not be able to upload
      if (userId === null) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      const prismaFile = await prisma?.file.create({
        data: {
          key: file.key,
          type: FileType.IMAGE,
          url: file.url,
        },
      });

      if (prismaFile === null || prismaFile === undefined) {
        throw new Error("Failed to create file");
      }
    }),
} satisfies FileRouter;

export type PfeEtsFileRouter = typeof pfeEtsFileRouter;
