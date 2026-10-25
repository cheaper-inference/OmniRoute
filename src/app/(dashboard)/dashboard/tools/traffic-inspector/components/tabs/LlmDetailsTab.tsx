"use client";

import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableRow } from "@omniroute/ui-kit/table";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { extractLlmMetadata } from "@/mitm/inspector/llmMetadataExtractor";
import { TokenBadge } from "../shared/TokenBadge";

interface LlmDetailsTabProps {
  request: InterceptedRequest;
}

export function LlmDetailsTab({ request }: LlmDetailsTabProps) {
  const t = useTranslations("trafficInspector");
  const meta = extractLlmMetadata(request);

  if (!meta) {
    return <div className="p-4 text-sm text-text-muted">{t("llmNotAvailable")}</div>;
  }

  const rows: Array<{ label: string; value: string | null | undefined }> = [
    { label: t("llmProvider"), value: meta.provider },
    { label: t("llmApiKind"), value: meta.apiKind },
    { label: t("llmModel"), value: meta.model },
    { label: t("llmMessages"), value: meta.messages > 0 ? String(meta.messages) : null },
    { label: t("llmStream"), value: meta.streamed ? t("llmStreamYes") : t("llmStreamNo") },
    { label: t("llmMappedTo"), value: meta.mappedTo },
    {
      label: t("llmCostEstimate"),
      value: meta.costEstimateUsd != null ? `$${meta.costEstimateUsd.toFixed(6)}` : null,
    },
  ];

  return (
    <div className="p-4 h-full overflow-auto space-y-4">
      <Table className="min-w-0 text-sm" scrollbarLabel={t("tabLlm")}>
        <TableBody>
          {rows.map(({ label, value }) => (
            <TableRow key={label}>
              <TableCell className="w-[40%] font-medium text-text-muted">{label}</TableCell>
              <TableCell className="font-mono text-text-main">{value ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center gap-2">
        <TokenBadge tokensIn={meta.tokensIn} tokensOut={meta.tokensOut} />
        {(meta.tokensIn != null || meta.tokensOut != null) && (
          <span className="text-xs text-text-muted">
            {t("llmTotalTokens", { count: (meta.tokensIn ?? 0) + (meta.tokensOut ?? 0) })}
          </span>
        )}
      </div>
    </div>
  );
}
