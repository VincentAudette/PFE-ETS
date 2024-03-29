import SideBarLayout, {
  NavigationItem,
  SecondaryNavigationItem,
} from "./SideBarLayout";

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePFEAuth } from "../context/PFEAuthContext";
import InfoAlert from "./Forms/atoms/InfoAlert";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Filters, { FilterByRole } from "./Filters";
import ProjectView from "./ProjectView";
import { Project } from "@acme/db";
import { inferRouterOutputs } from "@trpc/server";
import Button from "./Forms/atoms/button";

export default function ProjectListView({
  children,
  project,
  setProject,
}: {
  children?: React.ReactNode;
  project: any;
  setProject: any;
}) {
  const { userData } = usePFEAuth();

  const [filterSelections, setFilterSelections] = useState<
    Record<"status" | "department" | "organization", string[]>
  >({
    status: [],
    department: [],
    organization: [],
  });
  const resetFilters = () => {
    setFilterSelections({
      status: [],
      department: [],
      organization: [],
    });
  };
  // Initialize state
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);

  // In your map function
  useEffect(() => {
    if (!userData) return;

    if (
      userData?.admin?.departments?.length &&
      userData?.admin?.departments?.length > 0
    ) {
      const projectsArray: any[] = [];
      userData.admin.departments.forEach((department) => {
        department.department.projectRelations.forEach((projectRelations) => {
          projectsArray.push(projectRelations.project);
        });
      });

      const newFilteredProjects = projectsArray.filter((project_x: any) => {
        const filterStatus =
          filterSelections.status.length === 0 ||
          filterSelections.status.includes(
            project_x.states[project_x.states.length - 1]?.state,
          );
        const filterDepartment =
          filterSelections.department.length === 0 ||
          project_x.departments.some((dept: any) =>
            filterSelections.department.includes(dept.departmentId),
          );
        const filterOrganization =
          filterSelections.organization.length === 0 ||
          filterSelections.organization.includes(project_x.organization.id);

        return filterStatus && filterDepartment && filterOrganization;
      });
      setFilteredProjects(newFilteredProjects);
    }
  }, [userData, filterSelections]);

  return (
    <div className="flex h-auto w-full grow">
      <div className=" flex  w-full flex-col ">
        <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4">
          <h1 className="text-sm font-bold">Projets</h1>
          <div className="grow">
            <Filters
              filterSelections={filterSelections}
              setFilterSelections={setFilterSelections}
              role="PROMOTER"
            />
          </div>
        </div>
        <ul className="flex w-full grow flex-col divide-y">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project_x: any) => (
              <ProjectCard
                expandedView={project === null}
                selectedProjectId={project_x.id === project?.id && project.id}
                buttonHandler={() => setProject(project_x)}
                key={project_x.id}
                project={project_x}
              />
            ))
          ) : (
            <div className="flex max-h-32 w-full grow items-center justify-between gap-5 bg-stone-50 px-5 py-10 ">
              <p>Aucun projet avec ces filtres</p>
              <Button
                text="Réinitialiser les filtres"
                onClick={() => resetFilters()}
              />
            </div>
          )}
        </ul>
      </div>
      {children}
    </div>
  );
}
