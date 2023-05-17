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

  if (
    navigation[0] !== undefined &&
    navigation[1] !== undefined &&
    navigation[2] !== undefined &&
    navigation[3] !== undefined
  ) {
    if (router.asPath === "/") {
      navigation[0].current = true;
      navigation[1].current = false;
      navigation[2].current = false;
      navigation[3].current = false;
    }

    if (router.pathname.includes("projets/new")) {
      navigation[0].current = false;
      navigation[1].current = false;
      navigation[2].current = true;
      navigation[3].current = false;
    }
  }

  // if (userData.role === "UNASSIGNED") {
  //   return <div>TEST</div>;
  // }

  return (
    <SideBarLayout
      navigation={navigation}
      secondaryNavigation={secondaryNavigation}
    >
      {/* <FileUploadButton /> */}
      <div>
        {router.pathname === "" && (
          <div>
            Vous n&apos;avez pas de PFE en cours.{" "}
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
