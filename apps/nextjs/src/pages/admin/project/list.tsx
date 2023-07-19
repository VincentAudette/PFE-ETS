import Head from "next/head";
import TopNav from "../../../components/TopNav";
import ProjectListView from "../../../components/ProjectListView";
import AdminView from "../../../components/RoleViews/AdminView";
import {
  navigation,
  secondaryNavigation,
} from "../../../components/RoleViews/AdminView";
import { useState } from "react";
import SideBarLayout from "../../../components/SideBarLayout";
import ProjectView from "../../../components/ProjectView";

export default function NewProject() {
  const [project, setProject] = useState<any>(null);

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
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
          showRightSide={project !== null}
          rightSide={
            project && (
              <div className="flex h-full w-full grow flex-col gap-3 overflow-y-scroll">
                <ProjectView projectId={project.id} />
              </div>
            )
          }
        >
          <ProjectListView project={project} setProject={setProject} />
        </SideBarLayout>
      </main>
    </>
  );
}
