import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// recharts users take tooltip, grid and axis styling from the kit's `chartTheme`, so a chart cannot
// drift from the look of the kit's own charts. Each chart keeps only what is particular to it.
// (The usage charts left this list with kit #303: they are the kit StackedBarChart and
// StackedAreaChart now, which carry the theme themselves; see the last test.)
const THEMED_FILES = [
  "src/app/(dashboard)/dashboard/costs/components/CostCharts.tsx",
  "src/app/(dashboard)/dashboard/costs/quota-share/components/BurnRateChartInner.tsx",
  "src/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs/StatsCharts.tsx",
];

// The provider utilization chart is the kit LineChart (fixed domain, joined gaps): no recharts.
const PROVIDER_CHARTS = "src/app/(dashboard)/dashboard/analytics/components/ProviderCharts.tsx";

for (const file of THEMED_FILES) {
  test(`${file} styles recharts through the kit chartTheme`, () => {
    const source = readFileSync(file, "utf8");
    assert.match(source, /from "@omniroute\/ui-kit\/chart-theme"/);
    assert.doesNotMatch(source, /contentStyle=\{\{/, "no hand-written tooltip box");
    assert.doesNotMatch(source, /labelStyle=\{\{|itemStyle=\{\{/, "no hand-written tooltip text");
    assert.doesNotMatch(source, /<CartesianGrid\s+stroke=/, "no hand-written grid");
    assert.doesNotMatch(source, /tick=\{\{ fontSize: \d+, fill: "var\(--color-text-muted\)"/);
    assert.doesNotMatch(source, /(axisLine|tickLine)=\{\{ stroke:/, "no hand-written axis lines");
  });
}

test("the charts the kit LineChart covers use it; the ones it cannot draw stay on recharts", () => {
  const kitImport = /import \{ LineChart \} from "@omniroute\/ui-kit\/reporting-charts"/;
  for (const file of [PROVIDER_CHARTS, THEMED_FILES[0], THEMED_FILES[2]]) {
    assert.match(readFileSync(file, "utf8"), kitImport, file);
  }
  // Fixed 0–100 domain and gaps joined across missing samples: kit props, no recharts by hand.
  const provider = readFileSync(PROVIDER_CHARTS, "utf8");
  assert.match(provider, /yDomain=\{\[0, 100\]\}/);
  assert.match(provider, /connectNulls/);
  assert.doesNotMatch(provider, /from "recharts"/);
  // A projection: dashed, with no Y axis.
  const burnRate = readFileSync(THEMED_FILES[1], "utf8");
  assert.match(burnRate, /strokeDasharray="4 2"/);
  assert.match(burnRate, /<YAxis hide \/>/);
});

test("the usage charts are the kit StackedBarChart and StackedAreaChart, with no recharts of their own", () => {
  const source = readFileSync("src/shared/components/analytics/rechartsUsageCharts.tsx", "utf8");
  assert.match(source, /<StackedBarChart\b/);
  assert.match(source, /lineSeries=/);
  assert.match(source, /<StackedAreaChart\b/);
  assert.doesNotMatch(source, /\bComposedChart\b|\bAreaChart\b|ResponsiveContainer|useRecharts/);
  assert.doesNotMatch(source, /chartTheme/, "the kit chart applies its own theme");
});
