import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";

// Ids confirmed on the providers' public docs (2026-11-23). See the registry rows for sources.
const EXPECTED: Record<string, string[]> = {
  cohere: ["command-a-plus-05-2026"],
  "cloudflare-ai": ["@cf/mistralai/mistral-small-3.1-24b-instruct"],
};

test("new ids are declared on their provider", () => {
  for (const [provider, ids] of Object.entries(EXPECTED)) {
    const declared = new Set(REGISTRY[provider].models.map((m) => m.id));
    for (const id of ids) assert.ok(declared.has(id), `${provider} must declare ${id}`);
  }
});

test("new Workers AI row carries its documented context window and free-tier name", () => {
  const row = REGISTRY["cloudflare-ai"].models.find(
    (m) => m.id === "@cf/mistralai/mistral-small-3.1-24b-instruct"
  );
  assert.equal(row?.contextLength, 128000);
  assert.match(row?.name ?? "", /\(🆓\)$/);
});

test("retired Workers AI Kimi IDs stay undeclared", () => {
  const declared = new Set(REGISTRY["cloudflare-ai"].models.map((m) => m.id));
  assert.equal(declared.has("@cf/moonshotai/kimi-k2.5"), false);
  assert.equal(declared.has("@cf/moonshotai/kimi-k2.6"), false);
});

test("no duplicated ids in the touched registries", () => {
  for (const provider of Object.keys(EXPECTED)) {
    const ids = REGISTRY[provider].models.map((m) => m.id);
    assert.equal(new Set(ids).size, ids.length, `${provider} has duplicated ids`);
  }
});
