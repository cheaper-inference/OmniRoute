import assert from "node:assert/strict";
import test from "node:test";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { GET as discoverModels } from "../../src/app/api/providers/[id]/models/route.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { createProviderConnection } from "../../src/lib/db/providers.ts";
import { isValidModel } from "../../src/shared/constants/models.ts";
import { AGGREGATOR_PROVIDER_IDS, APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { getModelInfo } from "../../src/sse/services/model.ts";

const apiKey = "atlascloud-test-key";
const modelId = "qwen/atlas-fixture-model";
const modelsUrl = "https://api.atlascloud.ai/v1/models";
const chatUrl = "https://api.atlascloud.ai/v1/chat/completions";

test.after(() => resetDbInstance());

test("Atlas Cloud is available in the dashboard as a native API-key provider", () => {
  const entry = Object.entries(APIKEY_PROVIDERS).find(([id]) => id === "atlascloud")?.[1];
  assert.ok(entry, "Atlas Cloud must be available in the API-key provider catalog");
  assert.equal(entry.name, "Atlas Cloud");
  assert.equal(entry.alias, "ac");
  assert.ok(AGGREGATOR_PROVIDER_IDS.has("atlascloud"));
});

test("Atlas Cloud discovers models with Bearer auth and dispatches a discovered ID verbatim", async (t) => {
  const calls: Array<{ url: string; method: string; authorization: string | null }> = [];
  const sentModels: string[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    if (new URL(request.url).pathname.includes("__readiness_probe__")) {
      return new Response(null, { status: 404 });
    }
    calls.push({
      url: request.url,
      method: request.method,
      authorization: request.headers.get("Authorization"),
    });
    if (request.url === modelsUrl) {
      return Response.json({ object: "list", data: [{ id: modelId }] });
    }
    if (request.url === chatUrl) {
      sentModels.push((await request.json()).model);
      return Response.json({
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
        ],
      });
    }
    return new Response(null, { status: 404 });
  });

  const connection = await createProviderConnection({
    provider: "atlascloud",
    authType: "apikey",
    name: "Atlas Cloud fixture",
    apiKey,
  });
  const connectionId = connection.id;
  assert.ok(typeof connectionId === "string");
  const response = await discoverModels(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
  assert.equal(response.status, 200, "Atlas Cloud must support live model discovery");
  const catalog: { source: string; models: Array<{ id: string }> } = await response.json();
  assert.equal(catalog.source, "api");
  assert.deepEqual(
    catalog.models.map(({ id }) => id),
    [modelId]
  );

  const entry = getRegistryEntry("atlascloud");
  assert.ok(entry?.models.length, "Atlas Cloud must have a seed catalog");
  assert.ok(!entry.models.some(({ id }) => id === modelId));
  assert.equal(isValidModel("ac", modelId), true);
  const resolved = await getModelInfo(`ac/${catalog.models[0].id}`);
  assert.equal(resolved.provider, "atlascloud");
  assert.equal(resolved.model, modelId);

  const executor = await getExecutor(resolved.provider);
  const result = await executor.execute({
    model: resolved.model,
    body: { model: resolved.model, messages: [{ role: "user", content: "Hi" }] },
    stream: false,
    credentials: { apiKey },
  });
  const upstreamResponse = result instanceof Response ? result : result.response;
  assert.equal(upstreamResponse.status, 200);
  assert.deepEqual(sentModels, [modelId]);
  assert.deepEqual(calls, [
    { url: modelsUrl, method: "GET", authorization: `Bearer ${apiKey}` },
    { url: chatUrl, method: "POST", authorization: `Bearer ${apiKey}` },
  ]);
});
