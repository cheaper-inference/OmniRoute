/**
 * Conversation-stable session identity for Command Code's `/alpha/generate` CLI endpoint.
 *
 * The upstream prompt cache is keyed on the session the client sends — the `x-session-id`
 * header plus the envelope `threadId`. The official CLI mints one v4 UUID per conversation and
 * reuses it on every turn; a fresh id per request makes each turn look like a new conversation
 * and forces a full prefix re-cache. So the id is derived, not randomized:
 *
 *   1. an explicit client session (`prompt_cache_key`, then the shared header/body session
 *      fields incl. Claude Code `metadata.user_id`) — reused as-is when it is already a UUID,
 *      hashed into UUID shape otherwise;
 *   2. otherwise the conversation-stable prefix (system text + first user turn), which does not
 *      change while later turns are appended;
 *   3. a random UUID only when there is nothing to key on.
 *
 * Every hashed id is salted with the tenant key (connection id, else API key), so two OmniRoute
 * connections sending the same opening never present the same upstream session. The raw client
 * session and tenant key only ever feed the hash; neither is logged nor sent upstream unhashed
 * (a client-supplied UUID is the one exception — it already is a session id of the CLI's shape).
 */

import { createHash, randomUUID } from "node:crypto";
import { resolveOpencodeSessionIdentity } from "../../utils/opencodeSessionIdentity.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HASH_NAMESPACE = "omniroute:commandcode:";
const MAX_CLIENT_SESSION_LENGTH = 256;

type JsonRecord = Record<string, unknown>;

export interface CommandCodeSessionInput {
  /** Request body before the CLI envelope is built; carries explicit client session fields. */
  body: unknown;
  /** CLI envelope `params` — the normalized `system` text and `messages` that get hashed. */
  params: { system?: unknown; messages?: unknown };
  /** Original client request headers (header-borne sessions win over body fields). */
  clientHeaders?: Record<string, string> | null;
  /** Per-tenant salt: the connection id, else the API key. Only ever hashed. */
  tenantKey: string;
}

/** True when the value is a UUID the Command Code envelope accepts as `threadId`. */
export function isCommandCodeThreadId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value.trim());
}

/** Shape a sha256 digest as an RFC 4122 v4 UUID (version + variant bits set). */
function toV4Uuid(digest: Buffer): string {
  const bytes = Buffer.from(digest.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function hashedId(kind: string, tenantKey: string, value: string): string {
  return toV4Uuid(
    createHash("sha256")
      .update(`${HASH_NAMESPACE}${kind}\0`)
      .update(tenantKey)
      .update("\0")
      .update(value)
      .digest()
  );
}

function explicitClientSession(
  body: unknown,
  clientHeaders: Record<string, string> | null | undefined
): string | undefined {
  const input = body && typeof body === "object" ? (body as JsonRecord) : undefined;
  const cacheKey = input?.prompt_cache_key;
  if (typeof cacheKey === "string" && cacheKey.length <= MAX_CLIENT_SESSION_LENGTH) {
    const trimmed = cacheKey.trim();
    if (trimmed) return trimmed;
  }
  return resolveOpencodeSessionIdentity(clientHeaders, body);
}

/** System text + first user turn of the CLI params; null when both are empty. */
function conversationPrefix(params: CommandCodeSessionInput["params"]): string | null {
  const system = typeof params.system === "string" ? params.system : "";
  const messages = Array.isArray(params.messages) ? params.messages : [];
  const firstUser = messages.find(
    (message): message is JsonRecord =>
      !!message && typeof message === "object" && (message as JsonRecord).role === "user"
  );
  const firstUserContent = firstUser ? JSON.stringify(firstUser.content ?? "") : "";
  if (!system && !firstUserContent) return null;
  return `${system}\0${firstUserContent}`;
}

/**
 * The id to send as both `x-session-id` and envelope `threadId` on the CLI fallback.
 * Same conversation + same tenant ⇒ same id; anything else ⇒ a different id.
 */
export function commandCodeSessionId(input: CommandCodeSessionInput): string {
  const client = explicitClientSession(input.body, input.clientHeaders);
  if (client) {
    if (isCommandCodeThreadId(client)) return client.trim().toLowerCase();
    return hashedId("client", input.tenantKey, client);
  }

  const prefix = conversationPrefix(input.params);
  if (prefix === null) return randomUUID();
  return hashedId("prefix", input.tenantKey, prefix);
}
