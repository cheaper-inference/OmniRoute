import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("kimi-canonical-runtime");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const groups = await import("../../../src/lib/db/apiKeyGroups.ts");
const { GET: discover } = await import("../../../src/app/api/providers/[id]/models/route.ts");
const originalFetch = globalThis.fetch;
test.after(async () => {
  globalThis.fetch = originalFetch;
  await h.cleanup();
});

test("migrated connection runs both prefixes through the chat route, forced SSE and K3.1 tool/reasoning replay", async () => {
  await h.resetStorage();
  const conn = await h.seedConnection("moonshot", {
    apiKey: "fixture-kimi-secret",
    providerSpecificData: { baseUrl: "https://api.moonshot.cn/v1" },
  });
  const db = h.core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.equal(
    db
      .prepare<{ provider: string }>("SELECT provider FROM provider_connections WHERE id=?")
      .get(conn.id)?.provider,
    "kimi"
  );
  for (const prefix of ["moonshot", "kimi"]) {
    for (const stream of [false, true]) {
      let calls = 0;
      globalThis.fetch = (async (input, init) => {
        assert.equal(String(input), "https://api.moonshot.cn/v1/chat/completions");
        const request = JSON.parse(String(init?.body));
        assert.equal(request.model, "kimi-k3.1-pro");
        assert.equal(request.stream, true);
        assert.equal(request.reasoning_effort, "max");
        assert.equal(request.messages[1].reasoning_content, "verified thought");
        assert.equal(new Headers(init?.headers).get("authorization"), "Bearer fixture-kimi-secret");
        calls++;
        const frames = [
          {
            id: "fixture",
            model: "kimi-k3.1-pro",
            choices: [
              {
                index: 0,
                delta: {
                  role: "assistant",
                  content: "fixture answer",
                  reasoning_content: "answer thought",
                },
                finish_reason: null,
              },
            ],
          },
          {
            id: "fixture",
            model: "kimi-k3.1-pro",
            choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
            usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12 },
          },
        ];
        return new Response(
          frames.map((v) => "data: " + JSON.stringify(v) + "\n\n").join("") + "data: [DONE]\n\n",
          { headers: { "content-type": "text/event-stream" } }
        );
      }) as typeof fetch;
      const response = await h.handleChat(
        h.buildRequest({
          body: {
            model: prefix + "/kimi-k3.1-pro",
            stream,
            reasoning_effort: "xhigh",
            messages: [
              { role: "user", content: "Question " + prefix + stream },
              {
                role: "assistant",
                content: null,
                reasoning_content: "verified thought",
                tool_calls: [
                  {
                    id: "call_fixture",
                    type: "function",
                    function: { name: "lookup", arguments: "{}" },
                  },
                ],
              },
              { role: "tool", tool_call_id: "call_fixture", content: "result" },
              { role: "user", content: "answer" },
            ],
            tools: [
              {
                type: "function",
                function: { name: "lookup", parameters: { type: "object", properties: {} } },
              },
            ],
          },
        })
      );
      const body = await response.text();
      assert.equal(response.status, 200, body);
      assert.equal(calls, 1);
      if (stream) {
        assert.match(body, /fixture answer/);
        assert.match(body, /\[DONE\]/);
      } else {
        assert.equal(JSON.parse(body).choices[0].message.content, "fixture answer");
      }
    }
  }
  for (const stored of ["kimi", "moonshot"]) {
    db.prepare("UPDATE provider_connections SET provider=? WHERE id=?").run(stored, conn.id);
    const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
    invalidateDbCache();
    let url = "";
    globalThis.fetch = (async (input) => {
      url = String(input);
      return Response.json({ data: [{ id: "kimi-k3.1-pro", object: "model" }] });
    }) as typeof fetch;
    const response = await discover(
      new Request("http://localhost/api/providers/" + conn.id + "/models?refresh=true"),
      { params: Promise.resolve({ id: conn.id }) }
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(url, "https://api.moonshot.cn/v1/models");
  }
  const { invalidateModelCatalogCache } = await import("../../../src/lib/db/readCache.ts");
  const { getUnifiedModelsResponse } = await import("../../../src/app/api/v1/models/catalog.ts");
  invalidateModelCatalogCache();
  const catalogResponse = await getUnifiedModelsResponse(
    new Request("http://localhost/v1/models"),
    {},
    { scheduleBackgroundRefresh: () => {} }
  );
  assert.equal(catalogResponse.status, 200);
  const catalog = (await catalogResponse.json()) as { data: Array<{ id: string }> };
  assert.ok(catalog.data.some((model) => model.id === "kimi/kimi-k3.1-pro"));
  assert.equal(
    catalog.data.some((model) => model.id.startsWith("moonshot/")),
    false
  );
});

test("key and group exact/wildcard allow and deny rules are equivalent after later legacy writes", async () => {
  for (const saved of ["moonshot", "kimi"]) {
    for (const pattern of [saved + "/kimi-k3", saved + "/*", saved + "/kimi-*"]) {
      const key = await h.seedApiKey({ allowedModels: [pattern] });
      for (const request of ["moonshot", "kimi"])
        assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, request + "/kimi-k3"), true);
      assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, "openai/gpt-4o"), false);
      await h.apiKeysDb.updateApiKeyPermissions(key.id, { blockedModels: [pattern] });
      for (const request of ["moonshot", "kimi"])
        assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, request + "/kimi-k3"), false);
    }
    const key = await h.seedApiKey({ allowedModels: ["kimi/*"] });
    const group = groups.createKeyGroup("kimi-" + saved);
    groups.addKeyToGroup(key.id, group.id);
    groups.addGroupPermission(group.id, saved + "/*", "allow", saved);
    groups.addGroupPermission(group.id, "kimi-k3", "allow", saved);
    for (const request of ["moonshot", "kimi"]) {
      assert.equal(
        groups.checkKeyModelAccess(key.id, request + "/kimi-k3", request, "local-qualified")
          .allowed,
        true
      );
      h.apiKeysDb.clearApiKeyCaches();
      assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, request + "/kimi-k3"), true);
    }
    groups.addGroupPermission(group.id, "kimi/kimi-k3", "deny", "moonshot");
    for (const request of ["moonshot", "kimi"]) {
      h.apiKeysDb.clearApiKeyCaches();
      assert.equal(await h.apiKeysDb.isModelAllowedForKey(key.key, request + "/kimi-k3"), false);
    }
    assert.equal(
      groups.checkKeyModelAccess(key.id, "kimi-coding/kimi-k3", "kimi-coding").allowed,
      false
    );
  }
});

test("C5 later imported Moonshot connection dispatches both prefixes after migration marker", async () => {
  await h.resetStorage();
  const conn = await h.seedConnection("moonshot", {
    apiKey: "later-import-secret",
    providerSpecificData: { baseUrl: "https://api.moonshot.cn/v1" },
  });
  const db = h.core.getDbInstance();
  assert.ok(db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version='239'").get());
  const before = db.prepare("SELECT * FROM provider_connections WHERE id=?").get(conn.id);
  for (const prefix of ["moonshot", "kimi"]) {
    let calls = 0;
    globalThis.fetch = (async (_input, init) => {
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer later-import-secret");
      calls++;
      return new Response(
        'data: {"id":"later","choices":[{"index":0,"delta":{"content":"import works"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
        { headers: { "content-type": "text/event-stream" } }
      );
    }) as typeof fetch;
    const response = await h.handleChat(
      h.buildRequest({
        body: {
          model: prefix + "/kimi-k3",
          messages: [{ role: "user", content: "import " + prefix }],
        },
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    await response.text();
    assert.equal(calls, 1);
  }
  const after = db.prepare("SELECT * FROM provider_connections WHERE id=?").get(conn.id);
  assert.equal(after?.id, before?.id);
  assert.equal(after?.provider, "moonshot");
  assert.equal(after?.api_key, before?.api_key);
  assert.equal(after?.provider_specific_data, before?.provider_specific_data);
});

test("C9 default wire model and explicit outer routing prefix preserve vendor model bytes at executor", async () => {
  await h.resetStorage();
  const conn = await h.seedConnection("moonshot", {
    apiKey: "wire-secret",
    providerSpecificData: { baseUrl: "https://custom.test/v1" },
  });
  const db = h.core.getDbInstance();
  db.prepare("UPDATE provider_connections SET default_model='moonshot/custom' WHERE id=?").run(
    conn.id
  );
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.equal(
    db.prepare("SELECT default_model FROM provider_connections WHERE id=?").get(conn.id)
      ?.default_model,
    "moonshot/custom"
  );
  const aliases = await import("../../../src/lib/db/models.ts");
  await aliases.setModelAlias("default-wire", "kimi/auto");
  for (const [requested, model] of [
    ["default-wire", "moonshot/custom"],
    ["moonshot/moonshot/custom", "moonshot/custom"],
    ["moonshot/kimi/custom", "kimi/custom"],
  ]) {
    let wire = "";
    globalThis.fetch = (async (_input, init) => {
      wire = JSON.parse(String(init?.body)).model;
      return new Response(
        'data: {"id":"wire","choices":[{"index":0,"delta":{"content":"wire works"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
        { headers: { "content-type": "text/event-stream" } }
      );
    }) as typeof fetch;
    const response = await h.handleChat(
      h.buildRequest({
        body: { model: requested, messages: [{ role: "user", content: model }] },
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    await response.text();
    assert.equal(wire, model);
  }
});
