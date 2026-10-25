"use client";

import { useTranslations } from "next-intl";
import Badge from "./Badge";

type UsageProvenance = "reported" | "estimated" | "absent" | null | undefined;

/**
 * Translation keys (namespace `requestLogger.detail`) for what a finished request
 * says about its reply: an empty reply (`hasContent === 0`) is a different fact
 * from provider metering that never arrived (`usageProvenance === "absent"`) or
 * token counts estimated locally. Unknown values (null) produce nothing.
 */
export function getContentProvenanceKeys(
  hasContent: number | boolean | null | undefined,
  usageProvenance: UsageProvenance
): string[] {
  const keys: string[] = [];
  if (hasContent === 0 || hasContent === false) keys.push("contentEmpty");
  if (usageProvenance === "absent") keys.push("usageAbsent");
  if (usageProvenance === "estimated") keys.push("usageEstimated");
  return keys;
}

export function CallContentProvenanceBadges({
  hasContent,
  usageProvenance,
}: {
  hasContent?: number | boolean | null;
  usageProvenance?: UsageProvenance;
}) {
  const t = useTranslations("requestLogger.detail");
  const keys = getContentProvenanceKeys(hasContent, usageProvenance);
  if (keys.length === 0) return null;
  return (
    <div>
      <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
        {t("contentProvenance")}
      </div>
      <div className="flex flex-wrap gap-1">
        {keys.map((key) => (
          <Badge
            key={key}
            data-testid={`content-provenance-${key}`}
            variant="warning"
            size="sm"
            className="font-bold"
          >
            {t(key)}
          </Badge>
        ))}
      </div>
    </div>
  );
}
