import { createHash } from "node:crypto";
import type { JWTPayload } from "jose";
import { getDbInstance } from "./core";
import type { SqliteAdapter } from "./adapters/types";

const NAMESPACE = "dashboardSessionLifetimes";
type Lifetime = { exp: number; revoked: boolean };

function sessionKey(payload: JWTPayload, token: string): string {
  return typeof payload.jti === "string" && payload.jti.length > 0
    ? `jti:${payload.jti}`
    : `sha256:${createHash("sha256").update(token).digest("hex")}`;
}

function read(db: SqliteAdapter, key: string): Lifetime | null {
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, key) as { value: string } | undefined;
  if (!row) return null;
  const value = JSON.parse(row.value) as Lifetime;
  if (!Number.isFinite(value.exp) || typeof value.revoked !== "boolean") {
    throw new Error("Invalid dashboard session lifetime record");
  }
  return value;
}

function write(db: SqliteAdapter, key: string, value: Lifetime): void {
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?) ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
  ).run(NAMESPACE, key, JSON.stringify(value));
}

function pruneExpired(db: SqliteAdapter): void {
  db.prepare(
    "DELETE FROM key_value WHERE namespace = ? AND CAST(json_extract(value, '$.exp') AS REAL) <= ?"
  ).run(NAMESPACE, Date.now() / 1000);
}

/** Read the authority directly: a settings-cache TTL must never delay sign-out. */
export function isDashboardSessionRevoked(payload: JWTPayload, token: string): boolean {
  return read(getDbInstance(), sessionKey(payload, token))?.revoked === true;
}

/**
 * Reserve the maximum expiry BEFORE signing a refreshed variant. A concurrent
 * logout either sees this reservation or prevents it; no later cookie can outlive
 * its revocation. Individual rows avoid lost array updates and capacity eviction.
 */
export function reserveDashboardSessionExpiry(jti: string, exp: number): void {
  const db = getDbInstance();
  db.immediate(() => {
    pruneExpired(db);
    const key = `jti:${jti}`;
    const current = read(db, key);
    if (current?.revoked) throw new Error("Dashboard session has ended");
    write(db, key, { exp: Math.max(exp, current?.exp ?? 0), revoked: false });
  });
  db.flush?.();
}

/** Legacy cookies without jti are revoked by the digest of the signed cookie. */
export function revokeDashboardSession(payload: JWTPayload, token: string): void {
  if (!Number.isFinite(payload.exp)) throw new Error("Dashboard session has no finite expiry");
  const db = getDbInstance();
  db.immediate(() => {
    pruneExpired(db);
    const key = sessionKey(payload, token);
    const current = read(db, key);
    write(db, key, { exp: Math.max(payload.exp!, current?.exp ?? 0), revoked: true });
  });
  // The sql.js adapter normally debounces writes. Logout acknowledgement and
  // refresh issuance require a durable write, with errors propagated to callers.
  db.flush?.();
}
