import SlideOver from "./SlideOver";
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
  showAfterNav = false,
  afterNav,
  showMobileNav = false,
  setShowMobileNav,
}: {
  navigation: NavigationItem[];
  secondaryNavigation?: SecondaryNavigationItem[];
  children: React.ReactNode;
  rightSide?: React.ReactNode;
  showRightSide?: boolean;
  showAfterNav?: boolean;
  afterNav?: React.ReactNode;
  showMobileNav?: boolean;
  setShowMobileNav?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className=" mx-auto flex w-full max-w-5xl justify-between px-4 sm:gap-10 sm:px-12 xl:max-w-[80rem] 2xl:max-w-[100rem]">
      <div className="sm:hidden">
        {setShowMobileNav && (
          <SlideOver
            title="Menu"
            show={showMobileNav}
            setShow={setShowMobileNav}
          >
            <VerticalNav
              navigation={navigation}
              secondaryNavigation={secondaryNavigation}
            />
          </SlideOver>
        )}
      </div>
      <div className="mt-5 hidden lg:block">
        <VerticalNav
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
        />
        {showAfterNav && <div className="mt-3">{afterNav}</div>}
      </div>
      {/* <div className="ml-20 h-full w-[1px] rounded-full bg-neutral-200"></div> */}
      <div className="container flex w-full flex-col items-center justify-center gap-12 md:min-w-[48rem] xl:min-w-[52rem] ">
        <div className="flex h-max w-full justify-center overflow-y-scroll border-x p-4 text-2xl">
          {children}
        </div>
      </div>
      {showRightSide && <div className="mt-3"> {rightSide}</div>}
    </div>
  );
}
