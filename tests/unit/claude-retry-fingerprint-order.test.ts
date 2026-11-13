import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { CLI_FINGERPRINTS } from "../../open-sse/config/cliFingerprints.ts";

class RelayExecutor extends BaseExecutor {
  constructor() {
    super("claude", { baseUrls: ["https://retry-order.example.test/v1/messages"] });
  }
  needsRefresh() {
    return false;
  }
}

type Wire = { body: Record<string, unknown>; headers: Record<string, string> };

// An OAuth-looking access token turns the Claude Code fingerprint on. Built from parts so no
// credential-shaped literal sits in the file.
const oauthToken = (tag: string) => ["sk", "ant", "oat" + tag].join("-");

// First answer: 400 "verbosity: Extra inputs are not permitted" (the field downgrade retries the
// same body without it). Second answer: 200. Both wire bodies are recorded as sent.
async function dispatch(credentials: Record<string, unknown>): Promise<Wire[]> {
  const originalFetch = globalThis.fetch;
  const wires: Wire[] = [];
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    wires.push({
      body: JSON.parse(String(init.body)),
      headers: Object.fromEntries(new Headers(init.headers as HeadersInit).entries()),
    });
    if (wires.length === 1) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: {
            type: "invalid_request_error",
            message: "verbosity: Extra inputs are not permitted",
          },
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ id: "msg_1", type: "message" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    await new RelayExecutor().execute({
      model: "claude-sonnet-4-5",
      body: {
        stream: false,
        max_tokens: 64,
        messages: [{ role: "user", content: "hi" }],
        model: "claude-sonnet-4-5",
        verbosity: "low",
        system: "be brief",
      },
      stream: false,
      credentials: credentials as never,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  return wires;
}

test("the retry body keeps the CLI body-field order of the first send", async () => {
  const wires = await dispatch({ accessToken: oauthToken("01-order") });
  assert.equal(wires.length, 2, "one send and one retry");
  const order = CLI_FINGERPRINTS["claude-code-compatible"].bodyFieldOrder ?? [];
  const firstKeys = Object.keys(wires[0].body);
  const retryKeys = Object.keys(wires[1].body);
  assert.deepEqual(
    firstKeys.slice(0, order.filter((k: string) => k in wires[0].body).length),
    order.filter((k: string) => k in wires[0].body),
    "the first send carries the fingerprint order"
  );
  const expectedRetry = firstKeys.filter((key) => key in wires[1].body);
  assert.deepEqual(retryKeys, expectedRetry, "the retry must keep the same relative key order");
});

test("the retry still drops the rejected field", async () => {
  const wires = await dispatch({ accessToken: oauthToken("02-order") });
  assert.ok("verbosity" in wires[0].body);
  assert.ok(!("verbosity" in wires[1].body));
});
