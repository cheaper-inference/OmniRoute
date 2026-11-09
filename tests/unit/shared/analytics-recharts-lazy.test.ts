import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const analyticsFiles = [
  "src/shared/components/analytics/charts.tsx",
  "src/shared/components/analytics/index.tsx",
  "src/shared/components/analytics/rechartsDonuts.tsx",
  "src/shared/components/analytics/rechartsUsageCharts.tsx",
];

test("usage analytics keeps Recharts behind the lazy loader boundary", () => {
  const coreSource = readFileSync("src/shared/components/analytics/rechartsCore.tsx", "utf8");

  assert.match(coreSource, /import\("recharts"\)/);
  assert.match(coreSource, /rechartsPromise = null;/);

  for (const filePath of analyticsFiles) {
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /from\s+["']recharts["']/);
    assert.doesNotMatch(source, /import\("recharts"\)/);
  }
});

test("usage analytics bars use a defined chart color token", () => {
  const chartSource = readFileSync(
    "src/shared/components/analytics/rechartsUsageCharts.tsx",
    "utf8"
  );
  const paletteSource = readFileSync("src/shared/components/analytics/chartColors.ts", "utf8");
  const globalsSource = readFileSync("src/app/globals.css", "utf8");

  // KEA-7886: the input bars read the kit's first chart token through CHART_SERIES.input.
  assert.match(chartSource, /fill=\{CHART_SERIES\.input\}/);
  assert.match(paletteSource, /input:\s*"var\(--color-chart-1\)"/);
  // …and that token is actually defined by the token bridge (not an undefined var).
  assert.match(globalsSource, /--color-chart-1:\s*var\(--ci-chart-1\)/);
  assert.doesNotMatch(chartSource, /fill="var\(--primary\)"/);
});
