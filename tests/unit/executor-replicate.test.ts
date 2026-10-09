import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";
import { ReplicateExecutor } from "../../open-sse/executors/replicate.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const MODEL = "meta/meta-llama-3-70b-instruct";
const credentials = { apiKey: "r8_test" };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function withFetch<T>(
  handler: (url: string, init: RequestInit) => Response | Promise<Response>,
  run: () => Promise<T>
): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) =>
    handler(String(url), init)) as typeof fetch;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
}

test("ReplicateExecutor is registered in the executor index", () => {
  assert.equal(hasSpecializedExecutor("replicate"), true);
  assert.ok(getExecutor("replicate") instanceof ReplicateExecutor);
});

test("ReplicateExecutor posts to the official-model predictions URL and wraps array output", async () => {
  const executor = new ReplicateExecutor();
  const calls: Array<{
    url: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
  }> = [];

  const result = await withFetch(
    (url, init) => {
      calls.push({
        url,
        body: JSON.parse(String(init.body)),
        headers: init.headers as Record<string, string>,
      });
      return jsonResponse({ status: "succeeded", output: ["Hello", ", ", "world"] });
    },
    () =>
      executor.execute({
        model: MODEL,
        body: {
          messages: [
            { role: "system", content: "Be brief." },
            { role: "user", content: "Hi" },
          ],
          max_tokens: 64,
          temperature: 0.5,
        },
        stream: false,
        credentials,
      } as never)
  );

  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions"
  );
  assert.equal(calls[0].headers.Authorization, "Bearer r8_test");
  assert.match(calls[0].headers.Prefer, /^wait=/);
  assert.deepEqual(calls[0].body, {
    input: { prompt: "Hi", system_prompt: "Be brief.", max_tokens: 64, temperature: 0.5 },
  });

  const json = await result.response.json();
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "Hello, world");
});

test("ReplicateExecutor polls urls.get until the prediction finishes", async () => {
  const executor = new ReplicateExecutor();
  const seen: string[] = [];

  const result = await withFetch(
    (url, init) => {
      seen.push(`${init.method} ${url}`);
      if (init.method === "POST") {
        return jsonResponse({
          status: "processing",
          urls: { get: "https://api.replicate.com/v1/predictions/abc" },
        });
      }
      assert.equal((init.headers as Record<string, string>).Prefer, undefined);
      return jsonResponse({ status: "succeeded", output: ["done"] });
    },
    () =>
      executor.execute({
        model: MODEL,
        body: { messages: [{ role: "user", content: "Hi" }] },
        stream: false,
        credentials,
      } as never)
  );

  assert.deepEqual(seen, [
    `POST https://api.replicate.com/v1/models/${MODEL}/predictions`,
    "GET https://api.replicate.com/v1/predictions/abc",
  ]);
  assert.equal((await result.response.json()).choices[0].message.content, "done");
});

test("ReplicateExecutor synthesizes an SSE stream for stream requests", async () => {
  const executor = new ReplicateExecutor();
  const result = await withFetch(
    () => jsonResponse({ status: "succeeded", output: ["streamed text"] }),
    () =>
      executor.execute({
        model: MODEL,
        body: { messages: [{ role: "user", content: "Hi" }] },
        stream: true,
        credentials,
      } as never)
  );

  const text = await result.response.text();
  assert.match(text, /"delta":\{"role":"assistant"\}/);
  assert.match(text, /"content":"streamed text"/);
  assert.match(text, /"finish_reason":"stop"/);
  assert.ok(text.trimEnd().endsWith("data: [DONE]"));
});

test("ReplicateExecutor maps failed predictions and HTTP errors without leaking paths", async () => {
  const executor = new ReplicateExecutor();

  const failed = await withFetch(
    () => jsonResponse({ status: "failed", error: "model crashed" }),
    () =>
      executor.execute({
        model: MODEL,
        body: { messages: [{ role: "user", content: "Hi" }] },
        stream: false,
        credentials,
      } as never)
  );
  assert.equal(failed.response.status, 502);
  assert.match((await failed.response.json()).error.message, /model crashed/);

  const unauthorized = await withFetch(
    () => jsonResponse({ detail: "Invalid token at /srv/app/secret.js" }, 401),
    () =>
      executor.execute({
        model: MODEL,
        body: { messages: [{ role: "user", content: "Hi" }] },
        stream: false,
        credentials,
      } as never)
  );
  assert.equal(unauthorized.response.status, 401);
  const body = await unauthorized.response.json();
  assert.ok(!body.error.message.includes("/srv/app"));
  assert.ok(!body.error.message.includes("at /"));
});

test("ReplicateExecutor rejects requests with no user message", async () => {
  const executor = new ReplicateExecutor();
  const result = await executor.execute({
    model: MODEL,
    body: { messages: [{ role: "system", content: "only system" }] },
    stream: false,
    credentials,
  } as never);
  assert.equal(result.response.status, 400);
});

test("Cerebrium uses the connection Base URL verbatim (no /chat/completions suffix)", () => {
  const executor = new DefaultExecutor("cerebrium");
  const url = "https://api.cerebrium.ai/v4/p-abc123/my-app/run";
  assert.equal(
    executor.buildUrl("meta-llama/Meta-Llama-3.1-8B-Instruct", false, 0, {
      apiKey: "jwt",
      providerSpecificData: { baseUrl: `${url}/` },
    } as never),
    url
  );
});
