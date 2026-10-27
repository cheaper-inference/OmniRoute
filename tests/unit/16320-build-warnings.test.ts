/**
 * #16320 — during `next build` (page-data collection) the login route module is
 * imported with no JWT_SECRET, and its module-level `console.error` printed
 * `[SECURITY] FATAL: JWT_SECRET is not set. Login authentication is disabled.`
 * That reads like a runtime security failure. The warning must stay for the
 * runtime, and be suppressed for the build phase.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-16320-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-16320";

const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const shouldWarn = loginRoute.authRouteInternals.shouldWarnMissingJwtSecret;

const BUILD_SIGNAL_KEYS = ["NEXT_PHASE", "OMNIROUTE_BUILDING", "npm_lifecycle_event"] as const;
const saved = {
  JWT_SECRET: process.env.JWT_SECRET,
  ...Object.fromEntries(BUILD_SIGNAL_KEYS.map((key) => [key, process.env[key]])),
} as Record<string, string | undefined>;

function clearBuildSignals() {
  for (const key of BUILD_SIGNAL_KEYS) delete process.env[key];
}

test.after(() => {
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("no FATAL during the Next.js build phase when JWT_SECRET is absent (#16320)", () => {
  clearBuildSignals();
  delete process.env.JWT_SECRET;
  process.env.NEXT_PHASE = "phase-production-build";

  assert.equal(shouldWarn(), false);
});

test("OMNIROUTE_BUILDING=1 also suppresses the warning (build-worker signal)", () => {
  clearBuildSignals();
  delete process.env.JWT_SECRET;
  process.env.OMNIROUTE_BUILDING = "1";

  assert.equal(shouldWarn(), false);
});

test("the runtime warning is preserved when JWT_SECRET is missing", () => {
  clearBuildSignals();
  delete process.env.JWT_SECRET;

  assert.equal(shouldWarn(), true);
});

test("no warning when JWT_SECRET is configured at runtime", () => {
  clearBuildSignals();
  process.env.JWT_SECRET = "configured-secret";

  assert.equal(shouldWarn(), false);
});
