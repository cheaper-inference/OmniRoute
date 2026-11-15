import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19554: on /dashboard/analytics/compression every bar of the "Last 24 Hours (Activity)"
// chart rendered at 0px. The bar row is `items-end`, so the flex columns are not stretched and
// their height is indefinite; the bar's `height: N%` then resolves against `auto` and, with no
// in-flow content (the count tooltip is absolute), collapses to 0. The column must be `h-full`
// and the bar must sit in a `flex-1 items-end` wrapper whose height is definite.
const source = readFileSync(
  new URL(
    "../../src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab.tsx",
    import.meta.url
  ),
  "utf8"
);

const start = source.indexOf('data-testid="compression-hourly-chart"');
const end = source.indexOf("compressionAnalyticsMaxRequests", start);
const chart = start >= 0 && end > start ? source.slice(start, end) : "";

const column = chart.match(/<div key=\{idx\} className="([^"]+)"/)?.[1] ?? "";
const wrapperAt = chart.search(/className="flex min-h-0 w-full flex-1 items-end"/);
const barAt = chart.search(/style=\{\{ height: `\$\{Math\.max\(countPct, 5\)\}%` \}\}/);
const labelAt = chart.indexOf("entry.hour.substring(11, 13)");

test("the hourly chart block is present", () => {
  assert.ok(chart.length > 0, "hourly chart block must be found in the component source");
  assert.ok(barAt > 0, "bars must still be sized by a percentage height");
});

test("each column has a definite height so the bar's % height can resolve", () => {
  assert.ok(
    column.split(/\s+/).includes("h-full"),
    `the column must be h-full (items-end does not stretch it); got className="${column}"`
  );
});

test("the bar sits in a flex-1 items-end wrapper above the hour label", () => {
  assert.ok(wrapperAt >= 0, "bar wrapper `flex min-h-0 w-full flex-1 items-end` must exist");
  assert.ok(wrapperAt < barAt, "the wrapper must contain the bar");
  assert.ok(barAt < labelAt, "the hour label must stay below the bar area");
});
