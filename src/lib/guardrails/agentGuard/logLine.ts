/**
 * The agent guard log line, shared by `monitor` (pre-call guardrail) and
 * `block` (dispatch gate) so both write the same eleven keys.
 *
 * Only the classifier's allowlisted signals are logged, never a credential.
 * `writeAgentGuardLog` does not catch: the caller decides what a failed write
 * means.
 */

import type { AgentClassification } from "./classifier";

export type AgentGuardLogger = {
  warn?: (...args: unknown[]) => unknown;
  info?: (...args: unknown[]) => unknown;
};

const LOG_TAG = "AGENT_GUARD";
const MAX_MODEL_LENGTH = 200;

export function writeAgentGuardLog(
  log: AgentGuardLogger | null | undefined,
  level: "warn" | "info",
  reason: string,
  entry: {
    classification: AgentClassification;
    provider: string;
    model?: string | null;
    apiKeyId?: unknown;
  }
): void {
  const { classification } = entry;
  const meta = {
    agent: classification.agent,
    thirdParty: classification.thirdParty,
    provider: entry.provider,
    model: (entry.model ?? "").slice(0, MAX_MODEL_LENGTH),
    apiKeyId: typeof entry.apiKeyId === "string" ? entry.apiKeyId : null,
    ...classification.signals,
  };
  log?.[level]?.call(log, LOG_TAG, reason, meta);
}

/**
 * The `warn` line a fail-open path writes. Carries only the error's class name,
 * never its message (which could quote a header value). Unlike the decision
 * line it catches: a failed write must not turn a fail-open into a failure.
 */
export function writeAgentGuardFailOpen(
  log: AgentGuardLogger | null | undefined,
  error: unknown
): void {
  try {
    log?.warn?.call(log, LOG_TAG, "agent guard failed open", {
      error: error instanceof Error ? error.name : typeof error,
    });
  } catch {
    // Logging is best effort; the fail-open stands.
  }
}
