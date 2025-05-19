// app/dashboard/reports/page.tsx
"use client";

import { Row, Col, Card, Statistic, Progress, Table } from "antd";
import { DollarTwoTone, FileDoneOutlined } from "@ant-design/icons";
import { useReports } from "./use-reports";
import GoBack from "@/components/common/go-back";

export default function ReportsSection() {
  const { stats, monthlySpend, topVendors, approvalRate } = useReports();

  /* table columns for top vendors */
  const vendorCols = [
    { title: "Vendor", dataIndex: "name", key: "name" },
    {
      title: "Spend (USD)",
      dataIndex: "spend",
      key: "spend",
      render: (v: number) => v.toLocaleString(),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* —— KPI cards —— */}
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Procurement Reports & Analytics
          </h1>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Total GRFs" value={stats.totalGrfs} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Pending"
              value={stats.pendingGrfs}
              suffix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic title="Approved" value={stats.approvedGrfs} />
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            <Statistic
              title="Total Spend (USD)"
              value={stats.totalSpend}
              prefix={<DollarTwoTone twoToneColor="#52c41a" />}
              valueRender={(v) => <span>{Number(v).toLocaleString()}</span>}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card title="GRF Approval Rate" className="w-full max-w-sm">
            <Progress type="circle" percent={approvalRate} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Monthly Spend (USD)">
            <Table
              size="small"
              pagination={false}
              dataSource={monthlySpend.map((m) => ({ ...m, key: m.month }))}
              columns={[
                { title: "Month", dataIndex: "month", key: "month" },
                {
                  title: "Amount",
                  dataIndex: "amount",
                  key: "amount",
                  render: (v: number) => v.toLocaleString(),
                },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Vendors by Spend">
            <Table
              size="small"
              pagination={false}
              columns={vendorCols}
              dataSource={topVendors.map((v) => ({ ...v, key: v.name }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
