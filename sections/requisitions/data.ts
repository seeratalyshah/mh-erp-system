import { GrfRow } from "@/types/grf-rwo";


export const GRF_DATA: GrfRow[] = [
 {
    id: "GRF-2025-001",
    date: "2025-05-15",
    type: "goods",
    status: "pending",       
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
    status: "approved",         
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
    status: "rejected",        
    category: "Opex",
    description: "Printer toners",
    unit: "Box",
    quantity: 10,
    budgetHead: "OPS-SUP-07",
  },
];

 /* ——— Filter option lists ——— */
export const statusOpts = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];
export const typeOpts = [
  { label: "Goods", value: "goods" },
  { label: "Services", value: "services" },
];
