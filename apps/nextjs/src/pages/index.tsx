import Head from "next/head";
import { trpc } from "../utils/trpc";
import TopNav from "../components/TopNav";
import SideBarLayout from "../components/SideBarLayout";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "@clerk/nextjs";
import WelcomeSection from "../components/WelcomeSection";
import { usePFEAuth } from "../context/PFEAuthContext";
import { Post } from "@acme/db";
import StudentView from "../components/RoleViews/StudentView";
import PromoterView from "../components/RoleViews/PromoterView";
import AdminView from "../components/RoleViews/AdminView";
import ProfessorView from "../components/RoleViews/ProfessorView";
import { useEffect } from "react";
import DeveloperView from "../components/RoleViews/DeveloperView";

export default function Home() {
  // const postQuery = trpc.post.all.useQuery();

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
        <TopNav
          isSignedIn={isSignedIn}
          userData={userData}
          activeRole={activeRole}
        />
        <div className=" flex w-full max-w-5xl justify-between gap-10 px-4 py-10 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
          {activeRole === "STUDENT" && <StudentView />}
          {activeRole === "PROMOTER" && <PromoterView />}
          {activeRole === "PROFESSOR" && <ProfessorView />}
          {activeRole === "ADMIN" && <AdminView />}
          {activeRole === "DEVELOPER" && <DeveloperView />}
          {userData === null && <WelcomeSection />}
        </div>
      </main>
    </>
  );
}

// {postQuery.data ? (
//   <div className="flex w-full flex-col gap-4">
//       {postQuery.data?.map((p: Post) => {
//       return <ProjectCard key={p.id} post={p} />;
//       })}
//   </div>
//   ) : (
//   <p>Loading..</p>
//   )}
