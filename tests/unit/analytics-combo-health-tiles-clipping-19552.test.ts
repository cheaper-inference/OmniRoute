import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

// #19552: in the Combo Health Autopilot header the four metric tiles (Issues / Down /
// Degraded / Healthy) sit next to the title block from `lg` up, so the grid is squeezed to
// ~410px. Switching to 4 columns at `sm` left each tile ~95px wide, which clipped the
// uppercase single-word labels ("DEGRADED" needs ~109px). The grid must stay at 2 columns
// until there is room for 4 (2xl) and reserve enough width for 4 tiles at that point.
const source = readFileSync(
  new URL("../../src/app/(dashboard)/dashboard/analytics/ComboHealthTab.tsx", import.meta.url),
  "utf8"
);

const panelStart = source.indexOf("function ComboAutopilotPanel");
const gridMatch = source
  .slice(panelStart)
  .match(/<div className="([^"]*grid-cols-2[^"]*)">\s*<MetricBlock/);
const gridClasses = gridMatch ? gridMatch[1].split(/\s+/) : [];

test("autopilot metric tile grid is present", () => {
  assert.ok(panelStart > 0, "ComboAutopilotPanel must be present");
  assert.ok(gridClasses.length > 0, "the MetricBlock grid must be found");
});

test("autopilot metric tiles do not switch to 4 columns at sm, md, lg or xl widths", () => {
  assert.ok(gridClasses.includes("grid-cols-2"), "2 columns is the base layout");
  for (const early of ["sm:grid-cols-4", "md:grid-cols-4", "lg:grid-cols-4", "xl:grid-cols-4"]) {
    assert.ok(
      !gridClasses.includes(early),
      `${early} makes tiles narrower than their labels; got "${gridClasses.join(" ")}"`
    );
  }
});

test("autopilot metric tiles use 4 columns only at 2xl and reserve width for them", () => {
  assert.ok(gridClasses.includes("2xl:grid-cols-4"));
  assert.ok(
    gridClasses.includes("2xl:min-w-120"),
    "4 tiles of ~111px plus gaps need at least ~470px"
  );
});
