import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";

const fixture = join(process.cwd(), "tests/fixtures/fake-mcode-exec.mjs");

async function loadMinimaxCodeExecutor() {
  return import("../../open-sse/executors/minimax-code.ts");
}

function requestBody() {
  return {
    messages: [
      { role: "system", content: "You are a coding assistant." },
      { role: "user", content: "Reply with a short status." },
    ],
  };
}

test("MiniMax Code accepts its own models and rejects unsafe/unknown ids", async () => {
  const { resolveMinimaxCodeModel } = await loadMinimaxCodeExecutor();
  assert.deepEqual(resolveMinimaxCodeModel("MiniMax-M3.1-Flash"), {
    ok: true,
    model: "MiniMax-M3.1-Flash",
  });
  assert.deepEqual(resolveMinimaxCodeModel("minimax-code/MiniMax-M3"), {
    ok: true,
    model: "MiniMax-M3",
  });
  assert.deepEqual(resolveMinimaxCodeModel("mmcode/MiniMax-M3.1-Flash"), {
    ok: true,
    model: "MiniMax-M3.1-Flash",
  });
  assert.equal(resolveMinimaxCodeModel("-unexpected").ok, false);
  assert.equal(resolveMinimaxCodeModel("unknown-model").ok, false);
});

test("MiniMax Code builds a one-shot CLI run against the local profile", async () => {
  const { buildMinimaxCodeExecArgs } = await loadMinimaxCodeExecutor();
  const args = buildMinimaxCodeExecArgs({
    model: "MiniMax-M3.1-Flash",
    cwd: "/tmp/workspace",
    maxSteps: 1,
    permission: "off",
    timeoutMs: 180000,
  });
  assert.deepEqual(args.slice(0, 3), ["exec", "--model", "minimax/MiniMax-M3.1-Flash"]);
  assert.ok(args.includes("--output-format"));
  assert.equal(args[args.indexOf("--output-format") + 1], "stream-json");
  assert.equal(args[args.indexOf("--input") + 1], "-");
  assert.equal(args[args.indexOf("--cwd") + 1], "/tmp/workspace");
  assert.equal(args[args.indexOf("--max-steps") + 1], "1");
  assert.equal(args[args.indexOf("--permission") + 1], "off");
  assert.equal(args[args.indexOf("--mode") + 1], "lightweight");
});

test("MiniMax Code can run the full agent context mode", async () => {
  const { buildMinimaxCodeExecArgs } = await loadMinimaxCodeExecutor();
  const args = buildMinimaxCodeExecArgs({
    model: "MiniMax-M3.1-Flash",
    cwd: "/tmp/workspace",
    mode: "standard",
  });
  assert.equal(args[args.indexOf("--mode") + 1], "standard");
});

test("MiniMax Code folds stream-json events into the final answer and usage", async () => {
  const { applyExecEvent, createExecState } = await loadMinimaxCodeExecutor();
  const state = createExecState();
  const delta1 = applyExecEvent(state, {
    type: "item.started",
    item: { type: "agent_message", contentDelta: "При" },
  });
  const delta2 = applyExecEvent(state, {
    type: "item.updated",
    item: { type: "agent_message", contentDelta: "вет" },
  });
  assert.equal(delta1, "При");
  assert.equal(delta2, "вет");
  applyExecEvent(state, {
    type: "item.completed",
    item: { type: "agent_message", content: "Привет" },
  });
  applyExecEvent(state, { type: "turn.completed", usage: { inputTokens: 5, outputTokens: 2 } });
  applyExecEvent(state, {
    type: "exec.completed",
    result: { status: "succeeded", output: "Привет" },
  });
  assert.equal(state.text, "Привет");
  assert.equal(state.status, "succeeded");
  assert.equal(state.usage?.outputTokens, 2);
  assert.equal(state.error, null);
});

test("MiniMax Code reports a failed run as an error", async () => {
  const { applyExecEvent, createExecState } = await loadMinimaxCodeExecutor();
  const state = createExecState();
  applyExecEvent(state, {
    type: "exec.completed",
    result: { status: "failed", error: "model unavailable" },
  });
  assert.equal(state.error, "model unavailable");
});

test("MiniMax Code runs the local CLI and returns an OpenAI chat completion", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /application\/json/);
  const body = await response.json();
  assert.equal(body.object, "chat.completion");
  assert.equal(body.model, "MiniMax-M3.1-Flash");
  assert.equal(body.choices?.[0]?.message?.role, "assistant");
  assert.equal(body.choices?.[0]?.message?.content, "fake minimax code response");
  assert.equal(body.choices?.[0]?.finish_reason, "stop");
  assert.equal(body.usage?.completion_tokens, 7);
  assert.equal(body.usage?.estimated, false);
});

test("MiniMax Code runs a plain chat turn in the standard context when the host tools are allowed", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const seen: string[] = [];
  const steps: number[] = [];
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
    // The `standard` context gives the agent the host tools; that needs an
    // explicit opt-in (see the refusal test below).
    allowHostTools: true,
    mode: "standard",
    runner: async (options) => {
      seen.push(options.mode);
      steps.push(options.maxSteps);
      return {
        text: "ok",
        usage: null,
        state: { text: "ok", usage: null, status: "succeeded", error: null },
      };
    },
  });

  await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  assert.deepEqual(seen, ["standard"]);
  // A plain chat turn keeps the small step budget.
  assert.deepEqual(steps, [1]);
});

test("MiniMax Code routes client tools to the managed gateway and plain chat to the CLI", async () => {
  const { resolveMinimaxCodeTransport } = await loadMinimaxCodeExecutor();
  // Client tools live on the client machine: the model must call them through
  // the native tool protocol, so the run goes to the managed gateway.
  assert.equal(resolveMinimaxCodeTransport("auto", true), "gateway");
  // Plain chat has nothing to execute and stays on the fast local CLI.
  assert.equal(resolveMinimaxCodeTransport("auto", false), "cli");
  // An explicit choice always wins.
  assert.equal(resolveMinimaxCodeTransport("cli", true), "cli");
  assert.equal(resolveMinimaxCodeTransport("gateway", false), "gateway");
  // The default is the managed gateway for every request: it speaks the
  // native tool protocol and answers in seconds. The local CLI is the
  // fallback for a gateway that is unreachable or rejects the token.
  assert.equal(resolveMinimaxCodeTransport("gateway", true), "gateway");
  assert.equal(resolveMinimaxCodeTransport("gateway", false), "gateway");
});

test("a failing gateway answers with a 502 that names the transport", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  let ran = false;
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "gateway",
    // A missing credential makes the gateway call fail before the request.
    authFile: "/nonexistent/minimax-auth.json",
    runner: async () => {
      ran = true;
      return {
        text: "fallback answer",
        usage: null,
        state: { text: "fallback answer", usage: null, status: "succeeded", error: null },
      };
    },
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  // The gateway transport does not change the transport of a request behind
  // the client's back: it fails with the transport named.
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.ok(String(body.error?.message ?? "").includes("managed gateway"));
  assert.equal(ran, false);
});

test("MiniMax Code streams assistant deltas as OpenAI SSE when stream=true", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: true,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  const text = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
  assert.match(text, /chat\.completion\.chunk/);
  assert.match(text, /data: \[DONE\]/);
  // The client concatenates the streamed deltas into the final answer.
  const deltas = text
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => {
      const chunk = JSON.parse(line.slice("data: ".length));
      return chunk.choices?.[0]?.delta?.content || "";
    })
    .join("");
  assert.equal(deltas, "fake minimax code response");
});

test("MiniMax Code returns native tool calls from the managed gateway", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const { mkdtemp, writeFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { createServer } = await import("node:http");

  const dir = await mkdtemp(join(tmpdir(), "mmcode-auth-"));
  const authFile = join(dir, "auth.json");
  await writeFile(
    authFile,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        "com.minimax.mcode.oauth.prod.en": {
          accessToken: "test-access-token",
          refreshToken: "test-refresh-token",
          clientId: "mcode-public",
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: Date.now() + 3_600_000,
          generation: 1,
        },
      },
    })
  );

  let seenBody: Record<string, unknown> = {};
  let seenAuth = "";
  const server = createServer((req, res) => {
    seenAuth = String(req.headers.authorization || "");
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      seenBody = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          content: [
            { type: "text", text: "Checking the time." },
            { type: "tool_use", id: "call_1", name: "get_time", input: { city: "Moscow" } },
          ],
          stop_reason: "tool_use",
          usage: { input_tokens: 31, output_tokens: 9 },
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const previousUrl = process.env.MINIMAX_CODE_GATEWAY_URL;
  process.env.MINIMAX_CODE_GATEWAY_URL = `http://127.0.0.1:${port}/mavis/api/v1/llm/v1/messages`;

  try {
    const executor = new MinimaxCodeExecutor({ authFile, transport: "gateway" });
    const result = await executor.execute({
      model: "MiniMax-M3.1-Flash",
      body: {
        messages: [{ role: "user", content: "What time is it in Moscow?" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_time",
              description: "Current time in a city",
              parameters: { type: "object", properties: { city: { type: "string" } } },
            },
          },
        ],
      },
      stream: false,
      credentials: {},
    });
    const response = "response" in result ? result.response : result;
    assert.equal(response.status, 200);
    const body = await response.json();
    const choice = body.choices?.[0];
    assert.equal(choice?.finish_reason, "tool_calls");
    assert.equal(choice?.message?.content, "Checking the time.");
    const call = choice?.message?.tool_calls?.[0];
    assert.equal(call?.id, "call_1");
    assert.equal(call?.type, "function");
    assert.equal(call?.function?.name, "get_time");
    assert.deepEqual(JSON.parse(call?.function?.arguments), { city: "Moscow" });
    assert.equal(body.usage?.prompt_tokens, 31);
    assert.equal(body.usage?.completion_tokens, 9);

    // The upstream call carries the managed-gateway contract.
    assert.equal(seenAuth, "Bearer test-access-token");
    assert.equal(seenBody.model, "MiniMax-M3.1-Flash");
    assert.equal((seenBody.tools as Record<string, unknown>[])[0].name, "get_time");
    assert.equal(seenBody.stream, false);
  } finally {
    if (previousUrl === undefined) delete process.env.MINIMAX_CODE_GATEWAY_URL;
    else process.env.MINIMAX_CODE_GATEWAY_URL = previousUrl;
    server.close();
  }
});

test("MiniMax Code refreshes an expired gateway token and retries once", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const { mkdtemp, writeFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { createServer } = await import("node:http");

  const dir = await mkdtemp(join(tmpdir(), "mmcode-auth-"));
  const authFile = join(dir, "auth.json");
  await writeFile(
    authFile,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        "com.minimax.mcode.oauth.prod.en": {
          accessToken: "stale-access-token",
          refreshToken: "test-refresh-token",
          clientId: "mcode-public",
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: Date.now() + 3_600_000,
          generation: 1,
        },
      },
    })
  );

  const seenAuth: string[] = [];
  let gatewayCalls = 0;
  const server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      if (req.url?.includes("/oauth2/token")) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            access_token: "fresh-access-token",
            refresh_token: "fresh-refresh-token",
            expires_in: 3600,
            token_type: "Bearer",
          })
        );
        return;
      }
      seenAuth.push(String(req.headers.authorization || ""));
      gatewayCalls += 1;
      if (gatewayCalls === 1) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "token expired" }));
        return;
      }
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          content: [{ type: "text", text: "fresh" }],
          stop_reason: "end_turn",
          usage: { input_tokens: 5, output_tokens: 2 },
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const previousUrl = process.env.MINIMAX_CODE_GATEWAY_URL;
  process.env.MINIMAX_CODE_GATEWAY_URL = `http://127.0.0.1:${port}/mavis/api/v1/llm/v1/messages`;

  try {
    // The token endpoint is the real one, so the refresh is routed to a local
    // stand-in while the gateway call goes to the local server.
    const routedFetch: typeof fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : (input as Request).url;
      if (url.includes("account.minimax.io/oauth2/token")) {
        return new Response(
          JSON.stringify({
            access_token: "fresh-access-token",
            refresh_token: "fresh-refresh-token",
            expires_in: 3600,
            token_type: "Bearer",
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      return fetch(input as RequestInfo, init);
    };
    const executor = new MinimaxCodeExecutor({
      authFile,
      fetchImpl: routedFetch,
      transport: "gateway",
    });
    const result = await executor.execute({
      model: "MiniMax-M3.1-Flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    const response = "response" in result ? result.response : result;
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.choices?.[0]?.message?.content, "fresh");
    // The first call used the stale token, the second one the refreshed token.
    assert.deepEqual(seenAuth, ["Bearer stale-access-token", "Bearer fresh-access-token"]);
  } finally {
    if (previousUrl === undefined) delete process.env.MINIMAX_CODE_GATEWAY_URL;
    else process.env.MINIMAX_CODE_GATEWAY_URL = previousUrl;
    server.close();
  }
});

test("MiniMax Code streams native tool calls from the managed gateway", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const { mkdtemp, writeFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { createServer } = await import("node:http");

  const dir = await mkdtemp(join(tmpdir(), "mmcode-auth-"));
  const authFile = join(dir, "auth.json");
  await writeFile(
    authFile,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        "com.minimax.mcode.oauth.prod.en": {
          accessToken: "stream-access-token",
          refreshToken: "test-refresh-token",
          clientId: "mcode-public",
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: Date.now() + 3_600_000,
          generation: 1,
        },
      },
    })
  );

  const frames = [
    'data: {"type":"message_start","message":{"usage":{"input_tokens":12}}}\n\n',
    'data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}\n\n',
    'data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Looking it up."}}\n\n',
    'data: {"type":"content_block_start","index":1,"content_block":{"type":"tool_use","id":"call_1","name":"get_time"}}\n\n',
    'data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"{\\"city\\":\\"Moscow\\"}"}}\n\n',
    'data: {"type":"content_block_stop","index":1}\n\n',
    'data: {"type":"message_delta","delta":{"stop_reason":"tool_use"},"usage":{"output_tokens":8}}\n\n',
    'data: {"type":"message_stop"}\n\n',
  ].join("");

  const server = createServer((req, res) => {
    req.on("data", () => undefined);
    req.on("end", () => {
      res.writeHead(200, { "content-type": "text/event-stream" });
      res.end(frames);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const previousUrl = process.env.MINIMAX_CODE_GATEWAY_URL;
  process.env.MINIMAX_CODE_GATEWAY_URL = `http://127.0.0.1:${port}/mavis/api/v1/llm/v1/messages`;

  try {
    const executor = new MinimaxCodeExecutor({ authFile, transport: "gateway" });
    const result = await executor.execute({
      model: "MiniMax-M3.1-Flash",
      body: {
        messages: [{ role: "user", content: "What time is it in Moscow?" }],
        tools: [
          {
            type: "function",
            function: {
              name: "get_time",
              description: "Current time in a city",
              parameters: { type: "object", properties: { city: { type: "string" } } },
            },
          },
        ],
      },
      stream: true,
      credentials: {},
    });
    const response = "response" in result ? result.response : result;
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.match(text, /data: \[DONE\]/);
    const chunks = text
      .split("\n")
      .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
      .map((line) => JSON.parse(line.slice("data: ".length)));
    const content = chunks.map((chunk) => chunk.choices?.[0]?.delta?.content || "").join("");
    assert.equal(content, "Looking it up.");
    const last = chunks[chunks.length - 1];
    assert.equal(last.choices?.[0]?.finish_reason, "tool_calls");
    const call = last.choices?.[0]?.delta?.tool_calls?.[0];
    assert.equal(call?.id, "call_1");
    assert.equal(call?.index, 0);
    assert.equal(call?.function?.name, "get_time");
    assert.deepEqual(JSON.parse(call?.function?.arguments), { city: "Moscow" });
    assert.equal(last.usage?.prompt_tokens, 12);
    assert.equal(last.usage?.completion_tokens, 8);
  } finally {
    if (previousUrl === undefined) delete process.env.MINIMAX_CODE_GATEWAY_URL;
    else process.env.MINIMAX_CODE_GATEWAY_URL = previousUrl;
    server.close();
  }
});


test("MiniMax Code refreshes an expired token through the injected transport", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const { mkdtemp, writeFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { createServer } = await import("node:http");

  const dir = await mkdtemp(join(tmpdir(), "mmcode-auth-"));
  const authFile = join(dir, "auth.json");
  await writeFile(
    authFile,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        "com.minimax.mcode.oauth.prod.en": {
          accessToken: "expired-access-token",
          refreshToken: "test-refresh-token",
          clientId: "mcode-public",
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: Date.now() - 1000,
          generation: 7,
        },
      },
    })
  );

  const seenAuth: string[] = [];
  const server = createServer((req, res) => {
    req.on("data", () => undefined);
    req.on("end", () => {
      seenAuth.push(String(req.headers.authorization || ""));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          content: [{ type: "text", text: "ok" }],
          stop_reason: "end_turn",
          usage: { input_tokens: 1, output_tokens: 1 },
        })
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const previousUrl = process.env.MINIMAX_CODE_GATEWAY_URL;
  process.env.MINIMAX_CODE_GATEWAY_URL = `http://127.0.0.1:${port}/mavis/api/v1/llm/v1/messages`;

  try {
    let refreshCalls = 0;
    const routedFetch: typeof fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : (input as Request).url;
      if (url.includes("account.minimax.io/oauth2/token")) {
        refreshCalls += 1;
        return new Response(
          JSON.stringify({
            access_token: "fresh-access-token",
            refresh_token: "fresh-refresh-token",
            expires_in: 3600,
            token_type: "Bearer",
          }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      return fetch(input as RequestInfo, init);
    };
    const executor = new MinimaxCodeExecutor({
      authFile,
      fetchImpl: routedFetch,
      transport: "gateway",
    });
    const result = await executor.execute({
      model: "MiniMax-M3.1-Flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });
    const response = "response" in result ? result.response : result;
    assert.equal(response.status, 200);
    // The first refresh has to go through the injected transport: a refresh
    // that escapes it would talk to the real account endpoint with a test
    // credential instead of the local stand-in.
    assert.equal(refreshCalls, 1);
    assert.deepEqual(seenAuth, ["Bearer fresh-access-token"]);
  } finally {
    if (previousUrl === undefined) delete process.env.MINIMAX_CODE_GATEWAY_URL;
    else process.env.MINIMAX_CODE_GATEWAY_URL = previousUrl;
    server.close();
  }
});


test("a request with client tools fails when the gateway is unreachable", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  let ran = false;
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "gateway",
    // A missing credential makes the gateway call fail before the request.
    authFile: "/nonexistent/minimax-auth.json",
    runner: async () => {
      ran = true;
      return {
        text: "fallback answer",
        usage: null,
        state: { text: "fallback answer", usage: null, status: "succeeded", error: null },
      };
    },
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: {
      ...requestBody(),
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            parameters: { type: "object", properties: { city: { type: "string" } } },
          },
        },
      ],
    },
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  // The CLI cannot hand a tool call back to the client, so the request has to
  // fail with the transport named instead of answering with prose.
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.ok(String(body.error?.message ?? "").includes("managed gateway"));
  assert.equal(body.choices, undefined);
  assert.equal(ran, false);
});


test("a CLI run in the standard context is refused without the host-tools opt-in", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  let ran = false;
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
    // The mode can also be pinned through MINIMAX_CODE_MODE. The gate is on
    // the effective mode, not on whether the request carries tools.
    mode: "standard",
    runner: async () => {
      ran = true;
      return {
        text: "answer",
        usage: null,
        state: { text: "answer", usage: null, status: "succeeded", error: null },
      };
    },
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 400);
  assert.equal(ran, false);
});


test("the CLI transport refuses a request that carries client tools", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  let ran = false;
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
    // The host-tools opt-in is about the agent's own tools, not about the
    // caller's protocol: it must not unlock a request with client tools.
    allowHostTools: true,
    runner: async () => {
      ran = true;
      return {
        text: "prose answer",
        usage: null,
        state: { text: "prose answer", usage: null, status: "succeeded", error: null },
      };
    },
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: {
      ...requestBody(),
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            parameters: { type: "object", properties: { city: { type: "string" } } },
          },
        },
      ],
    },
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  // The CLI has no way to hand a tool call back to the client, and prose
  // would make the client believe the turn is over without a tool running.
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.ok(String(body.error?.message ?? "").includes("client tools"));
  assert.equal(ran, false);
});

test("the host-tools gate is not skipped by a differently cased mode", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  let ran = false;
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "cli",
    mode: "Standard",
    runner: async () => {
      ran = true;
      return {
        text: "answer",
        usage: null,
        state: { text: "answer", usage: null, status: "succeeded", error: null },
      };
    },
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 400);
  assert.equal(ran, false);
});

test("an oversized gateway request is refused with 413, not 400", async () => {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const executor = new MinimaxCodeExecutor({
    command: process.execPath,
    args: [fixture],
    cwd: process.cwd(),
    timeoutMs: 10_000,
    transport: "gateway",
  });

  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: { messages: [{ role: "user", content: "x".repeat(900_000) }] },
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  // 413, not 400: a request-scoped refusal says nothing about the health of
  // the model, and a 400 with a model scope locks the model out of the
  // fallbacks — it takes the leg down for every other session.
  assert.equal(response.status, 413);
  const body = await response.json();
  assert.match(JSON.stringify(body), /too large for the managed gateway transport/);
});
