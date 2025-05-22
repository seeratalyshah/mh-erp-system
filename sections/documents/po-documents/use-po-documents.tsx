"use client";

import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { PO_DATA, PoRow, PoStatus } from "./data";

export type PoFilter = {
  id: string;
  vendor: string;
  status: "" | PoStatus;
  grf: string;
};

const INITIAL: PoFilter = { id: "", vendor: "", status: "", grf: "" };

export function usePoDocuments() {
  const [filter, setFilter] = useState<PoFilter>(INITIAL);
  const reset = () => setFilter(INITIAL);

  const data = useMemo(() => {
    return PO_DATA.filter((r) => {
      const f1 = filter.id ? r.id === filter.id : true;
      const f2 = filter.vendor ? r.vendor === filter.vendor : true;
      const f3 = filter.status ? r.status === filter.status : true;
      const f4 = filter.grf ? r.grf === filter.grf : true;
      return f1 && f2 && f3 && f4;
    });
  }, [filter]);

  const columns: ColumnsType<PoRow> = [
    { title: "PO Number", dataIndex: "id", key: "id" },
    { title: "GRF Number", dataIndex: "grf", key: "grf" },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: PoStatus) => (
        <Tag color={s === "Open" ? "blue" : "green"}>{s}</Tag>
      ),
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "att",
      render: (f: string) => <a href="#">{f}</a>,
    },
  ];

  return { data, columns, filter, setFilter, reset };
}
