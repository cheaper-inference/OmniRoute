import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fork } from "node:child_process";
import { once } from "node:events";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "key-import-db-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  JWT_SECRET: "synthetic-import-db-jwt",
  API_KEY_SECRET: "synthetic-import-db-secret",
  STORAGE_ENCRYPTION_KEY: "synthetic-import-db-storage-key",
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: "1",
});
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
const core = await import("../../../src/lib/db/core.ts");
const keys = await import("../../../src/lib/db/apiKeys.ts");
const domain = await import("../../../src/lib/db/apiKeyImport.ts");
const { sharedSymbol } = await import("../../../src/shared/utils/processSingleton.ts");
const { opaqueTokenFingerprint } =
  await import("../../../open-sse/utils/opaqueTokenFingerprint.ts");
const db = core.getDbInstance();
await keys.getApiKeys();
const secret = () => `sk-${randomUUID().replaceAll("-", "")}`;
test.after(() => {
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("synchronous domain returns a committed, fully configured key and clears cached misses", async () => {
  const key = secret();
  assert.equal(await keys.validateApiKey(key), false);
  const result = domain.importApiKey(
    {
      key,
      name: "domain",
      noLog: true,
      allowUsageCommand: true,
      usageLimitEnabled: true,
      dailyUsageLimitUsd: 5,
    },
    "synthetic-machine"
  );
  assert.equal(result instanceof Promise, false, "no await may escape the SQLite critical section");
  assert.equal(result.created, true);
  const stored = await keys.getApiKeyById(result.id);
  assert.equal(stored?.noLog, true);
  assert.equal(stored?.dailyUsageLimitUsd, 5);
  assert.equal(await keys.validateApiKey(key), true);
});

test("failure after insert rolls back key and trigger side effects, leaving connection usable", () => {
  db.exec("CREATE TABLE import_test_effects (marker TEXT)");
  db.exec(`CREATE TRIGGER import_test_failure AFTER INSERT ON api_keys
    WHEN NEW.name = 'rollback' BEGIN
      INSERT INTO import_test_effects VALUES ('partial');
      SELECT RAISE(FAIL, 'synthetic import failure');
    END`);
  const id = randomUUID();
  try {
    assert.throws(() =>
      domain.importApiKey({ id, key: secret(), name: "rollback", noLog: true }, "synthetic-machine")
    );
    assert.equal(db.prepare("SELECT * FROM api_keys WHERE id = ?").get(id), undefined);
    assert.deepEqual(db.prepare("SELECT * FROM import_test_effects").all(), []);
  } finally {
    db.exec("DROP TRIGGER import_test_failure; DROP TABLE import_test_effects");
  }
  assert.equal(
    domain.importApiKey({ key: secret(), name: "after-rollback" }, "synthetic-machine").created,
    true
  );
});

test("legacy missing-hash value conflicts without rewriting the legacy row", () => {
  const id = randomUUID();
  const key = secret();
  db.prepare(
    "INSERT INTO api_keys (id, name, key, machine_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, "legacy", key, "synthetic-machine", "2020-01-01");
  const before = db.prepare("SELECT * FROM api_keys WHERE id = ?").get(id);
  assert.throws(() => domain.importApiKey({ key, name: "duplicate" }, "synthetic-machine"), {
    code: "API_KEY_IMPORT_CONFLICT",
  });
  assert.deepEqual(db.prepare("SELECT * FROM api_keys WHERE id = ?").get(id), before);
});

test("both configured env keys and the process self-loop credential are reserved", () => {
  const a = secret();
  const b = secret();
  process.env.OMNIROUTE_API_KEY = a;
  process.env.ROUTER_API_KEY = b;
  const store = globalThis as unknown as Record<symbol, string | undefined>;
  const symbol = sharedSymbol("selfLoopSecret");
  const previous = store[symbol];
  const c = secret();
  store[symbol] = c;
  try {
    for (const key of [a, b, c]) {
      assert.throws(() => domain.importApiKey({ key, name: "reserved" }, "synthetic-machine"), {
        code: "API_KEY_IMPORT_CONFLICT",
      });
    }
  } finally {
    delete process.env.OMNIROUTE_API_KEY;
    delete process.env.ROUTER_API_KEY;
    if (previous === undefined) delete store[symbol];
    else store[symbol] = previous;
  }
});

test("independent SQLite connections race on encrypted duplicate plaintext: exactly one insert", async () => {
  // Exercise cold fallback DDL as well as warm-row identity contention.
  db.exec("ALTER TABLE api_keys DROP COLUMN chaos_mode_enabled");
  const children = Array.from({ length: 4 }, () =>
    fork("tests/helpers/apiKeyImportWorker.ts", [], {
      execArgv: ["--import", "tsx/esm"],
      env: { ...process.env, DATA_DIR: dataDir },
      stdio: ["ignore", "ignore", "pipe", "ipc"],
    })
  );
  try {
    await Promise.all(
      children.map(async (child) => {
        const [message] = await once(child, "message");
        assert.equal(message, "ready");
      })
    );
    const key = secret();
    const results = await Promise.all(
      children.map(async (child) => {
        const message = once(child, "message");
        child.send({ id: randomUUID(), key });
        return (await message)[0] as { status: number | string };
      })
    );
    assert.equal(results.filter((r) => r.status === 201).length, 1);
    assert.equal(results.filter((r) => r.status === "API_KEY_IMPORT_CONFLICT").length, 3);
    const rows = db
      .prepare("SELECT * FROM api_keys WHERE key_hash = ?")
      .all(opaqueTokenFingerprint(key)) as Record<string, unknown>[];
    assert.equal(rows.length, 1);
    assert.equal(rows[0].no_log, 1);
    assert.equal(rows[0].usage_limit_enabled, 1);
    assert.equal(rows[0].daily_usage_limit_usd, 5);
    assert.equal(rows[0].chaos_mode_enabled, 1);
  } finally {
    for (const child of children) child.kill();
  }
});
