import VerticalNav from "./VerticalNav";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  count?: string;
  current: boolean;
}

export interface SecondaryNavigationItem {
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

export default function SideBarLayout({
  navigation,
  secondaryNavigation,
  children,
  rightSide,
  showRightSide = false,
}: {
  navigation: NavigationItem[];
  secondaryNavigation?: SecondaryNavigationItem[];
  children: React.ReactNode;
  rightSide?: React.ReactNode;
  showRightSide?: boolean;
}) {
  return (
    <div className=" mx-auto flex w-full max-w-5xl justify-between gap-10 px-4 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
      <div className="mt-5">
        <VerticalNav
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
        />
      </div>
      {/* <div className="ml-20 h-full w-[1px] rounded-full bg-neutral-200"></div> */}
      <div className="container flex w-full flex-col items-center justify-center gap-12 ">
        <div className="flex h-max w-full justify-center overflow-y-scroll border-x p-4 text-2xl">
          {children}
        </div>
      </div>
      <div className="mt-3">{showRightSide && rightSide}</div>
    </div>
  );
}
