"use client";
import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import type { DiffSegment } from "./compressionFlowModel";
export interface DiffPaneProps {
  segments: DiffSegment[];
  preservedBlocks: Array<{ kind: string; preview: string }>;
}
const SEG_CLASS: Record<DiffSegment["type"], string> = {
  same: "opacity-90",
  removed: "bg-error/20 line-through",
  added: "bg-success/20",
};
export function DiffPane({ segments, preservedBlocks }: DiffPaneProps) {
  const t = useTranslations("compressionStudio");
  return (
    <div data-testid="diff-pane" className="font-mono text-xs leading-relaxed">
      <div className="mb-2 flex gap-2 text-[10px]">
        <Badge size="sm" variant="info">
          {t("inlineView")}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          disabled
          title={t("splitComingSoon")}
          className="h-6 min-h-6 px-2 text-[10px]"
        >
          {t("splitComingSoon")}
        </Button>
      </div>
      <div className="whitespace-pre-wrap">
        {segments.map((seg, i) => (
          <span key={i} data-testid={`diff-${seg.type}`} className={SEG_CLASS[seg.type]}>
            {seg.text}
          </span>
        ))}
      </div>
      {preservedBlocks.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1" data-testid="diff-preserved">
          {preservedBlocks.map((b, i) => (
            <Badge key={i} size="sm" className="border-chart-3/50 text-[10px]">
              {b.kind}: {b.preview.slice(0, 40)}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
