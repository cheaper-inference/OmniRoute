"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@omniroute/ui-kit/button";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import SegmentedControl from "@/shared/components/SegmentedControl";
import { CardSkeleton } from "@/shared/components/Loading";
import {
  extractComboRuntimeConfig,
  getComboControlCenterTargets,
  getResolvedComboControlCenterTargets,
  summarizeComboControlCenter,
  type ComboControlCenterCombo,
  type ComboControlCenterHealth,
  type ComboControlCenterMetrics,
  type ComboControlCenterSummary,
  type ComboControlCenterTarget,
  type ComboControlCenterTargetHealth,
} from "@/lib/combos/controlCenter";
import { getProviderDisplayName } from "@/lib/display/names";

type TimeRange = "1h" | "24h" | "7d" | "30d";

type ComboMetricsResponse = {
  metrics?: ComboControlCenterMetrics | null;
  message?: string;
};

type ComboHealthResponse = {
  combos?: ComboControlCenterHealth[];
};

type CallLogEntry = {
  id?: string;
  requestId?: string;
  timestamp?: string;
  status?: number;
  model?: string;
  provider?: string;
  duration?: number;
  comboName?: string;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  error?: string | null;
};

const TIME_RANGES: TimeRange[] = ["1h", "24h", "7d", "30d"];

const STATE_VARIANT: Record<
  ComboControlCenterSummary["healthState"],
  "success" | "warning" | "error" | "info"
> = {
  healthy: "success",
  warning: "warning",
  critical: "error",
  idle: "info",
};

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      typeof json?.error === "string"
        ? json.error
        : typeof json?.error?.message === "string"
          ? json.error.message
          : `HTTP ${res.status}`;
    throw new Error(message);
  }
  return json as T;
}

function fmtPercent(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return `${Math.round(value)}%`;
}

function fmtMs(value: number | null | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "—";
  return `${Math.round(value)}ms`;
}

function fmtDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

function shortId(value: string | null | undefined, fallback: string, max = 10): string {
  if (!value) return fallback;
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function metricValue(label: string, value: string, hint?: string) {
  return (
    <div className="rounded-xl border border-border bg-bg-subtle p-3">
      <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
      {hint && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

function stateLabel(
  state: ComboControlCenterSummary["healthState"],
  t: ReturnType<typeof useTranslations>
): string {
  return t(`state.${state}`);
}

function healthReasonLabel(reason: string, t: ReturnType<typeof useTranslations>): string {
  const keyByReason: Record<string, string> = {
    "No recent combo traffic": "noRecentTraffic",
    "Low success rate": "lowSuccessRate",
    "Success rate below target": "successBelowTarget",
    "High fallback rate": "highFallbackRate",
    "Elevated fallback rate": "elevatedFallbackRate",
    "At least one quota is exhausted": "quotaExhausted",
    "Quota is nearly exhausted": "quotaNearlyExhausted",
    "Quota is getting low": "quotaGettingLow",
    "Traffic distribution is highly skewed": "trafficHighlySkewed",
    "Combo looks healthy": "comboHealthy",
  };
  const key = keyByReason[reason];
  return key ? t(`healthReason.${key}`) : reason;
}

function targetHealthTone(target: ComboControlCenterTarget | ComboControlCenterTargetHealth) {
  const health = "health" in target ? target.health : target;
  if (!health) return "border-border bg-surface text-text-muted";
  if (health.lastStatus === "error" || health.quotaIsExhausted) {
    return "border-error/20 bg-error/10 text-error";
  }
  if ((health.quotaRemainingPct ?? 100) < 25 || (health.successRate ?? 100) < 95) {
    return "border-warning/20 bg-warning/10 text-warning";
  }
  return "border-success/20 bg-success/10 text-success";
}

function TargetConfiguredRow({ target }: { target: ComboControlCenterTarget }) {
  const t = useTranslations("comboControl");
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {target.index + 1}
            </span>
            <Badge size="sm" className="uppercase tracking-wide">
              {target.kind === "combo-ref" ? t("nestedCombo") : t("modelTarget")}
            </Badge>
            {target.weight > 0 && (
              <Badge size="sm" variant="warning">
                {t("weight", { value: target.weight })}
              </Badge>
            )}
          </div>
          <p className="mt-2 truncate font-mono text-sm text-text-main">{target.label}</p>
          <p className="mt-1 text-xs text-text-muted">
            {target.provider ? getProviderDisplayName(target.provider) : t("comboReference")} ·{" "}
            {t("accountShort", { id: shortId(target.connectionId, t("dynamic")) })}
          </p>
        </div>
        <div className={`rounded-lg border px-3 py-2 text-xs ${targetHealthTone(target)}`}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span>{t("requests")}</span>
            <span className="text-right font-semibold">{target.health?.requests ?? 0}</span>
            <span>{t("success")}</span>
            <span className="text-right font-semibold">
              {fmtPercent(target.health?.successRate)}
            </span>
            <span>{t("latency")}</span>
            <span className="text-right font-semibold">{fmtMs(target.health?.avgLatencyMs)}</span>
            <span>{t("quota")}</span>
            <span className="text-right font-semibold">
              {fmtPercent(target.health?.quotaRemainingPct)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResolvedTargetRow({ target }: { target: ComboControlCenterTargetHealth }) {
  const t = useTranslations("comboControl");
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="truncate font-mono text-sm text-text-main">
            {target.model || t("unknown")}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {target.provider ? getProviderDisplayName(target.provider) : t("unknownProvider")} ·{" "}
            {t("accountShort", { id: shortId(target.connectionId, t("dynamic")) })} ·{" "}
            {t("keyShort", { id: shortId(target.executionKey, t("dynamic")) })}
          </p>
        </div>
        <div className={`rounded-lg border px-3 py-2 text-xs ${targetHealthTone(target)}`}>
          {t("resolvedTargetMetrics", {
            requests: target.requests ?? 0,
            success: fmtPercent(target.successRate),
            latency: fmtMs(target.avgLatencyMs),
            quota: fmtPercent(target.quotaRemainingPct),
          })}
        </div>
      </div>
    </div>
  );
}

function RecentLogRow({ log }: { log: CallLogEntry }) {
  const t = useTranslations("comboControl");
  const ok = typeof log.status === "number" && log.status >= 200 && log.status < 400;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm text-text-main">
            <span className={ok ? "text-success" : "text-error"}>{log.status || "—"}</span>{" "}
            {log.model || t("unknownModel")}
          </p>
          <p className="text-xs text-text-muted">
            {fmtDate(log.timestamp)} · {log.provider || t("unknownProvider")} ·{" "}
            {t("stepShort", {
              id: shortId(log.comboStepId || log.comboExecutionKey, t("dynamic")),
            })}
          </p>
        </div>
        <div className="text-xs text-text-muted">{fmtMs(log.duration)}</div>
      </div>
      {log.error && <p className="mt-1 text-xs text-error">{log.error}</p>}
    </div>
  );
}

export default function ComboControlCenterClient({ comboId }: { comboId: string }) {
  const t = useTranslations("comboControl");
  const [combo, setCombo] = useState<ComboControlCenterCombo | null>(null);
  const [metrics, setMetrics] = useState<ComboControlCenterMetrics | null>(null);
  const [health, setHealth] = useState<ComboControlCenterHealth | null>(null);
  const [logs, setLogs] = useState<CallLogEntry[]>([]);
  const [range, setRange] = useState<TimeRange>("24h");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Built-in auto combos (auto, auto/*) are virtual — no persisted row/UUID.
      // They materialize through /api/combos/auto?id= which returns the same
      // combo shape; the UUID-keyed combo-health endpoint can't serve them, so
      // the health lookup is skipped (it would only 400 anyway).
      const isVirtualAutoCombo = comboId === "auto" || comboId.startsWith("auto/");
      const comboData = await fetchJson<ComboControlCenterCombo>(
        isVirtualAutoCombo
          ? `/api/combos/auto?id=${encodeURIComponent(comboId)}`
          : `/api/combos/${encodeURIComponent(comboId)}`
      );
      const [metricsData, healthData, logsData] = await Promise.all([
        fetchJson<ComboMetricsResponse>(
          `/api/combos/metrics?combo=${encodeURIComponent(comboData.name || "")}`
        ).catch(() => ({ metrics: null })),
        isVirtualAutoCombo
          ? Promise.resolve(null)
          : fetchJson<ComboHealthResponse>(
              `/api/usage/combo-health?range=${range}&comboId=${comboId}`
            )
              .then((data) => data.combos?.[0] || null)
              .catch(() => null),
        fetchJson<CallLogEntry[]>(
          `/api/usage/call-logs?combo=1&search=${encodeURIComponent(comboData.name || "")}&limit=8`
        ).catch(() => []),
      ]);

      setCombo(comboData);
      setMetrics(metricsData.metrics || null);
      setHealth(healthData);
      setLogs(toArray<CallLogEntry>(logsData));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [comboId, range, t]);

  useEffect(() => {
    // Async continuation — see react-hooks/set-state-in-effect.
    void (async () => {
      await load();
    })();
  }, [load]);

  const summary = useMemo(
    () => (combo ? summarizeComboControlCenter(combo, metrics, health) : null),
    [combo, metrics, health]
  );
  const configuredTargets = useMemo(
    () => (combo ? getComboControlCenterTargets(combo, health) : []),
    [combo, health]
  );
  const resolvedTargets = useMemo(() => getResolvedComboControlCenterTargets(health), [health]);
  const runtimeConfig = useMemo(() => (combo ? extractComboRuntimeConfig(combo) : {}), [combo]);

  if (loading && !combo) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error && !combo) {
    return (
      <div className="space-y-4">
        <Link href="/dashboard/combos" className="text-sm text-primary hover:underline">
          ← {t("backToCombos")}
        </Link>
        <Card className="border border-error/20 bg-error/10 p-6">
          <h1 className="text-lg font-semibold text-error">{t("unavailable")}</h1>
          <p className="mt-2 text-sm text-error">{error}</p>
        </Card>
      </div>
    );
  }

  if (!combo || !summary) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        breadcrumbs={
          <Link
            href="/dashboard/combos"
            className="text-sm text-text-muted hover:text-text-main hover:underline"
          >
            ← {t("backToCombos")}
          </Link>
        }
        // Status badges sit above the h1 (eyebrow), so the heading's name is just the title.
        eyebrow={
          <span className="inline-flex flex-wrap items-center gap-2 normal-case tracking-normal">
            <Badge variant={STATE_VARIANT[summary.healthState]} className="font-medium">
              {stateLabel(summary.healthState, t)}
            </Badge>
            <Badge>{summary.isActive ? t("active") : t("disabled")}</Badge>
          </span>
        }
        title={t("title")}
        description={t.rich("description", {
          combo: () => <code className="font-mono text-text-main">{combo.name}</code>,
        })}
        actions={
          <>
            <Button variant="outline" icon="refresh" onClick={() => void load()}>
              {t("refresh")}
            </Button>
            <Link href="/dashboard/combos" className={buttonVariants()}>
              {t("editInCombos")}
            </Link>
          </>
        }
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metricValue(t("requests"), String(summary.totalRequests), t("rangeWindow", { range }))}
        {metricValue(t("success"), fmtPercent(summary.successRate), t("runtimeHealthBlend"))}
        {metricValue(t("latency"), fmtMs(summary.avgLatencyMs), t("averageResponseTime"))}
        {metricValue(
          t("worstQuota"),
          fmtPercent(summary.worstQuotaRemainingPct),
          t("providerAccountTelemetry")
        )}
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-main">{t("overview")}</h2>
            <p className="mt-1 text-sm text-text-muted">{t("overviewDescription")}</p>
          </div>
          <SegmentedControl
            size="sm"
            aria-label={t("timeRange")}
            value={range}
            onChange={(item) => setRange(item as TimeRange)}
            options={TIME_RANGES.map((item) => ({ value: item, label: item }))}
          />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">{t("strategy")}</p>
            <p className="mt-1 font-semibold text-text-main">{summary.strategy}</p>
          </div>
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">{t("targets")}</p>
            <p className="mt-1 font-semibold text-text-main">
              {t("targetCounts", {
                configured: summary.targetCount,
                resolved: resolvedTargets.length,
              })}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-bg-subtle p-3">
            <p className="text-xs uppercase tracking-wide text-text-muted">{t("providers")}</p>
            <p className="mt-1 font-semibold text-text-main">{summary.providerCount}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface p-3">
          <p className="text-sm font-medium text-text-main">{t("healthReasons")}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {summary.healthReasons.map((reason) => (
              <Badge key={reason}>{healthReasonLabel(reason, t)}</Badge>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text-main">{t("configuredTargets")}</h2>
              <p className="mt-1 text-sm text-text-muted">{t("configuredTargetsDescription")}</p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {configuredTargets.length === 0 ? (
              <p className="text-sm text-text-muted">{t("noConfiguredTargets")}</p>
            ) : (
              configuredTargets.map((target) => (
                <TargetConfiguredRow key={target.id} target={target} />
              ))
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">{t("runtimeConfig")}</h2>
          <p className="mt-1 text-sm text-text-muted">{t("runtimeConfigDescription")}</p>
          <div className="mt-4 space-y-2">
            {Object.keys(runtimeConfig).length === 0 ? (
              <p className="text-sm text-text-muted">{t("noRuntimeConfig")}</p>
            ) : (
              Object.entries(runtimeConfig).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <span className="text-sm text-text-muted">{key}</span>
                  <code className="max-w-45 truncate text-xs text-text-main">
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                  </code>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-text-main">{t("resolvedTargets")}</h2>
        <p className="mt-1 text-sm text-text-muted">{t("resolvedTargetsDescription")}</p>
        <div className="mt-4 space-y-3">
          {resolvedTargets.length === 0 ? (
            <p className="text-sm text-text-muted">{t("noResolvedTargetHealth")}</p>
          ) : (
            resolvedTargets.map((target) => (
              <ResolvedTargetRow
                key={target.executionKey || `${target.model}-${target.connectionId}`}
                target={target}
              />
            ))
          )}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">{t("quotaDistribution")}</h2>
          <div className="mt-4 space-y-3">
            {(health?.quotaHealth?.providers || []).length === 0 ? (
              <p className="text-sm text-text-muted">{t("noQuotaSnapshots")}</p>
            ) : (
              health?.quotaHealth?.providers?.map((provider) => (
                <div
                  key={provider.provider}
                  className="rounded-lg border border-border bg-surface px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-text-main">
                      {getProviderDisplayName(provider.provider)}
                    </span>
                    <span className={provider.isExhausted ? "text-error" : "text-text-muted"}>
                      {fmtPercent(provider.remainingPct)} · {provider.trend}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div className="rounded-lg border border-border bg-bg-subtle px-3 py-2 text-sm text-text-muted">
              {t("usageSkew")}:{" "}
              <span className="text-text-main">{summary.usageSkew.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-lg font-semibold text-text-main">{t("recentDecisions")}</h2>
          <p className="mt-1 text-sm text-text-muted">{t("recentDecisionsDescription")}</p>
          <div className="mt-4 space-y-2">
            {logs.length === 0 ? (
              <p className="text-sm text-text-muted">{t("noRecentLogs")}</p>
            ) : (
              logs.map((log) => (
                <RecentLogRow key={log.id || `${log.timestamp}-${log.model}`} log={log} />
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-text-main">{t("quickLinks")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            [t("comboHealth"), "/dashboard/analytics/combo-health"],
            [t("callLogs"), "/dashboard/logs"],
            [t("costs"), "/dashboard/costs"],
            [t("quota"), "/dashboard/quota"],
            [t("playground"), "/dashboard/playground"],
            [t("providers"), "/dashboard/providers"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className={buttonVariants({ variant: "outline" })}>
              {label}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
