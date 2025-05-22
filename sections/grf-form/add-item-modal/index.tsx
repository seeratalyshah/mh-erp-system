"use client";

import { Modal, Form, Select, Input, InputNumber, Row, Col } from "antd";
import { categoryOpts, unitOpts } from "../data";

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (vals: ItemPayload, idx: number | null) => void; // idx=null for add
  initial: ItemPayload | null;
  editingIndex: number | null;
}

export interface ItemPayload {
  category: string;
  unit: string;
  quantity: number | undefined;
  description: string;
}

export default function AddItemModal({
  open,
  onCancel,
  onSubmit,
  initial,
  editingIndex,
}: Props) {
  const [form] = Form.useForm<ItemPayload>();

  return (
    <Modal
      open={open}
      title={editingIndex === null ? "Add Item" : "Edit Item"}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={() => {
        form.validateFields().then((vals) => {
          onSubmit(vals, editingIndex);
          form.resetFields();
        });
      }}
      destroyOnHidden
    >
      <Form layout="vertical" form={form} initialValues={initial || {}}>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" options={categoryOpts} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true }]}
            >
              <Select placeholder="Unit" options={unitOpts} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, type: "number", min: 1 }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} showCount maxLength={500} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
