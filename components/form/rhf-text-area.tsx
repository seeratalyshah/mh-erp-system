import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFTextAreaProps {
  name: string;
  type?: string;
  readOnly?: boolean;
  rows?: number;
  outerLabel?: string;
  required?: boolean;
  helperText?: string;
  startIcon?: React.ElementType | React.ReactNode;
  endIcon?: React.ElementType | React.ReactNode;
  [key: string]: any;
}

export function RHFTextArea({
  name,
  type = "text",
  readOnly = false,
  startIcon: StartIcon,
  endIcon: EndIcon,
  outerLabel,
  rows = 3,
  required = false,
  helperText,
  ...rest
}: RHFTextAreaProps) {
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
              {required && <span className="text-sm text-red-500">*</span>}
            </label>
          )}

          <div className="relative mt-1">
            {StartIcon && (
              <span className="absolute left-2 top-3.5 text-gray-400">
                {typeof StartIcon === "function" ? <StartIcon /> : StartIcon}
              </span>
            )}

            <textarea
              rows={rows}
              readOnly={readOnly}
              className={`flex w-full rounded border border-gray-300 bg-transparent px-3 py-3 text-sm transition
    ${error ? "border-red-400" : "border-gray-300"}
    placeholder:text-muted-foreground
    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50
    focus:border-[#0488a6] 
    focus:border-[2px]     
    focus:outline-none          
  `}
              {...field}
              {...rest}
            />

            {EndIcon && (
              <span className="absolute right-2 top-3.5 text-gray-400">
                {typeof EndIcon === "function" ? <EndIcon /> : EndIcon}
              </span>
            )}
          </div>

          {error?.message && (
            <p className="text-red-500 text-sm mr-1">{error.message}</p>
          )}
          {helperText && (
            <div className="text-[13px] text-gray-500">{helperText}</div>
          )}
        </div>
      )}
    />
  );
}
