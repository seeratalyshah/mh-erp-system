import { CalculatorOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row } from "antd";
import { useCostAnalysis } from "./use-cost-analysis";

export const ItemCostCard = ({
  itemName,
  setItemName,
  quantity,
  setQuantity,
  unitCost,
  setUnitCost,
  analyzeItemCosts, // <- pick the correct handler
}: ReturnType<typeof useCostAnalysis>) => {
  return (
    <Card title="Item Cost Analysis">
      <Form layout="vertical" onFinish={analyzeItemCosts}>
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
                onChange={(v) => setQuantity(v ?? undefined)}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Unit Cost (USD)" required>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={unitCost}
                onChange={(v) => setUnitCost(v ?? undefined)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          block
          type="primary"
          icon={<CalculatorOutlined />}
          htmlType="submit"
        >
          Analyze Costs
        </Button>
      </Form>
    </Card>
  );
}
