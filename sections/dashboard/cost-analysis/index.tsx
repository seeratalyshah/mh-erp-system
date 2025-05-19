// app/dashboard/cost-analysis/page.tsx – now with ApexCharts
"use client";

import {
  Typography,
  Row,
  Col,
  Card,
  Table,
  Button,
  Input,
  InputNumber,
  Form,
  message,
} from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import GoBack from "@/components/common/go-back";
import { useCostAnalysis } from "./use-cost-analysis";

/* ApexCharts requires dynamic import to avoid SSR issues */
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CostAnalysisSection() {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    quotations,
    lowestQuote,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    unitCost,
    setUnitCost,
    analysisResult,
    analyzeItemCosts,
  } = useCostAnalysis(messageApi);

  /* quotation comparison table */
  const quoteCols = [
    { title: "Vendor Name", dataIndex: "vendor", key: "vendor" },
    {
      title: "Quotation Amount",
      dataIndex: "quotationAmount",
      key: "quotationAmount",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      title: "Delivery Time",
      dataIndex: "deliveryTime",
      key: "deliveryTime",
      render: (d: number) => `${d} days`,
    },
    {
      title: "Additional Costs",
      dataIndex: "additionalCosts",
      key: "additionalCosts",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (v: number) => `$${v.toLocaleString()}`,
    },
  ];

  /* —— Apex chart config —— */
  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: {
      categories: quotations.map((q) => q.vendor),
      labels: { style: { fontSize: "12px" } },
    },
    colors: quotations.map((q) =>
      q.vendor === lowestQuote.vendor ? "#52c41a" : "#1890ff"
    ),
    plotOptions: {
      bar: { distributed: true, columnWidth: "55%" },
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  } as const;
  const chartSeries = [
    {
      name: "Total Cost",
      data: quotations.map((q) => q.totalCost),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {contextHolder}
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Cost Analysis
          </h1>
        </Col>

        {/* Quotation table */}
        <Col span={24}>
          <Card title="Quotation Comparison" extra={<ExportButtons />}>
            <Table
              size="small"
              pagination={false}
              dataSource={quotations.map((q) => ({ ...q, key: q.vendor }))}
              columns={quoteCols}
              rowClassName={(row) =>
                row.vendor === lowestQuote.vendor ? "bg-green-50" : ""
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Item cost analysis */}
        <Col xs={24} lg={12}>
          <ItemCostCard
            itemName={itemName}
            setItemName={setItemName}
            quantity={quantity}
            setQuantity={setQuantity}
            unitCost={unitCost}
            setUnitCost={setUnitCost}
            onAnalyze={analyzeItemCosts}
          />
        </Col>

        {/* Apex chart */}
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

      {analysisResult && (
        <Card>
          <Typography.Paragraph>
            <strong>Lowest Quote:</strong> {analysisResult.lowestVendor}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <strong>Average Quote:</strong> $
            {analysisResult.averageQuote.toLocaleString()}
          </Typography.Paragraph>
        </Card>
      )}
    </div>
  );
}

/* --------------------- helper components --------------------- */
function ExportButtons() {
  return (
    <Row gutter={8}>
      <Col>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Export Excel
        </Button>
      </Col>
      <Col>
        <Button type="primary" icon={<FilePdfOutlined />}>
          Export PDF
        </Button>
      </Col>
    </Row>
  );
}

function ItemCostCard({
  itemName,
  setItemName,
  quantity,
  setQuantity,
  unitCost,
  setUnitCost,
  onAnalyze,
}: {
  itemName: string;
  setItemName: (v: string) => void;
  quantity: number | undefined;
  setQuantity: (v: number | undefined) => void;
  unitCost: number | undefined;
  setUnitCost: (v: number | undefined) => void;
  onAnalyze: () => void;
}) {
  return (
    <Card title="Item Cost Analysis">
      <Form layout="vertical" onFinish={onAnalyze}>
        <Form.Item label="Item Name" required>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Quantity" required>
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                value={quantity}
                onChange={(val) => setQuantity(val ?? undefined)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Unit Cost (USD)" required>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={unitCost}
                onChange={(val) => setUnitCost(val ?? undefined)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button
          type="primary"
          icon={<CalculatorOutlined />}
          htmlType="submit"
          block
        >
          Analyze Costs
        </Button>
      </Form>
    </Card>
  );
}
