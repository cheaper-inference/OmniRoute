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
  /**
   * `deniedBy` is the matching group deny rule, `null` when no rule denied and
   * `allowed: false` only means no allow matched. A port that omits `deniedBy`
   * cannot tell the two apart, so its `allowed: false` is read as a deny.
   */
  checkGroupAccess(keyId: string, modelId: string, provider?: string): GroupAccessResult;
  /**
   * Public routing prefix of a custom provider node id (`openai-compatible-chat-<uuid>` →
   * `ev`), or null when the id is not a node or its prefix names a built-in provider.
   * Optional: without it a node-id resolution is matched only against its own forms.
   */
  getProviderNodePrefix?(providerId: string): string | null;
  isDeniedUnderCanonicalProvider(
    keyId: string,
    provider: string | undefined,
    modelId: string
  ): Promise<boolean>;
}

export interface GroupAccessResult {
  allowed: boolean;
  deniedBy?: object | null;
}

export type ModelAccessDecision =
  | { allowed: false; reason: "blocked" | "unpublished" | "hidden" }
  | { allowed: boolean; reason: "permissions" };

/** A port that reports no `deniedBy` cannot separate a deny from a missing allow: fail closed. */
function isGroupDenied(result: GroupAccessResult): boolean {
  return result.deniedBy === undefined ? !result.allowed : result.deniedBy !== null;
}

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

  // Group rules see each id in its short (`model` scoped to `provider`) and full
  // (`provider/model`) form: an allow on either form admits the id, a deny on any form
  // blocks. The resolved target still needs an allow of its own (#13052): an allowed
  // alias cannot hide a target the group never granted. A custom provider node resolves
  // to `<node-id>/<model>`, an internal id operators never see, so for that target the
  // node's public `<prefix>/<model>` forms count as well, for allow and deny (#20972).
  if (policy.id) {
    for (const groupModelId of new Set([modelId, ...(resolvedModelId ? [resolvedModelId] : [])])) {
      const hasProvider = groupModelId.includes("/");
      const provider = hasProvider ? groupModelId.split("/")[0] : undefined;
      const target = hasProvider ? groupModelId.split("/").slice(1).join("/") : groupModelId;
      const forms = [
        lookups.checkGroupAccess(policy.id, target, provider),
        lookups.checkGroupAccess(policy.id, groupModelId, provider),
      ];
      const nodePrefix =
        groupModelId !== modelId && provider ? lookups.getProviderNodePrefix?.(provider) : null;
      if (nodePrefix) {
        forms.push(
          lookups.checkGroupAccess(policy.id, target, nodePrefix),
          lookups.checkGroupAccess(policy.id, `${nodePrefix}/${target}`, nodePrefix)
        );
      }
      if (forms.some(isGroupDenied) || !forms.some((form) => form.allowed)) allowed = false;

      if (allowed && (await lookups.isDeniedUnderCanonicalProvider(policy.id, provider, target))) {
        allowed = false;
      }
    }
  }

  return { allowed, reason: "permissions" };
}
