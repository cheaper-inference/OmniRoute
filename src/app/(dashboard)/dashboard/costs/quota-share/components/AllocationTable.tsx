"use client";

import { useTranslations } from "next-intl";
import type { PoolAllocation } from "@/lib/quota/dimensions";
import type { PoolUsageSnapshot } from "@/lib/quota/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Badge from "@/shared/components/Badge";
import { getSeriesColor } from "@/shared/components/analytics/chartColors";

interface AllocationTableProps {
  allocations: PoolAllocation[];
  usage: PoolUsageSnapshot | null;
  /** Map from apiKeyId to display name */
  keyLabels: Record<string, string>;
}

export default function AllocationTable({ allocations, usage, keyLabels }: AllocationTableProps) {
  const t = useTranslations("quotaShare");

  if (allocations.length === 0) {
    return (
      <div className="rounded-md bg-bg-subtle py-3 text-center text-[11px] italic text-text-muted">
        {t("noAllocations")}
      </div>
    );
  }

  // Build per-key consumption lookup from first dimension (primary)
  const primaryDim = usage?.dimensions?.[0];

  return (
    <Table scrollbarLabel={t("apiKeyColumn")} className="min-w-0 text-[11px]">
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 px-2">{t("apiKeyColumn")}</TableHead>
          <TableHead className="h-8 px-2 text-right">{t("weightColumn")}</TableHead>
          <TableHead className="h-8 px-2 text-right">{t("realConsumedColumn")}</TableHead>
          <TableHead className="h-8 px-2 text-right">{t("deficitColumn")}</TableHead>
          <TableHead className="h-8 px-2 text-right">{t("policy")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allocations.map((alloc, i) => {
          // Same categorical series as StackedAllocationBar (kit chart tokens).
          const color = getSeriesColor(i);
          const label = keyLabels[alloc.apiKeyId] || alloc.apiKeyId.slice(0, 12) + "…";

          const perKeyData = primaryDim?.perKey?.find((k) => k.apiKeyId === alloc.apiKeyId);
          const consumed = perKeyData?.consumed ?? null;
          const fairShare = perKeyData?.fairShare ?? null;
          const deficit = perKeyData !== undefined ? perKeyData.deficit : null;
          const borrowing = perKeyData?.borrowing ?? false;

          return (
            <TableRow key={alloc.apiKeyId}>
              <TableCell className="h-auto px-2 py-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ background: color }}
                  />
                  <span className="font-mono truncate text-text-main">{label}</span>
                  {borrowing && (
                    <Badge
                      size="sm"
                      variant="warning"
                      className="shrink-0 text-[9px] font-bold"
                      title={t("borrowingIndicator")}
                    >
                      {t("borrowingIndicator")}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell
                className="h-auto px-2 py-1.5 text-right font-bold tabular-nums"
                style={{ color }}
              >
                {alloc.weight}%
              </TableCell>
              <TableCell className="h-auto px-2 py-1.5 text-right tabular-nums text-text-muted">
                {consumed !== null ? consumed.toLocaleString() : "—"}
              </TableCell>
              <TableCell className="h-auto px-2 py-1.5 text-right tabular-nums">
                {deficit !== null ? (
                  <span
                    className={
                      deficit > 0 ? "text-error" : deficit < 0 ? "text-success" : "text-text-muted"
                    }
                  >
                    {deficit > 0 ? "+" : ""}
                    {deficit.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-text-muted">—</span>
                )}
                {fairShare !== null && (
                  <span className="text-[9px] text-text-muted ml-1">
                    ({t("fairShareShort")}: {fairShare.toLocaleString()})
                  </span>
                )}
              </TableCell>
              <TableCell className="h-auto px-2 py-1.5 text-right">
                <Badge
                  size="sm"
                  variant={
                    alloc.policy === "hard"
                      ? "error"
                      : alloc.policy === "soft"
                        ? "warning"
                        : "success"
                  }
                  className="text-[9px] font-semibold"
                >
                  {t(`policy${alloc.policy[0].toUpperCase()}${alloc.policy.slice(1)}`)}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
