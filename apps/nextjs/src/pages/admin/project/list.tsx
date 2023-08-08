import Head from "next/head";
import TopNav from "../../../components/TopNav";
import ProjectListView from "../../../components/ProjectListView";
import {
  Navigation,
  SecondaryNavigation,
} from "../../../components/RoleViews/AdminView";
import { useState } from "react";
import SideBarLayout from "../../../components/SideBarLayout";
import ProjectView from "../../../components/ProjectView";
import { Project } from "@acme/db";
import { useRouter } from "next/router";
export default function NewProject() {
  const [project, setProject] = useState<any>(null);
  const router = useRouter();

  let projectId = "";
  if (router.query.focus) {
    projectId = router.query.focus as string;
  }

  function onSetProject(project: Project) {
    router.query.focus = project.id;
    router.replace({
      query: {
        focus: project.id,
      },
    });
    setProject(project);
    projectId = projectId;
  }

  return (
    <>
      <Head>
        <title>
          Nouveau PFE - Projet de fin d&apos;études - École de Technologie
          Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TopNav
          pages={[
            {
              name: "Nouveau projet",
              href: "/admin/project/new",
              current: true,
            },
          ]}
        />
        <SideBarLayout
          navigation={Navigation(2)}
          secondaryNavigation={SecondaryNavigation()}
          showRightSide={projectId !== ""}
          rightSide={
            projectId && (
              <div className="flex h-full w-full grow flex-col gap-3 overflow-y-scroll">
                <ProjectView projectId={projectId} />
              </div>
            )
          }
        >
          <ProjectListView project={project} setProject={onSetProject} />
        </SideBarLayout>
      </main>
    </>
  );
}
