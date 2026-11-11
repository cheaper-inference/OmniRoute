/**
 * A Gemini 403 "CachedContent not found" answers one bad client request: the request named a cache
 * that does not exist (or belongs to another project). The credential is fine, so the connection
 * must not be banned. Before, an OAuth provider with no other 403 rule (agy) fell through to
 * FORBIDDEN, which resolveTerminalConnectionStatus turns into a permanent "banned".
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");

const CACHE_MISS = "CachedContent not found (or permission denied)";

test("403 CachedContent-not-found on an OAuth Gemini surface is not a ban", () => {
  const type = classifyProviderError(403, CACHE_MISS, "agy");
  assert.notEqual(type, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.equal(type, PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR);
  assert.equal(resolveTerminalConnectionStatus(403, { permanent: false }, type, "agy"), null);
});

test("the match ignores case and surrounding JSON", () => {
  const body = JSON.stringify({ error: { code: 403, message: CACHE_MISS.toLowerCase() } });
  assert.equal(classifyProviderError(403, body, "agy"), PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR);
});

test("API-key Gemini providers keep their non-terminal verdict", () => {
  for (const provider of ["gemini", "vertex"]) {
    const type = classifyProviderError(403, CACHE_MISS, provider);
    assert.notEqual(type, PROVIDER_ERROR_TYPES.FORBIDDEN, provider);
    assert.equal(
      resolveTerminalConnectionStatus(403, { permanent: false }, type, provider),
      null,
      provider
    );
  }
});

test("a different 403 on the same provider is still FORBIDDEN and banned", () => {
  const type = classifyProviderError(403, "The caller does not have permission", "agy");
  assert.equal(type, PROVIDER_ERROR_TYPES.FORBIDDEN);
  assert.equal(resolveTerminalConnectionStatus(403, { permanent: false }, type, "agy"), "banned");
});

test("only 403 is matched: the same words on a 404 do not change that verdict", () => {
  assert.equal(
    classifyProviderError(404, CACHE_MISS, "agy"),
    classifyProviderError(404, "Not found", "agy")
  );
});
