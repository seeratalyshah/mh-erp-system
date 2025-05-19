"use client";

import React from "react";
import { Card, Input, Button, Row, Col, Space } from "antd";
import {
  MailOutlined,
  UploadOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useVendorTable } from "./vendor-table/use-vendor-table";
import FileDropZone from "@/components/common/file-drop-zone";
import VendorTable from "./vendor-table";
import GoBack from "@/components/common/go-back";

export default function VendorManagementSection() {
  /* shared vendor-table state */
  const vendor = useVendorTable();

  /* uploader state accepts AntD UploadFile objects */
  const [files, setFiles] = React.useState<UploadFile[]>([]);

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Vendor Management
          </h1>
        </Col>
        {/* ── Vendor List ── */}
        <Col span={24}>
          <Card
            title="Vendor List"
            extra={
              <Space>
                <Input
                  allowClear
                  prefix={<SearchOutlined />}
                  placeholder="Search vendor / email / phone"
                  value={vendor.search}
                  onChange={(e) => vendor.setSearch(e.target.value)}
                  className="w-56"
                />
                <Button
                  type="primary"
                  icon={<MailOutlined />}
                  disabled={!vendor.selectedRowKeys.length}
                  onClick={vendor.emailSelected}
                >
                  Email Selected
                </Button>
              </Space>
            }
            className="shadow-sm"
          >
            {/* pass table props down */}
            <VendorTable
              data={vendor.data}
              columns={vendor.columns}
              rowSelection={vendor.rowSelection}
            />
          </Card>
        </Col>
        {/* ── Quotation Management ── */}
        <Col span={24}>
          <Card title="Quotation Management" className="shadow-sm">
            <Row gutter={24}>
              {/* uploader */}
              <Col xs={24} md={14}>
                <FileDropZone
                  action="https://api.example.com/upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  maxFiles={10}
                  maxSizeMB={10}
                  onUploaded={setFiles}
                  icon={<UploadOutlined />}
                />
              </Col>

              {/* big action button */}
              <Col
                xs={24}
                md={10}
                className="flex items-center justify-center pt-6 md:pt-0"
              >
                <Button
                  type="primary"
                  block
                  icon={<SendOutlined />}
                  disabled={!files.length || !vendor.selectedRowKeys.length}
                  onClick={() =>
                    alert(
                      `Send GRF with ${
                        files.length
                      } file(s) to vendor IDs: ${vendor.selectedRowKeys.join(
                        ", "
                      )}`
                    )
                  }
                >
                  Send GRF to Selected Vendors
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
