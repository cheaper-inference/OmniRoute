import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  inspectSkillContracts,
  readTemplatesAt,
} from "../../../scripts/quality/check-skill-contract.mjs";

const SCRIPT = join(process.cwd(), "scripts/quality/check-skill-contract.mjs");

function git(cwd: string, ...args: string[]) {
  const result = spawnSync(
    "git",
    [
      "-c",
      "user.name=t",
      "-c",
      "user.email=t@example.invalid",
      "-c",
      "commit.gpgsign=false",
      ...args,
    ],
    { cwd, encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

// A repository whose committed templates are the approved ones, with a working tree that edits
// one of them: the stale or dirty checkout the --ref option exists for.
function repoWithDirtyTemplate() {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-skill-contract-ref-"));
  const repo = join(dir, "repo");
  const templates = join(repo, "config/quality/skill-templates");
  mkdirSync(templates, { recursive: true });
  cpSync("config/quality/skill-templates", templates, { recursive: true });
  git(repo, "init", "-q");
  git(repo, "add", ".");
  git(repo, "commit", "-q", "-m", "templates");
  const root = join(dir, "skills");
  cpSync(templates, root, { recursive: true });
  const edited = join(templates, "merge-batch/SKILL.md");
  writeFileSync(edited, readFileSync(edited, "utf8") + "\nUncommitted template edit.\n");
  return { dir, repo, templates, root };
}

test("versioned admission consumers and shared merge rules are covered by the drift contract", () => {
  const expected = [
    "quality-scan/SKILL.md",
    "validate-release-green/SKILL.md",
    "_shared/base-green.md",
    "green-prs/SKILL.md",
    "sweep-reds/SKILL.md",
    "merge-prs/SKILL.md",
    "merge-batch/SKILL.md",
    "_shared/merge-gates.md",
    "_shared/validation-gate.md",
    "_shared/protected-surfaces.md",
    "_shared/credit-preservation.md",
  ];
  const result = inspectSkillContracts("config/quality/skill-templates");
  assert.deepEqual(result.files.map((file) => file.path).sort(), expected.sort());
});

test("the skill contract distinguishes installed, drifted and missing instructions", () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-skill-contract-"));
  const root = join(dir, "skills");
  try {
    const absent = inspectSkillContracts(root);
    assert.equal(absent.ok, false);
    assert.equal(absent.status, "NOT_INSTALLED");
    cpSync("config/quality/skill-templates", root, { recursive: true });
    assert.equal(inspectSkillContracts(root).ok, true);
    const file = join(root, "quality-scan/SKILL.md");
    writeFileSync(file, readFileSync(file, "utf8") + "\nUnreviewed local instruction.\n");
    const drifted = inspectSkillContracts(root);
    assert.equal(drifted.ok, false);
    assert.deepEqual(
      drifted.files.filter((f) => f.status === "DRIFT").map((f) => f.path),
      ["quality-scan/SKILL.md"]
    );
    rmSync(file);
    const missing = inspectSkillContracts(root);
    assert.equal(missing.ok, false);
    assert.equal(missing.files.find((f) => f.path === "quality-scan/SKILL.md")?.status, "MISSING");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the batch-merge consumer cannot be omitted or independently changed", () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-batch-contract-"));
  const root = join(dir, "skills");
  try {
    cpSync("config/quality/skill-templates", root, { recursive: true });
    const file = join(root, "merge-batch/SKILL.md");
    const approved = readFileSync(file, "utf8");
    rmSync(file);
    const missing = inspectSkillContracts(root);
    assert.equal(missing.ok, false);
    assert.equal(
      missing.files.find((entry) => entry.path === "merge-batch/SKILL.md")?.status,
      "MISSING"
    );
    writeFileSync(file, approved + "\nUnreviewed local batch exception.\n");
    const drifted = inspectSkillContracts(root);
    assert.equal(drifted.ok, false);
    assert.deepEqual(
      drifted.files.filter((entry) => entry.status === "DRIFT").map((entry) => entry.path),
      ["merge-batch/SKILL.md"]
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

for (const relativePath of ["_shared/protected-surfaces.md", "_shared/credit-preservation.md"]) {
  test(`shared instruction dependency ${relativePath} cannot be missing or drifted`, () => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-shared-contract-"));
    const root = join(dir, "skills");
    try {
      cpSync("config/quality/skill-templates", root, { recursive: true });
      assert.equal(inspectSkillContracts(root).ok, true);
      const file = join(root, relativePath);
      const approved = readFileSync(file, "utf8");
      rmSync(file);
      const missing = inspectSkillContracts(root);
      assert.equal(missing.ok, false);
      assert.equal(missing.files.find((entry) => entry.path === relativePath)?.status, "MISSING");
      writeFileSync(file, approved + "\nUnreviewed instruction exception.\n");
      const drifted = inspectSkillContracts(root);
      assert.equal(drifted.ok, false);
      assert.deepEqual(
        drifted.files.filter((entry) => entry.status === "DRIFT").map((entry) => entry.path),
        [relativePath]
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

test("--ref reads the templates from a commit, not from the working tree", () => {
  const { dir, repo, templates, root } = repoWithDirtyTemplate();
  try {
    const fromTree = inspectSkillContracts(root, templates);
    assert.equal(fromTree.ok, false);
    assert.deepEqual(
      fromTree.files.filter((entry) => entry.status === "DRIFT").map((entry) => entry.path),
      ["merge-batch/SKILL.md"]
    );
    const fromRef = inspectSkillContracts(root, readTemplatesAt("HEAD", repo));
    assert.equal(fromRef.ok, true);
    assert.equal(fromRef.status, "MATCH");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("--ref refuses an option-like ref and reports a ref without the templates", () => {
  const { dir, repo, root } = repoWithDirtyTemplate();
  try {
    assert.throws(() => readTemplatesAt("--output=x", repo), /not a git ref/);
    assert.throws(
      () => inspectSkillContracts(root, readTemplatesAt("no-such-ref", repo)),
      /cannot read config\/quality\/skill-templates\/.+ at no-such-ref/
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("the CLI takes --ref before or after the installed root", () => {
  const { dir, repo, root } = repoWithDirtyTemplate();
  try {
    // HEAD~1 holds the approved templates; HEAD commits the edited one.
    git(repo, "commit", "-q", "-am", "edit a template");
    const run = (...args: string[]) =>
      spawnSync(process.execPath, [SCRIPT, ...args], { cwd: repo, encoding: "utf8" });
    const drifted = run("--ref", "HEAD", root);
    assert.equal(drifted.status, 1);
    assert.match(drifted.stdout, /"merge-batch\/SKILL.md",\s*"status": "DRIFT"/);
    assert.equal(run(root, "--ref=HEAD~1").status, 0);
    const missing = run(root, "--ref");
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /--ref needs a value/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
