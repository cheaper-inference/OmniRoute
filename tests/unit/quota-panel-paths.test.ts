import test from "node:test";
import assert from "node:assert/strict";

const panel = await import("../../src/lib/quotaPanelBridge.ts");

const ALLOWED = [
  "/quota/claude",
  "/quota/cc",
  "/quota/Claude",
  "/quota/a.b_c-1",
  `/quota/a${"b".repeat(63)}`,
  "/api/v1/me/quota/claude",
  "/v1/me/quota/claude",
  "/api/v1/me/usage",
  "/v1/me/usage",
  "/_next/static/chunks/0d_ks0ow7ur6m.js",
  "/_next/static/chunks/app/quota/%5Bprovider%5D/page-1a2b.js",
  "/_next/static/chunks/a..b.css",
  "/_next/static/media/.hidden.woff2",
  "/_next/static/immutable/chunks/a.js",
  "/_next/static/BUILD/_buildManifest.js",
  "/favicon.ico",
  "/favicon.svg",
  "/icon-512.png",
  "/apple-touch-icon.png",
];

const REFUSED = [
  "/",
  "",
  "/dashboard",
  "/dashboard/costs/quota-share",
  "/login",
  "/status",
  "/docs",
  "/quota",
  "/quota/",
  "/quota/claude/",
  "/quota/claude/x",
  "/quota//claude",
  "//quota/claude",
  "/quotas/claude",
  "/quota-share/claude",
  "/quota.x/claude",
  "/QUOTA/claude",
  "/Quota/claude",
  "/quota/.claude",
  "/quota/-x",
  "/quota/.",
  "/quota/..",
  `/quota/a${"b".repeat(64)}`,
  "/quota/cl%61ude",
  "/quota/claude%2f..%2flogin",
  "/quota/claude;x",
  "/quota/claude%00",
  "/quota/claude\\x",
  "/api/v1/me",
  "/api/v1/me/",
  "/api/v1/me/status",
  "/api/v1/me/sessions",
  "/api/v1/me/sessions/abc",
  "/api/v1/me-other",
  "/api/v1/mexico",
  "/api/v1/me/usagex",
  "/api/v1/me/usage/",
  "/api/v1/me/usage/x",
  "/api/v1/me/quota",
  "/api/v1/me/quota/",
  "/api/v1/me/quota/claude/x",
  "/api/V1/me/usage",
  "/API/v1/me/usage",
  "/v1/me",
  "/v1/me/status",
  "/V1/me/usage",
  "/v1/v1/me/usage",
  "/v1/models",
  "/v1/chat/completions",
  "/api/v1/models",
  "/api/keys",
  "/api/settings",
  "/api/settings/favicon",
  "/api/auth/login",
  "/api/mcp/x",
  "/_next",
  "/_next/",
  "/_next/static",
  "/_next/static/",
  "/_next/static//x",
  "/_next/static\\x",
  "/_next/staticx/a.js",
  "/_next/static.x/a.js",
  "/_NEXT/static/a.js",
  "/_next/image",
  "/_next/data/b/x.json",
  "/_next/webpack-hmr",
  "/__nextjs_original-stack-frames",
  "/manifest.webmanifest",
  "/sw.js",
  "/robots.txt",
  "/favicon.png",
  "/icon-192.svg",
  "/favicon.ico/x",
  "/providers/claude.svg",
  "/openapi.yaml",
  "http://panel.test/quota/claude",
  "quota/claude",
  // Near misses of each pattern.
  "/quota/x/y",
  "/quota/x%2f..",
  "/api/v1/me/quotas/x",
  "/api/v1/me/keys",
  "/api/v1/me/usageX",
  "/_next/staticX/y",
  "/api/v1/chat/completions",
  "*",
  "/\\h/quota/claude",
  "/v1/me/quota/claude/",
  "/v1/me/quota/",
  "/v1/me/usage/",
  "/FAVICON.ico",
  "/favicon.ico.bak",
];

test("the page, its API routes, their aliases and the build assets are on the panel allowlist", () => {
  for (const path of ALLOWED) assert.equal(panel.isQuotaPanelPath(path), true, path);
});

test("nothing else is on the panel allowlist", () => {
  for (const path of REFUSED) assert.equal(panel.isQuotaPanelPath(path), false, path);
});

test("the allowlist looks at the path alone, so a query never makes a path match", () => {
  assert.equal(panel.isQuotaPanelPath("/dashboard?next=/quota/claude"), false);
  assert.equal(panel.isQuotaPanelPath("/login?/_next/static/a.js"), false);
});

test("every allowed sample resolves to itself in a WHATWG parser", () => {
  for (const path of ALLOWED) {
    const url = new URL(path, "http://panel.test");
    assert.equal(url.host, "panel.test", path);
    assert.equal(url.pathname, path, path);
  }
});

test("under a base path only the prefixed paths are on the allowlist", () => {
  const base = "/omniroute";
  for (const path of ALLOWED) {
    assert.equal(panel.isQuotaPanelPath(base + path, base), true, base + path);
    assert.equal(panel.isQuotaPanelPath(path, base), false, path);
  }
  for (const path of [
    "/omniroute",
    "/omniroute/",
    "/omniroute/dashboard",
    "/omniroutex/quota/claude",
    "/OMNIROUTE/quota/claude",
    "/omniroute/omniroute/quota/claude",
    "/x/omniroute/quota/claude",
  ]) {
    assert.equal(panel.isQuotaPanelPath(path, base), false, path);
  }
  assert.equal(panel.isQuotaPanelPath("/a/b/quota/claude", "/a/b"), true);
});

test("the relayed methods are GET and HEAD", () => {
  assert.deepEqual([...panel.QUOTA_PANEL_METHOD_NAMES].sort(), ["GET", "HEAD"]);
  assert.equal(Object.isFrozen(panel.QUOTA_PANEL_METHOD_NAMES), true);
  assert.equal("QUOTA_PANEL_METHODS" in panel, false);
});

test("a target with a character outside printable ASCII is not printable", () => {
  for (const ok of ["/quota/claude", "/api/v1/me/usage?range=7d&x=%09"]) {
    assert.equal(panel.isPrintableAsciiTarget(ok), true, ok);
  }
  for (const bad of [
    "",
    "/quota/cl\taude",
    "/quota/claude?a=\tb",
    "/quota/claude\f",
    "/quota/claude x",
    "/quota/claude\r\n",
    "/quota/claude\u0000",
    "/quota/claude?a=ÿ",
    "/quota/cláude",
    "/quota/claude\u007f",
  ]) {
    assert.equal(panel.isPrintableAsciiTarget(bad), false, JSON.stringify(bad));
  }
});

test("the write paths are the two quota view paths only", () => {
  for (const path of ["/api/v1/me/quota/claude", "/v1/me/quota/claude"]) {
    assert.equal(panel.isQuotaPanelWritePath(path), true, path);
    assert.equal(panel.isQuotaPanelWritePath(`/a/b${path}`, "/a/b"), true, path);
    assert.equal(panel.isQuotaPanelWritePath(path, "/a/b"), false, path);
  }
  for (const path of [
    "/quota/claude",
    "/api/v1/me/usage",
    "/v1/me/usage",
    "/_next/static/a.js",
    "/favicon.ico",
    "/api/v1/me/quota/",
    "/api/v1/me/quota/a/b",
    "/API/v1/me/quota/claude",
  ]) {
    assert.equal(panel.isQuotaPanelWritePath(path), false, path);
  }
  assert.equal(panel.QUOTA_PANEL_WRITE_METHOD, "PATCH");
  assert.equal(panel.QUOTA_PANEL_WRITE_MAX_BYTES, 4096);
});
