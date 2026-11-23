import test from "node:test";
import assert from "node:assert/strict";
import { resolveAndRecordPersistedCooldown } from "../../open-sse/services/combo/persistedConnectionCooldown.ts";

const NOW = Date.parse("2030-01-01T00:00:00Z");
const TARGET = { modelStr: "anthropic/claude-sonnet-4", connectionId: "fixture-pin" };
const makeState = () => ({ skippedConnectionCooldownUntil: undefined as number | undefined });
test.beforeEach((context) => context.mock.timers.enable({ apis: ["Date"], now: NOW }));

for (const rateLimitedUntil of [
  new Date(NOW + 5000).toISOString(),
  NOW + 5000,
  String(NOW + 5000),
  new Date(NOW + 5000),
]) {
  test(`preserves timestamp representation ${typeof rateLimitedUntil} from one row read`, async () => {
    const state = makeState();
    let reads = 0;
    const reason = await resolveAndRecordPersistedCooldown(state, TARGET, async (id) => {
      assert.equal(id, TARGET.connectionId);
      reads++;
      return { isActive: true, testStatus: "unavailable", rateLimitedUntil };
    });
    assert.match(reason ?? "", /persisted cooldown until/);
    assert.equal(reads, 1);
    assert.equal(state.skippedConnectionCooldownUntil, NOW + 5000);
  });
}

for (const rateLimitedUntil of [{}, [], true, null, "broken", Number.MAX_VALUE, NaN, Infinity]) {
  test(`malformed persisted timestamp ${String(rateLimitedUntil)} does not create a deadline`, async () => {
    const state = makeState();
    await resolveAndRecordPersistedCooldown(state, TARGET, async () => ({
      isActive: true,
      testStatus: "unavailable",
      lastErrorAt: new Date(NOW).toISOString(),
      rateLimitedUntil,
    }));
    assert.equal(state.skippedConnectionCooldownUntil, undefined);
  });
}

test("read failures and missing rows preserve dispatch fallthrough without a retry hint", async () => {
  for (const fetchConnection of [
    async () => null,
    async () => {
      throw new Error("fixture read unavailable");
    },
  ]) {
    const state = makeState();
    assert.equal(await resolveAndRecordPersistedCooldown(state, TARGET, fetchConnection), null);
    assert.equal(state.skippedConnectionCooldownUntil, undefined);
  }
});

test("an unpinned target does not read a row", async () => {
  const state = makeState();
  assert.equal(
    await resolveAndRecordPersistedCooldown(state, { modelStr: TARGET.modelStr }, async () => {
      assert.fail("unexpected read");
    }),
    null
  );
  assert.equal(state.skippedConnectionCooldownUntil, undefined);
});

test("normalized terminal status and unconfirmed active flag cannot imply recoverability", async () => {
  for (const row of [
    { isActive: true, testStatus: " BANNED " },
    { testStatus: "active" },
    { isActive: false, testStatus: "active" },
  ]) {
    const state = makeState();
    assert.ok(
      await resolveAndRecordPersistedCooldown(state, TARGET, async () => ({
        ...row,
        rateLimitedUntil: NOW + 5000,
      }))
    );
    assert.equal(state.skippedConnectionCooldownUntil, undefined);
  }
});

test("a future rate_limited deadline remains recoverable even when transient bypass is requested", async () => {
  const state = makeState();
  assert.ok(
    await resolveAndRecordPersistedCooldown(
      state,
      TARGET,
      async () => ({ isActive: true, testStatus: " RATE_LIMITED ", rateLimitedUntil: NOW + 5000 }),
      true
    )
  );
  assert.equal(state.skippedConnectionCooldownUntil, NOW + 5000);
});

test("existing transient bypass for an elapsed status-only limit remains unchanged", async () => {
  const state = makeState();
  assert.equal(
    await resolveAndRecordPersistedCooldown(
      state,
      TARGET,
      async () => ({ isActive: true, testStatus: "rate_limited", rateLimitedUntil: NOW - 1 }),
      true
    ),
    null
  );
  assert.equal(state.skippedConnectionCooldownUntil, undefined);
});
