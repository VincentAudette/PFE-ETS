import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  CameraIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "./InputWithIcon";
import { trpc } from "../../../utils/trpc";
import SimpleTextArea from "./SimpleTextArea";
import UploadThingButton from "./UploadThingButton";
import { File, FileType } from "@acme/db";
import Image from "next/image";

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

export default function Modal({ open, setOpen }: any) {
  const [selectedFile, setSelectedFile] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >(undefined);

  const createOrganization = trpc.organization.create.useMutation();
  const uploadedFile = trpc.file.byKey.useQuery(
    selectedFile?.[0]?.fileKey as string,
    {
      enabled: selectedFile != undefined && selectedFile[0] != undefined,
    },
  );

  console.log("selectedFile IN UPLOADTHING is =>", selectedFile);
  console.log("uploadedFile IN PRISMA is =>", uploadedFile);

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as StudentChoicesFormElement;
    const formValues: IFormValues = {
      orgName: target.orgName.value,
      orgDescription: target.orgDescription.value,
      orgLogo: target.orgLogo.value,
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Créer une organisation
                    </Dialog.Title>
                    <div className="mt-2 text-left">
                      <form
                        className="mt-5 sm:mt-6"
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
                        <div className="h-6" />

                        <SimpleTextArea
                          label="Courte description de votre organisation"
                          name="orgDescription"
                          id="orgDescription"
                          placeholder=""
                        />
                        <div className="h-6" />
                        <InputWithIcon
                          type="text"
                          name="orgLogo"
                          id="orgLogo"
                          label="Lien vers le logo de votre organisation"
                          Icon={CameraIcon}
                          placeholder="https://imgur.com/votre_logo"
                          value={uploadedFile.data?.key}
                        />
                        <div className="mt-5 sm:mt-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            Ajouter
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
