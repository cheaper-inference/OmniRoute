/**
 * `systemone` decider: TypeSafe System One through the base client (#15278,
 * typesafe/systemOne.ts), whose transport is the guarded decision transport.
 */
import {
  evaluateSystemOneChoice,
  TYPESAFE_PROVIDER_ID,
  type SystemOneChoiceResult,
  type EvaluateSystemOneChoiceOptions,
  type SystemOneChoiceUnavailable,
} from "../typesafe/systemOne.ts";
import { resolveDecisionApiKey } from "./credentials.ts";
import {
  decisionFailure,
  toLoggableModelName,
  type Decider,
  type DecisionChoiceResult,
} from "./types.ts";

export interface SystemOneDeciderOptions {
  /** TypeSafe decision model; the client default (`jev-latest`) when unset. */
  model?: string;
  connectionId?: string;
  timeoutMs: number;
  apiKeyAllowedConnections?: string[] | null;
  resolveApiKey?: () => Promise<string | null>;
  evaluate?: (options: EvaluateSystemOneChoiceOptions) => Promise<SystemOneChoiceResult>;
  now?: () => number;
}

export function createSystemOneDecider(options: SystemOneDeciderOptions): Decider {
  const evaluate = options.evaluate ?? evaluateSystemOneChoice;
  const now = options.now ?? Date.now;
  const resolveApiKey =
    options.resolveApiKey ??
    (() =>
      resolveDecisionApiKey({
        provider: TYPESAFE_PROVIDER_ID,
        connectionId: options.connectionId,
        apiKeyAllowedConnections: options.apiKeyAllowedConnections,
      }));

  return async (request): Promise<DecisionChoiceResult> => {
    const apiKey = await resolveApiKey();
    if (!apiKey) return decisionFailure("missing_credential");
    const startedAt = now();
    const result = await evaluate({
      apiKey,
      state: request.state,
      criteria: request.options,
      instructions: request.instructions,
      model: options.model,
      timeoutMs: options.timeoutMs,
      signal: request.signal,
    });
    if (result.ok) {
      return {
        ok: true,
        choice: result.choice,
        confidence: result.confidence,
        probabilities: result.probabilities,
        ...(toLoggableModelName(result.model) && {
          backendModel: toLoggableModelName(result.model),
        }),
        latencyMs: Math.max(0, now() - startedAt),
      };
    }
    // `strict: false` does not narrow the `ok` union, so name the unavailable variant.
    const failure = result as SystemOneChoiceUnavailable;
    if (failure.reason === "missing_api_key") return decisionFailure("missing_credential");
    if (failure.reason === "empty_criteria") return decisionFailure("not_configured");
    if (failure.reason === "http_error") {
      return decisionFailure("http_error", { status: failure.status });
    }
    return decisionFailure(failure.reason);
  };
}
