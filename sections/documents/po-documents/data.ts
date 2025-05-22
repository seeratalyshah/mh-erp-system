/* ───────── Types ───────── */
export type PoStatus = "Open" | "Closed";

export interface PoRow {
  id: string;          // PO-2025-003
  grf: string;         // GRF-2025-004
  vendor: string;
  status: PoStatus;
  attachment: string;
}

/* ───────── Dummy rows ───────── */
export const PO_DATA: PoRow[] = [
  { id: "PO-2025-003", grf: "GRF-2025-004", vendor: "ABC Suppliers Ltd.", status: "Open",   attachment: "PO-2025-003.pdf" },
  { id: "PO-2025-002", grf: "GRF-2025-003", vendor: "XYZ Corporation",   status: "Open",   attachment: "PO-2025-002.pdf" },
  { id: "PO-2024-001", grf: "GRF-2024-007", vendor: "Global Industries", status: "Closed", attachment: "PO-2024-001.pdf" },
  { id: "PO-2024-015", grf: "GRF-2024-005", vendor: "ABC Suppliers Ltd.",status: "Closed", attachment: "PO-2024-015.pdf" },
];

/* ───────── Select-box helpers ───────── */
export const poNumberOpts = PO_DATA.map((p) => ({
  label: p.id,
  value: p.id,
}));

export const vendorOpts = Array.from(new Set(PO_DATA.map((p) => p.vendor))).map(
  (v) => ({ label: v, value: v })
);

export const statusOptsPO = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
];

export const grfNumberOptsPO = Array.from(new Set(PO_DATA.map((p) => p.grf))).map(
  (g) => ({ label: g, value: g })
);
