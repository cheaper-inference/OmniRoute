import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "omni-fallback-16406-"));
const previousDataDir = process.env.DATA_DIR;
const previousApiKeySecret = process.env.API_KEY_SECRET;
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "fallback-16406-test-secret-only";
const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;
const requested = "claude-opus-5-5";

test.after(async () => {
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  assert.equal(await waitForCallLogSaves(10_000), true);
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  if (previousApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = previousApiKeySecret;
  rmSync(directory, { recursive: true, force: true });
});

function anthropicSuccess(model: string, stream: boolean): Response {
  const message = {
    id: "msg-fixture",
    type: "message",
    role: "assistant",
    model,
    content: [{ type: "text", text: "OK" }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 2, output_tokens: 1 },
  };
  if (!stream) return Response.json(message);
  const events = [
    { type: "message_start", message: { ...message, content: [], stop_reason: null } },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "OK" } },
    { type: "content_block_stop", index: 0 },
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 1 },
    },
    { type: "message_stop" },
  ];
  return new Response(
    events.map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`).join(""),
    {
      headers: { "content-type": "text/event-stream" },
    }
  );
}

async function request(
  stream: boolean,
  optIn: boolean,
  key?: { key: string; id: string },
  identity?: { bearer: string; scopeId?: string }
) {
  const sent: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const outbound = JSON.parse(String(init?.body)) as { model: string; stream?: boolean };
    sent.push(outbound.model);
    assert.equal(
      new Headers(init?.headers).get("x-omniroute-allow-cross-version-fallback"),
      null,
      "internal policy header must not reach upstream"
    );
    if (outbound.model === requested) {
      return Response.json(
        { type: "error", error: { type: "not_found_error", message: `model: ${requested}` } },
        { status: 404 }
      );
    }
    return anthropicSuccess(outbound.model, outbound.stream === true);
  };
  const body = {
    model: `anthropic/${requested}`,
    stream,
    messages: [{ role: "user", content: "Reply OK" }],
    max_tokens: 8,
  };
  const headers = new Headers({ accept: stream ? "text/event-stream" : "application/json" });
  if (optIn) headers.set("x-omniroute-allow-cross-version-fallback", "true");
  if (key) headers.set("authorization", `Bearer ${key.key}`);
  if (identity) headers.set("authorization", `Bearer ${identity.bearer}`);
  if (identity?.scopeId) headers.set("x-omniroute-self-loop-key-id", identity.scopeId);
  const result = await handleChatCore({
    apiKeyInfo: key ? { id: key.id } : undefined,
    body,
    modelInfo: { provider: "anthropic", model: requested },
    credentials: {
      apiKey: "fixture-key",
      connectionId: "policy-fixture",
      providerSpecificData: {},
    },
    connectionId: "policy-fixture",
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: { endpoint: "/v1/chat/completions", body, headers },
    userAgent: "unit-test",
  });
  return { result, sent, text: await result.response.text() };
}

for (const stream of [false, true]) {
  test(`stream=${stream}: default does not silently dispatch another model version`, async () => {
    const { result, sent } = await request(stream, false);
    assert.equal(result.success, false, JSON.stringify({ sent, status: result.status }));
    assert.ok(sent.length > 0);
    assert.ok(
      sent.every((model) => model === requested),
      JSON.stringify(sent)
    );
  });
  test(`stream=${stream}: opted-in fallback reports the actual dispatched model`, async () => {
    const { result, sent, text } = await request(stream, true);
    assert.equal(result.success, true, JSON.stringify({ sent, status: result.status, text }));
    assert.notEqual(sent.at(-1), requested, JSON.stringify(sent));
    assert.equal(result.response.headers.get("x-omniroute-model"), sent.at(-1));
    if (!stream) assert.equal(JSON.parse(text).model, sent.at(-1));
    else assert.ok(text.includes(`"model":"${sent.at(-1)}"`), text);
  });
}

for (const stream of [false, true]) {
  test(`stream=${stream}: opt-in cannot authorize a model denied to the API key`, async () => {
    const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
    const key = await createApiKey("fallback restriction fixture", "fixture-machine", [], {
      modelAccessMode: "restricted",
      allowedModels: [`anthropic/${requested}`],
    });
    const { result, sent } = await request(stream, true, key);
    assert.equal(result.success, false);
    assert.ok(sent.length > 0);
    assert.ok(
      sent.every((model) => model === requested),
      JSON.stringify(sent)
    );
  });
}

for (const stream of [false, true]) {
  test(`stream=${stream}: an authorized API key can opt into the fallback model`, async () => {
    const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
    const key = await createApiKey("fallback permitted fixture", "fixture-machine", [], {
      modelAccessMode: "restricted",
      allowedModels: [`anthropic/${requested}`, "anthropic/claude-opus-5"],
    });
    const { result, sent } = await request(stream, true, key);
    assert.equal(result.success, true);
    assert.equal(sent.at(-1), "claude-opus-5");
    assert.equal(result.response.headers.get("x-omniroute-model"), "claude-opus-5");
  });
}

test("API-key metadata without a resolvable credential cannot authorize a fallback", async () => {
  const { getNextRequestFamilyFallback } =
    await import("../../open-sse/services/modelFamilyFallbackPolicy.ts");
  assert.equal(
    await getNextRequestFamilyFallback(requested, new Set([requested]), "anthropic", {
      headers: { "x-omniroute-allow-cross-version-fallback": "true" },
      hasApiKeyMetadata: true,
    }),
    null
  );
});

test("the opt-in header is allowed by both browser preflight surfaces", async () => {
  const app = await import("../../src/shared/utils/cors.ts");
  const engine = await import("../../open-sse/utils/cors.ts");
  for (const headers of [app.CORS_HEADERS, engine.CORS_HEADERS]) {
    assert.ok(
      headers["Access-Control-Allow-Headers"]
        .toLowerCase()
        .includes("x-omniroute-allow-cross-version-fallback")
    );
  }
});

test("opt-in composes API-key grants with hidden models and active-connection lockouts", async () => {
  const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
  const { setModelIsHidden } = await import("../../src/lib/db/models.ts");
  const { lockExactModel, clearAllModelLockouts } =
    await import("../../open-sse/services/accountFallback.ts");
  const key = await createApiKey("combined fallback eligibility fixture", "fixture-machine", [], {
    modelAccessMode: "restricted",
    allowedModels: [
      `anthropic/${requested}`,
      "anthropic/claude-opus-5",
      "anthropic/claude-opus-4.8",
    ],
  });
  setModelIsHidden("anthropic", "claude-opus-5", true, "chat");
  lockExactModel("anthropic", "policy-fixture", "claude-opus-4.8", "rate_limit", 60_000);
  try {
    const restricted = await request(false, true, key);
    assert.equal(restricted.result.success, false);
    assert.ok(restricted.sent.every((model) => model === requested));
    const unrestricted = await request(false, true);
    assert.equal(unrestricted.result.success, true);
    assert.equal(unrestricted.sent.at(-1), "claude-sonnet-5");
  } finally {
    setModelIsHidden("anthropic", "claude-opus-5", false, "chat");
    clearAllModelLockouts();
  }
});

for (const stream of [false, true]) {
  test(`stream=${stream}: scoped self-loop fallback uses the original restricted key`, async () => {
    const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
    const { resolveSelfLoopBearer } =
      await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
    const key = await createApiKey("scoped fallback fixture", "fixture-machine", [], {
      modelAccessMode: "restricted",
      allowedModels: [`anthropic/${requested}`],
    });
    const { result, sent } = await request(stream, true, key, {
      bearer: resolveSelfLoopBearer(),
      scopeId: key.id,
    });
    assert.equal(result.success, false);
    assert.ok(sent.every((model) => model === requested));
  });
}

test("an unknown self-loop scope fails closed instead of using the internal bearer", async () => {
  const { resolveSelfLoopBearer } =
    await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
  const { getNextRequestFamilyFallback } =
    await import("../../open-sse/services/modelFamilyFallbackPolicy.ts");
  const next = await getNextRequestFamilyFallback(requested, new Set([requested]), "anthropic", {
    hasApiKeyMetadata: true,
    headers: {
      authorization: `Bearer ${resolveSelfLoopBearer()}`,
      "x-omniroute-self-loop-key-id": "missing-fixture-key",
      "x-omniroute-allow-cross-version-fallback": "true",
    },
  });
  assert.equal(next, null);
});

test("a valid unscoped self-loop retains its permitted opt-in fallback", async () => {
  const { resolveSelfLoopBearer } =
    await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
  const { getNextRequestFamilyFallback } =
    await import("../../open-sse/services/modelFamilyFallbackPolicy.ts");
  assert.equal(
    await getNextRequestFamilyFallback(requested, new Set([requested]), "anthropic", {
      hasApiKeyMetadata: true,
      headers: {
        authorization: `Bearer ${resolveSelfLoopBearer()}`,
        "x-omniroute-allow-cross-version-fallback": "true",
      },
    }),
    "claude-opus-5"
  );
});
