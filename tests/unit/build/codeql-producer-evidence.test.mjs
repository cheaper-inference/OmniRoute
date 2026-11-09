import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import os from "node:os";
import { createHash } from "node:crypto";
import path from "node:path";
import {
  observeCodeqlCandidate,
  runCodeqlAdmission,
  selectCodeqlAnalyses,
} from "../../../scripts/quality/codeql-admission.mjs";
import { createProducerReceipt } from "../../../scripts/quality/codeql-producer.mjs";
import {
  selectProducerReceipts,
  selectCompletedUploadAnalyses,
  assertPrePushReadback,
  assertCodeqlTarget,
  readProducerReceipts,
} from "../../../scripts/quality/codeql-producer-evidence.mjs";

const pendingPolicy = JSON.parse(
  fs.readFileSync(new URL("../../../config/quality/codeql-admission-policy.json", import.meta.url))
);
function fixture() {
  const policy = structuredClone(pendingPolicy);
  policy.activationStatus = "READY_AFTER_ADMIN_READBACK";
  policy.reviewedSetup.updated_at = "2026-10-30T18:00:00Z";
  policy.reviewedSetup.observedAt = "2026-10-30T18:01:00Z";
  const context = {
    repository: "owner/repo",
    event: "pull_request",
    pr: 42,
    ref: "refs/pull/42/merge",
    sha: "a".repeat(40),
    head: "b".repeat(40),
    base: "c".repeat(40),
    headRepository: "contributor/fork",
  };
  const common = {
    context,
    runId: "100",
    runAttempt: "1",
    workflowSha: "a".repeat(40),
    policySha256: "d".repeat(64),
    policy,
    producerResult: "success",
  };
  const receipts = policy.languages.map((language, i) => ({
    schemaVersion: 1,
    context,
    runId: common.runId,
    runAttempt: "1",
    workflowRef: "owner/repo/.github/workflows/ci.yml@refs/pull/42/merge",
    workflowSha: common.workflowSha,
    policySha256: common.policySha256,
    language,
    category: `/language:${language}`,
    buildMode: "none",
    sarifId: `sarif-${i + 1}`,
  }));
  const uploads = Object.fromEntries(
    receipts.map((receipt) => [receipt.sarifId, { processing_status: "complete", errors: [] }])
  );
  const analysesByUpload = Object.fromEntries(
    receipts.map((receipt, i) => [
      receipt.sarifId,
      [
        {
          id: i + 1,
          sarif_id: receipt.sarifId,
          ref: context.ref,
          commit_sha: context.sha,
          category: receipt.category,
          analysis_key: policy.analysisKey,
          created_at: "2026-10-30T18:40:00Z",
          error: "",
          warning: "",
          rules_count: policy.minimumRules[receipt.language],
          results_count: 0,
          tool: { name: "CodeQL", version: "2.27.2" },
          environment: JSON.stringify({
            language: receipt.language,
            category: receipt.category,
            "build-mode": "none",
          }),
        },
      ],
    ])
  );
  return { ...common, receipts, uploads, analysesByUpload };
}
const evaluate = (data) =>
  selectCodeqlAnalyses(
    selectCompletedUploadAnalyses({ ...data, selectedReceipts: selectProducerReceipts(data) }),
    data.context,
    data.policy,
    data.policy.reviewedSetup
  );

test("four completed exact uploads are selected for a fork PR", () => {
  const data = fixture();
  assert.equal(evaluate(data).length, 4);
});

for (const result of ["failure", "cancelled", "skipped", "pending", "unknown", undefined]) {
  test(`producer ${result} cannot be replaced by previously green upload receipts`, () => {
    const data = fixture();
    data.producerResult = result;
    assert.throws(() => evaluate(data), /SCAN_PRODUCER_INCOMPLETE/);
  });
}

for (const status of ["pending", "failed", "unknown", undefined]) {
  test(`green action with upload status ${status} is not completed evidence`, () => {
    const data = fixture();
    data.uploads["sarif-3"].processing_status = status;
    assert.throws(() => evaluate(data), /SCAN_UPLOAD_NOT_COMPLETE/);
  });
}

test("missing/duplicated category, future attempt and substituted identity are rejected", () => {
  const cases = [
    [(d) => d.receipts.pop(), /SCAN_UPLOAD_RECEIPT_MISSING/],
    [(d) => d.receipts.push(structuredClone(d.receipts[0])), /SCAN_UPLOAD_RECEIPT_DUPLICATE/],
    [(d) => (d.receipts[0].runAttempt = "2"), /SCAN_UPLOAD_RECEIPT_ATTEMPT_INVALID/],
    [(d) => (d.receipts[0].policySha256 = "f".repeat(64)), /SCAN_UPLOAD_RECEIPT_IDENTITY_MISMATCH/],
    [
      (d) =>
        (d.receipts[0].workflowRef =
          "owner/repo/.github/workflows/codeql-maintenance.yml@refs/pull/42/merge"),
      /SCAN_UPLOAD_RECEIPT_IDENTITY_MISMATCH/,
    ],
    [(d) => (d.receipts[0].sarifId = d.receipts[1].sarifId), /SCAN_UPLOAD_ID_REUSED/],
    [
      (d) => (d.receipts[0].context = { ...d.context, base: "f".repeat(40) }),
      /SCAN_UPLOAD_RECEIPT_IDENTITY_MISMATCH/,
    ],
  ];
  for (const [mutate, error] of cases) {
    const data = fixture();
    mutate(data);
    assert.throws(() => evaluate(data), error);
  }
});

test("partial reruns preserve producer attempt identities without taking an unrelated latest scan", () => {
  const data = fixture();
  data.runAttempt = "2";
  assert.equal(evaluate(data).length, 4);
  const newer = { ...data.receipts[0], runAttempt: "2", sarifId: "sarif-new" };
  data.receipts.push(newer);
  assert.equal(
    selectProducerReceipts(data).find((entry) => entry.language === newer.language).sarifId,
    "sarif-new"
  );
  assert.throws(() => evaluate(data), /SCAN_UPLOAD_NOT_COMPLETE/);
});

test("zero unanalysed categories, wrong sarif id and wrong origin remain rejected", () => {
  const cases = [
    [(d) => (d.analysesByUpload["sarif-1"] = []), /SCAN_UPLOAD_ANALYSIS_MISSING_OR_AMBIGUOUS/],
    [
      (d) => d.analysesByUpload["sarif-1"].push(d.analysesByUpload["sarif-2"][0]),
      /SCAN_UPLOAD_ANALYSIS_MISSING_OR_AMBIGUOUS/,
    ],
    [
      (d) => (d.analysesByUpload["sarif-1"][0].sarif_id = "some-other-upload"),
      /SCAN_UPLOAD_ANALYSIS_IDENTITY_MISMATCH/,
    ],
    [
      (d) =>
        (d.analysesByUpload["sarif-1"][0].analysis_key = ".github/workflows/codeql.yml:analyze"),
      /SCAN_ANALYSIS_ORIGIN_CHANGED/,
    ],
    [(d) => (d.analysesByUpload["sarif-1"][0].commit_sha = "f".repeat(40)), /SCAN_MISSING/],
    [(d) => (d.uploads["sarif-1"].errors = ["processing error"]), /SCAN_UPLOAD_NOT_COMPLETE/],
  ];
  for (const [mutate, error] of cases) {
    const data = fixture();
    mutate(data);
    assert.throws(() => evaluate(data), error);
  }
});

test("Default Setup and mismatching administrative readbacks block the planned push", () => {
  const data = fixture();
  const expected = {
    repository: "owner/repo",
    baseSha: data.context.base,
    headSha: data.context.head,
    treeSha: "e".repeat(40),
    policySha256: data.policySha256,
    patchSha256: "f".repeat(64),
    rollbackSha256: "1".repeat(64),
    rulesSha256: "2".repeat(64),
  };
  const actual = {
    ...expected,
    defaultState: "not-configured",
    observedAt: data.policy.reviewedSetup.observedAt,
    setupUpdatedAt: data.policy.reviewedSetup.updated_at,
    checkedAt: new Date().toISOString(),
  };
  assert.doesNotThrow(() => assertPrePushReadback({ actual, expected, policy: data.policy }));
  assert.throws(
    () =>
      assertPrePushReadback({
        actual: { ...actual, defaultState: "configured" },
        expected,
        policy: data.policy,
      }),
    /SCAN_ADMIN_DEFAULT_STILL_ENABLED/
  );
  assert.throws(
    () =>
      assertPrePushReadback({
        actual,
        expected,
        policy: { ...pendingPolicy, activationStatus: "PENDING_DEFAULT_SETUP_TRANSITION" },
      }),
    /SCAN_ADMIN_POLICY_NOT_READY/
  );
  assert.throws(
    () =>
      assertPrePushReadback({
        actual: { ...actual, observedAt: "2026-10-30T17:00:00Z" },
        expected,
        policy: data.policy,
      }),
    /SCAN_ADMIN_READBACK_NOT_BOUND/
  );
  for (const field of Object.keys(expected))
    assert.throws(
      () =>
        assertPrePushReadback({
          actual: { ...actual, [field]: "moved" },
          expected,
          policy: data.policy,
        }),
      /SCAN_ADMIN_PIN_MOVED/
    );
  assert.throws(
    () =>
      assertPrePushReadback({
        actual: { ...actual, checkedAt: "2020-01-01T00:00:00Z" },
        expected,
        policy: data.policy,
      }),
    /SCAN_ADMIN_READBACK_STALE/
  );
  assert.throws(
    () =>
      assertPrePushReadback({
        actual: { ...actual, setupUpdatedAt: "2020-01-01T00:00:00Z" },
        expected,
        policy: data.policy,
      }),
    /SCAN_ADMIN_SETUP_MOVED/
  );
});

function apiFixture(data, override) {
  const calls = [];
  const current = {
    state: "open",
    merge_commit_sha: data.context.sha,
    head: { sha: data.context.head, repo: { full_name: data.context.headRepository } },
    base: { sha: data.context.base, repo: { full_name: data.context.repository } },
  };
  const sarifs = Object.fromEntries(
    Object.values(data.analysesByUpload)
      .flat()
      .map((analysis) => [
        analysis.id,
        {
          version: "2.1.0",
          runs: [
            {
              tool: { driver: { name: "CodeQL", semanticVersion: analysis.tool.version } },
              automationDetails: { id: `${analysis.category}/` },
              versionControlProvenance: [
                {
                  repositoryUri: `https://github.com/${data.context.repository}`,
                  branch: data.context.ref,
                  revisionId: data.context.sha,
                },
              ],
              results: [],
            },
          ],
        },
      ])
  );
  const readJson = (endpoint, accept) => {
    calls.push(endpoint);
    const replacement = override?.(endpoint, calls);
    if (replacement !== undefined) return replacement;
    if (endpoint.includes("/pulls/")) return structuredClone(current);
    if (endpoint.includes("/sarifs/")) return data.uploads[endpoint.split("/").at(-1)];
    if (endpoint.includes("/analyses?")) {
      const id = new URLSearchParams(endpoint.split("?")[1]).get("sarif_id");
      assert.ok(id, "candidate must select this producer's exact upload, not latest branch scan");
      return data.analysesByUpload[id];
    }
    if (/\/analyses\/\d+$/.test(endpoint)) {
      assert.equal(accept, "application/sarif+json");
      return sarifs[Number(endpoint.split("/").at(-1))];
    }
    if (endpoint.includes("/alerts?")) return [];
    throw new Error(`Unexpected API read ${endpoint}`);
  };
  return { readJson, calls, current };
}

test("observer admits only exact completed producer uploads and preserves all shared SARIF controls", () => {
  const data = fixture();
  const { readJson, calls } = apiFixture(data);
  const receipt = observeCodeqlCandidate({
    context: data.context,
    policy: data.policy,
    baseline: 6,
    producer: data,
    readJson,
  });
  assert.equal(receipt.verdict, "PASS");
  assert.equal(receipt.producer.uploads.length, 4);
  assert.equal(
    calls.filter((endpoint) => endpoint.includes("/sarifs/")).length,
    8,
    "revalidate processing after reading the alert evidence"
  );
  assert.equal(
    calls.some((endpoint) => endpoint.includes("default-setup")),
    false
  );
  assert.equal(
    calls.some((endpoint) => endpoint.includes("analyses?ref=")),
    false
  );
});

test("manual candidate observer rechecks the admitted target before and after scanner evidence", () => {
  for (const moveBase of [false, true]) {
    const data = fixture();
    data.context = {
      repository: "owner/repo",
      event: "workflow_dispatch",
      ref: "refs/heads/fix/recovery",
      sha: "a".repeat(40),
      targetBranch: data.policy.targetBranches[1],
      base: "c".repeat(40),
    };
    for (const receipt of data.receipts) {
      receipt.context = data.context;
      receipt.workflowRef = `owner/repo/.github/workflows/ci.yml@${data.context.ref}`;
    }
    for (const analysis of Object.values(data.analysesByUpload).flat()) {
      analysis.ref = data.context.ref;
    }
    const targetEndpoint = `/git/ref/heads/${data.context.targetBranch}`;
    const api = apiFixture(data, (endpoint, calls) => {
      if (endpoint.endsWith("/git/ref/heads/fix/recovery")) {
        return { ref: data.context.ref, object: { sha: data.context.sha } };
      }
      if (endpoint.endsWith(targetEndpoint)) {
        const moved = moveBase && calls.filter((item) => item.endsWith(targetEndpoint)).length > 1;
        return {
          ref: `refs/heads/${data.context.targetBranch}`,
          object: { sha: moved ? "f".repeat(40) : data.context.base },
        };
      }
    });
    const observe = () =>
      observeCodeqlCandidate({
        context: data.context,
        policy: data.policy,
        baseline: 6,
        producer: data,
        readJson: api.readJson,
      });
    if (moveBase) assert.throws(observe, /CONTEXT_DISPATCH_BASE_MOVED/);
    else assert.equal(observe().verdict, "PASS");
    assert.equal(api.calls.filter((item) => item.endsWith(targetEndpoint)).length, 2);
  }
});

test("observer rejects unavailable upload, incomplete analysis, changed branch and moved upload metadata", () => {
  for (const change of [
    (data) => (data.uploads["sarif-1"].processing_status = "pending"),
    (data) => (data.analysesByUpload["sarif-1"] = []),
    (data) =>
      (data.analysesByUpload["sarif-1"][0].analysis_key =
        ".github/workflows/codeql-maintenance.yml:analyze"),
    (data) => (data.analysesByUpload["sarif-1"][0].rules_count = 0),
  ]) {
    const data = fixture();
    change(data);
    const { readJson } = apiFixture(data);
    assert.throws(
      () =>
        observeCodeqlCandidate({
          context: data.context,
          policy: data.policy,
          baseline: 6,
          producer: data,
          readJson,
        }),
      /SCAN_/
    );
  }
  const data = fixture();
  const currentMoved = apiFixture(data, (endpoint, calls) =>
    endpoint.includes("/pulls/") && calls.filter((entry) => entry.includes("/pulls/")).length > 1
      ? { state: "closed" }
      : undefined
  );
  assert.throws(
    () =>
      observeCodeqlCandidate({
        context: data.context,
        policy: data.policy,
        baseline: 6,
        producer: data,
        readJson: currentMoved.readJson,
      }),
    /CONTEXT_PR_CLOSED/
  );
  const uploadMoved = apiFixture(data, (endpoint, calls) =>
    endpoint.endsWith("/sarifs/sarif-1") &&
    calls.filter((entry) => entry.endsWith("/sarifs/sarif-1")).length > 1
      ? { processing_status: "pending" }
      : undefined
  );
  assert.throws(
    () =>
      observeCodeqlCandidate({
        context: data.context,
        policy: data.policy,
        baseline: 6,
        producer: data,
        readJson: uploadMoved.readJson,
      }),
    /SCAN_UPLOAD_NOT_COMPLETE/
  );
});

test("producer creation binds fork, merge SHA, base, workflow, run and policy bytes", () => {
  const data = fixture();
  const env = {
    GITHUB_REPOSITORY: data.context.repository,
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_REF: data.context.ref,
    GITHUB_SHA: data.context.sha,
    GITHUB_RUN_ID: data.runId,
    GITHUB_RUN_ATTEMPT: data.runAttempt,
    CI_WORKFLOW_REF: data.receipts[0].workflowRef,
    CI_WORKFLOW_SHA: data.workflowSha,
    CODEQL_LANGUAGE: "actions",
    CODEQL_CATEGORY: "/language:actions",
    CODEQL_BUILD_MODE: "none",
    CODEQL_SARIF_ID: "sarif-1",
  };
  const event = {
    pull_request: {
      number: 42,
      head: { sha: data.context.head, repo: { full_name: data.context.headRepository } },
      base: { sha: data.context.base, ref: "main", repo: { full_name: data.context.repository } },
    },
  };
  assert.deepEqual(
    createProducerReceipt({ env, event, policy: data.policy, policySha256: data.policySha256 }),
    data.receipts[0]
  );
  for (const mutation of [
    { CODEQL_SARIF_ID: "" },
    { CODEQL_LANGUAGE: "ruby" },
    { CI_WORKFLOW_REF: "wrong" },
    { CODEQL_BUILD_MODE: "autobuild" },
  ]) {
    assert.throws(
      () =>
        createProducerReceipt({
          env: { ...env, ...mutation },
          event,
          policy: data.policy,
          policySha256: data.policySha256,
        }),
      /SCAN_/
    );
  }
  assert.throws(
    () =>
      assertCodeqlTarget(env, { pull_request: { base: { ref: "release/v3.8.52" } } }, data.policy),
    /SCAN_BRANCH_NOT_ONBOARDED/
  );
  assert.doesNotThrow(() =>
    assertCodeqlTarget(
      { GITHUB_EVENT_NAME: "merge_group" },
      { merge_group: { base_ref: "refs/heads/main" } },
      data.policy
    )
  );
});

test("receipt filesystem ingestion rejects links, extra files and excessive depth", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codeql-receipts-"));
  try {
    fs.writeFileSync(
      path.join(directory, "codeql-actions-1.json"),
      JSON.stringify(fixture().receipts[0])
    );
    assert.equal(readProducerReceipts(directory).length, 1);
    fs.writeFileSync(path.join(directory, "unrelated.json"), "{}");
    assert.throws(() => readProducerReceipts(directory), /SCAN_UPLOAD_RECEIPT_FILE_INVALID/);
    fs.unlinkSync(path.join(directory, "unrelated.json"));
    fs.symlinkSync(directory, path.join(directory, "link"), "junction");
    assert.throws(() => readProducerReceipts(directory), /SCAN_UPLOAD_RECEIPT_LINK/);
    fs.unlinkSync(path.join(directory, "link"));
    fs.mkdirSync(path.join(directory, "a/b/c"), { recursive: true });
    assert.throws(() => readProducerReceipts(directory), /SCAN_UPLOAD_RECEIPT_DIRECTORY_INVALID/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("candidate CLI uses producer files and refuses polling, cancelled producers and stale receipts", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codeql-candidate-cli-"));
  const cwd = process.cwd();
  try {
    const data = fixture();
    fs.mkdirSync(path.join(directory, "config/quality"), { recursive: true });
    const policyBytes = JSON.stringify(data.policy);
    const policyHash = createHash("sha256").update(policyBytes).digest("hex");
    fs.writeFileSync(
      path.join(directory, "config/quality/codeql-admission-policy.json"),
      policyBytes
    );
    fs.writeFileSync(
      path.join(directory, "config/quality/quality-baseline.json"),
      JSON.stringify({ metrics: { codeqlAlerts: { value: 6 } } })
    );
    const event = {
      pull_request: {
        number: 42,
        head: { sha: data.context.head, repo: { full_name: data.context.headRepository } },
        base: { sha: data.context.base, ref: "main", repo: { full_name: data.context.repository } },
      },
    };
    const eventPath = path.join(directory, "event.json");
    fs.writeFileSync(eventPath, JSON.stringify(event));
    const receiptsPath = path.join(directory, "receipts");
    fs.mkdirSync(receiptsPath);
    for (const receipt of data.receipts) {
      receipt.policySha256 = policyHash;
      fs.writeFileSync(
        path.join(receiptsPath, `codeql-${receipt.language}-1.json`),
        JSON.stringify(receipt)
      );
    }
    const reportPath = path.join(directory, "report.json");
    const env = {
      GITHUB_REPOSITORY: data.context.repository,
      GITHUB_EVENT_NAME: "pull_request",
      GITHUB_REF: data.context.ref,
      GITHUB_SHA: data.context.sha,
      GITHUB_RUN_ID: data.runId,
      GITHUB_RUN_ATTEMPT: data.runAttempt,
      GITHUB_WORKFLOW_SHA: data.workflowSha,
      GITHUB_EVENT_PATH: eventPath,
      CODEQL_PRODUCER_RESULT: "success",
      CODEQL_PRODUCER_RECEIPTS_PATH: receiptsPath,
      CODEQL_RECEIPT_PATH: reportPath,
    };
    process.chdir(directory);
    const { readJson } = apiFixture(data);
    assert.equal(await runCodeqlAdmission({ env, args: ["--candidate"], readJson }), 0);
    assert.equal(JSON.parse(fs.readFileSync(reportPath)).producer.uploads.length, 4);
    const neverRead = () => {
      throw new Error("API must not run for incomplete producer evidence");
    };
    assert.equal(
      await runCodeqlAdmission({
        env,
        args: ["--candidate", "--wait-seconds", "1"],
        readJson: neverRead,
      }),
      2
    );
    assert.equal(JSON.parse(fs.readFileSync(reportPath)).code, "SCAN_PRODUCER_POLLING_FORBIDDEN");
    assert.equal(
      await runCodeqlAdmission({
        env: { ...env, CODEQL_PRODUCER_RESULT: "cancelled" },
        args: ["--candidate"],
        readJson: neverRead,
      }),
      2
    );
    assert.equal(JSON.parse(fs.readFileSync(reportPath)).code, "SCAN_PRODUCER_INCOMPLETE");
    const first = data.receipts[0];
    first.policySha256 = "f".repeat(64);
    fs.writeFileSync(
      path.join(receiptsPath, `codeql-${first.language}-1.json`),
      JSON.stringify(first)
    );
    assert.equal(await runCodeqlAdmission({ env, args: ["--candidate"], readJson }), 2);
    assert.equal(
      JSON.parse(fs.readFileSync(reportPath)).code,
      "SCAN_UPLOAD_RECEIPT_IDENTITY_MISMATCH"
    );
  } finally {
    process.chdir(cwd);
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
