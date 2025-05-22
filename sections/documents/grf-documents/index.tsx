"use client";

import { Col, Row, Select, Table, Form, Button } from "antd";
import { grfNumberOpts, requesterOpts, deptOpts, statusOpts } from "./data";
import { useGRFDocuments } from "./use-grf-documents";

export default function GRFDocuments() {
  const grf = useGRFDocuments();

  return (
    <div className="mt-4">
      <Form layout="vertical">
        <Row gutter={[16, 24]}>
          <Col xs={12} md={4}>
            <Form.Item label="GRF Number">
              <Select
                options={[{ label: "All", value: "" }, ...grfNumberOpts]}
                value={grf.filter.id}
                onChange={(v) => grf.setFilter({ ...grf.filter, id: v })}
              />
            </Form.Item>
          </Col>

          <Col xs={12} md={4}>
            <Form.Item label="Requester">
              <Select
                options={[{ label: "All", value: "" }, ...requesterOpts]}
                value={grf.filter.requester}
                onChange={(v) => grf.setFilter({ ...grf.filter, requester: v })}
              />
            </Form.Item>
          </Col>

          <Col xs={12} md={4}>
            <Form.Item label="Department">
              <Select
                options={[{ label: "All", value: "" }, ...deptOpts]}
                value={grf.filter.department}
                onChange={(v) =>
                  grf.setFilter({ ...grf.filter, department: v })
                }
              />
            </Form.Item>
          </Col>

          <Col xs={12} md={4}>
            <Form.Item label="Status">
              <Select
                options={[{ label: "All", value: "" }, ...statusOpts]}
                value={grf.filter.status}
                onChange={(v) =>
                  grf.setFilter({ ...grf.filter, status: v as any })
                }
              />
            </Form.Item>
          </Col>

          {/* clear button aligns with filters */}
          <Col xs={24} md={4} className="flex items-end">
            <Form.Item label=" ">
              <Button type="primary" onClick={grf.reset}>
                Clear Filters
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={grf.columns}
              dataSource={grf.data}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
