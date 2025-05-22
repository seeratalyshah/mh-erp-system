"use client";

import { Row, Col, Card, List } from "antd";
import {
  DollarOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  InboxOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { notifications } from "./data";
import BarChart from "@/components/common/BarChart";
import StateCard from "@/components/common/state-card";
import { DotIcon } from "lucide-react";

/* ───────── dummy KPI data ───────── */
const KPI = {
  spend: 145_230,
  openPOs: 32,
  pendingApprovals: 5,
  pendingInvoices: 8,
  variance: 2.75, // %
};

/* ───────── dummy chart data (same months for both charts) ───────── */
const months = [
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const spendVals = [10, 12, 14, 16, 18, 22, 25, 27, 29, 28].map(
  (v) => v * 1_000
);

export default function DashboardSection() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto pb-10">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Dashboard Overview
          </h1>
        </Col>
        {/* ───────── KPI Row ───────── */}
        <Col xs={24} md={12} lg={6}>
          <StateCard
            title="Total Spend"
            value={KPI.spend}
            icon={<DollarOutlined />}
            bg="#ecfdf5" // light green
            formatter={(v) => `$${Number(v).toLocaleString()}`}
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StateCard
            title="Open POs"
            value={KPI.openPOs}
            icon={<FileTextOutlined />}
            bg="#eff6ff" // light blue
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StateCard
            title="Pending Approvals"
            value={KPI.pendingApprovals}
            icon={<ClockCircleOutlined />}
            bg="#fdf4ff" // light violet
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <StateCard
            title="Pending Invoices"
            value={KPI.pendingInvoices}
            icon={<InboxOutlined />}
            bg="#fff7ed" // light orange
          />
        </Col>

        {/* variance tile spans full width on small screens */}
        <Col span={24}>
          <StateCard
            title="Spend vs Budget"
            value={`${KPI.variance}%`}
            icon={<BarChartOutlined />}
            bg="#f0f9ff"
            textColor="#0284c7"
          />
        </Col>

        {/* ───────── Charts + Lists ───────── */}
        <Col xs={24} lg={14}>
          <Card title="Spend Analysis">
            <BarChart
              categories={months}
              values={spendVals}
              barWidthPercent={25}
              color="#2563eb"
            />
          </Card>
        </Col>

        {/* ───────── Recent Activity + Alerts ───────── */}
        <Col xs={24} md={12} lg={10}>
          <Card title="Recent Activity">
            <List
              dataSource={notifications}
              renderItem={(n) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<DotIcon className="text-primary" />}
                    title={n.text}
                    description={n.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
