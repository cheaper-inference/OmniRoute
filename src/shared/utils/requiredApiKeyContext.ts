import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";

import {
  isInternalAdmissionBypass,
  resolveSelfLoopBearer,
} from "@/shared/middleware/chatAdmissionIdentity";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import type { ApiKeyMetadata } from "./apiKeyPolicy";
import { getProcessStore } from "./processSingleton";
import { timingSafeCompare } from "./timingSafeCompare";

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

export interface RequiredApiKeyOptions {
  /** Use native dispatch and wait for authorization before sending streaming frames. */
  nativeTransport?: boolean;
}

type RequiredApiKeyContext = {
  binding: RequiredServerApiKey;
  unavailable: boolean;
  nativeTransport: boolean;
  finished: boolean;
  childReference?: string;
};

export const SELF_LOOP_KEY_ID_HEADER = "x-omniroute-self-loop-key-id";
const CHILD_PREFIX = "required-key:";
const CHILD_PATHS = new Set([
  "/v1/chat/completions",
  "/api/v1/chat/completions",
  "/v1/audio/transcriptions",
  "/api/v1/audio/transcriptions",
]);

const children = getProcessStore(
  "requiredApiKeyChildren",
  () => new Map<string, RequiredApiKeyContext>()
);

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
  run: () => Promise<T>,
  options?: RequiredApiKeyOptions
): Promise<T> {
  const context: RequiredApiKeyContext = {
    binding: { ...binding },
    unavailable: false,
    nativeTransport: options?.nativeTransport === true,
    finished: false,
  };
  if (!context.nativeTransport) return storage.run(context, run);

  return storage.run(context, async () => {
    try {
      return await run();
    } finally {
      context.finished = true;
      if (context.childReference) children.delete(context.childReference);
    }
  });
}

function readChildReference(request: Request): string | undefined {
  const reference = request.headers.get(SELF_LOOP_KEY_ID_HEADER);
  if (!reference?.startsWith(CHILD_PREFIX) || request.method !== "POST") return;
  if (!CHILD_PATHS.has(new URL(request.url).pathname)) return;

  const bearer = request.headers.get("authorization");
  if (!bearer?.startsWith("Bearer ")) return;
  if (timingSafeCompare(bearer.slice(7), resolveSelfLoopBearer())) return reference;
}

export function usesNativeRequiredApiKeyTransport(request?: Request): boolean {
  return (
    storage.getStore()?.nativeTransport === true ||
    Boolean(request && readChildReference(request) && isInternalAdmissionBypass(request))
  );
}

/** Give a guardrail a short-lived reference for its authenticated loopback call. */
export function getRequiredApiKeyChildReference(apiKeyId: string): string | undefined {
  const context = storage.getStore();
  if (!context?.nativeTransport || context.binding.apiKeyId !== apiKeyId) return;

  if (!context.childReference) {
    context.childReference = CHILD_PREFIX + randomUUID();
    // A guardrail that resumes after cancellation must still send a scoped reference.
    if (!context.finished) children.set(context.childReference, context);
  }
  return context.childReference;
}

export function resolveRequiredApiKeyChild(
  request: Request
): Promise<ResolvedRequiredApiKey | null> | undefined {
  const reference = readChildReference(request);
  if (!reference) return;

  const context = isInternalAdmissionBypass(request) ? children.get(reference) : undefined;
  if (!context) return Promise.resolve(null);
  return resolveInContext(context).then((resolved) => (context.finished ? null : resolved));
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
