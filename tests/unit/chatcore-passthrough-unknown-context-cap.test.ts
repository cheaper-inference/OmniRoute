// chatCore must not enforce — or compact against — the provider-wide placeholder window of an
// uncataloged passthrough model. Incident: `openrouter/deepseek/deepseek-v4.1-flash-1017`
// (really 1,048,576 tokens) was rejected by OmniRoute itself with HTTP 400
// "Input exceeds context window ... estimated 128301 input tokens, limit 128000" because the
// model had no capability data and fell to OpenRouter's generic defaultContextLength.
// Openspec change: fix-passthrough-unknown-context-cap.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passthrough-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "passthrough-unknown-context-cap-secret";

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { setModelCapabilityOverride } = await import("../../src/lib/db/modelCapabilityOverrides.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");

const PROVIDER = "openrouter";
const UNCATALOGED = "vendor/uncataloged-passthrough-cap-model";
const ENV_KEYS = ["CONTEXT_LENGTH_OPENROUTER", "CONTEXT_LENGTH_DEFAULT", "CONTEXT_LENGTH_PTSIB"];

const originalFetch = globalThis.fetch;
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
let upstreamBodies: Array<{ messages?: Array<{ role?: string; content?: string }> }> = [];

type ChatMessage = { role: string; content: string };

function words(count: number): string {
  return "word ".repeat(count);
}

/** Compactable multi-turn history: about `turns * wordsPerTurn * 2.5` estimated tokens. */
function history(turns: number, wordsPerTurn: number): ChatMessage[] {
  const messages: ChatMessage[] = [];
  for (let i = 0; i < turns; i++) {
    messages.push({ role: "user", content: `Turn ${i} user: ${words(wordsPerTurn)}` });
    messages.push({ role: "assistant", content: `Turn ${i} assistant: ${words(wordsPerTurn)}` });
  }
  messages.push({ role: "user", content: "Final question?" });
  return messages;
}

function chars(messages: ChatMessage[] | undefined): number {
  return JSON.stringify(messages ?? []).length;
}

function request(messages: ChatMessage[], extra: Record<string, unknown> = {}) {
  return {
    body: { model: UNCATALOGED, messages, stream: false },
    modelInfo: { provider: PROVIDER, model: UNCATALOGED, extendedContext: false },
    credentials: { apiKey: "sk-test" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: { model: UNCATALOGED, messages, stream: false },
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: { debug() {}, info() {}, warn() {}, error() {} },
    ...extra,
  };
}

function messageOf(result: unknown): string {
  const failure = result as { error?: string; rawMessage?: string };
  return failure.rawMessage ?? failure.error ?? "";
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  for (const key of ENV_KEYS) delete process.env[key];
  await resetStorage();
  upstreamBodies = [];
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) upstreamBodies.push(JSON.parse(String(init.body)));
    return new Response(
      JSON.stringify({
        id: "chatcmpl-test",
        object: "chat.completion",
        model: UNCATALOGED,
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 1, total_tokens: 11 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("2.1 incident: an uncataloged openrouter model over the 128000 placeholder is forwarded, not 400'd", async () => {
  await updateCompressionSettings({ enabled: false, defaultMode: "off" });
  // ~150k estimated tokens: over the 128000 generic default, far under the real 1M window.
  const messages = [{ role: "user", content: "x".repeat(600_000) }];
  assert.ok(estimateTokens(messages) > 128_301);

  const result = await handleChatCore(request(messages));

  const text = messageOf(result);
  assert.doesNotMatch(
    text,
    /context_length_exceeded|exceeds (maximum input tokens|context window)/i
  );
  assert.equal(upstreamBodies.length, 1, "the request must reach the upstream provider");
  assert.equal(result.success, true, `expected success, got: ${text}`);
});

test("2.2 a sourced 128000 limit still rejects locally with the existing message", async () => {
  process.env.CONTEXT_LENGTH_OPENROUTER = "128000";
  await updateCompressionSettings({ enabled: false, defaultMode: "off" });
  const messages = [{ role: "user", content: "x".repeat(600_000) }];

  const result = await handleChatCore(request(messages));

  assert.equal(result.success, false);
  assert.equal((result as { status?: number }).status, 400);
  assert.equal((result as { errorCode?: string }).errorCode, "context_length_exceeded");
  assert.match(
    messageOf(result),
    new RegExp(`Input exceeds context window for ${PROVIDER}/${UNCATALOGED}: estimated \\d+ input`)
  );
  assert.match(messageOf(result), /limit 128000\b/);
  assert.equal(upstreamBodies.length, 0, "a locally rejected request must never reach upstream");
});

test("2.3 an explicit max_input_tokens override is still enforced for an uncataloged passthrough model", async () => {
  await updateCompressionSettings({ enabled: false, defaultMode: "off" });
  setModelCapabilityOverride(`${PROVIDER}/${UNCATALOGED}`, "max_input_tokens", 4000);
  // ~6,250 estimated tokens: under the 128000 placeholder, over the explicit 4000 input cap.
  const messages = [{ role: "user", content: "x".repeat(25_000) }];

  const result = await handleChatCore(request(messages));

  assert.equal(result.success, false);
  assert.equal((result as { errorCode?: string }).errorCode, "context_length_exceeded");
  assert.match(messageOf(result), /maximum input tokens/);
  assert.match(messageOf(result), /max input 4000\b/);
  assert.equal(upstreamBodies.length, 0);
});

test("2.3 an explicit max_input_tokens override still drives last-resort compaction", async () => {
  await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  setModelCapabilityOverride(`${PROVIDER}/${UNCATALOGED}`, "max_input_tokens", 4000);
  const messages = history(10, 250); // ~6,300 estimated tokens, compactable history

  const result = await handleChatCore(request(messages));

  assert.equal(result.success, true, `expected compaction to the input cap: ${messageOf(result)}`);
  assert.equal(upstreamBodies.length, 1);
  assert.ok(
    chars(upstreamBodies[0].messages) < chars(messages),
    "the explicit input cap is a sourced ceiling and must still compact"
  );
});

test("3.1 compression enabled: a prompt over the placeholder-derived ceiling is not compacted", async () => {
  await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  const messages = history(40, 1500); // ~150k estimated tokens
  assert.ok(estimateTokens(messages) > 128_000);

  const result = await handleChatCore(request(messages));

  assert.equal(result.success, true, `expected success, got: ${messageOf(result)}`);
  assert.equal(upstreamBodies.length, 1);
  assert.equal(
    chars(upstreamBodies[0].messages),
    chars(messages),
    "forwarded messages must be byte-identical: nothing may be compacted on the placeholder's account"
  );
});

test("3.2 compression enabled: the same prompt IS compacted when the 128000 limit is sourced", async () => {
  process.env.CONTEXT_LENGTH_OPENROUTER = "128000";
  await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  const messages = history(40, 1500); // ~150k estimated tokens

  const result = await handleChatCore(request(messages));

  assert.equal(result.success, true, `expected success after compaction: ${messageOf(result)}`);
  assert.equal(upstreamBodies.length, 1);
  assert.ok(
    chars(upstreamBodies[0].messages) < chars(messages),
    "sourced-limit compaction behaviour must be unchanged"
  );
});

test("combo: an uncataloged passthrough member does not inherit a small sibling window as a hard cap", async () => {
  process.env.CONTEXT_LENGTH_PTSIB = "32000";
  await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  await combosDb.createCombo({
    name: "passthrough-cap-combo",
    models: [`${PROVIDER}/${UNCATALOGED}`, "ptsib/known-small-model"],
  });
  const messages = history(40, 1000); // ~100k tokens: under 128000, over the 32000 sibling

  const result = await handleChatCore(
    request(messages, { isCombo: true, comboName: "passthrough-cap-combo" })
  );

  assert.equal(result.success, true, `expected success, got: ${messageOf(result)}`);
  assert.equal(upstreamBodies.length, 1);
  assert.equal(
    chars(upstreamBodies[0].messages),
    chars(messages),
    "the sibling's window says nothing about this model; no compaction or rejection"
  );
});

test("combo: an operator-declared combo context_length is still enforced", async () => {
  await updateCompressionSettings({ enabled: false, defaultMode: "off" });
  await combosDb.createCombo({
    name: "passthrough-cap-explicit",
    models: [`${PROVIDER}/${UNCATALOGED}`],
    context_length: 64_000,
  });
  const messages = [{ role: "user", content: "x".repeat(400_000) }]; // ~100k tokens

  const result = await handleChatCore(
    request(messages, { isCombo: true, comboName: "passthrough-cap-explicit" })
  );

  assert.equal(result.success, false);
  assert.equal((result as { errorCode?: string }).errorCode, "context_length_exceeded");
  assert.match(messageOf(result), /limit 64000\b/);
  assert.equal(upstreamBodies.length, 0);
});
