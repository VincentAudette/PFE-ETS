import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProjectCard: React.FC<{
  group: inferProcedureOutput<AppRouter["group"]["all"]>[number];
}> = ({ group }) => {
  return (
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
                href={`projects/${group.projectId}`}
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

export default ProjectCard;
