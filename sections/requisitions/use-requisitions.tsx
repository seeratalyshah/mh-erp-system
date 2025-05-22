// hooks/useViewGrf.ts
"use client";

import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { GRF_DATA } from "./data";
import { Button, Space, Tag } from "antd";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { GrfRow } from "@/types/grf-rwo";

/* ── filter state shape ── */
export type FilterParams = {
  "grf-status": "" | "pending" | "approved" | "rejected";
  "grf-type": "" | "goods" | "services";
  "grf-date": dayjs.Dayjs | null;
};

export function useRequisitions() {
  const [params, setParams] = useState<FilterParams>({
    "grf-status": "",
    "grf-type": "",
    "grf-date": null,
  });

  /** called from the Selects / DatePicker */
  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* ——— AntD table columns ——— */
  const columns = [
    { title: "GRF #", dataIndex: "id", key: "id" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: GrfRow["status"]) => (
        <Tag
          color={s === "approved" ? "green" : s === "rejected" ? "red" : "gold"}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Tag>
      ),
    },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Qty", dataIndex: "quantity", key: "quantity" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Budget", dataIndex: "budgetHead", key: "budgetHead" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: GrfRow) => (
        <Space>
          <Link href={`/dashboard/requisitions/review-grf/${row.id}`} passHref>
            <Button color="green" size="small" icon={<FiEdit size={14} />}>
              Review
            </Button>
          </Link>
          <Button type="primary" size="small" icon={<FiEye size={14} />} />
          <Button
            color="green"
            size="small"
            variant="solid"
            icon={<FiEdit size={14} />}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<FiTrash2 size={14} />}
          />
        </Space>
      ),
    },
  ];

  /** filtered rows */
  const data = useMemo<GrfRow[]>(() => {
    return GRF_DATA.filter((row) => {
      /* status filter */
      const matchStatus = params["grf-status"]
        ? row.status === params["grf-status"]
        : true;

      /* type filter */
      const matchType = params["grf-type"]
        ? row.type === params["grf-type"]
        : true;

      /* date filter – same day() */
      const d = params["grf-date"];
      const matchDate = d ? dayjs(row.date).isSame(d, "day") : true;

      return matchStatus && matchType && matchDate;
    });
  }, [params]);

  return { data, params, updateParams, columns };
}
