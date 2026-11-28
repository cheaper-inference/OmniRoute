/**
 * Google One AI credits injection for Antigravity.
 *
 * When Antigravity returns a quota_exhausted 429, CLIProxyAPI retries the
 * request with `enabledCreditTypes: ["GOOGLE_ONE_AI"]` injected into the
 * body. This uses the user's Google One AI credit balance for the retry,
 * which is often available on Pro accounts.
 *
 * Based on CLIProxyAPI's antigravity_executor.go line 268.
 */

import {
  normalizeAntigravityCreditsOverride,
  normalizeAntigravityCreditsMode,
  type CreditsMode,
} from "../config/antigravityCreditsMode.ts";
import { isCreditsDisabled, recordCreditsFailure } from "./antigravity429Engine.ts";

export {
  ANTIGRAVITY_CREDITS_MODES,
  normalizeAntigravityCreditsMode,
  type CreditsMode,
} from "../config/antigravityCreditsMode.ts";

/**
 * Inject enabledCreditTypes into the request body for a credits retry.
 * Returns a new body object with the field added.
 */
export function injectCreditsField(body: Record<string, unknown>): Record<string, unknown> {
  return {
    ...body,
    enabledCreditTypes: ["GOOGLE_ONE_AI"],
  };
}

/**
 * Determine if a credits retry should be attempted for this auth key.
 * Returns false if credits are disabled (too many failures) or if the
 * config flag is off.
 */
export function shouldRetryWithCredits(authKey: string, creditsMode: CreditsMode): boolean {
  if (creditsMode !== "retry") return false;
  if (isCreditsDisabled(authKey)) return false;
  return true;
}

/**
 * Handle a credits retry failure. Tracks the failure and returns
 * true if credits are now disabled for this auth key.
 */
export function handleCreditsFailure(authKey: string): boolean {
  return recordCreditsFailure(authKey);
}

// The settings route and proxy executor may be emitted in different Next.js
// server bundles. Keep the override shared across those bundles in this process.
const store = globalThis as typeof globalThis & {
  __omnirouteAntigravityCreditsMode?: CreditsMode;
};

export function resolveAntigravityCreditsMode(override: unknown): CreditsMode {
  return (
    normalizeAntigravityCreditsOverride(override) ??
    normalizeAntigravityCreditsMode(process.env.ANTIGRAVITY_CREDITS)
  );
}

export function setAntigravityCreditsMode(mode: CreditsMode | null | undefined): void {
  store.__omnirouteAntigravityCreditsMode = mode ?? undefined;
}

/**
 * Read the saved credits strategy, or ANTIGRAVITY_CREDITS when none is saved.
 *
 * - "off"    — never inject credits (default if env var is missing)
 * - "retry"  — inject credits only as a 429 fallback
 * - "always" — inject credits on every request (skip normal quota path)
 */
export function getCreditsMode(): CreditsMode {
  return resolveAntigravityCreditsMode(store.__omnirouteAntigravityCreditsMode);
}

/**
 * Determine if the executor should inject credits on the *first* request
 * (credits-first mode). Returns true only when creditsMode === "always"
 * and the auth key hasn't been disabled by repeated failures.
 */
export function shouldUseCreditsFirst(authKey: string, creditsMode: CreditsMode | string): boolean {
  if (creditsMode !== "always") return false;
  if (isCreditsDisabled(authKey)) return false;
  return true;
}
