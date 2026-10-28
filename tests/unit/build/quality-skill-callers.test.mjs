import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const moduleUrl = process.env.SKILL_CALLER_CHECKER
  ? pathToFileURL(resolve(process.env.SKILL_CALLER_CHECKER)).href
  : new URL("../../../scripts/quality/check-skill-contract.mjs", import.meta.url).href;
const checker = await import(moduleUrl);
const CALLERS = [
  "_shared/i18n-translate-new-keys.md",
  "i18n-waves/references/scope-map.md",
  "implement-features/SKILL.md",
  "uplift-prs/scripts/fill_missing_i18n.py",
  "generate-release/phases/phase-0-preflight.md",
];
const digest = (value) => createHash("sha256").update(value).digest("hex");

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-skill-callers-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const root = join(dir, "installed");
  const manifestPath = join(dir, "policy", "skill-callers.json");
  const overlayPath = "skill-caller-overlays/i18n-explicit-base.patch";
  const patch = "reviewed caller overlay\n";
  mkdirSync(dirname(join(dirname(manifestPath), overlayPath)), { recursive: true });
  writeFileSync(join(dirname(manifestPath), overlayPath), patch);
  const files = CALLERS.map((path) => {
    const content = `reviewed instructions for ${path}\n`;
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
    return { path, beforeSha256: digest(`old ${content}`), afterSha256: digest(content) };
  });
  const manifest = {
    schemaVersion: 1,
    scope: "i18n-explicit-comparison-callers",
    overlay: { path: overlayPath, sha256: digest(patch) },
    files,
  };
  const save = () => writeFileSync(manifestPath, JSON.stringify(manifest));
  save();
  const inspect = () => {
    assert.equal(
      typeof checker.inspectSkillCallers,
      "function",
      "the installed callers need a drift contract"
    );
    return checker.inspectSkillCallers(root, manifestPath);
  };
  return { dir, root, manifestPath, manifest, save, inspect };
}

test("all reviewed caller fingerprints match independently of canonical whole-skill templates", (t) => {
  const f = fixture(t);
  const result = f.inspect();
  assert.equal(result.ok, true);
  assert.equal(result.status, "MATCH");
  assert.deepEqual(result.files.map((file) => file.path).sort(), [...CALLERS].sort());
});

test("missing and edited callers cannot inherit a passing template-only verdict", (t) => {
  const f = fixture(t);
  rmSync(join(f.root, CALLERS[0]));
  writeFileSync(join(f.root, CALLERS[1]), "invoke differential gate without a base\n");
  const result = f.inspect();
  assert.equal(result.ok, false);
  assert.equal(result.files.find((file) => file.path === CALLERS[0]).status, "MISSING");
  assert.equal(result.files.find((file) => file.path === CALLERS[1]).status, "DRIFT");
});

test("omitted, duplicate and unexpected caller entries make the policy incomplete", (t) => {
  const f = fixture(t);
  const original = [...f.manifest.files];
  for (const files of [
    original.slice(1),
    [...original, original[0]],
    [...original.slice(1), { ...original[0], path: "../outside.md" }],
  ]) {
    f.manifest.files = files;
    f.save();
    assert.equal(f.inspect().ok, false);
    assert.equal(f.inspect().status, "INCOMPLETE");
  }
});

test("an invalid fingerprint, corrupt overlay or malformed manifest cannot establish MATCH", (t) => {
  const f = fixture(t);
  f.manifest.files[0].afterSha256 = "not-a-hash";
  f.save();
  assert.equal(f.inspect().ok, false);
  f.manifest.files[0].afterSha256 = digest(readFileSync(join(f.root, CALLERS[0])));
  f.manifest.overlay.sha256 = "0".repeat(64);
  f.save();
  assert.equal(f.inspect().ok, false);
  writeFileSync(f.manifestPath, "{");
  assert.equal(f.inspect().status, "INCOMPLETE");
});

test("a symlink at the caller or a parent is not an installed regular caller", (t) => {
  const f = fixture(t);
  const original = join(f.root, CALLERS[0]);
  const target = join(f.dir, "outside.md");
  writeFileSync(target, readFileSync(original));
  rmSync(original);
  symlinkSync(target, original);
  assert.equal(f.inspect().files.find((file) => file.path === CALLERS[0]).status, "INVALID");
  rmSync(join(f.root, "i18n-waves"), { recursive: true });
  const outside = join(f.dir, "outside");
  mkdirSync(join(outside, "references"), { recursive: true });
  writeFileSync(join(outside, "references/scope-map.md"), "outside\n");
  symlinkSync(outside, join(f.root, "i18n-waves"));
  assert.equal(f.inspect().files.find((file) => file.path === CALLERS[1]).status, "INVALID");
});

test("a missing installation remains NOT_INSTALLED", (t) => {
  const f = fixture(t);
  rmSync(f.root, { recursive: true });
  assert.equal(f.inspect().status, "NOT_INSTALLED");
  assert.equal(f.inspect().ok, false);
});

test("the executable checker must include caller drift in the installed verdict", (t) => {
  const f = fixture(t);
  const repo = join(f.dir, "candidate");
  const templates = fileURLToPath(
    new URL("../../../config/quality/skill-templates/", import.meta.url)
  );
  cpSync(templates, join(repo, "config/quality/skill-templates"), { recursive: true });
  cpSync(templates, f.root, { recursive: true });
  cpSync(dirname(f.manifestPath), join(repo, "config/quality"), { recursive: true });
  const script = join(repo, "scripts/quality/check-skill-contract.mjs");
  mkdirSync(dirname(script), { recursive: true });
  copyFileSync(fileURLToPath(moduleUrl), script);
  const invoke = () =>
    spawnSync(process.execPath, [script, f.root], { encoding: "utf8", timeout: 5000 });
  const clean = invoke();
  assert.equal(clean.status, 0, clean.stderr);
  const report = JSON.parse(clean.stdout);
  assert.equal(report.files.length, 17);
  assert.equal(report.installedRoot, resolve(f.root));
  writeFileSync(join(f.root, CALLERS[3]), "write placeholders and ignore incomplete evidence\n");
  const drifted = invoke();
  assert.equal(drifted.status, 1, drifted.stderr);
  const failure = JSON.parse(drifted.stdout);
  assert.equal(failure.ok, false);
  assert.equal(failure.files.find((file) => file.path === CALLERS[3]).status, "DRIFT");
});
