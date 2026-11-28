import {
  museScopeHasRecordedItems,
  pruneIdleMuseOwnershipScopes,
  readMuseOwnershipValue,
  runMuseOwnershipTransaction,
  touchMuseOwnershipScope,
  writeMuseOwnershipValue,
} from "@/lib/db/museSessionOwnership";
import {
  isAccountUnavailable,
  isModelLocked,
} from "@omniroute/open-sse/services/accountFallback.ts";
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";

const digest = (value: string) => opaqueTokenFingerprint(value);
type Owner = {
  connectionId: string;
  generation?: string;
  account?: string;
  adopted?: boolean;
  pendingReferences?: string[];
};
type Connection = { id: string; unavailable?: boolean };

export function usesMuseOAuthOwnership(
  connections: { id: string; authType?: string }[],
  selectedId?: string | null
): boolean {
  if (selectedId) return connections.find((item) => item.id === selectedId)?.authType === "oauth";
  return connections.some((item) => item.authType === "oauth");
}

// OAuth accounts eligible for a session claim; cooldown, terminal status and the per-model
// lockout a Muse 429 records all count as unavailable so new/unserved sessions skip them.
export function museClaimCandidates(
  connections: {
    id: string;
    authType?: string;
    rateLimitedUntil?: string | null;
    testStatus?: string | null;
  }[],
  model: string | null | undefined,
  allowedIds?: string[] | null,
  allowUnavailable = false
): Connection[] {
  return connections
    .filter((connection) => connection.authType === "oauth")
    .filter((connection) => !allowedIds || allowedIds.includes(connection.id))
    .map((connection) => ({
      id: connection.id,
      unavailable:
        !allowUnavailable &&
        (isAccountUnavailable(connection.rateLimitedUntil) ||
          ["banned", "expired", "credits_exhausted"].includes(
            String(connection.testStatus || "").toLowerCase()
          ) ||
          isModelLocked("muse-code", connection.id, model)),
    }));
}

// Muse intermittently answers HTTP 200 with no output. A failed result has emitted nothing to
// the caller, so retry it on the same owner (never another account) after these delays.
export const MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS = [500, 1500];

export function museEmptyResponseRetryDelayMs(
  errorCode: unknown,
  retriesSoFar: number
): number | null {
  if (errorCode !== "upstream_empty_response" && errorCode !== "empty_response") return null;
  return MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS[retriesSoFar] ?? null;
}

export class MuseOwnershipError extends Error {
  readonly code = "MUSE_OWNERSHIP_REJECTED";
  constructor(
    message: string,
    readonly status = 409
  ) {
    super(message);
    this.name = "MuseOwnershipError";
  }
}

const load = readMuseOwnershipValue;
const save = writeMuseOwnershipValue;

// Idle-session pruning runs at most this often, piggybacking on session claims.
const PRUNE_INTERVAL_MS = 10 * 60 * 1000;
let lastPruneAt = 0;
function maybePruneIdleSessions(now: number): void {
  if (now - lastPruneAt < PRUNE_INTERVAL_MS) return;
  lastPruneAt = now;
  pruneIdleMuseOwnershipScopes(now);
}

/** Never derive cryptographic ownership from prompt text or a caller-selected connection. */
export function museSessionScope(
  body: Record<string, unknown>,
  headers: unknown,
  apiKeyId: string | null
): string {
  const metadata = body.metadata as Record<string, unknown> | undefined;
  const get =
    typeof (headers as { get?: unknown })?.get === "function"
      ? (name: string) => (headers as { get: (name: string) => string | null }).get(name)
      : (name: string) => {
          const record = headers as Record<string, unknown> | null | undefined;
          const value = record?.[name] ?? record?.[name.toLowerCase()];
          return typeof value === "string" ? value : null;
        };
  const session =
    get("x-omniroute-session-id") ||
    get("x-omniroute-session") ||
    get("x-session-id") ||
    get("x-codex-session-id") ||
    body.prompt_cache_key ||
    body.session_id ||
    body.conversation_id ||
    metadata?.session_id;
  if (typeof session !== "string" || !session.trim()) {
    throw new MuseOwnershipError(
      "Muse requires an explicit session ID or prompt_cache_key for safe account rotation.",
      400
    );
  }
  return digest(JSON.stringify([apiKeyId, session]));
}

/**
 * Session scope, or `null` when the caller sent no session id and there is at most one OAuth
 * account: with nothing to rotate to, cross-account replay cannot happen, so the request keeps
 * the pre-rotation (unpinned) routing instead of failing with 400.
 */
export function museSessionScopeFor(
  body: Record<string, unknown>,
  headers: unknown,
  apiKeyId: string | null,
  oauthAccountCount: number
): string | null {
  try {
    return museSessionScope(body, headers, apiKeyId);
  } catch (error) {
    if (error instanceof MuseOwnershipError && error.status === 400 && oauthAccountCount < 2) {
      return null;
    }
    throw error;
  }
}

function opaqueHashes(value: unknown, hashes = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) opaqueHashes(item, hashes);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if (key === "encrypted_content" && typeof item === "string" && item) hashes.add(digest(item));
      else opaqueHashes(item, hashes);
    }
  }
  return hashes;
}

/** Continuation ids a single object node carries directly (not those of its nested values). */
function ownContinuationIds(item: Record<string, unknown>): string[] {
  const ids: string[] = [];
  if (
    ["function_call", "function_call_output"].includes(String(item.type)) &&
    typeof item.call_id === "string"
  )
    ids.push(`call:${item.call_id}`);
  if (item.role === "tool" && typeof item.tool_call_id === "string")
    ids.push(`call:${item.tool_call_id}`);
  if (Array.isArray(item.tool_calls)) {
    for (const call of item.tool_calls)
      if (call && typeof call.id === "string") ids.push(`call:${call.id}`);
  }
  if (item.type === "item_reference" && typeof item.id === "string") ids.push(`item:${item.id}`);
  return ids;
}

function continuationIds(value: unknown, ids = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) continuationIds(item, ids);
  } else if (value && typeof value === "object") {
    const item = value as Record<string, unknown>;
    for (const id of ownContinuationIds(item)) ids.add(id);
    for (const nested of Object.values(item))
      if (nested && typeof nested === "object") continuationIds(nested, ids);
  }
  return ids;
}

function hasUnadoptableItems(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(hasUnadoptableItems);
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  if (item.type === "reasoning" || item.type === "item_reference") return true;
  if (
    (item.type === "function_call" || item.type === "function_call_output") &&
    typeof item.call_id !== "string"
  )
    return true;
  return Object.values(item).some(hasUnadoptableItems);
}

function hasForbiddenMuseHistory(body: Record<string, unknown>, references: Set<string>): boolean {
  return (
    opaqueHashes(body).size > 0 ||
    [...references].some((id) => id.startsWith("item:")) ||
    !!body.previous_response_id ||
    !!body._omniroutePreviousResponseResumed ||
    hasUnadoptableItems(body)
  );
}

/**
 * Request state that is bound to the provider session that served it: opaque
 * reasoning, item references, a response id, or items no session could adopt.
 * Plain tool history (calls carrying a `call_id`) is NOT bound, so it stays
 * adoptable and can still fail over. Same boundary the ownership claim uses.
 */
export function bodyCarriesBoundContinuation(body: Record<string, unknown>): boolean {
  if (!body || typeof body !== "object") return false;
  return hasForbiddenMuseHistory(body, continuationIds(body));
}

function assertKeptOwnerUsable(
  owner: Owner,
  current: Connection | null | undefined,
  forcedId?: string | null
): void {
  // Only a missing owner forces another account. A present owner that is cooling down
  // (rate limit, per-model lockout) keeps the session: credential selection is pinned to
  // it, so the caller gets the normal 429 with its reset instead of a cross-account error.
  if (!current) {
    throw new MuseOwnershipError(
      "Muse session owner is unavailable; cross-account continuation is forbidden.",
      503
    );
  }
  if (forcedId && forcedId !== owner.connectionId) {
    throw new MuseOwnershipError("Requested Muse account differs from the session owner.");
  }
}

/** A never-owned scope can assign plain tool history to any eligible initial owner. */
function canAdoptPlainHistory(
  prior: Owner | null,
  references: Set<string>,
  hasForbiddenHistory: boolean,
  candidates: Connection[],
  forcedId?: string | null
): boolean {
  return (
    !prior &&
    references.size > 0 &&
    !hasForbiddenHistory &&
    candidates.some(
      (candidate) => !candidate.unavailable && (!forcedId || candidate.id === forcedId)
    )
  );
}

function assignNewOwner(
  scope: string,
  candidates: Connection[],
  forcedId: string | null | undefined,
  adoptedReferences: Set<string> | null
): Owner {
  const ordered = [...candidates].sort((a, b) => a.id.localeCompare(b.id));
  if (!ordered.length)
    throw new MuseOwnershipError("No native OAuth Muse account is available.", 503);
  const cursor = Number(load("cursor") || "0");
  const rotation = ordered.map((_, index) => ordered[(cursor + index) % ordered.length]);
  const connection = forcedId
    ? ordered.find((candidate) => candidate.id === forcedId)
    : (rotation.find((candidate) => !candidate.unavailable) ?? rotation[0]);
  if (!connection)
    throw new MuseOwnershipError("Requested Muse OAuth account is unavailable.", 503);
  const owner: Owner = adoptedReferences
    ? {
        connectionId: connection.id,
        adopted: true,
        pendingReferences: [...adoptedReferences].map(digest),
      }
    : { connectionId: connection.id };
  save(`session:${scope}`, JSON.stringify(owner));
  if (!forcedId) save("cursor", String((ordered.indexOf(connection) + 1) % ordered.length));
  return owner;
}

function assertOpaqueHistoryIssued(scope: string, owner: Owner, body: Record<string, unknown>) {
  for (const hash of opaqueHashes(body)) {
    if (!owner.generation || load(`opaque:${scope}:${hash}`) !== owner.generation) {
      throw new MuseOwnershipError(
        "Muse encrypted reasoning was not issued to this session and caller generation."
      );
    }
  }
}

function verifyContinuationReferences(scope: string, owner: Owner, references: Set<string>) {
  for (const id of references) {
    const hash = digest(id);
    const pendingAdoption = owner.pendingReferences?.includes(hash) && !owner.generation;
    const issued = !!owner.generation && load(`reference:${scope}:${hash}`) === owner.generation;
    if (pendingAdoption || issued) continue;
    // Client threads carry tool items issued under other models or restored by
    // compaction; record them under the scope's bound generation. Opaque and item:
    // history stays fail-closed.
    if (id.startsWith("call:")) {
      if (owner.generation) {
        save(`reference:${scope}:${hash}`, owner.generation);
      } else {
        // A claim can be revisited before credentials are bound. Plain call ids
        // still carry no account state; bind them with the actual credential,
        // just like the initial adopted history, rather than rejecting the retry.
        owner.pendingReferences = [...new Set([...(owner.pendingReferences || []), hash])];
        save(`session:${scope}`, JSON.stringify(owner));
      }
      continue;
    }
    throw new MuseOwnershipError(
      "Muse tool continuation was not issued to this session and caller generation."
    );
  }
}

/** Atomic session assignment; once output was served, pins never expire or move to another account. */
export function claimMuseSession(
  scope: string,
  body: Record<string, unknown>,
  candidates: Connection[],
  forcedId?: string | null
): Owner {
  let owner!: Owner;
  const now = Date.now();
  maybePruneIdleSessions(now);
  runMuseOwnershipTransaction(() => {
    touchMuseOwnershipScope(scope, now);
    const stored = load(`session:${scope}`);
    const prior = stored ? (JSON.parse(stored) as Owner) : null;
    const current = prior && candidates.find((candidate) => candidate.id === prior.connectionId);
    const pinned = load(`served:${scope}`) === "1" || !!prior?.adopted;
    const references = continuationIds(body);
    const hasForbiddenHistory = hasForbiddenMuseHistory(body, references);
    if (
      prior &&
      (pinned || (current && !current.unavailable && (!forcedId || forcedId === current.id)))
    ) {
      owner = prior;
      assertKeptOwnerUsable(owner, current, forcedId);
    } else {
      const adopt = canAdoptPlainHistory(
        prior,
        references,
        hasForbiddenHistory,
        candidates,
        forcedId
      );
      if (hasForbiddenHistory || (references.size > 0 && !adopt)) {
        throw new MuseOwnershipError(
          "Muse continuation has no recorded owner; start an independent session without imported opaque history."
        );
      }
      owner = assignNewOwner(scope, candidates, forcedId, adopt ? references : null);
    }
    assertOpaqueHistoryIssued(scope, owner, body);
    verifyContinuationReferences(scope, owner, references);
  });
  return owner;
}

/** Hash the actual inference credential, not timestamps or mutable account labels. Never persist secrets. */
export function bindMuseGeneration(
  scope: string,
  connectionId: string,
  credential: string,
  accountIdentity: string
): string {
  if (!credential)
    throw new MuseOwnershipError("Muse session owner has no inference credential.", 503);
  const generation = digest(credential);
  const account = digest(accountIdentity);
  runMuseOwnershipTransaction(() => {
    const owner = JSON.parse(load(`session:${scope}`) || "null") as Owner | null;
    if (
      !owner ||
      owner.connectionId !== connectionId ||
      (owner.account && owner.account !== account)
    ) {
      throw new MuseOwnershipError(
        "Muse session owner changed; existing session reasoning cannot be replayed under the new caller."
      );
    }
    if (owner.generation && owner.generation !== generation && museScopeHasRecordedItems(scope)) {
      throw new MuseOwnershipError(
        "Muse caller generation changed; existing session reasoning cannot be replayed under the new credential."
      );
    }
    for (const hash of owner.pendingReferences || []) {
      save(`reference:${scope}:${hash}`, generation);
    }
    save(
      `session:${scope}`,
      JSON.stringify({ connectionId, generation, account, ...(owner.adopted && { adopted: true }) })
    );
  });
  return generation;
}

/** Observe the exact downstream output without altering events, tools, opaque reasoning, or terminal errors. */
export function recordMuseOutput(response: Response, scope: string, generation: string): Response {
  if (!response.body || !response.ok) return response;
  save(`served:${scope}`, "1");
  touchMuseOwnershipScope(scope);
  const record = (value: unknown) => {
    for (const hash of opaqueHashes(value)) save(`opaque:${scope}:${hash}`, generation);
    for (const id of continuationIds(value)) save(`reference:${scope}:${digest(id)}`, generation);
    const output = value as {
      item?: { id?: unknown };
      output?: unknown[];
      response?: { output?: unknown[] };
    } | null;
    const items = output?.item ? [output.item] : output?.output || output?.response?.output || [];
    for (const item of items) {
      if (item && typeof item === "object" && "id" in item && typeof item.id === "string") {
        save(`reference:${scope}:${digest(`item:${item.id}`)}`, generation);
      }
    }
  };
  const decoder = new TextDecoder();
  let buffer = "";
  const sse = response.headers.get("content-type")?.includes("text/event-stream");
  const body = response.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        if (sse) {
          // Responses events can cross arbitrary transport chunk boundaries.
          let end: number;
          while ((end = buffer.search(/\r?\n\r?\n/)) >= 0) {
            const event = buffer.slice(0, end);
            const separator = buffer.slice(end).match(/^\r?\n\r?\n/)![0];
            buffer = buffer.slice(end + separator.length);
            const data = event
              .split(/\r?\n/)
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.slice(5).trimStart())
              .join("\n");
            if (data && data !== "[DONE]") {
              try {
                record(JSON.parse(data));
              } catch (error) {
                if (!(error instanceof SyntaxError)) throw error;
              }
            }
          }
        }
        controller.enqueue(chunk);
      },
      flush() {
        buffer += decoder.decode();
        if (!sse && buffer) {
          try {
            record(JSON.parse(buffer));
          } catch (error) {
            if (!(error instanceof SyntaxError)) throw error;
          }
        }
      },
    })
  );
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
