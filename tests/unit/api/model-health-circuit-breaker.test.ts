/**
 * Tests for model-health endpoint circuit breaker integration
 *
 * Validates that circuit breaker state is correctly reflected in model health classification.
 * This test suite verifies the fix for the bug where models showed as HEALTHY
 * even when provider circuit breaker was OPEN or DEGRADED.
 *
 * IMPORTANT: These tests now import and validate the ACTUAL PRODUCTION CODE
 * from src/app/api/monitoring/model-health/classifyModelState.ts
 */

import { describe, test } from "node:test";
import assert from "node:assert";
import {
  classifyModelState,
  type ModelHealthState,
} from "@/app/api/monitoring/model-health/classifyModelState";

describe("model-health circuit breaker integration", () => {
  describe("classifyModelState with circuit breaker states", () => {
    test("OPEN circuit breaker returns PROVIDER_DOWN", () => {
      const result = classifyModelState("HEALTHY", "OPEN", false);

      assert.strictEqual(result, "PROVIDER_DOWN", "OPEN breaker should classify as PROVIDER_DOWN");
    });

    test("DEGRADED circuit breaker returns DEGRADED", () => {
      const result = classifyModelState("HEALTHY", "DEGRADED", false);

      assert.strictEqual(result, "DEGRADED", "DEGRADED breaker should classify as DEGRADED");
    });

    test("CLOSED circuit breaker with healthy connection returns HEALTHY", () => {
      const result = classifyModelState("HEALTHY", "CLOSED", false);

      assert.strictEqual(
        result,
        "HEALTHY",
        "CLOSED breaker with healthy connection should be HEALTHY"
      );
    });

    test("HALF_OPEN circuit breaker returns HEALTHY (probe phase allows requests)", () => {
      const result = classifyModelState("HEALTHY", "HALF_OPEN", false);

      assert.strictEqual(result, "HEALTHY", "HALF_OPEN breaker should allow requests (HEALTHY)");
    });
  });

  describe("connection-level failures take precedence over circuit breaker", () => {
    test("RATE_LIMITED connection overrides CLOSED breaker", () => {
      const result = classifyModelState("RATE_LIMITED", "CLOSED", false);

      assert.strictEqual(result, "RATE_LIMITED", "Connection state should take precedence");
    });

    test("AUTH_FAILED connection overrides CLOSED breaker", () => {
      const result = classifyModelState("AUTH_FAILED", "CLOSED", false);

      assert.strictEqual(result, "AUTH_FAILED", "Connection auth failure should take precedence");
    });

    test("CONNECTION_BLOCKED overrides DEGRADED breaker", () => {
      const result = classifyModelState("CONNECTION_BLOCKED", "DEGRADED", false);

      assert.strictEqual(result, "CONNECTION_BLOCKED", "Connection block should take precedence");
    });

    test("RATE_LIMITED connection overrides OPEN breaker", () => {
      const result = classifyModelState("RATE_LIMITED", "OPEN", false);

      assert.strictEqual(
        result,
        "RATE_LIMITED",
        "Connection state should take precedence even over OPEN breaker"
      );
    });
  });

  describe("model lockout after connection and provider checks", () => {
    test("model lockout with CLOSED breaker returns MODEL_LOCKED", () => {
      const result = classifyModelState("HEALTHY", "CLOSED", true);

      assert.strictEqual(result, "MODEL_LOCKED", "Model lockout should be detected");
    });

    test("connection failure takes precedence over model lockout", () => {
      const result = classifyModelState("RATE_LIMITED", "CLOSED", true);

      assert.strictEqual(
        result,
        "RATE_LIMITED",
        "Connection state should take precedence over model lockout"
      );
    });

    test("provider OPEN breaker takes precedence over model lockout", () => {
      const result = classifyModelState("HEALTHY", "OPEN", true);

      assert.strictEqual(
        result,
        "PROVIDER_DOWN",
        "OPEN breaker should take precedence over model lockout"
      );
    });
  });

  describe("precedence order validation", () => {
    test("priority: connection > provider breaker > model lockout", () => {
      // Connection failure beats everything
      const connFailure = classifyModelState("AUTH_FAILED", "OPEN", true);
      assert.strictEqual(
        connFailure,
        "AUTH_FAILED",
        "Connection failure should be highest priority"
      );

      // Provider OPEN beats model lockout (with healthy connection)
      const providerOpen = classifyModelState("HEALTHY", "OPEN", true);
      assert.strictEqual(providerOpen, "PROVIDER_DOWN", "Provider OPEN should beat model lockout");

      // Provider DEGRADED beats model lockout (with healthy connection)
      const providerDegraded = classifyModelState("HEALTHY", "DEGRADED", true);
      assert.strictEqual(
        providerDegraded,
        "DEGRADED",
        "Provider DEGRADED should beat model lockout"
      );

      // Model lockout only shows when connection healthy and breaker CLOSED
      const modelLockout = classifyModelState("HEALTHY", "CLOSED", true);
      assert.strictEqual(
        modelLockout,
        "MODEL_LOCKED",
        "Model lockout should show when higher layers healthy"
      );
    });
  });

  describe("edge cases and state combinations", () => {
    test("multiple models with different breaker states", () => {
      // Different circuit breaker states
      const result1 = classifyModelState("HEALTHY", "CLOSED", false);
      const result2 = classifyModelState("HEALTHY", "DEGRADED", false);
      const result3 = classifyModelState("HEALTHY", "OPEN", false);

      assert.strictEqual(result1, "HEALTHY", "CLOSED should be HEALTHY");
      assert.strictEqual(result2, "DEGRADED", "Degraded provider should reflect in model health");
      assert.strictEqual(result3, "PROVIDER_DOWN", "Open provider should reflect in model health");
    });

    test("all failure states with CLOSED breaker", () => {
      const states: ModelHealthState[] = [
        "RATE_LIMITED",
        "AUTH_FAILED",
        "CONNECTION_BLOCKED",
        "PROVIDER_DOWN",
        "MODEL_LOCKED",
        "DEGRADED",
        "UNKNOWN",
      ];

      for (const state of states) {
        const result = classifyModelState(state, "CLOSED", false);
        assert.strictEqual(
          result,
          state,
          `Connection state ${state} should pass through with CLOSED breaker`
        );
      }
    });

    test("HEALTHY connection with all breaker states", () => {
      const openResult = classifyModelState("HEALTHY", "OPEN", false);
      assert.strictEqual(openResult, "PROVIDER_DOWN", "OPEN should show PROVIDER_DOWN");

      const degradedResult = classifyModelState("HEALTHY", "DEGRADED", false);
      assert.strictEqual(degradedResult, "DEGRADED", "DEGRADED should show DEGRADED");

      const closedResult = classifyModelState("HEALTHY", "CLOSED", false);
      assert.strictEqual(closedResult, "HEALTHY", "CLOSED should show HEALTHY");

      const halfOpenResult = classifyModelState("HEALTHY", "HALF_OPEN", false);
      assert.strictEqual(halfOpenResult, "HEALTHY", "HALF_OPEN should show HEALTHY");
    });
  });

  describe("regression prevention - original bug scenarios", () => {
    test("BUG FIX: OPEN breaker no longer shows as HEALTHY", () => {
      // This was the original bug: models showed HEALTHY even with OPEN breaker
      const result = classifyModelState("HEALTHY", "OPEN", false);

      assert.notStrictEqual(result, "HEALTHY", "OPEN breaker should NOT show as HEALTHY");
      assert.strictEqual(result, "PROVIDER_DOWN", "OPEN breaker should show as PROVIDER_DOWN");
    });

    test("BUG FIX: DEGRADED breaker no longer shows as HEALTHY", () => {
      // This was also part of the bug: DEGRADED breaker not reflected
      const result = classifyModelState("HEALTHY", "DEGRADED", false);

      assert.notStrictEqual(result, "HEALTHY", "DEGRADED breaker should NOT show as HEALTHY");
      assert.strictEqual(result, "DEGRADED", "DEGRADED breaker should show as DEGRADED");
    });

    test("REGRESSION: connection-level failures still work correctly", () => {
      // Ensure our fix didn't break existing connection-level classification
      const rateLimited = classifyModelState("RATE_LIMITED", "CLOSED", false);
      assert.strictEqual(rateLimited, "RATE_LIMITED", "RATE_LIMITED connection should still work");

      const authFailed = classifyModelState("AUTH_FAILED", "CLOSED", false);
      assert.strictEqual(authFailed, "AUTH_FAILED", "AUTH_FAILED connection should still work");

      const blocked = classifyModelState("CONNECTION_BLOCKED", "CLOSED", false);
      assert.strictEqual(blocked, "CONNECTION_BLOCKED", "CONNECTION_BLOCKED should still work");
    });

    test("REGRESSION: model lockout still works correctly", () => {
      const result = classifyModelState("HEALTHY", "CLOSED", true);
      assert.strictEqual(result, "MODEL_LOCKED", "Model lockout should still work after fix");
    });
  });
});
