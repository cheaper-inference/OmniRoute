// Capability drift guard for the MANAGEMENT tier.
//
// With login disabled (requireLogin=false) a management route is anonymous unless the
// central route guard classifies it LOCAL_ONLY (loopback only) or ALWAYS_PROTECTED. Both
// are hand-maintained lists, and the "sensitive route missing from the list" class has
// recurred: the host-config writers, the log-export runner and /api/restart all slipped
// while their same-effect siblings were listed.
//
// This test classifies routes by what their handler can do, read from the source:
//   - writes the operator's host CLI config (guardCliConfigWrite / ensureCliConfigWriteAllowed,
//     or createMultiBackup, which snapshots the config files a handler is about to overwrite)
//   - signals or exits the server process (process.kill / process.exit)
//   - exports stored data out of the instance (runSingleLogExport / exportAll)
// Every such route must be LOCAL_ONLY or ALWAYS_PROTECTED. A new route with one of these
// capabilities fails here until it is classified, or added to EXEMPT with a reason.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The route guard pulls in DB-backed settings; never let it open the real DATA_DIR.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-capability-drift-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isAlwaysProtectedPath, isLocalOnlyPath } =
  await import("../../src/server/authz/routeGuard.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const API_DIR = path.join(process.cwd(), "src", "app", "api");

const CAPABILITIES: ReadonlyArray<{ name: string; pattern: RegExp }> = [
  {
    name: "writes host CLI config",
    pattern: /\b(guardCliConfigWrite|ensureCliConfigWriteAllowed|createMultiBackup)\(/,
  },
  { name: "signals or exits the process", pattern: /\bprocess\.(kill|exit)\(/ },
  { name: "exports stored data", pattern: /\b(runSingleLogExport|exportAll)\b/ },
];

/** Routes allowed to keep a capability on the normal tier, each with its reason. */
const EXEMPT: Readonly<Record<string, string>> = {};

function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...routeFiles(full));
    else if (entry.name === "route.ts") out.push(full);
  }
  return out;
}

/** `src/app/api/a/[id]/b/route.ts` → `/api/a/sample/b` (a concrete path the guard can match). */
function toRequestPath(file: string): string {
  const rel = path.relative(path.join(process.cwd(), "src", "app"), path.dirname(file));
  return (
    "/" +
    rel
      .split(path.sep)
      .map((s) => (/^\[.+\]$/.test(s) ? "sample" : s))
      .join("/")
  );
}

function capableRoutes(): Array<{ route: string; capabilities: string[] }> {
  const found: Array<{ route: string; capabilities: string[] }> = [];
  for (const file of routeFiles(API_DIR)) {
    const source = fs.readFileSync(file, "utf8");
    const capabilities = CAPABILITIES.filter((c) => c.pattern.test(source)).map((c) => c.name);
    if (capabilities.length > 0) found.push({ route: toRequestPath(file), capabilities });
  }
  return found;
}

test("the capability scan finds the routes it is meant to police", () => {
  const routes = new Set(capableRoutes().map((r) => r.route));
  // Known members of each class; if a refactor renames the markers these disappear and
  // the scan would silently pass everything.
  for (const known of [
    "/api/shutdown",
    "/api/cli-tools/codex-profiles",
    "/api/cli-tools/letta-settings",
    "/api/db-backups/exportAll",
  ]) {
    assert.ok(routes.has(known), `capability scan no longer detects ${known}`);
  }
});

test("every route that can write host config, control the process or export data is never anonymous", () => {
  const unprotected = capableRoutes()
    .filter(({ route }) => !isLocalOnlyPath(route) && !isAlwaysProtectedPath(route))
    .filter(({ route }) => !(route in EXEMPT))
    .map(({ route, capabilities }) => `${route} (${capabilities.join(", ")})`);
  assert.deepEqual(
    unprotected,
    [],
    "classify these in src/server/authz/routeGuard.ts (LOCAL_ONLY_API_PREFIXES or " +
      "ALWAYS_PROTECTED_API_PATHS), or add them to EXEMPT with a reason:\n  " +
      unprotected.join("\n  ")
  );
});

test("EXEMPT only names routes that still have a capability", () => {
  const routes = new Set(capableRoutes().map((r) => r.route));
  for (const route of Object.keys(EXEMPT)) {
    assert.ok(routes.has(route), `stale EXEMPT entry: ${route}`);
  }
});
