/**
 * Cache-prefix guard for prompt compression (homelab#297).
 *
 * Prompt-cache providers bill a read of an unchanged prefix at a fraction of a write. A single
 * rewritten byte inside a cached message (for example `lite` truncating an old tool result on one
 * request but not the next) invalidates everything after it. The guard splits `messages` at a
 * protected boundary, hands only the tail to the compression engines and re-attaches the original
 * prefix objects untouched, so no engine has to know about caching.
 *
 * Scope: only the `messages` array. Responses-API `input` and Gemini `contents` bodies are passed
 * through unchanged (Responses history is covered by the live-zone lane, #18787).
 *
 * @file cachePrefixGuard.ts
 * @exports resolveProtectedMessagePrefix, guardCachedPrefixCompression
 */

import type { CachingContext } from "./cachingAware.ts";
import { estimateCompressionTokens } from "./stats.ts";
import type {
  CachePrefixGuardStats,
  CompressionMode,
  CompressionResult,
  CompressionStats,
} from "./types.ts";

type JsonRecord = Record<string, unknown>;
type CompressionRun = (input: JsonRecord) => Promise<CompressionResult>;

const MAX_CACHE_CONTROL_DEPTH = 4;

function isRecord(value: unknown): value is JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasMarker(value: unknown, depth = 0): boolean {
  if (Array.isArray(value)) {
    return depth <= MAX_CACHE_CONTROL_DEPTH && value.some((item) => hasMarker(item, depth + 1));
  }
  if (!isRecord(value)) return false;
  if (value.cache_control !== undefined && value.cache_control !== null) return true;
  // Anthropic nests blocks inside `tool_result.content`; the marker may sit on any of them.
  return depth < MAX_CACHE_CONTROL_DEPTH && hasMarker(value.content, depth + 1);
}

function currentTurnStart(messages: unknown[]): number {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (isRecord(message) && message.role === "assistant") return i + 1;
  }
  return 0;
}

/**
 * Number of leading `messages` that must reach the provider byte-identical to the client's.
 *
 * - top-level `cache_control` (automatic caching) → all messages;
 * - else the last message carrying a breakpoint (on the message or any content block) → through it;
 * - else (caching provider, no markers) → everything before the current turn.
 *
 * Returns 0 for non-caching providers and for bodies without a `messages` array.
 */
export function resolveProtectedMessagePrefix(
  body: JsonRecord,
  cachingContext: CachingContext
): number {
  if (!cachingContext.isCachingProvider) return 0;
  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) return 0;
  if (body.cache_control !== undefined && body.cache_control !== null) return messages.length;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (hasMarker(messages[i])) return i + 1;
  }
  return currentTurnStart(messages);
}

interface ToolLinkage {
  defs: Set<string>;
  refs: Set<string>;
}

function addToolCallIds(toolCalls: unknown, defs: Set<string>): void {
  if (!Array.isArray(toolCalls)) return;
  for (const call of toolCalls) {
    if (isRecord(call) && typeof call.id === "string") defs.add(call.id);
  }
}

function addToolBlockIds(content: unknown, links: ToolLinkage): void {
  if (!Array.isArray(content)) return;
  for (const block of content) {
    if (!isRecord(block)) continue;
    if (block.type === "tool_use" && typeof block.id === "string") links.defs.add(block.id);
    if (block.type === "tool_result" && typeof block.tool_use_id === "string") {
      links.refs.add(block.tool_use_id);
    }
  }
}

function collectToolLinkage(messages: unknown[]): ToolLinkage {
  const links: ToolLinkage = { defs: new Set<string>(), refs: new Set<string>() };
  for (const message of messages) {
    if (!isRecord(message)) continue;
    if (message.role === "tool" && typeof message.tool_call_id === "string") {
      links.refs.add(message.tool_call_id);
    }
    addToolCallIds(message.tool_calls, links.defs);
    addToolBlockIds(message.content, links);
  }
  return links;
}

function isAssistant(message: unknown): boolean {
  return isRecord(message) && message.role === "assistant";
}

/**
 * True when compressing the tail broke the conversation shape: a tool result lost its call (or a
 * call lost its result) that was linked before compression, or the tail no longer alternates with
 * the protected prefix. Only breakage introduced by compression counts; a history that was already
 * malformed is left to the provider, exactly as before this guard existed.
 */
function tailShapeBroken(prefix: unknown[], originalTail: unknown[], compressedTail: unknown[]) {
  if (compressedTail.length === 0) return originalTail.length > 0;

  const prefixLinks = collectToolLinkage(prefix);
  const before = collectToolLinkage(originalTail);
  const after = collectToolLinkage(compressedTail);
  const allBeforeDefs = new Set([...prefixLinks.defs, ...before.defs]);
  const allBeforeRefs = new Set([...prefixLinks.refs, ...before.refs]);
  const allAfterDefs = new Set([...prefixLinks.defs, ...after.defs]);
  const allAfterRefs = new Set([...prefixLinks.refs, ...after.refs]);

  for (const id of after.refs) {
    if (!allAfterDefs.has(id) && allBeforeDefs.has(id)) return true;
  }
  for (const id of after.defs) {
    if (!allAfterRefs.has(id) && allBeforeRefs.has(id)) return true;
  }

  const lastPrefix = prefix.length > 0 ? prefix[prefix.length - 1] : undefined;
  if (prefix.length > 0) {
    const alternatedBefore = isAssistant(lastPrefix) !== isAssistant(originalTail[0]);
    const alternatesAfter = isAssistant(lastPrefix) !== isAssistant(compressedTail[0]);
    if (alternatedBefore && !alternatesAfter) return true;
  }
  return false;
}

function percentSaved(original: number, compressed: number): number {
  return original > 0 ? Math.round(((original - compressed) / original) * 10000) / 100 : 0;
}

function withPrefixTokens(
  stats: CompressionStats,
  prefixTokens: number,
  guard: CachePrefixGuardStats
): CompressionStats {
  const originalTokens = stats.originalTokens + prefixTokens;
  const compressedTokens = stats.compressedTokens + prefixTokens;
  return {
    ...stats,
    originalTokens,
    compressedTokens,
    savingsPercent: percentSaved(originalTokens, compressedTokens),
    cachePrefixGuard: guard,
  };
}

function noSavingsStats(
  input: JsonRecord,
  mode: CompressionMode,
  base: CompressionStats | null,
  guard: CachePrefixGuardStats
): CompressionStats {
  const tokens = estimateCompressionTokens(input);
  return {
    originalTokens: tokens,
    compressedTokens: tokens,
    savingsPercent: 0,
    techniquesUsed: [],
    mode,
    timestamp: Date.now(),
    ...(base?.engine ? { engine: base.engine } : {}),
    ...(base?.compressionComboId !== undefined
      ? { compressionComboId: base.compressionComboId }
      : {}),
    cachePrefixGuard: guard,
  };
}

export interface CachePrefixGuardOptions {
  cachingContext: CachingContext;
  /** Compression mode, used only to label the stats row recorded when the guard discards a run. */
  mode: CompressionMode;
  /**
   * Enforced input-token ceiling for the target (null/undefined when unknown or checks are
   * disabled). A request estimated above it is compressed in full: a cache hit is worthless if the
   * request is rejected for size.
   */
  overflowCeilingTokens?: number | null;
}

/**
 * Wrap a compression runner so it only ever sees the unprotected tail of `messages`.
 * The returned body keeps the first k message objects by reference.
 */
export function guardCachedPrefixCompression(
  run: CompressionRun,
  options: CachePrefixGuardOptions
): CompressionRun {
  return async (input) => {
    const messages = input.messages;
    if (!Array.isArray(messages)) return run(input);
    const protectedCount = resolveProtectedMessagePrefix(input, options.cachingContext);
    if (protectedCount === 0) return run(input);

    const ceiling = options.overflowCeilingTokens;
    if (ceiling != null && estimateCompressionTokens(input) > ceiling) {
      const result = await run(input);
      const guard: CachePrefixGuardStats = {
        protectedMessages: 0,
        skipReason: "overflow-unprotected",
      };
      return {
        ...result,
        stats: result.stats
          ? { ...result.stats, cachePrefixGuard: guard }
          : noSavingsStats(input, options.mode, null, guard),
      };
    }

    if (protectedCount >= messages.length) return { body: input, compressed: false, stats: null };

    const prefix = messages.slice(0, protectedCount);
    const tail = messages.slice(protectedCount);
    const result = await run({ ...input, messages: tail });
    const compressedTail = result.body.messages;

    if (!Array.isArray(compressedTail) || tailShapeBroken(prefix, tail, compressedTail)) {
      return {
        body: input,
        compressed: false,
        stats: noSavingsStats(input, options.mode, result.stats, {
          protectedMessages: protectedCount,
          skipReason: "tail-shape-invalid",
        }),
      };
    }

    const guard: CachePrefixGuardStats = { protectedMessages: protectedCount };
    return {
      ...result,
      body: { ...result.body, messages: [...prefix, ...compressedTail] },
      stats: result.stats
        ? withPrefixTokens(result.stats, estimateCompressionTokens(prefix), guard)
        : null,
    };
  };
}
