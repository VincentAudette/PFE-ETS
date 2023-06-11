import Head from "next/head";
import PromoterView from "../../components/RoleViews/PromoterView";
import TopNav from "../../components/TopNav";
import PFEForm from "../../components/Forms/PFEForm";

export default function NewProject() {
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
            { name: "Nouveau projet", href: "/projets/new", current: true },
          ]}
        />
        <PromoterView>
          <PFEForm />
        </PromoterView>
      </main>
    </>
  );
}
