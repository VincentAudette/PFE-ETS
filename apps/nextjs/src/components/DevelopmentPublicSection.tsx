import {
  ArrowRightIcon,
  BuildingOffice2Icon,
  CloudArrowUpIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import RoleBadge from "./RoleBadge";
import Link from "next/link";
import InputWithIcon from "./Forms/atoms/InputWithIcon";

const primaryFeatures = [
  {
    name: "Envirronement de dev simple.",
    description:
      "L'expérience de développement est simple et rapide. Vous pouvez commencer à développer en quelques minutes.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates.",
    description:
      "Nous fournissons un guide pour que vous ayez un instance sécure et qui n'impacte pas les données de production.",
    icon: LockClosedIcon,
  },
  {
    name: "Expérience à ajouter sur votre CV.",
    description:
      "Contribuer sur un projet open source est une expérience qui peut être ajoutée sur votre CV.",
    icon: BuildingOffice2Icon,
  },
];

interface InterestedContributorEmailFormElement extends HTMLFormElement {
  interestedContributorEmail: { value: string };
}

export default function DevelopementPublicSection() {
  const handleInterestedContributor = (
    e: React.MouseEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const target = e.target as InterestedContributorEmailFormElement;

    console.log(target.interestedContributorEmail.value);
  };

  return (
    <div className="mx-auto  sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-neutral-700 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
          <div className="lg:row-start-2 lg:max-w-md">
            <RoleBadge role="DEVELOPER" darkMode={true} />
            <div className="h-3" />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Contribuer sur le projet
              <br />
              PFE est open source
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Pour faire partie de l&apos;équipe de développement, inscrivez
              votre courriel ci-bas et nous vous contacterons.
            </p>
            <form onSubmit={handleInterestedContributor}>
              <InputWithIcon
                Icon={EnvelopeIcon}
                name="interestedContributorEmail"
                placeholder="prenom.nom@ens.etsmtl.ca"
                type="email"
                id="email"
                label="Courriel"
                darkMode={true}
              />
            </form>

            <Link
              href=""
              className="group mt-6 flex max-w-max items-center rounded-md bg-neutral-600 py-1 px-4 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              <p className=" min-w-max">Découvrez notre Roadmap</p>
              <ArrowRightIcon className="group ml-1 h-5 w-5 skew-x-0  duration-150 group-hover:translate-x-2" />
            </Link>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="relative -z-20 min-w-full max-w-xl rounded-xl shadow-xl ring-1 ring-white/10 lg:row-span-4 lg:w-[64rem] lg:max-w-none"
            width={2432}
            height={1442}
          />
          <div className="max-w-xl lg:row-start-3 lg:mt-10 lg:max-w-md lg:border-t lg:border-white/10 lg:pt-10">
            <dl className="max-w-xl space-y-8 text-base leading-7 text-neutral-300 lg:max-w-none">
              {primaryFeatures.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt className="ml-9 inline-block font-semibold text-white">
                    <feature.icon
                      className="absolute left-1 top-1 h-5 w-5 text-blue-500"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#2f3dff] to-[#119af5] opacity-25"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
