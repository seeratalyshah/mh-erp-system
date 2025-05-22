"use client";

import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Table,
  InputNumber,
  Select,
} from "antd";
import { useCreateGrn, ItemLine } from "./use-create-grn";

interface Props {
  open: boolean;
  onClose: () => void;
  po: string;
  vendor: string;
  /* lines pulled from PO -- pass in from parent */
  items: { description: string; orderedQty: number }[];
}

export default function CreateGrnModal({
  open,
  onClose,
  po,
  vendor,
  items,
}: Props) {
  const g = useCreateGrn();

  /* columns for editable receivedQty */
  const itemCols = [
    { title: "Description", dataIndex: "description", key: "d" },
    { title: "Ordered", dataIndex: "orderedQty", key: "o" },
    {
      title: "Received",
      dataIndex: "receivedQty",
      key: "r",
      render: (_: any, __: ItemLine, idx: number) => (
        <Form.Item
          name={["items", idx, "receivedQty"]}
          style={{ marginBottom: 0 }}
          rules={[{ required: true, message: "Qty" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      ),
    },
  ];

  /* build initial items array */
  const initialItems: ItemLine[] = items.map((i) => ({
    ...i,
    receivedQty: null,
  }));

  return (
    <Modal
      title="Create Goods Receipt"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={700}
    >
      <Form
        layout="vertical"
        form={g.form}
        initialValues={{
          po,
          vendor,
          status: "pending",
          items: initialItems,
        }}
        onFinish={(v) => g.submit(v as any, onClose)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Purchase Order" name="po">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Vendor" name="vendor">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Receipt Date"
              name="receiptDate"
              rules={[{ required: true, message: "Select receipt date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          {/* Status – default Pending */}
          <Col span={12}>
            <Form.Item label="Status" name="status">
              <Select
                options={[
                  { label: "Pending", value: "pending" },
                  { label: "Received", value: "received" },
                ]}
              />
            </Form.Item>
          </Col>

          {/* Items table */}
          <Col span={24} className="mb-4">
            <Table
              columns={itemCols}
              dataSource={initialItems}
              rowKey="description"
              pagination={false}
              bordered
              size="small"
            />
          </Col>

          <Col span={24}>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea rows={3} placeholder="Optional notes" />
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={g.loading}
              disabled={g.loading}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
