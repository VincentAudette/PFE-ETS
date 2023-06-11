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
import SimpleInput from "../Forms/atoms/SimpleInput";
import Button from "../Forms/atoms/button";
import LoadingDots from "../LoadingDots";
import LoadingPFE from "../LoadingPFE";

export default function UnregisteredView() {
  const [selectedOrganization, setSelectedOrganization] = useState<
    (Organization & { logo: File | null }) | null
  >(organizationObjetDefault);

  const { userData } = usePFEAuth();
  const updateToPromoter =
    trpc.user.updateToPromoterWithOrganisation.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    

    
    const target = e.target as OrganisationFormElement;
    const formValues: IFormOrganizationValues = {
      orgName: target.orgName?.value,
      orgChoice: selectedOrganization?.id,
    };



    if(!userData.firstName && !userData.lastName){
      if(!target.firstName?.value && !target.lastName?.value){
        toast.error("Veuillez renseigner votre prénom et votre nom de famille");
        return;
      }
    }

    if (
      selectedOrganization?.id !== -1 &&
      selectedOrganization?.id !== undefined
    ) {
      updateToPromoter
        .mutateAsync({
          clerkId: userData.clerkId,
          organizationId: selectedOrganization?.id,
          firstName: target.firstName?.value,
          lastName: target.lastName?.value,
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      toast.error("Veuillez choisir une organisation");
    }
    console.log(formValues);
  };

  if (!userData) {
    return <LoadingDots />;
  }
  if(updateToPromoter.isLoading){
    return <LoadingPFE />
  }
  return (
    <div className="w-full flex flex-col max-w-4xl justify-center my-10">
      <h1 className="text-2xl font-bold">
        Informations supplémentaires nécessaires
      </h1>
      <div className="h-3" />
     { (userData?.firstName && userData?.lastName) ? (<h3>
        Bonjour {userData.firstName + " " + userData.lastName}, veuillez nous
        fournir les informations suivantes pour finaliser la création de votre
        compte.
      </h3>):(<h3>
        Bonjour, veuillez nous fournir les informations suivantes pour finaliser la création de votre compte.
        </h3>)}
      <div className="h-12" />
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-end gap-4">
        <div className=" flex flex-col  gap-4  w-full ">
          {
            (!userData.firstName && !userData.lastName) && (
              <div className=" flex lg:flex-row flex-col gap-4  ">
            <div className="lg:w-1/2">
              <SimpleInput
                name="firstName"
                label="Prénom"
                placeholder="Votre prénom"
              />
            </div>
            <div className="lg:w-1/2">
              <SimpleInput
                name="lastName"
                label="Nom"
                placeholder="Votre nom de famille"
              />
            </div>
          </div>
            )
          }
          
          <SelectOrCreateOrganization
            selected={selectedOrganization}
            setSelected={setSelectedOrganization}
          />
        </div>
        <Button
        type="submit"
        text="Compléter l'inscription"
        />
      </form>
    </div>
  );
}
