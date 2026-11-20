/**
 * tests/unit/quota-exclusive-catalog-short-circuit.test.ts
 *
 * A quota-exclusive key must not pay for a catalog it never sees.
 *
 * `buildUnifiedModelsResponseCore` builds the WHOLE catalog first — every
 * provider's models, the `auto/*` combos with their candidate scoring, the
 * embedding/image/rerank/audio/moderation/video/music registries, the OpenRouter
 * catalog, custom models — and only at the very end, when the caller turns out to
 * be scoped to a quota pool (`allowedQuotas` non-empty), throws all of it away and
 * returns the pool's `qtSd/*` combos instead.
 *
 * Measured on a shared-quota box (1 vCPU, 2026-07-27): ~1.2s of CPU per cold
 * build to return 10 models. Claude Code's gateway model discovery aborts at 3s,
 * so on a contended host the discovery silently falls back.
 *
 * The observable used here is the OpenRouter catalog fetch: it is part of the full
 * build and reaches the network, so a request that performs it did the whole build.
 * The quota-exclusive request runs FIRST, while OpenRouter's 24h cache is still
 * cold — otherwise a cached second call would make the assertion vacuous.
 *
 * The behavioural contract (which models a quota-exclusive key sees) is pinned by
 * tests/unit/quota-exclusive-catalog-4806.test.ts and must stay green alongside.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-shortcircuit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-shortcircuit-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { isQuotaModelName } = await import("../../src/lib/quota/quotaModelNaming.ts");

const originalFetch = globalThis.fetch;
let openRouterCalls = 0;

/** Count OpenRouter catalog fetches; never touch the network. */
function installFetchCounter(): void {
  openRouterCalls = 0;
  globalThis.fetch = (async (input: unknown, init?: unknown) => {
    const url = typeof input === "string" ? input : String((input as { url?: string })?.url ?? "");
    if (url.includes("openrouter.ai")) {
      openRouterCalls++;
      return new Response(JSON.stringify({ data: [{ id: "some/model" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return originalFetch(input as never, init as never);
  }) as typeof globalThis.fetch;
}

test.after(async () => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* ignore */
  }
});

await test("chave quota-exclusive não constrói o catálogo completo", async (t) => {
  installFetchCounter();

  // An active OpenRouter connection: this is what makes the complete build go to the network.
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "shortcircuit-openrouter",
    apiKey: "sk-or-shortcircuit",
  });

  // Quota pool over a glm connection (stable list in static registry).
  const group = groupsDb.createGroup("Curto");
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "shortcircuit-glm",
    apiKey: "sk-glm-shortcircuit",
  });
  const pool = poolsDb.createPool({
    connectionId: (conn as Record<string, unknown>).id as string,
    name: "Curto",
    groupId: group.id,
  });
  await syncQuotaCombos(pool.id);

  const quotaKey = await apiKeysDb.createApiKey("Chave de cota", "machine-shortcircuit");
  await apiKeysDb.updateApiKeyPermissions(quotaKey.id, { allowedQuotas: [pool.id] });
  const normalKey = await apiKeysDb.createApiKey("Chave normal", "machine-normal");

  await t.test("a chave de cota não dispara o fetch do catálogo OpenRouter", async () => {
    const res = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${quotaKey.key}` },
      })
    );
    assert.equal(res.status, 200);
    const body = (await res.json()) as { data: Array<{ id: string }> };

    // The content contract remains valid: only the qtSd/* in the pool.
    assert.ok(body.data.length > 0, "a chave de cota deve enxergar os modelos do pool");
    for (const m of body.data) {
      assert.ok(isQuotaModelName(m.id), `vazou modelo fora do pool: ${m.id}`);
    }

    assert.equal(
      openRouterCalls,
      0,
      `a chave quota-exclusive descarta o catálogo completo, então não deve construí-lo; ` +
        `houve ${openRouterCalls} fetch(es) ao OpenRouter`
    );
  });

  await t.test("os espelhos de discovery continuam valendo no caminho de cota", async () => {
    // The chain of post-filters (effort variants, no-thinking, mirrors
    // `claude/*` from discovery, dedupe) runs AFTER the filter by key, so the
    // quota shortcut should also be used. Without this, Claude Code stops seeing the
    // models of a pool — which is precisely the target flow.
    const prev = process.env.EXPOSE_CC_DISCOVERY_ALIASES;
    process.env.EXPOSE_CC_DISCOVERY_ALIASES = "1";
    // The cache key is `prefix|isCodex|apiKey|configuredOnly` — a query param
    // any NO invalidates it, then the answer from the previous subtest would be served.
    // #9199 removed the injectable SWR window; age the entry past the fixed
    // 30 s constant instead so the next read rebuilds rather than serving stale.
    v1ModelsCatalog.__expireCatalogCacheForTest(
      v1ModelsCatalog.CATALOG_STALE_WHILE_REVALIDATE_MS + 1_000
    );
    try {
      const res = await v1ModelsCatalog.getUnifiedModelsResponse(
        new Request("http://localhost/api/v1/models", {
          headers: { Authorization: `Bearer ${quotaKey.key}` },
        })
      );
      assert.equal(res.status, 200);
      const body = (await res.json()) as { data: Array<{ id: string }> };
      const mirrors = body.data.filter((m) => m.id.startsWith("claude/"));
      assert.ok(
        mirrors.length > 0,
        `com a flag ligada, a lista da chave de cota deve trazer espelhos claude/*; ` +
          `ids=${JSON.stringify(body.data.map((m) => m.id).slice(0, 6))}`
      );
    } finally {
      if (prev === undefined) delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
      else process.env.EXPOSE_CC_DISCOVERY_ALIASES = prev;
    }
  });

  await t.test("uma chave normal continua construindo o catálogo completo", async () => {
    // Proves that the observable works: without the quota key, the build goes to the network.
    const res = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models", {
        headers: { Authorization: `Bearer ${normalKey.key}` },
      })
    );
    assert.equal(res.status, 200);
    assert.ok(
      openRouterCalls > 0,
      "o caminho normal deve continuar buscando o catálogo do OpenRouter"
    );
  });
});
