import Head from "next/head";
import TopNav from "../../../../components/TopNav";
import { NextRouter, useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import UpdateProjectSate from "../../../../components/UpdateProjectState";
import { Project } from "@acme/db";
import SideBarLayout from "../../../../components/SideBarLayout";
import {
  Navigation,
  SecondaryNavigation,
} from "../../../../components/RoleViews/AdminView";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import LoadingPFE from "../../../../components/LoadingPFE";
import UnregisteredView from "../../../../components/RoleViews/UnregisteredView";
import { usePFEAuth } from "../../../../context/PFEAuthContext";

export default function NewProject() {
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

  const router: NextRouter = useRouter();
  const projectId = router.query.id as string;
  const { data: project, isLoading: isProjectLoading } =
    trpc.project.get.useQuery(projectId, {
      enabled: !!projectId,
    });
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
              href: "promoter/projet/new",
              current: true,
            },
          ]}
        />
        <SideBarLayout
          navigation={Navigation(2)}
          secondaryNavigation={SecondaryNavigation()}
        >
          {isProjectLoading ? (
            <div></div>
          ) : (
            <UpdateProjectSate
              project={project}
              // selectedState={selectedState}
              // setSelectedState={setSelectedState}
            ></UpdateProjectSate>
          )}
        </SideBarLayout>
      </main>
    </>
  );
}
