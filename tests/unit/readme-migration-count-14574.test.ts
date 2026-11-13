import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-doc-count-14574-"));
const { buildChecks, tallyDrift } = await import("../../scripts/check/check-docs-counts-sync.mjs");
const { loadFactsSnapshot } = await import("../../scripts/release/facts.mjs");

type Facts = { migrations: number } & Record<string, unknown>;
type Check = {
  label: string;
  actual: unknown;
  strict: boolean;
  files: string[];
  validate?: (content: string) => { ok: boolean; detail: string };
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config: { locales: { code: string }[] } = JSON.parse(
  fs.readFileSync(path.join(root, "config/i18n.json"), "utf8")
);
const mirrors = config.locales
  .filter(({ code }) => code !== "en")
  .map(({ code }) => `docs/i18n/${code}/README.md`);

// The migration count in the translated READMEs is a DERIVED number (plan 2026-11-13): feature
// PRs no longer write it, `npm run release:refresh-derived` rewrites it in the source and the
// mirrors and records the same value in docs/reference/derived-facts.json. Between releases the
// SQL directory moves ahead of the text by design, so the committed mirrors are judged against
// the snapshot. The release-mode comparison with the live directory is the refresh's own check.
const snapshot = loadFactsSnapshot() as Facts | null;
assert.ok(
  snapshot,
  "docs/reference/derived-facts.json is missing — run npm run release:refresh-derived"
);
const actual = snapshot.migrations;
assert.ok(
  Number.isInteger(actual) && actual > 100,
  `implausible snapshot migration count ${actual}`
);
const mirrorCheckFor = (facts: Facts) =>
  (buildChecks({ facts }) as Check[]).find(
    (check) => check.label === "DB migrations count (README mirrors)"
  );
const checks = buildChecks({ facts: snapshot }) as Check[];
const mirrorCheck = mirrorCheckFor(snapshot);
const row = (tail: string) =>
  `<tr><td><b>Database</b></td><td>better-sqlite3 (SQLite, WAL) + LowDB (JSON) — ${tail}</td></tr>`;
const persian = (value: number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

function validate(content: string) {
  assert.ok(mirrorCheck?.validate, "translated README migration claims must have a strict gate");
  return mirrorCheck.validate(content);
}

test("all configured translated READMEs are covered by the strict migration gate", () => {
  assert.ok(mirrorCheck);
  assert.equal(mirrorCheck.strict, true);
  assert.equal(mirrorCheck.actual, actual);
  assert.deepEqual(new Set(mirrorCheck.files), new Set(mirrors));
});

test("the strict mirror check follows the facts it is given, not the SQL directory", () => {
  // Release mode runs this check with the live facts; a divergent count must be caught there.
  const moved = mirrorCheckFor({ ...snapshot, migrations: actual + 3 });
  assert.ok(moved?.validate);
  assert.equal(moved.actual, actual + 3);
  assert.equal(moved.validate(row(`137 modules, ${actual} migrations`)).ok, false);
  assert.equal(moved.validate(row(`137 modules, ${actual + 3} migrations`)).ok, true);
});

test("every current README mirror states the snapshot SQL migration count", () => {
  for (const file of mirrors) {
    const result = validate(fs.readFileSync(path.join(root, file), "utf8"));
    assert.equal(result.ok, true, `${file} drifts from derived-facts.json: ${result.detail}`);
  }
});

for (const [language, tail] of [
  ["French", `137 modules métier, ${actual} migrations`],
  ["Hausa", `manhajojin yanki 137, ƙaura ${actual}`],
  ["Japanese", `137個のドメインモジュール、${actual}件のマイグレーション`],
  ["Arabic", `137 وحدة نطاق، و${actual} عملية ترحيل`],
  ["Persian", `${persian(137)} ماژول دامنه، ${persian(actual)} مهاجرت`],
]) {
  test(`accepts the current count without requiring English wording: ${language}`, () => {
    assert.equal(validate(row(tail)).ok, true);
  });
}

test("stale migration counts fail even when the correct number appears elsewhere", () => {
  const content = `Current release uses ${actual}.\n${row(`137 modules, ${actual - 1} migrations`)}`;
  assert.equal(validate(content).ok, false);
  assert.equal(validate(row(`${actual} modules, ${actual - 1} migrations`)).ok, false);
});

test("stale Persian digits fail without reinterpreting the module count", () => {
  assert.equal(validate(row(`${persian(actual)} ماژول، ${persian(actual - 1)} مهاجرت`)).ok, false);
});

test("quoted HTML attributes do not become visible migration counts", () => {
  const content = row(
    `<span title="comparison > 999">137</span> modules, <b>${actual}</b> migrations`
  );
  assert.equal(validate(content).ok, true);
});

test("HTML character references are decoded before checking the visible count", () => {
  const encoded = String(actual).replace(/\d/g, (digit) => `&#${digit.charCodeAt(0)};`);
  assert.equal(validate(row(`&#x31;&#x33;&#x37; modules, ${encoded} migrations`)).ok, true);
});

test("a current count hidden in an attribute or comment cannot mask stale visible text", () => {
  const content = row(
    `<span title="${actual}">137 modules, ${actual - 1} migrations</span><!-- ${actual} -->`
  );
  assert.equal(validate(content).ok, false);
});

test("missing, duplicated or ambiguous database claims fail closed", () => {
  for (const content of [
    `There are ${actual} migrations elsewhere.`,
    row("137 modules, no migration count"),
    row(`137 modules, ${actual} migrations, 3 extras`),
    row(`137 modules, ${actual} migrations`) + row(`137 modules, ${actual - 1} migrations`),
  ]) {
    assert.equal(validate(content).ok, false);
  }
});

test("one stale translated claim makes the normal tally fail strictly", () => {
  const target = "docs/i18n/phi/README.md";
  const selected = checks.filter((check) => check.label === "DB migrations count (README mirrors)");
  const result = tallyDrift(selected, (file: string) =>
    file === target
      ? row(`137 domain modules, ${actual - 1} migration`)
      : row(`137 domain modules, ${actual} migration`)
  );
  assert.equal(result.strict, 1);
});
