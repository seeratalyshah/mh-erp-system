"use client";

import {
  TOTAL_SPEND,
  PO_COUNT,
  ACTIVE_VENDORS,
  SPEND_ANALYSIS,
  VENDOR_PERF,
  MONTHLY_SPEND,
} from "./data";

export function useReports() {
  return {
    kpi: {
      totalSpend: TOTAL_SPEND,
      poCount: PO_COUNT,
      activeVendors: ACTIVE_VENDORS,
    },
    spendAnalysis: SPEND_ANALYSIS,
    vendorPerf: VENDOR_PERF,
    monthlySpend: MONTHLY_SPEND,
  };
}
