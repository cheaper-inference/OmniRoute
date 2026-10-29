/**
 * API-key scope for the Vision Bridge describe path.
 *
 * Chat enforces the caller key's `allowedConnections`, quota pools and model
 * allow/deny lists before any upstream call. The Vision Bridge sends the image
 * to a vision model it picks itself, through an internal self-loop, so it must
 * apply the same scope: candidates are limited to models the key may use on
 * connections the key may use, and the describe self-loop carries the key id
 * so the receiving chat request enforces the key's policy again
 * (`x-omniroute-self-loop-key-id`, honored only with the self-loop bearer).
 *
 * Keys with none of those restrictions get no scope (null) and keep the
 * unscoped behavior.
 */

import { getApiKeyById, isModelAllowedForKey } from "@/lib/db/apiKeys";
import { hasApiKeyModelRestrictions } from "@/shared/utils/resolvedModelAccess";
import { intersectAllowedConnectionIds } from "@/sse/handlers/chat/connectionConstraints.ts";
import { hasUsableCredentialsForModel } from "./visionBridgeCredentials";

export interface VisionBridgeKeyScope {
  /** Id of the caller's API key; the describe self-loop is scoped to it. */
  apiKeyId: string;
  /** Selection-cache partition (key id + the policy fields that narrow it). */
  cacheScope: string;
  /** Credential check narrowed to the models and connections the key may use. */
  hasUsableCredentials: (model: string) => Promise<boolean | null>;
}

export interface VisionBridgeKeyScopeDeps {
  /** Raw key secret by id (model-policy checks are keyed by the secret). */
  getKeySecret?: (apiKeyId: string) => Promise<string | null>;
  isModelAllowed?: (apiKey: string, model: string) => Promise<boolean>;
  hasUsableCredentials?: typeof hasUsableCredentialsForModel;
}

async function defaultGetKeySecret(apiKeyId: string): Promise<string | null> {
  const row = (await getApiKeyById(apiKeyId)) as { key?: unknown } | null;
  return typeof row?.key === "string" && row.key.length > 0 ? row.key : null;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/**
 * Resolve the Vision Bridge scope for the caller's key metadata
 * (`GuardrailContext.apiKeyInfo`). Returns null when there is no key or the key
 * carries no connection, quota or model restriction.
 */
export async function resolveVisionBridgeKeyScope(
  apiKeyInfo: Record<string, unknown> | null | undefined,
  deps: VisionBridgeKeyScopeDeps = {}
): Promise<VisionBridgeKeyScope | null> {
  const apiKeyId = typeof apiKeyInfo?.id === "string" ? apiKeyInfo.id : "";
  if (!apiKeyInfo || !apiKeyId) return null;

  const allowedConnections = intersectAllowedConnectionIds(apiKeyInfo.allowedConnections, null);
  const allowedQuotas = stringList(apiKeyInfo.allowedQuotas);
  const modelRestricted = hasApiKeyModelRestrictions(apiKeyInfo);
  if (!allowedConnections && allowedQuotas.length === 0 && !modelRestricted) return null;

  const checkCreds = deps.hasUsableCredentials ?? hasUsableCredentialsForModel;
  const isAllowed = deps.isModelAllowed ?? isModelAllowedForKey;
  let keySecret: string | null = null;
  if (modelRestricted) {
    try {
      keySecret = await (deps.getKeySecret ?? defaultGetKeySecret)(apiKeyId);
    } catch {
      keySecret = null;
    }
  }

  const hasUsableCredentials = async (model: string): Promise<boolean | null> => {
    // Quota-exclusive keys may only use their pool's quotaShared-* models,
    // which are never Vision Bridge candidates.
    if (allowedQuotas.length > 0) return false;
    if (modelRestricted) {
      // Unknown secret → the model policy cannot be proven: fail closed.
      if (!keySecret) return false;
      try {
        if (!(await isAllowed(keySecret, model))) return false;
      } catch {
        return false;
      }
    }
    if (allowedConnections) {
      // A scoped connection must be proven usable; an indeterminate store is not proof.
      return (await checkCreds(model, { allowedConnectionIds: allowedConnections })) === true;
    }
    return checkCreds(model);
  };

  return {
    apiKeyId,
    cacheScope: `${apiKeyId}:${JSON.stringify([
      allowedConnections,
      allowedQuotas,
      apiKeyInfo.modelAccessMode ?? null,
      stringList(apiKeyInfo.allowedModels),
      stringList(apiKeyInfo.blockedModels),
      apiKeyInfo.disableNonPublicModels === true,
    ])}`,
    hasUsableCredentials,
  };
}

/** Both checks must hold; `null` (indeterminate) from either side stays indeterminate. */
export function combineCredentialChecks(
  base: (model: string) => Promise<boolean | null>,
  scope: VisionBridgeKeyScope | null
): (model: string) => Promise<boolean | null> {
  if (!scope) return base;
  return async (model) => {
    const scoped = await scope.hasUsableCredentials(model);
    if (scoped === false) return false;
    const usable = await base(model);
    if (usable === false) return false;
    return scoped === true && usable === true ? true : null;
  };
}

/**
 * Credential check a bridge uses to pick a model on behalf of the caller key:
 * the key scope's check, combined with an injected base check when one is
 * given. Without a scope the base check is returned unchanged.
 */
export function scopedCredentialCheck(
  base: ((model: string) => Promise<boolean | null>) | undefined,
  scope: VisionBridgeKeyScope | null
): ((model: string) => Promise<boolean | null>) | undefined {
  if (!scope) return base;
  return base ? combineCredentialChecks(base, scope) : scope.hasUsableCredentials;
}
