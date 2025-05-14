"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { SplashScreen } from "@/components/common/splash-screen";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  // Simulate “hydration” (e.g. restoring user from sessionStorage if you want)
  useEffect(() => {
    // Example: restore user from sessionStorage (optional)
    const stored = sessionStorage.getItem("demo-user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        useAuthStore.getState().setAuth(parsed);
      } catch {
        /* ignore invalid JSON */
      }
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  // `AuthGuard` (used in your routes) will handle redirecting unauthenticated users.
  return <>{children}</>;
}
