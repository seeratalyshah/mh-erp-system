/* ------------  Mock GRFs & vendor quotes  ------------ */

export interface GrfDetail {
  id: string;
  items: { description: string; qty: number; unitPrice: number }[];
  shippingAddress: string;
}

export interface QuoteSummary {
  grf: string;
  vendorId: number;
  vendor: string;
  total: number;
}

export const GRF_LIST: GrfDetail[] = [
  {
    id: "GRF-2025-001",
    items: [
      { description: "Office Chairs", qty: 10, unitPrice: 50 },
      { description: "Desks",         qty: 5,  unitPrice: 120 },
    ],
    shippingAddress: "123 Main Street, Springfield",
  },
  {
    id: "GRF-2025-002",
    items: [
      { description: "Laptop",        qty: 8,  unitPrice: 900 },
      { description: "Docking Station", qty: 8, unitPrice: 120 },
    ],
    shippingAddress: "200 Industrial Rd, Metropolis",
  },
];

export const QUOTE_SUMMARIES: QuoteSummary[] = [
  { grf: "GRF-2025-001", vendorId: 1, vendor: "ABC Supplies Ltd.", total: 1550 },
  { grf: "GRF-2025-001", vendorId: 2, vendor: "XYZ Corporation",  total: 1600 },
  { grf: "GRF-2025-002", vendorId: 3, vendor: "TechSource",       total:  8600 },
  { grf: "GRF-2025-002", vendorId: 2, vendor: "XYZ Corporation",  total:  8900 },
];

/* simple 10 % demo tax */
export const TAX_RATE = 0.1;
