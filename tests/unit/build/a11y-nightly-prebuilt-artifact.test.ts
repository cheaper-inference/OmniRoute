// Regression guard for the nightly a11y job (#16853).
//
// The job used to self-build the full dashboard through the Playwright webServer on the
// light pool (`omni-light`, jobs <= ~6 GB) and booted it on the runner's persistent
// $HOME. That build does not fit the pool (Turbopack ~40 GB RSS on the `.113`, #16169;
// webpack needs a >= 10 GB heap) and a stale $HOME/.omniroute database keeps the server
// from ever becoming healthy, so the 2026-10-18 run waited 30 silent minutes and failed
// with "Timed out waiting 1800000ms from config.webServer".
//
// Contract pinned here: `a11y-build` builds once on the build pool and uploads the
// artefact; `a11y` downloads and extracts it, boots it with OMNIROUTE_PLAYWRIGHT_SKIP_BUILD
// on a fresh DATA_DIR, never builds itself, and pipes the server output into the log.
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import * as yaml from "js-yaml";

interface Step {
  name?: string;
  uses?: string;
  run?: string;
  with?: Record<string, unknown>;
  env?: Record<string, string>;
}

interface Job {
  if?: string;
  needs?: string | string[];
  "runs-on"?: string;
  env?: Record<string, string>;
  steps: Step[];
}

const root = new URL("../../../", import.meta.url);
const workflow = yaml.load(
  fs.readFileSync(new URL(".github/workflows/nightly-resilience.yml", root), "utf8")
) as { jobs: Record<string, Job> };
const playwrightConfig = fs.readFileSync(new URL("playwright.config.ts", root), "utf8");

const build = workflow.jobs["a11y-build"];
const a11y = workflow.jobs.a11y;

function indexOfStep(job: Job, predicate: (step: Step) => boolean, label: string): number {
  const index = job.steps.findIndex(predicate);
  assert.ok(index >= 0, `missing step: ${label}`);
  return index;
}

const isIsolatedRuntime = (step: Step) =>
  /mktemp -d "\$RUNNER_TEMP\//.test(step.run ?? "") &&
  /DATA_DIR=/.test(step.run ?? "") &&
  /OMNIROUTE_PLUGINS_DIR=/.test(step.run ?? "");

test("a11y-build builds the production dashboard once on the build pool and uploads it", () => {
  assert.ok(build, "nightly-resilience.yml must define the a11y-build job");
  assert.match(build["runs-on"] ?? "", /omni-build/, "the build runs where builds fit");
  assert.match(build.if ?? "", /github\.repository == 'cheaper-inference\/OmniRoute'/);

  const isolated = indexOfStep(build, isIsolatedRuntime, "isolated DATA_DIR");
  const install = indexOfStep(build, (s) => s.run?.trim() === "npm ci", "npm ci");
  const compile = indexOfStep(build, (s) => s.run?.trim() === "npm run build", "npm run build");
  const archive = indexOfStep(
    build,
    (s) => /tar -czf "\$RUNNER_TEMP\/a11y-build\.tar\.gz"/.test(s.run ?? ""),
    "archive"
  );
  const upload = indexOfStep(
    build,
    (s) => (s.uses ?? "").startsWith("actions/upload-artifact@"),
    "upload-artifact"
  );
  assert.ok(isolated < install && install < compile && compile < archive && archive < upload);
  assert.match(build.steps[archive].run ?? "", /--exclude='\.build\/next\/cache'/);
  assert.equal(build.steps[upload].with?.name, "a11y-next-build");
});

test("a11y boots the downloaded build on a fresh DATA_DIR and never builds itself", () => {
  assert.ok(a11y, "nightly-resilience.yml must define the a11y job");
  const needs = Array.isArray(a11y.needs) ? a11y.needs : [a11y.needs];
  assert.ok(needs.includes("a11y-build"), "a11y must wait for the artefact");
  assert.equal(a11y.env?.OMNIROUTE_PLAYWRIGHT_SKIP_BUILD, "1");
  assert.equal(a11y.env?.OMNIROUTE_PLAYWRIGHT_WEB_SERVER_STDOUT, "pipe");
  const window = Number(a11y.env?.OMNIROUTE_PLAYWRIGHT_WEB_SERVER_TIMEOUT);
  assert.ok(window > 0 && window <= 900_000, `boot window, not a build window: ${window}`);

  const isolated = indexOfStep(a11y, isIsolatedRuntime, "isolated DATA_DIR");
  const download = indexOfStep(
    a11y,
    (s) => (s.uses ?? "").startsWith("actions/download-artifact@"),
    "download-artifact"
  );
  assert.equal(a11y.steps[download].with?.name, "a11y-next-build");
  const extract = indexOfStep(
    a11y,
    (s) => /tar -xzf next-build-artifact\/a11y-build\.tar\.gz/.test(s.run ?? ""),
    "extract"
  );
  const suite = indexOfStep(
    a11y,
    (s) => /npx playwright test tests\/e2e\/a11y\.spec\.ts/.test(s.run ?? ""),
    "axe suite"
  );
  assert.ok(isolated < suite && download < extract && extract < suite);
  assert.ok(
    !a11y.steps.some((s) => /npm run build\b|build-next-isolated/.test(s.run ?? "")),
    "the a11y job must not build"
  );
});

test("a11y boots the artefact on a hosted runner, where the download takes seconds", () => {
  // Run 39156364797 (2026-10-18): on the light pool the 1.2 GB artefact took 1,416 s to download
  // and the 30-minute job timeout cancelled the job while it was still extracting, before the
  // axe suite ran. Hosted runners pull the same class of artefact in ~10 s (the per-PR E2E
  // shards, 518 MB in 7-10 s), booting a prebuilt standalone server fits them, and a fresh VM
  // has no port or $HOME left behind by other jobs.
  assert.equal(a11y["runs-on"], "ubuntu-latest");
  const timeout = (a11y as Job & { "timeout-minutes"?: number })["timeout-minutes"] ?? 0;
  assert.ok(timeout >= 30, `timeout-minutes is ${timeout}`);
});

test("playwright.config pipes the webServer stdout only when asked", () => {
  assert.match(
    playwrightConfig,
    /stdout:\s*process\.env\.OMNIROUTE_PLAYWRIGHT_WEB_SERVER_STDOUT === "pipe" \? "pipe" : "ignore"/
  );
});
