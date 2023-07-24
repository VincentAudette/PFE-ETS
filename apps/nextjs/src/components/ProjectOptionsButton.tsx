import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectOptionsButton({
  projectId,
  onPage = false,
}: {
  projectId: string;
  onPage?: boolean;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left print:hidden">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50">
          Options
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-neutral-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-neutral-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/projets/edit/${projectId}`}
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "group flex items-center px-4 py-2 text-sm",
                  )}
                >
                  <PencilSquareIcon
                    className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                    aria-hidden="true"
                  />
                  Modifier
                </Link>
              )}
            </Menu.Item>
            {!onPage && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/projets/${projectId}`}
                    className={classNames(
                      active
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700",
                      "group flex items-center px-4 py-2 text-sm",
                    )}
                  >
                    <ArrowsPointingOutIcon
                      className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                      aria-hidden="true"
                    />
                    Ouvrir
                  </Link>
                )}
              </Menu.Item>
            )}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "group flex items-center px-4 py-2 text-sm",
                  )}
                >
                  <ArchiveBoxIcon
                    className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                    aria-hidden="true"
                  />
                  Archiver
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "group flex items-center px-4 py-2 text-sm",
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                    aria-hidden="true"
                  />
                  Transférer
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "group flex items-center px-4 py-2 text-sm",
                  )}
                >
                  <TrashIcon
                    className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                    aria-hidden="true"
                  />
                  Supprimer
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
