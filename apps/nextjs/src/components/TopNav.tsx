import AuthShowcase from "./AuthShowcase";
import PFELogo from "./PFELogo";
import LinkBox from "./LinkBox";
import Breadcrumb from "./Breadcrumb";
import { useRouter } from "next/router";

export default function TopNav({
  isSignedIn,
  activeRole,
  pages,
}: {
  isSignedIn: boolean | undefined;
  activeRole: string | undefined;
  pages?: { name: string; href: string; current: boolean }[];
}) {
  const router = useRouter();
  return (
    <nav className=" h-full w-full ">
      <div className="border-b bg-[#414042]  py-3">
        <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-between px-4 sm:px-12 lg:flex-row xl:max-w-[80rem] 2xl:max-w-[100rem]">
          <div className="flex items-center gap-3">
            <div className="group relative">
              <LinkBox className="absolute hidden flex-col group-hover:flex" />
              <PFELogo
                className=" h-28 w-28"
                rectColor="group-hover:text-neutral-100 text-[#EF3E45]"
                textColor="group-hover:text-neutral-300 text-white"
              />
            </div>
            <h1 className="lead max-w-[11.5rem] text-xs font-bold tracking-tight text-white lg:text-lg lg:leading-[1.6rem]">
              App de gestion des projets de fin d&apos;études
            </h1>
          </div>
          <AuthShowcase {...{ isSignedIn, activeRole }} />
        </div>
      </div>
      {router.asPath !== "/" && (
        <div className="mx-auto mt-3 h-24 px-4 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
          <Breadcrumb pages={pages} />
        </div>
      )}
    </nav>
  );
}
