import { BuildingOfficeIcon, PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import UploadThingButton from "./atoms/UploadThingButton";
import InputWithIcon from "./atoms/InputWithIcon";
import SimpleTextArea from "./atoms/SimpleTextArea";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export interface IFormValues {
  orgName: string;
  orgDescription: string;
  orgLogo: string;
}

interface StudentChoicesFormElement extends HTMLFormElement {
  orgName: { value: string };
  orgChoice: { value: string };
  orgLogo: { value: string };
}

export default function OrganisationForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >(undefined);

  const utils = trpc.useContext();

  const createOrganization = trpc.organization.create.useMutation({
    onSuccess: () => {
      utils.organization.all.invalidate();
    },
  });
  const { data: uploadedFile, isLoading: isFileLoading } =
    trpc.file.byKey.useQuery(selectedFile?.[0]?.fileKey as string, {
      enabled: selectedFile != undefined && selectedFile[0] != undefined,
    });

  console.log("selectedFile IN UPLOADTHING is =>", selectedFile);
  console.log("uploadedFile IN PRISMA is =>", uploadedFile);

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as StudentChoicesFormElement;
    const formValues: IFormValues = {
      orgName: target.orgName.value,
      orgDescription: target.orgDescription.value,
      orgLogo: uploadedFile?.key as string,
    };

    createOrganization
      .mutateAsync({
        name: formValues.orgName,
        description: formValues.orgDescription,
        logo: formValues.orgLogo,
      })
      .then(() => {
        setOpen(false);
      });
  };

  return (
    <form
      className="mt-5 flex flex-col gap-6 sm:mt-6"
      onSubmit={handleSelectionSubmit}
    >
      <div className="flex">
        {selectedFile && selectedFile[0]?.fileUrl ? (
          <Image
            src={selectedFile[0].fileUrl}
            alt="logo"
            className="h-32 w-32"
            width={128}
            height={128}
          />
        ) : selectedFile != undefined && isFileLoading ? (
          <div className="flex h-32 w-32 items-center justify-center border">
            <ArrowPathIcon className="h-12 w-12 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="flex h-32 w-32 items-center justify-center border">
            <PhotoIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <UploadThingButton
          handleUploadComplete={(res) => {
            if (res !== undefined) {
              setSelectedFile(res);
            }
          }}
        />
      </div>
      <InputWithIcon
        type="text"
        name="orgName"
        id="orgName"
        label="Nom de votre organisation"
        Icon={BuildingOfficeIcon}
        placeholder="Compagnie XYZ Inc."
      />

      <SimpleTextArea
        label="Courte description de votre organisation"
        name="orgDescription"
        id="orgDescription"
        placeholder=""
        maxLength={500}
      />

      <div className="mt-3 sm:mt-4">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
