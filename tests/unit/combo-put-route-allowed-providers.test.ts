// #13951 — route-level regression coverage for the PUT /api/combos/[id]
// overrideAllowedProviders sync path. tests/unit/combo-update-invariants.test.ts
// only exercises combosDb.updateCombo() directly, bypassing the PUT route
// branch this test targets.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-put-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function put(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/combos/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("PUT with overrideAllowedProviders on a combo with NO prior restriction stays unrestricted", async () => {
  const combo = await combosDb.createCombo({
    name: "unrestricted-combo",
    strategy: "priority",
    models: [{ provider: "claude", model: "claude-sonnet-5" }],
  });
  assert.ok(combo?.id);
  assert.equal((combo as { allowedProviders?: string[] }).allowedProviders, undefined);

  const response = await comboRoute.PUT(
    put(combo.id, {
      name: "unrestricted-combo",
      models: [
        { provider: "claude", model: "claude-sonnet-5" },
        { provider: "openai", model: "gpt-5" },
      ],
      overrideAllowedProviders: true,
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  assert.equal(response.status, 200);

  const stored = (await combosDb.getComboById(combo.id)) as { allowedProviders?: string[] };
  // The combo had no restriction before the edit — it must still have none
  // afterwards. Synthesizing allowedProviders=["claude","openai"] here would
  // be the #13951 regression: a later add-a-provider update would start
  // failing COMBO_008 where it previously succeeded.
  assert.equal(stored.allowedProviders, undefined);
});

test("PUT with overrideAllowedProviders on a combo with an EXISTING restriction unions the new step providers", async () => {
  const combo = await combosDb.createCombo({
    name: "restricted-combo",
    strategy: "priority",
    allowedProviders: ["claude"],
    models: [{ provider: "claude", model: "claude-sonnet-5" }],
  });
  assert.ok(combo?.id);

  const response = await comboRoute.PUT(
    put(combo.id, {
      name: "restricted-combo",
      models: [
        { provider: "claude", model: "claude-sonnet-5" },
        { provider: "openai", model: "gpt-5" },
      ],
      overrideAllowedProviders: true,
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  assert.equal(response.status, 200);

  const stored = (await combosDb.getComboById(combo.id)) as { allowedProviders?: string[] };
  assert.deepEqual([...(stored.allowedProviders ?? [])].sort(), ["claude", "openai"]);
});

test("PUT persists capability routes and widens an existing provider restriction from their targets", async () => {
  const combo = await combosDb.createCombo({
    name: "restricted-capability-combo",
    strategy: "priority",
    allowedProviders: ["claude"],
    models: [{ provider: "claude", model: "claude-sonnet-5" }],
  });
  assert.ok(combo?.id);

  const response = await comboRoute.PUT(
    put(combo.id, {
      routes: {
        search: {
          strategy: "round-robin",
          models: [{ providerId: "tavily-search", model: "web" }],
        },
      },
      overrideAllowedProviders: true,
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  assert.equal(response.status, 200, await response.clone().text());

  const stored = (await combosDb.getComboById(combo.id)) as {
    allowedProviders?: string[];
    routes?: { search?: { strategy?: string; models?: Array<{ providerId?: string }> } };
  };
  assert.deepEqual([...(stored.allowedProviders ?? [])].sort(), ["claude", "tavily-search"]);
  assert.equal(stored.routes?.search?.strategy, "round-robin");
  assert.equal(stored.routes?.search?.models?.[0]?.providerId, "tavily-search");
});

test("PUT keeps an existing routes.chat mirror synchronized with top-level Chat updates", async () => {
  const combo = await combosDb.createCombo({
    name: "chat-sync-combo",
    strategy: "priority",
    config: { maxRetries: 1 },
    models: [{ provider: "openai", model: "gpt-4o" }],
    routes: {
      chat: {
        strategy: "priority",
        config: { maxRetries: 1 },
        models: [{ provider: "openai", model: "gpt-4o" }],
      },
      music: {
        strategy: "priority",
        models: [{ provider: "elevenlabs", model: "music_v1" }],
      },
    },
  });
  assert.ok(combo?.id);

  const response = await comboRoute.PUT(
    put(combo.id, {
      strategy: "round-robin",
      config: { maxRetries: 2 },
      models: [{ provider: "openai", model: "gpt-4o-mini" }],
    }),
    { params: Promise.resolve({ id: combo.id }) }
  );
  assert.equal(response.status, 200, await response.clone().text());

  const stored = (await combosDb.getComboById(combo.id)) as {
    models?: Array<{ model?: string }>;
    routes?: Record<
      string,
      { strategy?: string; config?: { maxRetries?: number }; models?: Array<{ model?: string }> }
    >;
  };
  assert.equal(stored.models?.[0]?.model, "openai/gpt-4o-mini");
  assert.equal(stored.routes?.chat?.models?.[0]?.model, "openai/gpt-4o-mini");
  assert.equal(stored.routes?.chat?.strategy, "round-robin");
  assert.equal(stored.routes?.chat?.config?.maxRetries, 2);
  assert.equal(stored.routes?.music?.models?.[0]?.model, "music_v1");
});
