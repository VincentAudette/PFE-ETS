import AuthShowcase from "./AuthShowcase";
import PFELogo from "./PFELogo";
import LinkBox from "./LinkBox";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/router";
import PFELogoSmall from "./PFELogoSmall";
import { usePFEAuth } from "../context/PFEAuthContext";
import Image from "next/image";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useAuth } from "@clerk/nextjs";
import SlideOver from "./SlideOver";
import { File, Organization } from "@acme/db";
import SelectOrCreateOrganization, {
  organizationObjetDefault,
} from "./SelectOrCreateOrganization";
import { toast } from "react-toastify";

export default function TopNav({
  activeRole,
  pages,
}: {
  activeRole: string | undefined;
  pages?: { name: string; href: string; current: boolean }[];
}) {
  const { isSignedIn, userId: clerkId } = useAuth();
  const [showSlideOver, setShowSlideOver] = useState(false);

  const { data: getUserData, isLoading } = trpc.auth.getUser.useQuery(
    clerkId as string,
    {
      enabled: !!isSignedIn,
    },
  );
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { selectedOrganization, setSelectedOrganization, authProfile } =
    usePFEAuth();

  const [unassocitatedOrganization, setUnassociatedOrganization] = useState<
    (Organization & { logo: File | null }) | null
  >(organizationObjetDefault);

  const utils = trpc.useContext();

  const associateWithOrganizationMutation =
    trpc.promoter.associateWithOrganization.useMutation({
      onSuccess: () => {
        utils.organization.getByIds.invalidate();
        utils.auth.getUser.invalidate();
        setShowSlideOver(false);
        toast.success("Organisation associée avec succès");
      },
      onError: (error) => {
        toast.error(
          `Erreur durant l'association d'organisation: ${error.message}`,
        );
      },
    });

  const handleOrganizationAssociation = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("unassocitatedOrganization", unassocitatedOrganization);
    if (!getUserData?.promoter?.id) return;
    if (!unassocitatedOrganization?.id) {
      toast.error("Veuillez sélectionner une organisation");
      return;
    }
    associateWithOrganizationMutation.mutateAsync({
      promoterId: getUserData?.promoter?.id,
      organizationId: unassocitatedOrganization?.id,
    });
  };

  useEffect(() => {
    if (organizationData && selectedOrganization === null) {
      setSelectedOrganization(organizationData[0]);
    }
  });

  const organizations: number[] | undefined =
    getUserData?.promoter?.organizations.map(
      (promoterOrganization: { promoterId: number; organizationId: number }) =>
        promoterOrganization.organizationId,
    );

  const { data: organizationData } = trpc.organization.getByIds.useQuery(
    organizations,
    { enabled: !!organizations },
  );

  return (
    <>
      <SlideOver
        title="Configuration de vos organisations"
        show={showSlideOver}
        setShow={setShowSlideOver}
      >
        <SelectOrCreateOrganization
          selected={unassocitatedOrganization}
          setSelected={setUnassociatedOrganization}
          handleSelectionSubmit={handleOrganizationAssociation}
          buttonText="Associer l'organisation à votre compte"
        />
      </SlideOver>
      <nav className=" h-full w-full">
        {authProfile === "PROMOTER" && (
          <div className="border-b border-neutral-600 bg-neutral-700 py-1">
            <div className="container relative mx-auto  max-w-min px-4  sm:px-12  xl:max-w-[80rem] 2xl:max-w-[100rem]">
              <button
                onMouseEnter={() => setShowMenu(!showMenu)}
                className="group flex items-center gap-2  pr-4"
              >
                <Image
                  className="rounded-full"
                  height={30}
                  width={30}
                  src={selectedOrganization.logo.url}
                  alt={selectedOrganization.name + " logo"}
                />
                <div className="flex gap-1">
                  <p className="text-sm font-semibold text-stone-300">
                    {selectedOrganization.name}
                  </p>
                  <ChevronDownIcon
                    className={`${
                      showMenu && "opacity-100"
                    } h-5 w-5 text-stone-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100`}
                  />
                </div>
              </button>
              <div
                onMouseLeave={() => setShowMenu(false)}
                className={`${
                  showMenu ? "absolute" : "hidden"
                }  z-40 rounded-md bg-white shadow-md`}
              >
                {organizationData?.map((organization) => (
                  <button
                    key={organization.id}
                    onClick={() => setSelectedOrganization(organization)}
                    className="flex w-full items-center gap-2 rounded-lg p-2 hover:bg-neutral-100"
                  >
                    {organization.logo && (
                      <Image
                        className="rounded-full"
                        height={30}
                        width={30}
                        src={organization.logo.url}
                        alt={organization.name + " logo"}
                      />
                    )}
                    <p className="text-sm font-semibold text-black">
                      {organization.name}
                    </p>
                    <div className="grow" />
                    {selectedOrganization.id === organization.id && (
                      <CheckCircleIcon className="h-4 w-4 text-neutral-600" />
                    )}
                  </button>
                ))}
                <div className="border-t border-stone-300 ">
                  <button
                    onClick={() => setShowSlideOver(true)}
                    className="py-4 text-stone-500 hover:text-black"
                  >
                    <p className=" px-5 text-xs font-semibold  ">
                      Ajouter une organisation
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="border-b bg-neutral-700 py-3">
          <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-between px-4 sm:px-12 lg:flex-row xl:max-w-[80rem] 2xl:max-w-[100rem]">
            <div className="flex items-center gap-3">
              <div className="group relative">
                {isSignedIn ? (
                  <div>
                    <PFELogoSmall className="h-12 w-12" />
                  </div>
                ) : (
                  <>
                    <LinkBox className="absolute hidden flex-col group-hover:flex" />
                    <PFELogo
                      className=" h-28 w-28"
                      rectColor="group-hover:text-neutral-100 text-[#EF3E45]"
                      textColor="group-hover:text-neutral-300 text-white"
                    />
                  </>
                )}
              </div>
              <h1
                className="lead max-w-[10rem] text-base font-semibold
              text-stone-300 lg:leading-[1.2rem]"
              >
                Projet de fin d&apos;études à l&apos;ÉTS
              </h1>
            </div>
            <AuthShowcase {...{ isSignedIn, activeRole }} />
          </div>
        </div>
        {router.asPath !== "/" && (
          <div className="fixed bottom-4 left-10 mx-auto mt-3 h-24 px-4 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
            <Breadcrumb pages={pages} />
          </div>
        )}
      </nav>
    </>
  );
}
