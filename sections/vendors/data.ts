// data.ts
export interface VendorRow {
  id: string;          // internal id / row key
  name: string;        // company name
  contactName: string; // primary contact
  email: string;
  phone: string;
}

/* ——— dummy seed data ——— */
export const VENDORS_DATA: VendorRow[] = [
  {
    id: "VND-001",
    name: "ABC Supplies Ltd.",
    contactName: "John Smith",
    email: "john.smith@abc.com",
    phone: "(123) 456-7890",
  },
  {
    id: "VND-002",
    name: "Global Traders",
    contactName: "Mary Johnson",
    email: "m.johnson@globaltraders.com",
    phone: "(234) 557-8901",
  },
  {
    id: "VND-003",
    name: "XYZ Industries",
    contactName: "James Williams",
    email: "jwilliams@xyzindustries.com",
    phone: "(345) 578-9012",
  },
  {
    id: "VND-004",
    name: "Acme Corp",
    contactName: "Patricia Brown",
    email: "pbrown@acmecorp.io",
    phone: "(456) 789-0123",
  },
  {
    id: "VND-005",
    name: "SupplyCo",
    contactName: "Michael Wilson",
    email: "michaelw@supplyco.com",
    phone: "(567) 890-1234",
  },
  {
    id: "VND-006",
    name: "National Products",
    contactName: "Linda Davis",
    email: "ldavis@nationalprod.com",
    phone: "(678) 901-2345",
  },
];
