/**
 * MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED (#16929) — single decision point for every
 * client-visible effect of endpoint capability tags: the 400 on /v1 routes, hiding
 * unrunnable models from /v1/models and the dashboard model-test 422.
 */
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

export const MODEL_ENDPOINT_CAPABILITY_GATE_FLAG = "MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED";

/** Fail closed: any resolution error keeps the pre-#16929 (ungated) behavior. */
export function isModelEndpointCapabilityGateEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(MODEL_ENDPOINT_CAPABILITY_GATE_FLAG);
  } catch {
    return false;
  }
}
