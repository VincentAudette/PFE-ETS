import { Features } from "./Features";

export default function WelcomeSection() {
  return (
    <div className="mx-auto my-20 flex flex-col items-center gap-10 px-4 ">
      <div>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-items-center gap-4 sm:gap-10">
          <h1 className="text-center text-4xl font-bold text-neutral-900">
            Plateforme PFE dédiée aux{" "}
            <span className="bg-gradient-to-tr from-red-400 to-red-700 bg-clip-text text-transparent">
              Promoteurs de projets
            </span>{" "}
            inscrits pour la session en cours ou à venir!
          </h1>
          <p className="text-center text-xl text-neutral-700">
            Pour accéder à l&apos;application, vous devez vous connecter avec
            votre compte ou en créer un.
          </p>
        </div>
        <div className="h-10" />
        <Features />
      </div>

      <p className=" mx-auto my-10 max-w-5xl text-left text-base text-neutral-600">
        Un PFE est une activité de conception et d’apprentissage universitaire.
        Pour certains projet, des ententes de confidentialité et de cession de
        droits de propriété intellectuelle peuvent être exigées. Avant de signer
        quoi que ce soit, tous les étudiants et les partenaires industriels, le
        cas échéant, doivent lire et comprendre ce document explicatif.
      </p>
    </div>
  );
}
