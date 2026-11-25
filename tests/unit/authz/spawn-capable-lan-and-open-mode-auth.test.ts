import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-spawn-lan-open-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-spawn-lan-open";
process.env.JWT_SECRET = "test-jwt-secret-spawn-lan-open";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { SPAWN_CAPABLE_PREFIXES, SPAWN_CAPABLE_PATTERNS, isLocalOnlyPath, isSpawnCapablePath } =
  await import("../../../src/server/authz/routeGuard.ts");
const { managementPolicy } = await import("../../../src/server/authz/policies/management.ts");
const settingsMitmRoute = await import("../../../src/app/api/settings/mitm/route.ts");
const cliRuntimeRoute = await import("../../../src/app/api/cli-tools/runtime/[toolId]/route.ts");
const { makeManagementSessionRequest } = await import("../../helpers/managementSession.ts");

await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

function samplePathForPrefix(prefix: string): string {
  return prefix.endsWith("/") ? `${prefix}probe` : prefix;
}

const REGEX_SPAWN_SAMPLES: ReadonlyArray<string> = [
  "/api/providers/acct-1/login",
  "/api/providers/volcengine-plan/connect",
  "/api/providers/acct-1/refresh-cursor",
  "/api/providers/cursor/agent-availability",
  "/api/providers/devin-cli-agentic/auth-status",
  "/api/providers/agy-auth/apply-local",
  "/api/providers/acct-1/chatgpt-web-codex-doctor",
  "/api/providers/validate",
];

function policyCtx(
  pathname: string,
  method: string,
  remoteAddress: string,
  headers = new Headers()
) {
  return {
    request: {
      method,
      headers,
      url: `http://localhost:20128${pathname}`,
      nextUrl: { pathname },
      socket: { remoteAddress },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      reason: pathname.startsWith("/dashboard")
        ? ("dashboard_prefix" as const)
        : ("management_api" as const),
      normalizedPath: pathname,
    },
    requestId: "req_spawn_lan_test",
  };
}

test("isSpawnCapablePath: honors GET exemptions on LOCAL_ONLY spawn prefixes", () => {
  // POST /api/system/version and POST /api/tunnels/cloudflared spawn processes,
  // whereas their read-only GET methods are exempted from LOCAL_ONLY.
  assert.equal(isSpawnCapablePath("/api/system/version", "POST"), true);
  assert.equal(isSpawnCapablePath("/api/system/version", "GET"), false);
  assert.equal(isSpawnCapablePath("/api/tunnels/cloudflared", "POST"), true);
  assert.equal(isSpawnCapablePath("/api/tunnels/cloudflared", "GET"), false);

  // Call-site-gated /api/providers/{validate,import,bulk} are in SPAWN_CAPABLE_PREFIXES
  // and SPAWN_CAPABLE_PATTERNS (so open mode requires auth), while isLocalOnlyPath()
  // stays false for them by design (#16366).
  assert.equal(isSpawnCapablePath("/api/providers/validate", "POST"), true);
  assert.equal(isSpawnCapablePath("/api/providers/import", "POST"), true);
  assert.equal(isSpawnCapablePath("/api/providers/bulk", "POST"), true);
  assert.equal(isLocalOnlyPath("/api/providers/validate", "POST"), false);
});

test("private-LAN × open mode (requireLogin=false) × SPAWN_CAPABLE_PREFIXES returns 401/403 without credentials", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  const manageKey = await apiKeysDb.createApiKey("lan-manage", "machine-lan-manage", ["manage"]);

  assert.equal(SPAWN_CAPABLE_PREFIXES.length, 53);

  for (const prefix of SPAWN_CAPABLE_PREFIXES) {
    const sample = samplePathForPrefix(prefix);
    const pathLocalOnly = isLocalOnlyPath(sample, "POST");

    // 1. Anonymous private-LAN caller in open mode (requireLogin=false)
    const anonLan = await managementPolicy.evaluate(policyCtx(sample, "POST", "192.168.1.50"));
    assert.equal(anonLan.allow, false, `expected anonymous LAN POST ${sample} to be rejected`);
    if (!anonLan.allow) {
      if (pathLocalOnly) {
        assert.equal(anonLan.status, 403, `expected 403 for anonymous LAN POST ${sample}`);
        assert.equal(anonLan.code, "LOCAL_ONLY", `expected LOCAL_ONLY for ${sample}`);
      } else {
        // Call-site-gated routes (/api/providers/{validate,import,bulk}) reach Tier 2 auth check
        assert.equal(anonLan.status, 401, `expected 401 for anonymous LAN POST ${sample}`);
        assert.equal(anonLan.code, "AUTH_001", `expected AUTH_001 for ${sample}`);
      }
    }

    // 2. Anonymous loopback caller in open mode (requireLogin=false) must also be rejected (401)
    const anonLoopback = await managementPolicy.evaluate(policyCtx(sample, "POST", "127.0.0.1"));
    assert.equal(
      anonLoopback.allow,
      false,
      `expected anonymous loopback POST ${sample} in open mode to be rejected`
    );
    if (!anonLoopback.allow) {
      assert.equal(anonLoopback.status, 401, `expected 401 for anonymous loopback POST ${sample}`);
      assert.equal(anonLoopback.code, "AUTH_001", `expected AUTH_001 for ${sample}`);
    }

    // 3. Authenticated manage-scope key from private-LAN peer (Tailscale CGNAT) on path-gated routes
    if (pathLocalOnly) {
      const authedLan = await managementPolicy.evaluate(
        policyCtx(
          sample,
          "POST",
          "100.96.10.20",
          new Headers({ authorization: `Bearer ${manageKey.key}` })
        )
      );
      assert.equal(
        authedLan.allow,
        false,
        `expected manage-key LAN POST ${sample} to be rejected as LOCAL_ONLY`
      );
      if (!authedLan.allow) {
        assert.equal(authedLan.status, 403, `expected 403 for manage-key LAN POST ${sample}`);
        assert.equal(authedLan.code, "LOCAL_ONLY", `expected LOCAL_ONLY for ${sample}`);
      }
    }
  }
});

test("private-LAN × open mode (requireLogin=false) × SPAWN_CAPABLE_PATTERNS returns 401/403 without credentials", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  assert.equal(
    REGEX_SPAWN_SAMPLES.length,
    SPAWN_CAPABLE_PATTERNS.length,
    "every SPAWN_CAPABLE_PATTERNS regex must have a sample route tested"
  );

  for (let i = 0; i < SPAWN_CAPABLE_PATTERNS.length; i++) {
    const pattern = SPAWN_CAPABLE_PATTERNS[i];
    const sample = REGEX_SPAWN_SAMPLES[i];
    assert.equal(pattern.test(sample), true, `sample ${sample} must match ${pattern}`);
    assert.equal(isSpawnCapablePath(sample, "POST"), true, `${sample} must be spawn-capable`);

    const pathLocalOnly = isLocalOnlyPath(sample, "POST");
    const out = await managementPolicy.evaluate(policyCtx(sample, "POST", "10.0.0.42"));
    assert.equal(out.allow, false, `expected LAN POST ${sample} to be rejected`);
    if (!out.allow) {
      if (pathLocalOnly) {
        assert.equal(out.status, 403);
        assert.equal(out.code, "LOCAL_ONLY");
      } else {
        assert.equal(out.status, 401);
        assert.equal(out.code, "AUTH_001");
      }
    }
  }
});

test("non-spawn LOCAL_ONLY routes remain reachable from private-LAN peers", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  for (const nonSpawnLocalPath of [
    "/api/mcp/stream",
    "/api/copilot/chat",
    "/api/jobs",
    "/api/resilience/connections",
  ]) {
    assert.equal(isLocalOnlyPath(nonSpawnLocalPath, "GET"), true);
    assert.equal(isSpawnCapablePath(nonSpawnLocalPath, "GET"), false);
    const out = await managementPolicy.evaluate(
      policyCtx(nonSpawnLocalPath, "GET", "192.168.1.50")
    );
    assert.equal(
      out.allow,
      true,
      `expected non-spawn LOCAL_ONLY ${nonSpawnLocalPath} to allow LAN`
    );
  }
});

test("PUT and POST /api/settings/mitm require credentials even when requireLogin=false (open mode)", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });

  const unauthPut = await settingsMitmRoute.PUT(
    new Request("http://localhost:20128/api/settings/mitm", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ targetHost: "example.com" }),
    })
  );
  assert.equal(
    unauthPut.status,
    401,
    "anonymous PUT /api/settings/mitm must return 401 in open mode"
  );

  const unauthPost = await settingsMitmRoute.POST(
    new Request("http://localhost:20128/api/settings/mitm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "regenerate-cert" }),
    })
  );
  assert.equal(
    unauthPost.status,
    401,
    "anonymous POST /api/settings/mitm must return 401 in open mode"
  );

  // GET status remains readable for the local dashboard when requireLogin=false
  const unauthGet = await settingsMitmRoute.GET(
    new Request("http://localhost:20128/api/settings/mitm")
  );
  assert.equal(
    unauthGet.status,
    200,
    "GET /api/settings/mitm status remains accessible on loopback"
  );
});

test("GET /api/cli-tools/runtime/[toolId] requires credentials even when requireLogin=false (open mode)", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });

  const unauthRes = await cliRuntimeRoute.GET(
    new Request("http://localhost:20128/api/cli-tools/runtime/claude"),
    { params: Promise.resolve({ toolId: "claude" }) }
  );
  assert.equal(
    unauthRes.status,
    401,
    "anonymous GET /api/cli-tools/runtime/claude must return 401 in open mode"
  );

  // Authenticated management session is allowed past the auth gate (unknown toolId returns 404)
  const authedReq = await makeManagementSessionRequest(
    "http://localhost:20128/api/cli-tools/runtime/__invalid_tool__"
  );
  const authedRes = await cliRuntimeRoute.GET(authedReq, {
    params: Promise.resolve({ toolId: "__invalid_tool__" }),
  });
  assert.equal(
    authedRes.status,
    404,
    "authenticated caller passes auth gate and hits toolId validation"
  );
});

test("GET /api/providers/devin-cli-agentic/auth-status is rejected on private LAN and requires credentials on loopback in open mode", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  const path = "/api/providers/devin-cli-agentic/auth-status";

  assert.equal(isSpawnCapablePath(path, "GET"), true);

  const anonLan = await managementPolicy.evaluate(policyCtx(path, "GET", "192.168.1.50"));
  assert.equal(anonLan.allow, false);
  if (!anonLan.allow) {
    assert.equal(anonLan.status, 403);
    assert.equal(anonLan.code, "LOCAL_ONLY");
  }

  const anonLoopback = await managementPolicy.evaluate(policyCtx(path, "GET", "127.0.0.1"));
  assert.equal(anonLoopback.allow, false);
  if (!anonLoopback.allow) {
    assert.equal(anonLoopback.status, 401);
    assert.equal(anonLoopback.code, "AUTH_001");
  }
});
