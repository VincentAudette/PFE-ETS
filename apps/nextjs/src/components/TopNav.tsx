import AuthShowcase from "./AuthShowcase";
import PFELogo from "./PFELogo";
import LinkBox from "./LinkBox";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/router";
import PFELogoSmall from "./PFELogoSmall";
import InfoAlert from "./Forms/atoms/InfoAlert";
import { usePFEAuth } from "../context/PFEAuthContext";
import Image from "next/image";
import {
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

export default function TopNav({
  organizationData,
  isSignedIn,
  activeRole,
  pages,
}: {
  organizationData?: any[] | null;
  isSignedIn: boolean | undefined;
  activeRole: string | undefined;
  pages?: { name: string; href: string; current: boolean }[];
}) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { selectedOrganization, setSelectedOrganization, authProfile } =
    usePFEAuth();

  return (
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
                  <Image
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={organization.logo.url}
                    alt={organization.name + " logo"}
                  />
                  <p className="text-sm font-semibold text-black">
                    {organization.name}
                  </p>
                  <div className="grow" />
                  <CheckCircleIcon className="h-4 w-4 text-neutral-600" />
                </button>
              ))}
              <div className="border-t border-stone-300 ">
                <button className="py-4 text-stone-500 hover:text-black">
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
  );
}
