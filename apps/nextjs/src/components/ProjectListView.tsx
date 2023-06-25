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

  export default function PromoterView({
    children,
  }: {
    children?: React.ReactNode;
  }) {
    const router: NextRouter = useRouter();
  
    console.log("router.asPath", router.asPath);
  
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
  
    console.log("filterSelections", filterSelections);
  
    // Initialize state
    const [filteredProjects, setFilteredProjects] = useState([]);
  
    // In your map function
    useEffect(() => {
      if (userData?.promoter?.projects?.length > 0) {
        const newFilteredProjects = userData.promoter.projects.filter(
          (project_x: any) => {
            const filterStatus =
              filterSelections.status.length === 0 ||
              filterSelections.status.includes(project_x.states[0]?.state);
            const filterDepartment =
              filterSelections.department.length === 0 ||
              project_x.departments.some((dept: any) =>
                filterSelections.department.includes(dept.departmentId),
              );
            const filterOrganization =
              filterSelections.organization.length === 0 ||
              filterSelections.organization.includes(project_x.organization.id);
  
            return filterStatus && filterDepartment && filterOrganization;
          },
        );
  
        setFilteredProjects(newFilteredProjects);
      }
    }, [userData, filterSelections]);
  
    // if (userData.role === "UNASSIGNED") {
    //   return <div>TEST</div>;
    // }
  
    const [project, setProject] = useState<any>(null);
  
    return (
        <div className="flex h-auto w-full grow overflow-y-scroll">
          {router.pathname === "/" &&
          // Si on a des projets
            (userData?.promoter?.projects.length >= 1 ? (
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
                    // Si on a des projet filtrer
                    filteredProjects.map((project_x: any) => (
                      // OSTP: contient TOUTE la page des projets
                      <ProjectCard
                        expandedView={project === null}
                        selectedProjectId={
                          project_x.id === project?.id && project.id
                        }
                        buttonHandler={() => setProject(project_x)}
                        key={project_x.id}
                        project={project_x}
                      />
                    ))
                  ) : (
                    // Si on a aucun projet filtrer
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
            ) : ( 
              // Si on a aucun PFE
              <div className=" mx-auto">
                <div className=" mx-auto flex h-full flex-col items-center justify-center gap-1 sm:gap-5 lg:flex-row">
                  <p>Vous n&apos;avez pas de PFE en cours.</p>
                  <span>
                    <Link
                      className=" rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-500"
                      href="/projets/new"
                    >
                      Débuter un nouveau PFE &rarr;
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          {children}
        </div>
    );
  }
  