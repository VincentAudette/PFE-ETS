import Head from "next/head";
import { trpc } from "../../utils/trpc";
import TopNav from "../../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../../context/PFEAuthContext";
import { useEffect } from "react";
import Link from "next/link";
import UnregisteredView from "../../components/RoleViews/UnregisteredView";
import LoadingPFE from "../../components/LoadingPFE";

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
        {isLoading ? (
          <LoadingPFE />
        ) : (
          userData === null && (
            <div>
              NOT AUTHORIZED
              <Link href="/login"></Link>
            </div>
          )
        )}
        {activeRole === "UNREGISTERED" && <UnregisteredView />}
      </main>
    </>
  );
}
