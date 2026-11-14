// Muse Code only speaks the Responses wire (its registry endpoint is /responses). A
// passthrough id that post-dates the seed catalog must not fall back to the provider's
// chat-completions format, which the upstream rejects with 400.
import test from "node:test";
import assert from "node:assert/strict";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";

test("unknown muse-code ids fall back to openai-responses (alias and provider id)", () => {
  for (const alias of ["mc", "muse-code"]) {
    assert.equal(getModelTargetFormat(alias, "muse-future-9.0"), "openai-responses");
    assert.equal(getModelTargetFormat(alias, `${alias}/muse-future-9.0`), "openai-responses");
  }
});

test("seeded muse-code ids keep their explicit target format", () => {
  assert.equal(getModelTargetFormat("mc", "muse-wonder-1.0"), "openai-responses");
  assert.equal(getModelTargetFormat("mc", "muse-spark-1.3"), "openai-responses");
});

test("the Responses-only fallback does not leak to unrelated providers", () => {
  assert.notEqual(getModelTargetFormat("openrouter", "muse-future-9.0"), "openai-responses");
});
