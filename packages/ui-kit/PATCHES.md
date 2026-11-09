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

## b18ac2d161abaaa4768e2426ccf30c692f328000

### StackedBarChart: preserve point zones after the 0.0.104 sync

The 0.0.104 snapshot still reads the removed internal `offset` prop through
`Customized`. Retain the `usePlotArea()` fix above while preserving the new
`LineChart`, `chartTheme`, CSS types and legend marker API from this sync.
The public hook supplies the plot rectangle inside the existing chart context;
its coordinates preserve the focus, keyboard selection and tooltip geometry.

- Source reconciliation: public release commit `90ce8de754aac334f5b4d9a2fe9c3f6fcc8cefe9`
  carries the 0.0.104 pin and the old `offset` dependency; the runtime patch is
  retained from `2150776f563f72b4099ed2e606e7b202e0bf33e6`.
- Recharts API: https://recharts.github.io/en-US/api/usePlotArea/
- Regression: `tests/unit/ui/uikit-reporting-chart-zones.test.tsx` exercises real
  Recharts bars and point zones, keyboard focus, tooltips, click/Enter/Space,
  unavailable measurements and the empty state. Only layout dimensions are mocked.
- Upstream follow-up remains pending. Remove this local patch when an equivalent
  upstream release is synced. No upstream PR or new runtime test pass is claimed here.

```diff
--- a/packages/ui-kit/src/reporting-charts.tsx
+++ b/packages/ui-kit/src/reporting-charts.tsx
@@ -1,7 +1,7 @@
 "use client";

 import { useId, useMemo, useRef, useState } from "react";
-import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
+import { Area, AreaChart, Bar, BarChart, CartesianGrid, Customized, DefaultTooltipContent, Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, usePlotArea } from "recharts";
 import type { ComponentProps, CSSProperties, MutableRefObject, ReactNode } from "react";
 import { chartTheme } from "./chart-theme";
 import { cn } from "./lib/utils";
@@ -51,7 +51,6 @@
 const tooltipStyle = chartTheme.tooltip.contentStyle;

 interface ChartPointZonesProps {
-  offset?: { top: number; left: number; width: number; height: number };
   points: readonly StackedBarDatum[];
   ariaLabel: string;
   rovingId?: string | null;
@@ -65,8 +64,10 @@
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
