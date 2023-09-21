import Head from "next/head";
import { trpc } from "../utils/trpc";
import TopNav from "../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../context/PFEAuthContext";
import { useEffect } from "react";
import UnregisteredView from "../components/RoleViews/UnregisteredView";
import LoadingPFE from "../components/LoadingPFE";
import DeveloperView from "../components/RoleViews/DeveloperView";
import Unauthorized from "../components/Unauthorized";

export default function Home() {
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

  if (!isSignedIn || activeRole !== "DEVELOPER") {
    return (
      <Unauthorized isLoading={isLoading} isSignedIn={isSignedIn ?? false} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Projet de fin d&apos;études - École de Technologie Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <TopNav />
        {isLoading && <LoadingPFE />}
        <DeveloperView />
      </main>
    </>
  );
}
