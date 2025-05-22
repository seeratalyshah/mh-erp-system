// app/dashboard/settings/page.tsx
"use client";

import { Row, Col, Card, Form, Input, Select, Switch, Button } from "antd";
import { useSettings } from "./use-settings";
import GoBack from "@/components/common/go-back";

export default function SettingsSection() {
  const { profile, prefs, saveChanges, loading } = useSettings();
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const nextProfile = {
      name: values.name,
      email: values.email,
      role: profile.role,
    };
    const nextPrefs = {
      theme: values.theme,
      emailNotifications: values.emailNotifications,
      smsNotifications: values.smsNotifications,
      language: values.language,
    };
    saveChanges(nextProfile, nextPrefs);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Settings
          </h1>
        </Col>
        <Col span={24}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              name: profile.name,
              email: profile.email,
              theme: prefs.theme,
              emailNotifications: prefs.emailNotifications,
              smsNotifications: prefs.smsNotifications,
              language: prefs.language,
            }}
          >
            {/* —— Profile section —— */}
            <Card title="Profile Information" className="mb-6">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email" }]}
                  >
                    <Input placeholder="you@example.com" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>{" "}
            <br />
            {/* —— Preferences section —— */}
            <Card title="Preferences">
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="Theme" name="theme">
                    <Select options={[{ value: "light" }, { value: "dark" }]} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Language" name="language">
                    <Select
                      options={[
                        { value: "en", label: "English" },
                        { value: "es", label: "Spanish" },
                        { value: "fr", label: "French" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Email Notifications"
                    name="emailNotifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    label="SMS Notifications"
                    name="smsNotifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <br />
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
