/**
 * Claude signed-thinking continuity store.
 *
 * When a Claude-format upstream answers an OpenAI Chat Completions or Responses
 * client, the client only receives the reasoning TEXT (`reasoning_content` /
 * reasoning summary). The signed `thinking` / `redacted_thinking` blocks that
 * Anthropic needs back on the next tool-loop turn are lost, so openai-to-claude
 * could only send a `redacted_thinking` placeholder (#5312) — the model loses its
 * own reasoning continuity across tool calls.
 *
 * This store keeps the exact signed blocks server-side, keyed by the `tool_use`
 * ids of the assistant turn that produced them (same pattern as
 * geminiThoughtSignatureStore), grouped by the `tool_use` each run preceded, so
 * the request translator can put every block back where Claude emitted it (#18607).
 *
 * Invariants:
 * - Memory only, TTL + size bounded. Thinking text and signatures never reach the
 *   DB or any log line (thinkingSignatureDiagnostics invariants).
 * - Bound to provider + model + connection: a signature replayed to a different
 *   model, provider, or OAuth org/connection is a hard 400 (#6953, #17324), so a
 *   binding mismatch restores nothing.
 * - All-or-nothing: a turn is stored only when every thinking-ish block is
 *   replayable (non-empty signature / data) and precedes a tool_use; a partial
 *   set would reorder the turn.
 */

export type ClaudeSignedThinkingBlock =
  | { type: "thinking"; thinking: string; signature: string }
  | { type: "redacted_thinking"; data: string };

/** The signed blocks Claude emitted between the turn's previous tool_use and `toolUseId`. */
export type ClaudeThinkingSegment = { toolUseId: string; blocks: ClaudeSignedThinkingBlock[] };

type Entry = {
  provider: string;
  model: string;
  /** Serving connection id; thinking signatures are org-scoped, so a block
   *  produced by one OAuth org must never be replayed on another (#17324). */
  connectionId: string;
  segments: ClaudeThinkingSegment[];
  size: number;
  expiresAt: number;
};

export const CLAUDE_THINKING_MEMORY_TTL_MS = 1000 * 60 * 60;
export const MAX_CLAUDE_THINKING_ENTRIES = 1000;
/** Upper bound for one assistant turn (sum of thinking text + signature/data chars). */
export const MAX_CLAUDE_THINKING_ENTRY_CHARS = 2 * 1024 * 1024;
const MAX_CLAUDE_THINKING_TOTAL_CHARS = 64 * 1024 * 1024;

const entries = new Map<string, Entry>();
// Non-serialized provenance; weak references add no retention beyond the request.
const restoredBlocks = new WeakSet<object>();

/** True only for a block returned by the provider/model-bound restore operation. */
export function isRestoredClaudeThinkingBlock(block: object): boolean {
  return restoredBlocks.has(block);
}
let totalChars = 0;

function normalizeProvider(provider: unknown): string {
  return typeof provider === "string" ? provider.trim().toLowerCase() : "";
}

/**
 * Anthropic echoes the dated snapshot (`claude-sonnet-4-5-20250929`) while the
 * request may use the alias (`claude-sonnet-4-5`); both name the same model, so
 * the binding compares the undated form. Any other difference is a different model.
 */
export function normalizeClaudeThinkingModel(model: unknown): string {
  if (typeof model !== "string") return "";
  let normalized = model.trim().toLowerCase();
  const slash = normalized.lastIndexOf("/");
  if (slash >= 0) normalized = normalized.slice(slash + 1);
  return normalized.replace(/-\d{8}$/, "");
}

function normalizeBlock(block: unknown): ClaudeSignedThinkingBlock | null {
  if (!block || typeof block !== "object" || Array.isArray(block)) return null;
  const record = block as Record<string, unknown>;
  if (record.type === "thinking") {
    if (typeof record.thinking !== "string") return null;
    if (typeof record.signature !== "string" || record.signature.length === 0) return null;
    return { type: "thinking", thinking: record.thinking, signature: record.signature };
  }
  if (record.type === "redacted_thinking") {
    if (typeof record.data !== "string" || record.data.length === 0) return null;
    return { type: "redacted_thinking", data: record.data };
  }
  return null;
}

function blockSize(block: ClaudeSignedThinkingBlock): number {
  return block.type === "thinking"
    ? block.thinking.length + block.signature.length
    : block.data.length;
}

function cloneSegments(segments: ClaudeThinkingSegment[]): ClaudeThinkingSegment[] {
  return segments.map((segment) => ({
    toolUseId: segment.toolUseId,
    blocks: segment.blocks.map((block) => ({ ...block })),
  }));
}

function blocksOf(entry: Entry): ClaudeSignedThinkingBlock[] {
  return entry.segments.flatMap((segment) => segment.blocks);
}

function deleteKey(key: string) {
  const entry = entries.get(key);
  if (!entry) return;
  entries.delete(key);
  totalChars -= entry.size;
}

function pruneExpired(now: number) {
  for (const [key, entry] of entries) {
    if (entry.expiresAt <= now) deleteKey(key);
  }
  while (
    entries.size > MAX_CLAUDE_THINKING_ENTRIES ||
    totalChars > MAX_CLAUDE_THINKING_TOTAL_CHARS
  ) {
    const oldestKey = entries.keys().next().value;
    if (oldestKey === undefined) break;
    deleteKey(oldestKey);
  }
}

/**
 * Group an ordered assistant content array into one segment per tool_use, each
 * holding the signed blocks that preceded it. Null when any thinking-ish block is
 * not replayable, when thinking trails the last tool_use (no anchor to replay
 * against), when nothing is stored, or when the turn exceeds the entry size cap.
 */
function collectThinkingSegments(
  content: unknown[]
): { segments: ClaudeThinkingSegment[]; size: number } | null {
  const segments: ClaudeThinkingSegment[] = [];
  let pending: ClaudeSignedThinkingBlock[] = [];
  let size = 0;
  for (const block of content) {
    const record = (block ?? {}) as Record<string, unknown>;
    if (record.type === "thinking" || record.type === "redacted_thinking") {
      const normalized = normalizeBlock(block);
      if (!normalized) return null;
      pending.push(normalized);
      size += blockSize(normalized);
    } else if (record.type === "tool_use" && typeof record.id === "string" && record.id) {
      segments.push({ toolUseId: record.id, blocks: pending });
      pending = [];
    }
  }
  if (size === 0 || size > MAX_CLAUDE_THINKING_ENTRY_CHARS || pending.length > 0) return null;
  if (segments.length === 0) return null;
  return { segments, size };
}

/**
 * Remember the signed thinking blocks of one assistant turn, in their original
 * layout, under each of its tool_use ids. `content` is the ordered content array
 * (thinking / redacted_thinking / tool_use; other block types are ignored). No-op
 * unless the turn owns tool calls and every block is replayable.
 */
export function storeClaudeThinkingBlocks(args: {
  content: unknown;
  provider: unknown;
  model: unknown;
  connectionId?: unknown;
}): boolean {
  const model = normalizeClaudeThinkingModel(args.model);
  if (!model || !Array.isArray(args.content)) return false;

  const collected = collectThinkingSegments(args.content);
  if (!collected) return false;
  const { segments, size } = collected;

  const now = Date.now();
  const provider = normalizeProvider(args.provider);
  // #17324: thinking signatures are scoped to the producing OAuth org (connection),
  // so the serving connection id is part of the binding. An entry captured without
  // connection info has unknown provenance — storing it invites cross-org replay on
  // the next request that is equally unbound (""==="" would match). Refuse.
  const connectionId = typeof args.connectionId === "string" ? args.connectionId : "";
  if (connectionId.length === 0) return false;
  for (const { toolUseId } of segments) {
    deleteKey(toolUseId);
    entries.set(toolUseId, {
      provider,
      model,
      connectionId,
      segments: cloneSegments(segments),
      size,
      expiresAt: now + CLAUDE_THINKING_MEMORY_TTL_MS,
    });
    totalChars += size;
  }
  pruneExpired(now);
  return true;
}

/**
 * Non-streaming counterpart of the claude-to-openai stream capture: remember the
 * signed thinking blocks of a complete Claude Messages response that owns tool_use
 * blocks. The response's own `model` wins over the request model, like the stream.
 */
export function storeClaudeThinkingFromResponse(
  responseBody: unknown,
  binding: { provider: unknown; model: unknown; connectionId?: unknown }
): boolean {
  if (!responseBody || typeof responseBody !== "object" || Array.isArray(responseBody)) {
    return false;
  }
  const root = responseBody as Record<string, unknown>;
  return storeClaudeThinkingBlocks({
    content: root.content,
    provider: binding.provider,
    model: typeof root.model === "string" && root.model ? root.model : binding.model,
    connectionId: binding.connectionId,
  });
}

/**
 * Return fresh copies of the turn layout stored for the first tool_use id that
 * hits with the same provider + model + connection binding, or null.
 */
export function restoreClaudeThinkingBlocks(args: {
  toolUseIds: unknown;
  provider: unknown;
  model: unknown;
  connectionId?: unknown;
}): ClaudeThinkingSegment[] | null {
  const toolUseIds = Array.isArray(args.toolUseIds) ? args.toolUseIds : [];
  const model = normalizeClaudeThinkingModel(args.model);
  if (toolUseIds.length === 0 || !model) return null;

  pruneExpired(Date.now());
  const provider = normalizeProvider(args.provider);
  // #17324: thinking signatures are org-scoped. Replaying a block stored by one
  // OAuth connection on a different connection of the same provider+model combo
  // makes Anthropic reject the whole request with 400 "latest assistant message
  // cannot be modified". An absent binding info restores nothing (miss = omit,
  // which adaptive thinking accepts).
  const connectionId = typeof args.connectionId === "string" ? args.connectionId : "";
  for (const toolUseId of toolUseIds) {
    const entry = typeof toolUseId === "string" ? entries.get(toolUseId) : undefined;
    if (!entry) continue;
    if (entry.provider !== provider || entry.model !== model) return null;
    if (entry.connectionId !== connectionId) return null;
    return markRestored(cloneSegments(entry.segments));
  }
  return null;
}

/** Tag every block of freshly cloned segments as restored-by-binding provenance. */
function markRestored(segments: ClaudeThinkingSegment[]): ClaudeThinkingSegment[] {
  for (const segment of segments) {
    for (const block of segment.blocks) restoredBlocks.add(block);
  }
  return segments;
}

function sameBlock(stored: ClaudeSignedThinkingBlock, block: unknown): boolean {
  const normalized = normalizeBlock(block);
  if (!normalized) return false;
  if (stored.type === "thinking") {
    return normalized.type === "thinking" && normalized.signature === stored.signature;
  }
  return normalized.type === "redacted_thinking" && normalized.data === stored.data;
}

function isStoredBlock(block: unknown): boolean {
  for (const entry of entries.values()) {
    if (blocksOf(entry).some((stored) => sameBlock(stored, block))) return true;
  }
  return false;
}

function forgetEntriesHolding(blocks: unknown[]) {
  const keys: string[] = [];
  for (const [key, entry] of entries) {
    if (blocksOf(entry).some((stored) => blocks.some((block) => sameBlock(stored, block)))) {
      keys.push(key);
    }
  }
  for (const key of keys) deleteKey(key);
}

/**
 * Signature-recovery fallback: Anthropic rejected a thinking signature. The
 * active tool-use cycle is otherwise preserved verbatim by the recovery, so any
 * block this store restored there is dropped (forgotten) so later turns do not
 * replay it again; the remaining turn keeps its valid shape without a fabricated
 * placeholder (#17324/#17344). Returns null when the content holds no
 * server-restored block.
 */
export function downgradeRestoredClaudeThinking(content: unknown): unknown[] | null {
  if (!Array.isArray(content) || entries.size === 0) return null;
  const restored = content.filter(isStoredBlock);
  if (restored.length === 0) return null;

  forgetEntriesHolding(restored);
  // Removed thinking blocks leave the tool_use turn without a precursor — a valid
  // Anthropic request shape under adaptive thinking (#17324/#17344: no fabricated
  // placeholder is re-injected; it never matches what Anthropic signed for those
  // tool_use ids and re-triggers the "latest assistant message cannot be modified" 400
  // while their cache is warm).
  const kept = content.filter((block) => !restored.includes(block));
  // Inject nothing (the DEFAULT blob is a foreign encrypted thought);
  // the recovery caller disables manual thinking when the final tool turn is left bare.
  return kept;
}

/**
 * Drop whatever the stream capture stored for the tool calls of a reconstructed
 * client response (Chat `choices[].message.tool_calls[].id` or Responses
 * `output[].call_id`). Used when the turn must not be retained at all, e.g. a
 * response that may echo video transcript cues.
 */
export function forgetClaudeThinkingForClientResponse(responseBody: unknown): void {
  if (!responseBody || typeof responseBody !== "object" || entries.size === 0) return;
  const root = responseBody as Record<string, unknown>;
  const ids: string[] = [];
  if (Array.isArray(root.choices)) {
    for (const choice of root.choices) {
      const toolCalls = (choice as { message?: { tool_calls?: unknown } } | null)?.message
        ?.tool_calls;
      if (!Array.isArray(toolCalls)) continue;
      for (const toolCall of toolCalls) {
        const id = (toolCall as { id?: unknown } | null)?.id;
        if (typeof id === "string") ids.push(id);
      }
    }
  }
  const output = Array.isArray(root.output)
    ? root.output
    : Array.isArray((root.response as { output?: unknown } | undefined)?.output)
      ? ((root.response as { output: unknown[] }).output as unknown[])
      : [];
  for (const item of output) {
    const callId = (item as { call_id?: unknown } | null)?.call_id;
    if (typeof callId === "string") ids.push(callId);
  }
  for (const id of ids) deleteKey(id);
}

export function clearClaudeThinkingStore() {
  entries.clear();
  totalChars = 0;
}

export function getClaudeThinkingStoreSizeForTests() {
  pruneExpired(Date.now());
  return entries.size;
}
