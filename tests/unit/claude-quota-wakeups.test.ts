import assert from "node:assert/strict";
import test from "node:test";
import {
  claudeWakeupWindow,
  createClaudeAutoPingTick,
  createClaudeWakeupDeps,
  runClaudeWakeup,
} from "../../src/lib/services/claudeWakeups.ts";

const now = Date.parse("2026-11-20T12:00:00Z");
const nextReset = now + 5 * 60 * 60_000;
const ready = { bootstrap: null, quotasComplete: true, quotas: {} };

test("Claude wakeups require an idle five-hour window and available weekly quota", () => {
  const session = (time: number) => ({ "session (5h)": { resetAt: new Date(time).toISOString() } });
  assert.equal(claudeWakeupWindow(ready, now), "ready");
  assert.equal(claudeWakeupWindow({ ...ready, quotas: session(now - 1) }, now), "ready");
  assert.equal(claudeWakeupWindow({ ...ready, quotas: session(now + 1) }, now), "window_active");
  assert.equal(claudeWakeupWindow({ ...ready, _stale: true }, now), "quota_unavailable");
  assert.equal(claudeWakeupWindow({ ...ready, quotasComplete: false }, now), "quota_unavailable");
  assert.equal(claudeWakeupWindow({ ...ready, plan: "ultra" }, now), "quota_unavailable");
  assert.equal(
    claudeWakeupWindow({ ...ready, _source: "response-headers" }, now),
    "quota_unavailable"
  );
  assert.equal(
    claudeWakeupWindow({ ...ready, quotas: { "weekly (7d)": { remaining: 0 } } }, now),
    "quota_exhausted"
  );
});

test("automatic Claude wakeups honor opt-in and wait until the observed reset", async () => {
  const calls: string[] = [];
  let instant = now;
  let enabled = true;
  const tick = createClaudeAutoPingTick(
    async (id) => {
      calls.push(id);
      return { nextProbeAt: nextReset };
    },
    async () => ({ claudeQuotaAutoPing: { connections: { active: enabled, disabled: false } } }),
    () => instant
  );
  await tick();
  instant += 30 * 60_000;
  await tick();
  assert.deepEqual(calls, ["active"]);
  instant = nextReset;
  await tick();
  assert.deepEqual(calls, ["active", "active"]);
  enabled = false;
  instant += 60_000;
  await tick();
  assert.deepEqual(calls, ["active", "active"]);
});

test("a native Claude ping is sent once and records the actual response reset", async () => {
  const account = {
    id: "test-account",
    provider: "claude",
    authType: "oauth",
    accessToken: "test-token",
  };
  let claims = 0;
  let sent = 0;
  const resets: number[] = [];
  const real = createClaudeWakeupDeps();
  const deps = {
    ...real,
    now: () => now,
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolveProxyForConnection: async () => null,
    runWithProxyContext: (_config: unknown, work: () => Promise<unknown>) => work(),
    refresh: async () => ({ connection: account, refreshed: false }),
    throttleQuotaFetch: async () => {},
    readUsage: async () => ready,
    claim: () => ++claims === 1,
    recordReset: (_id: string, _claimedAt: number, resetAt: number) => {
      resets.push(resetAt);
    },
    loadExecutor: async () => ({
      execute: async ({ body, stream }: { body: Record<string, unknown>; stream: boolean }) => {
        sent++;
        assert.equal(body.max_tokens, 1);
        assert.equal(stream, false);
        return {
          response: Response.json(
            { type: "message", stop_reason: "max_tokens" },
            { headers: { "anthropic-ratelimit-unified-5h-reset": String(nextReset / 1000) } }
          ),
        };
      },
    }),
  } as unknown as typeof real;
  const signal = new AbortController().signal;
  assert.equal((await runClaudeWakeup(account, signal, deps)).status, "succeeded");
  assert.equal((await runClaudeWakeup(account, signal, deps)).reason, "busy");
  assert.deepEqual(resets, [nextReset]);
  assert.equal(sent, 1);
});
