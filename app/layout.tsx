// app/layout.tsx
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import 'antd/dist/reset.css';          // AntD base-CSS first  ✅
import "./globals.css";                // Tailwind & custom styles
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, theme as antdTheme } from "antd";

import { Layout as RootLayout } from "@/layouts/root";
import { Open_Sans as openSansFunc } from "next/font/google";
import { NProgress } from "@/components/common/np-progress";

export const dynamic = "force-dynamic";

/* ── Fonts ─────────────────────────────────────────── */
const openSans = openSansFunc({
  subsets: ["latin"],
  display: "swap",
});

/* ── <meta viewport> (next/head auto-inject) ───────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ── <head> metadata ───────────────────────────────── */
export const metadata: Metadata = {
  title: "ERP System",
  description: "Procurement Management",
  icons: {
    icon: [
      { url: "/favicon.ico",          type: "image/x-icon"                    },
      { url: "/favicon-16x16.png",    type: "image/png", sizes: "16x16"       },
      { url: "/favicon-32x32.png",    type: "image/png", sizes: "32x32"       },
    ],
    apple: { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
  },
};

/* ── Props ─────────────────────────────────────────── */
interface LayoutProps {
  children: ReactNode;
}

/* ── The actual layout component ───────────────────── */
export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        {/* Ant Design theme provider */}
        <ConfigProvider
          theme={{
            token: { colorPrimary: "#0488a6" },     // ← your primary colour
            algorithm: antdTheme.defaultAlgorithm,  // swap for darkAlgorithm if needed
          }}
        >
          <RootLayout>
            {children}
            <NProgress />
          </RootLayout>
        </ConfigProvider>
      </body>
    </html>
  );
}
