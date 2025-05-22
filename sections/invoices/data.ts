export type PayStatus = "unpaid" | "paid";

export interface InvoiceRow {
  id: string;
  vendor: string;
  amount: number;
  po: string;         
  grn: string;         
  payStatus: PayStatus;
}

export const INVOICE_DATA: InvoiceRow[] = [
  { id: "INV-0012", vendor: "ABC Supplies",  amount:  9500, po: "PO-0269", grn: "GRN-0231", payStatus: "unpaid" },
  { id: "INV-0011", vendor: "XYZ Corporation", amount: 12200, po: "PO-0271", grn: "GRN-0234", payStatus: "unpaid" },
  { id: "INV-0010", vendor: "ABC Supplies",  amount:  5750, po: "PO-0254", grn: "GRN-0229", payStatus: "unpaid" },
  { id: "INV-0009", vendor: "Global Industries", amount: 2500, po: "PO-0198", grn: "GRN-0205", payStatus: "unpaid" },
  { id: "INV-0008", vendor: "XYZ Corporation", amount: 18000, po: "PO-0211", grn: "GRN-0217", payStatus: "unpaid" },
];

export const vendorOpts = Array.from(
  new Set(INVOICE_DATA.map((r) => r.vendor))
).map((v) => ({ label: v, value: v }));

export const payOpts = [
  { label: "Unpaid", value: "unpaid" },
  { label: "Paid", value: "paid" },
];
