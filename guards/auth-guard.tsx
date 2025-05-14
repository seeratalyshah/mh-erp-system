"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/common/splash-screen";
import { useAuthStore } from "@/store/auth-store";

type AuthGuardProps = { children: React.ReactNode };

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated()) {
      const returnTo = window.location.pathname + window.location.search;
      router.replace(`/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
    }
    setChecking(false);
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || checking || !isAuthenticated()) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
