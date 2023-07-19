import Head from "next/head";
import TopNav from "../../../components/TopNav";
import GroupListView from "../../../components/GroupListView";
import AdminView from "../../../components/RoleViews/AdminView";

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
            {
              name: "Nouveau projet",
              href: "/admin/group/list",
              current: true,
            },
          ]}
        />
        <AdminView>
          <GroupListView />
        </AdminView>
      </main>
    </>
  );
}
