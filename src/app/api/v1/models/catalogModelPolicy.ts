import { hasNoRunnableEndpointAdapter } from "@/lib/providerModels/endpointAdapterAvailability";
import { isModelEndpointCapabilityGateEnabled } from "@/lib/providerModels/endpointCapabilityGateFlag";
import { getModelEndpointDecision } from "@omniroute/open-sse/services/modelEndpointPolicy";
import { isModelSelectable } from "@omniroute/open-sse/services/modelLifecycle";

type CatalogModelPolicyInput = {
  id: string;
  supportedEndpoints?: readonly string[];
  endpointCapabilitySource?: string;
};

export function isUnifiedChatSourceModelSelectable(
  provider: string,
  model: CatalogModelPolicyInput
): boolean {
  if (!isModelSelectable(provider, model.id)) return false;
  if (
    model.supportedEndpoints?.some(
      (endpoint) => endpoint === "decisions" || endpoint === "systemone"
    ) &&
    !model.supportedEndpoints.some((endpoint) => endpoint === "chat" || endpoint === "responses")
  )
    return true; // Typed decision rows are advertised as decisions, never chat.
  if (
    getModelEndpointDecision(provider, model.id, model.supportedEndpoints).reason ===
    "provider-policy"
  )
    return false;

  // #16929 (opt-in, MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED): a discovered tag is a
  // capability statement, not evidence of an executable provider handler. With the
  // flag on, known-unrunnable models are not advertised in /v1/models. Legacy and
  // defaulted tags preserve the existing fallback. Flag off = tip listing.
  if (
    model.supportedEndpoints?.length &&
    isModelEndpointCapabilityGateEnabled() &&
    hasNoRunnableEndpointAdapter(provider, model)
  ) {
    return false;
  }
  return true;
}
