/* ---------- Types ---------- */
export type GrnStatus = "Received" | "Pending";

export interface GrnRow {
  id: string;          
  po: string;          
  grf: string;         
  vendor: string;
  status: GrnStatus;
  attachment: string;
}

/* ---------- Dummy rows ---------- */
export const GRN_DATA: GrnRow[] = [
  {
    id: "GRN-2025-003",
    po: "PO-2025-003",
    grf: "GRF-2025-004",
    vendor: "ABC Supplies Ltd.",
    status: "Received",
    attachment: "GRN-2025-003.pdf",
  },
  {
    id: "GRN-2025-002",
    po: "PO-2025-001",
    grf: "GRF-2025-003",
    vendor: "ABC Supplies Ltd.",
    status: "Received",
    attachment: "GRN-2025-002.pdf",
  },
  {
    id: "GRN-2025-001",
    po: "PO-2025-000",
    grf: "GRF-2024-007",
    vendor: "Global Industries",
    status: "Pending",
    attachment: "GRN-2025-001.pdf",
  },
];

/* ---------- Select-box helpers ---------- */
export const grnNumberOpts = GRN_DATA.map((g) => ({ label: g.id, value: g.id }));
export const poNumberOptsGRN = Array.from(new Set(GRN_DATA.map((g) => g.po))).map(
  (p) => ({ label: p, value: p })
);
export const grfNumberOptsGRN = Array.from(new Set(GRN_DATA.map((g) => g.grf))).map(
  (r) => ({ label: r, value: r })
);
export const vendorOptsGRN = Array.from(new Set(GRN_DATA.map((g) => g.vendor))).map(
  (v) => ({ label: v, value: v })
);
export const grnStatusOpts = [
  { label: "Received", value: "Received" },
  { label: "Pending",  value: "Pending" },
];
