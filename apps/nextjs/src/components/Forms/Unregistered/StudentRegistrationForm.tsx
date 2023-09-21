import { useState } from "react";
import SimpleInput from "../atoms/SimpleInput";
import Button from "../atoms/button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { usePFEAuth } from "../../../context/PFEAuthContext";
import InputWithIcon from "../atoms/InputWithIcon";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type StudentFieldKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "department"
  | "codePermanent";

const students = new Map<string, Record<StudentFieldKeys, string>>();

students.set("vincent.audette.1@ens.etsmtl.ca", {
  firstName: "Vincent",
  lastName: "Audette",
  email: "vincent.audette.1@ens.etsmtl.ca",
  department: "Génie logiciel",
  codePermanent: "AUDV12345678",
});

students.set("khady-fara-biram.lo.1@ens.etsmtl.ca", {
  firstName: "Khady-Fara-Biram",
  lastName: "Lo",
  email: "khady-fara-biram.lo.1@ens.etsmtl.ca",
  department: "Génie logiciel",
  codePermanent: "LOKF12345678",
});

students.set("olivier.st-pierre.3@ens.etsmtl.ca", {
  firstName: "Olivier",
  lastName: "St-Pierre",
  email: "olivier.st-pierre.3@ens.etsmtl.ca",
  department: "Génie logiciel",
  codePermanent: "STPO12345678",
});

students.set("zachary.leclerc.1@ens.etsmtl.ca", {
  firstName: "Zachary",
  lastName: "Leclerc",
  email: "zachary.leclerc.1@ens.etsmtl.ca",
  department: "Génie logiciel",
  codePermanent: "LELZ12345678",
});

students.set("alexi.st-amand.1@ens.etsmtl.ca", {
  firstName: "Alexi",
  lastName: "St-Amand",
  email: "alexi.st-amand.1@ens.etsmtl.ca",
  department: "Génie logiciel",
  codePermanent: "STAAX12345678",
});

export default function StudentRegistrationForm({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [invalideEmailMessage, setInvalideEmailMessage] = useState("");
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
  const [isEmailValidating, setIsEmailValidating] = useState(false);
  const { userData, registrationUserData, setRegistrationUserData } =
    usePFEAuth();
  const router = useRouter();

  const handleStudentEmailValidation = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsEmailValidating(true);

    const target = e.target as HTMLFormElement;
    const formValues = {
      courriel: target.courriel?.value,
    };

    const lowerCaseEmail = formValues.courriel.toLowerCase();

    // validate email is ets email with regex and set emailIsValid
    const emailRegex = /^[a-z\-]+\.[a-z\-]+\.\d+@ens\.etsmtl\.ca$/i;

    if (emailRegex.test(lowerCaseEmail)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
      setIsEmailValidating(false);
      setInvalideEmailMessage(
        `Entrée invalide, ${target.courriel.value} n'est pas un courriel étudiant ÉTS valide.`,
      );
      target.courriel.value = "";
      return;
    }

    // Simulate email validation with trpc call to signeEts
    // check if email is in students map
    if (students.has(lowerCaseEmail)) {
      // if email is in students map, set userData
      const student = students.get(lowerCaseEmail);
      if (student !== undefined) {
        setRegistrationUserData({
          ...registrationUserData,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          department: student.department,
          codePermanent: student.codePermanent,
        });
      }
    } else {
      // if email is not in students map, set emailIsValid to false
      setEmailIsValid(false);
      setIsEmailValidating(false);
      // clear the email input
      setInvalideEmailMessage(
        `Entrée invalide, ${target.courriel.value} n'est pas inscrit au PFE.`,
      );
      target.courriel.value = "";
      return;
    }

    //set 1.5 second timeout to simulate email validation
    // TODO: replace with real email validation with trpc call to signeEts
    setTimeout(() => {
      setIsEmailValidating(false);
      setEmailIsValid(true);
      setStep(3);
      router.push("/register/complete");
    }, 1500);
  };

  if (isEmailValidating) {
    return (
      <div className="flex items-center gap-2 py-5">
        <ArrowPathIcon className="h-6 w-6 animate-spin" />
        <p className="text-lg">Validation du courriel en cours...</p>
      </div>
    );
  }

  return (
    <>
      <form className="py-5" onSubmit={handleStudentEmailValidation}>
        <InputWithIcon
          Icon={EnvelopeIcon}
          validationError={
            emailIsValid === false ? invalideEmailMessage : undefined
          }
          label="Veuillez remplir votre courriel ÉTS - @ens.etsmtl.ca"
          name="courriel"
          placeholder="Votre courriel ÉTS"
        />
        <div className="flex py-2">
          <div className="grow" />
          <Button type="submit" text="Valider courriel" />
        </div>
      </form>
    </>
  );
}
