import AuthShowcase from "./AuthShowcase";
import PFELogo from "./SVG/PFELogo";
import LinkBox from "./LinkBox";
import PFELogoSmall from "./SVG/PFELogoSmall";
import { usePFEAuth } from "../context/PFEAuthContext";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import { useAuth } from "@clerk/nextjs";
import NavForPromoters from "./NavForPromoters";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function TopNav({
  pages,
}: {
  pages?: { name: string; href: string; current: boolean }[];
}) {
  const { isSignedIn, userId: clerkId } = useAuth();

  const { data: getUserData } = trpc.auth.getUser.useQuery(clerkId as string, {
    enabled: !!isSignedIn,
  });

  const {
    authProfile,
    userData,
    setUserData,
    showMobileNav,
    setShowMobileNav,
  } = usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined && authProfile === null && setUserData) {
      setUserData(getUserData);
    }
  });

  const activeRole = authProfile !== null ? authProfile : userData?.role;

  return (
    <>
      {(userData?.role === "PROMOTER" || authProfile == "PROMOTER") && (
        <NavForPromoters />
      )}
      <nav className=" z-[45] h-full w-full">
        <div className="border-b bg-neutral-700 py-1">
          <div
            className={`mx-auto flex h-full ${
              isSignedIn ? "max-w-[1800px]" : "max-w-[1180px] py-3"
            } flex-col items-center justify-between px-4 sm:px-12 lg:flex-row `}
          >
            <div className="flex w-screen items-center gap-3 px-4 lg:px-0">
              <div className="group relative">
                {isSignedIn ? (
                  <div>
                    <PFELogoSmall className="h-[2.8rem] w-auto" />
                  </div>
                ) : (
                  <>
                    <LinkBox className="absolute hidden flex-col group-hover:flex" />
                    <PFELogo
                      className="h-36 w-36"
                      rectColor="group-hover:text-neutral-100 text-[#EF3E45]"
                      textColor="group-hover:text-neutral-300 text-white"
                    />
                  </>
                )}
              </div>
              <h1
                className="lead max-w-xs text-base
              font-semibold text-white lg:leading-[1.2rem]"
              >
                Projet de fin d&apos;études à <br />
                l&apos;École de Technologie Supérieure
              </h1>
              <div className="grow lg:hidden" />
              <button
                className="block rounded-md bg-stone-500 p-1 text-white ring-offset-1 hover:bg-stone-800 focus:ring-2 focus:ring-red-400 lg:hidden"
                onClick={() => {
                  if (!setShowMobileNav) return;
                  setShowMobileNav(true);
                }}
              >
                <Bars3Icon className="h-[2.7rem] w-[2.7rem]" />
              </button>
            </div>
            <AuthShowcase {...{ isSignedIn, activeRole }} />
          </div>
        </div>

        {/* {router.asPath !== "/" && (
          <div className="fixed bottom-4 z-50 mx-auto mt-3 px-4 sm:left-10 sm:h-24 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
            <Breadcrumb pages={pages} />
          </div>
        )} */}
      </nav>
    </>
  );
}
