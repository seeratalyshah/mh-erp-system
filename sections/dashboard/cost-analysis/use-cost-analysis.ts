// app/dashboard/cost-analysis/use-cost-analysis.ts
"use client";

import { useState, useMemo } from "react";
import { QUOTATIONS, Quotation } from "./data";
import type { MessageInstance } from "antd/es/message/interface";

export function useCostAnalysis(messageApi: MessageInstance) {
  const [quotations, setQuotations] = useState<Quotation[]>(QUOTATIONS);
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number | undefined>();
  const [unitCost, setUnitCost] = useState<number | undefined>();
  const [analysisResult, setAnalysisResult] = useState<{
    lowestVendor: string;
    averageQuote: number;
  } | null>(null);

  const lowestQuote = useMemo(() => {
    return quotations.reduce((min, q) =>
      q.totalCost < min.totalCost ? q : min
    );
  }, [quotations]);

  const averageQuote = useMemo(() => {
    return (
      quotations.reduce((sum, q) => sum + q.totalCost, 0) / quotations.length
    );
  }, [quotations]);

  const analyzeItemCosts = () => {
    if (!itemName || !quantity || !unitCost) {
      messageApi.warning("Please enter item, quantity and unit cost");
      return;
    }
    messageApi.success("Cost analyzed");
    setAnalysisResult({
      lowestVendor: lowestQuote.vendor,
      averageQuote,
    });
  };

  return {
    quotations,
    lowestQuote,
    averageQuote,
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