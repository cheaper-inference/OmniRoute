import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runGateProcess } from "../../../scripts/quality/gate-process.mjs";
import {
  computeVerdict,
  evaluateComplexityRun,
} from "../../../scripts/quality/validate-release-green.mjs";

test("cancelled complexity measurement cannot emit passing metrics", () => {
  const results = evaluateComplexityRun(
    { code: 130, out: "Gate execution CANCELLED; see command receipt" },
    100
  );
  assert.equal(
    results.some((result) => result.ok),
    false
  );
  assert.equal(computeVerdict(results).releaseGreen, false);
});

function completeOutput(cognitive = 80, cyclomatic = 20, cyclomaticDrift = false) {
  return [
    `complexity=${cyclomatic}`,
    `cognitiveComplexity=${cognitive}`,
    `[complexity] ${cyclomaticDrift ? "REGRESSÃO" : "OK"} — ${cyclomatic} violações ${cyclomaticDrift ? "> baseline 10" : "(baseline 20)"}`,
    `[cognitive-complexity] ${cognitive > 100 ? "REGRESSÃO" : "OK"} — ${cognitive} violações ${cognitive > 100 ? "> baseline 100" : "(baseline 100)"}`,
  ].join("\n");
}

for (const code of [1, 2, 42, 124, 130, 143]) {
  test(`complete metrics cannot hide an unexpected process exit ${code}`, () => {
    const results = evaluateComplexityRun({ code, out: completeOutput() }, 100);
    assert.equal(
      results.some((result) => result.ok),
      false
    );
    assert.equal(computeVerdict(results).releaseGreen, false);
    assert.equal(results[0].kind, "hard");
  });
}

for (const out of [
  "",
  "complexity=20\n[complexity] OK — 20 violações (baseline 20)",
  "cognitiveComplexity=80\n[cognitive-complexity] OK — 80 violações (baseline 100)",
  "complexity=20\ncognitiveComplexity=80",
  completeOutput().replace("cognitiveComplexity=80", "cognitiveComplexity=NaN"),
  completeOutput().replace("complexity=20", "complexity=20.5"),
  completeOutput().replace("complexity=20", "complexity=20invalid"),
  completeOutput().replace("complexity=20", "complexity=-20"),
  completeOutput(Number.MAX_SAFE_INTEGER + 1),
]) {
  test(`incomplete or invalid output fails closed: ${JSON.stringify(out)}`, () => {
    const results = evaluateComplexityRun({ code: 0, out }, 100);
    assert.equal(
      results.some((result) => result.ok),
      false
    );
    assert.equal(computeVerdict(results).releaseGreen, false);
  });
}

test("unknown baseline fails closed instead of assuming no drift", () => {
  for (const baseline of [null, NaN, Infinity, -1]) {
    const results = evaluateComplexityRun({ code: 0, out: completeOutput() }, baseline);
    assert.equal(computeVerdict(results).releaseGreen, false);
  }
});

test("completed metrics within baseline retain both passing records", () => {
  const results = evaluateComplexityRun({ code: 0, out: completeOutput() }, 100);
  assert.deepEqual(
    results.map(({ id, kind, ok }) => ({ id, kind, ok })),
    [
      { id: "cognitive-complexity", kind: "drift", ok: true },
      { id: "complexity", kind: "drift", ok: true },
    ]
  );
  assert.equal(computeVerdict(results).releaseGreen, true);
});

for (const [cognitive, cyclomaticDrift] of [
  [101, false],
  [80, true],
  [101, true],
] as const) {
  test(`measured drift remains advisory: cognitive=${cognitive}, cyclomatic=${cyclomaticDrift}`, () => {
    const results = evaluateComplexityRun(
      { code: 1, out: completeOutput(cognitive, 20, cyclomaticDrift) },
      100
    );
    assert.equal(results.length, 2);
    assert.ok(results.every((result) => result.kind === "drift"));
    assert.equal(results[0].ok, cognitive <= 100);
    assert.equal(results[1].ok, !cyclomaticDrift);
    assert.equal(computeVerdict(results).releaseGreen, true);
  });
}

test("partial regression output cannot disguise a crashed check as advisory drift", () => {
  const results = evaluateComplexityRun(
    { code: 1, out: "complexity=20\ncognitiveComplexity=101\nError: incomplete walk" },
    100
  );
  assert.equal(computeVerdict(results).releaseGreen, false);
});

test("real subprocess cancellation preserves the receipt and cannot emit a metric PASS", async (t) => {
  const directory = mkdtempSync(join(tmpdir(), "release-green-complexity-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const controller = new AbortController();
  const result = await runGateProcess(
    process.execPath,
    ["-e", "console.log('complexity=20'); setInterval(()=>{},1000)"],
    {
      cwd: directory,
      logPath: join(directory, "complexity.log"),
      timeout: 15000,
      killGraceMs: 100,
      signal: controller.signal,
      heartbeatMs: 100,
      onHeartbeat: ({ bytes }: { bytes: number }) => {
        if (bytes > 0) controller.abort();
      },
    }
  );
  assert.equal(result.receipt.outcome, "CANCELLED");
  assert.equal(JSON.parse(readFileSync(result.receiptPath, "utf8")).outcome, "CANCELLED");
  const checks = evaluateComplexityRun(result, 100);
  assert.equal(
    checks.some((check) => check.ok),
    false
  );
  const report = JSON.parse(JSON.stringify({ checks, ...computeVerdict(checks) }));
  assert.equal(report.releaseGreen, false);
});
