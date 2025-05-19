"use client";

import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Upload,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useGRFForm, defaultValues } from "./use-grf-form";
import GoBack from "@/components/common/go-back";

export default function GRFForm() {
  const { form, onFinish } = useGRFForm();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            New Goods Request Form
          </h1>
        </Col>
        <Col span={24}>
          <div className="rounded-lg border border-gray-200 p-10 shadow-sm bg-white">
            <Form
              layout="vertical"
              form={form}
              initialValues={defaultValues}
              onFinish={onFinish}
              scrollToFirstError
            >
              {/* ── Type of Request ───────────────────────────── */}
              <Form.Item
                label="Type of Request"
                name="typeOfRequest"
                rules={[{ required: true, message: "Please select a type" }]}
              >
                <Radio.Group
                  options={[
                    { label: "Goods", value: "goods" },
                    { label: "Services", value: "services" },
                  ]}
                />
              </Form.Item>

              {/* ── Category ─────────────────────────────────── */}
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please choose a category" },
                ]}
              >
                <Select
                  placeholder="Select category"
                  options={[
                    { value: "1", label: "Category 1" },
                    { value: "2", label: "Category 2" },
                  ]}
                />
              </Form.Item>

              {/* ── Description ──────────────────────────────── */}
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} placeholder="Description" />
              </Form.Item>

              {/* ── Unit & Quantity side-by-side ─────────────── */}
              <Space
                direction="horizontal"
                size="large"
                className="block md:flex"
              >
                <Form.Item
                  label="Unit of Measurement"
                  name="unit"
                  className="flex-1"
                  rules={[{ required: true, message: "Select a unit" }]}
                >
                  <Select
                    placeholder="Select unit"
                    options={[
                      { value: "1", label: "Unit 1" },
                      { value: "2", label: "Unit 2" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Quantity Required"
                  name="quantity"
                  className="flex-1"
                  rules={[{ required: true, message: "Enter quantity" }]}
                >
                  <Input placeholder="Enter quantity" type="number" min={1} />
                </Form.Item>
              </Space>

              {/* ── Justification ────────────────────────────── */}
              <Form.Item label="Justification" name="justification">
                <Input.TextArea rows={3} placeholder="Justification" />
              </Form.Item>

              {/* ── Budget Head ──────────────────────────────── */}
              <Form.Item
                label="Budget Head"
                name="budgetHead"
                rules={[{ required: true, message: "Choose a budget head" }]}
              >
                <Select
                  placeholder="Select budget head"
                  options={[
                    { value: "1", label: "Budget Head 1" },
                    { value: "2", label: "Budget Head 2" },
                  ]}
                />
              </Form.Item>

              {/* ── Attachments ──────────────────────────────── */}
              <Divider orientation="left" plain>
                Attachments <span className="text-gray-400">(Optional)</span>
              </Divider>

              <Form.Item
                name="attachments"
                label=""
                valuePropName="fileList" /* store whole list in the form */
                getValueFromEvent={(e /* AntD → form value converter   */) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
                /* rules={[]}   add validation here if you ever want it required */
              >
                <Upload
                  multiple /* allow many in one go   */
                  accept="image/*,.pdf,.xlsx,.xls,.doc,.docx" /* your MIME whitelist    */
                  listType="text"
                  beforeUpload={() => false} /* prevent auto-upload    */
                >
                  <Button icon={<UploadOutlined />}>
                    Add Single or Multiple Files
                  </Button>
                </Upload>
              </Form.Item>

              {/* ── Action Buttons ───────────────────────────── */}
              <div className="mt-6 flex justify-end gap-2">
                <Button htmlType="button">Cancel</Button>

                <Button type="primary" htmlType="submit">
                  Submit GRF
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
