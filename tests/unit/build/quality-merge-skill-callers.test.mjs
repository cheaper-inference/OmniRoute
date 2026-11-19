import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";

const moduleUrl = process.env.SKILL_CALLER_CHECKER
  ? pathToFileURL(resolve(process.env.SKILL_CALLER_CHECKER)).href
  : new URL("../../../scripts/quality/check-skill-contract.mjs", import.meta.url).href;
const checker = await import(moduleUrl);
const PATHS = [
  "merge-waves/SKILL.md",
  "merge-waves/references/01-censo.md",
  "merge-waves/references/02-pregate.md",
  "merge-waves/references/03-board-validacao.md",
  "merge-waves/references/04-squash.md",
  "merge-waves/references/05-teardown-relato.md",
  "merge-waves/references/06-conserto-branch.md",
  "security-wave/SKILL.md",
  "security-wave/references/recipes-and-pitfalls.md",
  "omni-code-sec/SKILL.md",
  "omni-code-sec/rubric.md",
  "omni-code-review/rubric.md",
  "_shared/omni-review-core.md",
  "_shared/pr-rework-uplift.md",
  "security-wave/templates/worker-prompt.md",
  "uplift-prs/REWORK_RULES.md",
  "review-prs/SKILL.md",
  "review-group-prs/SKILL.md",
];
const digest = (value) => createHash("sha256").update(value).digest("hex");

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-merge-skill-callers-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const root = join(dir, "installed");
  const policyPath = join(dir, "policy", "merge-skill-callers.json");
  const overlayPath = "skill-caller-overlays/merge-security-admission.patch";
  const overlay = "reviewed merge instruction overlay\n";
  mkdirSync(dirname(join(dirname(policyPath), overlayPath)), { recursive: true });
  writeFileSync(join(dirname(policyPath), overlayPath), overlay);
  const originals = new Map();
  const files = PATHS.map((path) => {
    const content = `reviewed instructions: ${path}\n`;
    originals.set(path, content);
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
    return {
      path,
      beforeSha256: digest(`old ${content}`),
      afterSha256: digest(content),
    };
  });
  const policy = {
    schemaVersion: 1,
    scope: "merge-security-admission-callers",
    overlay: { path: overlayPath, sha256: digest(overlay) },
    files,
  };
  const save = () => writeFileSync(policyPath, JSON.stringify(policy));
  save();
  const inspect = (installedRoot = root) =>
    checker.inspectMergeSkillCallers(installedRoot, policyPath);
  return { dir, root, policyPath, policy, originals, save, inspect };
}

test("merge policy covers the reviewed runtime instruction dependencies and patch", () => {
  const policyFile = fileURLToPath(
    new URL("../../../config/quality/merge-skill-callers.json", import.meta.url)
  );
  const policy = JSON.parse(readFileSync(policyFile, "utf8"));
  assert.deepEqual(
    policy.files.map((file) => file.path),
    PATHS
  );
  assert.equal(policy.overlay.path, "skill-caller-overlays/merge-security-admission.patch");
  assert.equal(
    digest(readFileSync(join(dirname(policyFile), policy.overlay.path))),
    policy.overlay.sha256
  );
  assert.equal(policy.files.length, 18);
});

test("merge caller fingerprints pass for regular physical fixtures", (t) => {
  const f = fixture(t);
  assert.equal(f.inspect().ok, true);
  assert.equal(f.inspect().status, "MATCH");
  assert.deepEqual(
    f.inspect().files.map((file) => file.path),
    PATHS
  );
});

test("every merge surface rejects byte drift and absence", (t) => {
  const f = fixture(t);
  for (const path of PATHS) {
    writeFileSync(join(f.root, path), "unreviewed instruction change\n");
    assert.equal(f.inspect().files.find((file) => file.path === path).status, "DRIFT");
    assert.equal(f.inspect().ok, false);
    rmSync(join(f.root, path));
    assert.equal(f.inspect().files.find((file) => file.path === path).status, "MISSING");
    writeFileSync(join(f.root, path), f.originals.get(path));
  }
  assert.equal(f.inspect().ok, true);
});

test("omitted duplicate unexpected and traversal merge paths fail closed", (t) => {
  const f = fixture(t);
  const original = [...f.policy.files];
  for (const files of [
    original.slice(1),
    [...original, original[0]],
    [...original.slice(1), { ...original[0], path: "../outside.md" }],
    [...original.slice(1), { ...original[0], path: "/outside.md" }],
  ]) {
    f.policy.files = files;
    f.save();
    assert.equal(f.inspect().status, "INCOMPLETE");
    assert.equal(f.inspect().ok, false);
  }
});

test("corrupt fingerprint overlay scope and malformed merge policy fail closed", (t) => {
  const f = fixture(t);
  const original = JSON.stringify(f.policy);
  for (const mutate of [
    (p) => {
      p.files[0].afterSha256 = "not-a-hash";
    },
    (p) => {
      p.files[0].beforeSha256 = null;
    },
    (p) => {
      p.overlay.sha256 = "0".repeat(64);
    },
    (p) => {
      p.overlay.path = "../other.patch";
    },
    (p) => {
      p.scope = "other";
    },
  ]) {
    const policy = JSON.parse(original);
    mutate(policy);
    writeFileSync(f.policyPath, JSON.stringify(policy));
    assert.equal(f.inspect().ok, false);
  }
  writeFileSync(f.policyPath, "{");
  assert.equal(f.inspect().status, "INCOMPLETE");
});

test("a merge file symlink cannot satisfy an identical fingerprint", (t) => {
  const f = fixture(t);
  const target = join(f.dir, "outside.md");
  writeFileSync(target, f.originals.get(PATHS[0]));
  rmSync(join(f.root, PATHS[0]));
  symlinkSync(target, join(f.root, PATHS[0]));
  assert.equal(f.inspect().files[0].status, "INVALID");
  assert.equal(f.inspect().ok, false);
});

test("a skill directory alias cannot satisfy the physical installation contract", (t) => {
  const f = fixture(t);
  const target = join(f.dir, "outside");
  mkdirSync(target);
  writeFileSync(join(target, "SKILL.md"), f.originals.get(PATHS[0]));
  rmSync(join(f.root, "merge-waves"), { recursive: true });
  symlinkSync(target, join(f.root, "merge-waves"));
  assert.equal(f.inspect().files[0].status, "INVALID");
});

test("a symlink installation root is not substituted for the physical root", (t) => {
  const f = fixture(t);
  const alias = join(f.dir, "alias");
  symlinkSync(f.root, alias);
  assert.equal(f.inspect(alias).ok, false);
  assert.equal(
    f.inspect(alias).files.every((file) => file.status === "INVALID"),
    true
  );
});

test("an ancestor symlink is rejected even when the installation root itself is regular", (t) => {
  const f = fixture(t);
  const alias = join(f.dir, "parent-alias");
  symlinkSync(f.dir, alias);
  assert.equal(f.inspect(join(alias, "installed")).ok, false);
  assert.equal(
    f.inspect(join(alias, "installed")).files.every((file) => file.status === "INVALID"),
    true
  );
});

test("missing merge installation or unavailable policy never establishes MATCH", (t) => {
  const f = fixture(t);
  rmSync(f.policyPath);
  assert.equal(f.inspect().status, "INCOMPLETE");
  rmSync(f.root, { recursive: true });
  assert.equal(f.inspect().status, "NOT_INSTALLED");
});

test("directory in place of a merge instruction is INVALID", (t) => {
  const f = fixture(t);
  rmSync(join(f.root, PATHS[1]));
  mkdirSync(join(f.root, PATHS[1]));
  assert.equal(f.inspect().files[1].status, "INVALID");
  assert.equal(f.inspect().ok, false);
});
