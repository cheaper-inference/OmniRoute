// src/sse/services/tokenRefresh.ts registers its refresh-and-persist function here,
// so open-sse can renew a connection's OAuth token without importing src/ (boundary
// ratchet, scripts/quality/measure-boundary.mjs). The function sits on a process-wide
// symbol so route bundles and instrumentation see the same registration; startup
// (src/instrumentation-node.ts) loads the module before any request is served.
const CREDENTIAL_REFRESHER_KEY = Symbol.for("omniroute.credentialRefresher");

export type RefreshableCredentials = {
  accessToken?: string;
  expiresAt?: string | null;
};

export type CredentialRefresher = <T extends RefreshableCredentials>(
  provider: string,
  credentials: T
) => Promise<T>;

export function registerCredentialRefresher(refresher: CredentialRefresher | null): void {
  const store = globalThis as Record<symbol, unknown>;
  if (refresher) store[CREDENTIAL_REFRESHER_KEY] = refresher;
  else delete store[CREDENTIAL_REFRESHER_KEY];
}

/** The registered refresher, or null when src/sse/services/tokenRefresh.ts has not loaded. */
export function getRegisteredCredentialRefresher(): CredentialRefresher | null {
  const refresher = (globalThis as Record<symbol, unknown>)[CREDENTIAL_REFRESHER_KEY];
  return typeof refresher === "function" ? (refresher as CredentialRefresher) : null;
}
