'use client';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Vendor } from '@/types/vendor';
import type { TableRowSelection } from 'antd/es/table/interface';

interface VendorTableProps {
  data: Vendor[];
  columns: ColumnsType<Vendor>;
  rowSelection: TableRowSelection<Vendor>;
}

export default function VendorTable({
  data,
  columns,
  rowSelection,
}: VendorTableProps) {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      rowSelection={rowSelection}
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
      bordered
    />
  );
}
