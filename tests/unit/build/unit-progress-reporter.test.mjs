import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createUnitProgressReporter } from "../../../scripts/ci/unit-progress-reporter.mjs";

const reporter = fileURLToPath(
  new URL("../../../scripts/ci/unit-progress-reporter.mjs", import.meta.url)
);
const prefix = "[unit-progress] ";

async function collect(events, options = {}) {
  const records = [];
  const output = [];
  const sink = { failed: false, write: (value) => records.push(value), close() {} };
  async function* source() {
    yield* events;
  }
  for await (const line of createUnitProgressReporter(source(), {
    cwd: resolve("."),
    environment: { OMNIROUTE_UNIT_PHASE: "primary", TEST_SHARD: "2/4" },
    sink,
    ...options,
  }))
    output.push(JSON.parse(line.slice(prefix.length)));
  return { records, output };
}

function event(type, file, extra = {}) {
  return { type, data: { nesting: 0, name: file, file: resolve(file), ...extra } };
}

test("keeps the active file visible between its start and completion", async () => {
  const file = "tests/unit/pending.test.mjs";
  const frames = [];
  async function* source() {
    yield event("test:dequeue", file);
    await new Promise((done) => setTimeout(done, 150));
    yield event("test:complete", file, { details: { passed: true } });
  }
  for await (const line of createUnitProgressReporter(source(), {
    heartbeatMs: 20,
    environment: { OMNIROUTE_UNIT_PHASE: "primary", TEST_SHARD: "2/4" },
    sink: { failed: false, write() {}, close() {} },
  })) {
    frames.push(JSON.parse(line.slice(prefix.length)));
  }
  assert.ok(
    frames.some(
      (frame) =>
        frame.event === "heartbeat" && frame.activeFiles.some((active) => active.file === file)
    )
  );
  assert.equal(frames.at(-1).event, "phase-end");
  assert.equal(frames.at(-1).completedFiles, 1);
  assert.deepEqual(frames.at(-1).activeFiles, []);
});

test("records isolated file boundaries without test descriptions, output or errors", async () => {
  const file = "tests/unit/example.test.mjs";
  const result = await collect([
    event("test:dequeue", file),
    event("test:dequeue", file, { entryFile: resolve(file), name: "PRIVATE_TEST_DESCRIPTION" }),
    { type: "test:stdout", data: { message: "PRIVATE_TEST_OUTPUT" } },
    event("test:complete", file, {
      details: { passed: false, error: { message: "PRIVATE_ERROR" } },
    }),
  ]);
  assert.deepEqual(
    result.records.map((record) => record.event),
    ["phase-start", "file-start", "file-end", "phase-end"]
  );
  assert.equal(result.records[2].passed, false);
  assert.equal(result.output.at(-1).startedFiles, 1);
  assert.equal(result.output.at(-1).completedFiles, 1);
  assert.deepEqual(result.output.at(-1).activeFiles, []);
  assert.doesNotMatch(
    JSON.stringify(result),
    /PRIVATE_TEST_DESCRIPTION|PRIVATE_TEST_OUTPUT|PRIVATE_ERROR/
  );
});

test("does not accept child test names or paths outside tests/unit as file identities", async () => {
  const result = await collect(
    [
      event("test:dequeue", "tests/unit/child.test.mjs", {
        entryFile: resolve("tests/unit/entry.test.mjs"),
      }),
      event("test:dequeue", "../outside.test.mjs"),
      event("test:dequeue", "tests/unit/bad\nname.test.mjs"),
      event("test:dequeue", "tests/unit/actual.test.mjs", { name: "a test name" }),
    ],
    {
      environment: {
        OMNIROUTE_UNIT_PHASE: "PRIVATE_PHASE",
        GITHUB_SHA: "PRIVATE_SHA",
        TEST_SHARD: "PRIVATE_SHARD",
      },
    }
  );
  assert.equal(result.records.length, 2);
  assert.equal(result.output[0].phase, "unknown");
  assert.equal(result.output[0].sha, null);
  assert.equal(result.output[0].shard, null);
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE_|outside|bad/);
});

function runFixture(t, { enabled, fail = false, blockedArtifact = false }) {
  const root = mkdtempSync(join(tmpdir(), "unit-progress-runner-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "tests/unit"), { recursive: true });
  writeFileSync(
    join(root, "tests/unit/example.test.mjs"),
    `import test from "node:test"; import assert from "node:assert/strict"; test("PRIVATE_TEST_NAME", () => assert.equal(${fail}, false));\n`
  );
  if (blockedArtifact)
    writeFileSync(join(root, ".artifacts"), "fixture prevents artifact directory creation");
  const args = ["--test", "--test-force-exit", "--test-concurrency=2", "--test-reporter=spec"];
  if (enabled)
    args.push(
      `--test-reporter=${reporter}`,
      "--test-reporter-destination=stdout",
      "--test-reporter-destination=stderr"
    );
  args.push("tests/unit/example.test.mjs");
  const environment = {
    OMNIROUTE_UNIT_PHASE: "primary",
    TEST_SHARD: "2/4",
    PATH: process.env.PATH,
  };
  if (process.env.SystemRoot) environment.SystemRoot = process.env.SystemRoot;
  return spawnSync(process.execPath, args, {
    cwd: root,
    env: environment,
    encoding: "utf8",
    timeout: 5000,
  });
}

for (const fail of [false, true]) {
  test(`keeps the real Node test runner exit ${fail ? 1 : 0}`, (t) => {
    const baseline = runFixture(t, { enabled: false, fail });
    const observed = runFixture(t, { enabled: true, fail });
    assert.equal(baseline.status, fail ? 1 : 0, baseline.stderr);
    assert.equal(observed.status, baseline.status, observed.stderr);
    const frames = observed.stderr
      .split("\n")
      .filter((line) => line.startsWith(prefix))
      .map((line) => JSON.parse(line.slice(prefix.length)));
    assert.equal(frames.at(-1).event, "phase-end");
    assert.equal(frames.at(-1).startedFiles, 1);
    assert.equal(frames.at(-1).completedFiles, 1);
    assert.doesNotMatch(observed.stderr, /PRIVATE_TEST_NAME/);
  });
}

test("reports an artifact write gap without replacing the test outcome", (t) => {
  const observed = runFixture(t, { enabled: true, blockedArtifact: true });
  assert.equal(observed.status, 0, observed.stderr);
  const frames = observed.stderr
    .split("\n")
    .filter((line) => line.startsWith(prefix))
    .map((line) => JSON.parse(line.slice(prefix.length)));
  assert.equal(frames.at(-1).artifactWriteFailed, true);
  assert.equal(frames.at(-1).completedFiles, 1);
});
