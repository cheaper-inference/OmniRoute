import { isModelAllowedForKey } from "@/lib/db/apiKeys";
import { checkResolvedModelPermission } from "./resolvedModelAccess";

/** Resolve application identity once; the engine only asks about concrete fallback targets. */
export async function resolveModelFallbackAuthorization(
  request: Request,
  hasApiKeyMetadata: boolean
): Promise<(model: string) => Promise<boolean>> {
  let apiKey: string | null;
  try {
    // Lazy: apiKeyPolicy drags apiAuth (`next/headers`) and the sse/services/auth init cycle
    // into every importer. This module is reached from open-sse (modelFamilyFallbackPolicy),
    // so a static import put all of that into the MCP server bundle, whose plain-Node import
    // then failed (#16810; guard: tests/unit/build/mcp-bundle-startup.test.ts).
    const { resolveEnforcedPolicyKey } = await import("./apiKeyPolicy");
    const enforced = await resolveEnforcedPolicyKey(request);
    if (enforced.selfLoopScope.rejection) return async () => false;
    apiKey = enforced.apiKey;
  } catch {
    return async () => false;
  }
  if (!apiKey && !hasApiKeyMetadata) return async () => true;
  return async (model) =>
    (await checkResolvedModelPermission(
      {
        hasApiKeyMetadata: true,
        apiKey,
        // A grant for the original model must not authorize a different fallback.
        requestedModel: model,
        resolvedModel: model,
      },
      isModelAllowedForKey
    )) === "allowed";
}
