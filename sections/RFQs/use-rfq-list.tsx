"use client";

import { useState, useMemo } from "react";
import { Tag, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { FiEye } from "react-icons/fi";

/* ─────────────────── Types ─────────────────── */
export type RfqStatus = "open" | "responded" | "closed";

export interface RfqRow {
  id: string;        // unique RFQ id
  grf: string;       // GRF reference
  vendor: string;
  status: RfqStatus;
  requestDate: string;   // ISO yyyy-mm-dd
  due: string;       // ISO yyyy-mm-dd
}

/* ───────────────── Dummy data ───────────────── */
export const RFQ_DATA: RfqRow[] = [
  {
    id: "RFQ-2025-001",
    grf: "GRF-2025-001",
    vendor: "ABC Suppliers Ltd.",
    status: "open",
    requestDate: "2025-05-18",
    due: "2025-05-25",
  },
  {
    id: "RFQ-2025-002",
    grf: "GRF-2025-001",
    vendor: "XYZ Industries",
    status: "open",
    requestDate: "2025-05-18",
    due: "2025-05-25",
  },
  {
    id: "RFQ-2025-003",
    grf: "GRF-2025-003",
    vendor: "Global Traders",
    status: "closed",
    requestDate: "2025-05-20",
    due: "2025-05-28",
  },
];

/* ───────────────── Filter UI state ───────────────── */
export type FilterParams = {
  status: "" | RfqStatus;
  vendor: string;            // substring search
  requestDate: string | null;    // ISO date
};

export function useRfqList() {
  const [params, setParams] = useState<FilterParams>({
    status: "",
    vendor: "",
    requestDate: null,
  });

  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* ───── Ant Design table columns ───── */
  const columns: ColumnsType<RfqRow> = [
    { title: "RFQ #", dataIndex: "id", key: "id" },
    { title: "GRF Ref", dataIndex: "grf", key: "grf" },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    { title: "Request Date", dataIndex: "requestDate", key: "requestDate" },
    { title: "Due Date", dataIndex: "due", key: "due" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: RfqStatus) => {
        const color =
          s === "open"
            ? "green"
            : s === "responded"
            ? "blue"
            : s === "closed"
            ? "default"
            : "default";
        return <Tag color={color}>{s.charAt(0).toUpperCase() + s.slice(1)}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, row) => (
        <Space>
          <Button
            size="small"
            type="link"
            icon={<FiEye size={14} />}
            href={`/dashboard/rfqs/${row.id}`}
          />
        </Space>
      ),
    },
  ];

  /* ───── filtered datasource ───── */
  const data = useMemo<RfqRow[]>(() => {
    return RFQ_DATA.filter((row) => {
      const matchStatus = params.status ? row.status === params.status : true;
      const matchVendor = params.vendor
        ? row.vendor.toLowerCase().includes(params.vendor.toLowerCase())
        : true;
      const matchDate = params.requestDate
        ? dayjs(row.requestDate).isSame(params.requestDate, "day")
        : true;
      return matchStatus && matchVendor && matchDate;
    });
  }, [params]);

  return { data, columns, params, updateParams };
}
