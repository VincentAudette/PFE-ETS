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
import UnregisteredView from "../components/RoleViews/UnregisteredView";
import LoadingPFE from "../components/LoadingPFE";

export default function Home() {
  const { isSignedIn, userId: clerkId } = useAuth();
  const { data: getUserData, isLoading } = trpc.auth.getUser.useQuery(
    clerkId as string,
    {
      enabled: !!isSignedIn,
    },
  );

  const organizations: number[] | undefined =
    getUserData?.promoter?.organizations.map(
      (promoterOrganization: { promoterId: number; organizationId: number }) =>
        promoterOrganization.organizationId,
    );

  console.log(
    "getUserData?.promoter?.organizations",
    getUserData?.promoter?.organizations,
  );

  const { data: organizationData } = trpc.organization.getByIds.useQuery(
    organizations,
    { enabled: !!organizations },
  );

  console.log("organizationData", organizationData);

  const { userData, setUserData, authProfile, setSelectedOrganization } =
    usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined && authProfile === null) {
      setUserData(getUserData);
    }
    if (organizationData) {
      setSelectedOrganization(organizationData[0]);
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
        {isSignedIn && isLoading && <LoadingPFE />}
        <TopNav
          organizationData={organizationData}
          isSignedIn={isSignedIn}
          activeRole={activeRole}
        />
        {activeRole === "STUDENT" && <StudentView />}
        {activeRole === "PROMOTER" && <PromoterView />}
        {activeRole === "ADMIN" && <AdminView />}
        {activeRole === "DEVELOPER" && <DeveloperView />}
        {activeRole === "UNREGISTERED" && <UnregisteredView />}
        {userData === null && (
          <div className="max-w-7xl">
            <WelcomeSection />
          </div>
        )}
      </main>
    </>
  );
}
