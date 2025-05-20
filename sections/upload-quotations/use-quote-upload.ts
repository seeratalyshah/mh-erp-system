"use client";

import { useState } from "react";
import { Form, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

export interface QuotePayload {
  amount: number | null;
  additionalCost: number | null;
  deliveryDays: number | null;
  totalCost: number;
  notes: string;
  files: UploadFile[];
}

export function useUploadQuotationSection() {
  const [form] = Form.useForm<QuotePayload>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* file handler */
  const onChange = ({ fileList: list }: { fileList: UploadFile[] }) =>
    setFileList(list);

  /* auto-recalc total whenever fields change */
  const handleValuesChange = (_: any, all: QuotePayload) => {
    const total =
      (all.amount ?? 0) + (all.additionalCost ?? 0);
    form.setFieldsValue({ totalCost: total });
  };

  /* submit */
  const submit = async (values: QuotePayload) => {
    if (!fileList.length) {
      message.error("Attach at least one quotation file");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("amount", String(values.amount ?? ""));
    formData.append("additionalCost", String(values.additionalCost ?? ""));
    formData.append("totalCost", String(values.totalCost));
    formData.append("deliveryDays", String(values.deliveryDays ?? ""));
    formData.append("notes", values.notes ?? "");

    fileList.forEach((f) => f.originFileObj && formData.append("files", f.originFileObj));

    await fetch("/api/vendor-quote", { method: "POST", body: formData });

    message.success("Quotation submitted – thank you!");
    form.resetFields();
    setFileList([]);
    setSubmitting(false);
  };

  return {
    form,
    onChange,
    handleValuesChange,
    fileList,
    submitting,
    submit,
  };
}
