"use client";

import { Button, Card, Input } from "@/shared/components";
import type { ProviderDisplayMode } from "../providerPageStorage";
import { CategoryDot } from "./CategoryDot";
import ProviderDisplayModeControl from "./ProviderDisplayModeControl";

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

type SummaryStat = {
  configured: number;
  total: number;
};

export interface ProviderSummaryStats {
  all: SummaryStat;
  free: SummaryStat;
  noauth: SummaryStat;
  oauth: SummaryStat;
  apikey: SummaryStat;
  compatible: SummaryStat;
  webcookie: SummaryStat;
  search: SummaryStat;
  audio: SummaryStat;
  local: SummaryStat;
  upstreamproxy: SummaryStat;
  cloudagent: SummaryStat;
  ide: SummaryStat;
  webfetch: SummaryStat;
}

interface ProviderSummaryCardProps {
  activeCategory: string | null;
  activeServiceKind: string | null;
  onServiceKindChange(kind: string | null): void;
  disabledConfigured: boolean;
  displayMode: ProviderDisplayMode;
  modelSearchQuery: string;
  onBatchTest(mode: string): void;
  onCategoryChange(category: string | null, freeOnly: boolean): void;
  onDisplayModeChange(mode: ProviderDisplayMode): void;
  onNewProvider(): void;
  onImportFromFile(): void;
  searchQuery: string;
  setModelSearchQuery(value: string): void;
  setSearchQuery(value: string): void;
  showFreeOnly: boolean;
  summaryStats: ProviderSummaryStats;
  t: ProviderMessageTranslator;
  tc: ProviderMessageTranslator;
  testingMode: string | null;
}

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

const SERVICE_KIND_CHIPS: Array<{ key: string; icon: string; labelKey: string; fallback: string }> =
  [
    { key: "image", icon: "image", labelKey: "serviceKindImage", fallback: "Image" },
    { key: "video", icon: "videocam", labelKey: "serviceKindVideo", fallback: "Video" },
    { key: "music", icon: "music_note", labelKey: "serviceKindMusic", fallback: "Music" },
    { key: "tts", icon: "record_voice_over", labelKey: "serviceKindTts", fallback: "Text→Speech" },
    { key: "stt", icon: "hearing", labelKey: "serviceKindStt", fallback: "Speech→Text" },
    {
      key: "embedding",
      icon: "scatter_plot",
      labelKey: "serviceKindEmbedding",
      fallback: "Embedding",
    },
  ];

export default function ProviderSummaryCard({
  activeCategory,
  activeServiceKind,
  onServiceKindChange,
  disabledConfigured,
  displayMode,
  modelSearchQuery,
  onBatchTest,
  onCategoryChange,
  onDisplayModeChange,
  onNewProvider,
  onImportFromFile,
  searchQuery,
  setModelSearchQuery,
  setSearchQuery,
  showFreeOnly,
  summaryStats,
  t,
  tc,
  testingMode,
}: ProviderSummaryCardProps) {
  const categories = [
    { key: null, label: t("providerSummaryAll"), stat: summaryStats.all },
    { key: "oauth", label: t("oauthLabel"), stat: summaryStats.oauth },
    {
      key: "ide",
      label: providerText(t, "categoryIde", "IDE"),
      stat: summaryStats.ide,
    },
    {
      key: "free",
      label: t("freeTier"),
      stat: summaryStats.free,
      title: t("freeAggregated"),
    },
    { key: "no-auth", label: t("noAuthLabel"), stat: summaryStats.noauth },
    {
      key: "upstream-proxy",
      label: t("upstreamProxyLabel"),
      stat: summaryStats.upstreamproxy,
    },
    { key: "apikey", label: t("apiKeyLabel"), stat: summaryStats.apikey },
    {
      key: "compatible",
      label: t("compatibleLabel"),
      stat: summaryStats.compatible,
    },
    {
      key: "webcookie",
      label: providerText(t, "categoryWebCookie", "Web Cookie"),
      stat: summaryStats.webcookie,
    },
    {
      key: "search",
      label: providerText(t, "categorySearch", "Search"),
      stat: summaryStats.search,
    },
    {
      key: "webfetch",
      label: t("webFetch"),
      stat: summaryStats.webfetch,
      title: t("webFetchTooltip"),
    },
    {
      key: "audio",
      label: providerText(t, "categoryAudio", "Audio"),
      stat: summaryStats.audio,
    },
    {
      key: "local",
      label: providerText(t, "categoryLocal", "Local"),
      stat: summaryStats.local,
    },
    {
      key: "cloudagent",
      label: providerText(t, "categoryCloudAgent", "Cloud Agent"),
      stat: summaryStats.cloudagent,
    },
  ].filter((category) => category.key !== "no-auth" || category.stat.total > 0);

  return (
    <Card padding="sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[160px]">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchProviders")}
              aria-label={t("searchProviders")}
              icon="search"
              inputClassName={searchQuery ? "pr-9" : ""}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon-sm"
                icon="close"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-text-muted"
                aria-label={tc("clear")}
              />
            )}
          </div>
          <div className="relative flex-1 min-w-[160px]">
            <Input
              value={modelSearchQuery}
              onChange={(e) => setModelSearchQuery(e.target.value)}
              placeholder={providerText(t, "searchByModel", "Search by model…")}
              aria-label={providerText(t, "searchByModelAria", "Search by model")}
              icon="psychology"
              inputClassName={modelSearchQuery ? "pr-9" : ""}
            />
            {modelSearchQuery && (
              <Button
                variant="ghost"
                size="icon-sm"
                icon="close"
                onClick={() => setModelSearchQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-text-muted"
                aria-label={tc("clear")}
              />
            )}
          </div>
          <ProviderDisplayModeControl
            disabledConfigured={disabledConfigured}
            mode={displayMode}
            onChange={onDisplayModeChange}
            t={t}
          />
          <Button size="sm" icon="add" onClick={onNewProvider}>
            {providerText(t, "onboardingWizardShort", "Onboarding Wizard")}
          </Button>
          <Button size="sm" variant="secondary" icon="upload_file" onClick={onImportFromFile}>
            {providerText(t, "importFromFile", "Import from file")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon="play_arrow"
            loading={testingMode === "all"}
            onClick={() => onBatchTest("all")}
            disabled={!!testingMode}
            title={t("testAll")}
          >
            {testingMode === "all" ? t("testing") : t("testAll")}
          </Button>
        </div>

        <div className="border-t border-border pt-3 flex flex-wrap items-center gap-2 [&>button]:grow [&>button]:justify-center sm:[&>button]:grow-0">
          {categories.map((cat) => {
            const isActive =
              (cat.key === null && !activeCategory && !showFreeOnly) ||
              (cat.key === "free" && showFreeOnly) ||
              (cat.key !== "free" &&
                cat.key !== null &&
                !showFreeOnly &&
                activeCategory === cat.key);
            return (
              <Button
                key={cat.key ?? "all"}
                size="sm"
                variant={isActive ? "secondary" : "ghost"}
                aria-pressed={isActive}
                onClick={() => onCategoryChange(cat.key, cat.key === "free")}
                className="gap-1.5"
                title={cat.title || cat.label}
              >
                {cat.key && <CategoryDot category={cat.key} label={cat.label} />}
                <span>{cat.label}</span>
                {/* Full-opacity muted ink: the old opacity-70 "/total" fell to 3.28:1 on the kit
                    button (axe color-contrast, F4). */}
                <span className="text-[11px] text-text-muted">
                  {cat.stat.configured}
                  <span>/{cat.stat.total}</span>
                </span>
              </Button>
            );
          })}
        </div>

        <div className="border-t border-border pt-3 flex flex-wrap items-center gap-2 [&>button]:grow [&>button]:justify-center sm:[&>button]:grow-0">
          <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted mr-1">
            {providerText(t, "filterByMedia", "Media")}
          </span>
          {SERVICE_KIND_CHIPS.map((chip) => {
            const isActive = activeServiceKind === chip.key;
            return (
              <Button
                key={chip.key}
                size="sm"
                variant={isActive ? "secondary" : "ghost"}
                icon={chip.icon}
                onClick={() => onServiceKindChange(isActive ? null : chip.key)}
                aria-pressed={isActive}
                className="gap-1.5"
              >
                <span>{providerText(t, chip.labelKey, chip.fallback)}</span>
              </Button>
            );
          })}
          {activeServiceKind && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onServiceKindChange(null)}
              className="text-text-muted underline-offset-2 hover:underline"
            >
              {providerText(t, "clearMediaFilter", "Clear")}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
