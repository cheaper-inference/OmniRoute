"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Link from "next/link";
import Icon from "@/shared/components/Icon";
import { Button, CardSkeleton, Input } from "@/shared/components";
import Select from "@/shared/components/Select";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { EXPECTED_CODE_COUNT } from "@/shared/schemas/cliCatalog";
import { CliToolCard, CliConceptCard, CliComparisonCard } from "@/shared/components/cli";
import { useToolBatchStatuses } from "@/shared/hooks/cli/useToolBatchStatuses";
import type { CliCatalogEntry } from "@/shared/schemas/cliCatalog";
import CliProfileAutoSyncToggles from "./components/CliProfileAutoSyncToggles";
import CliCompanionPanel from "./components/CliCompanionPanel";
import type { CompanionTarget } from "@/shared/utils/cliCompanion";

// ── Static catalogue slice ────────────────────────────────────────────────────

const CODE_TOOLS: [string, CliCatalogEntry][] = Object.entries(CLI_TOOLS).filter(
  ([, tool]) => tool.category === "code" && tool.baseUrlSupport !== "none"
) as [string, CliCatalogEntry][];

// Cardinality guard (D15) — non-blocking, log only
if (CODE_TOOLS.length !== EXPECTED_CODE_COUNT) {
  console.warn(
    `[CliCodePage] Expected ${EXPECTED_CODE_COUNT} code tools, found ${CODE_TOOLS.length}. ` +
      "Check F1 catalog edits."
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

type DetectionFilter = "all" | "installed" | "not_installed";
type BaseUrlFilter = "all" | "full" | "partial";

interface ProviderConnection {
  isActive?: boolean;
  [key: string]: unknown;
}

interface ProvidersResponse {
  connections?: ProviderConnection[];
}

// ── Component ─────────────────────────────────────────────────────────────────

interface CliCodePageClientProps {
  machineId: string;
  companionTargets?: CompanionTarget[];
}

export default function CliCodePageClient({
  machineId: _machineId,
  companionTargets = [],
}: CliCodePageClientProps) {
  const t = useTranslations("cliCode");
  const tCommon = useTranslations("cliCommon");

  // ── Batch statuses ──────────────────────────────────────────────────────────
  const { statuses, loading, error, refetch } = useToolBatchStatuses();

  // ── Providers ───────────────────────────────────────────────────────────────
  const [hasActiveProviders, setHasActiveProviders] = useState<boolean>(false);
  const [providersLoading, setProvidersLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/providers")
      .then<ProvidersResponse>((res) =>
        res.ok ? res.json() : Promise.resolve({ connections: [] })
      )
      .then((data) => {
        if (cancelled) return;
        const active = (data.connections ?? []).filter((c) => c.isActive !== false);
        setHasActiveProviders(active.length > 0);
      })
      .catch(() => {
        if (!cancelled) setHasActiveProviders(false);
      })
      .finally(() => {
        if (!cancelled) setProvidersLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Filters ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState<string>("");
  const [detectionFilter, setDetectionFilter] = useState<DetectionFilter>("all");
  const [baseUrlFilter, setBaseUrlFilter] = useState<BaseUrlFilter>("all");

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleDetectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDetectionFilter(e.target.value as DetectionFilter);
  }, []);

  const handleBaseUrlChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseUrlFilter(e.target.value as BaseUrlFilter);
  }, []);

  // ── Filtered tools ──────────────────────────────────────────────────────────
  const filteredTools = useMemo<[string, CliCatalogEntry][]>(() => {
    const q = search.trim().toLowerCase();

    return CODE_TOOLS.filter(([id, tool]) => {
      // Search filter
      if (q) {
        const haystack = `${tool.name} ${tool.vendor} ${tool.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // Detection filter
      if (detectionFilter !== "all") {
        const installed = statuses?.[id]?.detection.installed ?? false;
        if (detectionFilter === "installed" && !installed) return false;
        if (detectionFilter === "not_installed" && installed) return false;
      }

      // Base URL filter
      if (baseUrlFilter !== "all") {
        if (tool.baseUrlSupport !== baseUrlFilter) return false;
      }

      return true;
    });
  }, [search, detectionFilter, baseUrlFilter, statuses]);

  // ── Render ───────────────────────────────────────────────────────────────────
  const isLoadingOverall = loading || providersLoading;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("title")}
        description={t("pageSubtitle")}
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={refetch}
            icon="refresh"
            aria-label={tCommon("card.refreshDetection")}
          >
            {tCommon("card.refreshDetection")}
          </Button>
        }
      />

      {/* Concept card */}
      <CliConceptCard currentType="code" />

      {/* Comparison card */}
      <CliComparisonCard currentType="code" />

      <CliProfileAutoSyncToggles />

      <CliCompanionPanel
        targets={companionTargets}
        statuses={statuses}
        loading={loading}
        error={Boolean(error)}
      />

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex-1 min-w-0">
          <Input
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            value={search}
            onChange={handleSearchChange}
            icon="search"
          />
        </div>

        {/* Detection filter */}
        <Select
          label={t("filterDetectionLabel")}
          value={detectionFilter}
          onChange={handleDetectionChange}
          className="min-w-[150px]"
        >
          <option value="all">{t("detectionAll")}</option>
          <option value="installed">{t("detectionInstalled")}</option>
          <option value="not_installed">{t("detectionNotFound")}</option>
        </Select>

        {/* Base URL filter */}
        <Select
          label={t("filterBaseUrlLabel")}
          value={baseUrlFilter}
          onChange={handleBaseUrlChange}
          className="min-w-[150px]"
        >
          <option value="all">{t("baseUrlAll")}</option>
          <option value="full">{t("baseUrlFull")}</option>
          <option value="partial">{t("baseUrlPartial")}</option>
        </Select>
      </div>

      {/* Empty state — no active providers */}
      {!providersLoading && !hasActiveProviders && (
        <div className="rounded-lg border border-warning/40 bg-warning/10 p-4 flex items-start gap-3">
          <Icon name="warning" className="text-warning flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-warning">
              {tCommon("detail.noActiveProviders")}
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              {tCommon("detail.noActiveProvidersDesc")}
            </p>
            <Link
              href="/dashboard/providers"
              className="inline-flex items-center gap-1 mt-2 text-xs text-primary font-medium hover:underline"
            >
              {tCommon("detail.openProviders")}
            </Link>
          </div>
        </div>
      )}

      {/* Grid */}
      {isLoadingOverall ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTools.map(([id, tool]) => (
            <CliToolCard
              key={id}
              tool={tool}
              batchStatus={statuses?.[id] ?? null}
              detailHref={`/dashboard/cli-code/${id}`}
              hasActiveProviders={hasActiveProviders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
