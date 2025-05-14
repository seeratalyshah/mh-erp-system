"use client";

import { useState } from "react";
import { FiMenu, FiGrid, FiFileText, FiBarChart2 } from "react-icons/fi";
import clsx from "clsx";
import Link from "next/link";

const links = [
  { label: "Dashboard", icon: <FiGrid size={20} />, href: "/dashboard" },
  { label: "Documents", icon: <FiFileText size={20} />, href: "/dashboard/documents" },
  { label: "Reports", icon: <FiBarChart2 size={20} />, href: "/dashboard/reports" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true); // start expanded

  return (
    <aside
      className={clsx(
        "flex flex-col h-full bg-gray-800 text-white transition-[width] duration-300",
        open ? "w-60" : "w-[70px]"
      )}
    >
      {/* ── Toggle button only ─────────────────── */}
      <div className="flex justify-end px-4 py-6">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-300 hover:text-white cursor-pointer"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* ── Navigation links ───────────────────── */}
      <nav className="flex flex-col gap-1 px-2">
        {links.map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className={clsx(
              "group flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium hover:bg-white/10",
              label === "Dashboard" && "bg-white/10"
            )}
          >
            <span className="text-primary-300">{icon}</span>
            {open && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4" />
    </aside>
  );
}
