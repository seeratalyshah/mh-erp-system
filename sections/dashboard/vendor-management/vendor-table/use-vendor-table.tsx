'use client';

import { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { Vendor } from '@/types/vendor';

/* ── mock data — replace with API/React-Query later ───────── */
const DATA: Vendor[] = [
  {
    id: 1,
    name: 'ABC Suppliers Ltd.',
    email: 'contact@abcsuppliers.com',
    phone: '+1 234 567 890',
    rating: 4.5,
    orders: 15,
  },
  {
    id: 2,
    name: 'DEF Suppliers Ltd.',
    email: 'contact@defsuppliers.com',
    phone: '+1 235 527 870',
    rating: 4.0,
    orders: 18,
  },
  // …more rows
];

/* ── main hook ────────────────────────────────────────────── */
export function useVendorTable() {
  const [search, setSearch] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /* ——— filtering ——— */
  const data = useMemo(() => {
    if (!search.trim()) return DATA;
    const q = search.toLowerCase();
    return DATA.filter(
      v =>
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.phone.toLowerCase().includes(q),
    );
  }, [search]);

  /* ——— column defs ——— */
  const columns: ColumnsType<Vendor> = useMemo(
    () => [
      {
        title: 'Vendor Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        sorter: (a, b) => a.phone.localeCompare(b.phone),
        render: value => <span className="text-gray-500">{value}</span>,
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        sorter: (a, b) => a.rating - b.rating,
      },
      {
        title: 'Previous Tx',
        dataIndex: 'orders',
        sorter: (a, b) => a.orders - b.orders,
        render: o => `${o} orders`,
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, r) => (
          <button
            className="rounded bg-primary/10 px-2 py-1 text-primary hover:bg-primary/20"
            onClick={() => alert(`Open details for ${r.name}`)}
          >
            View
          </button>
        ),
      },
    ],
    [],
  );

  /* ——— row-selection ——— */
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  /* ——— helpers ——— */
  const emailSelected = () =>
    alert(`Email IDs: ${selectedRowKeys.join(', ')}`);

  return {
    /* state */
    search,
    setSearch,
    data,
    columns,
    rowSelection,
    selectedRowKeys,

    /* helpers */
    emailSelected,
  };
}
