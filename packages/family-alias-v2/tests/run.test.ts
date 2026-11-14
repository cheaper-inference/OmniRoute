import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { runCli } from "../src/cli.ts";
import { createSavedPlan, verifySavedPlan } from "../src/run.ts";

function plan() {
  return createSavedPlan({
    discoveryHash: "d".repeat(64),
    omniroute: {
      target: "omniroute",
      desiredGraphHash: "g".repeat(64),
      preconditionHash: "p".repeat(64),
      planHash: "o".repeat(64),
      creates: [],
      updates: [],
      deletes: [],
      conflicts: [],
    },
    cpa: null,
    now: new Date("2026-11-11T00:00:00Z"),
  });
}

test("default CLI command is plan and performs zero target mutations", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "family-alias-v2-"));
  const output = path.join(dir, "plan.json");
  let applies = 0;
  const code = await runCli(["plan", "--output", output], {
    async createPlan() { return plan(); },
    async applyPlan() { applies++; return {}; },
  });
  assert.equal(code, 0);
  assert.equal(applies, 0);
  assert.equal(verifySavedPlan(JSON.parse(await readFile(output, "utf8"))), true);
});

test("apply requires a valid saved plan artifact", async () => {
  await assert.rejects(
    runCli(["apply"], {
      async createPlan() { return plan(); },
      async applyPlan() { return {}; },
    }),
    /requires --plan/,
  );
});

test("tampered plan is refused before apply", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "family-alias-v2-"));
  const file = path.join(dir, "plan.json");
  const tampered = plan();
  tampered.discoveryHash = "changed";
  await writeFile(file, JSON.stringify(tampered), "utf8");
  let applies = 0;
  await assert.rejects(
    runCli(["apply", "--plan", file], {
      async createPlan() { return plan(); },
      async applyPlan() { applies++; return {}; },
    }),
    /tampered/,
  );
  assert.equal(applies, 0);
});
