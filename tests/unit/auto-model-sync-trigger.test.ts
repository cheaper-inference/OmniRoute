// Behaviour of the opt-in model-sync trigger used by connection create paths.
//
// A provider whose catalog is authoritative only advertises what the account
// synced last, so a connection created between scheduler ticks stays active with
// no models until the next six-hour cycle. The trigger closes that window.
//
// Eligibility follows the scheduler's own predicate: antigravity and agy take
// part by default and write `autoSync` at OAuth time, so gating on
// autoFetchModels alone would skip exactly the connections that need this.
//
// The trigger also caps itself: one sync per connection per window, and never two
// at once. A single sign-in can reach the create paths several times, and each
// pass pulls the whole upstream catalog.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-model-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { triggerAutoModelSync } = await import(
  "../../src/lib/providerModels/autoModelSyncTrigger.ts"
);
const { getModelSyncInternalBaseUrl } = await import(
  "../../src/shared/services/modelSyncScheduler.ts"
);
const { waitForConnectionFollowUps, getPendingConnectionFollowUpCount } = await import(
  "../../src/lib/providers/connectionFollowUps.ts"
);

test.after(async () => {
  await waitForConnectionFollowUps(2000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Call = {
  id: string;
  provider: string;
  baseUrl: string;
  mode?: string;
};

function recorder(result: boolean | Error | Promise<boolean> = true) {
  const calls: Call[] = [];
  const syncFn = (async (
    id: string,
    provider: string,
    baseUrl: string,
    options: { mode?: string } = {}
  ) => {
    calls.push({ id, provider, baseUrl, mode: options.mode });
    if (result instanceof Error) throw result;
    return result;
  }) as never;
  return { calls, syncFn };
}

/** Gating cases run with deduplication off so one case cannot mask the next. */
function call(
  connection: Parameters<typeof triggerAutoModelSync>[0],
  syncFn: unknown,
  extra: Record<string, unknown> = {}
) {
  return triggerAutoModelSync(connection, { syncFn: syncFn as never, dedupeWindowMs: 0, ...extra });
}

test("an agy connection syncs without any per-connection flag", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(
    call({ id: "conn-agy", provider: "agy", providerSpecificData: {} }, syncFn),
    true,
    "agy is in the scheduler's default set"
  );
  assert.equal(
    call({ id: "conn-at", provider: "antigravity", providerSpecificData: null }, syncFn),
    true
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 2);
});

test("an explicit autoSync:false is honoured even for agy", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(
    call({ id: "conn-off", provider: "agy", providerSpecificData: { autoSync: false } }, syncFn),
    false
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 0);
});

test("autoFetchModels still opts an API-key connection in", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(
    call(
      { id: "conn-key", provider: "openai", providerSpecificData: { autoFetchModels: true } },
      syncFn
    ),
    true
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
});

test("a provider outside the default set with no flag does not sync", async () => {
  const { calls, syncFn } = recorder();
  for (const providerSpecificData of [{}, null, { autoFetchModels: "true" }, { autoSync: "yes" }]) {
    assert.equal(call({ id: "conn-x", provider: "openai", providerSpecificData }, syncFn), false);
  }
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 0);
});

test("X-Skip-Model-Sync suppresses the trigger", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(
    call({ id: "conn-skip", provider: "agy", providerSpecificData: {} }, syncFn, {
      skipHeaderValue: "true",
    }),
    false
  );
  assert.equal(
    call({ id: "conn-run", provider: "agy", providerSpecificData: {} }, syncFn, {
      skipHeaderValue: "false",
    }),
    true,
    "only the literal true skips"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
});

test("a hostile options getter is swallowed by the guard", async () => {
  const { calls } = recorder();
  const hostileOptions = {
    dedupeWindowMs: 0,
    get skipHeaderValue(): string {
      throw new Error("boom from the options getter");
    },
  };
  assert.equal(
    triggerAutoModelSync({ id: "conn-opt", provider: "agy" }, hostileOptions as never),
    false,
    "must not throw"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 0);
});

test("a missing id or provider is ignored", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(triggerAutoModelSync(null, { syncFn, dedupeWindowMs: 0 }), false);
  assert.equal(call({ provider: "agy" }, syncFn), false);
  assert.equal(call({ id: "conn-y" }, syncFn), false);
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 0);
});

test("the sync uses the pinned internal origin, not anything request-derived", async () => {
  const { calls, syncFn } = recorder();
  call({ id: "conn-url", provider: "agy" }, syncFn);
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].id, "conn-url");
  assert.equal(calls[0].provider, "agy");
  assert.equal(calls[0].baseUrl, getModelSyncInternalBaseUrl());
  assert.equal(calls[0].mode, undefined, "the scheduler path keeps its default mode");
  assert.match(getModelSyncInternalBaseUrl(), /^http:\/\/127\.0\.0\.1:\d+$/);
});

test("a throwing provider-data accessor is swallowed by the guard", async () => {
  const { calls, syncFn } = recorder();
  const hostile = {
    id: "conn-hostile",
    provider: "agy",
    get providerSpecificData(): unknown {
      throw new Error("boom from a getter");
    },
  };
  assert.equal(call(hostile, syncFn), false, "must not throw");
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 0);
});

test("one sync per connection inside the default dedupe window", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(triggerAutoModelSync({ id: "conn-dup", provider: "agy" }, { syncFn }), true);
  await waitForConnectionFollowUps(2000);
  assert.equal(
    triggerAutoModelSync({ id: "conn-dup", provider: "agy" }, { syncFn }),
    false,
    "a second create event inside the default window must not sync again, even after the first settled"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
  assert.equal(
    triggerAutoModelSync({ id: "conn-other", provider: "agy" }, { syncFn }),
    true,
    "the window is per connection, not global"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 2);
});

test("the window expires instead of latching for the life of the process", async () => {
  const { calls, syncFn } = recorder();
  assert.equal(
    triggerAutoModelSync({ id: "conn-exp", provider: "agy" }, { syncFn, dedupeWindowMs: 25 }),
    true
  );
  await waitForConnectionFollowUps(2000);
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(
    triggerAutoModelSync({ id: "conn-exp", provider: "agy" }, { syncFn, dedupeWindowMs: 25 }),
    true,
    "an expired entry must allow the next sync"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 2);
});

test("no second sync while the first is still running", async () => {
  let release: (value: boolean) => void = () => {};
  const gate = new Promise<boolean>((resolve) => {
    release = resolve;
  });
  const { calls, syncFn } = recorder(gate);
  assert.equal(
    triggerAutoModelSync({ id: "conn-busy", provider: "agy" }, { syncFn, dedupeWindowMs: 0 }),
    true
  );
  assert.equal(
    triggerAutoModelSync({ id: "conn-busy", provider: "agy" }, { syncFn, dedupeWindowMs: 0 }),
    false,
    "in-flight syncs are deduplicated regardless of the window"
  );
  release(true);
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
  assert.equal(
    triggerAutoModelSync({ id: "conn-busy", provider: "agy" }, { syncFn, dedupeWindowMs: 0 }),
    true,
    "the connection is usable again once the sync settles"
  );
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 2);
});

test("the caller's sync mode is forwarded", async () => {
  const { calls, syncFn } = recorder();
  call({ id: "conn-import", provider: "agy" }, syncFn, { mode: "import" });
  await waitForConnectionFollowUps(2000);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].mode, "import", "the API-key create path relies on import semantics");
});

test("a rejected sync is swallowed and leaves no pending follow-up", async () => {
  const { syncFn } = recorder(new Error("connect ECONNREFUSED 127.0.0.1:20128"));
  assert.equal(call({ id: "conn-rej", provider: "agy" }, syncFn), true);
  assert.equal(await waitForConnectionFollowUps(2000), true);
  assert.equal(getPendingConnectionFollowUpCount(), 0);
});

test("a false sync result does not throw into the caller", async () => {
  const { syncFn } = recorder(false);
  assert.equal(call({ id: "conn-false", provider: "agy" }, syncFn), true);
  assert.equal(await waitForConnectionFollowUps(2000), true);
});
