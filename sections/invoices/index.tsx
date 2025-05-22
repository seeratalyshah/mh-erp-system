"use client";

import { Row, Col, Form, Input, Select, Table } from "antd";
import GoBack from "@/components/common/go-back";
import { vendorOpts, payOpts } from "./data";
import { useInvoices } from "./use-invoices";

export default function InvoicesSection() {
  const m = useInvoices();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>

        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Invoices
          </h1>
        </Col>

        {/* Filters */}
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12} md={4}>
                <Form.Item label="Invoice #">
                  <Input
                    allowClear
                    value={m.params.inv}
                    onChange={(e) => m.updateParams({ inv: e.target.value })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={4}>
                <Form.Item label="Vendor">
                  <Select
                    allowClear
                    options={vendorOpts}
                    value={m.params.vendor || undefined}
                    onChange={(v) => m.updateParams({ vendor: v || "" })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={4}>
                <Form.Item label="Payment Status">
                  <Select
                    allowClear
                    options={payOpts}
                    value={m.params.pay || undefined}
                    onChange={(v) => m.updateParams({ pay: v || "" })}
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
            columns={m.columns}
            dataSource={m.filtered}
            pagination={{ pageSize: 8 }}
            size="small"
            bordered
            scroll={{ x: true }}
          />
        </Col>
      </Row>
    </div>
  );
}
