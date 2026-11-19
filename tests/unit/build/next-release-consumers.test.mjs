import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { createRequire } from "node:module";
import {
  assertQualifiedReuse,
  consumers,
  releaseFixture,
  reuseStep,
} from "./fixtures/next-release-harness.mjs";

const { load } = createRequire(import.meta.url)("js-yaml");

function clonedAttempt(state, conclusion = "success") {
  const original = structuredClone(state.runs[0]);
  const current = state.runs[0];
  current.run_attempt = 3;
  current.run_started_at = new Date(Date.parse(original.updated_at) + 10000).toISOString();
  current.updated_at = new Date(Date.parse(original.updated_at) + 30000).toISOString();
  current.conclusion = conclusion;
  state.attemptRuns = [original, structuredClone(current)];
  const job = { ...structuredClone(state.jobs[0]), id: 882, run_attempt: 3, conclusion };
  if (conclusion !== "success") {
    job.started_at = current.run_started_at;
    job.completed_at = current.updated_at;
  }
  state.jobs.push(job);
}

test("external Next fixture calibrates exact named and ID downloads without a build", (t) => {
  const fixture = releaseFixture(t, consumers[0]);
  const inventory = spawnSync(
    "gh",
    [
      "api",
      `repos/${fixture.state.repository}/actions/runs?head_sha=${fixture.candidateSha}&per_page=100`,
      "--jq",
      '[.workflow_runs[] | select(.name == "CI" and .head_repository.full_name == env.REPO)] | .[].id',
    ],
    {
      cwd: fixture.checkout,
      env: fixture.env,
      encoding: "utf8",
      timeout: 10000,
    }
  );
  assert.equal(inventory.status, 0, inventory.stderr);
  assert.equal(inventory.stdout.trim(), "771", "real jq receives the controlled run inventory");
  const destination = join(fixture.temporary, "calibration");
  const named = spawnSync(
    "gh",
    [
      "run",
      "download",
      "771",
      "--repo",
      fixture.state.repository,
      "--name",
      "next-build-771-2",
      "--dir",
      destination,
    ],
    {
      cwd: fixture.checkout,
      env: fixture.env,
      encoding: "utf8",
      timeout: 10000,
    }
  );
  assert.equal(named.status, 0, named.stderr);
  assert.equal(
    JSON.parse(readFileSync(join(destination, "next-build-provenance.json"), "utf8")).producer
      .runAttempt,
    "2"
  );
  const bytes = spawnSync(
    "gh",
    ["api", `repos/${fixture.state.repository}/actions/artifacts/991/zip`],
    {
      cwd: fixture.checkout,
      env: fixture.env,
      timeout: 10000,
    }
  );
  assert.equal(bytes.status, 0, bytes.stderr?.toString());
  assert.equal(
    `sha256:${createHash("sha256").update(bytes.stdout).digest("hex")}`,
    fixture.state.artifacts[0].digest
  );
  assert.equal(fixture.serverExists(), false, "transport calibration never extracts the tree");
  assert.deepEqual(
    fixture.trace().filter((entry) => entry.operation === "unexpected"),
    []
  );
});

for (const consumer of consumers) {
  test(`${consumer.name} reuses the exact CI run and attempt with retained provenance`, (t) => {
    const fixture = releaseFixture(t, consumer);
    assertQualifiedReuse(fixture, fixture.runBoundary());
    if (consumer.name === "electron-release") assert.match(fixture.outputs(), /^reused=true$/m);
  });

  test(`${consumer.name} keeps successful Build evidence when an unrelated job failed`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        state.runs[0].conclusion = "failure";
      },
    });
    assertQualifiedReuse(fixture, fixture.runBoundary());
  });

  test(`${consumer.name} distinguishes complete artifact absence from incomplete evidence`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        state.artifacts = [];
      },
    });
    const result = fixture.runBoundary();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fixture.serverExists(), false);
    assert.equal(fixture.environment().includes("OMNIROUTE_REQUIRE_PREBUILT_NEXT=1"), false);
    assert.equal(fixture.outputs().includes("reused=true"), false);
    assert.deepEqual(
      fixture.trace().filter((entry) => entry.operation === "artifact-download"),
      []
    );
  });

  test(`${consumer.name} excludes a fork run before downloading its artifact`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      legacyDecoy: true,
      changeState(state) {
        state.runs[0].head_repository = { id: 4567, full_name: "external/fork" };
        state.artifacts[0].workflow_run.head_repository_id = 4567;
      },
    });
    const result = fixture.runBoundary();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fixture.serverExists(), false);
    assert.deepEqual(
      fixture.trace().filter((entry) => entry.operation === "artifact-download"),
      []
    );
  });

  test(`${consumer.name} fails closed when the artifact inventory API is unavailable`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        state.apiError = true;
      },
    });
    const result = fixture.runBoundary();
    assert.notEqual(result.status, 0, "API failure cannot become no-artifact fallback success");
    assert.equal(fixture.serverExists(), false);
    assert.equal(fixture.outputs().includes("reused=true"), false);
  });

  const negatives = [
    ["missing manifest", { missingManifest: true }],
    [
      "candidate SHA mismatch",
      {
        changeManifest(value) {
          value.source.candidateSha = "d".repeat(40);
        },
      },
    ],
    [
      "producer run mismatch",
      {
        changeManifest(value) {
          value.producer.runId = "772";
        },
      },
    ],
    [
      "producer attempt mismatch",
      {
        changeManifest(value) {
          value.producer.runAttempt = "1";
        },
      },
    ],
    [
      "archive digest mismatch",
      {
        changeManifest(value) {
          value.archive.sha256 = "d".repeat(64);
        },
      },
    ],
    [
      "artifact ZIP digest mismatch",
      {
        changeState(state) {
          state.artifacts[0].digest = `sha256:${"e".repeat(64)}`;
        },
      },
    ],
  ];
  for (const [reason, options] of negatives) {
    test(`${consumer.name} rejects ${reason} before materializing a standalone`, (t) => {
      // The qualified candidate is available to the fixed selector. A same-payload
      // legacy artifact lets the current real step demonstrate unchecked extraction
      // instead of all negative cases merely failing because of the renamed artifact.
      const fixture = releaseFixture(t, consumer, { ...options, legacyDecoy: true });
      const result = fixture.runBoundary();
      assert.equal(fixture.serverExists(), false, `${reason}: unverified tree was extracted`);
      assert.notEqual(
        result.status,
        0,
        `${reason}: invalid proof must stop, not select rebuild fallback`
      );
      assert.equal(fixture.outputs().includes("reused=true"), false);
    });
  }

  test(`${consumer.name} does not downgrade an evidence failure with continue-on-error`, () => {
    assert.notEqual(
      reuseStep(consumer)["continue-on-error"],
      true,
      "an invalid producer proof must block the packaging step after reuse fails"
    );
  });

  test(`${consumer.name} retains proof from the original attempt after a legitimate partial rerun`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        clonedAttempt(state);
      },
    });
    assertQualifiedReuse(fixture, fixture.runBoundary());
    const selectionPath = join(
      fixture.checkout,
      "_artifacts/next-build-external/proof/selection.json"
    );
    const bytes = readFileSync(selectionPath);
    const selection = JSON.parse(bytes);
    assert.equal(selection.producerAttempt, "2");
    assert.deepEqual(selection.attemptsChecked, [
      { attempt: "2", jobId: "881", relation: "producer" },
      { attempt: "3", jobId: "882", relation: "unchanged-clone" },
    ]);
    assert.equal(
      fixture.consumption().selectionSha256,
      createHash("sha256").update(bytes).digest("hex")
    );
  });

  for (const conclusion of ["failure", "cancelled"]) {
    test(`${consumer.name} refuses an older artifact after a newer Build ${conclusion}`, (t) => {
      const fixture = releaseFixture(t, consumer, {
        changeState(state) {
          clonedAttempt(state, conclusion);
        },
      });
      const result = fixture.runBoundary();
      assert.notEqual(result.status, 0);
      assert.equal(fixture.serverExists(), false);
      assert.deepEqual(
        fixture.trace().filter((entry) => entry.operation === "artifact-download"),
        []
      );
    });
  }

  test(`${consumer.name} rejects an artifact outside its successful upload window`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        state.artifacts[0].created_at = state.runs[0].run_started_at;
      },
    });
    const result = fixture.runBoundary();
    assert.notEqual(result.status, 0);
    assert.equal(fixture.serverExists(), false);
    assert.deepEqual(
      fixture.trace().filter((entry) => entry.operation === "artifact-download"),
      []
    );
  });

  test(`${consumer.name} refuses two artifacts claiming the same producer attempt`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        state.artifacts.push({ ...state.artifacts[0], id: 993 });
      },
    });
    const result = fixture.runBoundary();
    assert.notEqual(result.status, 0);
    assert.equal(fixture.serverExists(), false);
  });

  test(`${consumer.name} exhausts run, artifact and job pages before selecting`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        const [run] = state.runs;
        const [artifact] = state.artifacts;
        const [job] = state.jobs;
        state.runs = [
          ...Array.from({ length: 100 }, (_, index) => ({
            ...run,
            id: 1000 + index,
            head_repository: { id: 4567, full_name: "external/fork" },
          })),
          run,
        ];
        state.artifacts = [
          ...Array.from({ length: 100 }, (_, index) => ({
            ...artifact,
            id: 2000 + index,
            name: `unrelated-${index}`,
          })),
          artifact,
        ];
        state.jobs = [
          ...Array.from({ length: 100 }, (_, index) => ({
            ...job,
            id: 3000 + index,
            name: `Other job ${index}`,
          })),
          job,
        ];
      },
    });
    assertQualifiedReuse(fixture, fixture.runBoundary());
    const secondPages = fixture
      .trace()
      .filter((entry) => entry.operation === "api" && entry.endpoint.includes("page=2"));
    assert.equal(secondPages.length, 3, "all three inventories must fetch their second page");
  });

  test(`${consumer.name} rejects a truncated inventory instead of reporting absence`, (t) => {
    const fixture = releaseFixture(t, consumer, {
      changeState(state) {
        const [artifact] = state.artifacts;
        state.artifacts = Array.from({ length: 101 }, (_, index) => ({
          ...artifact,
          id: 2000 + index,
          name: `unrelated-${index}`,
        }));
        state.truncatedFields = ["artifacts"];
      },
    });
    const result = fixture.runBoundary();
    assert.notEqual(result.status, 0);
    assert.equal(fixture.outputs().includes("reused=false"), false);
    assert.equal(fixture.serverExists(), false);
  });

  for (const [reason, changeManifest] of [
    [
      "tree",
      (value) => {
        value.source.treeSha = "d".repeat(40);
      },
    ],
    [
      "lockfile",
      (value) => {
        value.source.lockfileSha256 = "d".repeat(64);
      },
    ],
    [
      "workflow",
      (value) => {
        value.workflow.fileSha256 = "d".repeat(64);
      },
    ],
  ]) {
    test(`${consumer.name} binds the producer ${reason} before extraction`, (t) => {
      const fixture = releaseFixture(t, consumer, { changeManifest });
      const result = fixture.runBoundary();
      assert.notEqual(result.status, 0);
      assert.equal(fixture.serverExists(), false);
    });
  }

  test(`${consumer.name} uploads the exact retained consumer evidence`, () => {
    const workflow = load(
      readFileSync(join(process.cwd(), ".github/workflows", consumer.file), "utf8")
    );
    const steps = workflow.jobs[consumer.job].steps;
    const upload = steps.find((step) => step.name === "Retain CI Next reuse evidence");
    assert.equal(upload?.with.path, "_artifacts/next-build-external/proof/*.json");
    assert.match(upload.with.name, /\$\{\{ github\.run_id \}\}-\$\{\{ github\.run_attempt \}\}/);
    assert.match(upload.if, /always\(\)/);
    assert.equal(
      steps.findIndex((step) => step.name === upload.name) >
        steps.findIndex((step) => /^Reuse CI's next-build artifact/.test(step.name || "")),
      true
    );
    if (consumer.name === "npm-publish") {
      const upgrade = steps.find((step) => step.run === "npm run check:install-upgrade");
      assert.equal(upgrade["timeout-minutes"], 120, "retain the newer release-base budget");
    }
  });
}
