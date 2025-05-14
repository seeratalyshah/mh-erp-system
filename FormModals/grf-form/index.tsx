"use client";

import { FormProvider } from "@/components/form/rhf-provider";
import { RHFInputField } from "@/components/form/rhf-input";
import { RHFSelect } from "@/components/form/rhf-multi-select";
import { RHFTextArea } from "@/components/form/rhf-text-area";
import { RHFRadioGroup } from "@/components/form/rhf-grouped-radio";
import { RHFFileUpload } from "@/components/form/custom-file-upload";
import { CgCloseR } from "react-icons/cg";
import { MdAddBox } from "react-icons/md";
import { useGRFForm } from "./use-grf-form";

export default function GRFForm() {
  const { handleSubmit, onSubmit, methods, fields, append, remove } =
    useGRFForm();

  return (
    <div className="h-full max-w-6xl lg:max-w-5xl mx-auto">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="p-8 border border-gray-200 rounded-lg shadow-sm">
          <h1 className="mb-6 text-xl font-semibold">New Goods Request Form</h1>
          <div className="flex flex-col gap-4">
            <div>
              <RHFRadioGroup
                name="typeOfRequest"
                outerLabel="Type Of Request"
                required
                options={[
                  { label: "Goods", value: "goods" },
                  { label: "Services", value: "services" },
                ]}
              />
            </div>
            <div>
              <RHFSelect
                outerLabel="Category"
                name="category"
                options={[
                  { value: "1", label: "Category 1" },
                  { value: "2", label: "Category 2" },
                ]}
                required
              />
            </div>
            <div>
              <RHFTextArea
                outerLabel="Description"
                name="description"
                placeholder="Description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <RHFSelect
                  outerLabel="Unit Of Measurement"
                  name="unit"
                  options={[
                    { value: "1", label: "Unit 1" },
                    { value: "2", label: "Unit 2" },
                  ]}
                  required
                />
              </div>
              <div>
                <RHFInputField
                  outerLabel="Quantity Required"
                  name="quantity"
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>
            <div>
              <RHFTextArea
                outerLabel="Justification"
                name="justification"
                placeholder="Justification"
              />
            </div>
            <div>
              <RHFSelect
                outerLabel="Budget Head"
                name="budgetHead"
                options={[
                  { value: "1", label: "Budget Head 1" },
                  { value: "2", label: "Budget Head 2" },
                ]}
                required
              />
            </div>
            {/* ───────── Attachments ───────── */}
            <div>
              <div className="mb-4 flex items-center">
                <h3 className="mr-2 whitespace-nowrap font-medium">
                  Attachments{" "}
                  <span className="text-sm text-gray-400">(Optional)</span>
                </h3>
                <div className="flex-1 border-t border-gray-300" />
              </div>

              {fields.map((field, idx) => (
                <div
                  key={field.id}
                  className="mb-2 flex items-center justify-between gap-4 rounded border border-gray-200 bg-white p-3"
                >
                  <RHFFileUpload
                    name={`attachments.${idx}.fileUpload`}
                    accept="image/*,.pdf,.xlsx,.xls,.doc,.docx"
                  />

                  <button type="button" onClick={() => remove(idx)}>
                    <CgCloseR
                      size={24}
                      className="rounded bg-red-500 text-white hover:bg-red-700"
                    />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  append({
                    fileUpload: "",
                  })
                }
                className="mt-3 flex items-center gap-2 cursor-pointer rounded bg-[#0488a6] px-3.5 py-3 text-sm text-white transition-colors hover:bg-[#0488a6]/80 disabled:bg-blue-300"
              >
                <MdAddBox size={20} />
                Add Single or Multiple Files
              </button>
            </div>
          </div>
          {/* ───────── Form buttons ───────── */}
          <div className="mt-10 flex justify-end gap-2">
            <button className="rounded px-6 border border-[#0488a6] py-2 text-sm font-medium text-[#0488a6] hover:bg-[#0488a6]/10 cursor-pointer">
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-4 rounded bg-[#0488a6] cursor-pointer px-4 py-2 text-sm font-medium text-white hover:bg-[#0488a6]/80"
            >
              Submit GRF
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
