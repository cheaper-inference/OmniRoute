/**
 * The LOCAL_ONLY manage-scope bypass list must never be able to open a route that
 * spawns processes or executes caller-supplied code (Hard Rules #15 + #17).
 *
 * Three layers are covered here:
 *   1. the settings PATCH schema refine (BYPASS_PREFIX_NOT_ALLOWED),
 *   2. the runtime snapshot loader (`normalizeAuthzBypass` via applyRuntimeSettings)
 *      plus the hot-path predicate `isLocalOnlyBypassableByManageScope`,
 *   3. the legacy JSON import, which must not write the security-impacting keys that
 *      `PATCH /api/settings` only accepts after password re-authentication.
 *
 * The inventory test at the bottom is the drift guard: every LOCAL_ONLY prefix must be
 * either refused by the deny-list or explicitly reviewed below as bypass-eligible, so a
 * newly added LOCAL_ONLY route cannot silently become whitelistable.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-bypass-denylist-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "bypass-denylist-api-key-secret";
process.env.JWT_SECRET = "bypass-denylist-jwt-secret";

const core = await import("../../../src/lib/db/core.ts");
const { updateSettings, getSettings } = await import("../../../src/lib/db/settings.ts");
const runtimeSettings = await import("../../../src/lib/config/runtimeSettings.ts");
const {
  LOCAL_ONLY_API_PREFIXES,
  LOCAL_ONLY_API_PATTERNS,
  SPAWN_CAPABLE_PATTERNS,
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} = await import("../../../src/server/authz/routeGuard.ts");
const { updateSettingsSchema } = await import("../../../src/shared/validation/settingsSchemas.ts");
const importJsonRoute = await import("../../../src/app/api/settings/import-json/route.ts");

await updateSettings({ requireLogin: false });

test.after(() => {
  runtimeSettings.resetRuntimeSettingsStateForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Code-exec / spawn routes that were LOCAL_ONLY but missing from the deny-list. */
const CODE_EXEC_ROUTES: ReadonlyArray<{ prefix: string; sample: string }> = [
  { prefix: "/api/middleware/", sample: "/api/middleware/hooks" }, // new vm.Script
  { prefix: "/api/acp/agents", sample: "/api/acp/agents" }, // execFileSync({ shell })
  { prefix: "/api/system/version", sample: "/api/system/version" }, // git + npm install
  { prefix: "/api/db-backups/exportAll", sample: "/api/db-backups/exportAll" }, // tar
  { prefix: "/api/db/health", sample: "/api/db/health" }, // forked diagnostics
  { prefix: "/api/oauth/cursor/auto-import", sample: "/api/oauth/cursor/auto-import" },
  { prefix: "/api/cli-tools/omp-settings", sample: "/api/cli-tools/omp-settings" },
  { prefix: "/api/cli-tools/letta-settings", sample: "/api/cli-tools/letta-settings" },
  { prefix: "/api/cli-tools/grok-build-settings", sample: "/api/cli-tools/grok-build-settings" },
  { prefix: "/api/cli-tools/forge-settings", sample: "/api/cli-tools/forge-settings" },
  { prefix: "/api/cli-tools/jcode-settings", sample: "/api/cli-tools/jcode-settings" },
  { prefix: "/dashboard/providers/services/", sample: "/dashboard/providers/services/x/embed/" },
  { prefix: "/api/discovery/", sample: "/api/discovery/scan" },
  { prefix: "/api/issue-agent/", sample: "/api/issue-agent/runs" },
  // Not a spawn: reads host-local Kiro credential files (kiro-cli SQLite, ~/.aws/sso/cache).
  // Held to the same never-bypassable bar so a manage-scoped key cannot read them remotely.
  { prefix: "/api/oauth/kiro/auto-import", sample: "/api/oauth/kiro/auto-import" },
];

function schemaRejectsBypassPrefix(prefix: string): boolean {
  const validation = updateSettingsSchema.safeParse({
    localOnlyManageScopeBypassEnabled: true,
    localOnlyManageScopeBypassPrefixes: [prefix],
  });
  return (
    !validation.success &&
    validation.error.issues.some((issue) => issue.message.includes("BYPASS_PREFIX_NOT_ALLOWED"))
  );
}

async function applyBypass(prefixes: string[]) {
  await runtimeSettings.applyRuntimeSettings(
    { localOnlyManageScopeBypassEnabled: true, localOnlyManageScopeBypassPrefixes: prefixes },
    { force: true }
  );
}

// ─── Layer 1: settings PATCH schema ───────────────────────────────────────────

for (const { prefix, sample } of CODE_EXEC_ROUTES) {
  test(`schema refuses ${prefix} in the manage-scope bypass list`, () => {
    assert.equal(isLocalOnlyPath(sample), true, `${sample} must be LOCAL_ONLY`);
    assert.equal(schemaRejectsBypassPrefix(prefix), true);
  });
}

/**
 * Spawn-capable routes that are deliberately NOT path-gated: #16366 (#15159 S-01) moved the
 * devin validator spawn to a call-site gate on the trusted peer-locality header so
 * reverse-proxied dashboards can validate keys again. They stay on the manage-scope
 * deny-list regardless — a future path-level re-classification must never make them
 * whitelistable — but `isLocalOnlyPath()` is false for them by design.
 */
const CALL_SITE_GATED_SPAWN_ROUTES: ReadonlyArray<{ prefix: string; sample: string }> = [
  { prefix: "/api/providers/validate", sample: "/api/providers/validate" },
  { prefix: "/api/providers/import", sample: "/api/providers/import" },
  { prefix: "/api/providers/bulk", sample: "/api/providers/bulk" },
];

for (const { prefix, sample } of CALL_SITE_GATED_SPAWN_ROUTES) {
  test(`schema still refuses call-site-gated ${prefix} in the manage-scope bypass list`, () => {
    assert.equal(
      isLocalOnlyPath(sample),
      false,
      `${sample} is remote-reachable by design (#16366); the spawn is gated at its call site`
    );
    assert.equal(schemaRejectsBypassPrefix(prefix), true);
  });
}

test("schema refuses a parent prefix that would cover a spawn-capable route", () => {
  for (const parent of [
    "/api/",
    "/api/cli-tools/",
    "/api/acp/",
    "/api/middleware",
    "/api/oauth/kiro/",
    "/",
  ]) {
    assert.equal(schemaRejectsBypassPrefix(parent), true, parent);
  }
});

test("schema still accepts non-spawn bypass prefixes", () => {
  for (const prefix of ["/api/mcp/", "/api/mcp/v2/", "/api/resilience/connections"]) {
    assert.equal(schemaRejectsBypassPrefix(prefix), false, prefix);
  }
});

// ─── Layer 2: runtime snapshot + hot-path predicate ──────────────────────────

test("runtime snapshot drops spawn-capable prefixes coming from a malformed settings row", async () => {
  await applyBypass([
    "/api/mcp/",
    "/api/middleware/",
    "/api/acp/agents",
    "/api/cli-tools/runtime/",
    "/api/providers/validate",
    "/api/resilience/connections",
  ]);
  assert.deepEqual(runtimeSettings.getAuthzBypassSnapshot().prefixes, [
    "/api/mcp/",
    "/api/resilience/connections",
  ]);
});

for (const { prefix, sample } of CODE_EXEC_ROUTES) {
  test(`runtime predicate never lets manage scope reach ${sample}`, async () => {
    await applyBypass([prefix, "/api/resilience/connections"]);
    // Control: the bypass itself is live, so the refusal below is the deny-list's doing.
    assert.equal(isLocalOnlyBypassableByManageScope("/api/resilience/connections"), true);
    assert.equal(isLocalOnlyBypassableByManageScope(sample), false);
  });
}

// ─── Layer 3: legacy JSON import ─────────────────────────────────────────────

test("import-json does not write the password-gated security settings", async () => {
  const before = await getSettings();
  const response = await importJsonRoute.POST(
    new Request("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        settings: {
          localOnlyManageScopeBypassEnabled: true,
          localOnlyManageScopeBypassPrefixes: ["/api/middleware/", "/api/copilot/"],
          requireLogin: true,
          password: "imported-hash",
          oidcEnabled: true,
          oidcDisablePasswordLogin: true,
          oidcClientSecret: "imported-secret",
          newPassword: "imported-new-password",
          showQuickStartOnHome: false,
        },
      }),
    })
  );
  assert.equal(response.status, 200);

  const after = await getSettings();
  assert.deepEqual(
    after.localOnlyManageScopeBypassPrefixes,
    before.localOnlyManageScopeBypassPrefixes
  );
  assert.equal(after.localOnlyManageScopeBypassEnabled, before.localOnlyManageScopeBypassEnabled);
  assert.equal(after.requireLogin, false);
  assert.equal(after.password, before.password);
  assert.equal(after.oidcEnabled, before.oidcEnabled);
  assert.equal(after.oidcDisablePasswordLogin, before.oidcDisablePasswordLogin);
  assert.equal(after.oidcClientSecret, before.oidcClientSecret);
  assert.equal(after.newPassword, undefined);
  // Non-security settings still import.
  assert.equal(after.showQuickStartOnHome, false);
});

// ─── Drift guard: every LOCAL_ONLY entry is classified ───────────────────────

/**
 * LOCAL_ONLY prefixes reviewed as NOT reaching a spawn / code-exec sink, so an operator
 * may open them to manage scope. Adding a LOCAL_ONLY prefix that is not refused by the
 * spawn-capable deny-list fails this test until it is reviewed and listed here.
 */
const REVIEWED_BYPASS_ELIGIBLE = new Map<string, string>([
  ["/api/mcp/", "default carve-out (manage or mcp:connect scope)"],
  ["/api/copilot/", "in-process LLM driver; documented opt-in remote access"],
  ["/api/jobs", "JobRegistry admin; runs only built-in job handlers"],
  ["/api/jobs/", "JobRegistry admin children"],
  ["/api/resilience/connections", "per-account resilience state"],
]);

test("every LOCAL_ONLY prefix is either refused by the deny-list or reviewed as eligible", async () => {
  const unclassified: string[] = [];
  const staleOrBlocked: string[] = [];
  for (const prefix of LOCAL_ONLY_API_PREFIXES) {
    const rejected = schemaRejectsBypassPrefix(prefix);
    if (REVIEWED_BYPASS_ELIGIBLE.has(prefix)) {
      if (rejected) staleOrBlocked.push(prefix);
      continue;
    }
    if (!rejected) {
      unclassified.push(prefix);
      continue;
    }
    await applyBypass([prefix]);
    assert.equal(runtimeSettings.getAuthzBypassSnapshot().prefixes.includes(prefix), false, prefix);
    assert.equal(isLocalOnlyBypassableByManageScope(prefix), false, prefix);
  }
  assert.deepEqual(
    unclassified,
    [],
    "LOCAL_ONLY prefixes missing from SPAWN_CAPABLE_PREFIXES (add them, or review + list them as eligible)"
  );
  assert.deepEqual(staleOrBlocked, [], "eligible entries that the deny-list now refuses");
  for (const prefix of REVIEWED_BYPASS_ELIGIBLE.keys()) {
    assert.ok(LOCAL_ONLY_API_PREFIXES.includes(prefix), `stale eligible entry: ${prefix}`);
  }
});

test("every LOCAL_ONLY regex pattern is mirrored in SPAWN_CAPABLE_PATTERNS", () => {
  const spawnSources = new Set(SPAWN_CAPABLE_PATTERNS.map((re) => re.source));
  const missing = LOCAL_ONLY_API_PATTERNS.map((re) => re.source).filter(
    (source) => !spawnSources.has(source)
  );
  assert.deepEqual(missing, []);
});
