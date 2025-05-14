"use client";

import { useGRFForm } from "./use-grf-form";
import { FormProvider } from "@/components/form/rhf-provider";
import { RHFInputField } from "@/components/form/rhf-input";
import { RHFSelect } from "@/components/form/rhf-multi-select";
import { RHFTextArea } from "@/components/form/rhf-text-area";
import { RHFRadioGroup } from "@/components/form/rhf-grouped-radio";
import { RHFDatePicker } from "@/components/form/rhf-date-picker";
import { RHFFileUpload } from "@/components/form/custom-file-upload";
import { CgCloseR } from "react-icons/cg";
import { MdAddBox } from "react-icons/md";

export default function GRFForm() {
  const { handleSubmit, onSubmit, methods, fields, append, remove } =
    useGRFForm();

  return (
    <div className="mb-12">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* ───────── Form content ───────── */}
        <div className="flex flex-col gap-6">
          {/* top row */}
          <div className="flex flex-row gap-6 xs:flex-col">
            <RHFSelect
              outerLabel="Country"
              name="country"
              options={[{ value: "1", label: "Pakistan" }]}
              required
            />

            <RHFInputField
              outerLabel="Name"
              name="name"
              placeholder="Enter Name"
              required
            />

            <RHFSelect
              outerLabel="City"
              name="city"
              options={[
                { value: "1", label: "Isb" },
                { value: "2", label: "Lhr" },
              ]}
              required
              isMulti
            />
          </div>

          <RHFTextArea
            outerLabel="Description"
            name="description"
            placeholder="Description"
          />

          <RHFRadioGroup
            name="intentionsToMove"
            outerLabel="Do you have any intentions to move to another area?"
            required
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
          />

          <RHFDatePicker
            name="date"
            placeholder="Select date"
            outerLabel="Date"
            required
          />

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
              className="mt-3 flex items-center gap-2 rounded bg-blue-500 px-3.5 py-3 text-sm text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
            >
              <MdAddBox size={20} />
              Add Single or Multiple Files
            </button>
          </div>
        </div>

        {/* ───────── Footer buttons ───────── */}
        <div className="mt-10 flex justify-end gap-2">
          <button className="rounded px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-300">
            Previous
          </button>

          <button
            type="submit"
            className="flex items-center gap-4 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </FormProvider>
    </div>
  );
}
