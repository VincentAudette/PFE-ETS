export interface InputWithLabelProps {
  type?: string;
  label?: string;
  name: string;
  value?: string;
  id?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  withLabel?: boolean;
}
export default function SimpleInput({
  type = "text",
  label,
  name,
  value,
  id,
  placeholder,
  onChange,
  withLabel = true,
}: InputWithLabelProps) {
  return (
    <div>
      {withLabel && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          onChange={onChange}
          value={value}
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
