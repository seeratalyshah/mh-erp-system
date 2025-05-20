"use client";

import { useState, useMemo } from "react";
import type { MessageInstance } from "antd/es/message/interface";
import { QUOTATIONS, Quotation } from "./data";

export function useCostAnalysis(messageApi: MessageInstance) {
  const [quotations] = useState<Quotation[]>(QUOTATIONS);

  /* manual-entry state */
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const [unitCost, setUnitCost] = useState<number>();

  const [analysisResult, setAnalysisResult] = useState<{
    lowestVendor: string;
    averageQuote: number;
  } | null>(null);

  /* derived */
  const lowestQuote = useMemo(
    () => quotations.reduce((min, q) => (q.totalCost < min.totalCost ? q : min)),
    [quotations]
  );

  const averageQuote = useMemo(
    () => quotations.reduce((s, q) => s + q.totalCost, 0) / quotations.length,
    [quotations]
  );

  /* handlers */
  const analyzeItemCosts = () => {
    if (!itemName || !quantity || !unitCost) {
      messageApi.warning("Enter item, quantity & unit cost");
      return;
    }
    // could push adjustments to quotations here if needed
    setAnalysisResult({ lowestVendor: lowestQuote.vendor, averageQuote });
    messageApi.success("Analysis complete");
  };

  return {
    quotations,
    lowestQuote,
    averageQuote,
    /* manual entry */
    itemName,
    setItemName,
    quantity,
    setQuantity,
    unitCost,
    setUnitCost,
    analysisResult,
    analyzeItemCosts,
  };
}
