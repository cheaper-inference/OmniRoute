/**
 * #14498 (ported): TypeSafe (Jev) is a decisions-only provider. Without a guard,
 * getExecutor("typesafe") hands the TypeSafe key to the DefaultExecutor, whose
 * config falls back to the OpenAI endpoint. SYSTEMONE_CHAT_GUARD_ENABLED (default
 * off) refuses that chat dispatch with a 400 pointing at /v1/systemone.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-chat-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { DECISIONS_ONLY_PROVIDER_IDS, isDecisionsOnlyProvider } =
  await import("../../open-sse/config/decisionsProviders.ts");

const FLAG = "SYSTEMONE_CHAT_GUARD_ENABLED";
const originalFlag = process.env[FLAG];

test.afterEach(() => {
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("decisions-only provider set is keyed on the System One provider id", () => {
  assert.deepEqual([...DECISIONS_ONLY_PROVIDER_IDS], ["typesafe"]);
  assert.equal(isDecisionsOnlyProvider(" TypeSafe "), true);
  assert.equal(isDecisionsOnlyProvider("openai"), false);
  assert.equal(isDecisionsOnlyProvider(null), false);
});

test("flag off (default): chat dispatch for typesafe is unchanged", async () => {
  delete process.env[FLAG];
  const executor = await getExecutor("typesafe");
  assert.ok(executor, "the default executor is still returned");
});

test("flag on: chat dispatch for typesafe is refused with a 400 naming /v1/systemone", async () => {
  process.env[FLAG] = "true";
  await assert.rejects(getExecutor("typesafe"), (error: Error & { status?: number }) => {
    assert.equal(error.status, 400);
    assert.match(error.message, /System One/);
    assert.match(error.message, /\/v1\/systemone/);
    return true;
  });
  // Other providers are not affected by the flag.
  assert.ok(await getExecutor("openai"));
});
