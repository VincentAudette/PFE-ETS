import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { department } from "./Forms/PFEForm/helpers";
import { usePFEAuth } from "../context/PFEAuthContext";
import { Organization } from "@acme/db";
import { projectStatusMap } from "./ProjectView";

const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
];

const filters: {
  id: "status" | "department" | "organization";
  name: string;
  options: any[];
}[] = [
  {
    id: "status",
    name: "Statut",
    options: Array.from(projectStatusMap, ([id, name]) => ({ id, name })),
  },
  {
    id: "department",
    name: "Département",
    options: department,
  },
  {
    id: "organization",
    name: "Organisation",
    options: [],
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export type FilterByRole = "PROMOTER" | "ADMIN";

export default function Filters({
  role,
  filterSelections,
  setFilterSelections,
}: {
  role: FilterByRole;
  filterSelections: any;
  setFilterSelections: Dispatch<SetStateAction<any>>;
}) {
  const [open, setOpen] = useState(false);
  const { userData } = usePFEAuth();

  useEffect(() => {
    if (role === "ADMIN") {
      // filters[1].options = department;
    } else if (role === "PROMOTER" && !!filters[2]) {
      filters[2].options =
        userData?.promoter?.organizations?.map(
          (org: { organization: Organization }) => ({
            name: org.organization.name,
            id: org.organization.id,
          }),
        ) || [];
    }
  }, [role, userData]);

  return (
    <div className="">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50  sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-neutral-900">
                    Filtres
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-neutral-600 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="border-t border-neutral-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-neutral-400">
                              <span className="font-medium text-neutral-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform",
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFilterSelections({
                                          ...filterSelections,
                                          [section.id]: [
                                            ...filterSelections[section.id],
                                            option.id,
                                          ],
                                        });
                                      } else {
                                        setFilterSelections({
                                          ...filterSelections,
                                          [section.id]: filterSelections[
                                            section.id
                                          ].filter(
                                            (id: string) => id !== option.id,
                                          ),
                                        });
                                      }
                                    }}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.id}
                                    checked={filterSelections[
                                      section.id
                                    ]?.includes(option.id)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-neutral-500"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-3xl bg-white px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" className=" py-6">
          <h2 id="filter-heading" className="sr-only">
            Filtres pour le project
          </h2>

          <div className="flex items-center justify-between">
            <div className="grow" />
            {/* <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-neutral-700 hover:text-neutral-900">
                  Trier
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-neutral-500"
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
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.href}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? "bg-neutral-100" : "",
                              "block px-4 py-2 text-sm font-medium text-neutral-900",
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}

            <button
              type="button"
              className="inline-block text-sm font-medium text-neutral-700 hover:text-neutral-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filtres
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  as="div"
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-neutral-700 hover:text-neutral-900">
                      <span>{section.name}</span>
                      {filterSelections[section.id]?.length > 0 ? (
                        <span className="ml-1.5 rounded bg-neutral-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-neutral-700">
                          {filterSelections[section.id]?.length}
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-neutral-400 group-hover:text-neutral-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
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
                    <Popover.Panel className="absolute right-0 z-10 mt-2 max-h-[60vh] origin-top-right overflow-y-scroll rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.options.map(
                          (option, optionIdx) =>
                            !option.name?.includes("Choisir") && (
                              <div
                                key={option.id}
                                className="flex items-center"
                              >
                                <input
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFilterSelections({
                                        ...filterSelections,
                                        [section.id]: [
                                          ...filterSelections[section.id],
                                          option.id,
                                        ],
                                      });
                                    } else {
                                      setFilterSelections({
                                        ...filterSelections,
                                        [section.id]: filterSelections[
                                          section.id
                                        ].filter(
                                          (id: string) => id !== option.id,
                                        ),
                                      });
                                    }
                                  }}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.id}
                                  checked={filterSelections[
                                    section.id
                                  ]?.includes(option.id)}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-neutral-900"
                                >
                                  {option.name}
                                </label>
                              </div>
                            ),
                        )}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  );
}
