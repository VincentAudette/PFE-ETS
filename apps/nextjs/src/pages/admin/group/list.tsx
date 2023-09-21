import Head from "next/head";
import TopNav from "../../../components/TopNav";
import GroupListView from "../../../components/GroupListView";
import AdminView from "../../../components/RoleViews/AdminView";
import UnregisteredView from "../../../components/RoleViews/UnregisteredView";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import LoadingPFE from "../../../components/LoadingPFE";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import { trpc } from "../../../utils/trpc";

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
