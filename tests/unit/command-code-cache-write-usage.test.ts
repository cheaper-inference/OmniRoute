/**
 * Command Code reports prompt-cache usage inside `finish.totalUsage.inputTokenDetails`
 * as `{ noCacheTokens, cacheReadTokens, cacheWriteTokens }`, with `inputTokens`
 * cache-INCLUSIVE. Cache reads already surface as `cached_tokens`; cache writes
 * (billed at a premium on Anthropic-backed models) were dropped, so usage and
 * cost lost them. These tests drive the `/alpha/generate` CLI path, which is the
 * one that maps Command Code's own usage shape.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-cache-write-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { getPromptCacheCreationTokens, getPromptCacheReadTokens, getLoggedInputTokens } =
  await import("../../src/lib/usage/tokenAccounting.ts");
const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: { cached_tokens: number; cache_creation_tokens?: number };
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
};

// Go-plan key: /provider/v1 answers 403, so the executor falls back to /alpha/generate.
function goPlanFallbackFetch(cliLines: unknown[]) {
  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("/provider/v1/chat/completions")) {
      return new Response(JSON.stringify({ error: { code: "upgrade_required" } }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("/alpha/generate")) {
      const cliSse = cliLines.map((line) => `data: ${JSON.stringify(line)}\n\n`).join("");
      return new Response(cliSse, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("Not found", { status: 404 });
  };
}

function finishWith(totalUsage: Record<string, unknown>) {
  return [
    { type: "text-delta", text: "ok" },
    { type: "finish", finishReason: "stop", totalUsage },
  ];
}

async function runNonStream(totalUsage: Record<string, unknown>): Promise<Usage> {
  goPlanFallbackFetch(finishWith(totalUsage));
  const { response, url } = await (
    await getExecutor("command-code")
  ).execute({
    model: "claude-sonnet-4-6",
    stream: false,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "hi" }] },
  });
  assert.ok(url.includes("/alpha/generate"));
  const json = (await response.json()) as { usage: Usage };
  return json.usage;
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Command Code surfaces inputTokenDetails.cacheWriteTokens as cache creation", async () => {
  const usage = await runNonStream({
    inputTokens: 100,
    outputTokens: 20,
    inputTokenDetails: { noCacheTokens: 10, cacheReadTokens: 60, cacheWriteTokens: 30 },
  });

  // inputTokens is cache-inclusive: neither read nor write is added on top.
  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.completion_tokens, 20);
  assert.equal(usage.prompt_tokens_details.cached_tokens, 60);
  assert.equal(usage.cache_read_input_tokens, 60);
  assert.equal(usage.prompt_tokens_details.cache_creation_tokens, 30);
  assert.equal(usage.cache_creation_input_tokens, 30);

  // Downstream accounting reads the write and keeps the inclusive prompt.
  assert.equal(getPromptCacheCreationTokens(usage), 30);
  assert.equal(getPromptCacheReadTokens(usage), 60);
  assert.equal(getLoggedInputTokens(usage), 100);
});

test("Command Code cache-write cost is billed once, at the cache_creation rate", async () => {
  const usage = await runNonStream({
    inputTokens: 100,
    outputTokens: 0,
    inputTokenDetails: { noCacheTokens: 10, cacheReadTokens: 60, cacheWriteTokens: 30 },
  });
  // $/1M: 10 fresh × 1 + 60 read × 0.1 + 30 write × 2 = 10 + 6 + 60 = 76 → 76e-6
  const cost = computeCostFromPricing(
    { input: 1, cached: 0.1, output: 5, cache_creation: 2 },
    usage as unknown as Record<string, unknown>
  );
  assert.ok(Math.abs(cost - 76e-6) < 1e-12, `unexpected cost ${cost}`);
});

test("Command Code accepts snake_case cache-write spellings", async () => {
  const usage = await runNonStream({
    inputTokens: 50,
    outputTokens: 5,
    input_token_details: { cache_read_tokens: 20, cache_write_tokens: 25 },
  });
  assert.equal(usage.prompt_tokens, 50);
  assert.equal(usage.prompt_tokens_details.cached_tokens, 20);
  assert.equal(usage.prompt_tokens_details.cache_creation_tokens, 25);
  assert.equal(usage.cache_creation_input_tokens, 25);
});

test("Command Code prompt_tokens falls back to noCache + read + write when inputTokens is absent", async () => {
  const usage = await runNonStream({
    outputTokens: 5,
    inputTokenDetails: { noCacheTokens: 10, cacheReadTokens: 60, cacheWriteTokens: 30 },
  });
  assert.equal(usage.prompt_tokens, 100);
  assert.equal(usage.prompt_tokens_details.cache_creation_tokens, 30);
});

test("Command Code prompt_tokens is invariant to the cache split (cold vs warm, same body)", async () => {
  const cold = await runNonStream({
    inputTokens: 8494,
    outputTokens: 4,
    inputTokenDetails: { noCacheTokens: 1070, cacheReadTokens: 7424 },
  });
  const warm = await runNonStream({
    inputTokens: 8494,
    outputTokens: 4,
    inputTokenDetails: { noCacheTokens: 46, cacheReadTokens: 8448 },
  });
  assert.equal(cold.prompt_tokens, 8494);
  assert.equal(warm.prompt_tokens, 8494);
  assert.equal(cold.prompt_tokens_details.cached_tokens, 7424);
  assert.equal(warm.prompt_tokens_details.cached_tokens, 8448);
});

test("Command Code emits no cache-creation field when no cache write is reported", async () => {
  const usage = await runNonStream({
    inputTokens: 50,
    outputTokens: 5,
    inputTokenDetails: { cacheReadTokens: 40 },
  });
  assert.equal(usage.prompt_tokens_details.cached_tokens, 40);
  assert.equal(usage.prompt_tokens_details.cache_creation_tokens, undefined);
  assert.equal(usage.cache_creation_input_tokens, undefined);
  assert.equal(getPromptCacheCreationTokens(usage), 0);
});

test("Command Code streaming usage chunk carries the cache-write tokens", async () => {
  goPlanFallbackFetch(
    finishWith({
      inputTokens: 100,
      outputTokens: 20,
      inputTokenDetails: { cacheReadTokens: 60, cacheWriteTokens: 30 },
    })
  );
  const { response } = await (
    await getExecutor("command-code")
  ).execute({
    model: "claude-sonnet-4-6",
    stream: true,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "hi" }] },
  });
  const sse = await response.text();
  const usageChunk = sse
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)) as { usage?: Usage })
    .find((chunk) => chunk.usage);
  assert.ok(usageChunk?.usage, "stream emitted a usage chunk");
  assert.equal(usageChunk.usage.prompt_tokens, 100);
  assert.equal(usageChunk.usage.prompt_tokens_details.cached_tokens, 60);
  assert.equal(usageChunk.usage.prompt_tokens_details.cache_creation_tokens, 30);
  assert.equal(usageChunk.usage.cache_creation_input_tokens, 30);
});
