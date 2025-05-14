"use client";
import Link from "next/link";
import { quickActions } from "./data";

export default function QuickActionsBar() {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {quickActions.map(({ label, icon: Icon, href }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center gap-2 rounded-lg bg-[#0488a6] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#0488a6]/80"
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </div>
  );
}
