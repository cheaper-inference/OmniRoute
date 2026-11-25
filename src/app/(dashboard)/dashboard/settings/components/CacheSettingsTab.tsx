"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { Slider } from "@omniroute/ui-kit/slider";
import {
  Button,
  Card,
  Badge,
  Input,
  NumberInput,
  Toggle,
  Select,
  SegmentedControl,
} from "@/shared/components";
import { fieldNumber, fieldText } from "./numberFieldText";

type Message = { type: "success" | "error"; text: string };

interface AvailableEmbeddingModelOption {
  id: string;
  rawId: string;
  name: string;
  dimensions?: number;
  maxTokens?: number;
  supportedInputTypes: string[];
}

interface EmbeddingProviderOption {
  id: string;
  name: string;
  hasConnection: boolean;
  baseUrl?: string;
  models: AvailableEmbeddingModelOption[];
}

interface CacheConfigResponse {
  modelCatalogCacheTtlMs: number;
  semanticCacheEnabled?: boolean;
  semanticCacheMaxSize?: number;
  semanticCacheTTL?: number;
  semanticCacheVectorEnabled?: boolean;
  semanticCacheBackend?: "memory" | "redis";
  semanticCacheThreshold?: number;
  semanticCacheEmbeddingProvider?: string;
  semanticCacheEmbeddingModel?: string;
  semanticCacheEmbeddingDimension?: number;
  /** Layer that wins for the effective dimension: env override, stored setting, or default. */
  semanticCacheEmbeddingDimensionSource?: "env" | "db" | "default";
  /** Raw stored value, when the DB has one (the env override may mask it). */
  semanticCacheEmbeddingDimensionConfigured?: number | null;
  semanticCacheEmbeddingBaseUrl?: string;
  semanticCacheEmbeddingApiKey?: string;
  semanticCacheRedisUrl?: string;
  semanticCacheRedisPrefix?: string;
  semanticCacheRequireZeroTemp?: boolean;
  embeddingOptions?: EmbeddingProviderOption[];
  [key: string]: unknown;
}

const DEFAULT_TTL_MS = 1500;
const MIN_TTL_MS = 100;
const MAX_TTL_MS = 60000;

export default function CacheSettingsTab() {
  const t = useTranslations("settings");
  const format = useFormatter();
  const inputTypeLabels: Record<string, string> = {
    text: t("semanticCacheInputText"),
    image: t("semanticCacheInputImage"),
    audio: t("semanticCacheInputAudio"),
    video: t("semanticCacheInputVideo"),
  };

  // Model Catalog Cache State
  const [catalogTtl, setCatalogTtl] = useState(String(DEFAULT_TTL_MS));
  const [savedCatalogTtl, setSavedCatalogTtl] = useState(String(DEFAULT_TTL_MS));
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogSaving, setCatalogSaving] = useState(false);
  const [catalogMessage, setCatalogMessage] = useState<Message | null>(null);

  // Semantic Cache State
  const [semEnabled, setSemEnabled] = useState(true);
  // Vector-similarity layer is opt-in (#14159): off unless the operator turns it on.
  const [semVectorEnabled, setSemVectorEnabled] = useState(false);
  const [semBackend, setSemBackend] = useState<"memory" | "redis">("memory");
  const [semThreshold, setSemThreshold] = useState(0.8);
  const [semTtlMinutes, setSemTtlMinutes] = useState(30);
  const [semMaxSize, setSemMaxSize] = useState(1000);
  const [semProvider, setSemProvider] = useState("lemonade");
  const [semModel, setSemModel] = useState("harrier-oss-v1-0.6b");
  const [semDimension, setSemDimension] = useState<number | undefined>(1024);
  // The runtime resolves the dimension env-first (env → DB → default); the source decides
  // whether the field may be persisted at all — writing an environment override into the DB
  // would hide the real stored value behind the same number.
  const [semDimensionSource, setSemDimensionSource] = useState<"env" | "db" | "default">("default");
  // True once the operator typed a dimension: a catalog model without `dimensions` metadata
  // must not silently overwrite that choice.
  const [dimensionUserSet, setDimensionUserSet] = useState(false);
  const dimensionUserSetRef = useRef(false);
  const [detectedDimension, setDetectedDimension] = useState<number | null>(null);
  const [semBaseUrl, setSemBaseUrl] = useState("");
  const [semApiKey, setSemApiKey] = useState("");
  const [semRedisUrl, setSemRedisUrl] = useState("");
  const [semRedisPrefix, setSemRedisPrefix] = useState("omniroute:semcache:");
  const [semRequireZeroTemp, setSemRequireZeroTemp] = useState(true);

  // Saved Semantic Cache State
  const [semSaving, setSemSaving] = useState(false);
  const [semMessage, setSemMessage] = useState<Message | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Dynamic Options
  const [embeddingOptions, setEmbeddingOptions] = useState<EmbeddingProviderOption[]>([]);

  // Test Connection State
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    latencyMs?: number;
    dimensions?: number;
    configuredDimensions?: number;
    dimensionSource?: "env" | "db" | "default";
    dimensionMismatch?: boolean;
    resolvedBaseUrl?: string;
    error?: string;
  } | null>(null);

  // Clear Cache State
  const [clearingCache, setClearingCache] = useState(false);
  const [clearMessage, setClearMessage] = useState<string | null>(null);

  // Load Cache Config and Dynamic Options in a single request
  useEffect(() => {
    let active = true;

    fetch("/api/settings/cache-config")
      .then((response) => {
        if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);
        return response.json() as Promise<CacheConfigResponse>;
      })
      .then((config) => {
        if (!active) return;
        const ms = config.modelCatalogCacheTtlMs ?? DEFAULT_TTL_MS;
        const str =
          typeof ms === "number" && Number.isFinite(ms) ? String(ms) : String(DEFAULT_TTL_MS);
        setCatalogTtl(str);
        setSavedCatalogTtl(str);

        if (config.semanticCacheEnabled !== undefined) {
          setSemEnabled(config.semanticCacheEnabled);
        }
        if (config.semanticCacheVectorEnabled !== undefined) {
          setSemVectorEnabled(config.semanticCacheVectorEnabled);
        }
        if (config.semanticCacheBackend === "redis" || config.semanticCacheBackend === "memory") {
          setSemBackend(config.semanticCacheBackend);
        }
        if (typeof config.semanticCacheThreshold === "number") {
          setSemThreshold(config.semanticCacheThreshold);
        }
        if (typeof config.semanticCacheTTL === "number") {
          setSemTtlMinutes(Math.round(config.semanticCacheTTL / 60000));
        }
        if (typeof config.semanticCacheMaxSize === "number") {
          setSemMaxSize(config.semanticCacheMaxSize);
        }
        if (config.semanticCacheEmbeddingProvider) {
          setSemProvider(config.semanticCacheEmbeddingProvider);
        }
        if (config.semanticCacheEmbeddingModel) {
          setSemModel(config.semanticCacheEmbeddingModel);
        }
        if (typeof config.semanticCacheEmbeddingDimension === "number") {
          setSemDimension(config.semanticCacheEmbeddingDimension);
        }
        if (
          config.semanticCacheEmbeddingDimensionSource === "env" ||
          config.semanticCacheEmbeddingDimensionSource === "db" ||
          config.semanticCacheEmbeddingDimensionSource === "default"
        ) {
          setSemDimensionSource(config.semanticCacheEmbeddingDimensionSource);
        }
        if (typeof config.semanticCacheEmbeddingBaseUrl === "string") {
          setSemBaseUrl(config.semanticCacheEmbeddingBaseUrl);
        }
        if (typeof config.semanticCacheEmbeddingApiKey === "string") {
          setSemApiKey(config.semanticCacheEmbeddingApiKey);
        }
        if (typeof config.semanticCacheRedisUrl === "string") {
          setSemRedisUrl(config.semanticCacheRedisUrl);
        }
        if (typeof config.semanticCacheRedisPrefix === "string") {
          setSemRedisPrefix(config.semanticCacheRedisPrefix);
        }
        if (config.semanticCacheRequireZeroTemp !== undefined) {
          setSemRequireZeroTemp(config.semanticCacheRequireZeroTemp);
        }
        if (Array.isArray(config.embeddingOptions)) {
          setEmbeddingOptions(config.embeddingOptions);
        }
      })
      .catch((error) => {
        console.error("Failed to load cache config:", error);
        if (active) setCatalogMessage({ type: "error", text: t("cacheConfigLoadFailed") });
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });

    return () => {
      active = false;
    };
  }, [t]);

  // Catalog TTL validation and save
  const catalogDirty = catalogTtl.trim() !== savedCatalogTtl;

  const saveCatalogTtl = useCallback(async () => {
    if (!catalogDirty) return;

    const parsed = Number(catalogTtl.trim());
    if (!Number.isInteger(parsed)) return;
    if (parsed < MIN_TTL_MS || parsed > MAX_TTL_MS) return;

    setCatalogSaving(true);
    setCatalogMessage(null);

    try {
      const response = await fetch("/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelCatalogCacheTtlMs: parsed }),
      });

      if (!response.ok) throw new Error(`Cache config API returned ${response.status}`);

      const config = (await response.json()) as CacheConfigResponse;
      const saved = String(config.modelCatalogCacheTtlMs ?? parsed);
      setCatalogTtl(saved);
      setSavedCatalogTtl(saved);
      setCatalogMessage({ type: "success", text: t("cacheConfigSaveSuccess") });
    } catch (error) {
      console.error("Failed to save cache config:", error);
      setCatalogMessage({ type: "error", text: t("cacheConfigSaveFailed") });
    } finally {
      setCatalogSaving(false);
    }
  }, [catalogDirty, t, catalogTtl, setCatalogTtl, setCatalogMessage]);

  const catalogValidationError = (() => {
    const trimmed = catalogTtl.trim();
    if (!trimmed) return t("modelCatalogTtlRequired");
    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed)) return t("modelCatalogTtlWholeNumberError");
    if (parsed < MIN_TTL_MS) return t("modelCatalogTtlMinimumError", { min: MIN_TTL_MS });
    if (parsed > MAX_TTL_MS) return t("modelCatalogTtlMaximumError", { max: MAX_TTL_MS });
    return null;
  })();

  // Current selected provider and model details
  const selectedProviderOption = embeddingOptions.find((p) => p.id === semProvider);
  const availableModelsForProvider = selectedProviderOption?.models || [];
  const selectedModelOption = availableModelsForProvider.find(
    (m) => m.rawId === semModel || m.id === semModel
  );

  // Sync dimensions when model selection changes. Only a model that really declares its
  // vector size may set the field: catalog-absent models (e.g. a local EmbeddingGemma at 768
  // dims) report no `dimensions`, and the previous value must survive that.
  const handleModelChange = (modelIdOrRaw: string) => {
    setSemModel(modelIdOrRaw);
    const m = availableModelsForProvider.find(
      (item) => item.rawId === modelIdOrRaw || item.id === modelIdOrRaw
    );
    if (m?.dimensions && semDimensionSource !== "env") {
      setSemDimension(m.dimensions);
      setDimensionUserSet(false);
      dimensionUserSetRef.current = false;
      setDetectedDimension(null);
    }
    setTestResult(null);
  };

  const handleProviderChange = (newProvider: string) => {
    setSemProvider(newProvider);
    const provider = embeddingOptions.find((p) => p.id === newProvider);
    if (provider && provider.models.length > 0) {
      const firstModel = provider.models[0];
      setSemModel(firstModel.rawId || firstModel.id);
      if (firstModel.dimensions && semDimensionSource !== "env") {
        setSemDimension(firstModel.dimensions);
        setDimensionUserSet(false);
        dimensionUserSetRef.current = false;
        setDetectedDimension(null);
      }
    }
    setTestResult(null);
  };

  const dimensionHint =
    semDimensionSource === "env"
      ? t("semanticCacheDimensionEnvHint", { count: semDimension ?? 0 })
      : detectedDimension !== null && detectedDimension === semDimension
        ? t("semanticCacheDimensionDetected", { count: detectedDimension })
        : t("semanticCacheEmbeddingDimensionHint");

  // Save Semantic Cache Config
  const saveSemanticCache = async () => {
    setSemSaving(true);
    setSemMessage(null);

    const payload = {
      semanticCacheEnabled: semEnabled,
      semanticCacheVectorEnabled: semVectorEnabled,
      semanticCacheBackend: semBackend,
      semanticCacheThreshold: Number(semThreshold),
      semanticCacheTTL: semTtlMinutes * 60000,
      semanticCacheMaxSize: Number(semMaxSize),
      semanticCacheEmbeddingProvider: semProvider,
      semanticCacheEmbeddingModel: semModel,
      // The environment layer outranks the DB, so an env-derived value is never persisted: it
      // would conceal the stored setting behind a number the UI cannot change.
      ...(semDimensionSource === "env"
        ? {}
        : { semanticCacheEmbeddingDimension: semDimension ? Number(semDimension) : null }),
      semanticCacheEmbeddingBaseUrl: semBaseUrl.trim() || selectedProviderOption?.baseUrl || null,
      semanticCacheEmbeddingApiKey: semApiKey.trim() || null,
      semanticCacheRedisUrl: semRedisUrl.trim() || null,
      semanticCacheRedisPrefix: semRedisPrefix.trim() || "omniroute:semcache:",
      semanticCacheRequireZeroTemp: semRequireZeroTemp,
    };

    try {
      const res = await fetch("/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Save failed with status ${res.status}`);

      if (semDimensionSource !== "env") {
        setSemDimensionSource(semDimension ? "db" : "default");
      }
      setSemMessage({ type: "success", text: t("semanticCacheSaveSuccess") });
    } catch (err) {
      console.error("Failed to save semantic cache settings:", err);
      setSemMessage({ type: "error", text: t("semanticCacheSaveFailed") });
    } finally {
      setSemSaving(false);
    }
  };

  // Test embedding connection
  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/settings/cache-config/test-embedding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: semProvider,
          model: semModel,
          baseUrl: semBaseUrl.trim() || selectedProviderOption?.baseUrl || undefined,
          apiKey: semApiKey.trim() || undefined,
          dimensions: semDimension,
        }),
      });

      const data = await res.json();
      setTestResult(data);
      if (data?.ok && typeof data.dimensions === "number") {
        setDetectedDimension(data.dimensions);
        const configured =
          typeof data.configuredDimensions === "number" ? data.configuredDimensions : semDimension;
        if (typeof configured === "number" && configured !== data.dimensions) {
          console.warn(
            `[semantic-cache] embedding dimension mismatch: configured ${configured} but the ` +
              `endpoint returned ${data.dimensions}`
          );
        }
        // Offer the probe result when the operator has not pinned a dimension and the
        // environment does not override the stored value anyway.
        if (!dimensionUserSetRef.current && semDimensionSource !== "env") {
          setSemDimension(data.dimensions);
        }
      }
    } catch {
      setTestResult({ ok: false, error: t("semanticCacheConnectionError") });
    } finally {
      setTestingConnection(false);
    }
  };

  // Clear cache
  const handleClearCache = async () => {
    setClearingCache(true);
    setClearMessage(null);

    try {
      const res = await fetch("/api/cache", { method: "DELETE" });
      if (!res.ok) {
        setClearMessage(`${t("semanticCacheClearFailed")} HTTP ${res.status}`);
        return;
      }
      setClearMessage(t("semanticCacheClearSuccess"));
    } catch {
      setClearMessage(t("semanticCacheClearFailed"));
    } finally {
      setClearingCache(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* ── 1. Semantic Caching Card ── */}
      <Card className="p-6">
        <div className="flex flex-col gap-5">
          {/* Card Header & Master Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="ci-heading text-text-main" data-size="md">
                  {t("semanticCacheTitle")}
                </h3>
                <Badge variant={semEnabled ? "success" : "default"} size="sm">
                  {semEnabled ? t("semanticCacheEnabled") : t("semanticCacheDisabled")}
                </Badge>
              </div>
              <p className="text-sm text-text-muted mt-1">{t("semanticCacheDescription")}</p>
            </div>
            <Toggle
              checked={semEnabled}
              onChange={setSemEnabled}
              ariaLabel={t("semanticCacheEnable")}
            />
          </div>

          {semEnabled && (
            <div className="flex flex-col gap-5">
              {/* Vector-similarity layer opt-in (default off) */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-main">
                    {t("semanticCacheVectorTitle")}
                  </p>
                  <p className="text-xs text-text-muted">{t("semanticCacheVectorDescription")}</p>
                </div>
                <Toggle
                  checked={semVectorEnabled}
                  onChange={setSemVectorEnabled}
                  ariaLabel={t("semanticCacheVectorEnable")}
                />
              </div>

              {/* Provider & Model Selection Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Select
                    id="sem-provider"
                    label={t("semanticCacheProvider")}
                    value={semProvider}
                    onChange={(e) => handleProviderChange(e.target.value)}
                    disabled={catalogLoading || semSaving}
                    options={
                      embeddingOptions.length > 0
                        ? embeddingOptions.map((opt) => ({
                            value: opt.id,
                            label: opt.hasConnection
                              ? t("semanticCacheConfiguredProvider", { name: opt.name })
                              : opt.name,
                          }))
                        : [{ value: semProvider, label: semProvider }]
                    }
                    hint={
                      selectedProviderOption
                        ? selectedProviderOption.hasConnection
                          ? t("semanticCacheConfiguredConnection", {
                              url: selectedProviderOption.baseUrl || t("semanticCacheDefaultUrl"),
                            })
                          : t("semanticCacheConnectionRequired")
                        : undefined
                    }
                  />
                </div>

                <div>
                  <Select
                    id="sem-model"
                    label={t("semanticCacheModel")}
                    value={semModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    disabled={
                      catalogLoading || semSaving || availableModelsForProvider.length === 0
                    }
                    options={
                      availableModelsForProvider.length > 0
                        ? availableModelsForProvider.map((m) => ({
                            value: m.rawId || m.id,
                            label: m.dimensions
                              ? t("semanticCacheModelDimensions", {
                                  name: m.name || m.rawId,
                                  count: m.dimensions,
                                })
                              : m.name || m.rawId,
                          }))
                        : [{ value: semModel, label: semModel }]
                    }
                  />

                  {/* Model Metadata Badges */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedModelOption?.maxTokens ? (
                      <Badge variant="info" size="sm">
                        {t("semanticCacheMaxTokens", { count: selectedModelOption.maxTokens })}
                      </Badge>
                    ) : null}
                    {selectedModelOption?.supportedInputTypes ? (
                      <Badge variant="default" size="sm">
                        {t("semanticCacheInputTypes", {
                          types: format.list(
                            selectedModelOption.supportedInputTypes.map(
                              (type) => inputTypeLabels[type] || type
                            )
                          ),
                        })}
                      </Badge>
                    ) : null}
                  </div>

                  {/* Vector size carries no catalog metadata for many local models (a catalog
                      miss left 1024 stuck for a 768-dim model), so it is editable and its
                      effective source is spelled out instead of inferred. */}
                  <div className="mt-3">
                    <NumberInput
                      id="sem-dimension"
                      label={t("semanticCacheEmbeddingDimension")}
                      hint={dimensionHint}
                      min={1}
                      max={65536}
                      step={1}
                      precision={0}
                      value={semDimension ?? null}
                      onValueChange={(value) => {
                        setSemDimension(value ?? undefined);
                        setDimensionUserSet(true);
                        dimensionUserSetRef.current = true;
                        setDetectedDimension(null);
                      }}
                      inputClassName="w-32"
                      disabled={semSaving || semDimensionSource === "env"}
                    />
                  </div>
                </div>
              </div>

              {/* Threshold Slider & TTL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <Slider
                    id="sem-threshold"
                    label={t("semanticCacheThreshold")}
                    min={0.5}
                    max={1}
                    step={0.01}
                    value={semThreshold}
                    onValueChange={setSemThreshold}
                    formatValue={(value) =>
                      format.number(value, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    }
                    disabled={semSaving}
                    aria-describedby="sem-threshold-hint"
                  />
                  <p id="sem-threshold-hint" className="text-xs text-text-muted mt-1">
                    {t("semanticCacheThresholdHint")}
                  </p>
                </div>

                <NumberInput
                  id="sem-retention"
                  label={`${t("semanticCacheRetention")} (${t("semanticCacheMinutes")})`}
                  hint={t("semanticCacheRetentionHint")}
                  min={1}
                  max={10080}
                  value={semTtlMinutes}
                  onValueChange={(value) => setSemTtlMinutes(Math.max(1, value || 1))}
                  inputClassName="w-28"
                  disabled={semSaving}
                />
              </div>

              {/* Storage Backend Selection */}
              <div className="pt-2 border-t border-border/40">
                <p className="mb-2 text-sm font-medium text-text-main">
                  {t("semanticCacheStorage")}
                </p>
                <SegmentedControl
                  semantics="radio"
                  aria-label={t("semanticCacheStorage")}
                  value={semBackend}
                  onChange={(val) => setSemBackend(val as "memory" | "redis")}
                  options={[
                    { value: "memory", label: t("semanticCacheMemory") },
                    { value: "redis", label: t("semanticCacheRedis") },
                  ]}
                />

                {semBackend === "memory" ? (
                  <div className="mt-3">
                    <NumberInput
                      id="sem-max-entries"
                      label={t("semanticCacheMaxEntries")}
                      min={10}
                      max={100000}
                      value={semMaxSize}
                      onValueChange={(value) => setSemMaxSize(value || 100)}
                      inputClassName="w-32"
                      disabled={semSaving}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <Input
                      id="sem-redis-url"
                      type="text"
                      label={t("semanticCacheRedisUrl")}
                      placeholder="redis://127.0.0.1:6379"
                      value={semRedisUrl}
                      onChange={(e) => setSemRedisUrl(e.target.value)}
                      disabled={semSaving}
                    />
                    <Input
                      id="sem-redis-prefix"
                      type="text"
                      label={t("semanticCacheRedisPrefix")}
                      value={semRedisPrefix}
                      onChange={(e) => setSemRedisPrefix(e.target.value)}
                      disabled={semSaving}
                    />
                  </div>
                )}
              </div>

              {/* Determinism Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div>
                  <p className="text-sm font-medium text-text-main">
                    {t("semanticCacheDeterminism")}
                  </p>
                  <p className="text-xs text-text-muted">{t("semanticCacheDeterminismHint")}</p>
                </div>
                <Toggle
                  checked={semRequireZeroTemp}
                  onChange={setSemRequireZeroTemp}
                  ariaLabel={t("semanticCacheZeroTemperature")}
                />
              </div>

              {/* Advanced Overrides Accordion */}
              <div className="pt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  size="sm"
                  iconRight={showAdvanced ? "expand_less" : "expand_more"}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  aria-expanded={showAdvanced}
                  className="text-primary"
                >
                  {showAdvanced ? t("semanticCacheHideAdvanced") : t("semanticCacheShowAdvanced")}
                </Button>

                {showAdvanced && (
                  <Card.Section className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <Input
                      id="sem-base-url"
                      type="text"
                      label={t("semanticCacheBaseUrl")}
                      placeholder="https://custom-embedding.internal/v1"
                      value={semBaseUrl}
                      onChange={(e) => setSemBaseUrl(e.target.value)}
                    />
                    <Input
                      id="sem-api-key"
                      type="password"
                      label={t("semanticCacheApiKey")}
                      placeholder={t("semanticCacheApiKeyPlaceholder")}
                      value={semApiKey}
                      onChange={(e) => setSemApiKey(e.target.value)}
                    />
                  </Card.Section>
                )}
              </div>

              {/* Action Buttons & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={testingConnection || semSaving}
                  >
                    {testingConnection ? t("semanticCacheTesting") : t("semanticCacheTest")}
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleClearCache}
                    disabled={clearingCache}
                  >
                    {clearingCache ? t("semanticCachePurging") : t("semanticCacheClear")}
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={saveSemanticCache}
                  disabled={semSaving}
                >
                  {semSaving ? t("semanticCacheSaving") : t("semanticCacheSave")}
                </Button>
              </div>

              {/* Test Connection Output */}
              {testResult && (
                <div
                  className={`p-3 rounded-md text-xs border ${
                    testResult.ok
                      ? "bg-success/10 border-success/20 text-success"
                      : "bg-error/10 border-error/20 text-error"
                  }`}
                >
                  {testResult.ok ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{t("semanticCacheConnectionVerified")}</span>
                      <span>
                        {testResult.resolvedBaseUrl
                          ? t("semanticCacheTestSuccessVia", {
                              dimensions: testResult.dimensions,
                              latency: testResult.latencyMs,
                              url: testResult.resolvedBaseUrl,
                            })
                          : t("semanticCacheTestSuccess", {
                              dimensions: testResult.dimensions,
                              latency: testResult.latencyMs,
                            })}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-semibold">{t("semanticCacheConnectionFailed")} </span>
                      <span>{testResult.error || t("semanticCacheUnknownError")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Mismatch Guard — surfaced, never enforced: the configured value is kept. */}
              {(() => {
                const effectiveConfigured = semDimension ?? testResult?.configuredDimensions;
                const hasMismatch =
                  testResult?.ok &&
                  typeof testResult.dimensions === "number" &&
                  typeof effectiveConfigured === "number" &&
                  testResult.dimensions !== effectiveConfigured;
                if (!hasMismatch || !(dimensionUserSet || semDimensionSource === "env")) {
                  return null;
                }
                return (
                  <p className="text-xs text-warning">
                    {t("semanticCacheDimensionMismatch", {
                      detected: testResult.dimensions ?? 0,
                      configured: effectiveConfigured,
                    })}
                  </p>
                );
              })()}

              {/* Clear Message */}
              {clearMessage && <p className="text-xs text-text-muted italic">{clearMessage}</p>}

              {/* Save Message */}
              {semMessage && (
                <p
                  className={`text-xs ${
                    semMessage.type === "success" ? "text-success font-medium" : "text-error"
                  }`}
                >
                  {semMessage.text}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* ── 2. Model Catalog Cache Card (Preserved Compatibility) ── */}
      <Card className="p-6">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-medium">{t("modelCatalogCacheTtl")}</p>
            <p className="text-sm text-text-muted mt-1">{t("modelCatalogCacheTtlDescription")}</p>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            <NumberInput
              id="model-catalog-ttl-ms"
              aria-label={t("modelCatalogCacheTtlLabel")}
              suffix={t("semanticCacheMilliseconds")}
              min={MIN_TTL_MS}
              max={MAX_TTL_MS}
              // The screen shows its own range error; the field does not replace the value.
              clamp={false}
              step={100}
              value={fieldNumber(catalogTtl)}
              onValueChange={(value) => {
                setCatalogTtl(fieldText(value));
                setCatalogMessage(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && catalogDirty) void saveCatalogTtl();
              }}
              error={catalogValidationError || undefined}
              className="shrink-0"
              inputClassName="w-32"
              disabled={catalogLoading || catalogSaving}
            />
            <Button
              size="sm"
              variant="primary"
              disabled={catalogLoading || Boolean(catalogValidationError) || !catalogDirty}
              onClick={saveCatalogTtl}
            >
              {catalogSaving ? t("modelCatalogCacheTtlSaving") : t("modelCatalogCacheTtlSave")}
            </Button>
            {catalogDirty && (
              <span className="py-2.5 text-xs text-text-muted">
                {t("modelCatalogCacheTtlCurrent", { value: savedCatalogTtl })}
              </span>
            )}
          </div>
          {catalogMessage && (
            <p
              className={`text-xs ${
                catalogMessage.type === "success" ? "text-success" : "text-error"
              }`}
            >
              {catalogMessage.text}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
