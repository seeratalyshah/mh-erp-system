"use client";

import { useState, useMemo } from "react";
import { message, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { INVOICE_DATA, InvoiceRow, PayStatus } from "./data";

/* ─── filter params ─── */
export type FilterParams = {
  inv: string;
  vendor: string;
  pay: "" | PayStatus;
};

export function useInvoices() {
  /* keep invoice list in local state so we can mutate payStatus */
  const [rows, setRows] = useState<InvoiceRow[]>(INVOICE_DATA);

  /* filters */
  const [params, setParams] = useState<FilterParams>({
    inv: "",
    vendor: "",
    pay: "",
  });
  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* approve single invoice */
  const approveOne = (id: string) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, payStatus: "paid" } : r))
    );
    message.success(`Invoice ${id} marked as paid`);
  };

  /* table columns */
  const columns: ColumnsType<InvoiceRow> = [
    {
      title: "Invoice #",
      dataIndex: "id",
      key: "id",
      render: (id) => <a>{id}</a>,
    },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (v) => `$${v.toLocaleString()}`,
    },
    { title: "PO #", dataIndex: "po", key: "po" },
    { title: "GRN #", dataIndex: "grn", key: "grn" },
    {
      title: "Payment",
      dataIndex: "payStatus",
      key: "payStatus",
      render: (p: PayStatus) => (
        <Tag color={p === "paid" ? "blue" : "default"}>{p}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => (
        <Button
          size="small"
          type="primary"
          disabled={row.payStatus === "paid"} // already paid? disable
          onClick={() => approveOne(row.id)}
        >
          Approve
        </Button>
      ),
    },
  ];

  /* filtered list */
  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const f1 = params.inv
        ? r.id.toLowerCase().includes(params.inv.toLowerCase())
        : true;
      const f2 = params.vendor ? r.vendor === params.vendor : true;
      const f4 = params.pay ? r.payStatus === params.pay : true;
      return f1 && f2 && f4;
    });
  }, [rows, params]);

  return { columns, filtered, params, updateParams };
}
