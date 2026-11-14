/**
 * Anthropic parses the Claude body with serde_json. A lone UTF-16 surrogate
 * is valid JSON (`\ud800`) and JSON.stringify emits it, but serde_json
 * answers 400 "unexpected end of hex escape". The turn then stops.
 * JSON.stringify leaves a paired emoji and U+FFFD as characters, not `\u` escapes.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { repairUnpairedSurrogates } from "../../open-sse/utils/repairUnpairedSurrogates.ts";

class PassthroughExecutor extends BaseExecutor {
  constructor() {
    super("claude", { baseUrls: ["https://parity.example.test/v1/x"] });
  }
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

async function claudeWire(content: unknown): Promise<string> {
  const originalFetch = globalThis.fetch;
  let wireBody = "";
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    wireBody = String(init.body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    await new PassthroughExecutor().execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        max_tokens: 16,
        messages: [{ role: "user", content }],
      },
      stream: false,
      credentials: { accessToken: "sk-ant-oat-parity-token" } as never,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(wireBody, "fetch must have been called with a body");
  return wireBody;
}

test("claude wire body replaces a lone surrogate before serde_json sees it", async () => {
  const wire = await claudeWire("cut \uD800 tail");
  assert.doesNotMatch(wire, /\\ud800/i);
  const parsed = JSON.parse(wire) as { messages: Array<{ content: string }> };
  assert.equal(parsed.messages[0].content, "cut \uFFFD tail");
});

test("claude wire body keeps a paired emoji", async () => {
  const wire = await claudeWire("hi \uD83D\uDE00");
  const parsed = JSON.parse(wire) as { messages: Array<{ content: string }> };
  assert.equal(parsed.messages[0].content, "hi \uD83D\uDE00");
  assert.doesNotMatch(parsed.messages[0].content, /\uFFFD/);
});

test("claude wire body repairs a surrogate inside a tool result block", async () => {
  const wire = await claudeWire([{ type: "tool_result", content: "sliced \uD800" }]);
  assert.doesNotMatch(wire, /\\ud800/i);
  const parsed = JSON.parse(wire) as {
    messages: Array<{ content: Array<{ content: string }> }>;
  };
  assert.equal(parsed.messages[0].content[0].content, "sliced \uFFFD");
});

test("repairUnpairedSurrogates keeps a pair and replaces a following lone surrogate", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "end \uD83D\uDE00\uDC00" }],
      },
    ],
  };
  repairUnpairedSurrogates(body);
  assert.equal(body.messages[0].content[0].text, "end \uD83D\uDE00\uFFFD");
});
