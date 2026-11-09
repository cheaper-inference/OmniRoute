"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import type { ToolBatchStatus } from "@/shared/types/cliBatchStatus";
import CliStatusBadge from "@/app/(dashboard)/dashboard/cli-code/components/CliStatusBadge";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

export interface CliToolCardProps {
  tool: CliCatalogEntry;
  batchStatus: ToolBatchStatus | null;
  detailHref: string;
  hasActiveProviders: boolean;
}

export default function CliToolCard({
  tool,
  batchStatus,
  detailHref,
  hasActiveProviders,
}: CliToolCardProps) {
  const t = useTranslations("cliCommon");
  const tTools = useTranslations("cliTools");
  const { isDark } = useTheme();
  const installed = batchStatus?.detection.installed ?? false;
  const configStatus = batchStatus?.config.status ?? null;
  const version = batchStatus?.detection.version ?? t("card.versionNotFound");
  const endpoint = batchStatus?.config.endpoint ?? null;
  const imageSrc =
    tool.image || (isDark ? tool.imageDark || tool.imageLight : tool.imageLight || tool.imageDark);

  const showInstallChips = !installed && tool.configType !== "guide";

  const title = (
    <div className="flex items-center gap-2.5">
      {/* Icon / image */}
      {imageSrc ? (
        // Plain <img> (not next/image): tool SVGs are non-square (opencode
        // 234×42, cursor 467×532) and next/image's dev check warns whenever the
        // rendered aspect-ratio size differs from the square width/height
        // attributes. object-contain + max caps keep the logo at its true ratio.
        // eslint-disable-next-line @next/next/no-img-element -- local static SVG asset
        <img
          src={imageSrc}
          alt={tool.name}
          width={32}
          height={32}
          className="rounded-md object-contain flex-shrink-0"
          style={{ width: "auto", height: "auto", maxWidth: 32, maxHeight: 32 }}
        />
      ) : (
        <span className="inline-flex shrink-0" style={{ color: tool.color }} aria-hidden="true">
          <Icon name={tool.icon ?? "terminal"} size={20} />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-text-main text-sm leading-tight truncate">
            {tool.name}
          </span>
          <span className="text-[11px] text-text-muted font-mono bg-bg-subtle px-1.5 py-0.5 rounded">
            {version}
          </span>
        </div>
        <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
          {tTools(`toolDescriptions.${tool.id}`)}
        </p>
      </div>
      <Icon name="chevron_right" size={18} className="text-text-muted flex-shrink-0" />
    </div>
  );

  return (
    <Link
      href={detailHref}
      className={cn(
        // Kit card surface on the link itself (the whole card is the navigation target).
        "ci-card block min-h-[180px]",
        "hover:shadow-md hover:border-primary/30 transition-all",
        "p-4 flex flex-col gap-3"
      )}
    >
      {/* Header */}
      {title}

      {/* Status strip */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Detection */}
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded",
            installed ? "text-success" : "text-text-muted"
          )}
        >
          <span aria-hidden="true">{installed ? "✓" : "✗"}</span>
          {installed ? t("card.detected") : t("card.notDetected")}
        </span>

        {/* Config status */}
        {configStatus && (
          <CliStatusBadge
            effectiveConfigStatus={configStatus}
            batchStatus={null}
            lastConfiguredAt={batchStatus?.config.lastConfiguredAt ?? null}
          />
        )}

        {/* Endpoint */}
        {endpoint && (
          <span className="text-[10px] text-text-muted font-mono truncate max-w-[140px]">
            {endpoint}
          </span>
        )}
      </div>

      {/* Badges row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {tool.baseUrlSupport === "partial" && (
          <Badge variant="warning" size="sm">
            <span aria-hidden="true">⚠</span> {t("card.baseUrlPartial")}
          </Badge>
        )}
        {tool.acpSpawnable === true && (
          <Badge variant="info" size="sm">
            {t("card.alsoAcp")}
          </Badge>
        )}
        {showInstallChips && (
          <>
            <Badge size="sm">📋 {t("card.manualConfig")}</Badge>
            <Badge size="sm">⬇ {t("card.installGuide")}</Badge>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-1 flex items-center justify-between">
        <span className="text-xs text-primary font-medium">
          {installed ? t("card.configure") : t("card.howToInstall")}
        </span>
        {!hasActiveProviders && (
          <span
            className="text-[10px] text-text-muted italic"
            title={t("card.connectProviderHint")}
          >
            {t("card.connectProviderHint")}
          </span>
        )}
      </div>
    </Link>
  );
}
