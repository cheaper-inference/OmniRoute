import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-retention-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");

function resetSkillsRuntime() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillExecutor["handlers"].clear();
  skillExecutor.setTimeout(500);
}

async function registerEchoSkill() {
  return skillRegistry.register({
    name: "echo",
    version: "1.0.0",
    description: "echoes input",
    schema: { input: { value: "string" }, output: { echoed: "string" } },
    handler: "echo-handler",
    enabled: true,
    apiKeyId: "key-a",
  });
}

function rawRow(id: string) {
  return coreDb
    .getDbInstance()
    .prepare("SELECT input, output FROM skill_executions WHERE id = ?")
    .get(id) as { input: string; output: string | null } | undefined;
}

test.beforeEach(async () => {
  resetSkillsRuntime();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  resetSkillsRuntime();
  coreDb.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("skill_executions stores a capped placeholder instead of an oversized input and output", async () => {
  await registerEchoSkill();
  const big = "x".repeat(512 * 1024);
  skillExecutor.registerHandler("echo-handler", async () => ({ echoed: big }));

  const execution = await skillExecutor.execute(
    "echo@1.0.0",
    { value: big },
    { apiKeyId: "key-a", sessionId: "s1" }
  );

  // The caller still gets the full result.
  assert.equal((execution.output as { echoed: string }).echoed.length, big.length);

  const row = rawRow(execution.id);
  assert.ok(row);
  assert.ok(row.input.length < 4096, `stored input is ${row.input.length} chars`);
  assert.ok(
    (row.output ?? "").length < 4096,
    `stored output is ${(row.output ?? "").length} chars`
  );

  // Stored history stays readable JSON.
  const stored = skillExecutor.getExecution(execution.id);
  assert.equal((stored?.input as { truncated?: boolean }).truncated, true);
  assert.equal((stored?.output as { truncated?: boolean }).truncated, true);
});

test("skill_executions keeps a small input and output unchanged", async () => {
  await registerEchoSkill();
  skillExecutor.registerHandler("echo-handler", async (input) => ({ echoed: String(input.value) }));

  const execution = await skillExecutor.execute(
    "echo@1.0.0",
    { value: "hi" },
    { apiKeyId: "key-a", sessionId: "s1" }
  );

  const stored = skillExecutor.getExecution(execution.id);
  assert.deepEqual(stored?.input, { value: "hi" });
  assert.deepEqual(stored?.output, { echoed: "hi" });
});

test("skill_executions drops rows older than the retention age on the next execution", async () => {
  const skill = await registerEchoSkill();
  skillExecutor.registerHandler("echo-handler", async () => ({ echoed: "ok" }));
  const db = coreDb.getDbInstance();
  const old = new Date(Date.now() - 400 * 24 * 3600 * 1000).toISOString();
  db.prepare(
    `INSERT INTO skill_executions (id, skill_id, api_key_id, input, status, created_at)
     VALUES ('old-row', ?, 'key-a', '{}', 'success', ?)`
  ).run(skill.id, old);

  await skillExecutor.execute("echo@1.0.0", {}, { apiKeyId: "key-a" });

  assert.equal(skillExecutor.getExecution("old-row"), undefined);
  assert.equal(skillExecutor.countExecutions("key-a"), 1);
});

test("skill_executions keeps only the newest rows once over the row cap", async () => {
  const skill = await registerEchoSkill();
  skillExecutor.registerHandler("echo-handler", async () => ({ echoed: "ok" }));
  const cap = 10_000; // SKILL_EXECUTION_MAX_ROWS in executor.ts

  const db = coreDb.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO skill_executions (id, skill_id, api_key_id, input, status, created_at)
     VALUES (?, ?, 'key-a', '{}', 'success', ?)`
  );
  const base = Date.now() - 3600 * 1000;
  db.transaction(() => {
    for (let i = 0; i < cap + 50; i++) {
      insert.run(`seed-${i}`, skill.id, new Date(base + i * 10).toISOString());
    }
  })();

  const fresh = await skillExecutor.execute("echo@1.0.0", {}, { apiKeyId: "key-a" });

  assert.equal(skillExecutor.countExecutions("key-a"), cap);
  assert.ok(skillExecutor.getExecution(fresh.id), "newest row survives");
  assert.equal(skillExecutor.getExecution("seed-0"), undefined, "oldest row is gone");
  assert.ok(skillExecutor.getExecution(`seed-${cap + 49}`), "newest seed survives");
});
