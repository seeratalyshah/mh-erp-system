import { useFormContext, Controller } from "react-hook-form";

interface RHFRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  outerLabel?: string;
  disabled?: boolean;
  required?: boolean;
  [key: string]: any;
}

export function RHFRadioGroup({
  name,
  options,
  outerLabel,
  disabled = false,
  required = false,
  ...other
}: RHFRadioGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, field: { onChange }, fieldState: { error } }) => (
        <div id={name}>
          {outerLabel && (
            <label className="block text-sm font-medium text-gray-700">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <div className="flex space-x-4 mt-1" {...other}>
            {options.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={value}
                  checked={field.value === value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (typeof newValue !== "string") return;
                    onChange(newValue);
                  }}
                  disabled={disabled}
                  className={`h-4 w-4 border-2 ${
                    error ? "border-red-500" : "border-gray-300"
                  } accent-[#0488a6] `}
                />
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>
          {Boolean(error) && (
            <div className="text-red-500 text-sm mt-1">{error?.message}</div>
          )}
        </div>
      )}
    />
  );
}
