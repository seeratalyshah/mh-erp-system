// Vendors/index.tsx
"use client";

import { Table, Row, Col, Input, Button } from "antd";
import { useVendors } from "./use-vendors";
import { FiPlus } from "react-icons/fi";
import { useCreateVendor } from "./create-vendor/use-create-vendor";
import CreateVendorModal from "./create-vendor";
import GoBack from "@/components/common/go-back";

export default function VendorsSection() {
  const { data, params, updateParams, columns } = useVendors();
  const createVendor = useCreateVendor();

  return (
    <div className="mx-auto max-w-7xl">
      <Row justify="space-between" align="middle" gutter={[16, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Vendors Management
          </h1>
        </Col>
        <Col span={24}>
          <div className="flex justify-end">
            <Button
              type="primary"
              icon={<FiPlus />}
              onClick={createVendor.show}
            >
              Add Vendor
            </Button>
          </div>
        </Col>
        <Col span={24}>
          <Input.Search
            placeholder="Search vendors…"
            allowClear
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            style={{ maxWidth: 300 }}
          />
        </Col>
        <Col span={24}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 8 }}
            scroll={{ x: true }}
            bordered
          />
        </Col>
      </Row>
      {/* Modal mounted once, controlled by the same hook instance */}
      <CreateVendorModal {...createVendor} />
    </div>
  );
}
