import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-commandcode-session-id-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { CommandCodeExecutor } = await import("../../open-sse/executors/commandCode.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;
const MODEL = "deepseek/deepseek-v4-flash";
const V4_UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

type CliCall = { headers: Record<string, string>; body: Record<string, unknown> };

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Drive one request through the 403 -> /alpha/generate fallback; return what the CLI got. */
async function cliFallbackCall(
  body: Record<string, unknown>,
  options: {
    credentials?: Record<string, unknown>;
    clientHeaders?: Record<string, string>;
  } = {}
): Promise<CliCall> {
  const cliCalls: CliCall[] = [];
  globalThis.fetch = async (url, init = {}) => {
    if (!String(url).includes("/alpha/generate")) {
      return new Response("forbidden", { status: 403 });
    }
    cliCalls.push({
      headers: init.headers as Record<string, string>,
      body: JSON.parse(String(init.body)),
    });
    const cliSse =
      'data: {"type":"text-delta","text":"ok"}\n\n' +
      'data: {"type":"finish","finishReason":"stop","usage":{"inputTokens":1,"outputTokens":1,"totalTokens":2}}\n\n';
    return new Response(cliSse, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  };

  await new CommandCodeExecutor().execute({
    model: MODEL,
    stream: false,
    credentials: options.credentials ?? { apiKey: "cc_key_a", connectionId: "conn-a" },
    clientHeaders: options.clientHeaders,
    body,
  });

  assert.equal(cliCalls.length, 1, "expected exactly one /alpha/generate call");
  return cliCalls[0];
}

function conversation(
  extraTurns: Array<Record<string, unknown>> = [],
  firstUser = "Fix the test."
) {
  return {
    messages: [
      { role: "system", content: "You are a coding agent." },
      { role: "user", content: firstUser },
      ...extraTurns,
    ],
  };
}

test("CLI fallback sends the same id as x-session-id and envelope threadId", async () => {
  const call = await cliFallbackCall(conversation());
  const sessionId = call.headers["x-session-id"];
  assert.match(sessionId, V4_UUID_RE);
  assert.equal(call.body.threadId, sessionId);
});

test("CLI fallback keeps one session id across the turns of a conversation", async () => {
  const first = await cliFallbackCall(conversation());
  const second = await cliFallbackCall(
    conversation([
      { role: "assistant", content: "Running the suite now." },
      { role: "user", content: "Any update?" },
    ])
  );
  assert.equal(second.headers["x-session-id"], first.headers["x-session-id"]);
  assert.equal(second.body.threadId, first.body.threadId);
});

test("CLI fallback gives a different first user turn a different session id", async () => {
  const a = await cliFallbackCall(conversation());
  const b = await cliFallbackCall(conversation([], "Write a changelog entry."));
  assert.notEqual(b.headers["x-session-id"], a.headers["x-session-id"]);
});

test("CLI fallback isolates the same conversation across tenants", async () => {
  const a = await cliFallbackCall(conversation(), {
    credentials: { apiKey: "cc_key_a", connectionId: "conn-a" },
  });
  const b = await cliFallbackCall(conversation(), {
    credentials: { apiKey: "cc_key_b", connectionId: "conn-b" },
  });
  assert.match(b.headers["x-session-id"], V4_UUID_RE);
  assert.notEqual(b.headers["x-session-id"], a.headers["x-session-id"]);
});

test("CLI fallback without a connection id salts by API key", async () => {
  const a = await cliFallbackCall(conversation(), { credentials: { apiKey: "cc_key_a" } });
  const again = await cliFallbackCall(conversation(), { credentials: { apiKey: "cc_key_a" } });
  const b = await cliFallbackCall(conversation(), { credentials: { apiKey: "cc_key_b" } });
  assert.equal(again.headers["x-session-id"], a.headers["x-session-id"]);
  assert.notEqual(b.headers["x-session-id"], a.headers["x-session-id"]);
});

test("CLI fallback reuses an explicit prompt_cache_key UUID verbatim", async () => {
  const key = "3F2504E0-4F89-41D3-9A0C-0305E82C3301";
  const call = await cliFallbackCall({ ...conversation(), prompt_cache_key: key });
  assert.equal(call.headers["x-session-id"], key.toLowerCase());
  assert.equal(call.body.threadId, key.toLowerCase());
});

test("CLI fallback hashes a non-UUID client session into a stable v4 UUID", async () => {
  const a = await cliFallbackCall({ ...conversation(), session_id: "codex-session-42" });
  const later = await cliFallbackCall({
    ...conversation([], "A completely different opening."),
    session_id: "codex-session-42",
  });
  assert.match(a.headers["x-session-id"], V4_UUID_RE);
  assert.notEqual(a.headers["x-session-id"], "codex-session-42");
  // The explicit session wins over the content prefix.
  assert.equal(later.headers["x-session-id"], a.headers["x-session-id"]);
});

test("CLI fallback honors a header-borne client session over the content prefix", async () => {
  const headers = { "X-Claude-Code-Session-Id": "claude-code-session-7" };
  const a = await cliFallbackCall(conversation(), { clientHeaders: headers });
  const b = await cliFallbackCall(conversation([], "Another opening."), { clientHeaders: headers });
  const unkeyed = await cliFallbackCall(conversation());
  assert.equal(b.headers["x-session-id"], a.headers["x-session-id"]);
  assert.notEqual(a.headers["x-session-id"], unkeyed.headers["x-session-id"]);
});

test("CLI fallback never sends the raw tenant key or client session upstream", async () => {
  const call = await cliFallbackCall(
    { ...conversation(), session_id: "private-session-value" },
    { credentials: { apiKey: "cc_key_secret", connectionId: "conn-secret" } }
  );
  const sent = JSON.stringify(call.body) + JSON.stringify(call.headers["x-session-id"]);
  assert.ok(!sent.includes("private-session-value"));
  assert.ok(!sent.includes("conn-secret"));
});
