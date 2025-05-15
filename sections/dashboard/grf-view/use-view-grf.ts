import { useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GRF_DATA, GrfRow } from "./data";

/* ── filter state shape ── */
export type FilterParams = {
  "grf-status": string;
  "grf-type": "" | "goods" | "services";
  "grf-date": { startDate: string | null; endDate: string | null };
};

export function useViewGrf() {
  const [params, setParams] = useState<FilterParams>({
    "grf-status": "",
    "grf-type": "",
    "grf-date": { startDate: null, endDate: null },
  });

  /* CustomFilters feeds this */
  const updateParams = (p: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...p }));

  /* filtered list */
  const data = useMemo<GrfRow[]>(() => {
    return GRF_DATA.filter((row) => {
      const matchType =
        params["grf-type"] ? row.type === params["grf-type"] : true;

      const d = params["grf-date"].startDate;
      const matchDate = d ? dayjs(row.date).isSame(d, "day") : true;

      return matchType && matchDate;
    });
  }, [params]);

  /* table */
  const col = createColumnHelper<GrfRow>();
  const columns = useMemo(
    () => [
      col.accessor("id", { header: "GRF #" }),
      col.accessor("date", { header: "Date" }),
      col.accessor("type", { header: "Type" }),
      col.accessor("category", { header: "Category" }),
      col.accessor("quantity", { header: "Qty" }),
      col.accessor("unit", { header: "Unit" }),
      col.accessor("budgetHead", { header: "Budget" }),
      col.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => row.original.id,
      }),
    ],
    [col]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table, updateParams };
}
