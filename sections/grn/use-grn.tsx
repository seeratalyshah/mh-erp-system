"use client";

import { useState, useMemo } from "react";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { GRN_DATA, GrnRow, GrnStatus } from "./data";

/* ─── filter params ─── */
export type FilterParams = { grn: string; vendor: string };

export function useGRN() {
  /* —— filters —— */
  const [params, setParams] = useState<FilterParams>({ grn: "", vendor: "" });
  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* —— modal visibility —— */
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  /* —— table columns —— */
  const columns: ColumnsType<GrnRow> = [
    { title: "GRN #", dataIndex: "id", key: "id" },
    { title: "Vendor", dataIndex: "vendor", key: "vendor" },
    {
      title: "GRN Date",
      dataIndex: "grnDate",
      key: "grnDate",
      render: (d) => dayjs(d).format("MM/DD/YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s: GrnStatus) => (
        <Tag color={s === "received" ? "green" : "gold"}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </Tag>
      ),
    },
  ];

  /* —— filtered rows —— */
  const data = useMemo(() => {
    return GRN_DATA.filter((r) => {
      const matchGrn = params.grn
        ? r.id.toLowerCase().includes(params.grn.toLowerCase())
        : true;
      const matchVendor = params.vendor ? r.vendor === params.vendor : true;
      return matchGrn && matchVendor;
    });
  }, [params]);

  return {
    data,
    columns,
    params,
    updateParams,

    /* modal control */
    modalOpen,
    showModal,
    hideModal,
  };
}
