/**
 * Clients can present more than one credential at once. Claude Code with an
 * active claude.ai session (or ANTHROPIC_AUTH_TOKEN) sends an unrelated
 * `Authorization: Bearer sk-ant-oat01-…` ALONGSIDE a valid OmniRoute
 * `x-api-key`. The client-API auth layer must accept the request when ANY
 * presented credential validates, and every downstream identity consumer
 * (route-level guard, API-key policy) must bind to the credential that
 * actually validated — never to the stale Bearer.
 *
 * Negative cases are covered too: nothing that does not validate may ever
 * authenticate, revoked keys stay rejected, and `extractApiKey` keeps its
 * Bearer-first contract byte-for-byte.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-clientapi-multicred-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "multi-credential-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const resolver = await import("../../src/sse/services/clientApiKeyResolver.ts");
const { clientApiPolicy } = await import("../../src/server/authz/policies/clientApi.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");
const { enforceApiKeyPolicy } = await import("../../src/shared/utils/apiKeyPolicy.ts");

const ORIGINAL_ENV = {
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  ROUTER_API_KEY: process.env.ROUTER_API_KEY,
  REQUIRE_API_KEY: process.env.REQUIRE_API_KEY,
};

const STALE_BEARER = "sk-ant-oat01-stale-claude-session-token";
const CHAT_URL = "http://localhost/api/v1/chat/completions";

function restoreEnv(name: keyof typeof ORIGINAL_ENV) {
  const value = ORIGINAL_ENV[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  process.env.REQUIRE_API_KEY = "true";
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreEnv("OMNIROUTE_API_KEY");
  restoreEnv("ROUTER_API_KEY");
  restoreEnv("REQUIRE_API_KEY");
});

function policyCtx(headers: Record<string, string>, normalizedPath = "/api/v1/messages") {
  return {
    request: {
      method: "POST",
      headers: new Headers(headers),
      url: `http://localhost${normalizedPath}`,
    },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath,
    },
    requestId: "req_multi_credential",
  };
}

function makeRequest(headers: Record<string, string>, url = "http://localhost/v1/messages") {
  return new Request(url, { method: "POST", headers });
}

async function createKey(name: string) {
  const created = await apiKeysDb.createApiKey(name, `machine-${name}`);
  assert.ok(created?.key, "createApiKey must return a key");
  return created;
}

function maskedId(key: string) {
  return `key_${key.slice(-4)}`;
}

// ─── clientApiPolicy (the CLIENT_API auth gate) ──────────────────────────────

test("clientApiPolicy: stale Bearer + valid x-api-key is accepted as the x-api-key subject", async () => {
  const valid = await createKey("xkey-valid");
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": valid.key })
  );
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "client_api_key");
    assert.equal(out.subject.id, maskedId(valid.key));
  }
});

test("clientApiPolicy: stale Bearer + valid x-goog-api-key is accepted", async () => {
  const valid = await createKey("googkey-valid");
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-goog-api-key": valid.key })
  );
  assert.equal(out.allow, true);
  if (out.allow) assert.equal(out.subject.id, maskedId(valid.key));
});

test("clientApiPolicy: Bearer + x-api-key both invalid is rejected with 401 AUTH_002", async () => {
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": "sk-also-bogus" })
  );
  assert.equal(out.allow, false);
  if (!out.allow) {
    assert.equal(out.status, 401);
    assert.equal(out.code, "AUTH_002");
  }
});

test("clientApiPolicy: a revoked x-api-key next to a stale Bearer stays rejected", async () => {
  const revoked = await createKey("xkey-revoked");
  assert.ok(await apiKeysDb.revokeApiKey(revoked.id));
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": revoked.key })
  );
  assert.equal(out.allow, false);
  if (!out.allow) assert.equal(out.status, 401);
});

test("clientApiPolicy: valid Bearer keeps precedence over a different valid x-api-key", async () => {
  const bearer = await createKey("bearer-valid");
  const other = await createKey("xkey-other");
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${bearer.key}`, "x-api-key": other.key })
  );
  assert.equal(out.allow, true);
  if (out.allow) assert.equal(out.subject.id, maskedId(bearer.key));
});

test("clientApiPolicy: valid Bearer + garbage x-api-key is still accepted (unchanged)", async () => {
  const bearer = await createKey("bearer-only-valid");
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${bearer.key}`, "x-api-key": "placeholder" })
  );
  assert.equal(out.allow, true);
  if (out.allow) assert.equal(out.subject.id, maskedId(bearer.key));
});

test("clientApiPolicy: REQUIRE_API_KEY=false keeps the valid x-api-key identity instead of degrading to anonymous", async () => {
  process.env.REQUIRE_API_KEY = "false";
  const valid = await createKey("xkey-optional");
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": valid.key })
  );
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "client_api_key");
    assert.equal(out.subject.id, maskedId(valid.key));
  }
});

test("clientApiPolicy: REQUIRE_API_KEY=false with only invalid credentials still degrades to anonymous (#2257)", async () => {
  process.env.REQUIRE_API_KEY = "false";
  const out = await clientApiPolicy.evaluate(
    policyCtx({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": "placeholder" })
  );
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "anonymous");
    assert.equal(out.subject.id, "local");
  }
});

// ─── extractApiKeyCandidates / resolveClientApiKey ───────────────────────────

test("extractApiKeyCandidates lists every presented credential in precedence order, deduped", () => {
  const req = makeRequest(
    {
      authorization: "Bearer bearer-key",
      "x-api-key": "header-key",
      "x-goog-api-key": "google-key",
    },
    "http://localhost/vscode/path-key/v1/chat/completions"
  );
  assert.deepEqual(resolver.extractApiKeyCandidates(req), [
    "bearer-key",
    "header-key",
    "google-key",
    "path-key",
  ]);
  assert.deepEqual(resolver.extractApiKeyCandidates(req, { allowUrl: false }), [
    "bearer-key",
    "header-key",
    "google-key",
  ]);

  const dup = makeRequest({ authorization: "Bearer same-key", "x-api-key": "  same-key  " });
  assert.deepEqual(resolver.extractApiKeyCandidates(dup), ["same-key"]);
  assert.deepEqual(resolver.extractApiKeyCandidates(makeRequest({})), []);
});

test("resolveClientApiKey returns the x-api-key that validated when the Bearer is stale", async () => {
  const valid = await createKey("resolve-xkey");
  const resolved = await resolver.resolveClientApiKey(
    makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": valid.key })
  );
  assert.deepEqual(resolved, { apiKey: valid.key, valid: true });
});

test("resolveClientApiKey prefers the Bearer when both credentials are valid", async () => {
  const bearer = await createKey("resolve-bearer");
  const other = await createKey("resolve-other");
  const resolved = await resolver.resolveClientApiKey(
    makeRequest({ authorization: `Bearer ${bearer.key}`, "x-api-key": other.key })
  );
  assert.deepEqual(resolved, { apiKey: bearer.key, valid: true });
});

test("resolveClientApiKey falls back to the legacy extractor result when nothing validates", async () => {
  const both = await resolver.resolveClientApiKey(
    makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": "sk-bogus" })
  );
  assert.deepEqual(both, { apiKey: STALE_BEARER, valid: false });

  // A placeholder x-api-key without anthropic-version is ignored by extractApiKey
  // (#2225) — an unvalidated candidate must not resurface as the identity.
  const placeholder = await resolver.resolveClientApiKey(
    makeRequest({ "x-api-key": "placeholder" })
  );
  assert.deepEqual(placeholder, { apiKey: null, valid: false });

  const none = await resolver.resolveClientApiKey(makeRequest({}));
  assert.deepEqual(none, { apiKey: null, valid: false });
});

test("resolveClientApiKey honors allowUrl:false (no URL-token credential)", async () => {
  const valid = await createKey("resolve-url");
  const req = makeRequest({}, `http://localhost/vscode/${valid.key}/v1/chat/completions`);
  assert.deepEqual(await resolver.resolveClientApiKey(req), { apiKey: valid.key, valid: true });
  assert.deepEqual(await resolver.resolveClientApiKey(req, { allowUrl: false }), {
    apiKey: null,
    valid: false,
  });
});

test("extractApiKey keeps its Bearer-first contract (unchanged by the multi-credential path)", async () => {
  const valid = await createKey("legacy-contract");
  const req = makeRequest({
    authorization: `Bearer ${STALE_BEARER}`,
    "x-api-key": valid.key,
    "anthropic-version": "2023-06-01",
  });
  assert.equal(auth.extractApiKey(req), STALE_BEARER);
});

// ─── route-level guard + API-key policy bind to the validated credential ─────

test("enforceClientApiRouteAuth accepts a stale Bearer + valid x-api-key and rejects all-invalid", async () => {
  const valid = await createKey("route-guard");
  assert.equal(
    await enforceClientApiRouteAuth(
      makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": valid.key })
    ),
    null
  );

  const rejected = await enforceClientApiRouteAuth(
    makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": "sk-bogus" })
  );
  assert.ok(rejected, "all-invalid credentials must be rejected");
  assert.equal(rejected.status, 401);
});

test("enforceApiKeyPolicy applies the validated x-api-key's restrictions, not the stale Bearer's (no policy bypass)", async () => {
  const restricted = await createKey("policy-restricted");
  await apiKeysDb.updateApiKeyPermissions(restricted.id, { allowedModels: ["openai/gpt-4.1"] });

  const disallowed = await enforceApiKeyPolicy(
    makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": restricted.key }, CHAT_URL),
    "anthropic/claude-3-7-sonnet"
  );
  assert.equal(disallowed.apiKey, restricted.key);
  assert.equal(disallowed.apiKeyInfo?.id, restricted.id);
  assert.ok(disallowed.rejection, "disallowed model must be rejected by the x-api-key policy");
  assert.equal(disallowed.rejection.status, 403);

  const allowed = await enforceApiKeyPolicy(
    makeRequest({ authorization: `Bearer ${STALE_BEARER}`, "x-api-key": restricted.key }, CHAT_URL),
    "openai/gpt-4.1"
  );
  assert.equal(allowed.apiKeyInfo?.id, restricted.id);
  assert.equal(allowed.rejection, null);
});
