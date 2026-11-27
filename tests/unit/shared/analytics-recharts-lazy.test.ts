import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const analyticsFiles = [
  "src/shared/components/analytics/charts.tsx",
  "src/shared/components/analytics/index.tsx",
  "src/shared/components/analytics/rechartsDonuts.tsx",
  "src/shared/components/analytics/rechartsUsageCharts.tsx",
];

const usesKitCharts = [
  "src/shared/components/analytics/rechartsUsageCharts.tsx",
  "src/shared/components/UsageOverview.tsx",
];

test("usage analytics keeps Recharts behind a lazy boundary", () => {
  // The hand-composed plots are gone (kit #303, #221): no analytics file imports recharts, and
  // the kit charts that draw with it (reporting-charts) are loaded through next/dynamic.
  for (const filePath of [...analyticsFiles, "src/shared/components/UsageOverview.tsx"]) {
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /from\s+["']recharts["']/);
    assert.doesNotMatch(source, /import\("recharts"\)/);
    assert.doesNotMatch(
      source,
      /import\s+\{[^}]*\}\s+from\s+["']@omniroute\/ui-kit\/reporting-charts["']/,
      `${filePath} must not import the kit recharts charts statically (types only)`
    );
  }
  for (const filePath of usesKitCharts) {
    const source = readFileSync(filePath, "utf8");
    assert.match(source, /import dynamic from "next\/dynamic"/);
    assert.match(source, /dynamic\(\s*\(\) => import\("@omniroute\/ui-kit\/reporting-charts"\)/);
    assert.match(source, /ssr: false/);
  }
  assert.equal(
    existsSync("src/shared/components/analytics/rechartsCore.tsx"),
    false,
    "the hand-rolled recharts loader has no user left"
  );
});

test("usage analytics bars use a defined chart color token", () => {
  const chartSource = readFileSync(
    "src/shared/components/analytics/rechartsUsageCharts.tsx",
    "utf8"
  );
  const paletteSource = readFileSync("src/shared/components/analytics/chartColors.ts", "utf8");
  const globalsSource = readFileSync("src/app/globals.css", "utf8");

  // KEA-7886: the input bars read the kit's first chart token through CHART_SERIES.input.
  assert.match(chartSource, /color: CHART_SERIES\.input/);
  assert.match(paletteSource, /input:\s*"var\(--color-chart-1\)"/);
  // …and that token is actually defined by the token bridge (not an undefined var).
  assert.match(globalsSource, /--color-chart-1:\s*var\(--ci-chart-1\)/);
  assert.doesNotMatch(chartSource, /fill="var\(--primary\)"/);
});
