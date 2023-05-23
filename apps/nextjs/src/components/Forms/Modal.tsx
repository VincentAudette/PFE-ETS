import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";
import InputWithIcon from "../Forms/atoms/InputWithIcon";
import { trpc } from "../../utils/trpc";

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

export default function Example() {
  const [open, setOpen] = useState(true);
  const createOrganization = trpc.organization.create.useMutation();

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
                        <InputWithIcon
                          type="text"
                          name="orgName"
                          id="orgName"
                          label="Nom de votre organisation"
                          Icon={BuildingOfficeIcon}
                          placeholder="Compagnie XYZ Inc."
                        />
                        <div className="h-6" />
                        <InputWithIcon
                          type="text"
                          name="orgDescription"
                          id="orgDescription"
                          label="Courte description de votre organisation"
                          Icon={DocumentTextIcon}
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
                        />
                        <div className="mt-5 sm:mt-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
