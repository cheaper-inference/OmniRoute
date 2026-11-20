#!/usr/bin/env node
// scripts/check/check-openapi-routes.mjs
//%20Gate%20anti-alucina%C3%A7%C3%A3o%20(docs):%20toda%20`path`%20documentada%20em%20docs/openapi.yaml%20|||%20/ /%20check-openapi-coverage.mjs%20(que%20measures%20a%20direct%C3%A7%C3%A3o%20inversa:%20%%20de%20rotas%20documentados).
// must resolve to an actual route.ts in src/app/api/. Takes an INVENTED/obsolete endpoint
// in the spec (the AI writes docs describing a route that doesn't exist). Complements

// Stale-enforcement (6A.3): entry in KNOWN_STALE_SPEC that does not suppress any real orphan path
// real orphan → gate fails with removal instruction (prevents a silent regression loophole).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as yaml from "js-yaml";
import { reportStaleEntries } from "./lib/allowlist.mjs";
import { apiRoot, collectApiRouteUrlPaths } from "./lib/apiRoutes.mjs";

const ROOT = process.cwd();
const OPENAPI_PATH = path.join(ROOT, "docs", "openapi.yaml");

// Spec entries without a real route, frozen for triage (gate: blocks NEW ones).
export const KNOWN_STALE_SPEC = new Set([
  // openapi.yaml documents a per-agent state, but the actual route is the GLOBAL state
  // (/api/tools/agent-bridge/state); per-agent there are only /{id}, /{id}/detect, /mappings, /dns.
]);

/** Normalizes any {param} to {} to match regardless of the parameter name. */
export function normalizeParams(p) {
  return p.replace(/\{[^}]+\}/g, "{}");
}

/** Spec paths that do not match any implemented route (param-insensitive). */
export function findSpecPathsWithoutRoute(specPaths, implPaths) {
  const impl = new Set(implPaths.map(normalizeParams));
  return specPaths.filter((p) => !impl.has(normalizeParams(p)));
}

/**
 * @param {{ root?: string, openapiPath?: string, implPaths?: string[] }} [opts]
 * @returns {{ ok: boolean, exitCode: number, message: string }}
 */
export function runOpenapiRoutesCheck(opts = {}) {
  const root = opts.root || ROOT;
  const openapiPath = opts.openapiPath || path.join(root, "docs", "openapi.yaml");
  if (!fs.existsSync(openapiPath)) {
    return {
      ok: false,
      exitCode: 1,
      message: `[openapi-routes] FAIL — openapi.yaml not found: ${openapiPath}`,
    };
  }
  if (!fs.existsSync(apiRoot(root))) {
    return {
      ok: false,
      exitCode: 1,
      message: `[openapi-routes] FAIL — API root not found: ${apiRoot(root)}`,
    };
  }

  const raw = yaml.load(fs.readFileSync(openapiPath, "utf-8"));
  const specPaths = Object.keys(raw.paths || {}).filter((p) => p.startsWith("/api"));
  const implPaths = opts.implPaths || collectApiRouteUrlPaths(root);

  const liveOrphans = findSpecPathsWithoutRoute(specPaths, implPaths);
  const stale = reportStaleEntries(KNOWN_STALE_SPEC, liveOrphans, "openapi-routes");
  const orphans = liveOrphans.filter((p) => !KNOWN_STALE_SPEC.has(p));

  const parts = [];
  if (stale.length) {
    parts.push(
      `[openapi-routes] ${stale.length} obsolete entry(ies) in the allowlist ` +
        `— the violation has been corrected; REMOVE the entry to lock the correction:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
  }
  if (orphans.length) {
    parts.push(
      `[openapi-routes] ${orphans.length} path(s) documentado(s) sem rota real:\n` +
        orphans.map((p) => "  ✗ " + p).join("\n") +
        `\n  → Create the route, correct/remove the entry in the spec, or add KNOWN_STALE_SPEC with justification.`
    );
  }
  if (parts.length) {
    return { ok: false, exitCode: 1, message: parts.join("\n") };
  }
  return {
    ok: true,
    exitCode: 0,
    message: `[openapi-routes] OK — ${specPaths.length} paths na spec, todos com rota real (${implPaths.length} rotas)`,
  };
}

function main() {
  // Keep assertNoStale side-effect path for CLI parity with other gates when
  // runOpenapiRoutesCheck is not used alone — here we print structured result.
  const result = runOpenapiRoutesCheck();
  if (result.ok) console.log(result.message);
  else console.error(result.message);
  process.exit(result.exitCode);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
