// Rotating-endpoint exemption sync: copies the egress keys of registry rows marked
// `rotating_egress = 1` into the refusal store, which never sets those keys aside for a
// per-IP quota refusal. Keyed on the registry generation, so the hot path pays one
// integer comparison until a registry write bumps it.
import { getDbInstance } from "../core";
import {
  getQuotaExemptStamp,
  proxyEgressKey,
  replaceQuotaExemptKeys,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";
import { getProxyRegistryGeneration } from "./registryGeneration";

/**
 * Refresh the exempt set when the registry changed since the last read. Edge relays have
 * no egress key and never enter the set. A read failure keeps the set as it was.
 */
export function syncRotatingEgressExemptions(): void {
  const generation = getProxyRegistryGeneration();
  if (getQuotaExemptStamp() === generation) return;
  let rows: unknown[];
  try {
    rows = getDbInstance()
      .prepare("SELECT type, host, port, username FROM proxy_registry WHERE rotating_egress = 1")
      .all();
  } catch (error) {
    console.warn(
      `[ProxyRotatingEgress] exemption sync skipped: ${error instanceof Error ? error.message : String(error)}`
    );
    return;
  }
  const keys: string[] = [];
  for (const row of rows) {
    const key = proxyEgressKey(row);
    if (key !== null) keys.push(key);
  }
  replaceQuotaExemptKeys(keys, generation);
}
