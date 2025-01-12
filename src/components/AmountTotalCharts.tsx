"use client";
import React from "react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

function AmountTotalChart({
  name,
  color1,
  color2,
  number1,
  number2,
}: {
  name: string;
  color1: string;
  color2: string;
  number1: number;
  number2: number;
}) {
  const chartData = [{ month: "january", desktop: number1, mobile: number2 }];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: color1,
    },
    mobile: {
      label: "Mobile",
      color: color2,
    },
  } satisfies ChartConfig;
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[250px] h-[200px] flex items-center justify-center"
      >
        <RadialBarChart
          data={chartData}
          endAngle={360}
          innerRadius={75}
          outerRadius={90}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-neutral-900"
            polarRadius={[86, 66]}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-white "
                      >
                        {name ?? "Expense"}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="desktop"
            stackId="a"
            cornerRadius={5}
            fill="var(--color-desktop)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="mobile"
            fill="var(--color-mobile)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}

export default AmountTotalChart;
