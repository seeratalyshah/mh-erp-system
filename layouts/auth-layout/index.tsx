"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { SplashScreen } from "@/components/common/splash-screen";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      // Already signed in – send them to the main app
      router.replace("/dashboard");
    } else {
      setChecking(false); // show login form
    }
  }, [isAuthenticated, router]);

  if (checking) return <SplashScreen />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900 p-6">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
