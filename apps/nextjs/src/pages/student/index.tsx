import Head from "next/head";
import { trpc } from "../../utils/trpc";
import TopNav from "../../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../../context/PFEAuthContext";
import StudentView from "../../components/RoleViews/StudentView";
import LoadingPFE from "../../components/LoadingPFE";
import { useRouter } from "next/router";
import Link from "next/link";

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
  //   const router = useRouter();

  //   if (activeRole !== "STUDENT" && router) {
  //     router.push("/");
  //   }

  if (getUserData?.role !== "STUDENT") {
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
        <main className="flex flex-col items-center justify-center">
          <TopNav />
          {isSignedIn && isLoading && <LoadingPFE />}
          <div className="h-12" />
          <div className="mx-auto w-1/2 rounded bg-white p-6 text-center shadow-md">
            <h1 className="mb-4 text-xl font-bold">Accès non autorisé</h1>
            <p className="mb-4">
              Il semble que vous n'avez pas les autorisations nécessaires pour
              accéder à cette page. Si vous pensez que c'est une erreur,
              veuillez contacter l'administrateur du site.
            </p>
            <Link href="/" className="text-blue-500 hover:underline">
              Retour à la page d'accueil
            </Link>
          </div>
        </main>
      </>
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
