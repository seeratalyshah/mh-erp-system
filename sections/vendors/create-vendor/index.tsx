"use client";

import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  type FormInstance,
} from "antd";
import type { VendorPayload } from "./use-create-vendor";

/* —— props interface —— */
export interface CreateVendorModalProps {
  open: boolean;
  hide: () => void;
  form: FormInstance<VendorPayload>;
  countryOpts: { label: string; value: string }[];
  categoryOpts: { label: string; value: string }[];
  handleSubmit: (v: VendorPayload) => Promise<void>;
}

export default function CreateVendorModal({
  open,
  hide,
  form,
  countryOpts,
  categoryOpts,
  handleSubmit,
}: CreateVendorModalProps) {
  return (
    <Modal
      title="Create Vendor"
      open={open}
      onCancel={hide}
      footer={null}
      destroyOnHidden
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit} preserve={false}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Vendor / Company Name"
              name="name"
              rules={[{ required: true, message: "Enter vendor name" }]}
            >
              <Input placeholder="ABC Supplies Ltd." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Contact Name"
              name="contactName"
              rules={[{ required: true, message: "Enter contact name" }]}
            >
              <Input placeholder="John Smith" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input placeholder="john@vendor.com" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Enter phone" }]}
            >
              <Input placeholder="+1 234 567 8901" />
            </Form.Item>
          </Col>

          {/* <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Select country" }]}
            >
              <Select options={countryOpts} placeholder="Select country" showSearch />
            </Form.Item>
          </Col> */}

          <Col span={12}>
            <Form.Item
              label="Vendor Category"
              name="category"
              rules={[{ required: true, message: "Select category" }]}
            >
              <Select options={categoryOpts} placeholder="Select category" />
            </Form.Item>
          </Col>

          <Col span={24} className="text-right">
            <Button onClick={hide} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Vendor
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
