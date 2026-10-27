// Regression guard for audit #15159 — G-09 (PR #15965).
//
// The route-guard gate used to detect spawn capability by regex-matching ONE
// route.ts at a time, so it could not see
// `route.ts -> fetchCursorAgentModels() -> runCursorAgent() -> spawn()`, and its
// token regex matched prose in comments and `RegExp#exec` calls. These tests run
// the real detection code against FIXTURE trees only (never the live repo), so a
// refactor elsewhere in the codebase cannot flip them; the live-repo check is the
// gate itself (`npm run check:route-guard-membership`).
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildImportGraph,
  findTransitivelySpawnCapableRoutes,
  isSpawnCapableSource,
  reachesSpawnCapableModule,
  resolveImportSpecifiers,
  resolveImportToRepoFile,
} from "../../scripts/check/lib/spawnImportGraph.ts";
import {
  evaluateTransitiveSpawnRoutes,
  isSpawnCapableSource as gateIsSpawnCapableSource,
  KNOWN_TRANSITIVE_SPAWN_SINKS,
  KNOWN_UNCLASSIFIED_SOURCE_SPAWN,
  TRANSITIVE_SPAWN_INFRA_MODULES,
} from "../../scripts/check/check-route-guard-membership.ts";

const fixtureRoots: string[] = [];
after(() => {
  for (const root of fixtureRoots) fs.rmSync(root, { recursive: true, force: true });
});

/** Create a throwaway repo tree from `{ relPath: source }`. */
function fixture(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "g09-"));
  fixtureRoots.push(root);
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), body, "utf8");
  }
  return root;
}

const SPAWN_MODULE =
  'import { spawn } from "node:child_process";\nexport const run = () => spawn("x", []);\n';

// --- direct detection: the regex defects ---

test("G-09: process-API imports are detected in every runtime form", () => {
  for (const src of [
    'import { spawn } from "child_process";',
    'import { execFile } from "node:child_process";',
    'import * as cp from "node:child_process";',
    'import { Worker } from "node:worker_threads";',
    'const cp = require("child_process");',
    'const cp = await import("node:child_process");',
    'export { spawn } from "node:child_process";',
    'import {\n  spawn,\n  type ChildProcess,\n} from "node:child_process";',
  ]) {
    assert.equal(isSpawnCapableSource(src), true, src);
  }
});

test("G-09: comments, RegExp#exec, regex literals, method signatures and type imports are NOT spawns", () => {
  for (const src of [
    "// fetchCursorAgentModels() -> runCursorAgent() -> spawn() at cursorAgent.ts:17\nexport const a = 1;",
    "/* uses exec(cmd) under the hood */\nexport const a = 1;",
    "const version = /\\bversion\\s+(\\S+)/i.exec(output)?.[1];",
    'const RULES = [{ regex: /exec\\s*\\(base64/i, description: "exec(base64)" }];',
    "interface Db {\n  exec(sql: string): void;\n}",
    'import type { ChildProcess } from "node:child_process";',
    '// import { spawn } from "node:child_process";\nexport const a = 1;',
  ]) {
    assert.equal(isSpawnCapableSource(src), false, src);
  }
});

test("G-09: the gate's route-level scan uses the same comment-blind detection", () => {
  // The frozen providers/[id]/models route was only ever "detected" through the
  // prose `-> spawn()` in one of its comments.
  const route =
    'import { fetchCursorAgentModels } from "@/lib/providerModels/cursorAgent";\n' +
    "// -> runCursorAgent() -> spawn() at src/lib/providerModels/cursorAgent.ts:17\n" +
    "export async function GET() { return Response.json(await fetchCursorAgentModels()); }\n";
  assert.equal(gateIsSpawnCapableSource(route), false);
});

// --- import extraction and resolution ---

test("G-09: extracts runtime specifiers (static, side-effect, re-export, require, dynamic) and skips type-only", () => {
  const specs = resolveImportSpecifiers(
    [
      'import { x } from "@/lib/providerModels/cursorAgent";',
      'import "./sideEffect";',
      'export { y } from "../shared/thing";',
      'export * from "@omniroute/open-sse/utils/z";',
      'const r = require("./required");',
      'const d = await import("@/mitm/manager.runtime");',
      'import type { T } from "@/types/only";',
      'export type { U } from "@/types/alsoOnly";',
      '// import { gone } from "@/commented/out";',
    ].join("\n")
  );
  for (const expected of [
    "@/lib/providerModels/cursorAgent",
    "./sideEffect",
    "../shared/thing",
    "@omniroute/open-sse/utils/z",
    "./required",
    "@/mitm/manager.runtime",
  ]) {
    assert.ok(specs.includes(expected), `missing ${expected} in ${JSON.stringify(specs)}`);
  }
  for (const absent of ["@/types/only", "@/types/alsoOnly", "@/commented/out"]) {
    assert.ok(!specs.includes(absent), `${absent} must not be a runtime edge`);
  }
});

test("G-09: resolves @/, @omniroute/open-sse, relative, ESM .js->.ts and index files; never a JSON file", () => {
  const root = fixture({
    "src/lib/a.ts": "export const a = 1;",
    "open-sse/utils/b.ts": "export const b = 1;",
    "open-sse/index.ts": "export const c = 1;",
    "src/app/api/x/neighbor.ts": "export const n = 1;",
    "package.json": '{ "scripts": { "x": "exec(rm)" } }',
  });
  const importer = "src/app/api/x/route.ts";
  assert.equal(resolveImportToRepoFile("@/lib/a", importer, root), "src/lib/a.ts");
  assert.equal(resolveImportToRepoFile("@/lib/a.js", importer, root), "src/lib/a.ts");
  assert.equal(
    resolveImportToRepoFile("@omniroute/open-sse/utils/b.ts", importer, root),
    "open-sse/utils/b.ts"
  );
  assert.equal(resolveImportToRepoFile("@omniroute/open-sse", importer, root), "open-sse/index.ts");
  assert.equal(resolveImportToRepoFile("./neighbor", importer, root), "src/app/api/x/neighbor.ts");
  assert.equal(resolveImportToRepoFile("../../../../package.json", importer, root), null);
  assert.equal(resolveImportToRepoFile("../../../../../outside", importer, root), null);
  assert.equal(resolveImportToRepoFile("node:fs", importer, root), null);
});

// --- the G-09 blind spot: transitive spawn ---

test("G-09: a route with NO direct spawn is detected through its import graph", () => {
  const routeBody =
    'import { fetchCursorAgentModels } from "@/lib/providerModels/discovery";\n' +
    "export async function GET() { return Response.json(await fetchCursorAgentModels()); }\n";
  const root = fixture({
    "src/app/api/providers/[id]/models/route.ts": routeBody,
    "src/lib/providerModels/discovery.ts":
      'export { fetchCursorAgentModels } from "./cursorAgent";\n',
    "src/lib/providerModels/cursorAgent.ts": SPAWN_MODULE,
    "src/app/api/health/route.ts": "export async function GET() { return Response.json({}); }\n",
    "src/app/api/direct/route.ts": SPAWN_MODULE,
  });
  assert.equal(isSpawnCapableSource(routeBody), false, "precondition: no direct spawn");

  const found = findTransitivelySpawnCapableRoutes({ repoRoot: root });
  assert.deepEqual(
    found.map((f) => f.route),
    ["src/app/api/providers/[id]/models/route.ts"],
    "only the indirect route: the plain route reaches nothing, the direct one is the source scan's job"
  );
  assert.deepEqual(found[0].via, [
    "src/app/api/providers/[id]/models/route.ts",
    "src/lib/providerModels/discovery.ts",
    "src/lib/providerModels/cursorAgent.ts",
  ]);
});

test("G-09: a frozen sink does not mask a NEW sink behind or beside it", () => {
  const root = fixture({
    "src/app/api/feature/route.ts": 'import { a } from "@/lib/frozen";\nexport const GET = a;\n',
    "src/lib/frozen.ts":
      'import { spawn } from "node:child_process";\nimport { b } from "./deeper";\nexport const a = () => [spawn, b];\n',
    "src/lib/deeper.ts": 'import { b } from "./newSink";\nexport { b };\n',
    "src/lib/newSink.ts":
      'import { execFile } from "node:child_process";\nexport const b = execFile;\n',
  });
  const found = findTransitivelySpawnCapableRoutes({ repoRoot: root });
  assert.deepEqual([...found[0].sinks.keys()].sort(), ["src/lib/frozen.ts", "src/lib/newSink.ts"]);

  const frozen = { "src/lib/frozen.ts": "baseline" };
  const notCovered = () => false;
  const { gaps, usedFrozenSinks } = evaluateTransitiveSpawnRoutes(found, notCovered, frozen);
  assert.deepEqual(usedFrozenSinks, ["src/lib/frozen.ts"]);
  assert.equal(gaps.length, 1);
  assert.deepEqual([...gaps[0].sinks.keys()], ["src/lib/newSink.ts"]);
  assert.deepEqual(gaps[0].sinks.get("src/lib/newSink.ts"), [
    "src/app/api/feature/route.ts",
    "src/lib/frozen.ts",
    "src/lib/deeper.ts",
    "src/lib/newSink.ts",
  ]);

  // Freezing the second sink too, or classifying the route, clears the gap.
  const both = { ...frozen, "src/lib/newSink.ts": "baseline" };
  assert.equal(evaluateTransitiveSpawnRoutes(found, notCovered, both).gaps.length, 0);
  const covered = evaluateTransitiveSpawnRoutes(found, () => true, frozen);
  assert.equal(covered.gaps.length, 0);
  assert.deepEqual(covered.usedFrozenSinks, [], "a covered route keeps no frozen sink alive");
});

test("G-09: infra modules are traversed but never count as a spawn", () => {
  const root = fixture({
    "src/app/api/db/route.ts": 'import { db } from "@/lib/db/core";\nexport const GET = db;\n',
    "src/lib/db/core.ts": 'import { probe } from "./driverFactory";\nexport const db = probe;\n',
    "src/lib/db/driverFactory.ts":
      'import { spawnSync } from "node:child_process";\nimport { more } from "./backup";\nexport const probe = () => [spawnSync, more];\n',
    "src/lib/db/backup.ts":
      'import { fork } from "node:child_process";\nexport const more = fork;\n',
  });
  const ignoreModules = new Set(["src/lib/db/driverFactory.ts"]);
  const found = findTransitivelySpawnCapableRoutes({ repoRoot: root, ignoreModules });
  assert.equal(found.length, 1);
  assert.deepEqual([...found[0].sinks.keys()], ["src/lib/db/backup.ts"]);

  const allInfra = new Set([...ignoreModules, "src/lib/db/backup.ts"]);
  assert.deepEqual(
    findTransitivelySpawnCapableRoutes({ repoRoot: root, ignoreModules: allInfra }),
    []
  );
});

test("G-09: an import cycle terminates and maxDepth bounds the walk", () => {
  const cyc = fixture({
    "src/app/api/route.ts": 'import { b } from "@/lib/b";\nexport const a = b;\n',
    "src/lib/b.ts": 'import { a } from "@/app/api/route";\nexport const b = a;\n',
  });
  const cycGraph = buildImportGraph({ repoRoot: cyc, entryFiles: ["src/app/api/route.ts"] });
  assert.equal(reachesSpawnCapableModule(cycGraph, cyc, "src/app/api/route.ts").reachable, false);

  const files: Record<string, string> = {
    "src/app/api/route.ts": 'import { l1 } from "@/lib/l1";\n',
  };
  for (let i = 1; i < 6; i++)
    files[`src/lib/l${i}.ts`] = `import { l${i + 1} } from "./l${i + 1}";\n`;
  files["src/lib/l6.ts"] = SPAWN_MODULE;
  const deep = fixture(files);
  const graph = buildImportGraph({
    repoRoot: deep,
    entryFiles: ["src/app/api/route.ts"],
    maxDepth: 8,
  });
  assert.equal(
    reachesSpawnCapableModule(graph, deep, "src/app/api/route.ts", { maxDepth: 8 }).reachable,
    true
  );
  assert.equal(
    reachesSpawnCapableModule(graph, deep, "src/app/api/route.ts", { maxDepth: 3 }).reachable,
    false,
    "maxDepth must actually bound the walk"
  );
});

// --- allowlist hygiene (static data, not a live-repo ratchet) ---

test("G-09: every infra/frozen-sink entry is a code path with a justification and the lists are disjoint", () => {
  for (const [name, list] of Object.entries({
    TRANSITIVE_SPAWN_INFRA_MODULES,
    KNOWN_TRANSITIVE_SPAWN_SINKS,
  })) {
    for (const [rel, why] of Object.entries(list)) {
      assert.match(rel, /^(src|open-sse)\/.+\.(ts|tsx|js|mjs)$/, `${name}: ${rel}`);
      assert.ok(why.trim().length > 20, `${name}: ${rel} needs a justification`);
      assert.ok(!(rel in KNOWN_UNCLASSIFIED_SOURCE_SPAWN), `${rel} is a module, not a route`);
    }
  }
  const overlap = Object.keys(TRANSITIVE_SPAWN_INFRA_MODULES).filter(
    (rel) => rel in KNOWN_TRANSITIVE_SPAWN_SINKS
  );
  assert.deepEqual(overlap, []);
});
