import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { parse } from "yaml";
import {
  assertCodeqlSetup,
  assertCurrentContext,
  evaluateCodeqlCandidate,
  observeCodeqlCandidate,
  readCodeqlPages,
  resolveCodeqlContext,
  selectCodeqlAnalyses,
} from "../../../scripts/quality/codeql-admission.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const policy = {
  schemaVersion: 1,
  setup: "default",
  analysisKey: "dynamic/github-code-scanning/codeql:analyze",
  querySuite: "default",
  threatModel: "remote",
  buildMode: "none",
  languages: ["actions", "c-cpp", "javascript-typescript", "python"],
  reviewedSetup: {
    state: "configured",
    query_suite: "default",
    threat_model: "remote",
    languages: ["actions", "c-cpp", "javascript-typescript", "python"],
    updated_at: "2026-10-21T23:53:17Z",
    observedAt: "2026-10-30T17:43:10.440923+00:00",
  },
  minimumRules: {
    actions: 17,
    "c-cpp": 58,
    "javascript-typescript": 87,
    python: 43,
  },
};
const context = {
  repository: "cheaper-inference/OmniRoute",
  sha: "a".repeat(40),
  ref: "refs/pull/18345/merge",
  event: "pull_request",
  pr: 18345,
  head: "b".repeat(40),
  base: "c".repeat(40),
};
const setup = {
  state: "configured",
  query_suite: "default",
  threat_model: "remote",
  languages: ["actions", "c-cpp", "javascript", "javascript-typescript", "python", "typescript"],
  updated_at: "2026-10-21T00:00:00Z",
};
const current = {
  state: "open",
  head: { sha: context.head, repo: { full_name: context.repository } },
  base: { sha: context.base, repo: { full_name: context.repository } },
  merge_commit_sha: context.sha,
};

function fixture(count = 0) {
  const analyses = policy.languages.map((language, index) => ({
    id: index + 1,
    ref: context.ref,
    commit_sha: context.sha,
    category: `/language:${language}`,
    analysis_key: policy.analysisKey,
    created_at: "2026-10-30T17:00:00Z",
    error: "",
    warning: "",
    rules_count: policy.minimumRules[language],
    results_count: language === "javascript-typescript" ? count : 0,
    tool: { name: "CodeQL", version: "2.27.3" },
    environment: JSON.stringify({
      language,
      category: `/language:${language}`,
      "build-mode": "none",
    }),
  }));
  const sarifs = Object.fromEntries(
    analyses.map((analysis) => [
      analysis.id,
      {
        version: "2.1.0",
        runs: [
          {
            tool: { driver: { name: "CodeQL", semanticVersion: "2.27.3" } },
            automationDetails: { id: `${analysis.category}/` },
            versionControlProvenance: [
              {
                repositoryUri: `https://github.com/${context.repository}`,
                branch: context.ref,
                revisionId: context.sha,
              },
            ],
            results: Array.from({ length: analysis.results_count }, (_, i) => ({
              properties: { "github/alertNumber": i + 100 },
            })),
          },
        ],
      },
    ])
  );
  const alerts = Array.from({ length: count }, (_, i) => ({
    number: i + 100,
    tool: { name: "CodeQL" },
    state: "open",
    dismissed_at: null,
    most_recent_instance: {
      ref: context.ref,
      commit_sha: context.sha,
      category: "/language:javascript-typescript",
      analysis_key: policy.analysisKey,
      state: "open",
    },
  }));
  return {
    context: structuredClone(context),
    setup: structuredClone(setup),
    policy: structuredClone(policy),
    baseline: 6,
    analyses,
    sarifs,
    alerts,
  };
}

test("zero alerts require all four exact analyses; an unscanned PR cannot pass", () => {
  const data = fixture();
  assert.equal(evaluateCodeqlCandidate(data).verdict, "PASS");
  data.analyses = [];
  assert.throws(() => evaluateCodeqlCandidate(data), /SCAN_MISSING/);
});

test("the frozen baseline stays6, while eight measured candidate alerts fail", () => {
  assert.equal(evaluateCodeqlCandidate(fixture(6)).verdict, "PASS");
  const result = evaluateCodeqlCandidate(fixture(8));
  assert.equal(result.verdict, "FAIL");
  assert.equal(result.count, 8);
  assert.equal(result.baseline, 6);
});

for (const [name, mutate, error] of [
  [
    "other branch inventory",
    (d) => {
      d.alerts[0].most_recent_instance.ref = "refs/heads/release/v3.8.53";
    },
    /SCAN_ALERT_IDENTITY_MISMATCH/,
  ],
  [
    "stale alert commit",
    (d) => {
      d.alerts[0].most_recent_instance.commit_sha = "d".repeat(40);
    },
    /SCAN_ALERT_IDENTITY_MISMATCH/,
  ],
  [
    "missing language",
    (d) => {
      d.analyses.pop();
    },
    /SCAN_MISSING/,
  ],
  [
    "old analysis commit",
    (d) => {
      d.analyses[0].commit_sha = "d".repeat(40);
    },
    /SCAN_MISSING/,
  ],
  [
    "wrong analysis ref",
    (d) => {
      d.analyses[0].ref = "refs/heads/main";
    },
    /SCAN_MISSING/,
  ],
  [
    "analysis predates setup",
    (d) => {
      d.analyses[0].created_at = "2026-10-20T00:00:00Z";
    },
    /SCAN_PROFILE_STALE/,
  ],
  [
    "analysis error",
    (d) => {
      d.analyses[0].error = "failed";
    },
    /SCAN_ANALYSIS_FAILED/,
  ],
  [
    "extraction warning",
    (d) => {
      d.analyses[0].warning = "No source code was seen";
    },
    /SCAN_ANALYSIS_WARNING/,
  ],
  [
    "no rules",
    (d) => {
      d.analyses[0].rules_count = 0;
    },
    /SCAN_RULES_MISSING/,
  ],
  [
    "different scanner origin",
    (d) => {
      d.analyses[0].analysis_key = "other";
    },
    /SCAN_ANALYSIS_ORIGIN_CHANGED/,
  ],
  [
    "wrong environment",
    (d) => {
      d.analyses[0].environment = "{}";
    },
    /SCAN_ENVIRONMENT_CHANGED/,
  ],
  [
    "missing baseline",
    (d) => {
      d.baseline = null;
    },
    /SCAN_BASELINE_MISSING/,
  ],
  [
    "wrong SARIF commit",
    (d) => {
      d.sarifs[1].runs[0].versionControlProvenance[0].revisionId = "d".repeat(40);
    },
    /SCAN_SARIF_IDENTITY_MISMATCH/,
  ],
  [
    "wrong SARIF repository",
    (d) => {
      d.sarifs[1].runs[0].versionControlProvenance[0].repositoryUri =
        "https://github.com/other/repo";
    },
    /SCAN_SARIF_IDENTITY_MISMATCH/,
  ],
  [
    "wrong SARIF category",
    (d) => {
      d.sarifs[1].runs[0].automationDetails.id = "/language:python/";
    },
    /SCAN_SARIF_CATEGORY_MISMATCH/,
  ],
  [
    "wrong SARIF tool version",
    (d) => {
      d.sarifs[1].runs[0].tool.driver.semanticVersion = "old";
    },
    /SCAN_SARIF_TOOL_MISMATCH/,
  ],
  [
    "truncated SARIF",
    (d) => {
      d.sarifs[3].runs[0].results = [];
    },
    /SCAN_SARIF_RESULTS_INCOMPLETE/,
  ],
  [
    "alert absent from selected analysis",
    (d) => {
      d.alerts[0].number = 999;
    },
    /SCAN_ALERT_ANALYSIS_MISMATCH/,
  ],
  [
    "duplicate alert page record",
    (d) => {
      d.alerts.push(structuredClone(d.alerts[0]));
    },
    /SCAN_DUPLICATE_ALERT/,
  ],
  [
    "dismissed alert in open-only response",
    (d) => {
      d.alerts[0].state = "dismissed";
    },
    /SCAN_ALERT_FILTER_MISMATCH/,
  ],
  [
    "wrong setup suite",
    (d) => {
      d.setup.query_suite = "security-extended";
    },
    /SCAN_SETUP_CHANGED/,
  ],
  [
    "configured language removed",
    (d) => {
      d.setup.languages = ["javascript-typescript"];
    },
    /SCAN_LANGUAGE_COVERAGE_CHANGED/,
  ],
]) {
  test(`rejects ${name}`, () => {
    const data = fixture(1);
    mutate(data);
    assert.throws(() => evaluateCodeqlCandidate(data), error);
  });
}

test("new failed analysis of the same commit cannot reuse an earlier success", () => {
  const data = fixture();
  data.analyses.push({
    ...data.analyses[0],
    id: 50,
    created_at: "2026-10-30T18:00:00Z",
    error: "failed",
  });
  assert.throws(() => evaluateCodeqlCandidate(data), /SCAN_ANALYSIS_FAILED/);
});

test("known presentation warning preserves its value in the receipt", () => {
  const data = fixture();
  data.analyses[0].warning = "403 relatedLocations were ignored";
  assert.equal(evaluateCodeqlCandidate(data).analyses[0].warning, data.analyses[0].warning);
});

test("a branch-global summary cannot hide a valid exact-PR instance", () => {
  const data = fixture(1);
  const currentInstance = structuredClone(data.alerts[0].most_recent_instance);
  data.alerts[0].most_recent_instance.ref = "refs/heads/release/v3.8.53";
  data.alerts[0].most_recent_instance.commit_sha = "d".repeat(40);
  data.alerts[0].state = "fixed";
  data.instancesByAlert = { 100: [currentInstance] };
  assert.equal(evaluateCodeqlCandidate(data).count, 1);
  data.instancesByAlert[100][0].commit_sha = "d".repeat(40);
  assert.throws(() => evaluateCodeqlCandidate(data), /SCAN_ALERT_IDENTITY_MISMATCH/);
});

test("positive but reduced rule coverage cannot pass the reviewed policy", () => {
  const data = fixture();
  data.analyses[0].rules_count = policy.minimumRules.actions - 1;
  assert.throws(() => evaluateCodeqlCandidate(data), /SCAN_RULES_MISSING/);
});

test("the observer reads instances and never requests administrative API access", () => {
  const data = fixture(1);
  const currentInstance = structuredClone(data.alerts[0].most_recent_instance);
  data.alerts[0].most_recent_instance.ref = "refs/heads/release/v3.8.53";
  const calls = [];
  const readJson = apiFixture(data, (endpoint) => {
    calls.push(endpoint);
    if (endpoint.includes("/instances?")) return [currentInstance];
    return undefined;
  });
  assert.equal(observeCodeqlCandidate({ context, policy, baseline: 6, readJson }).count, 1);
  assert.ok(
    calls.some((entry) => entry.includes("/alerts/100/instances?ref=refs%2Fpull%2F18345%2Fmerge"))
  );
  assert.equal(
    calls.some((entry) => entry.endsWith("/default-setup")),
    false
  );
});

test("legacy JavaScript/TypeScript setup aliases normalize to the same coverage set", () => {
  assert.doesNotThrow(() => assertCodeqlSetup(setup, policy));
  assert.equal(selectCodeqlAnalyses(fixture().analyses, context, policy, setup).length, 4);
});

test("pagination reads the second page and rejects malformed or incomplete responses", () => {
  const calls = [];
  const records = readCodeqlPages((endpoint) => {
    calls.push(endpoint);
    return calls.length === 1 ? Array(100).fill({}) : [{ id: 101 }];
  }, "/analyses?ref=known");
  assert.equal(records.length, 101);
  assert.match(calls[1], /page=2$/);
  assert.throws(() => readCodeqlPages(() => ({}), "/analyses?ref=known"), /SCAN_API_ARRAY_INVALID/);
  assert.throws(
    () => readCodeqlPages(() => Array(100).fill({}), "/analyses?ref=known", { maxPages: 1 }),
    /SCAN_PAGINATION_INCOMPLETE/
  );
  assert.throws(
    () =>
      readCodeqlPages(() => {
        throw new Error("HTTP503");
      }, "/analyses?ref=known"),
    /HTTP503/
  );
});

test("event context binds the merge ref, base and head; forks cannot claim default coverage", () => {
  const pr = { number: 18345, head: current.head, base: current.base };
  const env = {
    GITHUB_REPOSITORY: context.repository,
    GITHUB_SHA: context.sha,
    GITHUB_REF: context.ref,
    GITHUB_EVENT_NAME: "pull_request",
  };
  assert.deepEqual(resolveCodeqlContext(env, { pull_request: pr }), context);
  assert.throws(
    () => resolveCodeqlContext({ ...env, GITHUB_REF: "refs/heads/main" }, { pull_request: pr }),
    /CONTEXT_PR_REF_INVALID/
  );
  assert.throws(
    () =>
      resolveCodeqlContext(env, {
        pull_request: { ...pr, head: { ...current.head, repo: { full_name: "fork/repo" } } },
      }),
    /SCAN_FORK_UNSUPPORTED/
  );
  assert.throws(
    () => assertCurrentContext(context, { ...current, base: { sha: "d".repeat(40) } }),
    /CONTEXT_PR_MOVED/
  );
  assert.throws(
    () => assertCurrentContext(context, { ...current, merge_commit_sha: "d".repeat(40) }),
    /CONTEXT_MERGE_MOVED/
  );
});

function apiFixture(data, override) {
  return (endpoint, accept) => {
    const custom = override?.(endpoint, accept);
    if (custom !== undefined) return custom;
    if (endpoint.includes("/pulls/")) return structuredClone(current);
    if (endpoint.endsWith("/default-setup"))
      throw new Error("Administrative endpoint must not be called with PR token");
    if (endpoint.includes("/instances?")) {
      const number = Number(/alerts\/(\d+)\/instances/.exec(endpoint)[1]);
      return [data.alerts.find((entry) => entry.number === number).most_recent_instance];
    }
    if (endpoint.includes("/analyses?")) return data.analyses;
    if (endpoint.includes("/alerts?")) return data.alerts;
    if (endpoint.match(/\/analyses\/\d+$/)) {
      assert.equal(accept, "application/sarif+json");
      return data.sarifs[Number(endpoint.split("/").pop())];
    }
    throw new Error(`unexpected endpoint ${endpoint}`);
  };
}

test("observer uses explicit ref and revalidates mutable PR and scanner identity", () => {
  const data = fixture();
  const calls = [];
  const readJson = apiFixture(data, (endpoint) => {
    calls.push(endpoint);
  });
  assert.equal(observeCodeqlCandidate({ context, policy, baseline: 6, readJson }).verdict, "PASS");
  for (const endpoint of calls.filter(
    (entry) => entry.includes("/analyses?") || entry.includes("/alerts?")
  ))
    assert.match(endpoint, /ref=refs%2Fpull%2F18345%2Fmerge/);
  let reads = 0;
  const moved = apiFixture(data, (endpoint) =>
    endpoint.includes("/pulls/") && ++reads === 2
      ? { ...current, merge_commit_sha: "d".repeat(40) }
      : undefined
  );
  assert.throws(
    () => observeCodeqlCandidate({ context, policy, baseline: 6, readJson: moved }),
    /CONTEXT_MERGE_MOVED/
  );
});

test("candidate CLI has one ordered CI authority and preserves global inventory in nightly", () => {
  for (const file of ["ci.yml", "quality.yml"]) {
    const workflow = parse(fs.readFileSync(path.join(root, ".github/workflows", file), "utf8"));
    const steps = Object.values(workflow.jobs).flatMap((job) => job.steps ?? []);
    const checks = steps.filter((step) => step.run?.includes("check-codeql-ratchet.mjs"));
    assert.equal(checks.length, file === "ci.yml" ? 1 : 0);
    if (file === "ci.yml") {
      assert.match(checks[0].run, /--candidate$/);
      assert.doesNotMatch(checks[0].run, /--wait-seconds/);
      assert.notEqual(checks[0]["continue-on-error"], true);
      assert.deepEqual(workflow.jobs["codeql-admission"].needs, ["changes", "codeql-scan"]);
    }
  }
  const nightly = parse(
    fs.readFileSync(path.join(root, ".github/workflows/nightly-codeql-inventory.yml"), "utf8")
  );
  assert.ok(nightly.on.schedule.length > 0);
  assert.ok(
    nightly.jobs.inventory.steps.some((step) => step.run?.includes("--strict-measurement"))
  );
  assert.equal(nightly.on.pull_request, undefined);
});

test("global strict measurement fails when gh is unavailable, with no false zero metric", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codeql-no-gh-"));
  try {
    const command = path.join(root, "scripts/check/check-codeql-ratchet.mjs");
    const result = spawnSync(process.execPath, [command, "--strict-measurement", "--quiet"], {
      env: { ...process.env, PATH: directory },
      cwd: root,
      encoding: "utf8",
    });
    assert.equal(result.status, 2);
    assert.match(result.stdout, /codeqlAlerts=SKIP reason=binary-absent/);
    assert.doesNotMatch(result.stdout, /codeqlAlerts=0/);
    assert.doesNotThrow(() =>
      execFileSync(process.execPath, [command, "--quiet"], {
        env: { ...process.env, PATH: directory },
        cwd: root,
        stdio: "pipe",
      })
    );
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
