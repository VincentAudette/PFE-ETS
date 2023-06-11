import SideBarLayout, {
  NavigationItem,
  SecondaryNavigationItem,
} from "../SideBarLayout";

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { usePFEAuth } from "../../context/PFEAuthContext";
import InfoAlert from "../Forms/atoms/InfoAlert";
import ProjectCard from "../ProjectCard";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

const navigation: NavigationItem[] = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  { name: "Équipes", href: "#", icon: UsersIcon, count: "2", current: false },
  {
    name: "Nouveau PFE",
    href: "/projets/new",
    icon: PlusCircleIcon,
    current: false,
  },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
];
const secondaryNavigation: SecondaryNavigationItem[] = [
  { name: "Website redesign", href: "#", initial: "W", current: false },
  { name: "GraphQL API", href: "#", initial: "G", current: false },
];

export default function PromoterView({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router: NextRouter = useRouter();

  console.log("router.asPath", router.asPath);

  const { userData } = usePFEAuth();

  console.log("userData", userData);
  console.log("routerAspath", router.asPath);

  navigation.forEach((navItem) => {
    navItem.current = navItem.href === router.asPath;
  });

  // if (userData.role === "UNASSIGNED") {
  //   return <div>TEST</div>;
  // }

  return (
    <SideBarLayout
      navigation={navigation}
      secondaryNavigation={secondaryNavigation}
      showAfterNav={router.asPath === "/projets/new"}
      afterNav={
        <div className="hyphenate max-w-[18rem]">
          <InfoAlert
            textXs={true}
            dimmed={true}
            text=" En vue d’alléger ce texte, on n’y emploie généralement que le masculin pour désigner les femmes et les hommes."
          />
        </div>
      }
    >
      <div className="w-full">
        {router.pathname === "/" &&
          (userData?.promoter?.projects.length >= 1 ? (
            <div className="w-full">
              {userData?.promoter?.projects !== undefined &&
                userData?.promoter?.projects?.map((project: any) => {
                  console.log("project", project);
                  return <ProjectCard key={project.id} project={project} />;
                })}
            </div>
          ) : (
            <div className=" flex h-full min-h-[85vh] justify-center flex-col sm:gap-5 gap-1 lg:flex-row items-center">
              <p>Vous n&apos;avez pas de PFE en cours.</p>
              <span>
                <Link
                  className=" rounded-lg px-3 py-2 bg-blue-600 text-white hover:bg-blue-500"
                  href="/projets/new"
                >
                  Débuter un nouveau PFE &rarr;
                </Link>
              </span>
            </div>
          ))}
        {children}
      </div>
    </SideBarLayout>
  );
}
