import assert from "node:assert/strict";
import test from "node:test";

import { groqProvider } from "@omniroute/open-sse/config/providers/registry/groq/index.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { supportsReasoning } from "../../src/lib/modelCapabilities.ts";

// Groq shut these ids down for free/developer-tier keys (https://console.groq.com/docs/deprecations):
// llama-4-maverick 2026-03-09, llama-4-scout and qwen3-32b 2026-07-17, llama-3.3-70b-versatile
// 2026-08-16. Advertising them in the static catalog hands users a model that 404s out of the box.
// Live discovery (`/v1/models`) still surfaces whatever a given key can actually reach.
const RETIRED_GROQ_IDS = [
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "qwen/qwen3-32b",
  "llama-3.3-70b-versatile",
];

const declaredIds = () => groqProvider.models.map((m) => m.id);

test("groq static catalog does not advertise decommissioned model ids", () => {
  const ids = new Set(declaredIds());
  for (const retired of RETIRED_GROQ_IDS) {
    assert.ok(!ids.has(retired), `${retired} is decommissioned on Groq and must not be listed`);
  }
});

test("groq registry entry exposed via REGISTRY matches the module (no stale copy)", () => {
  assert.deepEqual(
    REGISTRY.groq.models.map((m) => m.id),
    declaredIds()
  );
});

test("groq supportsReasoning:false declarations (#3258/#12134 guard) are not on retired ids", () => {
  const nonReasoning = groqProvider.models
    .filter((m) => m.supportsReasoning === false)
    .map((m) => m.id);
  for (const id of nonReasoning) {
    assert.ok(!RETIRED_GROQ_IDS.includes(id), `${id} is retired — the guard must test a live id`);
  }
});

test("groq catalog keeps the live GPT-OSS chat models", () => {
  const ids = new Set(declaredIds());
  for (const live of ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]) {
    assert.ok(ids.has(live), `${live} must stay routable`);
  }
});

test("retired non-reasoning Llama ids stay reasoning-denied after leaving the catalog (#3258)", () => {
  // Enterprise keys and live discovery can still reach these ids; dropping the registry
  // declaration must not flip them back to the optimistic reasoning-capable default.
  assert.equal(supportsReasoning("groq/llama-3.3-70b-versatile"), false);
  assert.equal(supportsReasoning("groq/meta-llama/llama-4-scout-17b-16e-instruct"), false);
  // Reasoning models on Groq are untouched.
  assert.equal(supportsReasoning("groq/openai/gpt-oss-120b"), true);
});
