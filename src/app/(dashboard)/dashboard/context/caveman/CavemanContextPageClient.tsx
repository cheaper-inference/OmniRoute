"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader, SectionHeader } from "@omniroute/ui-kit/page-header";
import { SegmentedControl } from "@/shared/components";
import Card from "@/shared/components/Card";
import Checkbox from "@/shared/components/Checkbox";
import Select from "@/shared/components/Select";
import Icon from "@/shared/components/Icon";
import CompressionSettingsTab from "@/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab";
import { outputStyleLanguages } from "../../../../../../open-sse/services/compression/outputStyles/catalog.ts";
import {
  buildOutputStylesInstruction,
  resolveOutputStyleLanguage,
} from "../../../../../../open-sse/services/compression/outputStyles/apply.ts";
import { resolveOutputStyleSelection } from "../../../../../../open-sse/services/compression/outputStyles/backCompat.ts";

type AnalyticsSummary = {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  avgDurationMs: number;
  byEngine?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
  byMode?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
  last24h?: Array<{ hour: string; count: number; tokensSaved: number }>;
};

type LanguageConfig = {
  enabled: boolean;
  defaultLanguage: string;
  autoDetect: boolean;
  enabledPacks: string[];
};

type OutputModeConfig = {
  enabled: boolean;
  intensity: "lite" | "full" | "ultra";
  autoClarity: boolean;
};

type InputModeConfig = {
  enabled: boolean;
  intensity: "lite" | "full" | "ultra";
};

type CompressionSettings = {
  enabled?: boolean;
  languageConfig?: LanguageConfig;
  cavemanOutputMode?: OutputModeConfig;
  cavemanConfig?: InputModeConfig & Record<string, unknown>;
};

// What a save sends. The store merges a partial cavemanOutputMode into its row.
type SettingsPatch = {
  languageConfig?: LanguageConfig;
  cavemanOutputMode?: Partial<OutputModeConfig>;
};

type LanguagePack = { language: string; ruleCount: number; categories?: string[] };

function formatNumber(value: number | undefined): string {
  return new Intl.NumberFormat().format(value ?? 0);
}

export default function CavemanContextPageClient() {
  const t = useTranslations("contextCaveman");
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [settings, setSettings] = useState<CompressionSettings | null>(null);
  const [languagePacks, setLanguagePacks] = useState<LanguagePack[]>([]);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"simple" | "advanced">("simple");

  const refreshSettings = () => {
    fetch("/api/context/caveman/config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSettings(data))
      .catch(() => setSettings(null));
  };

  useEffect(() => {
    fetch("/api/context/analytics?since=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAnalytics(data))
      .catch(() => setAnalytics(null));
    fetch("/api/compression/language-packs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setLanguagePacks(Array.isArray(data?.packs) ? data.packs : []))
      .catch(() => setLanguagePacks([]));
    refreshSettings();
  }, []);

  const languageConfig: LanguageConfig = settings?.languageConfig ?? {
    enabled: false,
    defaultLanguage: "en",
    autoDetect: true,
    enabledPacks: ["en"],
  };
  const outputMode: OutputModeConfig = settings?.cavemanOutputMode ?? {
    enabled: false,
    intensity: "lite",
    autoClarity: true,
  };
  const masterEnabled = settings?.enabled ?? false;

  // A save sends the keys it names. The store merges a partial cavemanOutputMode into its row
  // but replaces languageConfig whole, so a language save is built from the server's current
  // row, not this page's copy, and a change saved elsewhere since the page loaded is not
  // written back. A built save with no row sends nothing.
  const saveSettings = async (
    patch: SettingsPatch | ((current: CompressionSettings) => SettingsPatch)
  ) => {
    setSaving(true);
    try {
      let body: SettingsPatch;
      if (typeof patch === "function") {
        const current: CompressionSettings | null = await fetch("/api/context/caveman/config")
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null);
        if (!current) return;
        body = patch(current);
      } else {
        body = patch;
      }
      const res = await fetch("/api/context/caveman/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) setSettings(await res.json());
    } finally {
      setSaving(false);
    }
  };

  const updateLanguageConfig = (patch: Partial<LanguageConfig>) => {
    saveSettings((current) => ({ languageConfig: { ...current.languageConfig, ...patch } }));
  };

  const updateOutputMode = (patch: Partial<OutputModeConfig>) => {
    saveSettings({ cavemanOutputMode: patch });
  };

  const togglePack = (language: string, enabled: boolean) => {
    saveSettings((current) => {
      const packs = current.languageConfig?.enabledPacks ?? [];
      const enabledPacks = enabled
        ? [...new Set([...packs, language])]
        : packs.filter((pack) => pack !== language);
      return { languageConfig: { ...current.languageConfig, enabledPacks } };
    });
  };

  const cavemanStats = analytics?.byEngine?.caveman ?? analytics?.byEngine?.standard;
  const modeBreakdown = useMemo(() => Object.entries(analytics?.byMode ?? {}), [analytics]);
  const statCards = [
    [t("requests"), formatNumber(cavemanStats?.count ?? analytics?.totalRequests)],
    [t("tokensSaved"), formatNumber(cavemanStats?.tokensSaved ?? analytics?.totalTokensSaved)],
    [t("savingsPercent"), `${cavemanStats?.avgSavingsPct ?? analytics?.avgSavingsPct ?? 0}%`],
    [t("avgLatency"), `${analytics?.avgDurationMs ?? 0}ms`],
  ];
  // The block requests carry while output mode is on, built by the injector itself.
  // An empty body gives auto-detect nothing to read, so it shows the fallback language.
  const previewPrompt = buildOutputStylesInstruction(
    resolveOutputStyleSelection({ cavemanOutputMode: { ...outputMode, enabled: true } }),
    resolveOutputStyleLanguage(languageConfig, {})
  );

  // Rule packs drive the input engines; output styles can instruct in more
  // languages (e.g. vi has no pack). The default-language selector offers both.
  const languageOptions = [
    ...new Set([...languagePacks.map((pack) => pack.language), ...outputStyleLanguages()]),
  ].sort();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <PageHeader
        compact
        title={
          <span className="flex items-center gap-3">
            <Icon name="compress" size={30} className="text-primary" />
            {t("title")}
          </span>
        }
        description={t("description")}
        actions={
          <SegmentedControl
            aria-label={t("viewMode")}
            value={viewMode}
            onChange={(v) => setViewMode(v as "simple" | "advanced")}
            options={[
              { value: "simple", label: t("simpleMode") || "Simple" },
              { value: "advanced", label: t("advancedMode") || "Advanced" },
            ]}
          />
        }
      />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        {statCards.map(([label, value]) => (
          <Card key={label} padding="sm">
            <p className="text-xs uppercase text-text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
          </Card>
        ))}
      </section>

      <Card padding="sm">
        <SectionHeader title={t("languagePacks")} description={t("languagePacksDesc")} />
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-main">
          <Checkbox
            label={t("enabled")}
            checked={languageConfig.enabled}
            disabled={saving}
            onChange={(event) => updateLanguageConfig({ enabled: event.target.checked })}
          />
          <Checkbox
            label={t("autoDetect")}
            checked={languageConfig.autoDetect}
            disabled={saving}
            onChange={(event) => updateLanguageConfig({ autoDetect: event.target.checked })}
          />
          <Select
            aria-label={t("defaultLanguage")}
            value={languageConfig.defaultLanguage}
            disabled={saving || languageConfig.autoDetect}
            onChange={(event) => updateLanguageConfig({ defaultLanguage: event.target.value })}
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {languagePacks.map((pack) => (
            <Checkbox
              key={pack.language}
              className="justify-between rounded-lg border border-border bg-bg p-3 text-sm text-text-main"
              label={`${pack.language} - ${t("rulesCount", { count: pack.ruleCount })}`}
              checked={languageConfig.enabledPacks.includes(pack.language)}
              disabled={saving || pack.language === "en"}
              onChange={(event) => togglePack(pack.language, event.target.checked)}
            />
          ))}
        </div>
      </Card>

      {!masterEnabled && (
        <Alert
          variant="warning"
          icon={<Icon name="info" size={18} />}
          className="[&>.ci-alert__dismiss]:hidden"
          description={t("masterDisabledWarning")}
        />
      )}

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card padding="sm">
          <SectionHeader title={t("analyticsTitle")} />
          <div className="mt-3 space-y-2 text-sm text-text-main">
            {modeBreakdown.length === 0 ? (
              <p className="text-text-muted">{t("noAnalytics")}</p>
            ) : (
              modeBreakdown.map(([mode, stats]) => (
                <div key={mode} className="flex items-center justify-between gap-3">
                  <span>{mode}</span>
                  <span className="font-mono text-xs text-text-muted">
                    {formatNumber(stats.tokensSaved)} / {stats.avgSavingsPct}%
                  </span>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card padding="sm">
          <SectionHeader title={t("outputModeTitle")} description={t("outputModeDesc")} />
          {/* On/off + intensity for caveman output mode live in the panel
              (/dashboard/context/settings). This page keeps the detailed knobs only. */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-main">
            <Checkbox
              label={t("autoClarity")}
              checked={outputMode.autoClarity}
              disabled={saving}
              onChange={(event) => updateOutputMode({ autoClarity: event.target.checked })}
            />
          </div>
          <pre
            // Scrollable region: keyboard users must be able to focus it (axe scrollable-region-focusable).
            tabIndex={0}
            aria-label={t("outputModeTitle")}
            className="mt-3 overflow-auto rounded-lg border border-border bg-bg p-3 text-xs text-text-main"
          >
            {previewPrompt}
          </pre>
          <p className="mt-3 text-xs text-text-muted">
            {t("bypassConditions")}: {t("bypassConditionsList")}
          </p>
        </Card>
      </section>

      {viewMode === "advanced" && <CompressionSettingsTab />}
    </div>
  );
}
