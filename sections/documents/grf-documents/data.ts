/* ───────── Types ───────── */
export type GrfStatus = "Approved" | "Rejected" | "Pending";

export interface GrfRow {
  id: string;
  requester: string;
  department: string;
  status: GrfStatus;
  attachment: string;
}

/* ───────── Dummy rows ───────── */
export const GRF_DATA: GrfRow[] = [
  {
    id: "GRF-2025-004",
    requester: "Jane Williams",
    department: "HR",
    status: "Approved",
    attachment: "GRF-2025-004.pdf",
  },
  {
    id: "GRF-2025-003",
    requester: "Sarah Brown",
    department: "Marketing",
    status: "Approved",
    attachment: "GRF-2025-003.pdf",
  },
  {
    id: "GRF-2025-002",
    requester: "John Smith",
    department: "Operations",
    status: "Rejected",
    attachment: "GRF-2025-002.pdf",
  },
  {
    id: "GRF-2025-001",
    requester: "Michael Johnson",
    department: "Finance",
    status: "Approved",
    attachment: "GRF-2025-001.pdf",
  },
];

/* ───────── Select-box option helpers ───────── */
export const grfNumberOpts = GRF_DATA.map((g) => ({
  label: g.id,
  value: g.id,
}));

export const requesterOpts = Array.from(
  new Set(GRF_DATA.map((g) => g.requester))
).map((r) => ({ label: r, value: r }));

export const deptOpts = Array.from(
  new Set(GRF_DATA.map((g) => g.department))
).map((d) => ({ label: d, value: d }));

export const statusOpts = [
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
  { label: "Pending", value: "Pending" },
];
