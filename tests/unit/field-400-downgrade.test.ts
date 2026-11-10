import { test, after } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { detectRejectedMessageFields } from "../../open-sse/config/providerFieldStrips.ts";

// A minimal executor that passes through the body unchanged (no transformRequest
// side-effects) so we can assert on exactly what base.ts sends upstream.
class SimpleExecutor extends BaseExecutor {
  constructor() {
    super("test-provider", {
      baseUrls: ["https://primary.example/v1/chat/completions"],
    });
  }

  async transformRequest(_model: string, body: Record<string, unknown>) {
    // Return a shallow copy to avoid mutating the caller's body.
    return { ...body };
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Task 2.2: generic reactive 400 field-downgrade wired into base.ts
// ──────────────────────────────────────────────────────────────────────────────

test("BaseExecutor.execute strips a known-offending field and retries once on 400", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);

    if (capturedBodies.length === 1) {
      // First call: upstream rejects reasoning_budget with a 400.
      return new Response(
        JSON.stringify({ error: "Invalid argument: reasoning_budget not supported" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Second call (retry without the field): success.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_budget: 5000,
      },
      stream: false,
      credentials: {},
    });

    // fetch must have been called exactly twice (original + 1 retry).
    assert.equal(capturedBodies.length, 2, "fetch should be called exactly twice");

    // First request contained the offending field.
    assert.equal(capturedBodies[0].reasoning_budget, 5000);

    // Second request must NOT contain the offending field.
    assert.equal(
      "reasoning_budget" in capturedBodies[1],
      false,
      "reasoning_budget should be absent from the retry body"
    );

    // The final response is the 200 from the retry.
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute does NOT retry when the 400 body does not name a known field", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(JSON.stringify({ error: "some random upstream error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });

    // Only one fetch call — no spurious retry.
    assert.equal(callCount, 1, "fetch should not retry for unknown 400 error bodies");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute strips at most once per field per execute() call (strippedFields guard)", async () => {
  // Simulate: first fetch → 400 with reasoning_budget in body → strip+retry.
  // The retry also returns 400 naming the same field (e.g. server echoes it differently).
  // The guard must NOT strip+retry a second time for the same field.
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);

    // Both calls return 400 naming the same field — but only the first should
    // trigger a strip (strippedFields.has(offending) will be true on the 2nd).
    return new Response(JSON.stringify({ error: "reasoning_budget not supported" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_budget: 1000 },
      stream: false,
      credentials: {},
    });

    // Exactly 2 fetches: original (with field) + 1 retry (without field).
    // No third fetch because strippedFields guards against re-stripping the same field.
    assert.equal(
      capturedBodies.length,
      2,
      "should be exactly 2 fetches (original + 1 strip retry)"
    );

    // First had the field; second did not.
    assert.equal(capturedBodies[0].reasoning_budget, 1000);
    assert.equal("reasoning_budget" in capturedBodies[1], false);

    // The final response is the second (still-400) one — no infinite loop.
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// Per-message rejected fields: the 400 names a field that lives on messages[*],
// not at the top level (Groq "'messages.N' : property 'X' is unsupported",
// pydantic-style extra_forbidden with a loc path through "messages").
// ──────────────────────────────────────────────────────────────────────────────

const GROQ_MESSAGE_FIELD_ERROR = JSON.stringify({
  error: {
    message:
      "'messages.2' : for 'role:assistant' the following must be satisfied[('messages.2' : property 'reasoning_content' is unsupported)]",
    type: "invalid_request_error",
  },
});

function jsonResponse(payload: unknown, status: number): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("detectRejectedMessageFields parses Groq and pydantic per-message rejections", () => {
  assert.deepEqual(detectRejectedMessageFields(GROQ_MESSAGE_FIELD_ERROR), ["reasoning_content"]);
  const pydantic = JSON.stringify({
    detail: [
      {
        type: "extra_forbidden",
        loc: ["body", "messages", 2, "assistant", "reasoning_details"],
        msg: "Extra inputs are not permitted",
      },
      {
        type: "extra_forbidden",
        loc: ["body", "top_level_thing"],
        msg: "Extra inputs are not permitted",
      },
    ],
  });
  assert.deepEqual(detectRejectedMessageFields(pydantic), ["reasoning_details"]);
  const nested = JSON.stringify({
    error: {
      detail: [{ type: "extra_forbidden", loc: ["body", "messages", 0, "user", "sender"] }],
    },
  });
  assert.deepEqual(detectRejectedMessageFields(nested), ["sender"]);
});

test("detectRejectedMessageFields never returns semantic message fields or junk", () => {
  const semantic =
    "'messages.1' : property 'content' is unsupported; 'messages.1' : property 'role' is unsupported";
  assert.deepEqual(detectRejectedMessageFields(semantic), []);
  assert.deepEqual(
    detectRejectedMessageFields("'messages.4' : property 'tool_calls' is unsupported"),
    []
  );
  assert.deepEqual(detectRejectedMessageFields("some random upstream error"), []);
  assert.deepEqual(detectRejectedMessageFields(""), []);
  // Top-level property rejections are not per-message fields.
  assert.deepEqual(detectRejectedMessageFields("property 'logprobs' is unsupported"), []);
  // Pathological input stays fast (bounded regex) and yields nothing.
  const started = Date.now();
  assert.deepEqual(detectRejectedMessageFields(`messages.${"1".repeat(50000)} : property`), []);
  assert.ok(Date.now() - started < 500, "parsing must not backtrack catastrophically");
});

test("BaseExecutor.execute strips a per-message field named in a Groq-style 400 and retries once", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBodies.push(JSON.parse(String(init.body)));
    if (capturedBodies.length === 1) return new Response(GROQ_MESSAGE_FIELD_ERROR, { status: 400 });
    return jsonResponse({ ok: true }, 200);
  };

  const assistant = { role: "assistant", content: "thinking", reasoning_content: "replayed" };
  const body = {
    messages: [
      { role: "system", content: "sys" },
      { role: "user", content: "hi", reasoning_content: "" },
      assistant,
      { role: "user", content: "next" },
    ],
  };

  try {
    const result = await executor.execute({
      model: "openai/gpt-oss-120b",
      body,
      stream: false,
      credentials: {},
    });

    assert.equal(capturedBodies.length, 2, "fetch should be called exactly twice");
    const firstMessages = capturedBodies[0].messages as Record<string, unknown>[];
    assert.equal(firstMessages[2].reasoning_content, "replayed");
    const retryMessages = capturedBodies[1].messages as Record<string, unknown>[];
    assert.equal(retryMessages.length, 4);
    for (const message of retryMessages) {
      assert.equal("reasoning_content" in message, false, "no message may keep reasoning_content");
    }
    assert.equal(retryMessages[2].content, "thinking");
    assert.equal(retryMessages[2].role, "assistant");
    assert.equal(result.response.status, 200);

    // The caller's message objects are never mutated (combo fallback reuses them).
    assert.equal(assistant.reasoning_content, "replayed");
    assert.equal(body.messages[1].reasoning_content, "");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute strips a per-message field named by a pydantic extra_forbidden 400", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedBodies.push(JSON.parse(String(init.body)));
    if (capturedBodies.length === 1) {
      return jsonResponse(
        {
          detail: [
            {
              type: "extra_forbidden",
              loc: ["body", "messages", 1, "assistant", "reasoning_details"],
              msg: "Extra inputs are not permitted",
            },
          ],
        },
        400
      );
    }
    return jsonResponse({ ok: true }, 200);
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: {
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "ok", reasoning_details: [{ type: "text", text: "x" }] },
        ],
      },
      stream: false,
      credentials: {},
    });

    assert.equal(capturedBodies.length, 2);
    const retryMessages = capturedBodies[1].messages as Record<string, unknown>[];
    assert.equal("reasoning_details" in retryMessages[1], false);
    assert.equal(retryMessages[1].content, "ok");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute does NOT strip or retry when the 400 names a semantic message field", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return jsonResponse(
      { error: { message: "'messages.0' : property 'content' is unsupported" } },
      400
    );
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 1, "a semantic field must never trigger a strip-and-retry");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute strips a per-message field at most once per execute() call", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(GROQ_MESSAGE_FIELD_ERROR, { status: 400 });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: {
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: "a", reasoning_content: "r" },
        ],
      },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 2, "original + exactly one per-message strip retry");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute does NOT retry when no message carries the named field", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(GROQ_MESSAGE_FIELD_ERROR, { status: 400 });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.equal(callCount, 1);
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
