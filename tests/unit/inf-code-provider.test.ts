import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-inf-code-provider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { REGISTRY } = await import("../../open-sse/config/providers/index.ts");
const { generateLegacyProviders, generateModels, generateAliasMap } =
  await import("../../open-sse/config/providerRegistry.ts");
const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");
const { supportsTokenRefresh } = await import("../../open-sse/services/tokenRefresh.ts");
const { resolveInfCodeBase, resolveInfCodeChatPath } =
  await import("../../open-sse/config/providers/registry/inf-code/index.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("inf-code is registered in REGISTRY under its id", () => {
  const entry = REGISTRY["inf-code"];
  assert.ok(entry, "REGISTRY[inf-code] must be defined");
  assert.equal(entry.id, "inf-code");
  assert.equal(entry.alias, "infc");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "inf-code");
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.authHeader, "bearer");
});

test("inf-code OAuth config carries the verified Token Infinity endpoints", () => {
  const entry = REGISTRY["inf-code"];
  assert.ok(entry.oauth, "oauth config must be present");
  assert.equal(entry.oauth.clientIdDefault, "infcode");
  assert.equal(entry.oauth.clientIdEnv, "INF_CODE_OAUTH_CLIENT_ID");
  // The token endpoint must resolve to the InfCode refresh path
  assert.ok(entry.oauth.tokenUrl, "tokenUrl must be set");
  assert.ok(
    entry.oauth.tokenUrl.includes("/acode/v1/refresh_token"),
    "tokenUrl must point at the InfCode refresh path"
  );
  assert.ok(entry.oauth.authUrl, "authUrl must be set");
  assert.ok(
    entry.oauth.authUrl.includes("/infcode/login"),
    "authUrl must point at the InfCode authorize path"
  );
});

test("inf-code registry entry has a modelsUrl for live model discovery", () => {
  const entry = REGISTRY["inf-code"];
  assert.ok(entry.modelsUrl, "modelsUrl must be set for dynamic model discovery");
  assert.ok(
    entry.modelsUrl.includes("/acode/v1/models"),
    "modelsUrl must point at the InfCode models endpoint"
  );
});

test("inf-code is wired into the legacy PROVIDERS / alias / models generators", () => {
  const providers = generateLegacyProviders();
  assert.ok(providers["inf-code"], "generateLegacyProviders must produce inf-code");
  assert.ok(providers["inf-code"].tokenUrl, "legacy tokenUrl must be populated");

  const models = generateModels();
  assert.ok(models["infc"], "generateModels must produce the incf alias entry");
  assert.ok(models["infc"].length > 0, "model list must be non-empty");

  const aliases = generateAliasMap();
  assert.equal(aliases["inf-code"], "infc");
});

test("inf-code is in the supportsTokenRefresh set", () => {
  assert.equal(supportsTokenRefresh("inf-code"), true);
});

test("inf-code baseUrl resolves to the OpenAI-compatible chat completions path", () => {
  const base = resolveInfCodeBase();
  assert.equal(base, "https://www.tokensinfinity.com");
  const chatUrl = resolveInfCodeChatPath(base);
  assert.equal(chatUrl, "https://www.tokensinfinity.com/acode/v1/chat/completions");
});

test("inf-code baseUrl respects the INF_CODE_API_BASE env override", () => {
  const saved = process.env.INF_CODE_API_BASE;
  process.env.INF_CODE_API_BASE = "https://custom.infcode.example.com/";
  const base = resolveInfCodeBase();
  assert.equal(base, "https://custom.infcode.example.com");
  const chatUrl = resolveInfCodeChatPath(base);
  assert.equal(chatUrl, "https://custom.infcode.example.com/acode/v1/chat/completions");
  if (saved === undefined) delete process.env.INF_CODE_API_BASE;
  else process.env.INF_CODE_API_BASE = saved;
});

test("inf-code OAUTH_ENDPOINTS entry exposes the public client id and refresh endpoint", () => {
  const ep = OAUTH_ENDPOINTS.infcode;
  assert.ok(ep, "OAUTH_ENDPOINTS.infcode must exist");
  assert.equal(ep.clientId, "infcode");
  assert.ok(ep.token.includes("/acode/v1/refresh_token"));
  assert.ok(ep.auth.includes("/infcode/login"));
});

test("inf-code static model catalog declares the coding-agent model families", () => {
  const entry = REGISTRY["inf-code"];
  const ids = entry.models.map((m) => m.id);
  assert.ok(ids.includes("deepseek-v4-pro"), "deepseek-v4-pro must be present");
  assert.ok(ids.includes("glm-5.2"), "glm-5.2 must be present");
  // Every model declares a context window and max output
  for (const m of entry.models) {
    assert.ok(
      typeof m.contextLength === "number" && m.contextLength > 0,
      `model ${m.id} must declare a positive contextLength`
    );
    assert.ok(
      typeof m.maxOutputTokens === "number" && m.maxOutputTokens > 0,
      `model ${m.id} must declare a positive maxOutputTokens`
    );
  }
});
