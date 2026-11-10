import test from "node:test";
import assert from "node:assert/strict";
import * as serviceTierVariants from "../../src/app/api/v1/vscode/[token]/serviceTierVariants.ts";

test("vscode tokenized chat routes rewrite family-first ids back to the codex provider id", async () => {
  const payload = serviceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.6-sol__provider_cx__tier_priority",
  });

  assert.equal(payload.model, "cx/gpt-5.6-sol");
  assert.equal(payload.service_tier, "priority");
});
