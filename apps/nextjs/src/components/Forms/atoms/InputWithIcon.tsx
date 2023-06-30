import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { InputWithLabelProps } from "./SimpleInput";

export interface InputWithLabelAndIconProps extends InputWithLabelProps {
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  darkMode?: boolean;
  value?: string;
  validationError?: string;
}

export default function InputWithIcon({
  type,
  label,
  name,
  id,
  placeholder,
  Icon,
  value,
  darkMode = false,
  validationError,
}: InputWithLabelAndIconProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium leading-6 ${
          darkMode ? "text-neutral-200" : "text-neutral-900"
        }`}
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon
            className={`h-5 w-5 ${
              validationError ? "text-red-400" : "text-neutral-400"
            }`}
            aria-hidden="true"
          />
        </div>
        <input
          type={type}
          name={name}
          id={id}
          className={`block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset  focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:bg-neutral-100 disabled:text-neutral-600 sm:text-sm sm:leading-6 ${
            validationError
              ? "text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500"
              : "text-neutral-900 ring-neutral-300 placeholder:text-neutral-400"
          }`}
          placeholder={placeholder}
          disabled={value ? true : false}
          {...(value && { value })}
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
