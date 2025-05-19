// DashboardSection.tsx
"use client";

import QuickActionsBar from "./QuickActionsBar";
import FeatureCard from "./FeatureCard";
import NotificationCard from "./NotificationCard";
import { featureCards, notifications } from "./data";
import { Col, Row } from "antd";

export default function DashboardSection() {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <h1 className="text-xl font-semibold pb-2 border-b border-gray-200">
            Dashboard
          </h1>
        </Col>
        <Col span={24}>
          <QuickActionsBar />
        </Col>
        <Col span={24}>
          <Row gutter={[24, 32]}>
            <Col xs={24} lg={18}>
              <Row gutter={[24, 24]}>
                {featureCards.map((card) => (
                  <Col key={card.title} xs={24} sm={24} md={12}>
                    <FeatureCard {...card} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24} lg={6}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Notifications
                  </h4>
                  <button className="text-xs text-primary-600 hover:underline dark:text-primary-400">
                    Mark all as read
                  </button>
                </div>
                <Row gutter={[0, 16]}>
                  {notifications.map((n) => (
                    <Col span={24} key={n.text}>
                      <NotificationCard {...n} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
