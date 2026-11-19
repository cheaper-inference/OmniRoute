import test from "node:test";
import assert from "node:assert/strict";
import {
  AI_PROVIDERS,
  getProviderByAlias,
  resolveProviderId,
} from "../../src/shared/constants/providers.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { PROVIDERS as OAUTH_PROVIDERS_MAP } from "../../src/lib/oauth/providers/index.ts";
import { GEMINI_APP_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import { selectGoogleRefreshClient } from "../../open-sse/services/tokenRefresh/googleClientBinding.ts";
import { normalizeGeminiAppPrompt } from "../../open-sse/executors/gemini-app/prompt.ts";

test("gemini-app is registered in the shared provider catalog with alias gapp", () => {
  const provider = AI_PROVIDERS["gemini-app"];
  assert.ok(provider, "gemini-app must be in the catalog");
  assert.equal(provider.alias, "gapp");
  assert.equal(provider.subscriptionRisk, true);
  assert.equal(provider.riskNoticeVariant, "oauth");
  assert.equal(getProviderByAlias("gapp")?.id, "gemini-app");
  assert.equal(resolveProviderId("gemini-app"), "gemini-app");
});

test("gemini-app registry entry exposes the three native models and OAuth creds", () => {
  const entry = REGISTRY["gemini-app"];
  assert.ok(entry, "gemini-app must be in REGISTRY");
  assert.equal(entry.executor, "gemini-app");
  assert.equal(entry.authType, "oauth");
  assert.deepEqual(
    entry.models?.map((model) => model.id),
    ["gemini-neon", "gemini-hydrogen", "gemini-flash-lite"]
  );
  assert.equal(entry.oauth?.clientIdDefault, resolvePublicCred("gemini_app_id"));
  assert.equal(entry.oauth?.clientSecretDefault, resolvePublicCred("gemini_app_alt"));
});

test("gemini-app OAuth config uses embedded public creds and no Code Assist bootstrap", () => {
  assert.equal(GEMINI_APP_CONFIG.clientId, resolvePublicCred("gemini_app_id"));
  assert.equal(GEMINI_APP_CONFIG.clientSecret, resolvePublicCred("gemini_app_alt"));
  assert.match(GEMINI_APP_CONFIG.scopes.join(" "), /auth\/gemini/);
  assert.match(GEMINI_APP_CONFIG.scopes.join(" "), /auth\/client_channel/);
  assert.ok(OAUTH_PROVIDERS_MAP["gemini-app"], "OAuth provider must be registered");
});

test("gemini-app token refresh is supported with its own embedded client", () => {
  assert.equal(supportsTokenRefresh("gemini-app"), true);
  const client = selectGoogleRefreshClient("gemini-app", "builtin", undefined);
  assert.equal(client.clientId, resolvePublicCred("gemini_app_id"));
  assert.notEqual(client.clientId, resolvePublicCred("antigravity_id"));
});

test("prompt normalization maps messages, tools and reasoning settings", () => {
  const prompt = normalizeGeminiAppPrompt(
    {
      model: "gemini-argon",
      messages: [
        { role: "system", content: "Be brief" },
        { role: "user", content: "hello" },
      ],
      reasoning_effort: "low",
      tools: [{ type: "function", function: { name: "noop", parameters: { type: "object" } } }],
      stream: true,
    },
    "gemini-argon",
    true
  );
  assert.equal(prompt.modelId, "gemini-neon");
  assert.equal(prompt.modeCategory, 3);
  assert.equal(prompt.systemText, "Be brief");
  assert.equal(prompt.userText, "hello");
  assert.equal(prompt.thinkingLevel, 1);
  assert.equal(prompt.tools.length, 1);
});

test("prompt normalization rejects empty prompts and non-native models", () => {
  assert.throws(
    () =>
      normalizeGeminiAppPrompt(
        { model: "gpt-5", messages: [{ role: "user", content: "hi" }] },
        "gpt-5",
        false
      ),
    /Unsupported Gemini App model/
  );
  assert.throws(
    () => normalizeGeminiAppPrompt({ model: "gemini-neon", messages: [] }, "gemini-neon", false),
    /Empty user prompt/
  );
});
