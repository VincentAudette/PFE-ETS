import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Clickable from "./Clickable";
import classNames from "../utils/classNames";

const statuses = {
  offline: "text-gray-500 bg-gray-100/10",
  online: "text-green-400 bg-green-400/10",
  error: "text-rose-400 bg-rose-400/10",
};

const trimesters = {
  WINTER: {
    class: "text-blue-400 bg-blue-400/10 ring-blue-400/20",
    displayName: "Hiver",
  },
  SUMMER: {
    class: "text-yellow-400 bg-yellow-400/10 ring-yellow-400/20",
    displayName: "Été",
  },
  AUTUMN: {
    class: "text-orange-400 bg-orange-400/10 ring-orange-400/20",
    displayName: "Automne",
  },
};

const GroupCard: React.FC<{
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
                // getStatusPhase(project.states[0]?.state as ProjectStatusUnion),
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
                {project.id}---{project.students[0]?.firstName}---
                {JSON.stringify(project)}
                {/* <span className="tuncate">{project.organization.name}</span>
                <span className="text-neutral-400">/</span>
                <span className="min-w-max">{project.pfeId}</span>
                <span className="text-neutral-400">-</span>
                <span
                  className={`max-w-xs ${
                    expandedView ? " lg:max-w-2xl" : ""
                  } truncate whitespace-nowrap`}
                >
                  {project.title}
                </span> */}
                <span className="absolute inset-0" />
              </Clickable>
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-neutral-600">
            {/* <p className="truncate">{departments[project.mainDepartmentId]}</p>
            <span className="text-neutral-300">&middot;</span>
            <p className="whitespace-nowrap uppercase">
              {projectStatusMap.get(project.states[0]?.state as ProjectStatus)}
            </p> */}
            <span className="text-neutral-300">&middot;</span>
            <p className="whitespace-nowrap uppercase">
              {" "}
              {
                // trimesters[project.trimester as keyof typeof trimesters]
                //   .displayName
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

/*
const GroupCard: React.FC<{
  group: inferProcedureOutput<AppRouter["group"]["all"]>[number];
}> = ({ group }) => {
  return (
    // <div>Hello</div>
    <button className="w-full rounded-lg border bg-white p-4 text-left shadow-sm transition-all hover:scale-[101%]">
      <li key={group.id} className="relative flex items-center space-x-4 py-4">
        <div className="min-w-0 flex-auto">
          <div className="flex items-center gap-x-3">
            <div
              className={classNames(
                statuses["online"],
                "flex-none rounded-full p-1",
              )}
            >
              <div className="h-2 w-2 rounded-full bg-current" />
            </div>
            <h2 className="min-w-0 text-sm font-semibold leading-6 text-black">
              <Link
                href={`#`}
                // href={`projects/${group.projectId}`}
                className="flex gap-x-2"
              >
                <span className="truncate">{group.students.toString()}</span>
                <span className="text-gray-400">/</span>
                <span>{group.project.pfeId}</span>
                <span className="text-stone-600">-</span>
                <span className="whitespace-nowrap">{group.project.title}</span>
                <span className="absolute inset-0" />
              </Link>
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
            <p className="truncate">{group.project.description}</p>
            <span className="text-stone-300">&middot;</span>
            <p className="whitespace-nowrap">INSERT STATUS</p>
          </div>
        </div>
        <div
          className={classNames(
            trimesters[group.project.trimester as keyof typeof trimesters]
              .class,
            "flex-none rounded-full py-1 px-2 text-xs font-medium ring-1 ring-inset",
          )}
        >
          {
            trimesters[group.project.trimester as keyof typeof trimesters]
              .displayName
          }{" "}
          {group.project.year}
        </div>
        <ChevronRightIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </li>
    </button>
  );
};
*/
export default GroupCard;
