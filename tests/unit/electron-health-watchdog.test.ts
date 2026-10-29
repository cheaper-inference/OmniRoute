import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

const require = createRequire(import.meta.url);
const { probeServer } = require("../../electron/lib/serverReadiness");
const {
  DEFAULT_FAILURE_THRESHOLD,
  shouldRestartHealthCheck,
} = require("../../electron/lib/healthWatchdog");

describe("Electron health watchdog", () => {
  it("treats a successful response as alive", async () => {
    assert.equal(
      await probeServer("http://localhost/api/health/ping", {
        fetchFn: async () => ({ ok: true }),
        requestTimeoutMs: 10,
      }),
      true
    );
  });

  it("treats an error status as dead", async () => {
    assert.equal(
      await probeServer("http://localhost/api/health/ping", {
        fetchFn: async () => ({ ok: false, status: 503 }),
        requestTimeoutMs: 10,
      }),
      false
    );
  });

  it("treats a refused connection as dead", async () => {
    assert.equal(
      await probeServer("http://localhost/api/health/ping", {
        fetchFn: async () => {
          throw new Error("ECONNREFUSED");
        },
        requestTimeoutMs: 10,
      }),
      false
    );
  });

  it("bounds a stalled request by the probe timeout", async () => {
    const startedAt = Date.now();
    const alive = await probeServer("http://localhost/api/health/ping", {
      fetchFn: () => new Promise(() => {}),
      requestTimeoutMs: 20,
    });
    const elapsedMs = Date.now() - startedAt;

    assert.equal(alive, false);
    assert.ok(elapsedMs < 200, `stalled health probe took ${elapsedMs}ms`);
  });

  it("requires consecutive failures before restarting", () => {
    const below = shouldRestartHealthCheck({ consecutiveFailures: 1, lastRestartAt: 0 }, { now: 1e9 });
    assert.equal(below, false);
    assert.equal(DEFAULT_FAILURE_THRESHOLD, 2);

    const atThreshold = shouldRestartHealthCheck(
      { consecutiveFailures: 2, lastRestartAt: 0 },
      { now: 1e9 }
    );
    assert.equal(atThreshold, true);
  });

  it("honors the restart cooldown after a recent restart", () => {
    const now = 1e9;
    assert.equal(
      shouldRestartHealthCheck({ consecutiveFailures: 5, lastRestartAt: now - 5000 }, { now }),
      false
    );
    assert.equal(
      shouldRestartHealthCheck({ consecutiveFailures: 5, lastRestartAt: now - 120000 }, { now }),
      true
    );
  });
});