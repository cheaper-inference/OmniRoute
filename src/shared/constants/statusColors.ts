import { ciTokens } from "@omniroute/ui-kit/tokens";

/**
 * Canonical status colors — single source of truth for status HEX, mirroring the kit's
 * semantic tokens (`--ci-color-success` / `--ci-color-warning` / `--ci-color-danger`).
 *
 * Use these HEX values ONLY where a CSS class can't reach — canvas, ReactFlow SVG
 * strokes, or inline styles on third-party nodes. For normal DOM, prefer the Tailwind
 * utilities (`text-success`, `bg-error-bg`, …) which read the same tokens.
 */
export const STATUS_HEX = {
  success: ciTokens.color.status.success,
  warning: ciTokens.color.status.warning,
  error: ciTokens.color.status.danger,
  muted: ciTokens.color.neutral[500],
  /** Human-approval gate (waiting_approval) — the kit's violet chart hue. */
  approval: ciTokens.color.chart[3],
} as const;
