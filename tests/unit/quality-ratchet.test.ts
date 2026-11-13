import { test } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SCRIPT = path.resolve("scripts/quality/check-quality-ratchet.mjs");

// The gate mode (scripts/check/lib/gateMode.mjs) decides whether --require-tighten bites; every
// test pins it so the verdict does not depend on the runner (a CI pull_request run is `pr`).
function run(
  baseline: unknown,
  metrics: unknown,
  extraArgs: string[] = [],
  mode: "pr" | "release" = "release"
) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ratchet-"));
  const bPath = path.join(dir, "baseline.json");
  const mPath = path.join(dir, "metrics.json");
  fs.writeFileSync(bPath, JSON.stringify(baseline));
  fs.writeFileSync(mPath, JSON.stringify(metrics));
  // spawnSync so we can always capture both stdout and stderr
  // (warnings via console.warn go to stderr; we need them in the `out` field).
  const result = spawnSync(
    "node",
    [SCRIPT, "--baseline", bPath, "--metrics", mPath, ...extraArgs],
    {
      encoding: "utf8",
      env: { ...process.env, OMNIROUTE_GATE_MODE: mode },
    }
  );
  const code = result.status ?? 1;
  const out = (result.stdout || "") + (result.stderr || "");
  return { code, out, dir, bPath };
}

test("passes when metrics equal baseline", () => {
  const b = {
    metrics: {
      eslintWarnings: { value: 100, direction: "down" },
      "coverage.lines": { value: 80, direction: "up" },
    },
  };
  assert.equal(run(b, { eslintWarnings: 100, "coverage.lines": 80 }).code, 0);
});

test("fails when a 'down' metric regresses (more warnings)", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 101 });
  assert.equal(r.code, 1);
  assert.match(r.out, /eslintWarnings/);
});

test("fails when an 'up' metric regresses (coverage drops)", () => {
  const b = { metrics: { "coverage.lines": { value: 80, direction: "up" } } };
  assert.equal(run(b, { "coverage.lines": 79 }).code, 1);
});

test("passes on improvement; --update ratchets the baseline", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 90 }, ["--update"]);
  assert.equal(r.code, 0);
  const updated = JSON.parse(fs.readFileSync(r.bPath, "utf8"));
  assert.equal(updated.metrics.eslintWarnings.value, 90);
});

test("fails when a baseline metric is missing from collected metrics", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  assert.equal(run(b, {}).code, 1);
});

test("--allow-missing skips absent metrics instead of failing", () => {
  const b = {
    metrics: {
      eslintWarnings: { value: 100, direction: "down" },
      "coverage.lines": { value: 80, direction: "up" },
    },
  };
  assert.equal(run(b, { eslintWarnings: 100 }, ["--allow-missing"]).code, 0);
});

// ── 6A.5 NEW BEHAVIORS ──────────────────────────────────────────────────────

// Behavior 1: --require-tighten
test("without --require-tighten, improvement beyond tightenSlack is allowed", () => {
  // Default behavior must be unchanged: improvement is fine
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  assert.equal(run(b, { eslintWarnings: 80 }).code, 0);
});

test("--require-tighten fails when 'down' metric improved beyond tightenSlack without baseline update", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  // eslintWarnings went from 100 → 80 (improved by 20, beyond any slack)
  const r = run(b, { eslintWarnings: 80 }, ["--require-tighten"]);
  assert.equal(r.code, 1);
  assert.match(r.out, /eslintWarnings/);
  assert.match(r.out, /--update/);
});

test("--require-tighten fails when 'up' metric improved beyond tightenSlack without baseline update", () => {
  const b = { metrics: { "coverage.lines": { value: 80, direction: "up" } } };
  // coverage went from 80 → 95 (improved by 15, beyond any slack)
  const r = run(b, { "coverage.lines": 95 }, ["--require-tighten"]);
  assert.equal(r.code, 1);
  assert.match(r.out, /coverage\.lines/);
  assert.match(r.out, /--update/);
});

test("--require-tighten passes when improvement is within tightenSlack (metric-level override)", () => {
  // tightenSlack=2 means improvement of up to 2 is tolerated without --update
  const b = {
    metrics: {
      "coverage.lines": { value: 80, direction: "up", tightenSlack: 2 },
    },
  };
  // improved by 1.5 — within slack of 2
  assert.equal(run(b, { "coverage.lines": 81.5 }, ["--require-tighten"]).code, 0);
});

test("--require-tighten passes when improvement exactly equals tightenSlack boundary", () => {
  // tightenSlack=2, improve by exactly 2 → on boundary → should pass
  const b = {
    metrics: {
      "coverage.lines": { value: 80, direction: "up", tightenSlack: 2 },
    },
  };
  assert.equal(run(b, { "coverage.lines": 82 }, ["--require-tighten"]).code, 0);
});

test("--require-tighten with --update ratchets baseline and passes even with large improvement", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  // With both flags: update takes precedence (improvement is captured)
  const r = run(b, { eslintWarnings: 80 }, ["--require-tighten", "--update"]);
  assert.equal(r.code, 0);
  const updated = JSON.parse(fs.readFileSync(r.bPath, "utf8"));
  assert.equal(updated.metrics.eslintWarnings.value, 80);
});

// Behavior 2: eps per metric
test("metric-level eps overrides global EPS for regression check", () => {
  // eps=1.5 means a drop of 1.4 does NOT count as regression
  const b = {
    metrics: {
      "coverage.branches": { value: 80, direction: "up", eps: 1.5 },
    },
  };
  // dropped by 1.4 — within per-metric eps → should PASS
  assert.equal(run(b, { "coverage.branches": 78.6 }).code, 0);
});

test("metric-level eps: regression beyond eps still fails", () => {
  // eps=1.5 but dropped by 2.0 → should FAIL
  const b = {
    metrics: {
      "coverage.branches": { value: 80, direction: "up", eps: 1.5 },
    },
  };
  assert.equal(run(b, { "coverage.branches": 78 }).code, 1);
});

test("metric-level eps=0 for deterministic metric: any regression fails", () => {
  // eps=0 means even 0.001 regression triggers failure
  const b = {
    metrics: {
      eslintWarnings: { value: 100, direction: "down", eps: 0 },
    },
  };
  // increased by exactly 1 → should FAIL
  assert.equal(run(b, { eslintWarnings: 101 }).code, 1);
});

test("metric-level eps does not affect improvement detection", () => {
  // Improvement still recorded regardless of eps value
  const b = {
    metrics: {
      "coverage.lines": { value: 80, direction: "up", eps: 1.5 },
    },
  };
  // improved by 3 — above eps, no regression, should PASS
  assert.equal(run(b, { "coverage.lines": 83 }).code, 0);
});

// Behavior 3: orphan metrics warning
test("metric in quality-metrics.json without baseline entry emits a WARNING (not fail)", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  // "orphanMetric" is in the collected metrics but not in the baseline
  const r = run(b, { eslintWarnings: 100, orphanMetric: 42 });
  assert.equal(r.code, 0); // must NOT fail
  assert.match(r.out, /orphanMetric/); // must mention the orphan
  assert.match(r.out, /[Ww][Aa][Rr][Nn]/); // must say "warn" in some form
});

test("multiple orphan metrics all appear in the warning", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  const r = run(b, { eslintWarnings: 100, newMetric1: 10, newMetric2: 20 });
  assert.equal(r.code, 0);
  assert.match(r.out, /newMetric1/);
  assert.match(r.out, /newMetric2/);
});

test("velocity phase (_policy.requireTighten=false) turns --require-tighten into an advisory", () => {
  const b = {
    _policy: { phase: "velocity", until: "4.0.0", relaxPct: 20, requireTighten: false },
    metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } },
  };
  // Measured far below the (relaxed) baseline: without the policy this is a tighten failure.
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"]);
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /velocity phase active/);
});

test("without _policy the --require-tighten gate still bites", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"]);
  assert.equal(r.code, 1);
  assert.match(r.out, /require-tighten/);
});

// Plan 2026-11-13: baselines are banked by the release refresh / nightly, not by feature PRs.
// In `pr` mode an improvement never fails (the PR is not asked to edit quality-baseline.json);
// a regression still does. Release mode keeps the strict --require-tighten.
test("pr mode: --require-tighten reports an un-banked improvement without failing", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"], "pr");
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /--require-tighten advisory: mode=pr \(env: OMNIROUTE_GATE_MODE=pr\)/);
  assert.match(r.out, /eslintWarnings: melhorou de 1000 para 0/);
});

test("pr mode: the advisory never tells the feature PR to commit the tightened baseline", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"], "pr");
  assert.equal(r.code, 0, r.out);
  assert.doesNotMatch(r.out, /commite o baseline apertado neste PR/);
  assert.match(r.out, /eslintWarnings: melhorou de 1000 para 0 .*banked by the release refresh/);
});

test("release mode: the tighten failure keeps its 'commit the tightened baseline' instruction", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"], "release");
  assert.equal(r.code, 1, r.out);
  assert.match(
    r.out,
    /eslintWarnings: melhorou de 1000 para 0 \(delta 1000\.0000 > slack 10\) — rode 'npm run quality:ratchet -- --update' e commite o baseline apertado neste PR/
  );
});

test("pr mode: a regression still fails, with or without --require-tighten", () => {
  const b = { metrics: { eslintWarnings: { value: 100, direction: "down" } } };
  for (const args of [[], ["--require-tighten"]]) {
    const r = run(b, { eslintWarnings: 101 }, args, "pr");
    assert.equal(r.code, 1, `${args.join(" ")}: ${r.out}`);
    assert.match(r.out, /eslintWarnings: 101 > baseline 100/);
  }
});

test("release mode: --require-tighten still bites without _policy (same as before the split)", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten"], "release");
  assert.equal(r.code, 1, r.out);
  assert.match(r.out, /FALHOU \(--require-tighten\)/);
});

test("--mode=pr on the command line wins over the environment", () => {
  const b = { metrics: { eslintWarnings: { value: 1000, direction: "down", tightenSlack: 10 } } };
  const r = run(b, { eslintWarnings: 0 }, ["--require-tighten", "--mode=pr"], "release");
  assert.equal(r.code, 0, r.out);
  assert.match(r.out, /mode=pr \(flag: --mode=pr\)/);
});
