import Head from "next/head";
import TopNav from "../../components/TopNav";
import GroupForm from "../../components/Forms/GroupForm";
import AdminView from "../../components/RoleViews/AdminView";

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
        TEST2
        <TopNav
          pages={[
            { name: "Nouveau projet", href: "/groups/list", current: true },
          ]}
        />
        <AdminView>
          <GroupForm />
          {/* <PromoterFormNewPFE /> */}
        </AdminView>
      </main>
    </>
  );
}
