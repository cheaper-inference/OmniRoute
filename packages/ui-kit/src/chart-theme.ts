const axisTick = { fontSize: 11, fill: "var(--ci-color-text-muted)" } as const;

/**
 * Props for apps that compose recharts directly: spread each group onto the matching element.
 * Every colour is a token, so the chart flips with the theme. Plain data with no recharts import,
 * and limited to props that recharts 2 and 3 share.
 */
export const chartTheme = {
  margin: { top: 8, right: 12, left: 0, bottom: 0 },
  grid: { stroke: "var(--ci-color-border)", strokeDasharray: "2 4", vertical: false },
  xAxis: { height: 30, tickLine: false, axisLine: false, interval: "preserveStartEnd", minTickGap: 24, tick: axisTick },
  yAxis: { width: 48, tickLine: false, axisLine: false, tick: axisTick },
  line: { type: "linear", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", dot: false, isAnimationActive: false },
  tooltip: {
    contentStyle: { background: "var(--ci-color-surface)", border: "1px solid var(--ci-color-border)", borderRadius: 8, fontSize: 12 },
    labelStyle: { color: "var(--ci-color-text-muted)" },
    itemStyle: { color: "var(--ci-color-foreground)" },
    cursor: { stroke: "var(--ci-color-text-muted)", strokeWidth: 1 },
  },
} as const;
