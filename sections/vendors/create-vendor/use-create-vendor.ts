"use client";

import { useState } from "react";
import { Form, message } from "antd";
import { countryOpts, categoryOpts } from "./data";

/* ───────── Vendor type ───────── */
export type VendorPayload = {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  category: string;
};

/* ───────── Hook ───────── */
export function useCreateVendor() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<VendorPayload>();

  /* open / close helpers */
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  /* dummy submit handler */
  async function handleSubmit(values: VendorPayload) {
    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 600));
    message.success(`Vendor “${values.name}” created`);
    form.resetFields();
    hide();
  }

  return {
    open,
    show,
    hide,
    form,
    countryOpts,
    categoryOpts,
    handleSubmit,
  };
}
