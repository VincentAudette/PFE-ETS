import Head from "next/head";
import PromoterView from "../../../components/RoleViews/PromoterView";
import TopNav from "../../../components/TopNav";
import PFEForm from "../../../components/Forms/PFEForm";
import AdminView from "../../../components/RoleViews/AdminView";
import SimpleSelect from "../../../components/Forms/atoms/SimpleSelect";
import { NextRouter, useRouter } from "next/router";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import { trpc } from "../../../utils/trpc";
import UpdateProjectSate from "../../../components/UpdateProjectState";
import { Project } from "@acme/db";
import { useState } from "react";

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
  console.log("===PROJECT (project [id].tsx) LOADING===");
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
        {router.query.id as string}
        {isProjectLoading ? (
          <div></div>
        ) : (
          <UpdateProjectSate
            project={project as Project}
            // selectedState={selectedState}
            // setSelectedState={setSelectedState}
          ></UpdateProjectSate>
        )}
      </main>
    </>
  );
}
