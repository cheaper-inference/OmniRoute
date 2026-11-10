import { createHash } from "node:crypto";

type Body = Record<string, unknown>;
const SESSION_HEADERS = [
  "session-id",
  "session_id",
  "x-opencode-session-id",
  "x-session-affinity",
  "x-session-id",
  "x-claude-code-session-id",
  "x-opencode-session",
];

/** Reject malformed identities rather than truncating two different sessions into one key. */
function sessionId(value: unknown): string | null {
  return typeof value === "string" && /^[A-Za-z0-9._:-]{1,128}$/.test(value) ? value : null;
}

/** Session hints identify a conversation, never an authenticated principal. */
export function originalCacheSession(headers: unknown, body?: Body): string | null {
  for (const name of SESSION_HEADERS) {
    const value = sessionId(readHeader(headers, name));
    if (value) return value;
  }
  return sessionId(body?.session_id) || sessionId(body?.conversation_id) || metadataSession(body);
}

function readHeader(headers: unknown, name: string): unknown {
  if (headers instanceof Headers) return headers.get(name);
  if (!headers || typeof headers !== "object") return null;
  return Object.entries(headers).find(([key]) => key.toLowerCase() === name)?.[1];
}

function metadataSession(body?: Body): string | null {
  const metadata = body?.metadata;
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return null;
  const userId = (metadata as Body).user_id;
  if (typeof userId !== "string" || userId.length > 8192) return null;
  try {
    const parsed: unknown = JSON.parse(userId);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? sessionId((parsed as Body).session_id)
      : null;
  } catch {
    return null;
  }
}

/** Explicit keys win; only synthesize before any internal prefix/workspace fallback exists. */
export function applySessionPromptCacheKey(
  body: Body,
  context: {
    rawBody?: Body;
    headers?: unknown;
    principalId?: string | null;
    provider?: string | null;
    connectionId?: unknown;
    model: string;
  }
): Body {
  if (typeof body.prompt_cache_key === "string" && body.prompt_cache_key.trim()) return body;
  const explicit = context.rawBody?.prompt_cache_key;
  if (typeof explicit === "string" && explicit.trim())
    return { ...body, prompt_cache_key: explicit };
  if (!context.principalId) return body;
  const session = originalCacheSession(context.headers, context.rawBody);
  if (!session) return body;
  const digest = createHash("sha256")
    .update(
      JSON.stringify([
        "omniroute-session-v1",
        context.principalId,
        context.provider,
        context.connectionId ?? null,
        context.model,
        session,
      ])
    )
    .digest("hex");
  return { ...body, prompt_cache_key: `omni-session-${digest}` };
}
