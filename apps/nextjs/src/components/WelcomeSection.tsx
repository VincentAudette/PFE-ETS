export default function WelcomeSection() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-4xl font-bold text-neutral-900">
        Bienvenue sur l&apos;application de gestion des projets de fin
        d&apos;études
      </h1>
      <p className="text-center text-lg text-neutral-700">
        Pour accéder à l&apos;application, vous devez vous connecter avec votre
        compte ou en créer un.
      </p>
    </div>
  );
}
