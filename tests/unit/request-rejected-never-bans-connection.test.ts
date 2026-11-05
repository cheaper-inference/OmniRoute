/**
 * #12859 follow-up, handler level: called with a resolved targetModel,
 * handleRequestRejectedFailure must exclude the MODEL and leave the connection
 * active. The pre-fix handler called `writeTerminalStatus(..., isActive:false)`
 * on the third consecutive refusal and rewrote `testStatus: "banned"`, which
 * nothing in the routing path undoes.
 *
 * This suite stubs the DB module so it can observe the exact rows the handler
 * would write, without a SQLite handle.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

const DB_STUB = "file:///__test__/db-providers-stub.mjs";
const written = [];
globalThis.__OMNI_TEST_REJECTED_WRITES__ = written;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/db/providers") {
      return { url: DB_STUB, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === DB_STUB) {
      return {
        format: "module",
        shortCircuit: true,
        source: `
          export async function updateProviderConnection(id, patch) {
            globalThis.__OMNI_TEST_REJECTED_WRITES__.push({ id, patch });
          }
          export async function getProviderConnectionById() { return null; }
          export async function setConnectionRateLimitUntil() { return undefined; }
          export async function markConnectionTestUnavailable() { return undefined; }
          export async function getProviderConnections() { return []; }
          export async function getProviderConnectionByIdSync() { return null; }
          export async function createProviderConnection() { return null; }
          export async function deleteProviderConnection() { return true; }
          export async function markConnectionActive() { return undefined; }
          export async function getProviderCredentials() { return null; }
          export async function updateProviderConnectionCredentials() { return undefined; }
          export async function getConnectionsByProvider() { return []; }
          export async function resetProviderConnectionError() { return undefined; }
          export async function touchConnectionLastUsed() { return undefined; }
          export async function getConnectionById() { return null; }
          export async function updateConnection() { return undefined; }
        `,
      };
    }
    return nextLoad(url, context);
  },
});

const { handleRequestRejectedFailure } =
  await import("../../open-sse/handlers/chatCore/requestRejectedFailure.ts");
const { isModelLocked, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { __resetRequestRejectedStreaksForTests, __setRequestRejectedClockForTests } =
  await import("../../open-sse/services/requestRejectedStreak.ts");

const PROVIDER = "anthropic";
const CONN = "conn-claude";
const REFUSED_MODEL = "claude-sonnet-4-6";
const SIBLING_MODEL = "claude-opus-4-6";

test.beforeEach(() => {
  globalThis.__OMNI_TEST_REJECTED_WRITES__ = written;
  written.length = 0;
  clearAllModelLockouts();
  __resetRequestRejectedStreaksForTests();
});

test("#12859: repeated refusals on one model never disable the connection", async (t) => {
  // Successive refusals land after the previous cooldown expires, otherwise they
  // are the same in-flight episode and never reach the threshold at all.
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  for (let i = 0; i < 4; i++) {
    await handleRequestRejectedFailure({
      connectionId: CONN,
      provider: PROVIDER,
      targetModel: REFUSED_MODEL,
      statusCode: 403,
      message: "Request not allowed",
    });
    t.mock.timers.tick(60 * 60 * 1000);
  }

  for (const { patch } of written) {
    assert.notEqual(patch.testStatus, "banned", "a per-request refusal is not a ban");
    assert.equal(patch.isActive, undefined, "the connection must never be deactivated");
    assert.equal(
      patch.rateLimitedUntil,
      undefined,
      "exclusion is model-scoped, not connection-wide"
    );
  }

  assert.equal(isModelLocked(PROVIDER, CONN, REFUSED_MODEL), true, "the refused model is out");
  assert.equal(isModelLocked(PROVIDER, CONN, SIBLING_MODEL), false, "the sibling keeps routing");
});

test("#12859: the refusal is still recorded on the connection for the dashboard", async () => {
  await handleRequestRejectedFailure({
    connectionId: CONN,
    provider: PROVIDER,
    targetModel: REFUSED_MODEL,
    statusCode: 403,
    message: "Request not allowed",
  });

  assert.ok(written.length >= 1);
  const last = written[written.length - 1].patch;
  assert.equal(last.lastErrorType, "request_rejected", "classifier type is preserved for the UI");
  assert.equal(last.errorCode, 403);
  assert.match(String(last.lastError), /Request not allowed/);
});

test("#12859: without a target model the handler degrades to a cooldown, never a ban", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  for (let i = 0; i < 4; i++) {
    await handleRequestRejectedFailure({
      connectionId: CONN,
      provider: PROVIDER,
      targetModel: null,
      statusCode: 403,
      message: "Request not allowed",
    });
    t.mock.timers.tick(60 * 60 * 1000);
  }

  for (const { patch } of written) {
    assert.notEqual(patch.testStatus, "banned");
    assert.equal(patch.isActive, undefined);
  }
  const last = written[written.length - 1].patch;
  assert.equal(last.testStatus, "unavailable", "a cooldown is the connection-level fallback");
  assert.ok(last.rateLimitedUntil, "with a recoverable expiry");
});
