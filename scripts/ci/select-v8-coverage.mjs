import { execFileSync } from "node:child_process";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const POLICY = "v8-shard-provenance-v1";
const SHA = /^[a-f0-9]{40}$/;
const DIGEST = /^sha256:[a-f0-9]{64}$/;
const MAX_ATTEMPTS = 50;
const PAGE_SIZE = 100;
const MAX_RECORDS = 1000;

function requireEvidence(condition, reason) {
  if (!condition) throw new Error(`V8_EVIDENCE_INCOMPLETE:${reason}`);
}

function id(value) {
  const text = String(value ?? "");
  requireEvidence(/^[1-9][0-9]*$/.test(text), "identity-invalid");
  requireEvidence(BigInt(text) <= BigInt(Number.MAX_SAFE_INTEGER), "identity-out-of-range");
  return text;
}

function binding(options) {
  const { repository, candidateSha, runHeadSha, total } = options;
  requireEvidence(
    typeof repository === "string" &&
      /^[\w.-]+\/[\w.-]+$/.test(repository) &&
      !repository.split("/").some((part) => part === "." || part === ".."),
    "repository-invalid"
  );
  requireEvidence(SHA.test(candidateSha ?? "") && SHA.test(runHeadSha ?? ""), "sha-invalid");
  requireEvidence(Number.isSafeInteger(total) && total > 0 && total <= 256, "matrix-invalid");
  const runId = id(options.runId);
  const consumerAttempt = id(options.runAttempt);
  requireEvidence(Number(consumerAttempt) <= MAX_ATTEMPTS, "attempt-limit");
  return { repository, candidateSha, runHeadSha, runId, consumerAttempt, total };
}

function time(value) {
  requireEvidence(
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value),
    "timestamp-invalid"
  );
  const parsed = Date.parse(value);
  requireEvidence(Number.isFinite(parsed) && parsed >= 0, "timestamp-invalid");
  return parsed;
}

export function resolveCoverageContext(env, event, checkoutSha) {
  const candidateSha = env.GITHUB_SHA;
  requireEvidence(
    SHA.test(candidateSha ?? "") && checkoutSha === candidateSha,
    "checkout-sha-mismatch"
  );
  requireEvidence(
    event?.repository?.full_name === env.GITHUB_REPOSITORY,
    "event-repository-mismatch"
  );
  const name = env.GITHUB_EVENT_NAME;
  requireEvidence(
    ["pull_request", "push", "workflow_dispatch", "merge_group"].includes(name),
    "event-unsupported"
  );
  let runHeadSha = candidateSha;
  if (name === "pull_request") {
    const pr = event.pull_request;
    const number = id(pr?.number ?? event.number);
    requireEvidence(env.GITHUB_REF === `refs/pull/${number}/merge`, "pr-ref-mismatch");
    requireEvidence(pr?.base?.repo?.full_name === env.GITHUB_REPOSITORY, "pr-repository-mismatch");
    runHeadSha = pr?.head?.sha;
    requireEvidence(SHA.test(runHeadSha ?? ""), "pr-head-sha-missing");
  } else if (name === "push") {
    requireEvidence(
      event.after === candidateSha && event.ref === env.GITHUB_REF,
      "push-sha-mismatch"
    );
  } else if (name === "merge_group") {
    requireEvidence(event.merge_group?.head_sha === candidateSha, "merge-group-sha-mismatch");
  }
  return {
    repository: env.GITHUB_REPOSITORY,
    candidateSha,
    runHeadSha,
    runId: id(env.GITHUB_RUN_ID),
    runAttempt: id(env.GITHUB_RUN_ATTEMPT),
  };
}

/** The receipt keeps producer attempts intact; the consumer attempt is separate. */
export function verifyCoverageSelection(receipt, options) {
  const expected = binding(options);
  requireEvidence(
    receipt?.schemaVersion === 1 && receipt.policy === POLICY,
    "receipt-policy-invalid"
  );
  requireEvidence(
    Object.entries(expected).every(([key, value]) => receipt[key] === value),
    "receipt-identity-mismatch"
  );
  requireEvidence(
    Array.isArray(receipt.producers) && receipt.producers.length === expected.total,
    "receipt-matrix-incomplete"
  );
  requireEvidence(
    receipt.producers.every((producer) => producer && typeof producer === "object"),
    "receipt-producer-invalid"
  );
  const producers = [...receipt.producers].sort((a, b) => a.index - b.index);
  const jobs = new Set();
  const artifacts = new Set();
  for (const [offset, producer] of producers.entries()) {
    requireEvidence(producer?.index === offset + 1, "receipt-shard-duplicate-or-missing");
    const attempt = id(producer.producerAttempt);
    const jobId = id(producer.jobId);
    const artifactId = id(producer.artifactId);
    requireEvidence(
      producer.producerAttempt === attempt && Number(attempt) <= Number(expected.consumerAttempt),
      "receipt-attempt-invalid"
    );
    requireEvidence(!jobs.has(jobId) && !artifacts.has(artifactId), "receipt-producer-duplicate");
    jobs.add(jobId);
    artifacts.add(artifactId);
    requireEvidence(
      producer.artifactName === `coverage-shard-${attempt}-${producer.index}` &&
        DIGEST.test(producer.artifactDigest ?? ""),
      "receipt-artifact-invalid"
    );
    const start = time(producer.jobStartedAt);
    const end = time(producer.jobCompletedAt);
    const created = time(producer.artifactCreatedAt);
    const attemptStart = time(producer.attemptStartedAt);
    const nextStart =
      producer.nextAttemptStartedAt === null ? Infinity : time(producer.nextAttemptStartedAt);
    requireEvidence(
      attemptStart <= start &&
        start <= created &&
        created <= end &&
        end <= nextStart &&
        attemptStart < nextStart,
      "receipt-artifact-outside-job"
    );
  }
  return producers;
}

async function get(getJson, route) {
  try {
    return await getJson(route);
  } catch {
    // HTTP bodies and thrown messages may contain authorization or environment data.
    throw new Error("V8_EVIDENCE_INCOMPLETE:github-api-unavailable");
  }
}

async function list(getJson, route, field) {
  const records = [];
  const seen = new Set();
  let total;
  for (let page = 1; page <= MAX_RECORDS / PAGE_SIZE; page++) {
    const body = await get(getJson, `${route}?per_page=${PAGE_SIZE}&page=${page}`);
    requireEvidence(
      Number.isSafeInteger(body?.total_count) &&
        body.total_count >= 0 &&
        body.total_count <= MAX_RECORDS,
      "api-inventory-limit"
    );
    if (total === undefined) total = body.total_count;
    requireEvidence(
      body.total_count === total && Array.isArray(body[field]) && body[field].length <= PAGE_SIZE,
      "api-inventory-drift"
    );
    requireEvidence(body[field].length > 0 || records.length === total, "api-inventory-incomplete");
    for (const record of body[field]) {
      const key = id(record?.id);
      requireEvidence(!seen.has(key), "api-inventory-duplicate");
      seen.add(key);
      records.push(record);
    }
    requireEvidence(records.length <= total, "api-inventory-drift");
    if (records.length === total) return records;
  }
  throw new Error("V8_EVIDENCE_INCOMPLETE:api-page-limit");
}

function attemptStart(run, expected, attempt) {
  requireEvidence(
    id(run?.id) === expected.runId &&
      id(run.run_attempt) === String(attempt) &&
      run.head_sha === expected.runHeadSha &&
      run.repository?.full_name === expected.repository,
    "workflow-run-mismatch"
  );
  return time(run.run_started_at);
}

function executionFingerprint(job) {
  return JSON.stringify({
    name: job.name,
    headSha: job.head_sha,
    status: job.status,
    conclusion: job.conclusion,
    startedAt: job.started_at,
    completedAt: job.completed_at,
    steps: job.steps.map((step) => ({
      number: step.number ?? null,
      name: step.name,
      status: step.status,
      conclusion: step.conclusion,
      startedAt: step.started_at,
      completedAt: step.completed_at,
    })),
  });
}

export async function selectCoverageArtifacts(options, { getJson }) {
  const expected = binding(options);
  const prefix = `/repos/${expected.repository}/actions/runs/${expected.runId}`;
  const run = await get(getJson, prefix);
  const selected = new Map();
  const retained = new Map();
  let laterAttemptStart = Infinity;
  for (
    let attempt = Number(expected.consumerAttempt);
    attempt >= 1 && selected.size < expected.total;
    attempt--
  ) {
    const metadata =
      attempt === Number(expected.consumerAttempt)
        ? run
        : await get(getJson, `${prefix}/attempts/${attempt}`);
    const started = attemptStart(metadata, expected, attempt);
    requireEvidence(started < laterAttemptStart, "attempt-time-ambiguous");
    const jobs = await list(getJson, `${prefix}/attempts/${attempt}/jobs`, "jobs");
    const attemptIndices = new Set();
    for (const job of jobs) {
      const match = /^Unit Tests \(([1-9][0-9]*)\/([1-9][0-9]*)\)$/.exec(job.name ?? "");
      if (!match) continue;
      const index = Number(match[1]);
      requireEvidence(
        Number(match[2]) === expected.total && index <= expected.total,
        "producer-matrix-mismatch"
      );
      requireEvidence(!attemptIndices.has(index), "producer-job-ambiguous");
      attemptIndices.add(index);
      requireEvidence(
        id(job.run_id) === expected.runId &&
          job.head_sha === expected.runHeadSha &&
          (job.run_attempt === undefined || id(job.run_attempt) === String(attempt)),
        "producer-job-identity-mismatch"
      );
      if (selected.has(index)) continue;
      // A later failure must never be replaced by an earlier successful producer.
      requireEvidence(
        job.status === "completed" && job.conclusion === "success",
        "latest-producer-not-successful"
      );
      requireEvidence(
        Array.isArray(job.steps) && job.steps.every((step) => step && typeof step === "object"),
        "producer-steps-invalid"
      );
      for (const name of ["Package successful shard coverage", "Upload complete shard coverage"]) {
        const steps = job.steps.filter((step) => step.name === name);
        requireEvidence(
          steps.length === 1 &&
            steps[0].status === "completed" &&
            steps[0].conclusion === "success",
          "producer-upload-incomplete"
        );
      }
      const jobStart = time(job.started_at);
      const jobEnd = time(job.completed_at);
      requireEvidence(jobStart <= jobEnd && jobEnd <= laterAttemptStart, "producer-time-invalid");
      const fingerprint = executionFingerprint(job);
      requireEvidence(
        !retained.has(index) || retained.get(index) === fingerprint,
        "retained-producer-history-mismatch"
      );
      if (jobStart < started) {
        // A partial rerun clones successful jobs under new IDs/run_attempt values.
        // Match their execution details against the original attempt before use.
        requireEvidence(attempt > 1 && jobEnd <= started, "retained-producer-time-ambiguous");
        retained.set(index, fingerprint);
        continue;
      }
      selected.set(index, {
        job,
        attempt,
        attemptStartedAt: metadata.run_started_at,
        nextAttemptStartedAt: Number.isFinite(laterAttemptStart)
          ? new Date(laterAttemptStart).toISOString()
          : null,
      });
    }
    laterAttemptStart = started;
  }
  requireEvidence(selected.size === expected.total, "producer-matrix-incomplete");
  const artifacts = await list(getJson, `${prefix}/artifacts`, "artifacts");
  const producers = [];
  for (let index = 1; index <= expected.total; index++) {
    const { job, attempt, attemptStartedAt, nextAttemptStartedAt } = selected.get(index);
    const name = `coverage-shard-${attempt}-${index}`;
    const matches = artifacts.filter((artifact) => artifact.name === name);
    requireEvidence(matches.length === 1, "producer-artifact-missing-or-ambiguous");
    const artifact = matches[0];
    requireEvidence(
      artifact.expired === false &&
        Number.isSafeInteger(artifact.size_in_bytes) &&
        artifact.size_in_bytes > 0 &&
        DIGEST.test(artifact.digest ?? ""),
      "producer-artifact-unavailable"
    );
    requireEvidence(
      id(artifact.workflow_run?.id) === expected.runId &&
        artifact.workflow_run.head_sha === expected.runHeadSha,
      "producer-artifact-identity-mismatch"
    );
    const created = time(artifact.created_at);
    requireEvidence(
      time(job.started_at) <= created && created <= time(job.completed_at),
      "producer-artifact-outside-job"
    );
    producers.push({
      index,
      producerAttempt: String(attempt),
      jobId: id(job.id),
      artifactId: id(artifact.id),
      artifactName: name,
      artifactDigest: artifact.digest,
      jobStartedAt: job.started_at,
      jobCompletedAt: job.completed_at,
      artifactCreatedAt: artifact.created_at,
      attemptStartedAt,
      nextAttemptStartedAt,
    });
  }
  const receipt = { schemaVersion: 1, policy: POLICY, ...expected, producers };
  verifyCoverageSelection(receipt, options);
  return receipt;
}

async function main() {
  const [output, total] = process.argv.slice(2);
  requireEvidence(process.argv.length === 4 && output, "usage-select-output-total");
  const env = process.env;
  const event = JSON.parse(await readFile(env.GITHUB_EVENT_PATH, "utf8"));
  const checkoutSha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  const context = resolveCoverageContext(env, event, checkoutSha);
  requireEvidence(
    typeof env.GITHUB_TOKEN === "string" && env.GITHUB_TOKEN.length > 0,
    "github-token-missing"
  );
  const getJson = async (route) => {
    const response = await fetch(new URL(route, "https://api.github.com"), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
    requireEvidence(response.ok, "github-api-status");
    return response.json();
  };
  const receipt = await selectCoverageArtifacts({ ...context, total: Number(total) }, { getJson });
  await writeFile(output, JSON.stringify(receipt, null, 2) + "\n", { flag: "wx" });
  const artifactIds = receipt.producers.map((producer) => producer.artifactId).join(",");
  await appendFile(env.GITHUB_OUTPUT, `artifact_ids=${artifactIds}\n`);
  console.log(
    JSON.stringify({
      status: "COMPLETE",
      ...context,
      producerAttempts: receipt.producers.map((producer) => producer.producerAttempt),
      artifactIds,
    })
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    const reason = /^V8_EVIDENCE_INCOMPLETE:[a-z-]+$/.test(error?.message ?? "")
      ? error.message
      : "V8_EVIDENCE_INCOMPLETE:local-evidence-unavailable";
    console.error(reason);
    process.exitCode = 1;
  });
}
