import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

/**
 * #10692 client-graph boundary — regression guard for #17388.
 *
 * Provider-catalog helpers are reachable from client bundles through the
 * provider detail page ("use client" component → mergeProviderModelListing →
 * cursorAutoCatalog). The #10692 rule for pure-data modules: they must never
 * statically import `@/shared/utils/featureFlags` (DB-backed resolver → the
 * whole `@/lib/db/*` graph, sqlite/executors/sharp → node builtins), because
 * the bundler follows the graph and the client compile then fails
 * (webpack: "Module not found: Can't resolve 'child_process'"; Turbopack:
 * the per-route build manifest is silently never emitted → ENOENT).
 *
 * Serverside-only modules on the open-sse side are equally forbidden in this
 * closure: `@omniroute/open-sse/services|executors|handlers`. Pure-data
 * open-sse modules (registry configs, syncedEffortVariants) stay allowed per
 * the imageRegistry precedent (#10692).
 *
 * Regressed in 44d47a82b8 (#17388): `cursorAutoCatalog.ts` gained a static
 * import of `open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts`, whose own
 * module level imported `@/shared/utils/featureFlags`.
 */

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Modules statically reachable from a client bundle must never reference these. */
const FORBIDDEN_INTERNAL = [
  {
    match: (spec: string) =>
      spec === "@/shared/utils/featureFlags" || spec === "@/shared/utils/featureFlags.ts",
    id: "@/shared/utils/featureFlags (DB-backed flag resolver — #10692)",
  },
  {
    match: (spec: string) => spec === "@/lib/db" || spec.startsWith("@/lib/db/"),
    id: "@/lib/db/* (sqlite/db services)",
  },
  {
    match: (spec: string) => /^@omniroute\/open-sse\/(services|executors|handlers)\b/.test(spec),
    id: "@omniroute/open-sse/{services,executors,handlers}/* (server runtime)",
  },
];

const NODE_BUILTINS = new Set([
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "sys",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
]);

const SKIP_EXTENSIONS = new Set([
  ".css",
  ".scss",
  ".json",
  ".mdx",
  ".md",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".wasm",
  ".webp",
  ".woff",
  ".woff2",
  ".txt",
  ".html",
]);

/** Strip comments so commented-out imports are not misread as graph edges. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

function resolveModulePath(spec: string, importerDir: string): string | null {
  let base: string | null = null;
  if (spec.startsWith("@/")) {
    base = path.join(REPO_ROOT, "src", spec.slice(2));
  } else if (spec.startsWith("@omniroute/open-sse/")) {
    base = path.join(REPO_ROOT, "open-sse", spec.slice("@omniroute/open-sse/".length));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    base = path.join(importerDir, spec);
  }
  if (!base) return null;

  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

type Edge = { from: string; spec: string; kind: string };

function collectEdges(source: string, from: string): Edge[] {
  const cleaned = stripComments(source);
  const edges: Edge[] = [];
  const patterns: Array<RegExp> = [
    /\bfrom\s*["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']/g,
    /\brequire\s*\(\s*["']([^"']+)["']/g,
  ];
  for (const pattern of patterns) {
    for (const match of cleaned.matchAll(pattern)) {
      const kind = pattern.source.startsWith("\\bfrom") ? "static" : "dynamic";
      edges.push({ from, spec: match[1], kind });
    }
  }
  return edges;
}

function classifyViolation(spec: string, kind: string): string | null {
  for (const rule of FORBIDDEN_INTERNAL) {
    if (rule.match(spec)) return rule.id;
  }
  const bare = spec.startsWith("node:") ? spec.slice(5).split("/")[0] : spec;
  if (spec.startsWith("node:") || NODE_BUILTINS.has(bare)) {
    return `node builtin "${spec}" (${kind} import)`;
  }
  return null;
}

function walkClientClosure(rootFiles: string[]): { edges: Edge[]; violations: string[] } {
  const edges: Edge[] = [];
  const violations: string[] = [];
  const visited = new Set<string>();
  const queue = [...rootFiles];

  while (queue.length > 0) {
    const file = path.resolve(queue.pop() as string);
    if (visited.has(file)) continue;
    visited.add(file);
    if (!fs.existsSync(file)) continue;

    const source = fs.readFileSync(file, "utf8");
    for (const edge of collectEdges(source, file)) {
      const { spec, kind } = edge;
      const violation = classifyViolation(spec, kind);
      if (violation) {
        violations.push(`${path.relative(REPO_ROOT, edge.from)} -> "${spec}" — ${violation}`);
        continue;
      }
      if (spec.startsWith("node:") || NODE_BUILTINS.has(spec.split("/")[0])) continue;
      const ext = path.extname(spec);
      if (SKIP_EXTENSIONS.has(ext)) continue;

      const resolved = resolveModulePath(spec, path.dirname(file));
      if (!resolved) continue; // bare package specifier — not part of the workspace graph
      edges.push(edge);
      if (!visited.has(resolved)) queue.push(resolved);
    }
  }
  return { edges, violations };
}

test("#17388 provider-catalog helper closure stays free of the DB-backed feature-flag resolver", () => {
  // Seam: the Cursor catalog helper the "use client" detail page reaches through
  // mergeProviderModelListing. Narrower on purpose: the page's own client
  // components and the imageRegistry->providerRegistry config chain (Oct 19,
  // 6834a20b95) carry pre-existing, tolerated server-only edges that pre-date
  // 44d47a82b8 — those are separate follow-up surfaces, not this regression.
  // What IS this regression's seam: cursorAutoCatalog -> grok47MaxEffort
  // -> @/shared/utils/featureFlags (the #10692 forbidden static import).
  const roots = ["src/lib/providerModels/cursorAutoCatalog.ts"].map((rel) =>
    path.join(REPO_ROOT, rel)
  );

  const { violations } = walkClientClosure(roots);

  assert.equal(
    violations.length,
    0,
    `server-only imports leaked into the client-reachable catalog graph:\n${violations.join("\n")}`
  );
});
