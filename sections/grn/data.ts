/* ───────── Types ───────── */
export type GrnStatus = "pending" | "received";

export interface GrnRow {
  id: string;          // GRN-0005
  vendor: string;
  grnDate: string;     // ISO yyyy-mm-dd
  status: GrnStatus;
}

/* ───────── Dummy rows ───────── */
export const GRN_DATA: GrnRow[] = [
  {
    id: "GRN-0005",
    vendor: "ABC Supplies Ltd.",
    grnDate: "2024-04-20",
    status: "pending",
  },
  {
    id: "GRN-0004",
    vendor: "XYZ Corporation",
    grnDate: "2024-04-15",
    status: "received",
  },
  {
    id: "GRN-0003",
    vendor: "Global Industries",
    grnDate: "2024-04-10",
    status: "received",
  },
];

/* dropdown filter helpers */
export const vendorOpts = Array.from(
  new Set(GRN_DATA.map((r) => r.vendor))
).map((v) => ({ label: v, value: v }));
