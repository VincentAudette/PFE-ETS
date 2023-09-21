/* eslint-disable react-hooks/exhaustive-deps */
import { usePFEAuth } from "../../../context/PFEAuthContext";
import SelectOrCreateOrganization from "../../SelectOrCreateOrganization";
import SimpleInput from "../atoms/SimpleInput";
import SplitInfoFormContainer from "../atoms/SplitInfoFormContainer";
import H2TopHeaderWithBottomLine from "../atoms/H2TopHeaderWithBottomLine";
import RadioCardsWithImage, {
  RadioCardsWithImageOption,
} from "../atoms/RadioCardsWithImage";
import Link from "next/link";
import { useEffect } from "react";
import PhoneInput from "../atoms/PhoneInput";

export default function PromoterRegistrationForm({
  title,
  promoterEtsOptions,
}: {
  title: string;
  promoterEtsOptions?: RadioCardsWithImageOption[];
}) {
  const {
    userData,
    handleOnChangePhoneNumber,
    registrationUserData,
    setRegistrationUserData,
    typeOfProfile,
    selectedPromoterEtsOption,
    setSelectedPromoterEtsOption,
  } = usePFEAuth();

  useEffect(() => {
    if (
      userData &&
      !registrationUserData?.firstName &&
      !registrationUserData?.lastName &&
      !registrationUserData?.email
    ) {
      setRegistrationUserData({
        ...registrationUserData,
        firstName: userData.firstName as string,
        lastName: userData.lastName as string,
        email: userData.email,
      });
    }
  }, [userData, registrationUserData]);

  return (
    <div className="px-4 md:px-0">
      <H2TopHeaderWithBottomLine>{title}</H2TopHeaderWithBottomLine>
      <div className="flex w-full flex-col items-end gap-4">
        <div className=" flex w-full  flex-col  gap-4 divide-y ">
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
            <PhoneInput
              name="phone"
              label="Numéro de téléphone (optionnel)"
              value={registrationUserData?.phone}
              onChange={handleOnChangePhoneNumber}
            />
          </SplitInfoFormContainer>

          {typeOfProfile === "PROMOTER" && <SelectOrCreateOrganization />}

          {typeOfProfile === "PROMOTER_ETS" && (
            <RadioCardsWithImage
              title="Choissisez le type d'affiliation que vous avez avec l'ÉTS"
              options={promoterEtsOptions}
              selectedOption={selectedPromoterEtsOption}
              setSelectedOption={setSelectedPromoterEtsOption}
            />
          )}
        </div>
        <Link
          href="/register/complete"
          className="max-h-min rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Prochaine étape &rarr;
        </Link>
      </div>
    </div>
  );
}
