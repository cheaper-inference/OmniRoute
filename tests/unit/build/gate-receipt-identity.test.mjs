import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";

const invocationId = "33333333-3333-4333-8333-333333333333";
const candidateSha = "1".repeat(40);
const packPhase = {
  schemaVersion: 1,
  laneId: "pack-artifact",
  phaseId: "build-cli",
  mode: "shared",
  budgetMs: 5000,
  preparationBudgetMs: 5000,
  invocationId,
  candidateSha,
  runId: null,
  runAttempt: null,
  workflowSha: null,
};

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "gate-receipt-identity-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return {
    cwd: directory,
    env: { PATH: process.env.PATH, LANG: "C.UTF-8" },
    logPath: join(directory, `${invocationId}.log`),
    timeout: 5000,
  };
}

for (const exit of [0, 42]) {
  test(`a canonical receipt preserves identity and real exit ${exit}`, async (t) => {
    const result = await runGateProcess(process.execPath, ["-e", `process.exit(${exit})`], {
      ...fixture(t),
      receiptIdentity: { invocationId, packPhase },
    });
    const persisted = JSON.parse(readFileSync(result.receiptPath, "utf8"));
    assert.equal(result.code, exit);
    assert.equal(persisted.exitCode, exit);
    assert.equal(persisted.outcome, exit === 0 ? "PASS" : "FAIL");
    assert.equal(persisted.invocationId, invocationId);
    assert.deepEqual(persisted.packPhase, packPhase);
    assert.deepEqual(persisted, result.receipt);
  });
}

test("receipt identity is snapshotted before the child runs", async (t) => {
  const mutable = { invocationId, packPhase: { ...packPhase } };
  const pending = runGateProcess(process.execPath, ["-e", ""], {
    ...fixture(t),
    receiptIdentity: mutable,
  });
  mutable.packPhase.candidateSha = "2".repeat(40);
  mutable.invocationId = "44444444-4444-4444-8444-444444444444";
  const result = await pending;
  assert.equal(result.receipt.invocationId, invocationId);
  assert.deepEqual(result.receipt.packPhase, packPhase);
});

test("legacy callers receive no invented identity", async (t) => {
  const result = await runGateProcess(process.execPath, ["-e", ""], fixture(t));
  assert.equal(result.code, 0);
  assert.equal(Object.hasOwn(result.receipt, "invocationId"), false);
  assert.equal(Object.hasOwn(result.receipt, "packPhase"), false);
});

for (const [name, receiptIdentity] of [
  ["invalid UUID", { invocationId: "invalid" }],
  ["reserved result", { invocationId, outcome: "PASS" }],
  [
    "unbound nested UUID",
    {
      invocationId,
      packPhase: { ...packPhase, invocationId: "44444444-4444-4444-8444-444444444444" },
    },
  ],
  ["partial hosted identity", { invocationId, packPhase: { ...packPhase, runId: "123" } }],
  ["unknown phase payload", { invocationId, packPhase: { ...packPhase, rawOutput: "forged" } }],
  ["invalid candidate SHA", { invocationId, packPhase: { ...packPhase, candidateSha: "HEAD" } }],
  ["inherited identity", Object.assign(Object.create({ inherited: true }), { invocationId })],
  ["symbol metadata", { invocationId, [Symbol("unexpected")]: "forged" }],
  [
    "budget different from the command",
    { invocationId, packPhase: { ...packPhase, budgetMs: 4000 } },
  ],
]) {
  test(`rejects ${name} before creating command evidence`, async (t) => {
    const options = fixture(t);
    const marker = join(options.cwd, "unexpected-child.txt");
    await assert.rejects(
      runGateProcess(
        process.execPath,
        ["-e", "require('node:fs').writeFileSync(process.argv[1], 'unexpected')", marker],
        { ...options, receiptIdentity }
      ),
      /Invalid gate receipt identity/
    );
    assert.equal(existsSync(options.logPath), false);
    assert.equal(existsSync(`${options.logPath}.json`), false);
    assert.equal(existsSync(marker), false);
  });
}

test("metadata getters cannot run while identity is validated", async (t) => {
  let calls = 0;
  const receiptIdentity = {};
  Object.defineProperty(receiptIdentity, "invocationId", {
    enumerable: true,
    get() {
      calls++;
      return invocationId;
    },
  });
  await assert.rejects(
    runGateProcess(process.execPath, ["-e", ""], { ...fixture(t), receiptIdentity }),
    /Invalid gate receipt identity/
  );
  assert.equal(calls, 0);
});
