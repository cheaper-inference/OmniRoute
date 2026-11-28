import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { after, before, test } from "node:test";
import { NextRequest } from "next/server";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("kea-9623");
const { POST } = await import("../../src/app/api/v1/chat/completions/route.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { proxy } = await import("../../src/proxy.ts");
const model = "gemini-2.5-flash";
let authKey: string;

before(async () => {
  await harness.seedConnection("cheaperinference");
  authKey = (await harness.seedApiKey()).key;
});

after(async () => {
  flushProxyLogsSync();
  await harness.cleanup();
});

async function forwardThroughProxy(request: Request) {
  const nextRequest = new NextRequest(request);
  const proxyResponse = await proxy(nextRequest);
  assert.equal(proxyResponse.headers.get("x-middleware-next"), "1");

  // Apply the forwarded request headers that Next would give to the route.
  const headers = new Headers();
  const prefix = "x-middleware-request-";
  for (const [name, value] of proxyResponse.headers) {
    if (name.startsWith(prefix)) headers.set(name.slice(prefix.length), value);
  }
  return {
    forwardedRequest: new Request(nextRequest, { headers }),
    generatedRequestId: proxyResponse.headers.get("x-request-id"),
  };
}

function buildChatRequest(headers: Record<string, string>) {
  return harness.buildRequest({
    authKey,
    headers,
    body: {
      model: `cheaperinference/${model}`,
      stream: false,
      temperature: 0.7,
      messages: [{ role: "user", content: "Return a brief inference result." }],
    },
  });
}

for (const header of ["X-Request-Id", "Idempotency-Key"]) {
  for (const overlap of [false, true]) {
    const scenario = overlap ? "while the first request is in flight" : "after the first response";
    test(`KEA-9623: ${header} prevents a second upstream call ${scenario}`, async (t) => {
      // Keep both requests inside the default cache window even on a slow runner.
      t.mock.timers.enable({ apis: ["Date"], now: Date.now() });
      const firstDispatch = Promise.withResolvers<void>();
      let upstreamCalls = 0;
      t.mock.method(globalThis, "fetch", async (url: string | URL) => {
        assert.equal(String(url), "https://api.cheaperinference.com/v1/chat/completions");
        upstreamCalls++;
        if (upstreamCalls === 1) {
          firstDispatch.resolve();
          if (overlap) await delay(250);
        }
        return harness.buildOpenAIResponse("The inference result is ready.", model);
      });

      const send = async () => {
        const { forwardedRequest } = await forwardThroughProxy(
          buildChatRequest({ [header]: `kea-9623-${header}-${overlap}` })
        );
        return POST(forwardedRequest);
      };

      const first = send();
      await (overlap ? Promise.race([firstDispatch.promise, first]) : first);
      const [original, repeated] = await Promise.all([first, send()]);
      const originalBody = await original.text();
      const repeatedBody = await repeated.text();

      assert.equal(original.status, 200, originalBody);
      assert.equal(repeated.status, 200, repeatedBody);
      assert.equal(upstreamCalls, 1, "expected one dispatch to cheaperinference for the pair");
      assert.equal(repeated.headers.get("X-OmniRoute-Idempotent"), "true");
      assert.deepEqual(JSON.parse(repeatedBody), JSON.parse(originalBody));
    });
  }
}

test("KEA-9623: a 300-character X-Request-Id gets replaced and does not deduplicate", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: Date.now() });
  let upstreamCalls = 0;
  t.mock.method(globalThis, "fetch", async (url: string | URL) => {
    assert.equal(String(url), "https://api.cheaperinference.com/v1/chat/completions");
    upstreamCalls++;
    return harness.buildOpenAIResponse("The inference result is ready.", model);
  });

  const headers = { "X-Request-Id": "x".repeat(300) };
  const first = await forwardThroughProxy(buildChatRequest(headers));
  const original = await POST(first.forwardedRequest);
  assert.equal(original.status, 200, await original.text());

  const second = await forwardThroughProxy(buildChatRequest(headers));
  const repeated = await POST(second.forwardedRequest);
  assert.equal(repeated.status, 200, await repeated.text());

  assert.ok(first.generatedRequestId);
  assert.ok(second.generatedRequestId);
  assert.notEqual(first.generatedRequestId, second.generatedRequestId);
  assert.deepEqual(
    {
      firstRequestId: first.forwardedRequest.headers.get("x-request-id"),
      secondRequestId: second.forwardedRequest.headers.get("x-request-id"),
      upstreamCalls,
      replayHeader: repeated.headers.get("X-OmniRoute-Idempotent"),
    },
    {
      firstRequestId: first.generatedRequestId,
      secondRequestId: second.generatedRequestId,
      upstreamCalls: 2,
      replayHeader: null,
    }
  );
});
