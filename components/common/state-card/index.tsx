"use client";

import { Card, Statistic } from "antd";
import { ReactNode, memo } from "react";

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  bg: string;
  textColor?: string;
  formatter?: (v: any) => string;
}

function StatCard({
  title,
  value,
  icon,
  bg,
  textColor = "#0f172a",
  formatter,
}: Props) {
  return (
    <Card
      style={{ background: bg }}
      styles={{ body: { padding: 16 } }}
    >
      <Statistic
        title={title}
        value={value}
        prefix={icon}
        valueStyle={{ color: textColor, fontSize: 22 }}
        formatter={formatter}
      />
    </Card>
  );
}

export default memo(StatCard);
