import Image from "next/image";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import SlideOver from "./SlideOver";

import SelectOrCreateOrganization, {
  organizationObjetDefault,
} from "./SelectOrCreateOrganization";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { Organization, File } from "@acme/db";
import { usePFEAuth } from "../context/PFEAuthContext";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";
import LoadingDots from "./LoadingDots";

export default function NavForPromoters() {
  const { isSignedIn, userId: clerkId } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showSlideOver, setShowSlideOver] = useState(false);

  const { data: getUserData } = trpc.auth.getUser.useQuery(clerkId as string, {
    enabled: !!isSignedIn,
  });

  const {
    selectedOrganization,
    setSelectedOrganization,
    authProfile,
    setUserData,
  } = usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined && authProfile === null) {
      setUserData(getUserData);
    }
  });

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
    if (!getUserData?.promoter?.id) return;
    if (
      !unassocitatedOrganization?.id ||
      unassocitatedOrganization?.id === -1
    ) {
      toast.error("Veuillez sélectionner une organisation");
      return;
    }
    associateWithOrganizationMutation.mutateAsync({
      promoterId: getUserData?.promoter?.id,
      organizationId: unassocitatedOrganization?.id,
    });
  };

  useEffect(() => {
    if (
      organizationData &&
      selectedOrganization === null &&
      organizationData[0]
    ) {
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
          handleSelectionSubmit={handleOrganizationAssociation}
          buttonText="Associer l'organisation à votre compte"
        />
      </SlideOver>

      <div className="w-screen border-b border-neutral-600 bg-neutral-700 py-1">
        <div className="container relative mx-auto   max-w-[1800px] px-4  sm:px-12">
          {!selectedOrganization ? (
            <LoadingDots darkMode={true} />
          ) : (
            <>
              <button
                onMouseEnter={() => setShowMenu(!showMenu)}
                className="group flex items-center gap-2  pr-4 transition-all duration-150 ease-out"
              >
                {selectedOrganization?.logo &&
                selectedOrganization?.logo !== null ? (
                  <Image
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={selectedOrganization?.logo.url}
                    alt={selectedOrganization?.name + " logo"}
                  />
                ) : (
                  <div className="h-8 max-h-min w-8 rounded-full">
                    <p className="h-7 w-7 text-2xl">
                      {selectedOrganization?.name.length > 2 &&
                        selectedOrganization?.name.slice(0, 1)}
                    </p>
                  </div>
                )}
                <div className="flex gap-1">
                  <p className="text-sm text-neutral-50">
                    {selectedOrganization?.name}
                  </p>
                  <ChevronDownIcon
                    className={`${
                      showMenu && "opacity-100"
                    } h-5 w-5 text-neutral-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                </div>
              </button>
              <div
                onMouseLeave={() => setShowMenu(false)}
                className={`${
                  showMenu ? "absolute" : "hidden"
                }  z-50 rounded-md bg-white shadow-md`}
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
                    {selectedOrganization?.id === organization.id && (
                      <CheckCircleIcon className="h-4 w-4 text-neutral-600" />
                    )}
                  </button>
                ))}
                <div className="border-t border-neutral-300 ">
                  <button
                    onClick={() => setShowSlideOver(true)}
                    className="py-4 text-neutral-500 hover:text-black"
                  >
                    <p className=" px-5 text-xs font-semibold  ">
                      Ajouter une organisation
                    </p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
