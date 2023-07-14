import { File, Organization, Role } from "@acme/db";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { RadioCardsWithImageOption } from "../components/Forms/atoms/RadioCardsWithImage";
import { CountryData } from "react-phone-input-2";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

type RegistrationUserData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  codePermanent?: string;
  phone?: string;
};

export type PFEAuthContextType = {
  authProfile: Role | null;
  setAuthProfile: Dispatch<SetStateAction<Role | null>>;
  userData: inferProcedureOutput<AppRouter["auth"]["getUser"]> | null;
  setUserData: Dispatch<
    SetStateAction<inferProcedureOutput<AppRouter["auth"]["getUser"]> | null>
  >;
  selectedOrganization:
    | inferProcedureOutput<AppRouter["organization"]["getByIds"]>[number]
    | null;
  setSelectedOrganization: Dispatch<
    SetStateAction<
      inferProcedureOutput<AppRouter["organization"]["getByIds"]>[number] | null
    >
  >;
  preSubmitOrganization: (Organization & { logo: File | null }) | null;
  setPreSubmitOrganization: Dispatch<
    SetStateAction<(Organization & { logo: File | null }) | null>
  > | null;
  registrationUserData: RegistrationUserData | null;
  setRegistrationUserData: Dispatch<
    SetStateAction<RegistrationUserData | null>
  >;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  typeOfProfile: "PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null;
  setTypeOfProfile: Dispatch<
    SetStateAction<"PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null>
  >;
  handleOnChangePhoneNumber: (
    value: string,
    data: CountryData | any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
  selectedPromoterEtsOption: RadioCardsWithImageOption | null;
  setSelectedPromoterEtsOption?: Dispatch<
    SetStateAction<RadioCardsWithImageOption | null>
  >;
  showMobileNav?: boolean;
  setShowMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PFEAuthContext = React.createContext<
  PFEAuthContextType | undefined
>(undefined);

function PFEAuthProvider({ children }: { children: React.ReactNode }) {
  const [authProfile, setAuthProfile] = useState<Role | null>(null);

  const [userData, setUserData] =
    useState<PFEAuthContextType["userData"]>(null);

  const [selectedOrganization, setSelectedOrganization] =
    useState<PFEAuthContextType["selectedOrganization"]>(null);

  const [preSubmitOrganization, setPreSubmitOrganization] =
    useState<PFEAuthContextType["preSubmitOrganization"]>(null);

  const [registrationUserData, setRegistrationUserData] =
    useState<PFEAuthContextType["registrationUserData"]>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [typeOfProfile, setTypeOfProfile] = useState<
    "PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null
  >(null);

  const [selectedPromoterEtsOption, setSelectedPromoterEtsOption] =
    useState<RadioCardsWithImageOption | null>(null);

  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const handleOnChangePhoneNumber = (
    value: string,
    data: CountryData | any,
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
    showMobileNav,
    setShowMobileNav,
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
