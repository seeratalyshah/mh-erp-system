"use client";

import { Col, Row, Select, Table, Form, Button } from "antd";
import {
  grnNumberOpts,
  poNumberOptsGRN,
  vendorOptsGRN,
  grnStatusOpts,
} from "./data";
import { useGRNDocuments } from "./use-grn-documents";

export default function GRNDocuments() {
  const grn = useGRNDocuments();

  return (
    <div className="mt-4">
      <Form layout="vertical">
        <Row gutter={[16, 24]}>
          {/* GRN Number */}
          <Col xs={12} md={4}>
            <Form.Item label="GRN Number">
              <Select
                options={[{ label: "All", value: "" }, ...grnNumberOpts]}
                value={grn.filter.id}
                onChange={(v) => grn.setFilter({ ...grn.filter, id: v })}
              />
            </Form.Item>
          </Col>

          {/* PO Number */}
          <Col xs={12} md={4}>
            <Form.Item label="PO Number">
              <Select
                options={[{ label: "All", value: "" }, ...poNumberOptsGRN]}
                value={grn.filter.po}
                onChange={(v) => grn.setFilter({ ...grn.filter, po: v })}
              />
            </Form.Item>
          </Col>

          {/* Vendor */}
          <Col xs={12} md={4}>
            <Form.Item label="Vendor">
              <Select
                options={[{ label: "All", value: "" }, ...vendorOptsGRN]}
                value={grn.filter.vendor}
                onChange={(v) => grn.setFilter({ ...grn.filter, vendor: v })}
              />
            </Form.Item>
          </Col>

          {/* Status */}
          <Col xs={12} md={4}>
            <Form.Item label="Status">
              <Select
                options={[{ label: "All", value: "" }, ...grnStatusOpts]}
                value={grn.filter.status}
                onChange={(v) =>
                  grn.setFilter({ ...grn.filter, status: v as any })
                }
              />
            </Form.Item>
          </Col>

          {/* Clear */}
          <Col xs={24} md={4} className="flex items-end">
            <Form.Item label=" ">
              <Button type="primary" onClick={grn.reset}>
                Clear Filters
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={grn.columns}
              dataSource={grn.data}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
