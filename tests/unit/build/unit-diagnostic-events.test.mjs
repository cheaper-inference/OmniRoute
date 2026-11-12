import test from "node:test";
import assert from "node:assert/strict";
import { createUnitProgressReporter } from "../../../scripts/ci/unit-progress-reporter.mjs";
import { unitDiagnosticReference } from "../../../scripts/ci/unit-diagnostics.mjs";

const cwd = "/fixture";
const file = "tests/unit/example.test.mjs";
const id = "d9c91583-bf1b-4b66-a441-79f3c1fb9f53";
const sha = "a".repeat(40);
const counts = {
  tests: 2,
  suites: 0,
  passed: 1,
  failed: 1,
  cancelled: 0,
  skipped: 0,
  todo: 0,
  topLevel: 2,
};
const failure = (extra = {}) => ({
  type: "test:complete",
  data: {
    entryFile: `${cwd}/${file}`,
    file: `${cwd}/${file}`,
    name: "PRIVATE_DESCRIPTION",
    line: 14,
    column: 3,
    nesting: 0,
    testNumber: 1,
    details: {
      passed: false,
      duration_ms: 2,
      error: {
        code: "ERR_TEST_FAILURE",
        failureType: "testCodeFailure",
        cause: {
          code: "ERR_ASSERTION",
          operator: "strictEqual",
          actual: "PRIVATE_ACTUAL",
          expected: "PRIVATE_EXPECTED",
          message: "PRIVATE_MESSAGE",
          stack: "PRIVATE_STACK",
        },
      },
    },
    ...extra,
  },
});
const summary = (extra = {}) => ({
  type: "test:summary",
  data: { counts, success: false, ...extra },
});

async function collect(events, options = {}) {
  const records = [];
  async function* source() {
    yield* events;
  }
  for await (const ignored of createUnitProgressReporter(source(), {
    cwd,
    environment: {
      OMNIROUTE_UNIT_PHASE: "primary",
      TEST_SHARD: "5/12",
      OMNIROUTE_UNIT_INVOCATION_ID: id,
      OMNIROUTE_UNIT_CHECKOUT_SHA: sha,
    },
    sink: {
      failed: false,
      write(value) {
        records.push(value);
      },
      close() {},
    },
    ...options,
  }))
    void ignored;
  return records;
}

test("records source location and allowlisted assertion metadata without payloads", async () => {
  const records = await collect([failure(), summary()]);
  const observed = records.find((r) => r.event === "test-failure");
  assert.ok(observed);
  assert.equal(observed.file, file);
  assert.equal(observed.sourceFile, file);
  assert.equal(observed.line, 14);
  assert.equal(observed.column, 3);
  assert.equal(observed.failureType, "testCodeFailure");
  assert.equal(observed.errorCode, "ERR_ASSERTION");
  assert.equal(observed.assertionOperator, "strictEqual");
  assert.equal(observed.disposition, "FAIL");
  assert.equal(observed.role, "test");
  assert.equal(observed.invocationId, id);
  assert.equal(observed.checkoutSha, sha);
  assert.doesNotMatch(JSON.stringify(records), /PRIVATE_/);
});

test("records completion failures once, never repeats the declaration-ordered twin", async () => {
  const complete = failure();
  const records = await collect([complete, { ...complete, type: "test:fail" }, summary()]);
  assert.equal(records.filter((r) => r.event === "test-failure").length, 1);
  assert.equal(records.at(-1).diagnostics.failureEvents, 1);
});

test("keeps TODO and parent aggregation distinct from a direct failing assertion", async () => {
  const todo = failure({ todo: "PRIVATE_REASON" });
  const parent = failure({
    details: {
      passed: false,
      type: "suite",
      error: {
        code: "ERR_TEST_FAILURE",
        failureType: "subtestsFailed",
        message: "PRIVATE_PARENT",
      },
    },
  });
  const records = await collect([todo, parent, summary()]);
  const failures = records.filter((r) => r.event === "test-failure");
  assert.equal(failures[0].disposition, "TODO");
  assert.equal(failures[1].role, "aggregate");
  assert.equal(failures[1].assertionOperator, null);
  assert.doesNotMatch(JSON.stringify(records), /PRIVATE_/);
});

test("only accepts the cumulative summary, keeping observed failure and completion separate", async () => {
  const records = await collect([failure(), summary({ file: `${cwd}/${file}` }), summary()]);
  const diagnostic = records.at(-1).diagnostics;
  assert.equal(diagnostic.evidenceState, "COMPLETE");
  assert.deepEqual(diagnostic.summary, { counts, success: false });
  assert.equal(diagnostic.failureEvents, 1);
});

test("missing and malformed summaries remain incomplete", async () => {
  for (const events of [[failure()], [summary({ counts: { ...counts, failed: true } })]]) {
    const records = await collect(events);
    assert.equal(records.at(-1).diagnostics.evidenceState, "INCOMPLETE");
    assert.equal(records.at(-1).diagnostics.summary, null);
  }
});

test("caps retained failures while counting omissions explicitly", async () => {
  const records = await collect([...Array.from({ length: 205 }, () => failure()), summary()]);
  assert.equal(records.filter((r) => r.event === "test-failure").length, 200);
  assert.equal(records.at(-1).diagnostics.failureEvents, 205);
  assert.equal(records.at(-1).diagnostics.omittedFailures, 5);
  assert.equal(records.at(-1).diagnostics.evidenceState, "INCOMPLETE");
});

test("invalid identity values and unsafe source paths are not serialized", async () => {
  const records = await collect([failure({ file: "/outside/PRIVATE_FILE.test.mjs" }), summary()], {
    environment: {
      OMNIROUTE_UNIT_PHASE: "primary",
      TEST_SHARD: "5/12",
      OMNIROUTE_UNIT_INVOCATION_ID: "PRIVATE_TOKEN",
      OMNIROUTE_UNIT_CHECKOUT_SHA: "PRIVATE_SHA",
    },
  });
  const failureRecord = records.find((r) => r.event === "test-failure");
  assert.equal(failureRecord.file, file);
  assert.equal(failureRecord.sourceFile, null);
  assert.equal(failureRecord.line, null);
  assert.equal(failureRecord.invocationId, null);
  assert.equal(failureRecord.checkoutSha, null);
  assert.doesNotMatch(JSON.stringify(records), /PRIVATE_/);
});

test("never evaluates error getters or serializes unknown error codes", async () => {
  let called = false;
  const error = { code: "PRIVATE_CODE", failureType: "PRIVATE_TYPE" };
  Object.defineProperty(error, "cause", {
    get() {
      called = true;
      throw new Error("PRIVATE_GETTER");
    },
  });
  const records = await collect([failure({ details: { passed: false, error } }), summary()]);
  assert.equal(called, false);
  const observed = records.find((r) => r.event === "test-failure");
  assert.equal(observed.errorCode, "UNCLASSIFIED");
  assert.equal(observed.failureType, "UNCLASSIFIED");
  assert.doesNotMatch(JSON.stringify(records), /PRIVATE_/);
});

test("unfinished file work and artifact errors cannot yield complete diagnostics", async () => {
  const events = [
    { type: "test:dequeue", data: { name: file, file: `${cwd}/${file}`, nesting: 0 } },
    summary(),
  ];
  const records = await collect(events);
  assert.equal(records.at(-1).diagnostics.evidenceState, "INCOMPLETE");
  const broken = await collect([summary()], { sink: { failed: true, write() {}, close() {} } });
  // The separate reporter stream retains the gap; no test exit is assigned here.
  assert.equal(broken.length, 0);
});

test("observer references are exact-command lookups, never a substituted PASS verdict", () => {
  const result = unitDiagnosticReference(["run", "test:unit:ci:shard"], id, sha);
  assert.equal(result.evidenceState, "UNVALIDATED");
  assert.equal(result.memberPattern, `*-${id}-*.jsonl`);
  assert.equal(result.checkoutSha, sha);
  for (const args of [
    ["run", "test:unit:ci"],
    ["run", "test:vitest"],
    ["run", "test:unit:ci:shard", "--extra"],
  ]) {
    assert.equal(unitDiagnosticReference(args, id, sha), null);
  }
  const malformed = unitDiagnosticReference(
    ["run", "test:unit:ci:shard"],
    "PRIVATE_ID",
    "PRIVATE_SHA"
  );
  assert.equal(malformed.memberPattern, null);
  assert.equal(malformed.checkoutSha, null);
  assert.equal(malformed.evidenceState, "UNVALIDATED");
  assert.doesNotMatch(JSON.stringify(malformed), /PRIVATE_/);
});

test("stream interruption retains the failure record without inventing a terminal summary", async () => {
  const records = [];
  let closed = false;
  async function* interrupted() {
    yield failure();
    throw new Error("synthetic interruption");
  }
  await assert.rejects(async () => {
    for await (const line of createUnitProgressReporter(interrupted(), {
      cwd,
      environment: { OMNIROUTE_UNIT_PHASE: "primary", TEST_SHARD: "5/12" },
      sink: {
        failed: false,
        write(record) {
          records.push(record);
        },
        close() {
          closed = true;
        },
      },
    }))
      void line;
  }, /synthetic interruption/);
  assert.equal(closed, true);
  assert.equal(records.filter((record) => record.event === "test-failure").length, 1);
  assert.equal(
    records.some((record) => record.event === "phase-end"),
    false
  );
});

test("invalid source positions stay unknown rather than coercing a line number", async () => {
  const records = await collect([
    failure({ line: true, column: Infinity, nesting: -1 }),
    summary(),
  ]);
  const observed = records.find((record) => record.event === "test-failure");
  assert.equal(observed.line, null);
  assert.equal(observed.column, null);
  assert.equal(observed.nesting, null);
});
