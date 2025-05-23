"use client";

import {
  Typography,
  Row,
  Col,
  Card,
  Table,
  Select,
  InputNumber,
  message,
} from "antd";
import dynamic from "next/dynamic";
import GoBack from "@/components/common/go-back";
import { useCostAnalysis } from "./use-cost-analysis";
import { ExportButtons } from "./ExportButtons";

/* ApexCharts client-side */
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CostAnalysisSection() {
  const [msgApi, ctx] = message.useMessage();
  const ca = useCostAnalysis(msgApi);

  /* ── quotation table cols ── */
  const quoteCols = [
    { title: "Vendor", dataIndex: "vendor" },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      title: "Delivery",
      dataIndex: "deliveryTime",
      render: (v: number) => `${v} d`,
    },
    {
      title: "Additional",
      dataIndex: "additionalCosts",
      render: (v: number) => `$${v}`,
    },
  ];

  /* ── items table (internal unit cost entry) ── */
  const itemCols = [
    { title: "Item", dataIndex: "name" },
    { title: "Qty", dataIndex: "quantity" },
    {
      title: "Unit Cost (USD)",
      dataIndex: "name",
      render: (name: string) => (
        <InputNumber
          min={0}
          value={ca.unitCostMap[name]}
          onChange={(v) => ca.setUnitCost(name, v)}
        />
      ),
    },
    {
      title: "Line Total",
      dataIndex: "name",
      render: (name: string, row: any) =>
        `$${(row.quantity * (ca.unitCostMap[name] ?? 0)).toLocaleString()}`,
    },
  ];

  /* ── chart: vendors + internal baseline ── */
  const chartCategories = [...ca.grfQuotes.map((q) => q.vendor), "Internal"];
  const chartData = [...ca.grfQuotes.map((q) => q.totalCost), ca.internalTotal];
  const chartColors = [
    ...ca.grfQuotes.map((q) =>
      q.totalCost === ca.lowestQuote.totalCost ? "#52c41a" : "#1890ff"
    ),
    "#999999",
  ];

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartCategories },
    colors: chartColors,
    plotOptions: { bar: { distributed: true, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `$${v.toLocaleString()}` } },
  } as const;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {ctx}

      {/* Header + GRF dropdown */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <GoBack link="/dashboard" />
        </Col>

        <Col span={24}>
          <Typography.Title level={4} className="!mb-2">
            Cost Analysis
          </Typography.Title>
        </Col>

        <Col span={24}>
          <Select
            allowClear
            placeholder="Select GRF"
            style={{ width: 240 }}
            options={ca.availableGrfs.map((g) => ({ label: g, value: g }))}
            value={ca.grf}
            onChange={(v) => ca.setGrf(v || undefined)}
          />
        </Col>
        <Col span={24}>
          <Card
            title="Vendor Quotation Totals"
            extra={
              <ExportButtons
                rows={ca.grfQuotes}
                avg={ca.averageQuote}
                lowest={ca.lowestQuote.vendor}
              />
            }
          >
            <Table
              size="small"
              pagination={false}
              rowKey="vendor"
              dataSource={ca.grfQuotes}
              columns={quoteCols}
              rowClassName={(r) =>
                r.totalCost === ca.lowestQuote.totalCost ? "lowest-row" : ""
              }
            />
          </Card>
        </Col>
        {ca.grf && (
          <>
            <Col span={12}>
              <Card title={`Internal Cost Benchmark — ${ca.grf}`}>
                <Table
                  rowKey="name"
                  columns={itemCols}
                  dataSource={ca.grfItems}
                  size="small"
                  pagination={false}
                  bordered
                />
                <Typography.Paragraph className="text-right mt-2">
                  <strong>Internal Total: </strong>
                  {ca.internalTotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Cost Comparison Chart">
                <ReactApexChart
                  options={chartOptions as any}
                  series={[{ name: "Total", data: chartData }]}
                  type="bar"
                  height={300}
                />
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
