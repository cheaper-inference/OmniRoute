/**
 * Model identities, mode wire values and anti-downgrade policy for the
 * Gemini App (Robin) native provider.
 *
 * Derived from `ShawTim/gemini-app2api` — `src/openai-contract.mjs` (MIT).
 * See ./LICENSE for the upstream MIT notice.
 */

export const NATIVE_MODELS = ["gemini-neon", "gemini-hydrogen", "gemini-flash-lite"] as const;
export type GeminiAppModelId = (typeof NATIVE_MODELS)[number];

/** Temporary compatibility alias while clients migrate from retired argon. */
export const MODEL_ALIASES: Readonly<Record<string, GeminiAppModelId>> = {
  "gemini-argon": "gemini-neon",
};

/** Native ModeCategory wire values. Never auto/Plus. */
export const MODEL_MODES: Readonly<Record<GeminiAppModelId, number>> = {
  "gemini-neon": 3,
  "gemini-hydrogen": 1,
  "gemini-flash-lite": 6,
};

/** Expected native `attribution` value for each model (null = not asserted). */
const MODEL_ATTRIBUTIONS: Readonly<Record<GeminiAppModelId, string | null>> = {
  "gemini-neon": "neon",
  "gemini-hydrogen": "hydrogen",
  "gemini-flash-lite": null,
};

// Ordinary effort hints must never opt into native asynchronous Deep Think (3).
// Extended thinking (2) is the normal-turn default, not an ordered scale.
export const REASONING_EFFORT_LEVELS: Readonly<Record<string, number>> = {
  none: 0,
  minimal: 0,
  low: 1,
  medium: 2,
  high: 2,
  xhigh: 2,
};

export const PROMPT_MAX_BYTES = 4 * 1024 * 1024;

export function canonicalModel(model: unknown): string | undefined {
  if (typeof model !== "string") return undefined;
  const stripped = model.startsWith("models/") ? model.slice(7) : model;
  return Object.hasOwn(MODEL_ALIASES, stripped) ? MODEL_ALIASES[stripped] : stripped;
}

export function isNativeModel(model: string): model is GeminiAppModelId {
  return (NATIVE_MODELS as readonly string[]).includes(model);
}

/** Resolve and validate the native thinking level from a normalized request. */
export function resolveThinkingLevel(body: Record<string, unknown>): number {
  const controls: number[] = [];
  for (const effort of [
    body.reasoning_effort,
    (body.reasoning as { effort?: unknown } | undefined)?.effort,
  ]) {
    if (effort === undefined) continue;
    if (typeof effort !== "string" || !Object.hasOwn(REASONING_EFFORT_LEVELS, effort)) {
      throw new Error("INVALID_REASONING_EFFORT");
    }
    controls.push(REASONING_EFFORT_LEVELS[effort]);
  }
  if (body.thinking_level !== undefined) {
    const level = body.thinking_level;
    if (!Number.isSafeInteger(level) || (level as number) < 0 || (level as number) > 4) {
      throw new Error("INVALID_THINKING_LEVEL");
    }
    controls.push(level as number);
  }
  if (controls.some((level) => level !== controls[0])) {
    throw new Error("CONFLICTING_THINKING_SETTINGS");
  }
  const level = controls[0] ?? 2;
  // Deep Think (3) is an asynchronous job placeholder, not a chat completion.
  if (level === 3) throw new Error("NATIVE_DEEP_THINK_UNSUPPORTED");
  return level;
}

export interface NativeModelEvidence {
  resolvedModeCategory: number | bigint | null;
  attribution: string | null;
  fallback: number | bigint | null;
  downgradeReason: number | bigint | null;
}

export interface ModelVerification {
  downgraded: boolean;
  reason: string | null;
}

/**
 * Verify the model Google actually resolved against the one we asked for.
 * A silent downgrade must surface as an error for account rotation instead
 * of returning a degraded answer to the caller.
 */
export function verifyResolvedModel(
  requestedModel: GeminiAppModelId,
  evidence: NativeModelEvidence
): ModelVerification {
  const expectedMode = MODEL_MODES[requestedModel];
  const expectedAttribution = MODEL_ATTRIBUTIONS[requestedModel];
  const modeMismatch =
    evidence.resolvedModeCategory !== null &&
    Number(evidence.resolvedModeCategory) !== expectedMode;
  const attributionMismatch =
    expectedAttribution !== null &&
    evidence.attribution !== null &&
    evidence.attribution !== expectedAttribution;
  const downgraded = modeMismatch || attributionMismatch;
  return {
    downgraded,
    reason: downgraded
      ? [
          modeMismatch
            ? `mode=${String(evidence.resolvedModeCategory)} expected=${expectedMode}`
            : null,
          attributionMismatch
            ? `attribution=${String(evidence.attribution)} expected=${expectedAttribution}`
            : null,
          evidence.fallback !== null ? `fallback=${String(evidence.fallback)}` : null,
          evidence.downgradeReason !== null
            ? `downgradeReason=${String(evidence.downgradeReason)}`
            : null,
        ]
          .filter((part): part is string => part !== null)
          .join(" ")
      : null,
  };
}
