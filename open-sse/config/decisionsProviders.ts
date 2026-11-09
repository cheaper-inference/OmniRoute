/**
 * Decisions-only providers (#13987, #14498).
 *
 * These providers hold a credential and a registry entry (models, pricing,
 * discovery) but have no chat shape: their only dispatch surface is
 * POST /v1/systemone. Chat routing, chat catalogs and combos must never select
 * them — without the guard, getExecutor() would hand the provider key to the
 * DefaultExecutor and post a chat body to the decisions endpoint.
 */
import { TYPESAFE_SYSTEMONE_PROVIDER_ID } from "./systemOneRegistry.ts";

export const DECISIONS_ONLY_PROVIDER_IDS: ReadonlySet<string> = new Set([
  TYPESAFE_SYSTEMONE_PROVIDER_ID,
]);

export function isDecisionsOnlyProvider(provider: string | null | undefined): boolean {
  if (typeof provider !== "string") return false;
  return DECISIONS_ONLY_PROVIDER_IDS.has(provider.trim().toLowerCase());
}
