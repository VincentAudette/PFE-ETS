import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

const recommendationsLogo = [
  {
    nom: "Utilisation autorisée du logo PFE",
    description:
      "Utilisez un logo PFE autorisé pour informer les autres que votre projet a réussi avec les étudiants de l'École de technologie supérieure dans le programme PFE.",
    bon: true,
  },
  {
    nom: "Présentation du PFE à l'ÉTS",
    description:
      "Utilisez le logo PFE dans un article de blog ou un article de presse sur le Projet de fin d'études à l'ÉTS.",
    bon: true,
  },
  {
    nom: "Positionnement du logo",
    description:
      "Utilisez les logos PFE autorisés de manière moins proéminente que le nom ou le logo de votre propre entreprise ou produit.",
    bon: true,
  },
  {
    nom: "Respect de l'identité PFE",
    description:
      "N'utilisez pas le nom PFE ou un logo PFE d'une manière qui suggère que vous êtes PFE, que votre offre ou projet est par PFE, ou que PFE vous soutient ou soutient votre offre ou projet.",
    bon: false,
  },
  {
    nom: "Usage inapproprié du logo PFE",
    description:
      "N'utilisez pas un logo PFE comme icône ou logo pour votre entreprise/organisation, offre, projet, nom de domaine, compte de médias sociaux, ou site web.",
    bon: false,
  },
  {
    nom: "Modification du logo",
    description:
      "Ne modifiez pas les logos PFE autorisés, y compris en changeant la couleur, les dimensions, ou en les combinant avec d'autres mots ou éléments de design.",
    bon: false,
  },
  {
    nom: "Couleurs de fond autorisées",
    description:
      "Pour le logo avec fond transparent, la seule contrainte est d’avoir un fond blanc, noir ou gris.",
    bon: true,
  },
  {
    nom: "Usage trompeur du logo",
    description:
      "N'utilisez pas un logo PFE d'une manière qui pourrait porter à confusion ou tromper les autres sur la nature de votre relation avec PFE.",
    bon: false,
  },
];

export default function RecommandationsLogo() {
  return (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Guide d&apos;utilisation
          </h2>
          <p className="mt-6 max-w-3xl text-center text-lg leading-7 text-neutral-600">
            Ceci peut s&apos;avérer pertinent lors de la présentation de
            l&apos;engagement de votre entreprise dans le cadre du Projet de fin
            d&apos;études de nos étudiants.
          </p>
        </div>
        <div className="h-20" />
        <div className="">
          <div className="flex flex-col gap-12 lg:flex-row">
            <h3 className=" text-2xl font-semibold lg:mb-0 lg:w-1/3">
              Astuces pour une utilisation <br /> parfaite du logo
            </h3>
            <dl className=" col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-neutral-600 sm:grid-cols-2 lg:w-2/3 lg:gap-y-16">
              {recommendationsLogo.map(
                (recommendation) =>
                  recommendation.bon && (
                    <div key={recommendation.nom} className="relative pl-9">
                      <dt className="font-semibold text-neutral-900">
                        <CheckIcon
                          className="absolute left-0 top-1 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                        {recommendation.nom}
                      </dt>
                      <dd className="mt-2 max-w-sm lg:max-w-none">
                        {recommendation.description}
                      </dd>
                    </div>
                  ),
              )}
            </dl>
          </div>
          <div className="h-20" />
          <div className="flex flex-col gap-12 lg:flex-row">
            <h3 className=" text-2xl font-semibold lg:mb-0 lg:w-1/3">
              À éviter! Les pièges d&apos;une <br />
              mauvaise utilisation du logo
            </h3>
            <dl className=" col-span-2 col-start-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-neutral-600 sm:grid-cols-2 lg:w-2/3 lg:gap-y-16">
              {recommendationsLogo.map(
                (recommendation) =>
                  !recommendation.bon && (
                    <div key={recommendation.nom} className="relative pl-9">
                      <dt className="font-semibold text-neutral-900">
                        <XMarkIcon
                          className="absolute left-0 top-1 h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        {recommendation.nom}
                      </dt>
                      <dd className="mt-2 max-w-sm lg:max-w-none">
                        {recommendation.description}
                      </dd>
                    </div>
                  ),
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
