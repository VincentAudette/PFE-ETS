import Head from "next/head";
import { trpc } from "../utils/trpc";
import TopNav from "../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import WelcomeSection from "../components/WelcomeSection";
import { usePFEAuth } from "../context/PFEAuthContext";
import StudentView from "../components/RoleViews/StudentView";
import PromoterView from "../components/RoleViews/PromoterView";
import AdminView from "../components/RoleViews/AdminView";
import { useEffect } from "react";
import DeveloperView from "../components/RoleViews/DeveloperView";

export default function Home() {
  const { isSignedIn, userId: clerkId } = useAuth();
  const { data: getUserData } = trpc.auth.getUser.useQuery(clerkId as string, {
    enabled: !!isSignedIn,
  });

  const { userData, setUserData, authProfile } = usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined) {
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
      <main className="flex min-h-screen flex-col items-center bg-neutral-50 dark:bg-neutral-600">
        <TopNav isSignedIn={isSignedIn} activeRole={activeRole} />
        <div className=" flex w-full max-w-5xl justify-between gap-10 px-4 py-10 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
          {activeRole === "STUDENT" && <StudentView />}
          {activeRole === "PROMOTER" && <PromoterView />}
          {activeRole === "ADMIN" && <AdminView />}
          {activeRole === "DEVELOPER" && <DeveloperView />}
          {userData === null && <WelcomeSection />}
        </div>
      </main>
    </>
  );
}
