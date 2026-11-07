// R8-4: the non-streaming upstream body cap must count decoded bytes. Content-Length is the
// compressed size for gzip and absent for chunked bodies, so a header-only check let a few KB
// of gzip (or an unlabelled chunked body) buffer far past the cap. These tests use a real
// fetch() against a loopback mock so undici's own decompression is exercised.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import zlib from "node:zlib";
import type { AddressInfo } from "node:net";

const MiB = 1024 * 1024;
const CAP = 8 * MiB;
const CAP_ENV = "OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES";

const {
  getMaxNonStreamingResponseBytes,
  readNonStreamingResponseBody,
  readResponseTextWithinCap,
  NonStreamingResponseTooLargeError,
} = await import("../../open-sse/handlers/chatCore/nonStreamingResponseBody.ts");
const { convertJsonBodyWithinCap, maybeConvertJsonBodyToSse } =
  await import("../../open-sse/handlers/chatCore/jsonBodyToSse.ts");
const { runReadinessFallback } =
  await import("../../open-sse/handlers/chatCore/streamReadinessFallback.ts");
const { normalizeProviderResponse } = await import("../../open-sse/services/selfHostedEntry.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");
const { parseUpstreamError } = await import("../../open-sse/utils/error.ts");
const { shouldSkipCredentialRefresh } =
  await import("../../open-sse/handlers/chatCore/skipCredentialRefresh.ts");

function setCapEnv(value: string | undefined) {
  if (value === undefined) delete process.env[CAP_ENV];
  else process.env[CAP_ENV] = value;
}

// Most direct reads pass CAP. Callers that take no cap argument (JSON→SSE, the pipeline) read
// the env var, so set it only while such a test runs. Other test files sharing this process
// (--test-isolation=none) never see it; the "withCapEnv restores" test below checks that.
async function withCapEnv<T>(fn: () => Promise<T>, cap: number = CAP): Promise<T> {
  const previous = process.env[CAP_ENV];
  process.env[CAP_ENV] = String(cap);
  try {
    return await fn();
  } finally {
    setCapEnv(previous);
  }
}

type Served = { written: number; total: number; closedEarly: Promise<boolean> };

function chatJson(content: string, pad = 0): Buffer {
  const head = Buffer.from(
    JSON.stringify({
      id: "chatcmpl-test",
      object: "chat.completion",
      model: "m",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      error: { message: "body-error-message" },
    }).slice(0, -1) + ',"pad":"'
  );
  return Buffer.concat([head, Buffer.alloc(pad, 0x61), Buffer.from('"}')]);
}

const routes = new Map<
  string,
  { status: number; headers: Record<string, string>; wire: Buffer; hold: boolean }
>();
let lastServed: Served | null = null;

function route(
  path: string,
  body: Buffer,
  opts: {
    gzip?: boolean;
    contentLength?: boolean;
    status?: number;
    type?: string;
    hold?: boolean;
    declaredLength?: number;
  } = {}
) {
  const wire = opts.gzip ? zlib.gzipSync(body, { level: 9 }) : body;
  const headers: Record<string, string> = { "content-type": opts.type ?? "application/json" };
  if (opts.gzip) headers["content-encoding"] = "gzip";
  if (opts.contentLength) headers["content-length"] = String(wire.length);
  if (opts.declaredLength) headers["content-length"] = String(opts.declaredLength);
  routes.set(path, { status: opts.status ?? 200, headers, wire, hold: opts.hold ?? false });
  return wire.length;
}

// For `hold` routes: write the first half, then hold the rest until the client hangs up or 3 s
// pass. A capped reader closes the connection during the pause; an uncapped one waits and reads
// everything.
const server = http.createServer((req, res) => {
  const r = routes.get(req.url ?? "");
  if (!r) {
    res.writeHead(404).end();
    return;
  }
  const served: Served = {
    written: 0,
    total: r.wire.length,
    closedEarly: new Promise((resolve) => res.on("close", () => resolve(!res.writableFinished))),
  };
  lastServed = served;
  res.writeHead(r.status, r.headers);
  if (!r.hold) {
    res.end(r.wire);
    served.written = r.wire.length;
    return;
  }
  const half = Math.floor(r.wire.length / 2);
  res.write(r.wire.subarray(0, half));
  served.written = half;
  const timer = setTimeout(() => {
    if (res.destroyed) return;
    res.end(r.wire.subarray(half));
    served.written = r.wire.length;
  }, 3000);
  res.on("close", () => clearTimeout(timer));
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
after(() => server.close());

const NORMAL = chatJson("héllo wörld ✓ 你好", MiB);
const BOMB = chatJson("x", 32 * MiB);

const gzipBombWire = route("/gzip-bomb", BOMB, {
  gzip: true,
  contentLength: true,
  hold: true,
});
route("/chunked-big", BOMB, { hold: true });
routes.set("/br-bomb", {
  status: 200,
  headers: { "content-type": "application/json", "content-encoding": "br" },
  wire: zlib.brotliCompressSync(BOMB),
  hold: false,
});
route("/gzip-normal", NORMAL, { gzip: true, contentLength: true });
route("/chunked-normal", NORMAL);
route("/sse-gzip-big", Buffer.concat([Buffer.from("data: "), BOMB, Buffer.from("\n\n")]), {
  gzip: true,
  type: "text/event-stream",
});
route("/err-gzip-bomb", BOMB, { gzip: true, contentLength: true, status: 500, hold: true });
route("/err-gzip-normal", NORMAL, { gzip: true, contentLength: true, status: 500 });
// Declares 8x the cap, sends 1 MiB, then holds.
route("/declared-big", Buffer.alloc(MiB, 0x61), { declaredLength: 8 * CAP, hold: true });

function isCapError(err: unknown): boolean {
  return (
    err instanceof NonStreamingResponseTooLargeError &&
    err.maxBytes === CAP &&
    err.bytesSeen > CAP &&
    err.bytesSeen <= CAP + MiB
  );
}

// Without the cancel, a backpressured chunked upstream never closes, so race a timer instead of
// waiting on the close forever. Hold routes finish on their own after 3 s.
async function closedWithin2s(served: Served): Promise<boolean | string> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<string>((resolve) => {
    timer = setTimeout(() => resolve("still open after 2 s"), 2000);
  });
  try {
    return await Promise.race([served.closedEarly, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function assertClosedEarly() {
  const served = lastServed!;
  const early = await closedWithin2s(served);
  assert.equal(early, true, "upstream connection must be closed before the body is sent");
  assert.ok(served.written < served.total);
}

test("gzip bomb: a few KB on the wire is rejected once the decoded body passes the cap", async () => {
  assert.ok(gzipBombWire < 64 * 1024, `wire ${gzipBombWire}B should be tiny`);
  const res = await fetch(`${base}/gzip-bomb`);
  assert.ok(Number(res.headers.get("content-length")) < CAP);
  // No maxBytes argument, as nonStreamingResponseParse calls it: the default reads the env var.
  await assert.rejects(
    withCapEnv(() => readNonStreamingResponseBody(res, "application/json", false)),
    isCapError
  );
  await assertClosedEarly();
});

test("brotli bomb is rejected the same way", async () => {
  // The whole br body is a few dozen bytes, so it may all be on the wire before the cap trips;
  // only the rejection is asserted here.
  const res = await fetch(`${base}/br-bomb`);
  await assert.rejects(
    readNonStreamingResponseBody(res, "application/json", false, CAP),
    isCapError
  );
});

test("chunked body without Content-Length is rejected past the cap", async () => {
  const res = await fetch(`${base}/chunked-big`);
  assert.equal(res.headers.get("content-length"), null);
  await assert.rejects(
    readNonStreamingResponseBody(res, "application/json", false, CAP),
    isCapError
  );
  await assertClosedEarly();
});

test("normal-size gzip and chunked bodies are returned unchanged", async () => {
  for (const path of ["/gzip-normal", "/chunked-normal"]) {
    const res = await fetch(`${base}${path}`);
    const out = await readNonStreamingResponseBody(res, "application/json", false, CAP);
    assert.equal(out, NORMAL.toString("utf8"), path);
  }
});

test("streaming JSON→SSE conversion applies the same decoded-byte cap", async () => {
  const res = await fetch(`${base}/gzip-bomb`);
  await assert.rejects(
    withCapEnv(() => maybeConvertJsonBodyToSse(res, { provider: "p", model: "m" })),
    isCapError
  );
  await assertClosedEarly();

  const chunked = await fetch(`${base}/chunked-big`);
  await assert.rejects(
    withCapEnv(() => maybeConvertJsonBodyToSse(chunked, { provider: "p", model: "m" })),
    isCapError
  );
  await assertClosedEarly();

  const ok = await fetch(`${base}/gzip-normal`);
  const converted = await withCapEnv(() =>
    maybeConvertJsonBodyToSse(ok, { provider: "p", model: "m" })
  );
  assert.equal(converted.headers.get("content-type"), "text/event-stream");
  assert.match(await converted.text(), /héllo wörld ✓ 你好/);
});

test("streaming SSE passthrough is not capped", async () => {
  // 32 MiB body under the 8 MiB cap, so any capped read on this path would throw.
  await withCapEnv(async () => {
    const res = await fetch(`${base}/sse-gzip-big`);
    const passed = await maybeConvertJsonBodyToSse(res, { provider: "p", model: "m" });
    assert.equal(passed, res, "SSE responses must pass through untouched");
    const text = await passed.text();
    assert.ok(text.length > 32 * MiB);
  });
});

test("non-streaming SSE drain still counts decoded bytes", async () => {
  const res = await fetch(`${base}/sse-gzip-big`);
  await assert.rejects(
    readNonStreamingResponseBody(res, "text/event-stream", true, CAP),
    isCapError
  );
});

type PipelineInput = Parameters<typeof runProviderExecutionPipeline>[0];

function pipelineInput(url: string, bodies: string[]): PipelineInput {
  const model = "m";
  return {
    policy: { allowAccountRotation: false, allowModelFallback: true },
    target: {
      provider: "openai",
      requestedModel: model,
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: "conn-a",
      getCurrentConnectionId: () => "conn-a",
      getCredentials: () => ({ connectionId: "conn-a" }),
      replaceCredentials: () => {},
      onCredentialsRefreshed: () => {},
      assertManagedLeaseFence: () => {},
      getProviderCredentials: async () => null,
    },
    wire: {
      body: { model, messages: [] },
      currentModel: model,
      triedModels: new Set([model]),
      setBodyAndModel: () => {},
    },
    state: {
      updatePendingStage: () => {},
      recordRateLimitHeaders: () => {},
      recordRateLimitBody: (_p: string, _c: string, text: string) => bodies.push(text),
      writeTerminalStatus: async () => {},
      persistConnectionPatch: () => {},
      setConnectionRateLimitedUntil: () => {},
      lockModel: () => {},
      recordAntigravityQuotaState: async () => {},
      markAccountSemaphoreBlocked: () => {},
      isolateProbeFailures: () => false,
    },
    sendProviderAttempt: async () => ({
      response: await fetch(url),
      url,
      headers: {},
      transformedBody: { model },
    }),
    getNextFamilyFallback: async () => null,
  } as unknown as PipelineInput;
}

test("provider pipeline error-body reads are capped on decoded bytes", async () => {
  const bodies: string[] = [];
  const outcome = await withCapEnv(() =>
    runProviderExecutionPipeline(pipelineInput(`${base}/err-gzip-bomb`, bodies))
  );
  assert.equal(outcome.kind, "error");
  assert.deepEqual(bodies, [], "an over-cap error body must not reach rate-limit learning");
  assert.notEqual(
    (outcome as { result: { rawMessage?: string } }).result.rawMessage,
    "body-error-message"
  );

  const okBodies: string[] = [];
  const normal = await withCapEnv(() =>
    runProviderExecutionPipeline(pipelineInput(`${base}/err-gzip-normal`, okBodies))
  );
  assert.equal(normal.kind, "error");
  assert.equal(okBodies.length, 1);
  assert.equal(okBodies[0], NORMAL.toString("utf8"));
  assert.equal(
    (normal as { result: { rawMessage?: string } }).result.rawMessage,
    "body-error-message"
  );
});

test("cap boundary and multi-byte text are counted in bytes", async () => {
  const exact = new Response(new Uint8Array(16).fill(0x61));
  assert.equal(await readResponseTextWithinCap(exact, 16), "a".repeat(16));
  await assert.rejects(
    readResponseTextWithinCap(new Response(new Uint8Array(17).fill(0x61)), 16),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.bytesSeen === 17
  );
  await assert.rejects(
    readNonStreamingResponseBody(
      new Response(new Uint8Array(17).fill(0x61)),
      "application/json",
      false,
      16
    ),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.maxBytes === 16
  );
  // Same decoding as response.text(), including a dangling partial character at the end.
  const tail = new Uint8Array([0x61, 0xc3]);
  assert.equal(await readResponseTextWithinCap(new Response(tail), 16), "a\ufffd");
  assert.equal(await readResponseTextWithinCap(new Response(null), 16), "");
  // 8 characters, 16 bytes: a character count would let this through.
  await assert.rejects(
    readResponseTextWithinCap(new Response("éééééééé"), 15),
    NonStreamingResponseTooLargeError
  );
});

// A body the pipeline can only bound by reading: 40 MiB produced on demand, counting how much
// was pulled. Any error-body read that buffers it whole pulls all of it.
function lazyBody(total: number, status: number) {
  const chunk = new Uint8Array(64 * 1024).fill(0x61);
  const counter = { pulled: 0 };
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (counter.pulled >= total) {
        controller.close();
        return;
      }
      counter.pulled += chunk.byteLength;
      controller.enqueue(chunk);
    },
  });
  return {
    counter,
    response: new Response(body, { status, headers: { "content-type": "application/json" } }),
  };
}

test("every pipeline error-body read stops at the cap", async () => {
  const big = lazyBody(40 * MiB, 422);
  const input = pipelineInput("", []);
  input.target.provider = "antigravity";
  input.policy = { ...input.policy, allowAccountRotation: true };
  input.sendProviderAttempt = async () => ({
    response: big.response,
    url: "u",
    headers: {},
    transformedBody: {},
  });
  const outcome = await withCapEnv(() => runProviderExecutionPipeline(input));
  assert.equal(outcome.kind, "error");
  assert.ok(big.counter.pulled <= 2 * CAP, `pulled ${big.counter.pulled} bytes`);
});

test("thinking-signature recovery error read stops at the cap", async () => {
  const big = lazyBody(40 * MiB, 400);
  let sends = 0;
  const body = {
    model: "m",
    messages: [
      { role: "user", content: "q1" },
      { role: "assistant", content: [{ type: "thinking", thinking: "t", signature: "S" }] },
      { role: "user", content: "q2" },
    ],
  };
  const input = pipelineInput("", []);
  input.target.provider = "claude";
  input.wire.body = body;
  input.wire.setBodyAndModel = (next: Record<string, unknown>) => {
    input.wire.body = next;
  };
  input.sendProviderAttempt = async () => {
    sends += 1;
    const response =
      sends === 1
        ? new Response(
            JSON.stringify({ error: { message: "invalid signature in thinking block" } }),
            { status: 400, headers: { "content-type": "application/json" } }
          )
        : big.response;
    return { response, url: "u", headers: {}, transformedBody: body };
  };
  await withCapEnv(() => runProviderExecutionPipeline(input));
  assert.equal(sends, 2, "the recovery request must have been sent");
  assert.ok(big.counter.pulled <= 2 * CAP, `pulled ${big.counter.pulled} bytes`);
});

test("Content-Length precheck cancels the body and closes the upstream", async () => {
  const res = await fetch(`${base}/declared-big`);
  await assert.rejects(
    readNonStreamingResponseBody(res, "application/json", false, CAP),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.bytesSeen === 8 * CAP
  );
  // The hold route finishes on its own after 3 s, so only a close before then counts.
  const closed = await closedWithin2s(lastServed!);
  assert.equal(closed, true, "precheck must close the upstream connection");

  // 16 bytes behind a declared 17: if the precheck let this through, the read would finish
  // with "a" x 16 instead of hanging.
  let cancelled = false;
  let pulls = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulls++ === 0) controller.enqueue(new Uint8Array(16).fill(0x61));
      else controller.close();
    },
    cancel() {
      cancelled = true;
    },
  });
  const declared = new Response(body, { headers: { "content-length": "17" } });
  await assert.rejects(
    readNonStreamingResponseBody(declared, "application/json", false, 16),
    NonStreamingResponseTooLargeError
  );
  assert.equal(cancelled, true, "precheck must cancel the body");
});

test("precheck rejects a declared length one byte over the cap", async () => {
  // Content-Length 17 with only 16 bytes sent: the 16-byte read alone would pass, so only
  // the precheck can reject this, and it must report the declared length.
  const short = new Response(new Uint8Array(16).fill(0x61), {
    headers: { "content-length": "17" },
  });
  await assert.rejects(
    readResponseTextWithinCap(short, 16),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.bytesSeen === 17
  );
  const exact = new Response(new Uint8Array(16).fill(0x61), {
    headers: { "content-length": "16" },
  });
  assert.equal(await readResponseTextWithinCap(exact, 16), "a".repeat(16));
});

test("multi-byte characters split across chunks decode intact", async () => {
  const text = "a€b€€😀";
  const bytes = new TextEncoder().encode(text);
  // One byte per chunk, so every multi-byte character is split.
  const oneBytePerChunk = () =>
    new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
          controller.close();
        },
      })
    );
  assert.equal(bytes.byteLength, 15);
  assert.equal(await readResponseTextWithinCap(oneBytePerChunk(), 15), text);
  assert.equal(
    await readNonStreamingResponseBody(oneBytePerChunk(), "application/json", false, 15),
    text
  );
  await assert.rejects(
    readResponseTextWithinCap(oneBytePerChunk(), 14),
    (err) => err instanceof NonStreamingResponseTooLargeError && err.bytesSeen === 15
  );
});

test("cap defaults to 64 MiB unless the env var is a positive integer", () => {
  const previous = process.env[CAP_ENV];
  try {
    setCapEnv(undefined);
    assert.equal(getMaxNonStreamingResponseBytes(), 64 * MiB);
    for (const bad of ["abc", "0", "-5"]) {
      setCapEnv(bad);
      assert.equal(getMaxNonStreamingResponseBytes(), 64 * MiB, bad);
    }
    // Parsed with parseInt: the smallest positive value is accepted, trailing text and a
    // fraction are dropped.
    for (const [raw, expected] of [
      ["1000", 1000],
      ["1", 1],
      ["1000abc", 1000],
      ["1.5", 1],
    ] as const) {
      setCapEnv(raw);
      assert.equal(getMaxNonStreamingResponseBytes(), expected, raw);
    }
  } finally {
    setCapEnv(previous);
  }
});

test("withCapEnv restores the env var, also after a throw", async () => {
  const previous = process.env[CAP_ENV];
  try {
    setCapEnv(undefined);
    await withCapEnv(async () => assert.equal(process.env[CAP_ENV], String(CAP)));
    assert.equal(CAP_ENV in process.env, false);
    setCapEnv("123");
    await assert.rejects(
      withCapEnv(async () => {
        throw new Error("boom");
      }),
      /boom/
    );
    assert.equal(process.env[CAP_ENV], "123");
  } finally {
    setCapEnv(previous);
  }
});

test("parseUpstreamError stops at the cap and keeps the upstream status", async () => {
  const res = await fetch(`${base}/err-gzip-bomb`);
  const parsed = await withCapEnv(() => parseUpstreamError(res, "mock"));
  assert.equal(parsed.statusCode, 500);
  assert.equal(parsed.message, "Provider error body exceeded response size limit");
  assert.deepEqual(parsed.responseBody, { _rawText: parsed.message });
  await assertClosedEarly();
});

test("a self-hosted candidate with an over-cap error body stays a normalized error", async () => {
  const res = await fetch(`${base}/err-gzip-bomb`);
  const normalized = await withCapEnv(() => normalizeProviderResponse(res));
  assert.equal(normalized.status, 500);
  const body = (await normalized.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Provider error body exceeded response size limit");
  await assertClosedEarly();
});

test("a consumed body rejects like Response.text() instead of reading as empty", async () => {
  const used = new Response("already read");
  await used.text();
  await assert.rejects(readResponseTextWithinCap(used), TypeError);

  const cancelled = new Response("cancelled");
  await cancelled.body?.cancel();
  await assert.rejects(readResponseTextWithinCap(cancelled), TypeError);
});

function jsonResponse(text: string) {
  return new Response(text, { headers: { "content-type": "application/json" } });
}

test("an over-cap JSON body on a streaming request becomes a terminal 502 readiness failure", async () => {
  const converted = await withCapEnv(
    () =>
      convertJsonBodyWithinCap(jsonResponse(JSON.stringify({ text: "x".repeat(64) })), {
        provider: "mock",
        model: "m",
      }),
    16
  );
  assert.equal(converted.response.status, 502);
  assert.equal(converted.overCap?.ok, false);
  assert.equal(converted.overCap?.response, converted.response);
  assert.equal(converted.overCap?.code, "upstream_response_too_large");
  assert.equal(converted.overCap?.upstreamFailure, true);
  const body = (await converted.response.json()) as { error: { code: string; message: string } };
  assert.equal(body.error.code, "upstream_response_too_large");
  assert.match(body.error.message, /exceeded the 16-byte cap/);
});

test("convertJsonBodyWithinCap leaves a body under the cap and other read failures alone", async () => {
  const text = JSON.stringify({ text: "under the cap" });
  const converted = await convertJsonBodyWithinCap(jsonResponse(text), {
    provider: "mock",
    model: "m",
  });
  assert.equal(converted.overCap, null);
  assert.equal(converted.response.ok, true);
  assert.equal(await converted.response.text(), text);

  const failure = new Error("read failed");
  const failing = new ReadableStream<Uint8Array>({ pull: (c) => c.error(failure) });
  await assert.rejects(
    convertJsonBodyWithinCap(
      new Response(failing, { headers: { "content-type": "application/json" } }),
      { provider: "mock", model: "m" }
    ),
    (err) => err === failure
  );
});

test("an over-cap JSON body on the readiness retry keeps the original failure", async () => {
  const failedReadiness = {
    ok: false as const,
    reason: "stalled",
    classificationReason: "stalled",
    code: "STREAM_READINESS_TIMEOUT",
    type: "stream_timeout",
    response: new Response("stalled", { status: 504 }),
  };
  const outcome = await withCapEnv(
    () =>
      runReadinessFallback({
        failedReadiness,
        failedConnectionId: "connection",
        failedBody: new Response("stalled body"),
        currentModel: "m",
        streamReadinessPolicy: { timeoutMs: 50, maxTimeoutMs: 50 },
        provider: "mock",
        model: "m",
        reqLogger: { logTargetRequest() {} },
        providerUrl: "u",
        providerHeaders: {},
        finalBody: { original: true },
        translatedBody: {},
        executeProviderRequest: async () => ({
          response: jsonResponse(JSON.stringify({ text: "x".repeat(64) })),
        }),
        providerRequestCapture: { body: (body) => body },
      }),
    16
  );
  assert.equal(outcome.ok, false);
  assert.equal(outcome.ok === false && outcome.code, "STREAM_READINESS_TIMEOUT");
  assert.deepEqual(outcome.finalBody, { original: true });
});

test("parseUpstreamError still returns a normal-size gzip error body", async () => {
  const res = await fetch(`${base}/err-gzip-normal`);
  const parsed = await withCapEnv(() => parseUpstreamError(res, "mock"));
  assert.equal(parsed.statusCode, 500);
  assert.ok(typeof parsed.message === "string");
});

test("shouldSkipCredentialRefresh treats an over-cap error body as unreadable", async () => {
  // Synthetic decoded body past the cap: the helper must not keep the whole string, so
  // readResponseTextWithinCap rejects and the catch returns null → keep credential refresh.
  const over = new Response(new Uint8Array(CAP + 1).fill(0x61), {
    status: 401,
    headers: { "content-type": "text/plain", "content-length": String(CAP + 1) },
  });
  const result = await withCapEnv(() => shouldSkipCredentialRefresh("openai", over));
  assert.equal(result, false, "over-cap body must not be treated as a safety refusal");
});
