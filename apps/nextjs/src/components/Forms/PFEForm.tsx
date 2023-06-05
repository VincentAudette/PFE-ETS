import { useState } from "react";
import TableWithAddButton from "../TableWithAddButton";
import SimpleInput from "./atoms/SimpleInput";
import SimpleSelect, { SelectOption } from "./atoms/SimpleSelect";
import CheckBoxInput from "./atoms/CheckBoxInput";
import SimpleTextArea from "./atoms/SimpleTextArea";
import UploadThingButton from "./atoms/UploadThingButton";
import Signature from "../SVG/Signature";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

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

type DepartmentType = "ELE" | "LOG_TI" | "MEC" | "GPA" | "GOL" | "CTN";
export type DepartmentOption = {
  id: string;
  name: string;
  type: DepartmentType | null;
};

const departement: DepartmentOption[] = [
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

const textAreaSections = [
  {
    name: "description",
    label: "Description du projet",
    placeholder: "Décrivez ici l'essence de votre projet...",
  },
  {
    name: "contextProblematic",
    label: "Contexte et problématique",
    placeholder: "Présentez le contexte et la problématique de votre projet...",
  },
  {
    name: "objectives",
    label: "Objectifs du projet",
    placeholder: "Quels sont les objectifs ambitieux de votre projet...",
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
];

const checkBoxesAtEndOfForm = [
  {
    id: "acceptsConfidentiality",
    name: "1.	CONFIDENTIALITÉ du projet (Un projet de fin d’étude ne peut pas être considéré comme confidentiel, les étudiants feront une présentation orale à la fin de la session devant tous les étudiants de la classe et les autres promoteurs de projets pourraient être présents) ",
    notes: [
      "NOTE – 1 : Le projet de fin d’études (PFE) est réalisé dans un contexte académique. Les PFE ne peuvent faire objet d’exploitation commerciale. Les concepts, les calculs, les dessins d’ateliers, les prototypes, les solutions proposées et la justification des choix retenus ne sont pas garantis d’aucune manière par l’École de Technologie Supérieure, par les professeurs ou par les étudiants associés au projet. Les étudiants au PFE, n’ayant pas encore obtenu leur titre d’ingénieur, n’ont aucune autorité pour signer à ce titre et ne peuvent engendrer leur responsabilité professionnelle, n’étant pas encore membres de l’Ordre des ingénieurs du Québec. Par ailleurs, le rôle des professeurs se limite à l’encadrement du projet au niveau académique. En aucun temps et sous aucune considération, les professeurs participeront au développement du projet, notamment par la mise à profit de leurs expertises. De ce fait, les professeurs ou l’ÉTS ne signeront pas d’entente de confidentialité et ne pourront être tenus responsables des résultats d’un projet de PFE ou de son exploitation subséquente à des fins commerciales. Les étudiants ne signeront pas non plus d’ententes de confidentialité. Il est de la seule responsabilité du promoteur de s’assurer que les informations transmises aux étudiants ne soient pas confidentielles. ",
    ],
  },
  {
    id: "authorizesCloudComputing",
    name: "2.	Le promoteur autorise l’utilisation de services d’infonuagiques (Cloud-Computing, i.e. Google drive, Dropbox, etc.) privés ou publics ? (Voir Note 2)",
  },
  {
    id: "authorizesCloudOutsideQuebec",
    name: "Si oui, sur des serveurs localisés au Québec? ",
  },
  {
    id: "mustRespectRegulations",
    name: "3.	Le projet proposé respecte les exigences réglementaires au niveau des contrôles à l’exportation (PMC/ITAR, EAR, ISP, JCP, NATO) et/ou à la protection des renseignements personnels dans le respect de la législation applicable (notamment la Loi sur l’accès à l’information et à la protection des renseignements personnels, RLRQ c. A-2.1, Loi sur la protection des renseignements personnels dans le secteur privé, RLRQ c. P-39.1 et Loi sur la protection des renseignements personnels et les documents électroniques) ? (Voir Note 2) ",
    notes: [
      "NOTE – 2 : L’ÉTS ne permet pas une délocalisation des données dans un territoire ne pouvant offrir les mêmes garanties qu’au Québec en matière de protection des renseignements personnels. Ainsi, l’hébergement des données doit être assuré sur des serveurs localisés sur le territoire du Québec (pas de cloud, Google Drive, Dropbox).  Le promoteur peut fournir l’infrastructure des technologies de l’information nécessaire aux étudiants qui répondent à cette exigence. Le promoteur est responsable de garantir le respect de cette disposition.  En cas de non-respect de cette exigence par le promoteur, l’ÉTS se dégage de toute responsabilité en lien avec les données hébergées sur des serveurs non conformes à la présente note. ",
      "NOTE – 3 : Dans tous les cas, l’ÉTS se réserve le droit de refuser un projet de PFE qui ne respecterait pas les exigences explicitées dans la présente offre de projet ou de cesser toute collaboration avec un Promoteur qui ne respecterait plus les présentes. ",
    ],
  },
];

const attestations = [
  `Je, soussigné, représentant dûment autorisé du Promoteur,
  reconnais avoir lu le présent formulaire d’offre de projet, en
  accepte tous les termes et conditions et reconnais être lié par
  ceux-ci et convient de faire en sorte que toutes les personnes
  impliquées de mon entreprise soient informées de leurs obligations
  et des limites de responsabilité de la part de l’ÉTS en vertu de
  la présente offre de projet.`,
  `Je m’engage spécifiquement à respecter et faire respecter les
  demandes de l’ÉTS en matière d’infonuagique et de respect des
  renseignements confidentiels.`,
  ` En outre, je confirme que tous résultats, plans ou prototypes
reçus dans le cadre de ce PFE ne pourront être utilisés à d’autres
fins qu’académiques. Je confirme également comprendre qu’aucune
utilisation ou exploitation à des fins commerciales des résultats,
plans ou prototypes conçus ou obtenus dans le cadre de ce PFE
n’est autorisée par l’ÉTS.`,
];

const descriptionDuProjet = [
  "Il doit développer des éléments, des systèmes et des processus qui répondent à des besoins précis",
  "Il doit s'agir d'un processus créatif, itératif et évolutif assujetti à des contraintes (l’économie, la santé, la sécurité, l’environnement, la société, etc.)",
  "Tous les projets doivent être approuvés par le département pour assurer le respect des exigences et pour la poursuite du processus",
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
  const [selectedDepartment, setSelectedDepartment] = useState<SelectOption>(
    departement[0] as SelectOption,
  );
  const [selectedFile, setSelectedFile] = useState<
    { fileUrl: string; fileKey: string }[] | undefined
  >(undefined);

  const [selectedThematics, setSelectedThematics] = useState<any>(new Set());

  const { data: uploadedFile, isLoading: isFileLoading } =
    trpc.file.byKey.useQuery(selectedFile?.[0]?.fileKey as string, {
      enabled: selectedFile != undefined && selectedFile[0] != undefined,
    });

  const { data: thematicsOfDepartment, isLoading: isThematicsLoading } =
    trpc.thematic.byDepartment.useQuery(
      (selectedDepartment as DepartmentOption)?.type as DepartmentType,
      {
        enabled:
          selectedDepartment != undefined && selectedDepartment.id != undefined,
      },
    );

  const [isMultiDepartment, setIsMultiDepartment] = useState<boolean>(false);

  return (
    <div className="my-5 flex flex-col gap-12 px-4 py-3 text-base sm:px-6">
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

        <SimpleSelect
          name="departement"
          options={departement}
          selectedState={selectedDepartment}
          setSelectedState={setSelectedDepartment}
          label="Département de quel génie?"
        />

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
          <div
            id="autres-departements"
            className="flex max-w-3xl flex-wrap gap-12"
          >
            {departement.map((dep) => {
              return (
                dep.type &&
                dep.name !== selectedDepartment.name && (
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
            title="Étudiants préalablement sélectionnés (Maximum 4 étudiants)"
            description="Avez-vous déjà sélectionné des étudiants pour votre projet? NOTE :  Les étudiants inscrits dans cette section ont été contactés et sont assurés de vouloir faire partie du projet. De ce fait, ils ne pourront choisir d’autres projets."
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
            className=" mb-4 block text-sm font-medium text-gray-900"
          >
            Thématiques du projet{" "}
          </label>

          {thematicsOfDepartment && (
            <div className="flex flex-wrap gap-2">
              {thematicsOfDepartment.map((thematic) => {
                const isThematicSelected = selectedThematics.has(thematic.id);
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const thematicSet = new Set(selectedThematics);
                      if (isThematicSelected) {
                        thematicSet.delete(thematic.id);
                      } else {
                        thematicSet.add(thematic.id);
                      }
                      setSelectedThematics(thematicSet);
                    }}
                    key={thematic.id}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${
                    isThematicSelected
                      ? "border border-blue-500 bg-blue-600 text-white "
                      : "border bg-gray-100 text-gray-800 shadow-sm"
                  }
                  `}
                  >
                    {thematic.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="mt-3 text-base font-bold">Description du projet</h2>

          <ul className="flex list-disc flex-col gap-2 text-sm text-gray-800">
            {descriptionDuProjet.map((listItem) => (
              <li key={listItem.substring(0, 10)}>{listItem}</li>
            ))}
          </ul>
        </div>

        {textAreaSections.map((textArea) => {
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
          {checkBoxesAtEndOfForm.map(({ id, name, notes }) => (
            <div key={id} className="group relative">
              <div className="items-center gap-2">
                <CheckBoxInput id={id} name={name} label={name} />
                {notes &&
                  notes.map((note) => {
                    return (
                      <div
                        key={note.substring(0, 10)}
                        className="mt-3 flex flex-col gap-2 px-7"
                      >
                        <span className="text-sm text-gray-500">{note}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="border p-9">
          <h2 className="my-3 text-base font-bold">Attestation</h2>
          <div className="flex flex-col gap-4">
            {attestations.map((attestation) => (
              <blockquote
                key={attestation.substring(0, 10)}
                className="text-sm"
              >
                {attestation}
              </blockquote>
            ))}
          </div>

          <div className="flex py-5">
            {selectedFile && selectedFile[0]?.fileUrl ? (
              <div className="h-22 flex w-64 items-center justify-center border">
                <Image
                  src={selectedFile[0].fileUrl}
                  alt="signuature"
                  className="h-[4rem] w-32"
                  width={128}
                  height={64}
                />
              </div>
            ) : selectedFile != undefined && isFileLoading ? (
              <div className="h-22 flex w-64 items-center justify-center border">
                <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <div className="h-22 flex w-64 items-center justify-center border">
                <Signature className="h-[4rem] w-32 text-gray-400" />
              </div>
            )}

            <UploadThingButton
              handleUploadComplete={(res) => {
                if (res !== undefined) {
                  setSelectedFile(res);
                }
              }}
            />
          </div>
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
