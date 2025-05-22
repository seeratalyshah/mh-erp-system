// RequisitionsSection/index.tsx
"use client";

import { Table, Form, Select, DatePicker, Space, Row, Col, Button } from "antd";
import { statusOpts, typeOpts } from "./data";
import Link from "next/link";
import { FiClipboard } from "react-icons/fi";
import { useRequisitions } from "./use-requisitions";

export default function RequisitionsSection() {
  const { data, params, updateParams, columns } = useRequisitions();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Requisitions
          </h1>
        </Col>
        <Col span={24}>
          <div className="flex justify-end">
            <Link href={"/dashboard/requisitions/new-grf"}>
              <Button type="primary">
                <FiClipboard size={18} />
                Create New GRF
              </Button>
            </Link>
          </div>
        </Col>
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={[16, 16]} wrap>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Filter by Status">
                  <Select
                    allowClear
                    placeholder="Select GRF Status"
                    options={statusOpts}
                    value={params["grf-status"] || undefined}
                    onChange={(v) => updateParams({ "grf-status": v || "" })}
                    style={{ width: "100%" }} // stretches inside its Col
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Filter by Type">
                  <Select
                    allowClear
                    placeholder="Select GRF Type"
                    options={typeOpts}
                    value={params["grf-type"] || undefined}
                    onChange={(v) =>
                      updateParams({ "grf-type": (v ?? "") as any })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Filter by Date">
                  <DatePicker
                    value={params["grf-date"]}
                    onChange={(d) => updateParams({ "grf-date": d ?? null })}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
    </div>
  );
}
