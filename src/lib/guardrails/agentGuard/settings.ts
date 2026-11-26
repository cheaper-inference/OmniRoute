/**
 * Agent guard settings: the `AGENT_GUARD_MODE` and `AGENT_GUARD_STRICT` feature
 * flags, read on every call (DB override > env > default; the flag store caches
 * overrides, so a read costs a map lookup).
 */

import { resolveFeatureFlag } from "@/shared/utils/featureFlags";

export type AgentGuardMode = "off" | "monitor" | "block";

/** An unreadable flag store falls back to the environment value. */
function readFlag(key: string): string {
  try {
    return resolveFeatureFlag(key);
  } catch {
    return process.env[key] ?? "";
  }
}

/** `monitor` and `block` are the only active modes; any other value is `off`. */
export function resolveAgentGuardMode(): AgentGuardMode {
  const value = readFlag("AGENT_GUARD_MODE").trim().toLowerCase();
  return value === "monitor" || value === "block" ? value : "off";
}

/** True for `true`, `1` or `yes` (case-insensitive, surrounding spaces ignored). */
export function isAgentGuardStrict(): boolean {
  const value = readFlag("AGENT_GUARD_STRICT").trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}
