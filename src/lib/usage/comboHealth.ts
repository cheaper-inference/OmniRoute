import { getComboById, getCombos } from "@/lib/db/combos";
import { getDbInstance } from "@/lib/db/core";
import {
  getSyncedAvailableModelsByConnection,
  SYNCED_AVAILABLE_MODELS_MALFORMED,
  type SyncedAvailableModelsByConnection,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getQuotaSnapshots, isUnreportedQuotaSnapshot } from "@/lib/db/quotaSnapshots";
import {
  inspectTargetResilience,
  type ProviderConnectionView,
} from "@/lib/usage/resilienceExplain";
import { isModelAdvertisedByConnection } from "@/domain/connectionModelRules";
import { isSelfHostedChatProvider } from "@/shared/constants/providers";
import { getComboMetrics } from "@omniroute/open-sse/services/comboMetrics.ts";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo.ts";
import type { ComboInput, ComboLike } from "@omniroute/open-sse/services/combo/types.ts";
import type {
  ComboRecord,
  ComboHealthMetrics,
  ComboHealthResponse,
  QuotaSnapshotRow,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

type ModelUsageRow = {
  model: string | null;
  requests: number | null;
  totalTokens: number | null;
};

type PerformanceRow = {
  totalRequests: number | null;
  successCount: number | null;
  avgLatencyMs: number | null;
};

type QuotaSnapshotView = {
  connectionId?: string;
  remainingPercentage?: number | null;
  isExhausted?: number;
  createdAt?: string;
};

type ProviderHealth = {
  provider: string;
  remainingPct: number | null;
  isExhausted: boolean;
  trend: "improving" | "stable" | "declining";
  dropReason: "no-snapshot" | null;
};

export type HealthDropReason =
  | import("../../../open-sse/services/autoCombo/strictZeroCostFilter").StrictZeroCostExclusionReason
  | "hidePaidModels"
  | "modelLockout"
  | "no-snapshot";

type ResolvedComboTargetView = {
  stepId: string;
  executionKey: string;
  modelStr: string;
  provider: string;
  connectionId: string | null;
  allowedConnectionIds?: string[] | null;
  label: string | null;
};

type TargetHealthWithEligibility = NonNullable<ComboHealthMetrics["targetHealth"]>[number] & {
  /** null means eligibility could not be proven and consumers must fail conservative. */
  eligibleConnectionIds: string[] | null;
};

type RuntimeTargetMetricView = {
  requests?: number;
  successRate?: number;
  avgLatencyMs?: number;
  lastStatus?: "ok" | "error" | null;
  lastUsedAt?: string | null;
};

type HistoricalTargetAggregateRow = {
  metricScope: "execution" | "step";
  metricKey: string | null;
  requests: number | null;
  successCount: number | null;
  avgLatencyMs: number | null;
  lastStatusCode: number | null;
  lastUsedAt: string | null;
};

type HistoricalTargetMetrics = {
  byExecutionKey: Map<string, HistoricalTargetMetricView>;
  byStepId: Map<string, HistoricalTargetMetricView>;
};

type HistoricalTargetMetricView = {
  requests: number;
  successRate: number;
  avgLatencyMs: number;
  lastStatus: "ok" | "error" | null;
  lastUsedAt: string | null;
};

const RANGE_MS: Record<UtilizationTimeRange, number> = {
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

function getRangeStartIso(range: UtilizationTimeRange, now = Date.now()): string {
  return new Date(now - RANGE_MS[range]).toISOString();
}

function roundNumber(value: number, digits = 2): number {
  if (!Number.isFinite(value)) return 0;
  return Number(value.toFixed(digits));
}

function toSafeNumber(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const count = sorted.length;
  const sum = sorted.reduce((accumulator, value) => accumulator + value, 0);
  if (sum === 0) return 0;

  let weightedSum = 0;
  for (let index = 0; index < count; index += 1) {
    weightedSum += (index + 1) * sorted[index];
  }

  return (2 * weightedSum) / (count * sum) - (count + 1) / count;
}

export function buildProviderHealth(
  provider: string,
  allSnapshots: QuotaSnapshotRow[]
): ProviderHealth {
  // #10095: a window the upstream did not report is a 0% placeholder, not a reading.
  const snapshots = allSnapshots.filter((snapshot) => !isUnreportedQuotaSnapshot(snapshot));
  if (snapshots.length === 0) {
    return {
      provider,
      remainingPct: null,
      // stable: no data yet, not exhausted — null pct, not 0
      isExhausted: false,
      trend: "stable",
      dropReason: "no-snapshot",
    };
  }

  const histories = new Map<string, QuotaSnapshotRow[]>();
  for (const snapshot of snapshots) {
    const snapshotView = snapshot as unknown as QuotaSnapshotView;
    const connectionId = snapshotView.connectionId || "unknown";
    const existing = histories.get(connectionId) ?? [];
    existing.push(snapshot);
    histories.set(connectionId, existing);
  }

  const firstValues: number[] = [];
  const lastValues: number[] = [];
  let isExhausted = false;

  for (const history of histories.values()) {
    const ordered = [...history].sort((left, right) => {
      const leftView = left as unknown as QuotaSnapshotView;
      const rightView = right as unknown as QuotaSnapshotView;
      return (leftView.createdAt || "").localeCompare(rightView.createdAt || "");
    });
    const firstSnapshot = ordered.find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const lastSnapshot = [...ordered].reverse().find((entry) => {
      const entryView = entry as unknown as QuotaSnapshotView;
      return entryView.remainingPercentage !== null && entryView.remainingPercentage !== undefined;
    });
    const firstSnapshotView = firstSnapshot as unknown as QuotaSnapshotView | undefined;
    const lastSnapshotView = lastSnapshot as unknown as QuotaSnapshotView | undefined;

    if (
      firstSnapshotView?.remainingPercentage !== null &&
      firstSnapshotView?.remainingPercentage !== undefined
    ) {
      firstValues.push(firstSnapshotView.remainingPercentage);
    }

    if (
      lastSnapshotView?.remainingPercentage !== null &&
      lastSnapshotView?.remainingPercentage !== undefined
    ) {
      lastValues.push(lastSnapshotView.remainingPercentage);
    }

    const latestEntry = ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined;
    isExhausted = isExhausted || latestEntry?.isExhausted === 1;
  }

  const firstAverage =
    firstValues.length > 0
      ? firstValues.reduce((accumulator, value) => accumulator + value, 0) / firstValues.length
      : 0;
  const lastAverage =
    lastValues.length > 0
      ? lastValues.reduce((accumulator, value) => accumulator + value, 0) / lastValues.length
      : 0;
  const delta = lastAverage - firstAverage;

  let trend: ProviderHealth["trend"] = "stable";
  if (delta >= 5) trend = "improving";
  if (delta <= -5) trend = "declining";

  return {
    provider,
    remainingPct: lastValues.length === 0 ? null : roundNumber(lastAverage),
    isExhausted,
    trend,
    dropReason: null,
  };
}

function buildConnectionHealth(
  provider: string,
  connectionId: string,
  allSnapshots: QuotaSnapshotRow[]
): ProviderHealth | null {
  const snapshots = allSnapshots.filter((snapshot) => !isUnreportedQuotaSnapshot(snapshot));
  if (snapshots.length === 0) return null;

  const ordered = [...snapshots].sort((left, right) => {
    const leftView = left as unknown as QuotaSnapshotView;
    const rightView = right as unknown as QuotaSnapshotView;
    return (leftView.createdAt || "").localeCompare(rightView.createdAt || "");
  });
  const firstSnapshot = ordered.find((entry) => {
    const snapshotView = entry as unknown as QuotaSnapshotView;
    return (
      snapshotView.remainingPercentage !== null && snapshotView.remainingPercentage !== undefined
    );
  });
  const lastSnapshot = [...ordered].reverse().find((entry) => {
    const snapshotView = entry as unknown as QuotaSnapshotView;
    return (
      snapshotView.remainingPercentage !== null && snapshotView.remainingPercentage !== undefined
    );
  });

  const firstRemaining =
    (firstSnapshot as unknown as QuotaSnapshotView | undefined)?.remainingPercentage ?? null;
  const lastRemaining =
    (lastSnapshot as unknown as QuotaSnapshotView | undefined)?.remainingPercentage ?? null;
  const delta = (lastRemaining ?? 0) - (firstRemaining ?? 0);

  let trend: ProviderHealth["trend"] = "stable";
  if (delta >= 5) trend = "improving";
  if (delta <= -5) trend = "declining";

  return {
    provider: `${provider}:${connectionId}`,
    remainingPct: lastRemaining === null ? null : roundNumber(lastRemaining),
    isExhausted:
      (ordered[ordered.length - 1] as unknown as QuotaSnapshotView | undefined)?.isExhausted === 1,
    trend,
    dropReason: null,
  };
}

function buildUsageSkew(
  comboName: string,
  comboModels: string[],
  since: string
): ComboHealthMetrics["usageSkew"] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT
         model,
         COUNT(*) as requests,
         SUM(COALESCE(tokens_in, 0) + COALESCE(tokens_out, 0)) as totalTokens
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?
       GROUP BY model`
    )
    .all(comboName, since) as ModelUsageRow[];

  const usageByModel = new Map<string, { requests: number; tokens: number }>();
  for (const model of comboModels) {
    usageByModel.set(model, { requests: 0, tokens: 0 });
  }

  for (const row of rows) {
    const model =
      typeof row.model === "string" && row.model.trim().length > 0 ? row.model : "unknown";
    usageByModel.set(model, {
      requests: toSafeNumber(row.requests),
      tokens: toSafeNumber(row.totalTokens),
    });
  }

  const modelDistributionEntries = Array.from(usageByModel.entries());
  const totalRequests = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.requests,
    0
  );
  const totalTokens = modelDistributionEntries.reduce(
    (accumulator, [, usage]) => accumulator + usage.tokens,
    0
  );

  return {
    modelDistribution: modelDistributionEntries.map(([model, usage]) => ({
      model,
      requestShare: totalRequests > 0 ? roundNumber(usage.requests / totalRequests, 4) : 0,
      tokenShare: totalTokens > 0 ? roundNumber(usage.tokens / totalTokens, 4) : 0,
    })),
    giniCoefficient: roundNumber(
      calculateGini(modelDistributionEntries.map(([, usage]) => usage.requests)),
      4
    ),
  };
}

function buildPerformance(comboName: string, since: string): ComboHealthMetrics["performance"] {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) as totalRequests,
         SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successCount,
         AVG(duration) as avgLatencyMs
       FROM call_logs
       WHERE combo_name = ?
         AND timestamp >= ?`
    )
    .get(comboName, since) as PerformanceRow | undefined;

  const totalRequests = toSafeNumber(row?.totalRequests);
  const successCount = toSafeNumber(row?.successCount);
  const avgLatencyMs = toSafeNumber(row?.avgLatencyMs);

  return {
    avgLatencyMs: roundNumber(avgLatencyMs),
    successRate: totalRequests > 0 ? roundNumber(successCount / totalRequests, 4) : 0,
    totalRequests,
  };
}

export function buildQuotaHealth(
  providers: string[],
  since: string
): ComboHealthMetrics["quotaHealth"] {
  const providerHealth = providers.map((provider) =>
    buildProviderHealth(provider, getQuotaSnapshots({ provider, since }))
  );

  const nonNull = providerHealth
    .map((entry) => entry.remainingPct)
    .filter((v): v is number => typeof v === "number");
  const worst = nonNull.length > 0 ? Math.min(...nonNull) : null;

  return {
    providers: providerHealth,
    worstRemainingPct: worst === null ? null : roundNumber(worst),
  };
}

function getHistoricalTargetMetrics(comboName: string, since: string): HistoricalTargetMetrics {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `WITH target_logs AS (
         SELECT
           id,
           NULLIF(combo_execution_key, '') AS executionKey,
           NULLIF(combo_step_id, '') AS stepId,
           status,
           duration,
           timestamp
         FROM call_logs
         WHERE combo_name = ?
           AND timestamp >= ?
           AND (
             NULLIF(combo_execution_key, '') IS NOT NULL
             OR NULLIF(combo_step_id, '') IS NOT NULL
           )
       ),
       scoped_logs AS (
         SELECT
           'execution' AS metricScope,
           executionKey AS metricKey,
           id,
           status,
           duration,
           timestamp
         FROM target_logs
         WHERE executionKey IS NOT NULL
         UNION ALL
         SELECT
           'step' AS metricScope,
           stepId AS metricKey,
           id,
           status,
           duration,
           timestamp
         FROM target_logs
         WHERE stepId IS NOT NULL
       ),
       aggregate_metrics AS (
         SELECT
           metricScope,
           metricKey,
           COUNT(*) AS requests,
           SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) AS successCount,
           AVG(duration) AS avgLatencyMs,
           MAX(timestamp) AS lastUsedAt
         FROM scoped_logs
         GROUP BY metricScope, metricKey
       ),
       latest_metrics AS (
         SELECT metricScope, metricKey, status AS lastStatusCode
         FROM (
           SELECT
             metricScope,
             metricKey,
             status,
             ROW_NUMBER() OVER (
               PARTITION BY metricScope, metricKey
               ORDER BY timestamp DESC, id DESC
             ) AS rowRank
           FROM scoped_logs
         )
         WHERE rowRank = 1
       )
       SELECT
         aggregate_metrics.metricScope,
         aggregate_metrics.metricKey,
         aggregate_metrics.requests,
         aggregate_metrics.successCount,
         aggregate_metrics.avgLatencyMs,
         latest_metrics.lastStatusCode,
         aggregate_metrics.lastUsedAt
       FROM aggregate_metrics
       LEFT JOIN latest_metrics
         ON latest_metrics.metricScope = aggregate_metrics.metricScope
        AND latest_metrics.metricKey = aggregate_metrics.metricKey
       ORDER BY aggregate_metrics.metricScope ASC, aggregate_metrics.metricKey ASC`
    )
    .all(comboName, since) as HistoricalTargetAggregateRow[];

  const metrics: HistoricalTargetMetrics = {
    byExecutionKey: new Map(),
    byStepId: new Map(),
  };
  for (const row of rows) {
    const metricKey = toNonEmptyString(row.metricKey);
    if (!metricKey) continue;

    const requests = toSafeNumber(row.requests);
    const successCount = toSafeNumber(row.successCount);
    const statusCode = toSafeNumber(row.lastStatusCode);
    const metric = {
      requests,
      successRate: requests > 0 ? Math.round((successCount / requests) * 100) : 0,
      avgLatencyMs: Math.round(toSafeNumber(row.avgLatencyMs)),
      lastStatus: statusCode > 0 ? (statusCode < 400 ? "ok" : "error") : null,
      lastUsedAt: toNonEmptyString(row.lastUsedAt),
    } satisfies HistoricalTargetMetricView;

    if (row.metricScope === "execution") {
      metrics.byExecutionKey.set(metricKey, metric);
    } else {
      metrics.byStepId.set(metricKey, metric);
    }
  }

  return metrics;
}

async function resolveEligibleConnectionIds(
  target: ResolvedComboTargetView,
  providerConnections: ProviderConnectionView[] | null,
  syncedModels: SyncedAvailableModelsByConnection | null,
  now: number
): Promise<string[] | null> {
  if (providerConnections === null) return null;

  try {
    const resilience = await inspectTargetResilience({
      provider: target.provider,
      model: target.modelStr,
      connectionId: target.connectionId,
      allowedConnectionIds: target.allowedConnectionIds,
      providerConnections,
      now,
    });
    return resilience.accounts
      .filter((account) => account.state === "eligible")
      .filter((account) => {
        if (!syncedModels || syncedModels[SYNCED_AVAILABLE_MODELS_MALFORMED]) return true;
        const advertised = syncedModels[account.connectionId];
        if (!Array.isArray(advertised) || advertised.length === 0) return true;
        return isModelAdvertisedByConnection(
          target.modelStr,
          new Set(advertised.flatMap((model) => (model.id ? [model.id] : [])))
        );
      })
      .map((account) => account.connectionId);
  } catch {
    return null;
  }
}

type TargetQuotaView = {
  quotaRemainingPct: number | null;
  quotaIsExhausted: boolean | null;
  quotaTrend: "improving" | "stable" | "declining" | null;
  quotaScope: "connection" | "provider" | "none";
};

/** Quota for the pinned connection when it has snapshots, else the provider-wide rollup. */
function resolveTargetQuota(target: ResolvedComboTargetView, since: string): TargetQuotaView {
  if (target.connectionId) {
    const connectionHealth = buildConnectionHealth(
      target.provider,
      target.connectionId,
      getQuotaSnapshots({
        provider: target.provider,
        connectionId: target.connectionId,
        since,
      })
    );
    if (connectionHealth) {
      return {
        quotaRemainingPct: connectionHealth.remainingPct,
        quotaIsExhausted: connectionHealth.isExhausted,
        quotaTrend: connectionHealth.trend,
        quotaScope: "connection",
      };
    }
  }

  const providerSnapshots = getQuotaSnapshots({ provider: target.provider, since });
  if (providerSnapshots.length > 0) {
    const providerHealth = buildProviderHealth(target.provider, providerSnapshots);
    return {
      quotaRemainingPct: providerHealth.remainingPct,
      quotaIsExhausted: providerHealth.isExhausted,
      quotaTrend: providerHealth.trend,
      quotaScope: "provider",
    };
  }
  return { quotaRemainingPct: null, quotaIsExhausted: null, quotaTrend: null, quotaScope: "none" };
}

function pickHistoricalTargetMetric(
  target: ResolvedComboTargetView,
  historicalMetrics: HistoricalTargetMetrics
): HistoricalTargetMetricView | null {
  if (target.connectionId) {
    const concreteExecutionKey = `${target.stepId}@${target.connectionId}`;
    return (
      historicalMetrics.byExecutionKey.get(concreteExecutionKey) ??
      historicalMetrics.byExecutionKey.get(target.executionKey) ??
      null
    );
  }
  return (
    historicalMetrics.byStepId.get(target.stepId) ??
    historicalMetrics.byExecutionKey.get(target.executionKey) ??
    null
  );
}

async function buildTargetHealth(
  comboName: string,
  targets: ResolvedComboTargetView[],
  since: string,
  activeConnectionsByProvider: Map<string, ProviderConnectionView[]> | null,
  syncedModelsByProvider: Map<string, SyncedAvailableModelsByConnection>,
  now: number
): Promise<TargetHealthWithEligibility[]> {
  const comboMetrics = getComboMetrics(comboName);
  const historicalMetrics = getHistoricalTargetMetrics(comboName, since);

  return Promise.all(
    targets.map(async (target) => {
      const historicalMetric = pickHistoricalTargetMetric(target, historicalMetrics);
      const runtimeMetric =
        historicalMetric === null
          ? ((comboMetrics?.byTarget?.[target.executionKey] ||
              comboMetrics?.byTarget?.[target.stepId] ||
              null) as RuntimeTargetMetricView | null)
          : null;

      return {
        executionKey: target.executionKey,
        stepId: target.stepId,
        model: target.modelStr,
        provider: target.provider,
        connectionId: target.connectionId,
        label: target.label,
        requests: toSafeNumber(historicalMetric?.requests ?? runtimeMetric?.requests),
        successRate: toSafeNumber(historicalMetric?.successRate ?? runtimeMetric?.successRate),
        avgLatencyMs: toSafeNumber(historicalMetric?.avgLatencyMs ?? runtimeMetric?.avgLatencyMs),
        lastStatus: historicalMetric?.lastStatus ?? runtimeMetric?.lastStatus ?? null,
        lastUsedAt: historicalMetric?.lastUsedAt ?? runtimeMetric?.lastUsedAt ?? null,
        ...resolveTargetQuota(target, since),
        eligibleConnectionIds: await resolveEligibleConnectionIds(
          target,
          activeConnectionsByProvider?.get(target.provider) ??
            (activeConnectionsByProvider === null ? null : []),
          syncedModelsByProvider.get(target.provider) ?? null,
          now
        ),
      };
    })
  );
}

/** ComboRecord is a loose DB row; the resolver only reads fields it validates itself. */
function resolveComboTargetViews(
  combo: ComboRecord,
  allCombos: ComboRecord[]
): ResolvedComboTargetView[] {
  return resolveNestedComboTargets(
    combo as unknown as ComboLike,
    allCombos as unknown as ComboInput[]
  ) as ResolvedComboTargetView[];
}

async function buildComboHealth(
  combo: ComboRecord,
  since: string,
  allCombos: ComboRecord[],
  activeConnectionsByProvider: Map<string, ProviderConnectionView[]> | null,
  syncedModelsByProvider: Map<string, SyncedAvailableModelsByConnection>,
  now: number
): Promise<ComboHealthMetrics | null> {
  const comboId = typeof combo.id === "string" ? combo.id : "";
  const comboName = typeof combo.name === "string" ? combo.name : "";
  if (!comboId || !comboName) return null;

  const targets = resolveComboTargetViews(combo, allCombos);
  const models = targets.map((target) => target.modelStr);
  const providers = Array.from(new Set(targets.map((target) => target.provider)));

  return {
    comboId,
    comboName,
    strategy:
      typeof combo.strategy === "string" && combo.strategy.trim().length > 0
        ? combo.strategy
        : "priority",
    models,
    targetHealth: await buildTargetHealth(
      comboName,
      targets,
      since,
      activeConnectionsByProvider,
      syncedModelsByProvider,
      now
    ),
    quotaHealth: buildQuotaHealth(providers, since),
    usageSkew: buildUsageSkew(comboName, models, since),
    performance: buildPerformance(comboName, since),
  };
}

export async function buildComboHealthResponse(opts: {
  range: UtilizationTimeRange;
  comboId?: string;
  now?: number;
  combos?: ComboRecord[];
}): Promise<ComboHealthResponse> {
  const now = opts.now ?? Date.now();
  const since = getRangeStartIso(opts.range, now);
  const allCombos = opts.combos ?? ((await getCombos()) as ComboRecord[]);
  let combos: ComboRecord[] = [];

  if (opts.comboId) {
    const combo =
      allCombos.find((entry) => entry.id === opts.comboId) ||
      ((await getComboById(opts.comboId)) as ComboRecord | null);
    combos = combo ? [combo] : [];
  } else {
    combos = allCombos;
  }

  let activeConnectionsByProvider: Map<string, ProviderConnectionView[]> | null = null;
  try {
    const activeConnections = (await getProviderConnections({
      isActive: true,
    })) as ProviderConnectionView[];
    activeConnectionsByProvider = new Map<string, ProviderConnectionView[]>();
    for (const connection of activeConnections) {
      if (typeof connection.provider !== "string" || !connection.provider) continue;
      const providerConnections = activeConnectionsByProvider.get(connection.provider) ?? [];
      providerConnections.push(connection);
      activeConnectionsByProvider.set(connection.provider, providerConnections);
    }
  } catch {
    activeConnectionsByProvider = null;
  }

  const targetProviders = new Set<string>();
  for (const combo of combos) {
    for (const target of resolveComboTargetViews(combo, allCombos)) {
      if (isSelfHostedChatProvider(target.provider)) targetProviders.add(target.provider);
    }
  }
  const syncedModelsByProvider = new Map<string, SyncedAvailableModelsByConnection>();
  await Promise.all(
    [...targetProviders].map(async (provider) => {
      try {
        syncedModelsByProvider.set(provider, await getSyncedAvailableModelsByConnection(provider));
      } catch {
        // Auth routing also treats missing/malformed synced inventory as unknown (fail open).
      }
    })
  );

  const health = await Promise.all(
    combos.map((combo) =>
      buildComboHealth(
        combo,
        since,
        allCombos,
        activeConnectionsByProvider,
        syncedModelsByProvider,
        now
      )
    )
  );

  return {
    timeRange: opts.range,
    combos: health.filter((combo): combo is ComboHealthMetrics => combo !== null),
  };
}
