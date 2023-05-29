export default function CheckBoxInput({
  id,
  label,
  name,
  checked,
  onChange
}: {
  id: string;
  label: string;
  name: string;
  checked?:boolean;
  onChange?:React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          name={name}
          type="checkbox"
          checked={checked} // Pass checked prop here
          onChange={onChange} 
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
