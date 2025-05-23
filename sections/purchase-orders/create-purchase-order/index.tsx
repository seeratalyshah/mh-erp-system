"use client";

import {
  Typography,
  Row,
  Col,
  Table,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import GoBack from "@/components/common/go-back";
import { useCreatePurchaseOrder } from "./use-create-purchase-order";

const { Title, Text } = Typography;

export default function CreatePurchaseOrderSection() {
  const p = useCreatePurchaseOrder();

  /* items table columns */
  const itemCols = [
    { title: "Description", dataIndex: "description" },
    { title: "Qty", dataIndex: "qty" },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      render: (v: number) => (v ? `$${v.toFixed(2)}` : "—"),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      render: (v: number) => (v ? `$${v.toFixed(2)}` : "—"),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard/purchase-orders" />
        </Col>

        <Col span={24}>
          <Title level={4} className="!mb-4">
            Generate Purchase Order
          </Title>
        </Col>

        {/* ───── Top controls: GRF + Vendor ───── */}
        <Col span={24}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form layout="vertical">
                <Form.Item label="Select GRF" required>
                  <Select
                    placeholder="Choose GRF"
                    options={p.availableGrfs.map((g) => ({
                      label: g,
                      value: g,
                    }))}
                    value={p.grfId}
                    onChange={p.setGrfId}
                    allowClear
                  />
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} md={8}>
              <Form layout="vertical">
                <Form.Item label="Vendor">
                  <Select
                    placeholder="Select vendor"
                    style={{ width: "100%" }}
                    disabled={!p.grfId}
                    options={p.vendors.map((v) => ({
                      label: `${v.vendor}  ($${v.total.toLocaleString()})`,
                      value: v.vendorId,
                    }))}
                    value={p.vendorId}
                    onChange={p.setVendorId}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>

        {/* ───── Items table ───── */}
        <Col span={24}>
          <Table
            columns={itemCols}
            dataSource={p.items.length ? p.items : []}
            pagination={false}
            rowKey={(r) => r.description ?? Math.random()}
            bordered
            size="small"
          />
          {!p.grfId && (
            <Text type="secondary">
              Select a GRF to load item details and totals.
            </Text>
          )}
        </Col>

        {/* ───── Totals ───── */}
        <Col span={24} className="text-right">
          <p>
            Subtotal&nbsp;&nbsp;$&nbsp;
            {p.grfId ? p.subtotal.toFixed(2) : "—"}
          </p>
          <p>
            Tax&nbsp;&nbsp;$&nbsp;
            {p.grfId ? p.tax.toFixed(2) : "—"}
          </p>
          <p className="font-semibold">
            Total&nbsp;&nbsp;$&nbsp;
            {p.grfId ? p.total.toFixed(2) : "—"}
          </p>
        </Col>

        {/* ───── Form fields (always present) ───── */}
        <Col span={24}>
          <Form
            layout="vertical"
            form={p.form}
            onFinish={p.submit}
            disabled={!p.grfId}
            initialValues={{ terms: "Net 30 days" }}
          >
            <Form.Item
              name="shipping"
              label="Shipping Address"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                rows={2}
                placeholder="Street, City, Country"
                defaultValue={p.grfDetail?.shippingAddress}
              />
            </Form.Item>

            <Form.Item
              name="expectedDate"
              label="Expected Delivery Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} disabled={!p.grfId} />
            </Form.Item>

            <Form.Item
              name="terms"
              label="Terms and Conditions"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <div className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                loading={p.loading}
                disabled={!p.grfId}
              >
                Generate&nbsp;PO
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
