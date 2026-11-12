import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  createIntegrationProgressReporter,
  createUnitProgressReporter,
} from "../../../scripts/ci/unit-progress-reporter.mjs";
import {
  integrationDiagnosticReference,
  integrationSourcePath,
  unitSourcePath,
} from "../../../scripts/ci/unit-diagnostics.mjs";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";

const cwd = "/fixture";
const file = "tests/integration/example.test.ts";
const id = "d9c91583-bf1b-4b66-a441-79f3c1fb9f53";
const sha = "a".repeat(40);
const environment = {
  OMNIROUTE_INTEGRATION_INVOCATION_ID: id,
  OMNIROUTE_INTEGRATION_CHECKOUT_SHA: sha,
  TEST_SHARD: "2/4",
};
const counts = {
  tests: 1,
  suites: 0,
  passed: 1,
  failed: 0,
  cancelled: 0,
  skipped: 0,
  todo: 0,
  topLevel: 1,
};
const event = (type, path = file, extra = {}) => ({
  type,
  data: { file: resolve(cwd, path), name: path, nesting: 0, ...extra },
});
const summary = () => ({ type: "test:summary", data: { counts, success: true } });

async function collect(events, options = {}, factory = createIntegrationProgressReporter) {
  const records = [],
    output = [];
  async function* source() {
    yield* events;
  }
  for await (const line of factory(source(), {
    cwd,
    environment,
    sink: { failed: false, write: (record) => records.push(record), close() {} },
    ...options,
  }))
    output.push(JSON.parse(line.slice(line.indexOf("{"))));
  return { records, output };
}

test("integration scope accepts exactly the two selected source-glob shapes", () => {
  for (const path of [file, "tests/integration/combo-matrix/example.test.ts"]) {
    assert.equal(integrationSourcePath(path, cwd), path);
    assert.equal(unitSourcePath(path, cwd), null);
  }
  for (const path of [
    "tests/unit/example.test.ts",
    "tests/integration/services/example.test.ts",
    "tests/integration/combo-live/example.test.ts",
    "tests/integration/example.test.mjs",
    "../outside.test.ts",
    "tests/integration/../../private.test.ts",
    "tests/integration/bad\nname.test.ts",
  ])
    assert.equal(integrationSourcePath(path, cwd), null);
});

test("integration records binding and file boundaries without names, errors or stdout", async () => {
  const result = await collect([
    event("test:dequeue"),
    { type: "test:stdout", data: { message: "PRIVATE_STDOUT" } },
    event("test:complete", file, {
      entryFile: `${cwd}/${file}`,
      name: "PRIVATE_NAME",
      line: 12,
      column: 2,
      details: {
        passed: false,
        error: {
          code: "ERR_TEST_FAILURE",
          failureType: "testCodeFailure",
          cause: {
            code: "ERR_ASSERTION",
            operator: "strictEqual",
            message: "PRIVATE_MESSAGE",
            stack: "PRIVATE_STACK",
            actual: "PRIVATE_ACTUAL",
          },
        },
      },
    }),
    event("test:complete", file, { details: { passed: false } }),
    summary(),
  ]);
  const first = result.records[0];
  assert.equal(first.phase, "integration");
  assert.equal(first.invocationId, id);
  assert.equal(first.checkoutSha, sha);
  assert.equal(first.shard, "2/4");
  assert.equal(result.records.filter((r) => r.event === "file-start").length, 1);
  assert.equal(result.records.filter((r) => r.event === "file-end").length, 1);
  assert.equal(result.records.find((r) => r.assertionOperator)?.assertionOperator, "strictEqual");
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE_/);
});

test("unit producer keeps its unit-only namespace and ignores integration file boundaries", async () => {
  const result = await collect(
    [event("test:dequeue"), event("test:complete"), summary()],
    {
      environment: { OMNIROUTE_UNIT_PHASE: "primary", TEST_SHARD: "1/12" },
    },
    createUnitProgressReporter
  );
  assert.equal(result.records[0].phase, "primary");
  assert.equal(result.records[0].invocationId, null);
  assert.equal(result.records.filter((r) => /^file-/.test(r.event)).length, 0);
});

test("unfinished integration work stays incomplete even if a summary is received", async () => {
  const result = await collect([event("test:dequeue"), summary()]);
  assert.equal(result.records.at(-1).diagnostics.evidenceState, "INCOMPLETE");
  assert.deepEqual(
    result.records.at(-1).activeFiles.map((r) => r.file),
    [file]
  );
});

test("an integration heartbeat names the active file while its event stream is waiting", async () => {
  const records = [];
  async function* source() {
    yield event("test:dequeue");
    await new Promise((done) => setTimeout(done, 70));
    yield event("test:complete", file, { details: { passed: true } });
    yield summary();
  }
  for await (const ignored of createIntegrationProgressReporter(source(), {
    cwd,
    environment,
    heartbeatMs: 10,
    sink: { failed: false, write: (record) => records.push(record), close() {} },
  }))
    void ignored;
  assert.ok(
    records.some(
      (r) => r.event === "heartbeat" && r.activeFiles.some((entry) => entry.file === file)
    )
  );
  assert.equal(records.at(-1).completedFiles, 1);
});

test("diagnostic references remain scoped and unvalidated rather than candidate acceptance", () => {
  const ref = integrationDiagnosticReference(["run", "test:integration:ci"], id, sha);
  assert.equal(ref.directory, ".artifacts/integration-progress");
  assert.equal(ref.evidenceState, "UNVALIDATED");
  for (const args of [
    ["run", "test:integration"],
    ["run", "test:unit:ci:shard"],
    ["run", "test:integration:ci", "--partial"],
  ])
    assert.equal(integrationDiagnosticReference(args, id, sha), null);
});

test("gate receipts accept the integration binding without starting a child", async () => {
  const directory = mkdtempSync(join(tmpdir(), "integration-receipt-synthetic-"));
  try {
    const signal = AbortSignal.abort();
    const integrationDiagnostics = integrationDiagnosticReference(
      ["run", "test:integration:ci"],
      id,
      sha
    );
    const result = await runGateProcess("unused", [], {
      cwd: directory,
      logPath: join(directory, "synthetic-empty.txt"),
      signal,
      receiptIdentity: { invocationId: id, integrationDiagnostics },
    });
    assert.equal(result.receipt.outcome, "CANCELLED");
    assert.deepEqual(result.receipt.integrationDiagnostics, integrationDiagnostics);
    assert.equal(result.receipt.bytes, 0);
    await assert.rejects(
      () =>
        runGateProcess("unused", [], {
          cwd: directory,
          logPath: join(directory, "never-created.txt"),
          signal,
          receiptIdentity: {
            invocationId: id,
            integrationDiagnostics: {
              ...integrationDiagnostics,
              directory: ".artifacts/unit-progress",
            },
          },
        }),
      TypeError
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

const reporter = fileURLToPath(
  new URL("../../../scripts/ci/integration-progress-reporter.mjs", import.meta.url)
);
function fixture(enabled, fail) {
  const root = mkdtempSync(join(tmpdir(), "integration-progress-synthetic-"));
  try {
    // Keep the synthetic TypeScript module independent of a parent package scope.
    writeFileSync(join(root, "package.json"), JSON.stringify({ type: "module" }));
    mkdirSync(join(root, "tests/integration"), { recursive: true });
    writeFileSync(
      join(root, "tests/integration/example.test.ts"),
      `import test from "node:test";import assert from "node:assert/strict";test("PRIVATE_NAME",()=>assert.equal(${fail},false));\n`
    );
    const args = ["--test", "--test-force-exit", "--test-concurrency=1", "--test-reporter=spec"];
    if (enabled)
      args.push(
        `--test-reporter=${reporter}`,
        "--test-reporter-destination=stdout",
        "--test-reporter-destination=stderr"
      );
    args.push("tests/integration/example.test.ts");
    return spawnSync(process.execPath, args, {
      cwd: root,
      env: { PATH: "/usr/bin:/bin", ...environment },
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 1024 * 1024,
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
for (const fail of [false, true]) {
  test(`synthetic Node fixture keeps exit ${fail ? 1 : 0} with the integration reporter`, () => {
    const baseline = fixture(false, fail),
      observed = fixture(true, fail);
    assert.equal(baseline.status, fail ? 1 : 0);
    assert.equal(observed.status, baseline.status);
    const records = observed.stderr
      .split("\n")
      .filter((s) => s.startsWith("[integration-progress] "))
      .map((s) => JSON.parse(s.slice("[integration-progress] ".length)));
    assert.equal(records.at(-1).event, "phase-end");
    assert.equal(records.at(-1).completedFiles, 1);
    assert.equal(records.at(-1).diagnostics.evidenceState, "COMPLETE");
    assert.equal(records.at(-1).diagnostics.summary.success, !fail);
    assert.doesNotMatch(observed.stderr, /PRIVATE_NAME/);
  });
}
