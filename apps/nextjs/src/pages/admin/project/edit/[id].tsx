import Head from "next/head";
import TopNav from "../../../../components/TopNav";
import { NextRouter, useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import UpdateProjectSate from "../../../../components/UpdateProjectState";
import { Project } from "@acme/db";
import SideBarLayout from "../../../../components/SideBarLayout";
import {
  navigation,
  secondaryNavigation,
} from "../../../../components/RoleViews/AdminView";
import ProjectView from "../../../../components/ProjectView";

export default function NewProject() {
  const router: NextRouter = useRouter();
  const projectId = router.query.id as string;
  // const { userData } = usePFEAuth();
  // userData?.admin?.departments?.length;
  const { data: project, isLoading: isProjectLoading } =
    trpc.project.get.useQuery(projectId, {
      enabled: !!projectId,
    });

  // const data = trpc.project.get.useQuery();
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
          navigation={navigation(2)}
          secondaryNavigation={secondaryNavigation()}
          // showRightSide={project !== null}
          // rightSide={
          //   project && (
          //     <div className="flex h-full w-full grow flex-col gap-3 overflow-y-scroll">
          //       <ProjectView projectId={project.id} />
          //     </div>
          //   )
          // }
        >
          {/* {router.query.id as string} */}
          {isProjectLoading ? (
            <div></div>
          ) : (
            <UpdateProjectSate
              project={project as Project}
              // selectedState={selectedState}
              // setSelectedState={setSelectedState}
            ></UpdateProjectSate>
          )}
        </SideBarLayout>
      </main>
    </>
  );
}
