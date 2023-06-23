import { trpc } from "../utils/trpc";
import { File, Organization } from "@acme/db";
import SelectWithImage from "./Forms/atoms/SelectWithImage";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "./Forms/atoms/button";
import Modal from "./Forms/atoms/Modal";
import OrganisationForm from "./Forms/OrganisationForm";

export interface IFormOrganizationValues {
  orgName: string;
  orgChoice: number | undefined;
}

export interface OrganisationFormElement extends HTMLFormElement {
  orgName: { value: string };
  orgChoice: { value: string };
  firstName: { value: string };
  lastName: { value: string };
}

export const organizationObjetDefault: {
  id: number;
  name: string;
  description: string | null;
} & {
  logo: File;
} = {
  id: -1,
  name: "Selectionner un organisation",
  description: "",
  logo: {
    url: "",
    name: "",
    key: "",
    type: "IMAGE",
    uploadedAt: new Date(),
    organizationId: null,
    projectId: null,
  },
};

export default function SelectOrCreateOrganization({
  handleSelectionSubmit,
  selected,
  setSelected,
  buttonText,
}: {
  handleSelectionSubmit?: FormEventHandler<HTMLFormElement>;
  selected: (Organization & { logo: File | null }) | null;
  setSelected: Dispatch<
    SetStateAction<(Organization & { logo: File | null }) | null>
  >;
  buttonText?: string;
}) {
  const { data: organizations, isLoading: isLoadingOrgs } =
    trpc.organization.all.useQuery();

  const [organisationModalOpen, setOrganisationModalOpen] = useState(false);

  return (
    <>
      <form
        className=" mb-2 flex flex-col gap-4"
        onSubmit={handleSelectionSubmit ?? undefined}
      >
        <div className=" flex w-full max-w-xl items-end gap-3 rounded-lg">
          <SelectWithImage
            name="orgChoice"
            label="Choisissez votre organisation"
            options={organizations}
            {...{ selected, setSelected }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setOrganisationModalOpen(true);
            }}
            className="group relative flex h-9 w-9 items-center justify-center rounded-md bg-neutral-300 text-neutral-500 hover:scale-105 hover:bg-blue-600 hover:text-white"
          >
            <PlusIcon className="h-5 w-5" />
            <div className="absolute top-10 mx-2 hidden rounded-md border-t bg-neutral-700 px-2 py-1 text-xs text-neutral-50 shadow-md shadow-neutral-400/20 group-hover:block">
              Ajouter un organisation
            </div>
          </button>
        </div>

        {handleSelectionSubmit && (
          <div className=" self-end">
            <Button text={buttonText ?? ""} type="submit" />
          </div>
        )}
      </form>
      <Modal
        title="Créer une organisation"
        open={organisationModalOpen}
        setOpen={setOrganisationModalOpen}
      >
        <OrganisationForm setOpen={setOrganisationModalOpen} />
      </Modal>
    </>
  );
}
