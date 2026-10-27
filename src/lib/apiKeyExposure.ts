import { isApiKeyRevealEnabledFlag } from "@/shared/utils/featureFlags";

const ENABLED_VALUES = new Set(["1", "true", "yes", "on"]);

export function isApiKeyRevealEnabled(): boolean {
  try {
    return isApiKeyRevealEnabledFlag();
  } catch {
    const raw = String(process.env.ALLOW_API_KEY_REVEAL || "")
      .trim()
      .toLowerCase();
    return ENABLED_VALUES.has(raw);
  }
}

// One mask implementation for the routes and the providerSpecificData response
// sanitizer (`src/lib/providers/requestDefaults.ts`, reachable from a client
// component, so it cannot import this DB-aware module). Lives in a pure leaf.
export { maskStoredApiKey } from "@/shared/utils/apiKeyMask";
