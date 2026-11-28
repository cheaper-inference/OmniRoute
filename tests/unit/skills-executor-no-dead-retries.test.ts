import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-no-retries-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("SkillExecutor does not offer a retry setting it never honours", () => {
  assert.equal("setMaxRetries" in skillExecutor, false);
  assert.equal("maxRetries" in skillExecutor, false);
});

test("a failing handler runs exactly once", async () => {
  skillExecutor["handlers"].clear();
  let calls = 0;
  skillExecutor.registerHandler("flaky-handler", async () => {
    calls += 1;
    throw new Error("boom");
  });
  await skillRegistry.register({
    name: "flaky",
    version: "1.0.0",
    description: "always fails",
    schema: { input: { value: "string" }, output: { echoed: "string" } },
    handler: "flaky-handler",
    enabled: true,
    apiKeyId: "key-a",
  });
  const run = await skillExecutor.execute(
    "flaky@1.0.0",
    { value: "x" },
    { apiKeyId: "key-a", sessionId: "s-1" }
  );
  assert.equal(run.status, "error");
  assert.equal(calls, 1);
});
