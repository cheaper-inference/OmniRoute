// src/sse/services/tokenRefresh.ts registers its fenced Codex refresh persistence here,
// so the engine can persist or adopt a rotated Codex token without importing src/
// (boundary ratchet, scripts/quality/measure-boundary.mjs). The registration sits on a
// process-wide symbol so route bundles and instrumentation see the same writer.
import { StaleCodexOperationError, type CodexConnectionFence } from "./fenceTypes.ts";

const CODEX_REFRESH_PERSISTENCE_KEY = Symbol.for("omniroute.codexRefreshPersistence");

export type CodexRefreshPersistence = {
  adoptCommittedCodexRefresh(
    result: object,
    expected: CodexConnectionFence | null
  ): CodexConnectionFence | null;
  persistCodexRefresh(
    result: Record<string, unknown>,
    expected: CodexConnectionFence
  ): Promise<void>;
};

export function registerCodexRefreshPersistence(persistence: CodexRefreshPersistence | null): void {
  const store = globalThis as Record<symbol, unknown>;
  if (persistence) store[CODEX_REFRESH_PERSISTENCE_KEY] = persistence;
  else delete store[CODEX_REFRESH_PERSISTENCE_KEY];
}

function registeredPersistence(): CodexRefreshPersistence {
  const persistence = (globalThis as Record<symbol, unknown>)[CODEX_REFRESH_PERSISTENCE_KEY];
  // Never persist or adopt a Codex rotation without the application's fenced writer.
  if (!persistence) throw new StaleCodexOperationError();
  return persistence as CodexRefreshPersistence;
}

/** Reuse a shared rotation only while its committed owner/version is still current. */
export function adoptCommittedCodexRefresh(
  result: object,
  expected: CodexConnectionFence | null
): CodexConnectionFence | null {
  return registeredPersistence().adoptCommittedCodexRefresh(result, expected);
}

/** Persist a rotation under its fence, inside getAccessToken's connection mutex. */
export async function persistCodexRefresh(
  result: Record<string, unknown>,
  expected: CodexConnectionFence
): Promise<void> {
  return registeredPersistence().persistCodexRefresh(result, expected);
}
