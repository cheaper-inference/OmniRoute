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
      <div className="rounded-md bg-bg-subtle py-3 text-center text-xs italic text-text-muted">
        {t("noAllocations")}
      </div>
    );
  }

  // Build per-key consumption lookup from first dimension (primary)
  const primaryDim = usage?.dimensions?.[0];

  return (
    // PoolCard's Card is the frame around this table (#19620).
    <Table
      scrollbarLabel={t("apiKeyColumn")}
      scrollLabel={t("apiKeyColumn")}
      density="compact"
      className="min-w-0"
      variant="plain"
    >
      <TableHeader>
        <TableRow>
          <TableHead>{t("apiKeyColumn")}</TableHead>
          <TableHead numeric>{t("weightColumn")}</TableHead>
          <TableHead numeric>{t("realConsumedColumn")}</TableHead>
          <TableHead numeric>{t("deficitColumn")}</TableHead>
          <TableHead align="end">{t("policy")}</TableHead>
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
              <TableCell>
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
                      className="shrink-0"
                      title={t("borrowingIndicator")}
                    >
                      {t("borrowingIndicator")}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell numeric style={{ color }}>
                {alloc.weight}%
              </TableCell>
              <TableCell numeric className="text-text-muted">
                {consumed !== null ? consumed.toLocaleString() : "—"}
              </TableCell>
              <TableCell numeric>
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
                  <span className="text-3xs text-text-muted ml-1">
                    ({t("fairShareShort")}: {fairShare.toLocaleString()})
                  </span>
                )}
              </TableCell>
              <TableCell align="end">
                <Badge
                  size="sm"
                  variant={
                    alloc.policy === "hard"
                      ? "error"
                      : alloc.policy === "soft"
                        ? "warning"
                        : "success"
                  }
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
