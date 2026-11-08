/**
 * Decisions-only providers (#13987, #14498).
 *
 * These providers hold a credential and a registry entry but have no chat shape:
 * their only dispatch surface is POST /v1/systemone. Without a guard, getExecutor()
 * hands the provider key to the DefaultExecutor, which falls back to the OpenAI
 * endpoint. The guard itself is opt-in (SYSTEMONE_CHAT_GUARD_ENABLED).
 */
import { TYPESAFE_SYSTEMONE_PROVIDER_ID } from "./systemOneRegistry.ts";

export const DECISIONS_ONLY_PROVIDER_IDS: ReadonlySet<string> = new Set([
  TYPESAFE_SYSTEMONE_PROVIDER_ID,
]);

export function isDecisionsOnlyProvider(provider: string | null | undefined): boolean {
  if (typeof provider !== "string") return false;
  return DECISIONS_ONLY_PROVIDER_IDS.has(provider.trim().toLowerCase());
}
