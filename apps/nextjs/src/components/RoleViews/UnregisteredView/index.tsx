import { usePFEAuth } from "../../../context/PFEAuthContext";
import StudentRegistrationForm from "../../Forms/Unregistered/StudentRegistrationForm";
import ProfileSection from "./ProfileSection";
import EmptyProfileSection from "./EmptyProfileSection";
import StepsLayout from "./StepsLayout";

export default function UnregisteredView() {
  const { currentStep, setCurrentStep, typeOfProfile, setTypeOfProfile } =
    usePFEAuth();

  return (
    <StepsLayout>
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
        {typeOfProfile === "STUDENT" && currentStep == 2 && (
          <>
            <h2 className="mb-3 border-b pb-3 text-lg font-bold">
              Profile étudiant inscrit au PFE
            </h2>
            <StudentRegistrationForm setStep={setCurrentStep} />
          </>
        )}
      </div>
    </StepsLayout>
  );
}
