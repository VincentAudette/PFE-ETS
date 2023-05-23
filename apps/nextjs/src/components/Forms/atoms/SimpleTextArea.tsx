export interface TextAreaProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  defaultValue?: string;
  rows?: number;
}
export default function SimpleTextArea({
  label,
  name,
  id,
  placeholder,
  defaultValue = "",
  rows,
}: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          rows={rows ?? 4}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 "
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
