import assert from "node:assert/strict";
import test from "node:test";
import {
  buildTokenPlanCatalogRequest,
  isTokenPlanCatalogProvider,
  parseTokenPlanCatalog,
} from "../../src/lib/providerModels/tokenPlanModelDiscovery.ts";

function envelope(ids: unknown[]) {
  return {
    code: "200",
    data: { success: true, DataV2: { data: { code: "200", success: true, data: ids } } },
  };
}

test("both Singapore providers use the fixed OpenAI-compatible listing with the plan key", () => {
  for (const provider of ["qwen-cloud-token-plan", "bailian-coding-plan"]) {
    const request = buildTokenPlanCatalogRequest(
      provider,
      {
        region: "global-sg",
        baseUrl: "https://example.test/custom",
        cookie: "secret-cookie",
      },
      "test-plan-key"
    );
    assert.equal(
      request.url,
      "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/models"
    );
    assert.deepEqual(request.init, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: "Bearer test-plan-key" },
    });
    assert.equal(request.scope, "connection");
    assert.throws(() => buildTokenPlanCatalogRequest(provider, { region: "global-sg" }, ""));
  }
});

test("Beijing keeps its regional public catalog without forwarding credentials", () => {
  for (const provider of ["qwen-cloud-token-plan", "bailian-coding-plan"]) {
    const request = buildTokenPlanCatalogRequest(
      provider,
      {
        region: "china-beijing",
        cookie: "secret-cookie",
      },
      "secret-key"
    );
    assert.equal(new URL(request.url).hostname, "cs-data.qianwenai.com");
    assert.equal(request.init.method, "POST");
    assert.equal(JSON.stringify(request).includes("secret"), false);
    assert.equal(request.scope, "product");
    const data = JSON.parse(new URLSearchParams(request.init.body).get("params")!).Data;
    assert.equal(data.edition, "PERSONAL");
  }
  assert.equal(isTokenPlanCatalogProvider("qwen-cloud"), false);
  assert.equal(isTokenPlanCatalogProvider("alibaba"), false);
  assert.throws(() => buildTokenPlanCatalogRequest("alibaba", {}, ""));
});

test("connection listing imports auto and new text models while excluding media", () => {
  const models = parseTokenPlanCatalog(
    {
      object: "list",
      has_more: false,
      data: [
        { id: "qwen4-max" },
        { id: "qwen4-max-preview" },
        { id: "auto" },
        { id: "auto" },
        { id: "deepseek-v4.1-flash-1017" },
        { id: "qwen-audio-3.0-asr-flash" },
        { id: "wan3.0-video" },
      ],
    },
    "connection"
  );
  assert.deepEqual(
    models.map(({ id }) => id),
    ["qwen4-max", "qwen4-max-preview", "auto", "deepseek-v4.1-flash-1017"]
  );
});

test("a partial, malformed, empty or media-only connection result cannot replace a catalog", () => {
  for (const payload of [
    { data: [{ id: "auto" }], has_more: true },
    { data: [{ id: "qwen-valid" }, { id: "../bad" }] },
    { data: [] },
    { data: [{ id: "wan3.0-video" }] },
    { error: { code: "InvalidApiKey" } },
  ]) {
    assert.throws(() => parseTokenPlanCatalog(payload, "connection"));
  }
});

test("live IDs survive without a static allowlist while media and duplicates are excluded", () => {
  const models = parseTokenPlanCatalog(
    envelope([
      "qwen3.8-flash",
      "deepseek-v4-pro-0813",
      "glm-5.2",
      "qwen-future-model",
      "qwen3.8-flash",
      "qwen-image-3.0-pro",
      "wan2.7-image",
      "happyhorse-1.1-i2v",
      "qwen-audio-3.0-asr-flash",
      "qwen-audio-3.0-realtime-plus",
      "qwen-audio-3.0-tts-plus",
    ]),
    "product"
  );
  assert.deepEqual(
    models.map(({ id }) => id),
    ["qwen3.8-flash", "deepseek-v4-pro-0813", "glm-5.2", "qwen-future-model"]
  );
});

test("HTTP-success gateway errors and unusable catalogs cannot replace the cached list", () => {
  for (const payload of [
    { code: "200", data: { success: false, errorCode: "LoginRequired" } },
    envelope([]),
    envelope(["qwen-image-3.0-pro"]),
    envelope([null]),
    envelope(["qwen-valid", "../bad"]),
    "<html>login</html>",
  ]) {
    assert.throws(() => parseTokenPlanCatalog(payload, "product"));
  }
});
