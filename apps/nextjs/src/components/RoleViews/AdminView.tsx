import SideBarLayout, {
  NavigationItem,
  SecondaryNavigationItem,
} from "../SideBarLayout";
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

const navigation: NavigationItem[] = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  { name: "Équipes", href: "/groups/list", icon: UsersIcon, current: false },
  {
    name: "Projets",
    href: "/projets/list",
    icon: FolderIcon,
    count: "12",
    current: false,
  },
  {
    name: "Calendar",
    href: "#",
    icon: CalendarIcon,
    count: "20+",
    current: false,
  },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Rapports", href: "#", icon: ChartPieIcon, current: false },
];
const secondaryNavigation: SecondaryNavigationItem[] = [
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

export default function AdminView({
  children,
}: {
  children?: React.ReactNode;
}) {
  const postQuery = trpc.post.all.useQuery();

  const router: NextRouter = useRouter();
  navigation.forEach((navItem) => {
    navItem.current = navItem.href === router.asPath;
  });

  return (
    <SideBarLayout
      navigation={navigation}
      secondaryNavigation={secondaryNavigation}
    >
      <div>
        {router.pathname === "/" && (
          <div>
            {/* TODO Could be in his own element */}
            {postQuery.data ? (
              <div className="flex w-full flex-col gap-4">
                {postQuery.data?.map((p: Post) => {
                  return <ProjectCard key={p.id} post={p} />;
                })}
              </div>
            ) : (
              <p>Loading..</p>
            )}
          </div>
        )}
        {children}
      </div>
    </SideBarLayout>
  );
}
