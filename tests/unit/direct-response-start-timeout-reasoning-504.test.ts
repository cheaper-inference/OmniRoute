// Regression guard for the 504 regression introduced by 142ae9349
// "fix(network): bound direct-path response-start timeout".
//
// Root cause: directResponseStartTimeout resolved a FLAT timeout
// (OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS or 30s default) with zero
// awareness of reasoning effort. GLM-5.2 reasoning.effort=max has ~78s
// TTFB; the stream-readiness layer already allows 180s for reasoning
// models (streamReadinessPolicy claude_format_heavy_reasoning /
// codex_gpt_5_5_high_reasoning bumps), but the fetch layer below it
// cut the request at 30s (×2 = 60s 504) — and even 90s was still short.
//
// The fix: resolveDirectHeadersTimeoutMs inspects the serialized
// request body for a high/xhigh/max reasoning effort selector and raises the
// per-attempt TTFB budget to align with the stream-readiness ceiling
// (180s) so the fetch layer no longer pre-empts a warm reasoning
// response that the readiness layer would have permitted.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  directHeadersTimeoutResolver,
  resolveDirectHeadersTimeoutMs,
} from "../../open-sse/utils/directResponseStartTimeout.ts";

import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { useDirectMockHosts } from "../helpers/directMockHosts.ts";

beforeEach((t) => {
  useDirectMockHosts(t, "reasoning.example");
  for (const key of [
    "OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS",
    "OMNIROUTE_DIRECT_RESPONSE_RETRY_TIMEOUT_MS",
    "ENABLE_TLS_FINGERPRINT",
  ]) {
    const previous = process.env[key];
    delete process.env[key];
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
});

test.after(() => {
  clearDispatcherCache();
  resetDbInstance();
});

for (const selector of [{ reasoning_effort: "xhigh" }, { reasoning: { effort: "xhigh" } }]) {
  test(`xhigh ${JSON.stringify(selector)} gets the reasoning floor without lowering overrides`, () => {
    const body = JSON.stringify(selector);
    assert.equal(resolveDirectHeadersTimeoutMs({}, body), 180_000);
    assert.equal(
      resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "240000" }, body),
      240_000
    );
    assert.equal(
      resolveDirectHeadersTimeoutMs(
        { OMNIROUTE_DIRECT_RESPONSE_RETRY_TIMEOUT_MS: "1000" },
        body,
        1,
        true
      ),
      180_000
    );
  });
  for (const callerDeadlineMs of [null, 45_000]) {
    test(`xhigh ${JSON.stringify(selector)} direct POST honors ${callerDeadlineMs ?? "reasoning"} deadline`, async (t) => {
      t.mock.timers.enable({ apis: ["setTimeout"] });
      const caller = new AbortController();
      const reason = new Error("caller deadline");
      if (callerDeadlineMs) setTimeout(() => caller.abort(reason), callerDeadlineMs);
      let notifyStarted!: () => void;
      const started = new Promise<void>((resolve) => {
        notifyStarted = resolve;
      });
      let signal: AbortSignal | null | undefined;
      let calls = 0;
      const pending = proxyFetch(
        "https://reasoning.example/v1/chat/completions",
        {
          method: "POST",
          body: JSON.stringify({ model: "gpt-5.5", ...selector }),
          ...(callerDeadlineMs ? { signal: caller.signal } : {}),
        },
        {
          undiciFetch: (_input, options) =>
            new Promise<Response>((resolve, reject) => {
              calls++;
              signal = options?.signal;
              const timer = setTimeout(() => resolve(new Response("ok")), 78_000);
              signal?.addEventListener(
                "abort",
                () => {
                  clearTimeout(timer);
                  reject(signal?.reason);
                },
                { once: true }
              );
              notifyStarted();
            }),
          nativeFetch: async () => {
            throw new Error("unexpected native fallback");
          },
        }
      ).catch((error: unknown) => error);
      await started;
      assert.ok(signal instanceof AbortSignal);
      t.mock.timers.tick(30_001);
      assert.equal(signal.aborted, false, "xhigh must not be cut by the flat 30s guard");
      t.mock.timers.tick((callerDeadlineMs ?? 78_000) - 30_001);
      const result = await pending;
      if (callerDeadlineMs) {
        assert.equal(result, reason, "the explicit caller deadline remains terminal");
      } else {
        assert.ok(result instanceof Response);
        assert.equal(await result.text(), "ok");
      }
      assert.equal(calls, 1, "a reasoning POST must never be replayed after an ambiguous timeout");
    });
  }
}

const REASONING_HIGH_BODY = JSON.stringify({
  model: "glm-5.2",
  reasoning_effort: "high",
  messages: [{ role: "user", content: "hi" }],
});
const REASONING_MAX_BODY = JSON.stringify({
  model: "glm-5.3",
  reasoning: { effort: "max" },
  messages: [{ role: "user", content: "hi" }],
});
const NON_REASONING_BODY = JSON.stringify({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "hi" }],
});

test("flat default is 30s when no body and no env override", () => {
  assert.equal(
    resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined }),
    30_000
  );
});

test("env override is honored when no reasoning body is present", () => {
  assert.equal(
    resolveDirectHeadersTimeoutMs({ OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "90000" }),
    90_000
  );
});

test("reasoning_effort=high body raises TTFB budget to the readiness ceiling (180s)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    REASONING_HIGH_BODY
  );
  assert.equal(got, 180_000, "high reasoning must align with the 180s readiness ceiling");
});

test("reasoning.effort=max nested body raises TTFB budget to the readiness ceiling (180s)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    REASONING_MAX_BODY
  );
  assert.equal(got, 180_000, "max reasoning must align with the 180s readiness ceiling");
});

test("reasoning body never yields a budget BELOW an explicit env override above the ceiling", () => {
  // Operator override is a floor; reasoning awareness only raises, never lowers.
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "240000" },
    REASONING_HIGH_BODY
  );
  assert.equal(got, 240_000, "explicit override above ceiling is preserved");
});

test("non-reasoning body keeps the flat default (zombie-socket detection preserved)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    NON_REASONING_BODY
  );
  assert.equal(got, 30_000, "non-reasoning requests keep 30s to detect zombie sockets");
});

test("non-reasoning body keeps the env override (no reasoning bump applied)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "90000" },
    NON_REASONING_BODY
  );
  assert.equal(got, 90_000);
});

test("local direct target (host.docker.internal Ollama) raises TTFB floor to 300s by default", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    NON_REASONING_BODY,
    0,
    false,
    "http://host.docker.internal:11434/v1/chat/completions"
  );
  assert.equal(got, 300_000, "local Ollama via Docker host gateway needs >30s for cold-start TTFB");
});

test("local direct target honors OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS override", () => {
  const got = resolveDirectHeadersTimeoutMs(
    {
      OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined,
      OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS: "420000",
    },
    NON_REASONING_BODY,
    0,
    false,
    "http://192.168.70.20:11434/v1/chat/completions"
  );
  assert.equal(got, 420_000);
});

test("remote direct target keeps the flat 30s default (zombie-socket detection preserved)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    NON_REASONING_BODY,
    0,
    false,
    "https://api.openai.com/v1/chat/completions"
  );
  assert.equal(got, 30_000);
});

test("proxyFetch resolver applies the local floor to the pooled attempt of a LAN target", () => {
  const saved = {
    flat: process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS,
    local: process.env.OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS,
  };
  delete process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  delete process.env.OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS;
  try {
    const local = directHeadersTimeoutResolver(
      { body: NON_REASONING_BODY },
      "http://localhost:11434/api/chat"
    );
    const remote = directHeadersTimeoutResolver(
      { body: NON_REASONING_BODY },
      "https://api.openai.com/v1/chat/completions"
    );
    assert.equal(local(0), 300_000);
    assert.equal(remote(0), 30_000);
  } finally {
    for (const [key, value] of [
      ["OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS", saved.flat],
      ["OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS", saved.local],
    ] as const) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
