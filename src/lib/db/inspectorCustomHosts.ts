/**
 * Database module: InspectorCustomHosts
 * Synchronous compatibility facade for the inspector_custom_hosts table.
 *
 * Persistence lives in `repositories/sqliteInspectorCustomHostRepository.ts`.
 * These exports stay synchronous (SQLite-only legacy access) because the
 * traffic-inspector routes, DNS provisioning/repair, config import/export and
 * the per-request intercept hook call them synchronously.
 */

import type { InspectorCustomHostRepository } from "@/domain/persistence/agentBridgeRepositories";
import type { InspectorCustomHostRow } from "./_rowTypes.ts";
import { agentBridgeRepositories } from "./repositories/agentBridgeRepositories";

const customHosts = agentBridgeRepositories.legacySync.customHosts;

/** Async persistence contract for Traffic Inspector custom capture hosts. */
export function getInspectorCustomHostRepository(): InspectorCustomHostRepository {
  return agentBridgeRepositories.customHosts;
}

export function listCustomHosts(opts?: { enabledOnly?: boolean }): InspectorCustomHostRow[] {
  return customHosts.list(opts);
}

export function addCustomHost(
  host: string,
  kind: "llm" | "app" | "custom" = "custom",
  label?: string
): void {
  customHosts.add(host, kind, label);
}

export function removeCustomHost(host: string): void {
  customHosts.remove(host);
}

export function toggleCustomHost(host: string, enabled: boolean): void {
  customHosts.setEnabled(host, enabled);
}

export function touchLastSeen(host: string): void {
  customHosts.touchLastSeen(host);
}

/**
 * Returns true when `host` is present in inspector_custom_hosts with enabled=1.
 * Used by agentBridgeHook to distinguish custom-host intercepts from agent-bridge
 * intercepts so that Mode 2 (Custom Hosts) entries appear in the "Custom" profile.
 */
export function isCustomHost(host: string): boolean {
  return customHosts.isEnabledCustomHost(host);
}
