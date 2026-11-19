/**
 * #20439: npm installs ship no docs/i18n tree (#20438), so the /docs route fetches the one mirror
 * it needs from GitHub, pinned to the installed version's tag, caches it under DATA_DIR and renders
 * it through the same path as a bundled mirror. These tests never touch the network: every call
 * injects a fake fetch and records what it was asked for.
 *
 * The negative cache and the network back-off are process-wide and keyed by version, so each test
 * uses its own version string to stay independent of the others.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { loadTranslatedDoc } from "../../src/lib/docsI18nRender.ts";

const QUICK_START_SLUG = ["getting-started", "quick-start"];
const QUICK_START_SOURCE = "getting-started/QUICK-START.md";
const PINNED_URL = (version: string, locale = "pt-BR", page = QUICK_START_SOURCE) =>
  `https://raw.githubusercontent.com/cheaper-inference/OmniRoute/v${version}/docs/i18n/${locale}/docs/${page}`;

const MIRROR = [
  "# Início rápido (Português (Brasil))",
  "",
  "🌐 **Languages:** 🇺🇸 [English](../../../../docs/getting-started/QUICK-START.md)",
  "",
  "---",
  "",
  "# Início rápido",
  "",
  'Texto traduzido. <script>alert("x")</script>',
  "",
].join("\n");

type FetchCall = { url: string; init: RequestInit | undefined };
type FakeFetch = typeof fetch & { calls: FetchCall[] };

function fakeFetch(respond: (url: string, init?: RequestInit) => Promise<Response> | Response) {
  const calls: FetchCall[] = [];
  const impl = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    return respond(url, init);
  }) as FakeFetch;
  impl.calls = calls;
  return impl;
}

const textResponse = (body: string, status = 200, type = "text/plain; charset=utf-8") =>
  new Response(body, { status, headers: { "content-type": type } });

function tempDir(t: { after: (fn: () => void) => void }, prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

/** A docs root shaped like an npm install: English pages, no docs/i18n tree. */
function npmDocsRoot(t: { after: (fn: () => void) => void }): string {
  const root = tempDir(t, "omniroute-docs-npm-");
  fs.mkdirSync(path.join(root, "getting-started"), { recursive: true });
  fs.writeFileSync(path.join(root, "getting-started", "QUICK-START.md"), "# Quick start\n");
  return root;
}

function load(
  docsRoot: string,
  remote: Record<string, unknown>,
  {
    slug = QUICK_START_SLUG,
    locale = "pt-BR",
    sourcePath = QUICK_START_SOURCE,
  }: { slug?: string[]; locale?: string; sourcePath?: string } = {}
) {
  return loadTranslatedDoc(slug, locale, [], docsRoot, { sourcePath, remote });
}

test("cache miss fetches the mirror from the pinned tag URL, caches it and renders it", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse(MIRROR));

  const translated = await load(docsRoot, { fetchImpl, cacheDir, version: "3.8.54" });

  assert.ok(translated, "the fetched mirror is served");
  assert.match(translated.html, /Texto traduzido\./);
  assert.doesNotMatch(translated.html, /<script/i, "the fetched mirror goes through the sanitizer");
  assert.doesNotMatch(translated.html, /Languages:/, "the mirror preamble is stripped");
  assert.equal(translated.hasOwnTitle, true);

  assert.equal(fetchImpl.calls.length, 1);
  assert.equal(fetchImpl.calls[0].url, PINNED_URL("3.8.54"));
  assert.equal(fetchImpl.calls[0].init?.redirect, "error", "redirects are refused, not followed");
  assert.ok(fetchImpl.calls[0].init?.signal, "the request carries a timeout signal");

  const cached = path.join(
    cacheDir,
    "v3.8.54",
    "i18n",
    "pt-BR",
    "docs",
    "getting-started",
    "QUICK-START.md"
  );
  assert.equal(fs.readFileSync(cached, "utf8"), MIRROR);
  const leftovers = fs.readdirSync(path.dirname(cached)).filter((f) => f.endsWith(".tmp"));
  assert.deepEqual(leftovers, [], "the cache write is atomic (no temp file left behind)");
});

test("cache hit renders from DATA_DIR without fetching again", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse(MIRROR));
  const remote = { fetchImpl, cacheDir, version: "3.8.54-hit" };

  assert.ok(await load(docsRoot, remote));
  const second = await load(docsRoot, remote);
  assert.ok(second);
  assert.match(second.html, /Texto traduzido\./);
  assert.equal(fetchImpl.calls.length, 1, "the second request is served from the cache");

  const freshFetch = fakeFetch(() => textResponse("unused"));
  assert.ok(await load(docsRoot, { ...remote, fetchImpl: freshFetch }));
  assert.equal(freshFetch.calls.length, 0, "a cached file survives without any fetch");
});

test("a 404 is remembered: English now, and no second fetch for the same page", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse("404: Not Found", 404));
  const remote = { fetchImpl, cacheDir, version: "3.8.54-miss" };

  assert.equal(await load(docsRoot, remote), null);
  assert.equal(await load(docsRoot, remote), null);
  assert.equal(fetchImpl.calls.length, 1, "the miss is cached");
  assert.equal(fs.existsSync(path.join(cacheDir, "v3.8.54-miss", "i18n")), false);
});

test("timeout, oversize, non-200 and non-text responses all fall back to English", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");

  const hang = fakeFetch(
    (_url, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
      })
  );
  const started = Date.now();
  assert.equal(
    await load(docsRoot, { fetchImpl: hang, cacheDir, version: "3.8.54-timeout", timeoutMs: 30 }),
    null
  );
  assert.ok(Date.now() - started < 2_000, "the timeout bounds the wait");

  const declaredHuge = fakeFetch(
    () =>
      new Response("x", {
        status: 200,
        headers: { "content-type": "text/plain", "content-length": String(50 * 1024 * 1024) },
      })
  );
  assert.equal(
    await load(docsRoot, { fetchImpl: declaredHuge, cacheDir, version: "3.8.54-declared" }),
    null
  );

  const streamedHuge = fakeFetch(() => textResponse("é".repeat(400)));
  assert.equal(
    await load(docsRoot, {
      fetchImpl: streamedHuge,
      cacheDir,
      version: "3.8.54-streamed",
      maxBytes: 256,
    }),
    null
  );

  const serverError = fakeFetch(() => textResponse("boom", 500));
  assert.equal(
    await load(docsRoot, { fetchImpl: serverError, cacheDir, version: "3.8.54-500" }),
    null
  );

  const binary = fakeFetch(() => textResponse(MIRROR, 200, "application/octet-stream"));
  assert.equal(await load(docsRoot, { fetchImpl: binary, cacheDir, version: "3.8.54-bin" }), null);

  const networkError = fakeFetch(() => Promise.reject(new TypeError("fetch failed")));
  assert.equal(
    await load(docsRoot, { fetchImpl: networkError, cacheDir, version: "3.8.54-net" }),
    null
  );

  const redirected = fakeFetch(() => {
    const response = textResponse(MIRROR);
    Object.defineProperty(response, "url", { value: "https://evil.example/mirror.md" });
    return response;
  });
  assert.equal(
    await load(docsRoot, { fetchImpl: redirected, cacheDir, version: "3.8.54-redirect" }),
    null
  );

  assert.equal(fs.existsSync(cacheDir) && fs.readdirSync(cacheDir).length, 0, "nothing cached");
});

test("a network failure backs off: the next page does not wait on GitHub again", async (t) => {
  const docsRoot = npmDocsRoot(t);
  fs.mkdirSync(path.join(docsRoot, "guides"), { recursive: true });
  fs.writeFileSync(path.join(docsRoot, "guides", "I18N.md"), "# I18N\n");
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => Promise.reject(new TypeError("fetch failed")));
  const remote = { fetchImpl, cacheDir, version: "3.8.54-offline" };

  assert.equal(await load(docsRoot, remote), null);
  assert.equal(
    await load(docsRoot, remote, { slug: ["guides", "i18n"], sourcePath: "guides/I18N.md" }),
    null
  );
  assert.equal(fetchImpl.calls.length, 1, "an offline install pays the timeout once, not per page");
});

test("a body that is not UTF-8 is a miss for that page, not an offline version", async (t) => {
  const docsRoot = npmDocsRoot(t);
  fs.mkdirSync(path.join(docsRoot, "guides"), { recursive: true });
  fs.writeFileSync(path.join(docsRoot, "guides", "I18N.md"), "# I18N\n");
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch((url) =>
    url.endsWith(QUICK_START_SOURCE)
      ? new Response(new Uint8Array([0x23, 0x20, 0xff, 0xfe, 0xfd]), {
          status: 200,
          headers: { "content-type": "text/plain; charset=utf-8" },
        })
      : textResponse(MIRROR)
  );
  const remote = { fetchImpl, cacheDir, version: "3.8.54-utf8" };
  const guides = { slug: ["guides", "i18n"], sourcePath: "guides/I18N.md" };

  assert.equal(await load(docsRoot, remote), null, "the invalid body serves English");
  assert.ok(await load(docsRoot, remote, guides), "another page of the same version still fetches");
  assert.equal(await load(docsRoot, remote), null);
  assert.deepEqual(
    fetchImpl.calls.map((call) => call.url),
    [PINNED_URL("3.8.54-utf8"), PINNED_URL("3.8.54-utf8", "pt-BR", "guides/I18N.md")],
    "the invalid page is remembered as a miss and not fetched again"
  );
  assert.equal(
    fs.existsSync(path.join(cacheDir, "v3.8.54-utf8", "i18n", "pt-BR", "docs", "getting-started")),
    false,
    "nothing is cached for the invalid page"
  );
});

test("concurrent requests for the same page share one fetch", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(
    () => new Promise<Response>((resolve) => setTimeout(() => resolve(textResponse(MIRROR)), 20))
  );
  const remote = { fetchImpl, cacheDir, version: "3.8.54-dedupe" };

  const results = await Promise.all([load(docsRoot, remote), load(docsRoot, remote)]);
  assert.ok(results.every(Boolean));
  assert.equal(fetchImpl.calls.length, 1);
});

test("traversal, unknown locales, mismatched or excluded pages never reach fetch", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse(MIRROR));
  const remote = { fetchImpl, cacheDir, version: "3.8.54-guard" };

  const cases: Array<{ slug?: string[]; locale?: string; sourcePath?: string }> = [
    { locale: "../../etc" },
    { locale: "pt-BR/../../x" },
    { locale: "xx-YY" }, // well-formed but not a supported locale
    { locale: "en" },
    { slug: ["..", "quick-start"] },
    { slug: ["getting-started", "quick-start%2F.."] },
    { sourcePath: "getting-started/../../../etc/passwd.md" },
    { sourcePath: "guides/I18N.md" }, // does not match the requested slug
    { sourcePath: "https://evil.example/QUICK-START.md" },
    { sourcePath: "getting-started/QUICK-START.mdx" },
    { slug: ["security", "stealth_guide"], sourcePath: "security/STEALTH_GUIDE.md" },
    { slug: ["security", "public_creds"], sourcePath: "security/PUBLIC_CREDS.md" },
    { slug: ["internal", "notes"], sourcePath: "internal/NOTES.md" }, // not a runtime section
  ];
  for (const options of cases) {
    assert.equal(await load(docsRoot, remote, options), null, JSON.stringify(options));
  }
  assert.equal(
    await loadTranslatedDoc(QUICK_START_SLUG, "pt-BR", [], docsRoot, { remote }),
    null,
    "no source path, no remote lookup"
  );

  for (const version of ["../../x", "latest", "3.8", "3.8.54/../../main", ""]) {
    assert.equal(await load(docsRoot, { ...remote, version }), null, version);
  }
  assert.deepEqual(fetchImpl.calls, []);
});

test("an install that bundles docs/i18n never fetches, even for a missing mirror", async (t) => {
  const docsRoot = npmDocsRoot(t);
  fs.mkdirSync(path.join(docsRoot, "i18n", "es", "docs", "getting-started"), { recursive: true });
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse(MIRROR));

  assert.equal(await load(docsRoot, { fetchImpl, cacheDir, version: "3.8.54-bundled" }), null);
  assert.deepEqual(fetchImpl.calls, []);
});

test("the opt-out turns the remote lookup off", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch(() => textResponse(MIRROR));

  assert.equal(
    await load(docsRoot, { fetchImpl, cacheDir, version: "3.8.54-off", enabled: false }),
    null
  );

  const previous = process.env.OMNIROUTE_DOCS_I18N_REMOTE;
  t.after(() => {
    if (previous === undefined) delete process.env.OMNIROUTE_DOCS_I18N_REMOTE;
    else process.env.OMNIROUTE_DOCS_I18N_REMOTE = previous;
  });
  for (const value of ["false", "0", "off", "FALSE"]) {
    process.env.OMNIROUTE_DOCS_I18N_REMOTE = value;
    assert.equal(await load(docsRoot, { fetchImpl, cacheDir, version: "3.8.54-env" }), null);
  }
  assert.deepEqual(fetchImpl.calls, []);
});

test("an upgrade gets its own cache key and fetches from its own tag", async (t) => {
  const docsRoot = npmDocsRoot(t);
  const cacheDir = tempDir(t, "omniroute-docs-cache-");
  const fetchImpl = fakeFetch((url) =>
    textResponse(MIRROR.replace("Texto traduzido", url.includes("v3.9.0-up") ? "Novo" : "Antigo"))
  );

  const before = await load(docsRoot, { fetchImpl, cacheDir, version: "3.8.99-up" });
  const after = await load(docsRoot, { fetchImpl, cacheDir, version: "3.9.0-up" });
  assert.match(before?.html ?? "", /Antigo/);
  assert.match(after?.html ?? "", /Novo/, "the upgrade never serves the previous version's file");
  assert.deepEqual(
    fetchImpl.calls.map((call) => call.url),
    [PINNED_URL("3.8.99-up"), PINNED_URL("3.9.0-up")]
  );
  assert.deepEqual(fs.readdirSync(cacheDir).sort(), ["v3.8.99-up", "v3.9.0-up"]);
});

test("buildDocsMirrorUrl only ever targets the pinned GitHub raw host", async () => {
  const { buildDocsMirrorUrl } = await import("../../src/lib/docsI18nRemote.ts");
  assert.equal(
    buildDocsMirrorUrl("3.8.54", "docs/i18n/zh-CN/docs/routing/AUTO-COMBO.md"),
    "https://raw.githubusercontent.com/cheaper-inference/OmniRoute/v3.8.54/docs/i18n/zh-CN/docs/routing/AUTO-COMBO.md"
  );
  assert.equal(buildDocsMirrorUrl("3.8.54", "docs/i18n/zh-CN/docs/security/PUBLIC_CREDS.md"), null);
  assert.equal(buildDocsMirrorUrl("3.8.54", "docs/i18n/zh-CN/../../README.md"), null);
  assert.equal(buildDocsMirrorUrl("main", "docs/i18n/zh-CN/docs/routing/AUTO-COMBO.md"), null);
});
