import { Role } from "@acme/db";
import React, { useState, useContext, Dispatch, SetStateAction } from "react";

type PFEAuthContextType = {
  authProfile: Role | null;
  setAuthProfile: Dispatch<SetStateAction<Role | null>>;
  userData: any;
  setUserData: Dispatch<SetStateAction<any>>;
  selectedOrganization: any | null;
  setSelectedOrganization: Dispatch<SetStateAction<any | null>>;
  registrationUserData: any | null;
  setRegistrationUserData: Dispatch<SetStateAction<any | null>>;
};

const PFEAuthContext = React.createContext<PFEAuthContextType | undefined>(
  undefined,
);

function PFEAuthProvider({ children }: { children: React.ReactNode }) {
  const [authProfile, setAuthProfile] = useState<Role | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [registrationUserData, setRegistrationUserData] = useState<any>(null);

  const value = {
    authProfile,
    setAuthProfile,
    userData,
    setUserData,
    selectedOrganization,
    setSelectedOrganization,
    registrationUserData,
    setRegistrationUserData,
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
