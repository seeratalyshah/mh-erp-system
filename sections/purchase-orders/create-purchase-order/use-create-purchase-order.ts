"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { message, Form } from "antd";
import { GRF_DETAIL, QUOTE_SUMMARY, TAX_RATE } from "./data";

export interface ItemRow {
  description: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export interface PoFormPayload {
  shipping: string;
  terms: string;
}

export function useCreatePurchaseOrder() {
  const router = useRouter();
  const [form] = Form.useForm();

  /* —— pick lowest-cost vendor —— */
  const vendor = useMemo(() => {
    return QUOTE_SUMMARY.sort((a, b) => a.total - b.total)[0];
  }, []);

  /* —— build item rows —— */
  const items: ItemRow[] = useMemo(
    () =>
      GRF_DETAIL.items.map((i) => ({
        ...i,
        subtotal: i.qty * i.unitPrice,
      })),
    []
  );

  const subtotal = useMemo(
    () => items.reduce((s, r) => s + r.subtotal, 0),
    [items]
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  /* —— POST PO —— */
  const [loading, setLoading] = useState(false);

  const submit = async (values: PoFormPayload) => {
    setLoading(true);

    const payload = {
      grf: GRF_DETAIL.id,
      vendorId: vendor.vendorId,
      items,
      subtotal,
      tax,
      total,
      shippingAddress: values.shipping,
      terms: values.terms,
    };

    await fetch("/api/pos", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    message.success("Purchase Order created");
    router.push("/dashboard/purchase-orders"); // back to PO list
  };

  return {
    form,
    vendor,
    shipping: GRF_DETAIL.shippingAddress,
    items,
    subtotal,
    tax,
    total,
    submit,
    loading,
  };
}
