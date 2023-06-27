export default function HeaderSection({ userData }: { userData: any }) {
  return (
    <section className="px-4 md:px-0" id="Introduction">
      <h1 className="text-2xl font-bold">
        Informations supplémentaires nécessaires
      </h1>
      <div className="h-3" />
      {userData?.firstName && userData?.lastName ? (
        <h3>
          Bonjour {userData.firstName + " " + userData.lastName}, veuillez nous
          fournir les informations suivantes pour finaliser la création de votre
          compte.
        </h3>
      ) : (
        <h3>
          Bonjour, veuillez nous fournir les informations suivantes pour
          finaliser la création de votre compte.
        </h3>
      )}
    </section>
  );
}
