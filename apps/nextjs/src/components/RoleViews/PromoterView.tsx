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

const navigation: NavigationItem[] = [
  {
    name: "Tableau de bord",
    href: "#",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  { name: "Équipes", href: "#", icon: UsersIcon, count: "2", current: false },
  {
    name: "Nouveau PFE",
    href: "#",
    icon: PlusCircleIcon,
    current: false,
  },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
];
const secondaryNavigation: SecondaryNavigationItem[] = [
  { name: "Website redesign", href: "#", initial: "W", current: false },
  { name: "GraphQL API", href: "#", initial: "G", current: false },
];

export default function PromoterView() {
  return (
    <SideBarLayout
      navigation={navigation}
      secondaryNavigation={secondaryNavigation}
    >
      {/* <FileUploadButton /> */}
      <div>
        Vous n&apos;avez pas de PFE en cours.{" "}
        <span>
          <Link
            className=" rounded-lg px-3 py-2 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
            href=""
          >
            Cliquer ici pour en débuter un
          </Link>
        </span>
      </div>
    </SideBarLayout>
  );
}
