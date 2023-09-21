/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import StepsLayout from "../../components/RoleViews/UnregisteredView/StepsLayout";
import { usePFEAuth } from "../../context/PFEAuthContext";
import PromoterRegistrationForm from "../../components/Forms/Unregistered/PromoterRegistrationForm";
import Head from "next/head";
import TopNav from "../../components/TopNav";

export default function PromoterEts() {
  const { setCurrentStep, setTypeOfProfile } = usePFEAuth();
  useEffect(() => {
    setCurrentStep(2);
    setTypeOfProfile("PROMOTER");
  }, []);
  return (
    <>
      <Head>
        <title>Profile Promoteur Externe - PFE - ÉTS</title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <TopNav />
        <StepsLayout>
          <PromoterRegistrationForm title="Promoteur Externe" />
        </StepsLayout>
      </main>
    </>
  );
}
