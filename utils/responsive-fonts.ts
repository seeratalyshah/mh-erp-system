export function remToPx(value: string | number): number {
  return Math.round(parseFloat(value.toString()) * 16);
}

export function pxToRem(value: number): string {
  return `${value / 16}rem`;
}

type FontSizes = {
  sm: number;
  md: number;
  lg: number;
};

export function responsiveFontSizes({
  sm,
  md,
  lg,
}: FontSizes): Record<string, { fontSize: string }> {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}
