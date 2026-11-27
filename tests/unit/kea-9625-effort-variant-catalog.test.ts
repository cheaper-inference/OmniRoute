import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { gunzipSync } from "node:zlib";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9625-data-"));
const homeDir = mkdtempSync(join(tmpdir(), "omniroute-kea-9625-home-"));
process.env.DATA_DIR = dataDir;
process.env.HOME = homeDir;
process.env.API_KEY_SECRET = "kea-9625-test-secret";
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS = "false";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { addCustomModel, replaceSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getActiveSyncedCatalog } = await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { GET } = await import("../../src/app/api/v1/models/route.ts");
const { POST } = await import("../../src/app/api/v1/chat/completions/route.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const provider = "cheaperinference";
const base = "claude-haiku-4.5";
const baseId = `${provider}/${base}`;
let connectionId: string;

test.before(async () => {
  const connection = await createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "synthetic-cheaperinference-key",
    name: "KEA-9625 fixture",
    isActive: true,
    testStatus: "active",
  });
  connectionId = connection.id;
});

test.after(async () => {
  try {
    await closeCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
    flushProxyLogsSync();
  } finally {
    resetDbInstance();
    rmSync(dataDir, { recursive: true, force: true });
    rmSync(homeDir, { recursive: true, force: true });
  }
});

function sendChat(model: string) {
  return POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      }),
    })
  );
}

async function getCatalogIds(): Promise<string[]> {
  const list = await GET(new Request("http://localhost/v1/models?prefix=canonical"));
  assert.equal(list.status, 200);
  const { data } = (await list.json()) as { data: Array<{ id: string }> };
  return data.map(({ id }) => id);
}

test("KEA-9625: an advertised Cheaper Inference Claude effort ID dispatches its live base", async (t) => {
  const variantId = `${baseId}-high`;
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: base, name: "Claude Haiku 4.5", source: "imported" },
  ]);
  const live = await getActiveSyncedCatalog(provider);
  assert.equal(live.authoritative, true);
  assert.deepEqual(
    live.models.map((model) => model.id),
    [base]
  );

  const dispatchedModels: string[] = [];
  const dispatchedEfforts: unknown[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    assert.equal(url.hostname, "api.cheaperinference.com");
    assert.equal(url.pathname, "/v1/chat/completions");
    const decoded =
      new Headers(init?.headers).get("content-encoding") === "gzip"
        ? gunzipSync(Buffer.from(init?.body as Uint8Array)).toString("utf8")
        : String(init?.body);
    const { model, reasoning_effort } = JSON.parse(decoded) as {
      model: string;
      reasoning_effort?: unknown;
    };
    dispatchedModels.push(model);
    dispatchedEfforts.push(reasoning_effort);
    return Response.json({
      id: "chatcmpl-kea-9625",
      object: "chat.completion",
      model,
      choices: [
        { index: 0, message: { role: "assistant", content: "hello" }, finish_reason: "stop" },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    });
  });

  const ids = await getCatalogIds();
  assert.ok(ids.includes(baseId), `${baseId} should be listed`);
  assert.ok(ids.includes(variantId), `${variantId} should be listed`);

  const baseResponse = await sendChat(baseId);
  assert.equal(baseResponse.status, 200, await baseResponse.text());
  assert.deepEqual(dispatchedModels, [base]);

  const response = await sendChat(variantId);
  const body = await response.text();
  assert.equal(
    response.status,
    200,
    `${variantId} was listed, but chat returned ${response.status} after ${dispatchedModels.length - 1} variant dispatches: ${body}`
  );
  assert.deepEqual(dispatchedModels, [base, base]);
  assert.equal(dispatchedEfforts[1], "high");

  for (const rejectedId of [`${baseId}-xhigh`, `${provider}/claude-fable-5-high`]) {
    assert.ok(!ids.includes(rejectedId), `${rejectedId} should be absent from the catalog`);
    const rejected = await sendChat(rejectedId);
    const error = await rejected.text();
    assert.equal(rejected.status, 400, error);
    assert.match(error, /not available in the active live catalog/);
  }
  assert.deepEqual(dispatchedModels, [base, base]);
});

test("every generated Claude effort ID in the Cheaper Inference catalog resolves", async () => {
  const bases = [base, "claude-fable-5"];
  await replaceSyncedAvailableModelsForConnection(
    provider,
    connectionId,
    bases.map((id) => ({ id, name: id, source: "imported" }))
  );
  const ids = await getCatalogIds();
  for (const model of bases) {
    const prefix = `${provider}/${model}-`;
    const variants = ids.filter((id) => id.startsWith(prefix));
    assert.ok(variants.includes(`${prefix}high`));
    if (model === "claude-fable-5") assert.ok(variants.includes(`${prefix}xhigh`));
    for (const id of variants) {
      const info = await getModelInfo(id);
      assert.equal(info.provider, provider, info.errorMessage);
      assert.equal(info.model, model, id);
      assert.equal(info.resolvedThinkingEffort, id.slice(prefix.length), id);
    }
  }
});

test("exact synced and custom IDs take precedence over generated Claude effort variants", async () => {
  const literalSynced = `${base}-low`;
  const literalCustom = `${base}-medium`;
  await replaceSyncedAvailableModelsForConnection(provider, connectionId, [
    { id: base, name: base, source: "imported" },
    { id: literalSynced, name: literalSynced, source: "imported" },
  ]);
  await addCustomModel(provider, literalCustom, "Literal custom model");

  for (const id of [literalSynced, literalCustom]) {
    const info = await getModelInfo(`${provider}/${id}`);
    assert.equal(info.provider, provider, info.errorMessage);
    assert.equal(info.model, id);
    assert.equal(info.resolvedThinkingEffort, undefined);
  }
});
