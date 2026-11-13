import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import {
  findMigrationAnomalies,
  KNOWN_DUPLICATE_VERSIONS,
  KNOWN_GAPS,
} from "../../scripts/check/check-migration-numbering.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";
import {
  LEGACY_MIGRATION_MAX,
  MIGRATION_TIMESTAMP_MIN,
  MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS,
  classifyMigrationFilename,
  formatMigrationTimestamp,
  normalizeMigrationDescription,
  parseMigrationTimestamp,
} from "../../scripts/check/lib/migrationNaming.mjs";

type Anomalies = {
  duplicates: Array<{ version: string; names: string[] }>;
  gaps: string[];
  badNames: string[];
  invalidNames?: Array<{ filename: string; reason: string }>;
  missingLegacyTop?: string[];
  missingLegacyBottom?: string[];
  legacyCount?: number;
  timestampCount?: number;
};

type AnomalyOptions = { now?: Date | number; legacyMax?: number; legacyMin?: number };
type FindWithOptions = (
  filenames: string[],
  knownDuplicates: Set<string>,
  knownGaps: Set<string>,
  options?: AnomalyOptions
) => Anomalies;
const find = findMigrationAnomalies as unknown as FindWithOptions;

const EMPTY = new Set<string>();

test("clean contiguous sequence has no anomalies", () => {
  const files = ["001_a.sql", "002_b.sql", "003_c.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.duplicates, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.badNames, []);
});

test("flags a filename without a zero-padded numeric prefix", () => {
  const files = ["001_a.sql", "add_index.sql", "2_short.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  // "add_index.sql" has no numeric prefix; "2_short.sql" is not zero-padded (<3 digits).
  assert.deepEqual(r.badNames.sort(), ["2_short.sql", "add_index.sql"]);
});

test("flags a real duplicate version prefix", () => {
  const files = ["001_a.sql", "002_b.sql", "002_c.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.equal(r.duplicates.length, 1);
  assert.equal(r.duplicates[0].version, "002");
  assert.deepEqual(r.duplicates[0].names, ["002_b.sql", "002_c.sql"]);
});

test("does NOT flag a duplicate that is in the knownDuplicates allowlist", () => {
  const files = ["001_a.sql", "002_b.sql", "002_c.sql"];
  const known = new Set<string>(["002"]);
  const r = findMigrationAnomalies(files, known, EMPTY) as Anomalies;
  assert.deepEqual(r.duplicates, []);
});

test("flags an unexplained sequence gap", () => {
  const files = ["001_a.sql", "002_b.sql", "004_d.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.gaps, ["003"]);
});

test("does NOT flag a gap that is in the knownGaps allowlist", () => {
  const files = ["001_a.sql", "002_b.sql", "004_d.sql"];
  const known = new Set<string>(["003"]);
  const r = findMigrationAnomalies(files, EMPTY, known) as Anomalies;
  assert.deepEqual(r.gaps, []);
});

test("gaps at the boundaries are not counted (only interior gaps)", () => {
  // No phantom gap below min or above max.
  const files = ["003_a.sql", "004_b.sql"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.gaps, []);
});

test("ignores non-.sql files entirely", () => {
  const files = ["001_a.sql", "002_b.sql", "README.md", ".keep"];
  const r = findMigrationAnomalies(files, EMPTY, EMPTY) as Anomalies;
  assert.deepEqual(r.badNames, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.duplicates, []);
});

test("a NEW gap is flagged even when a known gap is allowlisted", () => {
  // Simulate the real frozen gaps plus a fresh hole that must NOT be tolerated.
  const files = ["001_a.sql", "003_c.sql", "005_e.sql"];
  const known = new Set<string>(["004"]); // 004 allowlisted, 002 is the new hole
  const r = findMigrationAnomalies(files, EMPTY, known) as Anomalies;
  assert.deepEqual(r.gaps, ["002"]);
});

// --- Real dataset: the frozen allowlists must keep the live dir green ---

test("the real migrations dir produces ZERO anomalies under the frozen allowlists", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  assert.ok(filenames.length > 0, "expected migration files to exist");
  const r = findMigrationAnomalies(filenames, KNOWN_DUPLICATE_VERSIONS, KNOWN_GAPS) as Anomalies;
  assert.deepEqual(r.badNames, [], `unexpected bad migration names: ${r.badNames.join(", ")}`);
  assert.deepEqual(
    r.duplicates,
    [],
    `unexpected duplicate versions: ${JSON.stringify(r.duplicates)}`
  );
  assert.deepEqual(r.gaps, [], `unexpected sequence gaps: ${r.gaps.join(", ")}`);
});

test("frozen allowlists match the documented legacy and stacked-series gaps", () => {
  assert.ok((KNOWN_GAPS as Set<string>).has("026"));
  assert.ok((KNOWN_GAPS as Set<string>).has("055"));
  assert.ok((KNOWN_GAPS as Set<string>).has("121"));
  // #15564 landed 197 and 198. 199 (#15314), 200, and 201 (#15354) exist and are not gaps.
  assert.equal((KNOWN_GAPS as Set<string>).has("197"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("198"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("199"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("200"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("201"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("143"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("144"), false);
  assert.equal((KNOWN_GAPS as Set<string>).has("145"), false);
  // 147 left the gap list when 147_api_keys_model_access_mode.sql landed (same pattern as 143).
  assert.equal((KNOWN_GAPS as Set<string>).has("147"), false);
  // 148 left the gap list when 148_provider_quota_state.sql landed on this branch (same pattern as 143/147).
  assert.equal((KNOWN_GAPS as Set<string>).has("148"), false);
  // 149 left the gap list when 149_api_key_combo_access.sql landed (#10066).
  assert.equal((KNOWN_GAPS as Set<string>).has("149"), false);
  // "041" was removed from KNOWN_DUPLICATE_VERSIONS in 6A.3 (stale: no physical
  // duplicate for that prefix on disk anymore — only 041_compression_receipts.sql exists).
  assert.equal((KNOWN_DUPLICATE_VERSIONS as Set<string>).has("041"), false);
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: a gap allowlist entry no longer needed is reported as stale", () => {
  // Simulate a gap that was filled (e.g. a missing migration file was added back).
  const liveGaps: string[] = []; // gap was filled
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["042"]),
    liveGaps,
    "check-migration-numbering:gaps"
  );
  assert.deepEqual(stale, ["042"]);
});

test("stale-enforcement: a duplicate allowlist entry no longer needed is reported as stale", () => {
  // Simulate a formerly-duplicated version where one file was removed (no duplicate left).
  const liveDups: string[] = []; // duplicate resolved
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["099"]),
    liveDups,
    "check-migration-numbering:duplicates"
  );
  assert.deepEqual(stale, ["099"]);
});

test("stale-enforcement: live repo KNOWN_GAPS are all still real (no stale gap entries)", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  const raw = findMigrationAnomalies(filenames, new Set(), new Set()) as {
    duplicates: Array<{ version: string; names: string[] }>;
    gaps: string[];
    badNames: string[];
  };
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    KNOWN_GAPS as Set<string>,
    raw.gaps,
    "check-migration-numbering:gaps"
  );
  assert.deepEqual(stale, [], `KNOWN_GAPS has stale entries: ${stale.join(", ")}`);
});

test("stale-enforcement: live repo KNOWN_DUPLICATE_VERSIONS are all still real (no stale dup entries)", () => {
  const dir = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
  const filenames = fs.readdirSync(dir).filter((f) => f.endsWith(".sql"));
  const raw = findMigrationAnomalies(filenames, new Set(), new Set()) as {
    duplicates: Array<{ version: string; names: string[] }>;
    gaps: string[];
    badNames: string[];
  };
  const liveDupVersions = raw.duplicates.map((d) => d.version);
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    KNOWN_DUPLICATE_VERSIONS as Set<string>,
    liveDupVersions,
    "check-migration-numbering:duplicates"
  );
  assert.deepEqual(stale, [], `KNOWN_DUPLICATE_VERSIONS has stale entries: ${stale.join(", ")}`);
});

// --- Date-and-time migrations (Phase 3, 2026-11-13) ---------------------------------
// Old migrations keep `NNN_` (exactly 3 digits, 001..LEGACY_MIGRATION_MAX). New ones are
// `YYYYMMDDHHMMSS_description.sql` (UTC). The clock is injected so the "not in the
// future" rule is deterministic.

const NOW = new Date("2026-11-20T12:00:00Z");
const MIGRATIONS_DIR = path.resolve(import.meta.dirname, "../../src/lib/db/migrations");
const realFilenames = () => fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));

test("LEGACY_MIGRATION_MAX is frozen at 239 and equals the highest old number on disk", () => {
  assert.equal(LEGACY_MIGRATION_MAX, 239);
  const legacy = realFilenames()
    .map((f) => f.match(/^(\d{3})_/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => Number.parseInt(m[1], 10));
  assert.equal(Math.max(...legacy), LEGACY_MIGRATION_MAX);
});

test("date-and-time migration names are accepted and counted separately", () => {
  const files = ["238_a.sql", "239_b.sql", "20261113120000_add_x.sql", "20261114093015_y2.sql"];
  const r = find(files, EMPTY, EMPTY, { now: NOW });
  assert.deepEqual(r.badNames, []);
  assert.deepEqual(r.duplicates, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.missingLegacyTop, []);
  assert.equal(r.legacyCount, 2);
  assert.equal(r.timestampCount, 2);
});

const INVALID_EXAMPLES: Array<[string, RegExp]> = [
  ["240_x.sql", /depois do corte/],
  ["0239_x.sql", /4 dígito/],
  ["1000_x.sql", /4 dígito/],
  ["000_x.sql", /000/],
  ["2026111312000_x.sql", /13 dígito/],
  ["202611131200000_x.sql", /15 dígito/],
  ["20261332120000_x.sql", /não é uma data/],
  ["20261131120000_x.sql", /não é uma data/],
  ["20270229120000_x.sql", /não é uma data/],
  ["20261113246000_x.sql", /não é uma data/],
  ["20261113240000_x.sql", /não é uma data/],
  ["20261113126000_x.sql", /não é uma data/],
  ["20261113120060_x.sql", /não é uma data/],
  ["20261100120000_x.sql", /não é uma data/],
  ["20261113120000_Add-Col.sql", /fora do padrão/],
  ["20261113120000_add__col.sql", /fora do padrão/],
  ["20261113120000_add_col_.sql", /fora do padrão/],
  ["20261113120000_2fa.sql", /fora do padrão/],
  ["20261113120000_.sql", /fora do padrão/],
  ["20261113120000-x.sql", /separador/],
  ["20261113120000x.sql", /separador/],
  ["20261121120000_future.sql", /no futuro/],
  ["20261112235959_before_cut.sql", /anterior ao corte/],
  ["add_index.sql", /sem prefixo/],
];

for (const [filename, reason] of INVALID_EXAMPLES) {
  test(`rejects ${filename} with a reason`, () => {
    const r = find(["001_a.sql", filename], EMPTY, EMPTY, { now: NOW, legacyMax: 1 });
    assert.deepEqual(r.badNames, [filename]);
    assert.equal(r.invalidNames?.length, 1);
    assert.match(r.invalidNames![0].reason, reason);
  });
}

test("a too-long description is rejected", () => {
  const name = `20261113120000_${"a".repeat(81)}.sql`;
  const verdict = classifyMigrationFilename(name, { now: NOW });
  assert.equal(verdict.kind, "invalid");
  assert.match((verdict as { reason: string }).reason, /81 caracteres/);
  assert.equal(
    classifyMigrationFilename(`20261113120000_${"a".repeat(80)}.sql`, { now: NOW }).kind,
    "timestamp"
  );
});

test("leap day is accepted only in a leap year", () => {
  assert.ok(parseMigrationTimestamp("20280229120000"));
  assert.equal(parseMigrationTimestamp("20270229120000"), null);
  assert.equal(parseMigrationTimestamp("2028022912000"), null);
  assert.equal(parseMigrationTimestamp("abcdefghijklmn"), null);
});

test("format/parse round-trip in UTC", () => {
  const d = new Date("2026-11-13T07:08:09.999Z");
  assert.equal(formatMigrationTimestamp(d), "20261113070809");
  assert.equal(
    parseMigrationTimestamp("20261113070809")?.toISOString(),
    "2026-11-13T07:08:09.000Z"
  );
});

test("the cut-over minimum and the future tolerance are inclusive bounds", () => {
  assert.equal(MIGRATION_TIMESTAMP_MIN, "20261113000000");
  assert.equal(
    classifyMigrationFilename(`${MIGRATION_TIMESTAMP_MIN}_first.sql`, { now: NOW }).kind,
    "timestamp"
  );
  const edge = new Date(NOW.getTime() + MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS);
  const edgeName = `${formatMigrationTimestamp(edge)}_edge.sql`;
  assert.equal(classifyMigrationFilename(edgeName, { now: NOW }).kind, "timestamp");
  const past = new Date(edge.getTime() + 1000);
  const pastName = `${formatMigrationTimestamp(past)}_past_edge.sql`;
  assert.equal(classifyMigrationFilename(pastName, { now: NOW }).kind, "invalid");
});

test("a future timestamp passes once the clock catches up (injected clock)", () => {
  const files = ["001_a.sql", "20261125000000_later.sql"];
  assert.deepEqual(find(files, EMPTY, EMPTY, { now: NOW, legacyMax: 1 }).badNames, [
    "20261125000000_later.sql",
  ]);
  const later = new Date("2026-11-25T00:00:00Z");
  assert.deepEqual(find(files, EMPTY, EMPTY, { now: later, legacyMax: 1 }).badNames, []);
});

test("two date-named migrations with the same timestamp are a duplicate", () => {
  const files = ["001_a.sql", "20261113120000_add_x.sql", "20261113120000_add_y.sql"];
  const r = find(files, EMPTY, EMPTY, { now: NOW, legacyMax: 1 });
  assert.deepEqual(r.duplicates, [
    { version: "20261113120000", names: ["20261113120000_add_x.sql", "20261113120000_add_y.sql"] },
  ]);
});

test("the known-duplicate allowlist never hides a timestamp duplicate", () => {
  const files = ["001_a.sql", "20261113120000_add_x.sql", "20261113120000_add_y.sql"];
  const r = find(files, new Set(["20261113120000"]), EMPTY, { now: NOW, legacyMax: 1 });
  assert.equal(r.duplicates.length, 1);
});

test("date-named migrations create no gap and do not stretch the old range", () => {
  const files = ["001_a.sql", "002_b.sql", "003_c.sql", "20261113120000_x.sql"];
  const r = find(files, EMPTY, EMPTY, { now: NOW, legacyMax: 3 });
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.missingLegacyTop, []);
});

test("an old-range gap is still detected next to date-named migrations", () => {
  const files = ["001_a.sql", "003_c.sql", "20261113120000_x.sql", "20261114120000_y.sql"];
  const r = find(files, EMPTY, EMPTY, { now: NOW, legacyMax: 3 });
  assert.deepEqual(r.gaps, ["002"]);
});

test("removing the top old migration (239) is detected", () => {
  const withoutTop = realFilenames().filter((f) => !f.startsWith("239_"));
  assert.equal(withoutTop.length, realFilenames().length - 1);
  const r = find(
    [...withoutTop, "20261113120000_x.sql"],
    KNOWN_DUPLICATE_VERSIONS as Set<string>,
    KNOWN_GAPS as Set<string>,
    { now: NOW }
  );
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.missingLegacyTop, ["239"]);
});

test("removing the last three old migrations reports each missing number", () => {
  const files = ["001_a.sql", "002_b.sql"];
  const r = find(files, EMPTY, EMPTY, { now: NOW, legacyMax: 5 });
  assert.deepEqual(r.missingLegacyTop, ["003", "004", "005"]);
  const allowed = find(files, EMPTY, new Set(["004"]), { now: NOW, legacyMax: 5 });
  assert.deepEqual(allowed.missingLegacyTop, ["003", "005"]);
});

test("removing the first old migration (001) is detected", () => {
  const withoutFirst = realFilenames().filter((f) => !f.startsWith("001_"));
  assert.equal(withoutFirst.length, realFilenames().length - 1);
  const r = find(withoutFirst, KNOWN_DUPLICATE_VERSIONS as Set<string>, KNOWN_GAPS as Set<string>);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.missingLegacyTop, []);
  assert.deepEqual(r.missingLegacyBottom, ["001"]);
});

test("the real migrations dir has ZERO anomalies under the new rules", () => {
  const r = find(
    realFilenames(),
    KNOWN_DUPLICATE_VERSIONS as Set<string>,
    KNOWN_GAPS as Set<string>
  );
  assert.deepEqual(r.badNames, []);
  assert.deepEqual(r.invalidNames, []);
  assert.deepEqual(r.duplicates, []);
  assert.deepEqual(r.gaps, []);
  assert.deepEqual(r.missingLegacyTop, []);
  assert.deepEqual(r.missingLegacyBottom, []);
  assert.equal((r.legacyCount ?? 0) + (r.timestampCount ?? 0), realFilenames().length);
});

test("every real filename classifies as legacy or timestamp, never invalid", () => {
  for (const filename of realFilenames()) {
    const verdict = classifyMigrationFilename(filename);
    assert.notEqual(verdict.kind, "invalid", `${filename}: ${JSON.stringify(verdict)}`);
  }
});

test("normalizeMigrationDescription produces the snake_case the gate accepts", () => {
  assert.equal(normalizeMigrationDescription("Add Usage índice!"), "add_usage_indice");
  assert.equal(normalizeMigrationDescription("  --call-logs  pending  "), "call_logs_pending");
  assert.equal(normalizeMigrationDescription("x".repeat(200)).length, 80);
  assert.equal(normalizeMigrationDescription(`${"a".repeat(79)}-b`), "a".repeat(79));
  assert.throws(() => normalizeMigrationDescription("  !!  "), /vazia/);
  assert.throws(() => normalizeMigrationDescription(""), /vazia/);
  assert.throws(() => normalizeMigrationDescription("2fa table"), /começar com letra/);
});

test("the gate script exits 0 on the real tree and prints both counts", async () => {
  const { spawnSync } = await import("node:child_process");
  const root = path.resolve(import.meta.dirname, "../..");
  const run = spawnSync(process.execPath, ["scripts/check/check-migration-numbering.mjs"], {
    cwd: root,
    encoding: "utf-8",
  });
  assert.equal(run.status, 0, run.stderr);
  assert.match(run.stdout, /antiga\(s\) 001–239, \d+ por data/);
});

// --- End-to-end: the gate's main() against a scratch copy of the migrations dir ---------

test("gate main() end-to-end: accepts a new timestamp file, rejects bad names and a removed top", async () => {
  const { spawnSync } = await import("node:child_process");
  const os = await import("node:os");
  const script = path.resolve(
    import.meta.dirname,
    "../../scripts/check/check-migration-numbering.mjs"
  );
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-gate-"));
  try {
    const dir = path.join(tmp, "src/lib/db/migrations");
    fs.mkdirSync(dir, { recursive: true });
    for (const f of realFilenames()) fs.writeFileSync(path.join(dir, f), "-- copy\n");
    const gate = () => spawnSync(process.execPath, [script], { cwd: tmp, encoding: "utf-8" });

    const fresh = `${formatMigrationTimestamp(new Date(Date.now() - 60_000))}_add_x.sql`;
    fs.writeFileSync(path.join(dir, fresh), "-- new\n");
    let r = gate();
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /1 por data/);

    fs.writeFileSync(path.join(dir, "240_too_late.sql"), "-- bad\n");
    r = gate();
    assert.equal(r.status, 1);
    assert.match(r.stderr, /240_too_late\.sql — número antigo 240 depois do corte/);
    assert.match(r.stderr, /npm run db:new-migration -- <descricao>/);
    fs.rmSync(path.join(dir, "240_too_late.sql"));

    const top = realFilenames().find((f) => f.startsWith("239_"))!;
    fs.rmSync(path.join(dir, top));
    r = gate();
    assert.equal(r.status, 1);
    assert.match(r.stderr, /faixa antiga truncada: faltando 239/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
