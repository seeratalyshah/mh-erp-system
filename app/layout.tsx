import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Layout as RootLayout } from "@/layouts/root";
import { Open_Sans as openSansFunc } from "next/font/google";
import { NProgress } from "@/components/common/np-progress";
export const dynamic = "force-dynamic";

const openSans = openSansFunc({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ERP System",
  description: "Procurement Management",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className} suppressHydrationWarning>
        <RootLayout>
          {children} <NProgress />
        </RootLayout>
      </body>
    </html>
  );
}

export default Layout;
