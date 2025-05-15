// GrfViewSection/index.tsx
"use client";

import { flexRender } from "@tanstack/react-table";
import { useViewGrf } from "./use-view-grf";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { ACTIVITY_FILTERS } from "./data";
import { CustomFilters } from "@/components/common/filters";

export default function GrfViewSection() {
  const { table, updateParams } = useViewGrf();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Filters */}
      <div className="pt-2.5 pb-5">
        <h3 className="text-md font-medium mb-2">Search by Filters</h3>
        <CustomFilters
          tableHeaderData={ACTIVITY_FILTERS}
          onChanged={updateParams}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-3 py-2 text-left font-medium text-gray-700"
                  >
                    {
                      h.isPlaceholder
                        ? null
                        : flexRender(
                            h.column.columnDef.header,
                            h.getContext()
                          ) /* 👈 FIX */
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) =>
                  cell.column.id === "actions" ? (
                    <td key={cell.id} className="px-3 py-2">
                      <div className="flex gap-3">
                        <button title="View">
                          <FiEye className="text-blue-600" />
                        </button>
                        <button title="Edit">
                          <FiEdit className="text-green-600" />
                        </button>
                        <button title="Delete">
                          <FiTrash2 className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td key={cell.id} className="px-3 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
