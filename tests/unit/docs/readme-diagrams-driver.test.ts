import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { basename } from "node:path";
import { README_DIAGRAMS } from "../../../scripts/docs/gen-readme-diagrams.mjs";

// The driver (`npm run docs:readme-diagrams`) is a hand-maintained list. Nothing else ties it to
// the generators on disk, so a new `gen-readme-<name>.mjs` + its staleness test would pass CI
// while the driver silently skipped the new file. These tests pin the list to (a) the generator
// modules under scripts/docs/, (b) the docs/diagrams/README.md inventory and (c) the order in
// which the root README embeds the files. The generators are imported, never run — the
// readme-<name>-svg.test.ts files already byte-compare their output.

const GENERATORS_DIR = "scripts/docs";
const DRIVER = "gen-readme-diagrams.mjs";

type Diagram = { name: string; render: () => Promise<string>; out: string };
const diagrams = README_DIAGRAMS as Diagram[];

const generatorFiles = readdirSync(GENERATORS_DIR)
  .filter((f) => /^gen-readme-.*\.mjs$/.test(f) && f !== DRIVER)
  .sort();

test("the driver lists one entry per gen-readme-*.mjs generator and nothing else", async () => {
  assert.ok(generatorFiles.length > 0, "no generators found");
  // Each generator module's exported functions, keyed by file. Identity (===) on the exported
  // function is the link between a list entry and its module — no naming heuristic.
  const exportsByFile = new Map<string, Set<unknown>>();
  for (const file of generatorFiles) {
    const mod: Record<string, unknown> = await import(`../../../${GENERATORS_DIR}/${file}`);
    exportsByFile.set(file, new Set(Object.values(mod).filter((v) => typeof v === "function")));
  }
  const fileOf = (render: unknown): string | undefined =>
    [...exportsByFile].find(([, fns]) => fns.has(render))?.[0];

  const covered = new Map<string, string>(); // generator file → entry name
  for (const { name, render } of diagrams) {
    const file = fileOf(render);
    assert.ok(
      file,
      `${name}: its render function is not exported by any ${GENERATORS_DIR}/gen-readme-*.mjs`
    );
    assert.ok(!covered.has(file), `${file} is listed twice (${covered.get(file)} and ${name})`);
    covered.set(file, name);
  }
  assert.deepEqual(
    [...covered.keys()].sort(),
    generatorFiles,
    "driver entries ≠ generator files on disk (add the new generator to README_DIAGRAMS, or delete the stale entry)"
  );
});

test("every entry writes docs/diagrams/<name>.svg and that file is inventoried in docs/diagrams/README.md", () => {
  const inventory = readFileSync("docs/diagrams/README.md", "utf8");
  for (const { name, out } of diagrams) {
    assert.equal(out, `docs/diagrams/${name}.svg`, `${name}: out path`);
    const file = basename(out);
    assert.ok(
      inventory.includes(`](./${file})`),
      `${file} is not linked from docs/diagrams/README.md (add it to the hand-authored table)`
    );
  }
});

test("the driver's order is the order the root README embeds the diagrams (top to bottom)", () => {
  const readme = readFileSync("README.md", "utf8");
  const embedded: string[] = [];
  for (const m of readme.matchAll(/docs\/diagrams\/[\w.-]+\.svg/g)) {
    if (!embedded.includes(m[0])) embedded.push(m[0]);
  }
  assert.deepEqual(
    diagrams.map((d) => d.out),
    embedded,
    "README_DIAGRAMS must list the files in README order (first occurrence of each path)"
  );
});
