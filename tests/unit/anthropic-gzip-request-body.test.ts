// Outbound gzip request bodies for api.anthropic.com (Claude Code 2.1.3xx parity).
// A real local HTTP server decodes the body, so the tests assert the bytes on the wire,
// not a stub's view of them.
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import zlib from "node:zlib";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omr-gzip-body-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
for (const name of ["HTTPS_PROXY", "HTTP_PROXY", "ALL_PROXY", "https_proxy", "http_proxy"]) {
  delete process.env[name];
}
delete process.env.NODE_EXTRA_CA_CERTS;
delete process.env.OMNIROUTE_GZIP_REQUEST_BODIES;

const { dispatchWithGzipBody, resetGzipLatchForTest, GZIP_REQUEST_BODY_MIN_CHARS } =
  await import("../../open-sse/executors/base/gzipRequestBody.ts");

type Seen = { encoding: string | null; length: number; json: unknown; raw: Buffer };
type Reply = { status: number; headers?: Record<string, string>; body?: unknown };

const seen: Seen[] = [];
let reply: (call: number, seenSoFar: Seen) => Reply = () => ({ status: 200, body: { ok: true } });

const server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    const raw = Buffer.concat(chunks);
    const encoding = (req.headers["content-encoding"] as string | undefined) ?? null;
    let json: unknown = null;
    try {
      json = JSON.parse((encoding === "gzip" ? zlib.gunzipSync(raw) : raw).toString("utf8"));
    } catch {
      json = "UNPARSEABLE";
    }
    const entry: Seen = { encoding, length: raw.length, json, raw };
    seen.push(entry);
    const answer = reply(seen.length, entry);
    res.writeHead(answer.status, {
      "content-type": "application/json",
      ...(answer.headers ?? {}),
    });
    res.end(JSON.stringify(answer.body ?? {}));
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const localUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/v1/messages`;
test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// The real fetch goes to the local server; only the URL the gate inspects is the official host.
const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const toLocal = (_url: string, init: RequestInit) => fetch(localUrl, init);

const bigBody = (chars = 20_000) =>
  JSON.stringify({
    model: "claude-opus-5",
    messages: [{ role: "user", content: "x".repeat(chars) }],
  });

function reset(next?: typeof reply) {
  seen.length = 0;
  resetGzipLatchForTest();
  reply = next ?? (() => ({ status: 200, body: { ok: true } }));
}

const jsonHeaders = { "Content-Type": "application/json", "x-api-key": "fixture" };

test("a large body to api.anthropic.com arrives gzip and decodes to the exact request JSON", async () => {
  reset();
  const body = bigBody();
  const response = await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body },
    toLocal
  );
  assert.equal(response.status, 200);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].encoding, "gzip");
  assert.ok(seen[0].length < body.length / 5, `wire ${seen[0].length} vs raw ${body.length}`);
  assert.deepEqual(seen[0].json, JSON.parse(body));
});

test("unsigned bodies get trailing whitespace padding that stays valid JSON", async () => {
  reset();
  const body = bigBody();
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body },
    toLocal
  );
  const decoded = zlib.gunzipSync(seen[0].raw).toString("utf8");
  assert.ok(decoded.startsWith(body));
  assert.match(decoded.slice(body.length), /^\n[ \t]*$/);
});

test("a body carrying a signed cch token is compressed byte-exact, without padding", async () => {
  reset();
  const body = JSON.stringify({
    system: [
      { type: "text", text: "x-anthropic-billing-header: cc_version=2.1.280.abc; cch=1a2b3;" },
    ],
    messages: [{ role: "user", content: "y".repeat(10_000) }],
  });
  await dispatchWithGzipBody(
    "claude",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body },
    toLocal
  );
  assert.equal(seen[0].encoding, "gzip");
  assert.equal(zlib.gunzipSync(seen[0].raw).toString("utf8"), body);
});

test("small bodies, other hosts and look-alike hosts go out as identity", async () => {
  reset();
  const small = JSON.stringify({ m: "x".repeat(GZIP_REQUEST_BODY_MIN_CHARS - 40) });
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body: small },
    toLocal
  );
  const big = bigBody();
  for (const url of [
    "https://api.openai.com/v1/chat/completions",
    "https://api.anthropic.com.evil.test/v1/messages",
    "https://evil.test/?x=api.anthropic.com",
  ]) {
    await dispatchWithGzipBody(
      "anthropic-compatible-x",
      url,
      { method: "POST", headers: jsonHeaders, body: big },
      toLocal
    );
  }
  assert.equal(seen.length, 4);
  for (const entry of seen) assert.equal(entry.encoding, null);
  assert.deepEqual(seen[3].json, JSON.parse(big));
});

test("the opt-out env, a custom CA, an existing encoding and an env proxy keep identity", async () => {
  const body = bigBody();
  const send = (headers: HeadersInit = jsonHeaders) =>
    dispatchWithGzipBody("anthropic", ANTHROPIC_URL, { method: "POST", headers, body }, toLocal);

  reset();
  process.env.OMNIROUTE_GZIP_REQUEST_BODIES = "0";
  await send();
  delete process.env.OMNIROUTE_GZIP_REQUEST_BODIES;

  process.env.NODE_EXTRA_CA_CERTS = "/nonexistent/ca.pem";
  await send();
  delete process.env.NODE_EXTRA_CA_CERTS;

  await send({ ...jsonHeaders, "Content-Encoding": "identity" });

  // An env proxy makes resolveProxyForRequest answer "env", so the gate must keep identity.
  process.env.HTTPS_PROXY = "http://proxy.invalid:3128";
  try {
    await send();
  } finally {
    delete process.env.HTTPS_PROXY;
  }
  assert.equal(seen.length, 4);
  // The caller's own "identity" header stays; the other three carry no encoding at all.
  assert.deepEqual(
    seen.map((entry) => entry.encoding),
    [null, null, "identity", null]
  );
});

test("content-length from the caller is dropped when the body is compressed", async () => {
  reset();
  const body = bigBody();
  let sentHeaders: Headers | null = null;
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: { ...jsonHeaders, "Content-Length": String(body.length) }, body },
    async (_url, init) => {
      sentHeaders = new Headers(init.headers);
      return new Response("{}", { status: 200 });
    }
  );
  assert.equal(sentHeaders!.get("content-encoding"), "gzip");
  assert.equal(sentHeaders!.get("content-length"), null);
  assert.equal(sentHeaders!.get("x-api-key"), "fixture");
});

const refusals: Array<[string, Reply]> = [
  ["415", { status: 415, body: { error: { message: "unsupported" } } }],
  [
    "proxy 400 without an Anthropic request id",
    { status: 400, body: { error: { message: "bad" } } },
  ],
  ["proxy 403 without an Anthropic request id", { status: 403, body: {} }],
  [
    "origin JSON-parse 400",
    {
      status: 400,
      headers: { "request-id": "req_011CtestAAAA" },
      body: {
        type: "error",
        error: {
          type: "invalid_request_error",
          message: "The request body is not valid JSON: Unexpected token",
        },
      },
    },
  ],
  [
    "origin parse 400 (second wording)",
    {
      status: 400,
      headers: { "request-id": "req_011CtestBBBB" },
      body: {
        type: "error",
        error: {
          type: "invalid_request_error",
          message: "Failed to parse request: could not parse request body as JSON",
        },
      },
    },
  ],
];

for (const [label, refusal] of refusals) {
  test(`${label}: resent uncompressed once, then the origin stays identity`, async () => {
    reset((call) => (call === 1 ? refusal : { status: 200, body: { ok: true } }));
    const body = bigBody();
    const first = await dispatchWithGzipBody(
      "anthropic",
      ANTHROPIC_URL,
      { method: "POST", headers: jsonHeaders, body },
      toLocal
    );
    assert.equal(first.status, 200);
    assert.deepEqual(
      seen.map((entry) => entry.encoding),
      ["gzip", null]
    );
    assert.deepEqual(seen[1].json, JSON.parse(body));
    const second = await dispatchWithGzipBody(
      "anthropic",
      ANTHROPIC_URL,
      { method: "POST", headers: jsonHeaders, body },
      toLocal
    );
    assert.equal(second.status, 200);
    assert.equal(seen.length, 3);
    assert.equal(seen[2].encoding, null);
  });
}

test("an ordinary API 400 from Anthropic is returned as is and never resent", async () => {
  reset(() => ({
    status: 400,
    headers: { "request-id": "req_011CtestCCCC" },
    body: {
      type: "error",
      error: { type: "invalid_request_error", message: "max_tokens: Field required" },
    },
  }));
  const response = await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body: bigBody() },
    toLocal
  );
  assert.equal(response.status, 400);
  // the rejection check read a clone: the caller still gets the full error body
  assert.equal(
    ((await response.json()) as { error: { message: string } }).error.message,
    "max_tokens: Field required"
  );
  assert.equal(seen.length, 1);
  assert.equal(seen[0].encoding, "gzip");
  // and gzip stays on for the next request
  reset(() => ({ status: 200 }));
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body: bigBody() },
    toLocal
  );
  assert.equal(seen[0].encoding, "gzip");
});

test("401, 429 and 5xx answers never trigger a resend", async () => {
  for (const status of [401, 429, 500, 529]) {
    reset(() => ({ status, headers: { "request-id": "req_011CtestDDDD" }, body: {} }));
    const response = await dispatchWithGzipBody(
      "anthropic",
      ANTHROPIC_URL,
      { method: "POST", headers: jsonHeaders, body: bigBody() },
      toLocal
    );
    assert.equal(response.status, status);
    assert.equal(seen.length, 1, `status ${status}`);
  }
});

test("a transport error is thrown to the caller, not retried or latched", async () => {
  reset();
  let calls = 0;
  await assert.rejects(
    dispatchWithGzipBody(
      "anthropic",
      ANTHROPIC_URL,
      { method: "POST", headers: jsonHeaders, body: bigBody() },
      async () => {
        calls++;
        throw new Error("socket hang up");
      }
    ),
    /socket hang up/
  );
  assert.equal(calls, 1);
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body: bigBody() },
    toLocal
  );
  assert.equal(seen[0].encoding, "gzip");
});

test("a latched origin recovers after the latch window", async () => {
  reset((call) => (call === 1 ? { status: 415 } : { status: 200 }));
  await dispatchWithGzipBody(
    "anthropic",
    ANTHROPIC_URL,
    { method: "POST", headers: jsonHeaders, body: bigBody() },
    toLocal
  );
  const realNow = Date.now;
  try {
    Date.now = () => realNow() + 61 * 60 * 1000;
    await dispatchWithGzipBody(
      "anthropic",
      ANTHROPIC_URL,
      { method: "POST", headers: jsonHeaders, body: bigBody() },
      toLocal
    );
  } finally {
    Date.now = realNow;
  }
  assert.deepEqual(
    seen.map((entry) => entry.encoding),
    ["gzip", null, "gzip"]
  );
});

test("the claude executor sends a gzip body that decodes to the transformed request", async () => {
  reset();
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const executor = await getExecutor("anthropic");
  const originalFetch = globalThis.fetch;
  let wire: { headers: Headers; body: Buffer } | null = null;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    wire = { headers: new Headers(init.headers), body: Buffer.from(init.body as Uint8Array) };
    return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const request = {
      model: "claude-haiku-4-5",
      max_tokens: 16,
      messages: [{ role: "user", content: [{ type: "text", text: "lorem ipsum ".repeat(1200) }] }],
    };
    const result = await executor.execute({
      model: "claude-haiku-4-5",
      body: request,
      stream: false,
      credentials: { apiKey: "fixture-api-key" },
      signal: new AbortController().signal,
      log: null,
    });
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(wire, "executor must have dispatched");
  assert.equal(wire!.headers.get("content-encoding"), "gzip");
  const decoded = JSON.parse(zlib.gunzipSync(wire!.body).toString("utf8"));
  assert.equal(decoded.model, "claude-haiku-4-5");
  assert.equal(decoded.messages[0].content[0].text, "lorem ipsum ".repeat(1200));
});

const largeExecutorInput = () => ({
  model: "claude-haiku-4-5",
  body: {
    model: "claude-haiku-4-5",
    max_tokens: 16,
    messages: [{ role: "user", content: [{ type: "text", text: "lorem ipsum ".repeat(1200) }] }],
  },
  stream: false,
  credentials: { apiKey: "fixture-api-key" },
  signal: new AbortController().signal,
  log: null,
});

test("the provider request log still gets the JSON of a gzip dispatch", async () => {
  reset();
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const { runWithCapture } = await import("../../open-sse/utils/providerRequestLogging.ts");
  const executor = await getExecutor("anthropic");
  const captured: Array<{ url: string; body: unknown; headers: Record<string, string> }> = [];
  const capture = {
    capture: (request: { url: string; body: unknown; headers: Record<string, string> }) => {
      captured.push(request);
    },
    body: (fallback: unknown) => fallback,
  };
  const originalFetch = globalThis.fetch;
  let encoding: string | null = null;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    encoding = new Headers(init.headers).get("content-encoding");
    return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    await runWithCapture(capture, () => executor.execute(largeExecutorInput()));
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(encoding, "gzip");
  assert.equal(captured.length, 1);
  assert.equal(new URL(captured[0].url).host, "api.anthropic.com");
  const logged = captured[0].body as { model: string; messages: Array<{ content: unknown[] }> };
  assert.equal(logged.model, "claude-haiku-4-5");
  assert.deepEqual(logged.messages[0].content[0], {
    type: "text",
    text: "lorem ipsum ".repeat(1200),
  });
});

test("a refused gzip send and its identity resend are two observed HTTP attempts", async () => {
  reset();
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const { runWithCapture } = await import("../../open-sse/utils/providerRequestLogging.ts");
  const { HttpAttemptCollector } = await import("../../open-sse/utils/providerHttpAttempts.ts");
  const executor = await getExecutor("anthropic");
  const httpAttempts = new HttpAttemptCollector();
  const capture = { httpAttempts, capture: () => {}, body: (fallback: unknown) => fallback };
  const originalFetch = globalThis.fetch;
  const encodings: Array<string | null> = [];
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    encodings.push(new Headers(init.headers).get("content-encoding"));
    return encodings.length === 1
      ? new Response("{}", { status: 415 })
      : new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
  }) as typeof fetch;
  let status = 0;
  try {
    const result = await runWithCapture(capture, () => executor.execute(largeExecutorInput()));
    status = result.response.status;
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(status, 200);
  assert.deepEqual(encodings, ["gzip", null]);
  const drained = httpAttempts.drain(null, 200);
  assert.deepEqual(
    drained?.records.map((record) => record.status),
    [415, 200]
  );
});
