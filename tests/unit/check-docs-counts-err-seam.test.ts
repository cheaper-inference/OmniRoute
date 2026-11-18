import { after, afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildChecks,
  runCountsGate,
  tallyDrift,
  __setSpawnSyncForTest,
  __resetSpawnSyncForTest,
} from "../../scripts/check/check-docs-counts-sync.mjs";

type Check = {
  label?: string;
  docKey?: string;
  actual?: unknown;
  strict?: boolean;
  files?: string[];
  validate?: (content: string, claim?: string) => { ok: boolean; detail: string };
};

type GateResult = {
  mode: string;
  exitCode: number;
  strict: number;
  soft: number;
  infra: unknown;
  lines: string[];
  footer?: { stream: string; text: string }[];
};

// inject a failing spawnSync so we can test the failure path (node:child_process.spawnSync is non-configurable in ESM)
afterEach(() => {
  try {
    __resetSpawnSyncForTest();
  } catch {}
});

const failingProbe = () =>
  ({
    status: 1,
    stdout: "",
    stderr: "tsx not found",
    pid: 1,
    output: [],
    signal: null,
  }) as never;

describe("readCodeFacts failure is reported as a strict failure", () => {
  it("reports a strict error when the code facts cannot be loaded", () => {
    __setSpawnSyncForTest(failingProbe);
    const checks = buildChecks() as Check[];
    const errCheck = checks.find((c) => c.actual === "ERR");
    assert.ok(
      errCheck,
      "should include a check with actual ERR when the facts loader returns null"
    );
    assert.equal(errCheck.strict, true, "ERR must be strict");
    assert.ok(errCheck.validate, "validate must be defined");
    const v = errCheck.validate!("", "code facts:ERR");
    assert.equal(v.ok, false, "validate must return ok:false");
    assert.match(String(v.detail), /readCodeFacts|tsx|spawnSync/i);
  });

  it("tallyDrift does not skip actual ERR", () => {
    const checks = [
      {
        label: "Code-derived counts",
        actual: "ERR",
        strict: true,
        files: ["docs/README.md"],
        validate: () => ({ ok: false, detail: "ERR" }),
      },
    ] as never;
    const { strict } = tallyDrift(checks, () => "");
    assert.equal(strict, 1);
  });

  it("tallyDrift skips actual 0 (source unknown)", () => {
    const checks = [
      { label: "Code-derived counts", actual: 0, strict: true, files: ["README.md"] },
    ] as never;
    const { strict } = tallyDrift(checks, () => "content");
    assert.equal(strict, 0);
  });
});

// The gate itself no longer reports that failure as documentation drift: facts that cannot be
// collected are an INFRASTRUCTURE failure (exit 2), so a host too loaded to run the tsx probe
// can never be mistaken for docs that need editing.
//
// The gate runs against an empty root: a real STRICT drift still wins over the infrastructure
// verdict (exit 1), and a feature branch that adds a migration or a provider carries such a
// drift by design (derived values are refreshed at release). Against the working tree, these
// assertions would depend on the branch they run on.
const emptyRoot = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-err-seam-"));
after(() => fs.rmSync(emptyRoot, { recursive: true, force: true }));

describe("the release gate classifies a facts failure as infrastructure", () => {
  it("exits 2 with an infrastructure verdict, not a STRICT drift", () => {
    __setSpawnSyncForTest(failingProbe);
    const r = runCountsGate({ mode: "release", root: emptyRoot }) as GateResult;
    assert.equal(r.mode, "release");
    assert.equal(r.exitCode, 2, `expected exit 2 (infrastructure), got ${r.exitCode}`);
    assert.ok(r.infra, "the result must carry the infrastructure failure");
    const text = [...r.lines, ...(r.footer ?? []).map((f) => f.text), JSON.stringify(r.infra)].join(
      "\n"
    );
    assert.match(text, /not a documentation (divergence|drift)/i);
  });

  it("a timeout is the same infrastructure verdict", () => {
    __setSpawnSyncForTest(
      () =>
        ({
          status: null,
          stdout: "",
          stderr: "",
          pid: 1,
          output: [],
          signal: "SIGKILL",
        }) as never
    );
    const r = runCountsGate({ mode: "release", root: emptyRoot }) as GateResult;
    assert.equal(r.exitCode, 2);
    assert.match(JSON.stringify(r.infra), /timeout/i);
  });
});
