"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
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
      <Table
        containerClassName="overflow-x-auto"
        className="w-full border-collapse text-[10px] tabular-nums"
        persistentScrollbars={false}
      >
        <TableHeader>
          <TableRow className="text-left text-text-muted">
            <TableHead className="px-1 py-0.5 font-medium">
              {tr("cursorModelUsageModel", "Model")}
            </TableHead>
            <TableHead className={`${CELL} font-medium`}>
              {tr("cursorModelUsageInput", "In")}
            </TableHead>
            <TableHead className={`${CELL} font-medium`}>
              {tr("cursorModelUsageOutput", "Out")}
            </TableHead>
            <TableHead className={`${CELL} font-medium`}>
              {tr("cursorModelUsageCacheRead", "Cache R")}
            </TableHead>
            <TableHead className={`${CELL} font-medium`}>
              {tr("cursorModelUsageCacheWrite", "Cache W")}
            </TableHead>
            <TableHead className={`${CELL} font-medium`}>
              {tr("cursorModelUsageCost", "Cost")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modelUsage.map((row) => (
            <TableRow key={row.model} className="border-t border-border/40 text-text-main">
              <TableCell
                className="max-w-[8rem] truncate px-1 py-0.5 font-medium"
                title={row.model}
              >
                {row.model}
              </TableCell>
              <TableCell className={`${CELL} text-text-muted`}>
                {formatTokens(row.inputTokens)}
              </TableCell>
              <TableCell className={`${CELL} text-text-muted`}>
                {formatTokens(row.outputTokens)}
              </TableCell>
              <TableCell className={`${CELL} text-text-muted`}>
                {formatTokens(row.cacheReadTokens)}
              </TableCell>
              <TableCell className={`${CELL} text-text-muted`}>
                {formatTokens(row.cacheWriteTokens)}
              </TableCell>
              <TableCell className={`${CELL} font-medium`}>{formatCost(row.costUsd)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
