// Opt-in zstd request bodies for the Codex backend. A real local HTTP server decodes the
// body, so the tests assert the bytes on the wire, not a stub's view of them.
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import zlib from "node:zlib";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omr-zstd-body-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
for (const name of ["HTTPS_PROXY", "HTTP_PROXY", "ALL_PROXY", "https_proxy", "http_proxy"]) {
  delete process.env[name];
}
delete process.env.NODE_EXTRA_CA_CERTS;

const FLAG = "OMNIROUTE_CODEX_ZSTD_BODY";
const { dispatchWithZstdBody, resetZstdLatchForTest, ZSTD_REQUEST_BODY_MIN_CHARS } =
  await import("../../open-sse/executors/base/zstdRequestBody.ts");

type Seen = { encoding: string | null; length: number; json: unknown };
type Reply = { status: number; body?: unknown };

const seen: Seen[] = [];
let reply: (call: number) => Reply = () => ({ status: 200, body: { ok: true } });

const server = http.createServer((req, res) => {
  const chunks: Buffer[] = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", () => {
    const raw = Buffer.concat(chunks);
    const encoding = (req.headers["content-encoding"] as string | undefined) ?? null;
    let json: unknown = null;
    try {
      json = JSON.parse(
        (encoding === "zstd" ? zlib.zstdDecompressSync(raw) : raw).toString("utf8")
      );
    } catch {
      json = "UNPARSEABLE";
    }
    seen.push({ encoding, length: raw.length, json });
    const answer = reply(seen.length);
    res.writeHead(answer.status, { "content-type": "application/json" });
    res.end(JSON.stringify(answer.body ?? {}));
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const localUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/responses`;
test.after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// The real fetch goes to the local server; only the URL the gate inspects is the Codex host.
const CODEX_URL = "https://chatgpt.com/backend-api/codex/responses";
const toLocal = (_url: string, init: RequestInit) => fetch(localUrl, init);
const bigBody = (chars = 20_000) =>
  JSON.stringify({ model: "gpt-5", input: [{ role: "user", content: "x".repeat(chars) }] });
const headers = { "Content-Type": "application/json", Authorization: "Bearer fixture" };

function reset(next?: typeof reply, flag: string | null = "true") {
  seen.length = 0;
  resetZstdLatchForTest();
  reply = next ?? (() => ({ status: 200, body: { ok: true } }));
  if (flag === null) delete process.env[FLAG];
  else process.env[FLAG] = flag;
}
test.afterEach(() => {
  delete process.env[FLAG];
});

const send = (body: string, url = CODEX_URL, provider = "codex") =>
  dispatchWithZstdBody(provider, url, { method: "POST", headers, body }, toLocal);

test("flag unset: a large Codex body goes out as identity, exactly as before", async () => {
  reset(undefined, null);
  const body = bigBody();
  assert.equal((await send(body)).status, 200);
  assert.equal(seen[0].encoding, null);
  assert.deepEqual(seen[0].json, JSON.parse(body));
});

test("flag on: a large Codex body arrives zstd and decodes to the exact request JSON", async () => {
  reset();
  const body = bigBody();
  assert.equal((await send(body)).status, 200);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].encoding, "zstd");
  assert.ok(seen[0].length < body.length / 5, `wire ${seen[0].length} vs raw ${body.length}`);
  assert.deepEqual(seen[0].json, JSON.parse(body));
});

test("flag on: small bodies, other providers and look-alike hosts stay identity", async () => {
  reset();
  await send(JSON.stringify({ m: "x".repeat(ZSTD_REQUEST_BODY_MIN_CHARS - 40) }));
  await send(bigBody(), "https://api.openai.com/v1/responses");
  await send(bigBody(), "https://chatgpt.com.evil.test/backend-api/codex/responses");
  await send(bigBody(), "https://evil.test/?x=chatgpt.com/backend-api/codex");
  await send(bigBody(), CODEX_URL, "openai");
  assert.equal(seen.length, 5);
  for (const entry of seen) assert.equal(entry.encoding, null);
});

test("flag on: a refusal (415) resends the SAME request uncompressed once and latches off", async () => {
  reset((call) =>
    call === 1 ? { status: 415, body: { error: "unsupported encoding" } } : { status: 200 }
  );
  const body = bigBody();
  const first = await send(body);
  assert.equal(first.status, 200, "the caller sees the resend's answer, not the refusal");
  assert.deepEqual(
    seen.map((entry) => entry.encoding),
    ["zstd", null]
  );
  assert.deepEqual(seen[1].json, JSON.parse(body), "the resend carries the same request");

  await send(bigBody());
  assert.deepEqual(
    seen.map((entry) => entry.encoding),
    ["zstd", null, null],
    "later requests stay identity while the latch holds"
  );
});

test("flag on: an ordinary API error is returned as it is and never resent", async () => {
  reset(() => ({ status: 429, body: { error: { message: "limit" } } }));
  const response = await send(bigBody());
  assert.equal(response.status, 429);
  assert.equal(seen.length, 1, "no resend for a rate limit");
});

// A 403 body longer than the refusal read limit, sent in many chunks (tee + partial read).
function multiChunk403(prefix: string, chunks = 40): Response {
  const encoder = new TextEncoder();
  let sent = 0;
  return new Response(
    new ReadableStream<Uint8Array>({
      pull(controller) {
        if (sent === 0) controller.enqueue(encoder.encode(prefix));
        if (sent++ < chunks) controller.enqueue(encoder.encode("x".repeat(1000)));
        else controller.close();
      },
    }),
    { status: 403, headers: { "content-type": "text/plain" } }
  );
}
const within = <T>(promise: Promise<T>, ms = 5_000) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      const timer = setTimeout(() => reject(new Error(`stalled for ${ms} ms`)), ms);
      timer.unref?.();
    }),
  ]);

test("flag on: a large multi-chunk 403 is delivered without stalling, and still readable", async () => {
  reset();
  let calls = 0;
  const transport = async () => {
    calls += 1;
    return multiChunk403("forbidden by policy ");
  };
  const response = await within(
    dispatchWithZstdBody(
      "codex",
      CODEX_URL,
      { method: "POST", headers, body: bigBody() },
      transport
    )
  );
  assert.equal(response.status, 403);
  assert.equal(calls, 1, "not an encoding refusal: no resend");
  assert.ok((await within(response.text())).length > 8192, "the caller reads the whole body");
});

test("flag on: a large multi-chunk 403 encoding refusal is resent uncompressed without stalling", async () => {
  reset();
  const encodings: Array<string | null> = [];
  const transport = async (_url: string, init: RequestInit) => {
    encodings.push(new Headers(init.headers).get("content-encoding"));
    return encodings.length === 1
      ? multiChunk403("unsupported content-encoding ")
      : new Response("{}", { status: 200 });
  };
  const response = await within(
    dispatchWithZstdBody(
      "codex",
      CODEX_URL,
      { method: "POST", headers, body: bigBody() },
      transport
    )
  );
  assert.equal(response.status, 200);
  assert.deepEqual(encodings, ["zstd", null]);
});

// Wiring through the real Codex executor: the flag must reach the wire from execute().
test("CodexExecutor.execute sends a large body zstd only when the flag is on", async () => {
  const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
  const wire: Array<{ url: string; encoding: string | null; json: unknown }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    const encoding = headers.get("content-encoding");
    const raw = init?.body as string | Uint8Array;
    const text =
      typeof raw === "string" ? raw : zlib.zstdDecompressSync(Buffer.from(raw)).toString("utf8");
    wire.push({ url: String(url), encoding, json: JSON.parse(text) });
    const done = { type: "response.completed", response: { id: "r1", status: "completed" } };
    return new Response(`data: ${JSON.stringify(done)}\n\n`, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;
  const body = () => ({
    model: "gpt-5.5",
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "y".repeat(20_000) }],
      },
    ],
  });
  const run = async () => {
    const result = await new CodexExecutor().execute({
      model: "gpt-5.5",
      body: body(),
      stream: true,
      credentials: { accessToken: "codex-token" },
      log: { warn() {}, info() {}, debug() {}, error() {} },
    });
    await result.response.text();
  };
  try {
    reset(undefined, null);
    await run();
    reset(undefined, "true");
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(wire.length, 2);
  assert.equal(wire[0].encoding, null, "flag unset: identity");
  assert.equal(wire[1].encoding, "zstd", "flag on: zstd");
  assert.deepEqual(wire[1].json, wire[0].json, "same request either way");
  assert.match(wire[1].url, /^https:\/\/chatgpt\.com\/backend-api\/codex\//);
});
