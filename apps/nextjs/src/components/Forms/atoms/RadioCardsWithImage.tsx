import { Dispatch, SetStateAction } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface RadioCardsWithImageOption {
  id: number;
  title: string;
  description: string;
  src: string;
}

export default function RadioCardsWithImage({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: {
  title: string;
  options: RadioCardsWithImageOption[] | undefined;
  selectedOption: RadioCardsWithImageOption | null;
  setSelectedOption:
    | Dispatch<SetStateAction<RadioCardsWithImageOption | null>>
    | undefined;
}) {
  return (
    <RadioGroup
      className="py-5"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {options?.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "border-blue-600 ring-2 ring-blue-600" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <RadioGroup.Description
                        as={Image}
                        className=" h-auto w-12 text-sm font-medium text-gray-900"
                        src={option.src}
                        alt=""
                        width={400}
                        height={400}
                      />
                      <RadioGroup.Label
                        as="span"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {option.title}
                      </RadioGroup.Label>
                    </div>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {option.description}
                    </RadioGroup.Description>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-blue-600",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-blue-600" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg",
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
