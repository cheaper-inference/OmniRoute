"use client";
import type { CompressionHeatmap } from "@omniroute/open-sse/services/compression/diffHelper";

/**
 * Maps a saliency score (0–1) onto the kit's diverging ramp, which stays apart for colour-blind
 * readers and flips with the theme. Removed tokens take the warm side, strongest at the lowest
 * score; kept tokens take the cool side, strongest at the highest. The ramp is mixed into the
 * surface because the token text sits on it: 30 % keeps it above 4.5:1 in all four looks.
 */
function scoreToBackground(score: number, kept: boolean): string {
  const band = Math.min(2, Math.floor(score * 3));
  const step = (kept ? 5 : 1) + band;
  return `color-mix(in srgb, var(--ci-scale-div-${step}) 30%, transparent)`;
}

interface SaliencyHeatmapProps {
  heatmap: CompressionHeatmap | undefined;
}

export function SaliencyHeatmap({ heatmap }: SaliencyHeatmapProps): React.ReactElement | null {
  if (!heatmap || heatmap.tokens.length === 0) return null;

  return (
    <div
      data-testid="saliency-heatmap"
      className="rounded border p-2 font-mono text-xs leading-relaxed"
      aria-label={`Saliency heatmap — ${heatmap.mode} mode`}
    >
      {heatmap.tokens.map((token, idx) => (
        <span
          key={idx}
          data-score={token.score}
          data-kept={String(token.kept)}
          style={{ backgroundColor: scoreToBackground(token.score, token.kept) }}
        >
          {token.text}
        </span>
      ))}
    </div>
  );
}
