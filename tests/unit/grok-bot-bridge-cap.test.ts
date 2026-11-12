import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT, GrokBotBridgeRegistry, bridgeMaxRequestsPerNonce } =
  await import("../../open-sse/services/grokBotBridgeRegistry.ts");

const ORIGINAL = process.env.GROK_BOT_BRIDGE_MAX_REQUESTS;

describe("grok bot bridge request cap override", () => {
  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.GROK_BOT_BRIDGE_MAX_REQUESTS;
    else process.env.GROK_BOT_BRIDGE_MAX_REQUESTS = ORIGINAL;
  });

  it("keeps the documented default when the override is missing or unusable", () => {
    delete process.env.GROK_BOT_BRIDGE_MAX_REQUESTS;
    assert.equal(bridgeMaxRequestsPerNonce(), BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT);

    process.env.GROK_BOT_BRIDGE_MAX_REQUESTS = "zero";
    assert.equal(bridgeMaxRequestsPerNonce(), BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT);

    process.env.GROK_BOT_BRIDGE_MAX_REQUESTS = "0";
    assert.equal(bridgeMaxRequestsPerNonce(), BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT);

    process.env.GROK_BOT_BRIDGE_MAX_REQUESTS = "1.5";
    assert.equal(bridgeMaxRequestsPerNonce(), BRIDGE_MAX_REQUESTS_PER_NONCE_DEFAULT);
  });

  it("stops reserving once the override's budget is spent", () => {
    process.env.GROK_BOT_BRIDGE_MAX_REQUESTS = "9";
    assert.equal(bridgeMaxRequestsPerNonce(), 9);

    const registry = new GrokBotBridgeRegistry({
      clock: { now: () => 1_000, setTimeout: () => 0, clearTimeout: () => {} },
    });
    const nonce = "abcdefghijABCDEFGHIJ_-";
    const registered = registry.register({
      nonce,
      port: 4100,
      createdAt: 1_000,
      challenge: "challenge-token",
      hooks: { onDraining() {}, onForcedAbort() {}, onLocallyClosed() {} },
    });
    assert.equal(registered.ok, true);

    const lookup = registry.lookup(nonce);
    assert.equal(lookup.kind, "active");
    if (lookup.kind !== "active") return;

    for (let i = 0; i < 9; i += 1) {
      assert.equal(registry.reserveSlot(lookup.entry), true, `reservation ${i + 1}`);
    }
    assert.equal(lookup.entry.slotsUsed, 9);

    // Still under the override: dropping it here would restore the default and
    // the registry would rightly accept one more.
    assert.equal(registry.reserveSlot(lookup.entry), false, "the tenth request is refused");
    assert.equal(lookup.entry.slotsUsed, 9);
  });
});
