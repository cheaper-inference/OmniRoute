/**
 * The test-impact map walks the import graph once per test file. The walks share one
 * `ImportGraph`, so each file is read and its imports resolved once, and the map stays
 * exactly what an independent walk per test produces.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after } from "node:test";

import {
  ImportGraph,
  buildTestImpactMap,
  resolveImport,
  sourceDepsOf,
} from "../../scripts/quality/build-test-impact-map.mjs";

const roots: string[] = [];
after(() => {
  for (const root of roots) fs.rmSync(root, { recursive: true, force: true });
});

function fixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "impact-graph-"));
  roots.push(root);
  for (const [file, contents] of Object.entries(files)) {
    const absolute = path.join(root, file);
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, contents);
  }
  return root;
}

/** A shared core, a cycle, an alias import, a dynamic import and a missing module. */
function graphFixture() {
  return fixture({
    "src/lib/core.ts": 'import { b } from "./b";\nexport const core = b;\n',
    "src/lib/b.ts": 'import { core } from "./core";\nexport const b = 1;\nvoid core;\n',
    "src/lib/a.ts": 'import { core } from "@/lib/core";\nexport const a = core;\n',
    "open-sse/x/index.ts": 'export const x = await import("../../src/lib/a");\n',
    "tests/unit/a.test.ts": 'import { a } from "../../src/lib/a";\nimport "./missing";\n',
    "tests/unit/x.test.ts": 'import { x } from "@omniroute/open-sse/x";\n',
    "tests/unit/plain.test.ts": 'import assert from "node:assert";\n',
  });
}

/** The walk as it was before the shared graph: read and resolve every visited file. */
function independentWalk(entry: string, root: string) {
  const seen = new Set<string>();
  const stack = [entry];
  const sources = new Set<string>();
  const IMPORT_RE =
    /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
  while (stack.length) {
    const f = stack.pop()!;
    if (seen.has(f)) continue;
    seen.add(f);
    let code: string;
    try {
      code = fs.readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const m of code.matchAll(IMPORT_RE)) {
      const r = resolveImport(m[1] || m[2] || m[3], f, root);
      if (!r) continue;
      const rel = path.relative(root, r);
      if (["src", "open-sse"].some((s) => rel.startsWith(s + path.sep))) sources.add(rel);
      stack.push(r);
    }
  }
  return [...sources];
}

test("a shared graph gives every test the same sources, in order, as an independent walk", () => {
  const root = graphFixture();
  const graph = new ImportGraph(root);
  for (const name of ["a", "x", "plain"]) {
    const entry = path.join(root, `tests/unit/${name}.test.ts`);
    assert.deepEqual([...sourceDepsOf(entry, root, graph)], independentWalk(entry, root), name);
    assert.deepEqual([...sourceDepsOf(entry, root)], independentWalk(entry, root), name);
  }
});

test("each file's imports are read and resolved once per graph", () => {
  const root = graphFixture();
  const graph = new ImportGraph(root);
  const core = path.join(root, "src/lib/core.ts");
  const first = graph.edgesOf(core);
  assert.deepEqual(first, [path.join(root, "src/lib/b.ts")]);
  fs.writeFileSync(core, 'import { a } from "./a";\n');
  assert.equal(graph.edgesOf(core), first, "a second lookup re-read the file");
  assert.deepEqual(graph.edgesOf(path.join(root, "src/lib/none.ts")), []);
});

test("the map lists each source under every test that reaches it", () => {
  const root = graphFixture();
  // The map also extracts path-literal edges, which read the git index.
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["add", "-A"], { cwd: root });
  assert.deepEqual(buildTestImpactMap(root).sources, {
    "src/lib/a.ts": ["tests/unit/a.test.ts", "tests/unit/x.test.ts"],
    "src/lib/core.ts": ["tests/unit/a.test.ts", "tests/unit/x.test.ts"],
    "src/lib/b.ts": ["tests/unit/a.test.ts", "tests/unit/x.test.ts"],
    "open-sse/x/index.ts": ["tests/unit/x.test.ts"],
  });
});
