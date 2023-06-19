import AuthShowcase from "./AuthShowcase";
import PFELogo from "./SVG/PFELogo";
import LinkBox from "./LinkBox";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/router";
import PFELogoSmall from "./SVG/PFELogoSmall";
import { usePFEAuth } from "../context/PFEAuthContext";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import { useAuth } from "@clerk/nextjs";
import NavForPromoters from "./NavForPromoters";

export default function TopNav({
  pages,
}: {
  pages?: { name: string; href: string; current: boolean }[];
}) {
  const { isSignedIn, userId: clerkId } = useAuth();

  const { data: getUserData } = trpc.auth.getUser.useQuery(clerkId as string, {
    enabled: !!isSignedIn,
  });
  const router = useRouter();

  const { authProfile, userData, setUserData } = usePFEAuth();

  useEffect(() => {
    if (getUserData !== undefined && authProfile === null) {
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
          <div className="mx-auto flex h-full max-w-[1800px] flex-col items-center justify-between px-4 sm:px-12 lg:flex-row ">
            <div className="flex items-center gap-3">
              <div className="group relative">
                {isSignedIn ? (
                  <div>
                    <PFELogoSmall className="h-[2.8rem] w-auto" />
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
                className="lead text-base font-semibold
              text-white lg:leading-[1.2rem]"
              >
                Projet de fin d&apos;études à l&apos;ÉTS
              </h1>
            </div>
            <AuthShowcase {...{ isSignedIn, activeRole }} />
          </div>
        </div>
        {router.asPath !== "/" && (
          <div className="fixed bottom-4 z-50 mx-auto mt-3 px-4 sm:left-10 sm:h-24 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
            <Breadcrumb pages={pages} />
          </div>
        )}
      </nav>
    </>
  );
}
