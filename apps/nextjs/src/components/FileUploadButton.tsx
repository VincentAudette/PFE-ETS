import { PlusIcon } from "@heroicons/react/20/solid";
import { PickerOverlay } from "filestack-react";
import { useState } from "react";

export default function FileUploadButton() {
  const [files, setFiles] = useState({});
  const [displayPicker, setDisplayPicker] = useState(false);

  console.log(files);

  return (
    <>
      <div className={!displayPicker ? "hidden" : ""}>
        <PickerOverlay
          apikey={process.env.NEXT_PUBLIC_FILESTACK_API_KEY as string}
          onUploadDone={(res: any) => {
            console.log("DONE======", res);
            setFiles(res.filesUploaded);
            setDisplayPicker(false);
          }}
        />
      </div>

      <button
        onClick={() => {
          setDisplayPicker(true);
        }}
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
}
