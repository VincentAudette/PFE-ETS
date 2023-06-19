import { Role } from "@acme/db";
import { usePFEAuth } from "../../context/PFEAuthContext";
import { ItemSquare, linkItems } from "../LinkBox";

export default function DeveloperView() {
  const { setAuthProfile } = usePFEAuth();
  return (
    <div>
      <div className="py-10">
        <h1 className="font-mono text-2xl font-bold">Vue Développeur</h1>
        <p className="text-neutral-500">
          Selectionner un profil pour commencer à créer votre fonctionnalité.
        </p>
      </div>
      <div className="flex gap-5">
        {[
          {
            key: "STUDENT",
            name: "Étudiant",
          },
          {
            key: "PROMOTER",
            name: "Promoteur",
          },
          {
            key: "ADMIN",
            name: "Administrateur",
          },
        ].map((role: { key: string; name: string }) => (
          <button
            key={role.key}
            onClick={() => setAuthProfile(role.key as Role)}
            className="rounded-2xl bg-neutral-200 px-32 py-12 text-xl font-semibold text-neutral-900 hover:bg-neutral-300"
          >
            {role.name}
          </button>
        ))}
      </div>
      <div className="flex gap-5 py-10">
        {linkItems.map((item) => (
          <ItemSquare
            className="flex grow flex-col items-center justify-center rounded-md bg-neutral-200 py-8 hover:bg-neutral-300"
            href={item.href}
            key={item.href}
            IconSvg={
              item.IconSvg as (props: { className: string }) => JSX.Element
            }
            text={item.text}
            withTargetBlank={item.withTargetBlank}
          />
        ))}
      </div>
    </div>
  );
}
