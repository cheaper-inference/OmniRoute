/** Shared TypeSafe System One ask port for the Jev model and runtime-unit paths (opt-in). */

import { isRegisteredFeatureFlagEnabled } from "../../utils/registeredFeatureFlag.ts";
import {
  evaluateSystemOneChoice,
  TYPESAFE_PROVIDER_ID,
  type SystemOneChoiceUnavailable,
} from "../typesafe/systemOne.ts";
import type { ComboLogger } from "./types.ts";
import type { JevAsk } from "./jevOrdering.ts";
import { getProviderCredentials } from "./autoStrategy.ts";

export function createJevAsk(args: {
  apiKeyAllowedConnections?: string[] | null;
  log: ComboLogger;
  signal?: AbortSignal | null;
}): JevAsk {
  return async ({ state, criteria }) => {
    // TypeSafe is a paid third-party call: it needs COMBO_JEV_STRATEGY_ENABLED, never just a
    // stored key. Off → no credential read, no request; the combo keeps the operator's order.
    if (!isRegisteredFeatureFlagEnabled("COMBO_JEV_STRATEGY_ENABLED")) {
      args.log.info("COMBO", "[jev] COMBO_JEV_STRATEGY_ENABLED is off; keeping preference order");
      return { ok: false, reason: "unavailable" };
    }
    try {
      const credentials = await getProviderCredentials(
        TYPESAFE_PROVIDER_ID,
        null,
        args.apiKeyAllowedConnections ?? null
      );
      const apiKey =
        credentials && typeof (credentials as { apiKey?: unknown }).apiKey === "string"
          ? (credentials as { apiKey: string }).apiKey
          : null;
      const result = await evaluateSystemOneChoice({
        apiKey,
        state,
        criteria,
        signal: args.signal,
      });
      if (result.ok) {
        return {
          ok: true,
          answer: {
            choice: result.choice,
            probabilities: result.probabilities,
            confidence: result.confidence,
          },
        };
      }
      // `strict: false` does not narrow the `ok` union, so name the unavailable variant.
      const unavailable = result as SystemOneChoiceUnavailable;
      if (unavailable.reason === "missing_api_key") {
        return { ok: false, reason: "missing_api_key" };
      }
      args.log.info("COMBO", `[jev] System One unavailable: ${unavailable.reason}`);
      return { ok: false, reason: "unavailable" };
    } catch (error) {
      args.log.warn(
        "COMBO",
        `[jev] System One call failed (non-fatal); falling open to user order: ${error instanceof Error ? error.name : "unknown error"}`
      );
      return { ok: false, reason: "unavailable" };
    }
  };
}
