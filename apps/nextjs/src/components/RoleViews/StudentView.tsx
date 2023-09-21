import { UserPlusIcon } from "@heroicons/react/24/solid";
import Button from "../Forms/atoms/button";
import CheckBoxInput from "../Forms/atoms/CheckBoxInput";
import InfoAlert from "../Forms/atoms/InfoAlert";
import InputWithIcon from "../Forms/atoms/InputWithIcon";
import ComboBox, { Option } from "../Forms/atoms/ComboBox";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

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
  // Utilise le query hook pour obtenir les projets
  const projectsQuery = trpc.project.getProjectsInEnrollment.useQuery();

  // Les options à selectionner, on a besoin que du id et titre
  const options =
    projectsQuery.data?.map((project) => ({
      id: project.id,
      name: project.title,
      pdfLink:
        "https://www.etsmtl.ca/docs/etudes/examens-finaux/Documents/horaire-examens-finaux", //test
    })) || [];

  // utlise useState hook de react pour instacier la variable selectedPfes
  // avec 4 valeur null.
  // À chaque fois que setSelectedPfes est appelé, le composent
  // est re-render
  const [selectedPfes, setSelectedPfes] = useState<(Option | undefined)[]>(
    Array(4).fill(undefined),
  );

  const handleSelectionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as StudentChoicesFormElement;
    const formValues: IFormValues = {
      groupePreference: target.groupePreference.value,
      pfeChoice1: selectedPfes[0]?.id as string,
      pfeChoice2: selectedPfes[1]?.id as string,
      pfeChoice3: selectedPfes[2]?.id as string,
      pfeChoice4: selectedPfes[3]?.id as string,
      isPreApprovedInPfe: target.isPreApprovedInPfe.checked,
      isHealthProfile: target.isHealthProfile.checked,
      isEnerngyProfile: target.isEnerngyProfile.checked,
    };
  };

  //pendant que les projets sont en cours de chargments
  if (projectsQuery.status === "loading") {
    return <div>Chargement des projets en cours...</div>; // Replace with your own loading component
  }

  //si il y a une erreur dans la requete pour obtenir les projets
  if (projectsQuery.status === "error") {
    return (
      <InfoAlert
        dimmed
        text="Erreur: les projets ne peuvent etre chargés, svp contacter l'équipe de support."
      />
    );
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Formulaire de choix de PFE</h1>
        <div className="h-3" />
        <InfoAlert text="Si votre PFE vous a déjà été attribué, alors choisissez le meme PFE pour vos 3 premiers choix et ajouter un autre PFE pour votre 4eme choix. Si votre groupe contient au moins 3 personnes, alors choisissez le meme PFE pour vos 4 choix." />
        <div className="h-3" />
        <form className=" flex flex-col gap-4" onSubmit={handleSelectionSubmit}>
          {selectedPfes.map((selectedPfe, i) => (
            <ComboBox
              key={"pfe_choice_" + (i + 1)}
              name={"pfeChoice" + (i + 1)}
              options={options}
              label={`${i + 1}. Quel est votre ${
                ["PREMIER", "DEUXIÈME", "TROISIÈME", "QUATRIÈME"][i]
              } choix de projet?`}
              selectedOption={selectedPfe}
              //fonction pour mettre a jours la liste des pfes choisis
              setSelectedOption={(option) => {
                const newSelectedPfes = [...selectedPfes];
                newSelectedPfes[i] = option;
                setSelectedPfes(newSelectedPfes);
              }}
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
    </>
  );
}
