import { Role } from "@acme/db";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { RadioCardsWithImageOption } from "../components/Forms/atoms/RadioCardsWithImage";
import { CountryData } from "react-phone-input-2";

type PFEAuthContextType = {
  authProfile: Role | null;
  setAuthProfile: Dispatch<SetStateAction<Role | null>>;
  userData: any;
  setUserData: Dispatch<SetStateAction<any>>;
  selectedOrganization: any | null;
  setSelectedOrganization: Dispatch<SetStateAction<any | null>>;
  registrationUserData: any | null;
  preSubmitOrganization: any | null;
  setPreSubmitOrganization: Dispatch<SetStateAction<any | null>>;
  setRegistrationUserData: Dispatch<SetStateAction<any | null>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  typeOfProfile: "PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null;
  setTypeOfProfile: Dispatch<
    SetStateAction<"PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null>
  >;
  handleOnChangePhoneNumber: (
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
  selectedPromoterEtsOption: RadioCardsWithImageOption | null;
  setSelectedPromoterEtsOption?: Dispatch<
    SetStateAction<RadioCardsWithImageOption | null>
  >;
};

const PFEAuthContext = React.createContext<PFEAuthContextType | undefined>(
  undefined,
);

function PFEAuthProvider({ children }: { children: React.ReactNode }) {
  const [authProfile, setAuthProfile] = useState<Role | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [preSubmitOrganization, setPreSubmitOrganization] = useState<any>(null);
  const [registrationUserData, setRegistrationUserData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [typeOfProfile, setTypeOfProfile] = useState<
    "PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null
  >(null);

  const [selectedPromoterEtsOption, setSelectedPromoterEtsOption] =
    useState<RadioCardsWithImageOption | null>(null);

  const handleOnChangePhoneNumber = (
    value: string,
    data: CountryData | {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => {
    setRegistrationUserData({
      ...registrationUserData,
      phone: formattedValue,
    });
  };

  const value = {
    authProfile,
    setAuthProfile,
    userData,
    setUserData,
    selectedOrganization,
    setSelectedOrganization,
    registrationUserData,
    setRegistrationUserData,
    currentStep,
    setCurrentStep,
    typeOfProfile,
    setTypeOfProfile,
    handleOnChangePhoneNumber,
    selectedPromoterEtsOption,
    setSelectedPromoterEtsOption,
    preSubmitOrganization,
    setPreSubmitOrganization,
  };

  return (
    <PFEAuthContext.Provider value={value}>{children}</PFEAuthContext.Provider>
  );
}

function usePFEAuth() {
  const context = useContext(PFEAuthContext);
  if (context === undefined) {
    throw new Error("usePFEAuth must be used within a PFEAuthProvider");
  }
  return context;
}

export { PFEAuthProvider, usePFEAuth };
