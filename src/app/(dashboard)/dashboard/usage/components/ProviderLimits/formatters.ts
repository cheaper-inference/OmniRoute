export function formatAutoRefreshCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export interface SpeedLine {
  model: string;
  avg: number;
  last: number;
  /** TTFT in seconds with one decimal, or null when no row recorded a TTFT. */
  ttft: string | null;
  samples: number;
}

/**
 * Quota-card speed lines from the `speed` payload of /api/usage/[connectionId]
 * (or a provider-limits cache entry): most-sampled models first, capped at
 * `maxModels`. Defensive on shape — the payload is untyped JSON.
 */
export function buildSpeedLines(speed: unknown, maxModels = 3): SpeedLine[] {
  const byModel = (speed as { byModel?: unknown } | null | undefined)?.byModel;
  if (!Array.isArray(byModel)) return [];
  const lines: SpeedLine[] = [];
  for (const entry of byModel) {
    if (lines.length >= maxModels) break;
    const m = entry as Record<string, unknown>;
    const avg = Number(m?.avgTps);
    const samples = Number(m?.samples);
    if (typeof m?.model !== "string" || !Number.isFinite(avg) || !(samples > 0)) continue;
    const ttftMs = Number(m.avgTtftMs);
    lines.push({
      model: m.model,
      avg: Math.round(avg),
      last: Math.round(Number(m.lastTps) || 0),
      ttft: m.avgTtftMs != null && ttftMs > 0 ? (ttftMs / 1000).toFixed(1) : null,
      samples,
    });
  }
  return lines;
}
