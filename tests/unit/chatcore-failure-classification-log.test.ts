// F-C2-10: failure classification and its DB/state writes sat in a bare `catch {}`. When any write
// rejected, the rest of the block was skipped and nothing was logged, so a dead account stayed
// routable with no trace. The test makes the block's own console.warn throw (a stand-in for a
// failing write) and expects a warning on the request logger.
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-failure-class-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const warnings: Array<[string, string]> = [];

test.before(() => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: { message: "The model `classlog-model` does not exist", code: "model_not_found" },
      }),
      {
        status: 404,
        headers: { "content-type": "application/json" },
      }
    );
});

test.after(() => {
  mock.restoreAll();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failure while recording a provider failure is logged, not swallowed", async () => {
  const realWarn = console.warn;
  mock.method(console, "warn", (...args: unknown[]) => {
    if (String(args[0]).includes("model not found"))
      throw new Error("simulated state write failure");
    return realWarn(...(args as Parameters<typeof console.warn>));
  });
  const body = {
    model: "classlog-model",
    messages: [{ role: "user", content: "hi" }],
    stream: false,
  };
  await handleChatCore({
    body,
    modelInfo: {
      provider: "openai-compatible-classlog",
      model: "classlog-model",
      extendedContext: false,
    },
    connectionId: "classlog-connection",
    credentials: {
      connectionId: "classlog-connection",
      apiKey: ["class", "log", "key"].join("-"),
      providerSpecificData: { baseUrl: "https://classlog.example.test/v1" },
    },
    clientRawRequest: { endpoint: "/v1/chat/completions", body, headers: new Headers() },
    userAgent: "unit-test",
    log: {
      debug() {},
      info() {},
      error() {},
      warn: (tag: string, message: string) => warnings.push([tag, String(message)]),
    },
  } as never);
  assert.ok(
    warnings.some(([tag]) => tag === "PROVIDER_FAILURE"),
    `expected a PROVIDER_FAILURE warning, got ${JSON.stringify(warnings)}`
  );
});
