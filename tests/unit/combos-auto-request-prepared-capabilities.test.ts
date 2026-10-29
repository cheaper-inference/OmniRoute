/**
 * #16419 — the `auto/*` request path shares one pool preparation.
 *
 * Default path (AUTO_REQUEST_RESOLVED_CAPABILITIES off): `resolveModelOrError`
 * prepares the pool once, lazily, and hands it to the primary attempt and the
 * fuzzy fallbacks. It must serve exactly what `createBuiltinAutoCombo(id, suffix)`
 * (the release-tip code path, which prepares inside `createVirtualAutoCombo`)
 * serves: same members, same order, same snapshot weights, same advertised limits.
 * Unknown ids must not prepare a pool at all.
 *
 * AUTO_REQUEST_RESOLVED_CAPABILITIES (opt-in) prepares with resolved capabilities
 * and quality scores. Those feed `computeSnapshotWeights`, so the same members in
 * the same order get different weights; both request paths (resolveModelOrError
 * and the auto-routing wrapper) must honor the flag, and only when it is on.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-req-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "auto-req-test-secret";
delete process.env.AUTO_REQUEST_RESOLVED_CAPABILITIES;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveModelOrError } = await import("../../src/sse/handlers/chatHelpers.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

const PROVIDERS = ["openai", "anthropic", "gemini", "groq", "deepseek", "mistral"];
let seeded = false;

async function seedProviders() {
  if (seeded) return;
  seeded = true;
  await settingsDb.updateSettings({ requireLogin: false });
  for (const provider of PROVIDERS) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-auto-req-${provider}`,
      name: `test-auto-req-${provider}`,
      isActive: true,
    });
  }
}

type ComboLike = {
  models?: Array<Record<string, unknown>>;
  candidatePool?: string[];
  weights?: unknown;
  advertisedContextLength?: number | null;
  advertisedMaxOutputTokens?: number | null;
  config?: unknown;
  name?: string;
};

/** Everything routing reads from a virtual combo: members, order, weights, limits. */
function routingView(combo: ComboLike) {
  return JSON.parse(
    JSON.stringify({
      name: combo.name,
      models: combo.models,
      candidatePool: combo.candidatePool,
      weights: combo.weights,
      config: combo.config,
      advertisedContextLength: combo.advertisedContextLength,
      advertisedMaxOutputTokens: combo.advertisedMaxOutputTokens,
    })
  );
}

const BODY = { messages: [{ role: "user", content: "hi" }] };

for (const [modelStr, suffix] of [
  ["auto/coding", "coding"],
  ["auto/vision", "vision"],
  ["auto/reasoning", "reasoning"],
  ["auto/best-chat", "best-chat"],
] as const) {
  test(`default path: ${modelStr} serves the same members, order and weights as the tip path`, async () => {
    await seedProviders();
    const result = await resolveModelOrError(modelStr, BODY, "/v1/chat/completions");
    assert.equal(result.error, undefined);
    assert.ok(result.combo, "expected a built-in virtual combo");
    const tipPath = await builtinCatalog.createBuiltinAutoCombo(modelStr, suffix);
    assert.ok((tipPath.models?.length ?? 0) > 0, "seeded pool should not be empty");
    assert.deepEqual(routingView(result.combo), routingView(tipPath));
  });
}

test("default path: a fuzzy fallback serves the same combo as the tip path", async () => {
  await seedProviders();
  // `auto/coding-fast` is not a built-in id; `auto/best-coding-fast` is.
  const result = await resolveModelOrError("auto/coding-fast", BODY, "/v1/chat/completions");
  assert.equal(result.error, undefined);
  assert.ok(result.combo, "expected the fuzzy built-in combo");
  const tipPath = await builtinCatalog.createBuiltinAutoCombo(
    "auto/best-coding-fast",
    "best-coding-fast"
  );
  assert.deepEqual(routingView(result.combo), routingView(tipPath));
});

test("prepared loader runs only when a combo materializes, once per attempt", async () => {
  await seedProviders();
  let calls = 0;
  let cached: Awaited<ReturnType<typeof virtualFactory.prepareVirtualAutoComboInputs>> | undefined;
  const loader = async () => {
    calls++;
    return (cached ??= await virtualFactory.prepareVirtualAutoComboInputs());
  };
  await assert.rejects(
    builtinCatalog.createBuiltinAutoCombo("auto/zzz-not-a-builtin", "zzz-not-a-builtin", loader),
    /Unknown built-in auto combo/
  );
  assert.equal(calls, 0, "an unknown id must not prepare a pool");
  const combo = await builtinCatalog.createBuiltinAutoCombo("auto/coding", "coding", loader);
  assert.equal(calls, 1);
  assert.deepEqual(
    routingView(combo),
    routingView(await builtinCatalog.createBuiltinAutoCombo("auto/coding", "coding"))
  );
});

test("default path: an unknown auto id keeps the 400", async () => {
  await seedProviders();
  const result = await resolveModelOrError("auto/zzz-not-a-builtin", BODY, "/v1/chat/completions");
  assert.ok(result.error, "unknown built-in id must stay an error");
  assert.equal(result.error.status, 400);
  assert.equal(result.combo, undefined);
  await result.error.body?.cancel();
});

const FLAG = "AUTO_REQUEST_RESOLVED_CAPABILITIES";

async function withFlag<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const previous = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

const memberOrder = (combo: ComboLike) =>
  (combo.models ?? []).map((m) => `${m.providerId}|${m.model}|${m.connectionId ?? ""}`);
const weightsOf = (combo: ComboLike) => (combo.models ?? []).map((m) => m.weight);

/** The resolved-capability combo for an id, built the way the flag-on path builds it. */
async function resolvedPath(modelStr: string, suffix: string) {
  return builtinCatalog.createBuiltinAutoCombo(
    modelStr,
    suffix,
    await builtinCatalog.prepareBuiltinAutoComboInputs()
  );
}

test("flag on: auto/coding keeps members and order but takes the resolved-capability weights", async () => {
  await seedProviders();
  const tipPath = await builtinCatalog.createBuiltinAutoCombo("auto/coding", "coding");
  const resolved = await resolvedPath("auto/coding", "coding");
  // Precondition: on this seed the resolved inputs really do change the weights.
  assert.notDeepEqual(weightsOf(resolved), weightsOf(tipPath));
  assert.deepEqual(memberOrder(resolved), memberOrder(tipPath));

  const off = await withFlag("false", () =>
    resolveModelOrError("auto/coding", BODY, "/v1/chat/completions")
  );
  assert.ok(off.combo);
  assert.deepEqual(weightsOf(off.combo), weightsOf(tipPath), "flag off keeps the tip weights");

  const on = await withFlag("true", () =>
    resolveModelOrError("auto/coding", BODY, "/v1/chat/completions")
  );
  assert.ok(on.combo);
  assert.deepEqual(memberOrder(on.combo), memberOrder(tipPath), "flag on keeps the member order");
  assert.deepEqual(routingView(on.combo), routingView(resolved));
});

test("flag on/off: the auto-routing wrapper honors the flag", async () => {
  await seedProviders();
  const { resolveAutoRoutingState, createVirtualAutoCombo } =
    await import("../../src/sse/handlers/autoRouting.ts");
  const state = await resolveAutoRoutingState("auto/coding");
  assert.ok(state.isAutoRouting, "auto/coding should route through the wrapper");
  const tipPath = await virtualFactory.createVirtualAutoCombo(state.variant, state.spec);
  const resolved = await virtualFactory.createVirtualAutoComboFromPrepared(
    await virtualFactory.prepareVirtualAutoComboInputs({ includeResolvedCapabilities: true }),
    state.variant,
    state.spec
  );
  assert.notDeepEqual(weightsOf(resolved), weightsOf(tipPath));

  const off = await withFlag(undefined, () => createVirtualAutoCombo(state, null));
  assert.ok(off && !(off instanceof Response));
  assert.deepEqual(memberOrder(off), memberOrder(tipPath));
  assert.deepEqual(weightsOf(off), weightsOf(tipPath), "default keeps the tip weights");

  const on = await withFlag("true", () => createVirtualAutoCombo(state, null));
  assert.ok(on && !(on instanceof Response));
  assert.deepEqual(memberOrder(on), memberOrder(tipPath), "flag on keeps the member order");
  assert.deepEqual(weightsOf(on), weightsOf(resolved), "flag on takes the resolved weights");
});

test("default path: no connected candidate keeps the existing 503", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  seeded = false;
  const result = await resolveModelOrError("auto/coding:pro", BODY, "/v1/chat/completions");
  assert.ok(result.error, "expected an error result, not a combo");
  assert.equal(result.error.status, 503, "empty auto pool must fail fast with 503");
  assert.equal(result.combo, undefined, "must not return a combo for an empty pool");
  await result.error.body?.cancel();
});
