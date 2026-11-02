import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = readFileSync(path.join(root, ".github/workflows/docker-publish.yml"), "utf8");

function step(name) {
  const start = workflow.indexOf(`      - name: ${name}\n`);
  assert.notEqual(start, -1, `missing step: ${name}`);
  const next = workflow.indexOf("\n      - name:", start + 1);
  return workflow.slice(start, next === -1 ? undefined : next);
}

function script(name) {
  const block = step(name).split("        run: |\n")[1];
  assert.ok(block, `missing shell script: ${name}`);
  return block
    .split("\n")
    .map((line) => line.replace(/^          /, ""))
    .join("\n");
}

function runGuard(count, platforms = ["amd64", "arm64"]) {
  const scratch = path.join(root, "_artifacts");
  mkdirSync(scratch, { recursive: true });
  const dir = mkdtempSync(path.join(scratch, "publish-test-"));
  try {
    for (const flavor of ["base", "web", "bun-base", "bun-web"]) {
      mkdirSync(path.join(dir, "digests", flavor), { recursive: true });
      for (let i = 0; i < (flavor === "bun-base" ? count : 2); i++) {
        writeFileSync(path.join(dir, "digests", flavor, String(i + 1).repeat(64)), "");
      }
    }
    writeFileSync(
      path.join(dir, "docker"),
      `#!/usr/bin/env node
const ref = process.argv.at(-1);
const arches = JSON.parse(process.env.TEST_PLATFORMS);
const architecture = arches.length === 1 ? arches[0] : ref.endsWith("1".repeat(64)) ? arches[0] : arches[1];
console.log(JSON.stringify({ manifests: [{ platform: { os: "linux", architecture } }] }));
`,
      { mode: 0o755 }
    );
    return spawnSync(
      "bash",
      [
        "-c",
        script("Guard against stale digests").replaceAll("/tmp/digests", path.join(dir, "digests")),
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          PATH: `${dir}:${process.env.PATH}`,
          IMAGE_NAME: "example/image",
          GHCR_IMAGE_NAME: "ghcr.io/example/image",
          TEST_PLATFORMS: JSON.stringify(platforms),
        },
        encoding: "utf8",
      }
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const count of [0, 1, 3]) {
  test(`rejects ${count} Bun digests before publishing any manifest`, () => {
    const result = runGuard(count);
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
  });
}

test("rejects two digests that both contain only AMD64", () => {
  const result = runGuard(2, ["amd64"]);
  assert.notEqual(result.status, 0, result.stdout + result.stderr);
});

test("accepts a complete digest pair for every flavor and registry", () => {
  const result = runGuard(2);
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test("backfills use current validation scripts but build the requested release source", () => {
  const prepare = workflow.slice(
    workflow.indexOf("\n  prepare:"),
    workflow.indexOf("\n  runner-preflight:")
  );
  const build = workflow.slice(workflow.indexOf("\n  build:"), workflow.indexOf("\n  merge:"));
  const merge = workflow.slice(workflow.indexOf("\n  merge:"));
  assert.doesNotMatch(prepare, /ref:.*inputs.version/);
  assert.doesNotMatch(merge, /ref:.*inputs.version/);
  assert.match(build, /ref:.*inputs.version/);
});

test("Bun builds and artifact transfers are mandatory on both architectures", () => {
  for (const name of [
    "Build and push BUN base platform image by digest",
    "Build and push BUN web platform image by digest",
    "Download bun-base digests",
    "Download bun-web digests",
  ]) {
    assert.doesNotMatch(step(name), /continue-on-error: true/);
  }
  for (const name of ["Upload bun-base digests", "Upload bun-web digests"]) {
    assert.match(step(name), /if-no-files-found: error/);
  }
  assert.match(workflow, /platform: linux\/amd64/);
  assert.match(workflow, /platform: linux\/arm64/);
});

test("both registries promote all four complete flavors without optional Bun tags", () => {
  for (const registry of ["Docker Hub", "GHCR"]) {
    const promotion = step(`Promote ${registry} latest tags`);
    assert.match(promotion, /for suffix in "" -web -bun -web-bun/);
    assert.doesNotMatch(promotion, /if docker/);
    assert.match(promotion, /docker-image-complete\.mjs/);
  }
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

test("an existing Node image alone cannot skip a release repair", () => {
  const prepare = step("Resolve version, latest-promotion, and skip flag");
  assert.match(prepare, /for suffix in "" -web -bun -web-bun/);
  assert.match(prepare, /docker-image-complete\.mjs/);
  assert.doesNotMatch(prepare, /if docker manifest inspect/);
});
