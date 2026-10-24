"use client";

import { useTranslations } from "next-intl";
import Button from "./Button";
import Icon from "./Icon";
import useJsonTreeExpandStore, { useJsonTreeExpandLevel } from "@/store/jsonTreeExpandStore";

interface JsonTreeExpandControlsProps {
  /** Stable, locale-independent identifier for this box (e.g. "openaiRequest",
   * "providerEventStream") -- NOT the translated title. Each sectionId tracks
   * its own expand level, shared across different log entries but independent
   * from every other section on the page, since different payload/stream
   * boxes carry "interesting" data at different nesting depths. */
  sectionId: string;
}

export function JsonTreeExpandControls({ sectionId }: JsonTreeExpandControlsProps) {
  const t = useTranslations("requestLogger.detail");
  const level = useJsonTreeExpandLevel(sectionId);
  const { collapseAll, collapseOneLevel, expandOneLevel, expandAll } = useJsonTreeExpandStore();

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => collapseAll(sectionId)}
        title={t("collapseAllLevels")}
        aria-label={t("collapseAllLevels")}
        className="size-6 min-h-6 text-text-muted"
      >
        <Icon name="collapse_all" size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => collapseOneLevel(sectionId)}
        title={t("collapseOneLevel")}
        aria-label={t("collapseOneLevel")}
        className="size-6 min-h-6 text-text-muted"
      >
        <Icon name="remove" size={16} />
      </Button>
      <span
        className="min-w-[1.5em] text-center text-[11px] font-mono text-text-muted tabular-nums"
        title={t("currentExpandLevel")}
      >
        {level}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => expandOneLevel(sectionId)}
        title={t("expandOneLevel")}
        aria-label={t("expandOneLevel")}
        className="size-6 min-h-6 text-text-muted"
      >
        <Icon name="add" size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => expandAll(sectionId)}
        title={t("expandAllLevels")}
        aria-label={t("expandAllLevels")}
        className="size-6 min-h-6 text-text-muted"
      >
        <Icon name="expand_all" size={16} />
      </Button>
    </div>
  );
}
