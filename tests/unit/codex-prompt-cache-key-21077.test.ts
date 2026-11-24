/**
 * Regression tests for #21077: Codex `body.prompt_cache_key` must not fall back
 * to the account-wide `workspaceId` for header-identified clients (Claude Code,
 * OpenCode, x-session-id), Anthropic metadata.user_id clients, or standard
 * OpenAI Chat Completions clients without session headers.
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  CodexExecutor,
  __setCodexWebSocketTransportForTesting,
} from "../../open-sse/executors/codex.ts";
import {
  CODEX_METADATA_CACHE_SESSION_HEADER,
  deriveCodexConversationCacheKey,
  extractClaudeMetadataSessionId,
  resolveCodexPromptCacheKey,
} from "../../open-sse/executors/codex/promptCacheKey.ts";
import { withCodexFingerprintCredentials } from "../../open-sse/config/codexIdentity.ts";
import { buildExecutorClientHeaders } from "../../open-sse/handlers/chatCore/executorClientHeaders.ts";

const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const WORKSPACE_ID = "f8bcab59-0000-4000-8000-000000000001";

async function captureCodexHttp(options: {
  body: Record<string, unknown>;
  clientHeaders?: Record<string, string>;
  credentials?: Record<string, unknown>;
  model?: string;
}) {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let capturedHeaders = new Headers();
  let capturedBody: Record<string, unknown> = {};

  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers as HeadersInit);
    capturedBody = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ id: "resp_21077", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: options.model ?? "gpt-5.6-terra",
      body: options.body,
      stream: true,
      clientHeaders: options.clientHeaders,
      credentials: {
        accessToken: "synthetic-codex-token",
        connectionId: "conn-21077-a",
        providerSpecificData: { workspaceId: WORKSPACE_ID },
        ...(options.credentials || {}),
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  return { headers: capturedHeaders, body: capturedBody };
}

for (const headerName of [
  "x-claude-code-session-id",
  "x-opencode-session-id",
  "x-session-id",
  "x-session-affinity",
  "session-id",
  "session_id",
]) {
  test(`CodexExecutor.execute uses ${headerName} for prompt_cache_key instead of workspaceId`, async () => {
    const sessionUuid = "019a0000-1111-4222-8333-444444444444";
    const { body } = await captureCodexHttp({
      body: {
        model: "gpt-5.6-terra",
        input: [{ role: "user", content: "hello" }],
      },
      clientHeaders: { [headerName]: sessionUuid },
    });
    assert.equal(body.prompt_cache_key, sessionUuid);
    assert.notEqual(body.prompt_cache_key, WORKSPACE_ID);
  });
}

test("OpenCode's canonical session header isolates cache without fabricating native Codex identity", async () => {
  const sessionUuid = "019a0000-1111-4222-8333-999999999999";
  const { headers, body } = await captureCodexHttp({
    body: { model: "gpt-5.6-terra", input: [] },
    clientHeaders: { "x-opencode-session": sessionUuid },
  });
  assert.equal(body.prompt_cache_key, sessionUuid);
  assert.notEqual(body.prompt_cache_key, WORKSPACE_ID);
  assert.equal(headers.get("thread-id"), null);
  assert.equal(headers.get("x-codex-turn-metadata"), null);
});

test("header-only session propagates to prompt_cache_key in all fingerprint modes and API-key mode", async () => {
  const sessionUuid = "019a0000-1111-4222-8333-555555555555";
  for (const mode of ["off", "device", "session", "full"] as const) {
    const { body } = await captureCodexHttp({
      body: { model: "gpt-5.6-terra", input: [{ role: "user", content: "hi" }] },
      clientHeaders: { "x-claude-code-session-id": sessionUuid },
      credentials: {
        accessToken: "synthetic-codex-token",
        connectionId: "conn-modes",
        providerSpecificData: { workspaceId: WORKSPACE_ID, codexFingerprintMode: mode },
      },
    });
    assert.equal(body.prompt_cache_key, sessionUuid, `mode=${mode}`);
  }

  // API-key credentials (no OAuth token)
  const { body: apiKeyBody } = await captureCodexHttp({
    body: { model: "gpt-5.6-terra", input: [{ role: "user", content: "hi" }] },
    clientHeaders: { "x-claude-code-session-id": sessionUuid },
    credentials: {
      accessToken: undefined,
      apiKey: "sk-synthetic",
      connectionId: "conn-apikey",
      providerSpecificData: { workspaceId: WORKSPACE_ID },
    },
  });
  assert.equal(apiKeyBody.prompt_cache_key, sessionUuid);
});

test("codexPromptCacheKeyScope=thread aligns header-only session prompt_cache_key with converged thread-id", async () => {
  const sessionUuid = "019a0000-1111-4222-8333-666666666666";
  const { headers, body } = await captureCodexHttp({
    body: { model: "gpt-5.6-terra", input: [{ role: "user", content: "hi" }] },
    clientHeaders: { "x-claude-code-session-id": sessionUuid },
    credentials: {
      accessToken: "synthetic-codex-token",
      connectionId: "conn-thread-scope",
      providerSpecificData: {
        workspaceId: WORKSPACE_ID,
        codexPromptCacheKeyScope: "thread",
      },
    },
  });
  const metadata = (body.client_metadata as Record<string, unknown>) || {};
  assert.notEqual(body.prompt_cache_key, sessionUuid);
  assert.notEqual(body.prompt_cache_key, WORKSPACE_ID);
  assert.equal(body.prompt_cache_key, headers.get("thread-id"));
  assert.equal(body.prompt_cache_key, metadata.thread_id);
});

test("direct withCodexFingerprintCredentials + transformRequest honors header session without body.prompt_cache_key", () => {
  const executor = new CodexExecutor();
  const sessionUuid = "019a0000-1111-4222-8333-777777777777";
  const creds = Object.freeze({
    accessToken: "synthetic-codex-token",
    connectionId: "conn-direct",
    providerSpecificData: Object.freeze({ workspaceId: WORKSPACE_ID }),
  });
  const wrapped = withCodexFingerprintCredentials(
    creds,
    { "x-claude-code-session-id": sessionUuid },
    { model: "gpt-5.5", input: [{ role: "user", content: "hi" }] }
  );
  const transformed = executor.transformRequest(
    "gpt-5.5",
    { model: "gpt-5.5", input: [{ role: "user", content: "hi" }] },
    true,
    wrapped
  );
  assert.equal(transformed.prompt_cache_key, sessionUuid);
});

test("WebSocket transport uses header session for prompt_cache_key instead of workspaceId", async () => {
  const executor = new CodexExecutor();
  const sessionUuid = "019a0000-1111-4222-8333-888888888888";
  let sentPayload: string | null = null;
  __setCodexWebSocketTransportForTesting(async () => ({
    send(data: string) {
      sentPayload = data;
      queueMicrotask(() => {
        this.onmessage?.({
          data: JSON.stringify({ type: "response.completed", response: { status: "completed" } }),
        });
      });
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  }));

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: [{ role: "user", content: "hello ws" }] },
      stream: true,
      clientHeaders: { "x-claude-code-session-id": sessionUuid },
      credentials: {
        accessToken: "synthetic-codex-token",
        connectionId: "conn-ws",
        providerSpecificData: { workspaceId: WORKSPACE_ID, codexTransport: "websocket" },
      },
    });
    await result.response.text();
  } finally {
    __setCodexWebSocketTransportForTesting(undefined);
  }

  assert.ok(sentPayload);
  const parsed = JSON.parse(sentPayload as string) as Record<string, unknown>;
  assert.equal(parsed.prompt_cache_key, sessionUuid);
});

test("buildExecutorClientHeaders preserves Anthropic metadata.user_id.session_id for Codex without spoofing or fabricating identity headers", async () => {
  const claudeSession = "cc-sess-21077-uuid";
  const rawBody = {
    model: "claude-opus-4-6",
    metadata: {
      user_id: JSON.stringify({
        device_id: "dev-1",
        account_uuid: "acct-1",
        session_id: claudeSession,
      }),
    },
    messages: [{ role: "user", content: "hi" }],
  };

  // Spoofed internal header is stripped when no metadata is present
  assert.equal(
    buildExecutorClientHeaders(
      { [CODEX_METADATA_CACHE_SESSION_HEADER]: "spoofed-session" },
      undefined,
      { provider: "codex", body: { messages: [] } }
    ),
    null
  );

  // Other providers do not get the internal Codex header
  assert.equal(
    buildExecutorClientHeaders({}, undefined, { provider: "openai", body: rawBody }),
    null
  );

  // Codex captures the validated metadata session into the internal carrier
  const normalizedHeaders = buildExecutorClientHeaders({}, undefined, {
    provider: "codex",
    body: rawBody,
  });
  assert.equal(normalizedHeaders?.[CODEX_METADATA_CACHE_SESSION_HEADER], claudeSession);

  // Outbound Codex request uses it for prompt_cache_key without leaking internal header
  // or fabricating Codex CLI session/thread/turn identity headers
  const { headers, body } = await captureCodexHttp({
    body: { model: "gpt-5.6-terra", input: [{ role: "user", content: "hi" }] },
    clientHeaders: normalizedHeaders || undefined,
  });
  assert.equal(body.prompt_cache_key, claudeSession);
  assert.equal(headers.get(CODEX_METADATA_CACHE_SESSION_HEADER), null);
  assert.equal(headers.get("thread-id"), null);
  assert.equal(headers.get("x-codex-turn-metadata"), null);
});

test("extractClaudeMetadataSessionId rejects malformed, oversized, or account-only values", () => {
  assert.equal(extractClaudeMetadataSessionId({ metadata: { user_id: "plain-account-id" } }), null);
  assert.equal(extractClaudeMetadataSessionId({ metadata: { user_id: "{bad-json" } }), null);
  assert.equal(
    extractClaudeMetadataSessionId({
      metadata: { user_id: JSON.stringify({ account_uuid: "acct-only" }) },
    }),
    null
  );
  assert.equal(
    extractClaudeMetadataSessionId({
      metadata: { user_id: JSON.stringify({ session_id: "bad/session" }) },
    }),
    null
  );
  assert.equal(extractClaudeMetadataSessionId({ metadata: { user_id: "x".repeat(5000) } }), null);
});

test("non-header Chat Completions conversations get stable per-conversation UUIDv4 keys and never collapse onto workspaceId", async () => {
  const sharedSystem = "You are a helpful coding assistant with access to repository tools.";
  const sharedTools = [
    { type: "function", function: { name: "read_file", parameters: { type: "object" } } },
  ];

  // Conversation A, Turn 1
  const turn1 = await captureCodexHttp({
    body: {
      model: "gpt-5.6-terra",
      messages: [
        { role: "system", content: sharedSystem },
        { role: "user", content: "Investigate cache misses in repo A" },
      ],
      tools: sharedTools,
    },
  });

  // Conversation A, Turn 2 (appended assistant + follow-up user turn)
  const turn2 = await captureCodexHttp({
    body: {
      model: "gpt-5.6-terra",
      messages: [
        { role: "system", content: sharedSystem },
        { role: "user", content: "Investigate cache misses in repo A" },
        { role: "assistant", content: "Let me check the logs." },
        { role: "user", content: "Now inspect codex.ts" },
      ],
      tools: sharedTools,
    },
  });

  // Conversation B (same system prompt & tools, different first user prompt)
  const convB = await captureCodexHttp({
    body: {
      model: "gpt-5.6-terra",
      messages: [
        { role: "system", content: sharedSystem },
        { role: "user", content: "Review pull request #42 in repo B" },
      ],
      tools: sharedTools,
    },
  });

  // Same Conversation A on a different Codex account
  const convAOtherAccount = await captureCodexHttp({
    body: {
      model: "gpt-5.6-terra",
      messages: [
        { role: "system", content: sharedSystem },
        { role: "user", content: "Investigate cache misses in repo A" },
      ],
      tools: sharedTools,
    },
    credentials: {
      accessToken: "synthetic-codex-token-b",
      connectionId: "conn-21077-b",
      providerSpecificData: { workspaceId: "ws-account-b" },
    },
  });

  assert.match(String(turn1.body.prompt_cache_key), UUID_V4_RE);
  assert.notEqual(turn1.body.prompt_cache_key, WORKSPACE_ID);
  assert.equal(
    turn2.body.prompt_cache_key,
    turn1.body.prompt_cache_key,
    "multi-turn conversation must keep the exact same prompt_cache_key"
  );
  assert.notEqual(
    convB.body.prompt_cache_key,
    turn1.body.prompt_cache_key,
    "concurrent conversations with shared system prompt must get distinct cache keys"
  );
  assert.notEqual(
    convAOtherAccount.body.prompt_cache_key,
    turn1.body.prompt_cache_key,
    "derived cache key must be scoped per account"
  );

  // Safety guard: no fabricated Codex CLI session/thread/turn headers for non-Codex clients
  assert.equal(turn1.headers.get("session_id"), null);
  assert.equal(turn1.headers.get("thread-id"), null);
  assert.equal(turn1.headers.get("x-codex-turn-metadata"), null);
});

test("empty/stateless bodies still fall back to workspaceId as a last resort", () => {
  const creds = { providerSpecificData: { workspaceId: WORKSPACE_ID } };
  assert.equal(deriveCodexConversationCacheKey({ model: "gpt-5.5", input: [] }, creds), null);
  assert.equal(resolveCodexPromptCacheKey(creds, { model: "gpt-5.5", input: [] }), WORKSPACE_ID);

  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.5",
    { model: "gpt-5.5", input: [] },
    true,
    creds
  );
  assert.equal(transformed.prompt_cache_key, WORKSPACE_ID);
});

test("derived keys differ for first prompts sharing the bounded 4096-char anchor prefix", () => {
  const creds = { providerSpecificData: { workspaceId: WORKSPACE_ID } };
  const sharedPrefix = "a".repeat(4096);
  const bodyFor = (suffix: string) => ({
    model: "gpt-5.5",
    messages: [{ role: "user", content: sharedPrefix + suffix }],
  });

  const keyA = deriveCodexConversationCacheKey(bodyFor("X"), creds);
  const keyB = deriveCodexConversationCacheKey(bodyFor("Y"), creds);
  assert.notEqual(keyA, keyB, "distinct long prompts sharing a 4096-char prefix must not collide");
  assert.equal(
    deriveCodexConversationCacheKey(bodyFor("X"), creds),
    keyA,
    "the same complete first prompt must keep a stable key"
  );
});

test("derived keys differ for same-text first turns with different image parts", () => {
  const creds = { providerSpecificData: { workspaceId: WORKSPACE_ID } };
  const bodyFor = (imageUrl: string) => ({
    model: "gpt-5.5",
    messages: [
      {
        role: "user",
        content: [
          { type: "input_image", image_url: imageUrl },
          { type: "input_text", text: "Compare these two screenshots." },
        ],
      },
    ],
  });

  const keyA = deriveCodexConversationCacheKey(bodyFor("https://example.test/a.png"), creds);
  const keyB = deriveCodexConversationCacheKey(bodyFor("https://example.test/b.png"), creds);
  assert.notEqual(keyA, keyB, "same text with different first-turn images must not collide");
  assert.equal(
    deriveCodexConversationCacheKey(bodyFor("https://example.test/a.png"), creds),
    keyA,
    "the same image-bearing first prompt must keep a stable key"
  );
});
