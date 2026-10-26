import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { rpcSequence, toMcpFetchCall, type McpFetchCall } from "./helpers/mcpStreamMock.ts";

// In-process regression against a real Streamable HTTP server instead of a
// hand-written fetch mock: the SDK's own transport, in stateless mode (no
// session id, a fresh server + transport per request), and in sessionful mode
// with DELETE closing the session the way OmniRoute's httpTransport does.
// globalThis.fetch is routed straight into the transport, so the CLI's real
// apiFetch → mcpClient path talks to it without opening a port.

const BASE_URL = "http://127.0.0.1:20128";

interface ToolInvocation {
  name: string;
  args: unknown;
}

function buildServer(invocations: ToolInvocation[]) {
  const server = new McpServer(
    { name: "cli-regression", version: "0.0.0" },
    { capabilities: { logging: {} } }
  );
  server.registerTool(
    "omniroute_get_health",
    { description: "health", inputSchema: {} },
    async () => {
      invocations.push({ name: "omniroute_get_health", args: {} });
      return { content: [{ type: "text", text: "healthy" }] };
    }
  );
  server.registerTool(
    "omniroute_skills_enable",
    {
      description: "enable or disable a skill",
      inputSchema: { skillId: z.string(), enabled: z.boolean() },
    },
    async (args) => {
      invocations.push({ name: "omniroute_skills_enable", args });
      return { content: [{ type: "text", text: `${args.skillId}=${args.enabled}` }] };
    }
  );
  server.registerTool(
    "chatty",
    { description: "logs progress, then answers", inputSchema: {} },
    async (_args, extra) => {
      await extra.sendNotification({
        method: "notifications/message",
        params: { level: "info", data: "working" },
      });
      await new Promise((resolve) => setTimeout(resolve, 20));
      invocations.push({ name: "chatty", args: {} });
      return { content: [{ type: "text", text: "chatty-done" }] };
    }
  );
  server.registerTool("fails", { description: "always fails", inputSchema: {} }, async () => ({
    isError: true,
    content: [{ type: "text", text: "boom" }],
  }));
  return server;
}

type Handler = (request: Request) => Promise<Response>;

function statelessHandler(invocations: ToolInvocation[]): Handler {
  return async (request) => {
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await buildServer(invocations).connect(transport);
    return transport.handleRequest(request);
  };
}

function sessionfulHandler(invocations: ToolInvocation[]): Handler {
  const sessions = new Map<string, WebStandardStreamableHTTPServerTransport>();
  return async (request) => {
    const sid = request.headers.get("mcp-session-id");
    if (sid) {
      const transport = sessions.get(sid);
      if (!transport) return new Response("unknown session", { status: 404 });
      const response = await transport.handleRequest(request);
      if (request.method === "DELETE") {
        // Same as OmniRoute's closeStreamableSession(): open streams die here.
        await transport.close();
        sessions.delete(sid);
      }
      return response;
    }
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: randomUUID,
      onsessioninitialized: (id) => void sessions.set(id, transport),
    });
    await buildServer(invocations).connect(transport);
    return transport.handleRequest(request);
  };
}

async function withServer<T>(
  handler: Handler,
  fn: (calls: McpFetchCall[]) => Promise<T>
): Promise<T> {
  const calls: McpFetchCall[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const call = toMcpFetchCall(input, init);
    calls.push(call);
    assert.ok(call.url.startsWith(`${BASE_URL}/api/mcp/stream`), `unexpected fetch ${call.url}`);
    return handler(new Request(input, init));
  }) as typeof globalThis.fetch;
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = origFetch;
  }
}

// Binary writes pass through: node:test reports over this process's stdout.
async function captureStdio(fn: () => Promise<void>): Promise<{ stdout: string; stderr: string }> {
  const out: string[] = [];
  const err: string[] = [];
  const origOut = process.stdout.write.bind(process.stdout);
  const origErr = process.stderr.write.bind(process.stderr);
  process.stdout.write = ((c: string | Uint8Array, ...rest: never[]) => {
    if (typeof c !== "string") return origOut(c, ...rest);
    out.push(c);
    return true;
  }) as typeof process.stdout.write;
  process.stderr.write = ((c: string | Uint8Array, ...rest: never[]) => {
    if (typeof c !== "string") return origErr(c, ...rest);
    err.push(c);
    return true;
  }) as typeof process.stderr.write;
  try {
    await fn();
  } finally {
    process.stdout.write = origOut;
    process.stderr.write = origErr;
  }
  return { stdout: out.join(""), stderr: err.join("") };
}

function dataFrames(stdout: string) {
  return stdout
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line) as { id?: number; method?: string; result?: unknown });
}

const { runMcpCallCommand } = await import("../../bin/cli/commands/mcp.mjs");
const { runSkillsEnable } = await import("../../bin/cli/commands/skills.mjs");
const globalOpts = { baseUrl: BASE_URL };

test("stateless handler: mcp call runs the tool once, without session id or DELETE", async () => {
  const invocations: ToolInvocation[] = [];
  await withServer(statelessHandler(invocations), async (calls) => {
    const { stdout, stderr } = await captureStdio(async () => {
      assert.equal(await runMcpCallCommand("omniroute_get_health", {}, {}, globalOpts), 0);
    });
    assert.equal(stdout, "healthy\n");
    assert.equal(stderr, "");
    assert.deepEqual(rpcSequence(calls), ["initialize", "notifications/initialized", "tools/call"]);
    for (const c of calls) {
      assert.equal(c.headers.get("mcp-session-id"), null);
      assert.equal(c.headers.get("mcp-protocol-version"), null);
    }
  });
  assert.deepEqual(invocations, [{ name: "omniroute_get_health", args: {} }]);
});

test("stateless handler: mcp call --stream prints the progress frame and the result frame", async () => {
  const invocations: ToolInvocation[] = [];
  await withServer(statelessHandler(invocations), async () => {
    const { stdout } = await captureStdio(async () => {
      assert.equal(await runMcpCallCommand("chatty", {}, { stream: true }, globalOpts), 0);
    });
    const frames = dataFrames(stdout);
    assert.equal(frames[0].method, "notifications/message");
    assert.equal(frames.at(-1)?.id, 2);
    assert.deepEqual(frames.at(-1)?.result, { content: [{ type: "text", text: "chatty-done" }] });
  });
  assert.equal(invocations.length, 1);
});

test("stateless handler: a failing tool surfaces as 'MCP error:' with exit 1", async () => {
  await withServer(statelessHandler([]), async () => {
    const { stdout, stderr } = await captureStdio(async () => {
      assert.equal(await runMcpCallCommand("fails", {}, {}, globalOpts), 1);
    });
    assert.equal(stdout, "");
    assert.equal(stderr, "MCP error: boom\n");
  });
});

test("stateless handler: skills enable (an mcpCallTool caller) reaches the tool", async () => {
  const invocations: ToolInvocation[] = [];
  const savedBaseUrl = process.env.OMNIROUTE_BASE_URL;
  // runSkillsEnable takes no connection options; it resolves the server like
  // every other management command.
  process.env.OMNIROUTE_BASE_URL = BASE_URL;
  try {
    await withServer(statelessHandler(invocations), async (calls) => {
      const { stdout } = await captureStdio(() => runSkillsEnable("sk_pdf", {}, {}));
      assert.equal(stdout, "Enabled: sk_pdf\n");
      assert.ok(!rpcSequence(calls).includes("DELETE"));
    });
  } finally {
    if (savedBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = savedBaseUrl;
  }
  assert.deepEqual(invocations, [
    { name: "omniroute_skills_enable", args: { skillId: "sk_pdf", enabled: true } },
  ]);
});

test("sessionful handler: session id is echoed and DELETE comes last", async () => {
  await withServer(sessionfulHandler([]), async (calls) => {
    const { stdout } = await captureStdio(async () => {
      assert.equal(await runMcpCallCommand("omniroute_get_health", {}, {}, globalOpts), 0);
    });
    assert.equal(stdout, "healthy\n");
    assert.deepEqual(rpcSequence(calls), [
      "initialize",
      "notifications/initialized",
      "tools/call",
      "DELETE",
    ]);
    const sid = calls[1].headers.get("mcp-session-id");
    assert.ok(sid);
    for (const c of calls.slice(1)) assert.equal(c.headers.get("mcp-session-id"), sid);
  });
});

test("sessionful handler: --stream keeps the result frame even though DELETE closes the session", async () => {
  const invocations: ToolInvocation[] = [];
  await withServer(sessionfulHandler(invocations), async (calls) => {
    const { stdout } = await captureStdio(async () => {
      assert.equal(await runMcpCallCommand("chatty", {}, { stream: true }, globalOpts), 0);
    });
    const frames = dataFrames(stdout);
    assert.equal(frames.at(-1)?.id, 2, `result frame missing; got: ${stdout}`);
    assert.equal(rpcSequence(calls).at(-1), "DELETE");
  });
  assert.equal(invocations.length, 1, "the tool must finish, not be cut off by DELETE");
});
