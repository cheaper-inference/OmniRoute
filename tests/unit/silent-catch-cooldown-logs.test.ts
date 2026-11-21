import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cooldown-logs-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { excludeConnectionForCooldown } =
  await import("../../open-sse/handlers/chatCore/connectionCooldown.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function withCapturedWarnings<T>(
  run: () => Promise<T>
): Promise<{ result: T; warnings: string[] }> {
  const original = console.warn;
  const warnings: string[] = [];
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    return { result: await run(), warnings };
  } finally {
    console.warn = original;
  }
}

const params = (connectionId: string) => ({
  connectionId,
  errorType: "geo_blocked",
  message: "blocked",
  statusCode: 403,
  cooldownMs: 60_000,
  skipCooldownForProbe: false,
  label: "geo-blocked",
  suffix: "trying siblings",
});

test("a failed cooldown write is logged and the fallback loop continues", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "cooldown-log",
    apiKey: "unit-test-key",
    isActive: true,
  });
  const id = String((connection as { id: unknown }).id);
  const db = core.getDbInstance() as unknown as { exec: (sql: string) => void };
  // Make only the cooldown write fail: the guard below aborts an UPDATE that sets a non-NULL
  // rate_limited_until. The earlier lastError write does not touch that column, so it still works.
  db.exec(
    `CREATE TRIGGER r4_block_cooldown BEFORE UPDATE ON provider_connections
     WHEN NEW.rate_limited_until IS NOT NULL AND NEW.rate_limited_until IS NOT OLD.rate_limited_until
     BEGIN SELECT RAISE(ABORT, 'cooldown write blocked'); END`
  );
  let warnings: string[];
  try {
    ({ warnings } = await withCapturedWarnings(() => excludeConnectionForCooldown(params(id))));
  } finally {
    db.exec("DROP TRIGGER IF EXISTS r4_block_cooldown");
  }
  assert.ok(
    warnings.some((line) => /cooldown write failed/i.test(line) && line.includes(id)),
    `a warning naming the failed write expected, got ${JSON.stringify(warnings)}`
  );
  assert.ok(
    warnings.some((line) => /excluded for 60s/.test(line)),
    "the normal exclusion line is still logged"
  );
});

test("a successful cooldown write logs only the normal line", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "cooldown-ok",
    apiKey: "unit-test-key-2",
    isActive: true,
  });
  const id = String((connection as { id: unknown }).id);
  const { warnings } = await withCapturedWarnings(() => excludeConnectionForCooldown(params(id)));
  assert.equal(warnings.filter((line) => /cooldown write failed/i.test(line)).length, 0);
  assert.equal(warnings.filter((line) => /excluded for 60s/.test(line)).length, 1);
});
