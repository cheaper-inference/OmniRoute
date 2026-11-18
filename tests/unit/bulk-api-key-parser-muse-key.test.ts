import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { parseBulkApiKeys } from "../../src/shared/utils/bulkApiKeyParser.ts";

const MUSE = { provider: "muse-code" };

test("bulk add keeps a Muse LLM|id|secret line whole as the key and auto-names it", () => {
  const { entries, warnings } = parseBulkApiKeys("LLM|abc123|secretXYZ", MUSE);

  assert.deepEqual(warnings, []);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].name, "Key 1");
  assert.equal(entries[0].apiKey, "LLM|abc123|secretXYZ");
});

test("bulk add matches the Muse prefix in any case and numbers it in a mixed batch", () => {
  const { entries } = parseBulkApiKeys("sk-plain\nllm|id2|secret2\nprod|sk-normal", MUSE);

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
  const { entries } = parseBulkApiKeys("LLM|minted-key", MUSE);

  assert.deepEqual(
    entries.map((e) => [e.name, e.apiKey]),
    [["Key 1", "LLM|minted-key"]]
  );
});

test("bulk add still splits a name that only starts with LLM", () => {
  const { entries } = parseBulkApiKeys("LLM-prod|sk-1\nLLMs|sk-2", MUSE);

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

test("a non-Muse provider still reads LLM|key as name|apiKey", () => {
  for (const options of [{}, { provider: "openai" }]) {
    const { entries, warnings } = parseBulkApiKeys("LLM|sk-live", options);

    assert.deepEqual(warnings, []);
    assert.deepEqual(
      entries.map((e) => [e.name, e.apiKey]),
      [["LLM", "sk-live"]]
    );
  }
});

test("a Muse LLM| line with nothing after the prefix is skipped with the empty-key warning", () => {
  const { entries, warnings } = parseBulkApiKeys("LLM|\nllm|", MUSE);

  assert.deepEqual(entries, []);
  assert.deepEqual(warnings, ["Line 1: empty apiKey, skipped", "Line 2: empty apiKey, skipped"]);
});

test("the add-key modal passes its provider id to the bulk parser", () => {
  const modal = fs.readFileSync(
    "src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal.tsx",
    "utf8"
  );

  assert.match(modal, /parseBulkApiKeys\(bulkText, \{[^}]*\bprovider\b[^}]*\}\)/);
});
