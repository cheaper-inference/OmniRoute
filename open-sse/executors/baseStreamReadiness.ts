/**
 * baseStreamReadiness.ts — first-byte readiness gate config for the base
 * executor ( / B17 closure).
 *
 * glm/kiro/grok-web/zed executors already run ensureStreamReadiness() on
 * stream responses; the base executor — which serves custom
 * anthropic-compatible nodes (the production shape of Volcano Ark
 * coding/agent lanes) — did not. A silent upstream therefore left clients
 * with zero bytes until their own patience ran out: production forensics
 *  recorded 233 zero-byte client aborts in a single day (worst
 * 310s) plus one stream lingering 20 minutes after the client aborted.
 *
 * The gate is scoped to anthropic-compatible providers by default and is
 * dialable via OMNIROUTE_BASE_STREAM_READINESS without a rebuild:
 *   unset  → ON for anthropic-compatible* providers, deadline =
 *            STREAM_READINESS_TIMEOUT_MS (identical to the glm gate)
 *   "auto" → same scope, deadline scaled by request size:
 *            base + estimatedInputTokens × 1.5ms, clamped to [base, 300_000]
 *            (observed prefill ≈ 0.55–0.98ms/token on GLM/ark lanes; the
 *            coefficient errs generous so cache-miss prefills are not killed
 *            mid-flight)
 *   <ms>   → same scope, fixed deadline in milliseconds
 *   "0"    → OFF entirely
 *   junk   → treated as unset (defaults are the safe posture)
 *
 * Token estimate: serialized body bytes / 3. Deliberately cheap — no extra
 * serialization pass, no tokenizer on the hot path. Chinese-heavy UTF-8
 * content runs ~3 bytes per character ≈ 1–2 tokens, so bytes/3 can
 * underestimate tokens there; the clamp and generous coefficient absorb it.
 */

export interface BaseStreamReadinessGate {
  enabled: boolean;
  timeoutMs: number;
  /** "default" | "auto" | "fixed" | "off" — surfaced for logging/tests. */
  mode: "default" | "auto" | "fixed" | "off";
}

/** Scope of the gate: custom anthropic-compatible nodes only . */
export function isBaseStreamReadinessProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && provider.startsWith("anthropic-compatible");
}

const AUTO_MS_PER_ESTIMATED_TOKEN = 1.5;
// 180s ceiling, not 300s: the combo global budget is 240s (comboTimeoutMs) —
// a deadline above it would let the global timer fire first and waste the
// gate entirely. 180s leaves ~60s for one cross-lane retry inside the budget.
const AUTO_MAX_TIMEOUT_MS = 180_000;

export function resolveBaseStreamReadiness(options: {
  provider: string | null | undefined;
  /** Byte length of the serialized request body, when known. */
  bodyByteLength?: number | null;
  /** Baseline deadline (STREAM_READINESS_TIMEOUT_MS). */
  defaultTimeoutMs: number;
  /** Raw env value (injected for tests; defaults to process.env). */
  env?: string | null | undefined;
}): BaseStreamReadinessGate {
  const { provider, defaultTimeoutMs } = options;
  const raw =
    options.env !== undefined && options.env !== null
      ? options.env
      : process.env.OMNIROUTE_BASE_STREAM_READINESS;
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (trimmed === "0") return { enabled: false, timeoutMs: 0, mode: "off" };
  if (!isBaseStreamReadinessProvider(provider)) {
    return { enabled: false, timeoutMs: 0, mode: "default" };
  }
  if (trimmed === "auto") {
    const estimatedTokens =
      typeof options.bodyByteLength === "number" && options.bodyByteLength > 0
        ? Math.ceil(options.bodyByteLength / 3)
        : 0;
    const scaled = defaultTimeoutMs + estimatedTokens * AUTO_MS_PER_ESTIMATED_TOKEN;
    return {
      enabled: true,
      timeoutMs: Math.min(AUTO_MAX_TIMEOUT_MS, Math.max(defaultTimeoutMs, Math.round(scaled))),
      mode: "auto",
    };
  }
  const fixed = Number(trimmed);
  if (trimmed !== "" && Number.isFinite(fixed) && fixed > 0) {
    return { enabled: true, timeoutMs: Math.round(fixed), mode: "fixed" };
  }
  // unset or junk → the glm-identical default gate.
  return { enabled: true, timeoutMs: defaultTimeoutMs, mode: "default" };
}
