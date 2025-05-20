"use client";

import { Row, Col, Form, Select, Input, DatePicker, Table, Button } from "antd";
import GoBack from "@/components/common/go-back";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import Link from "next/link";
import { useRfqList } from "./use-rfq-list";

export default function RfqListSection() {
  const { data, columns, params, updateParams } = useRfqList();

  const statusOpts = [
    { label: "Open", value: "open" },
    { label: "Responded", value: "responded" },
    { label: "Closed", value: "closed" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>

        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            RFQ List
          </h1>
        </Col>
        <Col span={24}>
          <div className="flex justify-end">
            <Link href={`/dashboard/RFQs/request-quotation`} passHref>
              <Button type="primary">Request Quotation</Button>
            </Link>
          </div>
        </Col>

        {/* ───────── Filter Form ───────── */}
        <Col span={24}>
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Status">
                  <Select
                    allowClear
                    placeholder="Select status"
                    options={statusOpts}
                    value={params.status || undefined}
                    onChange={(v) => updateParams({ status: v || "" })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Vendor">
                  <Input
                    allowClear
                    placeholder="Search vendor"
                    value={params.vendor}
                    onChange={(e) => updateParams({ vendor: e.target.value })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Created Date">
                  <DatePicker
                    value={params.requestDate ? dayjs(params.requestDate) : null}
                    onChange={(d: Dayjs | null) =>
                      updateParams({
                        requestDate: d ? d.format("YYYY-MM-DD") : null,
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* ───────── RFQ Table ───────── */}
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
