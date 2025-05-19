// app/dashboard/grf-view/reviewgrf/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import {
  Card,
  Form,
  Input,
  Radio,
  Button,
  Divider,
  Typography,
  Row,
  Col,
} from "antd";
import { GRF_DATA } from "../grf-view/data";
import GoBack from "@/components/common/go-back";

export default function ReviewGrfSection() {
  const router = useRouter();
  const { GRFId } = useParams();
  const grf = GRF_DATA.find((g: any) => g.id === GRFId);

  if (!grf) return <Typography.Text>GRF not found.</Typography.Text>;

  /* dummy approval log */
  const log = [
    {
      step: "Department Head Approval",
      note: "Approved with standard budget allocation",
      date: "Jan 15, 2025",
      done: true,
    },
    {
      step: "Executive Manager Review",
      note: "",
      date: "Pending",
      done: false,
    },
  ];

  const [form] = Form.useForm();

  const onFinish = (values: {
    status: "approved" | "rejected";
    comments: string;
  }) => {
    // TODO: send to API
    console.log("decision:", values);
    router.back();
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Row gutter={[0, 24]}>
        <Col>
          <GoBack link="/dashboard" />
        </Col>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            GRF Review
          </h1>
        </Col>
        <Col span={24}>
          <Card
            title={`GRF Review #${grf.id}`}
            extra={<Button type="default">Export PDF</Button>}
          >
            {/* —— header meta —— */}
            <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
              <span className="text-gray-500">Requester</span>{" "}
              <span>John Smith</span>
              <span className="text-gray-500">Department</span>{" "}
              <span>Operations</span>
              <span className="text-gray-500">Request Type</span>{" "}
              <span>{grf.type}</span>
              <span className="text-gray-500">Category</span>{" "}
              <span>{grf.category}</span>
              <span className="col-span-2 text-gray-500">Description</span>
              <span className="col-span-2">{grf.description}</span>
            </div>

            <Divider />

            {/* —— decision form —— */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ status: "approved", comments: "" }}
            >
              <Form.Item
                label="Approval Status"
                name="status"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="approved">Approved</Radio>
                  <Radio value="rejected">Rejected</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Comments"
                name="comments"
                rules={[{ max: 500, message: "Max 500 characters" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter your feedback here…"
                />
              </Form.Item>

              {/* —— approval log —— */}
              <Divider />
              <Typography.Title level={5}>
                Approval Process Log
              </Typography.Title>
              <ul className="space-y-4 mb-6">
                {log.map((l) => (
                  <li key={l.step} className="flex justify-between">
                    <div>
                      <span className="font-medium">{l.step}</span>
                      {l.note && (
                        <Typography.Paragraph type="secondary" className="!m-0">
                          {l.note}
                        </Typography.Paragraph>
                      )}
                    </div>
                    <span className={l.done ? "" : "text-gray-500"}>
                      {l.date}
                    </span>
                  </li>
                ))}
              </ul>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Decision
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => router.back()}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
