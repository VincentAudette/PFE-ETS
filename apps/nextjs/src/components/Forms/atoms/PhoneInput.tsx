import React from "react";
import PhoneInputComponent, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneInput({
  name,
  value,
  onChange,
  label,
  withLabel = true,
}: {
  name: string;
  value?: string;
  label?: string;
  withLabel?: boolean;
  onChange: (
    value: string,
    data: CountryData | any,
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string,
  ) => void;
}) {
  return (
    <div>
      {withLabel && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium leading-6 text-neutral-900"
        >
          {label}
        </label>
      )}
      <PhoneInputComponent country={"ca"} value={value} onChange={onChange} />
    </div>
  );
}
