import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { usePFEAuth } from "../context/PFEAuthContext";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MinimalMenu() {
  const { setAuthProfile } = usePFEAuth();
  return (
    <Menu as="div" className="relative z-[45] inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-500">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAuthProfile("DEVELOPER")}
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "block w-full px-4 py-2 text-sm",
                  )}
                >
                  Développeur
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAuthProfile("STUDENT")}
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "block w-full px-4 py-2 text-sm",
                  )}
                >
                  Étudiant
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAuthProfile("PROMOTER")}
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "block w-full px-4 py-2 text-sm",
                  )}
                >
                  Promoteur
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAuthProfile("ADMIN")}
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "block w-full px-4 py-2 text-sm",
                  )}
                >
                  Administrateur
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
