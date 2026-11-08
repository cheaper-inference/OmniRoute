import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { test } from "node:test";
import WebSocket from "ws";
import {
  runM365Turn,
  M365TurnError,
  type M365WebSocketConstructor,
} from "../../open-sse/executors/m365Turn.ts";

/**
 * A local server that refuses every WebSocket upgrade with one HTTP status, driven by the
 * real ws client: the production transport must report what the server said, not a generic
 * connection failure.
 */
async function refusingServer(status: number, headers: Record<string, string> = {}) {
  const server: Server = createServer();
  server.on("upgrade", (_request, socket) => {
    const lines = [`HTTP/1.1 ${status} Refused`, "Connection: close", "Content-Length: 0"];
    for (const [name, value] of Object.entries(headers)) lines.push(`${name}: ${value}`);
    socket.end(`${lines.join("\r\n")}\r\n\r\n`);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  // The transport only dials wss://; point the real client at the local plain-text server.
  class LocalWebSocket extends WebSocket {
    constructor(url: string, options: ConstructorParameters<typeof WebSocket>[2]) {
      const target = new URL(url);
      super(`ws://127.0.0.1:${port}${target.pathname}${target.search}`, options);
    }
  }
  return { server, Ctor: LocalWebSocket as unknown as M365WebSocketConstructor };
}

async function refusal(status: number, headers?: Record<string, string>) {
  const { server, Ctor } = await refusingServer(status, headers);
  try {
    const error = await runM365Turn({
      url: "wss://substrate.office.com/m365Copilot/Chathub/a@b?ConversationId=c",
      invocation: { type: 4 },
      WebSocketCtor: Ctor,
      idleTimeoutMs: 5000,
    }).then(
      () => assert.fail("a refused upgrade completed"),
      (caught: unknown) => caught
    );
    assert.ok(error instanceof M365TurnError);
    return error;
  } finally {
    server.close();
  }
}

test("an upgrade refused with 401 or 403 is a rejected sign-in, not a connection failure", async () => {
  for (const status of [401, 403]) {
    const error = await refusal(status);
    assert.equal(error.code, "M365_UNAUTHORIZED", String(status));
    assert.equal(error.status, 401);
    assert.match(error.message, /Sign in again/);
  }
});

test("an upgrade refused with 429 is throttling and keeps its Retry-After", async () => {
  const error = await refusal(429, { "Retry-After": "42" });
  assert.equal(error.code, "M365_THROTTLED");
  assert.equal(error.status, 429);
  assert.equal(error.retryAfterSeconds, 42);
});

test("any other refused upgrade is a handshake failure", async () => {
  const error = await refusal(500);
  assert.equal(error.code, "M365_HANDSHAKE_ERROR");
  assert.equal(error.status, 502);
});
