// app/dashboard/procurement-forms/page.tsx
"use client";

import {
  Row,
  Col,
  Typography,
  List,
  Tag,
  Upload,
  Button,
  Divider,
  Checkbox,
  Card,
  Select,
} from "antd";
import {
  InboxOutlined,
  PrinterOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { GENERATABLE_DOCS } from "./data";
import { useProcurementForms } from "./use-procurement-forms";
import GoBack from "@/components/common/go-back";

const { Dragger } = Upload;

export default function ProcurementFormsSection() {
  const {
    requiredDocs,
    selectedForGen,
    setSelectedForGen,
    allDataValid,
    uploadProps,
  } = useProcurementForms();

  return (
    <div className="max-w-7xl mx-auto">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Procurement Forms
          </h1>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Required Documents" className="shadow-sm">
            <List
              itemLayout="vertical"
              dataSource={requiredDocs}
              renderItem={(doc) => (
                <List.Item key={doc.key} className="px-0">
                  <div className="flex items-start gap-3">
                    <Checkbox disabled checked />
                    <div className="flex-1">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium">{doc.label}</span>
                        {doc.status !== "Upload" && (
                          <Tag color="blue">{doc.status}</Tag>
                        )}
                      </div>
                      {doc.status === "Upload" && (
                        <Dragger {...uploadProps} className="mt-3">
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Drag & drop files here or click to browse
                          </p>
                          <p className="ant-upload-hint text-xs text-gray-500">
                            Supported formats: PDF, DOCX, XLSX | Max 10 MB
                          </p>
                        </Dragger>
                      )}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card title="Generate Documents" className="shadow-sm">
            <Typography.Text className="block mb-2">
              Select Documents to Generate
            </Typography.Text>
            <Select
              mode="multiple"
              placeholder="Choose…"
              className="my-3 w-full"
              options={GENERATABLE_DOCS}
              value={selectedForGen}
              onChange={setSelectedForGen}
            />
            <Typography.Text className="block mt-4 mb-2">
              Document Preview
            </Typography.Text>
            <div className="h-56 flex items-center justify-center rounded border border-dashed text-gray-400">
              <FileAddOutlined style={{ fontSize: 32 }} />
              <span className="ml-2">Preview will appear here</span>
            </div>

            <Divider className="!my-6" />

            <Row gutter={16}>
              <Col>
                <Button
                  type="primary"
                  icon={<FileAddOutlined />}
                  disabled={selectedForGen.length === 0 || !allDataValid}
                >
                  Generate Documents
                </Button>
              </Col>
              <Col>
                <Button icon={<PrinterOutlined />} disabled={!allDataValid}>
                  Print Documents
                </Button>
              </Col>
            </Row>

            <Divider className="!my-6" />

            <Checkbox checked={allDataValid} disabled>
              All required GRF data is complete and validated
            </Checkbox>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
