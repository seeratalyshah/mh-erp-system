// Header.tsx – revamped look with Ant Design components
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Dropdown, MenuProps, Avatar, Typography, Button } from "antd";
import {
  FiLogOut,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  /* dropdown menu for user actions */
  const items: MenuProps["items"] = [
    {
      key: "profile",
      icon: <FiUser />,
      label: "Profile",
      disabled: true, // not implemented yet
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <FiLogOut />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="flex h-14 w-full items-center justify-between bg-primary px-6 shadow-md">
      {/* ── Brand ───────────────────────────────────────────── */}
      <Typography.Title
        level={4}
        className="!m-0 !text-white tracking-wide select-none"
      >
        MH ERP SYSTEM
      </Typography.Title>

      {/* ── User section ───────────────────────────────────── */}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button className="flex items-center gap-2">
          {/* <Avatar size={28} className="bg-white/90 backdrop-blur-sm">
            {user?.email?.charAt(0).toUpperCase() ?? "G"}
          </Avatar> */}
          <span className="hidden sm:inline text-sm">
            {user?.email ?? "Guest"}
          </span>
          <FiChevronDown className="hidden sm:inline-block" />
        </Button>
      </Dropdown>
    </header>
  );
}
