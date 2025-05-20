"use client";

import { Form } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, GRFFormValues } from "./grf-form-schema";

/**
 * Returns the Ant Design form instance plus a resolver you can
 * plug into react-hook-form if you ever migrate back.  For now
 * the resolver is optional – Ant Design’s own validation runs
 * from the `rules` inside each Form.Item.
 */
export function useGRFForm() {
  const [form] = Form.useForm<GRFFormValues>();

  const onFinish = (values: GRFFormValues) => {
    console.log("✅ Submitted GRF →", values);
  };

  /* keep for TS inference / potential future RHF bridge */
  const resolver = yupResolver(schema);

  return { form, onFinish, resolver };
}

/* re-export defaults for component */
export { defaultValues } from "./grf-form-schema";
