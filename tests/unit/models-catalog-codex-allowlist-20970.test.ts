/**
 * #20970 — `modelVisibilityAllowlist` with EXACT Codex ids must restrict the
 * Codex rows of `/v1/models` the way it restricts every other provider's rows.
 *
 * The Codex-native bare-id loop in catalog.ts (CODEX_NATIVE_UNPREFIXED_MODELS)
 * emitted `cx/<id>`, `codex/<id>` and `<id>` without ever consulting the
 * exposure predicate, so six non-allowlisted ids stayed advertised while the
 * auto/* candidate pools (same predicate, modelExposureFilter.ts) dropped them.
 * The OpenRouter live-catalog loop leaked the same way for its chat rows. Each
 * loop now runs `shouldHideByExposure` next to its existing hide checks.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-allowlist-20970-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-allowlist-20970-test-secret";
// This tests catalog contents, not the cold-build latency budget of the shared host.
process.env.CATALOG_BUILD_TIMEOUT_MS = process.env.CATALOG_BUILD_TIMEOUT_MS || "120000";
// The OpenRouter live loop reads `getOpenRouterCatalog()`, which serves the on-disk
// cache while it is within TTL — keep the default 24h so the seeded file is never
// bypassed by a network fetch.
delete process.env.OPENROUTER_CATALOG_TTL_MS;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { CODEX_NATIVE_UNPREFIXED_MODELS } = await import("../../open-sse/services/model.ts");
const { filterModelExposureCandidates } =
  await import("../../open-sse/services/autoCombo/modelExposureFilter.ts");

type CatalogRow = { id: string; owned_by?: string; type?: string; root?: string };

// In CODEX_NATIVE_UNPREFIXED_MODELS AND the static codex catalog: its rows must
// survive the allowlist in every id form the native loop emits.
const ALLOWED = "gpt-5.6-sol-ultra";
// ONLY the native loop emits it (not in the static PROVIDER_MODELS catalog), so
// it is the purest probe of the leak path.
const LEAKED = "codex-auto-review";

// Raw OpenRouter ids (the form the auto/* pool carries as `model` for an
// `openrouter` candidate). Deliberately absent from the static OpenRouter catalog
// so only the live loop can emit them.
const OR_LIVE_ALLOWED = "test-vendor/live-allowed-20970";
const OR_LIVE_LEAKED = "test-vendor/live-leaked-20970";

const nativeIds = CODEX_NATIVE_UNPREFIXED_MODELS as Set<string>;
// Chat rows only: the modality registries (image/embedding/...) emit their own
// `type`-tagged rows and are out of scope for the per-loop fix under test.
const isCodexChatRow = (row: CatalogRow): boolean =>
  (!row.type || row.type === "chat") &&
  (row.owned_by === "codex" || /^(codex|cx)\//.test(row.id) || nativeIds.has(row.id));

async function fetchRows(): Promise<CatalogRow[]> {
  // The response cache is keyed on prefix/client/key, not on settings state —
  // reset both layers so every request sees the current allowlist.
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
  readCache.invalidateModelCatalogCache();
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  const body = (await res.json()) as { data: CatalogRow[] };
  assert.equal(res.status, 200, JSON.stringify(body));
  return body.data;
}

function seedOpenRouterLiveCatalog(ids: string[]): void {
  const cacheDir = path.join(TEST_DATA_DIR, "cache");
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(
    path.join(cacheDir, "openrouter-catalog.json"),
    JSON.stringify({
      fetchedAt: new Date().toISOString(),
      data: ids.map((id) => ({
        id,
        name: id,
        context_length: 8192,
        pricing: { prompt: "0", completion: "0" },
        architecture: { input_modalities: ["text"], output_modalities: ["text"] },
        supported_parameters: ["tools"],
      })),
    }),
    "utf8"
  );
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best-effort */
  }
});

test("#20970 an exact Codex allowlist leaves only the allowlisted Codex ids in /v1/models", async () => {
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-allowlist-20970",
    apiKey: null,
    accessToken: "codex-allowlist-20970-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  // Anti-vacuity: the native loop's rows must be advertised before the allowlist,
  // otherwise the assertions below pass against an empty Codex catalog.
  const before = await fetchRows();
  const beforeIds = new Set(before.map((row) => row.id));
  for (const id of [`codex/${LEAKED}`, `cx/${LEAKED}`, LEAKED, `codex/${ALLOWED}`]) {
    assert.ok(beforeIds.has(id), `baseline must advertise ${id}; do not skip this assertion`);
  }
  const autoRowsBefore = before.filter((row) => row.id.startsWith("auto/"));
  assert.ok(autoRowsBefore.length > 0, "baseline must advertise at least one auto/* combo row");

  await settingsDb.updateSettings({
    modelVisibilityDenylist: [],
    modelVisibilityAllowlist: [`codex/${ALLOWED}`],
  });
  try {
    const after = await fetchRows();
    const codexIds = after.filter(isCodexChatRow).map((row) => row.id);
    const allowedShape = new RegExp(`^(codex/|cx/)?${ALLOWED.replace(/\./g, "\\.")}(-|$)`);

    assert.deepEqual(
      codexIds.filter((id) => !allowedShape.test(id)),
      [],
      "every Codex row that the allowlist does not match must be gone"
    );
    assert.ok(codexIds.includes(`codex/${ALLOWED}`), "the allowlisted id itself must remain");
    for (const id of [`codex/${LEAKED}`, `cx/${LEAKED}`, LEAKED]) {
      assert.equal(codexIds.includes(id), false, `${id} is not allowlisted and must not leak`);
    }

    // The exposure list curates provider rows, not combos: the built-in auto/*
    // rows are governed by hideAutoCombos and must survive a Codex-only allowlist.
    const autoIdsAfter = after.filter((row) => row.id.startsWith("auto/")).map((row) => row.id);
    assert.ok(
      autoIdsAfter.includes(autoRowsBefore[0].id),
      `auto/* combo row ${autoRowsBefore[0].id} must survive a Codex-only allowlist`
    );

    // The catalog must agree with the auto/* candidate pools, which run the
    // same predicate over the same (provider, model) pairs.
    const settings = await settingsDb.getSettings();
    const poolIds = filterModelExposureCandidates(
      [...nativeIds].map((model) => ({ provider: "codex", model })),
      settings
    )
      .map((candidate) => `codex/${candidate.model}`)
      .sort();
    const catalogNativeIds = codexIds
      .filter((id) => id.startsWith("codex/") && nativeIds.has(id.slice("codex/".length)))
      .sort();
    assert.deepEqual(catalogNativeIds, poolIds, "catalog Codex rows must match the auto/* pool");
  } finally {
    await settingsDb.updateSettings({ modelVisibilityAllowlist: [], modelVisibilityDenylist: [] });
  }
});

test("#20970 the allowlist applies to OpenRouter live-catalog chat rows", async () => {
  seedOpenRouterLiveCatalog([OR_LIVE_ALLOWED, OR_LIVE_LEAKED]);
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-allowlist-20970",
    apiKey: "sk-or-allowlist-20970",
    isActive: true,
    testStatus: "active",
  });

  // Anti-vacuity: both live rows must be advertised before the allowlist.
  const beforeIds = new Set((await fetchRows()).map((row) => row.id));
  for (const id of [`openrouter/${OR_LIVE_ALLOWED}`, `openrouter/${OR_LIVE_LEAKED}`]) {
    assert.ok(beforeIds.has(id), `baseline must advertise ${id}; do not skip this assertion`);
  }

  await settingsDb.updateSettings({
    modelVisibilityDenylist: [],
    modelVisibilityAllowlist: [`openrouter/${OR_LIVE_ALLOWED}`],
  });
  try {
    const afterIds = new Set((await fetchRows()).map((row) => row.id));
    assert.ok(
      afterIds.has(`openrouter/${OR_LIVE_ALLOWED}`),
      "the allowlisted OpenRouter live row must remain"
    );
    assert.equal(
      afterIds.has(`openrouter/${OR_LIVE_LEAKED}`),
      false,
      "an OpenRouter live row the allowlist does not match must not leak"
    );

    // Same (provider, model) pair the auto/* pool checks for an openrouter candidate.
    const settings = await settingsDb.getSettings();
    const poolIds = filterModelExposureCandidates(
      [OR_LIVE_ALLOWED, OR_LIVE_LEAKED].map((model) => ({ provider: "openrouter", model })),
      settings
    ).map((candidate) => `openrouter/${candidate.model}`);
    assert.deepEqual(poolIds, [`openrouter/${OR_LIVE_ALLOWED}`]);
  } finally {
    await settingsDb.updateSettings({ modelVisibilityAllowlist: [], modelVisibilityDenylist: [] });
  }
});
