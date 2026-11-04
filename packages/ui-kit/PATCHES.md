# Patches locais

## 681cdb1915979f87b0d952f3ccedbbe10d9daacc

### StackedBarChart: point zones on Recharts 3

`ChartPointZones` reads the public `usePlotArea()` hook inside the real chart context.
The returned `x`/`y` coordinates map to the existing left/top geometry, preserving the
focus, selection and tooltip handlers. Recharts 3 does not inject the old internal
`offset` through `Customized`; without this patch the custom point zones are absent.

- Recharts API: https://recharts.github.io/en-US/api/usePlotArea/
- Exact dependency source: https://github.com/recharts/recharts/blob/ffb918798051ef040bb7f9922d3850c9c189f39f/src/hooks.ts
- Regression: `tests/unit/ui/uikit-reporting-chart-zones.test.tsx` mounts the actual
  component and installed Recharts; only browser layout dimensions are simulated.
- Upstream follow-up: pending. Remove this local delta after an equivalent upstream
  release is synced. No upstream PR URL is asserted before one exists.

```diff
--- a/packages/ui-kit/src/reporting-charts.tsx
+++ b/packages/ui-kit/src/reporting-charts.tsx
@@ -1,7 +1,7 @@
 "use client";

 import { useId, useMemo, useRef, useState } from "react";
-import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
+import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, ResponsiveContainer, Tooltip, XAxis, YAxis, usePlotArea } from "recharts";
 import type { ComponentProps, MutableRefObject, ReactNode } from "react";
 import { cn } from "./lib/utils";
 import { EmptyState } from "./empty-state";
@@ -49,7 +49,6 @@
 const tooltipStyle = { background: "var(--ci-color-surface)", border: "1px solid var(--ci-color-border)", borderRadius: 8, fontSize: 12 };

 interface ChartPointZonesProps {
-  offset?: { top: number; left: number; width: number; height: number };
   points: readonly StackedBarDatum[];
   ariaLabel: string;
   rovingId?: string | null;
@@ -63,8 +62,10 @@
   onFocused: (id: string | null) => void;
   onTooltip: (point: { index: number; x: number; y: number } | null) => void;
 }
-function ChartPointZones({ offset, points, ariaLabel, rovingId, selectedId, keyboardIndex, tooltipId, zones, selectable, describe, onPointSelect, onFocused, onTooltip }: ChartPointZonesProps) {
-  if (!offset) return null;
+function ChartPointZones({ points, ariaLabel, rovingId, selectedId, keyboardIndex, tooltipId, zones, selectable, describe, onPointSelect, onFocused, onTooltip }: ChartPointZonesProps) {
+  const plotArea = usePlotArea();
+  if (!plotArea) return null;
+  const offset = { top: plotArea.y, left: plotArea.x, width: plotArea.width, height: plotArea.height };
   const slot = offset.width / points.length;
   return <g role="group" aria-label={`${ariaLabel} data points`}>{points.map((datum, index) => <rect key={datum.id} ref={node => { zones.current[index] = node; }}
     className="ci-stacked-chart__zone" data-selected={selectedId === datum.id || undefined}
```
