// scripts/check/lib/spawnImportGraph.ts
// G-09 (#15159, #15965): spawn detection for the route-guard membership gate.
//
// Two layers:
//   1. `isSpawnCapableSource()` — does THIS source text spawn? (child_process /
//      worker_threads import, or an unqualified spawn/exec/execFile/fork call).
//   2. `findTransitivelySpawnCapableRoutes()` — does a route.ts with no direct
//      spawn REACH a spawn-capable module through its runtime import graph?
//      The source-only scan cannot see
//      `route.ts -> fetchCursorAgentModels() -> runCursorAgent() -> spawn()`.
//
// Pure filesystem + regex: no project module is imported, so the walk can run
// against a fixture tree in tests and against the live repo in the gate.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Spawn signal: the file loads a process API at runtime — `child_process` or
 * `worker_threads` (with or without the `node:` prefix) through a static
 * `import … from` / `export … from`, `require(…)` or dynamic `import(…)`.
 * `import type` / `export type` are type-only and do not count.
 *
 * Matching is done on comment-stripped text and keys on the IMPORT, not on a
 * bare `spawn(` / `exec(` token. The earlier token regex (`\bexec\s*\(`) matched
 * prose in comments ("-> spawn() at …"), `RegExp#exec` calls (`\b` matches between
 * `.` and `e`), regex literals (`/exec\s*\(base64/`) and interface method
 * signatures (`exec(sql: string)`). Dropping the bare-call branch loses no real
 * spawn: a module calling a spawn helper imports the module that imports
 * `child_process`, which the import-graph walk reaches one hop later.
 */
const PROCESS_MODULE = String.raw`["'](?:node:)?(?:child_process|worker_threads)["']`;
const STATIC_PROCESS_IMPORT_RE = new RegExp(
  String.raw`\b(?:import|export)\s+(type\s+)?[^;"'\x60]*?\bfrom\s*${PROCESS_MODULE}`,
  "g"
);
const CALL_PROCESS_IMPORT_RE = new RegExp(
  String.raw`\b(?:require|import)\s*\(\s*${PROCESS_MODULE}\s*\)`
);

/**
 * Remove block and line comments. The `[^:]` guard on line comments keeps the
 * `//` of a URL inside a string literal. Prose such as
 * "-> spawn() at src/lib/providerModels/cursorAgent.ts:17" in a comment is not
 * a spawn and must not classify the file.
 */
export function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** True when the source (comments ignored) loads child_process / worker_threads at runtime. */
export function isSpawnCapableSource(source: string): boolean {
  const code = stripComments(source);
  if (CALL_PROCESS_IMPORT_RE.test(code)) return true;
  for (const match of code.matchAll(STATIC_PROCESS_IMPORT_RE)) {
    if (!match[1]) return true; // a runtime (non-`type`) import
  }
  return false;
}

// Extensions tried, in order, when an import specifier has no extension. Only
// code files are graph nodes: a `package.json` import can never spawn.
const CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".mts"];
const INDEX_FILES = CODE_EXTENSIONS.map((ext) => `index${ext}`);

/** Default ceiling on import-graph hops. Deep enough for real chains, bounded for CI. */
export const DEFAULT_IMPORT_WALK_DEPTH = 6;

/**
 * Module specifiers a source file imports at RUNTIME: static `import … from`,
 * side-effect `import "x"`, `require("x")`, dynamic `import("x")` and
 * `export … from "x"` re-exports. `import type` / `export type` carry no runtime
 * edge and are skipped.
 */
export function resolveImportSpecifiers(source: string): string[] {
  const code = stripComments(source);
  const patterns = [
    /\bimport\s+(?!type\b)[\s\S]*?from\s*["']([^"']+)["']/g,
    /\bimport\s+["']([^"']+)["']/g,
    /\bexport\s+(?!type\b)(?:\*|\{[^}]*\})\s*(?:as\s+\w+\s+)?from\s*["']([^"']+)["']/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  const specs = new Set<string>();
  for (const pattern of patterns) {
    for (const match of code.matchAll(pattern)) specs.add(match[1]);
  }
  return [...specs];
}

function aliasBase(specifier: string, importerRelPath: string): string | null {
  if (specifier.startsWith("@/")) return `src/${specifier.slice(2)}`;
  if (specifier === "@omniroute/open-sse") return "open-sse";
  if (specifier.startsWith("@omniroute/open-sse/")) {
    return `open-sse/${specifier.slice("@omniroute/open-sse/".length)}`;
  }
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    return `${importerRelPath.slice(0, importerRelPath.lastIndexOf("/"))}/${specifier}`;
  }
  return null; // bare package or node: builtin — not a repo edge
}

function normalizeRepoPath(path: string): string | null {
  const segments: string[] = [];
  for (const segment of path.split("/")) {
    if (segment === "." || segment === "") continue;
    if (segment === "..") {
      if (!segments.length) return null; // escapes the repo root
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  return segments.length ? segments.join("/") : null;
}

function isFile(path: string): boolean {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolve one specifier to a repo-relative CODE file, or null. Handles the
 * repo's alias conventions (`@/` -> src/, `@omniroute/open-sse[/x]` -> open-sse/)
 * and relative paths; a `.js` specifier that names a `.ts` file (ESM style) is
 * resolved too.
 */
export function resolveImportToRepoFile(
  specifier: string,
  importerRelPath: string,
  repoRoot: string,
  fileExists: (absolutePath: string) => boolean = isFile
): string | null {
  const base = aliasBase(specifier, importerRelPath);
  const normalized = base === null ? null : normalizeRepoPath(base);
  if (!normalized) return null;
  const stem = normalized.replace(/\.(?:js|mjs|cjs)$/, "");
  const candidates = [
    ...(CODE_EXTENSIONS.some((ext) => normalized.endsWith(ext)) ? [normalized] : []),
    ...CODE_EXTENSIONS.map((ext) => `${stem}${ext}`),
    ...INDEX_FILES.map((file) => `${normalized}/${file}`),
  ];
  return candidates.find((candidate) => fileExists(join(repoRoot, candidate))) ?? null;
}

function readSource(repoRoot: string, rel: string): string | null {
  try {
    return readFileSync(join(repoRoot, rel), "utf8");
  } catch {
    return null;
  }
}

/**
 * Bounded runtime import graph (repo-relative path -> resolved imports) from
 * `entryFiles`. `maxDepth` bounds the hops from any entry; the visited set makes
 * import cycles terminate.
 */
export function buildImportGraph(opts: {
  repoRoot: string;
  entryFiles: string[];
  maxDepth?: number;
}): Map<string, Set<string>> {
  const maxDepth = opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH;
  const graph = new Map<string, Set<string>>();
  const queue = opts.entryFiles.map((file) => ({ file, depth: 0 }));
  const seen = new Set<string>();
  for (let i = 0; i < queue.length; i++) {
    const { file, depth } = queue[i];
    if (seen.has(file)) continue;
    seen.add(file);
    const source = readSource(opts.repoRoot, file);
    if (source === null) continue;
    const edges = new Set<string>();
    graph.set(file, edges);
    if (depth >= maxDepth) continue;
    for (const specifier of resolveImportSpecifiers(source)) {
      const resolved = resolveImportToRepoFile(specifier, file, opts.repoRoot);
      if (!resolved) continue;
      edges.add(resolved);
      if (!seen.has(resolved)) queue.push({ file: resolved, depth: depth + 1 });
    }
  }
  return graph;
}

export interface SpawnWalkOptions {
  maxDepth?: number;
  /**
   * Spawn-capable modules whose spawn is NOT a request-driven surface (fixed
   * command at process start, in-process worker pool, …). The walk does not stop
   * at them — it keeps following their imports — but reaching one alone does not
   * make a route spawn-capable. Each entry needs a justification in the gate.
   */
  ignoreModules?: ReadonlySet<string>;
}

/** Memoized `isSpawnCapableSource` per repo file for one walk. */
function spawnProbe(repoRoot: string, ignore: ReadonlySet<string>) {
  const cache = new Map<string, boolean>();
  return (rel: string): boolean => {
    if (ignore.has(rel)) return false;
    let hit = cache.get(rel);
    if (hit === undefined) {
      const source = readSource(repoRoot, rel);
      hit = source !== null && isSpawnCapableSource(source);
      cache.set(rel, hit);
    }
    return hit;
  };
}

function chainTo(target: string, entry: string, parent: Map<string, string>): string[] {
  const via = [target];
  for (let cursor = parent.get(target); cursor !== undefined; cursor = parent.get(cursor)) {
    via.unshift(cursor);
    if (cursor === entry) break;
  }
  return via;
}

/**
 * Breadth-first: does `entryFile` reach a spawn-capable module within `maxDepth`
 * hops? `via` is the shortest chain `entry -> … -> spawn module`.
 */
export function reachesSpawnCapableModule(
  graph: Map<string, Set<string>>,
  repoRoot: string,
  entryFile: string,
  opts: SpawnWalkOptions & { isSpawnModule?: (rel: string) => boolean } = {}
): { reachable: boolean; via: string[] } {
  const maxDepth = opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH;
  const isSpawnModule = opts.isSpawnModule ?? spawnProbe(repoRoot, opts.ignoreModules ?? new Set());
  const parent = new Map<string, string>();
  const visited = new Set<string>([entryFile]);
  let frontier = [entryFile];
  for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
    const next: string[] = [];
    for (const current of frontier) {
      for (const neighbor of graph.get(current) ?? []) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parent.set(neighbor, current);
        if (isSpawnModule(neighbor)) {
          return { reachable: true, via: chainTo(neighbor, entryFile, parent) };
        }
        next.push(neighbor);
      }
    }
    frontier = next;
  }
  return { reachable: false, via: [] };
}

/** Every `route.ts` under `<repoRoot>/src/app/api`, repo-relative, sorted. */
export function listApiRouteFiles(repoRoot: string): string[] {
  const out: string[] = [];
  const walk = (dir: string): void => {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      if (isFile(full)) {
        if (entry === "route.ts") out.push(relative(repoRoot, full).replace(/\\/g, "/"));
      } else {
        walk(full);
      }
    }
  };
  walk(join(repoRoot, "src", "app", "api"));
  return out.sort();
}

/**
 * Every spawn-capable module `entryFile` reaches within `maxDepth` hops, each
 * with its shortest chain. Unlike `reachesSpawnCapableModule` the walk does not
 * stop at the first hit, so a frozen sink cannot mask a new one behind it.
 */
export function collectReachableSpawnModules(
  graph: Map<string, Set<string>>,
  entryFile: string,
  isSpawnModule: (rel: string) => boolean,
  maxDepth = DEFAULT_IMPORT_WALK_DEPTH
): Map<string, string[]> {
  const sinks = new Map<string, string[]>();
  const parent = new Map<string, string>();
  const visited = new Set<string>([entryFile]);
  let frontier = [entryFile];
  for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
    const next: string[] = [];
    for (const current of frontier) {
      for (const neighbor of graph.get(current) ?? []) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parent.set(neighbor, current);
        if (isSpawnModule(neighbor)) sinks.set(neighbor, chainTo(neighbor, entryFile, parent));
        next.push(neighbor);
      }
    }
    frontier = next;
  }
  return sinks;
}

export interface TransitiveSpawnRoute {
  route: string;
  /** Shortest chain to the nearest spawn-capable module. */
  via: string[];
  /** Every reachable spawn-capable module -> its shortest chain. */
  sinks: Map<string, string[]>;
}

/**
 * Routes with NO direct spawn that reach a spawn-capable module through their
 * import graph (direct-spawn routes are the source scan's job, not repeated here).
 * Modules in `ignoreModules` are traversed but never count as a spawn.
 */
export function findTransitivelySpawnCapableRoutes(
  opts: { repoRoot: string } & SpawnWalkOptions
): TransitiveSpawnRoute[] {
  const { repoRoot } = opts;
  const indirect = listApiRouteFiles(repoRoot).filter((rel) => {
    const source = readSource(repoRoot, rel);
    return source !== null && !isSpawnCapableSource(source);
  });
  if (!indirect.length) return [];
  // All entries start at depth 0 in one BFS queue, so every module is expanded
  // at its MINIMUM distance from any route and the shared bound is exact.
  const graph = buildImportGraph({ repoRoot, entryFiles: indirect, maxDepth: opts.maxDepth });
  const isSpawnModule = spawnProbe(repoRoot, opts.ignoreModules ?? new Set());
  const found: TransitiveSpawnRoute[] = [];
  for (const route of indirect) {
    const sinks = collectReachableSpawnModules(graph, route, isSpawnModule, opts.maxDepth);
    if (!sinks.size) continue;
    const via = [...sinks.values()].reduce((a, b) => (b.length < a.length ? b : a));
    found.push({ route, via, sinks });
  }
  return found;
}
