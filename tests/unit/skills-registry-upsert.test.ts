import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-upsert-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");

const skill = (over: Record<string, unknown> = {}) => ({
  name: "echo",
  version: "1.0.0",
  description: "first",
  schema: { input: {}, output: {} },
  handler: "handler-1",
  apiKeyId: "key-a",
  ...over,
});
const db = () => coreDb.getDbInstance();
const rows = () => db().prepare("SELECT * FROM skills").all() as Record<string, unknown>[];

test.beforeEach(() => {
  skillRegistry.invalidateCache();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("registering the same owner, name and version again updates one row and keeps its id", async () => {
  const first = await skillRegistry.register(skill());
  const second = await skillRegistry.register(
    skill({ description: "second", handler: "handler-2", enabled: false })
  );

  assert.equal(second.id, first.id);
  assert.equal(rows().length, 1);
  assert.equal(rows()[0].handler, "handler-2");
  assert.equal(rows()[0].description, "second");
  assert.equal(rows()[0].enabled, 0);
  assert.equal(second.createdAt.getTime(), first.createdAt.getTime());
  assert.equal(skillRegistry.list("key-a").length, 1);
  assert.equal(skillRegistry.getSkill("echo", "key-a")?.handler, "handler-2");
});

test("a re-register keeps the run history of the skill", async () => {
  const first = await skillRegistry.register(skill());
  db()
    .prepare(
      `INSERT INTO skill_executions (id, skill_id, api_key_id, input, status)
       VALUES ('run-1', ?, 'key-a', '{}', 'success')`
    )
    .run(first.id);
  await skillRegistry.register(skill({ handler: "handler-2" }));

  const runs = db().prepare("SELECT skill_id FROM skill_executions").all();
  assert.deepEqual(runs, [{ skill_id: first.id }]);
});

test("another owner or another version still gets its own row", async () => {
  await skillRegistry.register(skill());
  await skillRegistry.register(skill({ apiKeyId: "key-b" }));
  await skillRegistry.register(skill({ version: "1.1.0" }));
  assert.equal(rows().length, 3);
});

test("the database refuses a second row for the same owner, name and version", async () => {
  await skillRegistry.register(skill());
  assert.throws(
    () =>
      db()
        .prepare(
          `INSERT INTO skills (id, api_key_id, name, version, schema, handler)
           VALUES ('dup', 'key-a', 'echo', '1.0.0', '{}', 'h')`
        )
        .run(),
    /UNIQUE/
  );
});
