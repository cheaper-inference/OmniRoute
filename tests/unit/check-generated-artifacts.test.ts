import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  GENERATED_ARTIFACT_TAG,
  defaultGeneratedArtifactChecks,
  missingE2eTimings,
  runGeneratedArtifactChecks,
} from "../../scripts/check/check-generated-artifacts.mjs";
import { README_DIAGRAMS } from "../../scripts/docs/gen-readme-diagrams.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const noArgs = ["node", "script"];
const PR_ENV = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/x" };
const HERO = "docs/diagrams/readme-hero.svg";
const BUDGET = "docs/diagrams/free-tier-budget.svg";

// Two fake artifacts: the hero matches its generator, the budget card is stale.
const fakeChecks = () => {
  const calls: string[] = [];
  const checks = [
    {
      path: HERO,
      verify: async () => {
        calls.push(HERO);
        return null;
      },
    },
    {
      path: BUDGET,
      verify: async () => {
        calls.push(BUDGET);
        return `${BUDGET} is stale — regenerate with \`npm run docs:readme-diagrams\``;
      },
    },
  ];
  return { checks, calls };
};

function capture() {
  const lines: string[] = [];
  return { lines, log: (line: string) => lines.push(line) };
}

test("release mode judges every generated artifact and fails on a stale one", async () => {
  const { checks, calls } = fakeChecks();
  const { lines, log } = capture();
  const res = await runGeneratedArtifactChecks({ checks, argv: noArgs, env: {}, log });
  assert.deepEqual(calls, [HERO, BUDGET]);
  assert.deepEqual(res.failed, [BUDGET]);
  assert.match(lines.join("\n"), /mode=release \(auto: local run\); judging all 2 generated/);
  assert.match(lines.join("\n"), /✗ docs\/diagrams\/free-tier-budget\.svg is stale/);
});

test("pr mode leaves an artifact the change did not edit to the release refresh", async () => {
  const { checks, calls } = fakeChecks();
  const { lines, log } = capture();
  const res = await runGeneratedArtifactChecks({
    checks,
    argv: noArgs,
    env: PR_ENV,
    changedFiles: ["src/shared/constants/providers.ts"],
    log,
  });
  assert.deepEqual(calls, []);
  assert.deepEqual(res.failed, []);
  assert.deepEqual(res.skipped, [HERO, BUDGET]);
  assert.match(
    lines.join("\n"),
    new RegExp(`^\\${GENERATED_ARTIFACT_TAG} SKIP reason=pr-mode — `, "m")
  );
});

test("pr mode judges an artifact the change edited (a hand edit or stale regeneration fails)", async () => {
  const { checks, calls } = fakeChecks();
  const { log } = capture();
  const res = await runGeneratedArtifactChecks({
    checks,
    argv: noArgs,
    env: PR_ENV,
    changedFiles: [BUDGET, "scripts/docs/gen-readme-free-tier-budget.mjs"],
    log,
  });
  assert.deepEqual(calls, [BUDGET]);
  assert.deepEqual(res.failed, [BUDGET]);
});

test("pr mode without a diff base fails closed: every artifact is judged", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gen-artifacts-nobase-"));
  try {
    const { checks, calls } = fakeChecks();
    const { lines, log } = capture();
    const res = await runGeneratedArtifactChecks({
      checks,
      argv: noArgs,
      env: { ...PR_ENV, BASE_SHA: "deadbeef" },
      cwd: dir,
      log,
    });
    assert.deepEqual(calls, [HERO, BUDGET]);
    assert.deepEqual(res.failed, [BUDGET]);
    assert.match(lines.join("\n"), /no diff base .* judging all 2 .*fail-closed/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("missingE2eTimings lists the specs without an entry", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gen-artifacts-e2e-"));
  try {
    fs.mkdirSync(path.join(dir, "config", "quality"), { recursive: true });
    fs.mkdirSync(path.join(dir, "tests", "e2e"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "config", "quality", "e2e-timings.json"),
      JSON.stringify({ _meta: "x", "a.spec.ts": 1 })
    );
    for (const f of ["a.spec.ts", "b.spec.ts", "helper.ts"]) {
      fs.writeFileSync(path.join(dir, "tests", "e2e", f), "");
    }
    assert.deepEqual(missingE2eTimings(dir), ["b.spec.ts"]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the default checks cover every README diagram plus the e2e timings seed", async () => {
  const checks = await defaultGeneratedArtifactChecks(root);
  assert.deepEqual(
    checks.map((c: { path: string }) => c.path),
    [...README_DIAGRAMS.map((d) => d.out), "config/quality/e2e-timings.json"]
  );
});
