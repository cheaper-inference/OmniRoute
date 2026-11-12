#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFileSync, createReadStream, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { hashLockfile, resolveBundler } from "../release/artifact-identity.mjs";

const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^[a-f0-9]{64}$/;
const POSITIVE = /^[1-9][0-9]*$/;
const POLICY = "ci-next-build/1";

function requireEvidence(condition, reason) {
  if (!condition) throw new Error(reason);
}

function requireSha(value, field) {
  requireEvidence(SHA.test(value ?? ""), `BUILD_IDENTITY_INVALID:${field}`);
  return value;
}

function requireId(value, field) {
  const text = String(value ?? "");
  requireEvidence(POSITIVE.test(text), `BUILD_IDENTITY_INVALID:${field}`);
  return text;
}

function requireDigest(value, field) {
  const digest = String(value ?? "").replace(/^sha256:/, "");
  requireEvidence(DIGEST.test(digest), `BUILD_DIGEST_INVALID:${field}`);
  return digest;
}

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export async function hashFile(file) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}

export function resolveBuildContext(env, event, checkout) {
  requireEvidence(
    ["pull_request", "push", "workflow_dispatch", "merge_group"].includes(env.GITHUB_EVENT_NAME),
    "BUILD_EVENT_UNSUPPORTED"
  );
  const repository = env.GITHUB_REPOSITORY;
  requireEvidence(/^[\w.-]+\/[\w.-]+$/.test(repository ?? ""), "BUILD_REPOSITORY_INVALID");
  const repositoryId = requireId(env.GITHUB_REPOSITORY_ID, "repositoryId");
  requireEvidence(String(event.repository?.id) === repositoryId, "BUILD_REPOSITORY_MISMATCH");
  requireEvidence(event.repository?.full_name === repository, "BUILD_REPOSITORY_MISMATCH");
  const sha = requireSha(env.GITHUB_SHA, "checkoutSha");
  requireEvidence(checkout.sha === sha, "BUILD_CHECKOUT_MISMATCH");
  const tree = requireSha(checkout.tree, "treeSha");
  let headSha = sha;
  let baseSha = sha;
  let headRepository = repository;
  let headRepositoryId = repositoryId;
  let pullRequest = null;
  if (env.GITHUB_EVENT_NAME === "pull_request") {
    const pr = event.pull_request;
    pullRequest = requireId(pr?.number ?? event.number, "pullRequest");
    requireEvidence(env.GITHUB_REF === `refs/pull/${pullRequest}/merge`, "BUILD_PR_REF_INVALID");
    requireEvidence(
      pr.base?.repo?.full_name === repository && String(pr.base?.repo?.id) === repositoryId,
      "BUILD_PR_BASE_REPOSITORY_MISMATCH"
    );
    headSha = requireSha(pr.head?.sha, "headSha");
    baseSha = requireSha(pr.base?.sha, "baseSha");
    headRepository = pr.head?.repo?.full_name;
    requireEvidence(
      /^[\w.-]+\/[\w.-]+$/.test(headRepository ?? ""),
      "BUILD_HEAD_REPOSITORY_INVALID"
    );
    headRepositoryId = requireId(pr.head?.repo?.id, "headRepositoryId");
  } else if (env.GITHUB_EVENT_NAME === "merge_group") {
    requireEvidence(event.merge_group?.head_sha === sha, "BUILD_MERGE_GROUP_MISMATCH");
    baseSha = requireSha(event.merge_group?.base_sha, "baseSha");
  } else if (env.GITHUB_EVENT_NAME === "push") {
    baseSha = requireSha(event.before, "baseSha");
    requireEvidence(event.after === sha && event.ref === env.GITHUB_REF, "BUILD_PUSH_MISMATCH");
  }
  requireEvidence(
    typeof env.GITHUB_REF === "string" && env.GITHUB_REF.startsWith("refs/"),
    "BUILD_REF_INVALID"
  );
  return {
    repository,
    repositoryId,
    event: env.GITHUB_EVENT_NAME,
    ref: env.GITHUB_REF,
    checkoutSha: sha,
    treeSha: tree,
    headSha,
    baseSha,
    headRepository,
    headRepositoryId,
    pullRequest,
  };
}

export function buildManifest({ env, event, checkout, runtime, files, archive, producerAttempt }) {
  const source = resolveBuildContext(env, event, checkout);
  const workflowRef = env.CI_WORKFLOW_REF ?? env.GITHUB_WORKFLOW_REF;
  requireEvidence(
    workflowRef === `${source.repository}/.github/workflows/ci.yml@${source.ref}`,
    "BUILD_WORKFLOW_INVALID"
  );
  const workflowSha = requireSha(env.CI_WORKFLOW_SHA ?? env.GITHUB_WORKFLOW_SHA, "workflowSha");
  const runAttempt = requireId(producerAttempt ?? env.GITHUB_RUN_ATTEMPT, "producerAttempt");
  const consumerAttempt = requireId(env.GITHUB_RUN_ATTEMPT, "runAttempt");
  requireEvidence(BigInt(runAttempt) <= BigInt(consumerAttempt), "BUILD_ATTEMPT_FROM_FUTURE");
  requireEvidence(/^24\.\d+\.\d+$/.test(runtime.nodeVersion), "BUILD_NODE_VERSION_INVALID");
  requireId(runtime.nodeAbi, "nodeAbi");
  requireEvidence(
    runtime.platform === "linux" && runtime.arch === "x64",
    "BUILD_PLATFORM_UNSUPPORTED"
  );
  requireEvidence(
    env.OMNIROUTE_BUILD_BACKEND_ONLY !== "1" &&
      [undefined, "", "full"].includes(env.OMNIROUTE_BUILD_PROFILE),
    "BUILD_PROFILE_NOT_FULL"
  );
  requireEvidence(["0", "1"].includes(env.OMNIROUTE_USE_TURBOPACK), "BUILD_BUNDLER_MISSING");
  const bundler = resolveBundler(env);
  if (["pull_request", "merge_group"].includes(source.event))
    requireEvidence(bundler === "webpack", "BUILD_PR_BUNDLER_MISMATCH");
  requireEvidence(archive.name === "e2e-build.tar.gz", "BUILD_ARCHIVE_NAME_INVALID");
  requireEvidence(
    Number.isSafeInteger(archive.sizeBytes) && archive.sizeBytes > 0,
    "BUILD_ARCHIVE_EMPTY"
  );
  requireDigest(archive.sha256, "archive");
  requireEvidence(files.lockfile.length > 0, "BUILD_LOCKFILE_EMPTY");
  return {
    schemaVersion: 1,
    policy: POLICY,
    source,
    producer: {
      workflowRef,
      workflowSha,
      runId: requireId(env.GITHUB_RUN_ID, "runId"),
      runAttempt,
      job: "build",
    },
    inputs: {
      ...runtime,
      lockfileSha256: hashLockfile(files.lockfile),
      ciWorkflowSha256: sha256(files.ciWorkflow),
      dastWorkflowSha256: sha256(files.dastWorkflow),
      profile: "full",
      bundler,
    },
    archive,
  };
}

export function verifyManifest({
  manifestBytes,
  expected,
  outputManifestSha256,
  outputArchiveSha256,
}) {
  requireEvidence(
    sha256(manifestBytes) === requireDigest(outputManifestSha256, "producerManifest"),
    "BUILD_MANIFEST_DIGEST_MISMATCH"
  );
  let manifest;
  try {
    manifest = JSON.parse(manifestBytes);
  } catch {
    throw new Error("BUILD_MANIFEST_INVALID_JSON");
  }
  requireEvidence(
    expected.archive.sha256 === requireDigest(outputArchiveSha256, "producerArchive"),
    "BUILD_ARCHIVE_DIGEST_MISMATCH"
  );
  requireEvidence(isDeepStrictEqual(manifest, expected), "BUILD_PROVENANCE_MISMATCH");
  return manifest;
}

function localInputs(env) {
  const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
  return {
    env,
    event: JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf8")),
    checkout: { sha: git("rev-parse", "HEAD"), tree: git("rev-parse", "HEAD^{tree}") },
    runtime: {
      nodeVersion: process.versions.node,
      nodeAbi: process.versions.modules,
      platform: process.platform,
      arch: process.arch,
    },
    files: {
      lockfile: readFileSync("package-lock.json"),
      ciWorkflow: readFileSync(".github/workflows/ci.yml"),
      dastWorkflow: readFileSync(".github/workflows/dast-smoke.yml"),
    },
  };
}

export async function main(argv, env = process.env) {
  const [mode, archivePath, manifestPath] = argv;
  requireEvidence(argv.length === 3 && ["create", "verify"].includes(mode), "BUILD_USAGE_INVALID");
  const archive = {
    name: path.basename(archivePath),
    sha256: await hashFile(archivePath),
    sizeBytes: statSync(archivePath).size,
  };
  const producerAttempt = mode === "verify" ? env.NEXT_BUILD_PRODUCER_ATTEMPT : undefined;
  if (mode === "verify") requireId(producerAttempt, "producerAttempt");
  const expected = buildManifest({ ...localInputs(env), archive, producerAttempt });
  if (mode === "create") {
    requireEvidence(env.GITHUB_JOB === "build", "BUILD_PRODUCER_JOB_INVALID");
    const json = `${JSON.stringify(expected, null, 2)}\n`;
    writeFileSync(manifestPath, json, { flag: "wx" });
    appendFileSync(
      env.GITHUB_OUTPUT,
      `manifest-sha256=${sha256(json)}\narchive-sha256=${archive.sha256}\nnode-version=${expected.inputs.nodeVersion}\nbundler=${expected.inputs.bundler}\nproducer-attempt=${expected.producer.runAttempt}\n`
    );
    process.stdout.write(`Next build sealed: ${expected.source.checkoutSha}\n`);
    return;
  }
  const artifactId = requireId(env.NEXT_BUILD_ARTIFACT_ID, "artifactId");
  const artifactDigest = requireDigest(env.NEXT_BUILD_ARTIFACT_DIGEST, "artifactDigest");
  const transport = JSON.parse(
    readFileSync(path.join(path.dirname(manifestPath), "zip-verification.json"), "utf8")
  );
  requireEvidence(
    transport.schemaVersion === 1 &&
      transport.artifactId === artifactId &&
      transport.sha256 === artifactDigest &&
      Number.isSafeInteger(transport.bytes) &&
      transport.bytes > 0,
    "BUILD_ZIP_RECEIPT_MISMATCH"
  );
  requireEvidence(statSync(manifestPath).size <= 64 * 1024, "BUILD_MANIFEST_TOO_LARGE");
  const manifest = verifyManifest({
    manifestBytes: readFileSync(manifestPath),
    expected,
    outputManifestSha256: env.NEXT_BUILD_MANIFEST_SHA256,
    outputArchiveSha256: env.NEXT_BUILD_ARCHIVE_SHA256,
  });
  const receipt = {
    schemaVersion: 1,
    verdict: "PASS",
    scope: "Build input identity and bytes only; DAST must still execute successfully.",
    source: manifest.source,
    producer: manifest.producer,
    consumerAttempt: env.GITHUB_RUN_ATTEMPT,
    artifact: {
      id: artifactId,
      digest: artifactDigest,
      digestValidation: "streamed-zip-sha256-and-download-artifact:error",
    },
    archive: manifest.archive,
    inputs: manifest.inputs,
  };
  writeFileSync("dast-build-receipt.json", `${JSON.stringify(receipt, null, 2)}\n`);
  process.stdout.write(`Next build verified: ${manifest.source.checkoutSha}\n`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`next-build-provenance: ${error.code ?? error.message}`);
    process.exitCode = 1;
  });
}
