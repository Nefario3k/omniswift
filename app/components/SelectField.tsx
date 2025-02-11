// components/SelectField.tsx
interface SelectFieldProps {
  label: string;
  disabled: boolean;
  value: string | number;
  options: Array<string | number>;
  onChange: (value: string | number) => void;
}

export default function SelectField({
  label,
  value,
  options,
  disabled,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="relative w-full h-[49px] border border-bc-1 rounded p-3 flex items-end">
      <label
        htmlFor={label}
        className="font-medium text-dark-1 text-sm absolute -top-3 left-1 flex items-center justify-center bg-white px-2"
      >
        <span>{label}</span>
      </label>
      <div className="flex items-center justify-between gap-3 w-full">
        <p
          className={`${
            value ? "text-dark-1 capitalize" : "text-dark-2 lowercase"
          } font-normal text-sm`}
        >
          {value ? value : `Select ${label}`}
        </p>
        <svg
          className="block min-w-3 h-[8px] w-3"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.41 -7.62939e-08L6 4.59L10.59 -7.62939e-08L12 1.42L6 7.42L0 1.42L1.41 -7.62939e-08Z"
            fill="#343434"
            fillOpacity="0.6"
          />
        </svg>
      </div>
      <select
        disabled={disabled}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-none outline-none p-2 absolute w-full h-full top-0 left-0 rounded cursor-pointer opacity-0"
      >
        <option disabled defaultValue="" value={label === "Age" ? 0 : ""}>
          Select {label}
        </option>
        {options.map((option) => (
          <option className="capitalize" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
