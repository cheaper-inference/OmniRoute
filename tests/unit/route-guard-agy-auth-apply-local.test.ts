/**
 * POST /api/providers/agy-auth/apply-local spawns `secret-tool` through
 * detectLocalAgyTokenRaw(), so it must be LOCAL_ONLY (Hard Rules #15 + #17). Its siblings
 * only parse what the request carries, and a blanket /api/providers/agy-auth/ prefix would
 * take the modal's File/Paste and Bulk tabs away from tunnel-served dashboards.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";
import { classifyRoute } from "../../src/server/authz/classify.ts";
import {
  isSpawnCapableBypassPrefix,
  SPAWN_CAPABLE_PATTERNS,
} from "../../src/shared/constants/spawnCapablePrefixes.ts";

const ROUTE = "/api/providers/agy-auth/apply-local";

test("apply-local is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath(ROUTE), true);
  assert.equal(isLocalOnlyPath(`${ROUTE}/`), true);
  assert.equal(classifyRoute(ROUTE, "POST").routeClass, "MANAGEMENT");
});

test("apply-local is on the spawn deny-list, so no manage-scope bypass can open it", () => {
  assert.equal(
    SPAWN_CAPABLE_PATTERNS.some((re) => re.test(ROUTE)),
    true
  );
  assert.equal(isSpawnCapableBypassPrefix(ROUTE), true);
});

test("the non-spawning agy-auth siblings stay reachable through a tunnel", () => {
  for (const sibling of ["import", "import-bulk", "zip-extract"]) {
    assert.equal(isLocalOnlyPath(`/api/providers/agy-auth/${sibling}`), false, sibling);
  }
  assert.equal(isLocalOnlyPath("/api/providers/agy-auth"), false);
});

test("the OpenAPI spec marks apply-local as loopback-only", () => {
  const spec = fs.readFileSync("docs/openapi.yaml", "utf8");
  const start = spec.indexOf(`  ${ROUTE}:`);
  assert.notEqual(start, -1);
  const block = spec.slice(start, spec.indexOf("\n  /api/", start + 1));
  assert.match(block, /x-loopback-only: true/);
});
