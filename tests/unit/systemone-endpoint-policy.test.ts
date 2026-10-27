/**
 * API-key endpoint policy for the System One routes.
 *
 * `validateEndpointAccess` only rejects a path it can classify: an unknown
 * category skips the allowlist entirely, so adding the route without adding its
 * category would silently let every restricted key call it. These tests cover
 * both halves — the category mapping and the enforcement through
 * `enforceApiKeyPolicy` with a real key row (same pattern as
 * endpoint-restrictions-policy.test.ts, which needs the DB stack).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  ENDPOINT_CATEGORIES,
  resolveCanonicalEndpointPath,
  resolveEndpointCategory,
} from "../../src/shared/constants/endpointCategories.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-policy-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

rateLimiter.setRateLimiterTestMode(true);

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function loadPolicy(label: string) {
  const modulePath = path.join(process.cwd(), "src/shared/utils/apiKeyPolicy.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

async function createKeyWithEndpoints(allowedEndpoints: string[]) {
  const created = await apiKeysDb.createApiKey("System One Test Key", "machine-systemone");
  if (allowedEndpoints.length > 0) {
    await apiKeysDb.updateApiKeyPermissions(created.id, { allowedEndpoints });
  }
  return created;
}

function makeRequest(url: string, apiKey: string, method = "POST") {
  return new Request(url, { method, headers: { Authorization: `Bearer ${apiKey}` } });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the System One routes resolve to their own endpoint category", () => {
  assert.equal(resolveEndpointCategory("/v1/systemone"), "systemone");
  assert.equal(resolveEndpointCategory("/v1/systemone/models"), "systemone");
  // The App Router and doubled spellings must not fail open.
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/api/v1/systemone")),
    "systemone"
  );
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/v1/v1/systemone/models")),
    "systemone"
  );
  // The decision catalog is not the chat model list.
  assert.equal(resolveEndpointCategory("/v1/models"), "models");
});

test("the category is selectable in the API-key editor list", () => {
  const category = ENDPOINT_CATEGORIES.find((entry) => entry.id === "systemone");
  assert.ok(category, "systemone must be a selectable endpoint category");
  assert.ok(category.label.length > 0);
  assert.ok(category.description.length > 0);
  assert.deepEqual(category.prefixes, ["/v1/systemone"]);
});

test("a systemone-only key may call both System One routes", async () => {
  const policy = await loadPolicy("systemone-allowed");
  const key = await createKeyWithEndpoints(["systemone"]);

  const decision = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/v1/systemone", key.key),
    "openrouter/typesafe/jev-1.13"
  );
  assert.equal(decision.rejection, null);

  const catalog = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/v1/systemone/models", key.key, "GET"),
    null
  );
  assert.equal(catalog.rejection, null);
});

test("a chat-only key is refused on /v1/systemone", async () => {
  const policy = await loadPolicy("chat-blocks-systemone");
  const key = await createKeyWithEndpoints(["chat"]);

  const result = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/v1/systemone", key.key),
    "openrouter/typesafe/jev-1.13"
  );
  assert.ok(result.rejection, "a chat-only key must not reach the decision endpoint");
  assert.equal(result.rejection.status, 403);
  const body = (await result.rejection.json()) as { error: { message: string } };
  assert.match(body.error.message, /systemone/);
});

test("a chat-only key is refused on the /api/v1 spelling too", async () => {
  const policy = await loadPolicy("chat-blocks-systemone-api");
  const key = await createKeyWithEndpoints(["chat"]);

  const result = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/api/v1/systemone", key.key),
    "openrouter/typesafe/jev-1.13"
  );
  assert.ok(result.rejection, "the App Router spelling must not fail open");
  assert.equal(result.rejection.status, 403);
});

test("a systemone-only key is refused on chat completions", async () => {
  const policy = await loadPolicy("systemone-blocks-chat");
  const key = await createKeyWithEndpoints(["systemone"]);

  const result = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/v1/chat/completions", key.key),
    "gpt-5"
  );
  assert.ok(result.rejection);
  assert.equal(result.rejection.status, 403);
});

test("an unrestricted key keeps reaching /v1/systemone", async () => {
  const policy = await loadPolicy("unrestricted-systemone");
  const key = await createKeyWithEndpoints([]);

  const result = await policy.enforceApiKeyPolicy(
    makeRequest("http://localhost/v1/systemone", key.key),
    "openrouter/typesafe/jev-1.13"
  );
  assert.equal(result.rejection, null);
});
