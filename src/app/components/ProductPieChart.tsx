'use client'
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ProductPieChart({
  featured,
  latest,
}: {
  featured: number;
  latest: number;
}) {
  // Chart data with appropriate colors
  const chartData = [
    { name: "Featured", visitors: featured, fill: "hsl(var(--chart-1))" },
    { name: "Latest", visitors: latest, fill: "hsl(var(--chart-2))" },
  ];

  // Properly structured ChartConfig
  const chartConfig: ChartConfig = {
    visitors: {
      label: "Visitors",
    },
    featured: {
      label: "Featured",
      color: "hsl(var(--chart-1))",
    },
    latest: {
      label: "Latest",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
