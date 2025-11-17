import {  Controller } from "react-hook-form";
import Label from "./Label";



const Select = ({
  label,
  options=[],
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  error = "",
  name,
  control,
}: any) => {
  const inputClasses =
    `h-11 w-full appearance-none rounded-lg border bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ` +
    (error
      ? `border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`
      : "");

  return (
    <div className="mb-8">
      {label && <Label htmlFor={name}>{label}</Label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange: fieldOnChange, value, onBlur } }) => (
          <select
            id={name}
            className={`${inputClasses} ${
              value ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"
            } ${className}`}
            value={value}
            onBlur={onBlur}
            onChange={(e) => {
              fieldOnChange(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option:any) => (
              <option
                key={option.value}
                value={option.value}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
