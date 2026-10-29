import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import {
  createCipheriv,
  createHash,
  createHmac,
  generateKeyPairSync,
  hkdfSync,
  randomBytes,
  randomUUID,
  verify,
} from "node:crypto";
import { executeZcodeGateway, nativeZcodeBody } from "../../open-sse/executors/zcode/gateway.ts";
import { buildZcodeModelRequest } from "../../open-sse/executors/zcode.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const SOURCE = "https://api.z.ai/api/anthropic/v1/messages";
const TARGET = "https://zcode.z.ai/api/v1/ultra-zai/anthropic/v1/messages";
const body = { messages: [{ role: "user", content: "hello" }], max_tokens: 2048 };
const input: ExecuteInput = { model: "glm-5.3-flash", body, stream: true, credentials: {} };
const native = buildZcodeModelRequest(body);
const encoder = new TextEncoder();
const event = (type: string, data: Record<string, unknown>) =>
  "event: " + type + "\ndata: " + JSON.stringify({ type, ...data }) + "\n\n";
const start =
  event("message_start", {
    message: {
      id: "msg_fixture",
      type: "message",
      role: "assistant",
      model: "GLM-5.3-Flash",
      content: [],
      usage: { input_tokens: 3, output_tokens: 0 },
    },
  }) +
  event("content_block_start", {
    index: 1,
    content_block: { type: "thinking", thinking: "" },
  }) +
  event("content_block_delta", {
    index: 1,
    delta: { type: "thinking_delta", thinking: "private reasoning" },
  }) +
  event("content_block_stop", { index: 1 }) +
  event("content_block_start", { index: 0, content_block: { type: "text", text: "" } });
const delta = (text: string) =>
  event("content_block_delta", { index: 0, delta: { type: "text_delta", text } });
const end =
  event("content_block_stop", { index: 0 }) +
  event("message_delta", { delta: { stop_reason: "end_turn" }, usage: { output_tokens: 2 } }) +
  event("message_stop", {});

function fixture() {
  return { key: "fixture-" + randomUUID() + ".synthetic-secret" };
}
function backend(t: TestContext, key: string, respond: () => Response) {
  const [id, secret] = key.split("."),
    pair = generateKeyPairSync("ed25519");
  const counts = { config: 0, handshake: 0, inference: 0 };
  let requestSignal: AbortSignal | undefined;
  const derive = (info: string) =>
    Buffer.from(
      hkdfSync(
        "sha256",
        Buffer.from(secret),
        Buffer.from("WD_CLIENT_SIGN_KDF_SALT"),
        Buffer.from(info),
        32
      )
    );
  t.mock.method(globalThis, "fetch", async (url: unknown, options: RequestInit = {}) => {
    const h = new Headers(options.headers);
    if (String(url).endsWith("/api/v1/agent/configs")) {
      counts.config++;
      assert.equal(h.get("x-api-key"), key);
      return Response.json({
        code: 0,
        data: {
          codingPlanSignature: { enable: true },
          proxyEndpoint: { mapping: [{ from: SOURCE, to: TARGET }] },
        },
      });
    }
    if (String(url).endsWith("/api/paas/c1f3a7e2/v2/client")) {
      counts.handshake++;
      const request = JSON.parse(String(options.body));
      assert.equal(h.get("authorization"), key);
      assert.equal(
        request.sig,
        createHmac("sha256", derive("getSignKey_hmac"))
          .update(["get_sign_key", id, request.ts, request.nonce].join("\n"))
          .digest("base64")
      );
      const iv = randomBytes(12),
        cipher = createCipheriv("aes-256-gcm", derive("ed25519_priv"), iv);
      cipher.setAAD(Buffer.from(id));
      const encoded = pair.privateKey.export({ format: "der", type: "pkcs8" }).toString("base64");
      const encrypted = Buffer.concat([cipher.update(encoded, "utf8"), cipher.final()]);
      return Response.json({
        code: 200,
        data: {
          privateCipher: Buffer.concat([iv, encrypted, cipher.getAuthTag()]).toString("base64"),
        },
      });
    }
    assert.equal(url, TARGET, "native routing must not use the generic API");
    counts.inference++;
    requestSignal = options.signal as AbortSignal | undefined;
    assert.equal(h.get("authorization"), "Bearer " + key);
    assert.equal(h.get("x-api-key"), key);
    assert.equal(h.get("x-app-id"), "zcode");
    const ts = h.get("x-client-ts")!,
      session = h.get("x-session-id")!,
      nonce = h.get("x-client-nonce")!,
      version = h.get("x-client-version")!;
    assert.equal(
      verify(
        null,
        Buffer.from([id, ts, version, session, nonce].join("\n")),
        pair.publicKey,
        Buffer.from(h.get("x-client-sig")!, "base64")
      ),
      true
    );
    const seed = createHash("sha256")
      .update([id, "zcode", session, ts].join("\n"))
      .digest("hex")
      .slice(0, 32);
    assert.equal(
      createHash("sha256")
        .update(seed + "\n" + h.get("x-client-pow"))
        .digest()[0],
      0
    );
    const request = JSON.parse(String(options.body));
    if (request.stream === true)
      assert.equal(h.get("accept"), "text/event-stream", "stream requests must negotiate SSE");
    assert.equal(request.model, "GLM-5.3-Flash");
    assert.deepEqual(request.output_config, { effort: "low" });
    return respond();
  });
  return {
    counts,
    get requestSignal() {
      return requestSignal;
    },
  };
}

test("native request maps model, budget and reasoning effort", () => {
  assert.deepEqual(nativeZcodeBody(input, native), {
    model: "GLM-5.3-Flash",
    max_tokens: 2048,
    metadata: {},
    messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
    thinking: { type: "enabled" },
    output_config: { effort: "low" },
    stream: true,
  });
});

test("native request defaults omitted effort to low and preserves explicit levels", () => {
  for (const effort of ["low", "high", "max"]) {
    const requestBody = effort === "low" ? body : { ...body, output_config: { effort } },
      requestInput = { ...input, body: requestBody };
    assert.equal(
      (
        nativeZcodeBody(requestInput, buildZcodeModelRequest(requestBody)).output_config as Record<
          string,
          unknown
        >
      ).effort,
      effort
    );
  }
});

test("native request maps no-effort to the minimum supported low level", () => {
  for (const requestBody of [
    { ...body, reasoning_effort: "none" },
    { ...body, output_config: { effort: "none" } },
  ]) {
    const requestInput = { ...input, body: requestBody };
    assert.equal(
      (
        nativeZcodeBody(requestInput, buildZcodeModelRequest(requestBody)).output_config as Record<
          string,
          unknown
        >
      ).effort,
      "low"
    );
  }
});

test(
  "native signing is valid and deltas arrive before completion",
  { timeout: 10000 },
  async (t) => {
    const f = fixture();
    let controller!: ReadableStreamDefaultController<Uint8Array>,
      complete = false;
    const source = new ReadableStream<Uint8Array>({
      start(c) {
        controller = c;
        c.enqueue(encoder.encode(start + delta("first ")));
      },
    });
    const { counts } = backend(
      t,
      f.key,
      () => new Response(source, { headers: { "content-type": "text/event-stream" } })
    );
    const result = await executeZcodeGateway(input, native, { apiKey: f.key });
    assert.ok(!(result instanceof Response));
    assert.equal(result.transport, "zcode-native-gateway");
    const reader = result.response.body!.getReader(),
      decoder = new TextDecoder();
    let text = "";
    while (!text.includes("first ")) {
      const chunk = await reader.read();
      assert.equal(chunk.done, false);
      text += decoder.decode(chunk.value, { stream: true });
    }
    assert.equal(complete, false);
    for (const byte of encoder.encode(delta("Привет"))) controller.enqueue(new Uint8Array([byte]));
    controller.enqueue(encoder.encode(end));
    complete = true;
    controller.close();
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      text += decoder.decode(chunk.value, { stream: true });
    }
    assert.ok(text.includes("Привет"));
    assert.equal(
      text.includes("</think>"),
      false,
      "OpenAI clients must not receive the marker in visible text"
    );
    assert.ok(text.includes("reasoning_content"));
    assert.ok(text.includes("private reasoning"));
    assert.ok(text.includes("[DONE]"));
    assert.deepEqual(counts, { config: 1, handshake: 1, inference: 1 });
    assert.equal(JSON.stringify(result.transformedBody).includes(f.key), false);
  }
);

test(
  "native gateway bounds stream read-ahead before the client attaches",
  { timeout: 10000 },
  async (t) => {
    const f = fixture();
    const totalFrames = 200;
    let produced = 0;
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(start + delta("first ")));
        produced++;
      },
      pull(controller) {
        if (produced >= totalFrames) {
          controller.enqueue(encoder.encode(end));
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(delta("x".repeat(80))));
        produced++;
      },
    });
    backend(
      t,
      f.key,
      () => new Response(source, { headers: { "content-type": "text/event-stream" } })
    );

    const result = await executeZcodeGateway(input, native, { apiKey: f.key });
    assert.ok(!(result instanceof Response));
    await new Promise((resolve) => setTimeout(resolve, 25));
    assert.ok(
      produced < totalFrames,
      `the native transform must backpressure before the client attaches; produced ${produced}/${totalFrames} frames`
    );

    const reader = result.response.body!.getReader();
    let responseText = "";
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      responseText += new TextDecoder().decode(chunk.value);
    }
    assert.ok(responseText.includes("[DONE]"));
  }
);

test("tool output and usage translate; upstream refusal is returned without replay", async (t) => {
  const f = fixture();
  let status = 200;
  const { counts } = backend(t, f.key, () =>
    status === 200
      ? Response.json({
          id: "msg_test",
          type: "message",
          role: "assistant",
          model: "GLM-5.3-Flash",
          content: [{ type: "tool_use", id: "call_1", name: "get_value", input: { value: 17 } }],
          stop_reason: "tool_use",
          usage: { input_tokens: 7, output_tokens: 4 },
        })
      : Response.json(
          { error: { type: "rate_limit_error", message: "fixture quota exhausted" } },
          { status, headers: { "retry-after": "30" } }
        )
  );
  const result = await executeZcodeGateway({ ...input, stream: false }, native, { apiKey: f.key });
  assert.ok(!(result instanceof Response));
  const reply = await result.response.json();
  assert.equal(reply.choices[0].message.tool_calls[0].function.name, "get_value");
  assert.equal(reply.usage.prompt_tokens, 7);
  for (const code of [429, 413, 503]) {
    status = code;
    const refusal = await executeZcodeGateway(input, native, { apiKey: f.key });
    assert.ok(refusal instanceof Response);
    assert.equal(refusal.status, code);
    assert.equal(refusal.headers.get("retry-after"), "30");
  }
  assert.deepEqual(counts, { config: 1, handshake: 1, inference: 4 });
});

test("missing scoped credential and pre-aborted request do not dispatch", async (t) => {
  const f = fixture();
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw new Error("unexpected network");
  });
  const missing = await executeZcodeGateway({ ...input, credentials: { apiKey: f.key } }, native);
  assert.ok(missing instanceof Response);
  assert.equal(missing.status, 401);
  const controller = new AbortController();
  controller.abort();
  const aborted = await executeZcodeGateway({ ...input, signal: controller.signal }, native, {
    apiKey: f.key,
  });
  assert.ok(aborted instanceof Response);
  assert.equal(aborted.status, 499);
  assert.equal(calls, 0);
});

test("consumer cancellation reaches the native stream without replay", async (t) => {
  const f = fixture();
  const backendState = backend(
    t,
    f.key,
    () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(c) {
            c.enqueue(encoder.encode(start + delta("first ")));
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      )
  );
  const result = await executeZcodeGateway(input, native, { apiKey: f.key });
  assert.ok(!(result instanceof Response));
  const reader = result.response.body!.getReader();
  assert.equal((await reader.read()).done, false);
  await reader.cancel();
  assert.equal(backendState.requestSignal?.aborted, true);
  assert.equal(backendState.counts.inference, 1);
});
