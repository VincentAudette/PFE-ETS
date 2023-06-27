import { Dispatch, SetStateAction } from "react";
import H2TopHeaderWithBottomLine from "../../Forms/atoms/H2TopHeaderWithBottomLine";

export default function EmptyProfileSection({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 md:px-0">
      <H2TopHeaderWithBottomLine>
        Choisir un type de compte
      </H2TopHeaderWithBottomLine>
      <button
        onClick={() => {
          setCurrentStep(1);
        }}
        className="rounded-md bg-blue-600 p-2 text-white"
      >
        &larr; Retour à la sélection du type de compte
      </button>
    </div>
  );
}
