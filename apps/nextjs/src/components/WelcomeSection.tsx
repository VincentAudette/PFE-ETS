import DevelopementPublicSection from "./DevelopmentPublicSection";
import { Features } from "./Features";

export default function WelcomeSection() {
  return (
    <div className="mx-auto mt-5 flex flex-col items-center justify-center gap-12 lg:mt-12 lg:gap-32">
      <div className="flex max-w-5xl flex-col gap-4">
        <h1 className="text-center text-4xl font-bold text-neutral-900">
          Plateforme PFE dédiée aux{" "}
          <span className="bg-gradient-to-tr from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Promoteurs
          </span>
          {", "}
          <span className="bg-gradient-to-tr from-red-500 to-red-700 bg-clip-text text-transparent">
            Professeurs
          </span>{" "}
          et{" "}
          <span className="bg-gradient-to-tr from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Étudiants
          </span>{" "}
          inscrits pour la session en cours ou à venir.
        </h1>
        <p className="text-center text-2xl text-neutral-700">
          Pour accéder à l&apos;application, vous devez vous connecter avec
          votre compte ou en créer un.
        </p>
      </div>
      <Features />

      <p className=" max-w-3xl text-left text-base text-neutral-600">
        Un PFE est une activité de conception et d’apprentissage universitaire.
        Pour certains projet, des ententes de confidentialité et de cession de
        droits de propriété intellectuelle peuvent être exigées. Avant de signer
        quoi que ce soit, tous les étudiants et les partenaires industriels, le
        cas échéant, doivent lire et comprendre ce document explicatif.
      </p>
      <DevelopementPublicSection />
    </div>
  );
}
