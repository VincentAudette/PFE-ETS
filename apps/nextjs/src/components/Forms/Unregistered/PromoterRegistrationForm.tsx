import { Dispatch, SetStateAction, useEffect } from "react";
import { File, Organization } from "@acme/db";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import SelectOrCreateOrganization from "../../SelectOrCreateOrganization";
import LoadingPFE from "../../LoadingPFE";
import SimpleInput from "../atoms/SimpleInput";
import Button from "../atoms/button";
import SplitInfoFormContainer from "../atoms/SplitInfoFormContainer";
import H2TopHeaderWithBottomLine from "../atoms/H2TopHeaderWithBottomLine";
import RadioCardsWithImage, {
  RadioCardsWithImageOption,
} from "../atoms/RadioCardsWithImage";

export const promoterEtsOptions: RadioCardsWithImageOption[] = [
  {
    id: 1,
    title: "École de technologie supérieure",
    description: "Enseignant, rechercheur, étudiant ou employé.",
    src: "/ETS.jpg",
  },
  {
    id: 2,
    title: "Club étudiant",
    description: "Si vous représentez un club étudiant de l'ÉTS.",
    src: "/Clubs-Etudiants.jpg",
  },
  {
    id: 3,
    title: "CENTECH",
    description: "Si vous êtes un entrepreneur du CENTECH.",
    src: "/CEN-TECH.jpg",
  },
];

export default function PromoterRegistrationForm({
  title,
  typeOfProfile,
  selectedOrganization,
  setSelectedOrganization,
  setStep,
  selectedPromoterEtsOption,
  setSelectedPromoterEtsOption,
  onChangePhoneNumber,
}: {
  title: string;
  typeOfProfile: "PROMOTER" | "PROMOTER_ETS";
  selectedOrganization: (Organization & { logo: File | null }) | null;
  setSelectedOrganization: Dispatch<
    SetStateAction<(Organization & { logo: File | null }) | null>
  >;
  setStep: Dispatch<SetStateAction<number>>;
  selectedPromoterEtsOption: RadioCardsWithImageOption;
  setSelectedPromoterEtsOption: Dispatch<
    SetStateAction<RadioCardsWithImageOption>
  >;
  onChangePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { userData, registrationUserData, setRegistrationUserData } =
    usePFEAuth();

  useEffect(() => {
    if (
      userData &&
      registrationUserData.firstName === undefined &&
      registrationUserData.lastName === undefined &&
      registrationUserData.email === undefined
    ) {
      setRegistrationUserData({
        ...registrationUserData,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    }
  }, [userData, registrationUserData]);

  console.log("userData", userData);
  console.log("registrationUserData", registrationUserData);

  return (
    <div className="px-4 md:px-0">
      <H2TopHeaderWithBottomLine>{title}</H2TopHeaderWithBottomLine>
      <div className="flex w-full flex-col items-end gap-4">
        <div className=" flex w-full  flex-col  gap-4 divide-y ">
          {/* {!userData.firstName && !userData.lastName && ( */}
          <SplitInfoFormContainer
            id="FirstLastName"
            title="Vos informations"
            description="Assurez-vous que votre prénom, votre nom de famille et votre courriel sont corrects."
            note="Si vous modifiez votre courriel ici, cela n'affectera pas le courriel que vous utilisez pour vous connecter à votre compte."
          >
            <div className="flex flex-col gap-2">
              <div className=" flex w-full flex-col gap-4 lg:flex-row ">
                <div className="lg:w-1/2">
                  <SimpleInput
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    value={registrationUserData?.firstName}
                    onChange={(e) => {
                      setRegistrationUserData({
                        ...registrationUserData,
                        firstName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="lg:w-1/2">
                  <SimpleInput
                    name="lastName"
                    label="Nom"
                    placeholder="Votre nom de famille"
                    value={registrationUserData?.lastName}
                    onChange={(e) => {
                      setRegistrationUserData({
                        ...registrationUserData,
                        lastName: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <SimpleInput
                name="email"
                label="Courriel"
                placeholder="Votre courriel"
                value={registrationUserData?.email}
                onChange={(e) => {
                  setRegistrationUserData({
                    ...registrationUserData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </SplitInfoFormContainer>

          <SplitInfoFormContainer
            id="Telephone"
            title="Votre numéro de téléphone"
            description="Vous pouvez optionnellement nous renseigner votre numéro de téléphone"
          >
            <SimpleInput
              name="phone"
              label="Numéro de téléphone (optionnel)"
              placeholder="Votre numéro de téléphone"
              value={registrationUserData?.phone}
              onChange={onChangePhoneNumber}
            />
          </SplitInfoFormContainer>

          {typeOfProfile === "PROMOTER" && (
            <SelectOrCreateOrganization
              selected={selectedOrganization}
              setSelected={setSelectedOrganization}
            />
          )}

          {typeOfProfile === "PROMOTER_ETS" && (
            <RadioCardsWithImage
              title="Choissisez le type d'affiliation que vous avez avec l'ÉTS"
              options={promoterEtsOptions}
              selectedOption={selectedPromoterEtsOption}
              setSelectedOption={setSelectedPromoterEtsOption}
            />
          )}
        </div>
        <Button onClick={() => setStep(3)} text="Prochaine étape &rarr;" />
      </div>
    </div>
  );
}
