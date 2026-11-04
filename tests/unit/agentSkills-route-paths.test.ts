import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Every OmniRoute URL in skills/**/*.md (the base URL is http(s)://localhost:20128
// or $OMNIROUTE_URL) must resolve to a real src/app/api/**/route.ts.
// next.config.mjs rewrites /v1/:path* to /api/v1/:path*.

const ROOT = process.cwd();
const API_DIR = path.join(ROOT, "src/app/api");

// Wrong paths in hand-written skill blocks, fixed by a separate change.
// Delete this set once that change has merged: the entries only hide these 7 paths.
const KNOWN_WRONG_UNTIL_SKILLS_FACTS_MERGE = new Set<string>([
  "/api/combos/{id}/metrics",
  "/api/combos/{id}/toggle",
  "/api/routing/simulate",
  "/api/v1/images/variations",
  "/api/v1/web/search",
  "/api/budget/guard",
  "/api/quota",
]);

// Generated from docs/openapi.yaml: the spec lists the JSON-404 catch-all as an
// operation. Remove when the spec drops it.
const SPEC_CATCH_ALL = new Set<string>(["/api/v1/{omnirouteCatchAll}"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function routeRegex(file: string): RegExp {
  const segs = path
    .relative(ROOT, path.dirname(file))
    .replace(/^src\/app/, "")
    .split("/")
    .filter((s) => s && !/^\(.*\)$/.test(s));
  let re = "";
  for (const s of segs) {
    if (/^\[\[\.\.\..+\]\]$/.test(s)) re += "(?:/.*)?";
    else if (/^\[\.\.\..+\]$/.test(s)) re += "/.+";
    else if (/^\[.+\]$/.test(s)) re += "/[^/]+";
    else re += "/" + s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}/?$`);
}

const routes = walk(API_DIR)
  .filter((f) => f.endsWith("/route.ts"))
  // These two catch-alls only return a JSON 404 for unknown paths.
  .filter((f) => !/\[\.\.\.omniroute(Api)?CatchAll\]/.test(f))
  .map(routeRegex);

const URL_RE = /(?:https?:\/\/localhost:20128|\$\{?OMNIROUTE_URL\}?)(\/[^\s"'`)\]>\\]*)/g;

function skillUrls(): Array<{ file: string; urlPath: string }> {
  const out: Array<{ file: string; urlPath: string }> = [];
  for (const file of walk(path.join(ROOT, "skills")).filter((f) => f.endsWith(".md"))) {
    const text = fs.readFileSync(file, "utf-8");
    for (const m of text.matchAll(URL_RE)) {
      let urlPath = m[1].split(/[?#]/)[0].replace(/[.,;:]+$/, "");
      if (urlPath.startsWith("/v1/") || urlPath === "/v1") urlPath = "/api" + urlPath;
      if (!urlPath.startsWith("/api/")) continue;
      out.push({ file: path.relative(ROOT, file), urlPath });
    }
  }
  return out;
}

test("next.config.mjs rewrites /v1/:path* to /api/v1/:path*", () => {
  const cfg = fs.readFileSync(path.join(ROOT, "next.config.mjs"), "utf-8");
  assert.match(cfg, /source: "\/v1\/:path\*",\s*destination: "\/api\/v1\/:path\*"/);
});

test("every OmniRoute URL in skills/**/*.md matches a real API route", () => {
  const urls = skillUrls();
  assert.ok(urls.length > 100, `expected >100 skill URLs, got ${urls.length}`);
  const missing = urls.filter(
    ({ urlPath }) =>
      !KNOWN_WRONG_UNTIL_SKILLS_FACTS_MERGE.has(urlPath) &&
      !SPEC_CATCH_ALL.has(urlPath) &&
      !routes.some((r) => r.test(urlPath))
  );
  assert.deepEqual(
    missing.map(({ file, urlPath }) => `${file}: ${urlPath}`),
    []
  );
});
