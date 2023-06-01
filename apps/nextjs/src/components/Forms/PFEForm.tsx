import { useState } from "react";
import TableWithAddButton from "../TableWithAddButton";
import SimpleInput from "./atoms/SimpleInput";
import SimpleSelect from "./atoms/SimpleSelect";
import CheckBoxInput from "./atoms/CheckBoxInput";
import SimpleTextArea from "./atoms/SimpleTextArea";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const representativePlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  phone: "Téléphone",
  email: "representant@etsmtl.ca",
};

const etudiantPlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  email: "prenom.nom.1@ens.etsmtl.ca",
  departement: "Departement",
};

const teacherPlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  phone: "Téléphone",
  email: "prenom.nom@etsmtl.ca",
};

const trimesters = [
  {
    id: "0",
    name: "Choisir un trimestre",
    type: null,
  },
  {
    id: "1",
    name: "Hiver",
    type: "WINTER",
  },
  {
    id: "2",
    name: "Été",
    type: "SUMMER",
  },
  {
    id: "3",
    name: "Automne",
    type: "AUTOMNE",
  },
];

const departement = [
  {
    id: "0",
    name: "Choisir un département",
    type: null,
  },
  {
    id: "1",
    name: "Génie électrique",
    type: "ELE",
  },
  {
    id: "2",
    name: "Génie logiciel et des TI",
    type: "LOG_TI",
  },
  {
    id: "3",
    name: "Génie mécanique",
    type: "MEC",
  },
  {
    id: "4",
    name: "Génie de la production automatisée",
    type: "GPA",
  },
  {
    id: "5",
    name: "Génie des opérations et de la logistique",
    type: "GOL",
  },
  {
    id: "6",
    name: "Génie de la construction",
    type: "CTN",
  },
];

const encadrement = [
  {
    id: "0",
    name: "Choisir un l'encadrement",
    type: null,
  },
  {
    id: "1",
    name: "Par semaine",
    type: "WEEKLY",
  },
  {
    id: "2",
    name: "À la demande",
    type: "UPON_REQUEST",
  },
  {
    id: "3",
    name: "Pas d'encadrement",
    type: "NO_ENCOURAGEMENT",
  },
];

const checkBoxesAtEndOfForm = [
  {
    id: "authorizesCloudComputing",
    name: "Autorise l'utilisation de services d'infonuagiques",
  },
  {
    id: "authorizesCloudOutsideQuebec",
    name: "Autorise l'utilisation de services d'infonuagiques hors Québec",
  },
  {
    id: "acceptsConfidentiality",
    name: "Accepte la confidentialité du projet",
    hoverText:
      "Les projets de fin d'études sont académiques et publics. Ils ne sont pas garantis par l'ÉTS, les professeurs ou les étudiants, et ne peuvent être utilisés à des fins commerciales. Les étudiants n'ont pas d'autorité pour signer en tant qu'ingénieurs et n'engageront pas leur responsabilité professionnelle. Les professeurs n'assisteront pas au développement du projet, et aucune entente de confidentialité ne sera signée. Il est de la responsabilité du promoteur de garantir que les informations fournies ne sont pas confidentielles.",
  },
  {
    id: "mustRespectRegulations",
    name: "Respecte les exigences réglementaires",
    hoverText:
      "Le projet doit respecter les réglementations d'exportation et de protection des données personnelles en vigueur. L'ÉTS n'autorise pas la délocalisation des données en dehors du Québec pour des raisons de protection des renseignements personnels. Les données doivent être stockées sur des serveurs au Québec. Le promoteur est responsable de cette conformité et l'ÉTS se dégage de toute responsabilité en cas de non-respect. L'ÉTS se réserve le droit de refuser un projet ou de mettre fin à une collaboration si ces exigences ne sont pas respectées.",
  },
];

const years = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 3; i++) {
    years.push({ id: `annee-${currentYear + i}`, name: currentYear + i + "" });
  }
  return years;
};

export default function PFEForm() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isMultiDepartment, setIsMultiDepartment] = useState<boolean>(false);

  return (
    <div className="my-5 flex flex-col gap-12 px-4 py-3 sm:px-6">
      <h1 className="text-center text-2xl font-bold">
        Formulaire de projet de fin d&apos;études
      </h1>
      <form className="flex flex-col gap-12">
        <SimpleInput
          type="text"
          name="title"
          id="title"
          label="Titre du projet (Le titre doit refléter qu’il s’agit d’un projet de conception d’un système, d’un composant, d’un procédé ou d’un processus.)"
          placeholder="Titre du projet"
        />

        {!isMultiDepartment && (
          <SimpleSelect
            name="departement"
            options={departement}
            label="Département de quel génie?"
          />
        )}
        <CheckBoxInput
          id="isMultiDepartment"
          name="isMultiDepartment"
          label="Est-ce que le projet est multi-département?"
          checked={isMultiDepartment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIsMultiDepartment(e.target.checked)
          }
        />

        {isMultiDepartment && (
          <div className="flex max-w-3xl flex-wrap gap-12">
            {departement.map((dep) => {
              return (
                dep.type && (
                  <CheckBoxInput
                    key={dep.id}
                    id={dep.id}
                    name={dep.name}
                    label={dep.name}
                  />
                )
              );
            })}
          </div>
        )}

        <div className="flex gap-12">
          <SimpleSelect
            name="trimester"
            options={trimesters}
            label="Trimestre"
          />
          <SimpleSelect name="year" options={years()} label="Année" />
        </div>

        <SimpleSelect
          name="encadrement"
          options={encadrement}
          label="Que voulez-vous offrir comme encadrement?"
        />

        <div className="flex flex-col gap-32 py-12">
          <TableWithAddButton
            title="Représentants de l'entreprise"
            description="Est-ce que d'autres personnes de l'entreprise doivent être ajoutées au projet?"
            buttonTitle="Nouveau représentant"
            obj={{
              firstName: "Prénom",
              lastName: "Nom",
              phone: "Téléphone",
              email: "Courriel",
            }}
            placeholderObj={representativePlaceholderObj}
            objs={representatives}
            setObjs={setRepresentatives}
          />
          <TableWithAddButton
            title="Représentants de l'École de technologie supérieure"
            description="Est-ce que vous avez déjà sélectionné un professeur pour votre projet?"
            buttonTitle="Nouveau professeur"
            obj={{
              firstName: "Prénom",
              lastName: "Nom",
              phone: "Téléphone",
              email: "Courriel",
            }}
            placeholderObj={teacherPlaceholderObj}
            objs={teachers}
            setObjs={setTeachers}
          />
          <TableWithAddButton
            title="Étudiants préalablement sélectionnés"
            description="Avez-vous déjà sélectionné des étudiants pour votre projet?"
            buttonTitle="Nouvel étudiant"
            obj={{
              firstName: "Prénom",
              lastName: "Nom",
              email: "Courriel",
              departement: "Departement",
            }}
            placeholderObj={etudiantPlaceholderObj}
            objs={students}
            setObjs={setStudents}
          />

          <div className="columns-2">
            <SimpleInput
              type="number"
              name="numberOfStudentsPerTeam"
              label="Nombre d'étudiants requis par équipe"
              placeholder="Minimum 3 étudiants"
            />
            <SimpleInput
              type="number"
              name="numberOfTeams"
              label="Nombre d'équipes sur le projet"
              placeholder="Minimum 1 équipe"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="thematics"
            className="mb-2 block text-sm font-medium text-gray-900 "
          >
            Thématiques du projet{" "}
            <span className="text-lime-500">
              {
                "//TODO Create list associated to departments and fetch from db then load ISR"
              }
            </span>
          </label>
          <textarea
            name="thematics"
            id="thematics"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Eg: Télécommunication, Informatique, Intelligence artificielle, énergie"
          ></textarea>
        </div>

        {[
          {
            name: "description",
            label: "Description du projet",
            placeholder: "Décrivez ici l'essence de votre projet...",
          },
          {
            name: "contextProblematic",
            label: "Contexte et problématique",
            placeholder:
              "Présentez le contexte et la problématique de votre projet...",
          },
          {
            name: "objectives",
            label: "Objectifs du projet",
            placeholder:
              "Quels sont les objectifs ambitieux de votre projet...",
          },
          {
            name: "needsConstraints",
            label: "Besoins et contraintes",
            placeholder:
              "Expliquez vos besoins spécifiques et les contraintes du projet...",
          },
          {
            name: "expectedResults",
            label: "Résultats et livrables attendus",
            placeholder:
              "Quels sont les résultats et les livrables que vous attendez...",
          },
        ].map((textArea) => {
          return (
            <SimpleTextArea
              id={textArea.name}
              {...textArea}
              key={textArea.name}
              rows={5}
            />
          );
        })}
        <div className="flex flex-col gap-8">
          {checkBoxesAtEndOfForm.map(({ id, name, hoverText }) => (
            <div key={id} className="group relative">
              <div className="flex items-center gap-2">
                <CheckBoxInput id={id} name={name} label={name} />
                {hoverText && (
                  <div className="group relative">
                    <span className="cursor-pointer text-blue-500 group-hover:underline">
                      <InformationCircleIcon className="h-5 w-5" />
                      <div className="absolute  z-40 -mt-20 ml-10 hidden w-[30rem] rounded-lg bg-blue-600 p-3 text-sm text-blue-50 group-hover:block">
                        {hoverText}
                      </div>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mr-2 mb-2 rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Créer le projet
        </button>
      </form>
    </div>
  );
}
