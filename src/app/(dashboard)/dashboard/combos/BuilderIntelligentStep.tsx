"use client";

import { useMemo } from "react";
import { Slider } from "@omniroute/ui-kit/slider";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Checkbox from "@/shared/components/Checkbox";
import CollapsibleSection from "@/shared/components/CollapsibleSection";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { cn } from "@/shared/utils/cn";
import {
  DEFAULT_INTELLIGENT_WEIGHTS,
  applyIntelligentRoutingConfigPatch,
  FACTOR_LABELS,
  MODE_PACK_OPTIONS,
  ROUTER_STRATEGY_OPTIONS,
  normalizeIntelligentRoutingConfig,
} from "@/lib/combos/intelligentRouting";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { compareTr } from "@/shared/utils/turkishText";

function getI18nOrFallback(
  t: any,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
) {
  try {
    if (typeof t?.has === "function" && t.has(key)) return t(key, values);
  } catch {
    // A registered message can require an ICU variable (e.g. {percent}) that
    // this call site doesn't know about yet -- fall back rather than crash
    // the whole builder step's render.
  }
  return fallback;
}

const formatPercent = (value: number) => `${Math.round(value * 100)}%`;
const EXPLORATION_PRESETS = [0, 0.05, 0.1, 0.25].map((value) => ({
  value,
  label: formatPercent(value),
}));

function toProviderOptions(activeProviders: any[] = [], candidatePool: string[] = []) {
  const uniqueProviders = new Map<string, { id: string; label: string; connectionCount: number }>();

  activeProviders.forEach((provider) => {
    const providerId =
      typeof provider?.providerId === "string" && provider.providerId.trim().length > 0
        ? provider.providerId
        : typeof provider?.provider === "string" && provider.provider.trim().length > 0
          ? provider.provider
          : typeof provider?.id === "string" && provider.id.trim().length > 0
            ? provider.id
            : null;

    if (!providerId) return;

    const currentEntry = uniqueProviders.get(providerId);
    const fallbackLabel =
      typeof provider?.displayName === "string" && provider.displayName.trim().length > 0
        ? provider.displayName
        : typeof provider?.providerName === "string" && provider.providerName.trim().length > 0
          ? provider.providerName
          : (AI_PROVIDERS as Record<string, any>)[providerId]?.name || providerId;
    const connectionCount =
      typeof provider?.activeConnectionCount === "number"
        ? provider.activeConnectionCount
        : typeof provider?.connectionCount === "number"
          ? provider.connectionCount
          : 1;

    uniqueProviders.set(providerId, {
      id: providerId,
      label: currentEntry?.label || fallbackLabel,
      connectionCount: (currentEntry?.connectionCount || 0) + connectionCount,
    });
  });

  candidatePool.forEach((poolId) => {
    if (!uniqueProviders.has(poolId)) {
      uniqueProviders.set(poolId, {
        id: poolId,
        label: `${poolId} (Offline/Deleted)`,
        connectionCount: 0,
      });
    }
  });

  return [...uniqueProviders.values()].sort((a, b) => compareTr(a.label, b.label));
}

export default function BuilderIntelligentStep({
  t,
  config,
  onChange,
  activeProviders,
}: {
  t: any;
  config: Record<string, unknown>;
  onChange: (nextConfig: Record<string, unknown>) => void;
  activeProviders: any[];
}) {
  const normalizedConfig = normalizeIntelligentRoutingConfig(config);
  const isSlaAwareStrategy = ["sla-aware", "sla"].includes(normalizedConfig.routerStrategy);
  const providerOptions = useMemo(
    () => toProviderOptions(activeProviders, normalizedConfig.candidatePool),
    [activeProviders, normalizedConfig.candidatePool]
  );

  const updateConfig = (patch: Record<string, unknown>) => {
    onChange(applyIntelligentRoutingConfigPatch(config, patch));
  };

  const toggleCandidateProvider = (providerId: string) => {
    const nextCandidatePool = normalizedConfig.candidatePool.includes(providerId)
      ? normalizedConfig.candidatePool.filter((entry) => entry !== providerId)
      : [...normalizedConfig.candidatePool, providerId];

    updateConfig({ candidatePool: nextCandidatePool });
  };

  return (
    <div className="flex flex-col gap-3">
      <Card.Section>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-text-main">
              {getI18nOrFallback(t, "builderIntelligentTitle", "Intelligent Routing Configuration")}
            </h3>
            <p className="text-xs text-text-muted mt-1">
              {getI18nOrFallback(
                t,
                "builderIntelligentDesc",
                "Configure the multi-factor scoring engine for this auto-routing combo."
              )}
            </p>
          </div>
          <Badge
            size="sm"
            variant="primary"
            icon={<Icon name="auto_awesome" size={12} />}
            className="font-semibold uppercase tracking-wide"
          >
            Intelligent
          </Badge>
        </div>
      </Card.Section>

      <Card.Section>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-text-main">
              {getI18nOrFallback(t, "candidatePoolLabel", "Candidate Pool")}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {getI18nOrFallback(
                t,
                "candidatePoolHint",
                "Select which providers this engine should evaluate. Leave empty to use all active providers."
              )}
            </p>
          </div>
          <span className="text-xs text-text-muted">
            {normalizedConfig.candidatePool.length > 0
              ? `${normalizedConfig.candidatePool.length} selected`
              : "All active providers"}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {providerOptions.length === 0 && (
            <span className="text-xs text-text-muted">
              {getI18nOrFallback(t, "candidatePoolEmpty", "No active providers available yet.")}
            </span>
          )}

          {providerOptions.map((provider) => {
            const isSelected = normalizedConfig.candidatePool.includes(provider.id);
            return (
              <Button
                key={provider.id}
                size="sm"
                variant={isSelected ? "secondary" : "outline"}
                aria-pressed={isSelected}
                onClick={() => toggleCandidateProvider(provider.id)}
                className={cn("rounded-full", isSelected && "border-primary")}
              >
                {isSelected && <Icon name="check" size={14} />}
                {provider.label}
                <span className="text-xs text-text-muted">
                  {provider.connectionCount} acct
                  {provider.connectionCount === 1 ? "" : "s"}
                </span>
              </Button>
            );
          })}
        </div>
      </Card.Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card.Section>
          <Select
            label={getI18nOrFallback(t, "modePackLabel", "Mode Pack")}
            value={normalizedConfig.modePack}
            onChange={(event) => updateConfig({ modePack: event.target.value })}
            options={MODE_PACK_OPTIONS.map((modePack) => ({
              value: modePack.id,
              label: getI18nOrFallback(
                t,
                `modePack${modePack.id[0].toUpperCase()}${modePack.id.slice(1)}`,
                modePack.label
              ),
            }))}
          />
        </Card.Section>

        <Card.Section>
          <Select
            label={getI18nOrFallback(t, "routerStrategyLabel", "Router Strategy")}
            value={normalizedConfig.routerStrategy}
            onChange={(event) => updateConfig({ routerStrategy: event.target.value })}
            options={ROUTER_STRATEGY_OPTIONS.map((strategy) => ({
              value: strategy.id,
              label:
                strategy.id === "rules"
                  ? getI18nOrFallback(t, "strategyRules", strategy.label)
                  : strategy.label,
            }))}
          />
        </Card.Section>
      </div>

      {isSlaAwareStrategy && (
        <Card.Section>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-text-main">
                {getI18nOrFallback(t, "slaRoutingTitle", "SLA targets")}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {getI18nOrFallback(
                  t,
                  "slaRoutingHint",
                  "Prefer providers that satisfy p95 latency, error-rate and optional cost targets."
                )}
              </p>
            </div>
            <Badge
              size="sm"
              variant="success"
              icon={<Icon name="verified" size={12} />}
              className="font-semibold uppercase tracking-wide"
            >
              SLA
            </Badge>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label={getI18nOrFallback(t, "slaTargetP95Label", "Target p95 latency (ms)")}
              type="number"
              min="1"
              step="100"
              value={normalizedConfig.slaTargetP95Ms ?? ""}
              placeholder="2000"
              onChange={(event) =>
                updateConfig({
                  slaTargetP95Ms: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />

            <Input
              label={getI18nOrFallback(t, "slaMaxErrorRateLabel", "Max error rate")}
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={normalizedConfig.slaMaxErrorRate ?? ""}
              placeholder="0.05"
              onChange={(event) =>
                updateConfig({
                  slaMaxErrorRate: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />

            <Input
              label={getI18nOrFallback(t, "slaMaxCostLabel", "Max cost ($ / 1M tokens)")}
              type="number"
              min="0"
              step="0.001"
              value={normalizedConfig.slaMaxCostPer1MTokens ?? ""}
              placeholder={getI18nOrFallback(t, "slaMaxCostPlaceholder", "No limit")}
              onChange={(event) =>
                updateConfig({
                  slaMaxCostPer1MTokens: event.target.value
                    ? Number(event.target.value)
                    : undefined,
                })
              }
            />
          </div>

          <Checkbox
            className="mt-3 text-xs"
            checked={normalizedConfig.slaHardConstraints}
            onChange={(event) => updateConfig({ slaHardConstraints: event.target.checked })}
            label={getI18nOrFallback(
              t,
              "slaHardConstraintsLabel",
              "Prefer strict SLA-compliant candidates before soft scoring."
            )}
          />
        </Card.Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card.Section>
          {/* Kit Slider with presets (the PresetSlider adapter takes no label/format props). */}
          <Slider
            label={getI18nOrFallback(t, "explorationRateLabel", "Exploration Rate")}
            presetsLabel={getI18nOrFallback(t, "explorationRateLabel", "Exploration Rate")}
            min={0}
            max={1}
            step={0.01}
            value={normalizedConfig.explorationRate}
            formatValue={formatPercent}
            presets={EXPLORATION_PRESETS}
            onValueChange={(next) => updateConfig({ explorationRate: Number(next || 0) })}
          />
          <p className="text-xs text-text-muted mt-2">
            {(() => {
              const percent = Math.round(normalizedConfig.explorationRate * 100);
              return getI18nOrFallback(
                t,
                "explorationRateHint",
                "{percent}% of requests can explore non-optimal providers.",
                { percent }
              ).replace("{percent}", `${percent}`);
            })()}
          </p>
        </Card.Section>

        <Card.Section>
          <Input
            label={getI18nOrFallback(t, "budgetCapLabel", "Budget Cap (USD / request)")}
            type="number"
            min="0"
            step="0.0001"
            value={normalizedConfig.budgetCap ?? ""}
            placeholder={getI18nOrFallback(t, "budgetCapPlaceholder", "No limit")}
            onChange={(event) =>
              updateConfig({
                budgetCap: event.target.value ? Number(event.target.value) : undefined,
              })
            }
          />
        </Card.Section>
      </div>

      {/* CollapsibleSection keeps the closed body mounted (inert), like the legacy <details>. */}
      <CollapsibleSection
        defaultOpen={false}
        title={getI18nOrFallback(t, "advancedWeightsTitle", "Advanced: Scoring Weights")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(normalizedConfig.weights).map(([weightKey, weightValue]) => (
            <div key={weightKey} className="rounded-lg border border-border p-3">
              <Slider
                label={getI18nOrFallback(
                  t,
                  `weight${weightKey[0].toUpperCase()}${weightKey.slice(1)}`,
                  FACTOR_LABELS[weightKey as keyof typeof DEFAULT_INTELLIGENT_WEIGHTS]
                )}
                min={0}
                max={1}
                step={0.05}
                value={Number(weightValue)}
                formatValue={formatPercent}
                onValueChange={(next) =>
                  updateConfig({
                    weights: {
                      ...normalizedConfig.weights,
                      [weightKey]: Number(next || 0),
                    },
                  })
                }
              />
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
