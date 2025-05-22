"use client";

import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { GRN_DATA, GrnRow, GrnStatus } from "./data";

export type GrnFilter = {
  id: string;
  po: string;
  vendor: string;
  status: "" | GrnStatus;
};

const INITIAL: GrnFilter = { id: "", po: "", vendor: "", status: "" };

export function useGRNDocuments() {
  const [filter, setFilter] = useState<GrnFilter>(INITIAL);
  const reset = () => setFilter(INITIAL);

  const data = useMemo(() => {
    return GRN_DATA.filter((r) => {
      const f1 = filter.id ? r.id === filter.id : true;
      const f2 = filter.po ? r.po === filter.po : true;
      const f4 = filter.vendor ? r.vendor === filter.vendor : true;
      const f5 = filter.status ? r.status === filter.status : true;
      return f1 && f2 && f4 && f5;
    });
  }, [filter]);

  const columns: ColumnsType<GrnRow> = [
    { title: "GRN Number", dataIndex: "id", key: "id" },
    { title: "PO Number",  dataIndex: "po", key: "po" },
    { title: "GRF Number", dataIndex: "grf", key: "grf" },
    { title: "Vendor",     dataIndex: "vendor", key: "vendor" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: GrnStatus) => (
        <Tag color={s === "Received" ? "green" : "gold"}>{s}</Tag>
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
