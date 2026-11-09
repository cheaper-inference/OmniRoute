import test from "node:test";
import assert from "node:assert/strict";

// Claude Code reaches Codex through the Claude -> Responses translator, which drops the body
// metadata. The only per-session signal left is the `x-claude-code-session-id` header. Without
// it every Claude Code conversation on an account carried the account-wide workspaceId as
// prompt_cache_key, so all of them shared one cache partition.

const CLAUDE_SESSION_A = "7c1b2c52-3f7e-4e43-9d0c-1f5f3a2a9a01";
const CLAUDE_SESSION_B = "0d5e8b64-6a1f-4c1e-8a57-5b2c9f1d7e02";
const WORKSPACE = "ws-account-wide";

async function captureUpstream(options: {
  clientHeaders?: Record<string, string> | null;
  body?: Record<string, unknown>;
}) {
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let body: Record<string, unknown> = {};
  globalThis.fetch = async (_url, init) => {
    body = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ id: "resp-cache-key", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }], ...options.body },
      stream: true,
      clientHeaders: options.clientHeaders ?? null,
      credentials: {
        accessToken: "codex-token",
        connectionId: "conn-claude-cache-key",
        providerSpecificData: { workspaceId: WORKSPACE },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  return body;
}

test("a Claude Code session id becomes the prompt_cache_key", async () => {
  const body = await captureUpstream({
    clientHeaders: { "x-claude-code-session-id": CLAUDE_SESSION_A },
  });
  assert.equal(body.prompt_cache_key, CLAUDE_SESSION_A);
});

test("two Claude Code sessions on one account get different cache keys", async () => {
  const a = await captureUpstream({
    clientHeaders: { "X-Claude-Code-Session-Id": CLAUDE_SESSION_A },
  });
  const b = await captureUpstream({
    clientHeaders: { "X-Claude-Code-Session-Id": CLAUDE_SESSION_B },
  });
  assert.notEqual(a.prompt_cache_key, b.prompt_cache_key);
  assert.notEqual(a.prompt_cache_key, WORKSPACE);
});

test("a prompt_cache_key the caller set is kept", async () => {
  const body = await captureUpstream({
    clientHeaders: { "x-claude-code-session-id": CLAUDE_SESSION_A },
    body: { prompt_cache_key: "caller-chosen-key" },
  });
  assert.equal(body.prompt_cache_key, "caller-chosen-key");
});

test("without a session header the account-wide fallback is unchanged", async () => {
  const body = await captureUpstream({ clientHeaders: { "user-agent": "claude-cli/2.1.0" } });
  assert.equal(body.prompt_cache_key, WORKSPACE);
});

test("an unsafe session id is not used as a cache key", async () => {
  const body = await captureUpstream({
    clientHeaders: { "x-claude-code-session-id": "bad id with spaces\nand newline" },
  });
  assert.equal(body.prompt_cache_key, WORKSPACE);
});
