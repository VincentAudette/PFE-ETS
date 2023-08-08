import SideBarLayout from "../SideBarLayout";
import { trpc } from "../../utils/trpc";
import { NextRouter, useRouter } from "next/router";

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import ProjectCard from "../ProjectCard";

export function Navigation(currentIndex = -1) {
  const router = useRouter();
  const nav = [
    {
      name: "Tableau de bord",
      href: "/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: "Équipes",
      href: "/admin/group/list",
      icon: UsersIcon,
      current: false,
    },
    {
      name: "Projets",
      href: "/admin/project/list",
      icon: FolderIcon,
      // count: "12",
      current: false,
    },
    // {
    //   name: "Calendar",
    //   href: "#",
    //   icon: CalendarIcon,
    //   count: "20+",
    //   current: false,
    // },
    // {
    //   name: "Documents",
    //   href: "#",
    //   icon: DocumentDuplicateIcon,
    //   current: false,
    // },
    // { name: "Rapports", href: "#", icon: ChartPieIcon, current: false },
  ];
  if (currentIndex == -1) {
    nav.forEach((navItem) => {
      navItem.current = navItem.href === router.asPath;
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    nav[currentIndex]!.current = true;
  }
  return nav;
}

export function SecondaryNavigation(currentIndex = -1) {
  const router: NextRouter = useRouter();
  const nav = [
    { name: "Website redesign", href: "#", initial: "W", current: false },
    { name: "GraphQL API", href: "#", initial: "G", current: false },
    {
      name: "Customer migration guides",
      href: "#",
      initial: "C",
      current: false,
    },
    { name: "Profit sharing program", href: "#", initial: "P", current: false },
  ];
  if (currentIndex == -1) {
    nav.forEach((navItem) => {
      navItem.current = navItem.href === router.asPath;
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    nav[currentIndex]!.current = true;
  }
  return nav;
}

export default function AdminView({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router: NextRouter = useRouter();

  return (
    <SideBarLayout
      navigation={Navigation()}
      secondaryNavigation={SecondaryNavigation()}
    >
      <div>{children}</div>
    </SideBarLayout>
  );
}
