import { usePFEAuth } from "../../context/PFEAuthContext";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import Button from "../Forms/atoms/button";
import InputWithIcon from "../Forms/atoms/InputWithIcon";
import { trpc } from "../../utils/trpc";
import SimpleSelect from "../Forms/atoms/SimpleSelect";
import Modal from "../Forms/Modal";

export interface IFormValues {
  orgName: string;
  orgChoice: string;
}

interface StudentChoicesFormElement extends HTMLFormElement {
  orgName: { value: string };
  orgChoice: { value: string };
}

export default function UnregisteredView() {
  const { userData } = usePFEAuth();
  const organizations = trpc.organization.all.useQuery().data;
  const updateToPromoter = trpc.user.updateToPromoter.useMutation();

  let orgOptions = null;

  if (organizations != undefined) {
    orgOptions = organizations?.map((x) => ({
      id: x.id.toString(),
      name: x.name,
    }));
  } else {
    orgOptions = [
      {
        id: "0",
        name: "",
      },
    ];
  }

  //console.log(organizations);
  //console.log(orgOptions);

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as StudentChoicesFormElement;
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
      <form className=" flex flex-col gap-4" onSubmit={handleSelectionSubmit}>
        <InputWithIcon
          type="text"
          name="orgName"
          id="orgName"
          label="Nom de votre organisation"
          Icon={BuildingOfficeIcon}
          placeholder="Compagnie XYZ Inc."
        />
        <div className="h-3" />
        <div className=" self-center">
          <Button text="Confirmer mes informations" type="submit" />
        </div>
      </form>
      <Modal />
    </div>
  );
}
