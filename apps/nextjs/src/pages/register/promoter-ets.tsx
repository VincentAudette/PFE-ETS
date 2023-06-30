import { useEffect, useState } from "react";
import StepsLayout from "../../components/RoleViews/UnregisteredView/StepsLayout";
import { usePFEAuth } from "../../context/PFEAuthContext";
import PromoterRegistrationForm from "../../components/Forms/Unregistered/PromoterRegistrationForm";
import { RadioCardsWithImageOption } from "../../components/Forms/atoms/RadioCardsWithImage";
import TopNav from "../../components/TopNav";
import Head from "next/head";
import { trpc } from "../../utils/trpc";

// export const promoterEtsOptions: RadioCardsWithImageOption[] = [
//   {
//     id: 1,
//     title: "École de technologie supérieure",
//     description: "Enseignant, rechercheur, étudiant ou employé.",
//     src: "/ETS.jpg",
//   },
//   {
//     id: 2,
//     title: "Club étudiant",
//     description: "Si vous représentez un club étudiant de l'ÉTS.",
//     src: "/Clubs-Etudiants.jpg",
//   },
//   {
//     id: 3,
//     title: "CENTECH",
//     description: "Si vous êtes un entrepreneur du CENTECH.",
//     src: "/CEN-TECH.jpg",
//   },
// ];

export default function PromoterEts() {
  const { data: allEtsOrgs } = trpc.organization.getAllETS.useQuery();
  const { setCurrentStep, setTypeOfProfile } = usePFEAuth();
  const [promoterEtsOptions, setPromoterEtsOptions] = useState<
    RadioCardsWithImageOption[] | undefined
  >(undefined);
  useEffect(() => {
    setCurrentStep(2);
    setTypeOfProfile("PROMOTER_ETS");
    if (!promoterEtsOptions) {
      setPromoterEtsOptions(
        allEtsOrgs?.map((org) => ({
          id: org.id,
          title: org.name,
          description: org.description || "",
          src: org?.logo?.url || "",
        })),
      );
    }
  }, [allEtsOrgs]);

  return (
    <>
      <Head>
        <title>Profile Promoteur Interne - PFE - ÉTS</title>
        <meta
          name="description"
          content="Application pour supporter les projets de fin d'études."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center ">
        <TopNav />
        <StepsLayout>
          <PromoterRegistrationForm
            title="Promoteur Affilié à l'ÉTS"
            promoterEtsOptions={promoterEtsOptions}
          />
        </StepsLayout>
      </main>
    </>
  );
}
