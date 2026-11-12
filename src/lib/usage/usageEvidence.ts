/** JSON-safe metering evidence, separate from protocol-required numeric placeholders. */
export type UsageSource = "reported" | "estimated" | "unknown";
export interface FieldUsageEvidence {
  source: UsageSource;
  method?: string;
}
export interface UsageEvidence {
  input: FieldUsageEvidence;
  output: FieldUsageEvidence;
  cacheRead: FieldUsageEvidence;
  cacheCreation: FieldUsageEvidence;
}
const fields = ["input", "output", "cacheRead", "cacheCreation"] as const;
const record = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
export function usableTokenCounter(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0;
}
export function readUsageEvidence(value: unknown): UsageEvidence | null {
  let raw = value;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  const obj = record(raw),
    evidence = record(obj.usage_evidence ?? obj.usageEvidence ?? obj);
  const result = {} as UsageEvidence;
  for (const field of fields) {
    const entry = record(evidence[field]);
    if (!["reported", "estimated", "unknown"].includes(String(entry.source))) return null;
    result[field] = {
      source: entry.source as UsageSource,
      ...(typeof entry.method === "string" ? { method: entry.method } : {}),
    };
  }
  return result;
}
export function deriveUsageEvidence(value: unknown): UsageEvidence {
  const existing = readUsageEvidence(value);
  if (existing) return existing;
  const u = record(value),
    p = record(u.prompt_tokens_details),
    i = record(u.input_tokens_details);
  const evidence = (values: unknown[], estimate = false): FieldUsageEvidence =>
    values.some(usableTokenCounter)
      ? estimate
        ? { source: "estimated", method: "legacy_estimate" }
        : { source: "reported" }
      : { source: "unknown" };
  const result: UsageEvidence = {
    input: evidence(
      [u.input, u.prompt_tokens, u.input_tokens, u.promptTokenCount],
      u.estimated === true
    ),
    output: evidence(
      [u.output, u.completion_tokens, u.output_tokens, u.candidatesTokenCount],
      u.estimated === true
    ),
    cacheRead: evidence([
      u.cacheRead,
      u.cache_read_input_tokens,
      u.cached_tokens,
      u.cachedContentTokenCount,
      p.cached_tokens,
      i.cached_tokens,
    ]),
    cacheCreation: evidence([
      u.cacheCreation,
      u.cache_creation_input_tokens,
      u.cache_write_tokens,
      p.cache_creation_tokens,
      i.cache_creation_tokens,
      p.cache_write_tokens,
      i.cache_write_tokens,
    ]),
  };
  const tiers = record(u.cache_creation ?? p.cache_creation ?? i.cache_creation);
  if (
    result.cacheCreation.source === "unknown" &&
    usableTokenCounter(tiers.ephemeral_5m_input_tokens) &&
    usableTokenCounter(tiers.ephemeral_1h_input_tokens) &&
    Number.isFinite(tiers.ephemeral_5m_input_tokens + tiers.ephemeral_1h_input_tokens)
  )
    result.cacheCreation = { source: "reported" };
  if (
    u.cache_evidence === "invalid" ||
    (usableTokenCounter(u.cachedContentTokenCount) &&
      usableTokenCounter(u.promptTokenCount) &&
      u.cachedContentTokenCount > u.promptTokenCount)
  )
    result.cacheRead = { source: "unknown" };
  return result;
}
export function hasEstimatedUsageEvidence(value: unknown): boolean {
  const e = readUsageEvidence(value);
  return !!e && fields.some((f) => e[f].source === "estimated");
}
export function carryUsageEvidence<T>(from: unknown, to: T): T {
  if (!to || typeof to !== "object") return to;
  const e = deriveUsageEvidence(from);
  Object.assign(to, { usage_evidence: e }, hasEstimatedUsageEvidence(e) ? { estimated: true } : {});
  return to;
}
/** Reject malformed cache counts without creating measured misses. */
export function withoutInvalidCacheCounters<T extends Record<string, unknown>>(usage: T): T {
  let changed = false,
    invalidWrite = false;
  const clean = (source: Record<string, unknown>, names: string[]) => {
    const result = { ...source };
    for (const name of names)
      if (result[name] != null && !usableTokenCounter(result[name])) {
        delete result[name];
        changed = true;
        if (name.includes("creation") || name.includes("write")) invalidWrite = true;
      }
    return result;
  };
  const result = clean(usage, [
    "cache_read_input_tokens",
    "cached_tokens",
    "cachedContentTokenCount",
    "cache_creation_input_tokens",
    "cache_write_tokens",
  ]);
  for (const key of ["prompt_tokens_details", "input_tokens_details"])
    if (usage[key] && typeof usage[key] === "object")
      result[key] = clean(record(usage[key]), [
        "cached_tokens",
        "cache_creation_tokens",
        "cache_write_tokens",
      ]);
  if (invalidWrite) result.cache_creation_tier_status = "invalid";
  return changed ? (carryUsageEvidence(usage, result) as T) : usage;
}
/** Omitted cumulative fields retain prior evidence; explicitly invalid snapshots do not. */
export function mergeUsageEvidence(previous: unknown, incoming: unknown): UsageEvidence {
  const before = deriveUsageEvidence(previous),
    next = deriveUsageEvidence(incoming);
  for (const field of fields) {
    const rejected = field === "cacheRead" && record(incoming).cache_evidence === "invalid";
    if (next[field].source === "unknown" && !rejected) next[field] = before[field];
  }
  return next;
}
