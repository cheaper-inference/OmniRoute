import test from "node:test";
import assert from "node:assert/strict";

import { parseBulkApiKeys } from "../../src/shared/utils/bulkApiKeyParser.ts";

test("bulk add keeps a Muse LLM|id|secret line whole as the key and auto-names it", () => {
  const { entries, warnings } = parseBulkApiKeys("LLM|abc123|secretXYZ");

  assert.deepEqual(warnings, []);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "Key 1");
  assert.equal(entries[0].apiKey, "LLM|abc123|secretXYZ");
});

test("bulk add matches the Muse prefix in any case and numbers it in a mixed batch", () => {
  const { entries } = parseBulkApiKeys("sk-plain\nllm|id2|secret2\nprod|sk-normal");

  assert.deepEqual(
    entries.map((e) => [e.name, e.apiKey]),
    [
      ["Key 1", "sk-plain"],
      ["Key 2", "llm|id2|secret2"],
      ["prod", "sk-normal"],
    ]
  );
});

test("bulk add keeps a two-field LLM|key line whole too", () => {
  const { entries } = parseBulkApiKeys("LLM|minted-key");

  assert.deepEqual(
    entries.map((e) => [e.name, e.apiKey]),
    [["Key 1", "LLM|minted-key"]]
  );
});

test("bulk add still splits a name that only starts with LLM", () => {
  const { entries } = parseBulkApiKeys("LLM-prod|sk-1\nLLMs|sk-2");

  assert.deepEqual(
    entries.map((e) => [e.name, e.apiKey]),
    [
      ["LLM-prod", "sk-1"],
      ["LLMs", "sk-2"],
    ]
  );
});

test("Cloudflare three-field parsing still splits an LLM-prefixed line", () => {
  const { entries } = parseBulkApiKeys("LLM|account-1|secretXYZ", { withAccountId: true });

  assert.deepEqual(
    entries.map((e) => [e.name, e.accountId, e.apiKey]),
    [["LLM", "account-1", "secretXYZ"]]
  );
});
