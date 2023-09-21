/* eslint-disable @next/next/no-img-element */
import {
  Department,
  EncouragementType,
  ProjectStatus,
  Representative,
  RepresentativeOnProject,
  Student,
  Teacher,
  TeacherOnProject,
  Trimester,
} from "@acme/db";
import { departments } from "./ProjectCard";
import PersonDetails from "./PersonDetails";
import moment from "moment";
import "moment/locale/fr";
import "../styles/globals.css";
import { Body, Head, Html, Tailwind } from "@react-email/components";

interface TeachOnProj extends TeacherOnProject {
  teacher: Teacher;
}

interface RepOnProj extends RepresentativeOnProject {
  representative: Representative;
}

interface StudentWithDepartment extends Student {
  department: Department;
}

const trimestersMap = new Map<Trimester, string>([
  ["WINTER", "Hiver"],
  ["AUTOMNE", "Automne"],
  ["SUMMER", "Été"],
]);

const encandrementsMap = new Map<EncouragementType, string>([
  ["WEEKLY", "Par semaine"],
  ["UPON_REQUEST", "Sur demande"],
  ["NO_ENCOURAGEMENT", "Aucun encadrement"],
]);

const projectStatusMap = new Map<ProjectStatus, string>([
  ["DRAFT", "Brouillon"],
  ["EVALUATION", "Évaluation"],
  ["APPROBATION", "Approbation"],
  ["INVALID", "Invalide"],
  ["REJECTED", "Rejeté"],
  ["ADJUSTMENT", "Ajustement"],
  ["ACCEPTED", "Accepté"],
  ["WAITING_FOR_ENROLMENT", "En attente d'inscription"],
  ["ENROLMENT", "Inscription"],
  ["PFE_SELECTION", "Sélection PFE"],
  ["GROUP_CREATION", "Création de groupe"],
  ["GROUP_VALIDATION", "Validation de groupe"],
  ["TEACHER_NEEDED", "Besoin d'un enseignant"],
  ["GROUP_CORRECTION", "Correction de groupe"],
  ["READY", "Prêt"],
  ["NOT_SELECTED", "Non sélectionné"],
  ["WAITING_FOR_TRIMESTER", "En attente du trimestre"],
  ["IN_PROGRESS", "En cours"],
  ["COMPLETE", "Complet"],
  ["NEXT_PHASE", "Prochaine phase"],
  ["ENDED", "Terminé"],
  ["REPROPOSAL", "Nouvelle proposition]"],
]);

const CheckCircle = ({ className }: any) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function ProjectEmail({ project }: { project: any }) {
  const students = project?.group?.students as StudentWithDepartment[];
  const signatureFile = project?.files?.find(
    (file: any) => file.type === "IMAGE",
  );
  const promoterFirstLastName = `${project?.promoter.user.firstName} ${project?.promoter.user.lastName}`;
  const firstState = project?.states?.[0];
  let departmentString = "";
  const departmentStrings = project?.departments.map((dept: any) =>
    dept.departmentId == project?.mainDepartmentId
      ? `${departments[dept.departmentId]}`
      : departments[dept.departmentId],
  );
  departmentString = departmentStrings?.join(", ") as string;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Body>
          <div className=" mx-auto mt-10 mb-32 w-[465px]">
            <div className="flex gap-2 text-xl font-bold">
              <span>{project?.organization.name}</span>
              <span className=" text-stone-500">/</span>
              <span>{project?.pfeId}</span>
            </div>
            <h1 className="leading-20 mt-3 text-3xl font-semibold">
              {project?.title}
            </h1>
            <div className="my-10 flex justify-around divide-x overflow-x-scroll border-y bg-stone-50 py-5 shadow-sm ">
              {[
                {
                  title: "Trimèstre",
                  value: `${trimestersMap.get(
                    project?.trimester as Trimester,
                  )} ${project?.year}`,
                },
                {
                  title: project?.isMultiDepartment
                    ? "Départements"
                    : "Département",
                  value: departmentString,
                  // subtext: project?.isMultiDepartment ? departementPrincipal : null,
                },
                {
                  title: "Encadrement",
                  value: encandrementsMap.get(
                    project?.encouragementType as EncouragementType,
                  ),
                },
                {
                  title: "Statut",
                  value: projectStatusMap.get(firstState?.state || "DRAFT"),
                },
              ].map(({ title, value }, i) => (
                <div key={title} className={`${i > 0 ? "pl-3" : ""} min-w-max`}>
                  <p className="text-sm text-stone-500">{title}</p>
                  <p className="py-2 text-lg text-stone-800">{value}</p>
                  {/* {subtext !== null && (
                <p className="text-xs text-stone-600">{subtext}</p>
              )} */}
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500">Thématiques</p>
            <ul className="flex flex-wrap gap-2 py-2 text-sm text-stone-800">
              {project?.thematics?.map(({ thematic }: any) => (
                <li
                  className="inline-flex items-center  rounded-full  border bg-stone-100 px-2.5 py-0.5 font-medium  shadow-sm"
                  key={thematic.id}
                >
                  {thematic.name}
                </li>
              ))}
              {project?.otherThematics && (
                <li className="mt-4">
                  <span className="text-stone-500">Autres thématiques : </span>
                  <span className=" font-medium ">
                    {project?.otherThematics}
                  </span>
                </li>
              )}
            </ul>
            <div className="h-5" />
            <p className="text-sm text-stone-500">Expertises requises</p>
            <p className="flex flex-wrap gap-2 py-2 text-lg text-stone-800">
              {project?.requiredSkills}
            </p>
            <hr className="my-10" />
            <ul className="flex flex-col gap-10">
              {[
                { title: "Description", value: project?.description },
                {
                  title: "Contexte et problématique",
                  value: project?.contextProblematic,
                },
                { title: "Objectifs du projet", value: project?.objectives },
                {
                  title: "Résultats attendus",
                  value: project?.expectedResults,
                },
              ].map(({ title, value }) => (
                <li key={title}>
                  <p className="text-sm text-stone-500">{title}</p>
                  <p className="mt-2 text-lg">{value}</p>
                </li>
              ))}
            </ul>

            <div className="h-10" />

            <section className="flex max-w-2xl flex-col gap-3 text-base">
              <hr className="my-5" />
              <h2 className=" text-xl font-bold">Encadrement</h2>
              {project?.teachers && (
                <div>
                  <ul role="list" className="divide-y divide-stone-100">
                    <PersonDetails
                      name={promoterFirstLastName}
                      role={`Promoteur`}
                      email={project?.promoter.user.email}
                      phone={project?.promoter.user?.phone}
                    />
                    {project?.representatives.map(
                      (representativesOnProject: RepOnProj) => {
                        const representative =
                          representativesOnProject.representative as Representative;
                        return (
                          <PersonDetails
                            key={representative.email}
                            name={`${representative.firstName} ${representative.lastName}`}
                            role="Représentant"
                            email={representative.email}
                            phone={representative.phone}
                          />
                        );
                      },
                    )}
                    {project?.teachers.map((teacherOnProject: TeachOnProj) => {
                      const teacher = teacherOnProject.teacher as Teacher;
                      return (
                        <PersonDetails
                          key={teacher.email}
                          name={`${teacher.firstName} ${teacher.lastName}`}
                          role="Enseignant"
                          email={teacher.email}
                          phone={teacher.phone}
                        />
                      );
                    })}
                  </ul>
                </div>
              )}
              <hr className="my-5" />
              <div className="flex justify-between">
                <h2 className=" text-xl font-bold">Groupe</h2>
                <p className="font-semibold">
                  {project?.numberOfTeams} groupe
                  {project?.numberOfTeams &&
                    project?.numberOfTeams > 1 &&
                    "s"}{" "}
                  de {project?.numberOfStudents} étudiants
                </p>
              </div>
              <div>
                {students.map((student) => (
                  <PersonDetails
                    key={student.email}
                    name={`${student.firstName} ${student.lastName}`}
                    role="Étudiant"
                    email={student.email}
                    department={student.department.type}
                  />
                ))}
              </div>
            </section>

            <hr className="my-10" />

            <section id="legal" className="flex flex-col gap-4">
              {[
                {
                  title: "Confidentialité",
                  value:
                    "Le promoteur confirme comprendre que le projet ne peut être considéré comme confidentiel. Les étudiants présenteront leur travail devant la classe et d'autres promoteurs de projets pourraient être présents. L'ÉTS, les professeurs et les étudiants ne peuvent garantir la confidentialité du projet.",
                  answer: project?.acceptsConfidentiality,
                },
                {
                  title: "Utilisation de services d’infonuagiques",
                  value:
                    "Le promoteur autorise ou non l'utilisation de services d'infonuagiques tels que Google Drive ou Dropbox pour le stockage et le partage de documents liés au projet.",
                  answer: project?.authorizesCloudComputing,
                },
                {
                  title: "Localisation des serveurs d'infonuagiques",
                  value:
                    "Si le promoteur autorise l'utilisation de services d'infonuagiques, il précise si les serveurs doivent être localisés au Québec ou non.",
                  answer: project?.authorizesCloudOutsideQuebec,
                },
                {
                  title: "Respect des exigences réglementaires",
                  value:
                    "Le projet proposé doit respecter les exigences réglementaires en matière de contrôle à l'exportation et de protection des renseignements personnels conformément à la législation applicable. L'ÉTS ne permet pas la délocalisation des données dans un territoire offrant moins de garanties qu'au Québec en matière de protection des renseignements personnels.",
                  answer: project?.mustRespectRegulations,
                },
              ].map(({ title, value, answer }) => (
                <div key={title} className="flex items-start">
                  {answer ? (
                    <div className="mt-3 flex items-center justify-items-center gap-2 rounded-md bg-green-50 py-2 px-3 text-green-800">
                      <p className="my-auto min-w-max text-sm">Oui</p>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center justify-items-center gap-2 rounded-md bg-red-50 py-2 px-3 text-red-800">
                      <p className="my-auto min-w-max  text-sm">Non</p>
                    </div>
                  )}
                  <div className="pl-5">
                    <span className="text-sm font-bold text-stone-800">
                      {title} :{" "}
                    </span>
                    <span className=" text-sm text-stone-800">{value}</span>
                  </div>
                </div>
              ))}
            </section>
            <hr className="my-10" />
            <div className="flex flex-col justify-between sm:flex-row">
              {signatureFile?.url && (
                <div>
                  <p className="text-sm text-stone-500">Signature</p>
                  <div className="h-22 relative flex w-64 items-center justify-center border-b">
                    <img
                      src={signatureFile?.url}
                      alt="signuature"
                      className="h-auto w-full max-w-[96px]"
                      width={128}
                      height={64}
                    />
                    <p className="absolute bottom-[-2rem] text-sm">
                      {promoterFirstLastName}
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-20 flex max-w-max flex-col border-b sm:mt-0">
                <p className="text-sm text-stone-500">Date</p>
                <div className="grow" />
                <p className="mt-8 pb-8 text-base sm:mt-0">
                  {moment(firstState?.timestamp)
                    .locale("fr")
                    .format("Do MMMM YYYY, h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </Body>
      </Html>
    </Tailwind>
  );
}
