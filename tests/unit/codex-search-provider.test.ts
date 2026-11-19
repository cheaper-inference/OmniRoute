import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  SEARCH_PROVIDERS,
  getSearchCredentialFallbacks,
  resolveSearchProvider,
  selectProvider,
} from "../../open-sse/config/searchRegistry.ts";
import {
  buildCodexSearchRequest,
  parseCodexSearchSse,
  CodexSearchError,
  CODEX_SEARCH_MAX_BYTES,
} from "../../open-sse/handlers/search/codexSearch.ts";
import { getCodexBackendIdentityHeaders } from "../../open-sse/config/codexClient.ts";
import { handleSearch } from "../../open-sse/handlers/search.ts";

test.after(async () => {
  const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await closeCallLogSaves(500);
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});

const config = SEARCH_PROVIDERS["codex-search"];
const params = { query: "Hermes release", maxResults: 5, token: "synthetic-token" };
const fixture = (name: string) =>
  readFileSync(new URL(`../fixtures/codex-search/${name}`, import.meta.url), "utf8");
const event = (type: string, data: Record<string, unknown> = {}) =>
  `event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`;
const call = (urls: string[]) =>
  event("response.output_item.done", {
    item: {
      type: "web_search_call",
      action: { type: "search", sources: urls.map((url) => ({ type: "url", url })) },
    },
  });
const message = (annotations: unknown[], text = "") =>
  event("response.output_item.done", {
    item: { type: "message", content: [{ type: "output_text", text, annotations }] },
  });
const output = (results: unknown[]) =>
  event("response.output_text.done", { text: JSON.stringify({ results }) });
const completed = event("response.completed", { response: { status: "completed" } });

function assertFailure(text: string, status = 502) {
  assert.throws(
    () => parseCodexSearchSse(text, 5),
    (error: unknown) => {
      assert.ok(error instanceof CodexSearchError);
      assert.equal(error.message, "Codex web search failed");
      assert.equal(error.statusHint, status);
      return true;
    }
  );
}

test("codex-search is a subscription-backed last resort, without a colliding codex alias", () => {
  assert.equal(config.fallbackOnly, true);
  assert.equal(config.method, "POST");
  assert.equal(config.authType, "apikey");
  assert.equal(config.authHeader, "bearer");
  assert.equal(config.costPerQuery, 0);
  assert.equal(config.freeMonthlyQuota, 0);
  assert.equal(config.defaultMaxResults, 5);
  assert.equal(config.maxMaxResults, 10);
  assert.equal(config.timeoutMs, 60_000);
  assert.equal(config.cacheTTLMs, 600_000);
  assert.deepEqual(config.searchTypes, ["web", "news"]);
  assert.deepEqual(getSearchCredentialFallbacks("codex-search"), ["codex"]);
  assert.equal(resolveSearchProvider("codex_search"), config);
  assert.equal(resolveSearchProvider("codex"), null);
  assert.equal(selectProvider(undefined, "web")?.id, "ollama-search");
});

test("request targets the responses URL once and uses Codex/account headers and required web_search", () => {
  const { url, init } = buildCodexSearchRequest(config, {
    ...params,
    providerSpecificData: { workspaceId: "synthetic-account" },
  });
  assert.equal(url, "https://chatgpt.com/backend-api/codex/responses");
  assert.equal(init.method, "POST");
  assert.equal(init.redirect, "error");
  assert.deepEqual(init.headers, {
    ...getCodexBackendIdentityHeaders(),
    Authorization: "Bearer synthetic-token",
    "Content-Type": "application/json",
    Accept: "text/event-stream",
    "chatgpt-account-id": "synthetic-account",
  });
  const body = JSON.parse(String(init.body));
  assert.equal(body.model, "gpt-6-luna");
  assert.deepEqual(body.reasoning, { effort: "low" });
  assert.deepEqual(body.input, [
    { role: "user", content: [{ type: "input_text", text: params.query }] },
  ]);
  assert.deepEqual(body.tools, [{ type: "web_search" }]);
  assert.equal(body.tool_choice, "required");
  assert.deepEqual(body.include, ["web_search_call.action.sources"]);
  assert.equal(body.stream, true);
  assert.equal(body.store, false);
  assert.equal(body.max_tool_calls, undefined);
  assert.equal(body.max_output_tokens, undefined);
});

test("model overrides prefer request model, then connection searchModel; incompatible efforts clamp to low", () => {
  for (const effort of [
    undefined,
    "minimal",
    "none",
    "invalid",
    "low",
    "medium",
    "high",
    "xhigh",
  ]) {
    const request = buildCodexSearchRequest(config, {
      ...params,
      providerOptions: { model: "request-model", reasoning_effort: effort },
      providerSpecificData: { searchModel: "connection-model" },
    });
    const body = JSON.parse(String(request.init.body));
    assert.equal(body.model, "request-model");
    assert.equal(
      body.reasoning.effort,
      ["medium", "high", "xhigh"].includes(String(effort)) ? effort : "low"
    );
  }
  assert.equal(
    JSON.parse(
      String(
        buildCodexSearchRequest(config, {
          ...params,
          providerSpecificData: { searchModel: "connection-model" },
        }).init.body
      )
    ).model,
    "connection-model"
  );
});

test("news, time range, and include/exclude domains are instruction hints, not unsupported fields", () => {
  const body = JSON.parse(
    String(
      buildCodexSearchRequest(config, {
        ...params,
        searchType: "news",
        timeRange: "week",
        domainFilter: ["example.com", "-excluded.example"],
      }).init.body
    )
  );
  assert.match(body.instructions, /recent news/);
  assert.match(body.instructions, /last week/);
  assert.match(body.instructions, /Prefer these domains: example.com/);
  assert.match(body.instructions, /Avoid these domains: excluded.example/);
  assert.equal(body.filters, undefined);
  assert.equal(body.time_range, undefined);
});

test("caller baseUrl cannot redirect the OAuth token", () => {
  assert.throws(
    () =>
      buildCodexSearchRequest(config, {
        ...params,
        providerOptions: { baseUrl: "https://attacker.example/responses" },
      }),
    /not accepted/
  );
});

for (const [name, rows, tokens] of [
  ["real_en_hermes_release.sse", 1, 12879],
  ["real_en_ref_param.sse", 1, 8807],
  ["real_zh_beijing_weather.sse", 4, 8755],
] as const) {
  test(`parses real upstream fixture ${name} with grounded rows and upstream usage`, () => {
    const text = fixture(name);
    assert.match(text, /\ndata: [^\n]+\n$/);
    assert.ok(!text.endsWith("\n\n"), "fixture must not end with a blank line");
    const parsed = parseCodexSearchSse(text, 10);
    assert.deepEqual(parsed, parseCodexSearchSse(text + "\n", 10));
    assert.equal(parsed.results.length, rows);
    assert.equal(parsed.searches, 1);
    assert.equal(parsed.usage.input_tokens, tokens);
    assert.ok(
      parsed.results.every((row) => row.title && row.snippet && !row.url.includes("utm_source"))
    );
    assert.equal(parseCodexSearchSse(fixture(name), 1).results.length, 1);
  });
}

test("query-string differences ground by host+path and preserve the model's title and description", () => {
  assert.deepEqual(parseCodexSearchSse(fixture("real_en_ref_param.sse"), 5).results[0], {
    url: "https://github.com/NousResearch/hermes-agent/releases",
    title: "NousResearch/hermes-agent releases",
    snippet:
      "The official GitHub releases page for Hermes Agent. Search results indicate the latest stable release is v0.22.3.",
  });
});

test("rejects invented host/path rows; dedupes www/case/trailing slash and strips only utm_source", () => {
  const text =
    call(["https://www.example.com/a/?ref=source"]) +
    output([
      {
        url: "https://example.com/a?ref=kept&utm_source=openai",
        title: "Grounded",
        description: "Model snippet",
      },
      { url: "https://WWW.EXAMPLE.COM/a/", title: "Duplicate" },
      { url: "https://example.com/unobserved", title: "Invented path" },
      { url: "https://unobserved.example/a", title: "Invented host" },
    ]) +
    completed;
  assert.deepEqual(parseCodexSearchSse(text, 5).results, [
    { url: "https://example.com/a?ref=kept", title: "Grounded", snippet: "Model snippet" },
  ]);
});

test("unparseable or ungrounded model output falls back to annotations, then observed sources", () => {
  const annotation = {
    type: "url_citation",
    url: "https://example.com/cited?ref=keep&utm_source=openai",
    title: "Cited title",
  };
  assert.deepEqual(
    parseCodexSearchSse(
      call(["https://example.com/source"]) + message([annotation], "not JSON") + completed,
      5
    ).results,
    [{ url: "https://example.com/cited?ref=keep", title: "Cited title", snippet: "" }]
  );
  assert.deepEqual(
    parseCodexSearchSse(
      call(["https://example.com/source", "https://www.example.com/source/?utm_source=openai"]) +
        output([{ url: "https://other.example/invented" }]) +
        completed,
      5
    ).results,
    [{ url: "https://example.com/source", title: "example.com", snippet: "" }]
  );
});

test("open_page URLs are observed, message snapshots work without output_text.done, CRLF is accepted", () => {
  const text =
    event("response.output_item.done", {
      item: {
        type: "web_search_call",
        action: { type: "open_page", url: "https://example.com/open" },
      },
    }) +
    message(
      [],
      JSON.stringify({ results: [{ url: "https://example.com/open", title: "Opened" }] })
    ) +
    completed;
  assert.equal(parseCodexSearchSse(text.replace(/\n/g, "\r\n"), 5).results[0].title, "Opened");
});

test("zero tool calls, incomplete streams, malformed SSE, and oversized UTF-8 payloads fail closed", () => {
  assertFailure(output([{ url: "https://invented.example" }]) + completed);
  assertFailure(call(["https://example.com"]));
  assertFailure("event: response.completed\ndata: {broken}\n\n");
  assertFailure("not SSE");
  assertFailure("中".repeat(Math.ceil(CODEX_SEARCH_MAX_BYTES / 3)));
});

for (const type of ["error", "response.failed"]) {
  test(`${type} maps overload/auth/quota without leaking upstream messages`, () => {
    for (const [code, status] of [
      ["server_is_overloaded", 503],
      ["invalid_api_key", 401],
      ["insufficient_quota", 429],
    ] as const) {
      const error = { code, message: "secret upstream detail" };
      assertFailure(event(type, type === "error" ? { error } : { response: { error } }), status);
    }
  });
}

async function withFetch(stub: typeof fetch, run: () => Promise<void>) {
  const original = globalThis.fetch;
  globalThis.fetch = stub;
  try {
    await run();
  } finally {
    globalThis.fetch = original;
  }
}
const search = (overrides: Partial<Parameters<typeof handleSearch>[0]> = {}) =>
  handleSearch({
    query: "Hermes",
    provider: "codex-search",
    searchType: "web",
    maxResults: 5,
    credentials: { accessToken: "synthetic-oauth" },
    ...overrides,
  });

test("dedicated SSE dispatch returns unified citations and actual search count", async () => {
  await withFetch(
    async (url, init) => {
      assert.equal(String(url), config.baseUrl);
      assert.equal(new Headers(init?.headers).get("authorization"), "Bearer synthetic-oauth");
      return new Response(fixture("real_en_ref_param.sse"));
    },
    async () => {
      const result = await search();
      assert.equal(result.success, true);
      assert.equal(result.data?.results[0].citation.provider, "codex-search");
      assert.equal(
        result.data?.results[0].snippet,
        "The official GitHub releases page for Hermes Agent. Search results indicate the latest stable release is v0.22.3."
      );
      assert.deepEqual(result.data?.usage, { queries_used: 1, search_cost_usd: 0 });
    }
  );
});

test("HTTP 401 stays non-retriable, and the real minimal-effort HTTP 400 body stays private", async () => {
  for (const status of [401, 400]) {
    let calls = 0;
    await withFetch(
      async () => {
        calls++;
        return new Response(fixture("real_err_minimal_effort.err.json"), { status });
      },
      async () => {
        const result = await search({
          alternateProvider: "brave-search",
          alternateCredentials: { apiKey: "alternate" },
        });
        assert.equal(result.status, status);
        assert.equal(result.error, "Codex web search failed");
        assert.equal(calls, 1);
      }
    );
  }
});

test("stream read is capped at 4 MB and cancels the reader", async () => {
  let cancelled = false;
  await withFetch(
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(CODEX_SEARCH_MAX_BYTES + 1));
          },
          cancel() {
            cancelled = true;
          },
        })
      ),
    async () => {
      assert.equal((await search()).status, 502);
      assert.equal(cancelled, true);
    }
  );
});

test("timeout remains armed while an SSE body stalls after HTTP headers", async () => {
  let cancelled = false;
  await withFetch(
    async () =>
      new Response(
        new ReadableStream({
          cancel() {
            cancelled = true;
          },
        })
      ),
    async () => {
      const result = await search({ providerTimeoutsMs: { "codex-search": 20 } });
      assert.equal(result.status, 504);
      assert.equal(cancelled, true);
    }
  );
});
