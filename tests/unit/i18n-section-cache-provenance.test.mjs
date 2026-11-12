import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

// Import only an isolated copy: the runner's optional .env loader must never
// read credentials from the developer's checkout during these pure probes.
const root = fileURLToPath(new URL("../../", import.meta.url));
const dir = mkdtempSync(path.join(os.tmpdir(), "i18n-section-cache-"));
after(() => rmSync(dir, { recursive: true, force: true }));
cpSync(path.join(root, "scripts/i18n"), path.join(dir, "scripts/i18n"), { recursive: true });
assert.equal(existsSync(path.join(dir, ".env")), false);
const { planSectionReuse, resolveSectionPlan, sectionHashes } = await import(
  pathToFileURL(path.join(dir, "scripts/i18n/run-translation.mjs"))
);

const hash = (value) => createHash("sha256").update(value).digest("hex");
const oldSection = "## Storage\n\nRequests are retained in the database.";
const recordedSection =
  "## Storage\n\nRequests are kept in memory and never saved to the database.";
const mirrorSection = "## Armazenamento\n\nAs solicitações ficam na memória e nunca vão ao banco.";

test("a source reversal cannot reuse prose from a contradictory section cache", () => {
  const result = planSectionReuse({
    previousHashes: sectionHashes([oldSection]),
    previousSections: [recordedSection],
    sections: [oldSection],
    mirrorSections: [mirrorSection],
  });
  assert.equal(result, null, "contradictory provenance requires a full translation");
});

for (const [label, previousSections] of [
  ["one stale section", [recordedSection, "## Details\n\nCurrent information."]],
  ["reordered sections", ["## Details\n\nCurrent information.", oldSection]],
  ["missing section", [oldSection]],
]) {
  test(`the entire cache is rejected when the exact source has ${label}`, () => {
    const sections = [oldSection, "## Details\n\nCurrent information."];
    assert.equal(
      planSectionReuse({
        previousHashes: sectionHashes(sections),
        previousSections,
        sections,
        mirrorSections: [mirrorSection, "## Detalhes\n\nInformações atuais."],
      }),
      null
    );
  });
}

const git = (...args) =>
  execFileSync("git", args, {
    cwd: dir,
    env: {
      PATH: process.env.PATH,
      LANG: "C.UTF-8",
      GIT_CONFIG_NOSYSTEM: "1",
      GIT_CONFIG_GLOBAL: os.devNull,
    },
    stdio: "pipe",
  });
git("init", "-q");

for (const mode of [
  "matching-target",
  "changed-target",
  "missing-target-hash",
  "matching-cache",
  "missing-cache",
]) {
  test(`exact source history governs cache reuse independently of target provenance: ${mode}`, async () => {
    const rel = `docs/${mode}.md`;
    const recordedSource = `# Fixture\n\n${recordedSection}\n`;
    const targetAbs = path.join(dir, "docs/i18n/pt-BR", rel);
    mkdirSync(path.dirname(targetAbs), { recursive: true });
    writeFileSync(path.join(dir, rel), recordedSource);
    git("add", rel);
    git("-c", "user.name=Fixture", "-c", "user.email=fixture@example.com", "commit", "-qm", mode);
    const validCache = mode === "matching-cache" || mode === "missing-cache";
    const currentSection = validCache ? recordedSection : oldSection;
    writeFileSync(path.join(dir, rel), `# Fixture\n\n${currentSection}\n`);
    const mirror = `# Fixture (Português)\n\n---\n\n${mirrorSection}\n`;
    writeFileSync(targetAbs, mode === "changed-target" ? `${mirror}\nNota adicional.\n` : mirror);
    const record = {
      source_hash: hash(recordedSource),
      target_hash: mode === "missing-target-hash" ? undefined : hash(mirror),
      section_hashes: mode === "missing-cache" ? undefined : sectionHashes([currentSection]),
    };
    const result = await resolveSectionPlan({
      task: { rel, locale: "pt-BR", targetAbs, missingTarget: false },
      state: { sources: { [rel]: { locales: { "pt-BR": record } } } },
      opts: { force: false },
      sections: [currentSection],
    });
    if (validCache) {
      assert.deepEqual(result?.translate, []);
      assert.equal(result?.reuse.get(0), mirrorSection);
    } else {
      assert.equal(result, null, "an exact snapshot invalidates stale cache with any target hash");
    }
  });
}

// Merge contract: public section alignment must keep the private provenance/output guards.
test("a verified old snapshot still aligns sections after an insertion", () => {
  const details = "## Details\n\nCurrent information.";
  const previous = [recordedSection, details];
  const result = planSectionReuse({
    previousHashes: sectionHashes(previous),
    previousSections: previous,
    sections: ["## Introduction\n\nA newly documented feature.", ...previous],
    mirrorSections: [mirrorSection, "## Detalhes\n\nInformações atuais."],
  });
  assert.deepEqual(result?.translate, [0]);
  assert.deepEqual([...result.reuse.keys()], [1, 2]);
  assert.equal(result.reuse.get(1), mirrorSection);
});

test("a verified old snapshot still aligns surviving sections after a removal", () => {
  const retired = "## Retired\n\nThis section was removed.";
  const previous = [retired, recordedSection];
  const result = planSectionReuse({
    previousHashes: sectionHashes(previous),
    previousSections: previous,
    sections: [recordedSection],
    mirrorSections: ["## Retirado\n\nEsta seção foi removida.", mirrorSection],
  });
  assert.deepEqual(result?.translate, []);
  assert.deepEqual([...result.reuse.entries()], [[0, mirrorSection]]);
});

test("section insertion cannot hide contradictory exact-source cache provenance", () => {
  const result = planSectionReuse({
    previousHashes: sectionHashes([oldSection]),
    previousSections: [recordedSection],
    sections: ["## Introduction\n\nA newly documented feature.", oldSection],
    mirrorSections: [mirrorSection],
  });
  assert.equal(result, null);
});

test("a shifted reusable section still requires every source code literal", () => {
  const literal = "`npm run check:docs-all`";
  const previous = [recordedSection, `## Checks\n\nRun ${literal}.`];
  const input = {
    previousHashes: sectionHashes(previous),
    previousSections: previous,
    sections: ["## Introduction\n\nA newly documented feature.", ...previous],
    mirrorSections: [mirrorSection, "## Verificações\n\nExecute as verificações."],
  };
  const rejected = planSectionReuse(input);
  assert.deepEqual(rejected?.translate, [0, 2]);
  assert.deepEqual([...rejected.reuse.keys()], [1]);
  const valid = planSectionReuse({
    ...input,
    mirrorSections: [mirrorSection, `## Verificações\n\nExecute ${literal}.`],
  });
  assert.deepEqual(valid?.translate, [0]);
  assert.deepEqual([...valid.reuse.keys()], [1, 2]);
});
