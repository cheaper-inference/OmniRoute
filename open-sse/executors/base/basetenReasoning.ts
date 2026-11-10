// Baseten Model APIs reasoning contract (inference.baseten.co/v1).
//
// - Every reasoning model reads the top-level `reasoning_effort`, and Baseten
//   validates it per model (400 outside the set), so unsupported tiers are
//   clamped to the nearest supported one.
// - Opt-in models (GLM 4.7 / GLM 5.2, Kimi K2.6 / K2.7-Code, Nemotron 3 Ultra)
//   keep thinking OFF unless `chat_template_args.enable_thinking: true` is sent.
//   Note: Baseten uses `chat_template_args`, not NVIDIA's `chat_template_kwargs`.
// - Disabling always uses `reasoning_effort: "none"`; `enable_thinking: false`
//   is never emitted (GLM 5.2 rejects it, and a missing flag already means off).
// Effort sets come from Baseten's supported-models documentation.
import { clampToLearned } from "../../services/learnedReasoningEffortCaps.ts";

type BasetenReasoningRule = {
  pattern: RegExp;
  efforts: Set<string>;
  optIn: boolean;
};

const ALL_EFFORTS = ["none", "minimal", "low", "medium", "high", "xhigh", "max"];

function rule(pattern: RegExp, efforts: string[], optIn = false): BasetenReasoningRule {
  return { pattern, efforts: new Set(efforts), optIn };
}

// Order matters: the first matching rule wins (DeepSeek-V4-Pro-0813 before DeepSeek-V4-Pro).
const BASETEN_REASONING_RULES: readonly BasetenReasoningRule[] = [
  rule(/deepseek-v4-pro-0813/i, ["none", "low", "high", "max"]),
  rule(/deepseek-v4-(?:pro|flash)/i, ALL_EFFORTS),
  rule(/glm-5\.2(?:$|[^\d])/i, ["none", "high", "max"], true),
  rule(/glm-5\.3(?:$|[^\d])/i, ["none", "low", "high", "max"]),
  rule(/glm-4\.7(?:$|[^\d])/i, ["none", "high"], true),
  rule(/kimi-k3(?:$|[^\d])/i, ["none", "low", "high", "max"]),
  rule(/kimi-k2\.[67](?:$|[^\d])/i, ["none", "high"], true),
  rule(/nemotron-3-ultra/i, ["none", "high"], true),
  rule(/inkling|gpt-oss-120b/i, ALL_EFFORTS),
];

type ReasoningLog = { info?: (tag: string, msg: string) => void } | null | undefined;

function asPlainObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function findBasetenRule(provider: string, model: string | undefined) {
  if (provider !== "baseten" || !model) return null;
  return BASETEN_REASONING_RULES.find((r) => r.pattern.test(model)) ?? null;
}

export function isBasetenReasoningModel(provider: string, model: string | undefined): boolean {
  return findBasetenRule(provider, model) !== null;
}

/** Remove a nested `effort` key, dropping the parent object when it becomes empty. */
function dropNestedEffort(next: Record<string, unknown>, key: string): void {
  const parent = asPlainObject(next[key]);
  if (!parent || !Object.prototype.hasOwnProperty.call(parent, "effort")) return;
  const rest = { ...parent };
  delete rest.effort;
  if (Object.keys(rest).length === 0) delete next[key];
  else next[key] = rest;
}

/** Merge `enable_thinking: true` into caller `chat_template_args` without overriding it. */
function withEnableThinking(raw: unknown): unknown {
  if (raw !== undefined && !asPlainObject(raw)) return raw;
  const args = { ...((raw as Record<string, unknown> | undefined) ?? {}) };
  if (!Object.prototype.hasOwnProperty.call(args, "enable_thinking")) args.enable_thinking = true;
  return args;
}

/**
 * Map OmniRoute's reasoning-effort carriers onto Baseten's contract for the
 * models listed above. Other providers and unlisted Baseten slugs are returned
 * unchanged. Idempotent, so it is safe on both the DefaultExecutor transform
 * and the final provider sanitizer.
 */
export function mapBasetenReasoningParams(
  body: unknown,
  provider: string,
  model: string | undefined,
  log?: ReasoningLog
): unknown {
  const basetenRule = findBasetenRule(provider, model);
  const b = asPlainObject(body);
  if (!basetenRule || !b) return body;

  const reasoning = asPlainObject(b.reasoning);
  const outputConfig = asPlainObject(b.output_config);
  const effort = b.reasoning_effort ?? reasoning?.effort ?? outputConfig?.effort;
  if (typeof effort !== "string" || !effort) return body;
  const effortStr = effort.toLowerCase();

  const next: Record<string, unknown> = { ...b };
  dropNestedEffort(next, "reasoning");
  dropNestedEffort(next, "output_config");

  if (effortStr === "none") {
    next.reasoning_effort = "none";
    return next;
  }

  if (effortStr === "auto") {
    // Model-default effort: only the opt-in switch, no effort value.
    delete next.reasoning_effort;
  } else {
    const mapped = clampToLearned(effortStr, basetenRule.efforts) ?? effortStr;
    next.reasoning_effort = mapped;
    if (mapped !== effortStr) {
      log?.info?.(
        "REASONING_SANITIZE",
        `baseten/${model}: clamped reasoning_effort ${effortStr} → ${mapped} (Baseten contract)`
      );
    }
  }

  if (basetenRule.optIn) next.chat_template_args = withEnableThinking(next.chat_template_args);
  return next;
}
