// hooks/useReviewGrf.ts

import { GRF_DATA } from "../requisitions/data";

export function useReviewGrf(id: string) {
  const grf = GRF_DATA.find((g) => g.id === id);
  // this is where you'd fetch from an API in real life
  return { grf };
}
