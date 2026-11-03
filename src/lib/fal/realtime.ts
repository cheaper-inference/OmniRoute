import type { FalRealtimeConnection } from "@omniroute/open-sse/handlers/fal/realtime";
import type { FalRecord } from "@omniroute/open-sse/handlers/fal/schema";
import { FalError } from "@omniroute/open-sse/handlers/fal/client";

// WebSockets are process-local. Expired/restarted sessions are never silently reconnected.
const sessions = new Map<
  string,
  { connection: FalRealtimeConnection; validate: (input: FalRecord) => FalRecord }
>();
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
