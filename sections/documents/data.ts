/* ---------- Types ---------- */
export interface GrfRow {
  id: string;
  requester: string;
  department: string;
  status: "Approved" | "Rejected" | "Pending";
}

export interface PoRow {
  id: string;
  vendor: string;
  status: "Open" | "Closed";
  attachment: string;
}

export interface GrnRow {
  id: string;
  po: string;
  vendor: string;
  status: "Received" | "Pending";
  attachment: string;
}

/* ---------- Dummy rows ---------- */
export const GRF_DATA: GrfRow[] = [
  { id: "GRF-2025-004", requester: "Jane Williams",   department: "HR",        status: "Approved" },
  { id: "GRF-2025-003", requester: "Sarah Brown",    department: "Marketing", status: "Approved" },
  { id: "GRF-2025-002", requester: "John Smith",     department: "Operations",status: "Rejected" },
  { id: "GRF-2025-001", requester: "Michael Johnson",department: "Finance",   status: "Approved" },
];

export const PO_DATA: PoRow[] = [
  { id: "PO-2025-003", vendor: "ABC Suppliers Ltd.",  status: "Open",   attachment: "PO-2025-003.pdf" },
  { id: "PO-2025-002", vendor: "XYZ Corporation",    status: "Open",   attachment: "PO-2025-002.pdf" },
  { id: "PO-2024-001", vendor: "Global Industries",  status: "Closed", attachment: "PO-2024-001.pdf" },
  { id: "PO-2024-015",vendor: "ABC Suppliers Ltd.",  status: "Closed", attachment: "PO-2024-015.pdf" },
];

export const GRN_DATA: GrnRow[] = [
  { id: "GRN-2025-003", po: "PO-2025-003", vendor: "ABC Supplies Ltd.", status: "Received", attachment: "GRN-2025-003.pdf" },
  { id: "GRN-2025-002", po: "PO-2025-001", vendor: "ABC Supplies Ltd.", status: "Received", attachment: "GRN-2025-002.pdf" },
  { id: "GRN-2025-001", po: "PO-2025-000", vendor: "ABC Supplies Ltd.", status: "Received", attachment: "GRN-2025-001.pdf" },
];

/* ---------- Select-box option helpers ---------- */
export const grfNumberOpts   = GRF_DATA.map((g) => ({ label: g.id, value: g.id }));
export const requesterOpts   = GRF_DATA.map((g) => ({ label: g.requester, value: g.requester }));
export const poNumberOpts    = PO_DATA.map((p)  => ({ label: p.id, value: p.id }));
export const vendorOpts      = Array.from(new Set(PO_DATA.map((p) => p.vendor)))
                                    .map((v) => ({ label: v, value: v }));
export const statusOptsPO    = [
  { label: "Open", value: "Open" },
  { label: "Closed", value: "Closed" },
];
export const grnStatusOpts   = [
  { label: "Received", value: "Received" },
  { label: "Pending",  value: "Pending" },
];
