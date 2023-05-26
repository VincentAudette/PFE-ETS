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
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:bg-stone-100 disabled:text-stone-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          disabled={value ? true : false}
          {...(value && { value })}
        />
      </div>
    </div>
  );
}
