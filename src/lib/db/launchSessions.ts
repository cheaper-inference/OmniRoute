/**
 * Launch sessions: the short-lived `olx_<sessionId>_<secret>` credential `omnirouter launch`
 * mints for every tool it starts (architecture 3.3, 240_launch_sessions.sql).
 *
 * - The token is never stored: only its fingerprint (`opaqueTokenFingerprint`, the same helper
 *   that hashes API keys), compared in constant time. Revoking wipes the fingerprint and keeps
 *   the row (30 days) for history.
 * - A session resolves to its parent API key (or, with a NULL parent, the anonymous loopback
 *   posture) and can only narrow it: the view shapes the catalog, never authorization.
 * - Usage is not counted here; requests land in the parent key's agent_sessions row whose
 *   client session id is this session id (agent_session_id caches that row id).
 *
 * The only module that touches the launch_sessions table (Hard Rule #5).
 */

import { randomBytes } from "node:crypto";

import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";

import { getDbInstance } from "./core";

export const LAUNCH_TOKEN_PREFIX = "olx_";
export const LAUNCH_SESSION_DEFAULT_TTL_SECONDS = 15 * 60;
export const LAUNCH_SESSION_MIN_TTL_SECONDS = 60;
export const LAUNCH_SESSION_MAX_TTL_SECONDS = 60 * 60;
/** Hard cap on a session's total life: heartbeats can never extend it past created_at + this. */
export const LAUNCH_SESSION_MAX_LIFETIME_MS = 24 * 60 * 60 * 1000;
/** Revoked and expired rows are kept this long (hash wiped) so the dashboard can show history. */
export const LAUNCH_SESSION_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;

const SESSION_ID_BYTES = 16; // 26 base32 chars
const SECRET_BYTES = 32; // 52 base32 chars
const TOKEN_PATTERN = /^olx_([a-z2-7]{26})_([a-z2-7]{52})$/;
const SESSION_ID_PATTERN = /^[a-z2-7]{26}$/;
const BASE32_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";

export interface LaunchSessionView {
  hash: string;
  ids: string[];
  serve?: { prefix?: string; mode?: "replace" | "mirror"; shape?: "openai" | "codex" };
  spec?: Record<string, unknown>;
}

export interface LaunchSessionRecord {
  id: string;
  /** null = anonymous loopback posture (no API key on the install side). */
  parentKeyId: string | null;
  /** Fingerprint of the parent credential at mint (null for anonymous sessions). */
  parentCredentialHash: string | null;
  toolId: string;
  sessionTag: string;
  agentSessionId: string | null;
  view: LaunchSessionView | null;
  spec: Record<string, unknown> | null;
  policy: Record<string, unknown> | null;
  attribution: Record<string, unknown> | null;
  preset: string | null;
  ttlSeconds: number;
  createdAt: string;
  expiresAt: string;
  lastSeenAt: string;
  revokedAt: string | null;
}

export interface CreateLaunchSessionInput {
  parentKeyId: string | null;
  /** The raw parent credential; only its fingerprint is stored. Required with a parent. */
  parentCredential?: string | null;
  toolId: string;
  sessionTag?: string | null;
  view?: LaunchSessionView | null;
  spec?: Record<string, unknown> | null;
  policy?: Record<string, unknown> | null;
  attribution?: Record<string, unknown> | null;
  preset?: string | null;
  ttlSeconds?: number | null;
  now?: number;
}

type Row = Record<string, unknown>;

function base32(bytes: Buffer): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

function fingerprint(token: string): string {
  return opaqueTokenFingerprint(token);
}

/**
 * Fingerprint of a parent credential, byte-identical to `api_keys.key_hash` for DB keys (same
 * helper), so a resolver compares it against the parent's CURRENT hash.
 */
export function launchParentCredentialFingerprint(credential: string): string {
  return fingerprint(credential);
}

export function isLaunchSessionToken(value: unknown): value is string {
  return typeof value === "string" && value.startsWith(LAUNCH_TOKEN_PREFIX);
}

export function isLaunchSessionId(value: unknown): value is string {
  return typeof value === "string" && SESSION_ID_PATTERN.test(value);
}

/** Splits a well-formed token; anything else (wrong length, alphabet, prefix) is null. */
export function parseLaunchSessionToken(
  token: unknown
): { sessionId: string; secret: string } | null {
  if (typeof token !== "string") return null;
  const match = TOKEN_PATTERN.exec(token);
  return match ? { sessionId: match[1], secret: match[2] } : null;
}

export function defaultLaunchSessionTag(toolId: string, sessionId: string): string {
  return `launch:${toolId}:${sessionId}`;
}

export function clampLaunchSessionTtl(ttlSeconds: unknown): number {
  if (typeof ttlSeconds !== "number" || !Number.isFinite(ttlSeconds)) {
    return LAUNCH_SESSION_DEFAULT_TTL_SECONDS;
  }
  return Math.min(
    LAUNCH_SESSION_MAX_TTL_SECONDS,
    Math.max(LAUNCH_SESSION_MIN_TTL_SECONDS, Math.floor(ttlSeconds))
  );
}

function parseJson<T>(value: unknown): T | null {
  if (typeof value !== "string" || value === "") return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function jsonOrNull(value: unknown): string | null {
  return value === undefined || value === null ? null : JSON.stringify(value);
}

function text(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function toRecord(row: Row): LaunchSessionRecord {
  return {
    id: String(row.id),
    parentKeyId: text(row.parent_key_id),
    parentCredentialHash: text(row.parent_credential_hash),
    toolId: String(row.tool_id),
    sessionTag: String(row.session_tag),
    agentSessionId: text(row.agent_session_id),
    view: parseJson<LaunchSessionView>(row.view_json),
    spec: parseJson<Record<string, unknown>>(row.spec_json),
    policy: parseJson<Record<string, unknown>>(row.policy_json),
    attribution: parseJson<Record<string, unknown>>(row.attribution_json),
    preset: text(row.preset),
    ttlSeconds: Number(row.ttl_seconds ?? LAUNCH_SESSION_DEFAULT_TTL_SECONDS),
    createdAt: String(row.created_at),
    expiresAt: String(row.expires_at),
    lastSeenAt: String(row.last_seen_at),
    revokedAt: text(row.revoked_at),
  };
}

export function isLaunchSessionActive(
  session: LaunchSessionRecord | null | undefined,
  now: number = Date.now()
): session is LaunchSessionRecord {
  if (!session || session.revokedAt) return false;
  const expiresMs = Date.parse(session.expiresAt);
  const createdMs = Date.parse(session.createdAt);
  if (!Number.isFinite(createdMs) || now >= createdMs + LAUNCH_SESSION_MAX_LIFETIME_MS)
    return false;
  return Number.isFinite(expiresMs) && expiresMs > now;
}

/** Mints a session and returns it with its one-time token (the only copy of the secret). */
export function createLaunchSession(input: CreateLaunchSessionInput): {
  session: LaunchSessionRecord;
  token: string;
} {
  const now = input.now ?? Date.now();
  const id = base32(randomBytes(SESSION_ID_BYTES));
  const secret = base32(randomBytes(SECRET_BYTES));
  const token = `${LAUNCH_TOKEN_PREFIX}${id}_${secret}`;
  const ttlSeconds = clampLaunchSessionTtl(input.ttlSeconds);
  const nowIso = new Date(now).toISOString();
  const expiresAt = new Date(now + ttlSeconds * 1000).toISOString();
  const sessionTag = input.sessionTag || defaultLaunchSessionTag(input.toolId, id);

  if (input.parentKeyId !== null && !input.parentCredential) {
    throw new Error("a launch session with a parent key needs the parent credential");
  }
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO launch_sessions (
       id, secret_hash, parent_key_id, parent_credential_hash, tool_id, session_tag, agent_session_id, view_json,
       spec_json, policy_json, attribution_json, preset, ttl_seconds, created_at, expires_at,
       last_seen_at, revoked_at
     ) VALUES (?, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)`
  ).run(
    id,
    fingerprint(token),
    input.parentKeyId,
    input.parentCredential ? fingerprint(input.parentCredential) : null,
    input.toolId,
    sessionTag,
    jsonOrNull(input.view),
    jsonOrNull(input.spec),
    jsonOrNull(input.policy),
    jsonOrNull(input.attribution),
    input.preset ?? null,
    ttlSeconds,
    nowIso,
    expiresAt,
    nowIso
  );
  const session = getLaunchSession(id);
  if (!session) throw new Error("launch session insert did not persist");
  return { session, token };
}

export function getLaunchSession(id: string): LaunchSessionRecord | null {
  if (!isLaunchSessionId(id)) return null;
  const row = getDbInstance().prepare("SELECT * FROM launch_sessions WHERE id = ?").get(id) as
    Row | undefined;
  return row ? toRecord(row) : null;
}

/**
 * The active session a token belongs to, or null for a malformed, unknown, revoked or expired
 * token. The stored fingerprint is compared in constant time.
 */
export function resolveLaunchSessionToken(
  token: unknown,
  now: number = Date.now()
): LaunchSessionRecord | null {
  const parsed = parseLaunchSessionToken(token);
  if (!parsed) return null;
  const row = getDbInstance()
    .prepare("SELECT * FROM launch_sessions WHERE id = ?")
    .get(parsed.sessionId) as Row | undefined;
  if (!row || typeof row.secret_hash !== "string") return null;
  if (!timingSafeCompare(fingerprint(token as string), row.secret_hash)) return null;
  const session = toRecord(row);
  return isLaunchSessionActive(session, now) ? session : null;
}

/** Extends an active session by its own TTL. Returns the refreshed row, or null when inactive. */
export function heartbeatLaunchSession(
  id: string,
  now: number = Date.now()
): LaunchSessionRecord | null {
  const session = getLaunchSession(id);
  if (!isLaunchSessionActive(session, now)) return null;
  const nowIso = new Date(now).toISOString();
  const hardStop = Date.parse(session.createdAt) + LAUNCH_SESSION_MAX_LIFETIME_MS;
  const expiresAt = new Date(Math.min(now + session.ttlSeconds * 1000, hardStop)).toISOString();
  getDbInstance()
    .prepare(
      "UPDATE launch_sessions SET expires_at = ?, last_seen_at = ? WHERE id = ? AND revoked_at IS NULL"
    )
    .run(expiresAt, nowIso, id);
  return getLaunchSession(id);
}

/** Replaces the server view of an active session. Null when inactive. */
export function setLaunchSessionView(
  id: string,
  view: LaunchSessionView | null,
  now: number = Date.now()
): LaunchSessionRecord | null {
  const session = getLaunchSession(id);
  if (!isLaunchSessionActive(session, now)) return null;
  getDbInstance()
    .prepare("UPDATE launch_sessions SET view_json = ?, last_seen_at = ? WHERE id = ?")
    .run(jsonOrNull(view), new Date(now).toISOString(), id);
  return getLaunchSession(id);
}

export function setLaunchSessionAgentSessionId(id: string, agentSessionId: string): void {
  getDbInstance()
    .prepare("UPDATE launch_sessions SET agent_session_id = ? WHERE id = ?")
    .run(agentSessionId, id);
}

/**
 * Revokes a session: the token stops resolving immediately and the fingerprint is wiped.
 * Idempotent; returns false when the id does not exist.
 */
export function revokeLaunchSession(id: string, now: number = Date.now()): boolean {
  if (!isLaunchSessionId(id)) return false;
  const result = getDbInstance()
    .prepare(
      `UPDATE launch_sessions
         SET revoked_at = COALESCE(revoked_at, ?), secret_hash = NULL
       WHERE id = ?`
    )
    .run(new Date(now).toISOString(), id);
  return Number(result.changes ?? 0) > 0;
}

/** Wipes the fingerprint of expired rows and deletes rows past the retention window. */
export function purgeLaunchSessions(now: number = Date.now()): number {
  const db = getDbInstance();
  const nowIso = new Date(now).toISOString();
  db.prepare(
    "UPDATE launch_sessions SET secret_hash = NULL WHERE secret_hash IS NOT NULL AND expires_at <= ?"
  ).run(nowIso);
  const cutoff = new Date(now - LAUNCH_SESSION_RETENTION_MS).toISOString();
  const result = db
    .prepare("DELETE FROM launch_sessions WHERE created_at < ? AND expires_at < ?")
    .run(cutoff, cutoff);
  return Number(result.changes ?? 0);
}

// ---------- request identity for an `olx_` bearer (consumed by apiKeys.ts) ----------

/** Id stamped on requests of an anonymous (no parent key) launch session. */
export const LAUNCH_ANONYMOUS_API_KEY_ID = "launch-anonymous";

/**
 * Scopes a session never inherits: a launch token is a client credential, never a dashboard /
 * management one (architecture 3.3 "Not a dashboard credential").
 */
const NON_INHERITED_SCOPES: ReadonlySet<string> = new Set([
  "manage",
  "admin",
  "mcp:connect",
  "read:cache",
  "write:cache",
]);
/** Kept when every parent scope was stripped, so no empty-list scope defaults apply. */
export const LAUNCH_SESSION_SCOPE = "launch:session";

/** What the request pipeline learns about the session behind an `olx_` bearer. */
export interface LaunchSessionIdentity {
  id: string;
  toolId: string;
  sessionTag: string;
  parentKeyId: string | null;
  view: LaunchSessionView | null;
  policy: Record<string, unknown> | null;
}

export function launchSessionScopes(parentScopes: readonly string[] | null | undefined): string[] {
  const kept = (parentScopes || []).filter((scope) => !NON_INHERITED_SCOPES.has(scope));
  return kept.length > 0 ? kept : [LAUNCH_SESSION_SCOPE];
}

/**
 * The parent key's metadata, narrowed for a session: same permissions minus management scopes,
 * plus the session identity. Every other parent field (limits, quotas, allowed models, new
 * fields added later) flows through unchanged, so the session can never exceed its parent.
 */
export function launchSessionMetadata<T extends { scopes: string[] }>(
  parent: T,
  session: LaunchSessionRecord
): T & { launchSession: LaunchSessionIdentity } {
  return {
    ...parent,
    scopes: launchSessionScopes(parent.scopes),
    launchSession: {
      id: session.id,
      toolId: session.toolId,
      sessionTag: session.sessionTag,
      parentKeyId: session.parentKeyId,
      view: session.view,
      policy: session.policy,
    },
  };
}
