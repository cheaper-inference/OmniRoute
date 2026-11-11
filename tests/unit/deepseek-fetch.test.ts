import test from "node:test";
import assert from "node:assert/strict";

const { deepseekFetch } = await import("../../open-sse/executors/deepseek-fetch.ts");

test("deepseekFetch posts the url to /v1/tools/fetch and returns the markdown", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: Record<string, unknown> } = {
    url: "",
    headers: {},
    body: {},
  };

  globalThis.fetch = async (url, init = {}) => {
    const request = init as RequestInit;
    captured = {
      url: String(url),
      headers: request.headers as Record<string, string>,
      body: JSON.parse(String(request.body || "{}")),
    };
    return new Response(
      JSON.stringify({ title: "Example article", content: "# Example article\n\nBody." }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "sk-deepseek" },
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.deepseek.com/v1/tools/fetch");
    assert.equal(captured.headers.Authorization, "Bearer sk-deepseek");
    assert.deepEqual(captured.body, { url: "https://example.com/a" });
    assert.equal(result.data?.provider, "deepseek-search");
    assert.equal(result.data?.content, "# Example article\n\nBody.");
    assert.equal(result.data?.metadata?.title, "Example article");
    assert.deepEqual(result.data?.links, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deepseekFetch rejects a format it cannot return", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "html",
      includeMetadata: false,
      credentials: { apiKey: "sk-deepseek" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(called, false, "must not call DeepSeek for a format it cannot return");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deepseekFetch omits metadata when it was not asked for", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ title: "Example article", content: "body" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "sk-deepseek" },
    });

    assert.equal(result.success, true);
    assert.equal(result.data?.metadata, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deepseekFetch refuses to call out without an API key", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "markdown",
      includeMetadata: false,
      credentials: {},
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deepseekFetch reports a malformed body instead of an empty page", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ title: "Example" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "sk-deepseek" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("deepseekFetch forwards an upstream error status without echoing the key", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response("invalid key sk-deepseek", { status: 401, statusText: "Unauthorized" });

  try {
    const result = await deepseekFetch({
      url: "https://example.com/a",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "sk-deepseek" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.ok(result.error, "should carry an error message");
    assert.ok(!result.error!.includes("sk-deepseek"), "error must not echo the API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
