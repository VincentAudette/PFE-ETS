import Head from "next/head";
import PromoterView from "../../components/RoleViews/PromoterView";
import TopNav from "../../components/TopNav";
import PromoterFormNewPFE from "../../components/PromoterFormNewPFE";
import { useEffect } from "react";
import { usePFEAuth } from "../../context/PFEAuthContext";
import { useAuth } from "@clerk/nextjs";
import { trpc } from "../../utils/trpc";

export default function NewProject() {
  const { isSignedIn, userId: clerkId } = useAuth();
  const { data: getUserData } = trpc.auth.getUser.useQuery(clerkId as string, {
    enabled: !!isSignedIn,
  });

  const { userData, setUserData, authProfile } = usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined && authProfile === null) {
      setUserData(getUserData);
    }
  });
  console.log("authProfile", authProfile);

  const activeRole = authProfile !== null ? authProfile : userData?.role;
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
          isSignedIn={isSignedIn}
          activeRole={activeRole}
        />
        <PromoterView>
          <PromoterFormNewPFE />
        </PromoterView>
      </main>
    </>
  );
}
