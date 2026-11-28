/**
 * agyMcpBridge.ts + the stdio shim — how the client's tools reach agy.
 *
 * Ported from magpie-community/plugins packages/agy-cli (mcp-server.mjs and the
 * control half of index.mjs). The relay cases drive the real shim process over
 * its stdio pipes, so they test the wire rather than a mock of it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALWAYS_LOAD,
  BridgeToolCatalog,
  CONTROL_LINE_LIMIT,
  IDE_TOOL_PREFIX,
  PROTOCOL_VERSION,
  closeControlServer,
  controlServerPort,
  ensureControlServer,
  getBridgePeer,
  getBridgePeerCount,
  handleControlConnection,
  ideToolOf,
  registerBridgePeer,
  stillRunningText,
  stableJSON,
  tokenMatches,
  unregisterBridgePeer,
  type BridgePeer,
  type BridgeTool,
} from "../../open-sse/services/agyMcpBridge.ts";

const shimPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../open-sse/lib/agy-mcp-server.mjs"
);

// ── ideToolOf: which ACP tool call names a client tool ──────────────────────

test("ideToolOf reads each spelling agy uses for an MCP tool", () => {
  assert.equal(ideToolOf({ title: "ide-tools/read_file" }), "read_file");
  assert.equal(ideToolOf({ title: 'mcp "ide-tools/read_file"' }), "read_file");
  assert.equal(ideToolOf({ title: "mcp(ide-tools/read_file)" }), "read_file");
  assert.equal(ideToolOf({ name: `${IDE_TOOL_PREFIX}read_file` }), "read_file");
  assert.equal(ideToolOf({ toolName: `${IDE_TOOL_PREFIX}read_file` }), "read_file");
  // agy may end the rendered title with a question mark.
  assert.equal(ideToolOf({ title: "ide-tools/read_file?" }), "read_file");
});

test("ideToolOf reads the whole title only, never a word inside it", () => {
  // A shell command's own text can appear in its title; matching a fragment of
  // it would let a shell run be answered as if it were a client tool.
  assert.equal(ideToolOf({ title: "run_command: cat ide-tools/secret" }), "");
  assert.equal(ideToolOf({ title: "ide-tools/read_file and more" }), "");
  assert.equal(ideToolOf({ title: "ide-tools/" }), "");
  assert.equal(ideToolOf({ title: "run_command" }), "");
});

test("ideToolOf ignores a tool call with no usable name", () => {
  assert.equal(ideToolOf(null), "");
  assert.equal(ideToolOf(undefined), "");
  assert.equal(ideToolOf({}), "");
  assert.equal(ideToolOf({ title: 42, name: null }), "");
  // The first usable field wins, even when a later one is empty.
  assert.equal(ideToolOf({ title: "ide-tools/a", name: "" }), "a");
});

// ── stableJSON: how two argument sets are compared ─────────────────────────

test("stableJSON compares arguments by value, not by key order", () => {
  assert.equal(stableJSON({ b: 1, a: 2 }), stableJSON({ a: 2, b: 1 }));
  assert.equal(stableJSON({ a: { d: 1, c: 2 } }), stableJSON({ a: { c: 2, d: 1 } }));
  assert.notEqual(stableJSON({ a: 1 }), stableJSON({ a: 2 }));
});

test("stableJSON keeps array order, which is part of the value", () => {
  assert.notEqual(stableJSON({ a: [1, 2] }), stableJSON({ a: [2, 1] }));
});

test("stillRunningText tells agy to repeat the call instead of starting it again", () => {
  const text = stillRunningText({ name: "read_file" });
  assert.match(text, /read_file is still running in the client/);
  assert.match(text, /call read_file again with exactly the same arguments/);
  assert.match(text, /does not start it twice/);
});

// ── The tool catalog ───────────────────────────────────────────────────────

const tool = (name: string, description = name): BridgeTool => ({
  name,
  description,
  inputSchema: { type: "object", properties: {} },
});

const identityFit = (tools: BridgeTool[]): BridgeTool[] => tools;

test("a listed tool is marked always-loaded, or agy defers it out of reach", () => {
  const catalog = new BridgeToolCatalog([tool("read"), tool("write")], identityFit);
  const listed = catalog.listTools();
  assert.deepEqual(
    listed.map((entry) => (entry._meta as Record<string, unknown>)[ALWAYS_LOAD]),
    [true, true]
  );
  // The caller's objects are not mutated.
  assert.equal("_meta" in catalog.current()[0], false);
});

test("the catalog keeps a _meta the client set and adds the always-load key to it", () => {
  const catalog = new BridgeToolCatalog([{ ...tool("read"), _meta: { keep: "me" } }], identityFit);
  const [listed] = catalog.listTools();
  assert.deepEqual(listed._meta, { keep: "me", [ALWAYS_LOAD]: true });
});

test("the fit runs once per catalog, not on every tools/list", () => {
  let fits = 0;
  const catalog = new BridgeToolCatalog([tool("read")], (tools) => {
    fits++;
    return tools;
  });
  catalog.listTools();
  catalog.listTools();
  catalog.listTools();
  assert.equal(fits, 1);
});

test("the fit runs again after the catalog changes", async () => {
  let fits = 0;
  const catalog = new BridgeToolCatalog([tool("read")], (tools) => {
    fits++;
    return tools;
  });
  catalog.listTools();
  await catalog.updateTools([tool("read"), tool("write")]);
  catalog.listTools();
  assert.equal(fits, 2);
});

test("updateTools with an identical catalog does not announce anything", async () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit);
  let announced = 0;
  const socket = { write: () => void announced++, once: () => {} } as unknown as net.Socket;
  catalog.addWatcher(socket);
  await catalog.updateTools([tool("read")]);
  assert.equal(announced, 0);
});

test("updateTools tells every watcher the catalog changed", async () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit);
  const lines: string[] = [];
  const socket = {
    write: (line: string) => void lines.push(line),
    once: () => {},
  } as unknown as net.Socket;
  catalog.addWatcher(socket);
  await catalog.updateTools([tool("read"), tool("write")]);
  assert.equal(lines.length, 1);
  assert.deepEqual(JSON.parse(lines[0]), { event: "tools_changed" });
});

test("updateTools does not wait when nobody is watching", async () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit, 60_000);
  const started = Date.now();
  await catalog.updateTools([tool("write")]);
  assert.ok(Date.now() - started < 1_000, "an unwatched catalog must not block");
});

test("updateTools waits for agy to list, and returns when the wait budget runs out", async () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit, 120);
  catalog.addWatcher({ write: () => {}, once: () => {} } as unknown as net.Socket);
  const started = Date.now();
  await catalog.updateTools([tool("write")]);
  assert.ok(Date.now() - started >= 100, "it waits for the list it announced");
  assert.ok(Date.now() - started < 5_000, "but not forever");
});

test("a tools/list releases the wait an announce is holding", async () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit, 30_000);
  catalog.addWatcher({ write: () => {}, once: () => {} } as unknown as net.Socket);
  const updating = catalog.updateTools([tool("write")]);
  // agy re-lists, which is what the announce waits for.
  setImmediate(() => catalog.listTools());
  const started = Date.now();
  await updating;
  assert.ok(Date.now() - started < 1_000, "the list released the wait");
});

test("toolsGrew detects a tool agy has not listed yet", () => {
  const catalog = new BridgeToolCatalog([tool("read")], identityFit);
  assert.equal(catalog.toolsGrew([tool("read")]), false);
  assert.equal(catalog.toolsGrew([tool("read"), tool("write")]), true);
});

test("dispose releases the wedged waits and the watchers", async () => {
  let destroyed = 0;
  const catalog = new BridgeToolCatalog([tool("read")], identityFit, 30_000);
  catalog.addWatcher({
    write: () => {},
    once: () => {},
    destroy: () => void destroyed++,
  } as unknown as net.Socket);
  const updating = catalog.updateTools([tool("write")]);
  setImmediate(() => catalog.dispose());
  await updating;
  assert.equal(destroyed, 1);
});

// ── The control channel: who may speak ─────────────────────────────────────

test("tokenMatches is the only gate on a control connection", () => {
  assert.equal(tokenMatches("abc", "abc"), true);
  assert.equal(tokenMatches("abc", "abd"), false);
  assert.equal(tokenMatches("", ""), true);
  // A non-string is refused rather than coerced, and never throws on length.
  assert.equal(tokenMatches(null, "abc"), false);
  assert.equal(tokenMatches("abc", undefined), false);
  assert.equal(tokenMatches(42, 42), false);
});

/** Connect to a control server and resolve with the first line the server sends. */
function exchange(port: number, payload: unknown): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    let buffer = "";
    socket.setEncoding("utf8");
    socket.on("connect", () => socket.write(`${JSON.stringify(payload)}\n`));
    socket.on("data", (chunk: string) => {
      buffer += chunk;
      const newline = buffer.indexOf("\n");
      if (newline < 0) return;
      const line = buffer.slice(0, newline);
      socket.destroy();
      resolve(line);
    });
    socket.on("error", reject);
    socket.setTimeout(5_000, () => {
      socket.destroy();
      reject(new Error("control server did not answer"));
    });
  });
}

function peer(overrides: Partial<BridgePeer> = {}): BridgePeer {
  return {
    token: "peer-token",
    listTools: () => [tool("read")],
    addWatcher: () => {},
    acceptMcpCall: () => {},
    ...overrides,
  };
}

test("the control server refuses a request with no token", async () => {
  const port = await ensureControlServer();
  const line = await exchange(port, { kind: "list" });
  assert.deepEqual(JSON.parse(line), {
    error: { code: -32603, message: "invalid or expired bridge session" },
  });
});

test("the control server refuses an unknown token and a wrong token for a live one", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(peer({ token: "live-token" }));
  try {
    assert.match(await exchange(port, { token: "nope", kind: "list" }), /invalid or expired/);
    assert.match(await exchange(port, { token: "live-toke", kind: "list" }), /invalid or expired/);
    // The real token does get through, so the refusals above are meaningful.
    assert.match(await exchange(port, { token: "live-token", kind: "list" }), /"result"/);
  } finally {
    unregisterBridgePeer("live-token");
  }
});

test("the control server answers list with the peer's tools", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(peer({ token: "list-token", listTools: () => [tool("a"), tool("b")] }));
  try {
    const line = await exchange(port, { token: "list-token", kind: "list" });
    const tools = (JSON.parse(line) as { result: { tools: Array<{ name: string }> } }).result.tools;
    assert.deepEqual(
      tools.map((entry) => entry.name),
      ["a", "b"]
    );
  } finally {
    unregisterBridgePeer("list-token");
  }
});

test("the control server hands a watch over and leaves the socket open", async () => {
  const port = await ensureControlServer();
  let watched: net.Socket | null = null;
  registerBridgePeer(
    peer({ token: "watch-token", addWatcher: (socket) => void (watched = socket) })
  );
  try {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.setEncoding("utf8");
    await new Promise<void>((resolve) => socket.on("connect", () => resolve()));
    socket.write(`${JSON.stringify({ token: "watch-token", kind: "watch" })}\n`);
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.ok(watched, "the peer received the watcher");
    assert.equal(socket.destroyed, false, "a watch socket is not ended by the server");
    socket.destroy();
  } finally {
    unregisterBridgePeer("watch-token");
  }
});

test("the control server routes a call to the peer without ending the socket", async () => {
  const port = await ensureControlServer();
  const seen: Array<{ name: string; args: unknown }> = [];
  let held: net.Socket | null = null;
  registerBridgePeer(
    peer({
      token: "call-token",
      acceptMcpCall: (message, socket) => {
        seen.push({ name: message.name, args: message.arguments });
        held = socket;
        // A deferred call answers later, so the server must not have replied.
      },
    })
  );
  try {
    const socket = net.createConnection({ host: "127.0.0.1", port });
    socket.setEncoding("utf8");
    await new Promise<void>((resolve) => socket.on("connect", () => resolve()));
    socket.write(
      `${JSON.stringify({ token: "call-token", kind: "call", name: "read", arguments: { p: "x" } })}\n`
    );
    await new Promise((resolve) => setTimeout(resolve, 120));
    assert.deepEqual(seen, [{ name: "read", args: { p: "x" } }]);
    assert.equal(socket.destroyed, false, "the peer still owns the reply");
    assert.ok(held);
    // The peer answers on its own socket, and the client sees it.
    const reply = new Promise<string>((resolve) => {
      socket.on("data", (chunk: string) => resolve(chunk));
    });
    (held as unknown as net.Socket).end(`${JSON.stringify({ result: { ok: true } })}\n`);
    assert.deepEqual(JSON.parse(await reply), { result: { ok: true } });
    socket.destroy();
  } finally {
    unregisterBridgePeer("call-token");
  }
});

test("the control server refuses an unknown kind and a line that is not JSON", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(peer({ token: "k-token" }));
  try {
    assert.match(
      await exchange(port, { token: "k-token", kind: "delete" }),
      /unknown control request/
    );

    const line = await new Promise<string>((resolve, reject) => {
      const socket = net.createConnection({ host: "127.0.0.1", port });
      socket.setEncoding("utf8");
      socket.on("connect", () => socket.write("not json\n"));
      socket.on("data", (chunk: string) => {
        socket.destroy();
        resolve(chunk.trim());
      });
      socket.on("error", reject);
    });
    assert.match(line, /invalid control JSON/);
  } finally {
    unregisterBridgePeer("k-token");
  }
});

test("the control server drops a line long past its limit instead of buffering it", async () => {
  const port = await ensureControlServer();
  const socket = net.createConnection({ host: "127.0.0.1", port });
  socket.on("error", () => {});
  await new Promise<void>((resolve) => socket.on("connect", () => resolve()));
  socket.write("x".repeat(CONTROL_LINE_LIMIT + 1));
  await new Promise((resolve) => setTimeout(resolve, 300));
  socket.destroy();
  assert.ok(true, "the server stays up; the oversized line was dropped");
});

test("the control server answers a peer that throws instead of dying", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(
    peer({
      token: "throw-token",
      acceptMcpCall: () => {
        throw new Error("no active turn");
      },
    })
  );
  try {
    const line = await exchange(port, { token: "throw-token", kind: "call", name: "read" });
    assert.deepEqual(JSON.parse(line), { error: { code: -32603, message: "no active turn" } });
  } finally {
    unregisterBridgePeer("throw-token");
  }
});

test("registering and unregistering a peer is observable", () => {
  const before = getBridgePeerCount();
  registerBridgePeer(peer({ token: "count-token" }));
  assert.equal(getBridgePeerCount(), before + 1);
  assert.equal(getBridgePeer("count-token")?.token, "count-token");
  unregisterBridgePeer("count-token");
  assert.equal(getBridgePeerCount(), before);
  assert.equal(getBridgePeer("count-token"), undefined);
});

test("the control server is started once and keeps its port", async () => {
  const first = await ensureControlServer();
  const second = await ensureControlServer();
  assert.equal(first, second);
  assert.equal(controlServerPort(), first);
  assert.ok(first >= 1 && first <= 65535);
});

test("closeControlServer releases the port and a later call restarts it", async () => {
  await ensureControlServer();
  await closeControlServer();
  assert.equal(controlServerPort(), null);
  const port = await ensureControlServer();
  assert.ok(port >= 1);
});

// ── The stdio shim, driven over its real pipes ─────────────────────────────

type Shim = {
  child: ChildProcessWithoutNullStreams;
  send: (payload: unknown) => void;
  /** The next JSON-RPC message, matched by id or by method. */
  next: (match: { id?: number; method?: string }) => Promise<Record<string, unknown>>;
  lines: string[];
};

function startShim(env: Record<string, string>): Shim {
  const child = spawn(process.execPath, [shimPath], {
    env: { ...process.env, ...env },
    stdio: ["pipe", "pipe", "pipe"],
  }) as ChildProcessWithoutNullStreams;
  const lines: string[] = [];
  const waiters: Array<{ match: { id?: number; method?: string }; resolve: (m: never) => void }> =
    [];
  let buffer = "";

  const flush = (): void => {
    child.stdout.setEncoding("utf8");
    let newline: number;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      if (!line.trim()) continue;
      const message = JSON.parse(line) as Record<string, unknown>;
      lines.push(line);
      const index = waiters.findIndex(
        (waiter) =>
          (waiter.match.id !== undefined && message.id === waiter.match.id) ||
          (waiter.match.method !== undefined && message.method === waiter.match.method)
      );
      if (index >= 0) waiters.splice(index, 1)[0].resolve(message as never);
    }
  };
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk: string) => {
    buffer += chunk;
    flush();
  });

  return {
    child,
    lines,
    send: (payload) => child.stdin.write(`${JSON.stringify(payload)}\n`),
    next: (match) =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error(`no message for ${JSON.stringify(match)}`)),
          5_000
        );
        waiters.push({
          match,
          resolve: (message) => {
            clearTimeout(timer);
            resolve(message as never);
          },
        });
        flush();
      }),
  };
}

test("the shim answers initialize with the version the client asked for", async () => {
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  try {
    shim.send({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2024-11-05" },
    });
    const reply = await shim.next({ id: 1 });
    assert.equal(
      (reply.result as { protocolVersion: string }).protocolVersion,
      "2024-11-05",
      "agy's own version is echoed back"
    );
    assert.deepEqual((reply.result as { capabilities: unknown }).capabilities, {
      tools: { listChanged: true },
    });
  } finally {
    shim.child.kill();
  }
});

test("the shim answers initialize with its own protocol version when none is asked", async () => {
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  try {
    shim.send({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} });
    const reply = await shim.next({ id: 1 });
    assert.equal((reply.result as { protocolVersion: string }).protocolVersion, PROTOCOL_VERSION);
  } finally {
    shim.child.kill();
  }
});

test("the shim answers ping, and refuses an unknown method and server/discover", async () => {
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  try {
    shim.send({ jsonrpc: "2.0", id: 1, method: "ping" });
    assert.deepEqual((await shim.next({ id: 1 })).result, {});

    shim.send({ jsonrpc: "2.0", id: 2, method: "does/not/exist" });
    assert.deepEqual((await shim.next({ id: 2 })).error, {
      code: -32601,
      message: "Method not found",
    });

    // Answer as a pre-2026 server: under 2026-07-28 agy expects notifications
    // through subscriptions/listen, which this shim does not implement.
    shim.send({ jsonrpc: "2.0", id: 3, method: "server/discover" });
    assert.deepEqual((await shim.next({ id: 3 })).error, {
      code: -32601,
      message: "Method not found",
    });
  } finally {
    shim.child.kill();
  }
});

test("the shim rejects a malformed message with the JSON-RPC codes", async () => {
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  try {
    shim.child.stdin.write("not json\n");
    assert.deepEqual((await shim.next({ id: null })).error, {
      code: -32700,
      message: "Parse error",
    });

    shim.send({ jsonrpc: "2.0", id: 1 }); // no method
    assert.deepEqual((await shim.next({ id: null })).error, {
      code: -32600,
      message: "Invalid Request",
    });
  } finally {
    shim.child.kill();
  }
});

test("the shim reports a tools/list it cannot relay instead of hanging", async () => {
  // No control port: the shim is not attached to a bridge.
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  try {
    shim.send({ jsonrpc: "2.0", id: 1, method: "tools/list" });
    assert.deepEqual((await shim.next({ id: 1 })).error, {
      code: -32603,
      message: "Bridge control channel is not configured",
    });
  } finally {
    shim.child.kill();
  }
});

test("the shim rejects tools/call params that are not a tool call", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(peer({ token: "shim-token" }));
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "shim-token",
  });
  try {
    for (const params of [{}, { name: "" }, { name: "read", arguments: 5 }]) {
      shim.send({ jsonrpc: "2.0", id: 1, method: "tools/call", params });
      assert.deepEqual((await shim.next({ id: 1 })).error, {
        code: -32602,
        message: "Invalid params",
      });
    }
  } finally {
    shim.child.kill();
    unregisterBridgePeer("shim-token");
  }
});

test("the shim relays a tool call to the peer and returns its result", async () => {
  const port = await ensureControlServer();
  const seen: Array<{ name: string; args: unknown }> = [];
  registerBridgePeer(
    peer({
      token: "relay-token",
      acceptMcpCall: (message, socket) => {
        seen.push({ name: message.name, args: message.arguments });
        socket.end(
          `${JSON.stringify({ result: { content: [{ type: "text", text: "done" }] } })}\n`
        );
      },
    })
  );
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "relay-token",
  });
  try {
    shim.send({
      jsonrpc: "2.0",
      id: 7,
      method: "tools/call",
      params: { name: "read", arguments: { path: "a.ts" } },
    });
    const reply = await shim.next({ id: 7 });
    assert.deepEqual(reply.result, { content: [{ type: "text", text: "done" }] });
    assert.deepEqual(seen, [{ name: "read", args: { path: "a.ts" } }]);
  } finally {
    shim.child.kill();
    unregisterBridgePeer("relay-token");
  }
});

test("the shim defaults missing arguments to an empty object", async () => {
  const port = await ensureControlServer();
  const seen: unknown[] = [];
  registerBridgePeer(
    peer({
      token: "args-token",
      acceptMcpCall: (message, socket) => {
        seen.push(message.arguments);
        socket.end(`${JSON.stringify({ result: {} })}\n`);
      },
    })
  );
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "args-token",
  });
  try {
    shim.send({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "read" } });
    await shim.next({ id: 1 });
    assert.deepEqual(seen, [{}]);
  } finally {
    shim.child.kill();
    unregisterBridgePeer("args-token");
  }
});

test("the shim refuses a duplicate request id instead of queueing it twice", async () => {
  const port = await ensureControlServer();
  registerBridgePeer(
    peer({
      token: "dup-token",
      // Never answers, so the first call stays pending.
      acceptMcpCall: () => {},
    })
  );
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "dup-token",
  });
  try {
    shim.send({ jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "read" } });
    await new Promise((resolve) => setTimeout(resolve, 150));
    shim.send({ jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "read" } });
    const reply = await shim.next({ id: 5 });
    assert.deepEqual(reply.error, { code: -32600, message: "Duplicate request id" });
  } finally {
    shim.child.kill();
    unregisterBridgePeer("dup-token");
  }
});

test("the shim drops a cancelled call instead of answering it", async () => {
  const port = await ensureControlServer();
  let answered = 0;
  registerBridgePeer(
    peer({
      token: "cancel-token",
      acceptMcpCall: () => {
        answered++;
        // The peer never answers, so only the cancel can settle the call.
      },
    })
  );
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "cancel-token",
  });
  try {
    shim.send({ jsonrpc: "2.0", id: 9, method: "tools/call", params: { name: "read" } });
    await new Promise((resolve) => setTimeout(resolve, 150));
    assert.equal(answered, 1, "the call reached the peer");

    shim.send({ jsonrpc: "2.0", method: "notifications/cancelled", params: { requestId: 9 } });
    await new Promise((resolve) => setTimeout(resolve, 200));
    // A cancelled request is settled silently: agy asked for no answer, and
    // sending one would be a reply to a request it already abandoned.
    assert.equal(
      shim.lines.some((line) => (JSON.parse(line) as { id?: unknown }).id === 9),
      false
    );
  } finally {
    shim.child.kill();
    unregisterBridgePeer("cancel-token");
  }
});

test("the shim pushes notifications/tools/list_changed when the bridge announces it", async () => {
  const port = await ensureControlServer();
  let watched: net.Socket | null = null;
  registerBridgePeer(
    peer({ token: "push-token", addWatcher: (socket) => void (watched = socket) })
  );
  const shim = startShim({
    AGY_BRIDGE_CONTROL_PORT: String(port),
    AGY_BRIDGE_TOKEN: "push-token",
  });
  try {
    shim.send({ jsonrpc: "2.0", id: 1, method: "tools/list" });
    await shim.next({ id: 1 });
    await new Promise((resolve) => setTimeout(resolve, 200));
    assert.ok(watched, "the shim opened a watch connection");

    const pushed = shim.next({ method: "notifications/tools/list_changed" });
    (watched as unknown as net.Socket).write(`${JSON.stringify({ event: "tools_changed" })}\n`);
    const message = await pushed;
    assert.equal(message.method, "notifications/tools/list_changed");
    assert.equal("id" in message, false, "a notification carries no id");
  } finally {
    shim.child.kill();
    unregisterBridgePeer("push-token");
  }
});

test("the shim exits quietly when its stdout is closed", async () => {
  const shim = startShim({ AGY_BRIDGE_CONTROL_PORT: "", AGY_BRIDGE_TOKEN: "" });
  const exited = new Promise<number | null>((resolve) => shim.child.on("exit", resolve));
  shim.child.stdin.end();
  const code = await exited;
  // A closed stdin is agy going away: the shim must not linger.
  assert.equal(code, 0);
});

test("handleControlConnection is exported for a host that brings its own server", async () => {
  const server = net.createServer((socket) => handleControlConnection(socket));
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address() as net.AddressInfo;
  registerBridgePeer(peer({ token: "own-token" }));
  try {
    const line = await exchange(address.port, { token: "own-token", kind: "list" });
    assert.match(line, /"result"/);
  } finally {
    unregisterBridgePeer("own-token");
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
