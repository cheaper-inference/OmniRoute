/**
 * Resolved-model API-key policy for handleSingleModelChat (#12886 / #12899).
 *
 * Extracted from chat.ts so the frozen handler does not grow. Entry admission
 * authorizes the requested model string; aliases, combo targets and
 * connection/reasoning overrides resolve to a concrete model afterwards, so the
 * same key must admit that concrete model too before any upstream dispatch.
 */
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { isModelAllowedForKey, isModelBlockedByPatterns } from "@/lib/db/apiKeys";
import { resolveEnforcedPolicyKey } from "@/shared/utils/apiKeyPolicy";
import { getProviderSearchPool } from "@omniroute/open-sse/services/providerConnectionPool.ts";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getProviderById, resolveProviderId } from "@/shared/constants/providers";
import { withHiddenModelGate } from "./hiddenModelGate.ts";
import {
  checkResolvedModelPermission,
  markLocalModelPolicyResponse,
} from "@/shared/utils/resolvedModelAccess";
import {
  isExplicitlyAllowedComboForKey,
  type ComboTargetKeyPolicyInfo,
} from "./comboTargetKeyPolicy.ts";

/** Request identity admitted at entry: the combo/alias context, else the model string. */
export function resolveAuthorizationContextModel(
  contextModel: string | null | undefined,
  modelStr: string
): string {
  return typeof contextModel === "string" && contextModel.trim().length > 0
    ? contextModel.trim()
    : modelStr;
}

/**
 * An explicitly allowed stored combo authorizes its own target past the
 * allow-list (#14197); blockedModels still applies to it. Any other model a
 * connection/reasoning override swaps in gets the full check.
 */
export function comboGrantedTargetSet(
  comboGrantsTargets: boolean | undefined,
  provider: string,
  model: string,
  modelStr: string
): Set<string> | null {
  if (comboGrantsTargets !== true) return null;
  return new Set([
    `${provider}/${model}`,
    modelStr.includes("/") ? modelStr : `${provider}/${modelStr}`,
  ]);
}

/**
 * Concrete targets after connection routing. requestBody.model is only a new
 * target when an override rewrote it; the client's own model string (e.g. the
 * combo name) was already admitted at entry.
 */
export function effectivePolicyTargets(
  provider: string,
  effectiveModel: string,
  requestBodyModel: unknown,
  incomingModel: unknown
): Set<string> {
  const targets = new Set([`${provider}/${effectiveModel}`]);
  if (
    typeof requestBodyModel === "string" &&
    requestBodyModel.length > 0 &&
    requestBodyModel !== incomingModel
  ) {
    targets.add(
      requestBodyModel.includes("/") ? requestBodyModel : `${provider}/${requestBodyModel}`
    );
  }
  return targets;
}

/**
 * A granted target and a provider-node blockedModels entry can name the same
 * model in two forms: node prefix (`mock/x`, how an alias target reaches the
 * gate) and node id (`${node.id}/x`). Check both. The prefix expands to the
 * provider ids dispatch searches for it (built-in providers never pick up a
 * node that reuses their name); a node id maps back to its own prefix unless
 * that prefix names a built-in provider.
 */
async function blockedModelForms(resolvedModel: string): Promise<string[]> {
  const forms = new Set([resolvedModel]);
  const slash = resolvedModel.indexOf("/");
  if (slash <= 0 || slash === resolvedModel.length - 1) return [...forms];
  const provider = resolvedModel.slice(0, slash);
  const model = resolvedModel.slice(slash + 1);
  for (const id of await getProviderSearchPool(provider)) {
    if (id) forms.add(`${id}/${model}`);
  }
  for (const node of await getCachedProviderNodes()) {
    const prefix = typeof node?.prefix === "string" ? node.prefix.trim() : "";
    if (node?.id === provider && prefix && !getProviderById(resolveProviderId(prefix))) {
      forms.add(`${prefix}/${model}`);
    }
  }
  return [...forms];
}

/** A combo-granted target skips the allow-list, never the key's blockedModels. */
async function grantedTargetPermission(
  blockedModels: string[] | null | undefined,
  resolvedModel: string
): Promise<"allowed" | "denied" | "unavailable"> {
  try {
    if (!blockedModels?.length) return "allowed";
    for (const form of await blockedModelForms(resolvedModel)) {
      if (await isModelBlockedByPatterns(blockedModels, form)) return "denied";
    }
    return "allowed";
  } catch {
    return "unavailable";
  }
}

/** Returns a marked local policy rejection for the first target the key does not admit. */
export async function rejectUnauthorizedResolvedModels(opts: {
  hasApiKeyMetadata: boolean;
  apiKey: string | null | undefined;
  requestedModel: string;
  resolvedModels: Iterable<string>;
  grantedTargets?: Set<string> | null;
  blockedModels?: string[] | null;
}): Promise<Response | null> {
  for (const resolvedModel of opts.resolvedModels) {
    const permission = opts.grantedTargets?.has(resolvedModel)
      ? await grantedTargetPermission(opts.blockedModels, resolvedModel)
      : await checkResolvedModelPermission(
          {
            hasApiKeyMetadata: opts.hasApiKeyMetadata,
            apiKey: opts.apiKey,
            requestedModel: opts.requestedModel,
            resolvedModel,
          },
          isModelAllowedForKey
        );
    if (permission === "allowed") continue;
    return markLocalModelPolicyResponse(
      errorResponse(
        permission === "denied" ? HTTP_STATUS.FORBIDDEN : HTTP_STATUS.SERVICE_UNAVAILABLE,
        permission === "denied"
          ? "Resolved model is not allowed for this API key"
          : "API key model policy unavailable"
      )
    );
  }
  return null;
}

/** Runtime options a combo dispatch passes so its targets keep the admitted context. */
export function comboAuthorizationOptions(
  apiKeyInfo: ComboTargetKeyPolicyInfo | null | undefined,
  requestedModelStr: string
): { authorizationContextModel: string; comboGrantsTargets: boolean } {
  return {
    // The preflight admits the originally requested combo or alias. Targets of
    // a non-granted combo get the full per-target check; granted ones are
    // still checked against blockedModels.
    authorizationContextModel: requestedModelStr,
    // #14197: a stored combo named in allowedCombos grants its own targets.
    comboGrantsTargets: isExplicitlyAllowedComboForKey(apiKeyInfo, requestedModelStr),
  };
}

/**
 * #18471: the key apiKeyInfo was loaded from, resolved the way enforceApiKeyPolicy
 * resolves it (validated credential, bearer, bare header, dashboard playground
 * key id, self-loop scope). Re-reading only the client headers missed the
 * playground key id, so every selected non-default key failed closed.
 */
async function resolveGateApiKey(request: Request | null | undefined): Promise<string | null> {
  try {
    if (!request?.headers) return null;
    const enforced = await resolveEnforcedPolicyKey(request);
    // A scope that no longer resolves must not fall back to the self-loop bearer.
    return enforced.selfLoopScope.rejection ? null : enforced.apiKey;
  } catch {
    return null;
  }
}

function blockedModelsOf(apiKeyInfo: unknown): string[] | null {
  const blocked = (apiKeyInfo as { blockedModels?: unknown } | null | undefined)?.blockedModels;
  return Array.isArray(blocked) ? blocked.filter((p): p is string => typeof p === "string") : null;
}

/** Per-request gate: returns a rejection for the first resolved model the key does not admit. */
export function createResolvedModelGate(opts: {
  apiKeyInfo: unknown;
  request: Request | null | undefined;
  contextModel: string | null | undefined;
  comboGrantsTargets: boolean | undefined;
  provider: string;
  model: string;
  modelStr: string;
}): (resolvedModels: Iterable<string>) => Promise<Response | null> {
  const hasApiKeyMetadata = Boolean(opts.apiKeyInfo);
  let apiKey: Promise<string | null> | undefined;
  const base = {
    hasApiKeyMetadata,
    requestedModel: resolveAuthorizationContextModel(opts.contextModel, opts.modelStr),
    grantedTargets: comboGrantedTargetSet(
      opts.comboGrantsTargets,
      opts.provider,
      opts.model,
      opts.modelStr
    ),
    blockedModels: blockedModelsOf(opts.apiKeyInfo),
  };
  return async (resolvedModels) => {
    if (hasApiKeyMetadata) apiKey ??= resolveGateApiKey(opts.request);
    return rejectUnauthorizedResolvedModels({ ...base, apiKey: await apiKey, resolvedModels });
  };
}

/**
 * #12666: the dispatch gate chat.ts uses — key/combo authorization first (its rejection keeps
 * precedence), then hidden-model enforcement on the same resolved targets. Composed here so the
 * frozen chat.ts does not grow (file-size gate).
 */
export function createVisibleResolvedModelGate(
  opts: Parameters<typeof createResolvedModelGate>[0]
): (resolvedModels: Iterable<string>) => Promise<Response | null> {
  return withHiddenModelGate(createResolvedModelGate(opts), opts.modelStr);
}
