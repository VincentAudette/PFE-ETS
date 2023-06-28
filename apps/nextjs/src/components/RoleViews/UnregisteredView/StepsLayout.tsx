import { usePFEAuth } from "../../../context/PFEAuthContext";
import Steps from "../../Forms/atoms/Steps";
import HeaderSection from "./HeaderSection";

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

export default function StepsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = usePFEAuth();
  return (
    <div className="my-10 flex w-full max-w-4xl flex-col justify-center">
      <div className="h-12" />
      <HeaderSection userData={userData} />
      <div className="h-12" />
      <Steps steps={steps} />
      <div className="h-12" />
      {children}
      <div className="h-12" />
    </div>
  );
}
