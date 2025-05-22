"use client";

import { useEffect } from "react";
import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, GRFFormValues, defaultValues } from "./grf-form-schema";
import { useItems } from "./add-item-modal/use-items";
import { ItemPayload } from "./add-item-modal";

export function useGRFForm() {
  /* AntD form instance */
  const [form] = Form.useForm<GRFFormValues>();

  /* local item rows + modal control (add/edit/delete) */
  const item = useItems(defaultValues.items as ItemPayload[]);

  /* keep form.items in sync after every mutation */
  useEffect(() => {
    form.setFieldsValue({ items: item.items });
  }, [item.items, form]);

  /* submit */
  const onFinish = (values: GRFFormValues) => {
    console.log("✅ Submitted GRF →", values);
  };

  /* expose everything UI needs */
  return {
    form,
    onFinish,
    /* validation helper (kept for future) */
    resolver: yupResolver(schema),
    /* item-related bits */
    items: item.items,
    openAdd: item.openAdd,
    openEdit: item.openEdit,
    removeItem: item.removeItem,
    modalOpen: item.modalOpen,
    editingIdx: item.editingIdx,
    closeModal: item.closeModal,
    saveItem: item.saveItem,
  };
}

/* re-export initial values for index.tsx */
export { defaultValues } from "./grf-form-schema";
