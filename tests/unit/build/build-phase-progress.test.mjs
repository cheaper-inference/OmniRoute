import assert from "node:assert/strict";
import fs from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  buildProgressEnvironment,
  createBuildProgress,
} from "../../../scripts/build/buildPhaseProgress.mjs";
import { ensureStandaloneInput } from "../../../scripts/build/standaloneInput.mjs";

const invocationId = "00000000-0000-4000-8000-000000000001";
const candidateSha = "a".repeat(40);
const env = buildProgressEnvironment({ phaseId: "build-cli", invocationId, candidateSha });

function fixture(t) {
  const root = fs.mkdtempSync(join(tmpdir(), "build-progress-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const directory = join(root, "_artifacts", "release-green", "build-progress", invocationId);
  return {
    root,
    directory,
    writer: (role = "cli", options = {}) =>
      createBuildProgress({ projectRoot: root, role, env, ...options }),
    records: (role = "cli") =>
      fs
        .readdirSync(directory)
        .filter((name) => name.startsWith(`${role}-`) && name.endsWith(".json"))
        .sort()
        .map((name) => {
          const bytes = fs.readFileSync(join(directory, name));
          assert.ok(bytes.length <= 1024);
          return JSON.parse(bytes);
        }),
  };
}

test("only a bound preparation enables progress, with no extra phase fields copied", () => {
  assert.deepEqual(env, {
    OMNIROUTE_BUILD_PROGRESS: "1",
    OMNIROUTE_BUILD_INVOCATION_ID: invocationId,
    OMNIROUTE_BUILD_CANDIDATE_SHA: candidateSha,
  });
  assert.deepEqual(
    buildProgressEnvironment({ phaseId: "build-next", invocationId, candidateSha }),
    env
  );
  for (const phase of [
    null,
    { phaseId: "stamp-build-sha", invocationId, candidateSha },
    { phaseId: "validate-pack-artifact", invocationId, candidateSha },
    { phaseId: "build-cli", invocationId: "../other", candidateSha },
    { phaseId: "build-cli", invocationId, candidateSha: "unknown" },
  ]) {
    assert.deepEqual(buildProgressEnvironment(phase), {});
  }
  assert.deepEqual(
    buildProgressEnvironment({
      phaseId: "build-cli",
      invocationId,
      candidateSha,
      token: "fixture",
    }),
    env
  );
});

test("ordinary builds preserve results and errors without creating output", async (t) => {
  const f = fixture(t);
  const writer = f.writer("cli", { env: {} });
  const value = { retained: true };
  const failure = new Error("private fixture message");
  assert.equal(
    writer.runSync("pack-assembly", () => value),
    value
  );
  await assert.rejects(
    writer.runAsync("cli", async () => {
      throw failure;
    }),
    (error) => error === failure
  );
  assert.deepEqual(writer.status(), { state: "DISABLED", written: 0 });
  assert.equal(fs.existsSync(join(f.root, "_artifacts")), false);
});

test("invalid opt-in binding and unknown roles create no filesystem output", (t) => {
  const f = fixture(t);
  for (const options of [
    { env: { ...env, OMNIROUTE_BUILD_INVOCATION_ID: "../escape" } },
    { env: { ...env, OMNIROUTE_BUILD_CANDIDATE_SHA: "missing" } },
    { role: "other" },
  ]) {
    const writer = f.writer("cli", options);
    assert.equal(
      writer.runSync("cli", () => 7),
      7
    );
    assert.equal(writer.status().state, "INVALID_BINDING");
  }
  assert.equal(fs.existsSync(join(f.root, "_artifacts")), false);
});

test("local fallback runs once and records built mode without reading the artifact", (t) => {
  const f = fixture(t);
  const writer = f.writer();
  const serverPath = join(f.root, "server.js");
  let builds = 0;
  assert.equal(
    writer.runSync("next-input", () =>
      ensureStandaloneInput({
        serverPath,
        build: () => {
          builds++;
          fs.writeFileSync(serverPath, "// synthetic standalone\n");
        },
      })
    ),
    "built"
  );
  assert.equal(builds, 1);
  assert.deepEqual(
    f.records().map(({ phase, event, inputMode }) => ({ phase, event, inputMode })),
    [
      { phase: "next-input", event: "STARTED", inputMode: null },
      { phase: "next-input", event: "RETURNED", inputMode: "built" },
    ]
  );
});

test("next and CLI events share identity but cannot collide or claim acceptance", async (t) => {
  const f = fixture(t);
  const cli = f.writer();
  const next = f.writer("next");
  cli.record("cli", "STARTED");
  const value = { code: 7, message: "not retained", arbitrary: "not retained" };
  assert.equal(await next.runAsync("next-process", async () => value), value);
  cli.record("cli", "RETURNED");
  const records = [...f.records(), ...f.records("next")];
  for (const record of records) {
    assert.deepEqual(Object.keys(record).sort(), [
      "at",
      "candidateSha",
      "elapsedMs",
      "event",
      "evidenceState",
      "exitCode",
      "inputMode",
      "invocationId",
      "phase",
      "role",
      "schemaVersion",
      "sequence",
    ]);
    assert.equal(record.invocationId, invocationId);
    assert.equal(record.candidateSha, candidateSha);
    assert.equal(record.evidenceState, "UNVALIDATED");
    assert.ok(Number.isSafeInteger(record.elapsedMs) && record.elapsedMs >= 0);
  }
  assert.deepEqual(
    f.records("next").map((record) => record.exitCode),
    [null, 7]
  );
  assert.doesNotMatch(JSON.stringify(records), /not retained|PASSED|"PASS"/);
});

test("getters and payload fields are not inspected when a subprocess returns", async (t) => {
  const f = fixture(t);
  const writer = f.writer("next");
  let reads = 0;
  const value = Object.defineProperty({}, "code", {
    get() {
      reads++;
      return 0;
    },
  });
  assert.equal(await writer.runAsync("next-process", async () => value), value);
  assert.equal(reads, 0);
  assert.equal(f.records("next")[1].exitCode, null);
});

test("sync and async exceptions retain identity and produce no error text", async (t) => {
  const f = fixture(t);
  const writer = f.writer();
  const failure = new Error("DO_NOT_RETAIN_THIS_MESSAGE");
  let operations = 0;
  assert.throws(
    () =>
      writer.runSync("pack-assembly", () => {
        operations++;
        throw failure;
      }),
    (error) => error === failure
  );
  await assert.rejects(
    writer.runAsync("cli-sidecars", async () => {
      operations++;
      throw failure;
    }),
    (error) => error === failure
  );
  assert.equal(operations, 2);
  assert.deepEqual(
    f.records().map((record) => record.event),
    ["STARTED", "THREW", "STARTED", "THREW"]
  );
  assert.doesNotMatch(JSON.stringify(f.records()), /DO_NOT_RETAIN|stack|message/);
});

test("an unfinished operation has STARTED without a returned event", async (t) => {
  const f = fixture(t);
  const writer = f.writer("next");
  let finish;
  const running = writer.runAsync(
    "next-process",
    () =>
      new Promise((resolve) => {
        finish = resolve;
      })
  );
  assert.deepEqual(
    f.records("next").map((record) => record.event),
    ["STARTED"]
  );
  finish({ code: 0 });
  await running;
  assert.deepEqual(
    f.records("next").map((record) => record.event),
    ["STARTED", "RETURNED"]
  );
});

test("diagnostic write failure neither repeats work nor replaces its result or exception", (t) => {
  const f = fixture(t);
  const writer = f.writer("cli", {
    fsImpl: {
      ...fs,
      writeFileSync() {
        throw new Error("synthetic storage failure");
      },
    },
  });
  let operations = 0;
  const value = {};
  const failure = new Error("original build failure");
  assert.equal(
    writer.runSync("pack-assembly", () => {
      operations++;
      return value;
    }),
    value
  );
  assert.throws(
    () =>
      writer.runSync("cli-sidecars", () => {
        operations++;
        throw failure;
      }),
    (error) => error === failure
  );
  assert.equal(operations, 2);
  assert.deepEqual(writer.status(), { state: "WRITE_FAILED", written: 0 });
});

test("event count is bounded and a limit cannot prevent the original operation", (t) => {
  const f = fixture(t);
  const writer = f.writer();
  for (let index = 0; index < 21; index++) {
    writer.record("cli", "STARTED");
  }
  assert.equal(f.records().length, 16);
  assert.equal(
    writer.runSync("cli-sidecars", () => 23),
    23
  );
  assert.deepEqual(writer.status(), { state: "LIMIT_REACHED", written: 16 });
});

test("unknown phases and event labels disable diagnostics without bypassing work", (t) => {
  const f = fixture(t);
  for (const [phase, event] of [
    ["unknown", "STARTED"],
    ["cli", "PASS"],
  ]) {
    const writer = f.writer();
    writer.record(phase, event);
    assert.equal(
      writer.runSync("cli", () => 1),
      1
    );
    assert.equal(writer.status().state, "INVALID_EVENT");
  }
  assert.equal(fs.existsSync(join(f.root, "_artifacts")), false);
});

test("an existing event from the same binding is never overwritten", (t) => {
  const f = fixture(t);
  f.writer().record("cli", "STARTED");
  const file = join(f.directory, "cli-00.json");
  const before = fs.readFileSync(file);
  const duplicate = f.writer();
  assert.equal(
    duplicate.runSync("cli", () => 1),
    1
  );
  assert.deepEqual(fs.readFileSync(file), before);
  assert.equal(duplicate.status().state, "WRITE_FAILED");
});

test("symlinked artifact parents do not receive diagnostic files", (t) => {
  const f = fixture(t);
  const outside = fs.mkdtempSync(join(tmpdir(), "build-progress-outside-"));
  t.after(() => fs.rmSync(outside, { recursive: true, force: true }));
  fs.symlinkSync(outside, join(f.root, "_artifacts"), "junction");
  const writer = f.writer();
  assert.equal(
    writer.runSync("cli", () => 9),
    9
  );
  assert.equal(writer.status().state, "WRITE_FAILED");
  assert.deepEqual(fs.readdirSync(outside), []);
});

test("exclusive event creation leaves an existing file symlink and its target unchanged", (t) => {
  const f = fixture(t);
  const writer = f.writer();
  writer.record("cli", "STARTED");
  const target = join(f.root, "sentinel.txt");
  fs.writeFileSync(target, "synthetic sentinel\n");
  fs.symlinkSync(target, join(f.directory, "cli-01.json"));
  writer.record("cli", "RETURNED");
  assert.equal(fs.readFileSync(target, "utf8"), "synthetic sentinel\n");
  assert.equal(writer.status().state, "WRITE_FAILED");
});
