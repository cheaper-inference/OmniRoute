import { classify429 } from "@omniroute/open-sse/services/antigravity429Engine.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

import { getProviderCredentialsWithQuotaPreflight } from "./auth";
import { isCredentialDiagnosticSentinel } from "./credentialSentinel";
import { checkAndRefreshToken } from "./tokenRefresh";
import * as log from "../utils/logger";

interface ImageGenerationResult {
  success: boolean;
  status?: number;
  error?: unknown;
  data?: unknown;
  // #8307: opt-in signal a provider handler can set (via
  // saveImageErrorResult's `retryable` option) when a non-401 failure is
  // still account-specific — e.g. a ChatGPT account that can run Codex but
  // lacks access to the requested image model and returns a specific 400.
  // Only honored together with a connectionId, same as the existing 401 path,
  // so providers that never set it keep the original 401-only fallback
  // behavior unchanged.
  retryable?: boolean;
}

interface ImageCredentialRetryOptions {
  provider: string;
  requestedModel: string | null;
  credentials: any;
  execute: (credentials: any) => Promise<ImageGenerationResult>;
  // GHSA-3w2r: the caller key's connection scope. Account fallback must stay
  // inside it exactly like the first selection did. null = unscoped.
  allowedConnections?: string[] | null;
  // Injectable so unit tests can drive multi-account fallback deterministically
  // without a live DB-backed credential store; production always uses the real
  // getProviderCredentialsWithQuotaPreflight-backed selectNextCredentials below.
  selectNextCredentials?: (
    provider: string,
    requestedModel: string | null,
    excludedConnectionIds: Set<string>,
    allowedConnections: string[] | null
  ) => Promise<any>;
}

interface ImageCredentialRetryResult {
  credentials: any;
  result: ImageGenerationResult;
}

function connectionIdOf(credentials: any): string | null {
  const connectionId = credentials?.connectionId;
  return typeof connectionId === "string" && connectionId.trim().length > 0
    ? connectionId.trim()
    : null;
}

function isOutsideImageKeyScope(credentials: any, allowedConnections: string[] | null): boolean {
  if (!Array.isArray(allowedConnections)) return false;
  const connectionId = connectionIdOf(credentials);
  return !connectionId || !allowedConnections.includes(connectionId);
}

function isCredentialSentinel(credentials: any): boolean {
  // Includes the key-scope sentinel (blockedByKeyPolicy): it carries no secret
  // and must never be dispatched.
  return isCredentialDiagnosticSentinel(credentials);
}

function finalImageRetryFailure(
  currentCredentials: any,
  lastResult: ImageGenerationResult | null
): ImageGenerationResult {
  // The selector can deny a scoped key with a sentinel instead of credentials.
  // Preserve that denial after the fallback loop, even if an earlier account
  // returned an authentication error.
  if (currentCredentials?.blockedByKeyPolicy === true) {
    return {
      success: false,
      status: 403,
      error: "No image-provider connection is allowed for this API key",
    };
  }
  return (
    lastResult || {
      success: false,
      status: 401,
      error: "Authentication failed for all eligible image-provider accounts",
    }
  );
}

/**
 * Image generation is non-idempotent, so account rotation stays deliberately
 * narrower than chat failover. Antigravity's explicit exhausted-quota signal
 * is safe to retry on another account; an ordinary 429 is not evidence that a
 * different account helps and must not cause account rotation.
 */
export function isAntigravityImageQuotaExhausted(
  provider: string,
  result: ImageGenerationResult
): boolean {
  if (provider !== "antigravity" || Number(result.status) !== 429) return false;

  let errorText = "";
  try {
    errorText =
      typeof result.error === "string" ? result.error : JSON.stringify(result.error ?? "");
  } catch {
    return false;
  }

  return classify429(errorText) === "quota_exhausted";
}

async function defaultSelectNextCredentials(
  provider: string,
  requestedModel: string | null,
  excludedConnectionIds: Set<string>,
  allowedConnections: string[] | null
) {
  return getProviderCredentialsWithQuotaPreflight(
    provider,
    null,
    allowedConnections,
    requestedModel,
    {
      excludeConnectionIds: Array.from(excludedConnectionIds),
    }
  );
}

async function executeWithoutImageCredentials(
  credentials: ImageCredentialRetryOptions["credentials"],
  execute: ImageCredentialRetryOptions["execute"],
  allowedConnections: string[] | null
): Promise<ImageCredentialRetryResult> {
  // A scoped key may use a keyless provider only when it admits the
  // synthetic noauth connection explicitly.
  if (Array.isArray(allowedConnections) && !allowedConnections.includes("noauth")) {
    return {
      credentials,
      result: {
        success: false,
        status: 403,
        error: "No image-provider connection is allowed for this API key",
      },
    };
  }
  return { credentials, result: await execute(credentials) };
}

function outOfScopeImageCredential(
  credentials: ImageCredentialRetryOptions["credentials"],
  allowedConnections: string[] | null,
  error: string
): ImageCredentialRetryResult | null {
  if (!isOutsideImageKeyScope(credentials, allowedConnections)) return null;
  return { credentials, result: { success: false, status: 403, error } };
}

/**
 * Keep image requests on the same credential lifecycle as chat requests.
 *
 * Each connection is attempted at most once. A refresh failure or upstream 401
 * excludes only that connection for the current request; it does not mutate the
 * account into a terminal state because another request may refresh it normally.
 */
export async function executeImageWithCredentialFallback({
  provider,
  requestedModel,
  credentials,
  execute,
  allowedConnections = null,
  selectNextCredentials = defaultSelectNextCredentials,
}: ImageCredentialRetryOptions): Promise<ImageCredentialRetryResult> {
  // Preserve direct dispatch for local/no-auth providers, but never for a scoped key.
  if (!credentials) return executeWithoutImageCredentials(credentials, execute, allowedConnections);

  const excludedConnectionIds = new Set<string>();
  let currentCredentials = credentials;
  let lastCredentials = credentials;
  let lastResult: ImageGenerationResult | null = null;

  while (currentCredentials && !isCredentialSentinel(currentCredentials)) {
    const connectionId = connectionIdOf(currentCredentials);
    // Defense in depth: selectors and test hooks must never bypass the caller
    // API key's connection allowlist, even during image credential rotation.
    const scopedDenial = outOfScopeImageCredential(
      currentCredentials,
      allowedConnections,
      "Image credential is outside the API key's allowed connections"
    );
    if (scopedDenial) return scopedDenial;
    if (connectionId && excludedConnectionIds.has(connectionId)) break;
    if (connectionId) excludedConnectionIds.add(connectionId);

    try {
      currentCredentials = await checkAndRefreshToken(provider, currentCredentials);
    } catch (error) {
      log.warn("IMAGE", "Credential refresh failed; trying another image-provider account", {
        provider,
        connectionId,
        error: sanitizeErrorMessage(error instanceof Error ? error : new Error(String(error))),
      });
      if (!connectionId) throw error;
      currentCredentials = await selectNextCredentials(
        provider,
        requestedModel,
        excludedConnectionIds,
        allowedConnections
      );
      continue;
    }

    // A refresh must not silently substitute a different or unscoped account.
    const refreshedScopeDenial = outOfScopeImageCredential(
      currentCredentials,
      allowedConnections,
      "Refreshed image credential is outside the API key's allowed connections"
    );
    if (refreshedScopeDenial) return refreshedScopeDenial;
    lastCredentials = currentCredentials;
    lastResult = await execute(currentCredentials);
    const shouldTryAnotherAccount =
      Number(lastResult.status) === 401 ||
      lastResult.retryable === true ||
      isAntigravityImageQuotaExhausted(provider, lastResult);
    if (lastResult.success || !shouldTryAnotherAccount || !connectionId) {
      return { credentials: lastCredentials, result: lastResult };
    }

    log.warn("IMAGE", "Image provider rejected credentials; trying another account", {
      provider,
      connectionId,
    });
    currentCredentials = await selectNextCredentials(
      provider,
      requestedModel,
      excludedConnectionIds,
      allowedConnections
    );
  }

  return {
    credentials: lastCredentials,
    result: finalImageRetryFailure(currentCredentials, lastResult),
  };
}
