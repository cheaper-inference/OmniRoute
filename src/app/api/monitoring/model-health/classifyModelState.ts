/**
 * Model health classification logic
 *
 * Shared module used by the model-health API endpoint and tests.
 * Classifies provider/model combinations into health states based on:
 * 1. Connection-level state (highest priority)
 * 2. Provider-level circuit breaker state
 * 3. Model-level lockout status
 */

export type ModelHealthState =
  | "HEALTHY"
  | "DEGRADED"
  | "RATE_LIMITED"
  | "AUTH_FAILED"
  | "PROVIDER_DOWN"
  | "CONNECTION_BLOCKED"
  | "MODEL_LOCKED"
  | "UNKNOWN";

export type CircuitBreakerState = "CLOSED" | "DEGRADED" | "OPEN" | "HALF_OPEN";

/**
 * Classify the health state of a specific model on a specific provider connection.
 *
 * Precedence order (highest to lowest):
 * 1. Connection-level failures (RATE_LIMITED, AUTH_FAILED, CONNECTION_BLOCKED)
 * 2. Provider-level circuit breaker (OPEN, DEGRADED)
 * 3. Model-level lockout (MODEL_LOCKED)
 *
 * @param connectionState - Current health state of the connection
 * @param circuitBreakerState - Current state of provider's circuit breaker
 * @param isModelLocked - Whether this specific model is locked on this connection
 * @returns The final health state for this model
 */
export function classifyModelState(
  connectionState: ModelHealthState,
  circuitBreakerState: CircuitBreakerState,
  isModelLocked: boolean
): ModelHealthState {
  // Connection-level blocks take precedence over provider-level breaker
  if (connectionState !== "HEALTHY") {
    return connectionState;
  }

  // Provider-level circuit breaker state
  // OPEN = provider is down (recent failures exceeded threshold)
  if (circuitBreakerState === "OPEN") {
    return "PROVIDER_DOWN";
  }

  // DEGRADED = elevated failure rate (early warning)
  if (circuitBreakerState === "DEGRADED") {
    return "DEGRADED";
  }

  // HALF_OPEN = recovering from failures (probe phase).
  // Deliberate passthrough: a half-open breaker still routes requests (the
  // scorer applies the reduced health factor and the router canExecute() gate
  // decides the probe budget), so the model is not DEGRADED/PROVIDER_DOWN here.
  // The provider-level `circuitBreakerState: "HALF_OPEN"` is surfaced separately
  // on the response so callers can see the recovery without hiding the models.
  // Pinned by tests/unit/api/model-health-circuit-breaker.test.ts.

  // Model-level lockout (after connection and provider checks)
  if (isModelLocked) {
    return "MODEL_LOCKED";
  }

  // CLOSED = healthy, no recent failures
  return "HEALTHY";
}
