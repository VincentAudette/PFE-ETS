import Head from "next/head";
import TopNav from "./TopNav";
import LoadingPFE from "./LoadingPFE";
import Link from "next/link";

export default function Unauthorized({
  isSignedIn,
  isLoading,
}: {
  isSignedIn: boolean;
  isLoading: boolean;
}) {
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
            Il semble que vous n&apos;avez pas les autorisations nécessaires
            pour accéder à cette page. Si vous pensez que c&apos;est une erreur,
            veuillez contacter l&apos;administrateur du site.
          </p>
          <Link href="/" className="text-blue-500 hover:underline">
            Retour à la page d&apos;accueil
          </Link>
        </div>
      </main>
    </>
  );
}
