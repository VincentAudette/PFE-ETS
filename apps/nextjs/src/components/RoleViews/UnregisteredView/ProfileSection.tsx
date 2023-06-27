import React, { Dispatch, SetStateAction } from "react";
import RoleBadge from "../../RoleBadge";

const ProfileSection = ({
  setTypeOfProfile,
  setCurrentStep,
}: {
  setTypeOfProfile: Dispatch<
    SetStateAction<"PROMOTER" | "STUDENT" | "PROMOTER_ETS" | null>
  >;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-col gap-3 px-4 md:flex-row md:px-0">
      <section
        id="Promoter-Selection"
        className="flex flex-col rounded-lg border p-5 md:w-1/2"
      >
        <div className="flex flex-col gap-2">
          <RoleBadge role="PROMOTER" />
          <h2 className="mb-2 text-lg font-bold tracking-wide">
            Promoteur de projet
          </h2>
        </div>
        <ol className="list-inside list-decimal text-sm text-gray-600">
          <li>Promoteur externe : employé d&apos;une entreprise non-ÉTS</li>
          <li>
            Affilié à l&apos;ÉTS : Professeur, employé, étudiant, Centech, Club,
            etc.
          </li>
        </ol>
        <div className="h-8 lg:hidden" />
         <div className="grow" />
        <div className="flex min-w-max flex-col gap-2">
          {["PROMOTER", "PROMOTER_ETS"].map((type: any) => (
            <button
              key={type}
              onClick={() => {
                setTypeOfProfile(type);
                setCurrentStep(2);
              }}
              className="rounded-md bg-gray-200 p-2 text-black shadow-sm hover:bg-blue-600 hover:text-white
                            hover:shadow-md hover:shadow-blue-200"
            >
              {type === "PROMOTER"
                ? "Promoteur Externe"
                : "Promoteur Affilié à l'ÉTS"}
            </button>
          ))}
        </div>
      </section>

      <section
        id="Student-Selection"
        className="flex flex-col rounded-lg border p-5 md:w-1/2"
      >
        <div className="flex flex-col gap-2">
          <RoleBadge role="STUDENT" />
          <h2 className="mb-2 text-lg font-bold tracking-wide">
            Compte étudiant (Sélection de PFE)
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Les cours éligibles sont ÉLÉ795, MEC795, GTI795-LOG795, GPA793,
          GOL793, CTN793
        </p>
        <div className="h-8 lg:hidden" />
        <div className="grow" />
        <div className="flex">
          <button
            onClick={() => {
              setTypeOfProfile("STUDENT");
              setCurrentStep(2);
            }}
            className="grow rounded-md bg-gray-200 p-2 text-black shadow-sm hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-200"
          >
            Étudiant inscrit au PFE
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;
