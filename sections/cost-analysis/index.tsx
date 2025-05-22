// app/dashboard/cost-analysis/page.tsx
"use client";

import {
  Typography,
  Row,
  Col,
  Card,
  Table,
  message,
} from "antd";
import dynamic from "next/dynamic";
import GoBack from "@/components/common/go-back";
import { useCostAnalysis } from "./use-cost-analysis";
import { ItemCostCard } from "./ItemCostCard";
import { ExportButtons } from "./ExportButtons";

/* ApexCharts must be loaded client-side only */
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CostAnalysisSection() {
  const [msgApi, ctx] = message.useMessage();
  const ca = useCostAnalysis(msgApi);

  /* —— table cols —— */
  const quoteCols = [
    { title: "Vendor", dataIndex: "vendor" },
    {
      title: "Quotation",
      dataIndex: "quotationAmount",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    { title: "Delivery (days)", dataIndex: "deliveryTime" },
    {
      title: "Additional",
      dataIndex: "additionalCosts",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      title: "Total",
      dataIndex: "totalCost",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
  ];

  /* —— Apex options —— */
  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: ca.quotations.map((q) => q.vendor) },
    colors: ca.quotations.map((q) =>
      q.vendor === ca.lowestQuote.vendor ? "#52c41a" : "#1890ff"
    ),
    plotOptions: { bar: { distributed: true, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `$${v.toLocaleString()}` } },
  } as const;

  const chartSeries = [
    { name: "Total Cost", data: ca.quotations.map((q) => q.totalCost) },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {ctx}

      {/* ——— header & table ——— */}
      <Row gutter={[0, 24]}>

        <Col span={24}>
          <Typography.Title level={4} className="!mb-2">
            Cost Analysis
          </Typography.Title>
        </Col>

        <Col span={24}>
          <Card
            title="Quotation Comparison"
            extra={
              <ExportButtons
                rows={ca.quotations}
                avg={ca.averageQuote}
                lowest={ca.lowestQuote.vendor}
              />
            }
          >
            <Table
              size="small"
              pagination={false}
              rowKey="vendor"
              dataSource={ca.quotations}
              columns={quoteCols}
              rowClassName={(row) =>
                row.vendor === ca.lowestQuote.vendor ? "lowest-row" : ""
              }
            />
          </Card>
        </Col>
      </Row>

      {/* ——— form & (conditional) chart ——— */}
      {!ca.analysisResult ? (
        /* BEFORE analyse → full-width form */
        <Row>
          <Col span={24}>
            <ItemCostCard {...ca} />
          </Col>
        </Row>
      ) : (
        /* AFTER analyse → split 50/50 */
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <ItemCostCard {...ca} />
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Cost Comparison Chart">
              <ReactApexChart
                options={chartOptions as any}
                series={chartSeries}
                type="bar"
                height={300}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* ——— summary card (also conditional) ——— */}
      {ca.analysisResult && (
        <Card>
          <Typography.Paragraph>
            <strong>Lowest Quote:</strong> {ca.analysisResult.lowestVendor}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Average Quote:</strong>{" "}
            {ca.analysisResult.averageQuote.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography.Paragraph>
        </Card>
      )}
    </div>
  );
}
