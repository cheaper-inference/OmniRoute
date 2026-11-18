"use client";

import Card from "@/shared/components/Card";
// EngineGuidanceDetail — per-engine expandable guidance block for CompressionPanel
// (#7530). Surfaces the `guidance` metadata from engineCatalog.ts (tradeoffs, lossy
// flag → "safe default" badge, cache impact) so operators can see quality/latency
// tradeoffs without leaving Settings. Extracted into its own component to keep
// CompressionPanel's per-row JSX flat (cognitive-complexity ratchet).
//
// Like the rest of the engine row, the guidance copy itself is catalog-hardcoded
// English (not i18n) so it stays deterministic; only the surrounding chrome (toggle
// button, badge, "cache impact" label) is translated.

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import type {
  CacheImpact,
  EngineGuidance,
} from "../../../../../../open-sse/services/compression/engineCatalog.ts";

const CACHE_IMPACT_LABEL: Record<CacheImpact, string> = {
  none: "None",
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

interface EngineGuidanceDetailProps {
  id: string;
  guidance: EngineGuidance;
  expanded: boolean;
  onToggle: () => void;
}

export default function EngineGuidanceDetail({
  id,
  guidance,
  expanded,
  onToggle,
}: EngineGuidanceDetailProps) {
  const t = useTranslations("settings");
  return (
    <div className="mt-1 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {!guidance.lossy && (
          <Badge
            size="sm"
            variant="success"
            data-testid={`engine-safe-default-${id}`}
            className="uppercase tracking-wider"
          >
            {t("compressionGuidanceSafeDefault")}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="2xs"
          data-testid={`engine-guidance-toggle-${id}`}
          onClick={onToggle}
          aria-expanded={expanded}
          className="uppercase text-primary"
        >
          {expanded ? t("compressionGuidanceHide") : t("compressionGuidanceShow")}
        </Button>
      </div>
      {expanded && (
        <Card.Section
          data-testid={`engine-guidance-detail-${id}`}
          className="text-xs text-text-muted"
        >
          <p>{guidance.tradeoffs}</p>
          <p className="mt-1">
            <span className="font-medium text-text-main">
              {t("compressionGuidanceCacheImpact")}:
            </span>{" "}
            {CACHE_IMPACT_LABEL[guidance.cacheImpact]}
          </p>
        </Card.Section>
      )}
    </div>
  );
}
