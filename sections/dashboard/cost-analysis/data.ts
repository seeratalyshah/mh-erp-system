// app/dashboard/cost-analysis/data.ts

export interface Quotation {
  vendor: string;
  quotationAmount: number; // USD
  deliveryTime: number; // days
  additionalCosts: number; // USD
  totalCost: number; // USD (amount + additional)
}

export interface ItemCostInput {
  item: string;
  quantity: number;
  unitCost: number;
}

/* ── dummy quotations from two vendors ── */
export const QUOTATIONS: Quotation[] = [
  {
    vendor: "ABC Suppliers Ltd.",
    quotationAmount: 12_500,
    deliveryTime: 15,
    additionalCosts: 500,
    totalCost: 13_000,
  },
  {
    vendor: "XYZ Corporation",
    quotationAmount: 13_200,
    deliveryTime: 10,
    additionalCosts: 800,
    totalCost: 14_000,
  },
];
