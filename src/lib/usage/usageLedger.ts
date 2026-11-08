import type { ModelPricingRegistry } from "./modelPricingRegistry.ts";

export type UsageStatus =
  "success" | "failed" | "rate_limited" | "timeout" | "cancelled" | "incomplete";

export type UsageOutcome = "completed" | "failed" | "incomplete" | "aborted";

const TERMINAL_OUTCOMES: Record<string, UsageOutcome> = {
  completed: "completed",
  "response.completed": "completed",
  failed: "failed",
  "response.failed": "failed",
  incomplete: "incomplete",
  "response.incomplete": "incomplete",
  body_stall: "incomplete",
  body_overflow: "incomplete",
  cancelled: "aborted",
  canceled: "aborted",
  "response.cancelled": "aborted",
  "response.canceled": "aborted",
};

/**
 * One outcome class for every consumer. A recorded fact (client abort, terminal event)
 * beats the HTTP status, so a 200 that carried `response.incomplete` is not "completed".
 * Only a row with no known terminal fact falls back to the status code.
 */
export function classifyUsageOutcome(facts: {
  status?: number | null;
  terminalStatus?: string | null;
  aborted?: boolean;
}): UsageOutcome {
  if (facts.aborted) return "aborted";
  const terminal = TERMINAL_OUTCOMES[String(facts.terminalStatus ?? "").toLowerCase()];
  if (terminal) return terminal;
  const status = Number(facts.status);
  if (status === 499) return "aborted";
  return status >= 200 && status < 400 ? "completed" : "failed";
}

export interface UsageRecord {
  id: string;
  providerId: string;
  connectionId?: string;
  modelId: string;
  poolId?: string;
  allocation?: number;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
  latencyMs: number;
  status: UsageStatus;
  createdAt: string;
}

export interface UsageRecordInput extends Omit<UsageRecord, "totalTokens" | "estimatedCostUsd"> {
  totalTokens?: number;
  estimatedCostUsd?: number;
}

export function createUsageRecord(
  input: UsageRecordInput,
  pricing?: ModelPricingRegistry
): UsageRecord {
  const inputTokens = Number.isFinite(input.inputTokens) ? input.inputTokens : undefined;
  const outputTokens = Number.isFinite(input.outputTokens) ? input.outputTokens : undefined;
  const totalTokens =
    input.totalTokens ??
    (inputTokens !== undefined || outputTokens !== undefined
      ? (inputTokens ?? 0) + (outputTokens ?? 0)
      : undefined);
  const estimatedCostUsd =
    input.estimatedCostUsd ??
    (pricing && inputTokens !== undefined && outputTokens !== undefined
      ? pricing.estimate(input.providerId, input.modelId, inputTokens, outputTokens)
      : undefined);
  return {
    ...input,
    ...(inputTokens !== undefined ? { inputTokens } : {}),
    ...(outputTokens !== undefined ? { outputTokens } : {}),
    ...(totalTokens !== undefined ? { totalTokens } : {}),
    ...(estimatedCostUsd !== undefined ? { estimatedCostUsd } : {}),
  };
}

export function summarizeUsage(records: UsageRecord[]) {
  return records.reduce(
    (summary, record) => {
      summary.requests += 1;
      summary.successes += record.status === "success" ? 1 : 0;
      summary.incomplete += record.status === "incomplete" ? 1 : 0;
      summary.failures += record.status === "success" || record.status === "incomplete" ? 0 : 1;
      summary.inputTokens += record.inputTokens ?? 0;
      summary.outputTokens += record.outputTokens ?? 0;
      summary.totalTokens += record.totalTokens ?? 0;
      summary.estimatedCostUsd =
        summary.estimatedCostUsd === undefined || record.estimatedCostUsd === undefined
          ? undefined
          : summary.estimatedCostUsd + record.estimatedCostUsd;
      summary.latencyMs += record.latencyMs;
      return summary;
    },
    {
      requests: 0,
      successes: 0,
      failures: 0,
      incomplete: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCostUsd: 0 as number | undefined,
      latencyMs: 0,
    }
  );
}
