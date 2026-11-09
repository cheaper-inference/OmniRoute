import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(
  new URL("../../src/app/(dashboard)/dashboard/analytics/ComboHealthTab.tsx", import.meta.url),
  "utf8"
);

test("Combo Health Autopilot metric grid avoids 4-column squeeze at lg breakpoint (#19552)", () => {
  // At lg, the card header switches to lg:flex-row, squeezing the metric tiles to ~410px.
  // 4 columns in ~410px produces ~95px tiles where uppercase labels like DEGRADED clip.
  // The grid must use 2 columns at lg, expanding to 4 columns only at 2xl.
  assert.match(
    source,
    /className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 lg:min-w-90 2xl:grid-cols-4"/,
    "metric grid must use 2 columns at lg and defer 4 columns to 2xl"
  );

  // Must not have the old unconstrained 4-column layout at lg
  assert.doesNotMatch(
    source,
    /grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-90"/,
    "grid must not allow sm:grid-cols-4 to remain active at lg without lg:grid-cols-2"
  );
});

test("MetricBlock icon does not shrink and label truncates cleanly (#19552)", () => {
  assert.match(
    source,
    /<Icon name=\{icon\} size=\{16\} className="shrink-0" \/>/,
    "MetricBlock icon must have shrink-0 to prevent compression when tile space is tight"
  );
  assert.match(
    source,
    /<span className="truncate">\{label\}<\/span>/,
    "MetricBlock label must be wrapped in a truncate span"
  );
});
