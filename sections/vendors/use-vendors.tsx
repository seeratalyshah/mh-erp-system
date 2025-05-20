// use-vendors.ts
"use client";

import { useState, useMemo } from "react";
import { Button, Space } from "antd";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

import { VENDORS_DATA, VendorRow } from "./data";

/* —— simple search filter —— */
export type FilterParams = { search: string };

export function useVendors() {
  const [params, setParams] = useState<FilterParams>({ search: "" });

  const updateParams = (next: Partial<FilterParams>) =>
    setParams((prev) => ({ ...prev, ...next }));

  /* ——— AntD columns ——— */
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Contact Name", dataIndex: "contactName", key: "contactName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: VendorRow) => (
        <Space>
          <Link href={`/dashboard/vendors/${row.id}`} passHref>
            <Button type="primary" size="small" icon={<FiEye size={14} />} />
          </Link>
          <Button
            color="green"
            size="small"
            variant="solid"
            icon={<FiEdit size={14} />}
            onClick={() => console.log("edit", row.id)}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<FiTrash2 size={14} />}
            onClick={() => console.log("delete", row.id)}
          />
        </Space>
      ),
    },
  ];

  /* —— filtered data —— */
  const data = useMemo(() => {
    const q = params.search.toLowerCase();
    return VENDORS_DATA.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.contactName.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q)
    );
  }, [params]);

  return { data, params, updateParams, columns };
}
