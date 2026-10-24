/**
 * Authz wiring for the CLIProxyAPI management compatibility routes.
 *
 * The handlers live under src/app/api/v0/management/ and are also reachable at the root
 * `/v0/management/*` through a next.config.mjs rewrite (the path CLIProxyAPI clients call).
 * The root spelling is the dangerous one: a path outside the proxy matcher skips the authz
 * pipeline, so the trusted x-omniroute-auth-* stamps that requireManagementAuth() honours
 * would reach the handler unstripped. These tests pin:
 *   - the proxy matcher covers /v0/... in any case;
 *   - classifyRoute() treats both spellings as MANAGEMENT on the same normalized path;
 *   - the path is ALWAYS_PROTECTED (authenticated even with login disabled), not PUBLIC,
 *     not CLIENT_API, and not LOCAL_ONLY (remote manage-scope clients are the use case);
 *   - the pipeline rejects anonymous / spoofed / inference-key callers and admits a
 *     manage-scope key, for both spellings.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-cliproxy-compat-authz-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cliproxy-compat-authz-secret";
process.env.JWT_SECRET = "cliproxy-compat-authz-jwt";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const { config } = await import("../../../src/proxy.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");
const routeGuard = await import("../../../src/server/authz/routeGuard.ts");
const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const pipeline = await import("../../../src/server/authz/pipeline.ts");

const manageKey = await apiKeysDb.createApiKey("compat-manage", "machine-authz", ["manage"]);
const clientKey = await apiKeysDb.createApiKey("compat-client", "machine-authz", []);
// Login disabled: ALWAYS_PROTECTED must still demand a credential.
await settingsDb.updateSettings({ requireLogin: false });

const require = createRequire(import.meta.url);
const { tryToParsePath } = require("next/dist/lib/try-to-parse-path.js");

const COMPAT_PATHS = [
  "/v0/management/auth-files",
  "/v0/management/api-call",
  "/v0/management/reset-quota",
];

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function isMatchedByProxy(pathname: string): boolean {
  return (config.matcher as string[]).some((entry) => {
    // Mirror Next's middleware matcher compilation: regex source only, no flags.
    const parsed = tryToParsePath(entry);
    return new RegExp(parsed.regexStr as string).test(pathname);
  });
}

test("proxy matcher sends /v0/management/* (any case) through the authz pipeline", () => {
  for (const p of [...COMPAT_PATHS, "/V0/management/api-call", "/v0/MANAGEMENT/auth-files"]) {
    assert.equal(isMatchedByProxy(p), true, `${p} must reach the authz pipeline`);
  }
});

test("classifyRoute treats both spellings as MANAGEMENT on the /api/v0/management path", () => {
  for (const p of COMPAT_PATHS) {
    const tail = p.slice("/v0/management".length);
    const root = classifyRoute(p, "POST");
    assert.equal(root.routeClass, "MANAGEMENT");
    assert.equal(root.reason, "cliproxy_management_alias");
    assert.equal(root.normalizedPath, `/api/v0/management${tail}`);

    const upper = classifyRoute(p.toUpperCase().replace("/V0/MANAGEMENT", "/V0/Management"));
    assert.equal(upper.routeClass, "MANAGEMENT");
    assert.ok(upper.normalizedPath.startsWith("/api/v0/management/"));

    const api = classifyRoute(`/api${p}`, "POST");
    assert.equal(api.routeClass, "MANAGEMENT");
    assert.equal(api.normalizedPath, `/api/v0/management${tail}`);
  }
});

test("the compat paths are ALWAYS_PROTECTED and not LOCAL_ONLY", () => {
  for (const p of COMPAT_PATHS) {
    const normalized = classifyRoute(p).normalizedPath;
    assert.equal(routeGuard.isAlwaysProtectedPath(normalized), true, `${normalized}`);
    assert.equal(routeGuard.isLocalOnlyPath(normalized), false, `${normalized}`);
  }
});

async function run(pathname: string, headers: Record<string, string> = {}) {
  return pipeline.runAuthzPipeline(
    new NextRequest(`http://localhost:20128${pathname}`, { method: "GET", headers }),
    { enforce: true }
  );
}

test("pipeline: anonymous and spoofed-stamp callers are rejected even with login disabled", async () => {
  for (const p of [...COMPAT_PATHS, ...COMPAT_PATHS.map((x) => `/api${x}`)]) {
    const anonymous = await run(p);
    assert.equal(anonymous.status, 401, `${p} anonymous`);
    assert.equal(anonymous.headers.get("x-omniroute-route-class"), "MANAGEMENT");

    const spoofed = await run(p, {
      "x-omniroute-auth-kind": "management_key",
      "x-omniroute-auth-label": "local-cli-token",
    });
    assert.equal(spoofed.status, 401, `${p} spoofed trusted stamp`);
  }
});

test("pipeline: an inference-only key is refused, a manage-scope key is admitted", async () => {
  for (const p of COMPAT_PATHS) {
    const client = await run(p, { authorization: `Bearer ${clientKey.key}` });
    assert.equal(client.status, 403, `${p} client key`);

    const manage = await run(p, { authorization: `Bearer ${manageKey.key}` });
    assert.equal(manage.status, 200, `${p} manage key`);
    assert.equal(manage.headers.get("x-middleware-next"), "1");
  }
});
