// Regression guard for the promptfoo guard-validation step of nightly-llm-security.yml.
//
// 2026-10-17 (run 39007982929): the server booted fine (fresh DATA_DIR, block mode) and the
// guard answered both injection prompts with the expected `400 {error:{code:"SECURITY_001"}}`,
// yet the step exited 100 with `TypeError: result?.error?.includes is not a function` raised
// inside promptfoo's own `isProviderResponseRateLimited`. promptfoo ≥ 0.123.1 assumes a
// provider error is a string; the https provider hands it the parsed 4xx JSON object, so
// every blocked request becomes an eval ERROR instead of a PASS. Verified against a fake
// block-mode server with the repo's promptfooconfig.yaml: 0.122.1 and 0.123.0 pass 2/2,
// 0.123.1 and 0.124.1 (today's `@latest`) error 2/2.
//
// Two things made the nightly drift onto a broken release without anyone changing it:
// the step pulled `promptfoo@latest` from the network, and the devDependency floated on
// `^0.123.0`. The lockfile install is not usable either (#17017: a nested js-yaml 4.3.2
// breaks the in-repo promptfoo at import). Contract pinned here: the step runs an exact,
// network-isolated `npx --yes promptfoo@X.Y.Z`, that version equals the exact devDependency
// pin, the lockfile agrees with it, and it is not one of the releases proven broken.
import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import * as yaml from "js-yaml";

interface Step {
  name?: string;
  run?: string;
  "working-directory"?: string;
}

const root = new URL("../../../", import.meta.url);
const read = (rel: string) => fs.readFileSync(new URL(rel, root), "utf8");

const workflow = yaml.load(read(".github/workflows/nightly-llm-security.yml")) as {
  jobs: Record<string, { steps: Step[] }>;
};
const pkg = JSON.parse(read("package.json")) as { devDependencies: Record<string, string> };
const lock = JSON.parse(read("package-lock.json")) as {
  packages: Record<string, { version?: string }>;
};

// Releases observed to throw inside isProviderResponseRateLimited on a 4xx JSON body
// (promptfoo/promptfoo#10866 shipped in 0.123.1). Extend only with a reproduced version.
const KNOWN_BROKEN = new Set(["0.123.1", "0.124.1"]);
const EXACT_SEMVER = /^\d+\.\d+\.\d+$/;

function guardStep(): Step {
  const step = workflow.jobs["promptfoo-guard"].steps.find((s) =>
    /promptfoo guard-validation/i.test(s.name ?? "")
  );
  assert.ok(step?.run, "promptfoo-guard job must keep the `promptfoo guard-validation` step");
  return step;
}

test("guard-validation runs an exact, network-isolated promptfoo that mirrors the devDependency pin", () => {
  const run = guardStep().run!;
  // Not `@latest` (drifted onto 0.124.1) and not the lockfile binary (`npx --no-install`):
  // #17017 — the lock nests js-yaml 4.3.2 under @apidevtools/json-schema-ref-parser, so the
  // in-repo promptfoo throws at import (`binaryTag`). An exact `npx --yes promptfoo@X.Y.Z`
  // installs its own dependency tree in the npx cache.
  const match = run.match(/npx --yes promptfoo@(\d+\.\d+\.\d+) eval/);
  assert.ok(match, `expected \`npx --yes promptfoo@<exact> eval\`, got: ${run}`);
  assert.doesNotMatch(run, /promptfoo@latest|--no-install/);
  assert.equal(
    match![1],
    pkg.devDependencies.promptfoo,
    "the workflow pin must equal the package.json devDependency pin (single version to bump)"
  );
  assert.match(
    run,
    /-c "\$GITHUB_WORKSPACE\/promptfooconfig\.yaml"/,
    "still evaluates the repo's promptfooconfig.yaml, addressed from the workspace root"
  );
});

test("guard-validation runs from outside the checkout so the repo's promptfoo cannot shadow the npx tree", () => {
  // npx prefers the nearest node_modules. The devDependency pin (#17005) means the repo's
  // own promptfoo satisfies `promptfoo@<pin>`, and that install is unusable on this branch
  // (#17017: nested js-yaml 4.3.2). Run 39095530088 proved it: same command, run from the
  // workspace, imported node_modules/promptfoo and died on `binaryTag`.
  const step = guardStep();
  assert.equal(
    step["working-directory"],
    "${{ runner.temp }}",
    "working-directory must be runner.temp (no node_modules above it)"
  );
});

test("promptfoo devDependency is pinned exactly and the lockfile agrees", () => {
  const declared = pkg.devDependencies.promptfoo;
  assert.ok(declared, "promptfoo must stay a devDependency (that is what `npm ci` installs)");
  assert.match(declared, EXACT_SEMVER, `exact pin expected, got range ${declared}`);
  const locked = lock.packages["node_modules/promptfoo"]?.version;
  assert.equal(locked, declared, "package-lock.json must resolve promptfoo to the pinned version");
});

test("pinned promptfoo is not a release proven to error on the guard's 4xx JSON body", () => {
  const declared = pkg.devDependencies.promptfoo;
  assert.ok(
    !KNOWN_BROKEN.has(declared),
    `promptfoo ${declared} errors with "result?.error?.includes is not a function" on blocked requests`
  );
});
