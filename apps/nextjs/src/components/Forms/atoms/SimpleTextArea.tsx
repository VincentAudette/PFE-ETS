export interface TextAreaProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  rows?: number;
  validationError?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function SimpleTextArea({
  label,
  name,
  id,
  placeholder,
  value,
  rows,
  validationError,
  onChange,
  maxLength,
}: TextAreaProps) {
  const [valueExceedsMaxLength, setValueExceedsMaxLength] = useState(false);
  const [valueLength, setValueLength] = useState(0);
  if (value && maxLength && value?.length > maxLength) {
    setValueExceedsMaxLength(true);
  }
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md">
        <textarea
          rows={rows ?? 4}
          name={name}
          id={id}
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e);
            setValueLength(e.target.value.length);
            if (maxLength) {
              setValueExceedsMaxLength(e.target.value.length > maxLength);
            }
          }}
          className={
            validationError || valueExceedsMaxLength
              ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 "
          }
          placeholder={placeholder}
        />
        {(validationError || valueExceedsMaxLength) && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <div className="flex gap-1">
        {validationError && (
          <p className="mt-2 text-sm text-red-600" id={id + "-error"}>
            {validationError}
          </p>
        )}

        {maxLength && (
          <span
            className={
              valueExceedsMaxLength
                ? "mt-2 text-sm text-red-600"
                : "mt-2 text-sm text-gray-500"
            }
            id={id + "-description"}
          >
            {`(${valueLength}/${maxLength})`}
          </span>
        )}
      </div>
    </div>
  );
}
