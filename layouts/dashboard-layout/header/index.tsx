"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  return (
    <nav
      /* 👇 expose the height for the sidebar’s calc(100vh - var(--header-height)) */
      style={{ "--header-height": "56px" } as React.CSSProperties}
      className="flex h-14 items-center justify-between bg-[#0488a6] px-4"
    >
      <h1 className="text-xl font-semibold text-white">MH ERP SYSTEM</h1>

      <div className="flex items-center gap-4 text-white">
        <span className="text-sm">
          {user?.email ?? "Guest"}
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 rounded bg-white/30 px-3 py-1 text-sm font-medium hover:bg-white/50 cursor-pointer"
        >
          <FiLogOut size={14} />
          Logout
        </button>
      </div>
    </nav>
  );
}
