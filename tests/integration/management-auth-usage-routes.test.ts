/**
 * Management-plane auth gates for the usage analytics routes. There is no
 * global Next.js middleware (interception is route-specific), so a bare GET
 * export is a public endpoint. `/api/usage/utilization` returns connection
 * meta including account emails; `/api/provider-stats` returns per-provider
 * call volumes, combo metrics and telemetry. Both now sit behind the same
 * requireManagementAuth gate every other management route uses (dashboard
 * session / loopback / oma token / manage-scope API key).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

function readIfExists(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf-8");
}

test("1. /api/usage/utilization requires management auth before reading params", () => {
  const content = readIfExists("src/app/api/usage/utilization/route.ts");
  assert.ok(content, "src/app/api/usage/utilization/route.ts should exist");
  assert.ok(
    content.includes('from "@/lib/api/requireManagementAuth"'),
    "utilization route should import requireManagementAuth"
  );
  assert.ok(
    content.includes("await requireManagementAuth(request)"),
    "utilization route should gate the GET handler with requireManagementAuth"
  );
  assert.ok(
    content.indexOf("await requireManagementAuth(request)") <
      content.indexOf("searchParams"),
    "the auth gate must run before any query param / DB access"
  );
});

test("2. /api/provider-stats requires management auth before DB reads", () => {
  const content = readIfExists("src/app/api/provider-stats/route.ts");
  assert.ok(content, "src/app/api/provider-stats/route.ts should exist");
  assert.ok(
    content.includes('from "@/lib/api/requireManagementAuth"'),
    "provider-stats route should import requireManagementAuth"
  );
  assert.ok(
    content.includes("await requireManagementAuth(request)"),
    "provider-stats route should gate the GET handler with requireManagementAuth"
  );
  assert.ok(
    content.indexOf("await requireManagementAuth(request)") < content.indexOf("getProviderCallStats()"),
    "the auth gate must run before the stats DB reads"
  );
});
