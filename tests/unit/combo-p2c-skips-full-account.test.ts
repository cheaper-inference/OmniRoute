import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-p2c-full-account-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { acquire, buildAccountSemaphoreKey, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { applyStrategyOrdering } =
  await import("../../open-sse/services/combo/applyStrategyOrdering.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

const PROVIDER = "featherless-ai";
const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

function seedConnection(id: string, maxConcurrent: number | null) {
  getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
        (id, provider, auth_type, is_active, max_concurrent, created_at, updated_at)
       VALUES (?, ?, 'apikey', 1, ?, datetime('now'), datetime('now'))`
    )
    .run(id, PROVIDER, maxConcurrent);
}

const target = (connectionId: string): never =>
  ({
    kind: "model",
    stepId: connectionId,
    executionKey: `${PROVIDER}>m>${connectionId}`,
    modelStr: `${PROVIDER}/m`,
    provider: PROVIDER,
    providerId: PROVIDER,
    connectionId,
    weight: 1,
    label: null,
  }) as never;

const deps = () =>
  ({
    combo: { id: "p2c-full", name: "p2c-full", config: {} },
    config: {},
    body: { messages: [] },
    log: noopLog,
    apiKeyAllowedConnections: null,
  }) as never;

const firstConnection = async (ids: string[]) =>
  (await applyStrategyOrdering("p2c", ids.map(target), deps())).orderedTargets[0].connectionId;

test.after(() => {
  resetAll();
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("p2c never puts an account with a full semaphore first while a sibling has room", async () => {
  seedConnection("conn-full", 1);
  seedConnection("conn-idle", 1);
  const release = await acquire(
    buildAccountSemaphoreKey({ provider: PROVIDER, accountKey: "conn-full" }),
    { maxConcurrency: 1 }
  );
  try {
    for (let i = 0; i < 40; i++) {
      assert.equal(await firstConnection(["conn-full", "conn-idle"]), "conn-idle");
    }
    const ordered = (
      await applyStrategyOrdering("p2c", [target("conn-full"), target("conn-idle")], deps())
    ).orderedTargets;
    assert.equal(ordered.length, 2, "the full account stays in the list as the last fallback");
  } finally {
    release();
  }
});

test("p2c still picks among all accounts when none is full", async () => {
  seedConnection("conn-a", 2);
  seedConnection("conn-b", 2);
  const seen = new Set<string>();
  for (let i = 0; i < 60; i++) seen.add(String(await firstConnection(["conn-a", "conn-b"])));
  assert.deepEqual([...seen].sort(), ["conn-a", "conn-b"]);
});

test("p2c keeps every target when all of them are full", async () => {
  seedConnection("conn-x", 1);
  seedConnection("conn-y", 1);
  const releases = await Promise.all(
    ["conn-x", "conn-y"].map((id) =>
      acquire(buildAccountSemaphoreKey({ provider: PROVIDER, accountKey: id }), {
        maxConcurrency: 1,
      })
    )
  );
  try {
    const ordered = (
      await applyStrategyOrdering("p2c", [target("conn-x"), target("conn-y")], deps())
    ).orderedTargets;
    assert.deepEqual(ordered.map((t) => t.connectionId).sort(), ["conn-x", "conn-y"]);
  } finally {
    for (const release of releases) release();
  }
});
