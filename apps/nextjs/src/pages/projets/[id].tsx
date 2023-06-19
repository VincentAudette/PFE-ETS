import Head from "next/head";
import TopNav from "../../components/TopNav";
import ProjectView from "../../components/ProjectView";
import { NextRouter, useRouter } from "next/router";

export default function ProjectPage() {
  const router: NextRouter = useRouter();
  return (
    <>
      <Head>
        <title>
          Vue Projet - Projet de fin d&apos;études - École de Technologie
          Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className=" print:hidden">
          <TopNav
            pages={[
              { name: "Projets", href: "/", current: false },
              {
                name: "Projet",
                href: `/projet/${router.query.id as string}`,
                current: true,
              },
            ]}
          />
        </div>

        <ProjectView onPage={true} projectId={router.query.id as string} />
      </main>
    </>
  );
}
