import { Controller, useFormContext } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";

interface RHFDatePickerProps {
  name: string;
  readOnly?: boolean;
  outerLabel?: string;
  asSingle?: boolean;
  useRange?: boolean;
  required?: boolean;
  popoverDirection?: "up" | "down";
  helperText?: string;
  [key: string]: any;
}

export function RHFDatePicker({
  name,
  readOnly = false,
  outerLabel,
  asSingle = true,
  useRange = false,
  required = false,
  popoverDirection = "down",
  helperText,
  ...other
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          {outerLabel && (
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <Datepicker
            primaryColor="blue"
            popoverDirection={popoverDirection}
            inputClassName={`w-full border focus:border-[1px] focus:border-[#26BBDD] ${
              error ? "border-2 border-red-400" : "border-gray-300"
            } rounded p-2 focus:outline-none mt-1 placeholder:text-[14px] disabled:bg-gray-100 disabled:text-[#252525] disabled:text-md disabled:text-gray-500`}
            useRange={useRange}
            asSingle={asSingle}
            value={value}
            {...other}
            onChange={onChange}
          />
          {error?.message && (
            <label className="text-red-500 text-sm mr-1">
              {error?.message}
            </label>
          )}
          {helperText && (
            <div className="text-[13px] text-gray-500">{helperText}</div>
          )}
        </div>
      )}
    />
  );
}
