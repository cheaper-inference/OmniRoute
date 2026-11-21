import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "repro-16714-"));
process.env.DATA_DIR = dataDir;
delete process.env.CODEX_CLIENT_VERSION;
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getCachedDiscoveredModels } =
  await import("../../src/lib/providerModels/modelDiscovery.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const { clearCodexGithubCatalogCacheForTests } =
  await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");
const { resetCodexClientVersionCacheForTests } =
  await import("../../open-sse/config/codexClient.ts");
const { setSafeOutboundPinnedFetchTestOverride } =
  await import("../../src/shared/network/safeOutboundFetch.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  setSafeOutboundPinnedFetchTestOverride(undefined);
  globalThis.fetch = originalFetch;
  delete process.env.CODEX_CLIENT_VERSION;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const call = async (id: string) => {
  const response = await GET(
    new Request(`http://localhost/api/providers/${id}/models?refresh=true&chatOnly=true`),
    { params: { id } }
  );
  assert.equal(response.status, 200);
  return response.json();
};

test("#16714: a degraded (refresh-failed) discovery must not replace a fuller synced catalog", async () => {
  const c = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "repro",
    isActive: true,
    accessToken: "test-token",
    providerSpecificData: { autoFetchModels: false },
  });
  const entry = (slug: string) => ({ slug, visibility: "list", supported_in_api: true });
  // Match the request host exactly (a substring match would also accept other hosts).
  const hostOf = (input: unknown) => {
    try {
      return new URL(input instanceof Request ? input.url : String(input)).hostname;
    } catch {
      return "";
    }
  };

  // Phase 1: healthy client version (override) -> backend advertises the newest model.
  process.env.CODEX_CLIENT_VERSION = "9.9.9";
  resetCodexClientVersionCacheForTests();
  clearCodexGithubCatalogCacheForTests();
  globalThis.fetch = async (input) =>
    hostOf(input) === "chatgpt.com"
      ? Response.json({ models: [entry("gpt-old-a"), entry("gpt-old-b"), entry("gpt-new-gated")] })
      : Response.json({ models: [] });
  // The npm registry call is pinned (pinDns); route it through the test seam so no real network is used.
  setSafeOutboundPinnedFetchTestOverride(() => async () => new Response("down", { status: 503 }));
  const healthy = await call(c.id);
  assert.deepEqual(healthy.models.map((m: { id: string }) => m.id).sort(), [
    "gpt-new-gated",
    "gpt-old-a",
    "gpt-old-b",
  ]);

  // Phase 2: "restart" with the registry unreachable -> pinned version -> backend hides the new model.
  delete process.env.CODEX_CLIENT_VERSION;
  resetCodexClientVersionCacheForTests();
  clearCodexGithubCatalogCacheForTests();
  globalThis.fetch = async (input) =>
    hostOf(input) === "registry.npmjs.org"
      ? new Response("down", { status: 503 })
      : hostOf(input) === "chatgpt.com"
        ? Response.json({ models: [entry("gpt-old-a"), entry("gpt-old-b")] })
        : Response.json({ models: [] });
  const degraded = await call(c.id);
  // The API already knows the discovery is degraded...
  assert.equal(degraded.discovery.clientVersion.source, "fallback");
  assert.ok(degraded.discovery.clientVersion.degraded);

  // ...but it persisted the short list anyway, dropping the model for the next /v1/models read.
  const persisted = (await getCachedDiscoveredModels("codex", c.id)).map((m) => m.id).sort();
  assert.ok(
    persisted.includes("gpt-new-gated"),
    `degraded discovery overwrote the synced catalog; persisted=${JSON.stringify(persisted)}`
  );
});
