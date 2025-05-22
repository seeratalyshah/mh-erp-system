/* =========  MOCK DATA  ========= */

/* Pretend this came from your GRF service */
export const GRF_DETAIL = {
  id: "GRF-2025-001",
  items: [
    { description: "Office Chairs", qty: 10, unitPrice: 50 },
    { description: "Desks", qty: 5, unitPrice: 120 },
  ],
  shippingAddress: "123 Main Street, Springfield",
};

/* Pretend this came from Cost-Analysis on that GRF */
export const QUOTE_SUMMARY = [
  { vendorId: 1, vendor: "ABC Supplies Ltd.", total: 1550 },
  { vendorId: 2, vendor: "XYZ Corporation", total: 1600 },
];

/* 10 % tax for demo */
export const TAX_RATE = 0.1;
