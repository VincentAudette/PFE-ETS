import { Dispatch, Fragment, SetStateAction } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  BuildingOfficeIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { File, Organization } from "@acme/db";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectWithImage({
  name,
  label,
  options,
  selected,
  setSelected,
}: {
  name: string;
  label?: string;
  options: (Organization & { logo: File | null })[] | undefined;
  selected: (Organization & { logo: File | null }) | null;
  setSelected: Dispatch<SetStateAction<
    (Organization & { logo: File | null }) | null
  > | null> | null;
}) {
  return (
    <Listbox
      value={selected}
      name={name}
      onChange={setSelected !== null ? setSelected : undefined}
    >
      {({ open }) => (
        <div className="w-full">
          {label && (
            <Listbox.Label className="block text-sm font-medium leading-6 text-neutral-900">
              {label}
            </Listbox.Label>
          )}
          <div className={`relative ${label && "mt-2"}`}>
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
              {selected == null ? (
                <span className="block truncate">
                  Selectionner un organisation
                </span>
              ) : (
                <span className="flex items-center">
                  {selected?.logo?.url ? (
                    <Image
                      src={selected?.logo?.url}
                      alt=""
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <div className="flex h-5 w-5 flex-shrink-0 rounded-full bg-red-100">
                      <BuildingOfficeIcon className="m-auto h-3 w-3 text-red-800 " />
                    </div>
                  )}
                  <span className="ml-3 block truncate">{selected?.name}</span>
                </span>
              )}
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map(
                  (organisation: Organization & { logo: File | null }) => (
                    <Listbox.Option
                      key={organisation.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-blue-600 text-white"
                            : "text-neutral-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                        )
                      }
                      value={organisation}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            {organisation?.logo ? (
                              <Image
                                src={organisation?.logo?.url}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                                width={20}
                                height={20}
                              />
                            ) : (
                              <div className="flex h-5 w-5 flex-shrink-0 rounded-full bg-red-100">
                                <p className="text-800 m-auto text-xs font-bold text-red-800">
                                  {organisation?.name[0]}
                                </p>
                              </div>
                            )}
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate",
                              )}
                            >
                              {organisation.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ),
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
