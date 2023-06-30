import Head from "next/head";
import TopNav from "../../components/TopNav";
import { usePFEAuth } from "../../context/PFEAuthContext";
import Link from "next/link";
import ReviewSection from "../../components/RoleViews/UnregisteredView/ReviewSection";
import StepsLayout from "../../components/RoleViews/UnregisteredView/StepsLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CompleteRegistration() {
  const {
    userData,
    authProfile,
    registrationUserData,
    selectedOrganization,
    selectedPromoterEtsOption,
    setCurrentStep,
  } = usePFEAuth();

  const router = useRouter();

  useEffect(() => {
    setCurrentStep(3);
  }, []);

  console.log("registrationUserData", registrationUserData);
  console.log("selectedOrganization", selectedOrganization);
  console.log("selectedPromoterEtsOption", selectedPromoterEtsOption);

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
