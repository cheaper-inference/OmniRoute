// Runs the real shell scripts of .github/workflows/docker-publish.yml against a fake `docker`
// (and a fake `git` for the prepare step). Policy under test: Node and Web are mandatory, exactly
// two validated digests; Bun is best-effort and all-or-nothing, and it never affects the other two.
import test from "node:test";
import assert from "node:assert/strict";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = readFileSync(path.join(root, ".github/workflows/docker-publish.yml"), "utf8");
const buildJob = workflow.slice(workflow.indexOf("\n  build:"), workflow.indexOf("\n  merge:"));

const AMD64 = "a".repeat(64);
const ARM64 = "b".repeat(64);
const AMD64_AGAIN = "c".repeat(64);
const ALL_FLAVORS = ["base", "web", "bun-base", "bun-web"];
const IMAGE = "example/image";
const GHCR = "ghcr.io/example/image";

function step(name) {
  const start = workflow.indexOf(`      - name: ${name}\n`);
  assert.notEqual(start, -1, `missing step: ${name}`);
  const next = workflow.indexOf("\n      - name:", start + 1);
  return workflow.slice(start, next === -1 ? undefined : next);
}

function script(name) {
  const block = step(name).split("        run: |\n")[1];
  assert.ok(block, `missing shell script: ${name}`);
  const lines = [];
  for (const line of block.split("\n")) {
    if (line !== "" && !line.startsWith("          ")) break;
    lines.push(line.replace(/^ {10}/, ""));
  }
  return lines.join("\n");
}

// A shell script, not node: the scripts under test call it dozens of times per file.
// Inspect answers: refs ending in ARM64 are arm64 digests, other digests amd64, and tags come from
// FAKE_TAGS ("ref=state" words, "complete" unless listed). FAKE_FAIL_INSPECT and FAKE_FAIL_CREATE
// hold substrings of refs whose inspect or create call fails.
const FAKE_DOCKER = [
  "#!/bin/sh",
  'printf "%s\\n" "$*" >> "$FAKE_DOCKER_LOG"',
  'index() { printf "{\\"manifests\\":[";',
  '  sep=""; for arch in "$@"; do',
  '    printf "%s{\\"platform\\":{\\"os\\":\\"linux\\",\\"architecture\\":\\"%s\\"}}" "$sep" "$arch"; sep=",";',
  '  done; printf "]}\\n"; }',
  'if [ "$3" = create ]; then',
  '  for part in $FAKE_FAIL_CREATE; do case "$5" in *"$part"*) echo "push failed" >&2; exit 1;; esac; done',
  "  exit 0",
  "fi",
  'for ref in "$@"; do :; done',
  'for part in $FAKE_FAIL_INSPECT; do case "$ref" in *"$part"*)',
  '  echo "ERROR: failed to do request: 429 Too Many Requests" >&2; exit 1;; esac; done',
  'case "$ref" in',
  `  *@sha256:${ARM64}) index arm64; exit 0;;`,
  "  *@sha256:*) index amd64; exit 0;;",
  "esac",
  "state=complete",
  'for entry in $FAKE_TAGS; do case "$entry" in "$ref="*) state="${entry##*=}";; esac; done',
  'case "$state" in',
  '  missing) echo "ERROR: docker.io/$ref: not found" >&2; exit 1;;',
  "  amd64-only) index amd64;;",
  "  *) index amd64 arm64;;",
  "esac",
  "",
].join("\n");

function withSandbox(fn) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "docker-publish-test-"));
  try {
    writeFileSync(path.join(dir, "docker"), FAKE_DOCKER);
    writeFileSync(path.join(dir, "git"), `#!/bin/sh\n[ "$1" = tag ] && echo v1.0.0\nexit 0\n`);
    chmodSync(path.join(dir, "docker"), 0o755);
    chmodSync(path.join(dir, "git"), 0o755);
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function writeDigests(dir, digests) {
  for (const [flavor, names] of Object.entries(digests)) {
    if (names === null) continue;
    mkdirSync(path.join(dir, "digests", flavor), { recursive: true });
    for (const name of names) writeFileSync(path.join(dir, "digests", flavor, name), "");
  }
}

function runScript(dir, name, { scenario = {}, env = {} } = {}) {
  const logFile = path.join(dir, "docker.log");
  const outputFile = path.join(dir, "github-output");
  rmSync(logFile, { force: true });
  rmSync(outputFile, { force: true });
  writeFileSync(logFile, "");
  writeFileSync(outputFile, "");
  const result = spawnSync(
    "bash",
    ["-c", script(name).replaceAll("/tmp/digests", path.join(dir, "digests"))],
    {
      cwd: root,
      env: {
        ...process.env,
        PATH: `${dir}:${process.env.PATH}`,
        IMAGE_NAME: IMAGE,
        GHCR_IMAGE_NAME: GHCR,
        VERSION: "1.0.0",
        GITHUB_OUTPUT: outputFile,
        FAKE_DOCKER_LOG: logFile,
        FAKE_TAGS: Object.entries(scenario.tags ?? {})
          .map(([ref, state]) => `${ref}=${state}`)
          .join(" "),
        FAKE_FAIL_INSPECT: (scenario.failInspect ?? []).join(" "),
        FAKE_FAIL_CREATE: (scenario.failCreate ?? []).join(" "),
        DOCKER_IMAGE_COMPLETE_RETRY_DELAY_MS: "0",
        ...env,
      },
      encoding: "utf8",
    }
  );
  const calls = readFileSync(logFile, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" "));
  const outputs = Object.fromEntries(
    readFileSync(outputFile, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => line.split("="))
  );
  return {
    ...result,
    combined: result.stdout + result.stderr,
    outputs,
    inspected: calls.filter((call) => call[2] === "inspect").map((call) => call.at(-1)),
    created: calls
      .filter((call) => call[2] === "create")
      .map((call) => call[call.indexOf("-t") + 1]),
  };
}

function runGuard(digests, scenario) {
  return withSandbox((dir) => {
    const pairs = Object.fromEntries(ALL_FLAVORS.map((flavor) => [flavor, [AMD64, ARM64]]));
    writeDigests(dir, { ...pairs, ...digests });
    return runScript(dir, "Guard against stale digests", { scenario });
  });
}

const DIGEST_SETS = [
  ["0", []],
  ["1", [AMD64]],
  ["3", [AMD64, ARM64, AMD64_AGAIN]],
];

for (const flavor of ["base", "web"]) {
  for (const [label, names] of DIGEST_SETS) {
    test(`guard: ${label} ${flavor} digests stop the publish`, () => {
      const result = runGuard({ [flavor]: names });
      assert.notEqual(result.status, 0, result.combined);
      assert.deepEqual(result.outputs, {});
    });
  }

  test(`guard: a missing ${flavor} digest directory stops the publish`, () => {
    const result = runGuard({ [flavor]: null });
    assert.notEqual(result.status, 0, result.combined);
    assert.deepEqual(result.outputs, {});
  });

  test(`guard: two AMD64 ${flavor} digests stop the publish`, () => {
    const result = runGuard({ [flavor]: [AMD64, AMD64_AGAIN] });
    assert.notEqual(result.status, 0, result.combined);
    assert.deepEqual(result.outputs, {});
  });
}

test("guard: a registry failure on mandatory digests stops the publish", () => {
  const result = runGuard({}, { failInspect: [GHCR] });
  assert.notEqual(result.status, 0, result.combined);
  assert.deepEqual(result.outputs, {});
});

for (const [label, names] of [...DIGEST_SETS, ["no directory with", null]]) {
  test(`guard: ${label} Bun digests warn and publish no Bun tag, never failing the run`, () => {
    const result = runGuard({ "bun-base": names });
    assert.equal(result.status, 0, result.combined);
    assert.match(result.combined, /::warning::Not publishing the bun-base image/);
    assert.deepEqual(result.outputs, { publish_bun_base: "false", publish_bun_web: "true" });
  });
}

test("guard: two AMD64 Bun digests warn and publish no Bun tag", () => {
  const result = runGuard({ "bun-web": [AMD64, AMD64_AGAIN] });
  assert.equal(result.status, 0, result.combined);
  assert.match(result.combined, /::warning::Not publishing the bun-web image/);
  assert.deepEqual(result.outputs, { publish_bun_base: "true", publish_bun_web: "false" });
});

test("guard: a Bun pair must validate in both registries", () => {
  const digests = { "bun-base": ["d".repeat(64), ARM64] };
  const result = withSandbox((dir) => {
    writeDigests(dir, {
      base: [AMD64, ARM64],
      web: [AMD64, ARM64],
      "bun-web": [AMD64, ARM64],
      ...digests,
    });
    return runScript(dir, "Guard against stale digests", {
      scenario: { failInspect: [`${GHCR}@sha256:${"d".repeat(64)}`] },
    });
  });
  assert.equal(result.status, 0, result.combined);
  assert.equal(result.outputs.publish_bun_base, "false");
  assert.equal(result.outputs.publish_bun_web, "true");
});

test("guard: a complete set publishes every flavor without warnings", () => {
  const result = runGuard({});
  assert.equal(result.status, 0, result.combined);
  assert.doesNotMatch(result.combined, /::warning::/);
  assert.deepEqual(result.outputs, { publish_bun_base: "true", publish_bun_web: "true" });
});

test("build: the Node and Web digests are exported and uploaded before any Bun step", () => {
  const firstBunStep = buildJob.indexOf("- name: Build and push BUN");
  assert.notEqual(firstBunStep, -1);
  for (const name of ["Export digests", "Upload base digests", "Upload web digests"]) {
    const at = buildJob.indexOf(`- name: ${name}\n`);
    assert.notEqual(at, -1, `missing step: ${name}`);
    assert.ok(at < firstBunStep, `${name} must run before the Bun builds`);
    assert.doesNotMatch(step(name), /continue-on-error/);
    assert.doesNotMatch(step(name), /bun/i);
  }
});

test("build: the Node and Web export works with no Bun input at all", () => {
  withSandbox((dir) => {
    const result = runScript(dir, "Export digests", {
      env: { DIGEST_BASE: `sha256:${AMD64}`, DIGEST_WEB: `sha256:${ARM64}` },
    });
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(readdirSync(path.join(dir, "digests")).sort(), ["base", "web"]);
    assert.ok(existsSync(path.join(dir, "digests/base", AMD64)));
    assert.ok(existsSync(path.join(dir, "digests/web", ARM64)));
  });
});

test("build: a failed Bun build exports nothing for that flavor and keeps the other", () => {
  withSandbox((dir) => {
    const result = runScript(dir, "Export Bun digests", {
      env: { DIGEST_BUN_BASE: "", DIGEST_BUN_WEB: `sha256:${AMD64}` },
    });
    assert.equal(result.status, 0, result.combined);
    assert.match(result.combined, /::warning::Bun base build produced no digest/);
    assert.deepEqual(readdirSync(path.join(dir, "digests/bun-base")), []);
    assert.deepEqual(readdirSync(path.join(dir, "digests/bun-web")), [AMD64]);
  });
});

test("build: every Bun step is non-blocking and only the Node and Web steps can fail the job", () => {
  for (const name of [
    "Build and push BUN base platform image by digest",
    "Build and push BUN web platform image by digest",
    "Export Bun digests",
    "Upload bun-base digests",
    "Upload bun-web digests",
  ]) {
    assert.match(step(name), /continue-on-error: true/, name);
  }
  for (const name of [
    "Build and push BUN base platform image by digest",
    "Build and push BUN web platform image by digest",
  ]) {
    assert.match(step(name), /timeout-minutes: \d+/, `${name} must not reach the job limit`);
  }
  for (const name of ["Upload bun-base digests", "Upload bun-web digests"]) {
    assert.match(step(name), /if-no-files-found: ignore/, name);
  }
  for (const name of ["Upload base digests", "Upload web digests"]) {
    assert.match(step(name), /if-no-files-found: error/, name);
  }
  for (const name of [
    "Build and push platform image by digest",
    "Build and push WEB platform image by digest",
  ]) {
    assert.doesNotMatch(step(name), /continue-on-error/, name);
  }
  assert.match(workflow, /platform: linux\/amd64/);
  assert.match(workflow, /platform: linux\/arm64/);
});

test("merge: Bun digest downloads may find nothing", () => {
  for (const name of ["Download bun-base digests", "Download bun-web digests"]) {
    assert.match(step(name), /continue-on-error: true/, name);
  }
});

const MANIFEST_STEPS = [
  ["Create Docker Hub version manifests", IMAGE],
  ["Create GHCR version manifests", GHCR],
];

function runManifests(name, env, scenario) {
  return withSandbox((dir) => {
    writeDigests(dir, Object.fromEntries(ALL_FLAVORS.map((flavor) => [flavor, [AMD64, ARM64]])));
    return runScript(dir, name, { env, scenario });
  });
}

for (const [name, image] of MANIFEST_STEPS) {
  const tag = (suffix) => `${image}:1.0.0${suffix}`;

  test(`${name}: creates every tag when the guard passed all flavors`, () => {
    const result = runManifests(name, { PUBLISH_BUN_BASE: "true", PUBLISH_BUN_WEB: "true" });
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(result.created, [tag(""), tag("-web"), tag("-bun"), tag("-web-bun")]);
  });

  test(`${name}: publishes no Bun tag the guard refused`, () => {
    const result = runManifests(name, { PUBLISH_BUN_BASE: "false", PUBLISH_BUN_WEB: "true" });
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(result.created, [tag(""), tag("-web"), tag("-web-bun")]);
  });

  test(`${name}: a failed Bun manifest warns and keeps the step green`, () => {
    const result = runManifests(
      name,
      { PUBLISH_BUN_BASE: "true", PUBLISH_BUN_WEB: "true" },
      { failCreate: ["-bun"] }
    );
    assert.equal(result.status, 0, result.combined);
    assert.match(result.combined, /::warning::Could not publish/);
    assert.ok(result.created.includes(tag("")) && result.created.includes(tag("-web")));
  });

  test(`${name}: a failed mandatory manifest fails the step before any Bun tag`, () => {
    const result = runManifests(
      name,
      { PUBLISH_BUN_BASE: "true", PUBLISH_BUN_WEB: "true" },
      { failCreate: ["1.0.0-web"] }
    );
    assert.notEqual(result.status, 0, result.combined);
    assert.deepEqual(result.created, [tag(""), tag("-web")]);
  });
}

const PROMOTE_STEPS = [
  ["Promote Docker Hub latest tags", IMAGE],
  ["Promote GHCR latest tags", GHCR],
];

function runPromotion(name, env, scenario) {
  return withSandbox((dir) => runScript(dir, name, { env, scenario }));
}

for (const [name, image] of PROMOTE_STEPS) {
  const latest = (suffix) => `${image}:latest${suffix}`;
  const source = (suffix) => `${image}:1.0.0${suffix}`;
  const both = { PUBLISH_BUN_BASE: "true", PUBLISH_BUN_WEB: "true" };

  test(`${name}: promotes every flavor this run published complete`, () => {
    const result = runPromotion(name, both);
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(result.created, [
      latest(""),
      latest("-web"),
      latest("-bun"),
      latest("-web-bun"),
    ]);
  });

  test(`${name}: never promotes a Bun alias the guard refused`, () => {
    const result = runPromotion(name, { PUBLISH_BUN_BASE: "false", PUBLISH_BUN_WEB: "false" });
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(result.created, [latest(""), latest("-web")]);
    assert.match(result.combined, /::warning::Not promoting/);
    assert.ok(!result.inspected.some((ref) => ref.includes("bun")));
  });

  test(`${name}: never promotes a partial Bun source`, () => {
    const result = runPromotion(name, both, { tags: { [source("-bun")]: "amd64-only" } });
    assert.equal(result.status, 0, result.combined);
    assert.deepEqual(result.created, [latest(""), latest("-web"), latest("-web-bun")]);
    assert.match(result.combined, /::warning::Not promoting/);
  });

  test(`${name}: a failed Bun alias warns and keeps the step green`, () => {
    const result = runPromotion(name, both, { failCreate: ["latest-bun"] });
    assert.equal(result.status, 0, result.combined);
    assert.match(result.combined, /::warning::Could not promote/);
    assert.ok(result.created.includes(latest("")) && result.created.includes(latest("-web")));
  });

  test(`${name}: an incomplete mandatory source moves no alias at all`, () => {
    const result = runPromotion(name, both, { tags: { [source("-web")]: "amd64-only" } });
    assert.notEqual(result.status, 0, result.combined);
    assert.deepEqual(result.created, []);
  });
}

const PREPARE = "Resolve version, latest-promotion, and skip flag";
const TAG_PUSH = {
  EVENT_NAME: "push",
  REF_TYPE: "tag",
  REF_NAME: "v1.0.0",
  DEFAULT_BRANCH: "main",
};
const MANDATORY_REFS = [
  `${IMAGE}:1.0.0`,
  `${IMAGE}:1.0.0-web`,
  `${GHCR}:1.0.0`,
  `${GHCR}:1.0.0-web`,
];

function runPrepare(env, scenario) {
  // Actions defines every variable of the step's env block, empty when the event lacks it.
  const stepEnv = { INPUT_VERSION: "", PROMOTE_INPUT: "", ...env };
  return withSandbox((dir) => runScript(dir, PREPARE, { env: stepEnv, scenario }));
}

test("prepare: skips when the mandatory images are complete, without looking at Bun", () => {
  const result = runPrepare(TAG_PUSH, {
    tags: {
      [`${IMAGE}:1.0.0-bun`]: "missing",
      [`${IMAGE}:1.0.0-web-bun`]: "amd64-only",
      [`${GHCR}:1.0.0-bun`]: "missing",
      [`${GHCR}:1.0.0-web-bun`]: "missing",
    },
  });
  assert.equal(result.status, 0, result.combined);
  assert.equal(result.outputs.skip, "true");
  assert.deepEqual(result.inspected, MANDATORY_REFS);
});

for (const ref of MANDATORY_REFS) {
  test(`prepare: rebuilds when ${ref} is missing and stops looking at the first miss`, () => {
    const result = runPrepare(TAG_PUSH, { tags: { [ref]: "missing" } });
    assert.equal(result.status, 0, result.combined);
    assert.equal(result.outputs.skip, "false");
    assert.equal(result.inspected.at(-1), ref);
    assert.equal(new Set(result.inspected).size, MANDATORY_REFS.indexOf(ref) + 1);
  });
}

test("prepare: rebuilds when a mandatory tag has a single architecture", () => {
  const result = runPrepare(TAG_PUSH, { tags: { [`${GHCR}:1.0.0`]: "amd64-only" } });
  assert.equal(result.status, 0, result.combined);
  assert.equal(result.outputs.skip, "false");
});

test("prepare: a registry failure fails the job instead of forcing a rebuild", () => {
  const result = runPrepare(TAG_PUSH, { failInspect: [`${GHCR}:1.0.0`] });
  assert.notEqual(result.status, 0, result.combined);
  assert.match(result.combined, /::error::Could not inspect/);
  assert.equal(result.outputs.skip, undefined);
  assert.equal(
    result.inspected.filter((ref) => ref === `${GHCR}:1.0.0`).length,
    3,
    "the helper retries before giving up"
  );
});

test("prepare: workflow_dispatch is the repair path and never skips or inspects", () => {
  const result = runPrepare({
    EVENT_NAME: "workflow_dispatch",
    REF_TYPE: "branch",
    REF_NAME: "release/v1.0.0",
    INPUT_VERSION: "1.0.0",
    PROMOTE_INPUT: "false",
    DEFAULT_BRANCH: "release/v1.0.0",
  });
  assert.equal(result.status, 0, result.combined);
  assert.equal(result.outputs.skip, "false");
  assert.deepEqual(result.inspected, []);
});

test("prepare: floating channels never skip or inspect", () => {
  const result = runPrepare({
    EVENT_NAME: "push",
    REF_TYPE: "branch",
    REF_NAME: "release/v1.0.0",
    DEFAULT_BRANCH: "release/v1.0.0",
  });
  assert.equal(result.status, 0, result.combined);
  assert.equal(result.outputs.version, "next");
  assert.equal(result.outputs.skip, "false");
  assert.deepEqual(result.inspected, []);
});

test("backfills use current validation scripts but build the requested release source", () => {
  const prepare = workflow.slice(
    workflow.indexOf("\n  prepare:"),
    workflow.indexOf("\n  runner-preflight:")
  );
  assert.doesNotMatch(prepare, /ref:.*inputs.version/);
  const checkouts = load(workflow).jobs.merge.steps.filter((entry) =>
    entry.uses?.startsWith("actions/checkout@")
  );
  const rootCheckout = checkouts.filter((entry) => !entry.with?.path);
  assert.equal(rootCheckout.length, 1);
  assert.equal(rootCheckout[0].with?.ref, undefined);
  for (const checkout of checkouts) {
    if (checkout.with?.path === ".ci-trivy-candidate") {
      // This isolated checkout supplies data, never scripts from the old release.
      assert.equal(checkout.with["sparse-checkout"].trim(), "/.trivyignore.yaml");
      assert.equal(checkout.with["sparse-checkout-cone-mode"], false);
      assert.equal(checkout.with["persist-credentials"], false);
    } else {
      assert.doesNotMatch(String(checkout.with?.ref || ""), /inputs.version/);
    }
  }
  assert.match(buildJob, /ref:.*inputs.version/);
});

test("Web targets import the matching runtime's freshly built base cache", () => {
  assert.match(
    step("Build and push WEB platform image by digest"),
    /cache-from: \|\n\s+type=gha,scope=docker-web-.*\n\s+type=gha,scope=docker-\$/
  );
  assert.match(
    step("Build and push BUN web platform image by digest"),
    /cache-from: \|\n\s+type=gha,scope=docker-bun-web-.*\n\s+type=gha,scope=docker-bun-base-/
  );
});
