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
  if (getCodexClientSessionId(headers)) return;
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
    normalizeCodexSessionId(
      readHeaderCaseInsensitive(headers, CODEX_METADATA_CACHE_SESSION_HEADER)
    ) ||
    null
  );
}

function extractMessageText(content: unknown): string {
  if (typeof content === "string") {
    return content.trim().slice(0, MAX_ANCHOR_TEXT_CHARS);
  }
  if (!Array.isArray(content)) return "";

  const textParts: string[] = [];
  let totalLen = 0;
  for (const part of content) {
    if (typeof part === "string") {
      const trimmed = part.trim();
      if (trimmed) {
        textParts.push(trimmed);
        totalLen += trimmed.length;
      }
    } else {
      const rec = asRecord(part);
      const textVal =
        nonEmptyString(rec?.text) ||
        nonEmptyString(rec?.input_text) ||
        nonEmptyString(rec?.output_text);
      if (textVal) {
        textParts.push(textVal);
        totalLen += textVal.length;
      }
    }
    if (totalLen >= MAX_ANCHOR_TEXT_CHARS) break;
  }

  if (textParts.length > 0) {
    return textParts.join("\n").slice(0, MAX_ANCHOR_TEXT_CHARS);
  }

  if (content.length > 0) {
    try {
      return JSON.stringify(content).slice(0, MAX_ANCHOR_TEXT_CHARS);
    } catch {
      return "";
    }
  }
  return "";
}

function extractConversationAnchor(body: Record<string, unknown>): {
  instructions: string;
  leadingDeveloperText: string;
  firstUserText: string;
} {
  const rawInstructions = nonEmptyString(body.instructions) || "";
  const instructions =
    rawInstructions && rawInstructions !== CODEX_CHAT_DEFAULT_INSTRUCTIONS
      ? rawInstructions.slice(0, MAX_ANCHOR_TEXT_CHARS)
      : "";

  const items = Array.isArray(body.input)
    ? body.input
    : Array.isArray(body.messages)
      ? body.messages
      : [];

  let leadingDeveloperText = "";
  let firstUserText = "";

  for (const item of items) {
    const rec = asRecord(item);
    if (!rec) continue;
    const role = typeof rec.role === "string" ? rec.role.toLowerCase() : "";
    if (!leadingDeveloperText && !firstUserText && (role === "system" || role === "developer")) {
      leadingDeveloperText = extractMessageText(rec.content);
    } else if (!firstUserText && role === "user") {
      firstUserText = extractMessageText(rec.content);
      break;
    }
  }

  return { instructions, leadingDeveloperText, firstUserText };
}

function resolveAccountScopeSeed(
  credentials: CodexCacheKeyCredentials | null | undefined
): string {
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
 * - truly empty/stateless bodies return null (allowing last-resort fallback).
 */
export function deriveCodexConversationCacheKey(
  body: Record<string, unknown> | null,
  credentials: CodexCacheKeyCredentials | null | undefined
): string | null {
  if (!body) return null;
  const { instructions, leadingDeveloperText, firstUserText } = extractConversationAnchor(body);
  if (!instructions && !leadingDeveloperText && !firstUserText) {
    return null;
  }

  const model = nonEmptyString(body.model) || "";
  const accountScope = resolveAccountScopeSeed(credentials);
  const seed = `${CODEX_CONVERSATION_CACHE_KEY_PREFIX}${JSON.stringify([
    accountScope,
    model,
    instructions,
    leadingDeveloperText,
    firstUserText,
  ])}`;
  return deriveStableUUIDv4(seed);
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
  const connectionId = credentials?.connectionId ?? null;

  const transientHeaderSessionId =
    normalizeCodexSessionId(psd?.[CODEX_TRANSIENT_CACHE_SESSION_KEY]) ||
    normalizeCodexSessionId(identity?.clientSessionId) ||
    null;

  const explicitOrSessionCandidate =
    normalizeCodexSessionId(body?.prompt_cache_key) ||
    normalizeCodexSessionId(body?.session_id) ||
    normalizeCodexSessionId(body?.conversation_id) ||
    transientHeaderSessionId ||
    extractClaudeMetadataSessionId(body);

  if (explicitOrSessionCandidate) {
    const threadScoped = resolveCodexThreadScopedPromptCacheKey(
      explicitOrSessionCandidate,
      identity,
      psd,
      connectionId
    );
    return threadScoped || explicitOrSessionCandidate;
  }

  const conversationKey = deriveCodexConversationCacheKey(body, credentials);
  if (conversationKey) {
    return conversationKey;
  }

  return normalizeCodexSessionId(psd?.workspaceId) || null;
}
