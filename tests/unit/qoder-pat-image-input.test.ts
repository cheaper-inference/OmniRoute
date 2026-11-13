// A Qoder PAT connection runs the local qodercli binary, which receives text only: the prompt
// builder replaced every image part with the text "[Image omitted]", so the model answered
// without the picture and the caller never learned that. Image input needs an HTTP connection.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "qoder-pat-image-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, deleteProviderConnectionsByProvider } =
  await import("../../src/lib/db/providers.ts");
const { QoderExecutor } = await import("../../open-sse/executors/qoder.ts");
const { hasQoderImageParts } = await import("../../open-sse/services/qoderCapabilities.ts");

// Built from parts: a literal token-shaped string would trip secret scanners.
const PAT = ["pt", "image", "fixture"].join("-");
const HTTP_KEY = ["sk", "image", "fixture"].join("_");
const IMAGE_PART = { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } };

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

/** A fake qodercli that records that it ran. */
function withStubCli<T>(run: (marker: string) => Promise<T>): Promise<T> {
  const previousBin = process.env.CLI_QODER_BIN;
  const marker = path.join(dataDir, `cli-was-spawned-${Math.random().toString(36).slice(2)}`);
  const stub = path.join(dataDir, `qodercli-${path.basename(marker)}`);
  fs.writeFileSync(
    stub,
    `#!/bin/sh\ncat >/dev/null\ntouch "${marker}"\nprintf '%s\\n' '{"type":"result","is_error":false,"result":"blind answer"}'\n`,
    { mode: 0o755 }
  );
  process.env.CLI_QODER_BIN = stub;
  return run(marker).finally(() => {
    if (previousBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = previousBin;
  });
}

test("image parts are found in messages and in Responses-style input, plain text is not", () => {
  assert.equal(hasQoderImageParts({ messages: [{ role: "user", content: [IMAGE_PART] }] }), true);
  assert.equal(
    hasQoderImageParts({
      input: [{ role: "user", content: [{ type: "input_image", image_url: "https://x/y.png" }] }],
    }),
    true
  );
  assert.equal(
    hasQoderImageParts({
      messages: [{ role: "user", content: [{ type: "text", text: "see image_url" }] }],
    }),
    false
  );
  assert.equal(hasQoderImageParts({ messages: [{ role: "user", content: "hello" }] }), false);
  assert.equal(hasQoderImageParts(null), false);
  assert.equal(hasQoderImageParts({ messages: [null, "x", { content: null }] }), false);
});

test("PAT executor rejects image input with a 400 before it launches the local CLI", async () => {
  await withStubCli(async (marker) => {
    const { response } = await new QoderExecutor().execute({
      model: "qwen3.7-max",
      stream: false,
      credentials: { apiKey: PAT },
      body: {
        messages: [
          { role: "user", content: [{ type: "text", text: "What is this?" }, IMAGE_PART] },
        ],
      },
    });
    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.equal(payload.error.code, "image_input_unsupported");
    assert.match(payload.error.message, /PAT.*image/i);
    assert.doesNotMatch(payload.error.message, new RegExp(PAT));
    assert.equal(fs.existsSync(marker), false, "the CLI must not run for an image request");
  });
});

test("PAT executor still answers a text request", async () => {
  await withStubCli(async (marker) => {
    const { response } = await new QoderExecutor().execute({
      model: "qwen3.7-max",
      stream: false,
      credentials: { apiKey: PAT },
      body: { messages: [{ role: "user", content: "hello" }] },
    });
    assert.equal(response.status, 200);
    assert.equal(fs.existsSync(marker), true);
  });
});

test("an HTTP connection still forwards the image part to DashScope", async () => {
  const previousFetch = globalThis.fetch;
  let sent: { messages?: Array<{ content?: unknown }> } = {};
  globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
    sent = JSON.parse(String(init?.body));
    return Response.json({ id: "c", object: "chat.completion", choices: [] });
  }) as typeof fetch;
  try {
    const { response } = await new QoderExecutor().execute({
      model: "qwen3.7-max",
      stream: false,
      credentials: { apiKey: HTTP_KEY },
      body: { messages: [{ role: "user", content: [IMAGE_PART] }] },
    });
    assert.equal(response.status, 200);
    assert.deepEqual(sent.messages?.[0]?.content, [IMAGE_PART]);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("a combo skips a pinned PAT leg for an image request and reaches its fallback", async () => {
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  const { handleChat } = await import("../../src/sse/handlers/chat.ts");
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  await deleteProviderConnectionsByProvider("qoder");
  const pat = await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "Pinned PAT",
    apiKey: PAT,
    isActive: true,
  });
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Fallback",
    apiKey: HTTP_KEY,
    isActive: true,
  });
  await createCombo({
    name: "qoder-pat-image-fixture",
    strategy: "priority",
    models: [{ model: "qwen3.7-max", provider: "qoder", connectionId: pat.id }, "openai/gpt-4.1"],
  });
  const previousFetch = globalThis.fetch;
  let reachedFallback = false;
  globalThis.fetch = (async (input: unknown) => {
    assert.match(String(input), /api\.openai\.com/);
    reachedFallback = true;
    return Response.json({
      id: "chatcmpl-fixture",
      choices: [{ message: { role: "assistant", content: "I see it" }, finish_reason: "stop" }],
    });
  }) as typeof fetch;
  try {
    await withStubCli(async (marker) => {
      const response = await handleChat(
        new Request("http://localhost/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "qoder-pat-image-fixture",
            stream: false,
            messages: [
              { role: "user", content: [{ type: "text", text: "What is this?" }, IMAGE_PART] },
            ],
          }),
        })
      );
      const payload = await response.json();
      assert.equal(response.status, 200, JSON.stringify(payload));
      assert.equal(reachedFallback, true);
      assert.equal(payload.choices[0].message.content, "I see it");
      assert.equal(fs.existsSync(marker), false, "the PAT leg must not spawn the CLI");
    });
  } finally {
    globalThis.fetch = previousFetch;
    flushProxyLogsSync();
  }
});

test("an image request to a PAT-only Qoder pool is refused and never reaches the CLI", async () => {
  const { handleChat } = await import("../../src/sse/handlers/chat.ts");
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  await deleteProviderConnectionsByProvider("qoder");
  await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "Only PAT",
    apiKey: PAT,
    isActive: true,
  });
  try {
    await withStubCli(async (marker) => {
      const response = await handleChat(
        new Request("http://localhost/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "qoder/qwen3.7-max",
            stream: false,
            messages: [{ role: "user", content: [IMAGE_PART] }],
          }),
        })
      );
      const payload = await response.json();
      // Selection drops the PAT first, as it does for caller tools, so the client sees the pool-empty
      // answer. The 400 above is the executor's own guard for a caller that bypasses selection.
      assert.ok(response.status >= 400 && response.status < 500, JSON.stringify(payload));
      assert.equal(fs.existsSync(marker), false, "the CLI must not run for an image request");
    });
  } finally {
    flushProxyLogsSync();
  }
});
