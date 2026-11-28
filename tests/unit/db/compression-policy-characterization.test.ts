/**
 * Characterization of the compression settings and compression-combo DB helpers.
 * Uses only the long-standing public exports so it runs unchanged before and after the
 * repository extraction: defaults and legacy fallbacks, per-routing-combo selection,
 * cache reuse and invalidation, write-side merges and the cleanup that follows a delete.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "compression-policy-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const settings = await import("../../../src/lib/db/compression.ts");
const combos = await import("../../../src/lib/db/compressionCombos.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function putRaw(key: string, value: unknown): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("compression", key, value);
}

function rawRow(key: string): unknown {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("compression", key) as { value: unknown } | undefined;
  return typeof row?.value === "string" ? JSON.parse(row.value) : row?.value;
}

/** Drop the 5s settings cache through a public path that keeps every stored row. */
function freshDb(): void {
  core.resetDbInstance();
  core.getDbInstance();
}

// ── Settings: defaults, legacy keys and corrupt rows ────────────────────────

test("settings: empty store yields defaults with engines derived from the default combo", async () => {
  const config = await settings.getCompressionSettings();
  assert.equal(config.activeComboId, null);
  assert.deepEqual(config.exclusions, []);
  assert.equal(config.enginesExplicit, false);
  assert.equal(config.engines["session-dedup"].enabled, true);
  assert.equal(config.engines.lite.enabled, true);
  assert.equal(config.engines.caveman.enabled, config.cavemanConfig.enabled === true);
  assert.equal(config.engines.aggressive.enabled, false);
  assert.deepEqual(config.lite, { compressToolResults: true });
  assert.equal(config.liveZone.enabled, false);
});

test("settings: defaultMode turns its engine on only when nothing stored the engines map", async () => {
  putRaw("defaultMode", JSON.stringify("aggressive"));
  freshDb();
  assert.equal((await settings.getCompressionSettings()).engines.aggressive.enabled, true);

  putRaw("engines", JSON.stringify({ rtk: { enabled: true, level: "minimal" } }));
  freshDb();
  const explicit = await settings.getCompressionSettings();
  assert.equal(explicit.enginesExplicit, true);
  assert.equal(explicit.engines.aggressive.enabled, false);
  assert.deepEqual(explicit.engines.rtk, { enabled: true, level: "minimal" });
  assert.equal(explicit.engines.lite.enabled, false);
});

test("settings: the current key wins over its legacy key regardless of row order", async () => {
  putRaw("ultraConfig", JSON.stringify({ compressionRate: 0.2 }));
  freshDb();
  assert.equal((await settings.getCompressionSettings()).ultra.compressionRate, 0.2);

  putRaw("ultra", JSON.stringify({ compressionRate: 0.9 }));
  freshDb();
  assert.equal((await settings.getCompressionSettings()).ultra.compressionRate, 0.9);

  // A corrupt current row still suppresses the legacy row: the engine resets to defaults.
  putRaw("headroomConfig", JSON.stringify({ minRows: 42 }));
  putRaw("headroom", "{not json");
  freshDb();
  const defaults = (await settings.getCompressionSettings()).headroom.minRows;
  core.getDbInstance().prepare("DELETE FROM key_value WHERE key = 'headroom'").run();
  freshDb();
  assert.equal((await settings.getCompressionSettings()).headroom.minRows, 42);
  assert.notEqual(defaults, 42);
});

test("settings: BLOB and unparseable rows are skipped, the rest still loads", async () => {
  putRaw("enabled", Buffer.from("true"));
  putRaw("cacheMinutes", "{oops");
  putRaw("autoTriggerTokens", JSON.stringify(1234.9));
  putRaw("compressionComboId", JSON.stringify("  combo-a  "));
  putRaw("comboOverrides", JSON.stringify({ a: "lite", b: "bogus" }));
  freshDb();
  const config = await settings.getCompressionSettings();
  assert.equal(config.autoTriggerTokens, 1234);
  assert.equal(config.compressionComboId, "combo-a");
  assert.deepEqual(config.comboOverrides, { a: "lite" });
});

test("settings: a legacy preserveSystemPrompt=false install keeps its derived mode", async () => {
  putRaw("preserveSystemPrompt", JSON.stringify(false));
  freshDb();
  const legacy = await settings.getCompressionSettings();
  assert.equal(legacy.preserveSystemPrompt, false);
  assert.notEqual(legacy.preserveSystemPromptMode, "always");

  putRaw("preserveSystemPromptMode", JSON.stringify("always"));
  freshDb();
  assert.equal((await settings.getCompressionSettings()).preserveSystemPromptMode, "always");
});

// ── Settings: cache and invalidation ────────────────────────────────────────

test("settings cache: reused within TTL, dropped by writes and by a new DB instance", async () => {
  const first = await settings.getCompressionSettings();
  assert.equal(await settings.getCompressionSettings(), first);

  // A raw write is invisible while the cached value is live.
  putRaw("autoTriggerTokens", JSON.stringify(77));
  assert.equal(
    (await settings.getCompressionSettings()).autoTriggerTokens,
    first.autoTriggerTokens
  );

  const updated = await settings.updateCompressionSettings({ cacheMinutes: 9 });
  assert.notEqual(updated, first);
  assert.equal(updated.cacheMinutes, 9);
  assert.equal(updated.autoTriggerTokens, 77);
  assert.equal(await settings.getCompressionSettings(), updated);

  await settings.setMcpAccessibilityConfig({ enabled: false });
  assert.notEqual(await settings.getCompressionSettings(), updated);

  const beforeReset = await settings.getCompressionSettings();
  freshDb();
  assert.notEqual(await settings.getCompressionSettings(), beforeReset);
});

// ── Settings: write-side merges ─────────────────────────────────────────────

test("settings writes: engines merge field-by-field over the stored or derived map", async () => {
  // No row yet: merge over the derived map (default combo engines on).
  await settings.updateCompressionSettings({ engines: { rtk: { enabled: true } } } as never);
  const stored = rawRow("engines") as Record<string, { enabled: boolean; level?: string }>;
  assert.equal(stored.rtk.enabled, true);
  assert.equal(stored.lite.enabled, true);
  assert.equal(stored["session-dedup"].enabled, true);

  await settings.updateCompressionSettings({
    engines: { rtk: { level: "aggressive" }, bogus: { enabled: true } },
  } as never);
  const merged = rawRow("engines") as Record<string, { enabled: boolean; level?: string }>;
  assert.deepEqual(merged.rtk, { enabled: true, level: "aggressive" });
  assert.equal("bogus" in merged, false);
});

test("settings writes: lite keeps, clears or replaces the stored tool-length cap", async () => {
  await settings.updateCompressionSettings({ lite: { maxToolLength: 4096 } } as never);
  assert.deepEqual(rawRow("lite"), { compressToolResults: true, maxToolLength: 4096 });
  await settings.updateCompressionSettings({ lite: { compressToolResults: false } } as never);
  assert.deepEqual(rawRow("lite"), { compressToolResults: false, maxToolLength: 4096 });
  await settings.updateCompressionSettings({ lite: { maxToolLength: -5 } } as never);
  assert.deepEqual(rawRow("lite"), { compressToolResults: false, maxToolLength: 4096 });
  await settings.updateCompressionSettings({ lite: { maxToolLength: null } } as never);
  assert.deepEqual(rawRow("lite"), { compressToolResults: false });
});

test("settings writes: cavemanOutputMode fills missing fields from the stored row", async () => {
  await settings.updateCompressionSettings({
    cavemanOutputMode: { enabled: true, intensity: "ultra", autoClarity: false },
  });
  await settings.updateCompressionSettings({ cavemanOutputMode: { intensity: "lite" } } as never);
  assert.deepEqual(rawRow("cavemanOutputMode"), {
    enabled: true,
    intensity: "lite",
    autoClarity: false,
  });
});

test("settings writes: other keys are stored verbatim and undefined is skipped", async () => {
  putRaw("defaultMode", JSON.stringify("lite"));
  await settings.updateCompressionSettings({
    autoTriggerTokens: 5,
    defaultMode: undefined,
    comboOverrides: { x: "lite" },
  });
  assert.equal(rawRow("autoTriggerTokens"), 5);
  assert.deepEqual(rawRow("comboOverrides"), { x: "lite" });
  assert.equal(rawRow("defaultMode"), "lite");
});

test("mcp accessibility: defaults, merge-with-defaults write and clamping", async () => {
  const defaults = await settings.getMcpAccessibilityConfig();
  await settings.setMcpAccessibilityConfig({ enabled: !defaults.enabled });
  const stored = await settings.getMcpAccessibilityConfig();
  assert.equal(stored.enabled, !defaults.enabled);
  assert.deepEqual({ ...stored, enabled: defaults.enabled }, defaults);
  putRaw("mcpAccessibility", "{broken");
  assert.deepEqual(await settings.getMcpAccessibilityConfig(), defaults);
});

// ── Compression combos ──────────────────────────────────────────────────────

test("combos: seeded default, ordering and payload defaults", () => {
  const seeded = combos.listCompressionCombos();
  assert.deepEqual(
    seeded.map((combo) => [combo.id, combo.isDefault]),
    [["default-caveman", true]]
  );
  const b = combos.createCompressionCombo({ name: "beta", pipeline: [] });
  const a = combos.createCompressionCombo({ name: "Alpha", languagePacks: [] });
  assert.deepEqual(b.pipeline, [{ engine: "session-dedup" }, { engine: "lite" }]);
  assert.deepEqual(a.languagePacks, ["en"]);
  assert.equal(a.outputMode, false);
  assert.equal(a.outputModeIntensity, "full");
  assert.deepEqual(a.outputStyles, []);
  assert.deepEqual(
    combos.listCompressionCombos().map((combo) => combo.name),
    ["Standard Savings", "Alpha", "beta"]
  );
  const unnamed = combos.createCompressionCombo({ name: "   " });
  assert.equal(unnamed.name, "Compression Combo");
});

test("combos: a new or updated default demotes every other combo", () => {
  const custom = combos.createCompressionCombo({ name: "c", isDefault: true });
  assert.equal(combos.getDefaultCompressionCombo()?.id, custom.id);
  assert.equal(combos.getCompressionCombo("default-caveman")?.isDefault, false);

  assert.equal(combos.setDefaultCompressionCombo("missing"), false);
  assert.equal(combos.setDefaultCompressionCombo("default-caveman"), true);
  assert.equal(combos.getDefaultCompressionCombo()?.id, "default-caveman");
  assert.equal(combos.getCompressionCombo(custom.id)?.isDefault, false);

  const updated = combos.updateCompressionCombo(custom.id, { isDefault: true });
  assert.equal(updated?.isDefault, true);
  assert.equal(combos.getCompressionCombo("default-caveman")?.isDefault, false);
  assert.equal(combos.updateCompressionCombo("missing", { name: "x" }), null);
});

test("combos: updates keep unspecified fields and an explicit [] clears output styles", () => {
  const combo = combos.createCompressionCombo({
    name: "keep",
    description: "d",
    pipeline: [{ engine: "rtk", intensity: "standard" }],
    languagePacks: ["pt"],
    outputMode: true,
    outputModeIntensity: "ultra",
    outputStyles: [{ id: "terse", level: "lite" }],
  });
  const renamed = combos.updateCompressionCombo(combo.id, { name: "renamed", pipeline: [] });
  assert.equal(renamed?.description, "d");
  assert.deepEqual(renamed?.pipeline, [{ engine: "rtk", intensity: "standard" }]);
  assert.deepEqual(renamed?.languagePacks, ["pt"]);
  assert.equal(renamed?.outputMode, true);
  assert.equal(renamed?.outputModeIntensity, "ultra");
  assert.deepEqual(renamed?.outputStyles, [{ id: "terse", level: "lite" }]);
  assert.equal(renamed?.createdAt, combo.createdAt);
  const cleared = combos.updateCompressionCombo(combo.id, { outputStyles: [] });
  assert.deepEqual(cleared?.outputStyles, []);
});

test("combos: stored rows are normalized on read", () => {
  const combo = combos.createCompressionCombo({ name: "raw" });
  core
    .getDbInstance()
    .prepare(
      "UPDATE compression_combos SET pipeline = ?, language_packs = ?, output_styles = ? WHERE id = ?"
    )
    .run(
      JSON.stringify([{ engine: "lite" }, { engine: "nope" }, null]),
      JSON.stringify([" pt ", "", "pt"]),
      JSON.stringify([
        { id: "x", level: "loud" },
        { id: "y", level: "full" },
      ]),
      combo.id
    );
  const read = combos.getCompressionCombo(combo.id);
  assert.deepEqual(read?.pipeline, [{ engine: "lite" }]);
  assert.deepEqual(read?.languagePacks, ["pt"]);
  assert.deepEqual(read?.outputStyles, [{ id: "y", level: "full" }]);
  assert.equal(combos.getCompressionCombo("missing"), null);
});

test("combos: an untouched legacy seed is upgraded once per DB instance", () => {
  const db = core.getDbInstance();
  combos.listCompressionCombos();
  db.prepare("UPDATE compression_combos SET description = ?, pipeline = ? WHERE id = ?").run(
    "Default Caveman compression pipeline",
    JSON.stringify([{ engine: "caveman" }]),
    "default-caveman"
  );
  // Same instance: bootstrap already ran, the legacy row is returned as stored.
  assert.deepEqual(combos.getCompressionCombo("default-caveman")?.pipeline, [
    { engine: "caveman" },
  ]);
  freshDb();
  assert.deepEqual(combos.getCompressionCombo("default-caveman")?.pipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
  ]);
});

// ── Per-routing-combo selection and delete cleanup ──────────────────────────

test("assignments: one compression combo per routing combo, latest assignment wins", () => {
  const a = combos.createCompressionCombo({ name: "a" });
  const b = combos.createCompressionCombo({ name: "b" });
  assert.equal(combos.assignRoutingCombo("missing", "r1"), false);
  assert.equal(combos.assignRoutingCombo(a.id, "   "), false);
  assert.equal(combos.assignRoutingCombo(a.id, " r1 "), true);
  assert.equal(combos.getCompressionComboForRoutingCombo("r1")?.id, a.id);
  assert.equal(combos.assignRoutingCombo(b.id, "r1"), true);
  assert.equal(combos.getCompressionComboForRoutingCombo("r1")?.id, b.id);
  assert.deepEqual(combos.getAssignmentsForCompressionCombo(a.id), []);
  assert.equal(combos.getCompressionComboForRoutingCombo("unassigned"), null);
});

test("assignments: replacing a combo's set moves routing ids and dedupes input", () => {
  const a = combos.createCompressionCombo({ name: "a" });
  const b = combos.createCompressionCombo({ name: "b" });
  combos.assignRoutingCombo(b.id, "shared");
  combos.assignRoutingCombo(a.id, "old");
  assert.equal(combos.updateAssignments("missing", ["x"]), false);
  assert.equal(combos.updateAssignments(a.id, [" z ", "shared", "z", ""]), true);
  assert.deepEqual(
    combos.getAssignmentsForCompressionCombo(a.id).map((row) => row.routingComboId),
    ["shared", "z"]
  );
  assert.deepEqual(combos.getAssignmentsForCompressionCombo(b.id), []);
  assert.equal(combos.getCompressionComboForRoutingCombo("old"), null);
  const [row] = combos.getAssignmentsForCompressionCombo(a.id);
  assert.equal(row.compressionComboId, a.id);
  assert.equal(typeof row.id, "string");
  assert.equal(combos.updateAssignments(a.id, []), true);
  assert.deepEqual(combos.getAssignmentsForCompressionCombo(a.id), []);
});

test("delete: the default combo is protected, a deleted combo stops resolving", () => {
  assert.equal(combos.deleteCompressionCombo("default-caveman"), false);
  assert.equal(combos.deleteCompressionCombo("missing"), false);
  const a = combos.createCompressionCombo({ name: "a" });
  combos.updateAssignments(a.id, ["r1", "r2"]);
  assert.equal(combos.deleteCompressionCombo(a.id), true);
  assert.equal(combos.getCompressionCombo(a.id), null);
  assert.equal(combos.getCompressionComboForRoutingCombo("r1"), null);
  assert.equal(combos.deleteCompressionCombo(a.id), false);
  const leftover = core
    .getDbInstance()
    .prepare(
      "SELECT COUNT(*) AS n FROM compression_combo_assignments WHERE compression_combo_id = ?"
    )
    .get(a.id) as { n: number };
  // Pinned as-is: the cascade only fires when SQLite enforces foreign keys.
  assert.equal(
    leftover.n,
    Number(core.getDbInstance().pragma("foreign_keys", { simple: true })) ? 0 : 2
  );
});

test("default combo toggle: engines sorted by stack priority, empty pipeline kept", () => {
  assert.equal(combos.setEngineInDefaultCombo("nope", true), null);
  const withRtk = combos.setEngineInDefaultCombo("rtk", true, { k: 1 });
  assert.deepEqual(
    withRtk?.pipeline.map((step) => step.engine),
    ["session-dedup", "lite", "rtk"]
  );
  assert.deepEqual(withRtk?.pipeline[2], { engine: "rtk", config: { k: 1 } });
  combos.setEngineInDefaultCombo("lite", false);
  combos.setEngineInDefaultCombo("session-dedup", false);
  const empty = combos.setEngineInDefaultCombo("rtk", false);
  assert.deepEqual(empty?.pipeline, []);
});

// ── Proactive compression ratio (sync hot path) ─────────────────────────────

test("proactive ratio: default when unset, out-of-range values fall back", () => {
  // The 30s cache is process-wide; this file reads it exactly once.
  putRaw("proactiveConfig", JSON.stringify({ thresholdRatio: 5 }));
  assert.equal(settings.getProactiveCompressionRatio(), 0.7);
});
