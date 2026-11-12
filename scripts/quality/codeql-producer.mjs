#!/usr/bin/env node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertCodeqlSetup, resolveCodeqlContext } from "./codeql-admission.mjs";
import { assertCodeqlTarget, assertPrePushReadback } from "./codeql-producer-evidence.mjs";
import { CodeqlEvidenceError } from "./codeql-evidence-error.mjs";

function requireEvidence(condition, code) {
  if (!condition) throw new CodeqlEvidenceError(code);
}

export function createProducerReceipt({ env, event, policy, policySha256 }) {
  assertCodeqlSetup(policy.reviewedSetup, policy);
  assertCodeqlTarget(env, event, policy);
  requireEvidence(
    policy.setup === "advanced" && policy.producerReceiptsRequired === true,
    "SCAN_PRODUCER_POLICY_INVALID"
  );
  const context = resolveCodeqlContext(env, event, { allowForks: true });
  requireEvidence(
    /^[1-9][0-9]*$/.test(env.GITHUB_RUN_ID ?? "") &&
      /^[1-9][0-9]*$/.test(env.GITHUB_RUN_ATTEMPT ?? ""),
    "SCAN_PRODUCER_RUN_INVALID"
  );
  requireEvidence(
    /^[a-f0-9]{40}$/.test(env.CI_WORKFLOW_SHA ?? "") &&
      env.CI_WORKFLOW_REF === `${context.repository}/.github/workflows/ci.yml@${context.ref}`,
    "SCAN_PRODUCER_WORKFLOW_INVALID"
  );
  requireEvidence(/^[a-f0-9]{64}$/.test(policySha256), "SCAN_PRODUCER_POLICY_INVALID");
  requireEvidence(
    policy.languages.includes(env.CODEQL_LANGUAGE) &&
      env.CODEQL_CATEGORY === `/language:${env.CODEQL_LANGUAGE}` &&
      env.CODEQL_BUILD_MODE === "none",
    "SCAN_UPLOAD_RECEIPT_INVALID"
  );
  requireEvidence(
    /^[A-Za-z0-9-]{1,100}$/.test(env.CODEQL_SARIF_ID ?? ""),
    "SCAN_UPLOAD_ID_INVALID"
  );
  return {
    schemaVersion: 1,
    context,
    runId: env.GITHUB_RUN_ID,
    runAttempt: env.GITHUB_RUN_ATTEMPT,
    workflowRef: env.CI_WORKFLOW_REF,
    workflowSha: env.CI_WORKFLOW_SHA,
    policySha256,
    language: env.CODEQL_LANGUAGE,
    category: env.CODEQL_CATEGORY,
    buildMode: env.CODEQL_BUILD_MODE,
    sarifId: env.CODEQL_SARIF_ID,
  };
}

export function runCodeqlProducer(args = process.argv.slice(2), env = process.env) {
  const policyBytes = fs.readFileSync("config/quality/codeql-admission-policy.json");
  const policy = JSON.parse(policyBytes);
  const policySha256 = createHash("sha256").update(policyBytes).digest("hex");
  if (args[0] === "verify-admin-readback") {
    assertCodeqlSetup(policy.reviewedSetup, policy);
    requireEvidence(args.length === 3, "SCAN_ADMIN_INPUT_INVALID");
    const expected = JSON.parse(fs.readFileSync(args[1], "utf8"));
    const actual = JSON.parse(fs.readFileSync(args[2], "utf8"));
    requireEvidence(actual.policySha256 === policySha256, "SCAN_ADMIN_POLICY_BYTES_MOVED");
    assertPrePushReadback({ actual, expected, policy });
    return;
  }
  requireEvidence(
    args.length === 1 && ["preflight", "write"].includes(args[0]),
    "SCAN_PRODUCER_COMMAND_INVALID"
  );
  requireEvidence(
    policy.setup === "advanced" && policy.producerReceiptsRequired === true,
    "SCAN_PRODUCER_POLICY_INVALID"
  );
  assertCodeqlSetup(policy.reviewedSetup, policy);
  const event = JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, "utf8"));
  assertCodeqlTarget(env, event, policy);
  if (args[0] === "preflight") return;
  const receipt = createProducerReceipt({ env, event, policy, policySha256 });
  const directory = ".artifacts/codeql-uploads";
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    path.join(directory, `codeql-${receipt.language}-${receipt.runAttempt}.json`),
    JSON.stringify(receipt, null, 2) + "\n",
    { flag: "wx" }
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    runCodeqlProducer();
    process.stdout.write("[codeql-producer] evidence recorded\n");
  } catch (error) {
    process.stderr.write(
      `[codeql-producer] ${error instanceof CodeqlEvidenceError ? error.code : "SCAN_PRODUCER_INPUT_UNAVAILABLE"}\n`
    );
    process.exitCode = 2;
  }
}
