"use client";

import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthInitializer } from "@/hoc/with-auth-initializer";
import { Toaster } from "react-hot-toast";
import { toasterStyling } from "@/utils/functions";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 1,
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>ERP System</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider attribute="class" enableSystem={false}>
        <QueryClientProvider client={queryClient}>
          <AuthInitializer>
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={toasterStyling}
            />
          </AuthInitializer>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
