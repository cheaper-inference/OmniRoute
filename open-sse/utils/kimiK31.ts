/**
 * Kimi K3.1 policy shared by every layer that special-cases K3.1 (#18038): the Kimi and
 * Moonshot executors, the pre-send reasoning-effort sanitizer, the recovery paths and the
 * chatCore Kimi Coding effort-variant normalizer. Keep the model matcher and the effort
 * alias table here only, so the layers cannot drift apart.
 *
 * K3.1 accepts the wire efforts low/high/max. The mappable aliases below fold onto those
 * tiers; any other value (none/off, unknown strings, non-strings) is preserved so the
 * upstream 400 reaches the client instead of a silent clamp.
 */

const KIMI_K31_MODEL_PATTERN = /(?:^|\/)(?:kimi-)?k3\.1(?:$|-)/i;

/** Mappable K3.1 effort aliases → wire tier. */
const K31_EFFORT_ALIASES: Readonly<Record<string, string>> = Object.freeze({
  ultra: "max",
  xhigh: "max",
  high: "high",
  medium: "high",
  low: "low",
  minimum: "low",
  light: "low",
  max: "max",
});

const K31_WIRE_EFFORTS: ReadonlySet<string> = new Set(Object.values(K31_EFFORT_ALIASES));

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

/** Kimi K3.1 ids, bare (`k3.1-pro`), `kimi-`-prefixed or provider-namespaced. */
export function isKimiK31Model(model: string | null | undefined): boolean {
  return KIMI_K31_MODEL_PATTERN.test(model || "");
}

/** True when `effort` (case-insensitive) is a K3.1 alias that folds onto a wire tier. */
export function isK31MappableEffort(effort: string): boolean {
  return Object.hasOwn(K31_EFFORT_ALIASES, effort.toLowerCase());
}

/** Map a K3.1 effort alias to its wire tier; anything else is returned unchanged. */
export function mapK31EffortAlias(effort: string): string {
  const key = effort.toLowerCase();
  return Object.hasOwn(K31_EFFORT_ALIASES, key) ? K31_EFFORT_ALIASES[key] : effort;
}

/** K3.1 recovery must not turn an explicit invalid value into an accepted tier. */
export function hasUnsupportedK31Effort(body: unknown): boolean {
  const record = asRecord(body);
  if (!record) return false;
  return [
    record.reasoning_effort,
    asRecord(record.reasoning)?.effort,
    asRecord(record.output_config)?.effort,
    asRecord(record.thinking)?.effort,
  ].some(
    (value) =>
      value !== undefined &&
      (typeof value !== "string" || !K31_WIRE_EFFORTS.has(value.toLowerCase()))
  );
}

/**
 * True when a K3.1 body's 400 must reach the client as sent: thinking was
 * explicitly disabled, or an effort K3.1 does not accept was set. Recovery
 * paths must not rewrite either into an accepted request.
 */
export function isK31RejectionFinal(model: string | null | undefined, body: unknown): boolean {
  const record = asRecord(body);
  if (!isKimiK31Model(model) || !record) return false;
  if (record.enable_thinking === false || asRecord(record.thinking)?.type === "disabled") {
    return true;
  }
  return hasUnsupportedK31Effort(record);
}
