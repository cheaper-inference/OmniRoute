/**
 * #9418 / #13562 — `leanCatalog` is one opt-in setting that applies the four
 * catalog-trimming controls at once: hideAutoCombos, hideNoThinkVariants,
 * no effort-suffix variants, and canonical-only prefixes. Default off (output
 * unchanged); catalog-only, so routing is not affected.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lean-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const schemas = await import("../../src/shared/validation/settingsSchemas.ts");

type Row = { id: string; owned_by?: string };

async function fetchCatalog(): Promise<Row[]> {
  const res = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  assert.equal(res.status, 200);
  return ((await res.json()) as { data: Row[] }).data;
}

const isAuto = (m: Row) => m.id === "auto" || m.id.startsWith("auto/");
const isNoThink = (m: Row) => m.id.startsWith("no-think/");
const isEffort = (m: Row) => /-(low|medium|high|xhigh)$/.test(m.id);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("leanCatalog defaults to false and is accepted by the settings schema", async () => {
  assert.equal((await settingsDb.getSettings()).leanCatalog, false);
  const parsed = schemas.updateSettingsSchema.safeParse({ leanCatalog: true });
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.leanCatalog, true);
});

test("default-off catalog is unchanged; leanCatalog=true trims it", async () => {
  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "claude-main",
    apiKey: "sk-ant-test",
    isActive: true,
  });

  await settingsDb.updateSettings({ leanCatalog: false });
  const off = await fetchCatalog();
  assert.ok(off.some(isAuto), "auto/* advertised while off");

  // Explicit toggles alone produce the same catalog as leanCatalog (minus prefixes).
  await settingsDb.updateSettings({ leanCatalog: true });
  const lean = await fetchCatalog();
  assert.deepEqual(lean.filter(isAuto), [], "auto/* hidden");
  assert.deepEqual(lean.filter(isNoThink), [], "no-think/* hidden");
  assert.deepEqual(lean.filter(isEffort), [], "effort-suffix ids hidden");
  assert.ok(lean.length > 0, "real provider models remain");
  assert.ok(lean.length < off.length, "lean catalog is smaller");

  // Turning it back off restores the exact original id set (cache key includes lean).
  await settingsDb.updateSettings({ leanCatalog: false });
  const back = await fetchCatalog();
  assert.deepEqual(back.map((m) => m.id).sort(), off.map((m) => m.id).sort());
});

test("leanCatalog keeps user-made combos", async () => {
  const combosDb = await import("../../src/lib/db/combos.ts");
  await combosDb.createCombo({
    name: "my-lean-combo",
    strategy: "priority",
    models: [{ model: "claude/claude-sonnet-4-5" }],
  } as never);
  await settingsDb.updateSettings({ leanCatalog: true });
  const lean = await fetchCatalog();
  assert.ok(
    lean.some((m) => m.id === "my-lean-combo"),
    "user combo must stay listed"
  );
});

test("leanCatalog keeps the alias rows of no-auth providers (they have no canonical row)", async () => {
  await settingsDb.updateSettings({ leanCatalog: true });
  const lean = await fetchCatalog();
  // `ddgw` (duckduckgo-web) and `cfp` (cloudflare-playground) are no-auth: their canonical
  // rows are never emitted, so dropping the alias row would remove them entirely.
  assert.ok(
    lean.some((m) => m.id.startsWith("ddgw/")),
    "no-auth alias rows stay listed in lean mode"
  );
  assert.ok(lean.some((m) => m.id.startsWith("cfp/")));
});

test("the no-auth alias carve-out is scoped to lean: explicit canonical mode keeps its pre-lean rows", async () => {
  await settingsDb.updateSettings({ leanCatalog: false });
  const res = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models?prefix=canonical", { method: "GET" })
  );
  assert.equal(res.status, 200);
  const rows = ((await res.json()) as { data: Row[] }).data;
  assert.equal(
    rows.some((m) => m.id.startsWith("ddgw/") || m.id.startsWith("cfp/")),
    false,
    "?prefix=canonical without lean must not gain no-auth alias rows (#11632)"
  );
});

test("leanCatalog drops effort-tier ids that already exist in the source catalog", async () => {
  await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "ag-main",
    accessToken: "ag-token",
    isActive: true,
  });
  await settingsDb.updateSettings({ leanCatalog: false });
  const off = await fetchCatalog();
  assert.ok(
    off.some(isEffort),
    "static registry ids with an effort suffix are listed while lean is off"
  );
  await settingsDb.updateSettings({ leanCatalog: true });
  const lean = await fetchCatalog();
  assert.deepEqual(lean.filter(isEffort), []);
});

test("leanCatalog applies a custom-model overlay to the canonical row instead of duplicating it", async () => {
  const modelsDb = await import("../../src/lib/db/models.ts");
  await modelsDb.addCustomModel(
    "claude",
    "claude-sonnet-4-5",
    "Lean Overlay Name",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {
      inputTokenLimit: 123456,
    }
  );

  await settingsDb.updateSettings({ leanCatalog: true });
  const lean = (await fetchCatalog()) as Array<Row & { context_length?: number; custom?: boolean }>;
  const rows = lean.filter((m) => m.id.endsWith("/claude-sonnet-4-5") && m.owned_by === "claude");
  assert.equal(rows.length, 1, "one row, no duplicate custom entry");
  assert.equal(rows[0].id, "claude/claude-sonnet-4-5", "canonical id kept");
  assert.equal(rows[0].custom, true, "overlay flagged the canonical row");
  assert.equal(rows[0].context_length, 123456, "overlay metadata applied");
});
