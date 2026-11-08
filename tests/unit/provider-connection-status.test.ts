import test from "node:test";
import assert from "node:assert/strict";

const {
  getEffectiveProviderConnectionStatus,
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} = await import("../../src/shared/utils/providerConnectionStatus.ts");

test("an active connection with unknown status is configured but not errored", () => {
  const connection = { isActive: true, testStatus: "unknown" };
  assert.equal(isProviderConnectionConnected(connection), true);
  assert.equal(isProviderConnectionErrored(connection), false);
});

test("disabled connections are excluded from connected and error counts", () => {
  assert.equal(isProviderConnectionConnected({ isActive: false, testStatus: "success" }), false);
  assert.equal(isProviderConnectionErrored({ isActive: false, testStatus: "error" }), false);
});

test("expired cooldown restores unavailable connection to active", () => {
  const now = Date.parse("2026-07-17T00:00:00.000Z");
  const connection = {
    isActive: true,
    testStatus: "unavailable",
    rateLimitedUntil: "2026-07-16T23:59:59.000Z",
  };
  assert.equal(getEffectiveProviderConnectionStatus(connection, now), "active");
  assert.equal(isProviderConnectionConnected(connection, now), true);
  assert.equal(isProviderConnectionErrored(connection, now), false);
});

test("active cooldown remains unavailable", () => {
  const now = Date.parse("2026-07-17T00:00:00.000Z");
  const connection = {
    isActive: true,
    testStatus: "unavailable",
    rateLimitedUntil: "2026-07-17T00:00:01.000Z",
  };
  assert.equal(getEffectiveProviderConnectionStatus(connection, now), "unavailable");
  assert.equal(isProviderConnectionConnected(connection, now), false);
  assert.equal(isProviderConnectionErrored(connection, now), true);
});

test("unavailable without a live cooldown is restored to active", () => {
  const connection = { isActive: true, testStatus: "unavailable" };
  assert.equal(getEffectiveProviderConnectionStatus(connection), "active");
  assert.equal(isProviderConnectionConnected(connection), true);
  assert.equal(isProviderConnectionErrored(connection), false);
});

test("a derived prefix collision is visible without changing persisted credential health", () => {
  const connection = {
    isActive: true,
    testStatus: "active",
    prefixShadowed: { code: "prefix_shadowed" as const, message: "workbuddy routes to builtin" },
  };
  assert.equal(getEffectiveProviderConnectionStatus(connection), "prefix_shadowed");
  assert.equal(isProviderConnectionConnected(connection), false);
  assert.equal(isProviderConnectionErrored(connection), true);
  assert.equal(connection.testStatus, "active");
  assert.equal(
    getEffectiveProviderConnectionStatus({ ...connection, prefixShadowed: null }),
    "active"
  );
});

test("the connection row shows a routing warning instead of a healthy badge", async () => {
  const { getStatusPresentation } =
    await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowStatus.ts");
  const connection = {
    isActive: true,
    testStatus: "active",
    prefixShadowed: { code: "prefix_shadowed" as const, message: "Prefix routes to the builtin" },
  };
  const presentation = getStatusPresentation(connection, "active", false, (key) => key);
  assert.equal(presentation.statusVariant, "warning");
  assert.equal(presentation.errorType, "prefix_shadowed");
  // KEA-7886: the warning uses the UI-kit token, never a raw palette class.
  assert.equal(presentation.errorTextClass, "text-warning");
  assert.equal(connection.testStatus, "active");
  const restored = getStatusPresentation(
    { ...connection, prefixShadowed: null },
    "active",
    false,
    (key) => key
  );
  assert.equal(restored.statusVariant, "success");
});
