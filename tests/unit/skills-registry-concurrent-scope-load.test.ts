import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-scope-load-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");

function dropMemoryCache() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
  skillRegistry.invalidateCache();
}

async function seed(apiKeyId: string, name: string) {
  await skillRegistry.register({
    name,
    version: "1.0.0",
    description: name,
    schema: { input: {}, output: {} },
    handler: `${name}-handler`,
    apiKeyId,
  });
}

test.beforeEach(async () => {
  dropMemoryCache();
  await seed("key-a", "skill-a");
  await seed("key-b", "skill-b");
  // A cold start: rows are in the database, nothing is in the memory cache.
  dropMemoryCache();
});

test.after(() => {
  dropMemoryCache();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("concurrent cold loads for two keys give each key its own skills", async () => {
  await Promise.all([
    skillRegistry.loadFromDatabase("key-a"),
    skillRegistry.loadFromDatabase("key-b"),
  ]);

  assert.deepEqual(
    skillRegistry.list("key-a").map((skill) => skill.name),
    ["skill-a"]
  );
  assert.deepEqual(
    skillRegistry.list("key-b").map((skill) => skill.name),
    ["skill-b"]
  );
});

test("three concurrent cold loads for three scopes all finish loaded", async () => {
  await seed("key-c", "skill-c");
  dropMemoryCache();

  await Promise.all([
    skillRegistry.loadFromDatabase("key-a"),
    skillRegistry.loadFromDatabase("key-b"),
    skillRegistry.loadFromDatabase("key-c"),
  ]);

  assert.deepEqual(
    ["key-a", "key-b", "key-c"].map((key) => skillRegistry.list(key).map((skill) => skill.name)),
    [["skill-a"], ["skill-b"], ["skill-c"]]
  );
});

test("a second load for an already loaded scope does not reload the database", async () => {
  await skillRegistry.loadFromDatabase("key-a");
  skillRegistry["registeredSkills"].clear();

  await skillRegistry.loadFromDatabase("key-a");

  assert.equal(skillRegistry.list("key-a").length, 0, "fresh cache is trusted until the TTL ends");
});
