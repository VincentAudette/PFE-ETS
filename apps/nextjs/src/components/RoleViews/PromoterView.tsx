import { Post } from "@acme/db";
import ProjectCard from "../ProjectCard";
import SideBarLayout, {
  NavigationItem,
  SecondaryNavigationItem,
} from "../SideBarLayout";
import { trpc } from "../../utils/trpc";

import {
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { NextRouter, Router, useRouter } from "next/router";
import { usePFEAuth } from "../../context/PFEAuthContext";
import InfoAlert from "../Forms/atoms/InfoAlert";

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
      showRightSide={router.asPath === "/projets/new"}
      rightSide={
        <div className="hyphenate max-w-[18rem]">
          <InfoAlert
            textXs={true}
            dimmed={true}
            text=" En vue d’alléger ce texte, on n’y emploie généralement que le masculin pour désigner les femmes et les hommes."
          />
        </div>
      }
    >
      <div>
        {router.pathname === "/" && (
          <div className=" flex h-full min-h-[85vh] flex-col items-center">
            <p>Vous n&apos;avez pas de PFE en cours.</p>
            <span>
              <Link
                className=" rounded-lg px-3 py-2 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                href="/projets/new"
              >
                Débuter un nouveau PFE &rarr;
              </Link>
            </span>
          </div>
        )}
        {children}
      </div>
    </SideBarLayout>
  );
}
