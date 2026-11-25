/**
 * tests/unit/quota-exclusive-catalog-4806.test.ts
 *
 * Regression for #4806 — "[BUG] Cota Exclusiva: modelos virtuais param de
 * listar após ativação".
 *
 * When an API key is scoped to a quota pool (allowedQuotas non-empty — the
 * "Cota exclusiva" state), GET /v1/models must list that pool's
 * qtSd/<group>/<provider>/<model> virtual models. Clients such as Claude
 * Desktop build their model picker from /v1/models, so an empty list shows
 * "0 modelo encontrado" and the key cannot be used.
 *
 * Root cause (before the fix): getUnifiedModelsResponse filtered the *base*
 * catalog list with filterModelsToQuotaPools(), but the base list never
 * contains qtSd/* combos — they are isHidden:true and skipped while the base
 * list is built (catalog.ts: `if (combo.isHidden === true) continue;`). The
 * filter only KEEPS qtSd/* names, so filtering a list that has none returns
 * [] → 0 models for every quota-exclusive key.
 *
 * Uses "glm" as the provider because it has a small, stable model list in the
 * static registry (same convention as quota-combos-sync.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-exclusive-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-exclusive-catalog-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { quotaGroupSlug, isQuotaModelName, parseQuotaModelName } =
  await import("../../src/lib/quota/quotaModelNaming.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { extractCatalogApiKey } = await import("../../src/app/api/v1/models/catalogRequest.ts");

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Same arrangement as the first #4806 test: a "Times" group, a glm pool and a key
// scoped to it. Returns the raw key.
async function seedExclusiveKey(): Promise<string> {
  const group = groupsDb.createGroup("Times");
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-4806-glm-xkey",
    apiKey: "sk-glm-4806-xkey",
  });
  const pool = poolsDb.createPool({
    connectionId: (conn as Record<string, unknown>).id as string,
    name: "Times",
    groupId: group.id,
  });
  await syncQuotaCombos(pool.id);
  const created = await apiKeysDb.createApiKey("Quota-4806 x-api-key", "machine-4806-xkey");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedQuotas: [pool.id] });
  return created.key;
}

// Listing open while keys still scope it: where an unread key shows the whole catalog.
const openListing = () =>
  settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: false,
  });

async function listIds(headers: Record<string, string> = {}) {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { headers })
  );
  const body = (await res.json()) as {
    data?: Array<{ id: string }>;
    error?: { message?: string };
  };
  return { status: res.status, ids: (body.data ?? []).map((m) => m.id), error: body.error };
}

const onlyOwnPool = (ids: string[]) =>
  ids.length > 0 &&
  ids.every((id) => parseQuotaModelName(id)?.groupSlug === quotaGroupSlug("Times"));

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#4806 quota-exclusive key lists its qtSd/* virtual models in GET /v1/models", async () => {
  // Group "Times" → slug "times"; combos will be qtSd/times/glm/<model>.
  const group = groupsDb.createGroup("Times");

  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-4806-glm",
    apiKey: "sk-glm-4806",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  const pool = poolsDb.createPool({ connectionId: connId, name: "Times", groupId: group.id });
  await syncQuotaCombos(pool.id); // mint the hidden qtSd/times/glm/* combos

  // Make the key "quota exclusive" by scoping it to the pool.
  const created = await apiKeysDb.createApiKey("Quota-4806 Key", "machine-4806");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedQuotas: [pool.id] });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<{ id: string }> };

  const slug = quotaGroupSlug("Times"); // "times"
  const qtsdForKey = body.data.filter(
    (m) => isQuotaModelName(m.id) && parseQuotaModelName(m.id)?.groupSlug === slug
  );

  assert.ok(
    qtsdForKey.length > 0,
    `quota-exclusive key must see its qtSd/${slug}/glm/* models in /v1/models; ` +
      `got ${body.data.length} total, ${qtsdForKey.length} qtSd. ` +
      `ids=${JSON.stringify(body.data.map((m) => m.id).slice(0, 8))}`
  );

  // Every returned model must belong to the key's group (no leakage of other pools/raw models).
  for (const m of body.data) {
    assert.ok(
      isQuotaModelName(m.id) && parseQuotaModelName(m.id)?.groupSlug === slug,
      `quota-exclusive key should only see its own qtSd/${slug}/* models; leaked: ${m.id}`
    );
  }
});

test("#4806 quota-exclusive key does NOT see qtSd/* of a group it is not allocated to", async () => {
  // Group A (glm) — the key's group.
  const groupA = groupsDb.createGroup("Alpha");
  const connA = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-4806-glm-a",
    apiKey: "sk-glm-4806-a",
  });
  const poolA = poolsDb.createPool({
    connectionId: (connA as Record<string, unknown>).id as string,
    name: "Alpha",
    groupId: groupA.id,
  });
  await syncQuotaCombos(poolA.id);

  // Group B (codex) — a DIFFERENT group the key is NOT allocated to.
  const groupB = groupsDb.createGroup("Beta");
  const connB = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "apikey",
    name: "quota-4806-codex-b",
    apiKey: "sk-codex-4806-b",
  });
  const poolB = poolsDb.createPool({
    connectionId: (connB as Record<string, unknown>).id as string,
    name: "Beta",
    groupId: groupB.id,
  });
  await syncQuotaCombos(poolB.id);

  // Key scoped ONLY to group A's pool.
  const created = await apiKeysDb.createApiKey("Quota-4806 Key A", "machine-4806-a");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedQuotas: [poolA.id] });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<{ id: string }> };

  const slugA = quotaGroupSlug("Alpha");
  const slugB = quotaGroupSlug("Beta");

  assert.ok(
    body.data.some((m) => parseQuotaModelName(m.id)?.groupSlug === slugA),
    "key must see its own group A qtSd/* models"
  );
  const leakedFromB = body.data.filter((m) => parseQuotaModelName(m.id)?.groupSlug === slugB);
  assert.equal(
    leakedFromB.length,
    0,
    `key in group A must NOT see group B (${slugB}) models; leaked: ${JSON.stringify(
      leakedFromB.map((m) => m.id)
    )}`
  );
});

test("catalog key: the regular extraction wins, a bare x-api-key is the last resort", () => {
  const req = (headers: Record<string, string>) =>
    new Request("http://localhost/api/v1/models", { headers });
  assert.equal(extractCatalogApiKey(req({ "x-api-key": " sk-a " })), "sk-a");
  assert.equal(
    extractCatalogApiKey(req({ Authorization: "Bearer sk-b", "x-api-key": "sk-a" })),
    "sk-b"
  );
  assert.equal(
    extractCatalogApiKey(req({ "x-goog-api-key": "sk-g", "x-api-key": "sk-a" })),
    "sk-g"
  );
  const pathScoped = new Request("http://localhost/vscode/sk-p/models", {
    headers: { "x-api-key": "sk-a" },
  });
  assert.equal(extractCatalogApiKey(pathScoped), "sk-p");
  assert.equal(
    extractCatalogApiKey(req({ Authorization: "Bearer ", "x-api-key": "sk-a" })),
    "sk-a"
  );
  assert.equal(extractCatalogApiKey(req({ "x-api-key": "   " })), null);
  assert.equal(extractCatalogApiKey(req({})), null);
});

test("#4806 quota-exclusive key via x-api-key (no anthropic-version) lists only its qtSd/* models", async () => {
  await openListing();
  const res = await listIds({ "x-api-key": await seedExclusiveKey() });
  assert.equal(res.status, 200);
  assert.ok(onlyOwnPool(res.ids), `leaked: ${JSON.stringify(res.ids.slice(0, 8))}`);
});

test("cache bucket: an x-api-key listing is not shared with anonymous callers", async () => {
  await openListing();
  const key = await seedExclusiveKey();
  const anonymous = await listIds();
  assert.ok(
    anonymous.ids.some((id) => !isQuotaModelName(id)),
    "fixture: raw catalog is visible"
  );
  assert.ok(onlyOwnPool((await listIds({ "x-api-key": key })).ids));
  assert.deepEqual((await listIds()).ids, anonymous.ids);
});

test("restricted key parity: x-api-key lists what Bearer lists", async () => {
  await openListing();
  for (const provider of ["glm", "codex"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `xkey-${provider}`,
      apiKey: `sk-${provider}-xkey`,
    });
  }
  const created = await apiKeysDb.createApiKey("x-api-key restricted", "machine-xkey");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedModels: ["glm/*"] });
  const viaBearer = await listIds({ Authorization: `Bearer ${created.key}` });
  assert.notDeepEqual(
    viaBearer.ids,
    (await listIds()).ids,
    "fixture: the allow-list narrows the listing"
  );
  assert.deepEqual((await listIds({ "x-api-key": created.key })).ids, viaBearer.ids);
});

test("gated listing: a bare x-api-key is still not a credential", async () => {
  // Scope-only by design: the request gate keeps the stricter extraction.
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  const key = await seedExclusiveKey();
  const bare = await listIds({ "x-api-key": key });
  assert.equal(bare.status, 401);
  assert.match(String(bare.error?.message), /Authentication required/i);
  const anthropic = await listIds({ "x-api-key": key, "anthropic-version": "2023-06-01" });
  assert.equal(anthropic.status, 200);
  assert.ok(onlyOwnPool(anthropic.ids));
});

test("placeholder: an unknown x-api-key on an open listing still gets the full catalog", async () => {
  await openListing();
  await seedExclusiveKey();
  const anonymous = await listIds();
  for (const value of ["sk-placeholder", "not-a-real-key", "   "]) {
    const res = await listIds({ "x-api-key": value });
    assert.equal(res.status, 200, value);
    assert.deepEqual(res.ids, anonymous.ids, value);
  }
});

test("Bearer wins over x-api-key for scoping", async () => {
  await openListing();
  const exclusive = await seedExclusiveKey();
  const open = await apiKeysDb.createApiKey("unrestricted", "machine-open");
  const res = await listIds({ Authorization: `Bearer ${exclusive}`, "x-api-key": open.key });
  assert.ok(onlyOwnPool(res.ids));
});
