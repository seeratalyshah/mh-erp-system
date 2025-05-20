export interface GrfRow {
  id: string;
  date: string; 
  type: "goods" | "services";
  status: "pending" | "approved" | "rejected";
  category: string;
  description: string;
  unit: string;
  quantity: number;
  budgetHead: string;
}