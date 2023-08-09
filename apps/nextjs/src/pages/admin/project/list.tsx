import Head from "next/head";
import TopNav from "../../../components/TopNav";
import ProjectListView from "../../../components/ProjectListView";
import {
  Navigation,
  SecondaryNavigation,
} from "../../../components/RoleViews/AdminView";
import { useEffect, useState } from "react";
import SideBarLayout from "../../../components/SideBarLayout";
import ProjectView from "../../../components/ProjectView";
import { Project } from "@acme/db";
import { useRouter } from "next/router";
import LoadingPFE from "../../../components/LoadingPFE";
import UnregisteredView from "../../../components/RoleViews/UnregisteredView";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import { trpc } from "../../../utils/trpc";

export default function NewProject() {
  const [project, setProject] = useState<any>(null);
  const { isSignedIn, userId: clerkId } = useAuth();
  const { data: getUserData, isLoading } = trpc.auth.getUser.useQuery(
    clerkId as string,
    {
      enabled: !!isSignedIn,
    },
  );
  const { userData, setUserData, authProfile } = usePFEAuth();
  useEffect(() => {
    if (getUserData !== undefined && authProfile === null) {
      setUserData(getUserData);
    }
  });
  const activeRole = authProfile !== null ? authProfile : userData?.role;
  if (isLoading) {
    return <LoadingPFE />;
  }
  if (!isSignedIn || activeRole !== "ADMIN") {
    return <UnregisteredView />;
  }

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
