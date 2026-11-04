import { estimateCompressionTokens } from "./stats.ts";
import type { CompressionResult, CompressionStats } from "./types.ts";
import { jsonSha256 } from "../../utils/jsonHash.ts";

export interface LiveZoneOptions {
  principalId?: string;
  sessionId?: string;
  variant: unknown;
  ttlMinutes?: number;
  /** Protect upstream implicit caches: a cold/mismatched prefix is sent unchanged. */
  preserveRawPrefixOnMiss?: boolean;
}

interface LiveZoneEntry {
  rawItemDigests: string[];
  rawStableFieldsDigest: string;
  transformedPrefix: unknown[];
  transformedStableFields: Record<string, unknown>;
  stats: CompressionStats | null;
  /** Sparse, digest-validated raw prefix; large unchanged messages are never retained. */
  rawPrefixPatches?: Array<{ index: number; value: unknown }>;
  lastAccess: number;
  expiresAt: number;
  bytes: number;
}

interface LiveZoneContext {
  field: "messages" | "input";
  key: string;
  rawItems: unknown[];
  rawItemDigests: string[];
  rawStableFieldsDigest: string;
  ttlMs: number;
  now: number;
}

const MAX_ENTRIES = 100;
const MAX_ENTRY_BYTES = 2 * 1024 * 1024;
const MAX_TOTAL_BYTES = 32 * 1024 * 1024;
const DEFAULT_TTL_MINUTES = 5;
const STABLE_PREFIX_FIELDS = [
  "system",
  "systemInstruction",
  "system_instruction",
  "instructions",
  "tools",
  "tool_choice",
] as const;

const entries = new Map<string, LiveZoneEntry>();
let totalBytes = 0;

function serialize(value: unknown): string | null {
  try {
    const serialized = JSON.stringify(value);
    return typeof serialized === "string" ? serialized : null;
  } catch {
    return null;
  }
}

function digest(value: unknown): string | null {
  // jsonSha256 computes sha256hex(JSON.stringify(value)) WITHOUT materializing the
  // multi-MB string, avoiding the #7847 OOM-class transient on large tool-message
  // items (e.g. base64 screenshots). Throws on non-serializable values, matching
  // the previous JSON.stringify behavior which the caller treats as a miss.
  try {
    return jsonSha256(value);
  } catch {
    return null;
  }
}

function cloneItems(items: unknown[]): unknown[] | null {
  try {
    return structuredClone(items);
  } catch {
    const serialized = serialize(items);
    if (serialized === null) return null;
    try {
      return JSON.parse(serialized) as unknown[];
    } catch {
      return null;
    }
  }
}

function cloneValue<T>(value: T): T | null {
  try {
    return structuredClone(value);
  } catch {
    const serialized = serialize(value);
    if (serialized === null) return null;
    try {
      return JSON.parse(serialized) as T;
    } catch {
      return null;
    }
  }
}

function pickStableFields(body: Record<string, unknown>): Record<string, unknown> | null {
  const fields: Record<string, unknown> = {};
  for (const field of STABLE_PREFIX_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) fields[field] = body[field];
  }
  return cloneValue(fields);
}

function sequenceField(body: Record<string, unknown>): "messages" | "input" | null {
  if (Array.isArray(body.messages)) return "messages";
  if (Array.isArray(body.input)) return "input";
  return null;
}

function isToolOutputItem(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    item.role === "tool" ||
    item.role === "function" ||
    item.role === "tool_result" ||
    item.type === "function_call_output" ||
    item.type === "local_shell_call_output" ||
    item.type === "apply_patch_call_output" ||
    item.type === "computer_call_output" ||
    item.type === "tool_result"
  );
}

// Payload text may change, but role/type and all call linkage must retain their source slot.
function itemIdentity(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return digest(
    Object.fromEntries(
      Object.entries(value).filter(([key]) => key !== "content" && key !== "output")
    )
  );
}

function toolLinkage(value: unknown): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const item = value as Record<string, unknown>;
  const link = item.tool_call_id ?? item.call_id ?? item.tool_use_id ?? item.id;
  if (typeof link === "string" && link.length > 0) return `call:${link}`;
  // Legacy function results use the function name rather than a call ID.
  return item.role === "function" && typeof item.name === "string" && item.name.length > 0
    ? `function:${item.name}`
    : null;
}

function makeKey(options: LiveZoneOptions, field: string): string | null {
  const principal = options.principalId?.trim();
  const session = options.sessionId?.trim();
  const variant = digest(options.variant);
  if (!principal || !session || !variant) return null;
  // A raw-prefix baseline must never reuse an older entry that transformed its prefix.
  return `${principal}:${session}:${field}:${variant}${options.preserveRawPrefixOnMiss ? ":raw-prefix" : ""}`;
}

function deleteEntry(key: string): void {
  const existing = entries.get(key);
  if (!existing) return;
  totalBytes -= existing.bytes;
  entries.delete(key);
}

function prune(now: number): void {
  for (const [key, entry] of entries) {
    if (now >= entry.expiresAt) deleteEntry(key);
  }
  while (entries.size > MAX_ENTRIES || totalBytes > MAX_TOTAL_BYTES) {
    const oldest = entries.keys().next().value as string | undefined;
    if (!oldest) break;
    deleteEntry(oldest);
  }
}

function store(
  key: string,
  rawItemDigests: string[],
  rawStableFieldsDigest: string,
  result: CompressionResult,
  field: "messages" | "input",
  now: number,
  ttlMs: number
): void {
  const transformedItems = result.body[field];
  // Reuse maps raw positions to transformed positions; a shape-changing pass is not reusable.
  if (!Array.isArray(transformedItems) || transformedItems.length !== rawItemDigests.length) return;
  const transformedPrefix = cloneItems(transformedItems);
  const transformedStableFields = pickStableFields(result.body);
  const stats = cloneValue(result.stats);
  if (!transformedPrefix || !transformedStableFields) return;
  const serialized = serialize({ transformedPrefix, transformedStableFields, stats });
  if (serialized === null) return;
  const bytes = Buffer.byteLength(serialized, "utf8") + rawItemDigests.length * 64;
  if (bytes > MAX_ENTRY_BYTES) return;

  deleteEntry(key);
  entries.set(key, {
    rawItemDigests,
    rawStableFieldsDigest,
    transformedPrefix,
    transformedStableFields,
    stats,
    lastAccess: now,
    expiresAt: now + ttlMs,
    bytes,
  });
  totalBytes += bytes;
  prune(now);
}

/**
 * A protected prefix never needs a complete in-memory copy. Store per-item
 * digests and only transformed items, reconstructing unchanged items from the
 * next request after all digests have been verified. This also works for raw
 * baselines larger than the 2 MiB entry limit.
 */
function storeSparseRawPrefix(ctx: LiveZoneContext, result: CompressionResult): boolean {
  const items = result.body[ctx.field];
  if (!Array.isArray(items) || items.length !== ctx.rawItemDigests.length) return false;
  const patches: Array<{ index: number; value: unknown }> = [];
  for (let index = 0; index < items.length; index++) {
    const itemDigest = digest(items[index]);
    if (!itemDigest) return false;
    if (itemDigest === ctx.rawItemDigests[index]) continue;
    const value = cloneValue(items[index]);
    if (value === null) return false;
    patches.push({ index, value });
  }
  const stats = cloneValue(result.stats);
  if (result.stats && !stats) return false;
  const serialized = serialize({ patches, stats });
  if (serialized === null) return false;
  const bytes = Buffer.byteLength(serialized, "utf8") + ctx.rawItemDigests.length * 64 + 64;
  if (bytes > MAX_ENTRY_BYTES) return false;

  deleteEntry(ctx.key);
  entries.set(ctx.key, {
    rawItemDigests: ctx.rawItemDigests,
    rawStableFieldsDigest: ctx.rawStableFieldsDigest,
    transformedPrefix: [],
    transformedStableFields: {},
    stats,
    rawPrefixPatches: patches,
    lastAccess: ctx.now,
    expiresAt: ctx.now + ctx.ttlMs,
    bytes,
  });
  totalBytes += bytes;
  prune(ctx.now);
  return true;
}

/** Store an unmodified first-seen prefix so later turns can compress only newly appended tools. */
function storeRawPrefix(body: Record<string, unknown>, ctx: LiveZoneContext): CompressionResult {
  const result: CompressionResult = { body, compressed: false, stats: null };
  // If even the digest/patch metadata exceeds the cap, still send the raw body.
  storeSparseRawPrefix(ctx, result);
  return result;
}

function hasExactRawPrefix(rawItemDigests: string[], entry: LiveZoneEntry): boolean {
  if (rawItemDigests.length < entry.rawItemDigests.length) return false;
  for (let index = 0; index < entry.rawItemDigests.length; index++) {
    if (rawItemDigests[index] !== entry.rawItemDigests[index]) return false;
  }
  return true;
}

function restoreStableFields(
  body: Record<string, unknown>,
  stableFields: Record<string, unknown>
): Record<string, unknown> | null {
  const restored = cloneValue(stableFields);
  return restored ? { ...body, ...restored } : null;
}

function withLiveZoneStats(
  body: Record<string, unknown>,
  result: CompressionResult,
  frozenItems: number,
  liveItems: number
): CompressionResult {
  const originalTokens = estimateCompressionTokens(body);
  const compressedTokens = estimateCompressionTokens(result.body);
  const savingsPercent =
    originalTokens > 0
      ? Math.max(
          0,
          Math.round(((originalTokens - compressedTokens) / originalTokens) * 10000) / 100
        )
      : 0;
  const base = result.stats;
  const stats: CompressionStats = {
    ...(base ?? {
      techniquesUsed: [],
      mode: "stacked",
      timestamp: Date.now(),
    }),
    originalTokens,
    compressedTokens,
    savingsPercent,
    techniquesUsed: [...new Set([...(base?.techniquesUsed ?? []), "live-zone-prefix-reuse"])],
    liveZone: {
      cacheHit: true,
      frozenItems,
      liveItems,
    },
  };
  return {
    ...result,
    compressed: result.compressed || compressedTokens < originalTokens,
    stats,
  };
}

function hasGlobalHardBudget(variant: unknown): boolean {
  if (!variant || typeof variant !== "object") return false;
  const config = (variant as Record<string, unknown>).config;
  if (!config || typeof config !== "object") return false;
  const record = config as Record<string, unknown>;
  return record.targetTokens != null || record.targetRatio != null;
}

function resolveLiveZoneContext(
  body: Record<string, unknown>,
  options: LiveZoneOptions
): LiveZoneContext | null {
  const field = sequenceField(body);
  const key = field ? makeKey(options, field) : null;
  if (!field || !key) return null;

  const rawItems = body[field] as unknown[];
  const rawItemDigests = rawItems.map(digest);
  if (rawItemDigests.some((value) => value === null)) return null;
  const rawStableFieldsDigest = digest(pickStableFields(body));
  if (!rawStableFieldsDigest) return null;
  const ttlMinutes = Math.min(60, Math.max(1, options.ttlMinutes ?? DEFAULT_TTL_MINUTES));
  const now = Date.now();
  return {
    field,
    key,
    rawItems,
    rawItemDigests: rawItemDigests as string[],
    rawStableFieldsDigest,
    ttlMs: ttlMinutes * 60_000,
    now,
  };
}

async function compressAndStore(
  body: Record<string, unknown>,
  context: LiveZoneContext,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  const result = await compress(body);
  store(
    context.key,
    context.rawItemDigests,
    context.rawStableFieldsDigest,
    result,
    context.field,
    context.now,
    context.ttlMs
  );
  return result;
}

async function compressLiveToolOutputs(
  body: Record<string, unknown>,
  field: "messages" | "input",
  liveItems: unknown[],
  contextItems: unknown[],
  previousStats: CompressionStats | null,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<{ liveResult: CompressionResult; transformedLive: unknown[] } | null> {
  const transformedLive = cloneItems(liveItems);
  if (!transformedLive) return null;
  const liveToolIndexes = liveItems.flatMap((item, index) =>
    isToolOutputItem(item) ? [index] : []
  );
  if (liveToolIndexes.length === 0) {
    return { liveResult: { body, compressed: false, stats: previousStats }, transformedLive };
  }

  // Engines need assistant/instruction boundaries to distinguish completed history from
  // current observations. Context is read-only input: only live tool slots are copied back.
  const compressionItems = cloneItems(contextItems);
  if (!compressionItems) return null;
  const liveOffset = contextItems.length - liveItems.length;
  // Snapshot identities before invoking a callback that may mutate its cloned input in place.
  const identities = Array.from(contextItems, itemIdentity);
  const toolLinkCounts = new Map<string, number>();
  for (const item of contextItems) {
    const link = isToolOutputItem(item) ? toolLinkage(item) : null;
    if (link !== null) toolLinkCounts.set(link, (toolLinkCounts.get(link) ?? 0) + 1);
  }
  const originalToolDigests = liveToolIndexes.map((index) => digest(transformedLive[index]));
  const liveToolLinks = liveToolIndexes.map((index) => toolLinkage(transformedLive[index]));
  const liveResult = await compress({ ...body, [field]: compressionItems });
  const transformed = liveResult.body[field];
  if (
    !Array.isArray(transformed) ||
    transformed.length !== contextItems.length ||
    identities.some(
      (identity, index) => identity === null || identity !== itemIdentity(transformed[index])
    ) ||
    liveToolIndexes.some((liveIndex, index) => {
      if (digest(transformed[liveOffset + liveIndex]) === originalToolDigests[index]) return false;
      const link = liveToolLinks[index];
      return link === null || toolLinkCounts.get(link) !== 1;
    })
  ) {
    return { liveResult: { body, compressed: false, stats: null }, transformedLive };
  }
  for (let index = 0; index < liveToolIndexes.length; index++) {
    const liveIndex = liveToolIndexes[index];
    transformedLive[liveIndex] = transformed[liveOffset + liveIndex];
  }
  return { liveResult, transformedLive };
}

/** Rebuild only changed tool slots; unchanged source items retain their verified bytes. */
function restoreFrozenPrefix(rawItems: unknown[], previous: LiveZoneEntry): unknown[] | null {
  if (rawItems.length < previous.rawItemDigests.length) return null;
  const frozenPrefix = previous.rawPrefixPatches
    ? rawItems.slice(0, previous.rawItemDigests.length)
    : cloneItems(previous.transformedPrefix);
  if (!frozenPrefix) return null;
  for (const patch of previous.rawPrefixPatches ?? []) {
    if (!Number.isInteger(patch.index) || patch.index < 0 || patch.index >= frozenPrefix.length) {
      return null;
    }
    const value = cloneValue(patch.value);
    if (value === null) return null;
    frozenPrefix[patch.index] = value;
  }
  return frozenPrefix;
}

/** Keep the last assistant turn as read-only context for new tool outputs. */
function findLiveContextStart(rawItems: unknown[], frozenItems: number): number {
  for (let index = frozenItems - 1; index >= 0; index--) {
    const item = rawItems[index];
    if (
      item &&
      typeof item === "object" &&
      (item as Record<string, unknown>).role === "assistant"
    ) {
      return index;
    }
  }
  return frozenItems;
}

/** Only sparse patch storage can reject replay; ordinary storage is best effort. */
function storeReusedLivePrefix(
  context: LiveZoneContext,
  previous: LiveZoneEntry,
  result: CompressionResult
): boolean {
  if (entries.get(context.key) !== previous) return true;
  if (previous.rawPrefixPatches) {
    return storeSparseRawPrefix({ ...context, now: Date.now() }, result);
  }
  store(
    context.key,
    context.rawItemDigests,
    context.rawStableFieldsDigest,
    result,
    context.field,
    Date.now(),
    context.ttlMs
  );
  return true;
}

async function reuseLiveZoneEntry(
  body: Record<string, unknown>,
  context: LiveZoneContext,
  previous: LiveZoneEntry,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>,
  preserveRawPrefixOnMiss = false
): Promise<CompressionResult> {
  const fallback = () =>
    preserveRawPrefixOnMiss ? storeRawPrefix(body, context) : compress(body);
  entries.delete(context.key);
  previous.lastAccess = context.now;
  entries.set(context.key, previous);

  const frozenItems = previous.rawItemDigests.length;
  const liveItems = context.rawItems.slice(frozenItems);
  const frozenPrefix = restoreFrozenPrefix(context.rawItems, previous);
  if (!frozenPrefix) return fallback();
  // The latest assistant may already be frozen (including on consecutive/parallel results).
  // Carry its raw tail as engine context, but never replace its cached transformation.
  const contextStart = findLiveContextStart(context.rawItems, frozenItems);
  const live = await compressLiveToolOutputs(
    body,
    context.field,
    liveItems,
    context.rawItems.slice(contextStart),
    previous.stats,
    compress
  );
  if (!live) return fallback();
  const stableFields = previous.rawPrefixPatches
    ? pickStableFields(body)
    : previous.transformedStableFields;
  if (!stableFields) return fallback();
  const restoredBody = restoreStableFields(live.liveResult.body, stableFields);
  if (!restoredBody) return fallback();
  const combinedBody = {
    ...restoredBody,
    [context.field]: [...frozenPrefix, ...live.transformedLive],
  };
  const combinedResult = withLiveZoneStats(
    body,
    { ...live.liveResult, body: combinedBody },
    frozenItems,
    liveItems.length
  );
  if (!storeReusedLivePrefix(context, previous, combinedResult)) {
    return storeRawPrefix(body, context);
  }
  return combinedResult;
}

/**
 * Reuses the byte-identical transformed prefix from the previous request in a session. Engines
 * receive the ordered live suffix with frozen turn context; only appended tool outputs are rewritten.
 * For regular live-zone mode, a cold/mismatched prefix falls back to full compression.
 * With preserveRawPrefixOnMiss enabled, it instead sends the original history unchanged
 * and uses it as the next stable baseline; only new tool outputs are eligible on a hit.
 * An explicitly configured global hard budget still takes precedence.
 */
export async function applyLiveZoneCompression(
  body: Record<string, unknown>,
  options: LiveZoneOptions,
  compress: (body: Record<string, unknown>) => Promise<CompressionResult>
): Promise<CompressionResult> {
  // A global hard budget needs the complete history to make correct keep/drop decisions.
  if (hasGlobalHardBudget(options.variant)) return compress(body);
  const context = resolveLiveZoneContext(body, options);
  if (!context) {
    return options.preserveRawPrefixOnMiss ? { body, compressed: false, stats: null } : compress(body);
  }
  prune(context.now);
  const previous = entries.get(context.key);

  if (
    !previous ||
    previous.rawStableFieldsDigest !== context.rawStableFieldsDigest ||
    !hasExactRawPrefix(context.rawItemDigests, previous)
  ) {
    return options.preserveRawPrefixOnMiss
      ? storeRawPrefix(body, context)
      : compressAndStore(body, context, compress);
  }
  return reuseLiveZoneEntry(body, context, previous, compress, options.preserveRawPrefixOnMiss);
}

export function resetLiveZoneCache(): void {
  entries.clear();
  totalBytes = 0;
}

export function getLiveZoneCacheStats(): { entries: number; bytes: number } {
  return { entries: entries.size, bytes: totalBytes };
}
