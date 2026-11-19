import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";

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

/** The client tools of a request that carries the native tool protocol. */
const CLIENT_TOOLS = [
  {
    type: "function",
    function: {
      name: "get_time",
      description: "Current time in a city",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

/** An auth profile that holds one record with a token that is not expired. */
async function writeAuthProfile(records: Record<string, unknown> = {}): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "mmcode-exec-"));
  const authFile = join(dir, "auth.json");
  await writeFile(
    authFile,
    JSON.stringify({
      schemaVersion: 1,
      records: {
        live: {
          accessToken: "test-access-token",
          refreshToken: "test-refresh-token",
          clientId: "mcode-public",
          scopes: ["agent.default"],
          audience: "agent-backend",
          expiresAtMs: Date.now() + 3_600_000,
          generation: 1,
        },
        ...records,
      },
    })
  );
  return authFile;
}

type GatewayCtx = {
  /** Path of the auth profile the executor reads. */
  authFile: string;
  /** The payload the executor sent. */
  seen: Record<string, unknown>;
  /** The authorization header the executor sent. */
  authorization: string;
};

/**
 * Run one request against a local stand-in for the managed gateway.
 *
 * The stand-in is the gateway itself: the endpoint is an internal one of the
 * MiniMax Code app, so the transport, the payload and the answer of the
 * provider are exercised end to end over HTTP.
 */
async function withGateway<T>(
  handler: (ctx: GatewayCtx, res: ServerResponse) => void,
  run: (ctx: GatewayCtx) => Promise<T>
): Promise<T> {
  const ctx: GatewayCtx = { authFile: await writeAuthProfile(), seen: {}, authorization: "" };
  const server = createServer((req, res) => {
    ctx.authorization = String(req.headers.authorization || "");
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      ctx.seen = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
      handler(ctx, res);
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  const previousUrl = process.env.MINIMAX_CODE_GATEWAY_URL;
  process.env.MINIMAX_CODE_GATEWAY_URL = `http://127.0.0.1:${port}/mavis/api/v1/llm/v1/messages`;
  try {
    return await run(ctx);
  } finally {
    if (previousUrl === undefined) delete process.env.MINIMAX_CODE_GATEWAY_URL;
    else process.env.MINIMAX_CODE_GATEWAY_URL = previousUrl;
    server.close();
  }
}

function answer(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

async function runRequest(options: {
  authFile?: string;
  body?: Record<string, unknown>;
  stream?: boolean;
  fetchImpl?: typeof fetch;
}) {
  const { MinimaxCodeExecutor } = await loadMinimaxCodeExecutor();
  const executor = new MinimaxCodeExecutor({
    authFile: options.authFile,
    fetchImpl: options.fetchImpl,
  });
  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: options.body ?? requestBody(),
    stream: options.stream ?? false,
    credentials: {},
  });
  return "response" in result ? result.response : result;
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

test("the gateway payload carries the tools and the answer comes back as tool calls", async () => {
  await withGateway(
    (_ctx, res) =>
      answer(res, 200, {
        content: [
          { type: "text", text: "Checking the time." },
          { type: "tool_use", id: "call_1", name: "get_time", input: { city: "Moscow" } },
        ],
        stop_reason: "tool_use",
        usage: { input_tokens: 31, output_tokens: 9 },
      }),
    async (ctx) => {
      const response = await runRequest({
        authFile: ctx.authFile,
        body: {
          messages: [{ role: "user", content: "What time is it in Moscow?" }],
          tools: CLIENT_TOOLS,
        },
      });
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
      assert.equal(ctx.authorization, "Bearer test-access-token");
      assert.equal(ctx.seen.model, "MiniMax-M3.1-Flash");
      assert.equal((ctx.seen.tools as Record<string, unknown>[])[0].name, "get_time");
      assert.equal(ctx.seen.stream, false);
    }
  );
});

test("the gateway streams native tool calls as OpenAI SSE", async () => {
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

  await withGateway(
    (_ctx, res) => {
      res.writeHead(200, { "content-type": "text/event-stream" });
      res.end(frames);
    },
    async (ctx) => {
      const response = await runRequest({
        authFile: ctx.authFile,
        stream: true,
        body: {
          messages: [{ role: "user", content: "What time is it in Moscow?" }],
          tools: CLIENT_TOOLS,
        },
      });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") || "", /text\/event-stream/);
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
    }
  );
});

/**
 * Incident 2026-10-21: a request the managed gateway refused came back as a
 * 502. A 502 is in the model-lockout list, so the refusal took the MiniMax
 * leg out of every combo for ~27 minutes — the leg of every other session on
 * the same instance. A request-scoped refusal has to keep its own status.
 */
test("an upstream refusal keeps its own status and is not retried", async () => {
  let calls = 0;
  await withGateway(
    (_ctx, res) => {
      calls += 1;
      answer(res, 400, { error: { type: "invalid_request_error", message: "model not found" } });
    },
    async (ctx) => {
      const response = await runRequest({ authFile: ctx.authFile });
      assert.equal(response.status, 400);
      const body = await response.json();
      assert.equal(body.error?.type, "invalid_request_error");
      // A refusal is not retried: the same request gets the same answer.
      assert.equal(calls, 1);
    }
  );
});

test("a refusal of the context window is answered with 413", async () => {
  await withGateway(
    (_ctx, res) =>
      answer(res, 400, {
        error: {
          type: "invalid_request_error",
          message: "invalid params, context window exceeds limit (2013)",
        },
      }),
    async (ctx) => {
      const response = await runRequest({ authFile: ctx.authFile });
      // A 400 with a model scope is classified as a model failure and locks the
      // model out of the fallbacks, so the refusal of the context window is
      // answered with a 413: it says nothing about the health of the model.
      assert.equal(response.status, 413);
      const body = await response.json();
      assert.match(JSON.stringify(body), /context window exceeds limit/);
    }
  );
});

test("an upstream outage stays an outage", async () => {
  await withGateway(
    (_ctx, res) => answer(res, 503, { error: { type: "api_error", message: "upstream is down" } }),
    async (ctx) => {
      const response = await runRequest({ authFile: ctx.authFile });
      // A 5xx is a property of the gateway, not of the request: it keeps its
      // status and stays in the model lockout, because the model really is
      // unavailable.
      assert.equal(response.status, 503);
    }
  );
});

test("a 200 answer that carries an error is a refusal, not an empty answer", async () => {
  const response = await runRequest({
    authFile: await writeAuthProfile(),
    // The gateway answers a refusal with the error shape — and the status of
    // the answer does not always match the refusal.
    fetchImpl: async () =>
      new Response(
        JSON.stringify({
          type: "error",
          error: { type: "invalid_request_error", message: "invalid params, mismatched type" },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      ),
  });
  // The refusal belongs to the request, so it keeps the status of the
  // refusal: a 400 that no combo reads as an outage of the model. An empty
  // completion would have hidden the refusal completely.
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.match(String(body.error?.message || ""), /mismatched type/);
});

test("a missing credential answers with a 401, not a 502", async () => {
  const response = await runRequest({ authFile: "/nonexistent/minimax-auth.json" });
  // A missing credential is not an outage of the model: a 502 is in the
  // model-lockout list and would take the model out of every combo of the
  // instance for half an hour. The answer is a 401.
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.ok(
    String(body.error?.message ?? "")
      .toLowerCase()
      .includes("mcode login")
  );
});

test("a dead refresh token answers 401 — the credential has to be renewed", async () => {
  const authFile = await writeAuthProfile({
    live: {
      accessToken: "expired-access-token",
      refreshToken: "consumed-refresh-token",
      clientId: "mcode-public",
      scopes: ["agent.default"],
      audience: "agent-backend",
      expiresAtMs: Date.now() - 1_000,
      generation: 9,
    },
  });
  const response = await runRequest({
    authFile,
    fetchImpl: async () =>
      new Response(JSON.stringify({ error: "invalid_grant" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      }),
  });
  // The refresh token was consumed. The credential is dead, the model is
  // fine: a 401, never a 502 that would lock the model out of the combos.
  assert.equal(response.status, 401);
});

test("an account endpoint that fails answers 500 — the model is not the cause", async () => {
  const authFile = await writeAuthProfile({
    live: {
      accessToken: "expired-access-token",
      refreshToken: "consumed-refresh-token",
      clientId: "mcode-public",
      scopes: ["agent.default"],
      audience: "agent-backend",
      expiresAtMs: Date.now() - 1_000,
      generation: 9,
    },
  });
  const response = await runRequest({
    authFile,
    fetchImpl: async () => {
      throw new Error("fetch failed");
    },
  });
  // The credential service failed. That is not a property of the model, so
  // the answer must not be a status of the model-lockout list.
  assert.equal(response.status, 500);
});

test("a gateway that cannot be reached is a 502 — the model is unavailable", async () => {
  const response = await runRequest({
    authFile: await writeAuthProfile(),
    fetchImpl: async () => {
      throw new Error("fetch failed");
    },
  });
  // The gateway service could not be reached at all: that is an outage of the
  // upstream, and a 502 keeps the model out of the combos while it lasts.
  assert.equal(response.status, 502);
});
