import { usePFEAuth } from "../../context/PFEAuthContext";
import { trpc } from "../../utils/trpc";
import { useState } from "react";
import { Organization } from "@acme/db";
import { File } from "@acme/db";
import { toast } from "react-toastify";
import SelectOrCreateOrganization, {
  IFormOrganizationValues,
  OrganisationFormElement,
  organizationObjetDefault,
} from "../SelectOrCreateOrganization";

export default function UnregisteredView() {
  const [selectedOrganization, setSelectedOrganization] = useState<
    (Organization & { logo: File | null }) | null
  >(organizationObjetDefault);

  const { userData } = usePFEAuth();
  const updateToPromoter =
    trpc.user.updateToPromoterWithOrganisation.useMutation();

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as OrganisationFormElement;
    const formValues: IFormOrganizationValues = {
      orgName: target.orgName?.value,
      orgChoice: selectedOrganization?.id,
    };

    if (
      selectedOrganization?.id !== -1 &&
      selectedOrganization?.id !== undefined
    ) {
      updateToPromoter
        .mutateAsync({
          clerkId: userData.clerkId,
          organizationId: selectedOrganization?.id,
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
      <SelectOrCreateOrganization
        selected={selectedOrganization}
        setSelected={setSelectedOrganization}
        handleSelectionSubmit={handleSelectionSubmit}
        buttonText="Finaliser l'inscription"
      />
    </div>
  );
}
