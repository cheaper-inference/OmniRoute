import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import {
  registerHook,
  emitHook,
  emitHookBlocking,
  resetHooks,
} from "../../src/lib/plugins/hooks.ts";

describe("hooks rate limiting", () => {
  beforeEach(() => resetHooks());

  it("allows hooks up to rate limit", async () => {
    let callCount = 0;
    registerHook("onRequest", "test-plugin", async () => {
      callCount++;
    });
    for (let i = 0; i < 10; i++) {
      await emitHook("onRequest", {});
    }
    assert.strictEqual(callCount, 10);
  });

  it("blocks hooks after rate limit exceeded", async () => {
    let callCount = 0;
    registerHook("onRequest", "rate-plugin", async () => {
      callCount++;
    });
    // Fire 110 calls rapidly — 100 should pass, 10 should be blocked
    for (let i = 0; i < 110; i++) {
      await emitHook("onRequest", {});
    }
    assert.ok(callCount <= 100, `Expected <= 100 calls, got ${callCount}`);
  });

  it("rate limit resets after window", async () => {
    let callCount = 0;
    registerHook("onRequest", "window-plugin", async () => {
      callCount++;
    });
    for (let i = 0; i < 100; i++) await emitHook("onRequest", {});
    // Wait for window reset
    await new Promise((r) => setTimeout(r, 1100));
    await emitHook("onRequest", {});
    assert.strictEqual(callCount, 101);
  });

  // A blocking hook is a decision on the request, so skipping it above the limit would let
  // the request through. The limit applies to fire-and-forget hooks only.

  it("emitHookBlocking keeps denying above the rate limit", async () => {
    registerHook("onRequest", "deny-all-plugin", async () => ({ blocked: true }));
    for (let i = 0; i < 150; i++) {
      const result = await emitHookBlocking("onRequest", {});
      assert.strictEqual(result.blocked, true, `call ${i + 1} was let through`);
    }
  });

  it("emitHookBlocking keeps transforming the body above the rate limit", async () => {
    registerHook("onRequest", "redact-plugin", async () => ({ body: "redacted" }));
    for (let i = 0; i < 150; i++) {
      const result = await emitHookBlocking("onRequest", { body: "original" });
      assert.strictEqual(result.body, "redacted", `call ${i + 1} kept the original body`);
    }
  });

  it("blocking calls do not use up the budget of fire-and-forget hooks", async () => {
    let fired = 0;
    registerHook("onRequest", "shared-plugin", async () => {
      fired++;
    });
    for (let i = 0; i < 150; i++) await emitHookBlocking("onRequest", {});
    fired = 0;
    await emitHook("onRequest", {});
    assert.strictEqual(fired, 1);
  });

  // ── IMPORTANT-4: resetHooks() clears rateLimitMap ──

  it("resetHooks clears rate-limit state so counts start fresh", async () => {
    let callCount = 0;
    registerHook("onRequest", "reset-plugin", async () => {
      callCount++;
    });
    // Exhaust the window
    for (let i = 0; i < 101; i++) await emitHook("onRequest", {});
    const countAfterExhaustion = callCount;
    assert.ok(countAfterExhaustion <= 100, "sanity: should have been rate-limited");

    // resetHooks() must clear the rate-limit state along with hooks
    resetHooks();
    callCount = 0;

    // Re-register and fire — should work from scratch (window cleared)
    registerHook("onRequest", "reset-plugin", async () => {
      callCount++;
    });
    for (let i = 0; i < 10; i++) await emitHook("onRequest", {});
    assert.strictEqual(callCount, 10, "after resetHooks, rate-limit window should be cleared");
  });
});
