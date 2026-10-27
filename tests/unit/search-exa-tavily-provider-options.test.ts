import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-passthrough-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { v1SearchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");

const DAY_MS = 86_400_000;

type Captured = Record<string, unknown> & { contents?: Record<string, unknown> };

async function runSearch(
  options: Record<string, unknown>,
  upstream: Record<string, unknown> = { results: [] }
): Promise<{ body: Captured; result: Awaited<ReturnType<typeof handleSearch>> }> {
  const originalFetch = globalThis.fetch;
  let body: Captured = {};
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    body = JSON.parse(String(init.body || "{}"));
    return new Response(JSON.stringify(upstream), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    const result = await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "test-key" },
      log: null,
      ...options,
    } as Parameters<typeof handleSearch>[0]);
    return { body, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("Exa: forwards allow-listed provider_options.exa fields and contents", async () => {
  const { body } = await runSearch({
    provider: "exa-search",
    providerOptions: {
      exa: {
        type: "deep",
        category: "research paper",
        userLocation: "US",
        additionalQueries: ["gpu roadmap"],
        systemPrompt: "be terse",
        compliance: { hipaa: true },
        contents: {
          summary: { query: "key risks" },
          extras: { links: 3 },
          maxAgeHours: 48,
        },
      },
    },
  });

  assert.equal(body.type, "deep");
  assert.equal(body.category, "research paper");
  assert.equal(body.userLocation, "US");
  assert.deepEqual(body.additionalQueries, ["gpu roadmap"]);
  assert.equal(body.systemPrompt, "be terse");
  assert.deepEqual(body.compliance, { hipaa: true });
  assert.deepEqual(body.contents, {
    text: true,
    highlights: true,
    summary: { query: "key risks" },
    extras: { links: 3 },
    maxAgeHours: 48,
  });
  assert.equal(body.query, "kubernetes gateway api");
  assert.equal(body.numResults, 5);
});

test("Exa: accepts the registry id as the namespace too", async () => {
  const { body } = await runSearch({
    provider: "exa-search",
    providerOptions: { "exa-search": { category: "company" } },
  });
  assert.equal(body.category, "company");
});

test("Exa: never forwards stream, outputSchema, unknown keys or auth overrides", async () => {
  const { body } = await runSearch({
    provider: "exa-search",
    providerOptions: {
      exa: {
        stream: true,
        outputSchema: { type: "object" },
        apiKey: "attacker",
        query: "overridden",
        numResults: 99,
        includeDomains: ["evil.example"],
        contents: { text: { maxCharacters: 500, injected: "x" }, livecrawl: "always" },
      },
    },
  });

  assert.equal(body.stream, undefined);
  assert.equal(body.outputSchema, undefined);
  assert.equal(body.apiKey, undefined);
  assert.equal(body.query, "kubernetes gateway api");
  assert.equal(body.numResults, 5);
  assert.equal(body.includeDomains, undefined);
  // Nested objects are re-built from their own allow-list: unknown nested keys are stripped.
  assert.deepEqual(body.contents, { text: { maxCharacters: 500 }, highlights: true });
});

test("Exa: drops fields whose type does not match instead of forwarding them", async () => {
  const { body } = await runSearch({
    provider: "exa-search",
    providerOptions: {
      exa: {
        type: 42,
        moderation: "yes",
        additionalQueries: "not-an-array",
        startPublishedDate: "not a date",
        compliance: { nested: { deep: true } },
        contents: { subpages: -1 },
      },
    },
  });

  assert.equal(body.type, "auto");
  assert.equal(body.moderation, undefined);
  assert.equal(body.additionalQueries, undefined);
  assert.equal(body.startPublishedDate, undefined);
  assert.equal(body.compliance, undefined);
  assert.deepEqual(body.contents, { text: true, highlights: true });
});

test("Exa: search_type news keeps category news over provider_options", async () => {
  const { body } = await runSearch({
    provider: "exa-search",
    searchType: "news",
    domainFilter: ["arxiv.org", "-example.com"],
    providerOptions: { exa: { category: "company" } },
  });
  assert.equal(body.category, "news");
  assert.deepEqual(body.includeDomains, ["arxiv.org"]);
  assert.deepEqual(body.excludeDomains, ["example.com"]);
});

test("Exa: time_range maps to startPublishedDate and an explicit date wins", async () => {
  const { body: mapped } = await runSearch({ provider: "exa-search", timeRange: "week" });
  assert.match(String(mapped.startPublishedDate), /^\d{4}-\d{2}-\d{2}T/);
  const ageDays = (Date.now() - Date.parse(String(mapped.startPublishedDate))) / DAY_MS;
  assert.ok(ageDays > 6.9 && ageDays < 7.1, `expected ~7 days, got ${ageDays}`);

  const { body: explicit } = await runSearch({
    provider: "exa-search",
    timeRange: "week",
    providerOptions: { exa: { startPublishedDate: "2026-01-01T00:00:00Z" } },
  });
  assert.equal(explicit.startPublishedDate, "2026-01-01T00:00:00Z");

  const { body: anyRange } = await runSearch({ provider: "exa-search", timeRange: "any" });
  assert.equal(anyRange.startPublishedDate, undefined);
});

test("Tavily: forwards allow-listed provider_options.tavily fields", async () => {
  const { body } = await runSearch({
    provider: "tavily-search",
    providerOptions: {
      tavily: {
        search_depth: "advanced",
        chunks_per_source: 3,
        include_answer: "advanced",
        include_raw_content: "markdown",
        include_images: true,
        include_image_descriptions: true,
        include_favicon: true,
        include_domains_mode: "promote",
        language: "en",
        filter_by_language: true,
        auto_parameters: true,
        exact_match: true,
        include_usage: true,
        safe_search: true,
      },
    },
  });

  assert.equal(body.search_depth, "advanced");
  assert.equal(body.chunks_per_source, 3);
  assert.equal(body.include_answer, "advanced");
  assert.equal(body.include_raw_content, "markdown");
  assert.equal(body.include_images, true);
  assert.equal(body.include_image_descriptions, true);
  assert.equal(body.include_favicon, true);
  assert.equal(body.include_domains_mode, "promote");
  assert.equal(body.language, "en");
  assert.equal(body.filter_by_language, true);
  assert.equal(body.auto_parameters, true);
  assert.equal(body.exact_match, true);
  assert.equal(body.include_usage, true);
  assert.equal(body.safe_search, true);
  assert.equal(body.topic, "general");
});

test("Tavily: generic contract wins over provider_options and bad values are dropped", async () => {
  const { body } = await runSearch({
    provider: "tavily-search",
    searchType: "news",
    country: "us",
    domainFilter: ["sec.gov", "-spam.example"],
    providerOptions: {
      "tavily-search": {
        topic: "finance",
        max_results: 99,
        include_domains: ["evil.example"],
        exclude_domains: ["good.example"],
        country: "de",
        search_depth: "ludicrous",
        chunks_per_source: 50,
        api_key: "attacker",
      },
    },
  });

  assert.equal(body.topic, "news");
  assert.equal(body.max_results, 5);
  assert.deepEqual(body.include_domains, ["sec.gov"]);
  assert.deepEqual(body.exclude_domains, ["spam.example"]);
  assert.equal(body.country, "us");
  assert.equal(body.search_depth, undefined);
  assert.equal(body.chunks_per_source, undefined);
  assert.equal(body.api_key, undefined);
});

test("Tavily: time_range maps to start_date and an explicit date wins", async () => {
  const { body: mapped } = await runSearch({ provider: "tavily-search", timeRange: "month" });
  assert.match(String(mapped.start_date), /^\d{4}-\d{2}-\d{2}$/);
  const ageDays = (Date.now() - Date.parse(String(mapped.start_date))) / DAY_MS;
  assert.ok(ageDays > 27 && ageDays < 33, `expected ~1 month, got ${ageDays}`);

  const { body: explicit } = await runSearch({
    provider: "tavily-search",
    timeRange: "month",
    providerOptions: { tavily: { start_date: "2026-02-01", end_date: "2026-02-28" } },
  });
  assert.equal(explicit.start_date, "2026-02-01");
  assert.equal(explicit.end_date, "2026-02-28");

  const { body: badDate } = await runSearch({
    provider: "tavily-search",
    providerOptions: { tavily: { start_date: "yesterday" } },
  });
  assert.equal(badDate.start_date, undefined);
});

test("Tavily: search_type finance becomes topic finance and is accepted end to end", async () => {
  assert.ok(SEARCH_PROVIDERS["tavily-search"].searchTypes.includes("finance"));
  assert.equal(SEARCH_PROVIDERS["exa-search"].searchTypes.includes("finance"), false);

  const parsed = v1SearchSchema.safeParse({ query: "nvidia earnings", search_type: "finance" });
  assert.equal(parsed.success, true);

  const { body } = await runSearch({ provider: "tavily-search", searchType: "finance" });
  assert.equal(body.topic, "finance");
});

test("Normalizers keep Exa and Tavily extras in provider_raw", async () => {
  const { result: exa } = await runSearch(
    { provider: "exa-search" },
    {
      results: [
        {
          id: "exa-result-1",
          title: "Gateway API",
          url: "https://gateway-api.sigs.k8s.io/",
          highlights: ["Stable in 1.2"],
          highlightScores: [0.98],
          summary: "Kubernetes Gateway API graduated.",
          subpages: [{ url: "https://example.com/sub" }],
          extras: { links: ["https://example.com/a"] },
        },
        { title: "Plain", url: "https://example.com" },
      ],
    }
  );
  assert.equal(exa.success, true);
  assert.deepEqual(exa.data?.results[0].provider_raw, {
    id: "exa-result-1",
    highlight_scores: [0.98],
    summary: "Kubernetes Gateway API graduated.",
    subpages: [{ url: "https://example.com/sub" }],
    extras: { links: ["https://example.com/a"] },
  });
  assert.equal(exa.data?.results[1].provider_raw, null);

  const { result: tavily } = await runSearch(
    { provider: "tavily-search" },
    {
      results: [
        {
          title: "Earnings call",
          url: "https://investor.example.com/",
          content: "Revenue grew.",
          images: ["https://investor.example.com/chart.png"],
          favicon: "https://investor.example.com/favicon.ico",
        },
        { title: "Plain", url: "https://example.com", content: "x" },
      ],
    }
  );
  assert.equal(tavily.success, true);
  assert.deepEqual(tavily.data?.results[0].provider_raw, {
    images: ["https://investor.example.com/chart.png"],
    favicon: "https://investor.example.com/favicon.ico",
  });
  assert.equal(tavily.data?.results[1].provider_raw, null);
});

test("Flat provider_options keys for other providers keep working", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  globalThis.fetch = async (url: string | URL | Request) => {
    capturedUrl = String(url);
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    await handleSearch({
      query: "flat keys",
      provider: "google-pse-search",
      maxResults: 5,
      searchType: "web",
      providerOptions: { cx: "flat-cx-id" },
      credentials: { apiKey: "google-key" },
      log: null,
    } as Parameters<typeof handleSearch>[0]);
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.match(capturedUrl, /cx=flat-cx-id/);
});
