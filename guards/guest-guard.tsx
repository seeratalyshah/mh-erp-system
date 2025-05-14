"use client";
import { useAuthStore } from "@/store/auth-store";
import type React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SplashScreen } from "@/components/common/splash-screen";

type GuestGuardProps = {
  children: React.ReactNode;
};

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isLoading && isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  if (!isClient) {
    return <>{children}</>;
  }

  if (isLoading || isAuthenticated()) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
