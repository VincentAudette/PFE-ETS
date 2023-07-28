import { SelectOption } from "../atoms/SimpleSelect";

export const representativePlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  phone: "Téléphone",
  email: "representant@etsmtl.ca",
};

export const etudiantPlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  email: "prenom.nom.1@ens.etsmtl.ca",
  department: "Departement",
};

export const teacherPlaceholderObj = {
  id: null,
  firstName: "Prénom",
  lastName: "Nom de famille",
  phone: "Téléphone",
  email: "prenom.nom@etsmtl.ca",
};

export const trimesters: SelectOption[] = [
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

export type DepartmentType = "ELE" | "LOG_TI" | "MEC" | "GPA" | "GOL" | "CTN";
export type DepartmentOption = {
  id: string;
  name: string;
  type: DepartmentType | null;
};

export const department: DepartmentOption[] = [
  {
    id: "0",
    name: "Choisir un département",
    type: null,
  },
  {
    id: "ele",
    name: "Génie électrique",
    type: "ELE",
  },
  {
    id: "log_ti",
    name: "Génie logiciel et des TI",
    type: "LOG_TI",
  },
  {
    id: "mec",
    name: "Génie mécanique",
    type: "MEC",
  },
  {
    id: "gpa",
    name: "Génie de la production automatisée",
    type: "GPA",
  },
  {
    id: "gol",
    name: "Génie des opérations et de la logistique",
    type: "GOL",
  },
  {
    id: "ctn",
    name: "Génie de la construction",
    type: "CTN",
  },
];

export const encouragementTypes: SelectOption[] = [
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
    name: "Sur demande",
    type: "UPON_REQUEST",
  },
  {
    id: "3",
    name: "Aucun encadrement",
    type: "NO_ENCOURAGEMENT",
  },
];

export const textAreaSections: {
  name: FieldKey;
  label: string;
  placeholder: string;
}[] = [
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

export const checkBoxesAtEndOfForm = [
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

export const attestations = [
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

export const descriptionDuProjet = [
  "Il doit développer des éléments, des systèmes et des processus qui répondent à des besoins précis",
  "Il doit s'agir d'un processus créatif, itératif et évolutif assujetti à des contraintes (l’économie, la santé, la sécurité, l’environnement, la société, etc.)",
  "Tous les projets doivent être approuvés par le département pour assurer le respect des exigences et pour la poursuite du processus",
];

export const years = (): SelectOption[] => {
  const currentYear = new Date().getFullYear();
  const years = [{ id: "annee-0", name: "Choisir une année" }];
  for (let i = 0; i < 3; i++) {
    years.push({ id: `annee-${currentYear + i}`, name: currentYear + i + "" });
  }
  return years;
};

export interface PFEFormElement extends HTMLFormElement {
  acceptsConfidentiality: HTMLInputElement;
  authorizesCloudComputing: HTMLInputElement;
  authorizesCloudOutsideQuebec: HTMLInputElement;
  mustRespectRegulations: HTMLInputElement;
  projectTitle: { value: string };
  numberOfStudents: { value: string };
  numberOfTeams: { value: string };
}

export interface PFEStateFormElement extends HTMLFormElement {
  state: {value: string}
}

export interface Field {
  value: string;
  error?: string;
  label?: string;
}

export type FieldKey =
  | "projectTitle"
  | "otherThematics"
  | "requiredSkills"
  | "description"
  | "contextProblematic"
  | "expectedResults"
  | "needsConstraints"
  | "objectives"
  | "numberOfStudents"
  | "numberOfTeams";

export type PfeFormInputFields = Record<FieldKey, Field>;

export const pfeFormInputFields: PfeFormInputFields = {
  projectTitle: { value: "", error: "", label: "titre du projet" },
  otherThematics: { value: "" },
  requiredSkills: { value: "", error: "", label: "expertises requises" },
  description: { value: "", error: "", label: "description du projet" },
  contextProblematic: {
    value: "",
    error: "",
    label: "contexte et problématique",
  },
  expectedResults: {
    value: "",
    error: "",
    label: "résultats et livrables attendus",
  },
  needsConstraints: { value: "", error: "", label: "besoins et contraintes" },
  objectives: { value: "", error: "", label: "objectifs du projet" },
  numberOfStudents: { value: "", error: "", label: "nombre d'étudiants" },
  numberOfTeams: { value: "", error: "", label: "nombre d'équipes" },
};

export type SelectKeys =
  | "department"
  | "trimester"
  | "year"
  | "encouragementType";

export const selectValidationDefault: Record<SelectKeys, boolean> = {
  department: false,
  trimester: false,
  year: false,
  encouragementType: false,
};
