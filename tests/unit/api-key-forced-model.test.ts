/**
 * Per-key enforced model (`forcedModel`).
 *
 * An operator can pin an API key to one routing target (a provider/model, alias
 * or combo). Every chat-family request authenticated with that key is routed to
 * the pinned target, whatever `body.model` or `X-Route-Model` says, and even
 * when the client omits `model` altogether.
 *
 * The pin is a REWRITE, never a grant: the rewritten model still flows through
 * `enforceApiKeyPolicy`, so it cannot widen what the key may call (allowedModels,
 * allowedCombos) nor skip its budget.
 *
 * Rules:
 *   R1 The column is nullable with no default (keys predating it are unpinned).
 *   R2 The parser trims and maps blank/non-string values to null.
 *   R3 The PATCH schema accepts a string (alone) or null and rejects the rest.
 *   R4 The value round-trips through the DB and the metadata cache.
 *   R5 resolveApiKeyForcedModel reads the presented key's pin; nothing else pins.
 *   R6 Precedence: key pin > X-Route-Model > body.model.
 *   R7 The pin cannot bypass allowedModels / allowedCombos / budget.
 *   R8 /v1/models lists only the pinned model for a pinned key.
 *   R9 chat.ts resolves the pin BEFORE the policy check, and the route forwards it.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-api-key-forced-model-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "api-key-forced-model-secret";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const { API_KEY_COLUMN_FALLBACKS } = await import("../../src/lib/db/apiKeyColumnFallbacks.ts");
const { parseForcedModel } = await import("../../src/lib/db/apiKeys/rowParsers.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { resolveRoutingModel } = await import("../../src/sse/handlers/resolveRoutingModel.ts");
const { resolveApiKeyForcedModel } = await import("../../src/sse/handlers/apiKeyForcedModel.ts");
const { filterCatalogModelsForKey } =
  await import("../../src/app/api/v1/models/catalogKeyFilter.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");

rateLimiter.setRateLimiterTestMode(true);

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");

function chatRequest(apiKey: string | null, headers: Record<string, string> = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      ...headers,
    },
    body: "{}",
  });
}

async function seedKey(permissions: Record<string, unknown> = {}) {
  const key = await apiKeysDb.createApiKey(`forced-model-${Date.now()}`, "machine-forced");
  if (Object.keys(permissions).length > 0) {
    await apiKeysDb.updateApiKeyPermissions(key.id, permissions);
  }
  return key as { id: string; key: string };
}

/** Route a request exactly as chat.ts does: key pin first, then header, then body. */
async function routedModel(request: Request, body: { model?: string | null }) {
  return resolveRoutingModel(request, body, await resolveApiKeyForcedModel(request));
}

test.after(() => {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("R1: forced_model is a nullable column with no default", () => {
  const column = API_KEY_COLUMN_FALLBACKS.find((c: { name: string }) => c.name === "forced_model");
  assert.ok(column, "api_keys must gain a forced_model column");
  assert.equal(column.definition, "forced_model TEXT");
});

test("R2: the parser trims and maps blank or non-string values to null", () => {
  assert.equal(parseForcedModel("openai/gpt-4.1"), "openai/gpt-4.1");
  assert.equal(parseForcedModel("  my-combo  "), "my-combo");
  assert.equal(parseForcedModel(""), null);
  assert.equal(parseForcedModel("   "), null);
  assert.equal(parseForcedModel(null), null);
  assert.equal(parseForcedModel(undefined), null);
  assert.equal(parseForcedModel(42), null);
});

test("R3: the PATCH schema accepts a string or null, alone, and rejects the rest", () => {
  const set = schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: " openai/gpt-4.1 " });
  assert.equal(set.success, true, "a model id alone must be a valid update");
  if (set.success) assert.equal(set.data.forcedModel, "openai/gpt-4.1");

  const cleared = schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: null });
  assert.equal(cleared.success, true, "null alone must clear the pin");
  if (cleared.success) assert.equal(cleared.data.forcedModel, null);

  // Combo names may contain spaces (e.g. "Claude [1m]").
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: "Claude [1m]" }).success,
    true
  );
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: "x".repeat(301) }).success,
    false,
    "an overlong id must be rejected"
  );
  assert.equal(schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: 7 }).success, false);
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ forcedModel: ["openai/gpt-4.1"] }).success,
    false
  );
});

test("R4: forcedModel round-trips through the DB and invalidates the metadata cache", async () => {
  const key = await seedKey();
  // Warm the metadata cache with the unpinned value first.
  assert.equal((await apiKeysDb.getApiKeyMetadata(key.key))?.forcedModel, null);

  await apiKeysDb.updateApiKeyPermissions(key.id, { forcedModel: "openai/gpt-4.1" });
  assert.equal((await apiKeysDb.getApiKeyMetadata(key.key))?.forcedModel, "openai/gpt-4.1");
  assert.equal((await apiKeysDb.getApiKeyById(key.id))?.forcedModel, "openai/gpt-4.1");
  const listed = (await apiKeysDb.getApiKeys()).find((row: { id: string }) => row.id === key.id);
  assert.equal(listed?.forcedModel, "openai/gpt-4.1");

  await apiKeysDb.updateApiKeyPermissions(key.id, { forcedModel: null });
  assert.equal((await apiKeysDb.getApiKeyMetadata(key.key))?.forcedModel, null);
  assert.equal((await apiKeysDb.getApiKeyById(key.id))?.forcedModel, null);
});

test("R5: only the presented key's own pin is resolved", async () => {
  const pinned = await seedKey({ forcedModel: "openai/gpt-4.1" });
  const plain = await seedKey();

  assert.equal(await resolveApiKeyForcedModel(chatRequest(pinned.key)), "openai/gpt-4.1");
  assert.equal(await resolveApiKeyForcedModel(chatRequest(plain.key)), null);
  assert.equal(await resolveApiKeyForcedModel(chatRequest(null)), null, "no key → no pin");
  assert.equal(
    await resolveApiKeyForcedModel(chatRequest("sk-not-a-real-key")),
    null,
    "an unknown key has no pin"
  );
  // Internal self-loop sub-requests (fusion panels, vision describe) carry the
  // self-loop bearer scoped to the parent key. They must keep their own target,
  // never be collapsed onto the parent key's pin.
  assert.equal(
    await resolveApiKeyForcedModel(
      chatRequest(resolveSelfLoopBearer(), { "x-omniroute-self-loop-key-id": pinned.id })
    ),
    null
  );
});

test("R6: the key pin beats X-Route-Model and body.model, and fills a missing model", async () => {
  const pinned = await seedKey({ forcedModel: "openai/gpt-4.1" });
  const plain = await seedKey();

  assert.equal(
    await routedModel(chatRequest(pinned.key), { model: "anthropic/claude-sonnet-4" }),
    "openai/gpt-4.1"
  );
  assert.equal(
    await routedModel(chatRequest(pinned.key, { "x-route-model": "my-combo" }), {
      model: "anthropic/claude-sonnet-4",
    }),
    "openai/gpt-4.1",
    "an operator pin must beat a client-controlled header"
  );
  assert.equal(await routedModel(chatRequest(pinned.key), {}), "openai/gpt-4.1");
  assert.equal(await routedModel(chatRequest(pinned.key), { model: null }), "openai/gpt-4.1");

  // Unpinned keys keep the previous behaviour exactly.
  assert.equal(
    await routedModel(chatRequest(plain.key, { "x-route-model": "my-combo" }), {
      model: "anthropic/claude-sonnet-4",
    }),
    "my-combo"
  );
  assert.equal(
    await routedModel(chatRequest(plain.key), { model: "anthropic/claude-sonnet-4" }),
    "anthropic/claude-sonnet-4"
  );
  assert.equal(await routedModel(chatRequest(plain.key), {}), undefined);
  assert.equal(resolveRoutingModel(chatRequest(null), { model: "a/b" }, "   "), "a/b");
});

test("R7a: a pin outside allowedModels is rejected even when body.model is allowed", async () => {
  const key = await seedKey({
    allowedModels: ["openai/gpt-4.1"],
    forcedModel: "anthropic/claude-sonnet-4",
  });
  const request = chatRequest(key.key);
  const modelStr = await routedModel(request, { model: "openai/gpt-4.1" });
  assert.equal(modelStr, "anthropic/claude-sonnet-4");

  const policy = await enforceApiKeyPolicy(request, modelStr);
  assert.ok(policy.rejection, "the pin must not widen the allowlist");
  assert.equal(policy.rejection.status, 403);
});

test("R7b: a pin inside allowedModels passes the policy", async () => {
  const key = await seedKey({
    allowedModels: ["openai/gpt-4.1"],
    forcedModel: "openai/gpt-4.1",
  });
  const request = chatRequest(key.key);
  const modelStr = await routedModel(request, { model: "anthropic/claude-sonnet-4" });
  const policy = await enforceApiKeyPolicy(request, modelStr);
  assert.equal(policy.rejection, null);
  assert.equal(policy.apiKeyInfo?.forcedModel, "openai/gpt-4.1");
});

test("R7c: a pinned combo outside allowedCombos is rejected", async () => {
  await combosDb.createCombo({
    name: "forced-fast",
    strategy: "priority",
    models: ["openai/gpt-4.1"],
  });
  const key = await seedKey({ allowedCombos: ["other-combo"], forcedModel: "combo/forced-fast" });
  const request = chatRequest(key.key);
  const modelStr = await routedModel(request, { model: "combo/other-combo" });
  assert.equal(modelStr, "combo/forced-fast");

  const policy = await enforceApiKeyPolicy(request, modelStr);
  assert.ok(policy.rejection, "the pin must not widen allowedCombos");
  assert.equal(policy.rejection.status, 403);
});

test("R7d: a pinned key with an exhausted budget is still rejected", async () => {
  const key = await seedKey({ forcedModel: "openai/gpt-4.1" });
  const meta = await apiKeysDb.getApiKeyMetadata(key.key);
  costRules.setBudget(meta.id, { dailyLimitUsd: 1, warningThreshold: 0.5 });
  costRules.recordCost(meta.id, 2);

  const request = chatRequest(key.key);
  const modelStr = await routedModel(request, { model: "anthropic/claude-sonnet-4" });
  const policy = await enforceApiKeyPolicy(request, modelStr);
  assert.ok(policy.rejection, "the pin must not skip the budget check");
  assert.equal(policy.rejection.status, 429);
});

test("R8: the catalog lists only the pinned model for a pinned key", async () => {
  const rows = [
    { id: "openai/gpt-4.1", owned_by: "openai" },
    { id: "anthropic/claude-sonnet-4", owned_by: "anthropic" },
    { id: "fast", owned_by: "combo" },
  ];
  const deps = {
    isModelAllowedForKey: async () => true,
    isModelBlockedByPatterns: async () => false,
  };
  const noYield = async () => {};

  const pinned = await filterCatalogModelsForKey(
    "sk-test",
    rows,
    { catalogScope: "all", allowedCombos: [], blockedModels: [], forcedModel: "openai/gpt-4.1" },
    deps,
    noYield
  );
  assert.deepEqual(
    pinned.map((m) => m.id),
    ["openai/gpt-4.1"]
  );

  const unpinned = await filterCatalogModelsForKey(
    "sk-test",
    rows,
    { catalogScope: "all", allowedCombos: ["fast"], blockedModels: [], forcedModel: null },
    deps,
    noYield
  );
  assert.deepEqual(
    unpinned.map((m) => m.id),
    ["openai/gpt-4.1", "anthropic/claude-sonnet-4", "fast"]
  );

  // The pin is never a grant: a pinned model the key may not call stays hidden.
  const denied = await filterCatalogModelsForKey(
    "sk-test",
    rows,
    { catalogScope: "all", allowedCombos: [], blockedModels: [], forcedModel: "openai/gpt-4.1" },
    { ...deps, isModelAllowedForKey: async () => false },
    noYield
  );
  assert.deepEqual(denied, []);
});

test("R9: chat.ts resolves the pin before the policy check; the route forwards it", () => {
  const chat = read("src/sse/handlers/chat.ts");
  const resolveAt = chat.indexOf(
    "resolveRoutingModel(request, body, await resolveApiKeyForcedModel(request, log))"
  );
  const policyAt = chat.indexOf("await enforceApiKeyPolicy(request, modelStr");
  assert.ok(resolveAt > 0, "chat.ts must route through the key pin");
  assert.ok(policyAt > resolveAt, "the pinned model must be the one the policy validates");

  const route = read("src/app/api/keys/[id]/route.ts");
  assert.ok(
    route.includes("if (forcedModel !== undefined) payload.forcedModel = forcedModel"),
    "PATCH /api/keys/[id] must forward forcedModel to updateApiKeyPermissions"
  );
});

test("R10: the API Manager form loads, trims and clears the enforced model", async () => {
  const { buildApiKeyAccessPayload, createInitialFormState } =
    await import("../../src/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm.ts");
  const key = { id: "k", name: "Pinned", forcedModel: "openai/gpt-4.1" };

  const state = createInitialFormState(key);
  assert.equal(state.forcedModel, "openai/gpt-4.1");
  assert.equal(createInitialFormState({ id: "k", name: "Plain" }).forcedModel, "");

  assert.equal(
    buildApiKeyAccessPayload({ ...state, forcedModel: "  combo/fast  " }, key).forcedModel,
    "combo/fast"
  );
  assert.equal(
    buildApiKeyAccessPayload({ ...state, forcedModel: "   " }, key).forcedModel,
    null,
    "a blank field must clear the pin, not store whitespace"
  );

  const tab = read("src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/ModelsTab.tsx");
  assert.ok(tab.includes("<ForcedModelSetting"), "the models tab must render the control");
});
