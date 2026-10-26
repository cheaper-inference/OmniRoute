/**
 * Key-based OpenCode Zen/Go requests behind `OPENCODE_PUBLISHED_CATALOG_ROUTING_ENABLED`:
 * the base URL published in `models.opencode.ai/api.json`, the client's own `x-opencode-*`
 * headers, and the tool parameter schema the upstream already accepted.
 *
 * Every test reads the production paths (`execute`, `buildHeaders`, `buildUrl`,
 * `prepareFreeTierRequest`, `mergeClientToolsWithObserved`, `refreshPublishedCatalog`); the
 * catalog is seeded or an injected transport is counted, so nothing touches the network.
 * The flag is toggled through its environment variable and resolved by the real reader,
 * which the executor registers as both gates when it loads.
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import {
  FREE_TIER_INFERENCE_BASE_URL,
  mergeClientToolsWithObserved,
  noteFreeTierOutcome,
  prepareFreeTierRequest,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  _resetToolObservationForTests,
  getObservedToolNames,
  recordAcceptedToolNames,
  recordedToolParameters,
  setToolSchemaMemoryGate,
} from "../../open-sse/executors/opencodeToolObservation.ts";
import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";
import {
  configurePublishedCatalogForTests,
  getPublishedBaseUrl,
  refreshPublishedCatalog,
  resetPublishedCatalogForTests,
  setPublishedCatalogFetch,
  setPublishedCatalogRoutingGate,
} from "../../open-sse/utils/opencodePublishedCatalog.ts";
import { isOpencodePublishedCatalogRoutingEnabled } from "../../src/shared/utils/featureFlags.ts";

const FLAG = "OPENCODE_PUBLISHED_CATALOG_ROUTING_ENABLED";
const ZEN_BASE = "https://opencode.ai/zen/v1";
const PUBLISHED_BASE = "https://opencode.ai/inference/openai/v1";
const PUBLISHED_GO_BASE = "https://opencode.ai/inference/go/openai/v1";
const CHAT_MODEL = "premium-chat";
const FREE_MODEL = "nemotron-3.5-lightning-free";
const RESPONSES_MODEL = "gpt-5.6-luna";
const SESSION_A = "session-a";
const SESSION_B = "session-b";
const REQUEST_ID = "msg_0123456789abABCDEFGHIJKLMN";
const EMPTY_SCHEMA = { type: "object", properties: {} };

type FetchCall = { url: string; headers: Record<string, string> };

/** A catalog section pair shaped like `models.opencode.ai/api.json`. */
function publishedCatalog(api: unknown = PUBLISHED_BASE) {
  return {
    opencode: {
      id: "opencode",
      api,
      models: { [CHAT_MODEL]: { provider: { npm: "@ai-sdk/mistral" } } },
    },
    "opencode-go": {
      id: "opencode-go",
      api: PUBLISHED_GO_BASE,
      models: { [CHAT_MODEL]: { provider: { npm: "@ai-sdk/mistral" } } },
    },
  };
}

/** Replace `globalThis.fetch` with a 200 stub that records every dispatch. */
function stubGlobalFetch(): FetchCall[] {
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    calls.push({
      url: String(input),
      headers: { ...((init?.headers as Record<string, string> | undefined) ?? {}) },
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return calls;
}

function requestInput(model: string) {
  return {
    model,
    stream: true,
    credentials: { apiKey: "test-key" },
    body: { model, stream: true, messages: [{ role: "user", content: "hi" }] },
  };
}

function resultUrl(result: Awaited<ReturnType<OpencodeExecutor["execute"]>>): string | undefined {
  return result instanceof Response ? undefined : result.url;
}

/** A parameter object large enough to exercise the schema budget. */
function sizedSchema(chars: number) {
  return {
    type: "object",
    properties: { p: { type: "string", description: "x".repeat(chars) } },
  };
}

/** One accepted gated request carrying a single client tool, through the production path. */
function acceptClientTool(
  provider: string,
  model: string,
  session: string | undefined,
  name: string,
  parameters: Record<string, unknown>
): void {
  const prepared = prepareFreeTierRequest(
    {
      model,
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name, parameters } }],
    },
    "openai",
    "zen",
    provider,
    model,
    session
  );
  noteFreeTierOutcome(prepared.attempt, true);
}

/** The parameters a prepared body declares for `name`. */
function parametersOf(body: unknown, name: string): unknown {
  const tools = (body as { tools?: Array<Record<string, unknown>> }).tools ?? [];
  for (const tool of tools) {
    const fn = tool.function as { name?: string; parameters?: unknown } | undefined;
    if (fn?.name === name) return fn.parameters;
    if (tool.name === name) return tool.parameters;
  }
  return undefined;
}

let originalFetch: typeof fetch;

beforeEach(() => {
  delete process.env[FLAG];
  originalFetch = globalThis.fetch;
  resetPublishedCatalogForTests();
  _resetToolObservationForTests();
  setPublishedCatalogFetch(null);
  // The executor import registered the real readers; re-assert them for every test.
  setPublishedCatalogRoutingGate(isOpencodePublishedCatalogRoutingEnabled);
  setToolSchemaMemoryGate(isOpencodePublishedCatalogRoutingEnabled);
});

afterEach(() => {
  delete process.env[FLAG];
  globalThis.fetch = originalFetch;
  resetPublishedCatalogForTests();
  setPublishedCatalogFetch(null);
  _resetToolObservationForTests();
  setToolSchemaMemoryGate(null);
});

// 1. Flag off: the registry base stays and the catalog is never read.
test("flag off: a key-based request keeps the Zen base and counts no catalog read", async () => {
  const globalCalls = stubGlobalFetch();
  const catalogCalls: string[] = [];
  setPublishedCatalogFetch(async (input) => {
    catalogCalls.push(input);
    return new Response(JSON.stringify(publishedCatalog()), { status: 200 });
  });
  const result = await new OpencodeExecutor("opencode-zen").execute(requestInput(CHAT_MODEL));
  assert.equal(resultUrl(result), `${ZEN_BASE}/chat/completions`);
  assert.deepEqual(
    globalCalls.map((call) => call.url),
    [`${ZEN_BASE}/chat/completions`]
  );
  assert.deepEqual(catalogCalls, []);
});

// 2. Flag on: the published base decides, at the same path as before.
test("flag on: a key-based request follows the published base for Zen and Go", async () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(publishedCatalog());
  const calls = stubGlobalFetch();

  const zen = await new OpencodeExecutor("opencode-zen").execute(requestInput(CHAT_MODEL));
  assert.equal(resultUrl(zen), `${PUBLISHED_BASE}/chat/completions`);
  assert.equal(getPublishedBaseUrl("opencode-zen"), PUBLISHED_BASE);

  const go = await new OpencodeExecutor("opencode-go").execute(requestInput(CHAT_MODEL));
  assert.equal(resultUrl(go), `${PUBLISHED_GO_BASE}/chat/completions`);

  assert.deepEqual(
    calls.map((call) => call.url),
    [`${PUBLISHED_BASE}/chat/completions`, `${PUBLISHED_GO_BASE}/chat/completions`]
  );
});

// 3. Flag on: the Responses format follows the published base and keeps `x-api-key`.
test("flag on: a Responses-model request follows the published base and keeps x-api-key", async () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(publishedCatalog());
  const calls = stubGlobalFetch();
  const executor = new OpencodeExecutor("opencode-zen");
  const result = await executor.execute(requestInput(RESPONSES_MODEL));
  assert.equal(resultUrl(result), `${PUBLISHED_BASE}/responses`);
  assert.equal(calls[0]?.url, `${PUBLISHED_BASE}/responses`);
  assert.equal(calls[0]?.headers["x-api-key"], "test-key");
  assert.equal(calls[0]?.headers.Authorization, undefined);
  // The registry config is untouched: usesZenApiKeyAuth() keeps comparing it to the Zen base.
  assert.equal(executor.config.baseUrl, ZEN_BASE);
});

// 4. Flag on: a gated free-tier model keeps the inference contract's base.
test("flag on: a gated free-tier request keeps the inference base, not the catalog", async () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(publishedCatalog());
  const calls = stubGlobalFetch();
  const result = await new OpencodeExecutor("opencode-zen").execute(requestInput(FREE_MODEL));
  assert.equal(resultUrl(result), `${FREE_TIER_INFERENCE_BASE_URL}/chat/completions`);
  assert.deepEqual(
    calls.map((call) => call.url),
    [`${FREE_TIER_INFERENCE_BASE_URL}/chat/completions`]
  );
});

// 5. Flag on: a published base that fails validation never replaces the registry base.
test("flag on: an invalid published api is refused and the registry base stays", () => {
  process.env[FLAG] = "true";
  const executor = new OpencodeExecutor("opencode-zen");
  const invalid = [
    "https://opencode.ai.evil.test/inference/v1",
    "http://opencode.ai/inference/v1",
    "https://user:secret@opencode.ai/inference/v1",
    "https://opencode.ai:8443/inference/v1",
  ];
  for (const api of invalid) {
    configurePublishedCatalogForTests(publishedCatalog(api));
    assert.equal(getPublishedBaseUrl("opencode-zen"), undefined, api);
    assert.equal(executor.buildUrl(CHAT_MODEL, true), `${ZEN_BASE}/chat/completions`, api);
  }
});

// 6. Flag on: the catalog read goes through the registered proxy-aware transport.
test("flag on: the catalog read uses the registered transport, not globalThis.fetch", async () => {
  process.env[FLAG] = "true";
  const globalCalls = stubGlobalFetch();
  const catalogCalls: string[] = [];
  setPublishedCatalogFetch(async (input) => {
    catalogCalls.push(input);
    return new Response(JSON.stringify(publishedCatalog()), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
  await refreshPublishedCatalog();
  assert.deepEqual(catalogCalls, ["https://models.opencode.ai/api.json"]);
  assert.deepEqual(
    globalCalls.filter((call) => call.url.includes("models.opencode.ai")),
    []
  );
  assert.equal(getPublishedBaseUrl("opencode-zen"), PUBLISHED_BASE);
  const result = await new OpencodeExecutor("opencode-zen").execute(requestInput(CHAT_MODEL));
  assert.equal(resultUrl(result), `${PUBLISHED_BASE}/chat/completions`);
});

// 7. Flag on: every client x-opencode-* header is relayed except the workspace selector.
test("flag on: client x-opencode-* headers are relayed, x-opencode-org-id is not", () => {
  process.env[FLAG] = "true";
  const executor = new OpencodeExecutor("opencode-zen");
  const headers = executor.buildHeaders(
    { apiKey: "test-key" },
    true,
    {
      "x-opencode-session-id": "ses_client",
      "x-opencode-unknown": "kept",
      "x-opencode-org-id": "org_other_workspace",
      "x-opencode-request": REQUEST_ID,
    },
    CHAT_MODEL
  );
  assert.equal(headers["x-opencode-session-id"], "ses_client");
  assert.equal(headers["x-opencode-unknown"], "kept");
  assert.equal(headers["x-opencode-org-id"], undefined);
  assert.equal(headers["x-opencode-request"], REQUEST_ID);

  // The gated v2 fingerprint keeps #16998: the relay runs before the synthesis that drops the
  // v1-only x-opencode-request, so a relayed copy never brings it back.
  const v2: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    v2,
    {
      "x-opencode-session-id": "ses_client",
      "x-opencode-unknown": "kept",
      "x-opencode-org-id": "org_other_workspace",
      "x-opencode-request": REQUEST_ID,
    },
    {
      synthesizeRequestId: true,
      cliDefaults: {
        userAgent: "opencode/latest/2.0.26/cli",
        client: "cli",
        project: "global",
      },
      reencodeSession: true,
      v2Fingerprint: true,
      forwardAllOpencodeHeaders: true,
    }
  );
  assert.equal(v2["x-opencode-request"], undefined);
  assert.equal(v2["x-opencode-unknown"], "kept");
  assert.equal(v2["x-opencode-org-id"], undefined);
  assert.ok(v2["x-opencode-session-id"]);
});

// 8. Flag off: headers and schemas behave exactly as before, even with a stored schema.
test("flag off: extra headers are not relayed and a stored schema is not replayed", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(publishedCatalog());
  acceptClientTool("opencode", FREE_MODEL, SESSION_A, "edit", sizedSchema(20));
  assert.ok(recordedToolParameters("opencode", FREE_MODEL, SESSION_A, "edit"));

  delete process.env[FLAG];
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
    { apiKey: "test-key" },
    true,
    { "x-opencode-session-id": "ses_client", "x-opencode-unknown": "kept" },
    CHAT_MODEL
  );
  assert.equal(headers["x-opencode-session-id"], undefined);
  assert.equal(headers["x-opencode-unknown"], undefined);

  const prepared = prepareFreeTierRequest(
    { model: FREE_MODEL, messages: [{ role: "user", content: "hi" }] },
    "openai",
    "zen",
    "opencode",
    FREE_MODEL,
    SESSION_A
  );
  assert.deepEqual(parametersOf(prepared.body, "edit"), EMPTY_SCHEMA);
  assert.equal(recordedToolParameters("opencode", FREE_MODEL, SESSION_A, "edit"), undefined);
});

// 9. Two providers sharing a tool name keep their own schema.
test("flag on: two providers with the same tool name replay their own schema", () => {
  process.env[FLAG] = "true";
  const zenSchema = { type: "object", properties: { command: { type: "string" } } };
  const freeSchema = { type: "object", properties: { filePath: { type: "string" } } };
  acceptClientTool("opencode", FREE_MODEL, undefined, "shared", zenSchema);
  acceptClientTool("opencode-zen", FREE_MODEL, undefined, "shared", freeSchema);

  const zen = prepareFreeTierRequest(
    { model: FREE_MODEL, messages: [{ role: "user", content: "hi" }] },
    "openai",
    "zen",
    "opencode",
    FREE_MODEL
  );
  const free = prepareFreeTierRequest(
    { model: FREE_MODEL, messages: [{ role: "user", content: "hi" }] },
    "openai",
    "zen",
    "opencode-zen",
    FREE_MODEL
  );
  assert.deepEqual(parametersOf(zen.body, "shared"), zenSchema);
  assert.deepEqual(parametersOf(free.body, "shared"), freeSchema);
});

// 10. Two sessions of the same provider and model keep their own schema.
test("flag on: two sessions of one provider and model replay their own schema", () => {
  process.env[FLAG] = "true";
  const schemaA = { type: "object", properties: { command: { type: "string" } } };
  const schemaB = { type: "object", properties: { pattern: { type: "string" } } };
  acceptClientTool("opencode", FREE_MODEL, SESSION_A, "shared", schemaA);
  acceptClientTool("opencode", FREE_MODEL, SESSION_B, "shared", schemaB);
  assert.deepEqual(recordedToolParameters("opencode", FREE_MODEL, SESSION_A, "shared"), schemaA);
  assert.deepEqual(recordedToolParameters("opencode", FREE_MODEL, SESSION_B, "shared"), schemaB);

  const preparedA = prepareFreeTierRequest(
    { model: FREE_MODEL, messages: [{ role: "user", content: "hi" }] },
    "openai",
    "zen",
    "opencode",
    FREE_MODEL,
    SESSION_A
  );
  assert.deepEqual(parametersOf(preparedA.body, "shared"), schemaA);
});

// 11. A borrowed name carries the accepted schema on both injected-tool paths.
test("flag on: a borrowed name never ships the empty schema", () => {
  process.env[FLAG] = "true";
  const schema = {
    type: "object",
    properties: { path: { type: "string" } },
    required: ["path"],
  };
  acceptClientTool("opencode", FREE_MODEL, SESSION_A, "edit", schema);

  // First dispatch without tools: the placeholder comes from the store.
  const first = prepareFreeTierRequest(
    { model: FREE_MODEL, messages: [{ role: "user", content: "hi" }] },
    "openai",
    "zen",
    "opencode",
    FREE_MODEL,
    SESSION_A
  );
  assert.deepEqual(parametersOf(first.body, "edit"), schema);
  assert.notDeepEqual(parametersOf(first.body, "edit"), EMPTY_SCHEMA);

  // Retry with the client's own tools: the missing observed name is appended with its schema.
  const retried = mergeClientToolsWithObserved(
    {
      model: FREE_MODEL,
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "glob", parameters: EMPTY_SCHEMA } }],
    },
    "openai",
    "opencode",
    FREE_MODEL,
    SESSION_A,
    []
  );
  assert.deepEqual(parametersOf(retried, "edit"), schema);
  assert.notDeepEqual(parametersOf(retried, "edit"), EMPTY_SCHEMA);
});

// 12. Both budgets bound the store, and a refusal stores nothing.
test("flag on: the schema memory stays bounded and a refused request stores nothing", () => {
  process.env[FLAG] = "true";
  const small = { type: "object", properties: { p: { type: "string" } } };

  // Entry budget: 130 accepted scopes, and the store keeps exactly the 64 most recent ones —
  // the size stops following the request count.
  for (let index = 0; index < 130; index += 1) {
    recordAcceptedToolNames(
      "opencode",
      `model-${index}`,
      undefined,
      ["tool"],
      new Map([["tool", small]])
    );
  }
  assert.equal(getObservedToolNames("opencode", "model-0"), null);
  assert.equal(getObservedToolNames("opencode", "model-65"), null);
  assert.deepEqual(getObservedToolNames("opencode", "model-66"), ["tool"]);
  assert.deepEqual(getObservedToolNames("opencode", "model-129"), ["tool"]);

  // Character budget: nine large schemas push the store past 32 000 characters.
  _resetToolObservationForTests();
  for (let index = 0; index < 9; index += 1) {
    recordAcceptedToolNames(
      "opencode",
      `big-${index}`,
      undefined,
      ["tool"],
      new Map([["tool", sizedSchema(3900)]])
    );
  }
  assert.equal(getObservedToolNames("opencode", "big-0"), null);
  assert.deepEqual(getObservedToolNames("opencode", "big-8"), ["tool"]);

  // One schema over the per-schema cap is not stored, the name still is.
  _resetToolObservationForTests();
  recordAcceptedToolNames(
    "opencode",
    "huge",
    undefined,
    ["tool"],
    new Map([["tool", sizedSchema(4500)]])
  );
  assert.deepEqual(getObservedToolNames("opencode", "huge"), ["tool"]);
  assert.equal(recordedToolParameters("opencode", "huge", undefined, "tool"), undefined);

  // A refused request records no schema (and no name).
  _resetToolObservationForTests();
  const refused = prepareFreeTierRequest(
    {
      model: FREE_MODEL,
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "edit", parameters: sizedSchema(20) } }],
    },
    "openai",
    "zen",
    "opencode",
    FREE_MODEL,
    SESSION_A
  );
  noteFreeTierOutcome(refused.attempt, {
    ok: false,
    status: 403,
    bodyText: "FreeTierError",
  });
  assert.equal(getObservedToolNames("opencode", FREE_MODEL, SESSION_A), null);
  assert.equal(recordedToolParameters("opencode", FREE_MODEL, SESSION_A, "edit"), undefined);
});

// 13. The flag adds no credential of its own to a keyless gated request: the gated lane's
// credential stays owned by OPENCODE_FREE_TIER_CREDENTIAL (#17848), the same with the flag
// on or off, and `none` still sends no Authorization at all.
test("flag on: a gated request without a key gets the same credential as with the flag off", () => {
  const previous = process.env.OPENCODE_FREE_TIER_CREDENTIAL;
  try {
    configurePublishedCatalogForTests(publishedCatalog());
    for (const credential of [undefined, "none"]) {
      if (credential === undefined) delete process.env.OPENCODE_FREE_TIER_CREDENTIAL;
      else process.env.OPENCODE_FREE_TIER_CREDENTIAL = credential;
      delete process.env[FLAG];
      const off = new OpencodeExecutor("opencode-zen").buildHeaders(null, true, null, FREE_MODEL);
      process.env[FLAG] = "true";
      const on = new OpencodeExecutor("opencode-zen").buildHeaders(null, true, null, FREE_MODEL);
      assert.equal(on.Authorization, off.Authorization);
      assert.equal(on["x-api-key"], off["x-api-key"]);
      if (credential === "none") {
        assert.equal(on.Authorization, undefined);
        assert.equal(on["x-api-key"], undefined);
      }
    }
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_CREDENTIAL;
    else process.env.OPENCODE_FREE_TIER_CREDENTIAL = previous;
  }
});
