import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-discovery-degraded-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const originalFetch = globalThis.fetch;

type ConnectionInput = {
  provider: string;
  apiKey?: string;
  providerSpecificData?: Record<string, unknown>;
};

async function connection({
  provider,
  apiKey = "test-only-key",
  providerSpecificData = { autoFetchModels: true },
}: ConnectionInput) {
  return createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider} degraded test`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

function modelsUrl(id: string, refresh = true) {
  return `http://localhost/api/providers/${id}/models${refresh ? "?refresh=true" : ""}`;
}

async function listModels(id: string, refresh = true) {
  const response = await GET(new Request(modelsUrl(id, refresh)), { params: { id } });
  return { status: response.status, body: (await response.json()) as Record<string, unknown> };
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

test("a discovery whose upstream call fails reports the degraded state and the reason", async () => {
  const stored = await connection({ provider: "openai" });
  globalThis.fetch = async () =>
    new Response('{"key":"sk-abc","token":"gho_secret"}', { status: 500 });

  const { status, body } = await listModels(stored.id);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "HTTP 500");
  assert.equal("failure" in body, false, "the internal failure must not reach the response body");
  assert.ok(
    !JSON.stringify(body).includes("sk-abc") && !JSON.stringify(body).includes("gho_secret"),
    "the reported reason must not carry upstream secrets"
  );
});

test("a successful discovery carries neither the degraded state nor a reason", async () => {
  const stored = await connection({ provider: "openai" });
  globalThis.fetch = async () => Response.json({ data: [{ id: "gpt-4.1", object: "model" }] });

  const { status, body } = await listModels(stored.id);

  assert.equal(status, 200);
  assert.equal(body.source, "api");
  assert.equal("degraded" in body, false);
  assert.equal("error" in body, false);
  assert.equal("failure" in body, false);
});

test("a provider whose static catalog is the intended source is not degraded", async () => {
  const stored = await connection({ provider: "ideogram" });
  globalThis.fetch = async () => {
    assert.fail("a static-only provider must not call the upstream");
  };

  const { status, body } = await listModels(stored.id);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal("degraded" in body, false);
  assert.equal("error" in body, false);
});

test("a discovery the operator turned off is not a degraded discovery", async () => {
  const stored = await connection({
    provider: "openai",
    providerSpecificData: { autoFetchModels: false },
  });
  globalThis.fetch = async () => {
    assert.fail("no discovery must be attempted when the operator turned it off");
  };

  const { status, body } = await listModels(stored.id, false);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal("degraded" in body, false);
  assert.equal("error" in body, false);
  assert.match(String(body.warning), /Auto-fetch disabled/);
});

test("the codex discovery the operator turned off is not a degraded discovery", async () => {
  // Auto-fetch is off for codex by default: the local catalog is the expected
  // source, so the response must not claim the provider could not be reached.
  const stored = await connection({ provider: "codex", providerSpecificData: {} });
  globalThis.fetch = async () => {
    assert.fail("no discovery must be attempted when the operator turned it off");
  };

  const { status, body } = await listModels(stored.id, false);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal("degraded" in body, false);
  assert.equal("error" in body, false);
  assert.equal(body.warning, "Auto-fetch disabled — using local catalog");
});

test("a discovery with no credential reports the missing credential", async () => {
  const stored = await connection({ provider: "openai", apiKey: "" });
  globalThis.fetch = async () => {
    assert.fail("no credential means no discovery attempt");
  };

  const { status, body } = await listModels(stored.id);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "NO_CREDENTIAL");
  assert.equal("failure" in body, false);
});

test("a discovery that answered without a usable model reports an empty catalog", async () => {
  const stored = await connection({ provider: "openai" });
  globalThis.fetch = async () => Response.json({ data: [] });

  const { status, body } = await listModels(stored.id);

  assert.equal(status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "EMPTY_CATALOG");
  assert.equal("failure" in body, false);
});

test("the degraded state and its reason always travel together", async () => {
  const stored = await connection({ provider: "openai" });
  globalThis.fetch = async () => new Response("upstream down", { status: 503 });

  const { body } = await listModels(stored.id);

  assert.equal("degraded" in body, "error" in body, "the flag and the reason go together");
  assert.equal(body.degraded, true);
  assert.equal(body.error, "HTTP 503");
});
