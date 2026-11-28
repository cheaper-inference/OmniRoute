import test from "node:test";
import assert from "node:assert/strict";
import { REGISTRY as providerRegistry } from "../../open-sse/config/providerRegistry.ts";
import { PROVIDERS } from "../../open-sse/config/constants.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";

test("nous-oauth has a runtime registry entry with the Nous inference endpoint", () => {
  const entry = providerRegistry["nous-oauth"];
  assert.ok(entry, "providerRegistry['nous-oauth'] must be defined");
  assert.equal(entry.alias, "nouso");
  assert.equal(entry.authType, "oauth");
  assert.match(
    String(entry.baseUrl),
    /^https:\/\/inference-api\.nousresearch\.com\/v1\/chat\/completions$/
  );
  assert.equal(entry.oauth?.tokenUrl, "https://portal.nousresearch.com/api/oauth/token");
  assert.equal(entry.oauth?.clientIdEnv, "NOUS_OAUTH_CLIENT_ID");
});

test("nous-oauth resolves as a refreshable provider", () => {
  assert.equal(supportsTokenRefresh("nous-oauth"), true);
});

test("nous-oauth is in the legacy PROVIDERS map refreshActiveAccessToken reads", () => {
  // refreshActiveAccessToken() looks up PROVIDERS[provider].tokenUrl; the legacy
  // map is a proxy over the registry, so the entry above is what satisfies it.
  assert.equal(
    PROVIDERS["nous-oauth"]?.tokenUrl,
    "https://portal.nousresearch.com/api/oauth/token"
  );
});
