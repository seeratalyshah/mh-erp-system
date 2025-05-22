/* ───────── Types ───────── */
export type POStatus = "open" | "closed" | "pending";

export interface PoRow {
  id: string;          // primary key
  po: string;          // PO-2025-004
  grf: string;         // GRF-2025-001
  vendor: string;
  status: POStatus;
  orderDate: string;   // ISO yyyy-mm-dd
  expectedDate: string;
  total: number;       // USD
}

/* ───────── Dummy data ───────── */
export const PO_DATA: PoRow[] = [
  {
    id: "PO-2025-004",
    po: "PO-2025-004",
    grf: "GRF-2025-001",
    vendor: "ABC Supplies Ltd.",
    status: "open",
    orderDate: "2025-03-03",
    expectedDate: "2025-03-10",
    total: 14500,
  },
  {
    id: "PO-2025-003",
    po: "PO-2025-003",
    grf: "GRF-2025-001",
    vendor: "XYZ Corporation",
    status: "closed",
    orderDate: "2025-02-25",
    expectedDate: "2025-02-28",
    total: 9800,
  },
  {
    id: "PO-2025-002",
    po: "PO-2025-002",
    grf: "GRF-2025-003",
    vendor: "LMN Enterprises",
    status: "pending",
    orderDate: "2025-02-12",
    expectedDate: "2025-02-20",
    total: 6200,
  },
  {
    id: "PO-2025-001",
    po: "PO-2025-001",
    grf: "GRF-2025-002",
    vendor: "QRS Manufacturing",
    status: "closed",
    orderDate: "2025-01-30",
    expectedDate: "2025-02-05",
    total: 15750,
  },
];

/* dropdown helpers */
export const statusOpts = [
  { label: "Open", value: "open" },
  { label: "Pending", value: "pending" },
  { label: "Closed", value: "closed" },
];

export const vendorOpts = Array.from(
  new Set(PO_DATA.map((p) => p.vendor))
).map((v) => ({ label: v, value: v }));
