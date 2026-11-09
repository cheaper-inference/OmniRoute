import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isUrlHost, isUrlHostOrSubdomain, urlHostname } from "../../open-sse/utils/urlHost.ts";
import { isOfficialAnthropicBaseUrl } from "../../open-sse/utils/anthropicHost.ts";
import { getTavilyBaseUrl } from "../../open-sse/services/tavilyQuotaFetcher.ts";
import { getFirecrawlBaseUrl } from "../../open-sse/services/firecrawlQuotaFetcher.ts";

// CodeQL js/incomplete-url-substring-sanitization: a base URL must be recognised by its
// parsed hostname, never by `.includes("api.example.com")`, which a look-alike upstream
// (`https://api.example.com.evil.test`, `https://evil.test/?x=api.example.com`) passes.

test("urlHostname parses scheme, scheme-less, port and path forms and lowercases the host", () => {
  assert.equal(urlHostname("https://api.tavily.com"), "api.tavily.com");
  assert.equal(urlHostname("https://API.Tavily.COM/v1/"), "api.tavily.com");
  assert.equal(urlHostname("http://localhost:3000/path?x=1"), "localhost");
  assert.equal(urlHostname("api.tavily.com"), "api.tavily.com", "scheme-less host");
  assert.equal(urlHostname("api.tavily.com/v1"), "api.tavily.com", "scheme-less host + path");
  assert.equal(urlHostname("localhost:3000"), "localhost", "scheme-less host + port");
});

test("urlHostname is null for empty or unparseable input", () => {
  assert.equal(urlHostname(""), null);
  assert.equal(urlHostname("   "), null);
  assert.equal(urlHostname(undefined), null);
  assert.equal(urlHostname(null), null);
  assert.equal(urlHostname("http://"), null);
  assert.equal(urlHostname(":::"), null);
});

test("isUrlHost is exact hostname equality, so look-alikes never match", () => {
  assert.equal(isUrlHost("https://api.tavily.com", "api.tavily.com"), true);
  assert.equal(isUrlHost("https://api.tavily.com/search", "api.tavily.com"), true);
  assert.equal(isUrlHost("api.tavily.com", "api.tavily.com"), true);
  assert.equal(
    isUrlHost("https://api.tavily.com", "API.TAVILY.COM"),
    true,
    "expected host is case-insensitive"
  );
  // The exact strings a substring check would have wrongly accepted:
  assert.equal(isUrlHost("https://api.tavily.com.evil.test", "api.tavily.com"), false);
  assert.equal(isUrlHost("https://evil.test/?x=api.tavily.com", "api.tavily.com"), false);
  assert.equal(isUrlHost("https://evil.test/api.tavily.com", "api.tavily.com"), false);
  assert.equal(isUrlHost("https://proxy.tavily.com", "api.tavily.com"), false);
  assert.equal(isUrlHost("", "api.tavily.com"), false);
  assert.equal(isUrlHost(":::", "api.tavily.com"), false);
});

test("isUrlHostOrSubdomain accepts the domain and its subdomains only", () => {
  assert.equal(isUrlHostOrSubdomain("https://moonshot.cn", "moonshot.cn"), true);
  assert.equal(isUrlHostOrSubdomain("https://api.moonshot.cn/v1", "moonshot.cn"), true);
  assert.equal(isUrlHostOrSubdomain("https://notmoonshot.cn", "moonshot.cn"), false);
  assert.equal(isUrlHostOrSubdomain("https://moonshot.cn.evil.test", "moonshot.cn"), false);
  assert.equal(isUrlHostOrSubdomain("https://evil.test/?x=moonshot.cn", "moonshot.cn"), false);
  assert.equal(isUrlHostOrSubdomain("", "moonshot.cn"), false);
});

test("isOfficialAnthropicBaseUrl keeps its contract on top of the shared helper", () => {
  assert.equal(isOfficialAnthropicBaseUrl(""), true, "empty baseUrl = default official");
  assert.equal(isOfficialAnthropicBaseUrl("api.anthropic.com/v1"), true);
  assert.equal(isOfficialAnthropicBaseUrl("https://api.anthropic.com.evil.test"), false);
  assert.equal(isOfficialAnthropicBaseUrl("http://"), false);
});

test("quota fetchers treat a look-alike host as a custom base instead of silently ignoring it", (t) => {
  const prevTavily = process.env.TAVILY_BASE_URL;
  const prevFirecrawl = process.env.FIRECRAWL_BASE_URL;
  t.after(() => {
    if (prevTavily === undefined) delete process.env.TAVILY_BASE_URL;
    else process.env.TAVILY_BASE_URL = prevTavily;
    if (prevFirecrawl === undefined) delete process.env.FIRECRAWL_BASE_URL;
    else process.env.FIRECRAWL_BASE_URL = prevFirecrawl;
  });

  process.env.TAVILY_BASE_URL = "https://api.tavily.com/";
  assert.equal(getTavilyBaseUrl(), null, "the official host is not a custom base");
  process.env.TAVILY_BASE_URL = "https://api.tavily.com.evil.test/v1/";
  assert.equal(getTavilyBaseUrl(), "https://api.tavily.com.evil.test/v1");
  process.env.TAVILY_BASE_URL = "https://gateway.example.test/tavily/";
  assert.equal(getTavilyBaseUrl(), "https://gateway.example.test/tavily");
  delete process.env.TAVILY_BASE_URL;
  assert.equal(getTavilyBaseUrl({ baseUrl: "https://api.tavily.com" }), null);
  assert.equal(
    getTavilyBaseUrl({ baseUrl: "https://evil.test/?x=api.tavily.com" }),
    "https://evil.test/?x=api.tavily.com"
  );

  process.env.FIRECRAWL_BASE_URL = "https://api.firecrawl.dev";
  assert.equal(getFirecrawlBaseUrl(), null);
  process.env.FIRECRAWL_BASE_URL = "https://api.firecrawl.dev.evil.test";
  assert.equal(getFirecrawlBaseUrl(), "https://api.firecrawl.dev.evil.test");
  delete process.env.FIRECRAWL_BASE_URL;
  assert.equal(
    getFirecrawlBaseUrl({ baseUrl: "api.firecrawl.dev/v1" }),
    null,
    "scheme-less official"
  );
});

// Regression guard: the migrated sites must not grow a substring host check back.
const GUARDED: Array<{ file: string; forbidden: RegExp }> = [
  { file: "open-sse/utils/anthropicHost.ts", forbidden: /\.includes\("api\.anthropic\.com"\)/ },
  {
    file: "open-sse/services/tavilyQuotaFetcher.ts",
    forbidden: /\.includes\("api\.tavily\.com"\)/,
  },
  {
    file: "open-sse/services/firecrawlQuotaFetcher.ts",
    forbidden: /\.includes\("api\.firecrawl\.dev"\)/,
  },
  { file: "open-sse/config/glmProvider.ts", forbidden: /\.includes\("open\.bigmodel\.cn"\)/ },
  { file: "open-sse/services/moonshotQuotaFetcher.ts", forbidden: /\.includes\("moonshot\.cn"\)/ },
];

test("migrated call sites use the urlHost helper instead of a substring host check", () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  for (const { file, forbidden } of GUARDED) {
    const source = readFileSync(path.join(root, file), "utf8");
    assert.ok(!forbidden.test(source), `${file} must not substring-match a hostname`);
    assert.ok(source.includes("urlHost"), `${file} is expected to import from utils/urlHost.ts`);
  }
});
