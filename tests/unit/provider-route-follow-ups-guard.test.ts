// Guard for the class behind #19284 and the providers-route-managed-catalog flake: POST
// /api/providers starts work after it answers (a new connection's auto-test, its opt-in model
// auto-sync). Started untracked, that work outlives the request — and in tests, the test — calling
// fetch and writing state during the next one. The route must start it as tracked follow-ups, and
// every test that drives the route must let them settle after each test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ROUTE = "src/app/api/providers/route.ts";

function testFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return testFiles(full);
    return /\.test\.(ts|tsx|mjs|js)$/.test(entry.name) ? [full] : [];
  });
}

test("the providers route starts its post-response work as tracked follow-ups", () => {
  const source = fs.readFileSync(path.join(ROOT, ROUTE), "utf8");
  for (const call of ["testSingleConnection", "fetchModelSyncInternal"]) {
    assert.doesNotMatch(
      source,
      new RegExp(`\\bvoid\\s+${call}\\(`),
      `${ROUTE}: ${call}() must run through runConnectionFollowUp, not as a bare void promise`
    );
  }
  assert.match(source, /runConnectionFollowUp\(/);
});

test("every test that drives the providers route settles its follow-ups after each test", () => {
  const drivers = testFiles(path.join(ROOT, "tests")).filter((file) =>
    /app\/api\/providers\/route(\.ts)?["']/.test(fs.readFileSync(file, "utf8"))
  );
  assert.ok(drivers.length > 0, "expected tests that import the providers route");
  const missing = drivers
    .filter(
      (file) => !/settleConnectionFollowUpsAfterEachTest\(\)/.test(fs.readFileSync(file, "utf8"))
    )
    .map((file) => path.relative(ROOT, file));
  assert.deepEqual(
    missing,
    [],
    "call settleConnectionFollowUpsAfterEachTest() (tests/helpers/connectionFollowUps.ts) at top level"
  );
});
