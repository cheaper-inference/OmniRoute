import { test } from "node:test";
import assert from "node:assert/strict";
import { callChat as callDocumentChat } from "../../scripts/i18n/run-translation.mjs";

import {
  callChat,
  isFallbackWorthy,
  resolveModelChain,
} from "../../scripts/i18n/lib/translate-backend.mjs";

// A translation wave used to stop dead when its single route hit the weekly quota (Codex 429
// until ~2026-10-24 left release/v3.8.53 with 14 drifted sources). The chain moves each request
// to the next model instead; the per-chunk validator keeps judging the answer afterwards.

type Call = { model: string; retry: number };

/** Swaps `globalThis.fetch` for `fn`'s duration; `script` answers per model, in call order. */
async function withFetch<T>(
  script: Record<string, Array<{ status: number; body?: unknown }>>,
  fn: (calls: Call[]) => Promise<T>
): Promise<T> {
  const original = globalThis.fetch;
  const calls: Call[] = [];
  const cursors: Record<string, number> = {};
  globalThis.fetch = (async (_input: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body)) as { model: string };
    const idx = cursors[body.model] ?? 0;
    cursors[body.model] = idx + 1;
    calls.push({ model: body.model, retry: idx });
    const step = script[body.model]?.[Math.min(idx, (script[body.model]?.length ?? 1) - 1)] ?? {
      status: 500,
    };
    const payload =
      step.status === 200
        ? JSON.stringify({ choices: [{ message: { content: String(step.body ?? "ok") } }] })
        : JSON.stringify({ error: step.body ?? "nope" });
    return new Response(payload, {
      status: step.status,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = original;
  }
}

const backend = {
  apiUrl: "http://backend.test/v1",
  apiKey: "k",
  model: "primary/model",
  fallbackModels: ["fallback/one", "fallback/two"],
  timeoutMs: 5_000,
};

test("resolveModelChain reads the primary and an ordered, de-duplicated fallback list", () => {
  const chain = resolveModelChain({
    OMNIROUTE_TRANSLATION_MODEL: " primary/model ",
    OMNIROUTE_TRANSLATION_FALLBACK_MODELS:
      "cmd/deepseek/deepseek-v4.1-flash, primary/model ,, auto/cheap,cmd/deepseek/deepseek-v4.1-flash",
  });
  assert.equal(chain.model, "primary/model");
  assert.deepEqual(chain.fallbackModels, ["cmd/deepseek/deepseek-v4.1-flash", "auto/cheap"]);
  assert.deepEqual(chain.models, [
    "primary/model",
    "cmd/deepseek/deepseek-v4.1-flash",
    "auto/cheap",
  ]);
  assert.deepEqual(resolveModelChain({ OMNIROUTE_TRANSLATION_MODEL: "x" }).fallbackModels, []);
});

test("isFallbackWorthy: quota, auth, upstream, timeout and network yes — malformed request no", () => {
  for (const msg of [
    "upstream 429: quota",
    "upstream 402: balance",
    "upstream 401: key",
    "upstream 503: down",
    "timeout after 5000ms",
    "fetch failed",
  ]) {
    assert.equal(isFallbackWorthy(new Error(msg)), true, msg);
  }
  for (const msg of [
    "upstream 400: bad request",
    "upstream 413: too large",
    "upstream 422: unprocessable",
  ]) {
    assert.equal(isFallbackWorthy(new Error(msg)), false, msg);
  }
});

test("callChat falls through the chain on quota and returns the first good answer", async () => {
  await withFetch(
    {
      "primary/model": [
        { status: 429, body: "weekly quota" },
        { status: 429, body: "weekly quota" },
      ],
      "fallback/one": [{ status: 402, body: "no balance" }],
      "fallback/two": [{ status: 200, body: "traduzido" }],
    },
    async (calls) => {
      const out = await callChat([{ role: "user", content: "hi" }], backend);
      assert.equal(out, "traduzido");
      // primary: first attempt + its one transient retry; 402 is not transient → straight to the next
      assert.deepEqual(
        calls.map((c) => c.model),
        ["primary/model", "primary/model", "fallback/one", "fallback/two"]
      );
    }
  );
});

test("callChat does not fall back on a malformed request and surfaces the primary error", async () => {
  await withFetch({ "primary/model": [{ status: 400, body: "bad" }] }, async (calls) => {
    await assert.rejects(
      () => callChat([{ role: "user", content: "hi" }], backend),
      /upstream 400/
    );
    assert.deepEqual(
      calls.map((c) => c.model),
      ["primary/model"]
    );
  });
});

test("callChat with an exhausted chain throws the last model's error", async () => {
  await withFetch(
    {
      "primary/model": [{ status: 429 }, { status: 429 }],
      "fallback/one": [{ status: 401 }],
      "fallback/two": [{ status: 503 }, { status: 503 }],
    },
    async (calls) => {
      await assert.rejects(
        () => callChat([{ role: "user", content: "hi" }], backend),
        /upstream 503/
      );
      assert.equal(calls.length, 5);
    }
  );
});

test("callChat without fallbacks behaves as before (one model, one transient retry)", async () => {
  await withFetch(
    { "primary/model": [{ status: 500 }, { status: 200, body: "ok" }] },
    async (calls) => {
      const out = await callChat([{ role: "user", content: "hi" }], {
        ...backend,
        fallbackModels: [],
      });
      assert.equal(out, "ok");
      assert.deepEqual(
        calls.map((c) => c.model),
        ["primary/model", "primary/model"]
      );
    }
  );
});

for (const [name, request] of [
  ["shared", callChat],
  ["document", callDocumentChat],
] as const) {
  test(`${name} fallback telemetry reports attempts and success without model ids or upstream body`, async () => {
    const warnings: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...parts: unknown[]) => {
      warnings.push(parts.map(String).join(" "));
    };
    try {
      await withFetch(
        {
          "primary/model": [{ status: 401, body: "private-upstream-body" }],
          "fallback/one": [{ status: 200, body: "translated" }],
        },
        async () => {
          assert.equal(await request([{ role: "user", content: "hello" }], backend), "translated");
        }
      );
      assert.equal(
        warnings.filter((line) => line.includes("[i18n-fallback] attempt index=1")).length,
        1
      );
      assert.equal(
        warnings.filter((line) => line.includes("[i18n-fallback] success index=1")).length,
        1
      );
      assert.ok(
        warnings.every((line) => !/private-upstream-body|primary\/model|fallback\/one/.test(line))
      );
    } finally {
      console.warn = originalWarn;
    }
  });
}
