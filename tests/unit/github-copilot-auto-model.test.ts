import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-copilot-auto-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const TEST_PLUGINS_DIR = path.join(TEST_ROOT, "plugins");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_PLUGINS_DIR = process.env.OMNIROUTE_PLUGINS_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
fs.mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { clearPendingRequests } = await import("../../src/lib/usage/usageHistory.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");
const { GITHUB_COPILOT_STATIC_FALLBACK_MODELS } =
  await import("../../open-sse/services/githubCopilotModels.ts");
const { resolveCopilotAuto } = await import("../../open-sse/handlers/chatCore/copilotAutoModel.ts");
const {
  COPILOT_AUTO_API_VERSION,
  COPILOT_AUTO_REFRESH_WINDOW_MS,
  CopilotAutoSessionCache,
  copilotAutoSessions,
  extractAutoPrompt,
  hasAutoImageInput,
  parseAutoDecision,
} = await import("../../open-sse/executors/github/autoModel.ts");

type Captured = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: Record<string, unknown> | null;
};

const originalFetch = globalThis.fetch;
const AUTO_URL = "https://api.githubcopilot.com/auto";
const IMAGE_PART = { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } };

function freshCredentials(overrides: Record<string, unknown> = {}) {
  return {
    accessToken: "gho-access",
    copilotToken: "copilot-live-token",
    copilotTokenExpiresAt: Math.floor(Date.now() / 1000) + 3600,
    connectionId: "conn-auto-1",
    providerSpecificData: {},
    ...overrides,
  };
}

function autoDecision(model: string, vision = false, sessionToken = `session-${model}`) {
  return new Response(
    JSON.stringify({
      selected_model: { id: model, capabilities: { supports: { vision } } },
      session_token: sessionToken,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function toPlainHeaders(headers: HeadersInit | undefined): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers as Record<string, unknown>).map(([k, v]) => [k, String(v)])
  );
}

function mockFetch(respond: (call: Captured, calls: Captured[]) => Response) {
  const calls: Captured[] = [];
  globalThis.fetch = (async (url: string | URL, init: RequestInit = {}) => {
    const call: Captured = {
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(call);
    return respond(call, calls);
  }) as typeof fetch;
  return calls;
}

function headerValue(headers: Record<string, string>, name: string): string | undefined {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : undefined;
}

const noopLog = { debug() {}, info() {}, warn() {}, error() {} };

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  copilotAutoSessions.clear();
  clearPendingRequests();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_PLUGINS_DIR === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = ORIGINAL_PLUGINS_DIR;
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("github registry and static fallback expose the Copilot auto model", () => {
  const auto = getModelsByProviderId("github").find((model) => model.id === "auto");
  assert.ok(auto, "github/auto must be listed");
  assert.equal(auto.supportsVision, undefined, "vision is resolved per request, never assumed");
  assert.ok(GITHUB_COPILOT_STATIC_FALLBACK_MODELS.includes("auto"));
});

test("extractAutoPrompt reads the latest user-typed text across client formats", () => {
  assert.equal(
    extractAutoPrompt({
      messages: [
        { role: "user", content: "first" },
        { role: "assistant", content: "ok" },
        { role: "user", content: "  latest question  " },
      ],
    }),
    "latest question"
  );
  assert.equal(
    extractAutoPrompt({
      messages: [{ role: "user", content: [{ type: "text", text: "a" }, IMAGE_PART] }],
    }),
    "a"
  );
  // Claude agentic loop: the last user turn only carries a tool_result.
  assert.equal(
    extractAutoPrompt({
      messages: [
        { role: "user", content: [{ type: "text", text: "refactor the parser" }] },
        { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "Read", input: {} }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "..." }] },
      ],
    }),
    "refactor the parser"
  );
  assert.equal(extractAutoPrompt({ input: "responses prompt" }), "responses prompt");
  assert.equal(
    extractAutoPrompt({
      input: [{ role: "user", content: [{ type: "input_text", text: "from items" }] }],
    }),
    "from items"
  );
  assert.equal(extractAutoPrompt({ messages: [] }), "");
});

test("hasAutoImageInput detects image parts in messages and Responses input", () => {
  assert.equal(hasAutoImageInput({ messages: [{ role: "user", content: "hi" }] }), false);
  assert.equal(hasAutoImageInput({ messages: [{ role: "user", content: [IMAGE_PART] }] }), true);
});

test("parseAutoDecision requires a model id and session token and normalizes expiry", () => {
  const now = 1_800_000_000_000;
  assert.deepEqual(
    parseAutoDecision(
      {
        selected_model: { id: "gpt-5-mini", capabilities: { supports: { vision: true } } },
        session_token: "tok",
        expires_at: 1_800_003_600,
      },
      now
    ),
    {
      model: "gpt-5-mini",
      sessionToken: "tok",
      expiresAtMs: 1_800_003_600_000,
      supportsVision: true,
    }
  );
  assert.equal(parseAutoDecision({ selected_model: { id: "x" } }, now), null);
  assert.equal(parseAutoDecision({ session_token: "tok" }, now), null);
  assert.equal(parseAutoDecision(null, now), null);
});

test("CopilotAutoSessionCache is bounded and honours the refresh window", () => {
  const now = Date.now();
  const cache = new CopilotAutoSessionCache(2);
  const decision = (model: string, ttlMs = 3_600_000) => ({
    model,
    sessionToken: model,
    expiresAtMs: now + ttlMs,
    supportsVision: false,
  });
  cache.set("a", decision("a"), now);
  cache.set("b", decision("b"), now);
  cache.set("c", decision("c"), now);
  assert.equal(cache.size, 2, "oldest entry evicted past the bound");
  assert.equal(cache.getUsable("a", false, now), null);
  assert.equal(cache.getUsable("c", false, now)?.model, "c");
  assert.equal(cache.getUsable("c", true, now), null, "image turn re-resolves a non-vision pick");
  cache.set("near", decision("near", COPILOT_AUTO_REFRESH_WINDOW_MS - 1), now);
  assert.equal(cache.getUsable("near", false, now), null, "inside refresh window → re-resolve");
});

test("resolveAutoModel POSTs the prompt to /auto and caches the decision per session", async () => {
  const calls = mockFetch((call) =>
    call.url === AUTO_URL ? autoDecision("gpt-5-mini") : new Response("unexpected", { status: 500 })
  );
  const executor = new GithubExecutor();
  const body = { messages: [{ role: "user", content: "pick a model for me" }] };

  const first = await executor.resolveAutoModel({
    body,
    credentials: freshCredentials(),
    sessionKey: "conversation-1",
  });
  assert.equal(first.ok, true);
  assert.equal(first.ok && first.decision.model, "gpt-5-mini");
  assert.equal(first.ok && first.decision.sessionToken, "session-gpt-5-mini");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, AUTO_URL);
  assert.equal(calls[0].method, "POST");
  assert.deepEqual(calls[0].body, { prompt: "pick a model for me" });
  assert.equal(headerValue(calls[0].headers, "x-github-api-version"), COPILOT_AUTO_API_VERSION);
  assert.equal(headerValue(calls[0].headers, "authorization"), "Bearer copilot-live-token");

  const second = await executor.resolveAutoModel({
    body,
    credentials: freshCredentials(),
    sessionKey: "conversation-1",
  });
  assert.equal(second.ok && second.cached, true);
  assert.equal(calls.length, 1, "same account + session reuses the cached decision");

  await executor.resolveAutoModel({
    body,
    credentials: freshCredentials(),
    sessionKey: "conversation-2",
  });
  assert.equal(calls.length, 2, "another conversation resolves on its own");
});

test("resolveAutoModel re-resolves with has_image when the cached pick lacks vision", async () => {
  let n = 0;
  const calls = mockFetch(() =>
    n++ === 0 ? autoDecision("o3-mini") : autoDecision("gpt-5", true)
  );
  const executor = new GithubExecutor();
  const credentials = freshCredentials();
  await executor.resolveAutoModel({
    body: { messages: [{ role: "user", content: "text only" }] },
    credentials,
    sessionKey: "s",
  });
  const withImage = await executor.resolveAutoModel({
    body: {
      messages: [{ role: "user", content: [{ type: "text", text: "describe" }, IMAGE_PART] }],
    },
    credentials,
    sessionKey: "s",
  });
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[1].body, { prompt: "describe", has_image: true });
  assert.equal(withImage.ok && withImage.decision.model, "gpt-5");
});

test("buildHeaders sends Copilot-Session-Token on the auto API version only when present", () => {
  const executor = new GithubExecutor();
  const plain = executor.buildHeaders(freshCredentials(), true, null, "gpt-5-mini");
  assert.equal(plain["Copilot-Session-Token"], undefined);

  const auto = executor.buildHeaders(
    freshCredentials({ copilotSessionToken: "sess-123" }),
    true,
    null,
    "gpt-5-mini"
  );
  assert.equal(auto["Copilot-Session-Token"], "sess-123");
  assert.equal(auto["x-github-api-version"], COPILOT_AUTO_API_VERSION);
});

test("resolveCopilotAuto leaves non-auto and non-github requests untouched", async () => {
  const calls = mockFetch(() => new Response("{}", { status: 200 }));
  const credentials = freshCredentials();
  const viaGithub = await resolveCopilotAuto("github", "gpt-5-mini", {}, credentials);
  assert.equal(viaGithub.model, "gpt-5-mini");
  assert.equal(viaGithub.credentials, credentials);
  const ghe = await resolveCopilotAuto("ghe-copilot", "auto", {}, credentials);
  assert.equal(ghe.model, "auto", "ghe-copilot does not opt into auto");
  assert.equal(calls.length, 0);
});

test("resolveCopilotAuto swaps model, body and a credentials copy without mutating input", async () => {
  mockFetch(() => autoDecision("claude-sonnet-5"));
  const credentials = freshCredentials();
  const body: Record<string, unknown> = {
    model: "github/auto",
    messages: [{ role: "user", content: "hello" }],
  };
  const outcome = await resolveCopilotAuto("github", "auto", body, credentials, "sess");
  assert.equal(outcome.errorResult, undefined);
  assert.equal(outcome.model, "claude-sonnet-5");
  assert.equal(body.model, "claude-sonnet-5");
  assert.equal(outcome.credentials.copilotSessionToken, "session-claude-sonnet-5");
  assert.equal(
    (credentials as Record<string, unknown>).copilotSessionToken,
    undefined,
    "the caller's credentials object must not carry the per-request token"
  );
});

test("resolveCopilotAuto surfaces an /auto 4xx as a sanitized error result", async () => {
  mockFetch(
    () =>
      new Response(JSON.stringify({ error: { message: "auto is not enabled" } }), { status: 403 })
  );
  const outcome = await resolveCopilotAuto(
    "github",
    "auto",
    { messages: [{ role: "user", content: "x" }] },
    freshCredentials()
  );
  assert.ok(outcome.errorResult);
  assert.equal(outcome.errorResult.status, 403);
  assert.equal(outcome.model, "auto");
  const payload = await outcome.errorResult.response.json();
  assert.match(payload.error.message, /auto model selection failed \(403\)/);
  assert.ok(!payload.error.message.includes("at /"), "no stack trace in the error body");
});

test("resolveCopilotAuto mints a fresh Copilot token for /auto when the stored one is stale", async () => {
  const calls = mockFetch((call) => {
    if (call.url.startsWith("https://api.github.com/copilot_internal/v2/token")) {
      return new Response(
        JSON.stringify({
          token: "copilot-minted",
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        }),
        { status: 200 }
      );
    }
    return autoDecision("gpt-5-mini");
  });
  const stale = freshCredentials({ copilotToken: undefined, copilotTokenExpiresAt: undefined });
  const outcome = await resolveCopilotAuto(
    "github",
    "auto",
    { messages: [{ role: "user", content: "x" }] },
    stale
  );
  assert.equal(outcome.model, "gpt-5-mini");
  // The minted token is only used for /auto: the request credentials stay stale so
  // BaseExecutor.execute() runs its own refresh and persists the token as before.
  assert.equal(outcome.credentials.copilotToken, undefined);
  assert.equal(outcome.credentials.copilotSessionToken, "session-gpt-5-mini");
  const autoCall = calls.find((call) => call.url === AUTO_URL);
  assert.equal(headerValue(autoCall?.headers || {}, "authorization"), "Bearer copilot-minted");
});

async function runChatCore(body: Record<string, unknown>, respond: (call: Captured) => Response) {
  const calls = mockFetch(respond);
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "github", model: "auto", extendedContext: false },
    credentials: freshCredentials(),
    log: noopLog,
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    connectionId: "conn-auto-1",
    userAgent: "unit-test",
    sessionAffinityKey: "chatcore-session",
  } as unknown as Parameters<typeof handleChatCore>[0]);
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  return { calls, result };
}

test("chatCore routes github/auto to the selected model and records usage under it", async () => {
  const { calls, result } = await runChatCore(
    {
      model: "github/auto",
      stream: false,
      messages: [{ role: "user", content: "which model am I talking to?" }],
    },
    (call) => {
      if (call.url === AUTO_URL) return autoDecision("gpt-5-mini");
      return new Response(
        JSON.stringify({
          id: "chatcmpl-auto",
          object: "chat.completion",
          model: "gpt-5-mini",
          choices: [
            { index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" },
          ],
          usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  );
  assert.equal(result.success, true);
  assert.equal(calls[0].url, AUTO_URL);
  const chat = calls.find((call) => call.url.endsWith("/chat/completions"));
  assert.ok(chat, "chat request must follow the /auto decision");
  assert.equal(chat.body?.model, "gpt-5-mini");
  assert.equal(headerValue(chat.headers, "copilot-session-token"), "session-gpt-5-mini");

  // Call-log writes are fire-and-forget; poll (30s ceiling) so a loaded CI worker
  // does not race the assertion. Green runs return on the first saved row.
  let log: Awaited<ReturnType<typeof getCallLogById>> | null = null;
  for (const startedAt = Date.now(); !log && Date.now() - startedAt < 30_000;) {
    await waitForCallLogSaves(5000);
    const rows = await getCallLogs({ limit: 5 });
    log = rows.length > 0 ? await getCallLogById(rows[0].id) : null;
    if (!log) await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(log, "the request must be persisted in call logs");
  assert.equal(log.model, "gpt-5-mini", "usage is attributed to the model that served it");
  assert.match(String(log.requestedModel), /auto/, "the client's requested model stays auto");
});

test("chatCore sends a Claude auto pick through Copilot's /v1/messages shim in Anthropic shape", async () => {
  const { calls, result } = await runChatCore(
    {
      model: "github/auto",
      stream: false,
      messages: [{ role: "user", content: "write a haiku" }],
    },
    (call) => {
      if (call.url === AUTO_URL) return autoDecision("claude-sonnet-5", true);
      return new Response(
        JSON.stringify({
          id: "msg_auto",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-5",
          content: [{ type: "text", text: "ok" }],
          stop_reason: "end_turn",
          usage: { input_tokens: 5, output_tokens: 1 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
  );
  assert.equal(result.success, true);
  const upstream = calls.find((call) => call.url !== AUTO_URL);
  assert.equal(upstream?.url, "https://api.githubcopilot.com/v1/messages");
  assert.equal(upstream?.body?.model, "claude-sonnet-5");
  assert.ok(Array.isArray(upstream?.body?.messages));
  assert.equal(
    headerValue(upstream?.headers || {}, "copilot-session-token"),
    "session-claude-sonnet-5"
  );
});
