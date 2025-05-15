import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues, FormData } from "./grf-form-schema";

export function useGRFForm() {
  /* form setup */
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, control } = methods;

  /* field-array specifically on "attachments" */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return { handleSubmit, onSubmit, methods, fields, append, remove };
}
