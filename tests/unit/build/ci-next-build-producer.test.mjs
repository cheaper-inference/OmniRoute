import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const posix = { skip: process.platform === "win32", timeout: 20000 };
const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
function fixture(t) {
  mkdirSync(join(root, "_artifacts"), { recursive: true });
  const cwd = mkdtempSync(join(root, "_artifacts/next-producer-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  for (const path of [
    "scripts",
    "bin",
    "proof",
    "dist",
    ".github/workflows",
    ".build/next/standalone",
  ]) {
    mkdirSync(join(cwd, path), { recursive: true });
  }
  for (const path of ["ci", "build", "merge-queue"])
    cpSync(join(root, "scripts", path), join(cwd, "scripts", path), { recursive: true });
  writeFileSync(join(cwd, "package.json"), '{"type":"module"}\n');
  writeFileSync(join(cwd, "package-lock.json"), '{"lockfileVersion":3}\n');
  writeFileSync(join(cwd, ".github/workflows/ci.yml"), "name: fixture\n");
  writeFileSync(join(cwd, ".build/next/standalone/server.js"), "old-server");
  writeFileSync(join(cwd, ".build/next/BUILD_ID"), "old-id");
  writeFileSync(join(cwd, ".build/next/.omniroute-next-input.json"), "old-receipt");
  writeFileSync(join(cwd, "dist/prior-staging"), "preserve");
  const sha = "1".repeat(40);
  writeFileSync(
    join(cwd, "bin/git"),
    `#!${process.execPath}\n
    if(process.argv[2] === "rev-parse") console.log(process.argv[3] === "HEAD" ? "${sha}" : "${"2".repeat(40)}");
    if(process.argv[2] === "status" && process.env.FIXTURE_DIRTY) console.log(" M source.ts");
  `,
    { mode: 0o755 }
  );
  writeFileSync(
    join(cwd, "proof/event.json"),
    JSON.stringify({
      repository: { full_name: "owner/repo", id: 42 },
      ref: "refs/heads/main",
      before: "3".repeat(40),
      after: sha,
    })
  );
  const env = {
    PATH: `${join(cwd, "bin")}:${process.env.PATH}`,
    LANG: "C.UTF-8",
    GITHUB_SHA: sha,
    GITHUB_REPOSITORY: "owner/repo",
    GITHUB_REPOSITORY_ID: "42",
    GITHUB_REF: "refs/heads/main",
    GITHUB_EVENT_NAME: "push",
    GITHUB_WORKFLOW_REF: "owner/repo/.github/workflows/ci.yml@refs/heads/main",
    GITHUB_WORKFLOW_SHA: "4".repeat(40),
    GITHUB_EVENT_PATH: join(cwd, "proof/event.json"),
    GITHUB_RUN_ID: "123",
    GITHUB_RUN_ATTEMPT: "1",
    GITHUB_JOB: "build",
    GITHUB_OUTPUT: join(cwd, "proof/outputs"),
    OMNIROUTE_USE_TURBOPACK: "0",
  };
  const command = (args, extra = {}) => {
    const result = spawnSync(process.execPath, ["scripts/ci/next-build-provenance.mjs", ...args], {
      cwd,
      env: { ...env, ...extra },
      encoding: "utf8",
      timeout: 12000,
      maxBuffer: 1024 * 1024,
    });
    assert.equal(result.error, undefined);
    return result;
  };
  const produceFixture = () => {
    mkdirSync(join(cwd, ".build/next/standalone"), { recursive: true });
    writeFileSync(join(cwd, ".build/next/standalone/server.js"), "new-server");
    writeFileSync(join(cwd, ".build/next/BUILD_ID"), "new-id");
    const result = spawnSync("tar", ["-czf", "proof/e2e-build.tar.gz", ".build/next"], {
      cwd,
      encoding: "utf8",
      timeout: 10000,
    });
    assert.equal(result.status, 0, result.stderr);
  };
  return { cwd, env, command, produceFixture };
}

test("the real capture/seal CLIs bind one fresh product and independent outputs", posix, (t) => {
  const f = fixture(t);
  const captured = f.command(["capture", "proof/source.json"]);
  assert.equal(captured.status, 0, captured.stderr);
  assert.equal(existsSync(join(f.cwd, ".build/next/standalone/server.js")), false);
  assert.equal(existsSync(join(f.cwd, ".build/next/BUILD_ID")), false);
  assert.equal(existsSync(join(f.cwd, ".build/next/.omniroute-next-input.json")), false);
  assert.equal(readFileSync(join(f.cwd, "dist/prior-staging"), "utf8"), "preserve");
  f.produceFixture();
  const sealed = f.command(["seal", "proof/source.json", "proof"]);
  assert.equal(sealed.status, 0, sealed.stderr);
  const manifest = JSON.parse(readFileSync(join(f.cwd, "proof/next-build-provenance.json")));
  const outputs = Object.fromEntries(
    readFileSync(f.env.GITHUB_OUTPUT, "utf8")
      .trim()
      .split("\n")
      .map((line) => line.split("="))
  );
  assert.equal(outputs.manifestSha256, hash(join(f.cwd, "proof/next-build-provenance.json")));
  assert.equal(outputs.archiveSha256, hash(join(f.cwd, "proof/e2e-build.tar.gz")));
  assert.equal(outputs.producerAttempt, "1");
  assert.equal(manifest.source.candidateSha, f.env.GITHUB_SHA);
  assert.equal(manifest.producer.runtime.node, process.version);
  assert.equal(manifest.producer.bundler, "webpack");
  assert.ok(manifest.output.bytes > 0);
});

for (const [name, extra, mutate, reason] of [
  [
    "lockfile changed after capture",
    {},
    (f) => writeFileSync(join(f.cwd, "package-lock.json"), '{"lockfileVersion":2}\n'),
    "ci-producer-source-changed",
  ],
  [
    "bundler changed after capture",
    { OMNIROUTE_USE_TURBOPACK: "1" },
    () => {},
    "ci-producer-runtime-changed",
  ],
  ["uncommitted producer inputs", { FIXTURE_DIRTY: "1" }, () => {}, "dirty-checkout"],
]) {
  test(`producer refuses ${name}`, posix, (t) => {
    const f = fixture(t);
    assert.equal(f.command(["capture", "proof/source.json"]).status, 0);
    f.produceFixture();
    mutate(f);
    const result = f.command(["seal", "proof/source.json", "proof"], extra);
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, new RegExp(reason));
    assert.equal(existsSync(join(f.cwd, "proof/next-build-provenance.json")), false);
    assert.equal(existsSync(f.env.GITHUB_OUTPUT), false);
  });
}

test("a partial profile is refused before old staging or Next input is invalidated", posix, (t) => {
  const f = fixture(t);
  const result = f.command(["capture", "proof/source.json"], {
    OMNIROUTE_BUILD_PROFILE: "contributor",
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /partial-build-profile/);
  assert.equal(readFileSync(join(f.cwd, ".build/next/standalone/server.js"), "utf8"), "old-server");
  assert.equal(readFileSync(join(f.cwd, "dist/prior-staging"), "utf8"), "preserve");
});
