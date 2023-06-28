import { trpc } from "../utils/trpc";
import { File } from "@acme/db";
import SelectWithImage from "./Forms/atoms/SelectWithImage";
import { FormEventHandler, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "./Forms/atoms/button";
import Modal from "./Forms/atoms/Modal";
import OrganisationForm from "./Forms/OrganisationForm";
import SplitInfoFormContainer from "./Forms/atoms/SplitInfoFormContainer";
import LoadingDots from "./LoadingDots";
import { PlayIcon } from "@heroicons/react/24/solid";
import { usePFEAuth } from "../context/PFEAuthContext";

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
  buttonText,
}: {
  handleSelectionSubmit?: FormEventHandler<HTMLFormElement>;
  buttonText?: string;
}) {
  const { data: organizations, isLoading: isLoadingOrgs } =
    trpc.organization.all.useQuery();
  const { setSelectedOrganization, selectedOrganization } = usePFEAuth();

  const [organisationModalOpen, setOrganisationModalOpen] = useState(false);

  return (
    <>
      <form
        className=" mb-2 flex flex-col lg:gap-4"
        onSubmit={handleSelectionSubmit ?? undefined}
      >
        <SplitInfoFormContainer
          id="Organisation"
          title="Choisissez votre organisation dans la liste"
          description="Si elle n'est pas présente, utilisez le bouton '+' à droite pour ajouter une nouvelle organisation."
        >
          <div className="flex w-full items-center gap-1">
            {isLoadingOrgs ? (
              <div className="grow">
                <LoadingDots />
              </div>
            ) : (
              <>
                <SelectWithImage
                  name="orgChoice"
                  options={organizations}
                  {...{
                    selected: selectedOrganization,
                    setSelected: setSelectedOrganization,
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOrganisationModalOpen(true);
                  }}
                  className="group relative flex h-9 w-10 grow items-center justify-center rounded-md bg-neutral-300 text-black hover:scale-105 hover:bg-blue-600 hover:text-white"
                >
                  <PlusIcon className="h-5 w-5" />
                  <div className="absolute top-10 mx-2 hidden rounded-md bg-neutral-700 px-2 py-1 text-xs text-neutral-50 shadow-md group-hover:block">
                    <div className="relative flex items-center justify-center">
                      <PlayIcon className=" absolute -top-4 h-5 w-5 rotate-[270deg] text-neutral-700" />
                      <p>Ajouter une organisation</p>
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </SplitInfoFormContainer>

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
