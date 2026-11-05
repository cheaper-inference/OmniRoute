import { isDeepStrictEqual } from "node:util";
import fs from "node:fs";
import path from "node:path";
import { CodeqlEvidenceError } from "./codeql-evidence-error.mjs";

function requireEvidence(condition, code) {
  if (!condition) throw new CodeqlEvidenceError(code);
}

export function selectProducerReceipts({
  context,
  runId,
  runAttempt,
  workflowSha,
  policySha256,
  policy,
  producerResult,
  receipts,
}) {
  requireEvidence(producerResult === "success", "SCAN_PRODUCER_INCOMPLETE");
  requireEvidence(/^[1-9][0-9]*$/.test(runId), "SCAN_PRODUCER_RUN_INVALID");
  requireEvidence(/^[1-9][0-9]*$/.test(runAttempt), "SCAN_PRODUCER_ATTEMPT_INVALID");
  requireEvidence(/^[a-f0-9]{40}$/.test(workflowSha), "SCAN_PRODUCER_WORKFLOW_INVALID");
  requireEvidence(/^[a-f0-9]{64}$/.test(policySha256), "SCAN_PRODUCER_POLICY_INVALID");
  requireEvidence(Array.isArray(receipts), "SCAN_UPLOAD_RECEIPTS_MISSING");
  const languages = [...policy.languages].sort();
  requireEvidence(
    languages.length === 4 && new Set(languages).size === 4,
    "SCAN_UPLOAD_LANGUAGE_SET_INVALID"
  );
  const expectedRef = `${context.repository}/.github/workflows/ci.yml@${context.ref}`;
  for (const receipt of receipts) {
    requireEvidence(
      receipt?.schemaVersion === 1 &&
        isDeepStrictEqual(receipt.context, context) &&
        receipt.runId === runId &&
        receipt.workflowRef === expectedRef &&
        receipt.workflowSha === workflowSha &&
        receipt.policySha256 === policySha256,
      "SCAN_UPLOAD_RECEIPT_IDENTITY_MISMATCH"
    );
    requireEvidence(
      /^[1-9][0-9]*$/.test(receipt.runAttempt) && BigInt(receipt.runAttempt) <= BigInt(runAttempt),
      "SCAN_UPLOAD_RECEIPT_ATTEMPT_INVALID"
    );
    requireEvidence(
      languages.includes(receipt.language) &&
        receipt.category === `/language:${receipt.language}` &&
        receipt.buildMode === "none" &&
        /^[A-Za-z0-9-]{1,100}$/.test(receipt.sarifId ?? ""),
      "SCAN_UPLOAD_RECEIPT_INVALID"
    );
  }
  const selected = languages.map((language) => {
    const matches = receipts.filter((receipt) => receipt.language === language);
    requireEvidence(matches.length > 0, `SCAN_UPLOAD_RECEIPT_MISSING:${language}`);
    matches.sort((a, b) => (BigInt(a.runAttempt) > BigInt(b.runAttempt) ? -1 : 1));
    requireEvidence(
      matches.length === 1 || matches[0].runAttempt !== matches[1].runAttempt,
      "SCAN_UPLOAD_RECEIPT_DUPLICATE"
    );
    return matches[0];
  });
  requireEvidence(
    new Set(selected.map((entry) => entry.sarifId)).size === 4,
    "SCAN_UPLOAD_ID_REUSED"
  );
  return selected;
}

export function selectCompletedUploadAnalyses({ selectedReceipts, uploads, analysesByUpload }) {
  const analyses = [];
  for (const receipt of selectedReceipts) {
    const upload = uploads[receipt.sarifId];
    requireEvidence(
      upload?.processing_status === "complete" && (!upload.errors || upload.errors.length === 0),
      `SCAN_UPLOAD_NOT_COMPLETE:${receipt.language}`
    );
    const entries = analysesByUpload[receipt.sarifId];
    requireEvidence(
      Array.isArray(entries) && entries.length === 1,
      `SCAN_UPLOAD_ANALYSIS_MISSING_OR_AMBIGUOUS:${receipt.language}`
    );
    const analysis = entries[0];
    requireEvidence(
      analysis.sarif_id === receipt.sarifId && analysis.category === receipt.category,
      "SCAN_UPLOAD_ANALYSIS_IDENTITY_MISMATCH"
    );
    analyses.push(analysis);
  }
  requireEvidence(
    analyses.length === 4 && new Set(analyses.map((entry) => entry.id)).size === 4,
    "SCAN_UPLOAD_ANALYSIS_SET_INVALID"
  );
  // The caller must also apply the shared rules/ref/SHA/origin/environment checks.
  return analyses;
}

export function assertPrePushReadback({ actual, expected, policy, now = Date.now() }) {
  // Technical state guard only. It does not supply protected-instruction approval.
  requireEvidence(actual.defaultState === "not-configured", "SCAN_ADMIN_DEFAULT_STILL_ENABLED");
  requireEvidence(
    policy.setup === "advanced" && policy.activationStatus === "READY_AFTER_ADMIN_READBACK",
    "SCAN_ADMIN_POLICY_NOT_READY"
  );
  requireEvidence(
    Number.isFinite(Date.parse(actual.observedAt)) &&
      actual.observedAt === policy.reviewedSetup.observedAt,
    "SCAN_ADMIN_READBACK_NOT_BOUND"
  );
  requireEvidence(
    actual.setupUpdatedAt === policy.reviewedSetup.updated_at,
    "SCAN_ADMIN_SETUP_MOVED"
  );
  requireEvidence(
    Number.isFinite(Date.parse(actual.checkedAt)) &&
      Date.parse(actual.checkedAt) <= now &&
      now - Date.parse(actual.checkedAt) <= 300000,
    "SCAN_ADMIN_READBACK_STALE"
  );
  for (const field of [
    "repository",
    "baseSha",
    "headSha",
    "treeSha",
    "policySha256",
    "patchSha256",
    "rollbackSha256",
    "rulesSha256",
  ]) {
    requireEvidence(
      typeof expected[field] === "string" &&
        (field === "repository"
          ? /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/
          : ["baseSha", "headSha", "treeSha"].includes(field)
            ? /^[a-f0-9]{40}$/
            : /^[a-f0-9]{64}$/
        ).test(expected[field]) &&
        actual[field] === expected[field],
      `SCAN_ADMIN_PIN_MOVED:${field}`
    );
  }
}

export function readProducerReceipts(directory) {
  requireEvidence(
    typeof directory === "string" && directory.length > 0,
    "SCAN_UPLOAD_RECEIPTS_MISSING"
  );
  const receipts = [];
  const walk = (location, depth) => {
    requireEvidence(depth <= 2, "SCAN_UPLOAD_RECEIPT_DIRECTORY_INVALID");
    for (const name of fs.readdirSync(location)) {
      const file = path.join(location, name);
      const stat = fs.lstatSync(file);
      requireEvidence(!stat.isSymbolicLink(), "SCAN_UPLOAD_RECEIPT_LINK");
      if (stat.isDirectory()) walk(file, depth + 1);
      else {
        requireEvidence(
          stat.isFile() &&
            /^codeql-[a-z-]+-[1-9][0-9]*\.json$/.test(name) &&
            stat.size > 0 &&
            stat.size <= 65536,
          "SCAN_UPLOAD_RECEIPT_FILE_INVALID"
        );
        receipts.push(JSON.parse(fs.readFileSync(file, "utf8")));
        requireEvidence(receipts.length <= 100, "SCAN_UPLOAD_RECEIPTS_EXCESSIVE");
      }
    }
  };
  walk(directory, 0);
  return receipts;
}

export function assertCodeqlTarget(env, event, policy) {
  requireEvidence(
    Array.isArray(policy.targetBranches) && policy.targetBranches.length > 0,
    "SCAN_TARGET_POLICY_MISSING"
  );
  const target =
    env.GITHUB_EVENT_NAME === "pull_request"
      ? event.pull_request?.base?.ref
      : env.GITHUB_EVENT_NAME === "merge_group"
        ? event.merge_group?.base_ref?.replace(/^refs\/heads\//, "")
        : env.GITHUB_REF?.replace(/^refs\/heads\//, "");
  requireEvidence(policy.targetBranches.includes(target), "SCAN_BRANCH_NOT_ONBOARDED");
}
