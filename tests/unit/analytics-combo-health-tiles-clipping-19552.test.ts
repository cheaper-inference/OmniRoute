import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19552: in the Combo Health Autopilot header the four metric tiles (Issues / Down /
// Degraded / Healthy) sat next to the title block from `lg` up, so the grid was squeezed to
// ~410px. Switching to 4 columns at `sm` left each tile ~95px wide, which clipped the
// uppercase single-word labels ("DEGRADED" needs ~109px).
//
// A viewport breakpoint cannot fix this: the room the tiles get depends on the sidebar and on
// the translated labels (Dutch "VERSLECHTERD" is wider than "DEGRADED"). The layout therefore
// follows the header's own width: the header is a container, the tiles go to 4 columns on a
// container query, the header wraps so the tiles can drop below the title, and a label that
// still does not fit wraps inside its tile instead of overflowing it.
const source = readFileSync(
  new URL("../../src/app/(dashboard)/dashboard/analytics/ComboHealthTab.tsx", import.meta.url),
  "utf8"
);

function classesOf(fragment: string, pattern: RegExp): string[] {
  const match = fragment.match(pattern);
  return match ? match[1].split(/\s+/) : [];
}

const panel = source.slice(source.indexOf("function ComboAutopilotPanel"));
const gridClasses = classesOf(panel, /<div className="([^"]*grid-cols-2[^"]*)">\s*<MetricBlock/);
const headerClasses = classesOf(panel, /<div className="([^"]*border-b[^"]*px-6[^"]*)">/);

const metricBlockStart = source.indexOf("function MetricBlock");
const metricBlock = source.slice(
  metricBlockStart,
  source.indexOf("\nfunction ", metricBlockStart + 1)
);

test("autopilot header and metric tile grid are present", () => {
  assert.ok(source.includes("function ComboAutopilotPanel"), "ComboAutopilotPanel must exist");
  assert.ok(headerClasses.length > 0, "the panel header must be found");
  assert.ok(gridClasses.length > 0, "the MetricBlock grid must be found");
});

test("autopilot metric tiles never pick 4 columns from a viewport breakpoint", () => {
  assert.ok(gridClasses.includes("grid-cols-2"), "2 columns is the base layout");
  for (const viewport of ["sm", "md", "lg", "xl", "2xl"]) {
    assert.ok(
      !gridClasses.includes(`${viewport}:grid-cols-4`),
      `${viewport}:grid-cols-4 ignores the sidebar and the label length; got "${gridClasses.join(" ")}"`
    );
  }
});

test("autopilot metric tiles pick 4 columns from the header's own width", () => {
  assert.ok(headerClasses.includes("@container"), "the header must be the query container");
  assert.ok(
    gridClasses.includes("@3xl:grid-cols-4"),
    `4 columns must come from a container query; got "${gridClasses.join(" ")}"`
  );
});

test("autopilot header wraps so the tiles can drop below the title", () => {
  assert.ok(headerClasses.includes("flex-wrap"), "the header must wrap");
  for (const fixed of ["flex-col", "lg:flex-row"]) {
    assert.ok(!headerClasses.includes(fixed), `${fixed} pins the tiles next to the title`);
  }
  assert.ok(
    !gridClasses.some((name) => /(^|:)min-w-\d/.test(name)),
    "a fixed min-width cannot follow translated labels"
  );
});

test("a metric label that does not fit wraps inside its tile", () => {
  assert.match(
    metricBlock,
    /<span className="min-w-0 break-words">\{label\}<\/span>/,
    "the label needs min-w-0 (it is a flex item) and break-words to wrap instead of overflowing"
  );
  assert.doesNotMatch(metricBlock, /truncate/, "truncating would hide part of the label");
});
