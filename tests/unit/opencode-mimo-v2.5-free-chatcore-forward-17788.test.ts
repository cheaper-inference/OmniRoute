import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mimo-forward-17788-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "mimo-forward-17788-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/**
 * #17472 / #17788: OpenCode Zen answers the retired `mimo-v2.5-free` id with
 * `410 ... Use mimo-v2.6-flash-free instead.` A client pinned to the old id must
 * reach the upstream under the replacement id through the real chatCore path.
 */
for (const provider of ["opencode-zen", "opencode"]) {
  test(`chatCore forwards a ${provider} request pinned to mimo-v2.5-free as mimo-v2.6-flash-free`, async () => {
    const sentModels: unknown[] = [];
    globalThis.fetch = async (_url: unknown, init?: RequestInit) => {
      const parsed = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      sentModels.push(parsed.model);
      return new Response(
        JSON.stringify({
          id: "chatcmpl-1",
          object: "chat.completion",
          created: 1,
          model: parsed.model,
          choices: [
            { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    try {
      const body = {
        model: "mimo-v2.5-free",
        stream: false,
        messages: [{ role: "user", content: "hello" }],
      };
      const result = await handleChatCore({
        body: structuredClone(body),
        modelInfo: { provider, model: "mimo-v2.5-free", extendedContext: false },
        credentials: { apiKey: "sk-test", providerSpecificData: {} },
        log: { debug() {}, info() {}, warn() {}, error() {} },
        clientRawRequest: {
          endpoint: "/v1/chat/completions",
          body: structuredClone(body),
          headers: new Headers({ accept: "application/json" }),
        },
        userAgent: "mimo-forward-17788-test",
      });

      assert.equal(result.success, true, "request must not be rejected as a retired model");
      assert.deepEqual(sentModels, ["mimo-v2.6-flash-free"]);
      await result.response?.body?.cancel?.().catch(() => {});
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}
