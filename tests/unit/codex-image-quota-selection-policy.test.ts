import assert from "node:assert/strict";
import test from "node:test";
import { imageQuotaPreflightOptions } from "../../src/sse/services/imageQuotaSelectionPolicy.ts";

test("Codex images bypass cached text quota gates", () => {
  assert.deepEqual(imageQuotaPreflightOptions("codex"), { bypassQuotaPolicy: true });
});

test("Other image providers retain their normal quota policies", () => {
  for (const provider of ["antigravity", "gemini", "openai", "custom", "agy", ""]) {
    assert.deepEqual(imageQuotaPreflightOptions(provider), {}, provider);
  }
});

test("Codex image quota override does not change API-key connection scope", () => {
  const opts = imageQuotaPreflightOptions("codex");
  assert.equal(Object.keys(opts).length, 1);
  assert.equal("allowedConnections" in opts, false);
  assert.equal("excludeConnectionIds" in opts, false);
});
