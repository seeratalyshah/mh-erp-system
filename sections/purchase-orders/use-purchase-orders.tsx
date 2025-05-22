"use client";

import { useState, useMemo } from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { PO_DATA, PoRow, POStatus } from "./data";

/* ─── filter params ─── */
export type FilterParams = {
  po: string;
  vendor: string;
  status: "" | POStatus;
};

export function usePurchaseOrders() {
  const [params, setParams] = useState<FilterParams>({
    po: "",
    vendor: "",
    status: "",
  });

  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* ─── columns ─── */
  const columns: ColumnsType<PoRow> = [
    { title: "PO #", dataIndex: "po", key: "po" },
    { title: "GRF #", dataIndex: "grf", key: "grf" },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (d) => dayjs(d).format("MMM D, YYYY"),
    },
    {
      title: "Expected Date",
      dataIndex: "expectedDate",
      key: "expectedDate",
      render: (d) => dayjs(d).format("MMM D, YYYY"),
    },
    {
      title: "Total (USD)",
      dataIndex: "total",
      key: "total",
      render: (v) => `$${v.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: POStatus) => (
        <Tag
          color={
            s === "open"
              ? "blue"
              : s === "pending"
              ? "gold"
              : /* closed */ "green"
          }
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Tag>
      ),
    },
  ];

  /* ─── filtered data ─── */
  const data = useMemo(() => {
    return PO_DATA.filter((row) => {
      const matchPO = params.po
        ? row.po.toLowerCase().includes(params.po.toLowerCase())
        : true;
      const matchVendor = params.vendor ? row.vendor === params.vendor : true;
      const matchStatus = params.status ? row.status === params.status : true;
      return matchPO && matchVendor && matchStatus;
    });
  }, [params]);

  return { data, columns, params, updateParams };
}
