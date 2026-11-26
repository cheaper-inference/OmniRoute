import assert from "node:assert/strict";
import { AsyncResource } from "node:async_hooks";
import test, { type TestContext } from "node:test";
import { setTimeout as wait } from "node:timers/promises";

import { SELF_HOP_HEADER, stampOwnListenerSelfHop } from "@omniroute/open-sse/utils/selfHop.ts";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.OMNIROUTE_CHAT_LARGE_BODY_BYTES = "4096";
process.env.IMAGE_GENERATION_LONG_JOBS = "true";
const harness = await createChatPipelineHarness("required-api-key-transport");
const { POST: chat } = await import("@/app/api/v1/chat/completions/route");
const { POST: responses } = await import("@/app/api/v1/responses/route");
const { POST: images } = await import("@/app/api/v1/images/generations/route");
const { POST: audio } = await import("@/app/api/v1/audio/transcriptions/route");
const { BaseGuardrail, guardrailRegistry } = await import("@/lib/guardrails");
const { perConnectionAdmissionController } = await import("@/shared/middleware/chatBodyAdmission");
const { resolveSelfLoopBearer } = await import("@/shared/middleware/chatAdmissionIdentity");
const { PLAYGROUND_IMAGE_STREAM_HEADER } = await import("@/shared/utils/playgroundImageStream");
const {
  SELF_LOOP_KEY_ID_HEADER,
  resolveRequiredApiKeyChild,
  runWithRequiredApiKey,
  usesNativeRequiredApiKeyTransport,
} = await import("@/shared/utils/requiredApiKeyContext");

const model = "openai/gpt-4.1";
const imageModel = "openai/gpt-image-2";
const audioModel = "openai/whisper-1";
const nativeOptions = { nativeTransport: true };
const selfHosted = [
  "providers:",
  "  - id: openai",
  "    kind: openai",
  "    baseUrl: https://self-hosted.example.test/v1",
  "    model: gpt-4.1",
].join("\n");

test.before(() => harness.seedConnection("openai"));
test.after(async () => {
  await harness.callLogsDb.closeCallLogSaves(10_000);
  await harness.cleanup();
});

async function newBinding() {
  const key = await harness.apiKeysDb.createApiKey("Bound key", "required-key-test", []);
  return {
    apiKeyId: key.id,
    async resolve(id: string) {
      if (id !== key.id) return null;
      const apiKeyInfo = await harness.apiKeysDb.getApiKeyMetadata(key.key);
      return apiKeyInfo && { apiKey: key.key, apiKeyInfo };
    },
  };
}

function request(path: string, body: object, signal?: AbortSignal, headers?: HeadersInit) {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("content-type", "application/json");
  return new Request("http://localhost/api/v1/" + path, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(body),
    signal,
  });
}

function chatBody(content: string, stream = false) {
  return { model, messages: [{ role: "user", content }], stream };
}

function mockChatProvider(t: TestContext) {
  return t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const host = new URL(input instanceof Request ? input.url : input).hostname;
    return harness.buildOpenAIResponse(host, "gpt-4.1");
  });
}

for (const [backend, host, env] of [
  ["self-hosted", "self-hosted.example.test", { OMNIROUTE_SELF_HOSTED_PROVIDERS: selfHosted }],
  [
    "Bifrost",
    "bifrost.example.test",
    {
      BIFROST_BASE_URL: "https://bifrost.example.test",
      OMNIROUTE_RELAY_BACKEND: "bifrost",
    },
  ],
] as const) {
  test(`${backend} remains configured unless the binding opts into native transport`, async (t) => {
    const upstream = mockChatProvider(t);
    const binding = await newBinding();
    const send = (label: string) => chat(request("chat/completions", chatBody(label)));
    const previous = Object.entries(env).map(([name, value]) => {
      const original = process.env[name];
      process.env[name] = value;
      return [name, original] as const;
    });

    try {
      const ordinary = await send("Ordinary chat");
      assert.equal(ordinary.status, 200);
      assert.ok((await ordinary.text()).includes(host));

      const defaultBinding = await runWithRequiredApiKey(binding, () => send("Default binding"));
      assert.equal(defaultBinding.status, 200);
      assert.ok((await defaultBinding.text()).includes(host));

      const native = await runWithRequiredApiKey(
        binding,
        () => send("Native binding"),
        nativeOptions
      );
      assert.equal(native.status, 200);
      assert.match(await native.text(), /api\.openai\.com/);
      assert.equal(upstream.mock.callCount(), 3);
    } finally {
      for (const [name, value] of previous) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    }
  });
}

function parkGuardrail() {
  const entered = Promise.withResolvers<void>();
  const resume = Promise.withResolvers<void>();
  const original = guardrailRegistry.list();
  guardrailRegistry.register(
    new (class extends BaseGuardrail {
      constructor() {
        super("pending-key-authorization");
      }
      async preCall() {
        entered.resolve();
        await resume.promise;
        return { block: false };
      }
    })()
  );
  return {
    entered: entered.promise,
    release: resume.resolve,
    restore() {
      resume.resolve();
      guardrailRegistry.clear();
      original.forEach((guardrail) => guardrailRegistry.register(guardrail));
    },
  };
}

async function assertUnavailable(response: Response) {
  assert.equal(response.status, 403);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json/);
  assert.equal((await response.json()).error.code, "required_api_key_unavailable");
}

for (const [path, handler, body] of [
  ["chat/completions", chat, chatBody("Revoked during policy", true)],
  ["responses", responses, { model, input: "Revoked during policy", stream: true }],
] as const) {
  test(`${path} returns HTTP 403 when a key is revoked while authorization is pending`, async (t) => {
    const binding = await newBinding();
    const upstream = mockChatProvider(t);
    const gate = parkGuardrail();
    const pending = runWithRequiredApiKey(
      binding,
      () => handler(request(path, body)),
      nativeOptions
    );
    try {
      assert.equal(await Promise.race([gate.entered, pending]), undefined);
      const early = await Promise.race([pending, wait(1150)]);
      await harness.apiKeysDb.revokeApiKey(binding.apiKeyId);
      gate.release();
      if (early) await early.body?.cancel();
      await assertUnavailable(await pending);
      assert.equal(early, undefined, "the response must stay pending until the key decision");
      assert.equal(upstream.mock.callCount(), 0);
    } finally {
      gate.restore();
      await pending;
    }
  });
}

test("image policy rejection wins over the first heartbeat", async (t) => {
  const binding = await newBinding();
  await harness.apiKeysDb.updateApiKeyPermissions(binding.apiKeyId, {
    blockedModels: [imageModel],
  });
  const upstream = t.mock.method(globalThis, "fetch", async () => Response.json({ data: [] }));
  const response = await runWithRequiredApiKey(
    binding,
    () =>
      images(
        request("images/generations", { model: imageModel, prompt: "A hill" }, undefined, {
          [PLAYGROUND_IMAGE_STREAM_HEADER]: "1",
        })
      ),
    nativeOptions
  );
  const body = await response.text();
  assert.equal(response.status, 403, body);
  assert.match(response.headers.get("content-type") ?? "", /^application\/json/);
  assert.equal(upstream.mock.callCount(), 0);
});

test("authorized image generation keeps the heartbeat and terminal result", async (t) => {
  const binding = await newBinding();
  const release = Promise.withResolvers<void>();
  const upstream = t.mock.method(globalThis, "fetch", async () => {
    await release.promise;
    return Response.json({ data: [{ url: "https://images.example.test/result.png" }] });
  });
  try {
    const response = await runWithRequiredApiKey(
      binding,
      () =>
        images(
          request(
            "images/generations",
            { model: imageModel, prompt: "A hill at dusk" },
            undefined,
            {
              [PLAYGROUND_IMAGE_STREAM_HEADER]: "1",
            }
          )
        ),
      nativeOptions
    );
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
    assert.ok(response.body);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    try {
      assert.equal(decoder.decode((await reader.read()).value), ": keepalive\n\n");
      release.resolve();
      let result = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }
      assert.match(result, /event: playground\.image\.result/);
      assert.match(result, /https:\/\/images\.example\.test\/result\.png/);
      assert.equal(upstream.mock.callCount(), 1);
    } finally {
      await reader.cancel();
    }
  } finally {
    release.resolve();
  }
});

test("aborting before authorization releases admission even while the handler is pending", async (t) => {
  const binding = await newBinding();
  const gate = parkGuardrail();
  const upstream = mockChatProvider(t);
  const controller = new AbortController();
  const inflight = () => perConnectionAdmissionController.snapshot().inflightBytes;
  const initial = inflight();
  const body = chatBody("Hello " + "a".repeat(8000), true);
  const pending = runWithRequiredApiKey(
    binding,
    () => chat(request("chat/completions", body, controller.signal)),
    nativeOptions
  );
  try {
    assert.equal(await Promise.race([gate.entered, pending]), undefined);
    assert.ok(inflight() > initial);
    controller.abort();
    const response = await Promise.race([pending, wait(600)]);
    assert.ok(response, "the route should finish while the guardrail is still pending");
    assert.equal(response.status, 499);
    assert.match(response.headers.get("content-type") ?? "", /^application\/json/);
    assert.equal(inflight(), initial);
    assert.equal(upstream.mock.callCount(), 0);
  } finally {
    controller.abort();
    gate.restore();
    const response = await pending;
    await response.body?.cancel();
  }
});

for (const [path, handler, body, frame] of [
  ["chat/completions", chat, chatBody("Slow first token", true), /chatcmpl-keepalive/],
  [
    "responses",
    responses,
    { model, input: "Slow first token", stream: true },
    /response\.in_progress/,
  ],
] as const) {
  test(`authorized ${path} keeps its first frame and cancels pending upstream on reader cancellation`, async (t) => {
    const binding = await newBinding();
    const entered = Promise.withResolvers<AbortSignal>();
    const controller = new AbortController();
    t.mock.method(globalThis, "fetch", async (_input, init?: RequestInit) => {
      const signal = init?.signal;
      assert.ok(signal);
      entered.resolve(signal);
      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), { once: true });
      });
    });
    const pending = runWithRequiredApiKey(
      binding,
      () => handler(request(path, body, controller.signal)),
      nativeOptions
    );
    try {
      const response = await pending;
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      assert.ok(response.body);
      const reader = response.body.getReader();
      const first = await reader.read();
      assert.match(new TextDecoder().decode(first.value), frame);
      const signal = await entered.promise;
      await reader.cancel();
      assert.equal(signal.aborted, true);
    } finally {
      controller.abort();
    }
  });
}

test("a self-loop bearer alone cannot authorize a required-key child reference", async () => {
  const child = request("chat/completions", chatBody("Child"), undefined, {
    authorization: `Bearer ${resolveSelfLoopBearer()}`,
    [SELF_LOOP_KEY_ID_HEADER]: "required-key:9d127f46-b01f-4cb9-a02f-3c635141cac2",
  });

  assert.equal(usesNativeRequiredApiKeyTransport(child), false);
  assert.equal(await resolveRequiredApiKeyChild(child), null);
});

test("vision and audio self-loops use the bound identity outside the parent async scope", async (t) => {
  const { enforceApiKeyPolicy } = await import("@/shared/utils/apiKeyPolicy");
  const { resolveVisionBridgeKeyScope } = await import("@/lib/guardrails/visionBridgeKeyScope");
  const { callVisionModel } = await import("@/lib/guardrails/visionBridgeHelpers");
  const { callAudioTranscription } = await import("@/lib/guardrails/audioBridgeHelpers");
  const binding = await newBinding();
  await harness.apiKeysDb.updateApiKeyPermissions(binding.apiKeyId, { maxRequestsPerMinute: 1 });
  const outside = new AsyncResource("internal-http-listener");
  const identities: string[] = [];
  let laterRequest: Request | undefined;
  const selfLoop: typeof fetch = (input, init) =>
    outside.runInAsyncScope(async () => {
      const options = { ...init };
      stampOwnListenerSelfHop(input, options);
      const child = new Request(input, options);
      const isAudio = child.url.endsWith("/audio/transcriptions");
      if (!isAudio) {
        laterRequest = request("chat/completions", chatBody("Later"), undefined, child.headers);
        const unverifiedHeaders = new Headers(child.headers);
        unverifiedHeaders.delete(SELF_HOP_HEADER);
        const unverified = request(
          "chat/completions",
          chatBody("Unverified"),
          undefined,
          unverifiedHeaders
        );
        const unverifiedPolicy = await enforceApiKeyPolicy(unverified, model);
        assert.ok(unverifiedPolicy.rejection);
        await assertUnavailable(unverifiedPolicy.rejection);
      }
      const policy = await enforceApiKeyPolicy(child, isAudio ? audioModel : model);
      assert.equal(policy.rejection, null);
      assert.ok(policy.apiKeyInfo);
      identities.push(policy.apiKeyInfo.id);
      if (!isAudio) return chat(child);

      const response = await audio(child);
      await harness.apiKeysDb.updateApiKeyPermissions(binding.apiKeyId, {
        allowedEndpoints: ["chat"],
      });
      const denied = await enforceApiKeyPolicy(child, audioModel);
      assert.ok(denied.rejection);
      assert.equal(denied.rejection.status, 403);
      const errorBody = await denied.rejection.json();
      assert.match(errorBody.error.message, /Endpoint category "audio" is not allowed/);
      return response;
    });

  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) =>
    String(input).endsWith("/audio/transcriptions")
      ? Response.json({ text: "transcript" })
      : harness.buildOpenAIResponse("description", "gpt-4.1")
  );

  try {
    await runWithRequiredApiKey(
      binding,
      async () => {
        const parent = request("chat/completions", chatBody("Parent"));
        const policy = await enforceApiKeyPolicy(parent, model);
        assert.equal(policy.rejection, null);
        const scope = await resolveVisionBridgeKeyScope({ ...policy.apiKeyInfo });
        assert.ok(
          scope,
          "even a key without model restrictions carries its identity to the bridge"
        );
        const description = await callVisionModel("data:image/png;base64,iVBORw0KGgo=", {
          model,
          prompt: "Describe",
          timeoutMs: 5000,
          maxImages: 1,
          keyScope: scope,
          fetchImpl: selfLoop,
        });
        const transcript = await callAudioTranscription(
          {
            messageIndex: 0,
            partIndex: 0,
            ref: "data:audio/wav;base64,YXVkaW8=",
            shape: "input_audio",
            format: "wav",
          },
          { model: audioModel, timeoutMs: 5000, keyScope: scope },
          { fetchImpl: selfLoop }
        );
        assert.equal(description, "description");
        assert.equal(transcript, "transcript");
      },
      nativeOptions
    );
    assert.deepEqual(identities, [binding.apiKeyId, binding.apiKeyId]);
    assert.ok(laterRequest);
    const closedParentPolicy = await enforceApiKeyPolicy(laterRequest, model);
    assert.ok(closedParentPolicy.rejection);
    await assertUnavailable(closedParentPolicy.rejection);
  } finally {
    outside.emitDestroy();
  }
});
