import { UserPlusIcon } from "@heroicons/react/24/solid";
import Button from "../Forms/atoms/button";
import CheckBoxInput from "../Forms/atoms/CheckBoxInput";
import InfoAlert from "../Forms/atoms/InfoAlert";
import InputWithIcon from "../Forms/atoms/InputWithIcon";
import SimpleSelect from "../Forms/atoms/SimpleSelect";

const options = [
  {
    id: "0",
    name: "Sélectionnez une option",
  },
  {
    id: "1",
    name: "Option 1",
  },
  {
    id: "2",
    name: "Option 2",
  },
  {
    id: "3",
    name: "Option 3",
  },
];

export interface IFormValues {
  groupePreference: string;
  pfeChoice1: string;
  pfeChoice2: string;
  pfeChoice3: string;
  pfeChoice4: string;
  isPreApprovedInPfe: boolean;
  isHealthProfile: boolean;
  isEnerngyProfile: boolean;
}

interface StudentChoicesFormElement extends HTMLFormElement {
  groupePreference: { value: string };
  pfeChoice1: { value: string };
  pfeChoice2: { value: string };
  pfeChoice3: { value: string };
  pfeChoice4: { value: string };
  isPreApprovedInPfe: { checked: boolean };
  isHealthProfile: { checked: boolean };
  isEnerngyProfile: { checked: boolean };
}

export default function StudentView() {
  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as StudentChoicesFormElement;
    const formValues: IFormValues = {
      groupePreference: target.groupePreference.value,
      pfeChoice1: target["pfeChoice1[name]"].value,
      pfeChoice2: target["pfeChoice2[name]"].value,
      pfeChoice3: target["pfeChoice3[name]"].value,
      pfeChoice4: target["pfeChoice4[name]"].value,
      isPreApprovedInPfe: target.isPreApprovedInPfe.checked,
      isHealthProfile: target.isHealthProfile.checked,
      isEnerngyProfile: target.isEnerngyProfile.checked,
    };

    console.log(formValues);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Formulaire de choix de PFE</h1>
      <div className="h-3" />
      <InfoAlert text="Si votre PFE vous a déjà été attribué, alors choisissez le meme PFE pour vos 3 premiers choix et ajouter un autre PFE pour votre 4eme choix. Si votre groupe contient au moins 3 personnes, alors choisissez le meme PFE pour vos 4 choix." />
      <div className="h-3" />
      <form className=" flex flex-col gap-4" onSubmit={handleSelectionSubmit}>
        {[1, 2, 3, 4].map((_, i) => (
          <SimpleSelect
            key={"pfe_choice_" + (i + 1)}
            name={"pfeChoice" + (i + 1)}
            options={options}
            label={`${i + 1}. Quel est votre ${
              ["PREMIER", "DEUXIÈME", "TROISIÈME", "QUATRIÈME"][i]
            } choix de projet?`}
          />
        ))}
        <InputWithIcon
          type="text"
          name="groupePreference"
          id="groupePreference"
          label="Préférence de groupe - Courriels délimité par des virgules"
          Icon={UserPlusIcon}
          placeholder="jane.doe@ens.etsmtl.ca,john.doe@ens.etsmtl.ca (Maximum 4 personnes)"
        />
        <CheckBoxInput
          id="isPreApprovedInPfe"
          name="isPreApprovedInPfe"
          label="Je confirme être éligible à sélectionné multiple fois le même PFE, car j’ai été préalablement accepté pour cette option."
        />{" "}
        <CheckBoxInput
          id="isHealthProfile"
          name="isHealthProfile"
          label="Je confirme avoir sélectionné des PFE liés à la Santé, conformément à mon profil Santé."
        />
        <CheckBoxInput
          id="isEnerngyProfile"
          name="isEnerngyProfile"
          label="Je confirme avoir sélectionné des PFE en lien avec l’Institut en génie de l’énergie électrique (IGEE), conformément à mon profil IGEE."
        />
        <div className="h-3" />
        <div className=" self-center">
          <Button text="Confirmer mes choix" type="submit" />
        </div>
      </form>
    </div>
  );
}
