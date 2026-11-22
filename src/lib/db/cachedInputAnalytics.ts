import { getDbInstance } from "./core";
import { buildUnifiedSource, type BuildUnifiedSourceOptions } from "./usageAnalytics/sources";

export type CachedInputMeasurement = {
  cachedInputTokens: number | null;
  cachedInputTokensComplete: boolean;
};

type MeasurementRow = {
  provider?: string;
  model?: string;
  cachedInputTokens: number | null;
  cachedInputTokensComplete: number;
};

export function getCachedInputAnalytics(
  options: BuildUnifiedSourceOptions,
  normalizeModel: (model: string) => string = (model) => model
): {
  summary: CachedInputMeasurement;
  byModel: Array<CachedInputMeasurement & { model: string }>;
  byProviderModel: Map<string, CachedInputMeasurement>;
} {
  const { unifiedSource, unifiedParams } = buildUnifiedSource(options);
  const db = getDbInstance();
  const columns = `SUM(cached_input_tokens) as cachedInputTokens,
    COALESCE(SUM(cached_input_unknown_requests), 0) = 0 as cachedInputTokensComplete`;
  const summary = db
    .prepare(`SELECT ${columns} FROM ${unifiedSource} AS _u`)
    .get(unifiedParams) as MeasurementRow;
  const rows = db
    .prepare(`SELECT model, ${columns} FROM ${unifiedSource} AS _u GROUP BY model`)
    .all(unifiedParams) as MeasurementRow[];
  const filteredHistoryMissing = keyFilteredHistoryMissing(options);
  const modelOf = (row: MeasurementRow) => normalizeModel((row.model ?? "unknown").toLowerCase());
  const models = new Map<string, CachedInputMeasurement & { model: string }>();
  for (const row of rows) {
    const model = modelOf(row);
    const existing = models.get(model) ?? {
      model,
      ...emptyMeasurement(filteredHistoryMissing),
    };
    models.set(model, addMeasurement(existing, row));
  }
  const providerRows = db
    .prepare(
      `SELECT provider, model, ${columns} FROM ${unifiedSource} AS _u GROUP BY provider, model`
    )
    .all(unifiedParams) as MeasurementRow[];
  const byProviderModel = new Map<string, CachedInputMeasurement>();
  for (const row of providerRows) {
    const key = `${(row.provider ?? "unknown").toLowerCase()}:${modelOf(row)}`;
    const existing = byProviderModel.get(key) ?? emptyMeasurement(filteredHistoryMissing);
    byProviderModel.set(key, addMeasurement(existing, row));
  }
  return {
    summary: {
      cachedInputTokens: summary?.cachedInputTokens ?? null,
      cachedInputTokensComplete:
        !filteredHistoryMissing && Boolean(summary?.cachedInputTokensComplete ?? true),
    },
    byModel: Array.from(models.values()),
    byProviderModel,
  };
}

function emptyMeasurement(filteredHistoryMissing: boolean): CachedInputMeasurement {
  return { cachedInputTokens: null, cachedInputTokensComplete: !filteredHistoryMissing };
}

function addMeasurement<T extends CachedInputMeasurement>(existing: T, row: MeasurementRow): T {
  if (row.cachedInputTokens !== null)
    existing.cachedInputTokens = (existing.cachedInputTokens ?? 0) + row.cachedInputTokens;
  existing.cachedInputTokensComplete &&= Boolean(row.cachedInputTokensComplete);
  return existing;
}

// Key-filtered history omits archives because they contain no key identity.
function keyFilteredHistoryMissing(options: BuildUnifiedSourceOptions): boolean {
  const archiveConditions = ["date < @cutoff", "total_requests > 0"];
  const archiveParams: Record<string, string> = { cutoff: options.rawCutoffDate };
  if (options.sinceIso) {
    archiveConditions.push("date >= @since");
    archiveParams.since = options.sinceIso.slice(0, 10);
  }
  if (options.untilIso) {
    archiveConditions.push("date <= @until");
    archiveParams.until = options.untilIso.slice(0, 10);
  }
  return (
    !!options.apiKeyWhere &&
    !!getDbInstance()
      .prepare(`SELECT 1 FROM daily_usage_summary WHERE ${archiveConditions.join(" AND ")} LIMIT 1`)
      .get(archiveParams)
  );
}
