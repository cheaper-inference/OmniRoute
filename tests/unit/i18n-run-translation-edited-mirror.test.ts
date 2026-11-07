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

// Scheduled refresh runs 41748740681 and 41786406551 (2026-11-04) failed in "Check the
// refreshed mirrors" with no violation in the log: README.md [uz] had been edited by hand
// (#18659), so its bytes no longer matched the recorded target_hash while the source was
// unchanged. The drift check listed it in driftedTargets and the workflow put README.md in
// --files, but the translator only queued a unit when the source changed, the mirror was
// missing or it needed a rebuild, so all 66 README units were "skipped up-to-date", the drift
// survived the run and blockingDrift() failed the step on every run since.

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const LOCALES = ["de", "fr"];
const REL = "docs/guides/ALPHA.md";
const SOURCE =
  "# Alpha\n\nIntro paragraph.\n\n## Setup\n\nSetup text.\n\n## Usage\n\nUsage text.\n";
const sha = (text: string) => crypto.createHash("sha256").update(text).digest("hex");

// The keyless Google endpoint, faked in the child process. With FAKE_GOOGLE_FORBID set any
// call fails the test run loudly: an edited mirror must be re-recorded without translating.
const FAKE_FETCH = `
globalThis.fetch = async (url, init) => {
  if (process.env.FAKE_GOOGLE_FORBID) throw new Error("unexpected translation call");
  const q = new URLSearchParams(init.body).getAll("q");
  return { ok: true, status: 200, json: async () => q.map((s) => "T:" + s.toUpperCase()) };
};
`;

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-edited-mirror-"));
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
  writeFileSync(path.join(root, "fake-fetch.mjs"), FAKE_FETCH);
  mkdirSync(path.dirname(path.join(root, REL)), { recursive: true });
  writeFileSync(path.join(root, REL), SOURCE);
  writeFileSync(path.join(root, ".i18n-state.json"), JSON.stringify({ sources: {} }));
  return root;
}

const mirrorPath = (root: string, loc: string) => path.join(root, "docs", "i18n", loc, REL);

function node(root: string, args: string[], env: Record<string, string> = {}) {
  return spawnSync(process.execPath, args, {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_CEILING_DIRECTORIES: path.dirname(root),
      OMNIROUTE_TRANSLATION_ENGINE: "google",
      OMNIROUTE_TRANSLATION_GOOGLE_API_KEY: "",
      ...env,
    },
  });
}

function translate(root: string, env: Record<string, string> = {}) {
  const res = node(
    root,
    [
      "--import",
      path.join(root, "fake-fetch.mjs"),
      path.join(root, "scripts", "i18n", "run-translation.mjs"),
      `--files=${REL}`,
      `--failures-json=${path.join(root, "failures.json")}`,
    ],
    env
  );
  const summary = JSON.parse(readFileSync(path.join(root, "failures.json"), "utf8"));
  return { status: res.status, output: `${res.stdout}\n${res.stderr}`, summary };
}

function driftReport(root: string) {
  const res = node(root, [
    path.join(root, "scripts", "i18n", "check-translation-drift.mjs"),
    "--json",
    "--warn",
    "--all",
  ]);
  return JSON.parse(res.stdout);
}

test("a hand-edited mirror of an unchanged source is re-recorded and no longer blocks the refresh", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));

  const first = translate(root);
  assert.equal(first.status, 0, first.output);
  assert.equal(driftReport(root).ok, true);

  // A reviewer fixes a typo in one mirror (the #18659 case): only its bytes change.
  const edited = readFileSync(mirrorPath(root, "fr"), "utf8").replace(
    "T:SETUP TEXT.",
    "T:SETUP TEXT, FIXED."
  );
  assert.notEqual(edited, readFileSync(mirrorPath(root, "fr"), "utf8"));
  writeFileSync(mirrorPath(root, "fr"), edited);
  const before = driftReport(root);
  assert.deepEqual(
    before.driftedTargets.map((x: { rel: string; locale: string }) => `${x.rel} [${x.locale}]`),
    [`${REL} [fr]`]
  );

  // The refresh run on that report: no translation call is allowed.
  const second = translate(root, { FAKE_GOOGLE_FORBID: "1" });
  assert.equal(second.status, 0, second.output);
  assert.deepEqual(second.summary.translatedUnits, [{ rel: REL, locale: "fr" }]);

  // The edit survives and the state now records the mirror on disk.
  const mirror = readFileSync(mirrorPath(root, "fr"), "utf8");
  assert.match(mirror, /T:SETUP TEXT, FIXED\./);
  const state = JSON.parse(readFileSync(path.join(root, ".i18n-state.json"), "utf8"));
  assert.equal(state.sources[REL].locales.fr.target_hash, sha(mirror));

  // What "Check the refreshed mirrors" evaluates: nothing may be left blocking.
  const after = driftReport(root);
  assert.deepEqual(
    runner.blockingDrift(after, second.summary.failures, second.summary.translatedUnits),
    []
  );
});

test("an untouched up-to-date mirror is still skipped", (t) => {
  const root = fixture();
  t.after(() => rmSync(root, { recursive: true, force: true }));
  assert.equal(translate(root).status, 0);
  const second = translate(root, { FAKE_GOOGLE_FORBID: "1" });
  assert.equal(second.status, 0, second.output);
  assert.equal(second.summary.translated, 0);
  assert.equal(second.summary.skipped, LOCALES.length);
});
