import type { FalRealtimeConnection } from "@omniroute/open-sse/handlers/fal/realtime";
import type { FalRecord } from "@omniroute/open-sse/handlers/fal/schema";
import { FalError } from "@omniroute/open-sse/handlers/fal/client";
import { randomUUID } from "node:crypto";

// WebSockets are process-local. Expired/restarted sessions are never silently reconnected.
const sessions = new Map<
  string,
  { connection: FalRealtimeConnection; validate: (input: FalRecord) => FalRecord }
>();
const files = new Map<
  string,
  { jobId: string; bytes: Uint8Array; type: string; name: string; until: number }
>();
export function storeFalArtifact(jobId: string, bytes: Uint8Array, type: string, name: string) {
  const now = Date.now();
  for (const [id, file] of files) if (file.until < now) files.delete(id);
  let total = Array.from(files.values()).reduce((n, f) => n + f.bytes.byteLength, 0);
  for (const [id, file] of files) {
    if (total + bytes.byteLength <= 128 * 1024 * 1024) break;
    files.delete(id);
    total -= file.bytes.byteLength;
  }
  const id = randomUUID();
  files.set(id, { jobId, bytes, type, name, until: now + 10 * 60_000 });
  return `/api/v1/fal/jobs/${jobId}?artifact=${id}`;
}
export function loadFalArtifact(jobId: string, id: string) {
  const file = files.get(id);
  if (!file || file.jobId !== jobId || file.until < Date.now()) return null;
  return file;
}
export function registerFalRealtime(
  id: string,
  connection: FalRealtimeConnection,
  validate: (input: FalRecord) => FalRecord
) {
  sessions.set(id, { connection, validate });
}
export function removeFalRealtime(id: string) {
  sessions.delete(id);
}
export function closeFalRealtime(id: string) {
  sessions.get(id)?.connection.close();
  sessions.delete(id);
}
export function sendFalRealtime(id: string, input: FalRecord) {
  const session = sessions.get(id);
  if (!session)
    throw new FalError("Fal realtime session expired or belongs to another worker", 410);
  session.connection.send(session.validate(input));
}
