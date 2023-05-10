import AuthShowcase from "./AuthShowcase";
import PFELogo from "./PFELogo";
import LinkBox from "./LinkBox";

export default function TopNav() {
  return (
    <nav className=" h-32 w-full  border-b bg-[#414042]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
        <div className="flex items-center gap-3">
          <div className="group relative">
            <LinkBox className="absolute hidden flex-col group-hover:flex" />
            <PFELogo
              className=" h-28 w-28"
              rectColor="group-hover:text-neutral-100 text-[#EF3E45]"
              textColor="group-hover:text-neutral-300 text-white"
            />
          </div>
          <h1 className="lead max-w-[11.5rem] text-lg font-bold leading-[1.6rem] tracking-tight text-white">
            App de gestion des projets de fin d&apos;études
          </h1>
        </div>
        <AuthShowcase />
      </div>
    </nav>
  );
}
