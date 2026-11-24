import { createHash } from "node:crypto";
import { normalizeCodexSessionId } from "../../config/codexClient.ts";
import {
  type CodexClientIdentity,
  deriveStableUUIDv4,
  getCodexClientSessionId,
  getCodexFingerprintSeed,
  resolveCodexThreadScopedPromptCacheKey,
} from "../../config/codexIdentity.ts";
import { CODEX_CHAT_DEFAULT_INSTRUCTIONS } from "../../config/codexInstructions.ts";

/**
 * Internal per-request carrier populated from pre-translation request metadata
 * (e.g. Anthropic `metadata.user_id.session_id`) before chatCore strips it.
 * Never forwarded upstream as an HTTP header and never treated as a native
 * Codex identity header (`clientPresentedIdentity` stays gated on real headers).
 */
export const CODEX_METADATA_CACHE_SESSION_HEADER = "x-omniroute-codex-cache-session";
export const CODEX_TRANSIENT_CACHE_SESSION_KEY = "_omnirouteCodexCacheSessionId";

const CODEX_CONVERSATION_CACHE_KEY_PREFIX = "omniroute:codex-prompt-cache-key:v1:";
const MAX_ANCHOR_TEXT_CHARS = 4096;
const MAX_CLAUDE_USER_ID_CHARS = 4096;

export interface CodexCacheKeyCredentials {
  connectionId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function nonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readHeaderCaseInsensitive(
  headers: Headers | Record<string, unknown> | null | undefined,
  name: string
): string | null {
  if (!headers) return null;
  if (headers instanceof Headers) {
    return nonEmptyString(headers.get(name));
  }
  const wanted = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === wanted && typeof value === "string") {
      return nonEmptyString(value);
    }
  }
  return null;
}

/**
 * Extract a validated per-session ID from Anthropic-style `metadata`
 * (`metadata.session_id`, `metadata.sessionId`, or JSON `metadata.user_id.session_id`).
 * Opaque account/user strings are never treated as a conversation session ID.
 */
export function extractClaudeMetadataSessionId(body: unknown): string | null {
  const root = asRecord(body);
  const metadata = asRecord(root?.metadata);
  if (!metadata) return null;

  const direct =
    normalizeCodexSessionId(metadata.session_id) || normalizeCodexSessionId(metadata.sessionId);
  if (direct) return direct;

  const rawUserId = metadata.user_id;
  if (typeof rawUserId !== "string" || rawUserId.length > MAX_CLAUDE_USER_ID_CHARS) {
    return null;
  }
  const trimmed = rawUserId.trim();
  if (!trimmed.startsWith("{")) return null;
  try {
    const parsed = asRecord(JSON.parse(trimmed));
    if (!parsed) return null;
    return normalizeCodexSessionId(parsed.session_id) || normalizeCodexSessionId(parsed.sessionId);
  } catch {
    return null;
  }
}

/**
 * Preserve Anthropic `metadata.user_id.session_id` on Codex requests before
 * Claude → OpenAI → Responses translation drops `body.metadata`.
 */
export function preserveCodexMetadataSessionIdentity(
  headers: Record<string, string>,
  request?: { provider?: string; body?: unknown }
): void {
  if (request?.provider !== "codex") return;
  if (
    getCodexClientSessionId(headers) ||
    normalizeCodexSessionId(readHeaderCaseInsensitive(headers, "x-opencode-session"))
  ) {
    return;
  }
  const metadataSessionId = extractClaudeMetadataSessionId(request.body);
  if (metadataSessionId) {
    headers[CODEX_METADATA_CACHE_SESSION_HEADER] = metadataSessionId;
  }
}

/**
 * Read the normalized client session ID for Codex prompt caching from
 * normalized executor client headers (explicit session headers first, then
 * internal pre-translation metadata carrier).
 */
export function readCodexCacheSessionHeader(
  headers: Headers | Record<string, unknown> | null | undefined
): string | null {
  return (
    getCodexClientSessionId(headers) ||
    // OpenCode's canonical header is cache affinity only; it must not synthesize
    // native Codex thread/turn identity through getCodexClientSessionId().
    normalizeCodexSessionId(readHeaderCaseInsensitive(headers, "x-opencode-session")) ||
    normalizeCodexSessionId(
      readHeaderCaseInsensitive(headers, CODEX_METADATA_CACHE_SESSION_HEADER)
    ) ||
    null
  );
}

function extractTextFromPart(part: unknown): string | null {
  if (typeof part === "string") {
    const trimmed = part.trim();
    return trimmed || null;
  }
  const rec = asRecord(part);
  return (
    nonEmptyString(rec?.text) || nonEmptyString(rec?.input_text) || nonEmptyString(rec?.output_text)
  );
}

interface AnchoredMessageContent {
  /** Bounded anchor text (≤ MAX_ANCHOR_TEXT_CHARS) for a compact, inspectable seed. */
  text: string;
  /** sha256 of the complete, unbounded content so long prompts sharing a bounded-text
   *  prefix never collapse onto one cache key (code review #21084, anchor-prefix case). */
  digest: string;
  /** Stable identifiers (URL / file reference) of image parts in content order, so
   *  same-text first turns with different images stay in distinct cache partitions. */
  imageRefs: string[];
}

const EMPTY_ANCHORED_CONTENT: AnchoredMessageContent = { text: "", digest: "", imageRefs: [] };

function stableAnchorDigest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function readImagePartRef(part: Record<string, unknown> | null): string | null {
  const raw = part?.image_url ?? part?.source ?? part?.file_id ?? part?.input_file;
  if (typeof raw === "string") return nonEmptyString(raw);
  const obj = asRecord(raw);
  return obj
    ? nonEmptyString(obj.url) || nonEmptyString(obj.file_id) || nonEmptyString(obj.filename)
    : null;
}

function collectContentImageRefs(content: unknown[]): string[] {
  const refs: string[] = [];
  for (const part of content) {
    const ref = readImagePartRef(asRecord(part));
    if (ref) refs.push(ref);
  }
  return refs;
}

function collectTextParts(content: unknown[]): { bounded: string[]; full: string[] } {
  const bounded: string[] = [];
  const full: string[] = [];
  let totalLen = 0;
  for (const part of content) {
    const textVal = extractTextFromPart(part);
    if (!textVal) continue;
    full.push(textVal);
    if (totalLen >= MAX_ANCHOR_TEXT_CHARS) continue;
    bounded.push(textVal);
    totalLen += textVal.length;
  }
  return { bounded, full };
}

function serializeAnchorFallback(content: unknown[]): string | null {
  if (content.length === 0) return null;
  try {
    return JSON.stringify(content);
  } catch {
    return null;
  }
}

function anchoredContentFromParts(content: unknown[]): AnchoredMessageContent {
  const imageRefs = collectContentImageRefs(content);
  const { bounded, full } = collectTextParts(content);
  if (full.length === 0) {
    const fallback = serializeAnchorFallback(content);
    return fallback
      ? {
          text: fallback.slice(0, MAX_ANCHOR_TEXT_CHARS),
          digest: stableAnchorDigest(fallback),
          imageRefs,
        }
      : { ...EMPTY_ANCHORED_CONTENT, imageRefs };
  }
  const fullText = full.join("\n");
  return {
    text: bounded.join("\n").slice(0, MAX_ANCHOR_TEXT_CHARS),
    digest: stableAnchorDigest(fullText),
    imageRefs,
  };
}

function extractMessageAnchor(content: unknown): AnchoredMessageContent {
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (!trimmed) return EMPTY_ANCHORED_CONTENT;
    return {
      text: trimmed.slice(0, MAX_ANCHOR_TEXT_CHARS),
      digest: stableAnchorDigest(trimmed),
      imageRefs: [],
    };
  }
  if (!Array.isArray(content)) return EMPTY_ANCHORED_CONTENT;
  return anchoredContentFromParts(content);
}

function anchoredContentIsEmpty(content: AnchoredMessageContent): boolean {
  return !content.text && !content.digest;
}

function scanAnchorItems(items: unknown[]): {
  leadingDeveloper: AnchoredMessageContent | null;
  firstUser: AnchoredMessageContent | null;
} {
  let leadingDeveloper: AnchoredMessageContent | null = null;
  let firstUser: AnchoredMessageContent | null = null;

  for (const item of items) {
    const rec = asRecord(item);
    if (!rec) continue;
    const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
    if (!leadingDeveloper && !firstUser && (role === "system" || role === "developer")) {
      leadingDeveloper = extractMessageAnchor(rec.content);
    } else if (!firstUser && role === "user") {
      firstUser = extractMessageAnchor(rec.content);
      break;
    }
  }

  return { leadingDeveloper, firstUser };
}

function extractConversationAnchor(body: Record<string, unknown>): {
  instructions: AnchoredMessageContent;
  leadingDeveloper: AnchoredMessageContent;
  firstUser: AnchoredMessageContent;
} {
  const rawInstructions = nonEmptyString(body.instructions);
  const instructions =
    rawInstructions && rawInstructions !== CODEX_CHAT_DEFAULT_INSTRUCTIONS
      ? {
          text: rawInstructions.slice(0, MAX_ANCHOR_TEXT_CHARS),
          digest: stableAnchorDigest(rawInstructions),
          imageRefs: [],
        }
      : EMPTY_ANCHORED_CONTENT;

  const items = Array.isArray(body.input)
    ? body.input
    : Array.isArray(body.messages)
      ? body.messages
      : [];

  const { leadingDeveloper, firstUser } = scanAnchorItems(items);

  return {
    instructions,
    leadingDeveloper: leadingDeveloper ?? EMPTY_ANCHORED_CONTENT,
    firstUser: firstUser ?? EMPTY_ANCHORED_CONTENT,
  };
}

function resolveAccountScopeSeed(credentials: CodexCacheKeyCredentials | null | undefined): string {
  const psd = credentials?.providerSpecificData ?? null;
  return (
    getCodexFingerprintSeed(psd) ||
    nonEmptyString(credentials?.connectionId) ||
    nonEmptyString(psd?.connectionId) ||
    nonEmptyString(psd?.workspaceId) ||
    nonEmptyString(psd?.accountId) ||
    nonEmptyString(psd?.email) ||
    "default"
  );
}

/**
 * Derive a deterministic per-conversation RFC4122 UUIDv4 for clients that send
 * neither `prompt_cache_key`/`session_id`/`conversation_id` nor a session header
 * (e.g. standard OpenAI Chat Completions SDKs and agents).
 *
 * Uses the immutable turn-1 anchor (`instructions` + leading `developer`/`system`
 * message + first `user` message), scoped per account and model, so:
 * - turns 1..N of the same conversation share one stable cache key;
 * - concurrent conversations with identical system prompts but different initial
 *   user prompts get distinct cache partitions;
 * - each anchored component carries a sha256 digest of its complete content plus
 *   ordered image-part references, so prompts sharing the bounded-text prefix or
 *   differing only in first-turn images never collide;
 * - truly empty/stateless bodies return null (allowing last-resort fallback).
 */
export function deriveCodexConversationCacheKey(
  body: Record<string, unknown> | null,
  credentials: CodexCacheKeyCredentials | null | undefined
): string | null {
  if (!body) return null;
  const { instructions, leadingDeveloper, firstUser } = extractConversationAnchor(body);
  if (
    anchoredContentIsEmpty(instructions) &&
    anchoredContentIsEmpty(leadingDeveloper) &&
    anchoredContentIsEmpty(firstUser)
  ) {
    return null;
  }

  const model = nonEmptyString(body.model) || "";
  const accountScope = resolveAccountScopeSeed(credentials);
  const seed = `${CODEX_CONVERSATION_CACHE_KEY_PREFIX}${JSON.stringify([
    accountScope,
    model,
    instructions,
    leadingDeveloper,
    firstUser,
  ])}`;
  return deriveStableUUIDv4(seed);
}

function readTransientHeaderSessionId(
  psd: Record<string, unknown> | null,
  identity: CodexClientIdentity | null | undefined
): string | null {
  return (
    normalizeCodexSessionId(psd?.[CODEX_TRANSIENT_CACHE_SESSION_KEY]) ||
    normalizeCodexSessionId(identity?.clientSessionId) ||
    null
  );
}

function readExplicitBodySessionCandidate(body: Record<string, unknown> | null): string | null {
  return (
    normalizeCodexSessionId(body?.prompt_cache_key) ||
    normalizeCodexSessionId(body?.session_id) ||
    normalizeCodexSessionId(body?.conversation_id) ||
    null
  );
}

function applyThreadScopedCacheKey(
  candidate: string,
  identity: CodexClientIdentity | null | undefined,
  psd: Record<string, unknown> | null,
  connectionId: string | null
): string {
  const threadScoped = resolveCodexThreadScopedPromptCacheKey(
    candidate,
    identity,
    psd,
    connectionId
  );
  return threadScoped || candidate;
}

/**
 * Resolve the outbound `body.prompt_cache_key` for Codex requests.
 *
 * Priority order:
 * 1. Explicit `body.prompt_cache_key`
 * 2. Explicit `body.session_id` / `body.conversation_id`
 * 3. Inbound client session header (`x-claude-code-session-id`, `x-opencode-session-id`,
 *    `x-session-id`, `x-session-affinity`, `session-id`, `session_id`) or preserved
 *    Anthropic `metadata.user_id.session_id`
 * 4. Inline `body.metadata` session ID (direct `transformRequest` callers)
 * 5. Deterministic per-conversation UUIDv4 derived from stable turn-1 content
 * 6. Account-wide `workspaceId` (last resort for empty/stateless requests only)
 *
 * When `codexPromptCacheKeyScope: "thread"` is enabled under session-mode
 * fingerprint convergence, candidates 1–4 that match the client's session are
 * aligned with `identity.threadId`.
 */
export function resolveCodexPromptCacheKey(
  credentials: CodexCacheKeyCredentials | null | undefined,
  body: Record<string, unknown> | null
): string | null {
  const psd = credentials?.providerSpecificData ?? null;
  const identity = psd?.codexClientIdentity as CodexClientIdentity | null | undefined;

  const explicitOrSessionCandidate =
    readExplicitBodySessionCandidate(body) ||
    readTransientHeaderSessionId(psd, identity) ||
    extractClaudeMetadataSessionId(body);

  if (explicitOrSessionCandidate) {
    return applyThreadScopedCacheKey(
      explicitOrSessionCandidate,
      identity,
      psd,
      credentials?.connectionId ?? null
    );
  }

  return (
    deriveCodexConversationCacheKey(body, credentials) ||
    normalizeCodexSessionId(psd?.workspaceId) ||
    null
  );
}
