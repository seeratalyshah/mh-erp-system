"use client";

import {
  Row,
  Col,
  Form,
  InputNumber,
  Input,
  Upload,
  Button,
  Descriptions,
  Card,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import GoBack from "@/components/common/go-back";
import { useUploadQuotationSection } from "./use-quote-upload";

// ⬇️  replace these with real data fed via URL-token or props
const GRF_INFO = {
  grf: "GRF-2025-001",
  vendor: "ABC Supplies Ltd.",
  due: "2025-05-25",
  description: "Office chairs – ergonomic mesh, black, qty 100",
};

const { Dragger } = Upload;

export default function UploadQuotationSection() {
  const q = useUploadQuotationSection();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Upload Quotation
          </h1>
        </Col>

        {/* ——— RFQ / Vendor info ——— */}
        <Col span={24}>
          <Card title="Basic Details" className="shadow-sm">
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="GRF Reference">
                {GRF_INFO.grf}
              </Descriptions.Item>
              <Descriptions.Item label="Vendor">
                {GRF_INFO.vendor}
              </Descriptions.Item>
              <Descriptions.Item label="Quotation Due Date">
                {GRF_INFO.due}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {GRF_INFO.description}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* ——— Instructions ——— */}
        <Col span={24}>
          <div className="bg-primary/10 border border-primary/70 rounded-lg text-primary p-4">
            Please fill the fields and attach your quotation file(s). Accepted
            formats: PDF, DOCX, XLSX – max 10 MB each.
          </div>
        </Col>

        {/* ——— Form ——— */}
        <Col span={24}>
          <Form
            layout="vertical"
            form={q.form}
            onValuesChange={q.handleValuesChange}
            onFinish={q.submit}
            initialValues={{
              amount: null,
              additionalCost: null,
              deliveryDays: null,
              totalCost: 0,
              notes: "",
            }}
          >
            <Row gutter={16}>
              {/* Amount */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="amount"
                  label="Quote Amount (USD)"
                  rules={[{ required: true, message: "Enter quote amount" }]}
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="e.g. 12500"
                  />
                </Form.Item>
              </Col>

              {/* Additional cost */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="additionalCost"
                  label="Additional Cost (USD)"
                  tooltip="e.g. shipping, tax"
                >
                  <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="e.g. 300"
                  />
                </Form.Item>
              </Col>

              {/* Total (auto) */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="totalCost"
                  label="Total Cost (USD)"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    disabled
                    style={{ width: "100%" }}
                    formatter={(v) => (v ?? 0).toString()}
                  />
                </Form.Item>
              </Col>

              {/* Delivery days */}
              <Col xs={24} md={12}>
                <Form.Item
                  name="deliveryDays"
                  label="Delivery Time (days)"
                  rules={[
                    { required: true, message: "Enter delivery in days" },
                  ]}
                >
                  <InputNumber
                    min={1}
                    style={{ width: "100%" }}
                    placeholder="e.g. 15"
                  />
                </Form.Item>
              </Col>

              {/* File upload */}
              <Col span={24}>
                <Form.Item
                  name="files"
                  label="Attachments"
                  valuePropName="fileList"
                  getValueFromEvent={() => q.fileList}
                  rules={[
                    { required: true, message: "Attach at least one file" },
                  ]}
                >
                  <Dragger
                    multiple
                    fileList={q.fileList}
                    beforeUpload={() => false}
                    onChange={q.onChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area
                    </p>
                    <p className="ant-upload-hint">
                      Support for multiple files. Max 10&nbsp;MB each.
                    </p>
                  </Dragger>
                </Form.Item>
              </Col>

              {/* Notes */}
              <Col span={24}>
                <Form.Item name="notes" label="Notes / Comments">
                  <Input.TextArea rows={4} placeholder="Optional message" />
                </Form.Item>
              </Col>

              {/* Submit */}
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit" loading={q.submitting}>
                  Submit Quotation
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
