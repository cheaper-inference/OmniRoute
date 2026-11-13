import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

import { extractPathLiteralEdges } from "./lib/pathLiteralEdges.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SRC_ROOTS = ["src", "open-sse"];
const IMPORT_RE =
  /(?:import|export)[^'"]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;
const EXTS = [".ts", ".tsx", ".mts", ".js", ".mjs"];

export function resolveImport(spec, fromFile, root = ROOT) {
  let base;
  if (spec.startsWith("@/")) base = path.join(root, "src", spec.slice(2));
  else if (spec.startsWith("@omniroute/open-sse"))
    base = path.join(root, "open-sse", spec.replace(/^@omniroute\/open-sse\/?/, ""));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const e of EXTS) {
    if (fs.existsSync(base + e)) return base + e;
  }
  for (const e of EXTS) {
    const idx = path.join(base, "index" + e);
    if (fs.existsSync(idx)) return idx;
  }
  return fs.existsSync(base) && fs.statSync(base).isFile() ? base : null;
}

/**
 * Each file's resolved import targets, in source order, read and resolved at most once.
 * Building the map walks the import graph once per test file; without the cache every walk
 * re-read and re-resolved the shared sources, thousands of times over.
 */
export class ImportGraph {
  constructor(root = ROOT) {
    this.root = root;
    this.edges = new Map();
    this.sources = new Map();
  }

  /** The repo-relative path of `file` when it lies under a source root, else null. */
  sourcePathOf(file) {
    let rel = this.sources.get(file);
    if (rel === undefined) {
      const relative = path.relative(this.root, file);
      rel = SRC_ROOTS.some((s) => relative.startsWith(s + path.sep)) ? relative : null;
      this.sources.set(file, rel);
    }
    return rel;
  }

  edgesOf(file) {
    let edges = this.edges.get(file);
    if (edges) return edges;
    edges = [];
    let code = null;
    try {
      code = fs.readFileSync(file, "utf8");
    } catch {
      // Unreadable: no edges, exactly like a file that imports nothing.
    }
    if (code !== null) {
      for (const m of code.matchAll(IMPORT_RE)) {
        const spec = m[1] || m[2] || m[3];
        if (!spec) continue;
        const r = resolveImport(spec, file, this.root);
        if (r) edges.push(r);
      }
    }
    this.edges.set(file, edges);
    return edges;
  }
}

export function sourceDepsOf(entry, root = ROOT, graph = new ImportGraph(root)) {
  const seen = new Set();
  const stack = [entry];
  const sources = new Set();
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    for (const r of graph.edgesOf(f)) {
      const rel = graph.sourcePathOf(r);
      if (rel !== null) sources.add(rel);
      stack.push(r);
    }
  }
  return sources;
}

// Mirror EXACTLY the `npm run test:unit` glob — the curated set of node:test files.
// The TIA step runs the selected subset via `node --test`, so it must NOT include
// vitest files (`.test.tsx`, `open-sse/**/__tests__`, `tests/unit/autoCombo`), nor
// e2e/integration tests, which can't run under node:test (they 99-false-failed before).
// Mirror EXACTLY the package.json `test:unit` / `test:unit:ci` globs (incl. memory,
// usage, combo, dashboard, serial, and *.test.mjs). Drift here → false __RUN_ALL__.
export function buildTestImpactMap(root = ROOT) {
  const testFiles = globSync(
    [
      "tests/unit/*.test.ts",
      "tests/unit/{api,auth,authz,build,cli,cli-helper,combo,compression,correctness,cors,db,db-adapters,docs,gamification,guardrails,lib,mcp,memory,runtime,security,services,settings,shared,ui,usage}/**/*.test.ts",
      "tests/unit/**/*.test.mjs",
      "tests/unit/dashboard/**/*.test.ts",
      // Quarentena serial (P0.3): também são node:test — a TIA precisa mapeá-los.
      "tests/unit/serial/**/*.test.ts",
    ],
    { cwd: root, absolute: true }
  );
  const map = {};
  const graph = new ImportGraph(root);
  for (const tf of testFiles) {
    const relTest = path.relative(root, tf);
    for (const src of sourceDepsOf(tf, root, graph)) {
      (map[src] ||= []).push(relTest);
    }
  }
  for (const k of Object.keys(map)) map[k].sort();
  // #16068: tests that read a workflow/config/doc as a file have no import edge.
  const artifacts = extractPathLiteralEdges({ root, testFiles });
  return {
    generatedFrom: "import-graph",
    sources: map,
    artifacts,
    testFileCount: testFiles.length,
  };
}

// Large enough that a map with millions of edges takes hundreds of writes rather
// than one per element, small enough that the pending text stays negligible.
const WRITE_CHUNK_CHARS = 1024 * 1024;

/**
 * Write one JSON value, streaming arrays and objects entry by entry.
 *
 * Only scalars ever reach `JSON.stringify`, so no single allocation grows with
 * the document.
 */
function writeJsonValue(write, value) {
  if (Array.isArray(value)) {
    write("[");
    for (let i = 0; i < value.length; i += 1) {
      if (i > 0) write(",");
      writeJsonValue(write, value[i]);
    }
    write("]");
    return;
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      write("{}");
      return;
    }
    write("{");
    entries.forEach(([key, entryValue], index) => {
      if (index > 0) write(",");
      write(JSON.stringify(key) + ":");
      writeJsonValue(write, entryValue);
    });
    write("}");
    return;
  }
  write(JSON.stringify(value));
}

/**
 * Write the map without ever building it as one string.
 *
 * `JSON.stringify` refuses to produce a string longer than V8's limit, and this
 * map is already close to it: the release map serialises to about 502 MiB, so a
 * branch that adds a few hundred edges made the whole gate die with
 * "RangeError: Invalid string length" before it could report anything. Writing
 * entry by entry through a small buffer means no string here grows with the map.
 *
 * The selector and forgotten-sibling checker use readJsonFileChunked(), so neither
 * writing nor reading requires a whole-document string beyond V8's 512 MiB limit.
 *
 * Top-level entries are separated by newlines; nested values stay compact to keep
 * this generated artifact small. The readers preserve the same JSON map contract.
 */
export function writeTestImpactMap(out, map) {
  const fd = fs.openSync(out, "w");
  let pending = "";
  const flush = () => {
    if (pending) fs.writeFileSync(fd, pending);
    pending = "";
  };
  const write = (text) => {
    pending += text;
    if (pending.length >= WRITE_CHUNK_CHARS) flush();
  };
  try {
    write("{");
    Object.entries(map).forEach(([key, value], index) => {
      write((index > 0 ? ",\n" : "\n") + JSON.stringify(key) + ":");
      writeJsonValue(write, value);
    });
    write("\n}\n");
    flush();
  } finally {
    fs.closeSync(fd);
  }
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const result = buildTestImpactMap();
  const { testFileCount, ...map } = result;
  const out = path.join(ROOT, "config/quality/test-impact-map.json");
  writeTestImpactMap(out, map);
  console.log(
    `test-impact-map: ${Object.keys(map.sources).length} source files + ${Object.keys(map.artifacts).length} artifact files mapped from ${testFileCount} test files`
  );
}
