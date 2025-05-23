/* ───────── Types ───────── */
export interface Quotation {
  grf: string;
  vendor: string;
  quotationAmount: number;
  deliveryTime: number;
  additionalCosts: number;
  totalCost: number;      // quotationAmount + additional
}

export interface GrfItem {
  grf: string;
  name: string;
  quantity: number;
}

/* ───────── Dummy quotations ───────── */
export const QUOTATIONS: Quotation[] = [
  {
    grf: "GRF-2025-004",
    vendor: "ABC Supplies Ltd.",
    quotationAmount: 12_500,
    deliveryTime: 15,
    additionalCosts: 500,
    totalCost: 13_000,
  },
  {
    grf: "GRF-2025-004",
    vendor: "XYZ Corporation",
    quotationAmount: 13_200,
    deliveryTime: 10,
    additionalCosts: 800,
    totalCost: 14_000,
  },
  {
    grf: "GRF-2025-005",
    vendor: "Global Industries",
    quotationAmount: 11_900,
    deliveryTime: 20,
    additionalCosts: 300,
    totalCost: 12_200,
  },
  {
    grf: "GRF-2025-005",
    vendor: "XYZ Corporation",
    quotationAmount: 12_800,
    deliveryTime: 18,
    additionalCosts: 400,
    totalCost: 13_200,
  },
];

/* ───────── Items captured in each GRF ───────── */
export const GRF_ITEMS: GrfItem[] = [
  { grf: "GRF-2025-004", name: "Laptop",  quantity: 10 },
  { grf: "GRF-2025-004", name: "Mouse",   quantity: 10 },
  { grf: "GRF-2025-005", name: "Printer", quantity:  2 },
  { grf: "GRF-2025-005", name: "Toner",   quantity:  8 },
];
