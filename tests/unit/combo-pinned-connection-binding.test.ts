/**
 * Context-cache pin must keep the combo member's account binding.
 *
 * The pin (session_model_history) only records the model string. Before this fix the
 * honored-pin dispatch called handleSingleModel with `{ modelPinned: true }` only, so the
 * provider-level selector (session affinity / LRU) picked the account: a step bound to
 * account A could be served from account B of the same provider for the rest of the
 * session, as soon as the affinity record for that session key pointed elsewhere.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pin-binding-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "pin-binding-test-secret";

const { tryPinnedModelDispatch, resolvePinnedConnectionBinding } =
  await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const core = await import("../../src/lib/db/core.ts");

const PROVIDER = "pinbind";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
});

function target(modelStr: string, connectionId: string | null, allowed?: string[] | null) {
  return { modelStr, connectionId, allowedConnectionIds: allowed ?? null };
}

test("binding: a single step bound to an account keeps that account", () => {
  const targets = [
    target("p/opus", "conn-a", ["conn-a"]),
    target("p/sonnet", "conn-b", ["conn-b"]),
  ];
  assert.deepEqual(resolvePinnedConnectionBinding(targets, "p/opus"), {
    connectionId: "conn-a",
    allowedConnectionIds: ["conn-a"],
  });
});

test("binding: a step without an explicit allowlist still binds its connectionId", () => {
  assert.deepEqual(resolvePinnedConnectionBinding([target("p/opus", "conn-a")], "p/opus"), {
    connectionId: "conn-a",
    allowedConnectionIds: ["conn-a"],
  });
});

test("binding: steps sharing the model string are limited to the union of their accounts", () => {
  const targets = [
    target("p/opus", "conn-a", ["conn-a"]),
    target("p/opus", "conn-c", ["conn-c"]),
    target("p/sonnet", "conn-b", ["conn-b"]),
  ];
  assert.deepEqual(resolvePinnedConnectionBinding(targets, "p/opus"), {
    allowedConnectionIds: ["conn-a", "conn-c"],
  });
});

test("binding: a dynamic-account step (no binding) keeps the whole provider pool", () => {
  assert.deepEqual(resolvePinnedConnectionBinding([target("p/opus", null)], "p/opus"), {});
  assert.deepEqual(
    resolvePinnedConnectionBinding(
      [target("p/opus", "conn-a", ["conn-a"]), target("p/opus", null)],
      "p/opus"
    ),
    {}
  );
});

test("binding: an unknown pin yields no binding", () => {
  assert.deepEqual(resolvePinnedConnectionBinding([target("p/opus", "conn-a")], "p/gone"), {});
});

test("tryPinnedModelDispatch: the honored pin is dispatched on the member's own account", async () => {
  const accountA = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-a",
    isActive: true,
    apiKey: "sk-test-pin-binding-a",
  });
  const accountB = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-b",
    isActive: true,
    apiKey: "sk-test-pin-binding-b",
  });
  invalidateDbCache();

  const combo = {
    name: "pin-binding-combo",
    strategy: "weighted",
    models: [
      { id: "s1", model: `${PROVIDER}/big`, connectionId: accountA.id, weight: 50 },
      { id: "s2", model: `${PROVIDER}/small`, connectionId: accountB.id, weight: 50 },
    ],
    config: {},
  };
  const records: string[] = [];
  const log = {
    info: (_s: string, m: string) => records.push(m),
    warn: (_s: string, m: string) => records.push(m),
    debug: () => {},
    error: () => {},
  };
  const seen: Array<Record<string, unknown> | undefined> = [];
  const res = await tryPinnedModelDispatch({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo,
    pinnedModel: `${PROVIDER}/big`,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, _model, received) => {
      seen.push(received as Record<string, unknown> | undefined);
      return new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    },
    log,
  });

  assert.ok(res, "the healthy pin must be served");
  assert.equal(seen.length, 1);
  assert.equal(seen[0]?.modelPinned, true);
  assert.equal(seen[0]?.connectionId, accountA.id, "pinned dispatch must stay on account A");
  assert.deepEqual(seen[0]?.allowedConnectionIds, [accountA.id]);
});

function testLog() {
  const records: string[] = [];
  return {
    records,
    log: {
      info: (_s: string, m: string) => records.push(m),
      warn: (_s: string, m: string) => records.push(m),
      debug: () => {},
      error: () => {},
    },
  };
}

function jsonBody(content: string) {
  return JSON.stringify({ choices: [{ message: { role: "assistant", content } }] });
}

test("tryPinnedModelDispatch: a 402 from the exhausted bound account falls through to the strategy", async () => {
  // #12441 surfaces credits_exhausted as 402 (expired/banned stay 401). The
  // pin is honored at gate time (the bound account looks healthy) and the
  // dispatch discovers the exhaustion: handleNoCredentials() answers 402 for
  // the bound account while a sibling account of the same provider is healthy.
  // That 402 must fall through to the combo loop, which skips the exhausted
  // account — serving it would fail every following turn of the session.
  const accountA = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-a-402",
    isActive: true,
    apiKey: "sk-test-pin-binding-402-a",
  });
  const accountB = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-b-402",
    isActive: true,
    apiKey: "sk-test-pin-binding-402-b",
  });
  invalidateDbCache();

  const combo = {
    name: "pin-binding-402",
    strategy: "weighted",
    models: [
      { id: "s1", model: `${PROVIDER}/big`, connectionId: accountA.id, weight: 50 },
      { id: "s2", model: `${PROVIDER}/small`, connectionId: accountB.id, weight: 50 },
    ],
    config: {},
  };
  const { log } = testLog();
  const seen: Array<Record<string, unknown> | undefined> = [];
  const res = await tryPinnedModelDispatch({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo,
    pinnedModel: `${PROVIDER}/big`,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, _model, received) => {
      seen.push(received as Record<string, unknown> | undefined);
      // handleNoCredentials() for a credits-exhausted bound account (#12441).
      return new Response(
        JSON.stringify({ error: { message: "[pinbind] All 1 connection(s) credits exhausted" } }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      );
    },
    log,
  });

  assert.equal(seen.length, 1, "the pin is honored: the bound account looked healthy at gate time");
  assert.equal(seen[0]?.connectionId, accountA.id);
  assert.equal(
    res,
    null,
    "a 402 from the exhausted bound account must fall through to the combo strategy"
  );
});

test("tryPinnedModelDispatch: a durably exhausted bound account drops the pin despite a healthy sibling", async () => {
  // The health gate must judge the pool the pin can actually use: account A is
  // the pin's only account and is credits-exhausted, account B of the same
  // provider is healthy but unreachable for this pin. Honoring the pin would
  // only produce a dead-end dispatch — the strategy must run instead.
  const accountA = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-a-exhausted",
    isActive: true,
    testStatus: "credits_exhausted",
    apiKey: "sk-test-pin-binding-exh-a",
  });
  const accountB = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-b-healthy",
    isActive: true,
    testStatus: "active",
    apiKey: "sk-test-pin-binding-exh-b",
  });
  invalidateDbCache();

  const combo = {
    name: "pin-binding-exhausted",
    strategy: "weighted",
    models: [
      { id: "s1", model: `${PROVIDER}/big`, connectionId: accountA.id, weight: 50 },
      { id: "s2", model: `${PROVIDER}/small`, connectionId: accountB.id, weight: 50 },
    ],
    config: {},
  };
  const { log } = testLog();
  const seen: Array<Record<string, unknown> | undefined> = [];
  const res = await tryPinnedModelDispatch({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo,
    pinnedModel: `${PROVIDER}/big`,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, _model, received) => {
      seen.push(received as Record<string, unknown> | undefined);
      return new Response(jsonBody("ok"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    log,
  });

  assert.equal(res, null, "the pin bound to a durably exhausted account must be dropped");
  assert.equal(seen.length, 0, "no pinned dispatch may happen on the dead bound account");
});

test("tryPinnedModelDispatch: a shared-model binding keeps the pin while one bound account is usable", async () => {
  const accountA = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-a-shared",
    isActive: true,
    testStatus: "credits_exhausted",
    apiKey: "sk-test-pin-binding-shared-a",
  });
  const accountC = await createProviderConnection({
    provider: PROVIDER,
    authType: "api-key",
    name: "account-c-shared",
    isActive: true,
    testStatus: "active",
    apiKey: "sk-test-pin-binding-shared-c",
  });
  invalidateDbCache();

  const combo = {
    name: "pin-binding-shared",
    strategy: "weighted",
    models: [
      { id: "s1", model: `${PROVIDER}/big`, connectionId: accountA.id, weight: 50 },
      { id: "s2", model: `${PROVIDER}/big`, connectionId: accountC.id, weight: 50 },
    ],
    config: {},
  };
  const { log } = testLog();
  const seen: Array<Record<string, unknown> | undefined> = [];
  const res = await tryPinnedModelDispatch({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo,
    pinnedModel: `${PROVIDER}/big`,
    allCombos: [combo],
    config: resolveComboSetupConfig(combo, {}),
    clientRequestedStream: false,
    handleSingleModelWithTimeout: async (_body, _model, received) => {
      seen.push(received as Record<string, unknown> | undefined);
      return new Response(jsonBody("ok"), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    log,
  });

  assert.ok(res, "the pin must stay honored while a bound account is usable");
  assert.equal(seen.length, 1);
  assert.deepEqual(
    [...(seen[0]?.allowedConnectionIds as string[])].sort(),
    [accountA.id, accountC.id].sort(),
    "the dispatch stays inside the union of the bound accounts"
  );
});
