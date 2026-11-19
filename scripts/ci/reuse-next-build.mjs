#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  appendFileSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  checkoutIdentity,
  hashFile,
  readProofJson,
  requireProof,
  SHA,
  sha256,
} from "../build/standaloneInput.mjs";
import {
  ciSourceContext,
  consumeVerifiedManifest,
  verifyManifest,
} from "./next-build-provenance.mjs";

const WORKFLOW = ".github/workflows/ci.yml";
const UPLOAD = "Upload Next.js build for downstream jobs";
const MAX_ARCHIVE = 64 * 1024 ** 3;
const MAX_PAGES = 10;
const MAX_REQUESTS = 128;
const MAX_ATTEMPTS = 20;
const id = (value) =>
  (typeof value === "string" || Number.isSafeInteger(value)) &&
  /^[1-9][0-9]{0,19}$/.test(String(value));
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const safeRef = (value) =>
  typeof value === "string" &&
  value.length > 0 &&
  value.length <= 512 &&
  !/[\x00-\x20\x7f]/.test(value);
const time = (value) => {
  const parsed = typeof value === "string" ? Date.parse(value) : NaN;
  requireProof(Number.isFinite(parsed), "external-timestamp-invalid");
  return parsed;
};

function command(binary, args, root, env, options = {}) {
  const result = spawnSync(binary, args, {
    cwd: root,
    env,
    encoding: "utf8",
    timeout: 30000,
    maxBuffer: 4 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
  requireProof(
    !result.error && !result.signal && result.status === 0,
    binary === "gh" ? "external-api-incomplete" : "external-command-incomplete"
  );
  return result.stdout;
}

function apiClient(root, env) {
  let requests = 0;
  const api = (endpoint, options = {}) => {
    requireProof(++requests <= MAX_REQUESTS, "external-api-request-limit");
    const result = command("gh", ["api", endpoint], root, env, options);
    if (options.stdio) return;
    try {
      return JSON.parse(result);
    } catch {
      requireProof(false, "external-api-json-invalid");
    }
  };
  const list = (endpoint, field) => {
    let expected;
    const result = [];
    const seen = new Set();
    for (let page = 1; page <= MAX_PAGES; page++) {
      const response = api(
        `${endpoint}${endpoint.includes("?") ? "&" : "?"}per_page=100&page=${page}`
      );
      requireProof(
        Number.isSafeInteger(response?.total_count) &&
          response.total_count >= 0 &&
          response.total_count <= MAX_PAGES * 100 &&
          Array.isArray(response[field]),
        "external-api-page-invalid"
      );
      expected ??= response.total_count;
      requireProof(
        response.total_count === expected && response[field].length <= 100,
        "external-api-inventory-changed"
      );
      for (const entry of response[field]) {
        requireProof(id(entry?.id) && !seen.has(String(entry.id)), "external-api-duplicate-id");
        seen.add(String(entry.id));
        result.push(entry);
      }
      requireProof(result.length <= expected, "external-api-count-mismatch");
      if (result.length === expected) return result;
      requireProof(response[field].length === 100, "external-api-page-incomplete");
    }
    requireProof(false, "external-api-page-limit");
  };
  return { api, list };
}

function runIdentity(run, expected, workflowId, attempt) {
  requireProof(
    id(run?.id) &&
      run.workflow_id === workflowId &&
      run.path === WORKFLOW &&
      run.head_sha === expected.candidateSha &&
      run.repository?.full_name === expected.repository &&
      String(run.repository?.id) === expected.repositoryId &&
      run.head_repository?.full_name === expected.repository &&
      String(run.head_repository?.id) === expected.repositoryId &&
      ["push", "workflow_dispatch"].includes(run.event) &&
      safeRef(run.head_branch) &&
      id(run.run_attempt) &&
      Number(run.run_attempt) <= MAX_ATTEMPTS &&
      (attempt === undefined || String(run.run_attempt) === String(attempt)),
    "external-run-identity-mismatch"
  );
  time(run.run_started_at);
}

function buildJob(jobs, run, candidateSha) {
  const found = jobs.filter((job) => job.name === "Build");
  requireProof(found.length === 1, "external-build-job-ambiguous");
  const job = found[0];
  requireProof(
    String(job.run_id) === String(run.id) &&
      String(job.run_attempt) === String(run.run_attempt) &&
      job.head_sha === candidateSha &&
      job.status === "completed" &&
      job.conclusion === "success" &&
      time(job.completed_at) >= time(job.started_at),
    "external-build-not-successful"
  );
  return job;
}

function uploadEvidence(job) {
  requireProof(Array.isArray(job.steps), "external-upload-step-missing");
  const found = job.steps.filter((step) => step.name === UPLOAD);
  requireProof(
    found.length === 1 && found[0].status === "completed" && found[0].conclusion === "success",
    "external-upload-step-missing"
  );
  const step = found[0];
  requireProof(
    time(step.started_at) >= time(job.started_at) &&
      time(step.completed_at) >= time(step.started_at) &&
      time(step.completed_at) <= time(job.completed_at),
    "external-upload-window-invalid"
  );
  return { number: step.number, startedAt: step.started_at, completedAt: step.completed_at };
}

function artifactIdentity(artifact, run, expected, attempt) {
  requireProof(
    id(artifact.id) &&
      artifact.name === `next-build-${run.id}-${attempt}` &&
      artifact.expired === false &&
      /^sha256:[0-9a-f]{64}$/.test(artifact.digest || "") &&
      Number.isSafeInteger(artifact.size_in_bytes) &&
      artifact.size_in_bytes > 0 &&
      artifact.size_in_bytes <= MAX_ARCHIVE &&
      String(artifact.workflow_run?.id) === String(run.id) &&
      String(artifact.workflow_run?.repository_id) === expected.repositoryId &&
      String(artifact.workflow_run?.head_repository_id) === expected.repositoryId &&
      artifact.workflow_run?.head_sha === expected.candidateSha &&
      artifact.workflow_run?.head_branch === run.head_branch &&
      time(artifact.expires_at) > Date.now(),
    "external-artifact-identity-mismatch"
  );
}

function artifactSnapshot(artifact) {
  return Object.fromEntries(
    [
      "id",
      "name",
      "digest",
      "size_in_bytes",
      "created_at",
      "updated_at",
      "expires_at",
      "expired",
      "workflow_run",
    ].map((key) => [key, artifact[key]])
  );
}

function selectProducer(client, expected) {
  const prefix = `repos/${expected.repository}/actions`;
  const workflow = client.api(`${prefix}/workflows/ci.yml`);
  requireProof(
    id(workflow?.id) && workflow.path === WORKFLOW,
    "external-workflow-identity-mismatch"
  );
  const inventory = client.list(
    `${prefix}/runs?head_sha=${expected.candidateSha}`,
    "workflow_runs"
  );
  for (const run of inventory) {
    requireProof(
      id(run.workflow_id) &&
        run.head_sha === expected.candidateSha &&
        id(run.head_repository?.id) &&
        typeof run.head_repository?.full_name === "string",
      "external-run-inventory-incomplete"
    );
  }
  const candidates = inventory.filter(
    (run) =>
      run.workflow_id === workflow.id &&
      run.head_repository?.full_name === expected.repository &&
      String(run.head_repository?.id) === expected.repositoryId &&
      ["push", "workflow_dispatch"].includes(run.event)
  );
  for (const run of candidates) runIdentity(run, expected, workflow.id);
  candidates.sort(
    (left, right) =>
      time(right.run_started_at) - time(left.run_started_at) ||
      (BigInt(left.id) < BigInt(right.id) ? 1 : -1)
  );
  for (const summary of candidates) {
    const run = client.api(`${prefix}/runs/${summary.id}`);
    runIdentity(run, expected, workflow.id);
    requireProof(
      String(run.id) === String(summary.id) && run.run_attempt === summary.run_attempt,
      "external-run-inventory-changed"
    );
    const artifacts = client.list(`${prefix}/runs/${run.id}/artifacts`, "artifacts");
    for (const artifact of artifacts) {
      requireProof(
        typeof artifact.name === "string" &&
          artifact.name.length > 0 &&
          artifact.name.length <= 512 &&
          typeof artifact.expired === "boolean",
        "external-artifact-inventory-incomplete"
      );
    }
    const qualified = artifacts.filter(
      (artifact) =>
        /^next-build-[1-9][0-9]*-[1-9][0-9]*$/.test(artifact.name || "") && !artifact.expired
    );
    if (!qualified.length) {
      requireProof(
        !artifacts.some((artifact) => artifact.name === "next-build" && !artifact.expired),
        "external-legacy-artifact-unbound"
      );
      continue;
    }
    const attempts = new Set();
    for (const artifact of qualified) {
      const attempt = artifact.name.split("-").at(-1);
      requireProof(
        Number(attempt) <= Number(run.run_attempt) && !attempts.has(attempt),
        "external-artifact-attempt-ambiguous"
      );
      artifactIdentity(artifact, run, expected, attempt);
      attempts.add(attempt);
    }
    qualified.sort(
      (left, right) => Number(right.name.split("-").at(-1)) - Number(left.name.split("-").at(-1))
    );
    const artifact = qualified[0];
    const attempt = artifact.name.split("-").at(-1);
    const original = client.api(`${prefix}/runs/${run.id}/attempts/${attempt}`);
    runIdentity(original, expected, workflow.id, attempt);
    requireProof(
      String(original.id) === String(run.id) &&
        original.head_branch === run.head_branch &&
        original.event === run.event,
      "external-producer-attempt-mismatch"
    );
    const job = buildJob(
      client.list(`${prefix}/runs/${run.id}/attempts/${attempt}/jobs`, "jobs"),
      original,
      expected.candidateSha
    );
    const upload = uploadEvidence(job);
    requireProof(
      time(job.started_at) >= time(original.run_started_at) &&
        time(artifact.created_at) >= time(upload.startedAt) - 1000 &&
        time(artifact.updated_at) >= time(artifact.created_at) &&
        time(artifact.updated_at) <= time(upload.completedAt) + 1000,
      "external-artifact-window-mismatch"
    );
    const attemptsChecked = [{ attempt, jobId: String(job.id), relation: "producer" }];
    // GitHub can clone a successful job into later partial reruns. Prove its
    // original timestamps; never relabel an old artifact or hide a new failure.
    for (let next = Number(attempt) + 1; next <= Number(run.run_attempt); next++) {
      const later = client.api(`${prefix}/runs/${run.id}/attempts/${next}`);
      runIdentity(later, expected, workflow.id, next);
      requireProof(String(later.id) === String(run.id), "external-producer-attempt-mismatch");
      const clone = buildJob(
        client.list(`${prefix}/runs/${run.id}/attempts/${next}/jobs`, "jobs"),
        later,
        expected.candidateSha
      );
      requireProof(
        time(clone.completed_at) < time(later.run_started_at) &&
          clone.started_at === job.started_at &&
          clone.completed_at === job.completed_at &&
          equal(uploadEvidence(clone), upload),
        "external-new-build-without-artifact"
      );
      attemptsChecked.push({
        attempt: String(next),
        jobId: String(clone.id),
        relation: "unchanged-clone",
      });
    }
    const readback = client.api(`${prefix}/artifacts/${artifact.id}`);
    requireProof(
      equal(artifactSnapshot(artifact), artifactSnapshot(readback)),
      "external-artifact-inventory-changed"
    );
    return {
      run: original,
      artifact,
      job,
      upload,
      attemptsChecked,
      workflowId: String(workflow.id),
    };
  }
  return null;
}

function verifyExternalManifest(root, directory, env, expected, selected) {
  const proof = readProofJson(join(directory, "next-build-provenance.json"));
  const manifest = proof.value;
  const source = manifest.source;
  const run = selected.run;
  const allowedRefs = [`refs/heads/${run.head_branch}`];
  if (run.event === "workflow_dispatch") allowedRefs.push(`refs/tags/${run.head_branch}`);
  requireProof(
    source &&
      allowedRefs.includes(source.ref) &&
      source.eventName === run.event &&
      SHA.test(source.baseSha),
    "external-source-context-invalid"
  );
  const producerEnv = {
    ...env,
    GITHUB_EVENT_NAME: run.event,
    GITHUB_REF: source.ref,
    NEXT_BUILD_QUEUE_BASE: source.baseSha,
  };
  let queueMessage = "";
  if (source.ref.startsWith("refs/heads/omni-queue/")) {
    queueMessage = command("git", ["log", "-1", "--format=%B", expected.candidateSha], root, env);
  }
  // The REST run does not expose push.before. It is the producer's assertion in
  // the manifest authenticated by the API's independent ZIP digest, not a value
  // reconstructed from the consumer's release event or an invented API field.
  const producerSource = ciSourceContext({
    env: producerEnv,
    checkout: {
      candidateSha: expected.candidateSha,
      treeSha: expected.treeSha,
      lockfileSha256: expected.lockfileSha256,
    },
    event: {
      repository: { full_name: expected.repository, id: expected.repositoryId },
      after: expected.candidateSha,
      ref: source.ref,
      before: source.baseSource === "created-ref" ? "0".repeat(40) : source.baseSha,
    },
    queueMessage,
  });
  const context = {
    source: producerSource,
    workflow: {
      sha: expected.candidateSha,
      ref: `${expected.repository}/${WORKFLOW}@${source.ref}`,
      fileSha256: hashFile(join(root, WORKFLOW)).sha256,
    },
    runId: String(run.id),
    runAttempt: String(run.run_attempt),
  };
  const proofEnv = {
    ...env,
    NEXT_BUILD_PRODUCER_RESULT: "success",
    NEXT_BUILD_PRODUCER_ATTEMPT: context.runAttempt,
    NEXT_BUILD_ARTIFACT_ID: String(selected.artifact.id),
    NEXT_BUILD_ARTIFACT_DIGEST: selected.artifact.digest,
    NEXT_BUILD_MANIFEST_SHA256: proof.sha256,
    NEXT_BUILD_ARCHIVE_SHA256: manifest.archive?.sha256,
  };
  verifyManifest(manifest, {
    context,
    env: proofEnv,
    manifestSha256: proof.sha256,
    archive: hashFile(join(directory, "e2e-build.tar.gz")),
    zip: readProofJson(join(directory, "zip-verification.json")).value,
  });
  return { manifest, proofEnv };
}

export function main(root = process.cwd(), env = process.env) {
  requireProof(
    /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_REPOSITORY || "") &&
      id(env.GITHUB_REPOSITORY_ID) &&
      id(env.GITHUB_RUN_ID) &&
      id(env.GITHUB_RUN_ATTEMPT) &&
      SHA.test(env.GITHUB_SHA || "") &&
      env.RUNNER_TEMP &&
      env.GITHUB_ENV &&
      env.GITHUB_OUTPUT,
    "external-consumer-identity-invalid"
  );
  requireProof(
    !env.NEXT_DIST_DIR || env.NEXT_DIST_DIR === ".build/next",
    "external-next-directory-mismatch"
  );
  const expected = {
    ...checkoutIdentity(root),
    repository: env.GITHUB_REPOSITORY,
    repositoryId: env.GITHUB_REPOSITORY_ID,
  };
  requireProof(expected.candidateSha === env.GITHUB_SHA, "external-consumer-sha-mismatch");
  const directory = join(root, "_artifacts/next-build-external");
  requireProof(!existsSync(directory), "external-evidence-destination-exists");
  mkdirSync(directory, { recursive: true });
  const client = apiClient(root, env);
  const selected = selectProducer(client, expected);
  if (!selected) {
    mkdirSync(join(directory, "proof"));
    writeFileSync(
      join(directory, "proof/selection.json"),
      `${JSON.stringify(
        {
          schemaVersion: 1,
          policy: "external-ci-next-build/1",
          candidateSha: expected.candidateSha,
          consumerRunId: env.GITHUB_RUN_ID,
          consumerAttempt: env.GITHUB_RUN_ATTEMPT,
          verdict: "ABSENT",
          completeInventory: true,
        },
        null,
        2
      )}\n`,
      { flag: "wx" }
    );
    appendFileSync(env.GITHUB_OUTPUT, "reused=false\n");
    console.log(
      "No retained qualified CI input for this candidate; the existing build fallback applies."
    );
    return;
  }
  // Stream the potentially multi-GB ZIP directly onto disk, never through a
  // maxBuffer/heap-sized stdout. It is downloaded by exact ID, not a mutable name.
  const zipDirectory = join(
    env.RUNNER_TEMP,
    `next-build-${env.GITHUB_RUN_ID}-${env.GITHUB_RUN_ATTEMPT}`
  );
  requireProof(!existsSync(zipDirectory), "external-download-destination-exists");
  mkdirSync(zipDirectory);
  const zipPath = join(zipDirectory, "artifact.zip");
  const fd = openSync(zipPath, "wx");
  try {
    client.api(`repos/${expected.repository}/actions/artifacts/${selected.artifact.id}/zip`, {
      stdio: ["ignore", fd, "pipe"],
      timeout: 10 * 60 * 1000,
    });
  } finally {
    closeSync(fd);
  }
  const zipped = hashFile(zipPath);
  requireProof(
    zipped.sizeBytes === selected.artifact.size_in_bytes &&
      `sha256:${zipped.sha256}` === selected.artifact.digest,
    "external-zip-digest-mismatch"
  );
  const proofDirectory = join(directory, "proof");
  const transportEnv = {
    ...env,
    NEXT_BUILD_ARTIFACT_ID: String(selected.artifact.id),
    NEXT_BUILD_ARTIFACT_DIGEST: selected.artifact.digest,
  };
  const unpack = join(root, "scripts/ci/unpack-next-build.py");
  command("python3", [unpack, "unpack", zipDirectory, proofDirectory], root, transportEnv, {
    timeout: 10 * 60 * 1000,
  });
  const { manifest, proofEnv } = verifyExternalManifest(
    root,
    proofDirectory,
    env,
    expected,
    selected
  );
  const selection = {
    schemaVersion: 1,
    policy: "external-ci-next-build/1",
    candidateSha: expected.candidateSha,
    consumerRunId: env.GITHUB_RUN_ID,
    consumerAttempt: env.GITHUB_RUN_ATTEMPT,
    verdict: "VERIFIED",
    workflowId: selected.workflowId,
    producerRunId: String(selected.run.id),
    producerAttempt: String(selected.run.run_attempt),
    producerEvent: selected.run.event,
    producerRef: manifest.source.ref,
    producerJobId: String(selected.job.id),
    startedAt: selected.job.started_at,
    completedAt: selected.job.completed_at,
    upload: selected.upload,
    artifact: artifactSnapshot(selected.artifact),
    attemptsChecked: selected.attemptsChecked,
  };
  const selectionBytes = `${JSON.stringify(selection, null, 2)}\n`;
  writeFileSync(join(proofDirectory, "selection.json"), selectionBytes, { flag: "wx" });
  const archive = join(proofDirectory, "e2e-build.tar.gz");
  command("python3", [unpack, "inspect", archive], root, transportEnv, { timeout: 10 * 60 * 1000 });
  command("tar", ["-xzf", archive, "-C", root], root, env, { timeout: 10 * 60 * 1000 });
  consumeVerifiedManifest(root, proofDirectory, proofEnv, {
    manifest,
    context: {
      runId: env.GITHUB_RUN_ID,
      runAttempt: env.GITHUB_RUN_ATTEMPT,
      selectionSha256: sha256(selectionBytes),
    },
  });
  // Retain the small proofs in the uploaded evidence; remove only our successful
  // transfer files. Invalid evidence never triggers deleting/rebuilding Next.
  rmSync(archive);
  rmSync(zipPath);
  rmdirSync(zipDirectory);
  appendFileSync(env.GITHUB_OUTPUT, "reused=true\n");
  console.log(
    `Verified CI Next artifact ${selected.artifact.id} from run ${selected.run.id}, attempt ${selected.run.run_attempt}.`
  );
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  try {
    main();
  } catch (error) {
    console.error(
      `PREBUILT_NEXT_REQUIRED: ${
        /^[a-z][a-z-]+$/.test(error?.code || "") ? error.code : "external-provenance-incomplete"
      }`
    );
    process.exitCode = 1;
  }
}
