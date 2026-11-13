import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-mistral-schema-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const { stripUnsupportedParams } = await import("../../open-sse/translator/paramSupport.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Mistral's ChatCompletionRequest is additionalProperties:false and service_tier accepts only
// auto|standard_only; these were live 422s (service_tier "flex") / spec-forbidden fields.
const chatBody = (extra: Record<string, unknown>) => ({
  model: "mistral-small-latest",
  messages: [{ role: "user", content: "hi" }],
  ...extra,
});

test("mistral chat: seed → random_seed, max_completion_tokens → max_tokens", () => {
  const body = chatBody({ seed: 7, max_completion_tokens: 50 });
  stripUnsupportedParams("mistral", "mistral-small-latest", body);
  assert.equal(body.random_seed, 7);
  assert.equal(body.max_tokens, 50);
  assert.equal("seed" in body, false);
  assert.equal("max_completion_tokens" in body, false);
});

test("mistral chat: an explicit max_tokens / random_seed wins over the OpenAI aliases", () => {
  const body = chatBody({ seed: 7, random_seed: 1, max_tokens: 10, max_completion_tokens: 50 });
  stripUnsupportedParams("mistral", "mistral-small-latest", body);
  assert.equal(body.random_seed, 1);
  assert.equal(body.max_tokens, 10);
  assert.equal("seed" in body, false);
  assert.equal("max_completion_tokens" in body, false);
});

test("mistral chat: null aliases are dropped without being copied", () => {
  const body = chatBody({ seed: null, max_completion_tokens: null });
  stripUnsupportedParams("mistral", "mistral-small-latest", body);
  assert.equal("random_seed" in body, false);
  assert.equal("max_tokens" in body, false);
  assert.equal("seed" in body, false);
  assert.equal("max_completion_tokens" in body, false);
});

test("mistral chat: OpenAI-only fields are dropped, schema fields survive", () => {
  const body = chatBody({
    user: "u",
    logit_bias: { "1": 1 },
    store: false,
    verbosity: "low",
    temperature: 0.2,
    stop: ["x"],
    prompt_cache_key: "k",
    safe_prompt: true,
    stream_options: { include_usage: true },
  });
  stripUnsupportedParams("mistral", "mistral-small-latest", body);
  for (const key of ["user", "logit_bias", "store", "verbosity"]) {
    assert.equal(key in body, false, key);
  }
  assert.equal(body.temperature, 0.2);
  assert.deepEqual(body.stop, ["x"]);
  assert.equal(body.prompt_cache_key, "k");
  assert.equal(body.safe_prompt, true);
  assert.deepEqual(body.stream_options, { include_usage: true });
});

test("mistral chat: service_tier maps onto auto|standard_only, unknown values are dropped", () => {
  const cases: Array<[unknown, unknown]> = [
    ["auto", "auto"],
    ["priority", "auto"],
    ["default", "standard_only"],
    ["flex", "standard_only"],
    ["scale", "standard_only"],
    ["FLEX", "standard_only"],
    ["standard_only", "standard_only"],
    ["bogus", undefined],
    [null, undefined],
    [5, undefined],
  ];
  for (const [input, expected] of cases) {
    const body = chatBody({ service_tier: input });
    stripUnsupportedParams("mistral", "mistral-small-latest", body);
    assert.equal(body.service_tier, expected, String(input));
  }
});

test("mistral Responses bodies (no messages) and other providers are left alone", () => {
  const responses = {
    model: "labs-leanstral-1-5-1",
    input: [],
    store: true,
    service_tier: "flex",
    user: "u",
  };
  stripUnsupportedParams("mistral", "labs-leanstral-1-5-1", responses);
  assert.deepEqual(responses, {
    model: "labs-leanstral-1-5-1",
    input: [],
    store: true,
    service_tier: "flex",
    user: "u",
  });

  const other = chatBody({ seed: 7, user: "u", service_tier: "flex" });
  stripUnsupportedParams("openai", "gpt-4o", other);
  assert.equal(other.seed, 7);
  assert.equal(other.user, "u");
  assert.equal(other.service_tier, "flex");
});

test("DefaultExecutor(mistral) sends a schema-clean chat body for an OpenAI-style request", async () => {
  const executor = new DefaultExecutor("mistral");
  const out = (await executor.transformRequest(
    "mistral-small-latest",
    chatBody({
      seed: 1,
      max_completion_tokens: 5,
      user: "u",
      store: false,
      verbosity: "low",
      service_tier: "flex",
      logit_bias: { "1": 1 },
    }),
    false,
    { apiKey: "test" }
  )) as Record<string, unknown>;
  assert.equal(out.random_seed, 1);
  assert.equal(out.max_tokens, 5);
  assert.equal(out.service_tier, "standard_only");
  for (const key of ["seed", "max_completion_tokens", "user", "store", "verbosity", "logit_bias"]) {
    assert.equal(key in out, false, key);
  }
});
