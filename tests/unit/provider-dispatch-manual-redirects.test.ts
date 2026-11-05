// Provider dispatch follows redirects by hand. Every hop gets the SSRF string guard and
// the connect-time guard, a cross-origin hop loses the credential headers, and a Location that
// points at cloud metadata (or loopback in public-only mode) is never fetched.
// No real network: loopback servers or a stubbed globalThis.fetch only.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { fetch as nativeFetch } from "undici";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { dispatchGuarded } from "../../open-sse/executors/dispatchPin.ts";

const LOCAL_ENV = "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS";

function listen(handler: http.RequestListener): Promise<{ server: http.Server; port: number }> {
  return new Promise((res) => {
    const server = http
      .createServer(handler)
      .listen(0, "127.0.0.1", () =>
        res({ server, port: (server.address() as { port: number }).port })
      );
  });
}

type Call = { url: string; init: RequestInit & { dispatcher?: unknown } };

/** Stub fetch: answers each URL from `routes` (status + optional Location) and records calls. */
function stubFetch(
  t: test.TestContext,
  routes: Record<string, [number, string | undefined]>
): Call[] {
  const calls: Call[] = [];
  t.mock.method(globalThis, "fetch", async (url: string, init: Call["init"]) => {
    calls.push({ url: String(url), init });
    const [status, location] = routes[String(url)] ?? [599];
    return new Response(status === 200 ? "{}" : null, {
      status,
      headers: location ? { location } : {},
    });
  });
  return calls;
}

const POST = {
  method: "POST",
  headers: {
    authorization: "Bearer sk-test",
    "x-api-key": "sk-test",
    "x-custom-token": "t",
    "content-type": "application/json",
    accept: "application/json",
  },
  body: '{"prompt":"TOP-SECRET-PROMPT"}',
};
const OVERRIDE = { providerSpecificData: { baseUrl: "https://a.example/v1" } };

test("executor: a cross-origin 307 keeps POST and body but drops the API key", async () => {
  const seen: Record<string, string | undefined> = {};
  const b = await listen((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      seen.method = req.method;
      seen.xApiKey = req.headers["x-api-key"] as string | undefined;
      seen.authorization = req.headers.authorization;
      seen.bodyHasPrompt = String(body.includes("TOP-SECRET-PROMPT"));
      res
        .writeHead(200, { "content-type": "application/json" })
        .end(JSON.stringify({ id: "x", content: [{ type: "text", text: "ok" }] }));
    });
  });
  const a = await listen((req, res) => {
    req.resume();
    res.writeHead(307, { location: `http://127.0.0.1:${b.port}/collect` }).end();
  });
  const realFetch = globalThis.fetch;
  globalThis.fetch = nativeFetch as unknown as typeof fetch; // loopback servers only
  try {
    const ex = new DefaultExecutor("anthropic-compatible-redirecttest");
    const result = await ex.execute({
      model: "m",
      body: {
        model: "m",
        max_tokens: 8,
        messages: [{ role: "user", content: "TOP-SECRET-PROMPT" }],
      },
      stream: false,
      credentials: {
        apiKey: "sk-test-not-real",
        connectionId: "redirect-2",
        providerSpecificData: { baseUrl: `http://127.0.0.1:${a.port}/v1` },
      },
    } as never);
    await result.response.text();
  } finally {
    globalThis.fetch = realFetch;
    a.server.close();
    b.server.close();
  }
  assert.equal(seen.method, "POST");
  assert.equal(seen.bodyHasPrompt, "true");
  assert.equal(seen.xApiKey, undefined, "second origin must never receive the API key");
  assert.equal(seen.authorization, undefined, "second origin must never receive the API key");
});

test("every hop is checked: a second-hop Location to cloud metadata is never fetched", async (t) => {
  const calls = stubFetch(t, {
    "https://a.example/v1": [302, "https://b.example/next"],
    "https://b.example/next": [307, "http://169.254.169.254/latest/meta-data/"],
  });
  await assert.rejects(
    dispatchGuarded("openai-compatible-redirecttest", "https://a.example/v1", { ...POST }, OVERRIDE)
  );
  assert.deepEqual(
    calls.map((c) => c.url),
    ["https://a.example/v1", "https://b.example/next"]
  );
});

test("public-only mode: a Location to loopback is blocked for a non-local provider", async (t) => {
  const saved = process.env[LOCAL_ENV];
  process.env[LOCAL_ENV] = "false";
  t.after(() => {
    if (saved === undefined) delete process.env[LOCAL_ENV];
    else process.env[LOCAL_ENV] = saved;
  });
  const calls = stubFetch(t, { "https://a.example/v1": [308, "http://127.0.0.1:8080/x"] });
  await assert.rejects(
    dispatchGuarded("openai-compatible-redirecttest", "https://a.example/v1", { ...POST }, OVERRIDE)
  );
  assert.equal(calls.length, 1);
});

test("a redirect hop of a built-in provider gets the connect-time guard", async (t) => {
  const calls = stubFetch(t, {
    "https://api.openai.com/v1/chat/completions": [307, "https://b.example/v1"],
    "https://b.example/v1": [200],
  });
  const res = await dispatchGuarded("openai", "https://api.openai.com/v1/chat/completions", {
    ...POST,
  });
  assert.equal(res.status, 200);
  assert.equal(calls[0].init.dispatcher, undefined, "fixed registry host keeps the pooled path");
  assert.ok(calls[1].init.dispatcher, "redirect target must use the guarded dispatcher");
  assert.equal(calls[1].init.redirect, "manual");
});

test("cross-origin hop drops credential headers; same-origin hop keeps them", async (t) => {
  const calls = stubFetch(t, {
    "https://a.example/v1": [307, "/v2"],
    "https://a.example/v2": [307, "https://b.example/v3"],
    "https://b.example/v3": [200],
  });
  await dispatchGuarded(
    "openai-compatible-redirecttest",
    "https://a.example/v1",
    { ...POST },
    OVERRIDE
  );
  const h = calls.map((c) => new Headers(c.init.headers));
  assert.equal(h[1].get("x-api-key"), "sk-test", "same origin keeps the key");
  for (const name of ["authorization", "x-api-key", "x-custom-token"]) {
    assert.equal(h[2].get(name), null, `${name} must not cross origins`);
  }
  assert.equal(h[2].get("accept"), "application/json");
  assert.equal(calls[2].init.method, "POST");
  assert.equal(calls[2].init.body, POST.body);
});

test("303, and 302 on POST, become GET without a body", async (t) => {
  const calls = stubFetch(t, {
    "https://a.example/v1": [303, "https://a.example/v2"],
    "https://a.example/p": [302, "https://a.example/v2"],
    "https://a.example/v2": [200],
  });
  await dispatchGuarded(
    "openai-compatible-redirecttest",
    "https://a.example/v1",
    { ...POST },
    OVERRIDE
  );
  await dispatchGuarded(
    "openai-compatible-redirecttest",
    "https://a.example/p",
    { ...POST },
    OVERRIDE
  );
  for (const hop of [calls[1], calls[3]]) {
    assert.equal(hop.init.method, "GET");
    assert.equal(hop.init.body, undefined);
    assert.equal(new Headers(hop.init.headers).get("content-type"), null);
  }
});

test("a redirect loop stops after 5 hops", async (t) => {
  const calls = stubFetch(t, { "https://a.example/v1": [302, "https://a.example/v1"] });
  await assert.rejects(
    dispatchGuarded(
      "openai-compatible-redirecttest",
      "https://a.example/v1",
      { ...POST },
      OVERRIDE
    ),
    /5 redirects/
  );
  assert.equal(calls.length, 6);
});

test("a caller-pinned redirect mode (strict validation) is passed through unchanged", async (t) => {
  const calls = stubFetch(t, { "https://a.example/v1": [307, "https://b.example/v1"] });
  const res = await dispatchGuarded(
    "openai-compatible-redirecttest",
    "https://a.example/v1",
    { ...POST, redirect: "error" },
    OVERRIDE
  );
  assert.equal(res.status, 307);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.redirect, "error");
});
