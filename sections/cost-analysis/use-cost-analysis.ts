"use client";

import { useState, useMemo } from "react";
import type { MessageInstance } from "antd/es/message/interface";
import { QUOTATIONS, GRF_ITEMS, Quotation, GrfItem } from "./data";

export function useCostAnalysis(msg: MessageInstance) {
  /* all data */
  const [quotes] = useState<Quotation[]>(QUOTATIONS);
  const [items]  = useState<GrfItem[]>(GRF_ITEMS);

  /* GRF filter */
  const [grf, setGrf] = useState<string | undefined>();

  /* map: itemName → internal unit cost entered by user */
  const [unitCostMap, setMap] = useState<Record<string, number>>({});

  /* handlers */
  const setUnitCost = (item: string, cost: number | null) =>
    setMap((m) => ({ ...m, [item]: cost ?? 0 }));

  /* filtered views */
  const grfQuotes = useMemo(
    () => (grf ? quotes.filter((q) => q.grf === grf) : quotes),
    [quotes, grf]
  );

  const grfItems = useMemo(
    () => (grf ? items.filter((i) => i.grf === grf) : []),
    [items, grf]
  );

  /* internal total */
  const internalTotal = grfItems.reduce(
    (sum, it) => sum + it.quantity * (unitCostMap[it.name] ?? 0),
    0
  );

  /* vendor stats */
  const lowestQuote = useMemo(
    () =>
      grfQuotes.reduce((min, q) =>
        q.totalCost < min.totalCost ? q : min
      ),
    [grfQuotes]
  );

  const averageQuote = useMemo(
    () =>
      grfQuotes.length
        ? grfQuotes.reduce((s, q) => s + q.totalCost, 0) / grfQuotes.length
        : 0,
    [grfQuotes]
  );

  return {
    /* dropdown */
    availableGrfs: Array.from(new Set(quotes.map((q) => q.grf))),
    grf,
    setGrf,

    /* items & unit-cost entry */
    grfItems,
    unitCostMap,
    setUnitCost,
    internalTotal,

    /* quotations for table/chart */
    grfQuotes,
    lowestQuote,
    averageQuote,
  };
}
