// Sidebar.tsx – Ant Design version (fix active link detection)
"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  FiMenu,
  FiGrid,
  FiFileText,
  FiBarChart2,
  FiDollarSign,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const links = [
  { key: "/dashboard", label: "Dashboard", icon: <FiGrid size={18} /> },
  {
    key: "/dashboard/procurement-forms",
    label: "Documents",
    icon: <FiFileText size={18} />,
  },
  {
    key: "/dashboard/reports",
    label: "Reports",
    icon: <FiBarChart2 size={18} />,
  },
   {
    key: "/dashboard/cost-analysis",
    label: "Cost Analysis",
    icon: <FiDollarSign size={18} />,
  },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  /* map route list to AntD <Menu> items */
  const items: MenuProps["items"] = links.map((l) => ({
    key: l.key,
    icon: l.icon,
    label: <Link href={l.key}>{l.label}</Link>,
  }));

  /**
   * Determine which menu key should be highlighted.
   * 1️⃣ prefer exact match (pathname === key)
   * 2️⃣ otherwise choose the *longest* key that is a prefix of pathname
   *     (handles nested routes like /dashboard/documents/123)
   */
  const activeKey = (() => {
    // exact match first
    const exact = links.find((l) => pathname === l.key)?.key;
    if (exact) return exact;

    // longest prefix match (more specific route wins)
    const prefixMatches = links
      .filter((l) => pathname.startsWith(l.key))
      .sort((a, b) => b.key.length - a.key.length);

    return prefixMatches[0]?.key ?? "/dashboard";
  })();

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white">
      {/* ── Collapse toggle ──────────────────────────────── */}
      <div className="flex justify-end p-4">
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* ── Nav menu ─────────────────────────────────────── */}
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[activeKey]}
        items={items}
        style={{ borderInlineEnd: "none", flex: 1 }}
      />
    </div>
  );
}
