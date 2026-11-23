// Ratchet for the `open-sse → src` boundary (scripts/quality/measure-boundary.mjs).
//
// `quality:boundary` only MEASURED the engine → app coupling. Between 2026-10-10 and
// 2026-10-16 the `open-sse → src` edge count went 745 → 768 with nobody noticing: that
// list is the v4 remediation backlog and it has to stop growing. `--ratchet` now blocks
// when the count exceeds `metrics.boundaryOpenSseToSrc.value` in quality-baseline.json
// (same shape as `check:cycles:ratchet` / `metrics.cycles`).
//
// Every behavioral test runs the real CLI against a synthetic tree (`--root`) and a
// temporary baseline (`--baseline`), so nothing here reads or writes the committed
// config/quality/quality-baseline.json.
//
// PR base-relative mode (`--base-ref <sha>`, same idea as check:file-size #8522): the base
// receives ~10 merges/hour and twice in one day merges landed between the seed and the
// merge of the ceiling, reddening every innocent PR. On PR events the ceiling becomes
// max(baseline ceiling, edges measured on the PR base); the absolute ceiling still holds
// on push / workflow_dispatch. Those tests build a throwaway git repo under os.tmpdir().

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import {
  BOUNDARY_METRIC_KEY,
  evaluateBoundaryRatchet,
  evaluateBoundaryRatchetRelative,
  readBaselineBoundaryValue,
} from "../../../scripts/quality/measure-boundary.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const SCRIPT = path.join(ROOT, "scripts/quality/measure-boundary.mjs");
const NOTE = "seeded at the measured value; the ceiling only goes down";

// Two open-sse → src edges (alias + relative), one src → open-sse edge (ignored by the
// ratchet, which only bounds the engine → app direction).
const TREE: Record<string, string> = {
  "open-sse/handlers/chat.ts":
    'import { store } from "@/lib/memory/store";\nexport const x = store;\n',
  "open-sse/services/combo.ts":
    'import { db } from "../../src/lib/db/core";\nexport const y = db;\n',
  "open-sse/utils/logger.ts": "export const log = () => {};\n",
  "src/lib/memory/store.ts":
    'import { log } from "@omniroute/open-sse/utils/logger";\nexport const store = log;\n',
  "src/lib/db/core.ts": "export const db = 1;\n",
};
const MEASURED = 2;

type Spec = { value: number; direction: string; dedicatedGate: boolean; _note?: string };
type Baseline = { _comment?: string; metrics: Record<string, Spec> };

function baselineWith(value?: number): Baseline {
  const metrics: Record<string, Spec> = {
    cycles: { value: 14, direction: "down", dedicatedGate: true },
  };
  if (value !== undefined) {
    metrics[BOUNDARY_METRIC_KEY] = { value, direction: "down", dedicatedGate: true, _note: NOTE };
  }
  return { _comment: "fixture", metrics };
}

function withWorkspace(
  baseline: Baseline | null,
  fn: (ctx: { root: string; baselinePath: string }) => void
) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "boundary-ratchet-"));
  try {
    const root = path.join(dir, "repo");
    for (const [rel, content] of Object.entries(TREE)) {
      const abs = path.join(root, rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, content);
    }
    const baselinePath = path.join(dir, "quality-baseline.json");
    if (baseline) fs.writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`);
    fn({ root, baselinePath });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function run(args: string[]) {
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" });
}

function readJson(p: string) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

test("evaluateBoundaryRatchet: at or below the ceiling passes, above fails, no ceiling is advisory", () => {
  const at = evaluateBoundaryRatchet(768, 768);
  assert.equal(at.status, "ok");
  assert.equal(at.exitCode, 0);
  assert.match(at.message, /RATCHET OK/);
  assert.match(at.message, /768 edges, ceiling 768/);

  assert.equal(evaluateBoundaryRatchet(700, 768).status, "ok");

  const above = evaluateBoundaryRatchet(769, 768);
  assert.equal(above.status, "fail");
  assert.equal(above.exitCode, 1);
  assert.match(above.message, /RATCHET FAIL/);
  assert.match(above.message, /769 edges, ceiling 768/);

  const none = evaluateBoundaryRatchet(769, null);
  assert.equal(none.status, "advisory");
  assert.equal(none.exitCode, 0);
  assert.match(none.message, /advisory/i);
});

test("readBaselineBoundaryValue tolerates a missing file, a missing metric and a non-numeric value", () => {
  withWorkspace(baselineWith(5), ({ baselinePath }) => {
    assert.equal(readBaselineBoundaryValue(baselinePath), 5);
  });
  withWorkspace(baselineWith(), ({ baselinePath }) => {
    assert.equal(readBaselineBoundaryValue(baselinePath), null);
  });
  withWorkspace(null, ({ baselinePath }) => {
    assert.equal(readBaselineBoundaryValue(baselinePath), null);
  });
  const bad = baselineWith(5);
  (bad.metrics[BOUNDARY_METRIC_KEY] as unknown as { value: string }).value = "5";
  withWorkspace(bad, ({ baselinePath }) => {
    assert.equal(readBaselineBoundaryValue(baselinePath), null);
  });
});

test("--ratchet passes when the measured edges equal or stay below the ceiling", () => {
  for (const ceiling of [MEASURED, MEASURED + 3]) {
    withWorkspace(baselineWith(ceiling), ({ root, baselinePath }) => {
      const res = run(["--ratchet", "--root", root, "--baseline", baselinePath]);
      assert.equal(res.status, 0, res.stderr);
      assert.match(res.stdout, /\[boundary\] RATCHET OK/);
      assert.match(res.stdout, new RegExp(`${MEASURED} edges, ceiling ${ceiling}`));
    });
  }
});

test("--ratchet fails (exit 1) when open-sse → src edges exceed the ceiling", () => {
  withWorkspace(baselineWith(MEASURED - 1), ({ root, baselinePath }) => {
    const res = run(["--ratchet", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 1, res.stdout);
    assert.match(res.stderr, /\[boundary\] RATCHET FAIL/);
    assert.match(res.stderr, new RegExp(`${MEASURED} edges, ceiling ${MEASURED - 1}`));
    // The failing run must not have touched the baseline.
    assert.equal(readBaselineBoundaryValue(baselinePath), MEASURED - 1);
  });
});

test("--ratchet without a ceiling in the baseline is advisory (exit 0 with a warning)", () => {
  withWorkspace(baselineWith(), ({ root, baselinePath }) => {
    const res = run(["--ratchet", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 0, res.stderr);
    assert.match(res.stderr, /\[boundary\] RATCHET ADVISORY/);
    assert.match(res.stderr, new RegExp(`${MEASURED} edges`));
  });
});

test("--update lowers the ceiling to the measured value and keeps the note and the rest of the file", () => {
  withWorkspace(baselineWith(MEASURED + 5), ({ root, baselinePath }) => {
    const res = run(["--update", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 0, res.stderr);
    const after = readJson(baselinePath);
    assert.deepEqual(after.metrics[BOUNDARY_METRIC_KEY], {
      value: MEASURED,
      direction: "down",
      dedicatedGate: true,
      _note: NOTE,
    });
    assert.deepEqual(after.metrics.cycles, { value: 14, direction: "down", dedicatedGate: true });
    assert.equal(after._comment, "fixture");
    assert.ok(fs.readFileSync(baselinePath, "utf8").endsWith("}\n"));
  });
});

test("--update seeds a missing metric as a dedicated down-only gate", () => {
  withWorkspace(baselineWith(), ({ root, baselinePath }) => {
    const res = run(["--update", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 0, res.stderr);
    const spec = readJson(baselinePath).metrics[BOUNDARY_METRIC_KEY];
    assert.equal(spec.value, MEASURED);
    assert.equal(spec.direction, "down");
    assert.equal(spec.dedicatedGate, true);
  });
});

test("--update refuses to RAISE the ceiling (the ratchet only goes down)", () => {
  withWorkspace(baselineWith(MEASURED - 1), ({ root, baselinePath }) => {
    const before = fs.readFileSync(baselinePath, "utf8");
    const res = run(["--update", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 1, res.stdout);
    assert.match(res.stderr, /refus/i);
    assert.equal(fs.readFileSync(baselinePath, "utf8"), before);
  });
});

test("without --ratchet/--update the report is unchanged and nothing is enforced", () => {
  withWorkspace(baselineWith(0), ({ root, baselinePath }) => {
    const md = run(["--root", root, "--baseline", baselinePath]);
    assert.equal(md.status, 0, md.stderr);
    assert.match(md.stdout, /^# src ⇄ open-sse boundary/);
    assert.doesNotMatch(md.stdout + md.stderr, /RATCHET/);

    const json = run(["--json", "--root", root]);
    assert.equal(json.status, 0, json.stderr);
    assert.equal(JSON.parse(json.stdout).edges.openSseToSrc, MEASURED);
    assert.equal(readBaselineBoundaryValue(baselinePath), 0);
  });
});

test("the committed baseline declares the boundary ceiling as a dedicated down-only gate", () => {
  const baseline = readJson(path.join(ROOT, "config/quality/quality-baseline.json"));
  const spec = baseline.metrics[BOUNDARY_METRIC_KEY];
  assert.ok(spec, `quality-baseline.json must declare metrics.${BOUNDARY_METRIC_KEY}`);
  assert.equal(typeof spec.value, "number");
  assert.ok(spec.value > 0);
  assert.equal(spec.direction, "down");
  // dedicatedGate keeps check-quality-ratchet.mjs from expecting it in quality-metrics.json.
  assert.equal(spec.dedicatedGate, true);
  assert.equal(typeof spec._note, "string");
});

test("package.json exposes check:boundary (+ :ratchet) and keeps quality:boundary", () => {
  const { scripts } = readJson(path.join(ROOT, "package.json"));
  assert.equal(scripts["check:boundary"], "node scripts/quality/measure-boundary.mjs");
  assert.equal(
    scripts["check:boundary:ratchet"],
    "node scripts/quality/measure-boundary.mjs --ratchet"
  );
  assert.equal(scripts["quality:boundary"], "node scripts/quality/measure-boundary.mjs");
});

type Step = { run?: string; [key: string]: unknown };
type Workflow = { jobs: Record<string, { steps: Step[] }> };

function loadWorkflow(name: string): Workflow {
  return yaml.load(fs.readFileSync(path.join(ROOT, ".github/workflows", name), "utf8")) as Workflow;
}

test("ci.yml lint job runs the blocking boundary ratchet (base-relative on PRs, absolute on push)", () => {
  const steps = loadWorkflow("ci.yml").jobs.lint.steps;
  const runs = steps.map((s) => (s.run ?? "").trim());
  const idx = runs.findIndex((r) => r.includes("npm run check:boundary:ratchet"));
  assert.ok(idx >= 0, "lint must run check:boundary:ratchet");
  assert.ok(
    idx > runs.indexOf("npm run check:cycles:ratchet"),
    "boundary ratchet sits next to the cycles ratchet"
  );
  const step = steps[idx] as Step & { env?: Record<string, string>; if?: string };
  // Never skipped: the absolute ceiling must keep running on push → main.
  assert.equal(step.if, undefined, "the boundary ratchet step must run on every event");
  assert.equal(step.env?.PR_BASE_SHA, "${{ github.event.pull_request.base.sha }}");
  const script = runs[idx];
  assert.match(script, /if \[ -n "\$\{PR_BASE_SHA:-\}" \]/);
  assert.match(script, /npm run check:boundary:ratchet -- --base-ref "\$PR_BASE_SHA"/);
  // The else branch keeps the bare absolute invocation (push / workflow_dispatch).
  assert.match(script, /else\s+npm run check:boundary:ratchet\s+fi/);
});

test("quality.yml fast-gates lists boundary among the --ratchet gates", () => {
  const steps = loadWorkflow("quality.yml").jobs["fast-gates"].steps;
  const script = steps.map((s) => s.run ?? "").find((r) => r.includes("ratchet_gates=("));
  assert.ok(script, "fast-gates must keep the ratchet_gates loop");
  const body = /ratchet_gates=\(([^)]*)\)/.exec(script)![1];
  const gates = body
    .split("\n")
    .map((line) => line.replace(/#.*/, ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
  assert.ok(gates.includes("boundary"), `ratchet_gates = ${gates.join(" ")}`);
  assert.ok(gates.includes("cycles"));
  // The loop calls `npm run check:$g -- --ratchet`, so check:boundary must forward it.
  assert.match(script, /npm run "check:\$g" -- --ratchet/);
});

test("quality.yml fast-gates passes --base-ref $PR_BASE_SHA to boundary on PR events", () => {
  const steps = loadWorkflow("quality.yml").jobs["fast-gates"].steps as (Step & {
    env?: Record<string, string>;
  })[];
  const step = steps.find((s) => (s.run ?? "").includes("ratchet_gates=("));
  assert.ok(step, "fast-gates must keep the ratchet_gates loop");
  assert.equal(step.env?.PR_BASE_SHA, "${{ github.event.pull_request.base.sha }}");
  const loop = (step.run ?? "").slice((step.run ?? "").indexOf('for g in "${ratchet_gates[@]}"'));
  assert.match(loop, /case "\$g" in boundary\) BASE_RELATIVE=1 ;; \*\) BASE_RELATIVE= ;; esac/);
  assert.match(
    loop,
    /if \[ -n "\$BASE_RELATIVE" \] && \[ -n "\$\{PR_BASE_SHA:-\}" \]; then\s+npm run "check:\$g" -- --ratchet --base-ref "\$PR_BASE_SHA" \|\| failed\+=\("\$g"\)/
  );
});

// ---------------------------------------------------------------------------
// PR base-relative mode (--base-ref)
// ---------------------------------------------------------------------------

test("evaluateBoundaryRatchetRelative: ceiling is max(baseline, base); inherited drift warns, never blocks", () => {
  // (a) head == base > ceiling → OK, with the inherited-drift warning.
  const inherited = evaluateBoundaryRatchetRelative(776, 776, 774);
  assert.equal(inherited.status, "ok");
  assert.equal(inherited.exitCode, 0);
  assert.match(inherited.message, /head 776, base 776, baseline ceiling 774/);
  assert.match(inherited.warning ?? "", /base drift herdado: 2 acima do teto — não é desta PR/);

  // (b) head > base → FAIL even though the base itself is already over the ceiling.
  const grew = evaluateBoundaryRatchetRelative(777, 776, 774);
  assert.equal(grew.status, "fail");
  assert.equal(grew.exitCode, 1);
  assert.match(grew.message, /RATCHET FAIL/);
  assert.match(grew.message, /head 777, base 776, baseline ceiling 774/);
  assert.match(grew.warning ?? "", /base drift herdado: 2 acima do teto/);

  // (b') base under the ceiling: the baseline ceiling still binds.
  const overCeiling = evaluateBoundaryRatchetRelative(775, 770, 774);
  assert.equal(overCeiling.status, "fail");
  assert.equal(overCeiling.warning, undefined);
  assert.equal(evaluateBoundaryRatchetRelative(774, 770, 774).status, "ok");

  // (c) head < base → OK.
  const shrank = evaluateBoundaryRatchetRelative(775, 776, 774);
  assert.equal(shrank.status, "ok");
  assert.match(shrank.message, /head 775, base 776, baseline ceiling 774/);

  // No ceiling in the baseline → advisory, as in the absolute mode.
  const none = evaluateBoundaryRatchetRelative(900, 776, null);
  assert.equal(none.status, "advisory");
  assert.equal(none.exitCode, 0);
});

const GIT_ENV = {
  ...process.env,
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_CONFIG_GLOBAL: os.devNull,
  GIT_AUTHOR_NAME: "fixture",
  GIT_AUTHOR_EMAIL: "fixture@example.invalid",
  GIT_COMMITTER_NAME: "fixture",
  GIT_COMMITTER_EMAIL: "fixture@example.invalid",
};

function git(cwd: string, args: string[]) {
  const res = spawnSync("git", args, { cwd, encoding: "utf8", env: GIT_ENV });
  assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
  return res.stdout.trim();
}

const EXTRA_EDGE_FILE = "open-sse/services/extra.ts";
const EXTRA_EDGE = 'import { db } from "@/lib/db/core";\nexport const z = db;\n';

/**
 * Throwaway repo: commit `base` = TREE (+ the extra edge when `baseEdges` is 3), then
 * commit `head` with `headEdges` edges. Returns the base SHA.
 */
function withGitWorkspace(
  { baseEdges, headEdges, ceiling }: { baseEdges: 2 | 3; headEdges: 2 | 3; ceiling: number },
  fn: (ctx: { root: string; baselinePath: string; baseSha: string }) => void
) {
  withWorkspace(baselineWith(ceiling), ({ root, baselinePath }) => {
    const extra = path.join(root, EXTRA_EDGE_FILE);
    git(root, ["init", "-q"]);
    if (baseEdges === 3) fs.writeFileSync(extra, EXTRA_EDGE);
    git(root, ["add", "-A"]);
    git(root, ["commit", "-q", "--no-gpg-sign", "-m", "base"]);
    const baseSha = git(root, ["rev-parse", "HEAD"]);
    if (headEdges === 3) fs.writeFileSync(extra, EXTRA_EDGE);
    else fs.rmSync(extra, { force: true });
    // An unrelated head-only file proves the base is measured from git, not the worktree.
    fs.writeFileSync(path.join(root, "src/lib/db/head-only.ts"), "export const h = 1;\n");
    git(root, ["add", "-A"]);
    git(root, ["commit", "-q", "--no-gpg-sign", "--allow-empty", "-m", "head"]);
    fn({ root, baselinePath, baseSha });
    // Measuring the base must not have touched the working tree or the index.
    assert.equal(git(root, ["status", "--porcelain"]), "");
  });
}

function runRelative(root: string, baselinePath: string, baseRef: string) {
  return run(["--ratchet", "--root", root, "--baseline", baselinePath, "--base-ref", baseRef]);
}

test("--base-ref: head == base above the ceiling passes with the inherited-drift warning", () => {
  withGitWorkspace(
    { baseEdges: 2, headEdges: 2, ceiling: 1 },
    ({ root, baselinePath, baseSha }) => {
      const res = runRelative(root, baselinePath, baseSha);
      assert.equal(res.status, 0, res.stdout + res.stderr);
      const out = res.stdout + res.stderr;
      assert.match(out, /\[boundary\] RATCHET OK/);
      assert.match(out, /head 2, base 2, baseline ceiling 1/);
      assert.match(out, /base drift herdado: 1 acima do teto — não é desta PR/);
    }
  );
});

test("--base-ref: head above the base fails (exit 1) and names the three numbers", () => {
  withGitWorkspace(
    { baseEdges: 2, headEdges: 3, ceiling: 1 },
    ({ root, baselinePath, baseSha }) => {
      const res = runRelative(root, baselinePath, baseSha);
      assert.equal(res.status, 1, res.stdout + res.stderr);
      assert.match(res.stderr, /\[boundary\] RATCHET FAIL/);
      assert.match(res.stderr, /head 3, base 2, baseline ceiling 1/);
      assert.equal(readBaselineBoundaryValue(baselinePath), 1);
    }
  );
});

test("--base-ref: head below the base passes even when still above the baseline ceiling", () => {
  withGitWorkspace(
    { baseEdges: 3, headEdges: 2, ceiling: 1 },
    ({ root, baselinePath, baseSha }) => {
      const res = runRelative(root, baselinePath, baseSha);
      assert.equal(res.status, 0, res.stdout + res.stderr);
      assert.match(res.stdout + res.stderr, /head 2, base 3, baseline ceiling 1/);
    }
  );
});

test("without --base-ref the same repo keeps the absolute ceiling (inherited drift still fails)", () => {
  withGitWorkspace({ baseEdges: 2, headEdges: 2, ceiling: 1 }, ({ root, baselinePath }) => {
    const res = run(["--ratchet", "--root", root, "--baseline", baselinePath]);
    assert.equal(res.status, 1, res.stdout + res.stderr);
    assert.match(res.stderr, /\[boundary\] RATCHET FAIL/);
    assert.match(res.stderr, /2 edges, ceiling 1/);
    assert.doesNotMatch(res.stdout + res.stderr, /base drift/);
  });
});

test("--base-ref with an unknown or option-like ref warns and falls back to the absolute ceiling", () => {
  withGitWorkspace({ baseEdges: 2, headEdges: 2, ceiling: 1 }, ({ root, baselinePath }) => {
    for (const bad of ["0123456789abcdef0123456789abcdef01234567", "--output=pwned.tar"]) {
      const res = runRelative(root, baselinePath, bad);
      // Never a silent green: the absolute verdict (2 > 1) applies.
      assert.equal(res.status, 1, res.stdout + res.stderr);
      assert.match(res.stderr, /\[boundary\] WARNING .*falling back to the absolute ceiling/);
      assert.match(res.stderr, /\[boundary\] RATCHET FAIL/);
      assert.ok(!fs.existsSync(path.join(root, "pwned.tar")));
    }
  });
  withGitWorkspace({ baseEdges: 2, headEdges: 2, ceiling: 5 }, ({ root, baselinePath }) => {
    const res = runRelative(root, baselinePath, "0123456789abcdef0123456789abcdef01234567");
    assert.equal(res.status, 0, res.stdout + res.stderr);
    assert.match(res.stderr, /falling back to the absolute ceiling/);
    assert.match(res.stdout, /RATCHET OK - .*2 edges, ceiling 5/);
  });
});

test("--base-ref is only valid with --ratchet and needs a value", () => {
  withWorkspace(baselineWith(5), ({ root, baselinePath }) => {
    const alone = run(["--root", root, "--baseline", baselinePath, "--base-ref", "HEAD"]);
    assert.equal(alone.status, 2);
    assert.match(alone.stderr, /--base-ref requires --ratchet/);
    const update = run([
      "--update",
      "--root",
      root,
      "--baseline",
      baselinePath,
      "--base-ref",
      "HEAD",
    ]);
    assert.equal(update.status, 2);
    const empty = run(["--ratchet", "--root", root, "--baseline", baselinePath, "--base-ref"]);
    assert.equal(empty.status, 2);
    assert.match(empty.stderr, /--base-ref needs a value/);
  });
});
