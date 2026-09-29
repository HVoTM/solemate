import { useQuery } from "@tanstack/react-query";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  value: { label: "Value", color: "var(--chart-1)" },
} satisfies ChartConfig;

const fmt = (n: number | undefined) => (n === undefined ? "—" : n.toLocaleString(undefined, { maximumFractionDigits: 2 }));

export default function Dashboard() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["measurements"],
    queryFn: api.listMeasurements,
  });

  const mean = data.length ? data.reduce((s, m) => s + m.value, 0) / data.length : undefined;
  const kpis = [
    { label: "Measurements", value: data.length.toString() },
    { label: "Mean value", value: fmt(mean) },
    { label: "Latest value", value: fmt(data.at(-1)?.value) },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard (In development...)</h1>
        <p className="mt-2 text-muted-foreground">Sample results (mock data).</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardHeader>
              <CardDescription>{k.label}</CardDescription>
              <CardTitle className="font-mono text-3xl font-medium tabular-nums">{k.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Measurements over time</CardTitle>
          <CardDescription>Each point is one recorded measurement.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="py-20 text-center text-sm text-muted-foreground">Loading…</p>
          ) : (
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <LineChart data={data} margin={{ left: 4, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--color-value)" }}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
