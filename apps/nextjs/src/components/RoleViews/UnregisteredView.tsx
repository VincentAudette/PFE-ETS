import { usePFEAuth } from "../../context/PFEAuthContext";
import Button from "../Forms/atoms/button";
import { trpc } from "../../utils/trpc";
import Modal from "../Forms/atoms/Modal";
import { useState } from "react";
import OrganisationForm from "../Forms/OrganisationForm";
import SelectWithImage from "../Forms/atoms/SelectWithImage";
import { FileType, Organization } from "@acme/db";
import { File } from "@acme/db";
import { PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

export interface IFormValues {
  orgName: string;
  orgChoice: number | undefined;
}

interface OrganisationFormElement extends HTMLFormElement {
  orgName: { value: string };
  orgChoice: { value: string };
}

const objetDefault: {
  id: number;
  name: string;
  description: string | null;
} & {
  logo: {
    key: string;
    name: string | null;
    type: "AUDIO" | "IMAGE" | "PDF" | "ZIP" | "VIDEO";
    url: string;
    uploadedAt: Date;
    organizationId: number | null;
  } | null;
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
  },
};

export default function UnregisteredView() {
  const [organisationModalOpen, setOrganisationModalOpen] = useState(false);
  const [selected, setSelected] = useState<
    (Organization & { logo: File | null }) | null
  >(objetDefault);

  const { userData } = usePFEAuth();
  const { data: organizations, isLoading: isLoadingOrgs } =
    trpc.organization.all.useQuery();
  const updateToPromoter =
    trpc.user.updateToPromoterWithOrganisation.useMutation();

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as OrganisationFormElement;
    const formValues: IFormValues = {
      orgName: target.orgName?.value,
      orgChoice: selected?.id,
    };

    console.log("formValues", formValues);

    if (selected?.id !== -1 && selected?.id !== undefined) {
      updateToPromoter
        .mutateAsync({
          clerkId: userData.clerkId,
          organizationId: selected?.id,
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      toast.error("Veuillez choisir une organisation");
    }
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
