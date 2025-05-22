"use client";

import { Row, Col, Form, Input, Select, Button, Table } from "antd";
import GoBack from "@/components/common/go-back";
import { vendorOpts } from "./data";
import { useGRN } from "./use-grn";
import CreateGrnModal from "./create-grn";

export default function GRNSection() {
  const {
    data,
    columns,
    params,
    updateParams,
    modalOpen,
    showModal,
    hideModal,
  } = useGRN();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>

        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Goods Receipt Note
          </h1>
        </Col>

        {/* ───────── Toolbar ───────── */}
        <Col span={24}>
          <div className="flex justify-end">
            <Button type="primary" onClick={showModal}>
              Create Goods Receipt
            </Button>
          </div>
        </Col>

        {/* ───────── Filters ───────── */}
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={[16, 0]}>
              <Col span={4}>
                <Form.Item label="GRN Number">
                  <Input
                    allowClear
                    value={params.grn}
                    onChange={(e) => updateParams({ grn: e.target.value })}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Vendor">
                  <Select
                    allowClear
                    options={vendorOpts}
                    value={params.vendor || undefined}
                    onChange={(v) => updateParams({ vendor: v || "" })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* ───────── Table ───────── */}
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

      {/* ───────── Create GRN Modal ───────── */}
      <CreateGrnModal
        open={modalOpen}
        onClose={hideModal}
        po="PO-2025-004"
        vendor="ABC Supplies Ltd."
        items={[
          { description: "Office Chair", orderedQty: 10 },
          { description: "Desk", orderedQty: 5 },
        ]}
      />
    </div>
  );
}
