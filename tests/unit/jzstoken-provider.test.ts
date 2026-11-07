import assert from "node:assert/strict";
import test from "node:test";

import { jzstokenProvider } from "../../open-sse/config/providers/registry/jzstoken/index.ts";
import { normalizeOpenAIChatUrl } from "../../open-sse/executors/default/urlNormalizers.ts";
import {
  addModelsSuffix,
  resolveV1ChatCompletionsUrl,
} from "../../src/lib/providers/validation/urlHelpers.ts";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor, getExecutor } = await import("../../open-sse/executors/index.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

const CLIENT_BASE = "https://jzstoken.com/api/v1";
const CHAT_URL = "https://jzstoken.com/api/v1/chat/completions";
const MODELS_URL = "https://jzstoken.com/api/v1/models";
const DOUBLED_CHAT = "https://jzstoken.com/api/v1/v1/chat/completions";
const DOUBLED_MODELS = "https://jzstoken.com/api/v1/v1/models";

test("jzstoken is an OpenAI-compatible Bearer registry entry", () => {
  assert.equal(jzstokenProvider.id, "jzstoken");
  assert.equal(jzstokenProvider.alias, "jzstoken");
  assert.equal(jzstokenProvider.format, "openai");
  assert.equal(jzstokenProvider.executor, "default");
  assert.equal(jzstokenProvider.authType, "apikey");
  assert.equal(jzstokenProvider.authHeader, "bearer");
  assert.equal(jzstokenProvider.baseUrl, CHAT_URL);
  assert.equal(jzstokenProvider.modelsUrl, MODELS_URL);
  assert.equal(jzstokenProvider.passthroughModels, true);
});

test("jzstoken leaves model discovery to the key-scoped live catalog", () => {
  // GET /api/v1/models answers 401 without a key, and the publisher says the
  // list is whatever that key can call. An empty list plus passthroughModels
  // avoids seeding jzs-max-3.0 onto a Standard key or hiding the rest from a
  // Dedicated key.
  assert.deepEqual(jzstokenProvider.models, []);
  assert.equal(jzstokenProvider.responsesBaseUrl, undefined);
  assert.equal(jzstokenProvider.messagesUrl, undefined);
});

test("jzstoken is wired through registry, metadata, endpoint and default executor", async () => {
  assert.equal(REGISTRY.jzstoken?.baseUrl, CHAT_URL);
  assert.equal(REGISTRY.jzstoken?.modelsUrl, MODELS_URL);
  assert.equal(PROVIDER_ENDPOINTS.jzstoken, CHAT_URL);
  assert.equal(APIKEY_PROVIDERS.jzstoken?.id, "jzstoken");
  assert.equal(APIKEY_PROVIDERS.jzstoken?.alias, "jzstoken");
  assert.equal(APIKEY_PROVIDERS.jzstoken?.website, "https://jzstoken.com");
  assert.equal(APIKEY_PROVIDERS.jzstoken?.hasFree, false);
  assert.equal(APIKEY_PROVIDERS.jzstoken?.freeNote, undefined);
  const executor = await getExecutor("jzstoken");
  assert.ok(executor instanceof DefaultExecutor);
  assert.equal(executor.buildUrl("jzs-max-3.0", false), CHAT_URL);
});

test("jzstoken joins the documented OpenAI client base without a second /v1", () => {
  // Publisher instruction: put https://jzstoken.com/api/v1 in an OpenAI base
  // field and let the client append /chat/completions. The same host also
  // answers /v1/*, so a bare origin joins there rather than under /api.
  assert.equal(normalizeOpenAIChatUrl(CLIENT_BASE), CHAT_URL);
  assert.equal(normalizeOpenAIChatUrl(`${CLIENT_BASE}/`), CHAT_URL);
  assert.equal(normalizeOpenAIChatUrl(CHAT_URL), CHAT_URL);
  assert.equal(normalizeOpenAIChatUrl("https://jzstoken.com/api"), CHAT_URL);
  assert.equal(
    normalizeOpenAIChatUrl("https://jzstoken.com"),
    "https://jzstoken.com/v1/chat/completions"
  );
  assert.equal(resolveV1ChatCompletionsUrl(CLIENT_BASE), CHAT_URL);
  assert.equal(resolveV1ChatCompletionsUrl(CHAT_URL), CHAT_URL);
  assert.notEqual(normalizeOpenAIChatUrl(CLIENT_BASE), DOUBLED_CHAT);
  assert.notEqual(normalizeOpenAIChatUrl(CHAT_URL), DOUBLED_CHAT);

  assert.equal(addModelsSuffix(CLIENT_BASE), MODELS_URL);
  assert.equal(addModelsSuffix(CHAT_URL), MODELS_URL);
  assert.equal(addModelsSuffix(MODELS_URL), MODELS_URL);
  assert.notEqual(addModelsSuffix(CHAT_URL), DOUBLED_MODELS);
  assert.notEqual(addModelsSuffix(CLIENT_BASE), DOUBLED_MODELS);
});

test("jzstoken executor honors a connection base URL with the same join", async () => {
  const executor = await getExecutor("jzstoken");
  const clientBase = {
    providerSpecificData: { baseUrl: CLIENT_BASE },
  };
  const fullChat = {
    providerSpecificData: { baseUrl: CHAT_URL },
  };
  assert.equal(executor.buildUrl("gpt-5.6-terra", false, 0, clientBase), CHAT_URL);
  assert.equal(executor.buildUrl("gpt-5.6-terra", false, 0, fullChat), CHAT_URL);
  assert.notEqual(executor.buildUrl("gpt-5.6-terra", false, 0, clientBase), DOUBLED_CHAT);
});

test("jzstoken accepts model ids the upstream catalog returns", () => {
  // Both ids are named in the public quick start. They are not a seeded
  // catalog: passthroughModels is what makes either id routable after the
  // operator's own key lists it.
  assert.equal(isValidModel("jzstoken", "jzs-max-3.0"), true);
  assert.equal(isValidModel("jzstoken", "gpt-5.6-terra"), true);
});

test("jzstoken is listed as an aggregator", () => {
  // The public site describes one endpoint for models from several upstream
  // makers, plus the publisher's own jzs-max-3.0. Dashboard category only.
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("jzstoken"), true);
});

test("jzstoken copy states the key split and no prices or referral", () => {
  const hint = String(APIKEY_PROVIDERS.jzstoken?.apiHint ?? "");
  const auth = String(APIKEY_PROVIDERS.jzstoken?.authHint ?? "");
  for (const text of [hint, auth]) {
    assert.ok(text.includes("jzs-max-3.0"));
    assert.ok(text.includes("Standard"));
    assert.ok(text.includes("Dedicated"));
    assert.ok(/mutually exclusive/i.test(text));
  }
  assert.ok(hint.includes(CLIENT_BASE));
  assert.ok(/second JZS Token connection/i.test(hint));
  assert.ok(/third-party upstream/i.test(hint));
  assert.equal(hint.includes("?"), false);
  for (const claim of ["utm_", "ref=", "rebate", "partnership", "free until", "$"]) {
    assert.equal(hint.toLowerCase().includes(claim), false, `apiHint must not contain "${claim}"`);
    assert.equal(auth.toLowerCase().includes(claim), false, `authHint must not contain "${claim}"`);
  }
});

test("jzstoken claims no capability that was not exercised", () => {
  const metadata = APIKEY_PROVIDERS.jzstoken as Record<string, unknown>;
  for (const key of [
    "supportsTools",
    "supportsVision",
    "supportsCountTokens",
    "countTokensUrl",
    "capabilities",
    "freeNote",
  ]) {
    assert.equal(metadata[key], undefined, `${key} must not be declared unverified`);
  }
  assert.deepEqual(metadata.serviceKinds, ["llm"]);
});
