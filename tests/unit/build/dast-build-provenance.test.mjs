import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  buildManifest,
  resolveBuildContext,
  sha256,
  verifyManifest,
} from "../../../scripts/ci/next-build-provenance.mjs";

const repository = { id: 123, full_name: "owner/repo" };
function fixture() {
  return {
    env: {
      GITHUB_REPOSITORY: repository.full_name,
      GITHUB_REPOSITORY_ID: String(repository.id),
      GITHUB_EVENT_NAME: "pull_request",
      GITHUB_REF: "refs/pull/42/merge",
      GITHUB_SHA: "a".repeat(40),
      GITHUB_RUN_ID: "100",
      GITHUB_RUN_ATTEMPT: "1",
      GITHUB_WORKFLOW_REF: "owner/repo/.github/workflows/ci.yml@refs/pull/42/merge",
      GITHUB_WORKFLOW_SHA: "a".repeat(40),
      OMNIROUTE_USE_TURBOPACK: "0",
    },
    event: {
      repository,
      pull_request: {
        number: 42,
        head: { sha: "b".repeat(40), repo: { id: 456, full_name: "contributor/fork" } },
        base: { sha: "c".repeat(40), repo: repository },
      },
    },
    checkout: { sha: "a".repeat(40), tree: "d".repeat(40) },
    runtime: { nodeVersion: "24.22.1", nodeAbi: "137", platform: "linux", arch: "x64" },
    files: {
      lockfile: "locked dependencies",
      ciWorkflow: "reviewed CI",
      dastWorkflow: "reviewed DAST",
    },
    archive: { name: "e2e-build.tar.gz", sha256: "e".repeat(64), sizeBytes: 1234 },
  };
}
const verify = (manifest, expected = manifest, patch = {}) => {
  const manifestBytes = JSON.stringify(manifest);
  return verifyManifest({
    manifestBytes,
    expected,
    outputManifestSha256: sha256(manifestBytes),
    outputArchiveSha256: expected.archive.sha256,
    ...patch,
  });
};

test("fork PR provenance binds the base, source head and actual tested merge/tree", () => {
  const data = fixture();
  const manifest = buildManifest(data);
  assert.deepEqual(verify(manifest), manifest);
  assert.equal(manifest.source.headRepository, "contributor/fork");
  assert.equal(manifest.source.headSha, data.event.pull_request.head.sha);
  assert.equal(manifest.source.baseSha, data.event.pull_request.base.sha);
  assert.equal(manifest.source.checkoutSha, data.env.GITHUB_SHA);
  assert.equal(manifest.source.treeSha, data.checkout.tree);
  assert.equal(manifest.inputs.profile, "full");
  assert.equal(manifest.inputs.bundler, "webpack");
});

for (const field of [
  ["source", "repository"],
  ["source", "repositoryId"],
  ["source", "event"],
  ["source", "ref"],
  ["source", "checkoutSha"],
  ["source", "treeSha"],
  ["source", "headSha"],
  ["source", "baseSha"],
  ["source", "headRepository"],
  ["source", "headRepositoryId"],
  ["source", "pullRequest"],
  ["producer", "workflowRef"],
  ["producer", "workflowSha"],
  ["producer", "runId"],
  ["producer", "runAttempt"],
  ["producer", "job"],
  ["inputs", "nodeVersion"],
  ["inputs", "nodeAbi"],
  ["inputs", "platform"],
  ["inputs", "arch"],
  ["inputs", "lockfileSha256"],
  ["inputs", "ciWorkflowSha256"],
  ["inputs", "dastWorkflowSha256"],
  ["inputs", "profile"],
  ["inputs", "bundler"],
  ["archive", "sha256"],
  ["archive", "sizeBytes"],
  ["archive", "name"],
]) {
  test(`a changed ${field.join(".")} is not a reusable build`, () => {
    const original = buildManifest(fixture());
    const different = structuredClone(original);
    different[field[0]][field[1]] = "another value";
    assert.throws(() => verify(different, original), /BUILD_PROVENANCE_MISMATCH/);
  });
}

test("bytes must match the independent producer outputs, not only a self-consistent manifest", () => {
  const manifest = buildManifest(fixture());
  assert.throws(
    () => verify(manifest, manifest, { outputManifestSha256: "f".repeat(64) }),
    /BUILD_MANIFEST_DIGEST_MISMATCH/
  );
  assert.throws(
    () => verify(manifest, manifest, { outputArchiveSha256: "f".repeat(64) }),
    /BUILD_ARCHIVE_DIGEST_MISMATCH/
  );
  assert.throws(
    () => verifyManifest({ manifestBytes: "{", outputManifestSha256: sha256("{") }),
    /BUILD_MANIFEST_INVALID_JSON/
  );
  assert.throws(
    () => verify(manifest, manifest, { outputManifestSha256: "" }),
    /BUILD_DIGEST_INVALID/
  );
});

test("a partial rerun may consume the original exact build, recording both attempts", () => {
  const data = fixture();
  const built = buildManifest(data);
  data.env.GITHUB_RUN_ATTEMPT = "2";
  const expected = buildManifest({ ...data, producerAttempt: "1" });
  assert.deepEqual(verify(built, expected), built);
  assert.throws(
    () => buildManifest({ ...data, producerAttempt: "3" }),
    /BUILD_ATTEMPT_FROM_FUTURE/
  );
  const wrongAttempt = buildManifest({ ...data, producerAttempt: "2" });
  assert.throws(() => verify(built, wrongAttempt), /BUILD_PROVENANCE_MISMATCH/);
});

test("unsupported event, workflow, profile and checkout identities fail closed", () => {
  const cases = [
    [(d) => (d.env.GITHUB_EVENT_NAME = "workflow_run"), /BUILD_EVENT_UNSUPPORTED/],
    [(d) => (d.env.GITHUB_REPOSITORY_ID = "999"), /BUILD_REPOSITORY_MISMATCH/],
    [(d) => (d.checkout.sha = "f".repeat(40)), /BUILD_CHECKOUT_MISMATCH/],
    [(d) => (d.env.GITHUB_REF = "refs/pull/42/head"), /BUILD_PR_REF_INVALID/],
    [
      (d) => (d.event.pull_request.base.repo = { id: 9, full_name: "other/repo" }),
      /BUILD_PR_BASE_REPOSITORY_MISMATCH/,
    ],
    [
      (d) =>
        (d.env.GITHUB_WORKFLOW_REF = "owner/repo/.github/workflows/other.yml@refs/pull/42/merge"),
      /BUILD_WORKFLOW_INVALID/,
    ],
    [(d) => (d.env.OMNIROUTE_BUILD_BACKEND_ONLY = "1"), /BUILD_PROFILE_NOT_FULL/],
    [(d) => (d.env.OMNIROUTE_BUILD_PROFILE = "contributor"), /BUILD_PROFILE_NOT_FULL/],
    [(d) => (d.env.OMNIROUTE_USE_TURBOPACK = "1"), /BUILD_PR_BUNDLER_MISMATCH/],
    [(d) => delete d.env.OMNIROUTE_USE_TURBOPACK, /BUILD_BUNDLER_MISSING/],
    [(d) => (d.runtime.nodeVersion = "latest"), /BUILD_NODE_VERSION_INVALID/],
    [(d) => (d.runtime.arch = "arm64"), /BUILD_PLATFORM_UNSUPPORTED/],
    [(d) => (d.archive.sizeBytes = 0), /BUILD_ARCHIVE_EMPTY/],
    [(d) => (d.files.lockfile = ""), /BUILD_LOCKFILE_EMPTY/],
  ];
  for (const [mutate, reason] of cases) {
    const data = fixture();
    mutate(data);
    assert.throws(() => buildManifest(data), reason);
  }
});

test("push, dispatch and merge-group keep explicit event identities", () => {
  for (const event of ["push", "workflow_dispatch", "merge_group"]) {
    const data = fixture();
    data.env.GITHUB_EVENT_NAME = event;
    data.env.GITHUB_REF =
      event === "merge_group" ? "refs/heads/gh-readonly-queue/main/42" : "refs/heads/main";
    data.env.GITHUB_WORKFLOW_REF = `${repository.full_name}/.github/workflows/ci.yml@${data.env.GITHUB_REF}`;
    data.event.before = "b".repeat(40);
    data.event.after = data.env.GITHUB_SHA;
    data.event.ref = data.env.GITHUB_REF;
    data.event.merge_group = { head_sha: data.env.GITHUB_SHA, base_sha: "c".repeat(40) };
    assert.equal(buildManifest(data).source.event, event);
    if (event === "merge_group") {
      data.event.merge_group.head_sha = "b".repeat(40);
      assert.throws(
        () => resolveBuildContext(data.env, data.event, data.checkout),
        /BUILD_MERGE_GROUP_MISMATCH/
      );
    }
  }
});

test("CLI enforces the CI runtime, seals/verifies bytes and rejects damaged inputs", () => {
  const root = mkdtempSync(path.join(tmpdir(), "dast-provenance-cli-"));
  const script = fileURLToPath(
    new URL("../../../scripts/ci/next-build-provenance.mjs", import.meta.url)
  );
  try {
    mkdirSync(path.join(root, ".github/workflows"), { recursive: true });
    writeFileSync(path.join(root, "package-lock.json"), "lock fixture");
    writeFileSync(path.join(root, ".github/workflows/ci.yml"), "CI fixture");
    writeFileSync(path.join(root, ".github/workflows/dast-smoke.yml"), "DAST fixture");
    execFileSync("git", ["init", "--quiet"], { cwd: root });
    execFileSync("git", ["add", "package-lock.json", ".github"], { cwd: root });
    execFileSync(
      "git",
      [
        "-c",
        "user.name=Fixture",
        "-c",
        "user.email=fixture@example.invalid",
        "commit",
        "--quiet",
        "-m",
        "fixture",
      ],
      { cwd: root }
    );
    const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    const data = fixture();
    data.env.GITHUB_SHA = sha;
    data.env.GITHUB_WORKFLOW_SHA = sha;
    const env = {
      PATH: process.env.PATH,
      ...data.env,
      GITHUB_JOB: "build",
      GITHUB_EVENT_PATH: path.join(root, "event.json"),
      GITHUB_OUTPUT: path.join(root, "outputs.txt"),
    };
    writeFileSync(env.GITHUB_EVENT_PATH, JSON.stringify(data.event));
    const archive = path.join(root, "e2e-build.tar.gz");
    const manifest = path.join(root, "next-build-provenance.json");
    writeFileSync(archive, "small fixture archive bytes");
    const run = (mode, overrides = {}) =>
      spawnSync(process.execPath, [script, mode, archive, manifest], {
        cwd: root,
        env: { ...env, ...overrides },
        encoding: "utf8",
        timeout: 15_000,
      });
    let result = run("create");
    if (
      !/^24\.\d+\.\d+$/.test(process.versions.node) ||
      process.platform !== "linux" ||
      process.arch !== "x64"
    ) {
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /BUILD_NODE_VERSION_INVALID|BUILD_PLATFORM_UNSUPPORTED/);
      return;
    }
    assert.equal(result.status, 0, result.stderr);
    const outputs = Object.fromEntries(
      readFileSync(env.GITHUB_OUTPUT, "utf8")
        .trim()
        .split("\n")
        .map((line) => line.split("="))
    );
    const consumer = {
      NEXT_BUILD_ARTIFACT_ID: "123456",
      NEXT_BUILD_ARTIFACT_DIGEST: "f".repeat(64),
      NEXT_BUILD_MANIFEST_SHA256: outputs["manifest-sha256"],
      NEXT_BUILD_ARCHIVE_SHA256: outputs["archive-sha256"],
      NEXT_BUILD_PRODUCER_ATTEMPT: outputs["producer-attempt"],
      GITHUB_RUN_ATTEMPT: "2",
    };
    writeFileSync(
      path.join(root, "zip-verification.json"),
      JSON.stringify({
        schemaVersion: 1,
        artifactId: consumer.NEXT_BUILD_ARTIFACT_ID,
        sha256: consumer.NEXT_BUILD_ARTIFACT_DIGEST,
        bytes: 2000,
      })
    );
    assert.notEqual(
      run("verify", { ...consumer, NEXT_BUILD_ARTIFACT_DIGEST: "0".repeat(64) }).status,
      0
    );
    result = run("verify", consumer);
    assert.equal(result.status, 0, result.stderr);
    const receipt = JSON.parse(readFileSync(path.join(root, "dast-build-receipt.json"), "utf8"));
    assert.equal(receipt.producer.runAttempt, "1");
    assert.equal(receipt.consumerAttempt, "2");
    assert.equal(receipt.source.checkoutSha, sha);
    assert.notEqual(run("verify", { ...consumer, NEXT_BUILD_ARTIFACT_ID: "1,2" }).status, 0);
    writeFileSync(archive, "altered bytes");
    result = run("verify", consumer);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /BUILD_ARCHIVE_DIGEST_MISMATCH/);
    rmSync(manifest);
    assert.notEqual(run("verify", consumer).status, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
