/**
 * discovery/discoveryOutcome.ts — Derive and store the outcome of a model discovery.
 *
 * The discovery response already carries the outcome of the attempt (whether it
 * was degraded, and why). This module turns that response into the record the
 * dashboard shows later, and stores it per connection: a failed discovery must
 * stay visible after the response that carried it is gone.
 *
 * The derivation reads the response only — it never rebuilds the failure cause
 * and never re-decides whether a discovery was degraded.
 */

import { saveDiscoveryState } from "@/lib/db/discoveryState";

export type DiscoveryOutcome =
  { status: "healthy"; cause: null } | { status: "degraded"; cause: string };

/** Sources that mean the provider answered with a live model list. */
const LIVE_DISCOVERY_SOURCES: readonly string[] = ["api", "upstream"];

/**
 * Causes that describe a local condition, not a failed discovery: the provider
 * answered (or was never asked), so there is nothing to remember about the
 * discovery itself and the last known outcome must be kept as it is.
 */
const LOCAL_DISCOVERY_CAUSES: readonly string[] = [
  "NO_CREDENTIAL",
  "NO_ENDPOINT",
  "LOCALITY_REFUSED",
  "EMPTY_CATALOG",
  "CLIENT_TOO_OLD",
];

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Read the outcome of a discovery response.
 *
 * Returns null when the response says nothing worth remembering: a degraded
 * response without a cause (no discovery failed), a local condition, a
 * fallback catalog (not a successful discovery either) or a response that does
 * not follow the contract at all.
 */
export function readDiscoveryOutcome(payload: unknown): DiscoveryOutcome | null {
  const body = toRecord(payload);
  if (!body) return null;

  const rawCause = body.error;
  const cause = typeof rawCause === "string" && rawCause.trim().length > 0 ? rawCause.trim() : null;

  if (body.degraded === true && cause && !LOCAL_DISCOVERY_CAUSES.includes(cause)) {
    return { status: "degraded", cause };
  }
  if (typeof body.source === "string" && LIVE_DISCOVERY_SOURCES.includes(body.source)) {
    return { status: "healthy", cause: null };
  }
  return null;
}

/**
 * Derive the outcome of a discovery response and store it for its connection.
 *
 * The response carries the connection it belongs to, so it is the only source
 * of the key. A response without a connection stores nothing. A storage failure
 * is logged and swallowed: the stored outcome is a comfort, never the result of
 * the request that produced it.
 */
export function recordDiscoveryOutcome(payload: unknown): void {
  const outcome = readDiscoveryOutcome(payload);
  if (!outcome) return;

  const body = toRecord(payload);
  if (!body) return;
  const provider = typeof body.provider === "string" ? body.provider : "";
  const connectionId = typeof body.connectionId === "string" ? body.connectionId : "";
  if (!provider || !connectionId) return;

  try {
    saveDiscoveryState(provider, connectionId, outcome);
  } catch (error) {
    console.error("Failed to store the discovery outcome:", error);
  }
}
