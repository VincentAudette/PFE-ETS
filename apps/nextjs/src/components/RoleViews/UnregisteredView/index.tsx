import { useState } from "react";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import LoadingDots from "../../LoadingDots";
import PromoterRegistrationForm, {
  promoterEtsOptions,
} from "../../Forms/Unregistered/PromoterRegistrationForm";
import Steps from "../../Forms/atoms/Steps";
import { organizationObjetDefault } from "../../SelectOrCreateOrganization";
import { File, Organization } from "@acme/db";
import StudentRegistrationForm from "../../Forms/Unregistered/StudentRegistrationForm";
import ProfileSection from "./ProfileSection";
import HeaderSection from "./HeaderSection";
import EmptyProfileSection from "./EmptyProfileSection";
import ReviewSection from "./ReviewSection";
import { RadioCardsWithImageOption } from "../../Forms/atoms/RadioCardsWithImage";

const steps = [
  {
    id: 1,
    name: "Profile",
    description: "Choisir un type de compte",
  },
  {
    id: 2,
    name: "Formulaire d'inscription",
    description: "Données supplémentaires",
  },
  {
    id: 3,
    name: "Revue",
    description: "Validation des informations",
  },
];

export default function UnregisteredView() {
  const { registrationUserData, setRegistrationUserData, userData } =
    usePFEAuth();

  const [selectedOrganization, setSelectedOrganization] = useState<
    (Organization & { logo: File | null }) | null
  >(organizationObjetDefault);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [typeOfProfile, setTypeOfProfile] = useState<
    "PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null
  >(null);
  const [selectedPromoterEtsOption, setSelectedPromoterEtsOption] =
    useState<RadioCardsWithImageOption>(
      promoterEtsOptions[0] as RadioCardsWithImageOption,
    );

  if (!userData) {
    return <LoadingDots />;
  }

  const handleOnChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRegistrationUserData({
      ...registrationUserData,
      phone: e.target.value,
    });
  };

  const handleProfileCreation = async () => {
    // if (typeOfProfile === "PROMOTER") {
    //   const res = await trpc.mutation.createPromoter({
    //     ...registrationUserData,
    //     organizationId: selectedOrganization?.id,
    //   });
    //   if (res.type === "data") {
    //     toast.success("Votre compte a été créé avec succès");
    //   } else {
    //     toast.error("Une erreur est survenue");
    //   }
    // } else if (typeOfProfile === "PROMOTER_ETS") {
    //   const res = await trpc.mutation.createPromoter({
    //     ...registrationUserData,
    //     organizationId: selectedOrganization?.id,
    //   });
    //   if (res.type === "data") {
    //     toast.success("Votre compte a été créé avec succès");
    //   } else {
    //     toast.error("Une erreur est survenue");
    //   }
    // } else if (typeOfProfile === "STUDENT") {
    //   const res = await trpc.mutation.createStudent({
    //     ...registrationUserData,
    //     organizationId: selectedOrganization?.id,
    //   });
    //   if (res.type === "data") {
    //     toast.success("Votre compte a été créé avec succès");
    //   } else {
    //     toast.error("Une erreur est survenue");
    //   }
    // }
  };

  return (
    <div className="my-10 flex w-full max-w-4xl flex-col justify-center">
      <HeaderSection userData={userData} />
      <div className="h-12" />
      <Steps
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        setProfileType={setTypeOfProfile}
      />
      <div className="h-12" />
      <div className="flex flex-col gap-3">
        {!typeOfProfile && currentStep == 1 && (
          <ProfileSection
            setCurrentStep={setCurrentStep}
            setTypeOfProfile={setTypeOfProfile}
          />
        )}

        {typeOfProfile === null && currentStep == 2 && (
          <EmptyProfileSection setCurrentStep={setCurrentStep} />
        )}

        {(typeOfProfile === "PROMOTER" || typeOfProfile === "PROMOTER_ETS") &&
          currentStep == 2 && (
            <PromoterRegistrationForm
              title={
                typeOfProfile === "PROMOTER"
                  ? "Promoteur Externe"
                  : "Promoteur Affilié à l'ÉTS"
              }
              typeOfProfile={typeOfProfile}
              setStep={setCurrentStep}
              selectedOrganization={selectedOrganization}
              setSelectedOrganization={setSelectedOrganization}
              selectedPromoterEtsOption={selectedPromoterEtsOption}
              setSelectedPromoterEtsOption={setSelectedPromoterEtsOption}
              onChangePhoneNumber={handleOnChangePhoneNumber}
            />
          )}
        {typeOfProfile === "STUDENT" && currentStep == 2 && (
          <>
            <h2 className="mb-3 border-b pb-3 text-lg font-bold">
              Profile étudiant inscrit au PFE
            </h2>
            <StudentRegistrationForm setStep={setCurrentStep} />
          </>
        )}

        {currentStep == 3 && (
          <ReviewSection
            handleProfileCreation={handleProfileCreation}
            registrationUserData={registrationUserData}
            selectedPromoterEtsOption={selectedPromoterEtsOption}
            selectedOrganization={selectedOrganization}
            typeOfProfile={typeOfProfile}
          />
        )}
      </div>
    </div>
  );
}
