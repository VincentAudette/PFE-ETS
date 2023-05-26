import { PfeEtsFileRouter } from "@acme/api";
import { UploadButton } from "@uploadthing/react";
import { DANGEROUS__uploadFiles } from "uploadthing/client";

export default function UploadThingButton({
  handleUploadComplete,
}: {
  handleUploadComplete: (
    res?: Awaited<ReturnType<typeof DANGEROUS__uploadFiles>>,
  ) => void;
}) {
  return (
    <main className="flex flex-col items-center justify-between p-5">
      <UploadButton<PfeEtsFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
