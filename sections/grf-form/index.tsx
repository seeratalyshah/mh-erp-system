"use client";

import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Upload,
  Table,
  Space,
  Divider,
  Row,
  Col,
  Typography,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import GoBack from "@/components/common/go-back";
import { useGRFForm, defaultValues } from "./use-grf-form";
import AddItemModal from "./add-item-modal";
import { budgetHeadOpts } from "./data";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const { Title } = Typography;

export default function GRFForm() {
  const grf = useGRFForm(); // single hook now holds everything

  /* columns use handlers from the hook */
  const itemCols = [
    { title: "Category", dataIndex: "category" },
    { title: "Unit", dataIndex: "unit" },
    { title: "Qty", dataIndex: "quantity" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      key: "act",
      render: (_: any, __: any, idx: number) => (
        <Space>
          <Button
            color="green"
            size="small"
            variant="solid"
            icon={<FiEdit size={14} />}
            onClick={() => grf.openEdit(idx)}
          />
          <Button
            type="primary"
            size="small"
            danger
            icon={<FiTrash2 size={14} />}
            onClick={() => grf.removeItem(idx)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard/requisitions" />
        </Col>

        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            New Goods Request Form
          </h1>
        </Col>

        <Col span={24}>
          <Form
            layout="vertical"
            form={grf.form}
            initialValues={{ ...defaultValues, items: grf.items }}
            onFinish={grf.onFinish}
            scrollToFirstError
          >
            <Form.Item
              label="Type of Request"
              name="typeOfRequest"
              rules={[{ required: true }]}
            >
              <Radio.Group
                options={[
                  { label: "Goods", value: "goods" },
                  { label: "Services", value: "services" },
                ]}
              />
            </Form.Item>

            {/* Item table */}
            <Title level={5}>Items</Title>
            {grf.items.length > 0 ? (
              <Table
                rowKey={(_, i) => String(i)}
                columns={itemCols}
                dataSource={grf.items}
                pagination={false}
                bordered
                size="small"
              />
            ) : (
              <p className="my-4 text-center text-gray-500">
                No items added yet. Please add item(s) to proceed.
              </p>
            )}
            <div className="my-8">
              <Button
                type="primary"
                block
                icon={<PlusOutlined />}
                onClick={grf.openAdd}
              >
                Add Item
              </Button>
            </div>

            {/* hidden items field so Yup still validates */}
            <Form.Item
              name="items"
              hidden
              rules={[
                {
                  validator: (_, value) =>
                    value && value.length
                      ? Promise.resolve()
                      : Promise.reject("Add at least one item"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Justification"
              name="justification"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Budget Head"
              name="budgetHead"
              rules={[{ required: true }]}
            >
              <Select options={budgetHeadOpts} />
            </Form.Item>

            <Divider orientation="left" plain>
              Attachments <span className="text-gray-400">(Optional)</span>
            </Divider>

            <Form.Item
              name="attachments"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload beforeUpload={() => false} multiple>
                <Button icon={<UploadOutlined />}>Add File(s)</Button>
              </Upload>
            </Form.Item>

            <div className="mt-6 flex justify-end gap-2">
              <Button htmlType="button" onClick={() => grf.form.resetFields()}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Submit&nbsp;GRF
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

      {/* modal driven entirely by the hook */}
      <AddItemModal
        open={grf.modalOpen}
        onCancel={grf.closeModal}
        onSubmit={grf.saveItem}
        initial={grf.editingIdx !== null ? grf.items[grf.editingIdx] : null}
        editingIndex={grf.editingIdx}
      />
    </div>
  );
}
