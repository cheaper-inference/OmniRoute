/**
 * R9-8: a stored combo granted through `allowedCombos` admits its inner targets
 * past `allowedModels` (#14197). Only a combo named in `allowedCombos` also
 * overrides `blockedModels`; the default `combo/*` grant must not admit an inner
 * target that matches the key's `blockedModels`.
 *
 * The handler cases dispatch to a loopback HTTP server through a real
 * OpenAI-compatible provider node; `globalThis.fetch` is not replaced.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-blocked-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(TEST_DATA_DIR, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.REQUIRE_API_KEY = "true";
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-granted-target-blocked";
delete process.env.JWT_SECRET;
delete process.env.QUOTA_STORE_DRIVER;
delete process.env.QUOTA_STORE_REDIS_URL;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const aliasesDb = await import("../../src/lib/db/models/aliases.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const { comboTargetPassesKeyModelPolicy } =
  await import("../../src/sse/handlers/chat/comboTargetKeyPolicy.ts");
const { createResolvedModelGate, rejectUnauthorizedResolvedModels } =
  await import("../../src/sse/handlers/chat/resolvedModelPolicy.ts");

const KEY = "sk-combo-granted-blocked";
const COMBO = "granted-combo";
const BLOCKED = "mock/secret-model";
const PUBLIC = "mock/public-model";
const NODE = "openai-compatible-chat-0a0a0a0a-0000-4000-8000-0000000000b8";
const NODE_ID_BLOCKED = `${NODE}/secret-model`;
const ALIAS = "sm-alias";
const ALIAS_COMBO = "alias-combo";
const NODE_COMBO = "node-id-combo";

// Loopback upstream for the handleChat cases; started before any test is declared.
const upstreamModels: string[] = [];
const server = http.createServer((req, res) => {
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    let model = "";
    try {
      model = String(JSON.parse(raw).model);
    } catch {
      model = "<unparsed>";
    }
    upstreamModels.push(model);
    res.setHeader("content-type", "application/json");
    // No keep-alive: a reused socket the server idles out reads as a 502 and locks the model.
    res.setHeader("connection", "close");
    res.end(
      JSON.stringify({
        id: "chatcmpl-combo-blocked",
        object: "chat.completion",
        created: 1,
        model,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: `ok ${model}` },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      })
    );
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
const baseUrl = `http://127.0.0.1:${(server.address() as { port: number }).port}/v1`;

// Stand-in for isModelAllowedForKey: these cases only use exact allow-list entries.
function allowListChecker(models: string[]) {
  return async (_key: string, model: string) => models.includes(model);
}

async function passes(apiKeyInfo: Record<string, unknown>, requested: string, target: string) {
  return comboTargetPassesKeyModelPolicy({
    apiKey: KEY,
    apiKeyInfo,
    requestedModelStr: requested,
    targetModelStr: target,
    isModelAllowedForKey: allowListChecker((apiKeyInfo.allowedModels as string[]) ?? []),
  });
}

// ── Pre-dispatch target policy ──────────────────────────────────────────────

test("named allowedCombos grant overrides blockedModels for its inner targets", async () => {
  const info = {
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: [COMBO],
    blockedModels: [BLOCKED],
  };
  assert.equal(await passes(info, COMBO, BLOCKED), true);
  assert.equal(await passes(info, COMBO, PUBLIC), true, "unblocked target stays admitted");

  // The `combo/` form of the rule names the combo too.
  const prefixed = { ...info, allowedCombos: [`combo/${COMBO}`] };
  assert.equal(await passes(prefixed, COMBO, BLOCKED), true);
});

test("naming one combo next to combo/* overrides blockedModels for that combo only", async () => {
  const info = { allowedCombos: ["combo/*", COMBO], blockedModels: [BLOCKED] };
  assert.equal(await passes(info, COMBO, BLOCKED), true, "named combo");
  assert.equal(await passes(info, "other-combo", BLOCKED), false, "reached through combo/* only");
});

test("default combo/* grant does not admit a blocked inner target", async () => {
  const info = { modelAccessMode: "all", allowedCombos: ["combo/*"], blockedModels: ["mock/*"] };
  assert.equal(await passes(info, COMBO, BLOCKED), false);
  assert.equal(await passes(info, COMBO, "other/model"), true);
});

test("pre-dispatch policy applies every blockedModels entry to a granted target", async () => {
  // The matching entry sits in the middle, so a check of only the first or only the
  // last entry fails here. Media routes rely on this check alone.
  const list = ["other/unused-model", BLOCKED, "other/unused-2"];
  const info = { allowedCombos: ["combo/*"], blockedModels: list };
  assert.equal(await passes(info, COMBO, BLOCKED), false, "middle entry");
  assert.equal(await passes(info, COMBO, PUBLIC), true, "unblocked target");
  // blockedModels also wins over an exact allowedModels entry for the same target.
  const both = {
    modelAccessMode: "restricted",
    allowedModels: [BLOCKED],
    allowedCombos: ["combo/*"],
    blockedModels: [BLOCKED],
  };
  assert.equal(await passes(both, COMBO, BLOCKED), false);
});

test("named allowedCombos grant still admits inner targets outside allowedModels (#14197)", async () => {
  const info = {
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: [COMBO],
    blockedModels: ["unrelated/*"],
  };
  assert.equal(await passes(info, COMBO, BLOCKED), true);
});

test("auto/* combos keep per-candidate allowedModels and blockedModels checks", async () => {
  const info = {
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: ["combo/*", "auto/best"],
    blockedModels: [BLOCKED],
  };
  assert.equal(await passes(info, "auto/best", BLOCKED), false);
  assert.equal(await passes(info, "auto/best", "other/model"), false);
  assert.equal(await passes(info, "auto/best", PUBLIC), true);
});

test("pre-dispatch policy does not admit a granted target when the blockedModels check throws", async () => {
  const info = { allowedCombos: ["combo/*"], blockedModels: [{} as unknown as string] };
  await assert.rejects(() => passes(info, COMBO, BLOCKED));
});

// ── Dispatch gate for granted targets ───────────────────────────────────────

test("dispatch gate rejects a combo-granted target that matches blockedModels", async () => {
  const rejected = await rejectUnauthorizedResolvedModels({
    hasApiKeyMetadata: true,
    apiKey: KEY,
    requestedModel: COMBO,
    resolvedModels: [BLOCKED],
    grantedTargets: new Set([BLOCKED]),
    blockedModels: [BLOCKED],
  });
  assert.ok(rejected, "a blocked granted target must be rejected");
  assert.equal(rejected.status, 403);

  // Pattern-only list: an exact-match comparison must not be enough here.
  const globRejected = await rejectUnauthorizedResolvedModels({
    hasApiKeyMetadata: true,
    apiKey: KEY,
    requestedModel: COMBO,
    resolvedModels: [BLOCKED],
    grantedTargets: new Set([BLOCKED]),
    blockedModels: ["mock/secret-*"],
  });
  assert.ok(globRejected, "a glob in blockedModels must reject a granted target");
  assert.equal(globRejected.status, 403);

  const admitted = await rejectUnauthorizedResolvedModels({
    hasApiKeyMetadata: true,
    apiKey: KEY,
    requestedModel: COMBO,
    resolvedModels: [PUBLIC],
    grantedTargets: new Set([PUBLIC]),
    blockedModels: [BLOCKED],
  });
  assert.equal(admitted, null, "an unblocked granted target is still admitted");
});

test("dispatch gate built for a combo/* grant carries the key's blockedModels", async () => {
  const gate = createResolvedModelGate({
    apiKeyInfo: { allowedCombos: ["combo/*"], blockedModels: [BLOCKED] },
    request: null,
    contextModel: COMBO,
    comboGrantsTargets: true,
    provider: "mock",
    model: "secret-model",
    modelStr: BLOCKED,
  });
  const rejected = await gate([BLOCKED]);
  assert.ok(rejected);
  assert.equal(rejected.status, 403);

  // A key that names another combo gets no override for this one.
  const otherNameGate = createResolvedModelGate({
    apiKeyInfo: { allowedCombos: ["combo/*", "other-combo"], blockedModels: [BLOCKED] },
    request: null,
    contextModel: COMBO,
    comboGrantsTargets: true,
    provider: "mock",
    model: "secret-model",
    modelStr: BLOCKED,
  });
  const otherNameRejected = await otherNameGate([BLOCKED]);
  assert.ok(otherNameRejected, "combo/* must not inherit another combo's named grant");
  assert.equal(otherNameRejected.status, 403);

  // Every entry applies at dispatch, not only the first or the last one.
  const listGate = createResolvedModelGate({
    apiKeyInfo: {
      allowedCombos: ["combo/*"],
      blockedModels: ["other/unused-model", BLOCKED, "other/unused-2"],
    },
    request: null,
    contextModel: COMBO,
    comboGrantsTargets: true,
    provider: "mock",
    model: "secret-model",
    modelStr: BLOCKED,
  });
  const listRejected = await listGate([BLOCKED]);
  assert.ok(listRejected, "a middle blockedModels entry must reject a granted target");
  assert.equal(listRejected.status, 403);
});

test("dispatch gate built for a named combo overrides blockedModels on its own target", async () => {
  for (const allowedCombos of [[COMBO], ["combo/*", COMBO]]) {
    const namedGate = createResolvedModelGate({
      apiKeyInfo: { allowedCombos, blockedModels: [BLOCKED] },
      request: null,
      contextModel: COMBO,
      comboGrantsTargets: true,
      provider: "mock",
      model: "secret-model",
      modelStr: BLOCKED,
    });
    assert.equal(await namedGate([BLOCKED]), null, `${allowedCombos}: granted target`);
    // A model an override swaps in is not the combo's target: it keeps the full check.
    const swapped = await namedGate(["mock/swapped-in-model"]);
    assert.ok(swapped, `${allowedCombos}: a swapped-in model is not granted`);
  }
});

test("dispatch gate fails closed when the blockedModels check throws", async () => {
  const rejected = await rejectUnauthorizedResolvedModels({
    hasApiKeyMetadata: true,
    apiKey: KEY,
    requestedModel: COMBO,
    resolvedModels: [BLOCKED],
    grantedTargets: new Set([BLOCKED]),
    blockedModels: [{} as unknown as string],
  });
  assert.ok(rejected);
  assert.equal(rejected.status, 503);
});

// ── handleChat with a loopback upstream ─────────────────────────────────────

function resetStorage() {
  proxyLogger.flushProxyLogsSync();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(path.join(TEST_DATA_DIR, "plugins"), { recursive: true });
  upstreamModels.length = 0;
}

test.after(() => {
  server.close();
  resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seed(perms: Record<string, unknown>) {
  resetStorage();
  await nodesDb.createProviderNode({
    id: NODE,
    type: "openai-compatible",
    name: "combo blocked mock",
    prefix: "mock",
    apiType: "chat",
    baseUrl,
  });
  await providersDb.createProviderConnection({
    provider: NODE,
    authType: "apikey",
    name: "mock",
    apiKey: "sk-mock-upstream",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { prefix: "mock", baseUrl },
  });
  await combosDb.createCombo({ name: COMBO, strategy: "priority", models: [BLOCKED] });
  await combosDb.createCombo({
    name: "mixed-combo",
    strategy: "priority",
    models: [BLOCKED, PUBLIC],
  });
  await combosDb.createCombo({ name: NODE_COMBO, strategy: "priority", models: [NODE_ID_BLOCKED] });
  await aliasesDb.setModelAlias(ALIAS, BLOCKED);
  await combosDb.createCombo({ name: ALIAS_COMBO, strategy: "priority", models: [ALIAS] });
  await combosDb.createCombo({
    name: "alias-mixed-combo",
    strategy: "priority",
    models: [ALIAS, PUBLIC],
  });
  const key = await apiKeysDb.createApiKey("combo blocked", "machine-combo-blocked");
  await apiKeysDb.updateApiKeyPermissions(key.id, perms);
  return key.key;
}

async function chat(key: string, model: string) {
  const response = await handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      }),
    })
  );
  await response.text();
  return response.status;
}

function routeRequest(url: string, key: string, body: Record<string, unknown>) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
}

async function responses(key: string, model: string) {
  const response = await responsesRoute.POST(
    routeRequest("http://localhost/v1/responses", key, { model, stream: false, input: "hi" })
  );
  await response.text();
  return response.status;
}

async function messages(key: string, model: string) {
  const response = await messagesRoute.POST(
    routeRequest("http://localhost/v1/messages", key, {
      model,
      stream: false,
      max_tokens: 8,
      messages: [{ role: "user", content: "hi" }],
    })
  );
  await response.text();
  return response.status;
}

function namedGrant(combo: string, blockedModels: string[]) {
  return {
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: [combo],
    blockedModels,
  };
}

function wildcardGrant(blockedModels: string[]) {
  return {
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: ["combo/*"],
    blockedModels,
  };
}

test("handleChat: a new key (default combo/*) cannot reach a blocked model through a combo", async () => {
  const key = await seed({ blockedModels: [BLOCKED] });
  const meta = await apiKeysDb.getApiKeyMetadata(key);
  assert.deepEqual(meta?.allowedCombos, ["combo/*"], "precondition: default combo grant");

  const status = await chat(key, COMBO);
  assert.equal(status, 503, "every target is skipped before dispatch");
  assert.deepEqual(upstreamModels, [], "the blocked target must not be dispatched");
});

test("handleChat: a combo/* grant on a restricted key cannot reach a blocked model", async () => {
  const key = await seed(wildcardGrant([BLOCKED]));
  const status = await chat(key, COMBO);
  assert.equal(status, 503);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: a named allowedCombos grant reaches a blocked model of that combo", async () => {
  const key = await seed(namedGrant(COMBO, [BLOCKED]));
  const status = await chat(key, COMBO);
  assert.equal(status, 200);
  assert.deepEqual(upstreamModels, ["secret-model"]);
});

test("handleChat: naming one combo does not open blockedModels for the others", async () => {
  const key = await seed({ allowedCombos: ["combo/*", "mixed-combo"], blockedModels: [BLOCKED] });
  assert.equal(await chat(key, COMBO), 503, "reached through combo/* only");
  assert.deepEqual(upstreamModels, []);
  assert.equal(await chat(key, "mixed-combo"), 200, "named combo");
  assert.deepEqual(upstreamModels, ["secret-model"], "its first target is dispatched");
});

test("handleChat: a combo skips its blocked target and falls back to an allowed one", async () => {
  const key = await seed({ blockedModels: [BLOCKED] });
  const status = await chat(key, "mixed-combo");
  assert.equal(status, 200);
  assert.deepEqual(upstreamModels, ["public-model"]);
});

test("handleChat: a named allowedCombos grant still reaches targets outside allowedModels", async () => {
  const key = await seed({
    modelAccessMode: "restricted",
    allowedModels: [PUBLIC],
    allowedCombos: [COMBO],
  });
  const status = await chat(key, COMBO);
  assert.equal(status, 200);
  assert.deepEqual(upstreamModels, ["secret-model"]);
});

test("handleChat: an unrestricted key keeps dispatching combo targets", async () => {
  const key = await seed({});
  const status = await chat(key, COMBO);
  assert.equal(status, 200);
  assert.deepEqual(upstreamModels, ["secret-model"]);
});

test("handleChat: a direct request for a blocked model is still rejected", async () => {
  const key = await seed({ blockedModels: [BLOCKED] });
  const status = await chat(key, BLOCKED);
  assert.equal(status, 403);
  assert.deepEqual(upstreamModels, []);
});

// ── Provider-node blockedModels entries ─────────────────────────────────────
// The dashboard stores a provider-node entry as `${node.id}/model`. An alias
// target reaches the dispatch gate in prefix form (`mock/model`).

test("handleChat: default combo/* cannot reach a node-id blocked model through an alias target", async () => {
  const key = await seed({ blockedModels: [NODE_ID_BLOCKED] });
  assert.equal(await chat(key, ALIAS_COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: restricted combo/* key cannot reach a node-id blocked model through an alias", async () => {
  // The node-id entry is second, so a check of only the first entry fails here.
  const key = await seed(wildcardGrant(["other/unused-model", NODE_ID_BLOCKED]));
  assert.equal(await chat(key, ALIAS_COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: named grant reaches a node-id blocked model through an alias target", async () => {
  const key = await seed(namedGrant(ALIAS_COMBO, ["other/unused-model", NODE_ID_BLOCKED]));
  assert.equal(await chat(key, ALIAS_COMBO), 200);
  assert.deepEqual(upstreamModels, ["secret-model"]);
});

test("handleChat: a node wildcard entry blocks an alias target", async () => {
  const key = await seed(wildcardGrant([`${NODE}/*`]));
  assert.equal(await chat(key, ALIAS_COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("/v1/responses and /v1/messages: node-id entry blocks an alias target under combo/*", async () => {
  const key = await seed(wildcardGrant([NODE_ID_BLOCKED]));
  assert.equal(await responses(key, ALIAS_COMBO), 403, "/v1/responses");
  assert.equal(await messages(key, ALIAS_COMBO), 403, "/v1/messages");
  assert.deepEqual(upstreamModels, []);
});

test("/v1/responses and /v1/messages: a named grant keeps its override", async () => {
  const key = await seed(namedGrant(ALIAS_COMBO, [NODE_ID_BLOCKED]));
  assert.equal(await responses(key, ALIAS_COMBO), 200, "/v1/responses");
  assert.equal(await messages(key, ALIAS_COMBO), 200, "/v1/messages");
  assert.deepEqual(upstreamModels, ["secret-model", "secret-model"]);
});

test("handleChat: a combo falls back past an alias target blocked by node id", async () => {
  const key = await seed({ blockedModels: [NODE_ID_BLOCKED] });
  assert.equal(await chat(key, "alias-mixed-combo"), 200);
  assert.deepEqual(upstreamModels, ["public-model"]);
});

test("/v1/chat/completions: a direct request for an alias blocked by node id is rejected", async () => {
  // The chat route resolves the alias before handleChat, so the key check sees the node id.
  const key = await seed({ blockedModels: [NODE_ID_BLOCKED] });
  const response = await chatRoute.POST(
    routeRequest("http://localhost/v1/chat/completions", key, {
      model: ALIAS,
      stream: false,
      messages: [{ role: "user", content: "hi" }],
    })
  );
  await response.text();
  assert.equal(response.status, 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: an unrestricted key still reaches an alias target through a combo", async () => {
  const key = await seed({});
  assert.equal(await chat(key, ALIAS_COMBO), 200);
  assert.deepEqual(upstreamModels, ["secret-model"]);
});

test("handleChat: dispatch gate applies a node wildcard entry to a granted target", async () => {
  // The pre-dispatch check sees `mock/secret-model` and does not match `${NODE}/*`;
  // the dispatch gate sees the node-id form and must apply the wildcard.
  const key = await seed(wildcardGrant([`${NODE}/*`]));
  assert.equal(await chat(key, COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: dispatch gate applies an exact node-id entry to a granted target", async () => {
  const key = await seed(wildcardGrant([NODE_ID_BLOCKED]));
  assert.equal(await chat(key, COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: dispatch gate applies a segment glob to an alias target", async () => {
  const key = await seed(wildcardGrant(["mock/*secret*"]));
  assert.equal(await chat(key, ALIAS_COMBO), 403);
  assert.deepEqual(upstreamModels, []);
});

test("handleChat: a blockedModels entry naming the alias skips that combo target", async () => {
  const key = await seed({ blockedModels: [ALIAS] });
  assert.equal(await chat(key, ALIAS_COMBO), 503, "every target is skipped before dispatch");
  assert.deepEqual(upstreamModels, []);
});

test("dispatch gate checks every provider node that shares the target's prefix", async () => {
  resetStorage();
  const shared = [
    { id: NODE, type: "openai-compatible" },
    {
      id: "anthropic-compatible-0a0a0a0a-0000-4000-8000-0000000000b9",
      type: "anthropic-compatible",
    },
  ];
  for (const node of shared) {
    await nodesDb.createProviderNode({ ...node, name: node.id, prefix: "mock", baseUrl });
  }
  await nodesDb.createProviderNode({
    id: "openai-compatible-chat-0a0a0a0a-0000-4000-8000-0000000000ba",
    type: "openai-compatible",
    name: "other prefix",
    prefix: "other",
    baseUrl,
  });
  const gate = (blockedModels: string[], target = BLOCKED) =>
    rejectUnauthorizedResolvedModels({
      hasApiKeyMetadata: true,
      apiKey: KEY,
      requestedModel: COMBO,
      resolvedModels: [target],
      grantedTargets: new Set([target]),
      blockedModels,
    });
  for (const node of shared) {
    const rejected = await gate([`${node.id}/secret-model`]);
    assert.equal(rejected?.status, 403, `${node.type} node sharing the prefix`);
  }
  assert.equal(
    await gate(["openai-compatible-chat-0a0a0a0a-0000-4000-8000-0000000000ba/secret-model"]),
    null,
    "a node with another prefix does not apply"
  );
  assert.equal(await gate([NODE_ID_BLOCKED], PUBLIC), null, "another model on the node");
});

test("handleChat: a prefix-form entry blocks a combo target written in node-id form", async () => {
  for (const blockedModels of [[BLOCKED], ["mock/*"]]) {
    const named = await seed(namedGrant(NODE_COMBO, blockedModels));
    assert.equal(await chat(named, NODE_COMBO), 200, `named grant, ${blockedModels}`);
    assert.deepEqual(upstreamModels, ["secret-model"]);
    const byDefault = await seed({ blockedModels });
    assert.equal(await chat(byDefault, NODE_COMBO), 403, `combo/*, ${blockedModels}`);
    assert.deepEqual(upstreamModels, []);
  }
});

test("dispatch gate expands a prefix only to the nodes dispatch would search", async () => {
  resetStorage();
  const builtinNameNode = "openai-compatible-chat-0a0a0a0a-0000-4000-8000-0000000000bb";
  const upperCaseNode = "openai-compatible-chat-0a0a0a0a-0000-4000-8000-0000000000bc";
  await nodesDb.createProviderNode({
    id: NODE,
    type: "openai-compatible",
    name: "mock",
    prefix: "mock",
    baseUrl,
  });
  await nodesDb.createProviderNode({
    id: builtinNameNode,
    type: "openai-compatible",
    name: "reuses a built-in provider name",
    prefix: "openai",
    baseUrl,
  });
  await nodesDb.createProviderNode({
    id: upperCaseNode,
    type: "openai-compatible",
    name: "differs only in case",
    prefix: "Mock",
    baseUrl,
  });
  const gate = (blockedModels: string[], target: string) =>
    rejectUnauthorizedResolvedModels({
      hasApiKeyMetadata: true,
      apiKey: KEY,
      requestedModel: COMBO,
      resolvedModels: [target],
      grantedTargets: new Set([target]),
      blockedModels,
    });
  assert.equal(
    await gate([`${builtinNameNode}/gpt-4o-mini`], "openai/gpt-4o-mini"),
    null,
    "a node named like a built-in provider is not in that provider's dispatch pool"
  );
  assert.equal(
    (await gate(["openai/gpt-4o-mini"], "openai/gpt-4o-mini"))?.status,
    403,
    "the built-in entry itself still applies"
  );
  assert.equal(
    await gate(["openai/gpt-4o-mini"], `${builtinNameNode}/gpt-4o-mini`),
    null,
    "a node id is not mapped back to a built-in provider name"
  );
  assert.equal(
    await gate([`${upperCaseNode}/secret-model`], BLOCKED),
    null,
    "prefixes compare case-sensitively, like dispatch"
  );
  assert.equal(
    await gate([NODE_ID_BLOCKED], "Mock/secret-model"),
    null,
    "a differently cased prefix does not reach the lower-case node"
  );
  assert.equal(
    (await gate([`${upperCaseNode}/secret-model`], "Mock/secret-model"))?.status,
    403,
    "a differently cased prefix reaches its own node"
  );
  assert.equal((await gate([BLOCKED], NODE_ID_BLOCKED))?.status, 403, "node id back to prefix");
  assert.equal((await gate(["mock/*"], NODE_ID_BLOCKED))?.status, 403, "prefix wildcard");
  assert.equal(await gate([BLOCKED], `${upperCaseNode}/secret-model`), null, "other prefix");
  assert.equal(await gate([PUBLIC], NODE_ID_BLOCKED), null, "another model");
});
