import { createHash, randomUUID } from "node:crypto";
import { getDbInstance } from "./core";
import type { FalDefinition, FalRecord } from "@omniroute/open-sse/handlers/fal/schema";

export type FalJob = {
  id: string;
  owner: string;
  connectionId: string;
  endpoint: string;
  requestId?: string;
  statusUrl?: string;
  responseUrl?: string;
  cancelUrl?: string;
  status: string;
  createdAt: number;
  accounted: boolean;
  transport?: string;
};

function read<T>(namespace: string, key: string): T | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(namespace, key) as { value: string } | undefined;
  return row ? (JSON.parse(row.value) as T) : null;
}

function write(namespace: string, key: string, value: unknown) {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, JSON.stringify(value));
}

export function getFalDefinition(
  connectionId: string,
  endpoint: string,
  refresh = false
): FalDefinition | null {
  const entry = read<{ definition: FalDefinition; at: number; manual: boolean }>(
    "falDefinitions",
    `${connectionId}:${endpoint}`
  );
  if (!entry || (!entry.manual && (refresh || Date.now() - entry.at > 3600_000))) return null;
  return entry.definition;
}

export function saveFalDefinition(connectionId: string, definition: FalDefinition, manual = false) {
  write("falDefinitions", `${connectionId}:${definition.endpoint_id}`, {
    definition,
    manual,
    at: Date.now(),
  });
}

export function loadFalJob(id: string): FalJob | null {
  return read<FalJob>("falJobs", id);
}

export function deleteFalDefinition(connectionId: string, endpoint: string) {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run("falDefinitions", `${connectionId}:${endpoint}`);
}
export function saveFalJob(job: FalJob) {
  write("falJobs", job.id, job);
}

function canonicalInput(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalInput);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => (left === right ? 0 : left < right ? -1 : 1))
        .map(([key, item]) => [key, canonicalInput(item)])
    );
  }
  return value;
}

function falInputFingerprint(endpoint: string, input: FalRecord) {
  return createHash("sha256")
    .update(JSON.stringify(canonicalInput({ endpoint, input })))
    .digest("hex");
}

export function findFalReservation(
  owner: string,
  idempotencyKey: string,
  endpoint: string,
  input: FalRecord
): FalJob | null {
  const key = createHash("sha256").update(`${owner}:${idempotencyKey}`).digest("hex");
  const existing = read<{ id: string; fingerprint: string }>("falIdempotency", key);
  if (!existing) return null;
  if (existing.fingerprint !== falInputFingerprint(endpoint, input)) {
    throw new Error("Idempotency-Key was already used with a different fal input");
  }
  const job = loadFalJob(existing.id);
  if (!job) throw new Error("Missing fal idempotency receipt");
  return job;
}

/** Reserve before dispatch, including uncertain submissions; retries never create another job. */
export function reserveFalJob(
  owner: string,
  connectionId: string,
  endpoint: string,
  input: FalRecord,
  idempotencyKey?: string | null
): { job: FalJob; fresh: boolean } {
  const fingerprint = falInputFingerprint(endpoint, input);
  const key = idempotencyKey
    ? createHash("sha256").update(`${owner}:${idempotencyKey}`).digest("hex")
    : null;
  return getDbInstance().transaction(() => {
    if (key) {
      const existing = findFalReservation(owner, idempotencyKey!, endpoint, input);
      if (existing) {
        return { job: existing, fresh: false };
      }
    }
    const job: FalJob = {
      id: randomUUID(),
      owner,
      connectionId,
      endpoint,
      status: "SUBMITTING",
      createdAt: Date.now(),
      accounted: false,
    };
    saveFalJob(job);
    if (key) write("falIdempotency", key, { id: job.id, fingerprint });
    return { job, fresh: true };
  })();
}

/** Claim once inside the same process/database before recording budget usage. */
export function claimFalAccounting(id: string): boolean {
  return getDbInstance().transaction(() => {
    const job = loadFalJob(id);
    if (!job || job.accounted) return false;
    saveFalJob({ ...job, accounted: true });
    return true;
  })();
}
