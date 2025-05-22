"use client";

import {
  Row,
  Col,
  Descriptions,
  Table,
  Form,
  Input,
  Button,
  Typography,
} from "antd";
import GoBack from "@/components/common/go-back";
import { useCreatePurchaseOrder } from "./use-create-purchase-order";

const { Title } = Typography;

export default function CreatePurchaseOrderSection() {
  const p = useCreatePurchaseOrder();

  const itemCols = [
    { title: "Description", dataIndex: "description", key: "d" },
    { title: "Quantity", dataIndex: "qty", key: "q" },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "u",
      render: (v: number) => `$${v.toFixed(2)}`,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "s",
      render: (v: number) => `$${v.toFixed(2)}`,
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

        {/* —— Vendor & shipping —— */}
        <Col span={24}>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Vendor">
              <strong>{p.vendor.vendor}</strong>
              <br />
            </Descriptions.Item>
          </Descriptions>
        </Col>

        {/* —— Items —— */}
        <Col span={24}>
          <Table
            columns={itemCols}
            dataSource={p.items}
            pagination={false}
            rowKey="description"
            bordered
            size="small"
          />
        </Col>

        {/* —— totals —— */}
        <Col span={24} className="text-right">
          <p>Subtotal&nbsp;&nbsp;$ {p.subtotal.toFixed(2)}</p>
          <p>Tax&nbsp;&nbsp;$ {p.tax.toFixed(2)}</p>
          <p className="font-semibold">
            Total&nbsp;&nbsp;$ {p.total.toFixed(2)}
          </p>
        </Col>

        {/* —— Terms & Submit —— */}
        <Col span={24}>
          <Form layout="vertical" form={p.form} onFinish={p.submit}>
            <Form.Item
              name="shipping"
              label="Shipping Address"
              rules={[{ required: true, message: "Enter shipping address" }]}
            >
              <Input.TextArea rows={2} placeholder="Street, City, Country" />
            </Form.Item>
            <Form.Item
              name="terms"
              label="Terms and Conditions"
              initialValue="Net 30 days"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <div className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                loading={p.loading}
                disabled={p.loading}
              >
                Generate PO
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
