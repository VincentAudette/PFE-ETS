import { useEffect } from "react";
import StepsLayout from "../../components/RoleViews/UnregisteredView/StepsLayout";
import { usePFEAuth } from "../../context/PFEAuthContext";
import Head from "next/head";
import TopNav from "../../components/TopNav";
import StudentRegistrationForm from "../../components/Forms/Unregistered/StudentRegistrationForm";

export default function PromoterEts() {
  const { setCurrentStep, setTypeOfProfile } = usePFEAuth();
  useEffect(() => {
    setCurrentStep(2);
    setTypeOfProfile("STUDENT");
  }, []);
  return (
    <>
      <Head>
        <title>Profile Étudiant - PFE - ÉTS</title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <TopNav />
        <StepsLayout>
          <h2 className="mb-3 border-b pb-3 text-lg font-bold">
            Profile étudiant inscrit au PFE
          </h2>
          <StudentRegistrationForm setStep={setCurrentStep} />
        </StepsLayout>
      </main>
    </>
  );
}
