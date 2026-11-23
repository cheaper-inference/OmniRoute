#!/usr/bin/env node
// scripts/check/check-route-guard-membership.ts
// Quality gate: route-guard membership (CLAUDE.md Hard Rules #15 + #17).
//
// WHY: routes that spawn child processes (`npm install`, `node`, MITM/Playwright,
// worker_threads) MUST be classified loopback-only by `isLocalOnlyPath()` in
// src/server/authz/routeGuard.ts. Loopback enforcement runs unconditionally
// BEFORE any auth check — so a leaked JWT over a tunnel cannot reach a spawn.
// A single spawn-capable `route.ts` that `isLocalOnlyPath()` does NOT match is an
// RCE-via-tunnel hole (the GHSA-fhh6-4qxv-rpqj surface the LOCAL_ONLY tier closes).
//
// This gate enumerates every `route.ts` under the spawn-capable prefixes and
// asserts each resolved URL path is classified local-only by the REAL predicate.
//
// Ratchet: any pre-existing unclassified route is frozen in KNOWN_UNCLASSIFIED
// with a justification so the gate exits 0 today; only NEW spawn-capable routes
// that slip past the guard fail. KNOWN_UNCLASSIFIED is empty today (clean
// baseline) — keep it that way; an entry here is a documented security debt.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import {
  findTransitivelySpawnCapableRoutes,
  isSpawnCapableSource,
  type TransitiveSpawnRoute,
} from "./lib/spawnImportGraph.ts";

// Inline stale-allowlist helper (mirrors scripts/check/lib/allowlist.mjs).
// The TypeScript gate cannot import the .mjs helper directly; keep this in sync.
function assertNoStaleEntries(
  allowlist: string[] | Record<string, string>,
  liveItems: string[],
  gateName: string
): void {
  const liveSet = new Set(liveItems);
  const keys = Array.isArray(allowlist) ? allowlist : Object.keys(allowlist);
  const stale = keys.filter((k) => !liveSet.has(k));
  if (stale.length > 0) {
    console.error(
      `[${gateName}] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
    process.exitCode = 1;
  }
}

// Spawn-capable route roots (relative to repo root). Mirrors the spawn-capable
// prefixes documented in routeGuard.ts (SPAWN_CAPABLE_PREFIXES) and CLAUDE.md
// Hard Rules #15/#17 for the dirs that physically exist under src/app/api/.
export const SPAWN_CAPABLE_ROUTE_ROOTS: ReadonlyArray<string> = [
  "src/app/api/services",
  "src/app/api/mcp",
  "src/app/api/cli-tools/runtime",
  "src/app/api/local", // T-12: 1-click local service launchers (Redis today) — every child here spawns podman/docker (Hard Rules #15 + #17)
  "src/app/api/skills/collect", // Skill Collector CLI detection: GET .../detect spawns a child process per CLI_TOOL_IDS entry via getCliRuntimeStatus() (Hard Rules #15 + #17, PR #6294 review)
  "src/app/api/cli-tools/forge-settings", // GET calls getCliRuntimeStatus() to detect the `forge` CLI install (Hard Rules #15 + #17, #7263)
  "src/app/api/cli-tools/jcode-settings", // GET calls getCliRuntimeStatus() to detect the `jcode` CLI install (Hard Rules #15 + #17, #7263)
  "src/app/api/cli-tools/qwen-settings", // GET calls getCliRuntimeStatus("qwen") and writes local ~/.qwen config files (Hard Rules #15 + #17)
  // GHSA-35fw-cv32-2373: the 14 cli-tools routes that reach the same spawn as the siblings
  // above via getCliRuntimeStatus() (13) or detectAllTools() -> execFile (detect).
  "src/app/api/cli-tools/all-statuses", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/claude-settings", // GET calls getCliRuntimeStatus() to detect the `claude` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/cline-settings", // GET calls getCliRuntimeStatus() to detect the `cline` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/codewhale-settings", // GET calls getCliRuntimeStatus() to detect the `codewhale` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/codex-settings", // GET calls getCliRuntimeStatus() to detect the `codex` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/crush-settings", // GET calls getCliRuntimeStatus() to detect the `crush` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/deepseek-tui-settings", // GET calls getCliRuntimeStatus() to detect the `deepseek-tui` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/detect", // GET calls detectAllTools() -> execFile(binary, --version) + execFile("which") per tool via src/lib/cli-helper/tool-detector.ts (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/droid-settings", // GET calls getCliRuntimeStatus() to detect the `droid` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/kilo-settings", // GET calls getCliRuntimeStatus() to detect the `kilo` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/openclaw-settings", // GET calls getCliRuntimeStatus() to detect the `openclaw` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/pi-settings", // GET calls getCliRuntimeStatus() to detect the `pi` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/smelt-settings", // GET calls getCliRuntimeStatus() to detect the `smelt` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/status", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  // GHSA-jx89-f37j-pq89: skills install + execute reach childProcess.spawn transitively
  // (executor.ts -> builtins.ts -> sandbox.ts) — invisible to the source-scan subcheck.
  "src/app/api/skills/install", // POST stores handlerCode verbatim; a built-in name aliases execute_command / eval_code (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  "src/app/api/skills/executions", // POST runs skillExecutor.execute() -> sandbox container spawn (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  // install / start / restart / stop reach the CLIProxyAPI download + ServiceSupervisor spawn
  // transitively, which the source-scan subcheck cannot see.
  "src/app/api/version-manager", // downloads, unpacks and runs the CLIProxyAPI binary (Hard Rules #15 + #17)
];

// Frozen pre-existing exceptions: spawn-capable routes NOT yet classified
// local-only. Each entry is a documented security debt — the route is reachable
// past the loopback gate. Empty today (every spawn-capable route is classified).
// Adding an entry here REQUIRES a justification + a follow-up to classify it in
// LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS (src/server/authz/routeGuard.ts).
export const KNOWN_UNCLASSIFIED: Record<string, string> = {};

/**
 * Map a Next.js App Router `route.ts` file path to the URL path the route
 * serves, in the exact shape `isLocalOnlyPath()` expects (a plain `/api/...`
 * path). Dynamic `[param]` segments become a concrete `_param_` placeholder —
 * `isLocalOnlyPath` matches prefixes via `startsWith`, so any non-empty segment
 * satisfies the classification (e.g. `/api/services/_name_/logs` still starts
 * with `/api/services/`).
 */
export function routeFileToApiPath(routeFile: string): string {
  return routeFile
    .replace(/\\/g, "/")
    .replace(/^src\/app/, "")
    .replace(/\/route\.ts$/, "")
    .replace(/\[([^\]]+)\]/g, "_$1_");
}

/**
 * Pure matching core: given resolved URL paths, a classifier predicate, and an
 * allowlist, return the paths that are NEITHER classified local-only NOR
 * allowlisted (input order preserved). These are the RCE-via-tunnel holes.
 */
export function findUnclassifiedSpawnRoutes(
  apiPaths: string[],
  isLocalOnly: (path: string) => boolean,
  allowlist: Record<string, string>
): string[] {
  return apiPaths.filter((p) => !isLocalOnly(p) && !(p in allowlist));
}

// --- 6A.8: source-based spawn detection (G-09: plus the import-graph walk) ---
// Detection lives in ./lib/spawnImportGraph.ts (pure fs + regex, fixture-testable).
// `isSpawnCapableSource` ignores comments and member calls such as `regex.exec(`.
export { isSpawnCapableSource };

/**
 * Walk all route.ts files under src/app/api/ from repoRoot and return those whose
 * source matches isSpawnCapableSource. Returns relative paths (forward slashes).
 */
export function findSpawnCapableRoutes(repoRoot: string): string[] {
  const apiDir = join(repoRoot, "src", "app", "api");
  const out: string[] = [];

  function walk(dir: string): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        if (statSync(full).isDirectory()) {
          walk(full);
        } else if (entry === "route.ts") {
          const src = readFileSync(full, "utf8");
          if (isSpawnCapableSource(src)) {
            out.push(relative(repoRoot, full).replace(/\\/g, "/"));
          }
        }
      } catch {
        // skip unreadable
      }
    }
  }

  walk(apiDir);
  return out.sort();
}

/**
 * 6A.8: pre-existing spawn-capable route.ts files that live OUTSIDE
 * SPAWN_CAPABLE_ROUTE_ROOTS but are NOT yet classified local-only.
 * Each entry is documented security debt (Hard Rules #15/#17):
 * the route can spawn child processes and is reachable past the loopback gate.
 *
 * TODO(6A.8): classify these in LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS
 * or add specific auth-only enforcement (no loopback, but require-auth before spawn).
 * Adding an entry here requires a justification + follow-up issue.
 */
export const KNOWN_UNCLASSIFIED_SOURCE_SPAWN: Record<string, string> = {
  // S-01 (audit #15159, 2026-09-30): NOT unclassified security debt — the spawn IS
  // classified, just not at the path level, so this freeze records a deliberate
  // design decision rather than an open gap.
  //
  // `src/app/api/providers/[id]/models/route.ts` transitively spawns via
  // fetchCursorAgentModels() -> runCursorAgent() -> spawn() at
  // src/lib/providerModels/cursorAgent.ts:17, but ONLY on the `provider === "cursor"`
  // branch. `{id}` is a CONNECTION id, never a provider name, so NO path pattern can
  // separate the Cursor spawn from the ~50 other providers' pure-HTTP discovery in
  // this same route. Gating `/api/providers/[^/]+/models` as a LOCAL_ONLY pattern
  // would lock remote model discovery for every non-Cursor provider — precisely the
  // over-broadening the `/api/providers/[^/]+/login` precedent exists to avoid.
  //
  // Enforced instead at the spawn call site: the route requires
  // `x-omniroute-peer-locality === "loopback"` (stamped by the authz pipeline from the
  // real TCP peer, never the spoofable Host header) before calling
  // fetchCursorAgentModels(), and fails closed to the cached/local catalog otherwise —
  // the same pattern as handleCursorAgentImageGeneration in
  // open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts.
  // Regression guard: tests/unit/authz/route-guard-providers-spawn-local-only.test.ts
  // (asserts the guard exists, precedes the spawn, and fails closed).
  //
  // G-09 (same audit, #15965): the route's own code has no spawn — the old token
  // regex only "saw" it through the prose `-> spawn()` in a comment of route.ts.
  // Detection now ignores comments, and the import-graph walk (main() subcheck 3)
  // reaches src/lib/providerModels/cursorAgent.ts from this route, so this entry
  // stays live on the TRANSITIVE finding. The freeze itself stays on its S-01
  // merits (provider-conditional spawn, call-site loopback gate, fail-closed).
  "src/app/api/providers/[id]/models/route.ts":
    'S-01 #15159: cursor-agent spawn is provider-conditional (provider === "cursor") and `{id}` is a connection id, ' +
    "so it cannot be path-classified without locking every other provider's remote model discovery. " +
    "Gated at the call site on the trusted x-omniroute-peer-locality loopback stamp instead (fail-closed). " +
    "G-09 #15965: detected through the import graph (route -> src/lib/providerModels/cursorAgent.ts), not a comment match.",
  // RESOLVED (6A.8 P1, 2026-06-13): /api/system/version and /api/db-backups/exportAll
  // are now classified in LOCAL_ONLY_API_PREFIXES (loopback-enforced before auth).
  // The stale-enforcement guard requires this set to stay empty until a NEW
  // unclassified spawn-capable route appears.
  // NOTE: cli-tools/antigravity-mitm/route.ts triggers child_process INDIRECTLY via
  // dynamic import to @/mitm/manager.runtime, but does NOT directly import child_process.
  // The source-scan gate covers DIRECT imports/calls only; this route is NOT in the
  // spawn-capable set by source analysis. Kept as a comment for documentation but
  // NOT in the allowlist (stale-enforcement would flag it). The route has requireCliToolsAuth()
  // for auth gating; the underlying spawn happens in mitm/manager.runtime.
  // If /api/cli-tools/ is ever added to LOCAL_ONLY_API_PREFIXES, revisit this note.
};

// --- G-09 (#15159, #15965): transitive spawn detection through the import graph ---
//
// Subcheck 3 walks the runtime import graph of every route.ts that has NO direct
// process import (bounded to DEFAULT_IMPORT_WALK_DEPTH hops) and lists every
// spawn-capable module it reaches. A route that is neither under a
// SPAWN_CAPABLE_ROUTE_ROOT, classified local-only, nor frozen in
// KNOWN_UNCLASSIFIED_SOURCE_SPAWN fails the gate when it reaches a spawn module
// that is in NEITHER list below. Import reachability over-approximates the call
// graph (importing a module is not calling its spawn), which is why the baseline is
// frozen per SINK module instead of per route: a NEW spawn module that becomes
// reachable from an unclassified route goes red; re-wiring existing ones does not.

/**
 * Spawn-capable modules that are NOT a request-driven spawn surface: fixed
 * argv / in-repo worker scripts started for process plumbing. The walk follows
 * their imports but reaching one does not make a route spawn-capable.
 * Stale-enforced: an entry that no longer loads a process API must be removed.
 */
export const TRANSITIVE_SPAWN_INFRA_MODULES: Record<string, string> = {
  "src/lib/db/adapters/driverFactory.ts":
    "spawnSync(process.execPath, ['-e', require('better-sqlite3')]) native-driver probe when the DB opens; fixed argv.",
  "src/lib/db/healthCheckRunner.ts":
    "fork()s the in-repo src/lib/db/healthCheckWorker for the DB health check; fixed script.",
  "src/shared/utils/machineId.ts":
    "execFileSync of fixed OS commands to read the machine id; no request input.",
  "open-sse/utils/kimiDevice.ts":
    "execFileSync('/usr/bin/sw_vers', ['-productVersion']) for the device fingerprint; fixed argv.",
  "open-sse/utils/setupPolyfill.ts":
    "imports worker_threads only to polyfill markAsUncloneable; starts no worker.",
  "src/lib/usage/callLogArtifactWriter.ts":
    "worker_threads Worker running the in-repo call-log artifact writer; fixed script.",
  "open-sse/services/compression/compressionWorkerPool.ts":
    "worker_threads pool for the in-repo compression worker; fixed script.",
  "open-sse/services/compression/engines/llmlingua/worker.ts":
    "worker_threads Worker for the in-repo LLMLingua ONNX worker; fixed script.",
};

const G09_BASELINE =
  "G-09 baseline 2026-10-18 (#15965): pre-existing spawn module already reachable through the import graph " +
  "from at least one unclassified route when the walk landed; review/classify under #15159";

/**
 * Frozen G-09 baseline: request-reachable spawn modules ALREADY reached from an
 * unclassified route when the walk landed. Documented security-review debt, not
 * an approval. Stale-enforced: when no unclassified route reaches a sink any
 * more, its entry must be removed. Adding an entry requires a justification.
 */
export const KNOWN_TRANSITIVE_SPAWN_SINKS: Record<string, string> = {
  "open-sse/executors/auggie.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/executors/chatgpt-web-codex/tunnelClient.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/executors/devin-cli-agentic.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/executors/devin-cli.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/executors/zcodeProtocol.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/lib/deepseek-pow.ts": `${G09_BASELINE} (worker_threads)`,
  "open-sse/services/adobeFireflyBrowserLogin.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/services/obscura.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/services/qoderCliAcp.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/services/qoderCliSpawn.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/services/virtualDisplay.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/launcher-helper-client.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/vendor/codex-chatgpt-web/browser-login.ts": `${G09_BASELINE} (child_process)`,
  "open-sse/vendor/codex-chatgpt-web/process.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/cursor/tokenExtractor.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/guardrails/videoBridgeRuntime.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/headroom/detect.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/headroom/process.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/logExport/childRunner.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/plugins/loader.ts": `${G09_BASELINE} (child_process + worker_threads)`,
  "src/lib/providerModels/cursorAgent.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/providers/validation/webProvidersB.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/proxySubscription/coreConfig/apply.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/proxySubscription/coreConfig/reload.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/skills/containerProvider.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/skills/sandbox.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/tailscaleTunnel.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/versionManager/binaryManager.ts": `${G09_BASELINE} (child_process)`,
  "src/lib/vncSession/service.ts": `${G09_BASELINE} (child_process)`,
  "src/mitm/cert/install.ts": `${G09_BASELINE} (child_process)`,
  "src/mitm/dns/dnsConfig.ts": `${G09_BASELINE} (child_process)`,
  "src/mitm/inspector/systemProxyConfig.ts": `${G09_BASELINE} (child_process)`,
  "src/mitm/manager.ts": `${G09_BASELINE} (child_process)`,
  "src/mitm/systemCommands.ts": `${G09_BASELINE} (child_process)`,
  "src/shared/services/cliRuntime.ts": `${G09_BASELINE} (child_process)`,
  "src/shared/services/cliRuntimeNpmPrefix.ts": `${G09_BASELINE} (child_process)`,
  "src/shared/services/loginShellPath.ts": `${G09_BASELINE} (child_process)`,
};

/** Recursively collect every `route.ts` under `dir` (returns [] if dir absent). */
function collectRouteFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return []; // dir does not exist — nothing to enumerate
  }
  const out: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectRouteFiles(full));
    } else if (entry === "route.ts") {
      out.push(full);
    }
  }
  return out;
}

export interface TransitiveSpawnGap {
  route: string;
  /** Unfrozen spawn module -> shortest chain from the route. */
  sinks: Map<string, string[]>;
}

/**
 * Pure core of subcheck 3. `found` comes from findTransitivelySpawnCapableRoutes
 * (infra modules already ignored). Returns the routes that reach an unfrozen
 * spawn module while not covered (`isCovered` = spawn root / local-only /
 * KNOWN_UNCLASSIFIED_SOURCE_SPAWN), plus the frozen sinks still in use (for the
 * stale check).
 */
export function evaluateTransitiveSpawnRoutes(
  found: TransitiveSpawnRoute[],
  isCovered: (route: string) => boolean,
  frozenSinks: Record<string, string>
): { gaps: TransitiveSpawnGap[]; usedFrozenSinks: string[] } {
  const gaps: TransitiveSpawnGap[] = [];
  const used = new Set<string>();
  for (const { route, sinks } of found) {
    if (isCovered(route)) continue;
    const unfrozen = new Map<string, string[]>();
    for (const [sink, via] of sinks) {
      if (sink in frozenSinks) used.add(sink);
      else unfrozen.set(sink, via);
    }
    if (unfrozen.size) gaps.push({ route, sinks: unfrozen });
  }
  return { gaps, usedFrozenSinks: [...used].sort() };
}

/** Infra entries must still load a process API, else they are stale. */
function liveInfraModules(repoRoot: string): string[] {
  return Object.keys(TRANSITIVE_SPAWN_INFRA_MODULES).filter((rel) => {
    try {
      return isSpawnCapableSource(readFileSync(join(repoRoot, rel), "utf8"));
    } catch {
      return false;
    }
  });
}

function formatTransitiveGaps(gaps: TransitiveSpawnGap[]): string {
  return gaps
    .map(({ route, sinks }) =>
      [...sinks.values()]
        .map((via) => `  ✗ ${route} (${routeFileToApiPath(route)})\n      via ${via.join(" -> ")}`)
        .join("\n")
    )
    .join("\n");
}

async function main(): Promise<void> {
  if (!process.env.DATA_DIR?.trim()) delete process.env.DATA_DIR;
  if (process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR !== "1") {
    await import("../../tests/_setup/isolateDataDir.ts");
  }
  const { isLocalOnlyPath } = await import("@/server/authz/routeGuard.ts");
  const cwd = process.cwd();

  // --- Subcheck 1 (original): SPAWN_CAPABLE_ROUTE_ROOTS ---
  const apiPaths = SPAWN_CAPABLE_ROUTE_ROOTS.flatMap(collectRouteFiles)
    .map(routeFileToApiPath)
    .sort();

  const unclassified = findUnclassifiedSpawnRoutes(apiPaths, isLocalOnlyPath, KNOWN_UNCLASSIFIED);

  // --- Subcheck 2 (6A.8): source-based scan — ALL route.ts files ---
  // Find every route.ts that imports child_process / worker_threads and verify it is
  // either classified local-only or frozen in KNOWN_UNCLASSIFIED_SOURCE_SPAWN.
  const spawnCapableFiles = findSpawnCapableRoutes(cwd);

  // --- Subcheck 3 (G-09): transitive spawn through the import graph ---
  const transitive = findTransitivelySpawnCapableRoutes({
    repoRoot: cwd,
    ignoreModules: new Set(Object.keys(TRANSITIVE_SPAWN_INFRA_MODULES)),
  });
  const inSpawnRoot = (rel: string) =>
    SPAWN_CAPABLE_ROUTE_ROOTS.some((root) => rel.startsWith(root + "/"));
  const { gaps: transitiveGaps, usedFrozenSinks } = evaluateTransitiveSpawnRoutes(
    transitive,
    (rel) =>
      inSpawnRoot(rel) ||
      rel in KNOWN_UNCLASSIFIED_SOURCE_SPAWN ||
      isLocalOnlyPath(routeFileToApiPath(rel)),
    KNOWN_TRANSITIVE_SPAWN_SINKS
  );

  // Stale-enforcement: if a route was fixed (no longer spawn-capable, directly OR
  // through its import graph), the KNOWN_UNCLASSIFIED_SOURCE_SPAWN entry must go.
  assertNoStaleEntries(
    KNOWN_UNCLASSIFIED_SOURCE_SPAWN,
    [...spawnCapableFiles, ...transitive.map((t) => t.route)],
    "route-guard-membership/source-spawn"
  );
  assertNoStaleEntries(
    KNOWN_TRANSITIVE_SPAWN_SINKS,
    usedFrozenSinks,
    "route-guard-membership/transitive-spawn-sinks"
  );
  assertNoStaleEntries(
    TRANSITIVE_SPAWN_INFRA_MODULES,
    liveInfraModules(cwd),
    "route-guard-membership/transitive-spawn-infra"
  );

  // Find spawn-capable routes outside SPAWN_CAPABLE_ROUTE_ROOTS that are not classified
  // local-only and not in the source-spawn allowlist.
  const unclassifiedSourceSpawn = spawnCapableFiles.filter((rel) => {
    const apiPath = routeFileToApiPath(rel);
    // Already covered by subcheck 1 (in a SPAWN_CAPABLE_ROUTE_ROOT)? Skip.
    if (SPAWN_CAPABLE_ROUTE_ROOTS.some((root) => rel.startsWith(root + "/"))) return false;
    // In the source-spawn allowlist? Skip.
    if (rel in KNOWN_UNCLASSIFIED_SOURCE_SPAWN) return false;
    // Classified local-only? Skip.
    if (isLocalOnlyPath(apiPath)) return false;
    return true;
  });

  // Report
  let failed = false;

  if (unclassified.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${unclassified.length} spawn-capable route(s) in SPAWN_CAPABLE_ROUTE_ROOTS NOT classified local-only (RCE-via-tunnel risk, Hard Rules #15/#17):\n` +
        unclassified.map((p) => `  ✗ ${p}`).join("\n") +
        `\n  → add a matching prefix to LOCAL_ONLY_API_PREFIXES or a pattern to LOCAL_ONLY_API_PATTERNS in src/server/authz/routeGuard.ts, or freeze in KNOWN_UNCLASSIFIED with justification.`
    );
    failed = true;
  }

  if (unclassifiedSourceSpawn.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${unclassifiedSourceSpawn.length} route.ts file(s) contain child_process/worker_threads but are NOT classified local-only (Hard Rules #15/#17):\n` +
        unclassifiedSourceSpawn.map((p) => `  ✗ ${p} (${routeFileToApiPath(p)})`).join("\n") +
        `\n  → classify in LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS, or freeze in KNOWN_UNCLASSIFIED_SOURCE_SPAWN with justification.`
    );
    failed = true;
  }

  if (transitiveGaps.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${transitiveGaps.length} route.ts file(s) reach a NEW spawn-capable module through their import graph but are NOT classified local-only (Hard Rules #15/#17, G-09):\n` +
        formatTransitiveGaps(transitiveGaps) +
        `\n  → classify the route in LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS, gate the spawn at its call site, or (fixed-argv process plumbing only) list the module in TRANSITIVE_SPAWN_INFRA_MODULES with justification.`
    );
    failed = true;
  }

  if (failed) process.exit(1);
  if (process.exitCode === 1) return; // stale entries already logged

  console.log(
    `[route-guard-membership] OK — ` +
      `${apiPaths.length} route(s) in ${SPAWN_CAPABLE_ROUTE_ROOTS.length} root(s) all local-only; ` +
      `${spawnCapableFiles.length} source-spawn route(s) scanned, ` +
      `${transitive.length} transitive-spawn route(s) walked ` +
      `(${Object.keys(KNOWN_TRANSITIVE_SPAWN_SINKS).length} frozen sink module(s)), ` +
      `${Object.keys(KNOWN_UNCLASSIFIED_SOURCE_SPAWN).length} frozen as security debt, ` +
      `0 new gaps`
  );
  // Explicit exit: importing routeGuard.ts pulls in runtime settings, which opens
  // the SQLite DB and starts a background health-check timer that would otherwise
  // keep the process alive. The gate's work is done — exit cleanly.
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(
      `[route-guard-membership] fatal error: ${err instanceof Error ? err.message : String(err)}`
    );
    process.exit(1);
  });
}
