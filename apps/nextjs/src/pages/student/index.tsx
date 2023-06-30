import Head from "next/head";
import { trpc } from "../../utils/trpc";
import TopNav from "../../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../../context/PFEAuthContext";
import StudentView from "../../components/RoleViews/StudentView";
import LoadingPFE from "../../components/LoadingPFE";
import Unauthorized from "../../components/Unauthorized";

export default function StudentHome() {
  const { isSignedIn, userId: clerkId } = useAuth();
  const { data: getUserData, isLoading } = trpc.auth.getUser.useQuery(
    clerkId as string,
    {
      enabled: !!isSignedIn,
      retry: (failureCount, error: any) => {
        // retry 3 times if data is null or undefined
        return failureCount <= 3 && error?.response?.data == null;
      },
      // add this line if you want to add a delay between retries
      // this is an example of an exponential backoff delay
      retryDelay: (attemptIndex) => Math.min(attemptIndex * 1000, 3000),
    },
  );

  const { userData, authProfile } = usePFEAuth();
  const activeRole = authProfile !== null ? authProfile : getUserData?.role;

  if (activeRole !== "STUDENT") {
    return (
      <Unauthorized isLoading={isLoading} isSignedIn={isSignedIn ?? false} />
    );
  }

  return (
    <>
      <Head>
        <title>
          Étudiant - Projet de fin d&apos;études - École de Technologie
          Supérieur
        </title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        {isSignedIn && isLoading && <LoadingPFE />}
        <TopNav />
        <div className="h-12" />
        <StudentView />
      </main>
    </>
  );
}
