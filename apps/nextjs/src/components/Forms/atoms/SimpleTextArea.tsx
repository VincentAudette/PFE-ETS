export interface TextAreaProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value?: string;
  rows?: number;
  validationError?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function SimpleTextArea({
  label,
  name,
  id,
  placeholder,
  value,
  rows,
  validationError,
  onChange,
}: TextAreaProps) {
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
          onChange={onChange}
          className={
            validationError
              ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 "
          }
          placeholder={placeholder}
        />
        {validationError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {validationError && (
        <p className="mt-2 text-sm text-red-600" id={id + "-error"}>
          {validationError}
        </p>
      )}
    </div>
  );
}
