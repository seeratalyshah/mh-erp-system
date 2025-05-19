"use client";
import Link from "next/link";
import { quickActions } from "./data";
import { Button } from "antd";

export default function QuickActionsBar() {
  return (
    <div className="flex flex-wrap gap-4">
      {quickActions.map(({ label, icon: Icon, href }) => (
        <Link
          key={label}
          href={href}
        >
          <Button type="primary">
            <Icon size={18} />
            {label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
