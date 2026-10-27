import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { resolvePolicyApiKey } from "@/shared/utils/apiKeyPolicy";

type ForcedModelLogger = { warn: (tag: string, msg: string) => void };

/**
 * Read the per-key enforced routing target (`forcedModel`) of the key the client
 * presented. Returns null when there is no key, the key is unknown, or it is not
 * pinned.
 *
 * Only the PRESENTED key is consulted. An internal self-loop sub-request (fusion
 * panel member, vision describe) presents the self-loop bearer, whose synthetic
 * metadata has no pin, so it keeps its own target instead of being collapsed onto
 * the parent key's pin; the parent key's policy is still enforced on it by
 * `enforceApiKeyPolicy`.
 *
 * The pin is a rewrite, not a grant: callers pass the result to
 * `resolveRoutingModel` and the rewritten model then goes through
 * `enforceApiKeyPolicy` (allowedModels, allowedCombos, budget) like any other.
 * A metadata lookup failure resolves to null here; the policy check that follows
 * re-reads the metadata and fails closed on the same error.
 */
export async function resolveApiKeyForcedModel(
  request: Request,
  log?: ForcedModelLogger
): Promise<string | null> {
  const apiKey = await resolvePolicyApiKey(request);
  if (!apiKey) return null;
  try {
    const metadata = await getApiKeyMetadata(apiKey);
    return metadata?.forcedModel || null;
  } catch (error) {
    log?.warn(
      "ROUTING",
      `API key forced-model lookup failed; the policy check will decide: ${String(error)}`
    );
    return null;
  }
}
