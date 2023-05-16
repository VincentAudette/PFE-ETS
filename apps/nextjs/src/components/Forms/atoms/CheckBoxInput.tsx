export default function CheckBoxInput({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: string;
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          name={name}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={name} className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
}
