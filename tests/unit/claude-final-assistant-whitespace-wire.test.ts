// Wire check for the final-assistant whitespace trim: drive the real executor with a
// captured fetch and read the body that would reach the relay.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-final-assistant-wire-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = path.join(TEST_ROOT, "data");
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// The trim must reach the wire, not just the helper: capture the real executor's send.
test("executor sends a final assistant turn with no trailing whitespace", async () => {
  const bodies: Array<Record<string, unknown>> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(init.body ?? "{}")));
    return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof globalThis.fetch;
  try {
    await new DefaultExecutor("anthropic-compatible-cc-probe").execute({
      model: "claude-sonnet-5-5",
      body: {
        model: "claude-sonnet-5-5",
        max_tokens: 16,
        messages: [
          { role: "user", content: [{ type: "text", text: "q" }] },
          { role: "assistant", content: [{ type: "text", text: "partial answer  \n" }] },
        ],
      },
      stream: false,
      credentials: {
        apiKey: "test-key",
        providerSpecificData: { baseUrl: "https://relay.example/v1" },
      },
    } as never);
  } finally {
    globalThis.fetch = originalFetch;
  }
  const sent = (bodies[0]?.messages as Array<Record<string, unknown>>).at(-1);
  assert.deepEqual(sent, {
    role: "assistant",
    content: [{ type: "text", text: "partial answer" }],
  });
});
