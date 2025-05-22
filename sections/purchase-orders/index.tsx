"use client";

import { Row, Col, Form, Input, Select, Button, Table } from "antd";
import { statusOpts, vendorOpts } from "./data";
import Link from "next/link";
import { usePurchaseOrders } from "./use-purchase-orders";

export default function PurchaseOrdersSection() {
  const { data, columns, params, updateParams } = usePurchaseOrders();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>

        {/* Title */}
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Purchase Orders
          </h1>
        </Col>

        {/* Toolbar */}
        <Col span={24}>
          <div className="flex justify-end">
            <Link href="/dashboard/purchase-orders/create-purchase-order">
              <Button type="primary">Generate PO</Button>
            </Link>
          </div>
        </Col>

        {/* ───────── Filters (vertical grid style) ───────── */}
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="PO Number">
                  <Input
                    allowClear
                    value={params.po}
                    onChange={(e) => updateParams({ po: e.target.value })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Vendor">
                  <Select
                    allowClear
                    options={vendorOpts}
                    value={params.vendor || undefined}
                    onChange={(v) => updateParams({ vendor: v || "" })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Status">
                  <Select
                    allowClear
                    options={statusOpts}
                    value={params.status || undefined}
                    onChange={(v) => updateParams({ status: v || "" })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Table */}
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
    </div>
  );
}
