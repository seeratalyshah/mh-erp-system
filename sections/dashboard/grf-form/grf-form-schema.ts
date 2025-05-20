import * as Yup from "yup";

/* ── Yup schema ─────────────────────────────────────────── */
export const schema = Yup.object({
  typeOfRequest: Yup.string()
    .oneOf(["goods", "services"])
    .required("Select a type"),

  /* dynamic rows ---------------------------------------------------- */
  items: Yup.array()
    .of(
      Yup.object({
        category: Yup.string().required("Choose a category"),
        description: Yup.string()
          .max(500, "Max 500 characters")
          .required("Enter a description"),
        unit: Yup.string().required("Select a unit"),
        quantity: Yup.number()
          .typeError("Quantity must be a number")
          .integer("Whole numbers only")
          .positive("Must be greater than 0")
          .required("Enter quantity"),
      })
    )
    .min(1, "Add at least one item")
    .required(),

  justification: Yup.string().required("Enter justification"),

  budgetHead: Yup.string().required("Choose a budget head"),

  /* attachments optional – make required by adding .min(1) */
  attachments: Yup.array().of(Yup.mixed()),
});

/* ── Types & initial values ─────────────────────────────── */
export type GRFFormValues = Yup.InferType<typeof schema>;

export const defaultValues: GRFFormValues = {
  typeOfRequest: "goods",
  items: [
    {
      category: "",
      description: "",
      unit: "",
      quantity: undefined as any,
    },
  ],
  justification: "",
  budgetHead: "",
  attachments: [],
};
