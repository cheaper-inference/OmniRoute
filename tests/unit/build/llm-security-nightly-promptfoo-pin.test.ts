// Exact CLI/lockfile contract for the injection-guard nightly. Runtime compatibility
// with structured HTTP errors is exercised by promptfoo-guard-json-error.test.mjs.
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

test("guard config preserves error JSON as output and requires the expected HTTP status", () => {
  const config = yaml.load(read("promptfooconfig.yaml")) as {
    providers: { config: { transformResponse: string; validateStatus: string } }[];
  };
  assert.equal(config.providers[0].config.transformResponse, "JSON.stringify(json)");
  assert.equal(config.providers[0].config.validateStatus, "status === 400");
});
