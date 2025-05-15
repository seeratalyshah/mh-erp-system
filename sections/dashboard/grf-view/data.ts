import { FilterDef } from "@/components/common/filters";

export interface GrfRow {
  id: string;
  date: string; // ISO
  type: "goods" | "services";
  category: string;
  description: string;
  unit: string;
  quantity: number;
  budgetHead: string;
}

export const GRF_DATA: GrfRow[] = [
  {
    id: "GRF-2025-001",
    date: "2025-05-15",
    type: "goods",
    category: "Capex",
    description: "Laptops (Dell Latitude 5440)",
    unit: "PCS",
    quantity: 20,
    budgetHead: "IT-BUD-01",
  },
  {
    id: "GRF-2025-002",
    date: "2025-05-16",
    type: "services",
    category: "Consulting",
    description: "Audit engagement for FY-24",
    unit: "Job",
    quantity: 1,
    budgetHead: "FIN-SRV-03",
  },
  {
    id: "GRF-2025-003",
    date: "2025-05-17",
    type: "goods",
    category: "Opex",
    description: "Printer toners",
    unit: "Box",
    quantity: 10,
    budgetHead: "OPS-SUP-07",
  },
];


// filtersData.ts
export const ACTIVITY_FILTERS: FilterDef[] = [
  {
    type: "select",
    FieldProps: { name: "grf-status", placeholder: "GRF Status" },
    options: [
      { label: "Pending",  value: "pending"  },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
    ],
  },
  {
    type: "select",
    FieldProps: { name: "grf-type", placeholder: "GRF Type" },
    options: [
      { label: "Goods",    value: "goods"    },
      { label: "Services", value: "services" },
    ],
  },
  {
    type: "date",
    FieldProps: {
      name: "grf-date",
      asSingle: true,         
    },
  },
];

