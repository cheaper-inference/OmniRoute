import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("kimi-boundaries");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const limits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");
const groups = await import("../../src/lib/db/apiKeyGroups.ts");
const { isDeniedUnderCanonicalProvider } =
  await import("../../src/lib/db/apiKeys/publishedModelLookup.ts");
const models = await import("../../src/lib/db/models.ts");
const search = await import("../../src/app/api/v1/search/route.ts");
const { getUnifiedModelsResponse } = await import("../../src/app/api/v1/models/catalog.ts");
const originalFetch = globalThis.fetch;
test.after(async () => {
  globalThis.fetch = originalFetch;
  await h.cleanup();
});
function migrate() {
  const db = h.core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
}
function responseSse(model: string) {
  return new Response(
    [
      "data: " +
        JSON.stringify({
          id: "wire-budget",
          model,
          choices: [{ index: 0, delta: { content: "wire answer" }, finish_reason: null }],
        }),
      "data: " +
        JSON.stringify({
          id: "wire-budget",
          model,
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
        }),
      "data: [DONE]",
      "",
    ].join(String.fromCharCode(10, 10)),
    { headers: { "content-type": "text/event-stream" } }
  );
}

test("A actual resolved wire usage advances its migrated model counter and exhausts only that model", async () => {
  await h.resetStorage();
  await h.seedConnection("moonshot", {
    apiKey: "budget-secret",
    providerSpecificData: { baseUrl: "https://custom.test/v1" },
  });
  const key = await h.seedApiKey();
  const limit = limits.upsertTokenLimit({
    apiKeyId: key.id,
    scopeType: "model",
    scopeValue: "moonshot/moonshot/custom",
    tokenLimit: 3,
    resetInterval: "daily",
  });
  migrate();
  assert.equal(limits.listTokenLimits(key.id)[0].scopeValue, "moonshot/moonshot/custom");
  let calls = 0;
  globalThis.fetch = (async (_input, init) => {
    calls++;
    return responseSse(JSON.parse(String(init?.body)).model);
  }) as typeof fetch;
  const send = (wire: string) =>
    h.handleChat(
      h.buildRequest({
        authKey: key.key,
        body: {
          model: "kimi/" + wire,
          stream: false,
          messages: [{ role: "user", content: wire + calls }],
        },
      })
    );
  const first = await send("moonshot/custom");
  assert.equal(first.status, 200, await first.clone().text());
  await first.text();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(limits.getWindowUsage(limit), 3);
  assert.equal(counter.checkTokenLimits(key.id, "kimi", "moonshot/custom")?.limitId, limit.id);
  assert.equal(counter.checkTokenLimits(key.id, "kimi", "kimi/custom"), null);
  const exhausted = await send("moonshot/custom");
  assert.equal(exhausted.status, 429, await exhausted.clone().text());
  await exhausted.text();
  assert.equal(calls, 1);
  const distinct = await send("kimi/custom");
  assert.equal(distinct.status, 200, await distinct.clone().text());
  await distinct.text();
  assert.equal(calls, 2);
  assert.equal(limits.getWindowUsage(limit), 3);
});

for (const denied of [false, true]) {
  test(
    "B actual API-key group preserves raw/full conjunction before and after migration: " + denied,
    async () => {
      await h.resetStorage();
      const key = await h.seedApiKey();
      const group = groups.createKeyGroup("wire-group");
      assert.equal(groups.addKeyToGroup(key.id, group.id), true);
      if (denied) groups.addGroupPermission(group.id, "*", "allow", "moonshot");
      for (const pattern of ["moonshot/custom", "moonshot/moonshot/custom"])
        groups.addGroupPermission(group.id, pattern, denied ? "deny" : "allow", "moonshot");
      for (const migrated of [false, true]) {
        if (migrated) migrate();
        h.apiKeysDb.clearApiKeyCaches();
        for (const provider of ["kimi", "moonshot"]) {
          assert.equal(
            await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/moonshot/custom"),
            !denied
          );
          assert.equal(
            await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/kimi/custom"),
            denied
          );
          assert.equal(
            await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/custom"),
            false
          );
        }
        assert.deepEqual(
          groups
            .getGroupPermissions(group.id)
            .filter((rule) => rule.modelPattern !== "*")
            .map((rule) => rule.modelPattern)
            .sort(),
          ["moonshot/custom", "moonshot/moonshot/custom"]
        );
      }
    }
  );
}

for (const wire of ["custom", "moonshot/custom"])
  test(
    "B a qualified-only group grant cannot replace the required raw-wire allow: " + wire,
    async () => {
      await h.resetStorage();
      const key = await h.seedApiKey();
      const group = groups.createKeyGroup("qualified-only");
      assert.equal(groups.addKeyToGroup(key.id, group.id), true);
      groups.addGroupPermission(group.id, "moonshot/" + wire, "allow", "moonshot");
      for (const migrated of [false, true]) {
        if (migrated) migrate();
        h.apiKeysDb.clearApiKeyCaches();
        for (const provider of ["kimi", "moonshot"])
          assert.equal(
            await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/" + wire),
            false
          );
      }
    }
  );

test("B canonical deny lookup marks only the full reference as local-qualified", async () => {
  await h.resetStorage();
  const key = await h.seedApiKey();
  const group = groups.createKeyGroup("canonical-deny");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);
  groups.addGroupPermission(group.id, "*", "allow", "moonshot");
  groups.addGroupPermission(group.id, "moonshot/moonshot/custom", "deny", "moonshot");
  migrate();
  for (const provider of ["moonshot", "kimi"]) {
    assert.equal(
      await isDeniedUnderCanonicalProvider(key.id, provider, "moonshot/custom"),
      provider === "moonshot"
    );
    assert.equal(await isDeniedUnderCanonicalProvider(key.id, provider, "kimi/custom"), false);
    assert.equal(await isDeniedUnderCanonicalProvider(key.id, provider, "custom"), false);
    h.apiKeysDb.clearApiKeyCaches();
    assert.equal(
      await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/moonshot/custom"),
      false
    );
    assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, provider + "/kimi/custom"), true);
  }
});

for (const rawProvider of ["moonshot", "kimi", "kimi-search"])
  for (const blockedProviders of [
    [],
    ["kimi"],
    ["moonshot"],
    ["kimi-search"],
    ["moonshot", "kimi"],
  ]) {
    test(
      "C actual Search POST preserves raw provider boundary: " +
        rawProvider +
        " " +
        JSON.stringify(blockedProviders),
      async () => {
        await h.resetStorage();
        await h.settingsDb.updateSettings({ blockedProviders });
        const key = await h.seedApiKey();
        let calls = 0;
        globalThis.fetch = (async () => {
          calls++;
          throw new Error("Unexpected search dispatch");
        }) as typeof fetch;
        const response = await search.POST(
          h.buildRequest({
            url: "http://localhost/v1/search",
            authKey: key.key,
            body: { provider: rawProvider, query: "raw provider boundary" },
          })
        );
        const payload = await response.json();
        const blocked =
          rawProvider === "moonshot"
            ? blockedProviders.includes("moonshot")
            : blockedProviders.includes("kimi") ||
              (rawProvider === "kimi-search" && blockedProviders.includes("kimi-search"));
        assert.equal(response.status, blocked ? 403 : 400, JSON.stringify(payload));
        assert.match(
          payload.error.message,
          blocked ? /blocked by security policy/ : /No credentials configured for search provider/
        );
        assert.equal(calls, 0);
        const listing = await search.GET();
        const available = (await listing.json()).data as Array<{ id: string }>;
        assert.equal(
          available.some((entry) => entry.id === "kimi-search"),
          !blockedProviders.includes("kimi") && !blockedProviders.includes("kimi-search")
        );
      }
    );
  }

for (const blockedProviders of [[], ["moonshot"], ["kimi"]]) {
  test(
    "D alias-backed Kimi catalog emission respects saved API block spelling: " +
      JSON.stringify(blockedProviders),
    async () => {
      await h.resetStorage();
      await h.seedConnection("moonshot");
      await h.seedConnection("openrouter");
      await models.setModelAlias("saved-kimi", "moonshot/alias-only-model");
      await models.setModelAlias("saved-other", "openrouter/other-alias-only");
      migrate();
      await h.settingsDb.updateSettings({ blockedProviders });
      assert.equal((await models.getModelAliases())["saved-kimi"], "kimi/alias-only-model");
      const response = await getUnifiedModelsResponse(
        new Request("http://localhost/v1/models"),
        {},
        { scheduleBackgroundRefresh: () => {} }
      );
      assert.equal(response.status, 200);
      const data = (await response.json()).data as Array<{ id: string }>;
      assert.equal(
        data.some((entry) => entry.id === "kimi/alias-only-model"),
        blockedProviders.length === 0
      );
      assert.equal(
        data.some((entry) => entry.id === "openrouter/other-alias-only"),
        true
      );
      const searchResponse = await search.GET();
      const available = (await searchResponse.json()).data as Array<{ id: string }>;
      assert.equal(
        available.some((entry) => entry.id === "kimi-search"),
        !blockedProviders.includes("kimi")
      );
    }
  );
}
