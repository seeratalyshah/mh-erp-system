"use client";

import { useState } from "react";
import { Form, message } from "antd";
import type { Dayjs } from "dayjs";

/* ── Types ── */
export interface ItemLine {
  description: string;
  orderedQty: number;
  receivedQty: number | null;   // entered at receiving
}

export interface GrnPayload {
  po: string;
  vendor: string;
  receiptDate: Dayjs | null;
  status: "pending" | "received";
  notes: string;
  items: ItemLine[];
}

export function useCreateGrn() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<GrnPayload>();

  /* submit */
  const submit = async (vals: GrnPayload, onClose: () => void) => {
    setLoading(true);

    await fetch("/api/grns", {
      method: "POST",
      body: JSON.stringify({
        ...vals,
        receiptDate: vals.receiptDate?.format("YYYY-MM-DD"),
      }),
    });

    message.success("Goods Receipt created");
    form.resetFields();
    setLoading(false);
    onClose();
  };

  return { loading, form, submit };
}
