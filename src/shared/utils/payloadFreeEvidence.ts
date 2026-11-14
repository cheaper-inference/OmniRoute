/**
 * Payload free-evidence: whether a provider's own `/models` entry says the model costs nothing.
 *
 * One predicate for every place that reads a live catalog entry, so discovery, the
 * import-only-free filter and the OpenRouter catalog cannot drift apart.
 *
 * Precedence, strongest first:
 *  1. Any explicit false flag or positive price in `pricing` vetoes free evidence.
 *  2. An explicit true flag (`isFree` / `is_free` / `free`, top-level or in `pricing`).
 *  3. A `:free` id suffix, zero prompt/input and completion/output prices, or a `free` tag.
 * Unknown or malformed fields alone do not establish free evidence.
 */

type JsonRecord = Record<string, unknown>;

const FREE_FLAG_KEYS = ["isFree", "is_free", "free"] as const;

/** Numeric fields inside `pricing` that are ratios/limits, not prices. */
const NON_PRICE_KEYS = new Set([
  "discount",
  "multiplier",
  "coefficient",
  "prompt_tokens_threshold",
  "threshold",
]);

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function toPrice(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function explicitFreeFlag(entry: JsonRecord, pricing: JsonRecord | null): boolean | null {
  for (const source of [entry, pricing]) {
    if (!source) continue;
    for (const key of FREE_FLAG_KEYS) {
      if (typeof source[key] === "boolean") return source[key] as boolean;
    }
  }
  return null;
}

function hasPositivePrice(value: unknown, depth = 0): boolean {
  if (depth > 4) return false;
  if (Array.isArray(value)) return value.some((item) => hasPositivePrice(item, depth + 1));
  const record = asRecord(value);
  if (record) {
    return Object.entries(record).some(
      ([key, item]) => !NON_PRICE_KEYS.has(key) && hasPositivePrice(item, depth + 1)
    );
  }
  if (typeof value === "boolean") return false;
  const price = toPrice(value);
  return price !== null && price > 0;
}

function firstPrice(pricing: JsonRecord, keys: readonly string[]): number | null {
  for (const key of keys) {
    const price = toPrice(pricing[key]);
    if (price !== null) return price;
  }
  return null;
}

function hasFreeTag(entry: JsonRecord): boolean {
  return (
    Array.isArray(entry.tags) &&
    entry.tags.some((tag) => typeof tag === "string" && tag.trim().toLowerCase() === "free")
  );
}

/**
 * Conservative paid-price veto for decisions that can initiate billable traffic.
 * An explicit paid flag or any positive price trumps an optimistic free marker.
 * Used both by the shared free predicate and by callers whose static-catalog or
 * badge heuristics must also be vetoed by live paid evidence.
 */
export function hasPayloadPaidEvidence(entry: unknown): boolean {
  const record = asRecord(entry);
  if (!record) return false;
  const pricing = asRecord(record.pricing);
  // A contradictory pair of flags must fail closed even if another field says isFree=true.
  const explicitlyPaid = [record, pricing].some(
    (source) => source && FREE_FLAG_KEYS.some((key) => source[key] === false)
  );
  return explicitlyPaid || (pricing !== null && hasPositivePrice(pricing));
}

export function hasPayloadFreeEvidence(entry: unknown): boolean {
  const record = asRecord(entry);
  if (!record || hasPayloadPaidEvidence(record)) return false;
  const pricing = asRecord(record.pricing);

  const flag = explicitFreeFlag(record, pricing);
  if (flag !== null) return flag;

  if (typeof record.id === "string" && record.id.endsWith(":free")) return true;

  if (pricing) {
    const prompt = firstPrice(pricing, ["prompt", "input"]);
    const completion = firstPrice(pricing, ["completion", "output"]);
    if (prompt === 0 && completion === 0) return true;
  }
  return hasFreeTag(record);
}
