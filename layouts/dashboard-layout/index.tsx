"use client";

import React, { ReactNode, useState } from "react";
import { Layout } from "antd";
import Header from "./header";
import Sidebar from "./sidebar";
import Link from "next/link";

const { Header: AntHeader, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
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
        {/* Sidebar – silent scrollbar */}
        <Sider
          width={240}
          collapsedWidth={70}
          theme="dark"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="overflow-y-auto scrollbar-hide"
        >
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </Sider>

        {/* Main content – silent scrollbar */}
        <Content className="h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide p-6 bg-white flex-1">
          {children}
        </Content>

        {/* Optional “Quick Links” column */}
        <div className="h-[calc(100vh-56px)] w-48 bg-primary/10 text-primary p-4 overflow-y-auto scrollbar-hide">
          <p className="text-lg font-semibold">Quick Links</p>
          <ul className="mt-2 flex flex-col gap-2">
            <li>
              <Link href="/dashboard/requisitions/new-grf">
                <span className="text-primary text-sm hover:underline">
                  Create New GRF
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/requisitions">
                <span className="text-primary text-sm hover:underline">
                  GRF List
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/RFQs/request-quotation">
                <span className="text-primary text-sm hover:underline">
                  Request Quotation
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/upload-quotations">
                <span className="text-primary text-sm hover:underline">
                  Upload Quotation
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/purchase-orders/create-purchase-order">
                <span className="text-primary text-sm hover:underline">
                  Generate Purchase Order
                </span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/vendors">
                <span className="text-primary text-sm hover:underline">
                  Vendors Management
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </Layout>
  );
}
