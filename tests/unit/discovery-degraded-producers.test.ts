import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NextResponse } from "next/server";

const dataDir = mkdtempSync(join(tmpdir(), "omni-discovery-producers-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
/**
 * The reason module is imported dynamically and a missing module is not fatal
 * for the file: every case then fails on its own assertion, and the failing
 * output names the case instead of the whole file.
 */
const causeModule = await import("../../src/shared/discovery/degradedCause").catch(() => null);
const applyDiscoveryDegradation = causeModule?.applyDiscoveryDegradation;
const { buildNoAuthModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/modelRouteProjection");
const { maybeHandleConolModelDiscovery } =
  await import("../../src/app/api/providers/[id]/models/conolDiscovery");
const { maybeHandleSyntxModelDiscovery } =
  await import("../../src/app/api/providers/[id]/models/syntxDiscovery");
const { maybeHandleTwinmindModelDiscovery } =
  await import("../../src/app/api/providers/[id]/models/twinmindDiscovery");
const { maybeHandleVertexModelDiscovery } =
  await import("../../src/app/api/providers/[id]/models/vertexDiscovery");
const { getAdobeModels } =
  await import("../../src/app/api/providers/[id]/models/adobeFireflyDiscovery");
const originalFetch = globalThis.fetch;

/**
 * Every producer of a discovery response must say WHY it fell back to the
 * built-in catalog. The producers that build their own payload — the no-auth
 * one, the four web-session ones, the Vertex one and the Adobe one — are the
 * ones that used to answer with a fallback catalog and no reason at all.
 *
 * The stubs below are the route's own builders, wired to the production
 * conversion: the reason is decided by the production code, the stub only
 * carries it.
 */

type Failure = { status?: number; code?: string };

function stubOptions(provider: string, overrides: Record<string, unknown> = {}) {
  return {
    provider,
    connectionId: "conn-1",
    apiKey: "test-only-key",
    accessToken: null,
    providerSpecificData: {},
    proxy: null,
    maybeReturnCachedDiscovery: () => null,
    maybeReturnAutoFetchDisabled: () => null,
    buildDiscoveryFallbackResponse: (warnings: {
      cacheWarning?: string;
      localWarning?: string;
      failure?: Failure;
    }) =>
      NextResponse.json(
        applyDiscoveryDegradation({
          provider,
          connectionId: "conn-1",
          models: [],
          source: "local_catalog",
          ...(warnings.localWarning ? { warning: warnings.localWarning } : {}),
          ...(warnings.failure ? { failure: warnings.failure } : {}),
        })
      ),
    buildResponse: (payload: Record<string, unknown>) =>
      NextResponse.json(applyDiscoveryDegradation(payload)),
    buildApiDiscoveryResponse: async (models: unknown[]) =>
      NextResponse.json(
        applyDiscoveryDegradation({
          provider,
          connectionId: "conn-1",
          models,
          source: "api",
        })
      ),
    ...overrides,
  } as never;
}

async function bodyOf(response: Response | null) {
  assert.ok(response, "the producer must answer");
  return (await response.json()) as Record<string, unknown>;
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  mkdirSync(dataDir, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the discovery reason module is available", () => {
  assert.ok(causeModule, "the discovery reason module must be importable");
});

test("the no-auth producer reports the reason of a failed live catalog", async () => {
  globalThis.fetch = async () => new Response("upstream down", { status: 500 });

  const body = await bodyOf(await buildNoAuthModelsResponse("aihorde", "conn-1", false, true));

  assert.equal(body.source, "local_catalog");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "HTTP 500");
  assert.equal("failure" in body, false);
});

test("the no-auth producer reports an empty live catalog", async () => {
  globalThis.fetch = async () => Response.json({ data: [] });

  const body = await bodyOf(await buildNoAuthModelsResponse("aihorde", "conn-1", false, true));

  assert.equal(body.source, "local_catalog");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "EMPTY_CATALOG");
  assert.equal("failure" in body, false);
});

test("the conol producer reports the missing cookie and the failed discovery", async () => {
  const withoutCookie = await bodyOf(
    await maybeHandleConolModelDiscovery(stubOptions("conol-web", { apiKey: "" }))
  );
  assert.equal(withoutCookie.degraded, true);
  assert.equal(withoutCookie.error, "NO_CREDENTIAL");
  assert.equal("failure" in withoutCookie, false);

  globalThis.fetch = async () => new Response("upstream down", { status: 500 });
  const failedDiscovery = await bodyOf(
    await maybeHandleConolModelDiscovery(stubOptions("conol-web", { apiKey: "session-cookie" }))
  );
  assert.equal(failedDiscovery.degraded, true);
  assert.equal(failedDiscovery.error, "UPSTREAM_ERROR");
  assert.equal("failure" in failedDiscovery, false);
});

test("the syntx producer reports the missing token and the failed discovery", async () => {
  const withoutToken = await bodyOf(
    await maybeHandleSyntxModelDiscovery(stubOptions("syntx", { apiKey: "not-a-jwt" }))
  );
  assert.equal(withoutToken.degraded, true);
  assert.equal(withoutToken.error, "NO_CREDENTIAL");
  assert.equal("failure" in withoutToken, false);

  globalThis.fetch = async () => new Response("upstream down", { status: 500 });
  const failedDiscovery = await bodyOf(
    await maybeHandleSyntxModelDiscovery(
      stubOptions("syntx", { apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0In0.signature" })
    )
  );
  assert.equal(failedDiscovery.degraded, true);
  assert.equal(failedDiscovery.error, "UPSTREAM_ERROR");
  assert.equal("failure" in failedDiscovery, false);
});

test("the twinmind producer reports the missing token", async () => {
  const withoutToken = await bodyOf(
    await maybeHandleTwinmindModelDiscovery(stubOptions("twinmind", { apiKey: "" }))
  );
  assert.equal(withoutToken.degraded, true);
  assert.equal(withoutToken.error, "NO_CREDENTIAL");
  assert.equal("failure" in withoutToken, false);
});

test("the vertex producer reports the missing credential, the rejected key and the empty catalog", async () => {
  const withoutCredential = await bodyOf(
    await maybeHandleVertexModelDiscovery(stubOptions("vertex", { apiKey: "", accessToken: null }))
  );
  assert.equal(withoutCredential.degraded, true);
  assert.equal(withoutCredential.error, "NO_CREDENTIAL");
  assert.equal("failure" in withoutCredential, false);

  globalThis.fetch = async () => new Response("upstream down", { status: 500 });
  const rejected = await bodyOf(
    await maybeHandleVertexModelDiscovery(stubOptions("vertex", { apiKey: "vertex-api-key" }))
  );
  assert.equal(rejected.degraded, true);
  assert.equal(rejected.error, "HTTP 500");
  assert.equal("failure" in rejected, false);

  const emptyCatalog = await bodyOf(
    await maybeHandleVertexModelDiscovery(
      stubOptions("vertex", { apiKey: "", accessToken: "vertex-bearer-token" })
    )
  );
  assert.equal(emptyCatalog.degraded, true);
  assert.equal(emptyCatalog.error, "EMPTY_CATALOG");
  assert.equal("failure" in emptyCatalog, false);
});

// The Adobe producer hands its payload to the route, which applies the
// production conversion; the test does the same.
function adobePublicBody(discovery: Record<string, unknown>) {
  return applyDiscoveryDegradation({
    provider: "adobe-firefly",
    connectionId: "conn-1",
    ...discovery,
  }) as Record<string, unknown>;
}

// A well-formed user access token, so the producer reaches the discovery.
const ADOBE_ACCESS_TOKEN = `eyJ${"a".repeat(40)}.${"b".repeat(40)}.${"c".repeat(40)}`;

test("the adobe producer reports an empty live catalog", async () => {
  const emptyCatalog = adobePublicBody(
    await getAdobeModels(undefined, ADOBE_ACCESS_TOKEN, {}, async () =>
      Response.json({ models: [] })
    )
  );
  assert.equal(emptyCatalog.source, "local_catalog");
  assert.equal(emptyCatalog.degraded, true);
  assert.equal(emptyCatalog.error, "EMPTY_CATALOG");
  assert.equal("failure" in emptyCatalog, false);
});

test("the adobe producer reports a failed discovery", async () => {
  const failedDiscovery = adobePublicBody(
    await getAdobeModels(undefined, ADOBE_ACCESS_TOKEN, {}, async () => {
      throw new Error("upstream down");
    })
  );
  assert.equal(failedDiscovery.source, "local_catalog");
  assert.equal(failedDiscovery.degraded, true);
  assert.equal(failedDiscovery.error, "UPSTREAM_ERROR");
  assert.equal("failure" in failedDiscovery, false);
});
