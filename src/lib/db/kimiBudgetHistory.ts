import type { SqliteAdapter } from "./adapters/types";
import {
  canonicalKimiModel,
  canonicalKimiProvider,
} from "@omniroute/open-sse/config/kimiProvider.ts";

/** Historical rows stay immutable. A row matches once, including the writer's bare-model shape. */
export function readKimiBudgetHistory(
  db: SqliteAdapter,
  apiKeyId: string,
  scopeType: string,
  scopeValue: string,
  periodStartAt: number,
  recordedBefore?: number,
  spelling?: "kimi" | "moonshot"
): number | null {
  const model = canonicalKimiModel(scopeValue);
  const isProvider = scopeType === "provider" && canonicalKimiProvider(scopeValue) === "kimi";
  const isModel = scopeType === "model" && model.startsWith("kimi/");
  if (!isProvider && !isModel) return null;
  const providers = isProvider && spelling ? [spelling] : ["kimi", "moonshot"];
  const slots = providers.map(() => "?").join(",");
  const identity = isProvider
    ? `provider IN (${slots})`
    : `(model = ? OR (provider IN (${slots}) AND model = ?))`;
  const identityArgs = isProvider ? providers : [scopeValue, ...providers, model.slice(5)];
  const upper = typeof recordedBefore === "number" && Number.isFinite(recordedBefore);
  const row = db
    .prepare<{ total: number }>(
      `
    SELECT COALESCE(SUM(COALESCE(tokens_input,0) + COALESCE(tokens_output,0)
      + CASE WHEN COALESCE(tokens_reasoning,0) > COALESCE(tokens_output,0)
        THEN COALESCE(tokens_reasoning,0) ELSE 0 END),0) AS total
    FROM usage_history WHERE api_key_id = ? AND ${identity} AND timestamp >= ?
      ${upper ? "AND timestamp < ?" : ""}
  `
    )
    .get(
      apiKeyId,
      ...identityArgs,
      new Date(periodStartAt).toISOString(),
      ...(upper ? [new Date(recordedBefore).toISOString()] : [])
    );
  return Math.max(0, Math.floor(Number(row?.total || 0)));
}
