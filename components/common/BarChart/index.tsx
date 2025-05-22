"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { memo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  categories: string[];
  values: number[];
  name?: string;
  height?: number;
  color?: string;
  barWidthPercent?: number; // 20 = slim bars
}

function BarChart({
  categories,
  values,
  name = "Series 1",
  height = 240,
  color = "#3b82f6",
}: Props) {
  const opts: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories },
    plotOptions: {
      bar: { borderRadius: 0 },
    },
    dataLabels: { enabled: false },
    colors: [color],
    grid: { strokeDashArray: 2 },
    tooltip: {
      y: { formatter: (val: number) => `$${val.toLocaleString()}` },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${(val / 1000).toFixed(0)}k`,
      },
    },
  };

  return (
    <ReactApexChart
      options={opts}
      series={[{ name, data: values }]}
      type="bar"
      height={height}
    />
  );
}

export default memo(BarChart);
