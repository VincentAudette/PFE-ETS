import Head from "next/head";
import TopNav from "../../components/TopNav";
import { usePFEAuth } from "../../context/PFEAuthContext";
import Link from "next/link";
import ReviewSection from "../../components/RoleViews/UnregisteredView/ReviewSection";
import StepsLayout from "../../components/RoleViews/UnregisteredView/StepsLayout";
import { useEffect } from "react";

export default function CompleteRegistration() {
  const { userData, setCurrentStep } = usePFEAuth();

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  if (userData === null) {
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
          <div>
            NOT AUTHORIZED
            <Link href="/login"></Link>
          </div>
        </main>
      </>
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
        <StepsLayout>
          <ReviewSection />
        </StepsLayout>
      </main>
    </>
  );
}
