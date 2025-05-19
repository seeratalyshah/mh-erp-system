// app/dashboard/reports/data.ts
export interface MonthlySpend {
  month: string; // short label
  amount: number; // USD
}

export interface TopVendor {
  name: string;
  spend: number; // USD
}

export interface SummaryStats {
  totalGrfs: number;
  pendingGrfs: number;
  approvedGrfs: number;
  totalSpend: number; // USD
}

// —— dummy summary stats ——
export const SUMMARY_STATS: SummaryStats = {
  totalGrfs: 48,
  pendingGrfs: 7,
  approvedGrfs: 39,
  totalSpend: 285_400,
};

// —— dummy monthly spend (last 6 months) ——
export const MONTHLY_SPEND: MonthlySpend[] = [
  { month: "Jan", amount: 32_500 },
  { month: "Feb", amount: 41_200 },
  { month: "Mar", amount: 37_800 },
  { month: "Apr", amount: 52_300 },
  { month: "May", amount: 63_600 },
  { month: "Jun", amount: 58_000 },
];

// —— dummy top‑5 vendors by spend ——
export const TOP_VENDORS: TopVendor[] = [
  { name: "TechSource Ltd.", spend: 96_000 },
  { name: "OfficePro Suppliers", spend: 73_500 },
  { name: "ConsultPlus", spend: 42_300 },
  { name: "GreenPrint Co.", spend: 33_200 },
  { name: "Global IT Hub", spend: 25_400 },
];
