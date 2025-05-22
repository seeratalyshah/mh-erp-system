"use client";

import { Tabs, Row, Col } from "antd";
import GRFDocuments from "./grf-documents";
import PODocuments from "./po-documents";
import GRNDocuments from "./grn-documents";

export default function DocumentsSection() {
  /* ---------- Tab panes ---------- */
  const panes = [
    {
      key: "grf",
      label: "GRF",
      children: <GRFDocuments />,
    },
    {
      key: "po",
      label: "PO",
      children: <PODocuments />,
    },
    {
      key: "grn",
      label: "GRN",
      children: <GRNDocuments />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Row>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Documents
          </h1>
        </Col>
        <Col span={24}>
          <Tabs defaultActiveKey="grf" items={panes} />
        </Col>
      </Row>
    </div>
  );
}
