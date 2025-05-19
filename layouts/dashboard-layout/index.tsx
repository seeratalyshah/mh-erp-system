// DashboardLayout.tsx
"use client";

import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Header from "./header";
import Sidebar from "./sidebar";

const { Header: AntHeader, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ── Fixed top header ───────────────────────────────────────── */}
      <AntHeader
        style={{
          height: 56,
          padding: 0,
          lineHeight: "56px",
          position: "fixed",
          inset: 0,
          zIndex: 100,
        }}
      >
        <Header />
      </AntHeader>

      {/* ── Body (offset by header height) ─────────────────────────── */}
      <Layout style={{ marginTop: 56 }}>
        <Sider
          width={240}
          collapsedWidth={70}
          theme="dark"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ overflow: "auto" }}
        >
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </Sider>

        {/* children area scrolls; header & sidebar stay fixed */}
        <Content
          style={{
            height: "calc(100vh - 56px)",
            overflowY: "auto",
            padding: 24,
            background: "#ffffff",
            minHeight: 0,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
