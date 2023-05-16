import { useId } from "react";
import RoleBadge from "./RoleBadge";
import { Role } from "@acme/db";

const features = [
  {
    name: "Proposition d'un projet de fin d'études",
    description:
      "Le promoteur d'un projet : étudiant, professeur ou partenaire industriel.",
    roles: ["PROMOTER"],
  },
  {
    name: "Envoyer des notifications automatiques",
    description:
      "L'application notifie les étudiants sélectionné à votre PFE après la création de groupes.",
    roles: ["STUDENT"],
  },
  {
    name: "Simplifier la gestion des projets",
    description:
      "Vous pouvez gérer vos projets de fin d'études dans tous ses phases en un seul endroit.",
    roles: ["PROMOTER"],
  },
  {
    name: "Garder un suivi de vos projets",
    description:
      "Suivez vos projets actuels et archivés avec leurs informations.",
    roles: ["STUDENT", "PROMOTER"],
  },
  {
    name: "Plateforme sécurisée, privée et bien surveillée",
    description:
      "Les données sont sauvegardées et restent privées pour assurer la sécurité de vos informations.",
    roles: ["ADMIN"],
  },
  {
    name: "Travailler sur la plateforme actuelle",
    description:
      "Si vous êtes intéressé à développer la plateforme, vous pouvez contribuer sur GitHub.",
    roles: ["DEVELOPER", "STUDENT"],
  },
];

export function Features() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
    >
      <ul
        role="list"
        className="mx-auto grid max-w-2xl grid-cols-1 gap-6 text-sm  sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
      >
        {features.map((feature) => (
          <li
            key={feature.name}
            className="rounded-2xl border border-gray-200 p-8"
          >
            <div className="flex gap-2">
              {feature.roles?.map((role) => (
                <RoleBadge key={role + feature.name} role={role as Role} />
              ))}
            </div>
            <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
            <p className="mt-2 text-gray-700">{feature.description}</p>
            <div className="h-3" />
          </li>
        ))}
      </ul>
    </section>
  );
}
