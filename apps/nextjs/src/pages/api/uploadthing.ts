/** pages/api/uploadthing.ts */
import { pfeEtsFileRouter } from "@acme/api";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

const handler = createNextPageApiHandler({
  router: pfeEtsFileRouter,
});

export default handler;
