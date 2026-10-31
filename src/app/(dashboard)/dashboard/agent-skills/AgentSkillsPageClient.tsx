"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import { SkillsConceptCard } from "@/shared/components/SkillsConceptCard";
import { cn } from "@/shared/utils/cn";
import { matchesSearch } from "@/shared/utils/turkishText";
import { CoverageBar } from "./components/CoverageBar";
import { McpA2aLinksBar } from "./components/McpA2aLinksBar";
import { SkillCard } from "./components/SkillCard";
import { SkillPreviewPane } from "./components/SkillPreviewPane";
import type { AgentSkill, SkillCoverage } from "@/lib/agentSkills/types";

type FilterCategory = "all" | "api" | "cli" | "config";

// ── Skeleton helpers ─────────────────────────────────────────────────────────

function SkillCardSkeleton(): JSX.Element {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-bg-subtle shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 rounded bg-bg-subtle" />
        <div className="h-2 w-full rounded bg-bg-subtle" />
        <div className="h-2 w-4/5 rounded bg-bg-subtle" />
      </div>
    </div>
  );
}

function CoverageBarSkeleton(): JSX.Element {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="flex gap-2">
        <div className="h-2 w-16 rounded bg-bg-subtle" />
        <div className="flex-1 h-2 rounded bg-bg-subtle" />
      </div>
      <div className="flex gap-2">
        <div className="h-2 w-16 rounded bg-bg-subtle" />
        <div className="flex-1 h-2 rounded bg-bg-subtle" />
      </div>
      <div className="flex gap-2">
        <div className="h-2 w-16 rounded bg-bg-subtle" />
        <div className="flex-1 h-2 rounded bg-bg-subtle" />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function AgentSkillsPageClient(): JSX.Element {
  const t = useTranslations("agentSkills");
  const tSidebar = useTranslations("sidebar");

  // State
  const [catalog, setCatalog] = useState<AgentSkill[]>([]);
  const [coverage, setCoverage] = useState<SkillCoverage | null>(null);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [markdownCache, setMarkdownCache] = useState<Map<string, string>>(new Map());
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [generatingSkills, setGeneratingSkills] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // ── Fetch catalog + coverage on mount ────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const load = async () => {
      try {
        setLoadingCatalog(true);
        const res = await fetch("/api/agent-skills", { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as { skills: AgentSkill[]; coverage: SkillCoverage };
        setCatalog(json.skills ?? []);
        setCoverage(json.coverage ?? null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setCatalog([]);
        }
      } finally {
        setLoadingCatalog(false);
      }
    };

    void load();
    return () => {
      controller.abort();
    };
  }, []);

  // ── Fetch raw markdown when a card is selected ────────────────────────────
  const loadPreview = useCallback(
    async (id: string) => {
      if (markdownCache.has(id)) return;
      setLoadingPreview(true);
      try {
        const res = await fetch(`/api/agent-skills/${id}/raw`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.text();
        setMarkdownCache((prev) => new Map(prev).set(id, body));
      } catch {
        setMarkdownCache((prev) => {
          const next = new Map(prev);
          // Set empty string to signal "failed" so we show error state
          next.set(id, "");
          return next;
        });
      } finally {
        setLoadingPreview(false);
      }
    },
    [markdownCache]
  );

  // ── Debounced preview load (200ms) ───────────────────────────────────────
  useEffect(() => {
    if (!selectedId) return;
    const timer = setTimeout(() => {
      void loadPreview(selectedId);
    }, 200);
    return () => clearTimeout(timer);
  }, [selectedId, loadPreview]);

  const handleSelectCard = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleRefreshPreview = useCallback(() => {
    if (!selectedId) return;
    setMarkdownCache((prev) => {
      const next = new Map(prev);
      next.delete(selectedId);
      return next;
    });
    void loadPreview(selectedId);
  }, [selectedId, loadPreview]);

  // ── Generate missing skills ───────────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    const confirmed = window.confirm(t("regenerateConfirm"));
    if (!confirmed) return;
    setGeneratingSkills(true);
    try {
      const res = await fetch("/api/agent-skills/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun: false, prune: false }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Refresh catalog + coverage after generation
      const res2 = await fetch("/api/agent-skills");
      if (res2.ok) {
        const json = (await res2.json()) as { skills: AgentSkill[]; coverage: SkillCoverage };
        setCatalog(json.skills ?? []);
        setCoverage(json.coverage ?? null);
      }
    } catch {
      // Error handled silently — could extend with toast notification
    } finally {
      setGeneratingSkills(false);
    }
  }, [t]);

  // ── Filtering + search ────────────────────────────────────────────────────
  const localizedCatalog = useMemo(
    () =>
      catalog.map((skill) => {
        const nameKey = `catalog.${skill.id}.name`;
        const descriptionKey = `catalog.${skill.id}.description`;
        return {
          ...skill,
          name: t.has(nameKey) ? t(nameKey) : skill.name,
          description: t.has(descriptionKey) ? t(descriptionKey) : skill.description,
        };
      }),
    [catalog, t]
  );

  const filteredSkills = localizedCatalog.filter((s) => {
    if (filter !== "all" && s.category !== filter) return false;
    if (searchTerm.trim()) {
      return (
        matchesSearch(s.name, searchTerm) ||
        matchesSearch(s.description, searchTerm) ||
        matchesSearch(s.id, searchTerm)
      );
    }
    return true;
  });

  const selectedMarkdown = selectedId ? (markdownCache.get(selectedId) ?? null) : null;
  const coverageTotal =
    coverage !== null ? coverage.api.have + coverage.cli.have + coverage.config.have : null;
  const catalogTotal =
    coverage !== null ? coverage.api.total + coverage.cli.total + coverage.config.total : null;
  const showGenerateButton =
    coverageTotal !== null && catalogTotal !== null && coverageTotal < catalogTotal;

  return (
    <div className="flex flex-col gap-4">
      {/* Page title (lote 7 pendência 12): the shell title hides when a PageHeader is present. */}
      <PageHeader
        compact
        title={tSidebar("agentSkills")}
        description={tSidebar("agentSkillsSubtitle")}
      />
      {/* Concept card — full width */}
      <SkillsConceptCard variant="agent" />

      {/* Header: coverage + MCP/A2A bar + generate button */}
      <Card padding="sm" className="flex flex-col gap-3">
        {/* Coverage */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
              {t("coverageLabel")}
            </span>
            {showGenerateButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void handleGenerate()}
                disabled={generatingSkills}
                className="gap-1.5 border-primary/30 bg-primary/10 text-xs text-primary hover:bg-primary/15"
                data-testid="generate-button"
              >
                <Icon
                  name={generatingSkills ? "refresh" : "auto_fix_high"}
                  size={14}
                  className={generatingSkills ? "animate-spin" : undefined}
                />
                {generatingSkills ? t("regenerateRunning") : t("generateButton")}
              </Button>
            )}
          </div>
          {coverage ? <CoverageBar coverage={coverage} /> : <CoverageBarSkeleton />}
        </div>

        {/* MCP + A2A links */}
        <McpA2aLinksBar />
      </Card>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="search"
          icon="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("filters.searchPlaceholder")}
          aria-label={t("filters.searchPlaceholder")}
          className="flex-1"
          data-testid="search-input"
        />
        <div className="flex gap-1" role="group" aria-label={t("filters.category")}>
          {(["all", "api", "cli", "config"] as FilterCategory[]).map((cat) => (
            <Button
              key={cat}
              variant="outline"
              size="sm"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              data-testid={`filter-${cat}`}
              className={cn(
                "text-xs",
                filter === cat
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "text-text-muted hover:text-text-main"
              )}
            >
              {cat === "all"
                ? t("filterAll")
                : cat === "api"
                  ? t("categoryApi")
                  : cat === "cli"
                    ? t("categoryCli")
                    : t("categoryConfig")}
            </Button>
          ))}
        </div>
      </div>

      {/* Two-column grid: left = skill cards, right = preview */}
      <div className="grid grid-cols-12 gap-4" data-testid="skills-grid">
        {/* Left: skill cards list (col-span 7) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-2" data-testid="skills-list">
          {loadingCatalog ? (
            Array.from({ length: 6 }).map((_, i) => <SkillCardSkeleton key={i} />)
          ) : filteredSkills.length === 0 ? (
            <EmptyState icon="search_off" title={t("noSkillsFound")} />
          ) : (
            filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                selected={selectedId === skill.id}
                onClick={() => handleSelectCard(skill.id)}
              />
            ))
          )}
        </div>

        {/* Right: preview pane (col-span 5) */}
        <div className="col-span-12 lg:col-span-5" data-testid="preview-column">
          <SkillPreviewPane
            skillId={selectedId}
            markdown={selectedMarkdown}
            loading={loadingPreview}
            onRefresh={selectedId ? handleRefreshPreview : undefined}
          />
        </div>
      </div>
    </div>
  );
}

export default AgentSkillsPageClient;
