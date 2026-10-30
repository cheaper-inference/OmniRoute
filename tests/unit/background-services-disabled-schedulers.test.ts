import test from "node:test";
import assert from "node:assert/strict";

test("isCredentialHealthCheckDisabled returns true when OMNIROUTE_DISABLE_BACKGROUND_SERVICES is set", async () => {
  const prevVal = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  try {
    process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
    const { initCredentialHealthCheck } =
      await import("../../src/lib/credentialHealth/scheduler.ts");
    const started = initCredentialHealthCheck();
    assert.equal(started, false, "Credential health check must be disabled");
  } finally {
    if (prevVal === undefined) {
      delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
    } else {
      process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = prevVal;
    }
  }
});

test("startCleanupScheduler respects OMNIROUTE_DISABLE_BACKGROUND_SERVICES", async () => {
  const prevVal = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  try {
    process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "1";
    const { startCleanupScheduler, stopCleanupScheduler } =
      await import("../../src/lib/db/cleanup.ts");
    // Should safely return without throwing or starting periodic timer
    startCleanupScheduler();
    stopCleanupScheduler();
  } finally {
    if (prevVal === undefined) {
      delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
    } else {
      process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = prevVal;
    }
  }
});

test("initVacuumScheduler respects OMNIROUTE_DISABLE_BACKGROUND_SERVICES", async () => {
  const prevVal = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  try {
    process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "yes";
    const { initVacuumScheduler, stop: stopVacuumScheduler } =
      await import("../../src/lib/db/vacuumScheduler.ts");
    const state = initVacuumScheduler();
    assert.ok(state, "Vacuum scheduler returns state without starting timer");
    stopVacuumScheduler();
  } finally {
    if (prevVal === undefined) {
      delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
    } else {
      process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = prevVal;
    }
  }
});
