// procurement-forms/data.ts
export interface RequiredDoc {
  key: string;
  label: string;
  status: "Auto-generated" | "Auto-fetched" | "Upload";
}

export const REQUIRED_DOCS: RequiredDoc[] = [
  { key: "po", label: "Purchase Order (PO)", status: "Auto-generated" },
  { key: "grf", label: "Goods Request Form (GRF)", status: "Auto-fetched" },
  { key: "grn", label: "Goods Receipt Note (GRN)", status: "Auto-generated" },
  { key: "bills", label: "Upload Bills", status: "Upload" },
  { key: "inspection", label: "Inspection Reports", status: "Upload" },
];

export const GENERATABLE_DOCS = [
  { value: "po", label: "Purchase Order (PO)" },
  { value: "grn", label: "Goods Receipt Note (GRN)" },
  { value: "grf", label: "Goods Request Form (GRF)" },
];