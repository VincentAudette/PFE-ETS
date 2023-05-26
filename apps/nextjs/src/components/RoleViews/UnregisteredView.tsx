import { usePFEAuth } from "../../context/PFEAuthContext";
import { BuildingOfficeIcon, PlusIcon } from "@heroicons/react/24/solid";
import Button from "../Forms/atoms/button";
import InputWithIcon from "../Forms/atoms/InputWithIcon";
import { trpc } from "../../utils/trpc";
import SimpleSelect, { SelectOption } from "../Forms/atoms/SimpleSelect";
import Modal from "../Forms/atoms/Modal";
import { useState } from "react";
import OrganisationForm from "../Forms/OrganisationForm";
import SelectWithImage from "../Forms/atoms/SelectWithImage";

export interface IFormValues {
  orgName: string;
  orgChoice: string;
}

interface OrganisationFormElement extends HTMLFormElement {
  orgName: { value: string };
  orgChoice: { value: string };
}

export default function UnregisteredView() {
  const [organisationModalOpen, setOrganisationModalOpen] = useState(false);

  const { userData } = usePFEAuth();
  const { data: organizations, isLoading: isLoadingOrgs } =
    trpc.organization.all.useQuery();
  const updateToPromoter = trpc.user.updateToPromoter.useMutation();

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as OrganisationFormElement;
    const formValues: IFormValues = {
      orgName: target.orgName.value,
      orgChoice: target.orgChoice.value,
    };

    //updateToPromoter.mutateAsync({ clerkId: userData.clerkId }).then(() => {
    //  window.location.reload();
    //});
    console.log(formValues);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Informations supplémentaires nécessaires
      </h1>
      <div className="h-3" />
      <h3>
        Bonjour {userData.firstName + " " + userData.lastName}, veuillez nous
        fournir les informations suivantes pour finaliser la création de votre
        compte.
      </h3>
      <div className="h-3" />
      <form className=" flex flex-col gap-4 " onSubmit={handleSelectionSubmit}>
        <div className="mx-auto flex w-full max-w-xl items-end gap-3 rounded-lg p-10">
          <SelectWithImage
            name="orgChoice"
            label="Choisissez votre organisation"
            options={organizations}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setOrganisationModalOpen(true);
            }}
            className="group relative flex h-9 w-9 items-center justify-center rounded-md bg-neutral-300 text-neutral-500 hover:scale-105 hover:bg-blue-600 hover:text-white"
          >
            <PlusIcon className="h-5 w-5" />
            <div className="absolute left-9 mx-2 hidden rounded-md border-t border-stone-100 bg-stone-700 px-2 py-1 text-xs text-stone-50 shadow-md shadow-stone-400/20 group-hover:block">
              Ajouter un organisation
            </div>
          </button>
        </div>

        <div className=" self-end">
          <Button text="Confirmer mes informations" type="submit" />
        </div>
      </form>
      <Modal
        title="Créer une organisation"
        open={organisationModalOpen}
        setOpen={setOrganisationModalOpen}
      >
        <OrganisationForm setOpen={setOrganisationModalOpen} />
      </Modal>
    </div>
  );
}
