/**
 * agyAcpConnection.ts — the JSON-RPC framing under the agy ACP transport.
 *
 * The child is faked here: this suite is about bytes, and a fake lets it drive
 * exactly the frames agy would send (a reply, an agent request, a notification,
 * a bad line, an oversized line) without an agy binary on the machine.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

import {
  ACP_LINE_LIMIT,
  AcpConnection,
  type AcpChild,
  type JsonRecord,
} from "../../open-sse/services/agyAcpConnection.ts";

type Written = JsonRecord;

/** A child whose stdio the test controls, and which records what was written. */
class FakeChild {
  readonly written: Written[] = [];
  readonly stdout = Object.assign(new EventEmitter(), {
    setEncoding: () => {},
  });
  readonly stdin = {
    writable: true,
    write: (chunk: string): boolean => {
      for (const line of chunk.split("\n")) {
        if (line.trim()) this.written.push(JSON.parse(line) as Written);
      }
      return true;
    },
  };

  asChild(): AcpChild {
    return this as unknown as AcpChild;
  }

  /** Send one frame the way agy would: a single line, newline terminated. */
  send(message: unknown): void {
    this.stdout.emit("data", `${JSON.stringify(message)}\n`);
  }

  /** Send raw bytes, for the framing cases. */
  raw(chunk: string): void {
    this.stdout.emit("data", chunk);
  }

  get methods(): string[] {
    return this.written.filter((m) => typeof m.method === "string").map((m) => m.method as string);
  }
}

type Handlers = {
  requests: Array<{ method: string; params: JsonRecord }>;
  notifications: Array<{ method: string; params: JsonRecord }>;
  protocolErrors: Error[];
};

function connect(onRequest?: (method: string, params: JsonRecord) => unknown) {
  const child = new FakeChild();
  const seen: Handlers = { requests: [], notifications: [], protocolErrors: [] };
  const connection = new AcpConnection(child.asChild(), {
    onNotification: (method, params) => void seen.notifications.push({ method, params }),
    onRequest: (method, params) => {
      seen.requests.push({ method, params });
      if (onRequest) return onRequest(method, params);
      return { ok: true };
    },
    onProtocolError: (error) => void seen.protocolErrors.push(error),
  });
  return { child, connection, seen };
}

// ── Requests ───────────────────────────────────────────────────────────────

test("a request is written as one JSON-RPC line with a fresh id", async () => {
  const { child, connection } = connect();
  const pending = connection.request("initialize", { protocolVersion: 1 });
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: 1 },
  });
  child.send({ jsonrpc: "2.0", id: 1, result: { ok: true } });
  assert.deepEqual(await pending, { ok: true });

  // Ids advance even across a request nobody answers, so it is not reused.
  connection.request("session/new", { cwd: "/tmp" }).catch(() => {});
  assert.equal(child.written[1].id, 2);
});

test("a reply resolves only the request with its own id", async () => {
  const { child, connection } = connect();
  const first = connection.request("a", {});
  const second = connection.request("b", {});
  child.send({ jsonrpc: "2.0", id: 2, result: { who: "b" } });
  assert.deepEqual(await second, { who: "b" });
  child.send({ jsonrpc: "2.0", id: 1, result: { who: "a" } });
  assert.deepEqual(await first, { who: "a" });
});

test("a null result resolves as null, which is a valid ACP answer", async () => {
  const { child, connection } = connect();
  const pending = connection.request("session/cancel", {});
  child.send({ jsonrpc: "2.0", id: 1, result: null });
  assert.equal(await pending, null);
});

test("a reply with no result at all resolves as null rather than undefined", async () => {
  const { child, connection } = connect();
  const pending = connection.request("ping", {});
  child.send({ jsonrpc: "2.0", id: 1 });
  assert.equal(await pending, null);
});

test("an error reply rejects with agy's own error object attached", async () => {
  const { child, connection } = connect();
  const pending = connection.request("session/new", {});
  child.send({
    jsonrpc: "2.0",
    id: 1,
    error: { code: -32602, message: "invalid session" },
  });
  await assert.rejects(pending, (error: Error & { acpError?: unknown }) => {
    assert.match(error.message, /agy session\/new failed: invalid session/);
    assert.deepEqual(error.acpError, { code: -32602, message: "invalid session" });
    return true;
  });
});

test("an error reply with a non-string message still reports something", async () => {
  const { child, connection } = connect();
  const pending = connection.request("x", {});
  child.send({ jsonrpc: "2.0", id: 1, error: "plain string error" });
  await assert.rejects(pending, /agy x failed: plain string error/);
});

test("a reply for an id nobody is waiting for is ignored", async () => {
  const { child, connection } = connect();
  const pending = connection.request("a", {});
  child.send({ jsonrpc: "2.0", id: 99, result: { nope: true } });
  child.send({ jsonrpc: "2.0", id: 1, result: { yes: true } });
  assert.deepEqual(await pending, { yes: true });
});

test("a request times out with the caller's own message", async () => {
  const { connection } = connect();
  await assert.rejects(
    connection.request("initialize", {}, 40, "agy bridge: handshake stalled"),
    /agy bridge: handshake stalled/
  );
});

test("a timed-out request no longer resolves when its reply arrives late", async () => {
  const { child, connection, seen } = connect();
  await assert.rejects(connection.request("initialize", {}, 30), /timed out after 30ms/);
  // The reply is dropped instead of throwing on a listener that already left,
  // and it is not mistaken for a notification either.
  child.send({ jsonrpc: "2.0", id: 1, result: { late: true } });
  assert.deepEqual(seen.notifications, []);
  assert.deepEqual(seen.protocolErrors, []);
});

test("a request with no timeout waits indefinitely for a prompt", async () => {
  const { child, connection } = connect();
  const pending = connection.request("session/prompt", {});
  await new Promise((resolve) => setTimeout(resolve, 50));
  child.send({ jsonrpc: "2.0", id: 1, result: { stopReason: "end_turn" } });
  assert.deepEqual(await pending, { stopReason: "end_turn" });
});

// ── Notifications ─────────────────────────────────────────────────────────

test("a message with a method and no id is a notification", () => {
  const { child, seen } = connect();
  child.send({
    jsonrpc: "2.0",
    method: "session/update",
    params: { sessionId: "s1", update: { sessionUpdate: "agent_message_chunk" } },
  });
  assert.deepEqual(seen.notifications, [
    {
      method: "session/update",
      params: { sessionId: "s1", update: { sessionUpdate: "agent_message_chunk" } },
    },
  ]);
});

test("a notification with no params arrives with an empty object", () => {
  const { child, seen } = connect();
  child.send({ jsonrpc: "2.0", method: "some/event" });
  assert.deepEqual(seen.notifications, [{ method: "some/event", params: {} }]);
});

test("a notify writes a message with no id", () => {
  const { child, connection } = connect();
  connection.notify("session/cancel", { sessionId: "s1" });
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    method: "session/cancel",
    params: { sessionId: "s1" },
  });
  assert.equal("id" in child.written[0], false);
});

// ── The agent's own requests ──────────────────────────────────────────────

test("an agent request is answered with the handler's result", async () => {
  const { child, seen } = connect((method) => ({ handled: method }));
  child.send({
    jsonrpc: "2.0",
    id: 7,
    method: "session/request_permission",
    params: { sessionId: "s1" },
  });
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(seen.requests, [
    { method: "session/request_permission", params: { sessionId: "s1" } },
  ]);
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    id: 7,
    result: { handled: "session/request_permission" },
  });
});

test("an agent request whose handler throws is answered, not left hanging", async () => {
  const { child } = connect(() => {
    throw new Error("agy bridge does not serve this");
  });
  child.send({ jsonrpc: "2.0", id: 8, method: "fs/read_text_file", params: {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    id: 8,
    error: { code: -32603, message: "agy bridge does not serve this" },
  });
});

test("an agent request carries the handler's own JSON-RPC code through", async () => {
  const { child } = connect(() => {
    throw Object.assign(new Error("method not supported"), { code: -32601 });
  });
  child.send({ jsonrpc: "2.0", id: 9, method: "terminal/create", params: {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    id: 9,
    error: { code: -32601, message: "method not supported" },
  });
});

test("an async agent request is answered when it settles", async () => {
  const { child } = connect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 20));
    return { outcome: { outcome: "selected", optionId: "allow" } };
  });
  child.send({ jsonrpc: "2.0", id: 3, method: "session/request_permission", params: {} });
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.deepEqual(child.written[0], {
    jsonrpc: "2.0",
    id: 3,
    result: { outcome: { outcome: "selected", optionId: "allow" } },
  });
});

test("an agent request answered with undefined still sends a result field", async () => {
  const { child } = connect(() => undefined);
  child.send({ jsonrpc: "2.0", id: 4, method: "session/request_permission", params: {} });
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(child.written[0], { jsonrpc: "2.0", id: 4, result: null });
});

// ── Framing ───────────────────────────────────────────────────────────────

test("one chunk carrying several lines is dispatched in order", () => {
  const { child, seen } = connect();
  child.raw(
    [
      JSON.stringify({ jsonrpc: "2.0", method: "a" }),
      JSON.stringify({ jsonrpc: "2.0", method: "b" }),
      "",
    ].join("\n")
  );
  assert.deepEqual(
    seen.notifications.map((entry) => entry.method),
    ["a", "b"]
  );
});

test("a line split across chunks is only dispatched once it is complete", () => {
  const { child, seen } = connect();
  const line = JSON.stringify({ jsonrpc: "2.0", method: "session/update", params: { n: 1 } });
  child.raw(line.slice(0, 10));
  assert.deepEqual(seen.notifications, [], "half a line is not a message");
  child.raw(`${line.slice(10)}\n`);
  assert.deepEqual(seen.notifications, [{ method: "session/update", params: { n: 1 } }]);
});

test("carriage returns and blank lines around a message are tolerated", () => {
  const { child, seen } = connect();
  child.raw(`\r\n\r\n${JSON.stringify({ jsonrpc: "2.0", method: "p" })}\r\n\r\n`);
  assert.deepEqual(
    seen.notifications.map((entry) => entry.method),
    ["p"]
  );
});

test("a line that is not JSON is skipped without closing the connection", async () => {
  const { child, connection, seen } = connect();
  child.raw("this is not json\n");
  assert.deepEqual(seen.protocolErrors, [], "one bad line is not a protocol failure");
  const pending = connection.request("after", {});
  child.send({ jsonrpc: "2.0", id: 1, result: { ok: true } });
  assert.deepEqual(await pending, { ok: true }, "the pipe still works");
});

test("a JSON value that is not an object is ignored", () => {
  const { child, seen } = connect();
  child.raw('null\n42\n"a string"\n[1,2]\n');
  assert.deepEqual(seen.notifications, []);
  assert.deepEqual(seen.protocolErrors, []);
});

test("a message with neither an id nor a method is ignored", () => {
  const { child, seen } = connect();
  child.send({ jsonrpc: "2.0", params: { nothing: true } });
  assert.deepEqual(seen.notifications, []);
  assert.deepEqual(seen.requests, []);
});

test("an oversized line is reported as a protocol error instead of buffered", () => {
  const { child, seen } = connect();
  child.raw("x".repeat(ACP_LINE_LIMIT + 1));
  assert.equal(seen.protocolErrors.length, 1);
  assert.match(seen.protocolErrors[0].message, /larger than 64 MiB/);
});

test("the buffer is discarded after an oversized line, so the next frame is read", () => {
  const { child, seen } = connect();
  child.raw("x".repeat(ACP_LINE_LIMIT + 1));
  child.raw(`\n${JSON.stringify({ jsonrpc: "2.0", method: "recovered" })}\n`);
  assert.deepEqual(
    seen.notifications.map((entry) => entry.method),
    ["recovered"]
  );
});

test("a reply whose id is not a number is ignored", () => {
  const { child, seen } = connect();
  child.send({ jsonrpc: "2.0", id: "1", result: {} });
  assert.deepEqual(seen.notifications, []);
});

// ── Closing ───────────────────────────────────────────────────────────────

test("close fails every outstanding request with one error", async () => {
  const { connection } = connect();
  const first = connection.request("a", {});
  const second = connection.request("b", {});
  const failure = new Error("agy exited");
  connection.close(failure);
  assert.equal(connection.isClosed, true);
  await assert.rejects(first, /agy exited/);
  await assert.rejects(second, /agy exited/);
});

test("a request after close rejects at once instead of writing to a dead child", async () => {
  const { connection, child } = connect();
  const failure = new Error("agy exited");
  connection.close(failure);
  const written = child.written.length;
  await assert.rejects(connection.request("a", {}), /agy exited/);
  assert.equal(child.written.length, written, "nothing is written after close");
});

test("a notify after close writes nothing", () => {
  const { connection, child } = connect();
  connection.close(new Error("gone"));
  connection.notify("session/cancel", {});
  assert.equal(child.written.length, 0);
});

test("closing twice keeps the first error, which is the real cause", async () => {
  const { connection } = connect();
  const pending = connection.request("a", {});
  connection.close(new Error("the real cause"));
  connection.close(new Error("a later one"));
  await assert.rejects(pending, /the real cause/);
});

test("a child whose stdin is gone does not make request throw", async () => {
  const child = new FakeChild();
  Object.defineProperty(child.stdin, "writable", { value: false });
  const connection = new AcpConnection(child.asChild(), {
    onNotification: () => {},
    onRequest: () => null,
    onProtocolError: () => {},
  });
  const pending = connection.request("a", {}, 20);
  await assert.rejects(pending, /timed out/);
});
