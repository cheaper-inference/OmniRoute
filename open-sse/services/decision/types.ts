/**
 * Shared contract for the `decision` auto-router strategy (autoCombo/decisionStrategy.ts).
 *
 * A decider answers one question: which entry of a menu of model ids should serve this
 * request. Every decider returns a `DecisionChoiceResult` and never throws; the strategy
 * turns any failure into the `rules` fallback with the reason in the log.
 */

/** `systemone` = TypeSafe System One; `http` = an operator URL; `combo-model` = in process. */
export const DECIDER_KINDS = ["systemone", "http", "combo-model"] as const;
export type DeciderKind = (typeof DECIDER_KINDS)[number];

/** Wire format an `http` decider speaks. */
export const DECISION_WIRES = ["systemone", "openai-chat"] as const;
export type DecisionWire = (typeof DECISION_WIRES)[number];

/** Log-safe failure causes. None of them carries a URL, key, prompt or upstream body. */
export const DECISION_FAILURE_REASONS = [
  "disabled",
  "not_configured",
  "missing_credential",
  "timeout",
  "http_error",
  "invalid_response",
  "out_of_menu",
  "refused",
  "cooldown",
  "network_error",
  "recursion",
] as const;
export type DecisionFailureReason = (typeof DECISION_FAILURE_REASONS)[number];

export interface DecisionChoiceRequest {
  /** Bounded user text (see menu.ts `extractDecisionUserText`). */
  state: string;
  /** Menu: model id → description sent to the decider. */
  options: Record<string, string>;
  instructions?: string;
  signal?: AbortSignal | null;
}

export type DecisionChoiceSuccess = {
  ok: true;
  choice: string;
  /** 0..1; a decider that cannot report one returns 0 (fail-safe for `minConfidence`). */
  confidence: number;
  probabilities: Record<string, number>;
  /** Model that answered, truncated for logs. */
  backendModel?: string;
  latencyMs: number;
};

export type DecisionChoiceFailure = {
  ok: false;
  reason: DecisionFailureReason;
  /** HTTP status for `http_error`. */
  status?: number | null;
  latencyMs?: number;
};

export type DecisionChoiceResult = DecisionChoiceSuccess | DecisionChoiceFailure;

export type Decider = (request: DecisionChoiceRequest) => Promise<DecisionChoiceResult>;

/** Routing instruction shared by every decider. */
export const DEFAULT_DECISION_INSTRUCTIONS =
  "Choose the cheapest model tier in this pool that can reliably complete the user's request. Use a more capable tier only when the task requires it.";

/**
 * Marks a request that is itself a decision call, so a gateway that receives it can skip
 * decision routing (#15641). Sent on every outbound decider request.
 */
export const DECISION_MODEL_REQUEST_HEADER = "x-omniroute-decision-model";

/** Longest upstream model name that may reach the log. */
export const MAX_LOGGED_MODEL_CHARS = 100;

const LOGGABLE_MODEL_NAME = /^[A-Za-z0-9][\w.:/@+-]*$/;

/**
 * The upstream-reported model name, only when it looks like a model id (no spaces, at most
 * 100 characters). It comes from the decider's response body, so anything else is dropped
 * rather than logged.
 */
export function toLoggableModelName(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const name = value.trim();
  return name.length <= MAX_LOGGED_MODEL_CHARS && LOGGABLE_MODEL_NAME.test(name) ? name : undefined;
}

export function decisionFailure(
  reason: DecisionFailureReason,
  extra: { status?: number | null; latencyMs?: number } = {}
): DecisionChoiceFailure {
  return { ok: false, reason, ...extra };
}

/**
 * True when `headers` carries the decision-call marker. Reads both a `Headers` object and
 * the plain record a client request is often copied into (case-insensitive scan) (#15641).
 */
export function isDecisionModelRequest(
  headers: { get?: (name: string) => string | null } | Record<string, unknown> | null | undefined
): boolean {
  if (!headers) return false;
  const get = (headers as { get?: (name: string) => string | null }).get;
  if (typeof get === "function") {
    try {
      if (get.call(headers, DECISION_MODEL_REQUEST_HEADER) === "1") return true;
    } catch {
      // fall through to the record scan
    }
  }
  for (const [name, value] of Object.entries(headers as Record<string, unknown>)) {
    if (name.toLowerCase() === DECISION_MODEL_REQUEST_HEADER && value === "1") return true;
  }
  return false;
}
