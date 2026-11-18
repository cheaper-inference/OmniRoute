import test from "node:test";
import assert from "node:assert/strict";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import {
  getRequestQuotaCacheState,
  withQuotaCacheReadView,
} from "../../src/domain/quotaCacheReadView.ts";

test("a connection-scoped read clones only that connection and keeps mutations private", () => {
  const state = getQuotaCacheState();
  const saved = new Map(state.cache);
  const original = globalThis.structuredClone;
  let clones = 0;
  try {
    state.cache.clear();
    for (let i = 0; i < 132; i++)
      state.cache.set(`c${i}`, {
        connectionId: `c${i}`,
        provider: "codex",
        quotas: { session: { remainingPercentage: 80, resetAt: null } },
        modelQuotas: {},
        fetchedAt: Date.now(),
        exhausted: false,
        nextResetAt: null,
      });
    globalThis.structuredClone = ((value: unknown) => {
      clones++;
      return original(value);
    }) as typeof structuredClone;
    withQuotaCacheReadView(() => {
      const local = getRequestQuotaCacheState();
      local.cache.get("c0")!.quotas.session.remainingPercentage = 0;
      local.cache.delete("c0");
      assert.equal(local.cache.has("c1"), false);
    }, "c0");
    assert.equal(clones, 1);
    assert.equal(state.cache.get("c0")!.quotas.session.remainingPercentage, 80);
    assert.equal(state.cache.size, 132);
  } finally {
    globalThis.structuredClone = original;
    state.cache.clear();
    for (const [id, entry] of saved) state.cache.set(id, entry);
  }
});

test("an unscoped read retains the full isolated snapshot", () => {
  const state = getQuotaCacheState();
  withQuotaCacheReadView(() => {
    assert.notEqual(getRequestQuotaCacheState().cache, state.cache);
    assert.equal(getRequestQuotaCacheState().cache.size, state.cache.size);
  });
});
