import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { inspectSkillContracts } from "../../../scripts/quality/check-skill-contract.mjs";

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
