import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

// The executor reads its URL setting through the settings DB; isolate it so the
// suite never opens the real ~/.omniroute database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-server-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const executorModule = await import("../../open-sse/executors/opencodeServer.ts");
const { buildServerEnv } = await import("../../open-sse/services/opencodeServerSafety.ts");

// Every handle must be released or the node:test process never exits: the shared
// /event stream has a reconnect loop that otherwise keeps retrying a dead fake.
test.after(() => {
  executorModule.closeOpencodeServerEventBus();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Json = Record<string, unknown>;

// Walks a parsed JSON value without `any`: returns undefined on any missing hop.
function dig(value: unknown, ...path: Array<string | number>): unknown {
  let current = value;
  for (const key of path) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string | number, unknown>)[key];
  }
  return current;
}

type Captured = { method: string; url: string; body: Json | null };

/**
 * Minimal stand-in for `opencode serve`.
 *
 * The executor must never be unit-tested against a real opencode binary: the
 * whole point of this suite is the wire translation (OpenAI chat/Responses in,
 * session/parts out) and that is fully described by these four endpoints.
 */
async function startFakeServer(): Promise<{
  url: string;
  close: () => Promise<void>;
  calls: Captured[];
  lastPrompt: () => Captured | undefined;
  setAssistantText: (text: string) => void;
  failWith: (route: "session" | "prompt_async", status: number, body: string) => void;
}> {
  const calls: Captured[] = [];
  const eventLog = new Map<string, Json[]>();
  let assistantText = "OK";
  let sessionSeq = 0;
  const failures = new Map<string, { status: number; body: string }>();

  const server = http.createServer((req, res) => {
    const url = req.url || "/";

    // The shared /event stream is long-lived and must be claimed before any
    // body/route handling, otherwise the catch-all below would 404 it.
    if (url.startsWith("/event")) {
      res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
      res.write(`data: ${JSON.stringify({ type: "server.connected", properties: {} })}\n\n`);
      // Replay: the executor opens the shared stream lazily, so frames emitted
      // before it connected would otherwise be lost and the turn would hang.
      for (const frames of eventLog.values()) {
        for (const frame of frames) res.write(`data: ${JSON.stringify(frame)}\n\n`);
      }
      eventClients.add(res);
      req.on("close", () => eventClients.delete(res));
      return;
    }

    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      let body: Json | null = null;
      try {
        body = raw ? JSON.parse(raw) : null;
      } catch {
        body = null;
      }
      calls.push({ method: req.method || "GET", url, body });

      const json = (status: number, payload: unknown) => {
        res.writeHead(status, { "content-type": "application/json" });
        res.end(JSON.stringify(payload));
      };

      if (url === "/global/health") return json(200, { healthy: true, version: "0.0.0-test" });

      if (url === "/config/providers") {
        return json(200, {
          default: { opencode: "test-model" },
          providers: [
            {
              id: "opencode",
              name: "OpenCode",
              models: {
                "test-model": {
                  id: "test-model",
                  name: "Test Model",
                  cost: { input: 0, output: 0 },
                  limit: { context: 200000, output: 8192 },
                  capabilities: { toolcall: true, reasoning: true },
                },
                "paid-model": {
                  id: "paid-model",
                  name: "Paid Model",
                  cost: { input: 2.5, output: 15 },
                  limit: { context: 100000 },
                  capabilities: { toolcall: false, reasoning: false },
                },
              },
            },
          ],
        });
      }

      if (url === "/session" && req.method === "POST") {
        const failure = failures.get("session");
        if (failure) {
          res.writeHead(failure.status, { "content-type": "text/plain" });
          return res.end(failure.body);
        }
        sessionSeq += 1;
        return json(200, { id: `ses_test_${sessionSeq}`, title: body?.title });
      }

      const messageMatch = /^\/session\/([^/]+)\/message$/.exec(url);
      if (messageMatch && req.method === "POST") {
        return json(200, {
          info: {
            id: "msg_assistant",
            role: "assistant",
            sessionID: messageMatch[1],
            finish: "stop",
            tokens: { input: 12, output: 3, reasoning: 1, cache: { read: 8, write: 0 } },
          },
          parts: [
            { type: "step-start", id: "prt_1", messageID: "msg_assistant" },
            { type: "text", id: "prt_2", messageID: "msg_assistant", text: assistantText },
            { type: "step-finish", id: "prt_3", messageID: "msg_assistant" },
          ],
        });
      }

      const asyncMatch = /^\/session\/([^/]+)\/prompt_async$/.exec(url);
      if (asyncMatch && req.method === "POST") {
        const failure = failures.get("prompt_async");
        if (failure) {
          res.writeHead(failure.status, { "content-type": "text/plain" });
          return res.end(failure.body);
        }
        res.writeHead(204);
        res.end();
        // Deliver the same shape the real server emits on /event.
        setTimeout(() => {
          broadcast(asyncMatch[1]);
        }, 10);
        return;
      }

      if (/^\/session\/[^/]+$/.test(url) && req.method === "DELETE") return json(200, true);

      return json(404, { name: "NotFound", data: { message: `no route for ${url}` } });
    });
  });

  const eventClients = new Set<http.ServerResponse>();
  function broadcast(sessionID: string): void {
    const frames = [
      {
        type: "message.updated",
        properties: { info: { id: "msg_assistant", role: "assistant", sessionID } },
      },
      {
        type: "message.part.delta",
        properties: {
          sessionID,
          messageID: "msg_assistant",
          partID: "prt_2",
          field: "text",
          delta: assistantText,
        },
      },
      { type: "session.idle", properties: { sessionID } },
    ];
    eventLog.set(sessionID, frames);
    for (const client of eventClients) {
      for (const frame of frames) client.write(`data: ${JSON.stringify(frame)}\n\n`);
    }
  }

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as AddressInfo;

  return {
    url: `http://127.0.0.1:${address.port}`,
    calls,
    lastPrompt: () => [...calls].reverse().find((call) => call.url.endsWith("/message")),
    setAssistantText: (text: string) => {
      assistantText = text;
    },
    failWith: (route, status, body) => {
      failures.set(route, { status, body });
    },
    close: () =>
      new Promise<void>((resolve) => {
        for (const client of eventClients) client.end();
        server.close(() => resolve());
      }),
  };
}

test("opencode-server: maps a chat request onto an opencode session turn", async () => {
  const fake = await startFakeServer();
  process.env.OPENCODE_SERVER_URL = fake.url;
  const { OpencodeServerExecutor } = await import("../../open-sse/executors/opencodeServer.ts");
  const { clearOpencodeServerSettingsCache } =
    await import("../../open-sse/executors/opencodeServer.ts");
  clearOpencodeServerSettingsCache();

  try {
    const executor = new OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: {
        messages: [
          { role: "system", content: "be terse" },
          { role: "user", content: "hi" },
        ],
      },
      stream: false,
      credentials: {},
    });

    assert.equal(result.response.status, 200);
    const payload = (await result.response.json()) as Json;
    assert.equal(dig(payload, "object"), "chat.completion");
    assert.equal(dig(payload, "choices", 0, "message", "content"), "OK");
    assert.equal(dig(payload, "choices", 0, "finish_reason"), "stop");
    // input 12 + cache.read 8
    assert.equal(dig(payload, "usage", "prompt_tokens"), 20);
    assert.equal(dig(payload, "usage", "completion_tokens_details", "reasoning_tokens"), 1);

    const prompt = fake.lastPrompt();
    assert.ok(prompt, "expected a POST to /session/:id/message");
    // `system` is a STRING on purpose: on the server it replaces the agent
    // system prompt (~6.8k tokens) instead of appending to it.
    assert.equal(typeof dig(prompt, "body", "system"), "string");
    assert.match(String(dig(prompt, "body", "system")), /be terse/);
    // Tools must be disabled, otherwise the agent toolset is injected again.
    assert.deepEqual(dig(prompt, "body", "tools"), {});
    assert.equal(dig(prompt, "body", "model", "providerID"), "opencode");
    assert.equal(dig(prompt, "body", "model", "modelID"), "test-model");
    assert.equal(dig(prompt, "body", "parts", 0, "type"), "text");
    assert.match(String(dig(prompt, "body", "parts", 0, "text")), /\[user\] hi/);
  } finally {
    await fake.close();
  }
});

test("opencode-server: unknown model fails loudly instead of hitting the upstream", async () => {
  const fake = await startFakeServer();
  process.env.OPENCODE_SERVER_URL = fake.url;
  const { OpencodeServerExecutor, clearOpencodeServerSettingsCache } =
    await import("../../open-sse/executors/opencodeServer.ts");
  clearOpencodeServerSettingsCache();

  try {
    const executor = new OpencodeServerExecutor();
    await assert.rejects(
      executor.execute({
        model: "opencode-server/does-not-exist",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {},
      }),
      /unknown model/
    );
  } finally {
    await fake.close();
  }
});

test("opencode-server: streaming forwards deltas and terminates with [DONE]", async () => {
  const fake = await startFakeServer();
  fake.setAssistantText("streamed-text");
  process.env.OPENCODE_SERVER_URL = fake.url;
  const { OpencodeServerExecutor, clearOpencodeServerSettingsCache } =
    await import("../../open-sse/executors/opencodeServer.ts");
  clearOpencodeServerSettingsCache();

  try {
    const executor = new OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {},
    });

    assert.equal(result.response.status, 200);
    const raw = await result.response.text();
    assert.match(raw, /"content":"streamed-text"/);
    assert.match(raw, /"finish_reason":"stop"/);
    assert.match(raw, /data: \[DONE\]/);
    // The async prompt path must be used, never the blocking one.
    assert.ok(fake.calls.some((call) => call.url.endsWith("/prompt_async")));
  } finally {
    await fake.close();
  }
});

test("opencode-server: tool envelope becomes OpenAI tool_calls", async () => {
  const fake = await startFakeServer();
  fake.setAssistantText('{"tool_calls":[{"name":"get_weather","arguments":{"city":"Lisboa"}}]}');
  process.env.OPENCODE_SERVER_URL = fake.url;
  const { OpencodeServerExecutor, clearOpencodeServerSettingsCache } =
    await import("../../open-sse/executors/opencodeServer.ts");
  clearOpencodeServerSettingsCache();

  try {
    const executor = new OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: {
        messages: [{ role: "user", content: "weather in Lisboa?" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_weather",
              description: "weather",
              parameters: { type: "object" },
            },
          },
        ],
        tool_choice: "required",
      },
      stream: false,
      credentials: {},
    });

    const payload = (await result.response.json()) as Json;
    assert.equal(dig(payload, "choices", 0, "finish_reason"), "tool_calls");
    assert.equal(dig(payload, "choices", 0, "message", "content"), null);
    assert.equal(
      dig(payload, "choices", 0, "message", "tool_calls", 0, "function", "name"),
      "get_weather"
    );
    assert.deepEqual(
      JSON.parse(
        String(dig(payload, "choices", 0, "message", "tool_calls", 0, "function", "arguments"))
      ),
      {
        city: "Lisboa",
      }
    );
  } finally {
    await fake.close();
  }
});

test("opencode-server: Responses input produces a Responses payload", async () => {
  const fake = await startFakeServer();
  process.env.OPENCODE_SERVER_URL = fake.url;
  const { OpencodeServerExecutor, clearOpencodeServerSettingsCache } =
    await import("../../open-sse/executors/opencodeServer.ts");
  clearOpencodeServerSettingsCache();

  try {
    const executor = new OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { input: "just say OK" },
      stream: false,
      credentials: {},
    });

    const payload = (await result.response.json()) as Json;
    assert.equal(dig(payload, "object"), "response");
    assert.equal(dig(payload, "status"), "completed");
    assert.equal(dig(payload, "output_text"), "OK");
    assert.equal(dig(payload, "usage", "input_tokens"), 20);
  } finally {
    await fake.close();
  }
});
const LEAKY_UPSTREAM_BODY =
  "Error: boom at /home/operator/.local/share/opencode/auth.json sk-live-SECRETSECRETSECRET12345 (stack: at Object.<anonymous> /srv/app.js:1:1)";

test("opencode-server: upstream error text is never echoed to the client (non-stream)", async () => {
  const fake = await startFakeServer();
  fake.failWith("session", 500, LEAKY_UPSTREAM_BODY);
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();

  try {
    const executor = new executorModule.OpencodeServerExecutor();
    await assert.rejects(
      executor.execute({
        model: "opencode-server/test-model",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {},
      }),
      (error: Error) => {
        assert.match(error.message, /\[opencode-server\] \/session -> 500/);
        assert.doesNotMatch(error.message, /SECRET|auth\.json|stack|\/srv\/app/);
        return true;
      }
    );
  } finally {
    await fake.close();
  }
});

test("opencode-server: streaming errors use the sanitized error envelope", async () => {
  const fake = await startFakeServer();
  fake.failWith("prompt_async", 500, LEAKY_UPSTREAM_BODY);
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();

  try {
    const executor = new executorModule.OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {},
    });
    const raw = await result.response.text();
    assert.match(raw, /"error":/);
    assert.match(raw, /"code":"bad_gateway"/);
    assert.match(raw, /\[opencode-server\]/);
    assert.doesNotMatch(raw, /SECRET|auth\.json|stack|\/srv\/app/);
  } finally {
    await fake.close();
  }
});

test("opencode-server: only https and data URLs are forwarded as file parts", async () => {
  const fake = await startFakeServer();
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();

  try {
    const executor = new executorModule.OpencodeServerExecutor();
    await executor.execute({
      model: "opencode-server/test-model",
      body: {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "look" },
              { type: "image_url", image_url: { url: "file:///etc/passwd" } },
              { type: "image_url", image_url: { url: "http://127.0.0.1:8080/secret.png" } },
              { type: "image_url", image_url: { url: "https://localhost/secret.png" } },
              { type: "image_url", image_url: { url: "https://192.168.1.10/secret.png" } },
              { type: "input_file", file_url: "/etc/shadow" },
              { type: "image_url", image_url: { url: "https://example.com/ok.png" } },
              { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
            ],
          },
        ],
      },
      stream: false,
      credentials: {},
    });
    const prompt = fake.lastPrompt();
    assert.ok(prompt);
    const urls = (dig(prompt, "body", "parts") as Json[])
      .filter((part) => part.type === "file")
      .map((part) => part.url);
    assert.deepEqual(urls, ["https://example.com/ok.png", "data:image/png;base64,AAAA"]);
  } finally {
    await fake.close();
  }
});

test("opencode-server: the spawned server gets a minimal environment, not process.env", () => {
  const env = buildServerEnv({
    PATH: "/usr/bin",
    HOME: "/home/op",
    JWT_SECRET: "jwt-secret-value",
    API_KEY_SECRET: "api-key-secret-value",
    STORAGE_ENCRYPTION_KEY: "storage-key",
    OPENAI_API_KEY: "sk-provider",
    OPENCODE_CONFIG: "/home/op/opencode.json",
  });
  assert.deepEqual(env, {
    PATH: "/usr/bin",
    HOME: "/home/op",
    OPENCODE_CONFIG: "/home/op/opencode.json",
  });
});

test("opencode-server: the CLI binary is not a settings key", async () => {
  const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  const parsed = updateSettingsSchema.safeParse({
    opencode_server_url: "http://127.0.0.1:4096",
    opencode_server_bin: "/tmp/evil",
  });
  if (parsed.success) {
    assert.equal(parsed.data.opencode_server_url, "http://127.0.0.1:4096");
    assert.equal("opencode_server_bin" in parsed.data, false);
  }
});

// A loopback port with nothing listening (bound, then released).
async function deadLoopbackUrl(): Promise<string> {
  const probe = http.createServer();
  await new Promise<void>((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address() as AddressInfo;
  await new Promise<void>((resolve) => probe.close(() => resolve()));
  return `http://127.0.0.1:${port}`;
}

test("opencode-server: a request never spawns the server; a dead server is a clean 503", async () => {
  // OPENCODE_SERVER_BIN points at a script that leaves a marker when executed. The
  // old executor autostarted `opencode serve` from the request path (Hard Rules
  // #15/#17); now only the local-only /api/services/opencode-server/start does.
  const marker = path.join(TEST_DATA_DIR, "spawned.marker");
  const fakeBin = path.join(TEST_DATA_DIR, "fake-opencode.sh");
  fs.writeFileSync(fakeBin, `#!/bin/sh\necho spawned > "${marker}"\nsleep 5\n`, { mode: 0o755 });
  process.env.OPENCODE_SERVER_URL = await deadLoopbackUrl();
  process.env.OPENCODE_SERVER_BIN = fakeBin;
  executorModule.clearOpencodeServerSettingsCache();
  try {
    const executor = new executorModule.OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.equal(result.response.status, 503);
    const payload = (await result.response.json()) as Json;
    const message = String(dig(payload, "error", "message"));
    assert.match(message, /opencode server not running/);
    assert.match(message, /opencode serve/);
    assert.doesNotMatch(JSON.stringify(payload), /\bat \S+:\d+:\d+|node:internal|Error:/);
    await new Promise((resolve) => setTimeout(resolve, 300));
    assert.equal(fs.existsSync(marker), false, "the executor must not spawn anything");
  } finally {
    delete process.env.OPENCODE_SERVER_BIN;
  }
});

test("opencode-server: the executor's import graph carries no process API", () => {
  // Static half of the guarantee above, mirroring check:route-guard-membership:
  // none of the executor's own modules may load child_process / worker_threads,
  // and the launcher (which does) is not imported by the executor.
  const root = path.resolve(import.meta.dirname, "../..");
  const executorSource = fs.readFileSync(
    path.join(root, "open-sse/executors/opencodeServer.ts"),
    "utf8"
  );
  assert.doesNotMatch(executorSource, /(?:from\s*|import\s*\(\s*)["'][^"']*opencodeServerLauncher/);
  for (const rel of [
    "open-sse/executors/opencodeServer.ts",
    "open-sse/services/opencodeServerEndpoint.ts",
    "open-sse/services/opencodeServerEventBus.ts",
    "open-sse/services/opencodeServerSafety.ts",
    "open-sse/services/opencodeServerSettings.ts",
    "open-sse/services/opencodeServerWire.ts",
  ]) {
    const source = fs.readFileSync(path.join(root, rel), "utf8");
    assert.doesNotMatch(source, /["'](?:node:)?(?:child_process|worker_threads)["']/, rel);
  }
});

test("opencode-server: closing the event bus stops its reconnect loop", async () => {
  const fake = await startFakeServer();
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();

  const executor = new executorModule.OpencodeServerExecutor();
  const result = await executor.execute({
    model: "opencode-server/test-model",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: {},
  });
  await result.response.text();
  // Kill the server first: with the old bus this left a retry loop (and its
  // timers) running forever against a dead port.
  await fake.close();
  executorModule.closeOpencodeServerEventBus();
  executorModule.closeOpencodeServerEventBus(); // idempotent
});

test("opencode-server: the URL setting is pushed by the runtime-settings applier, never read from src/", async () => {
  // open-sse must not gain an import edge into src/ (boundary ratchet): the dashboard
  // URL setting reaches the executor through applyRuntimeSettings(), like every other
  // runtime-tunable open-sse knob, and lives on globalThis so every bundle sees it.
  const root = path.resolve(import.meta.dirname, "../..");
  const settingsSource = fs.readFileSync(
    path.join(root, "open-sse/services/opencodeServerSettings.ts"),
    "utf8"
  );
  assert.doesNotMatch(settingsSource, /["']@\/|["'](?:\.\.\/)+src\//);

  const settingsModule = await import("../../open-sse/services/opencodeServerSettings.ts");
  const { applyRuntimeSettings, resetRuntimeSettingsStateForTests } =
    await import("../../src/lib/config/runtimeSettings.ts");
  try {
    resetRuntimeSettingsStateForTests();
    settingsModule.clearOpencodeServerSettingsCache();
    await applyRuntimeSettings(
      { opencode_server_url: "http://127.0.0.1:5123" },
      { force: true, source: "test" }
    );
    assert.deepEqual(await settingsModule.readOpencodeServerSettings(), {
      url: "http://127.0.0.1:5123",
    });

    // A later save that clears the URL falls back to the default (empty setting).
    await applyRuntimeSettings({ opencode_server_url: "" }, { source: "test" });
    assert.deepEqual(await settingsModule.readOpencodeServerSettings(), {});
  } finally {
    resetRuntimeSettingsStateForTests();
    settingsModule.clearOpencodeServerSettingsCache();
  }
});
