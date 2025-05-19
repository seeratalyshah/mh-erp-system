// hooks/useGRFFormAnt.ts
'use client';

import { Form } from 'antd';
import * as yup from 'yup';                // still handy for TS inference
import { yupResolver } from '@hookform/resolvers/yup';

/* ── Validation schema (keep / extend as needed) ──────────── */
export const schema = yup.object({
  typeOfRequest: yup.string().required(),
  category:      yup.string().required(),
  description:   yup.string().required(),
  unit:          yup.string().required(),
  quantity:      yup
    .number()
    .typeError('Quantity must be a number')
    .positive()
    .required(),
  justification: yup.string().required(),
  budgetHead:    yup.string().required(),
  attachments:   yup.array().of(
    yup.object({ file: yup.mixed<File>().required('Select a file') }),
  ),
});

export type GRFFormValues = yup.InferType<typeof schema>;

/* ── Default values ───────────────────────────────────────── */
export const defaultValues: GRFFormValues = {
  typeOfRequest: 'goods',
  category: '',
  description: '',
  unit: '',
  quantity: undefined as any,
  justification: '',
  budgetHead: '',
  attachments: [],
};

/* ── Hook (returns Ant Design form instance) ───────────────── */
export function useGRFForm() {
  const [form] = Form.useForm<GRFFormValues>();

  /* optional – keep Yup for cross-field validation */
  const resolver = yupResolver(schema);

  const onFinish = (values: GRFFormValues) => {
    console.log('✅ Submitted GRF:', values);
  };

  return { form, onFinish, resolver };
}
