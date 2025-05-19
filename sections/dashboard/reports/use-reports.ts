// app/dashboard/reports/useReports.ts
"use client";

import { SUMMARY_STATS, MONTHLY_SPEND, TOP_VENDORS } from "./data";
import { useMemo } from "react";

export function useReports() {
  // compute percentage of approved GRFs for progress circle
  const approvalRate = useMemo(() => {
    if (!SUMMARY_STATS.totalGrfs) return 0;
    return Math.round((SUMMARY_STATS.approvedGrfs / SUMMARY_STATS.totalGrfs) * 100);
  }, []);

  return {
    stats: SUMMARY_STATS,
    monthlySpend: MONTHLY_SPEND,
    topVendors: TOP_VENDORS,
    approvalRate,
  };
}
