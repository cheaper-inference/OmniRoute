import assert from "node:assert/strict";
import test from "node:test";
import {
  armCodexQuotaRecovery,
  recheckCodexQuotaRecovery,
  runCodexQuotaRefresh,
  withCodexQuotaRecoveryDeadline,
} from "../../src/sse/services/codexQuotaRecoveryRecheck.ts";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const blocker = (connectionId: string, observedAt = Date.now() - 30_000) => ({
  connectionId,
  windowNames: ["weekly"],
  observedAts: [observedAt],
});
const options = (refresh: (id: string) => Promise<unknown>) => ({
  refresh: (id: string) => runCodexQuotaRefresh(id, () => refresh(id)),
  ownerEpoch: () => "owner-a",
  eligible: async () => true,
});

test("concurrent recovery reserves cooldown before dispatch and coalesces", async () => {
  const pending = deferred();
  let calls = 0;
  const deps = options(async () => {
    calls++;
    await pending.promise;
  });
  const first = recheckCodexQuotaRecovery([blocker("atomic")], deps);
  const second = recheckCodexQuotaRecovery([blocker("atomic")], deps);
  pending.resolve();
  await Promise.all([first, second]);
  await recheckCodexQuotaRecovery([blocker("atomic")], deps);
  assert.equal(calls, 1);
});
test("failed refresh is fail-safe and keeps cooldown", async () => {
  let calls = 0;
  const deps = options(async () => {
    calls++;
    throw new Error("offline");
  });
  await recheckCodexQuotaRecovery([blocker("failed")], deps);
  await recheckCodexQuotaRecovery([blocker("failed")], deps);
  assert.equal(calls, 1);
});
test("any fresh blocking window suppresses recovery, missing timestamp does not", async () => {
  let calls = 0;
  const deps = options(async () => {
    calls++;
  });
  await recheckCodexQuotaRecovery(
    [{ ...blocker("multi"), observedAts: [Date.now() - 30_000, Date.now()] }],
    deps
  );
  assert.equal(calls, 0);
  await recheckCodexQuotaRecovery([{ ...blocker("missing"), observedAts: [null] }], deps);
  assert.equal(calls, 1);
});
test("force newer than an existing flight survives joining that flight, consumed once later", async () => {
  const pending = deferred();
  let calls = 0;
  const old = runCodexQuotaRefresh("ordering", async () => {
    calls++;
    await pending.promise;
  });
  armCodexQuotaRecovery("ordering", "owner-a");
  const deps = options(async () => {
    calls++;
  });
  const join = recheckCodexQuotaRecovery([blocker("ordering", Date.now())], deps);
  pending.resolve();
  await Promise.all([old, join]);
  await recheckCodexQuotaRecovery([blocker("ordering", Date.now())], deps);
  await recheckCodexQuotaRecovery([blocker("ordering", Date.now())], deps);
  assert.equal(calls, 2);
});
test("force is owner-scoped and cannot reopen cooldown repeatedly", async () => {
  let calls = 0;
  const deps = options(async () => {
    calls++;
  });
  await recheckCodexQuotaRecovery([blocker("force")], deps);
  armCodexQuotaRecovery("force", "owner-b");
  await recheckCodexQuotaRecovery([blocker("force")], deps);
  assert.equal(calls, 1);
  armCodexQuotaRecovery("force", "owner-a");
  await recheckCodexQuotaRecovery([blocker("force", Date.now())], deps);
  await recheckCodexQuotaRecovery([blocker("force")], deps);
  assert.equal(calls, 2);
});
test("recovery fan-out never exceeds two", async () => {
  let active = 0;
  let maxActive = 0;
  const deps = options(async () => {
    active++;
    maxActive = Math.max(active, maxActive);
    await new Promise<void>((resolve) => setImmediate(resolve));
    active--;
  });
  await recheckCodexQuotaRecovery(
    [1, 2, 3, 4, 5].map((id) => blocker(`parallel-${id}`)),
    deps
  );
  assert.equal(maxActive, 2);
});
test("bounded wait leaves shared flight alive until the underlying refresh settles", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const pending = deferred();
  let calls = 0;
  const refresh = () => {
    calls++;
    return pending.promise;
  };
  const first = runCodexQuotaRefresh("timeout", refresh);
  const wait = withCodexQuotaRecoveryDeadline(first);
  t.mock.timers.tick(5_000);
  await wait;
  const join = runCodexQuotaRefresh("timeout", refresh);
  assert.equal(calls, 1);
  pending.resolve();
  await join;
});
