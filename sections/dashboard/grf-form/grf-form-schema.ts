import * as Yup from "yup";

export const schema = Yup.object({
  typeOfRequest: Yup.string().required(),
  category: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  })
    .nullable()
    .test("not-null", "Field is required", (v) => v !== null),
  description: Yup.string().required("category Required"),
  unit: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  })
    .nullable()
    .test("not-null", "Field is required", (v) => v !== null),
  quantity: Yup.string().required(),
  justification: Yup.string().required("category Required"),
  budgetHead: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  })
    .nullable()
    .test("not-null", "Field is required", (v) => v !== null),
  attachments: Yup.array()
    .of(
      Yup.object().shape({
        fileUpload: Yup.mixed().nullable(),
      })
    )
    .required("Attachments are required"),
});

export type FormData = Yup.InferType<typeof schema>;

export const defaultValues: FormData = {
  typeOfRequest: "",
  category: null,
  description: "",
  justification: "",
  unit: null,
  quantity: "",
  budgetHead: null,
  attachments: [],
};
