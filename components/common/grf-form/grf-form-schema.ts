import * as Yup from "yup";

/* ─────── Schema ───────────────────────────────────────── */
export const schema = Yup.object({
  // Input Field Schema
  name: Yup.string().required("Field Required"),

  // Text Area Field Schema
  description: Yup.string().required("Field Required"),

  intentionsToMove: Yup.string().required("Field Required"),

  // Single Select Schema
  country: Yup.object({
    value: Yup.string().required(),
    label: Yup.string().required(),
  })
    .nullable()
    .test("not-null", "Field is required", (v) => v !== null),

  //Multi Select Schema
  city: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().required("Field is required"),
      })
    )
    .min(1, "Field is required")
    .required("Field is required"),

  //Date schema
  date: Yup.object({
    startDate: Yup.date().nullable(), // allow null internally
    endDate: Yup.date().nullable(),
  })
    .nullable() // allow the entire object to be null
    .test(
      "not-null",
      "Field is required",
      (v) => v !== null && v.startDate !== null
    ),

  attachments: Yup.array()
    .of(
      Yup.object().shape({
        fileUpload: Yup.mixed().nullable(),
      })
    )
    .required("Attachments are required"),
});

/* ─────── Types & defaults ─────────────────────────────── */
export type FormData = Yup.InferType<typeof schema>;

export const defaultValues: FormData = {
  name: "",
  description: "",
  country: null,
  city: [],
  intentionsToMove: "",
  date: null,
  attachments: [],
};
