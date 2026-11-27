import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";
import { load } from "js-yaml";
import {
  packCoverageShard,
  prepareCoverageShards,
} from "../../../scripts/ci/prepare-v8-coverage.mjs";

const root = resolve(fileURLToPath(new URL("../../../", import.meta.url)));
const workflow = load(readFileSync(join(root, ".github/workflows/ci.yml"), "utf8"));
const selector = () => import("../../../scripts/ci/select-v8-coverage.mjs");
const candidateSha = spawnSync("git", ["rev-parse", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).stdout.trim();
const options = {
  repository: "cheaper-inference/OmniRoute",
  candidateSha,
  // pull_request tests a synthetic merge commit, not the API's PR head SHA.
  runHeadSha: "a".repeat(40),
  runId: "987654321",
  runAttempt: "2",
  total: 8,
};

function timestamp(attempt, offset) {
  return `2026-11-18T12:${String(attempt * 10 + offset).padStart(2, "0")}:00.000Z`;
}

function job(index, attempt, conclusion = "success") {
  return {
    id: attempt * 100 + index,
    run_id: Number(options.runId),
    run_attempt: attempt,
    head_sha: options.runHeadSha,
    name: `Unit Tests (${index}/8)`,
    status: "completed",
    conclusion,
    started_at: timestamp(attempt, 0),
    completed_at: timestamp(attempt, 5),
    steps: ["Package successful shard coverage", "Upload complete shard coverage"].map((name) => ({
      name,
      status: "completed",
      conclusion: "success",
      started_at: timestamp(attempt, 1),
      completed_at: timestamp(attempt, 4),
    })),
  };
}

function artifact(index, attempt) {
  return {
    id: attempt * 1000 + index,
    name: `coverage-shard-${attempt}-${index}`,
    size_in_bytes: 100,
    expired: false,
    digest: `sha256:${String(index).repeat(64)}`,
    created_at: timestamp(attempt, 3),
    workflow_run: { id: Number(options.runId), head_sha: options.runHeadSha },
  };
}

function receipt(producerAttempts) {
  return {
    schemaVersion: 1,
    policy: "v8-shard-provenance-v1",
    repository: options.repository,
    candidateSha,
    runHeadSha: options.runHeadSha,
    runId: options.runId,
    consumerAttempt: options.runAttempt,
    total: 8,
    producers: producerAttempts.map((attempt, offset) => {
      const index = offset + 1;
      const producer = job(index, attempt);
      const evidence = artifact(index, attempt);
      return {
        index,
        producerAttempt: String(attempt),
        jobId: String(producer.id),
        artifactId: String(evidence.id),
        artifactName: evidence.name,
        artifactDigest: evidence.digest,
        jobStartedAt: producer.started_at,
        jobCompletedAt: producer.completed_at,
        artifactCreatedAt: evidence.created_at,
        attemptStartedAt: timestamp(attempt, 0),
        nextAttemptStartedAt: attempt < 2 ? timestamp(attempt + 1, 0) : null,
      };
    }),
  };
}

async function downloaded(t, producerAttempts) {
  const dir = await mkdtemp(join(tmpdir(), "v8-rerun-provenance-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const directory = join(dir, "downloaded");
  await mkdir(directory);
  for (const [offset, attempt] of producerAttempts.entries()) {
    const index = offset + 1;
    const inputDirectory = join(dir, `input-${index}`);
    await mkdir(inputDirectory);
    await writeFile(
      join(inputDirectory, "coverage-collision.json"),
      JSON.stringify({
        result: [
          {
            scriptId: "1",
            url: pathToFileURL(join(root, "scripts/quality/audit-dependencies.mjs")).href,
            functions: [
              {
                functionName: "fixture",
                isBlockCoverage: true,
                ranges: [{ startOffset: 0, endOffset: 80, count: index }],
              },
            ],
          },
        ],
      })
    );
    await packCoverageShard({
      ...options,
      runAttempt: String(attempt),
      shard: `${index}/8`,
      sourceRoot: root,
      inputDirectory,
      outputDirectory: join(directory, `coverage-shard-${attempt}-${index}`),
    });
  }
  return {
    ...options,
    directory,
    outputDirectory: join(dir, "prepared"),
    sourceRoot: root,
    selection: receipt(producerAttempts),
  };
}

for (const [name, attempts] of [
  ["seven retained successes and one rerun shard", [1, 1, 1, 1, 1, 1, 1, 2]],
  ["coverage-only rerun with all producers retained", [1, 1, 1, 1, 1, 1, 1, 1]],
]) {
  test(`a legitimate partial rerun admits ${name} without retagging manifests`, async (t) => {
    const input = await downloaded(t, attempts);
    const before = await Promise.all(
      input.selection.producers.map((producer) =>
        readFile(join(input.directory, producer.artifactName, "manifest.json"), "utf8")
      )
    );
    const result = await prepareCoverageShards(input);
    assert.equal(result.shards, 8);
    assert.equal(result.inputFiles, 8);
    assert.deepEqual(await readdir(input.outputDirectory), ["coverage-merged.json"]);
    const merged = JSON.parse(
      await readFile(join(input.outputDirectory, "coverage-merged.json"), "utf8")
    );
    assert.equal(merged.result[0].functions[0].ranges[0].count, 36);
    assert.deepEqual(result.producerAttempts, attempts.map(String));
    const after = await Promise.all(
      input.selection.producers.map((producer) =>
        readFile(join(input.directory, producer.artifactName, "manifest.json"), "utf8")
      )
    );
    assert.deepEqual(after, before, "producer manifests must retain their real attempt");
  });
}

test("mixed attempts still fail without an external selection receipt", async (t) => {
  const input = await downloaded(t, [1, 1, 1, 1, 1, 1, 1, 2]);
  delete input.selection;
  await assert.rejects(prepareCoverageShards(input));
});

for (const mutate of [
  (value) => {
    value.runId = "123";
  },
  (value) => {
    value.runHeadSha = "b".repeat(40);
  },
  (value) => {
    value.consumerAttempt = "1";
  },
  (value) => {
    value.producers[0] = { ...value.producers[1] };
  },
  (value) => {
    value.producers[0].producerAttempt = "3";
  },
]) {
  test(`admission validates the supplied receipt: ${mutate.toString()}`, async (t) => {
    const input = await downloaded(t, [2, 2, 2, 2, 2, 2, 2, 2]);
    mutate(input.selection);
    await assert.rejects(prepareCoverageShards(input));
  });
}

function apiFixture({ producerAttempts = [1, 1, 1, 1, 1, 1, 1, 2], extras = 0 } = {}) {
  const jobs = new Map([
    [1, []],
    [2, []],
  ]);
  const artifacts = [];
  for (let index = 1; index <= 8; index++) {
    jobs.get(1).push(job(index, 1, producerAttempts[index - 1] === 1 ? "success" : "failure"));
    if (producerAttempts[index - 1] === 2) jobs.get(2).push(job(index, 2));
    artifacts.push(artifact(index, 1));
    if (producerAttempts[index - 1] === 2) artifacts.push(artifact(index, 2));
  }
  for (let index = 0; index < extras; index++) {
    jobs.get(2).unshift({ ...job(1, 2), id: 5000 + index, name: `Unrelated ${index}` });
  }
  const run = {
    id: Number(options.runId),
    run_attempt: 2,
    head_sha: options.runHeadSha,
    run_started_at: timestamp(2, 0),
    event: "pull_request",
    repository: { full_name: options.repository },
  };
  const calls = [];
  const getJson = async (route) => {
    calls.push(route);
    const url = new URL(route, "https://api.github.com");
    const prefix = `/repos/${options.repository}/actions/runs/${options.runId}`;
    if (url.pathname === prefix) return structuredClone(run);
    if (url.pathname === `${prefix}/attempts/1`)
      return structuredClone({ ...run, run_attempt: 1, run_started_at: timestamp(1, 0) });
    const match = new RegExp(`^${prefix}/attempts/([12])/jobs$`).exec(url.pathname);
    const records = match
      ? jobs.get(Number(match[1]))
      : url.pathname === `${prefix}/artifacts`
        ? artifacts
        : null;
    assert.ok(records, `unexpected API route ${route}`);
    const page = Number(url.searchParams.get("page") || 1);
    const perPage = Number(url.searchParams.get("per_page") || 100);
    return structuredClone({
      total_count: records.length,
      [match ? "jobs" : "artifacts"]: records.slice((page - 1) * perPage, page * perPage),
    });
  };
  return { jobs, artifacts, run, calls, getJson };
}

test("the CLI context derives PR head from the event and tested SHA from the checked-out merge", async () => {
  const { resolveCoverageContext } = await selector();
  const env = {
    GITHUB_REPOSITORY: options.repository,
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_REF: "refs/pull/42/merge",
    GITHUB_SHA: candidateSha,
    GITHUB_RUN_ID: options.runId,
    GITHUB_RUN_ATTEMPT: options.runAttempt,
  };
  const event = {
    number: 42,
    repository: { full_name: options.repository },
    pull_request: {
      number: 42,
      head: { sha: options.runHeadSha },
      base: { repo: { full_name: options.repository } },
    },
  };
  const resolved = resolveCoverageContext(env, event, candidateSha);
  assert.equal(resolved.candidateSha, candidateSha);
  assert.equal(resolved.runHeadSha, options.runHeadSha);
  assert.throws(() => resolveCoverageContext(env, event, options.runHeadSha), /INCOMPLETE/);
  assert.throws(
    () =>
      resolveCoverageContext(
        env,
        { ...event, pull_request: { ...event.pull_request, head: {} } },
        candidateSha
      ),
    /INCOMPLETE/
  );
});

for (const eventName of ["push", "workflow_dispatch", "merge_group"]) {
  test(`the CLI context keeps a single tested identity for ${eventName}`, async () => {
    const { resolveCoverageContext } = await selector();
    const env = {
      GITHUB_REPOSITORY: options.repository,
      GITHUB_EVENT_NAME: eventName,
      GITHUB_REF: "refs/heads/main",
      GITHUB_SHA: candidateSha,
      GITHUB_RUN_ID: options.runId,
      GITHUB_RUN_ATTEMPT: options.runAttempt,
    };
    const event = {
      repository: { full_name: options.repository },
      ref: env.GITHUB_REF,
      after: candidateSha,
      merge_group: { head_sha: candidateSha },
    };
    const resolved = resolveCoverageContext(env, event, candidateSha);
    assert.equal(resolved.candidateSha, candidateSha);
    assert.equal(resolved.runHeadSha, candidateSha);
  });
}

test("the selector binds PR head separately from the tested merge and retains seven successes", async () => {
  const { selectCoverageArtifacts } = await selector();
  const api = apiFixture();
  const selected = await selectCoverageArtifacts(options, { getJson: api.getJson });
  assert.equal(selected.candidateSha, candidateSha);
  assert.equal(selected.runHeadSha, options.runHeadSha);
  assert.notEqual(selected.candidateSha, selected.runHeadSha);
  assert.deepEqual(
    selected.producers.map((item) => item.producerAttempt),
    ["1", "1", "1", "1", "1", "1", "1", "2"]
  );
  assert.deepEqual(
    selected.producers.map((item) => item.artifactId),
    ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "2008"]
  );
});

test("GitHub retained job clones do not relabel the original coverage producers", async () => {
  const { selectCoverageArtifacts } = await selector();
  const api = apiFixture();
  for (let index = 1; index <= 7; index++) {
    // GitHub returns a new ID/run_attempt but retains the original execution times.
    api.jobs
      .get(2)
      .push({ ...structuredClone(api.jobs.get(1)[index - 1]), id: 200 + index, run_attempt: 2 });
  }
  const selected = await selectCoverageArtifacts(options, { getJson: api.getJson });
  assert.deepEqual(
    selected.producers.map((item) => item.producerAttempt),
    ["1", "1", "1", "1", "1", "1", "1", "2"]
  );
  assert.deepEqual(
    selected.producers.map((item) => item.jobId),
    ["101", "102", "103", "104", "105", "106", "107", "208"]
  );
  assert.deepEqual(
    selected.producers.map((item) => item.artifactId),
    ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "2008"]
  );
});

for (const scenario of ["clone-history-mismatch", "clone-crosses-attempt-start", "clone-failed"]) {
  test(`a retained clone is INCOMPLETE for ${scenario}`, async () => {
    const { selectCoverageArtifacts } = await selector();
    const api = apiFixture();
    const clone = { ...structuredClone(api.jobs.get(1)[0]), id: 201, run_attempt: 2 };
    api.jobs.get(2).push(clone);
    if (scenario === "clone-history-mismatch") clone.steps[0].completed_at = timestamp(1, 2);
    if (scenario === "clone-crosses-attempt-start") clone.completed_at = timestamp(2, 1);
    if (scenario === "clone-failed") clone.conclusion = "failure";
    await assert.rejects(selectCoverageArtifacts(options, { getJson: api.getJson }), /INCOMPLETE/);
  });
}

for (const attempts of [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2],
]) {
  test(`the selector handles producer attempts ${attempts.join(",")}`, async () => {
    const { selectCoverageArtifacts } = await selector();
    const api = apiFixture({ producerAttempts: attempts });
    const selected = await selectCoverageArtifacts(options, { getJson: api.getJson });
    assert.deepEqual(
      selected.producers.map((item) => item.producerAttempt),
      attempts.map(String)
    );
    assert.equal(new Set(selected.producers.map((item) => item.artifactId)).size, 8);
    if (attempts[0] === 2)
      assert.equal(
        api.calls.some((route) => route.includes("attempts/1/jobs")),
        false
      );
  });
}

for (const scenario of [
  "latest-failed",
  "latest-cancelled",
  "upload-incomplete",
  "duplicate-job",
  "duplicate-artifact",
  "expired-artifact",
  "missing-artifact",
  "wrong-run-head",
  "wrong-job-head",
  "wrong-artifact-run",
  "artifact-outside-job",
  "digest-missing",
]) {
  test(`provenance is INCOMPLETE for ${scenario} without falling back to an older success`, async () => {
    const { selectCoverageArtifacts } = await selector();
    const api = apiFixture();
    const latest = api.jobs.get(2)[0];
    const latestArtifact = api.artifacts.find((item) => item.name === "coverage-shard-2-8");
    if (scenario === "latest-failed") latest.conclusion = "failure";
    if (scenario === "latest-cancelled") latest.conclusion = "cancelled";
    if (scenario === "upload-incomplete") latest.steps[1].conclusion = "skipped";
    if (scenario === "duplicate-job") api.jobs.get(2).push({ ...latest, id: 299 });
    if (scenario === "duplicate-artifact") api.artifacts.push({ ...latestArtifact, id: 2999 });
    if (scenario === "expired-artifact") latestArtifact.expired = true;
    if (scenario === "missing-artifact")
      api.artifacts.splice(api.artifacts.indexOf(latestArtifact), 1);
    if (scenario === "wrong-run-head") api.run.head_sha = candidateSha;
    if (scenario === "wrong-job-head") latest.head_sha = candidateSha;
    if (scenario === "wrong-artifact-run") latestArtifact.workflow_run.id = 123;
    if (scenario === "artifact-outside-job") latestArtifact.created_at = timestamp(1, 3);
    if (scenario === "digest-missing") delete latestArtifact.digest;
    await assert.rejects(selectCoverageArtifacts(options, { getJson: api.getJson }), /INCOMPLETE/);
  });
}

test("job enumeration is paginated to completion before choosing a producer", async () => {
  const { selectCoverageArtifacts } = await selector();
  const api = apiFixture({ extras: 120 });
  const selected = await selectCoverageArtifacts(options, { getJson: api.getJson });
  assert.equal(selected.producers.length, 8);
  assert.ok(
    api.calls.some((route) => route.includes("attempts/2/jobs") && route.includes("page=2"))
  );
});

for (const scenario of ["empty-next-page", "count-drift", "too-many-records", "api-error"]) {
  test(`bounded API enumeration rejects ${scenario}`, async () => {
    const { selectCoverageArtifacts } = await selector();
    const api = apiFixture({ extras: 120 });
    const getJson = async (route) => {
      const value = await api.getJson(route);
      if (!route.includes("attempts/2/jobs")) return value;
      if (scenario === "api-error")
        throw new Error("authorization secret must never appear in diagnostics");
      if (scenario === "too-many-records") value.total_count = 10001;
      if (route.includes("page=2")) {
        if (scenario === "empty-next-page") value.jobs = [];
        if (scenario === "count-drift") value.total_count++;
      }
      return value;
    };
    await assert.rejects(selectCoverageArtifacts(options, { getJson }), (error) => {
      assert.match(error.message, /INCOMPLETE/);
      assert.doesNotMatch(error.message, /authorization secret/);
      return true;
    });
    assert.ok(api.calls.length <= 5, "incomplete API data must stop bounded collection");
  });
}

test("coverage downloads selected immutable IDs and keeps both required read permissions", () => {
  const coverage = workflow.jobs["test-coverage"];
  assert.deepEqual(coverage.permissions, { contents: "read", actions: "read" });
  const selection = coverage.steps.find((step) => step.id === "coverage_selection");
  const download = coverage.steps.find((step) => step.name === "Download all shard coverage");
  assert.match(selection?.run || "", /select-v8-coverage\.mjs/);
  assert.equal(
    download.with["artifact-ids"],
    "${{ steps.coverage_selection.outputs.artifact_ids }}"
  );
  assert.equal(download.with.pattern, undefined);
  assert.equal(download.with["merge-multiple"], false);
  assert.ok(coverage.steps.indexOf(selection) < coverage.steps.indexOf(download));
});

test("coverage producers and aggregator use one exact Node version across reruns", () => {
  const versionRef = "${{ env.CI_V8_NODE_VERSION }}";
  assert.match(workflow.env.CI_V8_NODE_VERSION, /^\d+\.\d+\.\d+$/);
  for (const job of ["test-unit", "test-coverage"]) {
    const setup = workflow.jobs[job].steps.find((step) =>
      step.uses?.startsWith("actions/setup-node@")
    );
    assert.equal(setup?.with["node-version"], versionRef, job);
  }
});

test("the selection receipt is produced, consumed and archived under the coverage prefix", () => {
  const coverage = workflow.jobs["test-coverage"];
  const selection = coverage.steps.find((step) => step.id === "coverage_selection");
  const merge = coverage.steps.find((step) => step.name === "Merge + report + gate");
  const upload = coverage.steps.find((step) => step.name === "Upload coverage artifacts");
  const receiptPath = "coverage/coverage-selection.json";
  assert.match(
    selection?.run || "",
    /mkdir -p coverage[\s\S]*node scripts\/ci\/select-v8-coverage\.mjs coverage\/coverage-selection\.json 8/
  );
  assert.ok(merge.run.includes(receiptPath), "prepare must consume the archived receipt");
  const paths = upload.with.path
    .split(/\r?\n/)
    .map((path) => path.trim())
    .filter(Boolean);
  assert.ok(paths.includes(receiptPath));
  assert.ok(paths.includes("coverage/coverage-preparation.json"));
  assert.match(merge.run, /> coverage\/coverage-preparation\.json/);
  assert.ok(paths.includes("coverage/lcov.info"));
  assert.ok(
    paths.every((path) => dirname(path) === "coverage"),
    "the artifact must retain its common coverage prefix"
  );
  const sonarDownload = workflow.jobs.sonarqube.steps.find(
    (step) => step.with?.name === upload.with.name
  );
  assert.equal(sonarDownload.with.path, "coverage/", "lcov.info remains at the artifact root");
});

test("the producer initializes and packages one exclusive runtime cache around the unchanged c8 collection", () => {
  const unit = workflow.jobs["test-unit"];
  const collect = unit.steps.find((step) => step.run?.includes("npm run test:unit:ci:shard"));
  const pack = unit.steps.find((step) => step.name === "Package successful shard coverage");
  assert.equal(
    collect.env.TMPDIR,
    "${{ runner.temp }}/v8-tsx-${{ github.run_id }}-${{ github.run_attempt }}-${{ matrix.shard }}"
  );
  assert.equal(pack.env.TMPDIR, collect.env.TMPDIR);
  assert.ok(
    collect.run.indexOf("prepare-v8-coverage.mjs init-cache") <
      collect.run.indexOf("npx c8 --merge-async")
  );
  assert.match(
    collect.run,
    /init-cache "\$TMPDIR" "\$TEST_SHARD" "\$GITHUB_SHA" "\$GITHUB_RUN_ID" "\$GITHUB_RUN_ATTEMPT"/
  );
  assert.match(pack.run, /"\$GITHUB_WORKSPACE" "\$TMPDIR"$/);
  assert.deepEqual(unit.strategy.matrix.shard, [1, 2, 3, 4, 5, 6, 7, 8]);
});
