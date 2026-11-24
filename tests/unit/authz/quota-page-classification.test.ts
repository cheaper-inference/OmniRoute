import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { NextRequest } from "next/server";

// The proxy reads settings, feature flags and API keys from SQLite: point it at a throwaway
// DATA_DIR before those modules load, so an inherited DATA_DIR is never touched. The panel flag
// is on so the classification is exercised on a page that exists.
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-quota-page-authz-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.QUOTA_SELF_PANEL = "true";

const core = await import("../../../src/lib/db/core.ts");
const { updateSettings } = await import("../../../src/lib/db/settings.ts");
const { config, proxy } = await import("../../../src/proxy.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  delete process.env.QUOTA_SELF_PANEL;
});

const require = createRequire(import.meta.url);
const { tryToParsePath } = require("next/dist/lib/try-to-parse-path.js");

function compiledMatcherRegexes(): RegExp[] {
  return (config.matcher as string[]).map((entry) => {
    const parsed = tryToParsePath(entry);
    // Mirror Next's proxy route matcher: source only, no flags.
    return new RegExp(parsed.regexStr as string);
  });
}

function isMatchedByProxy(pathname: string): boolean {
  return compiledMatcherRegexes().some((re) => re.test(pathname));
}

test("the proxy matcher covers /quota in any casing and nothing next to it", () => {
  for (const p of ["/quota", "/quota/", "/quota/claude", "/QUOTA/claude", "/Quota/cc"]) {
    assert.equal(isMatchedByProxy(p), true, `proxy matcher must match ${p}`);
  }
  for (const p of ["/quotafoo", "/quota-share", "/quotas", "/quotas/claude", "/quota%2Fx"]) {
    assert.equal(isMatchedByProxy(p), false, `proxy matcher must not match ${p}`);
  }
});

test("/quota is a public page; its neighbours keep their class", () => {
  const pages: ReadonlyArray<[string, string]> = [
    ["/quota", "/quota"],
    ["/quota/", "/quota"],
    ["/quota/claude", "/quota/claude"],
    ["/quota/claude/extra", "/quota/claude/extra"],
  ];
  for (const [p, normalizedPath] of pages) {
    const result = classifyRoute(p, "GET");
    assert.equal(result.routeClass, "PUBLIC", p);
    assert.equal(result.reason, "public_quota_page", p);
    assert.equal(result.normalizedPath, normalizedPath, p);
  }

  const upper = classifyRoute("/QUOTA/Claude", "GET");
  assert.equal(upper.routeClass, "PUBLIC");
  assert.equal(upper.reason, "public_quota_page");
  assert.equal(upper.normalizedPath, "/quota/Claude");

  const neighbours: ReadonlyArray<[string, string, string]> = [
    ["/quotafoo", "MANAGEMENT", "fallback_management"],
    ["/quotas", "MANAGEMENT", "fallback_management"],
    ["/quotas/claude", "MANAGEMENT", "fallback_management"],
    ["/quota-share", "MANAGEMENT", "fallback_management"],
    ["/quot%61/x", "MANAGEMENT", "fallback_management"],
    ["/quota%2Fx", "MANAGEMENT", "fallback_management"],
    ["/api/quota/pools", "MANAGEMENT", "management_api"],
    ["/api/v1/me/quota/claude", "CLIENT_API", "client_api_v1"],
    ["/v1/me/quota/claude", "CLIENT_API", "client_api_alias"],
    ["/v1/me/usage", "CLIENT_API", "client_api_alias"],
    ["/dashboard/quota", "MANAGEMENT", "dashboard_prefix"],
    ["/dashboard/costs/quota-share", "MANAGEMENT", "dashboard_prefix"],
  ];
  for (const [p, routeClass, reason] of neighbours) {
    const result = classifyRoute(p, "GET");
    assert.equal(result.routeClass, routeClass, p);
    assert.equal(result.reason, reason, p);
  }
});

test("an anonymous visitor reaches the page instead of the login redirect", async () => {
  await updateSettings({ requireLogin: true });
  const res = await proxy(new NextRequest("http://localhost/quota/claude"));
  assert.equal(res.headers.get("location"), null);
  assert.notEqual(res.status, 401);
  assert.notEqual(res.status, 403);
  assert.equal(res.headers.get("x-omniroute-route-class"), "PUBLIC");
});
