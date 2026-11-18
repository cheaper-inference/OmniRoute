import test from "node:test";
import assert from "node:assert/strict";
import { keyTemplatePolicySchema } from "../../src/shared/validation/schemas/keyTemplates.ts";
import { createDefaultKeyTemplatePolicy } from "../../src/shared/types/keyTemplates.ts";
import {
  policyToEditorFormState,
  editorFormStateToPolicy,
} from "../../src/app/(dashboard)/dashboard/api-manager/keyTemplatePolicyUtils.ts";

test("version-one snapshots without a five-hour limit remain readable", () => {
  const policy = createDefaultKeyTemplatePolicy();
  const key: Partial<typeof policy.key> = { ...policy.key };
  delete key.fiveHourUsageLimitUsd;
  const legacy = { ...policy, key };
  const parsed = keyTemplatePolicySchema.parse(legacy);
  assert.equal(parsed.key.fiveHourUsageLimitUsd, null);
});

test("five-hour policy schema accepts fractional budgets and rejects invalid amounts", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.fiveHourUsageLimitUsd = 0.125;
  assert.equal(keyTemplatePolicySchema.parse(policy).key.fiveHourUsageLimitUsd, 0.125);
  for (const value of [-1, NaN, Infinity, "0.125"]) {
    assert.equal(
      keyTemplatePolicySchema.safeParse({
        ...policy,
        key: { ...policy.key, fiveHourUsageLimitUsd: value },
      }).success,
      false
    );
  }
});

test("editing an unrelated setting preserves five-hour policy precision", () => {
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.fiveHourUsageLimitUsd = 0.125;
  const draft = policyToEditorFormState(policy);
  assert.equal(draft.fiveHourUsageLimitUsd, "0.125");
  const edited = editorFormStateToPolicy({ ...draft, maxSessions: 2 });
  assert.equal(edited.key.fiveHourUsageLimitUsd, 0.125);
  assert.equal(edited.key.maxSessions, 2);
  const cleared = editorFormStateToPolicy({ ...draft, fiveHourUsageLimitUsd: "" });
  assert.equal(cleared.key.fiveHourUsageLimitUsd, null);
});
