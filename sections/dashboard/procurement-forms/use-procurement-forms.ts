// procurement-forms/useProcurementForms.ts
"use client";

import { useState } from "react";
import { message, UploadProps } from "antd";
import { REQUIRED_DOCS } from "./data";

export function useProcurementForms() {
  /* selected docs for generation */
  const [selectedForGen, setSelectedForGen] = useState<string[]>([]);

  /* temp validation flag */
  const allDataValid = true; // replace with real checks

  /* upload handler (mock) */
  const uploadProps: UploadProps = {
    multiple: true,
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess && onSuccess("ok");
        message.success("Files uploaded");
      }, 600);
    },
  };

  return {
    requiredDocs: REQUIRED_DOCS,
    selectedForGen,
    setSelectedForGen,
    allDataValid,
    uploadProps,
  };
}
