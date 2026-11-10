"use client";

import { Button } from "@/shared/components";

import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";

/**
 * Per-request account pin header read by the chat handler (`src/sse/handlers/chat.ts`).
 * Only this name pins: `x-connection-id` is deliberately NOT an alias (the media
 * playground cards send it with a provider id, not a connection id).
 */
export const CONNECTION_PIN_HEADER = "x-omniroute-connection";

/** Copyable chip showing a connection's id (first 8 chars), used to build a pin header. */
export default function ConnectionIdChip({ connectionId }: { connectionId?: string | null }) {
  const t = useTranslations("providers");
  const { copied, copy } = useCopyToClipboard();
  if (!connectionId) return null;

  const isCopied = copied === connectionId;
  const title = t("copyConnectionId", { header: CONNECTION_PIN_HEADER });
  return (
    <Button
      variant="ghost"
      size="sm"
      icon={isCopied ? "check" : "content_copy"}
      data-testid="connection-id-chip"
      onClick={() => void copy(connectionId, connectionId)}
      title={title}
      aria-label={title}
      className="h-auto min-h-0 gap-0.5 rounded px-1 font-mono text-[11px] text-text-muted"
    >
      {isCopied ? t("connectionIdCopied") : `${connectionId.slice(0, 8)}…`}
    </Button>
  );
}

/** One-line hint under the Connections header explaining per-request account pinning. */
export function ConnectionPinTip() {
  const t = useTranslations("providers");
  return (
    <p className="-mt-2 mb-3 text-xs text-text-muted">
      {t("connectionPinTip", { header: CONNECTION_PIN_HEADER })}
    </p>
  );
}
