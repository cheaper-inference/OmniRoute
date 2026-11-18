import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const runner = await import("../../scripts/i18n/run-translation.mjs");

// Scheduled refresh run 41636350056 (2026-11-03 12:30 UTC) failed in "Check the refreshed
// mirrors": #18824 re-synced the QUALITY_GATES mirrors by hand, so every locale record carried
// the current source hash while the source-level `source_hash` still held the old one. The
// translator skipped all 66 locales as up to date, never moved the source-level hash, and the
// drift check kept reporting `source-changed` — a drift no run of the workflow could clear.

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const LOCALES = ["de", "fr", "ja"];
const REL = "docs/guides/ALPHA.md";
const sha = (text: string) => crypto.createHash("sha256").update(text).digest("hex");
const OLD = "# Alpha\n\nOld intro.\n";
const NEW = "# Alpha\n\nNew intro with one more sentence.\n";

type LocaleRecord = { source_hash: string | null; target_hash?: string; updated_at?: string };
type State = {
  sources: Record<string, { source_hash: string | null; locales: Record<string, LocaleRecord> }>;
};

function stateWith(top: string | null, perLocale: Record<string, string | null>): State {
  const locales: Record<string, LocaleRecord> = {};
  for (const [loc, hash] of Object.entries(perLocale)) locales[loc] = { source_hash: hash };
  return { sources: { [REL]: { source_hash: top, locales } } };
}

test("heals a stale source-level hash when every locale record carries the current one", () => {
  const state = stateWith(sha(OLD), { de: sha(NEW), fr: sha(NEW), ja: sha(NEW) });
  const healed = runner.healSourceHashes(state, new Map([[REL, sha(NEW)]]), LOCALES);
  assert.deepEqual(healed, [REL]);
  assert.equal(state.sources[REL].source_hash, sha(NEW));
});

test("does not heal while any locale still lags, fails or has no record", () => {
  for (const perLocale of [
    { de: sha(NEW), fr: sha(OLD), ja: sha(NEW) },
    { de: sha(NEW), fr: sha(NEW) },
    { de: sha(NEW), fr: null, ja: sha(NEW) },
  ]) {
    const state = stateWith(sha(OLD), perLocale);
    assert.deepEqual(runner.healSourceHashes(state, new Map([[REL, sha(NEW)]]), LOCALES), []);
    assert.equal(state.sources[REL].source_hash, sha(OLD));
  }
});

test("leaves an up-to-date or unknown source alone and needs at least one locale", () => {
  const current = stateWith(sha(NEW), { de: sha(NEW), fr: sha(NEW), ja: sha(NEW) });
  assert.deepEqual(runner.healSourceHashes(current, new Map([[REL, sha(NEW)]]), LOCALES), []);
  assert.deepEqual(
    runner.healSourceHashes({ sources: {} }, new Map([[REL, sha(NEW)]]), LOCALES),
    []
  );
  const stale = stateWith(sha(OLD), {});
  assert.deepEqual(runner.healSourceHashes(stale, new Map([[REL, sha(NEW)]]), []), []);
});

test("a run with nothing to translate records the source hash the mirrors already carry", (t) => {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-heal-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(path.join(REPO, "scripts", "i18n"), path.join(root, "scripts", "i18n"), {
    recursive: true,
  });
  symlinkSync(path.join(REPO, "node_modules"), path.join(root, "node_modules"), "dir");
  mkdirSync(path.join(root, "config"), { recursive: true });
  const locale = (code: string) => ({
    code,
    label: code.toUpperCase(),
    native: code,
    english: code,
  });
  writeFileSync(
    path.join(root, "config", "i18n.json"),
    JSON.stringify({ default: "en", docsExcluded: ["en"], locales: ["en", ...LOCALES].map(locale) })
  );
  mkdirSync(path.join(root, "docs", "guides"), { recursive: true });
  writeFileSync(path.join(root, REL), NEW);
  const locales: Record<string, LocaleRecord> = {};
  const mirrors: Record<string, string> = {};
  for (const loc of LOCALES) {
    const mirror = `# Alpha (${loc})\n\n---\n\nNeue ${loc} Einleitung, von Hand übersetzt.\n`;
    const abs = path.join(root, "docs", "i18n", loc, REL);
    mkdirSync(path.dirname(abs), { recursive: true });
    writeFileSync(abs, mirror);
    mirrors[loc] = mirror;
    locales[loc] = {
      source_hash: sha(NEW),
      target_hash: sha(mirror),
      updated_at: "2026-11-03T10:00:00.000Z",
    };
  }
  const statePath = path.join(root, ".i18n-state.json");
  writeFileSync(
    statePath,
    JSON.stringify({ sources: { [REL]: { source_hash: sha(OLD), locales } } })
  );

  const res = spawnSync(
    process.execPath,
    [path.join(root, "scripts", "i18n", "run-translation.mjs"), `--files=${REL}`],
    {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_CEILING_DIRECTORIES: path.dirname(root),
        OMNIROUTE_TRANSLATION_ENGINE: "google",
        OMNIROUTE_TRANSLATION_GOOGLE_API_KEY: "",
      },
    }
  );
  const output = `${res.stdout}\n${res.stderr}`;

  assert.equal(res.status, 0, output);
  assert.match(output, /work units: 0/, output);
  const after = JSON.parse(readFileSync(statePath, "utf8")) as State;
  assert.equal(after.sources[REL].source_hash, sha(NEW));
  for (const loc of LOCALES) {
    assert.deepEqual(after.sources[REL].locales[loc], locales[loc]);
    assert.equal(readFileSync(path.join(root, "docs", "i18n", loc, REL), "utf8"), mirrors[loc]);
  }
});
