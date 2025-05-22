"use client";

import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Dropdown,
  Button,
  Tooltip,
} from "antd";
import {
  DownloadOutlined,
  DollarOutlined,
  FileDoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import BarChart from "@/components/common/BarChart";
import DonutChart from "@/components/common/DonutChart";
import { useReports } from "./use-reports";

/* export menu (stub) */
const exportItems = [
  { key: "csv", label: "CSV" },
  { key: "xlsx", label: "Excel" },
  { key: "pdf", label: "PDF" },
];

export default function ReportsSection() {
  const { kpi, spendAnalysis, vendorPerf, monthlySpend } = useReports();

  /* transform data for charts */
  const spendSeries = [
    {
      name: "Spend",
      data: spendAnalysis.map((x) => x.amount),
    },
  ];
  const spendCats = spendAnalysis.map((x) => x.month);

  const perfLabels = vendorPerf.map((v) => v.type);
  const perfValues = vendorPerf.map((v) => v.value);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Reports
          </h1>
        </Col>

        {/* export */}
        <Col span={24}>
          <div className="flex justify-end">
            <Dropdown menu={{ items: exportItems }}>
              <Tooltip title="Export">
                <Button type="primary" icon={<DownloadOutlined />}>
                  Export
                </Button>
              </Tooltip>
            </Dropdown>
          </div>
        </Col>

        {/* KPI cards (bg colors unchanged from previous request) */}
        <Col xs={24} md={8}>
          <Card style={{ background: "#f0fdf4" }}>
            <Statistic
              title="Total Spend"
              prefix={<DollarOutlined className="text-green-500" />}
              value={kpi.totalSpend}
              formatter={(v) => `$${Number(v).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ background: "#f0f9ff" }}>
            <Statistic
              title="Purchase Orders"
              prefix={<FileDoneOutlined className="text-blue-500" />}
              value={kpi.poCount}
              formatter={(v) => Number(v).toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ background: "#fdf2f8" }}>
            <Statistic
              title="Active Vendors"
              prefix={<TeamOutlined className="text-pink-500" />}
              value={kpi.activeVendors}
              formatter={(v) => Number(v).toLocaleString()}
            />
          </Card>
        </Col>

        {/* Spend analysis bar & donut */}
        <Col xs={24} md={13}>
          <Card title="Spend Analysis">
            <BarChart
              categories={spendAnalysis.map((d) => d.month)}
              values={spendAnalysis.map((d) => d.amount)}
              barWidthPercent={20}
            />
          </Card>
        </Col>
        <Col xs={24} md={11}>
          <Card title="Vendor Performance">
            <DonutChart labels={perfLabels} values={perfValues} />
          </Card>
        </Col>

        {/* Monthly spend table + mini bar */}
        <Col span={24}>
          <Card title="Monthly Spend">
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}>
                <Table
                  size="small"
                  pagination={false}
                  dataSource={monthlySpend.map((m) => ({ ...m, key: m.month }))}
                  columns={[
                    { title: "Month", dataIndex: "month" },
                    {
                      title: "Spend",
                      dataIndex: "spend",
                      render: (v: number) => `$${v.toLocaleString()}`,
                    },
                  ]}
                />
              </Col>
              <Col xs={24} md={12}>
                <BarChart
                  categories={monthlySpend.map((d) => d.month)}
                  values={monthlySpend.map((d) => d.spend)}
                  height={220}
                  barWidthPercent={20}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
