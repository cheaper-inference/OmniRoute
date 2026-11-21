/**
 * BaseExecutor must not JSON.parse a plain outbound body string back into an object.
 *
 * The parse-back produced `result.transformedBody` from the wire string. The live
 * `transformedBody` object already holds the same content and the non-enumerable
 * `_toolNameMap`, and chatCore logs the wire body from the fetch capture, which
 * parses the wire string on its own. On a 3 MB agent body the parse-back cost about
 * 4 ms of blocking event-loop time per attempt. This test pins:
 * 1. Work removal: no parse of the outbound body when the wire is plain JSON.stringify.
 * 2. Parity: `result.transformedBody` has the wire content, and keeps `_toolNameMap`.
 * 3. The fingerprint/CCH path keeps the parse-back (wire shape differs from the object).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";

const MARKER = "reparse-marker-7c2e";

class PassthroughExecutor extends BaseExecutor {
  toolNameMap: Map<string, string> | null = null;
  constructor(provider: string) {
    // Never fetched for real; every test stubs globalThis.fetch.
    super(provider, { baseUrls: ["https://reparse.example.test/v1/x"] });
  }
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    const out = { ...body };
    if (this.toolNameMap) {
      Object.defineProperty(out, "_toolNameMap", {
        value: this.toolNameMap,
        enumerable: false,
        configurable: true,
        writable: true,
      });
    }
    return out;
  }
}

function markerBody(): Record<string, unknown> {
  return {
    model: "some-model",
    stream: false,
    max_tokens: 16,
    messages: [{ role: "user", content: `hello ${MARKER}` }],
  };
}

async function run(executor: PassthroughExecutor, credentials: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  const originalParse = JSON.parse;
  const counter = { parses: 0 };
  let wireBody = "";
  globalThis.fetch = async (_u: string | URL | Request, init: RequestInit = {}) => {
    wireBody = String(init.body);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  JSON.parse = ((text: string, reviver?: Parameters<typeof JSON.parse>[1]) => {
    if (typeof text === "string" && text.includes(MARKER)) counter.parses += 1;
    return originalParse(text, reviver);
  }) as typeof JSON.parse;
  try {
    const result = await executor.execute({
      model: "some-model",
      body: markerBody(),
      stream: false,
      credentials: credentials as never,
    });
    return { result, wireBody, parses: counter.parses };
  } finally {
    globalThis.fetch = originalFetch;
    JSON.parse = originalParse;
  }
}

test("non-fingerprint path: execute() does not parse the outbound body back", async () => {
  const { result, wireBody, parses } = await run(new PassthroughExecutor("openai"), {
    apiKey: "test-key",
  });
  assert.ok(wireBody, "fetch must have been called with a body");
  assert.equal(parses, 0, `expected no parse of the outbound body, got ${parses}`);
  assert.deepEqual(result.transformedBody, JSON.parse(wireBody));
  assert.equal(result.model, "some-model");
});

test("fingerprint path (claude OAuth): result keeps the post-fingerprint wire shape", async () => {
  // The fingerprint reorders keys and CCH signing rewrites the billing header, so the
  // wire differs from the live object. The parse-back stays on this path on purpose.
  const { result, wireBody, parses } = await run(new PassthroughExecutor("claude"), {
    // base.ts treats an accessToken with the Claude OAuth prefix as an OAuth login.
    accessToken: ["sk-ant", "oat", "fixture"].join("-"),
  });
  assert.equal(parses, 1, `expected the one parse-back on the fingerprint path, got ${parses}`);
  assert.equal(JSON.stringify(result.transformedBody), wireBody);
});

test("_toolNameMap stays on result.transformedBody and never reaches the wire", async () => {
  const executor = new PassthroughExecutor("openai");
  executor.toolNameMap = new Map([["Read", "read"]]);
  const { result, wireBody } = await run(executor, { apiKey: "test-key" });
  const map = (result.transformedBody as Record<string, unknown>)._toolNameMap;
  assert.ok(map instanceof Map && map.get("Read") === "read", "tool-name map must survive");
  assert.equal(wireBody.includes("_toolNameMap"), false);
});
