"use client";

import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Select, { MultiValue, SingleValue } from "react-select";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

/* ── Types ───────────────────────────────────── */
export type SelectOption = { label: string; value: string };

export type FilterDef =
  | {
      type: "search";
      FieldProps: { name: string; placeholder?: string };
    }
  | {
      type: "select";
      FieldProps: {
        name: string;
        placeholder?: string;
        isMulti?: boolean;
        isLoading?: boolean;
      };
      options: SelectOption[];
    }
  | {
      type: "date";
      FieldProps: {
        name: string;
        useRange?: boolean;
        asSingle?: boolean; // true in our case
      };
    };

export interface CustomFiltersProps {
  tableHeaderData: readonly FilterDef[];
  onChanged?: (params: Record<string, any>) => void;
  debounceTimeout?: number;
  /* labels & cosmetics */
  searchLabel?: string;
  selectLabel?: string;
  dateLabel?: string;
  minWidth?: number;
  showGrid?: boolean;
  padding?: string;
  fontSize?: string;
  placeHolderColor?: string;
  /* disable flags */
  disabledInput?: boolean;
  disabledSelect?: boolean;
  disabledDate?: boolean;
  /* external defaults  */
  defaultValues?: Record<string, any>;
}

/* ── Helpers ─────────────────────────────────── */
const initParams = (defs: readonly FilterDef[]) => {
  const p: Record<string, any> = {};
  defs.forEach((d) => {
    switch (d.type) {
      case "search":
        p[d.FieldProps.name] = "";
        break;
      case "select":
        p[d.FieldProps.name] = d.FieldProps.isMulti ? [] : "";
        break;
      case "date":
        p[d.FieldProps.name] = d.FieldProps.asSingle
          ? { startDate: null, endDate: null }
          : { startDate: null, endDate: null };
        break;
    }
  });
  return p;
};

/* ── Component ──────────────────────────────── */
export function CustomFilters({
  tableHeaderData,
  onChanged = () => {},
  debounceTimeout = 500,
  /* labels */
  searchLabel = "Search",
  selectLabel = "",
  dateLabel = "",
  /* styling */
  minWidth,
  showGrid = true,
  padding = "2px 0px",
  fontSize = "14px",
  placeHolderColor = "#9ca3af",
  /* disables */
  disabledInput = false,
  disabledSelect = false,
  disabledDate = false,
  /* ext defaults */
  defaultValues = {},
}: CustomFiltersProps) {
  const [params, setParams] = useState<Record<string, any>>({
    ...initParams(tableHeaderData),
    ...defaultValues,
  });

  /* debounced emitter */
  const emit = useCallback(
    debounce((p) => onChanged(p), debounceTimeout),
    [debounceTimeout, onChanged]
  );

  const updateParam = (name: string, value: any) => {
    setParams((prev) => {
      const next = { ...prev, [name]: value };
      emit(next);
      return next;
    });
  };

  /* tailwind grid wrapper */
  return (
    <div>
      <div
        className={
          showGrid
            ? "grid gap-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : ""
        }
      >
        {/* iterate definitions */}
        {tableHeaderData.map((def) => {
          /* -------- search -------- */
          if (def.type === "search") {
            const { name, placeholder } = def.FieldProps;
            return (
              <div key={name} className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  {searchLabel}
                </label>
                <div
                  className="relative w-full"
                  style={{ minWidth: minWidth ?? "auto" }}
                >
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5">
                    <IoSearchOutline />
                  </div>
                  <input
                    disabled={disabledInput}
                    name={name}
                    type="text"
                    value={params[name]}
                    onChange={(e) => updateParam(name, e.target.value)}
                    placeholder={placeholder}
                    className="block w-full rounded border border-gray-300 py-2.5 pl-3 pr-10 text-sm text-gray-900 focus:border-[#0488a6] focus:outline-none"
                  />
                </div>
              </div>
            );
          }

          /* -------- select -------- */
          if (def.type === "select") {
            const { name, placeholder, isMulti, isLoading } = def.FieldProps;
            const options = def.options;

            /* derive selected value(s) */
            const selected = isMulti
              ? options.filter((o) =>
                  (params[name] as string[])?.includes(o.value)
                )
              : options.find((o) => o.value === params[name]) ?? null;

            const handleSelect = (
              sel: MultiValue<SelectOption> | SingleValue<SelectOption>
            ) => {
              const newVal = isMulti
                ? (sel as MultiValue<SelectOption>).map((o) => o.value)
                : (sel as SingleValue<SelectOption>)?.value ?? "";
              updateParam(name, newVal);
            };

            return (
              <div key={name} className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  {selectLabel}
                </label>
                <Select
                  name={name}
                  isClearable
                  isSearchable
                  isMulti={isMulti}
                  isDisabled={disabledSelect}
                  isLoading={isLoading}
                  options={options}
                  value={selected}
                  placeholder={placeholder}
                  onChange={handleSelect}
                  classNamePrefix="select-selection"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      minHeight: "42px",
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused
                        ? "0 0 0 1.5px #0488a6"
                        : undefined,
                      padding,
                    }),
                    placeholder: (base) => ({
                      ...base,
                      fontSize,
                      color: placeHolderColor,
                    }),
                  }}
                />
              </div>
            );
          }

          /* -------- date -------- */
          if (def.type === "date") {
            const { name, asSingle, useRange } = def.FieldProps;
            return (
              <div key={name} className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-700">
                  {dateLabel}
                </label>
                <Datepicker
                  disabled={disabledDate}
                  value={params[name] as DateValueType}
                  asSingle={asSingle}
                  useRange={useRange}
                  primaryColor="blue"
                  onChange={(v) => updateParam(name, v)}
                  inputClassName="w-full rounded border border-gray-300 py-2.5 pl-3 text-sm focus:border-[#0488a6] focus:outline-none placeholder:text-[14px]"
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
