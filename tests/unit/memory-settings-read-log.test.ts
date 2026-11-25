import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-settings-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { injectMemoryAndSkills } =
  await import("../../open-sse/handlers/chatCore/memorySkillsInjection.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed memory-settings read is logged and the request still goes through", async () => {
  invalidateMemorySettingsCache();
  const db = core.getDbInstance() as unknown as { exec: (sql: string) => void };
  db.exec("ALTER TABLE key_value RENAME TO key_value_hidden");
  const lines: string[] = [];
  const body = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  let result;
  try {
    result = await injectMemoryAndSkills({
      body,
      memoryOwnerId: "key-A",
      provider: "openai",
      effectiveModel: "gpt-4o",
      sourceFormat: FORMATS.OPENAI,
      targetFormat: FORMATS.OPENAI,
      backgroundReason: null,
      log: { debug: (tag: string, msg: string) => lines.push(`${tag} ${msg}`) },
    });
  } finally {
    db.exec("ALTER TABLE key_value_hidden RENAME TO key_value");
    invalidateMemorySettingsCache();
  }
  assert.deepEqual(result.body.messages, body.messages, "the request still goes through");
  assert.ok(
    lines.some((line) => /^MEMORY /.test(line)),
    `a MEMORY debug line expected, got ${JSON.stringify(lines)}`
  );
});
