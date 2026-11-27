/**
 * Shared ReactFlow edge palette + styling, extracted verbatim from
 * `ProviderTopology.tsx` (U0). Reused by the Combo/Routing Studio (Tela B) and
 * the Compression Studio (Tela A) so all three flow graphs speak the same
 * color language: green = active, red = error, amber = last-used, muted = idle.
 */
import { ciTokenReferences } from "@omniroute/ui-kit/tokens";

/**
 * The kit's flow-edge tokens (`--ci-flow-edge-*`): the stroke of a connector per state, 3:1 or
 * better on the canvas and on every content surface in the four themes. `last` is the kit's
 * `warning` edge (the most recently routed path). A `var()` resolves in an SVG `stroke`
 * (ReactFlow renders edge `style` onto a real `<path>`).
 */
export const FLOW_EDGE_COLORS = {
  active: ciTokenReferences.flowEdge.active,
  error: ciTokenReferences.flowEdge.error,
  last: ciTokenReferences.flowEdge.warning,
  idle: ciTokenReferences.flowEdge.idle,
} as const;

/**
 * Translucent variant of a flow color. The palette values are `var()` now, so the old
 * `${hex}30` suffix trick no longer resolves; `color-mix` is the theme-aware equivalent
 * (same precedent as `orchStateBadgeBg` in the orchestration model). Percentages mirror
 * the previous 8-bit alpha suffixes: `20` -> 13%, `30` -> 19%, `40` -> 25%.
 */
export function flowColorAlpha(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

export interface FlowEdgeStyle {
  stroke: string;
  strokeWidth: number;
  opacity: number;
}

/**
 * Resolve the stroke style for an edge given its state. Precedence is
 * error > active > last-used > healthy > idle — the first three are identical to the
 * original ProviderTopology implementation (do not reorder without updating the home
 * regression). `healthy` is the connection-health base state (a configured provider with
 * a live/healthy connection but no in-flight traffic): a static, dimmer green that makes
 * the map meaningful at rest, distinct from the animated `active` pulse. It is an optional
 * trailing param so existing callers (Combo/Compression studios) stay unaffected.
 */
export function edgeStyle(
  active: boolean,
  last: boolean,
  error: boolean,
  healthy = false
): FlowEdgeStyle {
  if (error) return { stroke: FLOW_EDGE_COLORS.error, strokeWidth: 2, opacity: 0.85 };
  if (active) return { stroke: FLOW_EDGE_COLORS.active, strokeWidth: 2.5, opacity: 1 };
  if (last) return { stroke: FLOW_EDGE_COLORS.last, strokeWidth: 1.5, opacity: 0.6 };
  if (healthy) return { stroke: FLOW_EDGE_COLORS.active, strokeWidth: 1.5, opacity: 0.4 };
  // The idle token meets 3:1 by itself: the edge is opaque, not a dimmed text colour.
  return { stroke: FLOW_EDGE_COLORS.idle, strokeWidth: 1, opacity: 1 };
}
