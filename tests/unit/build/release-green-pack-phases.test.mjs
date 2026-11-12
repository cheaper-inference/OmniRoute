import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import * as observer from "../../../scripts/quality/validate-release-green.mjs";
import * as policy from "../../../scripts/build/pack-artifact-policy.ts";
import { ensureStandaloneInput } from "../../../scripts/build/standaloneInput.mjs";

const sha = "a".repeat(40);
const uuid = (index) => `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`;

function fixture(durations, fault = {}) {
  let elapsed = 0;
  const calls = [];
  return {
    calls,
    now: () => elapsed,
    runCommand: async (command, args, options) => {
      const index = calls.length;
      calls.push({ command, args, options });
      const timeout = durations[index] >= options.timeout;
      elapsed += timeout ? options.timeout : durations[index];
      const outcome = fault.index === index ? fault.outcome : timeout ? "TIMEOUT" : "PASS";
      return {
        code:
          fault.index === index && fault.code !== undefined
            ? fault.code
            : outcome === "PASS"
              ? 0
              : outcome === "TIMEOUT"
                ? 124
                : 1,
        out: "",
        invocationId: uuid(index + 1),
        receipt: fault.index === index && fault.missingReceipt ? undefined : { outcome },
      };
    },
  };
}

test("near-ceiling successful preparation leaves a complete independent policy budget", async () => {
  const fake = fixture([1_000, 5_193_217, 109, 156_848]);
  const result = await observer.runPackArtifactGate(5_400_000, {
    ...fake,
    independentPolicy: true,
  });
  assert.equal(result.code, 0);
  assert.deepEqual(
    fake.calls.map((call) => call.options.timeout),
    [5_220_000, 5_219_000, 25_783, 180_000]
  );
  assert.deepEqual(fake.calls[3].args, ["run", "check:pack-artifact", "--", "--require-staging"]);
  assert.deepEqual(
    fake.calls.map((call) => call.options.packPhase.phaseId),
    ["build-next", "build-cli", "stamp-build-sha", "validate-pack-artifact"]
  );
  assert.equal(fake.calls[3].options.env.OMNIROUTE_RELEASE_REF, "HEAD");
  assert.equal(fake.calls[0].options.env.OMNIROUTE_BUILD_MEMORY_MB, "12288");
});

test("quick with build retains its shared twenty-minute budget", async () => {
  const fake = fixture([1_000, 1_189_000, 1, 20_000]);
  const result = await observer.runPackArtifactGate(1_200_000, fake);
  assert.equal(result.code, 124);
  assert.equal(fake.calls[3].options.timeout, 9_999);
  assert.deepEqual(fake.calls[3].args, ["run", "check:pack-artifact"]);
});

for (const [name, durations, expectedCalls, phase] of [
  ["producer cannot borrow policy time", [5_220_001, 1, 1, 1], 1, "build-next"],
  ["build cannot borrow policy time", [1_000, 5_219_001, 1, 1], 2, "build-cli"],
  ["stamp remains inside preparation time", [1_000, 5_218_990, 100, 1], 3, "stamp-build-sha"],
  ["policy remains bounded at three minutes", [1, 1, 1, 180_001], 4, "validate-pack-artifact"],
]) {
  test(name, async () => {
    const fake = fixture(durations);
    const result = await observer.runPackArtifactGate(5_400_000, {
      ...fake,
      independentPolicy: true,
    });
    assert.equal(result.code, 124);
    assert.equal(result.phaseId, phase);
    assert.equal(fake.calls.length, expectedCalls);
    assert.equal(result.causeId, uuid(expectedCalls));
  });
}

for (const outcome of [
  "FAIL",
  "TIMEOUT",
  "CANCELLED",
  "SKIPPED",
  "CLEANUP_ERROR",
  "EVIDENCE_ERROR",
]) {
  test(`${outcome} never permits package success or a later command`, async () => {
    const fake = fixture([1, 1, 1, 1], { index: 0, outcome, code: 0 });
    const result = await observer.runPackArtifactGate(5_400_000, {
      ...fake,
      independentPolicy: true,
    });
    assert.notEqual(result.code, 0);
    assert.equal(fake.calls.length, 1);
  });
}

test("missing command receipt remains blocking", async () => {
  const fake = fixture([1, 1, 1, 1], { index: 0, outcome: "PASS", missingReceipt: true });
  assert.notEqual(
    (await observer.runPackArtifactGate(5_400_000, { ...fake, independentPolicy: true })).code,
    0
  );
  assert.equal(fake.calls.length, 1);
});

test("independent policy cannot expand the build ceiling or change quick", async () => {
  for (const timeout of [0, 1_200_000, 2_400_000, 5_400_001, Infinity, NaN]) {
    await assert.rejects(observer.runPackArtifactGate(timeout, { independentPolicy: true }));
  }
});

test("staging absence fails before a second build can be requested", () => {
  assert.throws(
    () => policy.needsPackStagingBuild(["dist/server.js"], true),
    /PACK_STAGING_MISSING/
  );
  assert.equal(policy.needsPackStagingBuild([], true), false);
  assert.equal(policy.needsPackStagingBuild(["dist/server.js"], false), true);
});

test("validator wires strict staging before fallback and rejects policy-only combination", () => {
  const source = readFileSync(
    new URL("../../../scripts/build/validate-pack-artifact.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /needsPackStagingBuild\(\s*missingAppRequiredPaths,\s*process\.argv\.includes\("--require-staging"\)\)/
  );
  assert.ok(
    source.indexOf("!needsPackStagingBuild") < source.indexOf('runNpm(["run", "build:cli"]')
  );
  assert.match(source, /POLICY_ONLY && process\.argv\.includes\("--require-staging"\)/);
});

function phase(overrides = {}) {
  return {
    phaseId: "validate-pack-artifact",
    mode: "independent-policy",
    budgetMs: 180_000,
    preparationBudgetMs: 5_220_000,
    ...overrides,
  };
}

test("phase identity binds candidate, UUID, run, attempt and workflow without payload", () => {
  const identity = observer.makePackPhaseReference(phase(), uuid(1), sha, {
    runId: "41500562509",
    runAttempt: "1",
    workflowSha: sha,
  });
  assert.deepEqual(identity, {
    schemaVersion: 1,
    laneId: "pack-artifact",
    ...phase(),
    invocationId: uuid(1),
    candidateSha: sha,
    runId: "41500562509",
    runAttempt: "1",
    workflowSha: sha,
  });
  assert.equal(observer.makePackPhaseReference(phase(), uuid(1), sha).runId, null);
});

test("phase identity rejects unknown phase, missing provenance and unbounded time", () => {
  for (const value of [
    phase({ phaseId: "unknown" }),
    phase({ budgetMs: 0 }),
    phase({ budgetMs: 180_001 }),
    phase({ budgetMs: Infinity }),
  ]) {
    assert.throws(() => observer.makePackPhaseReference(value, uuid(1), sha));
  }
  assert.throws(() => observer.makePackPhaseReference(phase(), "missing", sha));
  assert.throws(() => observer.makePackPhaseReference(phase(), uuid(1), null));
  assert.throws(() =>
    observer.makePackPhaseReference(phase(), uuid(1), sha, { runId: "41500562509" })
  );
});

test("phase identity drops extra payload fields", () => {
  const identity = observer.makePackPhaseReference(
    phase({ rawOutput: "fixture", token: "fixture" }),
    uuid(1),
    sha
  );
  assert.equal(Object.hasOwn(identity, "rawOutput"), false);
  assert.equal(Object.hasOwn(identity, "token"), false);
});

test("one failed command and its duplicate remain one incident plus blocked boot", () => {
  const checks = [
    { id: "pack-artifact", kind: "hard", ok: false, causeId: uuid(1) },
    { id: "execution-18", kind: "hard", ok: false, causeId: uuid(1) },
    { id: "pack-boot", kind: "hard", ok: false, dependencyOf: "pack-artifact" },
  ];
  const before = structuredClone(checks);
  const result = observer.summarizeExecutionIncidents(checks);
  assert.equal(result.incidentCount, 1);
  assert.deepEqual(result.incidents[0].checkIds, ["pack-artifact", "execution-18"]);
  assert.deepEqual(result.blockedDependencies, [
    { checkId: "pack-boot", dependencyOf: "pack-artifact" },
  ]);
  assert.deepEqual(checks, before);
  assert.equal(observer.computeVerdict(checks).releaseGreen, false);
  assert.equal(observer.computeVerdict(checks).hardFailures.length, 3);
});

test("different or missing UUIDs never merge independent failures", () => {
  const checks = [
    { id: "a", kind: "hard", ok: false, causeId: uuid(1) },
    { id: "b", kind: "hard", ok: false, causeId: uuid(2) },
    { id: "c", kind: "hard", ok: false },
    { id: "d", kind: "hard", ok: false },
  ];
  assert.equal(observer.summarizeExecutionIncidents(checks).incidentCount, 4);
});

test("full wiring changes only policy allocation and keeps boot conditional at forty minutes", () => {
  const source = readFileSync(
    new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
    "utf8"
  );
  assert.match(source, /runPackArtifactGate\(timeout, \{ independentPolicy: FULL_CI \}\)/);
  assert.match(source, /runPackArtifactGate\(20 \* 60 \* 1000\)/);
  assert.match(source, /if \(!packArtifactResult \|\| packArtifactResult\.code !== 0\)/);
  assert.match(source, /\["run", "check:pack-boot"\],[\s\S]{0,100}timeout: 40 \* 60 \* 1000/);
});

test("incident aggregation preserves the strict report verifier and all blocking checks", async () => {
  const { verifyReleaseGreenReport } = await import("../../../scripts/ci/release-green-result.mjs");
  const checks = [
    { id: "pack-artifact", kind: "hard", ok: false, causeId: uuid(1) },
    { id: "execution-18", kind: "hard", ok: false, causeId: uuid(1) },
    { id: "pack-boot", kind: "hard", ok: false, dependencyOf: "pack-artifact" },
  ];
  const report = {
    schemaVersion: 1,
    candidateSha: sha,
    profile: "full",
    releaseGreen: false,
    checks,
    hardFailures: checks.map(({ id }) => ({ id })),
    executionIncidents: observer.summarizeExecutionIncidents(checks),
  };
  assert.equal(report.executionIncidents.incidentCount, 1);
  assert.deepEqual(verifyReleaseGreenReport(report, "1", sha, "schedule"), {
    exit: 1,
    verdict: "FAIL",
    evidenceState: "COMPLETE",
    reason: "Required validation failed",
  });
  assert.equal(
    verifyReleaseGreenReport({ ...report, releaseGreen: true }, "0", sha, "schedule").verdict,
    "UNKNOWN"
  );
});

// Inspect the bounded callback argument without evaluating observer source. The
// fake clock and runner below exercise the real allocator and receipt propagation.
for (const [profile, budget, durations, expectedTimeouts, expectedCode] of [
  ["full", 5_400_000, [1_000, 5_193_217, 109, 156_848], [5_220_000, 5_219_000, 25_783, 180_000], 0],
  [
    "standard",
    5_400_000,
    [1_000, 5_373_217, 109, 156_848],
    [5_400_000, 5_399_000, 25_783, 25_674],
    124,
  ],
  ["quick", 1_200_000, [1_000, 1_189_000, 1, 20_000], [1_200_000, 1_199_000, 10_000, 9_999], 124],
]) {
  test(`profile ${profile} preserves its policy budget and propagates phase evidence`, async () => {
    const source = readFileSync(
      new URL("../../../scripts/quality/validate-release-green.mjs", import.meta.url),
      "utf8"
    );
    const callbacks = [
      ...source.matchAll(
        /run: \(timeout\) => runPackArtifactGate\(timeout, \{ independentPolicy: (true|FULL_CI) \}\)/g
      ),
    ];
    assert.equal(callbacks.length, 1, "one bounded full/standard callback must be identifiable");
    assert.match(source, /const FULL_CI = args\.has\("--full-ci"\)/);
    assert.match(source, /if \(!QUICK\)/);
    assert.match(
      source,
      /else if \(WITH_BUILD\) \{[\s\S]{0,150}await runPackArtifactGate\(20 \* 60 \* 1000\)/
    );
    assert.match(source, /await runPackArtifactGate\(20 \* 60 \* 1000\)/);
    const fullCiFlag = profile === "full";
    const independentPolicy =
      profile === "quick" ? false : callbacks[0][1] === "FULL_CI" ? fullCiFlag : true;
    const expectedIndependent = profile === "full";
    // The full lane reserves its three policy minutes inside the public budget.
    const preparationBudget = expectedIndependent ? budget - 180_000 : budget;
    const fake = fixture(durations);
    const result = await observer.runPackArtifactGate(budget, { ...fake, independentPolicy });
    assert.deepEqual(
      fake.calls.map((call) => call.options.timeout),
      expectedTimeouts
    );
    assert.equal(result.code, expectedCode);
    assert.deepEqual(fake.calls[3].args, [
      "run",
      "check:pack-artifact",
      ...(expectedIndependent ? ["--", "--require-staging"] : []),
    ]);
    for (const [index, call] of fake.calls.entries()) {
      assert.equal(
        call.options.packPhase.mode,
        expectedIndependent ? "independent-policy" : "shared"
      );
      assert.equal(call.options.packPhase.preparationBudgetMs, preparationBudget);
      const identity = observer.makePackPhaseReference(
        call.options.packPhase,
        uuid(index + 1),
        sha
      );
      assert.equal(identity.budgetMs, expectedTimeouts[index]);
      assert.equal(identity.mode, call.options.packPhase.mode);
      assert.equal(identity.preparationBudgetMs, preparationBudget);
    }
    if (expectedCode !== 0) {
      assert.equal(result.phaseId, "validate-pack-artifact");
      assert.equal(result.causeId, uuid(4));
    }

    const failedStamp = fixture([1, 1, 1, 1], { index: 2, outcome: "FAIL", code: 7 });
    const failed = await observer.runPackArtifactGate(budget, {
      ...failedStamp,
      independentPolicy,
    });
    assert.equal(failed.code, 7);
    assert.equal(failed.phaseId, "stamp-build-sha");
    assert.equal(failed.causeId, uuid(3));
    assert.equal(failedStamp.calls.length, 3, "policy must not run after a failed preparation");
  });
}

test("producer and strict consumer preserve one deadline and build flags", async () => {
  const fake = fixture([800, 500, 1, 1]);
  const result = await observer.runPackArtifactGate(1_200, fake);
  assert.equal(result.code, 124);
  assert.equal(result.phaseId, "build-cli");
  assert.deepEqual(
    fake.calls.map((call) => call.args),
    [
      ["run", "build"],
      ["run", "build:cli"],
    ]
  );
  assert.deepEqual(
    fake.calls.map((call) => call.options.timeout),
    [1_200, 400]
  );
  assert.equal(fake.now(), 1_200);
  assert.equal(fake.calls[0].options.env.OMNIROUTE_BUILD_MEMORY_MB, "12288");
  assert.equal(fake.calls[1].options.env.OMNIROUTE_BUILD_MEMORY_MB, "12288");
  assert.equal(fake.calls[1].options.env.OMNIROUTE_REQUIRE_PREBUILT_NEXT, "1");
  for (const call of fake.calls) {
    assert.equal(Object.hasOwn(call.options.env, "OMNIROUTE_USE_TURBOPACK"), false);
    assert.equal(Object.hasOwn(call.options.env, "OMNIROUTE_BUILD_PROFILE"), false);
    assert.equal(Object.hasOwn(call.options.env, "OMNIROUTE_SKIP_STANDALONE"), false);
    assert.equal(call.options.packPhase.preparationBudgetMs, 1_200);
  }
});

test("a stale standalone cannot bypass the current producer's failed receipt", async (t) => {
  const root = mkdtempSync(join(tmpdir(), "pack-producer-stale-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const serverPath = join(root, "server.js");
  writeFileSync(serverPath, "// stale synthetic input\n");
  let consumed = false;
  let fallbackBuilds = 0;
  const calls = [];
  const result = await observer.runPackArtifactGate(1_200, {
    now: () => 0,
    runCommand: async (_command, args, options) => {
      calls.push(args);
      if (args[1] === "build") {
        // Even a zero exit cannot validate this producer with a failing receipt.
        return { code: 0, out: "", invocationId: uuid(calls.length), receipt: { outcome: "FAIL" } };
      }
      if (args[1] === "build:cli") {
        ensureStandaloneInput({
          serverPath,
          requirePrebuilt: options.env.OMNIROUTE_REQUIRE_PREBUILT_NEXT === "1",
          build: () => {
            fallbackBuilds++;
          },
        });
        consumed = true;
      }
      return { code: 0, out: "", invocationId: uuid(calls.length), receipt: { outcome: "PASS" } };
    },
  });
  assert.notEqual(result.code, 0);
  assert.equal(result.phaseId, "build-next");
  assert.equal(result.causeId, uuid(1));
  assert.deepEqual(calls, [["run", "build"]]);
  assert.equal(consumed, false);
  assert.equal(fallbackBuilds, 0);
  assert.equal(readFileSync(serverPath, "utf8"), "// stale synthetic input\n");
});

test("missing standalone after producer success forbids fallback and stamp", async (t) => {
  const root = mkdtempSync(join(tmpdir(), "pack-producer-missing-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const serverPath = join(root, "server.js");
  let fallbackBuilds = 0;
  let strictFailure = false;
  const calls = [];
  const result = await observer.runPackArtifactGate(1_200, {
    now: () => 0,
    runCommand: async (_command, args, options) => {
      calls.push(args);
      if (args[1] === "build:cli") {
        try {
          ensureStandaloneInput({
            serverPath,
            requirePrebuilt: options.env.OMNIROUTE_REQUIRE_PREBUILT_NEXT === "1",
            build: () => {
              fallbackBuilds++;
              writeFileSync(serverPath, "// unexpected fallback\n");
            },
          });
        } catch (error) {
          assert.match(error.message, /^PREBUILT_NEXT_REQUIRED:/);
          strictFailure = true;
          return {
            code: 1,
            out: "",
            invocationId: uuid(calls.length),
            receipt: { outcome: "FAIL" },
          };
        }
      }
      return { code: 0, out: "", invocationId: uuid(calls.length), receipt: { outcome: "PASS" } };
    },
  });
  assert.notEqual(result.code, 0);
  assert.equal(result.phaseId, "build-cli");
  assert.equal(result.causeId, uuid(2));
  assert.deepEqual(calls, [
    ["run", "build"],
    ["run", "build:cli"],
  ]);
  assert.equal(strictFailure, true);
  assert.equal(fallbackBuilds, 0);
});
