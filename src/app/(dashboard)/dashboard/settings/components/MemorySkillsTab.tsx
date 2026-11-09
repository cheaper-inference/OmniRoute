"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Slider } from "@omniroute/ui-kit/slider";
import { Switch } from "@omniroute/ui-kit/switch";
import { Button, Card, Input, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import type { SkillsProvider } from "@/lib/skills/providerSettings";

interface MemoryConfig {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
}

interface QdrantSettings {
  enabled: boolean;
  host: string;
  port: number;
  collection: string;
  embeddingModel: string;
  hasApiKey: boolean;
  apiKeyMasked: string | null;
}

interface EmbeddingModelOption {
  value: string;
  label: string;
}

const STRATEGIES = [
  { value: "recent", labelKey: "recent", descKey: "recentDesc" },
  { value: "semantic", labelKey: "semantic", descKey: "semanticDesc" },
  { value: "hybrid", labelKey: "hybrid", descKey: "hybridDesc" },
];

export default function MemorySkillsTab() {
  const [config, setConfig] = useState<MemoryConfig>({
    // Off by default (matches DEFAULT_MEMORY_SETTINGS) — memory injects ~maxTokens
    // of billed context per request, so it's opt-in. See PRD-2026-06-19-no-memory-header.
    enabled: false,
    maxTokens: 2000,
    retentionDays: 30,
    strategy: "hybrid",
    skillsEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const [qdrant, setQdrant] = useState<QdrantSettings>({
    enabled: false,
    host: "",
    port: 6333,
    collection: "omniroute_memory",
    embeddingModel: "openai/text-embedding-3-small",
    hasApiKey: false,
    apiKeyMasked: null,
  });
  const [qdrantApiKeyInput, setQdrantApiKeyInput] = useState("");
  const [qdrantSaving, setQdrantSaving] = useState(false);
  const [qdrantStatus, setQdrantStatus] = useState<"" | "saved" | "error">("");
  const [qdrantHealth, setQdrantHealth] = useState<{
    ok: boolean;
    latencyMs: number;
    error?: string;
  } | null>(null);
  const [qdrantChecking, setQdrantChecking] = useState(false);
  const [qdrantQuery, setQdrantQuery] = useState("");
  const [qdrantSearching, setQdrantSearching] = useState(false);
  const [qdrantResults, setQdrantResults] = useState<
    Array<{ id: string; score: number; payload?: Record<string, unknown> }>
  >([]);
  const [qdrantCleanupLoading, setQdrantCleanupLoading] = useState(false);
  const [qdrantCleanupMsg, setQdrantCleanupMsg] = useState("");
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingModelOption[]>([]);
  const [qdrantHelpOpen, setQdrantHelpOpen] = useState(false);

  const [skillsmpApiKey, setSkillsmpApiKey] = useState("");
  const [skillsmpSaving, setSkillsmpSaving] = useState(false);
  const [skillsmpStatus, setSkillsmpStatus] = useState("");
  const [skillsProvider, setSkillsProvider] = useState<SkillsProvider>("skillsmp");
  const [skillsProviderSaving, setSkillsProviderSaving] = useState(false);
  const [skillsProviderStatus, setSkillsProviderStatus] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/memory").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/settings").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/settings/qdrant").then((res) => (res.ok ? res.json() : null)),
      fetch("/api/settings/qdrant/embedding-models").then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([memData, settingsData, qdrantData, embeddingData]) => {
        if (memData) setConfig(memData);
        if (settingsData?.skillsmpApiKey) {
          setSkillsmpApiKey(settingsData.skillsmpApiKey);
        }
        if (qdrantData) {
          setQdrant(qdrantData);
          setQdrantApiKeyInput("");
        }
        if (embeddingData?.models && Array.isArray(embeddingData.models)) {
          setEmbeddingOptions(embeddingData.models);
        }
        if (
          settingsData?.skillsProvider === "skillsmp" ||
          settingsData?.skillsProvider === "skillssh"
        ) {
          setSkillsProvider(settingsData.skillsProvider);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveQdrant = useCallback(
    async (updates: Partial<QdrantSettings> & { apiKey?: string }) => {
      const previous = qdrant;
      const next = { ...qdrant, ...updates };
      setQdrant(next);
      setQdrantSaving(true);
      setQdrantStatus("");
      try {
        const res = await fetch("/api/settings/qdrant", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enabled: next.enabled,
            host: next.host,
            port: next.port,
            collection: next.collection,
            embeddingModel: next.embeddingModel,
            ...(updates.apiKey !== undefined ? { apiKey: updates.apiKey } : {}),
          }),
        });
        if (res.ok) {
          const data = await res.json().catch(() => next);
          setQdrant(data);
          setQdrantApiKeyInput("");
          setQdrantStatus("saved");
          setTimeout(() => setQdrantStatus(""), 2000);
        } else {
          setQdrant(previous);
          setQdrantStatus("error");
        }
      } catch {
        setQdrant(previous);
        setQdrantStatus("error");
      } finally {
        setQdrantSaving(false);
      }
    },
    [qdrant]
  );

  const checkQdrant = useCallback(async () => {
    setQdrantChecking(true);
    try {
      const res = await fetch("/api/settings/qdrant/health");
      if (res.ok) setQdrantHealth(await res.json());
      else setQdrantHealth({ ok: false, latencyMs: 0, error: "HTTP error" });
    } catch (e) {
      setQdrantHealth({
        ok: false,
        latencyMs: 0,
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setQdrantChecking(false);
    }
  }, []);

  const testQdrantSearch = useCallback(async () => {
    const q = qdrantQuery.trim();
    if (!q) return;
    setQdrantSearching(true);
    setQdrantResults([]);
    try {
      const res = await fetch("/api/settings/qdrant/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, topK: 5 }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setQdrantResults(Array.isArray(data.results) ? data.results : []);
      } else {
        setQdrantResults([]);
      }
    } catch {
      setQdrantResults([]);
    } finally {
      setQdrantSearching(false);
    }
  }, [qdrantQuery]);

  const runQdrantCleanup = useCallback(async () => {
    setQdrantCleanupLoading(true);
    setQdrantCleanupMsg("");
    try {
      const res = await fetch("/api/settings/qdrant/cleanup", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setQdrantCleanupMsg(
          t("qdrantCleanupSuccess", {
            count: data.deletedCount ?? 0,
            days: data.retentionDays,
          })
        );
      } else {
        const err = data?.error || t("qdrantCleanupFailed");
        setQdrantCleanupMsg(t("qdrantCleanupError", { error: String(err) }));
      }
    } catch (e) {
      setQdrantCleanupMsg(
        t("qdrantCleanupError", { error: e instanceof Error ? e.message : String(e) })
      );
    } finally {
      setQdrantCleanupLoading(false);
    }
  }, [t]);

  const saveSkillsmpApiKey = useCallback(async () => {
    setSkillsmpSaving(true);
    setSkillsmpStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillsmpApiKey }),
      });
      if (res.ok) {
        setSkillsmpStatus("saved");
        setTimeout(() => setSkillsmpStatus(""), 2000);
      } else {
        setSkillsmpStatus("error");
      }
    } catch {
      setSkillsmpStatus("error");
    } finally {
      setSkillsmpSaving(false);
    }
  }, [skillsmpApiKey]);

  const saveSkillsProvider = useCallback(async (provider: SkillsProvider) => {
    setSkillsProvider(provider);
    setSkillsProviderSaving(true);
    setSkillsProviderStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillsProvider: provider }),
      });
      if (res.ok) {
        setSkillsProviderStatus("saved");
        setTimeout(() => setSkillsProviderStatus(""), 2000);
      } else {
        setSkillsProviderStatus("error");
      }
    } catch {
      setSkillsProviderStatus("error");
    } finally {
      setSkillsProviderSaving(false);
    }
  }, []);

  const save = async (updates: Partial<MemoryConfig>) => {
    const previousConfig = config;
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings/memory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        const savedConfig = await res.json().catch(() => newConfig);
        setConfig(savedConfig);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setConfig(previousConfig);
        setStatus("error");
      }
    } catch {
      setConfig(previousConfig);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card data-testid="memory-settings-card">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="psychology" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memorySkillsTitle")}</h3>
            <p className="text-sm text-text-muted">{t("memorySkillsDesc")}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-text-muted">{t("loading")}...</div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Memory Settings */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="memory" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memoryTitle")}</h3>
            <p className="text-sm text-text-muted">{t("memoryDesc")}</p>
          </div>
          {status === "saved" && (
            <span className="ml-auto text-xs font-medium text-success flex items-center gap-1">
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
        </div>

        {/* Enable toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div>
            <p className="text-sm font-medium">{t("memoryEnabled")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("memoryEnabledDesc")}</p>
          </div>
          <Switch
            data-testid="memory-enabled-switch"
            checked={config.enabled}
            onCheckedChange={() => save({ enabled: !config.enabled })}
            disabled={saving}
            aria-checked={config.enabled}
            aria-label={t("memoryEnabled")}
          />
        </div>

        {/* Token-cost warning — memory injection is billed (PRD-2026-06-19) */}
        {config.enabled && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30 mb-4 text-warning"
            role="note"
            data-testid="memory-token-cost-warning"
          >
            <Icon name="info" size={18} className="leading-none mt-0.5" />
            <p className="text-xs leading-relaxed">
              {t("memoryTokenCostWarning", { tokens: config.maxTokens.toLocaleString() })}
            </p>
          </div>
        )}

        {/* Memory config fields */}
        {config.enabled && (
          <>
            {/* Max tokens */}
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
              <Slider
                data-testid="memory-max-tokens-slider"
                label={t("maxTokens")}
                min={0}
                max={16000}
                step={500}
                value={config.maxTokens}
                onValueChange={(value) => save({ maxTokens: value })}
                formatValue={(value) => `${value.toLocaleString()} ${t("tokens")}`}
                presetsLabel={t("maxTokens")}
                presets={[
                  { value: 0, label: t("off") },
                  { value: 4000, label: "4K" },
                  { value: 8000, label: "8K" },
                  { value: 16000, label: "16K" },
                ]}
              />
            </div>

            {/* Retention days */}
            <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
              <Slider
                data-testid="memory-retention-slider"
                label={t("retentionDays")}
                min={1}
                max={90}
                step={1}
                value={config.retentionDays}
                onValueChange={(value) => save({ retentionDays: value })}
                formatValue={(value) => `${value} ${t("days")}`}
                presetsLabel={t("retentionDays")}
                presets={[
                  { value: 1, label: "1" },
                  { value: 30, label: "30" },
                  { value: 60, label: "60" },
                  { value: 90, label: "90" },
                ]}
              />
            </div>

            {/* Strategy selector */}
            <RadioGroup
              aria-label={t("strategy")}
              orientation="horizontal"
              value={config.strategy}
              onValueChange={(next) => save({ strategy: next as "recent" | "semantic" | "hybrid" })}
              disabled={loading || saving}
            >
              {STRATEGIES.map((s) => (
                <RadioGroupItem
                  data-testid={`memory-strategy-${s.value}`}
                  key={s.value}
                  card
                  value={s.value}
                  label={t(s.labelKey)}
                  description={t(s.descKey)}
                />
              ))}
            </RadioGroup>
          </>
        )}
      </Card>

      {/* Qdrant (optional semantic memory index) */}
      <Card data-testid="qdrant-settings-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="database" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("qdrantTitle")}</h3>
            <p className="text-sm text-text-muted">{t("qdrantDesc")}</p>
          </div>

          <span
            className={`ml-auto inline-flex items-center gap-2 text-xs font-medium ${
              qdrant.enabled
                ? qdrantHealth?.ok
                  ? "text-success"
                  : "text-error"
                : "text-text-muted"
            }`}
          >
            <span
              className={`inline-block w-2.5 h-2.5 rounded-full ${
                qdrant.enabled ? (qdrantHealth?.ok ? "bg-success" : "bg-error") : "bg-border"
              }`}
              aria-hidden="true"
            />
            {qdrant.enabled
              ? qdrantHealth?.ok
                ? t("qdrantStatusActive")
                : t("qdrantStatusError")
              : t("qdrantStatusDisabled")}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <div>
            <p className="text-sm font-medium">{t("qdrantEnable")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("qdrantEnableDesc")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={checkQdrant}
              disabled={qdrantChecking || qdrantSaving}
            >
              {qdrantChecking ? t("qdrantTesting") : t("qdrantTestConnection")}
            </Button>
            <Switch
              data-testid="qdrant-enabled-switch"
              checked={qdrant.enabled}
              onCheckedChange={() => saveQdrant({ enabled: !qdrant.enabled })}
              disabled={qdrantSaving}
              aria-checked={qdrant.enabled}
              aria-label={t("qdrantEnable")}
            />
          </div>
        </div>

        {qdrantStatus === "saved" && (
          <div className="mb-4 text-xs font-medium text-success flex items-center gap-1">
            <Icon name="check_circle" size={14} /> {t("qdrantSaved")}
          </div>
        )}
        {qdrantStatus === "error" && (
          <div className="mb-4 text-xs font-medium text-error">{t("qdrantSaveError")}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <Input
              label={t("qdrantHost")}
              hint={t("qdrantHostHint")}
              value={qdrant.host}
              onChange={(e) => setQdrant((s) => ({ ...s, host: e.target.value }))}
              placeholder="http://127.0.0.1"
              inputClassName="font-mono"
            />
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <Input
              label={t("qdrantPort")}
              hint={t("qdrantPortHint")}
              value={qdrant.port}
              onChange={(e) =>
                setQdrant((s) => ({
                  ...s,
                  port: Math.max(1, Math.min(65535, Number(e.target.value) || 0)),
                }))
              }
              placeholder="6333"
              inputClassName="font-mono"
            />
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <Input
              label={t("qdrantCollection")}
              hint={t("qdrantCollectionHint")}
              value={qdrant.collection}
              onChange={(e) => setQdrant((s) => ({ ...s, collection: e.target.value }))}
              placeholder="omniroute_memory"
              inputClassName="font-mono"
            />
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">{t("qdrantEmbeddingModel")}</p>
              <Button
                variant="ghost"
                size="icon-sm"
                icon="help"
                onClick={() => setQdrantHelpOpen((v) => !v)}
                aria-expanded={qdrantHelpOpen}
                title={t("qdrantHelpTitle")}
                aria-label={t("qdrantHelpTitle")}
              />
            </div>
            {qdrantHelpOpen && (
              <div className="mb-3 p-3 rounded-lg bg-bg-subtle border border-border/60 text-xs text-text-muted leading-relaxed">
                <p className="font-medium text-text-main mb-1">{t("qdrantHelpQuickTitle")}</p>
                <p>{t("qdrantHelpStep1")}</p>
                <p>{t("qdrantHelpStep2")}</p>
                <p>{t("qdrantHelpStep3")}</p>
                <p>{t("qdrantHelpStep4")}</p>
              </div>
            )}
            <Select
              aria-label={t("qdrantEmbeddingQuickSelect")}
              value=""
              placeholder={t("qdrantEmbeddingQuickSelect")}
              onChange={(e) => {
                const value = e.target.value;
                if (value) setQdrant((s) => ({ ...s, embeddingModel: value }));
              }}
              options={embeddingOptions.map((opt) => ({ value: opt.value, label: opt.value }))}
              className="mb-2"
            />
            <Input
              aria-label={t("qdrantEmbeddingModel")}
              hint={t("qdrantEmbeddingHint")}
              value={qdrant.embeddingModel}
              onChange={(e) => setQdrant((s) => ({ ...s, embeddingModel: e.target.value }))}
              placeholder={t("qdrantEmbeddingInputPlaceholder")}
              inputClassName="font-mono"
            />
          </div>

          <div className="p-4 rounded-lg bg-surface/30 border border-border/30 md:col-span-2">
            <div className="flex items-end gap-2">
              <Input
                type="password"
                label={
                  <>
                    API Key ({t("optional")}){" "}
                    {qdrant.hasApiKey && qdrant.apiKeyMasked ? (
                      <span className="text-xs text-text-muted font-mono">
                        {t("current")}: {qdrant.apiKeyMasked}
                      </span>
                    ) : null}
                  </>
                }
                value={qdrantApiKeyInput}
                onChange={(e) => setQdrantApiKeyInput(e.target.value)}
                placeholder={
                  qdrant.hasApiKey
                    ? t("qdrantApiKeyPlaceholderKeep")
                    : t("qdrantApiKeyPlaceholderOptional")
                }
                className="flex-1"
                inputClassName="font-mono"
              />
              {qdrant.hasApiKey && (
                <Button
                  variant="outline"
                  onClick={() => saveQdrant({ apiKey: "" })}
                  disabled={qdrantSaving}
                >
                  {t("remove")}
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() =>
                  saveQdrant(
                    qdrantApiKeyInput.trim().length > 0 ? { apiKey: qdrantApiKeyInput } : {}
                  )
                }
                disabled={qdrantSaving}
              >
                {qdrantSaving ? t("saving") : t("save")}
              </Button>
            </div>
            <p className="text-xs text-text-muted mt-2">{t("qdrantSaveHint")}</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-surface/30 border border-border/30">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{t("qdrantSearchTestTitle")}</p>
              <p className="text-xs text-text-muted mt-0.5">{t("qdrantSearchTestDesc")}</p>
            </div>
            <Button variant="outline" onClick={testQdrantSearch} disabled={qdrantSearching}>
              {qdrantSearching ? t("searching") : t("search")}
            </Button>
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              aria-label={t("qdrantSearchTestTitle")}
              value={qdrantQuery}
              onChange={(e) => setQdrantQuery(e.target.value)}
              placeholder={t("qdrantSearchPlaceholder")}
              className="flex-1"
            />
          </div>
          {qdrantResults.length > 0 && (
            <div className="mt-3 space-y-2">
              {qdrantResults.map((r) => (
                <div key={r.id} className="p-3 rounded-lg bg-bg/40 border border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-text-muted">{r.id}</span>
                    <span className="text-xs font-mono text-success">
                      score {r.score.toFixed(4)}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    {(r.payload?.key as string) ? `key: ${String(r.payload?.key)}` : null}
                  </div>
                </div>
              ))}
            </div>
          )}
          {qdrantResults.length === 0 && qdrantQuery.trim().length > 0 && !qdrantSearching && (
            <p className="mt-3 text-xs text-text-muted">{t("qdrantNoResults")}</p>
          )}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-surface/30 border border-border/30">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{t("qdrantCleanupTitle")}</p>
              <p className="text-xs text-text-muted mt-0.5">
                {t("qdrantCleanupDesc")} {t("retentionDays")} ({config.retentionDays} {t("days")}).
              </p>
            </div>
            <Button variant="outline" onClick={runQdrantCleanup} disabled={qdrantCleanupLoading}>
              {qdrantCleanupLoading ? t("cleaning") : t("cleanNow")}
            </Button>
          </div>
          {qdrantCleanupMsg && <p className="mt-2 text-xs text-text-muted">{qdrantCleanupMsg}</p>}
        </div>
      </Card>

      {/* Skills Settings */}
      <Card data-testid="skills-settings-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="handyman" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("skillsTitle")}</h3>
            <p className="text-sm text-text-muted">{t("skillsDesc")}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30">
          <div>
            <p className="text-sm font-medium">{t("skillsEnabled")}</p>
            <p className="text-xs text-text-muted mt-0.5">{t("skillsEnabledDesc")}</p>
          </div>
          <Switch
            data-testid="skills-enabled-switch"
            checked={config.skillsEnabled}
            onCheckedChange={() => save({ skillsEnabled: !config.skillsEnabled })}
            disabled={saving}
            aria-checked={config.skillsEnabled}
            aria-label={t("skillsEnabled")}
          />
        </div>
      </Card>

      {/* SkillsMP Marketplace API Key */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="storefront" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memorySkillsSkillsmpMarketplace")}</h3>
            <p className="text-sm text-text-muted">{t("memorySkillsSkillsmpDescription")}</p>
          </div>
          {skillsmpStatus === "saved" && (
            <span className="ml-auto text-xs font-medium text-success flex items-center gap-1">
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
          {skillsmpStatus === "error" && (
            <span className="ml-auto text-xs font-medium text-error">
              {t("memorySkillsFailedToSave")}
            </span>
          )}
        </div>

        <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
          <div className="flex items-end gap-2">
            <Input
              type="password"
              label={t("memorySkillsApiKey")}
              value={skillsmpApiKey}
              onChange={(e) => setSkillsmpApiKey(e.target.value)}
              placeholder="sk_live_..."
              className="flex-1"
              inputClassName="font-mono"
            />
            <Button variant="primary" onClick={saveSkillsmpApiKey} disabled={skillsmpSaving}>
              {skillsmpSaving ? t("saving") : t("save")}
            </Button>
          </div>
          <p className="text-xs text-text-muted mt-2">
            {t("skillsmpApiKeyHintBefore")} <span className="text-primary">skillsmp.com</span>
            {t("skillsmpApiKeyHintAfter", { limit: 500 })}
          </p>
        </div>
      </Card>

      {/* Active Skills Provider */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
            <Icon name="hub" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("memorySkillsActiveSkillsProvider")}</h3>
            <p className="text-sm text-text-muted">{t("memorySkillsActiveProviderDescription")}</p>
          </div>
          {skillsProviderStatus === "saved" && (
            <span className="ml-auto text-xs font-medium text-success flex items-center gap-1">
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
          {skillsProviderStatus === "error" && (
            <span className="ml-auto text-xs font-medium text-error">
              {t("memorySkillsFailedToSave")}
            </span>
          )}
        </div>

        <RadioGroup
          aria-label={t("memorySkillsActiveSkillsProvider")}
          orientation="horizontal"
          value={skillsProvider}
          onValueChange={(next) => saveSkillsProvider(next as SkillsProvider)}
          disabled={skillsProviderSaving}
        >
          <RadioGroupItem
            card
            value="skillsmp"
            label={t("memorySkillsSkillsmpProviderTitle")}
            description={t("memorySkillsSkillsmpProviderDescription")}
          />
          <RadioGroupItem
            card
            value="skillssh"
            label={t("memorySkillsSkillsshProviderTitle")}
            description={t("memorySkillsSkillsshProviderDescription")}
          />
        </RadioGroup>
      </Card>
    </div>
  );
}
