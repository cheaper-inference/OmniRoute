import { AsyncLocalStorage } from "node:async_hooks";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import type { ApiKeyMetadata } from "./apiKeyPolicy";
import { getProcessStore } from "./processSingleton";

type ResolvedRequiredApiKey = { apiKey: string; apiKeyInfo: ApiKeyMetadata };

/**
 * Server integration contract for selecting a mandatory API key.
 *
 * @public
 */
export interface RequiredServerApiKey {
  apiKeyId: string;
  /** Read the current secret and policy for this ID from server-owned storage. */
  resolve: (apiKeyId: string) => Promise<ResolvedRequiredApiKey | null>;
}

type RequiredApiKeyContext = { binding: RequiredServerApiKey; unavailable: boolean };

const storage = getProcessStore(
  "requiredApiKeyContext",
  () => new AsyncLocalStorage<RequiredApiKeyContext>()
);

/**
 * Dispatch an already-authorized server request with a mandatory API key.
 *
 * @public
 */
export function runWithRequiredApiKey<T>(
  binding: RequiredServerApiKey,
  run: () => Promise<T>
): Promise<T> {
  return storage.run({ binding: { ...binding }, unavailable: false }, run);
}

function isUsableKey({ isActive, isBanned, revokedAt, expiresAt }: ApiKeyMetadata): boolean {
  return (
    isActive !== false &&
    !isBanned &&
    !revokedAt &&
    (!expiresAt || Date.parse(expiresAt) > Date.now())
  );
}

async function resolveUsableKey({
  apiKeyId,
  resolve,
}: RequiredServerApiKey): Promise<ResolvedRequiredApiKey | null> {
  const resolved = await resolve(apiKeyId);
  if (!resolved?.apiKey || resolved.apiKeyInfo.id !== apiKeyId) return null;

  // Recheck the stored identity and lifecycle at each boundary. In particular, a
  // successful auth check or a resolver snapshot must not authorize a deleted key.
  const { getApiKeyMetadata } = await import("@/lib/db/apiKeys");
  const current = await getApiKeyMetadata(resolved.apiKey, { bypassCache: true });
  return current?.id === apiKeyId && isUsableKey(current) && isUsableKey(resolved.apiKeyInfo)
    ? resolved
    : null;
}

async function resolveInContext(
  context: RequiredApiKeyContext
): Promise<ResolvedRequiredApiKey | null> {
  if (context.unavailable) return null;

  // Resolver errors may contain the credential. Keep them inside the boundary.
  const resolved = await resolveUsableKey(context.binding).catch(() => null);
  if (!resolved) context.unavailable = true;
  return context.unavailable ? null : resolved;
}

/** Undefined means no binding. A promise resolving to null means the binding failed. */
export function resolveRequiredApiKey(): Promise<ResolvedRequiredApiKey | null> | undefined {
  const context = storage.getStore();
  return context && resolveInContext(context);
}

export function requiredApiKeyUnavailable(): Response {
  return errorResponse(HTTP_STATUS.FORBIDDEN, "Required API key is unavailable", {
    code: "required_api_key_unavailable",
  });
}
