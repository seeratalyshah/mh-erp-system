"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFInputFieldProps {
  name: string;
  type?: string;
  readOnly?: boolean;
  startIcon?: React.ElementType;
  endIcon?: React.ElementType;
  outerLabel?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

export function RHFInputField({
  name,
  type = "text",
  readOnly = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  outerLabel,
  required = false,
  placeholder,
  helperText,
  ...other
}: RHFInputFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {outerLabel && (
            <label className="text-sm font-medium text-[#252525]">
              {outerLabel}{" "}
              <span className="text-sm text-red-500">{required && "*"}</span>
            </label>
          )}
          <div className="relative mt-1">
            {StartIcon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <StartIcon className="h-5 w-5 text-gray-400" />
              </div>
            )}
            <input
              placeholder={placeholder}
              className={`ml-${StartIcon ? "10" : 0} ${
                EndIcon ? "pr-10" : ""
              } flex h-9 rounded border focus:border-[2px] focus:border-[#0488a6] bg-white ${
                error
                  ? "border-2 border-red-400 shadow-red-300"
                  : "border-gray-300"
              } bg-transparent ${
                StartIcon ? "pl-9" : "px-3"
              } w-full disabled:font-medium disabled:bg-gray-200 disabled:text-gray-900 px-3 py-5 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50`}
              {...field}
              type={type}
              readOnly={readOnly}
              {...other}
            />
            {EndIcon && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <EndIcon className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
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
