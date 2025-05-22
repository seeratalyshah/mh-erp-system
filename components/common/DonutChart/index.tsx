"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { memo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  labels: string[];
  values: number[];
  height?: number;
}

function DonutChart({ labels, values, height = 240 }: Props) {
  /* ApexOptions – memo not strictly needed because props are primitive */
  const opts: ApexOptions = {
    chart: { type: "donut" },
    labels,
    legend: { position: "bottom" },
    dataLabels: { formatter: (val: number) => `$${(val / 1000).toFixed(0)}k`, },
    tooltip: { y: { formatter: (v) => `${v}%` } },
    plotOptions: { pie: { donut: { size: "40%" } } },
  };

  return (
    <ReactApexChart options={opts} series={values} type="donut" height={height} />
  );
}

export default memo(DonutChart);
