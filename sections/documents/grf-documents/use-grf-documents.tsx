"use client";

import { useState, useMemo } from "react";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { GRF_DATA, GrfRow, GrfStatus } from "./data";

export type FilterState = {
  id: string;
  requester: string;
  department: string;
  status: "" | GrfStatus;
};

const INITIAL: FilterState = {
  id: "",
  requester: "",
  department: "",
  status: "",
};

export function useGRFDocuments() {
  const [filter, setFilter] = useState<FilterState>(INITIAL);

  const reset = () => setFilter(INITIAL);

  const data = useMemo(() => {
    return GRF_DATA.filter((r) => {
      const f1 = filter.id ? r.id === filter.id : true;
      const f2 = filter.requester ? r.requester === filter.requester : true;
      const f3 = filter.department ? r.department === filter.department : true;
      const f4 = filter.status ? r.status === filter.status : true;
      return f1 && f2 && f3 && f4;
    });
  }, [filter]);

  const columns: ColumnsType<GrfRow> = [
    { title: "GRF Number", dataIndex: "id", key: "id" },
    { title: "Requester", dataIndex: "requester", key: "requester" },
    { title: "Department", dataIndex: "department", key: "dept" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: GrfStatus) => (
        <Tag color={s === "Approved" ? "green" : s === "Rejected" ? "red" : "gold"}>
          {s}
        </Tag>
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
