import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { projectStatusMap } from "./ProjectView";
import { ProjectStatus } from "@acme/db";

enum ProjectPhases {
  PROGRESSION = "progression",
  EXAMINATION = "examination",
  ADJUSTMENT = "adjustment",
  CHALLENGE = "challenge",
  REVISION = "revision",
}

const projectPhases: Record<ProjectPhases, string> = {
  progression: "text-emerald-500 bg-emerald-100/10",
  examination: "text-yellow-500 bg-yellow-100/5 0",
  adjustment: "text-orange-400 bg-orange-400/10",
  challenge: "text-rose-400 bg-rose-400/10",
  revision: "text-blue-500 bg-blue-100/10",
};

type ProgressionStatus =
  | "DRAFT"
  | "ACCEPTED"
  | "GROUP_CREATION"
  | "READY"
  | "IN_PROGRESS"
  | "COMPLETE";
type ExaminationStatus =
  | "EVALUATION"
  | "WAITING_FOR_TRIMESTER"
  | "WAITING_FOR_ENROLMENT"
  | "ENROLMENT"
  | "APPROBATION"
  | "GROUP_VALIDATION"
  | "NEXT_PHASE";
type AdjustmentStatus = "TEACHER_NEEDED" | "ADJUSTMENT" | "GROUP_CORRECTION";
type ChallengeStatus = "REJECTED" | "INVALID" | "NOT_SELECTED" | "ENDED";
type RevisionStatus = "REPROPOSAL";

// Union type of all statuses
type ProjectStatusUnion =
  | ProgressionStatus
  | ExaminationStatus
  | AdjustmentStatus
  | ChallengeStatus
  | RevisionStatus;

const progressionStatuses = [
  "DRAFT",
  "ACCEPTED",
  "READY",
  "IN_PROGRESS",
  "GROUP_CREATION",
  "COMPLETE",
] as const;

const examinationStatuses = [
  "EVALUATION",
  "WAITING_FOR_TRIMESTER",
  "WAITING_FOR_ENROLMENT",
  "ENROLMENT",
  "APPROBATION",
  "GROUP_VALIDATION",
  "NEXT_PHASE",
] as const;

const adjustmentStatuses = [
  "TEACHER_NEEDED",
  "ADJUSTMENT",
  "GROUP_CORRECTION",
] as const;

const challengeStatuses = [
  "REJECTED",
  "INVALID",
  "NOT_SELECTED",
  "ENDED",
] as const;

const revisionStatuses = ["REPROPOSAL"] as const;

export const getStatusPhase = (status: ProjectStatusUnion): string => {
  if (progressionStatuses.includes(status as ProgressionStatus)) {
    return projectPhases[ProjectPhases.PROGRESSION];
  } else if (examinationStatuses.includes(status as ExaminationStatus)) {
    return projectPhases[ProjectPhases.EXAMINATION];
  } else if (adjustmentStatuses.includes(status as AdjustmentStatus)) {
    return projectPhases[ProjectPhases.ADJUSTMENT];
  } else if (challengeStatuses.includes(status as ChallengeStatus)) {
    return projectPhases[ProjectPhases.CHALLENGE];
  } else if (revisionStatuses.includes(status as RevisionStatus)) {
    return projectPhases[ProjectPhases.REVISION];
  } else {
    throw new Error(`Unhandled status: ${status}`);
  }
};

const trimesters = {
  WINTER: {
    class: "text-blue-700 bg-blue-400/10 ring-blue-400/20",
    displayName: "Hiver",
  },
  SUMMER: {
    class: "text-yellow-700 bg-yellow-400/10 ring-yellow-400/20",
    displayName: "Été",
  },
  AUTOMNE: {
    class: "text-orange-700 bg-orange-400/10 ring-orange-400/20",
    displayName: "Automne",
  },
};

export const departments: Record<string, string> = {
  ele: "ÉLÉ",
  log_ti: "LOG/TI",
  ctn: "CTN",
  gol: "GOL",
  gpa: "GPA",
  mec: "MEC",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Clickable({ children, className, isButton, ...props }: any) {
  return isButton ? (
    <>
      <button
        className={classNames("hidden gap-x-2 sm:flex", className)}
        {...props}
      >
        {children}
      </button>
      {/* Mobile will only show link*/}
      <Link
        className={classNames("flex gap-x-2 sm:hidden", className)}
        {...props}
      >
        {children}
      </Link>
    </>
  ) : (
    <Link className={classNames("flex gap-x-2", className)} {...props}>
      {children}
    </Link>
  );
}

const ProjectCard: React.FC<{
  project: inferProcedureOutput<AppRouter["project"]["get"]>;
  buttonHandler?: () => void;
  selectedProjectId?: string;
  expandedView?: boolean;
}> = ({ project, buttonHandler, selectedProjectId, expandedView = false }) => {
  if (!project) return null;
  return (
    <button
      className={`w-full ${
        project.id === selectedProjectId ? "bg-neutral-50" : "bg-white"
      } max-h-48 grow p-4 text-left shadow-sm transition-all hover:scale-[101%]`}
    >
      <li
        key={project.id}
        className="relative flex items-center space-x-4 py-4"
      >
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-x-3">
            <div
              className={classNames(
                getStatusPhase(project.states[0]?.state as ProjectStatusUnion),
                "flex-none rounded-full p-1",
              )}
            >
              <div className="h-2 w-2 rounded-full bg-current" />
            </div>
            <h2 className="min-w-0 text-sm font-semibold leading-6 text-black">
              <Clickable
                href={`projets/${project.id}`}
                className="flex gap-x-2"
                onClick={buttonHandler}
                isButton={!!buttonHandler}
              >
                <span className="tuncate">{project.organization.name}</span>
                <span className="text-neutral-400">/</span>
                <span className="min-w-max">{project.pfeId}</span>
                <span className="text-neutral-400">-</span>
                <span
                  className={`max-w-xs ${
                    expandedView ? " lg:max-w-2xl" : ""
                  } truncate whitespace-nowrap`}
                >
                  {project.title}
                </span>
                <span className="absolute inset-0" />
              </Clickable>
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-600">
            <p className="truncate">{departments[project.mainDepartmentId]}</p>
            <span className="text-neutral-300">&middot;</span>
            <p className="whitespace-nowrap uppercase">
              {projectStatusMap.get(
                project.states[project.states.length - 1]
                  ?.state as ProjectStatus,
              )}
            </p>
            <span className="text-neutral-300">&middot;</span>
            <p className="whitespace-nowrap uppercase">
              {" "}
              {
                trimesters[project.trimester as keyof typeof trimesters]
                  .displayName
              }{" "}
              {project.year}
            </p>
          </div>
        </div>
        {/* <div className="flex-none rounded-full py-1 px-2 text-xs font-medium ring-1 ring-inset ring-neutral-400/30"></div> */}
        <ChevronRightIcon
          className="h-5 w-5 flex-none text-neutral-400"
          aria-hidden="true"
        />
      </li>
    </button>
  );
};

export default ProjectCard;
