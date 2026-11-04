import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { unitDiagnosticReference } from "../../../scripts/ci/unit-diagnostics.mjs";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";

const invocationId = "33333333-3333-4333-8333-333333333333";
const candidateSha = "1".repeat(40);
const fixture = new URL("../../fixtures/gate-receipt-cli.mjs", import.meta.url).pathname;
const packPhase = {
  schemaVersion: 1,
  laneId: "pack-artifact",
  phaseId: "build-cli",
  mode: "independent-policy",
  budgetMs: 20000,
  preparationBudgetMs: 2400000,
  invocationId,
  candidateSha,
  runId: null,
  runAttempt: null,
  workflowSha: null,
};

async function observe(receiptIdentity, exit = 0) {
  const directory = mkdtempSync(join(tmpdir(), "gate-receipt-identity-"));
  try {
    const result = await runGateProcess(process.execPath, [fixture, String(exit)], {
      cwd: directory,
      env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8" },
      logPath: join(directory, `${invocationId}.log`),
      timeout: 20000,
      receiptIdentity,
    });
    // Only the structured receipt is read. The fixture is silent; no log is read or hashed.
    const persisted = JSON.parse(readFileSync(result.receiptPath, "utf8"));
    assert.equal(persisted.bytes, 0);
    assert.deepEqual(persisted, result.receipt);
    return { result, persisted };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("canonical command receipts persist their invocation identity", async () => {
  const { result, persisted } = await observe({ invocationId });
  assert.equal(result.code, 0);
  assert.equal(persisted.invocationId, invocationId);
});

test("Next producer identity is persisted separately with the command result", async () => {
  const producer = { ...packPhase, phaseId: "build-next" };
  const { result, persisted } = await observe({ invocationId, packPhase: producer });
  assert.equal(result.code, 0);
  assert.deepEqual(persisted.packPhase, producer);
  assert.equal(persisted.invocationId, invocationId);
});

test("pack phase identity is persisted exactly with the command result", async () => {
  const { result, persisted } = await observe({ invocationId, packPhase });
  assert.equal(result.code, 0);
  assert.deepEqual(persisted.packPhase, packPhase);
  assert.equal(persisted.invocationId, invocationId);
});

for (const checkoutSha of [candidateSha, null]) {
  test(`unit diagnostic references preserve ${checkoutSha ? "known" : "unknown"} checkout identity`, async () => {
    const unitDiagnostics = unitDiagnosticReference(
      ["run", "test:unit:ci:shard"],
      invocationId,
      checkoutSha
    );
    const { persisted } = await observe({ invocationId, unitDiagnostics });
    assert.deepEqual(persisted.unitDiagnostics, unitDiagnostics);
    assert.equal(persisted.unitDiagnostics.evidenceState, "UNVALIDATED");
  });
}

test("existing callers retain their receipt without invented identity", async () => {
  const { result, persisted } = await observe(undefined);
  assert.equal(result.code, 0);
  for (const key of ["invocationId", "packPhase", "unitDiagnostics"]) {
    assert.equal(Object.hasOwn(persisted, key), false);
  }
});

test("identity metadata cannot turn the real failing exit into success", async () => {
  const { result, persisted } = await observe({ invocationId, packPhase }, 3);
  assert.equal(result.code, 3);
  assert.equal(persisted.exitCode, 3);
  assert.equal(persisted.outcome, "FAIL");
});

test("metadata is snapshotted before the child runs", async () => {
  const mutable = { invocationId, packPhase: { ...packPhase } };
  const pending = observe(mutable);
  mutable.packPhase.candidateSha = "2".repeat(40);
  const { persisted } = await pending;
  assert.equal(persisted.packPhase.candidateSha, candidateSha);
});

const invalidIdentities = [
  ...[
    "outcome",
    "exitCode",
    "durationMs",
    "startedAt",
    "completedAt",
    "bytes",
    "signal",
    "logPath",
  ].map((key) => ["reserved " + key, { invocationId, [key]: "forged" }]),
  ["non-object identity", []],
  ["invalid invocation", { invocationId: "invalid" }],
  ["unknown nested pack field", { invocationId, packPhase: { ...packPhase, rawOutput: "forged" } }],
  [
    "different nested invocation",
    {
      invocationId,
      packPhase: { ...packPhase, invocationId: "44444444-4444-4444-8444-444444444444" },
    },
  ],
  [
    "unknown nested unit field",
    {
      invocationId,
      unitDiagnostics: {
        ...unitDiagnosticReference(["run", "test:unit:ci:shard"], invocationId, candidateSha),
        error: "forged",
      },
    },
  ],
];

for (const [name, receiptIdentity] of invalidIdentities) {
  test(`rejects ${name} before creating command evidence`, async () => {
    const directory = mkdtempSync(join(tmpdir(), "gate-receipt-invalid-"));
    const logPath = join(directory, "unstarted.log");
    try {
      await assert.rejects(
        runGateProcess(process.execPath, [fixture, "0"], {
          cwd: directory,
          env: { PATH: "/usr/bin:/bin" },
          logPath,
          timeout: 20000,
          receiptIdentity,
        }),
        /Invalid gate receipt identity/
      );
      assert.equal(existsSync(logPath), false);
      assert.equal(existsSync(`${logPath}.json`), false);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
}

test("identity getters are rejected without executing them", async () => {
  let getterCalls = 0;
  const receiptIdentity = {};
  Object.defineProperty(receiptIdentity, "invocationId", {
    enumerable: true,
    get() {
      getterCalls++;
      return invocationId;
    },
  });
  await assert.rejects(observe(receiptIdentity), /Invalid gate receipt identity/);
  assert.equal(getterCalls, 0);
});

test("observer passes identity into the producer and uses its canonical receipt", () => {
  const source = readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  assert.match(source, /runGateProcess\(cmd, cmdArgs, \{\s*receiptIdentity,/);
  assert.match(
    source,
    /const receiptIdentity = \{\s*invocationId,\s*\.\.\.\(packPhase \? \{ packPhase \} : \{\}\),\s*\.\.\.\(unitDiagnostics \? \{ unitDiagnostics \} : \{\}\),\s*\.\.\.\(integrationDiagnostics \? \{ integrationDiagnostics \} : \{\}\),\s*\};/
  );
  assert.match(
    source,
    /commandReceipts\.push\(\{\s*command: label,\s*receiptPath: result\.receiptPath,\s*\.\.\.result\.receipt,\s*\}\);/
  );
});
