"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Slider } from "@omniroute/ui-kit/slider";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Badge from "@/shared/components/Badge";
import Icon from "@/shared/components/Icon";
import Select from "@/shared/components/Select";
import { cn } from "@/shared/utils/cn";

// ── Types ────────────────────────────────────────────────────────────────────

interface TargetSimulation {
  provider: string;
  model: string;
  strategy: string;
  rank: number;
  estimatedCost: number;
  estimatedLatencyMs: number;
  status: "available" | "no_quota" | "degraded" | "error" | "unknown";
  maxTokens?: number;
  contextWindow?: number;
}

interface SimulateResponse {
  comboId?: string;
  comboName: string;
  strategy: string;
  targets: TargetSimulation[];
  totalEstimatedCost: number;
  totalEstimatedLatencyMs: number;
  warnings: string[];
  errors: string[];
}

interface Combo {
  id: string;
  name: string;
  strategy: string;
  targets: string;
  isActive: boolean;
}

const formatTokens = (value: number) =>
  value >= 1000 ? `${Math.round(value / 100) / 10}K` : String(value);
const PROMPT_TOKEN_PRESETS = [500, 4000, 32000, 100000].map((value) => ({
  value,
  label: formatTokens(value),
}));

const TARGET_TONE: Partial<Record<TargetSimulation["status"], string>> = {
  available: "border-success/30 bg-success/5",
  error: "border-error/30 bg-error/5",
  unknown: "border-warning/30 bg-warning/5",
};

// ── Status helpers ───────────────────────────────────────────────────────────

function StatusTag({ status }: { status: TargetSimulation["status"] }) {
  const t = useTranslations("combos");
  const map: Record<
    TargetSimulation["status"],
    { labelKey: string; variant: "success" | "error" | "warning" | "info" }
  > = {
    available: { labelKey: "playgroundStatusAvailable", variant: "success" },
    no_quota: { labelKey: "playgroundStatusNoQuota", variant: "error" },
    degraded: { labelKey: "playgroundStatusDegraded", variant: "warning" },
    error: { labelKey: "playgroundStatusError", variant: "error" },
    unknown: { labelKey: "playgroundStatusUnknown", variant: "info" },
  };
  return (
    <Badge variant={map[status].variant} size="sm">
      {t(map[status].labelKey)}
    </Badge>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ComboPlaygroundClient() {
  const t = useTranslations("combos");
  const [combos, setCombos] = useState<Combo[]>([]);
  const [selectedComboId, setSelectedComboId] = useState("");
  const [promptTokens, setPromptTokens] = useState(500);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulateResponse | null>(null);

  // Fetch combos on mount
  useEffect(() => {
    fetch("/api/combos")
      .then((r) => r.json())
      .then((data) => {
        const list: Combo[] = Array.isArray(data) ? data : (data?.combos ?? data?.data ?? []);
        setCombos(list);
        if (list.length > 0) setSelectedComboId(list[0].id);
      })
      .catch(() => {});
  }, []);

  const simulate = useCallback(async () => {
    if (!selectedComboId) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/playground/simulate-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comboId: selectedComboId,
          promptTokens,
        }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
      else setResult(data);
    } catch {
      setResult({
        comboName: t("playgroundStatusError"),
        strategy: "-",
        targets: [],
        totalEstimatedCost: 0,
        totalEstimatedLatencyMs: 0,
        warnings: [],
        errors: [t("playgroundNetworkError")],
      });
    } finally {
      setLoading(false);
    }
  }, [selectedComboId, promptTokens, t]);

  return (
    <div className="space-y-6">
      <PageHeader compact title={t("playgroundTitle")} description={t("playgroundDescription")} />

      {/* Configuration Panel */}
      <Card>
        <div className="p-4 space-y-4">
          <h2 className="text-sm font-semibold">{t("playgroundConfiguration")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Combo Selector */}
            <Select
              label={t("comboLabel")}
              value={selectedComboId}
              onChange={(e) => setSelectedComboId(e.target.value)}
              disabled={combos.length === 0}
              placeholder={combos.length === 0 ? t("playgroundNoCombosConfigured") : undefined}
              options={combos.map((c) => ({
                value: c.id,
                label: `${c.name} (${c.strategy}, ${c.isActive ? t("active") : t("inactive")})`,
              }))}
            />

            {/* Prompt Tokens */}
            <Slider
              label={t("playgroundEstimatedPromptTokens")}
              presetsLabel={t("playgroundEstimatedPromptTokens")}
              min={100}
              max={100000}
              step={100}
              value={promptTokens}
              onValueChange={setPromptTokens}
              presets={PROMPT_TOKEN_PRESETS}
            />
          </div>

          <Button
            icon="play_arrow"
            onClick={simulate}
            loading={loading}
            disabled={combos.length === 0}
          >
            {loading ? t("playgroundSimulating") : t("playgroundSimulateRoute")}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Combo Overview */}
          <Card>
            <div className="p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">{t("playgroundRoutingPath")}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-text-muted">
                    {t("playgroundStrategy")}: <strong>{result.strategy}</strong>
                  </span>
                  <span className="text-text-muted">
                    {t("playgroundEstimatedCost")}:{" "}
                    <strong>${result.totalEstimatedCost.toFixed(6)}</strong>
                  </span>
                  <span className="text-text-muted">
                    {t("playgroundEstimatedLatency")}:{" "}
                    <strong>{result.totalEstimatedLatencyMs.toFixed(0)}ms</strong>
                  </span>
                </div>
              </div>

              {/* Visual Cascade */}
              <div className="space-y-0">
                {result.targets.map((target, i) => (
                  <div key={i}>
                    {/* Arrow between targets */}
                    {i > 0 && (
                      <div className="flex justify-center py-1">
                        <div className="flex flex-col items-center text-text-muted">
                          <Icon name="arrow_downward" size={16} />
                          {result.strategy === "priority" && (
                            <span className="text-xs">{t("playgroundFallback")}</span>
                          )}
                          {result.strategy === "weighted" && (
                            <span className="text-xs">
                              {t("playgroundWeight", { value: target.rank })}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Target Card */}
                    <div
                      className={cn(
                        "border rounded-lg p-3",
                        TARGET_TONE[target.status] ?? "border-border bg-surface/50"
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {target.rank}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{target.provider}</div>
                            <div className="text-xs text-text-muted font-mono">{target.model}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <StatusTag status={target.status} />
                          <span className="text-xs text-text-muted">
                            ${target.estimatedCost.toFixed(6)}
                          </span>
                          <span className="text-xs text-text-muted">
                            {target.estimatedLatencyMs}ms
                          </span>
                          {target.contextWindow && (
                            <span className="text-xs text-text-muted">
                              {(target.contextWindow / 1000).toFixed(0)}K ctx
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Warnings & Errors */}
          {result.warnings.length > 0 && (
            <Card>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-warning">
                  {t("playgroundWarningCount", { count: result.warnings.length })}
                </h3>
                {result.warnings.map((w, i) => (
                  <p key={i} className="text-sm text-text-muted flex items-start gap-2">
                    <Icon name="warning" size={16} className="mt-0.5 shrink-0 text-warning" />
                    {w}
                  </p>
                ))}
              </div>
            </Card>
          )}

          {result.errors.length > 0 && (
            <Card>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-error">
                  {t("playgroundErrorCount", { count: result.errors.length })}
                </h3>
                {result.errors.map((e, i) => (
                  <p key={i} className="text-sm text-error flex items-start gap-2">
                    <Icon name="block" size={16} className="mt-0.5 shrink-0" />
                    {e}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Empty State */}
      {!result && combos.length > 0 && (
        <Card>
          <div className="p-8 text-center">
            <p className="text-text-muted">
              {t.rich("playgroundEmptyHint", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
        </Card>
      )}

      {combos.length === 0 && (
        <Card>
          <div className="p-8 text-center">
            <p className="text-text-muted">
              {t("playgroundNoCombosYet")}{" "}
              <Link href="/dashboard/combos" className="text-primary hover:underline">
                {t("playgroundCreateFirst")}
              </Link>
              .
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
