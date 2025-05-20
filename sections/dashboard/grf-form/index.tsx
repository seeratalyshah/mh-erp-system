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
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import GoBack from "@/components/common/go-back";
import { useGRFForm, defaultValues } from "./use-grf-form";

const { Title } = Typography;

/* ----- static options – swap with API data if you have it ----- */
const categoryOpts = [
  { value: "civil-work", label: "Civil Work" },
  { value: "items", label: "Items" },
  { value: "wash-related", label: "Wash-Related" },
  { value: "other", label: "Other" },
];

const unitOpts = [
  { value: "kg", label: "Kg" },
  { value: "pcs", label: "Pieces" },
  { value: "ltr", label: "Litres" },
];

const budgetHeadOpts = [
  { value: "hr", label: "HR" },
  { value: "it", label: "IT" },
  { value: "ops", label: "Operations" },
];

export default function GRFForm() {
  const { form, onFinish } = useGRFForm();

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>

        <Col span={24}>
          <Title level={4} className="!mb-2">
            New Goods Request Form
          </Title>
          <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
            <Form
              layout="vertical"
              form={form}
              initialValues={defaultValues}
              onFinish={onFinish}
              scrollToFirstError
            >
              {/* ── Type of Request ─────────────────────────── */}
              <Form.Item
                label="Type of Request"
                name="typeOfRequest"
                rules={[{ required: true, message: "Select a type" }]}
              >
                <Radio.Group
                  options={[
                    { label: "Goods", value: "goods" },
                    { label: "Services", value: "services" },
                  ]}
                />
              </Form.Item>

              {/* ── Dynamic ITEMS list ─────────────────────── */}
              <Form.List name="items">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...rest }) => (
                      <div
                        key={key}
                        className="mb-6 rounded-lg border border-gray-100 p-4 shadow-sm"
                      >
                        <Space
                          align="baseline"
                          className="mb-4 flex justify-between"
                        >
                          <Title level={5} className="!mb-0">
                            Item&nbsp;{name + 1}
                          </Title>
                          {fields.length > 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            />
                          )}
                        </Space>

                        {/* Category / Unit / Quantity / Description */}
                        <Row gutter={16}>
                          <Col xs={24} md={12}>
                            <Form.Item
                              {...rest}
                              label="Category"
                              name={[name, "category"]}
                              rules={[
                                { required: true, message: "Choose a category" },
                              ]}
                            >
                              <Select
                                placeholder="Select category"
                                options={categoryOpts}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} md={12}>
                            <Form.Item
                              {...rest}
                              label="Unit of Measurement"
                              name={[name, "unit"]}
                              rules={[
                                { required: true, message: "Select a unit" },
                              ]}
                            >
                              <Select
                                placeholder="Select unit"
                                options={unitOpts}
                              />
                            </Form.Item>
                          </Col>

                          <Col xs={24} md={12}>
                            <Form.Item
                              {...rest}
                              label="Quantity Required"
                              name={[name, "quantity"]}
                              rules={[
                                { required: true, message: "Enter quantity" },
                              ]}
                            >
                              <Input type="number" min={1} placeholder="10" />
                            </Form.Item>
                          </Col>

                          <Col xs={24}>
                            <Form.Item
                              {...rest}
                              label="Description"
                              name={[name, "description"]}
                              rules={[
                                { required: true, message: "Enter description" },
                                {
                                  max: 500,
                                  message: "Max 500 characters",
                                },
                              ]}
                            >
                              <Input.TextArea
                                rows={3}
                                placeholder="Enter detailed specifications"
                                showCount
                                maxLength={500}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        block
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                      >
                        Add Another Item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              {/* ── Justification ──────────────────────────── */}
              <Form.Item
                label="Justification"
                name="justification"
                rules={[{ required: true, message: "Enter justification" }]}
              >
                <Input.TextArea rows={3} placeholder="Why are these items needed?" />
              </Form.Item>

              {/* ── Budget Head ────────────────────────────── */}
              <Form.Item
                label="Budget Head"
                name="budgetHead"
                rules={[{ required: true, message: "Choose a budget head" }]}
              >
                <Select
                  placeholder="Select budget head"
                  options={budgetHeadOpts}
                />
              </Form.Item>

              {/* ── Attachments ────────────────────────────── */}
              <Divider orientation="left" plain>
                Attachments <span className="text-gray-400">(Optional)</span>
              </Divider>

              <Form.Item
                name="attachments"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  multiple
                  listType="text"
                  accept="image/*,.pdf,.xlsx,.xls,.doc,.docx"
                  beforeUpload={() => false} // prevent auto-upload
                >
                  <Button icon={<UploadOutlined />}>
                    Add Single or Multiple Files
                  </Button>
                </Upload>
              </Form.Item>

              {/* ── Action buttons ─────────────────────────── */}
              <div className="mt-6 flex justify-end gap-2">
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit&nbsp;GRF
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
