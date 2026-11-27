/**
 * `combos_only` runtime gating.
 *
 * The whole reason the state exists: a model the operator keeps out of direct use must still be
 * dispatchable from a combo they compiled by hand. So the gate has to answer two different
 * questions on the same snapshot —
 *
 *  - direct call / `/v1/models` / `/v1/models/{id}` → `combos_only` and `hidden` both refuse;
 *  - a stored combo step → only `hidden` refuses.
 *
 * And `auto/*` is a *virtual* combo the operator never compiled, so it must be gated as a direct
 * call: otherwise it becomes the back door this state is meant to close.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combos-only-gate-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combos-only-gate-fixture-secret";

const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const settings = await import("../../src/lib/db/settings.ts");
const providers = await import("../../src/lib/db/providers.ts");
const aliases = await import("../../src/lib/modelAliasResolver.ts");
const { createModelVisibilityLookup } = await import("../../src/lib/hiddenModelLookup.ts");
const { getChatVisibilitySnapshot } = await import("../../src/lib/hiddenChatModels.ts");
const { withHiddenModelGate } = await import("../../src/sse/handlers/chat/hiddenModelGate.ts");
const { createVisibleResolvedModelGate } =
  await import("../../src/sse/handlers/chat/resolvedModelPolicy.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;
const dispatchedModels: string[] = [];
const noop = (..._args: unknown[]) => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

async function chat(model: string): Promise<Response> {
  return chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-OmniRoute-No-Cache": "true" },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );
}

/** The gate alone, fed by the real snapshot — no HTTP, no upstream. */
async function gate(
  targets: string[],
  scope: { isCombo?: boolean; contextModel?: string | null } = {}
): Promise<number | null> {
  await getChatVisibilitySnapshot(); // warm the same read path the route uses
  const guarded = withHiddenModelGate(async () => null, targets[0], scope);
  const response = await guarded(targets);
  return response ? response.status : null;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  aliases.invalidateAliasCache();
  dispatchedModels.length = 0;
  await settings.updateSettings({ requestRetry: 0, combosOnlyProviders: [] });
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Combos-only gate fixture",
    apiKey: "sk-combos-only-gate-fixture",
    isActive: true,
    testStatus: "active",
  });
  globalThis.fetch = async (_input, init) => {
    dispatchedModels.push(JSON.parse(String(init?.body)).model);
    return Response.json({
      id: "chatcmpl-combos-only-gate",
      choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
    });
  };
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the lookup separates the two scopes on one snapshot", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  const lookup = createModelVisibilityLookup(await getChatVisibilitySnapshot());
  assert.equal(lookup.isHiddenInCombo("openai", "gpt-4o-mini"), false, "a combo may dispatch it");
  assert.equal(
    lookup.isBlockedFromDirectUse("openai", "gpt-4o-mini"),
    true,
    "a direct call may not"
  );
});

test("a hidden model is refused in both scopes", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "hidden");
  const lookup = createModelVisibilityLookup(await getChatVisibilitySnapshot());
  assert.equal(lookup.isHiddenInCombo("openai", "gpt-4o-mini"), true);
  assert.equal(lookup.isBlockedFromDirectUse("openai", "gpt-4o-mini"), true);
});

test("a combos_only model 404s on a direct call, before any upstream dispatch", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  const response = await chat("openai/gpt-4o-mini");
  assert.equal(response.status, 404);
  assert.deepEqual(dispatchedModels, []);
  assert.equal((await response.json()).error.code, "model_not_found");
});

test("returning a combos_only model to visible makes the direct call work again", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  assert.equal((await chat("openai/gpt-4o-mini")).status, 404);
  models.setModelVisibility("openai", "gpt-4o-mini", "visible");
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("a provider-level default gates every one of its models on a direct call", async () => {
  await settings.updateSettings({ combosOnlyProviders: ["openai"] });
  const response = await chat("openai/gpt-4o-mini");
  assert.equal(response.status, 404);
  assert.deepEqual(dispatchedModels, []);
});

test("an explicit visible override is the positive exception over the provider default", async () => {
  await settings.updateSettings({ combosOnlyProviders: ["openai"] });
  models.setModelVisibility("openai", "gpt-4o-mini", "visible");
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("the gate refuses a combos_only target on a direct dispatch", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  assert.equal(await gate(["openai/gpt-4o-mini"]), 404);
});

test("the gate admits a combos_only target as a fixed-combo step", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  assert.equal(
    await gate(["openai/gpt-4o-mini"], { isCombo: true, contextModel: "my-combo" }),
    null
  );
});

test("the gate refuses a combos_only target when the combo is a virtual auto/* one", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  assert.equal(
    await gate(["openai/gpt-4o-mini"], { isCombo: true, contextModel: "auto/cheapest" }),
    404
  );
});

test("the gate refuses a hidden target even as a fixed-combo step", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "hidden");
  assert.equal(
    await gate(["openai/gpt-4o-mini"], { isCombo: true, contextModel: "my-combo" }),
    404
  );
});

test("createVisibleResolvedModelGate keeps its default direct-call scope without isCombo", async () => {
  models.setModelVisibility("openai", "gpt-4o-mini", "combos_only");
  // providerFailover.ts calls this without `isCombo` — a failover dispatch must not become a
  // route around the operator's choice.
  const direct = createVisibleResolvedModelGate({
    apiKeyInfo: null,
    request: null,
    contextModel: null,
    comboGrantsTargets: undefined,
    provider: "openai",
    model: "gpt-4o-mini",
    modelStr: "openai/gpt-4o-mini",
  });
  assert.equal((await direct(["openai/gpt-4o-mini"]))?.status, 404);
});

test("a stored combo still dispatches a combos_only leaf", async () => {
  models.setModelVisibility("openai", "combos-only-leaf", "combos_only");
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {},
    combo: {
      name: "operator-compiled",
      strategy: "priority",
      models: [{ model: "openai/combos-only-leaf" }],
      config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return Response.json({ choices: [{ message: { content: "ok" } }] });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/combos-only-leaf"]);
});

test("a stored combo never dispatches a hidden leaf", async () => {
  models.setModelVisibility("openai", "hidden-leaf", "hidden");
  const calls: string[] = [];
  await handleComboChat({
    body: {},
    combo: {
      name: "operator-compiled-hidden",
      strategy: "priority",
      models: [{ model: "openai/hidden-leaf" }, { model: "openai/visible-sibling" }],
      config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return Response.json({ choices: [{ message: { content: "ok" } }] });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.deepEqual(calls, ["openai/visible-sibling"]);
});
