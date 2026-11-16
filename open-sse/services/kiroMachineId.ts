import { createHash } from "node:crypto";

/**
 * Stable per-connection Kiro machineId: 64 hex chars, the shape node-machine-id gives the
 * Kiro IDE. Derived from the connection id, so it survives token refreshes, re-logins and
 * restarts, and changes only when the connection is deleted and added again. Not seeded from
 * the profileArn (connections of one IdC org share it) nor the clientId (IdC re-registers it
 * on re-login) nor the access token (rotates on every refresh).
 */
export function kiroMachineId(connectionId: unknown): string | undefined {
  if (typeof connectionId !== "string" || connectionId.trim() === "") return undefined;
  return createHash("sha256").update(`kiro-machine-id:${connectionId.trim()}`).digest("hex");
}
