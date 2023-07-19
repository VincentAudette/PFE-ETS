import { usePFEAuth } from "../context/PFEAuthContext";
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
}: {
  navigation: NavigationItem[];
  secondaryNavigation?: SecondaryNavigationItem[];
  children: React.ReactNode;
  rightSide?: React.ReactNode;
  showRightSide?: boolean;
  showAfterNav?: boolean;
  afterNav?: React.ReactNode;
}) {
  const { showMobileNav, setShowMobileNav } = usePFEAuth();
  return (
    <div className="mx-auto flex h-[88vh] w-full max-w-[1800px] justify-between border-b bg-white px-4 sm:gap-10 sm:px-12 ">
      <div className="sm:hidden">
        {setShowMobileNav && (
          <SlideOver
            title="Menu"
            show={showMobileNav || false}
            setShow={setShowMobileNav}
          >
            <VerticalNav
              navigation={navigation}
              secondaryNavigation={secondaryNavigation}
            />
          </SlideOver>
        )}
      </div>
      <div
        className={`mt-5 hidden min-w-[16rem] max-w-[20rem] ${
          showRightSide ? "w-1/6" : ""
        } lg:block`}
      >
        <VerticalNav
          navigation={navigation}
          secondaryNavigation={secondaryNavigation}
        />
        {showAfterNav && <div className="mt-3">{afterNav}</div>}
      </div>
      {/* <div className="ml-20 h-full w-[1px] rounded-full bg-neutral-200"></div> */}
      <div
        className={`container flex ${
          showRightSide ? "w-full sm:w-3/6" : "w-full"
        } flex-col items-center justify-start gap-12  `}
      >
        <div className="flex w-full grow justify-center overflow-y-scroll border-x">
          {children}
        </div>
      </div>
      {showRightSide && (
        <div
          className={`hidden sm:block ${showRightSide ? "w-3/6" : "w-full"}`}
        >
          {" "}
          {rightSide}
        </div>
      )}
    </div>
  );
}
