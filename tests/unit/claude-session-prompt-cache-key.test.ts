// Opt-in: stamp prompt_cache_key from the Claude Code session header on OpenAI Chat and
// Responses targets, only when the caller did not send a key. Default off.
import { test, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-claude-session-cache-key-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const FLAG = "OMNIROUTE_CLAUDE_SESSION_CACHE_KEY";
const SESSION = "0b8f6c1e-3d2a-4c55-9a7e-5f1d2e3c4b6a";
const messages = [
  { role: "system", content: "stable coding instructions" },
  { role: "user", content: "fix this" },
];

before(async () => {
  await coreDb.ensureDbInitialized();
});
after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
beforeEach(() => {
  process.env[FLAG] = "1";
});
afterEach(() => {
  delete process.env[FLAG];
});

function run(
  extra: Record<string, unknown>,
  headers: Record<string, string> | null = {
    "X-Claude-Code-Session-Id": SESSION,
  }
) {
  return prepareUpstreamBody({
    translatedBody: { model: "gpt-5.2", messages, ...(extra.body as object) },
    modelToCall: "gpt-5.2",
    provider: "openai",
    targetFormat: FORMATS.OPENAI_RESPONSES,
    credentials: null,
    clientRawRequest: headers ? { headers } : undefined,
    ...extra,
  } as never);
}

test("stamps the Claude Code session id as prompt_cache_key on a Responses target", async () => {
  const out = await run({});
  assert.equal(out.prompt_cache_key, SESSION);
});

test("stamps the session id on an OpenAI Chat target in place of the prefix hash", async () => {
  const out = await run({ targetFormat: FORMATS.OPENAI });
  assert.equal(out.prompt_cache_key, SESSION);
});

test("matches the header name in any letter case", async () => {
  const out = await run({}, { "X-CLAUDE-code-Session-ID": SESSION });
  assert.equal(out.prompt_cache_key, SESSION);
});

test("never overwrites a key the caller sent", async () => {
  const out = await run({ body: { prompt_cache_key: "caller-key" } });
  assert.equal(out.prompt_cache_key, "caller-key");
});

test("is off by default: no key is added on a Responses target", async () => {
  delete process.env[FLAG];
  const out = await run({});
  assert.equal(out.prompt_cache_key, undefined);
});

test("is off by default: the Chat target keeps its prefix-hash key", async () => {
  delete process.env[FLAG];
  const out = await run({ targetFormat: FORMATS.OPENAI });
  assert.match(String(out.prompt_cache_key), /^omni-[0-9a-f]{32}$/);
});

test("ignores a header that is not a UUID", async () => {
  const out = await run({}, { "X-Claude-Code-Session-Id": "not-a-session" });
  assert.equal(out.prompt_cache_key, undefined);
});

test("sends nothing without a Claude Code session header", async () => {
  const out = await run({}, null);
  assert.equal(out.prompt_cache_key, undefined);
});

test("leaves providers that reject the field alone", async () => {
  const out = await run({ provider: "nvidia" });
  assert.equal(out.prompt_cache_key, undefined);
});

test("leaves the Codex provider to its own session handling", async () => {
  const out = await run({ provider: "codex" });
  assert.equal(out.prompt_cache_key, undefined);
});

test("does not add the field to non-OpenAI target formats", async () => {
  const out = await run({ provider: "claude", targetFormat: FORMATS.CLAUDE });
  assert.equal(out.prompt_cache_key, undefined);
});
