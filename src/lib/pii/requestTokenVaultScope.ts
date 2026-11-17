/**
 * Request scope of the reversible PII vault (owner design, 2026-11-08).
 *
 * `handleChat` runs every client request through `runWithRequestTokenVault`. When
 * PII_REDACTION_ENABLED and PII_REVERSIBLE_VAULT_ENABLED are both on, a fresh vault becomes
 * the request's active vault for the whole dispatch: pre-call masking, every combo leg,
 * retry, fusion panel member and judge. Tokens are minted once, by the pii-masker, and the
 * single exit below restores them on the winning response only. Nothing inside chatCore
 * detokenizes, so a fusion judge or a combo leg never sees an original value.
 *
 * With the gate closed the request runs exactly as before: no vault, no async context, no
 * wrapper, the very same Response object.
 *
 * Exit rules:
 * - no token minted: the same Response object is returned;
 * - 4xx / 5xx: returned untouched (tokens, no PII), as error bodies are not detokenized;
 * - `text/event-stream`: piped through the per-field SSE detokenizer;
 * - JSON: parsed, restored per field, re-serialized with a fresh Content-Length;
 * - anything else: passed through, tokens literal, with a count-only warning.
 * A failure on the way out leaves the tokens literal and logs counts, never values.
 */

import { inheritEmptyTurnPolicy } from "@omniroute/open-sse/utils/emptyTurnPolicy.ts";
import { createLogger } from "@/shared/utils/logger";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { wrapReadableStreamWithFinalize } from "@omniroute/open-sse/handlers/chatCore/streamFinalize.ts";
import {
  createDetokenizeCounters,
  createDetokenizeSseTransform,
  type DetokenizeCounters,
} from "./detokenizeSseTransform";
import {
  RequestTokenVault,
  getActiveRequestTokenVault,
  runWithTokenVault,
  type TokenReplaceMode,
} from "./tokenVault";

type VaultLog = { warn: (meta: Record<string, unknown>, message: string) => void };

export type RequestTokenVaultScopeDeps = {
  isGateOpen: () => boolean;
  createVault: () => RequestTokenVault;
  createSseTransform: typeof createDetokenizeSseTransform;
  log: VaultLog;
};

let defaultLog: VaultLog | null = null;
function getDefaultLog(): VaultLog {
  defaultLog ??= createLogger("pii-vault") as unknown as VaultLog;
  return defaultLog;
}

/** Both flags on, read once per request (DB override > env > default, like every flag). */
export function isReversibleVaultGateOpen(isEnabled = isFeatureFlagEnabled): boolean {
  try {
    return isEnabled("PII_REDACTION_ENABLED") && isEnabled("PII_REVERSIBLE_VAULT_ENABLED");
  } catch {
    // Closed means the masker writes irreversible placeholders: the private direction.
    return false;
  }
}

const DEFAULT_DEPS: RequestTokenVaultScopeDeps = {
  isGateOpen: () => isReversibleVaultGateOpen(),
  createVault: () => new RequestTokenVault(),
  createSseTransform: createDetokenizeSseTransform,
  get log() {
    return getDefaultLog();
  },
};

/**
 * Run one client request under the reversible vault when the gate is open. A nested call
 * (already inside a scope) reuses the outer vault and leaves the exit to the outer scope.
 */
export function runWithRequestTokenVault(
  handler: () => Promise<Response>,
  deps: Partial<RequestTokenVaultScopeDeps> = {}
): Promise<Response> {
  const resolved = { ...DEFAULT_DEPS, ...deps } as RequestTokenVaultScopeDeps;
  if (getActiveRequestTokenVault() || !resolved.isGateOpen()) return handler();
  return runScoped(handler, resolved);
}

async function runScoped(
  handler: () => Promise<Response>,
  deps: RequestTokenVaultScopeDeps
): Promise<Response> {
  const vault = deps.createVault();
  let response: Response;
  try {
    response = await runWithTokenVault(vault, handler);
  } catch (error) {
    vault.dispose();
    throw error;
  }
  return detokenizeResponse(response, vault, deps);
}

function contentTypeOf(response: Response): string {
  return (response.headers.get("content-type") || "").toLowerCase();
}

function logOutcome(
  vault: RequestTokenVault,
  deps: RequestTokenVaultScopeDeps,
  extra: Partial<DetokenizeCounters> & { reason?: string } = {}
) {
  const stats = vault.stats();
  const failures = extra.failures ?? 0;
  if (stats.unresolved === 0 && failures === 0 && !extra.reason) return;
  try {
    deps.log.warn(
      { ...stats, ...extra },
      "PII vault left surrogate tokens literal in the response (counts only)"
    );
  } catch {
    // Logging must never break the response path.
  }
}

/** Restore tokens on the response leaving handleChat. Never throws for a 2xx body. */
export async function detokenizeResponse(
  response: Response,
  vault: RequestTokenVault,
  deps: Partial<RequestTokenVaultScopeDeps> = {}
): Promise<Response> {
  const resolved = { ...DEFAULT_DEPS, ...deps } as RequestTokenVaultScopeDeps;
  if (vault.size === 0 || !(response instanceof Response) || !response.ok || !response.body) {
    vault.dispose();
    return response;
  }
  const contentType = contentTypeOf(response);
  if (contentType.includes("text/event-stream")) return detokenizeSse(response, vault, resolved);
  if (contentType.includes("json")) return detokenizeJson(response, vault, resolved);
  logOutcome(vault, resolved, { reason: "unsupported_content_type" });
  vault.dispose();
  return response;
}

function rebuild(source: Response, body: BodyInit, contentLength?: number): Response {
  const headers = new Headers(source.headers);
  if (contentLength === undefined) headers.delete("content-length");
  else headers.set("content-length", String(contentLength));
  const next = new Response(body, {
    status: source.status,
    statusText: source.statusText,
    headers,
  });
  return inheritEmptyTurnPolicy(source, next);
}

function detokenizeSse(
  response: Response,
  vault: RequestTokenVault,
  deps: RequestTokenVaultScopeDeps
): Response {
  const counters = createDetokenizeCounters();
  const restored = (response.body as ReadableStream<Uint8Array>).pipeThrough(
    deps.createSseTransform(vault, { counters })
  );
  const finalized = wrapReadableStreamWithFinalize(restored, () => {
    logOutcome(vault, deps, counters);
    vault.dispose();
  });
  return rebuild(response, finalized);
}

const OPAQUE_KEYS = new Set(["encrypted_content", "signature", "data"]);

function restoreValue(value: unknown, key: string, vault: RequestTokenVault): unknown {
  if (typeof value === "string") {
    const mode: TokenReplaceMode = key === "arguments" || key === "partial_json" ? "json" : "raw";
    return OPAQUE_KEYS.has(key) ? value : vault.replaceTokens(value, mode);
  }
  if (Array.isArray(value)) return value.map((entry) => restoreValue(entry, key, vault));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [childKey, child] of Object.entries(value as Record<string, unknown>)) {
      out[childKey] = restoreValue(child, childKey, vault);
    }
    return out;
  }
  return value;
}

async function detokenizeJson(
  response: Response,
  vault: RequestTokenVault,
  deps: RequestTokenVaultScopeDeps
): Promise<Response> {
  let text: string;
  try {
    text = await response.text();
  } catch (error) {
    vault.dispose();
    throw error;
  }
  let output = text;
  let failures = 0;
  if (text.includes("<<PII_")) {
    try {
      output = JSON.stringify(restoreValue(JSON.parse(text), "", vault));
    } catch {
      failures = 1;
      output = text;
    }
  }
  logOutcome(vault, deps, { failures });
  vault.dispose();
  return rebuild(response, output, Buffer.byteLength(output));
}
