"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, message } from "antd";
import { GRF_LIST, QUOTE_SUMMARIES, TAX_RATE } from "./data";

export interface ItemRow {
  description: string;
  qty: number;
  unitPrice: number;
  subtotal: number;
}

export interface PoFormPayload {
  shipping: string;
  terms: string;
  expectedDate: string;   // ISO (yyyy-mm-dd)
}

export function useCreatePurchaseOrder() {
  const router = useRouter();
  const [form] = Form.useForm<PoFormPayload>();

  /* —— step 1: pick GRF —— */
  const [grfId, setGrfId] = useState<string | undefined>();

  const grfDetail = useMemo(
    () => GRF_LIST.find((g) => g.id === grfId),
    [grfId]
  );

  /* vendor list for that GRF */
  const vendors = useMemo(
    () => QUOTE_SUMMARIES.filter((q) => q.grf === grfId),
    [grfId]
  );

  /* auto-select lowest quote whenever GRF changes */
  const [vendorId, setVendorId] = useState<number | undefined>();
  useEffect(() => {
    if (vendors.length) {
      const lowest = [...vendors].sort((a, b) => a.total - b.total)[0];
      setVendorId(lowest.vendorId);
    } else {
      setVendorId(undefined);
    }
  }, [vendors]);

  const chosenVendor = vendors.find((v) => v.vendorId === vendorId);

  /* build item rows + totals */
  const items: ItemRow[] = useMemo(() => {
    if (!grfDetail) return [];
    return grfDetail.items.map((i) => ({
      ...i,
      subtotal: i.qty * i.unitPrice,
    }));
  }, [grfDetail]);

  const subtotal = useMemo(
    () => items.reduce((s, r) => s + r.subtotal, 0),
    [items]
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  /* —— submit —— */
  const [loading, setLoading] = useState(false);

  const submit = async (vals: PoFormPayload) => {
    if (!grfDetail || !chosenVendor) {
      message.warning("Select GRF and Vendor first");
      return;
    }

    setLoading(true);

    const payload = {
      grf: grfDetail.id,
      vendorId: chosenVendor.vendorId,
      items,
      subtotal,
      tax,
      total,
      shippingAddress: vals.shipping,
      terms: vals.terms,
      expectedDelivery: vals.expectedDate,
    };

    await fetch("/api/pos", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    message.success("Purchase Order created");
    router.push("/dashboard/purchase-orders");
  };

  return {
    form,
    /* GRF */
    grfId,
    setGrfId,
    grfDetail,
    availableGrfs: Array.from(new Set(QUOTE_SUMMARIES.map((q) => q.grf))),

    /* Vendor */
    vendors,
    vendorId,
    setVendorId,
    chosenVendor,

    /* Items & totals */
    items,
    subtotal,
    tax,
    total,

    /* submit */
    submit,
    loading,
  };
}
