"use client";

import { useTranslations } from "next-intl";
import { translateUsageOrFallback } from "./i18nFallback";

/**
 * Compact per-model token + billed-cost table for a Cursor connection (current billing cycle).
 * `costUsd` is the amount Cursor billed, not an OmniRoute pricing estimate.
 */

export interface CursorModelUsageRow {
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  costUsd: number;
}

function toCount(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Keep only well-formed rows (the cache is read back from storage), most expensive first. */
export function normalizeCursorModelUsage(value: unknown): CursorModelUsageRow[] {
  if (!Array.isArray(value)) return [];
  const rows: CursorModelUsageRow[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    const model = typeof row.model === "string" ? row.model.trim() : "";
    if (!model) continue;
    rows.push({
      model,
      inputTokens: toCount(row.inputTokens),
      outputTokens: toCount(row.outputTokens),
      cacheReadTokens: toCount(row.cacheReadTokens),
      cacheWriteTokens: toCount(row.cacheWriteTokens),
      costUsd: toCount(row.costUsd),
    });
  }
  return rows.sort((a, b) => b.costUsd - a.costUsd || a.model.localeCompare(b.model));
}

function formatTokens(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}K`;
  return String(Math.floor(value));
}

function formatCost(usd: number): string {
  if (usd === 0) return "$0.00";
  if (usd < 0.01) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

const CELL = "px-1 py-0.5 text-right";

export default function CursorModelUsageTable({ rows }: { rows: unknown }) {
  const t = useTranslations("usage");
  const modelUsage = normalizeCursorModelUsage(rows);
  if (modelUsage.length === 0) return null;
  const tr = (key: string, fallback: string) => translateUsageOrFallback(t, key, fallback);

  return (
    <div
      data-testid="cursor-model-usage"
      className="flex flex-col gap-1 border-t border-border/40 pt-2"
    >
      <div className="flex items-baseline justify-between gap-2 text-[10px] text-text-muted">
        <span className="font-medium uppercase tracking-wide">
          {tr("cursorModelUsageTitle", "API tokens (this cycle)")}
        </span>
        <span className="italic">{tr("cursorModelUsageBilledHint", "Billed by Cursor")}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[10px] tabular-nums">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="px-1 py-0.5 font-medium">{tr("cursorModelUsageModel", "Model")}</th>
              <th className={`${CELL} font-medium`}>{tr("cursorModelUsageInput", "In")}</th>
              <th className={`${CELL} font-medium`}>{tr("cursorModelUsageOutput", "Out")}</th>
              <th className={`${CELL} font-medium`}>
                {tr("cursorModelUsageCacheRead", "Cache R")}
              </th>
              <th className={`${CELL} font-medium`}>
                {tr("cursorModelUsageCacheWrite", "Cache W")}
              </th>
              <th className={`${CELL} font-medium`}>{tr("cursorModelUsageCost", "Cost")}</th>
            </tr>
          </thead>
          <tbody>
            {modelUsage.map((row) => (
              <tr key={row.model} className="border-t border-border/40 text-text-main">
                <td className="max-w-[8rem] truncate px-1 py-0.5 font-medium" title={row.model}>
                  {row.model}
                </td>
                <td className={`${CELL} text-text-muted`}>{formatTokens(row.inputTokens)}</td>
                <td className={`${CELL} text-text-muted`}>{formatTokens(row.outputTokens)}</td>
                <td className={`${CELL} text-text-muted`}>{formatTokens(row.cacheReadTokens)}</td>
                <td className={`${CELL} text-text-muted`}>{formatTokens(row.cacheWriteTokens)}</td>
                <td className={`${CELL} font-medium`}>{formatCost(row.costUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
