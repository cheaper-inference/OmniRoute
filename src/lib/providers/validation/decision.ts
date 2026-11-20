import { resolveDecisionBackend } from "@omniroute/open-sse/config/decisionRegistry.ts";
import { discoverDecisionModels } from "@omniroute/open-sse/handlers/decisionDiscovery.ts";
import { fetchDecision } from "@/lib/providers/decisionFetch";

/** Zero-inference check; never send a chat probe to a decision server. */
export async function validateDecisionProvider(input: {
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
}) {
  try {
    const credentials = { apiKey: input.apiKey, providerSpecificData: input.providerSpecificData };
    const backend = resolveDecisionBackend(input.provider, credentials);
    const models = await discoverDecisionModels(
      backend,
      credentials,
      fetchDecision,
      AbortSignal.timeout(10_000)
    );
    return models.length > 0
      ? {
          valid: true,
          ...(backend.models
            ? { warning: "Operator-declared models; server reachability and inference unverified" }
            : {}),
        }
      : { valid: false, error: "No decision-capable models available" };
  } catch {
    return { valid: false, error: "Decision provider configuration or discovery failed" };
  }
}
