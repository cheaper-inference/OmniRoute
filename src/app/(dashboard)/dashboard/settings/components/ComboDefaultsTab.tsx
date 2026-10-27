"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Input, ModelSelectField, Select, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { matchesSearch } from "@/shared/utils/turkishText";
import FusionDefaultsFields from "./FusionDefaultsFields";
import {
  ROUTING_STRATEGIES,
  SETTINGS_FALLBACK_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { useTranslations } from "next-intl";

const STRATEGY_LABEL_FALLBACKS: Record<string, string> = {
  "context-relay": "Context Relay",
};

const LEGACY_COMBO_RESILIENCE_KEYS = new Set([
  "timeoutMs",
  "healthCheckEnabled",
  "healthCheckTimeoutMs",
]);
const ACCOUNT_FALLBACK_STRATEGIES = new Set<string>(SETTINGS_FALLBACK_STRATEGY_VALUES);
const MS_PER_SECOND = 1000;

function msToSeconds(value: unknown): number {
  const ms = Number(value);
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  return Math.round(ms / MS_PER_SECOND);
}

function msToOptionalSecondsInput(value: unknown): string {
  const ms = Number(value);
  if (!Number.isFinite(ms) || ms <= 0) return "";
  return String(Math.round(ms / MS_PER_SECOND));
}

function secondsInputToMs(value: string, maxSeconds: number): number {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return 0;
  return Math.min(maxSeconds, Math.round(seconds)) * MS_PER_SECOND;
}

function secondsInputToOptionalMs(value: string, maxSeconds = 86400): number | undefined {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) return undefined;
  return Math.min(maxSeconds, Math.round(seconds)) * MS_PER_SECOND;
}

function translateOrFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
): string {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

function sanitizeComboRuntimeConfig(config?: Record<string, any> | null) {
  if (!config || typeof config !== "object") return {};
  return Object.fromEntries(
    Object.entries(config).filter(
      ([key, value]) =>
        value !== undefined && value !== null && !LEGACY_COMBO_RESILIENCE_KEYS.has(key)
    )
  );
}

function sanitizeProviderOverrides(overrides?: Record<string, any> | null) {
  if (!overrides || typeof overrides !== "object") return {};
  return Object.fromEntries(
    Object.entries(overrides).map(([providerId, config]) => [
      providerId,
      sanitizeComboRuntimeConfig(config),
    ])
  );
}

function toGlobalRoutingPatch(strategy: string | undefined, stickyRoundRobinLimit?: number) {
  const patch: Record<string, unknown> = {};
  if (strategy && ACCOUNT_FALLBACK_STRATEGIES.has(strategy)) {
    patch.fallbackStrategy = strategy;
  }
  if (strategy === "round-robin" && stickyRoundRobinLimit !== undefined) {
    patch.stickyRoundRobinLimit = stickyRoundRobinLimit;
  }
  return patch;
}

export default function ComboDefaultsTab() {
  const [comboDefaults, setComboDefaults] = useState<any>({
    strategy: "priority",
    maxRetries: 1,
    retryDelayMs: 2000,
    maxComboDepth: 3,
    trackMetrics: true,
    reasoningTokenBufferEnabled: true,
    handoffThreshold: 0.85,
    handoffModel: "",
    maxMessagesForSummary: 30,
    stickyRoundRobinLimit: 3,
    disableSessionStickiness: false,
    resetAwareQuotaCacheTtlMs: 0,
    resetAwareQuotaCacheMaxStaleMs: 0,
    zeroLatencyOptimizationsEnabled: false,
  });
  const [sessionAffinityTtlMs, setSessionAffinityTtlMs] = useState(0);
  const [promptCacheAffinityEnabled, setPromptCacheAffinityEnabled] = useState(true);
  const [providerOverrides, setProviderOverrides] = useState<any>({});
  const [availableProviders, setAvailableProviders] = useState<{ id: string; provider: string }[]>(
    []
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const strategyOptions = ROUTING_STRATEGIES.map((strategy) => ({
    value: strategy.value,
    label: translateOrFallback(
      t,
      strategy.labelKey,
      STRATEGY_LABEL_FALLBACKS[strategy.value] || strategy.value
    ),
    icon: strategy.icon,
  }));
  const numericSettings = [
    { key: "maxRetries", label: t("maxRetriesLabel"), min: 0, max: 5 },
    { key: "retryDelayMs", label: t("retryDelayLabel"), min: 500, max: 10000, step: 500 },
    { key: "maxComboDepth", label: t("maxNestingDepth"), min: 1, max: 10 },
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/settings/combo-defaults").then((res) => res.json()),
      fetch("/api/settings").then((res) => res.json()),
      fetch("/api/providers")
        .then((res) => res.json())
        .then((providers: any[]) => {
          // Filter: include a provider only if at least one of its connections is active.
          // Disabled providers (all connections inactive) are excluded.
          const byProvider = new Map<string, any[]>();
          for (const p of providers) {
            if (!p.provider) continue;
            const list = byProvider.get(p.provider) || [];
            list.push(p);
            byProvider.set(p.provider, list);
          }
          const activeProviders = Array.from(byProvider.entries())
            .filter(([, conns]) => conns.some((c) => c.isActive !== false))
            .map(([name]) => name)
            .sort();
          setAvailableProviders(activeProviders.map((p) => ({ id: p, provider: p })));
        })
        .catch(() => {
          /* providers fetch is non-critical */
        }),
    ])
      .then(([comboData, settingsData]) => {
        setComboDefaults((prev) => ({
          ...prev,
          ...sanitizeComboRuntimeConfig(comboData.comboDefaults),
          strategy:
            comboData.comboDefaults?.strategy ?? settingsData.fallbackStrategy ?? prev.strategy,
          stickyRoundRobinLimit:
            settingsData.stickyRoundRobinLimit ??
            comboData.comboDefaults?.stickyRoundRobinLimit ??
            prev.stickyRoundRobinLimit,
          disableSessionStickiness:
            settingsData.disableSessionStickiness ??
            comboData.comboDefaults?.disableSessionStickiness ??
            prev.disableSessionStickiness,
        }));
        if (comboData.providerOverrides) {
          setProviderOverrides(sanitizeProviderOverrides(comboData.providerOverrides));
        }
        setSessionAffinityTtlMs(
          Number.isFinite(Number(settingsData.sessionAffinityTtlMs))
            ? Number(settingsData.sessionAffinityTtlMs)
            : 0
        );
        setPromptCacheAffinityEnabled(settingsData.promptCacheAffinityEnabled !== false);
      })
      .catch((err) => console.error("Failed to fetch combo defaults:", err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const syncGlobalRoutingSettings = async (patch: Record<string, unknown>) => {
    if (Object.keys(patch).length === 0) return;

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (!res.ok) {
      throw new Error("Failed to sync global routing settings");
    }
  };

  const saveComboDefaults = async () => {
    setSaving(true);
    try {
      const { stickyRoundRobinLimit, disableSessionStickiness, ...comboDefaultsPayload } =
        comboDefaults;
      const settingsPatch = {
        ...toGlobalRoutingPatch(comboDefaults.strategy, stickyRoundRobinLimit),
        sessionAffinityTtlMs,
        // #6168: global session-stickiness opt-out — persisted top-level on settings
        // (mirrors stickyRoundRobinLimit) so combo.ts resolution reads settings.disableSessionStickiness.
        disableSessionStickiness: disableSessionStickiness === true,
        promptCacheAffinityEnabled,
      };

      const comboDefaultsRes = await fetch("/api/settings/combo-defaults", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comboDefaults: sanitizeComboRuntimeConfig(comboDefaultsPayload),
          providerOverrides: sanitizeProviderOverrides(providerOverrides),
        }),
      });

      if (!comboDefaultsRes.ok) {
        throw new Error("Failed to save combo defaults");
      }

      await syncGlobalRoutingSettings(settingsPatch);
      showStatus("success", t("savedSuccessfully"));
    } catch (err) {
      console.error("Failed to save combo defaults:", err);
      showStatus("error", t("errorOccurred"));
    } finally {
      setSaving(false);
    }
  };

  const addProviderOverride = (name: string) => {
    const trimmed = name.trim().toLowerCase();
    if (!trimmed || providerOverrides[trimmed]) return;
    setProviderOverrides((prev) => ({ ...prev, [trimmed]: { maxRetries: 1 } }));
    setDropdownOpen(false);
    setSearchQuery("");
    setHighlightedIdx(0);
  };

  const removeProviderOverride = (provider: string) => {
    setProviderOverrides((prev) => {
      const copy = { ...prev };
      delete copy[provider];
      return copy;
    });
  };

  // Reorder a provider override by rebuilding the object in the new order.
  // direction: -1 = move up, +1 = move down
  const moveProviderOverride = (provider: string, direction: -1 | 1) => {
    setProviderOverrides((prev) => {
      const keys = Object.keys(prev);
      const idx = keys.indexOf(provider);
      if (idx < 0) return prev;
      const target = idx + direction;
      if (target < 0 || target >= keys.length) return prev;
      // Swap positions
      [keys[idx], keys[target]] = [keys[target], keys[idx]];
      // Rebuild object in new order
      const reordered: Record<string, any> = {};
      for (const k of keys) {
        reordered[k] = prev[k];
      }
      return reordered;
    });
  };

  // Filtered provider list — excludes already-added ones, filtered by search query
  const filteredProviders = availableProviders.filter(
    (p) => !providerOverrides[p.provider] && matchesSearch(p.provider, searchQuery)
  );

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIdx((prev) => Math.min(prev + 1, filteredProviders.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIdx((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredProviders[highlightedIdx]) {
          addProviderOverride(filteredProviders[highlightedIdx].provider);
        }
        break;
      case "Escape":
        e.preventDefault();
        setDropdownOpen(false);
        break;
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="tune" size={20} />
        </div>
        <h3 className="text-lg font-semibold">
          {translateOrFallback(t, "comboDefaultsTitle", "Default Routing & Combo Settings")}
        </h3>
        <span className="text-xs text-text-muted ml-auto">{t("globalComboConfig")}</span>
        {status.message && (
          <span
            className={`text-xs font-medium ml-2 ${
              status.type === "success" ? "text-success" : "text-error"
            }`}
          >
            {status.message}
          </span>
        )}
      </div>
      <div className="mb-4 rounded-lg border border-info/20 bg-info/5 p-3">
        <p className="text-xs font-medium text-info">
          {translateOrFallback(t, "routingAdvancedGuideTitle", "Advanced routing guidance")}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {translateOrFallback(
            t,
            "routingAdvancedGuideHint1",
            "This strategy is synced to both new combo defaults and global account fallback routing."
          )}
        </p>
        <p className="text-xs text-text-muted">
          {translateOrFallback(
            t,
            "routingAdvancedGuideHint2",
            "Use Fill First for predictable account priority, Round Robin plus Sticky Limit for account batches, and P2C for latency resilience."
          )}
        </p>
      </div>
      <div className="mb-4 rounded-lg border border-warning/20 bg-warning/5 p-3">
        <p className="text-xs font-medium text-warning">{t("comboDefaultsGuideTitle")}</p>
        <p className="text-xs text-text-muted mt-1">{t("comboDefaultsGuideHint1")}</p>
        <p className="text-xs text-text-muted">{t("comboDefaultsGuideHint2")}</p>
      </div>
      <div className="flex flex-col gap-4">
        {/* Default Strategy */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">{t("defaultStrategy")}</p>
            <p className="text-xs text-text-muted">{t("defaultStrategyDesc")}</p>
          </div>
          <Select
            aria-label={t("comboStrategyAria")}
            value={comboDefaults.strategy}
            onChange={(event) => {
              const value = event.target.value;
              setComboDefaults((prev) => ({ ...prev, strategy: value }));
              void syncGlobalRoutingSettings(toGlobalRoutingPatch(value)).catch((error) => {
                console.error("Failed to sync fallback strategy:", error);
                showStatus("error", t("errorOccurred"));
              });
            }}
            options={strategyOptions.map((s) => ({ value: s.value, label: s.label }))}
            className="w-56 shrink-0"
          />
        </div>

        {comboDefaults.strategy === "round-robin" && (
          <div className="flex items-center justify-between pt-3 border-t border-border/30">
            <div>
              <p className="text-sm font-medium">{t("stickyLimit")}</p>
              <p className="text-xs text-text-muted">{t("stickyLimitDesc")}</p>
            </div>
            <Input
              type="number"
              aria-label={t("stickyLimit")}
              min="1"
              max="1000"
              value={comboDefaults.stickyRoundRobinLimit || 3}
              onChange={async (e) => {
                const nextLimit = parseInt(e.target.value) || 3;
                setComboDefaults((prev) => ({
                  ...prev,
                  stickyRoundRobinLimit: nextLimit,
                }));
                try {
                  await syncGlobalRoutingSettings({ stickyRoundRobinLimit: nextLimit });
                } catch (error) {
                  console.error("Failed to sync sticky round robin limit:", error);
                  showStatus("error", t("errorOccurred"));
                }
              }}
              className="w-20 text-center"
            />
          </div>
        )}

        {/* Numeric settings */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          {numericSettings.map(({ key, label, min, max, step }) => (
            <Input
              key={key}
              label={label}
              type="number"
              min={min}
              max={max}
              step={step || 1}
              value={comboDefaults[key] ?? ""}
              onChange={(e) =>
                setComboDefaults((prev) => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))
              }
              className="text-sm"
            />
          ))}
          <Input
            label={translateOrFallback(t, "targetTimeout", "Target timeout (seconds)")}
            type="number"
            min={1}
            max={86400}
            step={1}
            value={msToOptionalSecondsInput(comboDefaults.targetTimeoutMs)}
            placeholder={translateOrFallback(t, "inheritRequestTimeout", "Inherit request timeout")}
            onChange={(e) =>
              setComboDefaults((prev) => ({
                ...prev,
                targetTimeoutMs: secondsInputToOptionalMs(e.target.value),
              }))
            }
            className="text-sm"
          />
          <Input
            label={translateOrFallback(t, "comboTimeout", "Combo timeout (seconds)")}
            type="number"
            min={1}
            max={86400}
            step={1}
            value={msToOptionalSecondsInput(comboDefaults.comboTimeoutMs)}
            placeholder={translateOrFallback(
              t,
              "inheritComboSafetyTimeout",
              "Inherit 10-minute hang-stop"
            )}
            onChange={(e) =>
              setComboDefaults((prev) => ({
                ...prev,
                comboTimeoutMs: secondsInputToOptionalMs(e.target.value),
              }))
            }
            className="text-sm"
          />
        </div>
        <p className="text-xs text-text-muted">
          {translateOrFallback(
            t,
            "targetTimeoutHint",
            "Combo targets inherit the current request timeout by default. Set a lower value here only when you want faster fallback."
          )}
        </p>
        <p className="text-xs text-text-muted">
          {translateOrFallback(
            t,
            "comboTimeoutHint",
            "Whole-combo wall-clock budget across failover targets. Empty keeps the 10-minute hang-stop. Keep this longer than Target timeout so failover still has time."
          )}
        </p>

        <div className="grid grid-cols-1 gap-3 pt-3 border-t border-border/50">
          <div>
            <p className="font-medium text-sm">
              {translateOrFallback(t, "sessionAffinityTitle", "Session affinity")}
            </p>
            <p className="text-xs text-text-muted">
              {translateOrFallback(
                t,
                "sessionAffinityDesc",
                "Keeps one conversation on the same account for this many seconds, for any provider. 0 disables it."
              )}
            </p>
          </div>
          <Input
            label={translateOrFallback(t, "sessionAffinityTtl", "Affinity TTL (seconds)")}
            type="number"
            min={0}
            max={86400}
            step={60}
            value={msToSeconds(sessionAffinityTtlMs)}
            onChange={(e) => setSessionAffinityTtlMs(secondsInputToMs(e.target.value, 86400))}
            className="text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div className="md:col-span-2">
            <p className="font-medium text-sm">
              {translateOrFallback(t, "resetAwareQuotaCacheTitle", "Reset-aware quota cache")}
            </p>
            <p className="text-xs text-text-muted">
              {translateOrFallback(
                t,
                "resetAwareQuotaCacheDesc",
                "Caches quota telemetry for reset-aware ordering only. Quota preflight still protects requests. 0/0 keeps live fetching."
              )}
            </p>
          </div>
          <Input
            label={translateOrFallback(t, "resetAwareQuotaCacheTtl", "Fresh TTL (seconds)")}
            type="number"
            min={0}
            max={300}
            step={5}
            value={msToSeconds(comboDefaults.resetAwareQuotaCacheTtlMs)}
            onChange={(e) =>
              setComboDefaults((prev) => ({
                ...prev,
                resetAwareQuotaCacheTtlMs: secondsInputToMs(e.target.value, 300),
              }))
            }
            className="text-sm"
          />
          <Input
            label={translateOrFallback(t, "resetAwareQuotaCacheMaxStale", "Max stale (seconds)")}
            type="number"
            min={0}
            max={3600}
            step={30}
            value={msToSeconds(comboDefaults.resetAwareQuotaCacheMaxStaleMs)}
            onChange={(e) =>
              setComboDefaults((prev) => ({
                ...prev,
                resetAwareQuotaCacheMaxStaleMs: secondsInputToMs(e.target.value, 3600),
              }))
            }
            className="text-sm"
          />
        </div>

        {/* Round-Robin specific */}
        {comboDefaults.strategy === "round-robin" && (
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
            <Input
              label={t("concurrencyPerModel")}
              type="number"
              min={1}
              max={20}
              value={comboDefaults.concurrencyPerModel ?? ""}
              placeholder="3"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  concurrencyPerModel: parseInt(e.target.value) || 0,
                }))
              }
              className="text-sm"
            />
            <Input
              label={t("queueTimeout")}
              type="number"
              min={1000}
              max={120000}
              step={1000}
              value={comboDefaults.queueTimeoutMs ?? ""}
              placeholder="30000"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  queueTimeoutMs: parseInt(e.target.value) || 0,
                }))
              }
              className="text-sm"
            />
            <Input
              label={t("queueDepth")}
              type="number"
              min={0}
              max={100}
              value={comboDefaults.queueDepth ?? ""}
              placeholder="20"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  queueDepth: parseInt(e.target.value) || 0,
                }))
              }
              className="text-sm"
            />
          </div>
        )}

        {comboDefaults.strategy === "context-relay" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-border/50">
            <Input
              label={translateOrFallback(t, "contextRelayHandoffThreshold", "Handoff Threshold")}
              type="number"
              min={0.5}
              max={0.94}
              step={0.01}
              value={comboDefaults.handoffThreshold ?? ""}
              placeholder="0.85"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  handoffThreshold: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="text-sm"
            />
            <Input
              label={translateOrFallback(t, "contextRelayMaxMessages", "Max Messages For Summary")}
              type="number"
              min={5}
              max={100}
              value={comboDefaults.maxMessagesForSummary ?? ""}
              placeholder="30"
              onChange={(e) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  maxMessagesForSummary: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="text-sm"
            />
            <ModelSelectField
              label={translateOrFallback(t, "contextRelaySummaryModel", "Summary Model")}
              value={comboDefaults.handoffModel ?? ""}
              placeholder="codex/gpt-5.6-sol"
              onChange={(v) =>
                setComboDefaults((prev) => ({
                  ...prev,
                  handoffModel: v,
                }))
              }
              className="text-sm"
            />
            <div className="md:col-span-3 rounded-lg border border-info/20 bg-info/5 p-3">
              <p className="text-xs text-info">
                {translateOrFallback(
                  t,
                  "contextRelayProviderNote",
                  "Context Relay currently generates handoffs for Codex accounts and uses these values as global defaults for new or unconfigured combos."
                )}
              </p>
            </div>
          </div>
        )}

        {comboDefaults.strategy === "fusion" && (
          <FusionDefaultsFields comboDefaults={comboDefaults} setComboDefaults={setComboDefaults} />
        )}

        {/* Toggles */}
        <div className="flex flex-col gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{t("trackMetrics")}</p>
              <p className="text-xs text-text-muted">{t("trackMetricsDesc")}</p>
            </div>
            <Toggle
              checked={comboDefaults.trackMetrics !== false}
              ariaLabel={t("trackMetrics")}
              onChange={() =>
                setComboDefaults((prev) => ({ ...prev, trackMetrics: !prev.trackMetrics }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                {translateOrFallback(t, "promptCacheAffinity", "Prompt-cache locality routing")}
              </p>
              <p className="text-xs text-text-muted">
                {translateOrFallback(
                  t,
                  "promptCacheAffinityDesc",
                  "Prefer the same provider account for matching prompt-cache keys while preserving health and quota failover."
                )}
              </p>
            </div>
            <Toggle
              checked={promptCacheAffinityEnabled}
              ariaLabel={translateOrFallback(
                t,
                "promptCacheAffinity",
                "Prompt-cache locality routing"
              )}
              onChange={() => setPromptCacheAffinityEnabled((enabled) => !enabled)}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">
                {translateOrFallback(t, "reasoningTokenBuffer", "Reasoning token buffer")}
              </p>
              <p className="text-xs text-text-muted">
                {translateOrFallback(
                  t,
                  "reasoningTokenBufferDesc",
                  "Allow combo routing to add max_tokens headroom only for known reasoning models when the full buffer fits inside a known output cap."
                )}
              </p>
            </div>
            <Toggle
              checked={comboDefaults.reasoningTokenBufferEnabled !== false}
              ariaLabel={translateOrFallback(t, "reasoningTokenBuffer", "Reasoning token buffer")}
              onChange={() =>
                setComboDefaults((prev) => ({
                  ...prev,
                  reasoningTokenBufferEnabled: prev.reasoningTokenBufferEnabled === false,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                {translateOrFallback(t, "zeroLatencyOptimizations", "Zero-latency optimizations")}
              </p>
              <p className="text-xs text-text-muted">
                {translateOrFallback(
                  t,
                  "zeroLatencyOptimizationsDesc",
                  "Opt in to hedging, predictive TTFT skips, and proactive fallback compression. Leave off to prevent these latency features from racing targets or compressing fallback requests."
                )}
              </p>
            </div>
            <Toggle
              checked={comboDefaults.zeroLatencyOptimizationsEnabled === true}
              ariaLabel={translateOrFallback(
                t,
                "zeroLatencyOptimizations",
                "Zero-latency optimizations"
              )}
              onChange={() =>
                setComboDefaults((prev) => ({
                  ...prev,
                  zeroLatencyOptimizationsEnabled: prev.zeroLatencyOptimizationsEnabled !== true,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                {translateOrFallback(t, "disableSessionStickiness", "Disable session stickiness")}
              </p>
              <p className="text-xs text-text-muted">
                {translateOrFallback(
                  t,
                  "disableSessionStickinessDesc",
                  "Round-robin and random combos rotate to a different connection on every request instead of pinning a whole conversation to one connection by the first-message hash. Leave off to preserve prompt-cache hits for multi-turn chats. Per-combo overrides take precedence."
                )}
              </p>
            </div>
            <Toggle
              checked={comboDefaults.disableSessionStickiness === true}
              ariaLabel={translateOrFallback(
                t,
                "disableSessionStickiness",
                "Disable session stickiness"
              )}
              onChange={() =>
                setComboDefaults((prev) => ({
                  ...prev,
                  disableSessionStickiness: prev.disableSessionStickiness !== true,
                }))
              }
            />
          </div>
        </div>

        {/* Provider Overrides */}
        <div className="pt-3 border-t border-border/50">
          <p className="font-medium text-sm mb-2">{t("providerOverrides")}</p>
          <p className="text-xs text-text-muted mb-3">{t("providerOverridesDesc")}</p>

          {Object.entries(providerOverrides).map(
            ([provider, config]: [string, any], index: number) => (
              <div
                key={provider}
                className="flex items-center gap-1.5 mb-2 p-2 rounded-lg bg-bg-subtle"
              >
                {/* Reorder arrows (combo-builder pattern) */}
                <div className="flex flex-col gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    icon="arrow_upward"
                    onClick={() => moveProviderOverride(provider, -1)}
                    disabled={index === 0}
                    className="size-5 min-h-5"
                    title={t("moveUp")}
                    aria-label={t("moveUp")}
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    icon="arrow_downward"
                    onClick={() => moveProviderOverride(provider, 1)}
                    disabled={index === Object.keys(providerOverrides).length - 1}
                    className="size-5 min-h-5"
                    title={t("moveDown")}
                    aria-label={t("moveDown")}
                  />
                </div>
                <span className="text-xs font-mono font-medium min-w-[80px]">{provider}</span>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  value={config.maxRetries ?? 1}
                  onChange={(e) =>
                    setProviderOverrides((prev) => ({
                      ...prev,
                      [provider]: { ...prev[provider], maxRetries: parseInt(e.target.value) || 0 },
                    }))
                  }
                  className="text-xs w-16"
                  aria-label={t("providerMaxRetriesAria", { provider })}
                />
                <span className="text-[10px] text-text-muted">{t("retries")}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  icon="close"
                  onClick={() => removeProviderOverride(provider)}
                  className="ml-auto text-error"
                  aria-label={t("removeProviderOverrideAria", { provider })}
                />
              </div>
            )
          )}

          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              className="mt-2 w-full justify-between font-normal text-text-muted"
            >
              <span className="flex-1 text-left">
                {t("selectProviderPlaceholder") || "Select provider..."}
              </span>
              <Icon
                name="expand_more"
                size={16}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </Button>

            {dropdownOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-surface shadow-lg overflow-hidden">
                <div className="p-2 border-b border-border/50">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setHighlightedIdx(0);
                    }}
                    placeholder={t("searchProviderPlaceholder") || "Search providers..."}
                    aria-label={t("searchProviderAria") || "Search providers"}
                    onKeyDown={handleDropdownKeyDown}
                    autoFocus
                  />
                </div>
                <ul role="listbox" className="max-h-48 overflow-auto py-1">
                  {filteredProviders.length === 0 ? (
                    <li className="px-3 py-2 text-xs text-text-muted text-center">
                      {availableProviders.filter((p) => !providerOverrides[p.provider]).length === 0
                        ? t("allProvidersAdded")
                        : t("noProvidersFound")}
                    </li>
                  ) : (
                    filteredProviders.map((p, idx) => (
                      <li
                        key={p.provider}
                        role="option"
                        aria-selected={idx === highlightedIdx}
                        className={`px-3 py-2 text-xs cursor-pointer transition-colors ${
                          idx === highlightedIdx
                            ? "bg-bg-subtle font-medium"
                            : "hover:bg-bg-subtle/60"
                        }`}
                        onClick={() => addProviderOverride(p.provider)}
                        onMouseEnter={() => setHighlightedIdx(idx)}
                      >
                        {p.provider}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Save */}
        <div className="pt-3 border-t border-border/50">
          <Button variant="primary" size="sm" onClick={saveComboDefaults} loading={saving}>
            {t("saveComboDefaults")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
