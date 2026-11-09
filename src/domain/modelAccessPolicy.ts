import { hasClaudeCodeWildcardPermission, modelPatternMatches } from "./modelPermissions";

export interface ModelAccessPolicy {
  id?: string;
  modelAccessMode: "all" | "restricted";
  allowedModels?: string[];
  blockedModels?: string[];
  disableNonPublicModels?: boolean;
}

export interface ModelAccessTarget {
  modelId: string;
  resolvedModelId?: string | null;
}

/** Read ports are lazy: a deny must not trigger later catalog/group lookups. */
export interface ModelAccessLookups {
  getCandidates(modelId: string): Promise<string[]>;
  resolveAlias(modelId: string): string;
  getPublishedTarget(modelId: string): Promise<{ providerId: string; modelId: string } | null>;
  findPublishedModel(
    providerOrAlias: string,
    modelId: string
  ): Promise<{ providerId: string; publishedModelId: string } | null>;
  isPublishedModelHidden(providerId: string, alias: string, modelId: string): boolean;
  checkGroupAccess(keyId: string, modelId: string, provider?: string): { allowed: boolean };
  isDeniedUnderCanonicalProvider(
    keyId: string,
    provider: string | undefined,
    modelId: string
  ): Promise<boolean>;
}

export type ModelAccessDecision =
  | { allowed: false; reason: "blocked" | "unpublished" | "hidden" }
  | { allowed: boolean; reason: "permissions" };

/**
 * Decide model access independently of key storage and permission caching.
 * Eligibility denials precede the final per-key/group permission decision.
 */
export async function evaluateModelAccess(
  policy: ModelAccessPolicy,
  { modelId, resolvedModelId }: ModelAccessTarget,
  lookups: ModelAccessLookups
): Promise<ModelAccessDecision> {
  const { allowedModels, blockedModels, disableNonPublicModels, modelAccessMode } = policy;
  // Allow rules retain the requested alias; deny rules also see the resolved target.
  const candidates = Array.from(
    new Set([
      ...(await lookups.getCandidates(modelId)),
      ...(resolvedModelId ? await lookups.getCandidates(resolvedModelId) : []),
    ])
  );

  if (blockedModels?.some((pattern) => modelPatternMatches(pattern, candidates))) {
    return { allowed: false, reason: "blocked" };
  }

  if (disableNonPublicModels) {
    const effectiveModelId = resolvedModelId || lookups.resolveAlias(modelId) || modelId;
    const publicationCandidates = resolvedModelId
      ? await lookups.getCandidates(resolvedModelId)
      : candidates;

    if (!hasClaudeCodeWildcardPermission(allowedModels, publicationCandidates)) {
      const lookupTarget = await lookups.getPublishedTarget(effectiveModelId);
      const providerOrAlias = lookupTarget?.providerId || effectiveModelId.split("/")[0];
      const shortModelId = lookupTarget?.modelId || effectiveModelId.split("/").slice(1).join("/");
      if (!providerOrAlias || !shortModelId) return { allowed: false, reason: "unpublished" };

      const published = await lookups.findPublishedModel(providerOrAlias, shortModelId);
      if (!published) return { allowed: false, reason: "unpublished" };
      const { providerId, publishedModelId } = published;

      // Effort variants dispatch to a base model whose deny rules still apply.
      if (publishedModelId !== shortModelId && blockedModels?.length) {
        const baseCandidates = await lookups.getCandidates(`${providerId}/${publishedModelId}`);
        if (blockedModels.some((pattern) => modelPatternMatches(pattern, baseCandidates))) {
          return { allowed: false, reason: "blocked" };
        }
      }

      if (lookups.isPublishedModelHidden(providerId, providerOrAlias, publishedModelId)) {
        return { allowed: false, reason: "hidden" };
      }
    }
  }

  // Restricted + [] is deny-all. Groups can narrow, never expand, this grant.
  let allowed =
    !allowedModels || allowedModels.length === 0
      ? modelAccessMode !== "restricted"
      : allowedModels.some((pattern) => modelPatternMatches(pattern, candidates));

  if (policy.id) {
    for (const groupModelId of new Set([modelId, ...(resolvedModelId ? [resolvedModelId] : [])])) {
      const hasProvider = groupModelId.includes("/");
      const provider = hasProvider ? groupModelId.split("/")[0] : undefined;
      const target = hasProvider ? groupModelId.split("/").slice(1).join("/") : groupModelId;
      const targetOk = lookups.checkGroupAccess(policy.id, target, provider).allowed;
      const fullOk = lookups.checkGroupAccess(policy.id, groupModelId, provider).allowed;
      if (!targetOk || !fullOk) allowed = false;

      if (allowed && (await lookups.isDeniedUnderCanonicalProvider(policy.id, provider, target))) {
        allowed = false;
      }
    }
  }

  return { allowed, reason: "permissions" };
}
