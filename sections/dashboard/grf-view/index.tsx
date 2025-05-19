// GrfViewSection/index.tsx
"use client";

import { Table, Form, Select, DatePicker, Space, Row, Col } from "antd";
import { useViewGrf } from "./use-view-grf";
import { statusOpts, typeOpts } from "./data";
import GoBack from "@/components/common/go-back";

export default function GrfViewSection() {
  const { data, params, updateParams, columns } = useViewGrf();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Submitted GRF List
          </h1>
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
