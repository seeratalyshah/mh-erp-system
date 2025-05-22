"use client";

import { Col, Row, Select, Table, Form, Button } from "antd";
import {
  poNumberOpts,
  statusOptsPO,
  vendorOpts,
  grfNumberOptsPO,
} from "./data";
import { usePoDocuments } from "./use-po-documents";

export default function PODocuments() {
  const po = usePoDocuments();

  return (
    <div className="mt-4">
      <Form layout="vertical">
        <Row gutter={[16, 24]}>
          {/* PO Number */}
          <Col xs={12} md={4}>
            <Form.Item label="PO Number">
              <Select
                options={[{ label: "All", value: "" }, ...poNumberOpts]}
                value={po.filter.id}
                onChange={(v) => po.setFilter({ ...po.filter, id: v })}
              />
            </Form.Item>
          </Col>

          {/* GRF Number */}
          <Col xs={12} md={4}>
            <Form.Item label="GRF Reference">
              <Select
                options={[{ label: "All", value: "" }, ...grfNumberOptsPO]}
                value={po.filter.grf}
                onChange={(v) => po.setFilter({ ...po.filter, grf: v })}
              />
            </Form.Item>
          </Col>

          {/* Vendor */}
          <Col xs={12} md={4}>
            <Form.Item label="Vendor">
              <Select
                options={[{ label: "All", value: "" }, ...vendorOpts]}
                value={po.filter.vendor}
                onChange={(v) => po.setFilter({ ...po.filter, vendor: v })}
              />
            </Form.Item>
          </Col>

          {/* Status */}
          <Col xs={12} md={4}>
            <Form.Item label="Status">
              <Select
                options={[{ label: "All", value: "" }, ...statusOptsPO]}
                value={po.filter.status}
                onChange={(v) =>
                  po.setFilter({ ...po.filter, status: v as any })
                }
              />
            </Form.Item>
          </Col>

          {/* Clear button */}
          <Col xs={24} md={4} className="flex items-end">
            <Form.Item label=" ">
              <Button type="primary" onClick={po.reset}>
                Clear Filters
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={po.columns}
              dataSource={po.data}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
