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
const { buildServerEnv, isForwardableFileUrl } =
  await import("../../open-sse/services/opencodeServerSafety.ts");

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
async function startFakeServer(options: { eventDelayMs?: number } = {}): Promise<{
  url: string;
  close: () => Promise<void>;
  calls: Captured[];
  lastPrompt: () => Captured | undefined;
  setAssistantText: (text: string) => void;
  failWith: (route: "session" | "prompt_async", status: number, body: string) => void;
  failTurn: (error: Json) => void;
}> {
  const calls: Captured[] = [];
  let assistantText = "OK";
  let turnError: Json | null = null;
  let sessionSeq = 0;
  const failures = new Map<string, { status: number; body: string }>();

  const server = http.createServer((req, res) => {
    const url = req.url || "/";

    // The shared /event stream is long-lived and must be claimed before any
    // body/route handling, otherwise the catch-all below would 404 it.
    // Like the real server, events are never replayed: a client only sees what
    // is published after it connected (announced by `server.connected`).
    if (url.startsWith("/event")) {
      const connect = () => {
        if (res.destroyed) return;
        res.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-cache" });
        res.write(`data: ${JSON.stringify({ type: "server.connected", properties: {} })}\n\n`);
        eventClients.add(res);
      };
      if (options.eventDelayMs) setTimeout(connect, options.eventDelayMs);
      else connect();
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
        if (turnError) {
          return json(200, {
            info: {
              id: "msg_assistant",
              role: "assistant",
              sessionID: messageMatch[1],
              error: turnError,
            },
            parts: [{ type: "step-start", id: "prt_1", messageID: "msg_assistant" }],
          });
        }
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
    const failed = [
      {
        type: "message.updated",
        properties: { info: { id: "msg_assistant", role: "assistant", sessionID } },
      },
      { type: "session.error", properties: { sessionID, error: turnError } },
      { type: "session.idle", properties: { sessionID } },
    ];
    const frames = turnError
      ? failed
      : [
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
    failTurn: (error: Json) => {
      turnError = error;
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
  assert.equal(parsed.success, true);
  assert.equal(parsed.data?.opencode_server_url, "http://127.0.0.1:4096");
  assert.equal("opencode_server_bin" in (parsed.data ?? {}), false);
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

// OpenCode 2.x moved every route under /api/ (Basic auth) and serves the web app's
// index.html on the legacy paths, so a v1-only executor must recognize it instead of
// treating that HTML 200 as a healthy server (field test on PR #16995, v2.2.5).
type FakeRoute = { status: number; type: "json" | "html"; body?: unknown };

async function startStaticServer(
  routes: Record<string, FakeRoute>
): Promise<{ url: string; hits: string[]; close: () => Promise<void> }> {
  const hits: string[] = [];
  const spa: FakeRoute = { status: 200, type: "html" };
  const server = http.createServer((req, res) => {
    const url = (req.url || "/").split("?")[0];
    hits.push(`${req.method} ${url}`);
    const route = routes[url] ?? spa;
    if (route.type === "json") {
      res.writeHead(route.status, { "content-type": "application/json" });
      res.end(JSON.stringify(route.body ?? {}));
    } else {
      res.writeHead(route.status, { "content-type": "text/html; charset=utf-8" });
      res.end("<!doctype html><html><body><div id=root></div></body></html>");
    }
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${address.port}`,
    hits,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

const V2_API_PROVIDER: Record<string, FakeRoute> = {
  "/api/provider": {
    status: 401,
    type: "json",
    body: { error: "Unauthorized" },
  },
};

test("opencode-server: the health probe tells a v1 server from a v2 one", async () => {
  const { probeOpencodeServerHealth } =
    await import("../../open-sse/services/opencodeServerEndpoint.ts");
  const cases: Array<[string, Record<string, FakeRoute>, unknown]> = [
    [
      "v1 JSON health",
      {
        "/global/health": { status: 200, type: "json", body: { healthy: true, version: "1.19.2" } },
      },
      { healthy: true, version: "1.19.2", apiMajor: 1 },
    ],
    [
      "v2 JSON health",
      {
        "/global/health": { status: 200, type: "json", body: { healthy: true, version: "2.2.5" } },
      },
      { healthy: true, version: "2.2.5", apiMajor: 2 },
    ],
    [
      "v2 web app on the legacy path, JSON under /api/",
      V2_API_PROVIDER,
      { healthy: true, apiMajor: 2 },
    ],
    ["a web app that is not an opencode server", {}, null],
  ];
  for (const [label, routes, expected] of cases) {
    const fake = await startStaticServer(routes);
    try {
      assert.deepEqual(await probeOpencodeServerHealth(fake.url), expected, label);
    } finally {
      await fake.close();
    }
  }
});

test("opencode-server: a v2 server is a clear unsupported-version error, never a session call", async () => {
  const fake = await startStaticServer(V2_API_PROVIDER);
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();
  try {
    const executor = new executorModule.OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.equal(result.response.status, 501);
    const payload = (await result.response.json()) as Json;
    const message = String(dig(payload, "error", "message"));
    assert.match(message, /unsupported opencode server version/);
    assert.match(message, /v2/);
    assert.doesNotMatch(JSON.stringify(payload), /\bat \S+:\d+:\d+|node:internal|Error:/);
    assert.deepEqual(
      fake.hits.filter((hit) => /\/session|\/config\/providers/.test(hit)),
      [],
      "a v2 server must not receive v1 session or catalog calls"
    );
  } finally {
    await fake.close();
  }
});

test("opencode-server: file URLs on reserved or disguised internal hosts are not forwarded", () => {
  for (const url of [
    "https://localhost./secret.png",
    "https://LOCALHOST../secret.png",
    "https://[::ffff:127.0.0.1]/secret.png",
    "https://[::ffff:10.0.0.1]/secret.png",
    "https://[::]/secret.png",
    "https://100.64.0.1/secret.png",
    "https://100.127.255.254/secret.png",
    "https://metadata.google.internal/computeMetadata/v1/",
  ]) {
    assert.equal(isForwardableFileUrl(url), false, url);
  }
  for (const url of ["https://example.com/ok.png", "https://100.128.0.1/ok.png"]) {
    assert.equal(isForwardableFileUrl(url), true, url);
  }
});

test("opencode-server: a streamed turn waits for the /event stream before prompting", async () => {
  // A fresh bus against a server whose /event answers late: opencode does not
  // replay events, so a prompt sent before the stream is live loses the turn.
  executorModule.closeOpencodeServerEventBus();
  const fake = await startFakeServer({ eventDelayMs: 400 });
  fake.setAssistantText("after-connect");
  process.env.OPENCODE_SERVER_URL = fake.url;
  process.env.OPENCODE_SERVER_TIMEOUT_MS = "4000";
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
    assert.match(raw, /"content":"after-connect"/);
    assert.doesNotMatch(raw, /streaming timeout/);
  } finally {
    delete process.env.OPENCODE_SERVER_TIMEOUT_MS;
    await fake.close();
  }
});

const UPSTREAM_TURN_ERROR = {
  name: "APIError",
  data: { message: "free limit for key SECRET at /srv/app/auth.json", statusCode: 429 },
};

test("opencode-server: a failed blocking turn is an error, not an empty completion", async () => {
  const fake = await startFakeServer();
  fake.failTurn(UPSTREAM_TURN_ERROR);
  process.env.OPENCODE_SERVER_URL = fake.url;
  executorModule.clearOpencodeServerSettingsCache();
  try {
    const executor = new executorModule.OpencodeServerExecutor();
    const result = await executor.execute({
      model: "opencode-server/test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    assert.equal(result.response.status, 429);
    const raw = await result.response.text();
    assert.match(raw, /turn failed \(APIError\)/);
    assert.doesNotMatch(raw, /SECRET|auth\.json|\/srv\/app|chat\.completion/);
  } finally {
    await fake.close();
  }
});

test("opencode-server: a session.error during a streamed turn ends in an SSE error", async () => {
  const fake = await startFakeServer();
  fake.failTurn(UPSTREAM_TURN_ERROR);
  process.env.OPENCODE_SERVER_URL = fake.url;
  process.env.OPENCODE_SERVER_TIMEOUT_MS = "4000";
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
    assert.match(raw, /turn failed \(APIError\)/);
    assert.doesNotMatch(raw, /"finish_reason":"stop"/);
    assert.doesNotMatch(raw, /SECRET|auth\.json|\/srv\/app/);
  } finally {
    delete process.env.OPENCODE_SERVER_TIMEOUT_MS;
    await fake.close();
  }
});
