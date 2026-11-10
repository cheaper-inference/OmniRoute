import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import {
  assertCurrentContext,
  resolveCodeqlContext,
} from "../../../scripts/quality/codeql-admission.mjs";
import { assertCodeqlTarget } from "../../../scripts/quality/codeql-producer-evidence.mjs";
import { createProducerReceipt } from "../../../scripts/quality/codeql-producer.mjs";

const policy = JSON.parse(
  fs.readFileSync(new URL("../../../config/quality/codeql-admission-policy.json", import.meta.url))
);
const env = {
  GITHUB_EVENT_NAME: "workflow_dispatch",
  GITHUB_REPOSITORY: "owner/repo",
  GITHUB_REF: "refs/heads/fix/recovery",
  GITHUB_SHA: "a".repeat(40),
};
const event = {
  inputs: { candidate_base_branch: policy.targetBranches[1], i18n_base_sha: "b".repeat(40) },
};

test("manual recovery scan admits an explicit finite target without onboarding the source branch", () => {
  assert.doesNotThrow(() => assertCodeqlTarget(env, event, policy));
  const context = resolveCodeqlContext(env, event);
  assert.equal(context.ref, env.GITHUB_REF);
  assert.equal(context.sha, env.GITHUB_SHA);
  assert.equal(context.targetBranch, event.inputs.candidate_base_branch);
  assert.equal(context.base, event.inputs.i18n_base_sha);
});

test("manual target rejects missing, malformed and self comparison SHAs", () => {
  for (const base of [undefined, "", "main", "b".repeat(39), env.GITHUB_SHA]) {
    const changed = { inputs: { ...event.inputs, i18n_base_sha: base } };
    assert.throws(() => resolveCodeqlContext(env, changed), /CONTEXT_DISPATCH_BASE_INVALID/);
    assert.throws(() => assertCodeqlTarget(env, changed, policy), /CONTEXT_DISPATCH_BASE_INVALID/);
  }
});

test("manual target cannot bypass the finite branch policy or inject a ref path", () => {
  for (const target of ["feat/unreviewed", "release/v999.0.0"]) {
    assert.throws(
      () =>
        assertCodeqlTarget(
          env,
          { inputs: { ...event.inputs, candidate_base_branch: target } },
          policy
        ),
      /SCAN_BRANCH_NOT_ONBOARDED/
    );
  }
  for (const target of [
    "../main",
    "main?x=y",
    "main\n",
    "refs/heads/main",
    "main.lock",
    "main//x",
  ]) {
    assert.throws(
      () =>
        resolveCodeqlContext(env, { inputs: { ...event.inputs, candidate_base_branch: target } }),
      /CONTEXT_DISPATCH_TARGET_INVALID/
    );
  }
});

test("manual candidate admission binds both the source head and current target tip", () => {
  const context = resolveCodeqlContext(env, event);
  const current = {
    object: { sha: env.GITHUB_SHA },
    targetBase: {
      ref: `refs/heads/${event.inputs.candidate_base_branch}`,
      object: { sha: event.inputs.i18n_base_sha },
    },
  };
  assert.doesNotThrow(() => assertCurrentContext(context, current));
  for (const targetBase of [
    undefined,
    { ...current.targetBase, object: { sha: "c".repeat(40) } },
    { ...current.targetBase, ref: "refs/heads/other" },
  ]) {
    assert.throws(
      () => assertCurrentContext(context, { ...current, targetBase }),
      /CONTEXT_DISPATCH_BASE_MOVED/
    );
  }
  assert.throws(
    () => assertCurrentContext(context, { ...current, object: { sha: "d".repeat(40) } }),
    /CONTEXT_REF_MOVED/
  );
});

test("producer receipt preserves the exact manual target and base", () => {
  const active = structuredClone(policy);
  active.activationStatus = "READY_AFTER_ADMIN_READBACK";
  active.reviewedSetup.updated_at = "2026-11-09T20:00:00Z";
  active.reviewedSetup.observedAt = "2026-11-09T20:01:00Z";
  const receipt = createProducerReceipt({
    env: {
      ...env,
      GITHUB_RUN_ID: "10",
      GITHUB_RUN_ATTEMPT: "1",
      CI_WORKFLOW_SHA: env.GITHUB_SHA,
      CI_WORKFLOW_REF: `owner/repo/.github/workflows/ci.yml@${env.GITHUB_REF}`,
      CODEQL_LANGUAGE: "actions",
      CODEQL_CATEGORY: "/language:actions",
      CODEQL_BUILD_MODE: "none",
      CODEQL_SARIF_ID: "sarif-10",
    },
    event,
    policy: active,
    policySha256: "f".repeat(64),
  });
  assert.equal(receipt.context.base, event.inputs.i18n_base_sha);
  assert.equal(receipt.context.targetBranch, event.inputs.candidate_base_branch);
});

test("ordinary dispatches and non-dispatch events retain their existing target rules", () => {
  const direct = { ...env, GITHUB_REF: "refs/heads/main" };
  assert.doesNotThrow(() => assertCodeqlTarget(direct, {}, policy));
  assert.equal(resolveCodeqlContext(direct, {}).targetBranch, undefined);
  assert.throws(() => assertCodeqlTarget(env, {}, policy), /SCAN_BRANCH_NOT_ONBOARDED/);
  assert.throws(
    () => assertCodeqlTarget({ ...env, GITHUB_EVENT_NAME: "push" }, event, policy),
    /SCAN_BRANCH_NOT_ONBOARDED/
  );
});

test("CI exposes the optional candidate base branch alongside the immutable comparison input", () => {
  const ci = parse(
    fs.readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
  );
  assert.equal(ci.on.workflow_dispatch.inputs.candidate_base_branch.type, "string");
  assert.equal(ci.on.workflow_dispatch.inputs.candidate_base_branch.required, false);
  assert.equal(ci.on.workflow_dispatch.inputs.i18n_base_sha.type, "string");
});
