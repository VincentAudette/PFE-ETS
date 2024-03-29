import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SelectOption {
  id: string;
  name: string;
  type?: string | null;
}

export default function SimpleSelect({
  withLabel = true,
  maxWidth = null,
  label,
  options,
  name,
  selectedState,
  setSelectedState,
  validationError = false,
}: {
  withLabel?: boolean;
  maxWidth?: string | null;
  label: string;
  options: SelectOption[];
  name: string;
  selectedState?: SelectOption;
  setSelectedState?: React.Dispatch<React.SetStateAction<SelectOption>>;
  validationError?: boolean;
}) {
  const [selected, setSelected] = useState(options[0]);

  const textColor =
    selectedState === options[0]
      ? validationError
        ? "text-red-300"
        : "text-neutral-400"
      : validationError
      ? "text-red-900"
      : "text-neutral-900";

  return (
    <Listbox
      value={selectedState ?? selected}
      name={name}
      onChange={(value) => {
        if (setSelectedState) {
          setSelectedState(value);
        } else {
          setSelected(value);
        }
      }}
    >
      {({ open }) => (
        <div className="w-full">
          {withLabel && (
            <Listbox.Label className="block text-sm font-medium leading-6 text-neutral-900">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <Listbox.Button
              className={`relative ${
                maxWidth !== null ? maxWidth : "w-full"
              } cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-sm ${textColor} shadow-sm ring-1 ring-inset ${
                validationError ? "ring-red-300" : "ring-neutral-300"
              }  focus:outline-none focus:ring-2 focus:ring-blue-600 sm:leading-6`}
            >
              <span className="block truncate">
                {selectedState?.name ?? selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={`h-5 w-5 ${
                    validationError ? "text-red-500" : "text-neutral-400"
                  } `}
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
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-blue-600 text-white" : "text-neutral-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
            {validationError && (
              <>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-7 pb-7">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm text-red-600">
                  Ce champs est obligatoire
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </Listbox>
  );
}
