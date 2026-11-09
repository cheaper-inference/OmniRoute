"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { CardSkeleton } from "@/shared/components";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { CliToolCard, CliConceptCard, CliComparisonCard } from "@/shared/components/cli";
import { useToolBatchStatuses } from "@/shared/hooks/cli/useToolBatchStatuses";

export interface CliAgentsPageClientProps {
  machineId: string;
}

const DETECTION_ALL = "all";
const DETECTION_INSTALLED = "installed";
const DETECTION_NOT_INSTALLED = "not_installed";

export default function CliAgentsPageClient({ machineId: _machineId }: CliAgentsPageClientProps) {
  const t = useTranslations("cliAgents");
  const { statuses, loading, refetch } = useToolBatchStatuses();

  const [search, setSearch] = useState<string>("");
  const [detectionFilter, setDetectionFilter] = useState<string>(DETECTION_ALL);

  const agentTools = useMemo(
    () => Object.values(CLI_TOOLS).filter((tool) => tool.category === "agent"),
    []
  );

  const hasActiveProviders = useMemo(() => {
    if (!statuses) return true;
    return Object.values(statuses).some((s) => s.detection.installed);
  }, [statuses]);

  const filteredTools = useMemo(() => {
    return agentTools.filter((tool) => {
      // Search filter
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesId = tool.id.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesVendor = tool.vendor.toLowerCase().includes(q);
        if (!matchesName && !matchesId && !matchesDesc && !matchesVendor) {
          return false;
        }
      }

      // Detection filter
      if (detectionFilter !== DETECTION_ALL) {
        const batchStatus = statuses?.[tool.id] ?? null;
        const installed = batchStatus?.detection.installed ?? false;
        if (detectionFilter === DETECTION_INSTALLED && !installed) return false;
        if (detectionFilter === DETECTION_NOT_INSTALLED && installed) return false;
      }

      return true;
    });
  }, [agentTools, search, detectionFilter, statuses]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("pageTitle")}
        description={t("pageSubtitle")}
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => void refetch()}
            aria-label={t("refreshDetection")}
          >
            {t("refreshDetection")}
          </Button>
        }
      />

      {/* Concept card */}
      <CliConceptCard currentType="agent" />

      {/* Comparison card */}
      <CliComparisonCard currentType="agent" />

      {/* Search + filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          type="search"
          icon="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="flex-1 min-w-[180px] max-w-sm"
        />

        <Select
          value={detectionFilter}
          onChange={(e) => setDetectionFilter(e.target.value)}
          aria-label={t("detectionFilterLabel")}
          className="w-auto"
        >
          <option value={DETECTION_ALL}>{t("detectionAll")}</option>
          <option value={DETECTION_INSTALLED}>{t("detectionInstalled")}</option>
          <option value={DETECTION_NOT_INSTALLED}>{t("detectionNotInstalled")}</option>
        </Select>

        <span className="text-xs text-text-muted whitespace-nowrap">
          {t("visibleCount", { count: filteredTools.length })}
        </span>
      </div>

      {/* Tool grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agentTools.map((tool) => (
            <CardSkeleton key={tool.id} />
          ))}
        </div>
      ) : filteredTools.length === 0 ? (
        <div data-testid="empty-state">
          <EmptyState icon="search_off" title={t("emptyState")} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <CliToolCard
              key={tool.id}
              tool={tool}
              batchStatus={statuses?.[tool.id] ?? null}
              detailHref={`/dashboard/cli-agents/${tool.id}`}
              hasActiveProviders={hasActiveProviders}
            />
          ))}
        </div>
      )}
    </div>
  );
}
