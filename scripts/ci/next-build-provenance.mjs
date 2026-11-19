#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { appendFileSync, lstatSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  checkoutIdentity,
  DIGEST,
  hashFile,
  measureNextTree,
  nextDistPath,
  NEXT_INPUT_RECEIPT,
  readProofJson,
  requireProof,
  RUN_NUMBER,
  SHA,
  sha256,
  validTree,
  writeNextInput,
} from "../build/standaloneInput.mjs";
import { invalidateNextInput, requireFullNextProfile } from "../build/build-fresh-next.mjs";
import { resolveCandidateBase } from "../merge-queue/candidate-base.mjs";

export const NEXT_BUILD_POLICY = "ci-next-build/1";
const ARCHIVE = "e2e-build.tar.gz";
const MANIFEST = "next-build-provenance.json";
const boundedText = (value) =>
  typeof value === "string" &&
  value.length > 0 &&
  value.length <= 512 &&
  !/[\x00-\x1f\x7f]/.test(value);
const number = (value) => typeof value === "string" && value.length <= 20 && RUN_NUMBER.test(value);
const digest = (value) => String(value || "").replace(/^sha256:/, "");
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// candidateSha is the checkout/merge SHA. PR head/base remain separate; the API's
// head_sha must never substitute for the actual tested merge commit.
export function ciSourceContext({ env, event, checkout, queueMessage = "" }) {
  requireProof(
    checkout.candidateSha === env.GITHUB_SHA && SHA.test(env.GITHUB_SHA),
    "ci-checkout-sha-mismatch"
  );
  requireProof(
    boundedText(env.GITHUB_REPOSITORY) &&
      number(env.GITHUB_REPOSITORY_ID) &&
      event.repository?.full_name === env.GITHUB_REPOSITORY &&
      String(event.repository?.id) === env.GITHUB_REPOSITORY_ID,
    "ci-repository-mismatch"
  );
  requireProof(boundedText(env.GITHUB_REF) && env.GITHUB_REF.startsWith("refs/"), "ci-ref-invalid");
  const source = {
    ...checkout,
    repository: env.GITHUB_REPOSITORY,
    repositoryId: env.GITHUB_REPOSITORY_ID,
    eventName: env.GITHUB_EVENT_NAME,
    ref: env.GITHUB_REF,
    headSha: checkout.candidateSha,
    headRepositoryId: env.GITHUB_REPOSITORY_ID,
    headRef: null,
    baseSha: checkout.candidateSha,
    baseSource: "candidate",
    queue: null,
  };
  if (env.GITHUB_EVENT_NAME === "pull_request") {
    const pr = event.pull_request;
    requireProof(
      SHA.test(pr?.head?.sha) &&
        SHA.test(pr?.base?.sha) &&
        number(String(pr.head.repo?.id)) &&
        boundedText(pr.head.ref) &&
        String(pr.base.repo?.id) === source.repositoryId &&
        pr.merge_commit_sha === checkout.candidateSha,
      "ci-pr-context-invalid"
    );
    Object.assign(source, {
      headSha: pr.head.sha,
      headRepositoryId: String(pr.head.repo.id),
      headRef: pr.head.ref,
      baseSha: pr.base.sha,
      baseSource: "pull-request",
    });
  } else if (env.GITHUB_EVENT_NAME === "merge_group") {
    requireProof(
      event.merge_group?.head_sha === checkout.candidateSha &&
        SHA.test(event.merge_group?.base_sha),
      "ci-merge-group-invalid"
    );
    Object.assign(source, { baseSha: event.merge_group.base_sha, baseSource: "merge-group" });
  } else {
    requireProof(
      ["push", "workflow_dispatch"].includes(env.GITHUB_EVENT_NAME),
      "unsupported-ci-event"
    );
    if (env.GITHUB_EVENT_NAME === "push") {
      requireProof(
        event.after === checkout.candidateSha && event.ref === env.GITHUB_REF,
        "ci-push-context-invalid"
      );
      requireProof(SHA.test(event.before), "ci-push-base-invalid");
      if (!/^0{40}$/.test(event.before)) {
        Object.assign(source, { baseSha: event.before, baseSource: "push-before" });
      } else source.baseSource = "created-ref";
    }
    if (env.GITHUB_REF.startsWith("refs/heads/omni-queue/")) {
      // The changes job proves ancestry with a full checkout. Independently parse
      // the actual candidate's trailers/ref here; a zero push.before is not its base.
      const queue = resolveCandidateBase({
        message: queueMessage,
        headSha: checkout.candidateSha,
        ref: env.GITHUB_REF,
      });
      requireProof(
        queue.baseSha === env.NEXT_BUILD_QUEUE_BASE && SHA.test(queue.baseSha),
        "ci-queue-base-mismatch"
      );
      Object.assign(source, {
        baseSha: queue.baseSha,
        baseSource: "queue",
        queue: { source: queue.source, target: queue.target, ref: env.GITHUB_REF },
      });
    }
  }
  return source;
}

function currentContext(root, env) {
  requireProof(
    !env.NEXT_DIST_DIR || env.NEXT_DIST_DIR === ".build/next",
    "ci-next-directory-mismatch"
  );
  const checkout = checkoutIdentity(root);
  const eventStat = lstatSync(env.GITHUB_EVENT_PATH);
  requireProof(eventStat.isFile() && eventStat.size <= 2 * 1024 * 1024, "ci-event-size-invalid");
  const event = JSON.parse(readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
  const queueMessage = env.GITHUB_REF?.startsWith("refs/heads/omni-queue/")
    ? execFileSync("git", ["log", "-1", "--format=%B", checkout.candidateSha], {
        cwd: root,
        encoding: "utf8",
        timeout: 10000,
        maxBuffer: 65536,
        stdio: ["ignore", "pipe", "pipe"],
      })
    : "";
  const source = ciSourceContext({ env, event, checkout, queueMessage });
  requireProof(
    number(env.GITHUB_RUN_ID) &&
      number(env.GITHUB_RUN_ATTEMPT) &&
      SHA.test(env.GITHUB_WORKFLOW_SHA) &&
      boundedText(env.GITHUB_WORKFLOW_REF) &&
      env.GITHUB_WORKFLOW_REF.startsWith(`${source.repository}/.github/workflows/ci.yml@`),
    "ci-workflow-context-invalid"
  );
  return {
    source,
    workflow: {
      sha: env.GITHUB_WORKFLOW_SHA,
      ref: env.GITHUB_WORKFLOW_REF,
      fileSha256: hashFile(join(root, ".github/workflows/ci.yml")).sha256,
    },
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT,
  };
}

function output(env, values) {
  requireProof(boundedText(env.GITHUB_OUTPUT), "missing-job-output");
  for (const [key, value] of Object.entries(values)) {
    requireProof(boundedText(String(value)), "invalid-job-output");
    appendFileSync(env.GITHUB_OUTPUT, `${key}=${value}\n`);
  }
}

function capture(root, path, env) {
  requireFullNextProfile(env);
  requireProof(env.GITHUB_JOB === "build", "ci-producer-job-mismatch");
  requireProof(["0", "1"].includes(env.OMNIROUTE_USE_TURBOPACK), "ci-bundler-unbound");
  const context = currentContext(root, env);
  const value = {
    schemaVersion: 1,
    policy: NEXT_BUILD_POLICY,
    ...context,
    runtime: {
      node: process.version,
      abi: process.versions.modules,
      platform: process.platform,
      arch: process.arch,
    },
    profile: "full",
    bundler: env.OMNIROUTE_USE_TURBOPACK === "1" ? "turbopack" : "webpack",
  };
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
  invalidateNextInput(root, env);
}

function seal(root, capturePath, directory, env) {
  requireFullNextProfile(env);
  requireProof(env.GITHUB_JOB === "build", "ci-producer-job-mismatch");
  const before = readProofJson(capturePath).value;
  const now = currentContext(root, env);
  requireProof(
    before.schemaVersion === 1 &&
      before.policy === NEXT_BUILD_POLICY &&
      equal(before.source, now.source) &&
      equal(before.workflow, now.workflow) &&
      before.runId === now.runId &&
      before.runAttempt === now.runAttempt,
    "ci-producer-source-changed"
  );
  requireProof(
    before.profile === "full" &&
      before.runtime?.node === process.version &&
      before.runtime?.abi === process.versions.modules &&
      before.runtime?.platform === process.platform &&
      before.runtime?.arch === process.arch &&
      before.bundler === (env.OMNIROUTE_USE_TURBOPACK === "1" ? "turbopack" : "webpack") &&
      ["0", "1"].includes(env.OMNIROUTE_USE_TURBOPACK),
    "ci-producer-runtime-changed"
  );
  const archive = { name: ARCHIVE, ...hashFile(join(directory, ARCHIVE)) };
  const manifest = {
    schemaVersion: 1,
    policy: NEXT_BUILD_POLICY,
    source: now.source,
    workflow: now.workflow,
    producer: {
      runId: now.runId,
      runAttempt: now.runAttempt,
      jobId: "build",
      runtime: before.runtime,
      profile: before.profile,
      bundler: before.bundler,
    },
    archive,
    output: measureNextTree(nextDistPath(root, env)),
  };
  const bytes = `${JSON.stringify(manifest, null, 2)}\n`;
  writeFileSync(join(directory, MANIFEST), bytes, { flag: "wx" });
  output(env, {
    manifestSha256: sha256(bytes),
    archiveSha256: archive.sha256,
    producerAttempt: now.runAttempt,
  });
}

export function verifyManifest(manifest, expected) {
  const { context, env, manifestSha256, archive, zip } = expected;
  requireProof(env.NEXT_BUILD_PRODUCER_RESULT === "success", "ci-producer-not-successful");
  requireProof(
    number(env.NEXT_BUILD_ARTIFACT_ID) &&
      DIGEST.test(digest(env.NEXT_BUILD_ARTIFACT_DIGEST)) &&
      DIGEST.test(env.NEXT_BUILD_MANIFEST_SHA256 || "") &&
      DIGEST.test(env.NEXT_BUILD_ARCHIVE_SHA256 || ""),
    "ci-independent-output-missing"
  );
  requireProof(manifestSha256 === env.NEXT_BUILD_MANIFEST_SHA256, "ci-manifest-digest-mismatch");
  requireProof(
    zip?.schemaVersion === 1 &&
      zip.artifactId === env.NEXT_BUILD_ARTIFACT_ID &&
      zip.sha256 === digest(env.NEXT_BUILD_ARTIFACT_DIGEST) &&
      Number.isSafeInteger(zip.sizeBytes) &&
      zip.sizeBytes > 0,
    "ci-zip-proof-mismatch"
  );
  requireProof(
    manifest?.schemaVersion === 1 &&
      manifest.policy === NEXT_BUILD_POLICY &&
      equal(manifest.source, context.source) &&
      equal(manifest.workflow, context.workflow),
    "ci-manifest-identity-mismatch"
  );
  const producer = manifest.producer;
  requireProof(
    producer?.jobId === "build" &&
      producer.runId === context.runId &&
      producer.runAttempt === env.NEXT_BUILD_PRODUCER_ATTEMPT &&
      number(producer.runAttempt) &&
      number(context.runAttempt) &&
      BigInt(producer.runAttempt) <= BigInt(context.runAttempt),
    "ci-producer-attempt-mismatch"
  );
  // The runtime belongs to the producer. Linux -> Windows is intentional; never
  // compare producer.platform with the consumer's process.platform.
  requireProof(
    producer.profile === "full" &&
      ["webpack", "turbopack"].includes(producer.bundler) &&
      /^v[0-9]+\.[0-9]+\.[0-9]+$/.test(producer.runtime?.node || "") &&
      number(producer.runtime?.abi) &&
      ["linux", "darwin", "win32"].includes(producer.runtime?.platform) &&
      ["x64", "arm64"].includes(producer.runtime?.arch),
    "ci-producer-runtime-invalid"
  );
  requireProof(
    manifest.archive?.name === ARCHIVE &&
      manifest.archive.sha256 === archive.sha256 &&
      archive.sha256 === env.NEXT_BUILD_ARCHIVE_SHA256 &&
      archive.sizeBytes > 0 &&
      manifest.archive.sizeBytes === archive.sizeBytes,
    "ci-archive-digest-mismatch"
  );
  requireProof(validTree(manifest.output), "ci-output-tree-invalid");
  return manifest;
}

function verifiedManifest(root, directory, env) {
  const proof = readProofJson(join(directory, MANIFEST));
  const context = currentContext(root, env);
  const manifest = verifyManifest(proof.value, {
    context,
    env,
    manifestSha256: proof.sha256,
    archive: hashFile(join(directory, ARCHIVE)),
    zip: readProofJson(join(directory, "zip-verification.json")).value,
  });
  return { manifest, context };
}

function consume(root, directory, env) {
  consumeVerifiedManifest(root, directory, env, verifiedManifest(root, directory, env));
}

// External publishing runs establish the producer with the Actions API first.
// Keep their consumer identity separate from the original producer's run/attempt.
export function consumeVerifiedManifest(root, directory, env, { manifest, context }) {
  const dist = nextDistPath(root, env);
  const measured = measureNextTree(dist);
  requireProof(equal(measured, manifest.output), "ci-extracted-bytes-mismatch");
  const proof = writeNextInput(
    dist,
    manifest.source,
    {
      kind: "ci",
      ...manifest.producer,
      workflow: manifest.workflow,
      artifactId: env.NEXT_BUILD_ARTIFACT_ID,
      artifactDigest: digest(env.NEXT_BUILD_ARTIFACT_DIGEST),
      manifestSha256: env.NEXT_BUILD_MANIFEST_SHA256,
      archiveSha256: env.NEXT_BUILD_ARCHIVE_SHA256,
    },
    measured
  );
  writeFileSync(join(directory, "next-input.json"), readFileSync(join(dist, NEXT_INPUT_RECEIPT)), {
    flag: "wx",
  });
  const receipt = {
    schemaVersion: 1,
    policy: NEXT_BUILD_POLICY,
    candidateSha: manifest.source.candidateSha,
    artifactId: env.NEXT_BUILD_ARTIFACT_ID,
    artifactDigest: digest(env.NEXT_BUILD_ARTIFACT_DIGEST),
    manifestSha256: env.NEXT_BUILD_MANIFEST_SHA256,
    archiveSha256: env.NEXT_BUILD_ARCHIVE_SHA256,
    producerRunId: manifest.producer.runId,
    producerAttempt: manifest.producer.runAttempt,
    consumerRunId: context.runId,
    consumerAttempt: context.runAttempt,
    consumerPlatform: process.platform,
    inputReceiptSha256: proof.sha256,
  };
  if (context.selectionSha256 !== undefined) {
    requireProof(DIGEST.test(context.selectionSha256), "ci-selection-digest-invalid");
    receipt.selectionSha256 = context.selectionSha256;
  }
  writeFileSync(
    join(directory, "next-build-consumption.json"),
    `${JSON.stringify(receipt, null, 2)}\n`,
    { flag: "wx" }
  );
  requireProof(boundedText(env.GITHUB_ENV), "ci-environment-output-missing");
  appendFileSync(
    env.GITHUB_ENV,
    `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1\nOMNIROUTE_NEXT_INPUT_SHA256=${proof.sha256}\n`
  );
}

export function main(args = process.argv.slice(2), root = process.cwd(), env = process.env) {
  const [command, first, second] = args;
  requireProof(first && args.length === (command === "seal" ? 3 : 2), "ci-provenance-usage");
  if (command === "capture") capture(root, first, env);
  else if (command === "seal") seal(root, first, second, env);
  else if (command === "verify") verifiedManifest(root, first, env);
  else if (command === "consume") consume(root, first, env);
  else requireProof(false, "ci-provenance-usage");
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    main();
  } catch (error) {
    console.error(
      `PREBUILT_NEXT_REQUIRED: ${/^[a-z][a-z-]+$/.test(error?.code || "") ? error.code : "ci-provenance-incomplete"}`
    );
    process.exitCode = 1;
  }
}
