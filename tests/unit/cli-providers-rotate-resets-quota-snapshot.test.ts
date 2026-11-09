import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * `omniroute providers rotate` swaps the API key and clears the connection's
 * error fields, but the quota snapshots that the OLD key produced stayed in
 * `quota_snapshots`. After the next server start the quota cache hydrates from
 * them, so a freshly rotated key inherited the old key's exhausted pause until
 * a background refresh replaced it.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rotate-quota-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.STORAGE_ENCRYPTION_KEY;
const ORIGINAL_FETCH = globalThis.fetch;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const providerStore = await import("../../bin/cli/provider-store.mjs");
const { runProvidersRotateCommand } = await import("../../bin/cli/commands/providers.mjs");

test.after(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function addConnection(name: string) {
  const db = coreDb.getDbInstance();
  const connection = providerStore.upsertApiKeyProviderConnection(db, {
    provider: "openai",
    name,
    apiKey: "sk-old-key",
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: connection.id,
    window_key: "weekly",
    remaining_percentage: 0,
    is_exhausted: 1,
    next_reset_at: null,
    window_duration_ms: null,
    raw_data: JSON.stringify({ source: "old-key" }),
  });
  return connection.id as string;
}

test("rotating a key stops the old key's exhausted quota snapshot from pausing the connection", async () => {
  const rotatedId = addConnection("Rotated");
  const otherId = addConnection("Untouched");

  // The server is offline: rotate writes the database directly.
  globalThis.fetch = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  process.env.TEST_ROTATED_KEY = "sk-new-key";
  const log = console.log;
  console.log = () => {};
  let exitCode: number;
  try {
    exitCode = await runProvidersRotateCommand(rotatedId, {
      fromEnv: "TEST_ROTATED_KEY",
      yes: true,
      skipTest: true,
    });
  } finally {
    console.log = log;
    delete process.env.TEST_ROTATED_KEY;
  }
  assert.equal(exitCode, 0);

  // First read after the rotation: the cache is cold, as after a server start.
  assert.equal(
    quotaCache.isAccountQuotaExhausted(rotatedId),
    false,
    "the new key must not inherit the old key's exhausted snapshot"
  );
  assert.equal(
    quotaCache.isAccountQuotaExhausted(otherId),
    true,
    "a connection that was not rotated keeps its snapshot"
  );
});

test("rotating a key keeps the quota history rows", async () => {
  const id = addConnection("History");
  globalThis.fetch = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  process.env.TEST_ROTATED_KEY = "sk-new-key-2";
  const log = console.log;
  console.log = () => {};
  try {
    await runProvidersRotateCommand(id, { fromEnv: "TEST_ROTATED_KEY", yes: true, skipTest: true });
  } finally {
    console.log = log;
    delete process.env.TEST_ROTATED_KEY;
  }
  const original = coreDb
    .getDbInstance()
    .prepare(
      "SELECT COUNT(*) AS n FROM quota_snapshots WHERE connection_id = ? AND is_exhausted = 1"
    )
    .get(id) as { n: number };
  assert.equal(original.n, 1, "the earlier snapshot row must stay for utilization history");
});

test("rotating through a running server also retires the old key's quota snapshot", async () => {
  const id = addConnection("Online");
  // A healthy server answers /api/health and the PATCH with 200.
  globalThis.fetch = (async () => ({
    ok: true,
    status: 200,
    headers: { get: () => null },
    json: async () => ({}),
    text: async () => "",
  })) as unknown as typeof fetch;
  process.env.TEST_ROTATED_KEY = "sk-new-key-3";
  const log = console.log;
  console.log = () => {};
  try {
    const exitCode = await runProvidersRotateCommand(id, {
      fromEnv: "TEST_ROTATED_KEY",
      yes: true,
      skipTest: true,
    });
    assert.equal(exitCode, 0);
  } finally {
    console.log = log;
    delete process.env.TEST_ROTATED_KEY;
  }
  assert.equal(quotaCache.isAccountQuotaExhausted(id), false);
});

test("a failed quota retirement after the key write is a warning, not a failed rotation", async () => {
  const id = addConnection("Locked");
  // Any insert into quota_snapshots now fails, like a locked or read-only database would.
  coreDb
    .getDbInstance()
    .exec(
      "CREATE TRIGGER rotate_retire_fails BEFORE INSERT ON quota_snapshots BEGIN SELECT RAISE(ABORT, 'database is locked'); END"
    );
  globalThis.fetch = (async () => {
    throw new Error("offline");
  }) as typeof fetch;
  process.env.TEST_ROTATED_KEY = "sk-new-key-4";
  const out: string[] = [];
  const warnings: string[] = [];
  const { log, warn } = console;
  console.log = (...args: unknown[]) => out.push(args.join(" "));
  console.warn = (...args: unknown[]) => warnings.push(args.join(" "));
  let exitCode: number | undefined;
  try {
    exitCode = await runProvidersRotateCommand(id, {
      fromEnv: "TEST_ROTATED_KEY",
      yes: true,
      skipTest: true,
    });
  } finally {
    console.log = log;
    console.warn = warn;
    delete process.env.TEST_ROTATED_KEY;
    coreDb.getDbInstance().exec("DROP TRIGGER rotate_retire_fails");
  }
  assert.equal(exitCode, 0, "the key is already rotated, so the command succeeds");
  assert.ok(
    out.some((line) => line.includes(id.slice(0, 8))),
    `the success message must still print; got ${JSON.stringify(out)}`
  );
  assert.ok(
    warnings.some((line) => /quota/i.test(line)),
    `a warning about the quota snapshots must print; got ${JSON.stringify(warnings)}`
  );
});
