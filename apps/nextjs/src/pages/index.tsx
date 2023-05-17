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
import DevelopementPublicSection from "../components/DevelopmentPublicSection";

export default function Home() {
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
      <main className="flex min-h-screen flex-col items-center bg-neutral-50">
        <TopNav isSignedIn={isSignedIn} activeRole={activeRole} />
        <div className="h-10" />
        {activeRole === "STUDENT" && <StudentView />}
        {activeRole === "PROMOTER" && <PromoterView />}
        {activeRole === "ADMIN" && <AdminView />}
        {activeRole === "DEVELOPER" && <DeveloperView />}
        {userData === null && (
          <div>
            <WelcomeSection />
            <DevelopementPublicSection />
          </div>
        )}
      </main>
    </>
  );
}
