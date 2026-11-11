import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const SHA = /^[a-f0-9]{40}$/;
const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

import { CodeqlEvidenceError } from "./codeql-evidence-error.mjs";
import {
  assertCodeqlTarget,
  resolveCodeqlDispatchTarget,
  readProducerReceipts,
  selectProducerReceipts,
  selectCompletedUploadAnalyses,
} from "./codeql-producer-evidence.mjs";
export { CodeqlEvidenceError } from "./codeql-evidence-error.mjs";

function requireEvidence(condition, code) {
  if (!condition) throw new CodeqlEvidenceError(code);
}

export function resolveCodeqlContext(env, event, { allowForks = false } = {}) {
  const { GITHUB_REPOSITORY: repository, GITHUB_SHA: sha, GITHUB_REF: ref } = env;
  requireEvidence(REPOSITORY.test(repository ?? ""), "CONTEXT_REPOSITORY_INVALID");
  requireEvidence(SHA.test(sha ?? ""), "CONTEXT_SHA_INVALID");
  requireEvidence(typeof ref === "string" && ref.startsWith("refs/"), "CONTEXT_REF_INVALID");
  const context = { repository, sha, ref, event: env.GITHUB_EVENT_NAME };
  if (context.event === "pull_request") {
    const pr = event?.pull_request;
    requireEvidence(Number.isSafeInteger(pr?.number) && pr.number > 0, "CONTEXT_PR_INVALID");
    requireEvidence(ref === `refs/pull/${pr.number}/merge`, "CONTEXT_PR_REF_INVALID");
    requireEvidence(pr.base?.repo?.full_name === repository, "CONTEXT_BASE_REPOSITORY_INVALID");
    requireEvidence(
      SHA.test(pr.head?.sha ?? "") && SHA.test(pr.base?.sha ?? ""),
      "CONTEXT_PR_SHA_INVALID"
    );
    const headRepository = pr.head?.repo?.full_name;
    requireEvidence(REPOSITORY.test(headRepository ?? ""), "CONTEXT_HEAD_REPOSITORY_INVALID");
    requireEvidence(headRepository === repository || allowForks, "SCAN_FORK_UNSUPPORTED");
    return {
      ...context,
      pr: pr.number,
      head: pr.head.sha,
      base: pr.base.sha,
      ...(headRepository === repository ? {} : { headRepository }),
    };
  }
  requireEvidence(
    ["push", "workflow_dispatch", "merge_group"].includes(context.event),
    "CONTEXT_EVENT_UNSUPPORTED"
  );
  if (context.event === "merge_group") {
    requireEvidence(event.merge_group?.head_sha === sha, "CONTEXT_MERGE_GROUP_INVALID");
    return { ...context, base: event.merge_group.base_sha };
  }
  requireEvidence(ref.startsWith("refs/heads/"), "CONTEXT_BRANCH_INVALID");
  if (context.event === "push") requireEvidence(event.after === sha, "CONTEXT_PUSH_SHA_INVALID");
  return { ...context, ...resolveCodeqlDispatchTarget(env, event) };
}

export function assertCurrentContext(context, current) {
  if (context.pr) {
    requireEvidence(current?.state === "open", "CONTEXT_PR_CLOSED");
    requireEvidence(
      current?.head?.sha === context.head && current?.base?.sha === context.base,
      "CONTEXT_PR_MOVED"
    );
    requireEvidence(current?.merge_commit_sha === context.sha, "CONTEXT_MERGE_MOVED");
    requireEvidence(
      current?.head?.repo?.full_name === (context.headRepository ?? context.repository) &&
        current?.base?.repo?.full_name === context.repository,
      "CONTEXT_REPOSITORY_MOVED"
    );
  } else {
    requireEvidence(current?.object?.sha === context.sha, "CONTEXT_REF_MOVED");
    if (context.targetBranch) {
      requireEvidence(
        current?.targetBase?.ref === `refs/heads/${context.targetBranch}` &&
          current.targetBase.object?.sha === context.base,
        "CONTEXT_DISPATCH_BASE_MOVED"
      );
    }
  }
}

function normalizedLanguages(languages) {
  requireEvidence(Array.isArray(languages) && languages.length > 0, "SCAN_LANGUAGES_MISSING");
  return [
    ...new Set(
      languages.map((language) =>
        ["javascript", "typescript"].includes(language) ? "javascript-typescript" : language
      )
    ),
  ].sort();
}

export function assertCodeqlSetup(setup, policy) {
  requireEvidence(
    policy?.schemaVersion === 1 && ["default", "advanced"].includes(policy.setup),
    "SCAN_POLICY_INVALID"
  );
  if (policy.setup === "advanced") {
    requireEvidence(
      policy.activationStatus === "READY_AFTER_ADMIN_READBACK",
      "SCAN_SETUP_TRANSITION_PENDING"
    );
    requireEvidence(policy.producerReceiptsRequired === true, "SCAN_PRODUCER_POLICY_INVALID");
  }
  requireEvidence(
    setup?.state === (policy.setup === "default" ? "configured" : "not-configured"),
    "SCAN_SETUP_UNAVAILABLE"
  );
  requireEvidence(
    setup.query_suite === policy.querySuite && setup.threat_model === policy.threatModel,
    "SCAN_SETUP_CHANGED"
  );
  requireEvidence(
    JSON.stringify(normalizedLanguages(setup.languages)) ===
      JSON.stringify(normalizedLanguages(policy.languages)),
    "SCAN_LANGUAGE_COVERAGE_CHANGED"
  );
  // GitHub clears updated_at when Default Setup is disabled. Advanced admission
  // must bind to the actual administrative observation, never invent that date.
  const clearedTimestamp = policy.setup === "advanced" && setup.updated_at === null;
  requireEvidence(
    clearedTimestamp || Number.isFinite(Date.parse(setup.updated_at)),
    "SCAN_SETUP_DATE_INVALID"
  );
  if (policy.setup === "advanced") {
    requireEvidence(
      Number.isFinite(Date.parse(setup.observedAt)) &&
        (clearedTimestamp || Date.parse(setup.observedAt) >= Date.parse(setup.updated_at)),
      "SCAN_SETUP_READBACK_INVALID"
    );
  }
}

export function selectCodeqlAnalyses(analyses, context, policy, setup) {
  requireEvidence(Array.isArray(analyses), "SCAN_ANALYSES_INVALID");
  assertCodeqlSetup(setup, policy);
  const selected = [];
  for (const language of normalizedLanguages(policy.languages)) {
    const category = `/language:${language}`;
    const matching = analyses.filter(
      (entry) =>
        entry?.ref === context.ref &&
        entry.commit_sha === context.sha &&
        entry.category === category &&
        entry.tool?.name === "CodeQL"
    );
    matching.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at) || b.id - a.id);
    const analysis = matching[0];
    requireEvidence(analysis, `SCAN_MISSING:${language}`);
    requireEvidence(
      Number.isSafeInteger(analysis.id) && analysis.id > 0,
      "SCAN_ANALYSIS_ID_INVALID"
    );
    requireEvidence(analysis.analysis_key === policy.analysisKey, "SCAN_ANALYSIS_ORIGIN_CHANGED");
    requireEvidence(
      Number.isFinite(Date.parse(analysis.created_at)) &&
        Date.parse(analysis.created_at) >=
          Date.parse(policy.setup === "advanced" ? setup.observedAt : setup.updated_at),
      "SCAN_PROFILE_STALE"
    );
    requireEvidence(analysis.error === "", "SCAN_ANALYSIS_FAILED");
    requireEvidence(
      !analysis.warning || /^\d+ relatedLocations were ignored$/.test(analysis.warning),
      "SCAN_ANALYSIS_WARNING"
    );
    requireEvidence(
      Number.isSafeInteger(analysis.rules_count) &&
        analysis.rules_count >= policy.minimumRules?.[language] &&
        policy.minimumRules[language] > 0,
      "SCAN_RULES_MISSING"
    );
    requireEvidence(
      Number.isSafeInteger(analysis.results_count) && analysis.results_count >= 0,
      "SCAN_RESULTS_INVALID"
    );
    requireEvidence(
      typeof analysis.tool.version === "string" && analysis.tool.version.length > 0,
      "SCAN_TOOL_VERSION_MISSING"
    );
    let environment;
    try {
      environment = JSON.parse(analysis.environment);
    } catch {
      throw new CodeqlEvidenceError("SCAN_ENVIRONMENT_INVALID");
    }
    requireEvidence(
      environment.language === language &&
        environment.category === category &&
        environment["build-mode"] === policy.buildMode,
      "SCAN_ENVIRONMENT_CHANGED"
    );
    selected.push(analysis);
  }
  return selected;
}

export function verifyCodeqlSarif(sarif, analysis, context) {
  requireEvidence(
    sarif?.version === "2.1.0" && Array.isArray(sarif.runs) && sarif.runs.length === 1,
    "SCAN_SARIF_INVALID"
  );
  const run = sarif.runs[0];
  requireEvidence(
    run.tool?.driver?.name === "CodeQL" &&
      run.tool.driver.semanticVersion === analysis.tool.version,
    "SCAN_SARIF_TOOL_MISMATCH"
  );
  requireEvidence(
    run.automationDetails?.id === `${analysis.category}/`,
    "SCAN_SARIF_CATEGORY_MISMATCH"
  );
  requireEvidence(
    run.versionControlProvenance?.some(
      (entry) =>
        entry.repositoryUri === `https://github.com/${context.repository}` &&
        entry.branch === context.ref &&
        entry.revisionId === context.sha
    ),
    "SCAN_SARIF_IDENTITY_MISMATCH"
  );
  requireEvidence(
    Array.isArray(run.results) && run.results.length === analysis.results_count,
    "SCAN_SARIF_RESULTS_INCOMPLETE"
  );
  const numbers = new Set();
  for (const result of run.results) {
    const number = result.properties?.["github/alertNumber"];
    requireEvidence(Number.isSafeInteger(number) && number > 0, "SCAN_SARIF_ALERT_ID_MISSING");
    numbers.add(number);
  }
  return numbers;
}

export function evaluateCodeqlCandidate({
  context,
  policy,
  setup,
  analyses,
  sarifs,
  alerts,
  instancesByAlert = {},
  baseline,
}) {
  requireEvidence(Number.isSafeInteger(baseline) && baseline >= 0, "SCAN_BASELINE_MISSING");
  requireEvidence(Array.isArray(alerts), "SCAN_ALERTS_INVALID");
  const selected = selectCodeqlAnalyses(analyses, context, policy, setup);
  const evidence = new Map(
    selected.map((analysis) => [
      analysis.category,
      { analysis, numbers: verifyCodeqlSarif(sarifs[analysis.id], analysis, context) },
    ])
  );
  const open = new Set();
  for (const alert of alerts) {
    requireEvidence(
      alert?.tool?.name === "CodeQL" && alert.state !== "dismissed" && !alert.dismissed_at,
      "SCAN_ALERT_FILTER_MISMATCH"
    );
    const instances = [alert.most_recent_instance, ...(instancesByAlert[alert.number] ?? [])];
    const matching = instances.filter(
      (entry) =>
        entry?.ref === context.ref && entry.commit_sha === context.sha && entry.state === "open"
    );
    requireEvidence(matching.length > 0, "SCAN_ALERT_IDENTITY_MISMATCH");
    requireEvidence(
      matching.some((instance) => {
        const category = evidence.get(instance.category);
        return (
          category &&
          instance.analysis_key === category.analysis.analysis_key &&
          category.numbers.has(alert.number)
        );
      }),
      "SCAN_ALERT_ANALYSIS_MISMATCH"
    );
    requireEvidence(!open.has(alert.number), "SCAN_DUPLICATE_ALERT");
    open.add(alert.number);
  }
  const count = open.size;
  return {
    schemaVersion: 1,
    profile: "candidate",
    verdict: count > baseline ? "FAIL" : "PASS",
    code: count > baseline ? "CANDIDATE_BASELINE_EXCEEDED" : "CANDIDATE_MEASURED",
    context,
    baseline,
    count,
    alertNumbers: [...open].sort((a, b) => a - b),
    analyses: selected.map((entry) => ({
      id: entry.id,
      category: entry.category,
      createdAt: entry.created_at,
      toolVersion: entry.tool.version,
      rulesCount: entry.rules_count,
      resultsCount: entry.results_count,
      warning: entry.warning,
    })),
    coverage:
      "All policy language categories on the exact commit; API/SARIF metadata does not prove extraction of every source file.",
    attribution:
      "Candidate measurement only; contributor causality requires equivalent exact-base evidence.",
  };
}

export function readCodeqlPages(readJson, endpoint, { stopWhen, maxPages = 20 } = {}) {
  const records = [];
  for (let page = 1; page <= maxPages; page++) {
    const data = readJson(`${endpoint}&per_page=100&page=${page}`);
    requireEvidence(Array.isArray(data), "SCAN_API_ARRAY_INVALID");
    records.push(...data);
    if (data.length < 100 || stopWhen?.(records)) return records;
  }
  throw new CodeqlEvidenceError("SCAN_PAGINATION_INCOMPLETE");
}

function readGithubJson(endpoint, accept) {
  const args = ["api", endpoint];
  if (accept) args.push("-H", `Accept: ${accept}`);
  try {
    const output = execFileSync("gh", args, {
      encoding: "utf8",
      timeout: 30_000,
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return JSON.parse(output);
  } catch (error) {
    // Never print gh stderr, response bodies, credentials, or SARIF source snippets.
    const status = /HTTP (\d{3})/.exec(String(error.stderr ?? ""))?.[1];
    throw new CodeqlEvidenceError(status ? `SCAN_API_HTTP_${status}` : "SCAN_API_UNAVAILABLE");
  }
}

function currentIdentity(readJson, context) {
  const endpoint = context.pr ? `pulls/${context.pr}` : `git/ref/${context.ref.slice(5)}`;
  const current = readJson(`/repos/${context.repository}/${endpoint}`);
  if (!context.targetBranch) return current;
  return {
    ...current,
    targetBase: readJson(`/repos/${context.repository}/git/ref/heads/${context.targetBranch}`),
  };
}

export function observeCodeqlCandidate({
  context,
  policy,
  baseline,
  producer,
  readJson = readGithubJson,
}) {
  assertCurrentContext(context, currentIdentity(readJson, context));
  const prefix = `/repos/${context.repository}/code-scanning`;
  // The default-setup endpoint requires Administration:read, which GITHUB_TOKEN
  // does not expose. Admission uses the reviewed versioned snapshot and current
  // analysis/SARIF evidence. Administrative pre/post readback stays a rollout gate.
  const setup = policy.reviewedSetup;
  assertCodeqlSetup(setup, policy);
  const query = new URLSearchParams({
    ref: context.ref,
    tool_name: "CodeQL",
    direction: "desc",
    sort: "created",
  });
  const endpoint = `${prefix}/analyses?${query}`;
  const completeCategories = (entries) =>
    normalizedLanguages(policy.languages).every((language) =>
      entries.some(
        (entry) =>
          entry.ref === context.ref &&
          entry.commit_sha === context.sha &&
          entry.category === `/language:${language}` &&
          entry.tool?.name === "CodeQL"
      )
    );
  const stopSearch = (entries) =>
    completeCategories(entries) ||
    Date.parse(entries.at(-1)?.created_at) <
      Date.parse(policy.setup === "advanced" ? setup.observedAt : setup.updated_at);
  let selectedReceipts;
  if (policy.producerReceiptsRequired) {
    requireEvidence(producer, "SCAN_UPLOAD_RECEIPTS_MISSING");
    selectedReceipts = selectProducerReceipts({ ...producer, context, policy });
  }
  const collectAnalyses = () => {
    if (!selectedReceipts) return readCodeqlPages(readJson, endpoint, { stopWhen: stopSearch });
    const uploads = {};
    const analysesByUpload = {};
    for (const receipt of selectedReceipts) {
      uploads[receipt.sarifId] = readJson(`${prefix}/sarifs/${receipt.sarifId}`);
      const query = new URLSearchParams({ sarif_id: receipt.sarifId });
      analysesByUpload[receipt.sarifId] = readCodeqlPages(readJson, `${prefix}/analyses?${query}`);
    }
    return selectCompletedUploadAnalyses({
      selectedReceipts,
      uploads,
      analysesByUpload,
      context,
      policy,
    });
  };
  const analyses = collectAnalyses();
  const selected = selectCodeqlAnalyses(analyses, context, policy, setup);
  const sarifs = {};
  for (const analysis of selected)
    sarifs[analysis.id] = readJson(`${prefix}/analyses/${analysis.id}`, "application/sarif+json");
  const alertQuery = new URLSearchParams({ ref: context.ref, tool_name: "CodeQL", state: "open" });
  const alerts = readCodeqlPages(readJson, `${prefix}/alerts?${alertQuery}`);
  const instancesByAlert = {};
  for (const alert of alerts) {
    requireEvidence(
      Number.isSafeInteger(alert?.number) && alert.number > 0,
      "SCAN_ALERT_ID_INVALID"
    );
    instancesByAlert[alert.number] = readCodeqlPages(
      readJson,
      `${prefix}/alerts/${alert.number}/instances?${new URLSearchParams({ ref: context.ref })}`
    );
  }
  const receipt = evaluateCodeqlCandidate({
    context,
    policy,
    baseline,
    setup,
    analyses,
    sarifs,
    alerts,
    instancesByAlert,
  });
  receipt.setupValidation = {
    mode: "reviewed-versioned-snapshot",
    observedAt: setup.observedAt,
    administrativeReadback:
      "Required outside the PR token before rollout or setup changes; not performed by this check.",
  };
  assertCurrentContext(context, currentIdentity(readJson, context));
  const latest = selectCodeqlAnalyses(collectAnalyses(), context, policy, setup);
  requireEvidence(
    latest.map((entry) => entry.id).join() === selected.map((entry) => entry.id).join(),
    "SCAN_ANALYSES_MOVED"
  );
  if (selectedReceipts) {
    receipt.producer = {
      runId: producer.runId,
      consumerAttempt: producer.runAttempt,
      workflowSha: producer.workflowSha,
      uploads: selectedReceipts.map(({ language, sarifId, runAttempt }) => ({
        language,
        sarifId,
        producerAttempt: runAttempt,
      })),
      processing: "complete",
    };
  }
  return receipt;
}

export async function runCodeqlAdmission({
  env = process.env,
  args = process.argv.slice(2),
  readJson = readGithubJson,
  sleep = delay,
  now = Date.now,
} = {}) {
  let context;
  let receipt;
  try {
    requireEvidence(
      !args.includes("--update") && !args.includes("--advisory") && !args.includes("--json"),
      "CANDIDATE_MODE_CONFLICT"
    );
    const waitIndex = args.indexOf("--wait-seconds");
    const waitSeconds = waitIndex < 0 ? 0 : Number(args[waitIndex + 1]);
    requireEvidence(
      Number.isSafeInteger(waitSeconds) && waitSeconds >= 0 && waitSeconds <= 3600,
      "SCAN_WAIT_INVALID"
    );
    const event = JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
    const policyBytes = fs.readFileSync("config/quality/codeql-admission-policy.json");
    const policy = JSON.parse(policyBytes);
    context = resolveCodeqlContext(env, event, { allowForks: policy.setup === "advanced" });
    const baseline = JSON.parse(fs.readFileSync("config/quality/quality-baseline.json", "utf8"))
      ?.metrics?.codeqlAlerts?.value;
    let producer;
    if (policy.producerReceiptsRequired) {
      requireEvidence(waitSeconds === 0, "SCAN_PRODUCER_POLLING_FORBIDDEN");
      assertCodeqlTarget(env, event, policy);
      requireEvidence(env.CODEQL_PRODUCER_RESULT === "success", "SCAN_PRODUCER_INCOMPLETE");
      producer = {
        runId: env.GITHUB_RUN_ID,
        runAttempt: env.GITHUB_RUN_ATTEMPT,
        workflowSha: env.GITHUB_WORKFLOW_SHA,
        policySha256: createHash("sha256").update(policyBytes).digest("hex"),
        producerResult: env.CODEQL_PRODUCER_RESULT,
        receipts: readProducerReceipts(env.CODEQL_PRODUCER_RECEIPTS_PATH),
      };
    }
    const deadline = now() + waitSeconds * 1000;
    while (true) {
      try {
        receipt = observeCodeqlCandidate({ context, policy, baseline, producer, readJson });
        receipt.policySha256 = createHash("sha256").update(policyBytes).digest("hex");
        break;
      } catch (error) {
        if (!String(error.code).startsWith("SCAN_MISSING:") || now() >= deadline) throw error;
        process.stderr.write(
          `[codeql-candidate] ${error.code}; waiting for the exact candidate scan\n`
        );
        await sleep(Math.min(60_000, deadline - now()));
      }
    }
  } catch (error) {
    receipt = {
      schemaVersion: 1,
      profile: "candidate",
      verdict: "HOLD",
      code: error instanceof CodeqlEvidenceError ? error.code : "SCAN_INPUT_UNAVAILABLE",
      context,
    };
  }
  const destination = env.CODEQL_RECEIPT_PATH || ".artifacts/codeql-candidate.json";
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, JSON.stringify(receipt, null, 2) + "\n");
  process.stdout.write(`[codeql-candidate] ${receipt.verdict} ${receipt.code}\n`);
  return receipt.verdict === "PASS" ? 0 : receipt.verdict === "FAIL" ? 1 : 2;
}
