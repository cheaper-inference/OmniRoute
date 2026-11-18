import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

// OpencodeExecutor.applyDeepSeekJsonSchemaFallback must not push its instruction into the
// caller's array-valued system content: BaseExecutor.execute re-runs transformRequest on the
// same body for the 429 intra-URL retry, so every retry would stack another copy.
// The assertions count the instruction marker, never newlines.

// Never read the shared /tmp marker from the real machine (only the multi-account loop does).
// Set and restored in hooks so it cannot leak into other files under --test-isolation=none.
const MARKER_ENV = "OPENCODE_POOL_STRAIN_MARKER_PATH";
let priorMarker: string | undefined;
let markerDir = "";

before(() => {
  priorMarker = process.env[MARKER_ENV];
  markerDir = fs.mkdtempSync(path.join(os.tmpdir(), "oc-schema-retry-"));
  process.env[MARKER_ENV] = path.join(markerDir, "strain.json");
});

after(() => {
  if (priorMarker === undefined) delete process.env[MARKER_ENV];
  else process.env[MARKER_ENV] = priorMarker;
  fs.rmSync(markerDir, { recursive: true, force: true });
});

const MARKER = "You must respond with valid JSON that strictly follows";
const MODEL = "deepseek-v4-flash-free";
const SCHEMA = {
  type: "object",
  properties: { ok: { type: "boolean" } },
  required: ["ok"],
};

type Message = { role?: string; content?: unknown };
type Sent = { messages: Message[]; response_format?: unknown } & Record<string, unknown>;

function countMarker(messages: Message[]): number {
  let n = 0;
  for (const m of messages) {
    const parts = Array.isArray(m.content)
      ? (m.content as Array<{ text?: unknown }>).map((p) => p?.text ?? "")
      : [m.content];
    for (const text of parts) {
      if (typeof text === "string") n += text.split(MARKER).length - 1;
    }
  }
  return n;
}

// Real OpencodeExecutor.execute() -> BaseExecutor.execute(): the first upstream call is a 429
// (retried intra-URL after the 1 ms Retry-After hint), the second a 200. The fetch stub fails
// closed on any URL outside opencode.ai.
async function runWithRetry(body: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  const sent: Sent[] = [];
  const urls: string[] = [];
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    const target = String(url instanceof Request ? url.url : url);
    urls.push(target);
    if (!target.startsWith("https://opencode.ai/")) {
      throw new Error(`unexpected outbound URL in test: ${target}`);
    }
    sent.push(JSON.parse(String(init.body)));
    if (sent.length === 1) {
      return new Response(JSON.stringify({ error: { message: "slow down" } }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "0.001" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const executor = new OpencodeExecutor("opencode-zen");
    const result = await executor.execute({
      model: MODEL,
      body,
      stream: false,
      credentials: { apiKey: "test-key" },
    } as unknown as Parameters<OpencodeExecutor["execute"]>[0]);
    assert.equal((result as { response: Response }).response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { sent, urls };
}

// opencode-zen is the only registered provider id the fallback gate applies to (the gate also
// names a bare "opencode" id, which no registry entry defines; opencode-go is not gated).
test(`opencode-zen: array system content gets ONE schema instruction across a 429 retry and the caller body is untouched`, async () => {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: [{ type: "text", text: "Be terse." }] },
      { role: "user", content: "give me JSON" },
    ],
    response_format: { type: "json_schema", json_schema: { name: "s", schema: SCHEMA } },
  };
  const snapshot = structuredClone(body);

  const { sent, urls } = await runWithRetry(body);

  assert.equal(sent.length, 2, `expected one 429 attempt and one retry, saw ${urls.join(",")}`);
  assert.deepStrictEqual(body.messages, snapshot.messages, "caller messages were mutated");
  assert.deepStrictEqual(body, snapshot, "caller body was mutated");
  assert.equal(countMarker(sent[0].messages), 1, "first attempt");
  assert.equal(countMarker(sent[1].messages), 1, "retry must not stack a second copy");
  assert.deepStrictEqual(sent[1].response_format, { type: "json_object" });
});
