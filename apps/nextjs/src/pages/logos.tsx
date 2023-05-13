import Head from "next/head";
import { trpc } from "../utils/trpc";
import TopNav from "../components/TopNav";
import { useAuth } from "@clerk/nextjs";
import { usePFEAuth } from "../context/PFEAuthContext";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import RecommandationsLogo from "../components/RecommendationsLogo";

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
          Logos - Projet de fin d&apos;études - École de Technologie Supérieur
        </title>
        <meta name="description" content="Logo de Projets de fin d'études." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-neutral-50 dark:bg-neutral-600">
        <TopNav
          isSignedIn={isSignedIn}
          activeRole={activeRole}
          pages={[
            {
              name: "Logos",
              href: "/logos",
              current: true,
            },
          ]}
        />
        <div className="flex flex-col gap-6 text-center">
          <h1 className=" text-3xl font-black lg:text-5xl">
            Projet de fin d&apos;études Logo et utilisations
          </h1>
          <p className="mx-auto max-w-5xl px-5 text-center text-base text-neutral-600 lg:text-xl">
            Nous avons formulé des recommandations pour les occasions où vous
            désirez utiliser nos logos pour illustrer le projet accompli en
            collaboration avec notre établissement, l&apos;École de technologie
            supérieure.
          </p>
        </div>
        <h2 className="mt-12 text-center text-3xl font-black lg:text-4xl">
          Logos permis
        </h2>
        <div className="h-5 lg:h-12" />
        <div className="flex flex-col gap-2 px-4 sm:flex-row">
          {[
            {
              src: "/pfe-etsmtl-marque/fond-rouge-avec-description/logo-pfe-fond-rouge-avec-description.svg",
              href: "/fond-rouge-avec-description.zip",
              alt: "Logo PFE fond rouge avec description",
            },
            {
              src: "/pfe-etsmtl-marque/fond-rouge-sans-description/fond-rouge-sans-description.svg",
              href: "/fond-rouge-sans-description.zip",
              alt: "Logo PFE fond rouge sans description",
            },
            {
              src: "/pfe-etsmtl-marque/fond-transparent-sans-description/logo-pfe-fond-transparent-rouge-sans-description.svg",
              href: "/fond-transparent-sans-description.zip",
              alt: "Logo PFE fond transparent sans description",
            },
          ].map((logo) => (
            <LogoCard key={logo.src} logo={logo} />
          ))}
        </div>
        <RecommandationsLogo />
      </main>
    </>
  );
}

const LogoCard = ({
  logo,
}: {
  logo: { src: string; href: string; alt: string };
}) => {
  return (
    <div className="rounded-md border border-neutral-300 ">
      <Image
        className="h-64 p-2"
        height={420}
        width={420}
        src={logo.src}
        alt={logo.alt}
      />
      <Link href={logo.href}>
        <div className=" group flex h-20 w-full items-center justify-center gap-2 rounded-b-md border-t border-neutral-300 bg-[#e7ebf0] hover:bg-blue-600">
          <ArrowDownTrayIcon className="h-6 w-6 text-neutral-600 group-hover:text-white" />{" "}
          <span className="text-lg text-blue-600 group-hover:text-white">
            Télécharger le logo
          </span>
        </div>
      </Link>
    </div>
  );
};
