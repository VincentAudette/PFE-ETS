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
import { NextRouter, useRouter } from "next/router";
import { usePFEAuth } from "../context/PFEAuthContext";
import InfoAlert from "./Forms/atoms/InfoAlert";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Filters, { FilterByRole } from "./Filters";
import ProjectView from "./ProjectView";
import { Project } from "@acme/db";
import { inferRouterOutputs } from "@trpc/server";
import Button from "./Forms/atoms/button";
import GroupCard from "./GroupCard";

export default function GroupListView({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router: NextRouter = useRouter();

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
  const [filteredProjects, setFilteredProjects] = useState([]);

  // TEMP PATCH, SHOULD BE IN USEREFFECT()
  const departmentOnProjectArray = [];
  const groupArray: any[] = [];
  if (
    userData?.admin?.departments?.length &&
    userData?.admin?.departments?.length > 0
  ) {
    userData.admin.departments.forEach((adminDepartement) => {
      adminDepartement.department.projectRelations.forEach(
        (departmentOnProject) => {
          departmentOnProjectArray.push(departmentOnProject);
          groupArray.push(departmentOnProject.project.group);
        },
      );
    });
  }

  // In your map function
  useEffect(() => {}, [userData, filterSelections]);

  const [project, setProject] = useState<any>(null);

  return (
    <div className="flex h-auto w-full grow overflow-y-scroll">
      <div className=" flex  w-full flex-col ">
        <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white px-4">
          <h1 className="text-sm font-bold">Projets</h1>
          <div className="grow">
            {/* <Filters
              filterSelections={filterSelections}
              setFilterSelections={setFilterSelections}
              role="PROMOTER"
            /> */}
          </div>
        </div>
        <ul className="flex w-full grow flex-col divide-y">
          {groupArray.map((project_x: any) => (
            <GroupCard
              expandedView={project === null}
              selectedProjectId={project_x.id === project?.id && project.id}
              buttonHandler={() => setProject(project_x)}
              key={project_x.id}
              project={project_x}
            />
          ))}
          {/* {filteredProjects.length > 0 ? (
            filteredProjects.map((project_x: any) => (
              // OSTP: contient TOUTE la page des projets
              <GroupCard
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
          )} */}
        </ul>
      </div>
      {children}
    </div>
  );
}
