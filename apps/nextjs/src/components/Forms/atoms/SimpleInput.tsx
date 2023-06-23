import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export interface InputWithLabelProps {
  type?: string;
  label?: string;
  name: string;
  value?: string | number;
  id?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  withLabel?: boolean;
  validationError?: string;
  autoComplete?: string;
}
export default function SimpleInput({
  type = "text",
  label,
  autoComplete,
  name,
  value,
  id,
  placeholder,
  onChange,
  withLabel = true,
  validationError,
}: InputWithLabelProps) {
  return (
    <div>
      {withLabel && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2 min-w-[10rem] rounded-md">
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={id}
          className={
            validationError
              ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              : "block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
      <p className="mt-2 text-sm text-red-600" id={id + "-error"}>
        {validationError}
      </p>
    </div>
  );
}
