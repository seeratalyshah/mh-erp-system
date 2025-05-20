"use client";

import { useState } from "react";
import {
  Modal,
  Table,
  Form,
  Select,
  Input,
  Button,
  Space,
  DatePicker,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiX } from "react-icons/fi";

/* —— prop types —— */
export interface VendorLite {
  key: string;
  name: string;
  email: string;
}

interface Props {
  open: boolean;
  onCancel: () => void;
  vendors: VendorLite[];
  grfOptions: { label: string; value: string }[];
}

export default function RFQForm({
  open,
  onCancel,
  vendors,
  grfOptions,
}: Props) {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);

  /* ——— Selected-vendor table ——— */
  const columns: ColumnsType<VendorLite> = [
    { title: "Vendor Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      key: "close",
      align: "right",
      render: () => (
        <Button
          type="link"
          size="small"
          icon={<FiX />}
          onClick={() =>
            message.info(
              "Remove a vendor from the main table selection, then reopen this form."
            )
          }
        />
      ),
    },
  ];

  /* ——— Form submit ——— */
  const onFinish = async (values: any) => {
    setSending(true);
    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 800));
    message.success(
      `GRF ${values.grf} emailed to ${vendors.length} vendor(s).`
    );
    setSending(false);
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Request for Quotation"
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ subject: "Request for Quotation (RFQ)" }}
      >
        {/* GRF dropdown */}
        <Form.Item
          name="grf"
          label="GRF Reference"
          rules={[{ required: true, message: "Select GRF" }]}
        >
          <Select options={grfOptions} placeholder="Select GRF" />
        </Form.Item>

        {/* Selected vendors table */}
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Selected Vendors</p>
        <Table
          columns={columns}
          dataSource={vendors}
          size="small"
          pagination={false}
          rowKey="key"
        />

        {/* Subject */}
        <Form.Item
          name="subject"
          label="Subject"
          style={{ marginTop: 16 }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        {/* NEW Due-Date picker */}
        <Form.Item
          name="dueDate"
          label="Quotation Due Date"
          rules={[{ required: true, message: "Select due date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Message */}
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Buttons – keep them inside the modal */}
        <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={sending}>
              Send Request
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
