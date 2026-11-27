/**
 * Scale a line budget by intensity so minimal / standard / aggressive produce
 * meaningfully different output on truncation-based filters (B-RTK-INTENSITY).
 * Truncation always runs through smartTruncate with priorityPatterns, so error /
 * failure lines survive at EVERY intensity. (Include/collapse filters like docker-logs
 * compress by content, not line budget, so they are intensity-independent by nature.)
 *
 * Lives in its own module so the structural renderers can apply the same budget without
 * importing the engine entry point (`index.ts` re-exports it).
 */
export function effectiveMaxLines(base: number, intensity: string | undefined): number {
  const factor = intensity === "aggressive" ? 0.5 : intensity === "minimal" ? 1.5 : 1;
  return Math.max(1, Math.round(base * factor));
}
