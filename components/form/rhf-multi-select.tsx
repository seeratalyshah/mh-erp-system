import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface RHFSelectProps {
  name: string;
  outerLabel?: string;
  options: Option[];
  isMulti?: boolean;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  helperText?: string;
}

export function RHFSelect({
  name,
  outerLabel,
  options,
  isMulti,
  required = false,
  disabled,
  isLoading,
  helperText,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);
  const animatedComponents = makeAnimated();

  useEffect(() => setIsMounted(true), []);

  // Add "Select All" option if isMulti is true and options length is greater than 1
  const selectAllOption = {
    value: "select-all",
    label: "Select All",
  };

  const enhancedOptions =
    isMulti && options.length > 1 ? [selectAllOption, ...options] : options;

  return isMounted ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const customStyles = {
          control: (base: any, state: any) => ({
            ...base,
            border: error ? "1px solid red" : "1px solid #d1d5db",
            boxShadow: error
              ? "0 0 0 0.3px red"
              : state.isFocused
              ? "0 0 0 1.5px #0488a6"
              : null,
            "&:hover": {
              border: error ? "1px solid red" : "1px solid #d1d5db",
            },
            padding: "2px 0",
          }),
          menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
          }),
          multiValueLabel: (provided: any) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "450px", // Truncate multi-value labels after this width
          }),
          placeholder: (provided: any) => ({
            ...provided,
            fontSize: "14px",
            color: "#9ca3af",
          }),
        };

        const handleChange = (selectedOptions: any) => {
          if (isMulti) {
            const isSelectAllSelected = selectedOptions?.some(
              (option: any) => option.value === "select-all"
            );

            if (isSelectAllSelected) {
              // If "Select All" is selected, check if all options are already selected
              const allOptionsSelected = options?.filter(
                (option) => option.value !== "select-all"
              );

              if (value?.length === options.length) {
                // If all options are already selected, remove all options
                onChange([]);
              } else {
                // Otherwise, select all options
                onChange(allOptionsSelected);
              }
            } else if (selectedOptions.length === options?.length) {
              // If all options are selected manually, add the "Select All" option
              onChange([selectAllOption, ...selectedOptions]);
            } else {
              // Otherwise, just update the selected options
              onChange(selectedOptions);
            }
          } else {
            onChange(selectedOptions);
          }
        };

        return (
          <div id={name}>
            {outerLabel && (
              <label className="text-sm font-medium text-[#252525]">
                {outerLabel}{" "}
                <span className="text-sm text-red-500">{required && "*"}</span>
              </label>
            )}
            <Select
              classNamePrefix="select-selection"
              isSearchable
              isClearable
              styles={customStyles}
              closeMenuOnSelect={!isMulti}
              components={animatedComponents}
              isMulti={isMulti}
              value={value}
              onChange={handleChange}
              options={enhancedOptions}
              {...other}
              className="mt-1"
              isDisabled={disabled}
              isLoading={isLoading}
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
        );
      }}
    />
  ) : null;
}
