import { NavigationItem, SecondaryNavigationItem } from "./SideBarLayout";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VerticalNav({
  navigation,
  secondaryNavigation,
}: {
  navigation: NavigationItem[];
  secondaryNavigation?: SecondaryNavigationItem[];
}) {
  return (
    <nav className="flex min-w-[15rem] flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-neutral-200 text-black"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-black",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-black"
                        : "text-neutral-400 group-hover:text-black",
                      "h-6 w-6 shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.count ? (
                    <span
                      className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-neutral-50 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-neutral-600 ring-1 ring-inset ring-neutral-200"
                      aria-hidden="true"
                    >
                      {item.count}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <div className="text-xs font-semibold leading-6 text-neutral-400">
            Projets en cours
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {secondaryNavigation?.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-neutral-50 text-black"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-black",
                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                  )}
                >
                  <span
                    className={classNames(
                      item.current
                        ? "border-black text-black"
                        : "border-neutral-200 text-neutral-400 group-hover:border-black group-hover:text-black",
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                    )}
                  >
                    {item.initial}
                  </span>
                  <span className="truncate">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
