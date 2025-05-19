// types/vendor.ts

export interface Vendor {
  /* ──────────────────────────────────────────
     Primary key – must be unique per vendor
  ────────────────────────────────────────── */
  id: number;                     // or string if your DB uses UUIDs

  /* ──────────────────────────────────────────
     Basic profile
  ────────────────────────────────────────── */
  name:   string;
  email:  string;
  phone:  string;

  /* ──────────────────────────────────────────
     Useful metadata for the table
  ────────────────────────────────────────── */
  rating: number;                 // 0–5 stars (or your own scale)
  orders: number;                 // previous transactions
}
