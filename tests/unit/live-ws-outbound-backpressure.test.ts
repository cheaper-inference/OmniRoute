// sendTo() queued every frame for a subscriber that had stopped reading, so a
// slow or paused client made the server buffer without limit. Repeating "subscribe"
// made it worse: each ~50-byte request queued another copy of the whole backlog. The
// server now drops a connection whose outbound buffer is past a fixed cap, so it can
// reconnect and get the welcome backlog again, and a healthy reader is unaffected.
//
// Real `ws` clients against a real server on 127.0.0.1. A "slow" client pauses its
// TCP socket after the welcome frame. The assertions compare bytes actually
// delivered against bytes the server was asked to send, with wide margins for
// kernel socket buffers, so they do not depend on timing. Importing liveServer.ts is
// safe: its auto-start guard is short-circuited under the Node test runner.
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { format } from "node:util";

import { WebSocket } from "ws";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-backpressure-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { emit } = await import("../../src/lib/events/eventBus.ts");
const { startLiveDashboardServer, isOverOutboundLimit, newestWithinBytes } =
  await import("../../src/server/ws/liveServer.ts");

const MB = 1024 * 1024;
const opened: WebSocket[] = [];

// "[LiveWS] Dropping slow client ..." lines, formatted as console.warn would print them.
const dropLogs: string[] = [];
const originalWarn = console.warn;

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address();
      srv.close(() => {
        if (addr && typeof addr === "object") resolve(addr.port);
        else reject(new Error("Could not allocate a port"));
      });
    });
  });
}

type Client = {
  ws: WebSocket;
  sessionId: string;
  welcome: { backlog: number; data: { data: { requestId: string } }[] };
  bytes: () => number;
  closed: Promise<number>;
  socket: net.Socket;
};

/** Open an anonymous (open-mode) connection, subscribe and wait for the welcome frame. */
function openSubscribed(port: number): Promise<Client> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`);
    opened.push(ws);
    let bytes = 0;
    const closed = new Promise<number>((res) => ws.once("close", (code) => res(code)));
    // A no-op once the welcome resolved this promise.
    ws.once("close", (code) => reject(new Error(`closed ${code} before the welcome frame`)));
    ws.once("open", () => ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] })));
    ws.on("message", (data: Buffer) => {
      bytes += data.length;
      if (bytes === data.length) {
        const frame = JSON.parse(String(data));
        if (frame.type !== "welcome") reject(new Error(`expected welcome, got ${frame.type}`));
        // ws keeps the net.Socket on a private field; pausing it is what a client that
        // stopped reading looks like to the server.
        const socket = (ws as unknown as { _socket: net.Socket })._socket;
        resolve({
          ws,
          sessionId: frame.sessionId,
          welcome: frame,
          bytes: () => bytes,
          closed,
          socket,
        });
      }
    });
    ws.once("error", reject);
  });
}

function within<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout;
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise<T>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`${label} (waited ${ms} ms)`)), ms);
    }),
  ]);
}

/** Resume a paused client and wait for the server to have closed it. */
async function drainAndExpectClose(client: Client, label: string): Promise<number> {
  client.socket.resume();
  return within(client.closed, 20_000, `${label}: server never closed the slow client`);
}

describe("LiveWS outbound backpressure", () => {
  let server: import("http").Server | null = null;
  let port = 0;

  before(async () => {
    console.warn = (...args: unknown[]) => {
      const line = format(...args);
      if (line.startsWith("[LiveWS] Dropping slow client")) dropLogs.push(line);
      originalWarn(...args);
    };
    core.resetDbInstance();
    // Open mode (requireLogin=false) keeps credentials out of this test.
    await updateSettings({ requireLogin: false });
    port = await getFreePort();
    server = await startLiveDashboardServer(port, "127.0.0.1");
  });

  after(async () => {
    console.warn = originalWarn;
    for (const ws of opened) ws.terminate();
    if (server) await new Promise<void>((resolve) => server!.close(() => resolve()));
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  });

  test(
    "repeated subscribe from a client that does not read is cut off",
    { timeout: 60_000 },
    async (t) => {
      // Fill the 500-entry backlog with ~2 KB events: each welcome is then ~1 MB.
      const filler = "x".repeat(2048);
      for (let i = 0; i < 500; i++) {
        emit("request.started", { requestId: `fill-${i}`, filler } as never);
      }
      const slow = await openSubscribed(port);
      const welcomeBytes = slow.bytes();
      slow.socket.pause();
      const subscribes = 50; // under the 100 msg/s limit, so every one is handled
      for (let i = 0; i < subscribes; i++) {
        slow.ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] }));
      }
      // Let the server handle the subscribes while the client is still not reading.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await drainAndExpectClose(slow, "replay");
      const requested = welcomeBytes * (subscribes + 1);
      t.diagnostic(`replay: ${slow.bytes()} bytes delivered of ${requested} requested`);
      assert.ok(
        slow.bytes() < requested / 2,
        `delivered ${slow.bytes()} of ${requested} bytes: replays were not bounded`
      );
    }
  );

  test(
    "a paused subscriber is dropped while a reading one gets every event",
    { timeout: 120_000 },
    async (t) => {
      const fast = await openSubscribed(port);
      const slow = await openSubscribed(port);
      slow.socket.pause();
      dropLogs.length = 0;

      const events = 64;
      const payload = "y".repeat(MB);
      let fastEvents = 0;
      let next: (() => void) | null = null;
      fast.ws.on("message", (data) => {
        if (String(data).includes('"event":"request.completed"')) {
          fastEvents++;
          next?.();
        }
      });
      for (let i = 0; i < events; i++) {
        // Lockstep with the reading client so its own buffer never holds more than
        // one event; only the paused client falls behind.
        const delivered = new Promise<void>((resolve) => (next = resolve));
        emit("request.completed", { requestId: `big-${i}`, payload } as never);
        await within(delivered, 20_000, `fast client did not receive event ${i}`);
      }

      // The server must release the paused client's socket (and its queued bytes) right
      // away, without waiting for the client to read: a graceful close() would keep the
      // ~4 MiB queue and the TCP socket for the 30 s close timeout. Only `fast` remains.
      const countConnections = () =>
        new Promise<number>((resolve, reject) =>
          server!.getConnections((err, n) => (err ? reject(err) : resolve(n)))
        );
      const releaseDeadline = Date.now() + 5_000;
      let connections = await countConnections();
      while (connections > 1 && Date.now() < releaseDeadline) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        connections = await countConnections();
      }
      assert.equal(connections, 1, "server kept the paused client's socket open");

      const code = await drainAndExpectClose(slow, "stream");
      const requested = events * MB;
      t.diagnostic(`stream: slow client got ${slow.bytes()} of ${requested} bytes, close ${code}`);
      assert.ok(
        slow.bytes() < requested / 2,
        `delivered ${slow.bytes()} of ${requested} bytes: outbound buffer was not bounded`
      );
      assert.equal(fastEvents, events);
      assert.equal(fast.ws.readyState, WebSocket.OPEN, "the reading client was dropped");

      // One log line for the dropped client, none for the reader. The queued byte count it
      // reports pins the cap: the check runs before each 1 MiB frame, so the drop happens
      // above 4 MiB and at most one frame later.
      assert.equal(dropLogs.length, 1, `expected one drop line, got:\n${dropLogs.join("\n")}`);
      assert.ok(dropLogs[0].includes(` ${slow.sessionId}:`), dropLogs[0]);
      const queued = Number(/: (\d+) bytes queued/.exec(dropLogs[0])?.[1]);
      assert.ok(queued > 4 * MB && queued <= 5 * MB + 1024, `dropped at ${queued} bytes queued`);
    }
  );

  test("the cap is strictly more than 4 MiB of queued output", () => {
    assert.equal(isOverOutboundLimit(0), false);
    assert.equal(isOverOutboundLimit(1024), false);
    assert.equal(isOverOutboundLimit(256 * 1024 + 1), false);
    assert.equal(isOverOutboundLimit(4 * MB), false);
    assert.equal(isOverOutboundLimit(4 * MB + 1), true);
  });

  test("the welcome replays only the newest backlog that fits in 1 MiB", async () => {
    // 500 events of ~10 KB: the full backlog would be a ~5 MB welcome frame.
    const filler = "w".repeat(10_000);
    for (let i = 0; i < 500; i++) {
      emit("request.started", { requestId: `welcome-${i}`, filler } as never);
    }
    const client = await openSubscribed(port);
    const { data, backlog } = client.welcome;
    const ids = data.map((item) => item.data.requestId);
    const size = data.reduce((sum, item) => sum + Buffer.byteLength(JSON.stringify(item)), 0);
    const entry = Buffer.byteLength(JSON.stringify(data[0]));
    assert.equal(backlog, data.length);
    assert.ok(size <= MB, `welcome backlog is ${size} bytes`);
    assert.ok(size + entry > MB, `welcome backlog stopped early at ${size} bytes`);
    assert.equal(ids.at(-1), "welcome-499", "the newest event is missing");
    const first = 500 - ids.length;
    assert.deepEqual(
      ids,
      Array.from({ length: ids.length }, (_, k) => `welcome-${first + k}`),
      "the replay is not the newest contiguous run, oldest first"
    );
    client.ws.terminate();
  });

  test("the welcome echoes only known channel names", async () => {
    emit("request.started", { requestId: "channels-1" } as never);
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`);
    opened.push(ws);
    type Welcome = { channels: unknown[]; backlog: number };
    const welcomes: Welcome[] = [];
    let onWelcome = () => {};
    ws.on("message", (d) => {
      const f = JSON.parse(String(d));
      if (f.type === "welcome") {
        welcomes.push(f);
        onWelcome();
      }
    });
    const subscribe = (channels: unknown) =>
      new Promise<Welcome>((resolve, reject) => {
        const n = welcomes.length;
        onWelcome = () => welcomes.length > n && resolve(welcomes[n]);
        ws.once("error", reject);
        ws.send(JSON.stringify({ type: "subscribe", channels }));
      });
    await new Promise((resolve, reject) => {
      ws.once("open", resolve);
      ws.once("error", reject);
    });

    // A long name, a number, a nested array and a duplicate are all dropped.
    const first = await subscribe(["requests", "x".repeat(2 * MB), 7, ["requests"], "requests"]);
    // Shorten each name so a failure does not print the 2 MiB string.
    assert.deepEqual(
      first.channels.map((c) => String(c).slice(0, 32)),
      ["requests"]
    );
    assert.ok(first.backlog > 0, "the backlog has a requests event to replay");

    // A string is not a list of channels: nothing is subscribed and nothing replayed.
    const second = await subscribe("requests");
    assert.deepEqual(second.channels, []);
    assert.equal(second.backlog, 0);
    ws.terminate();
  });

  test("newestWithinBytes keeps the newest run that fits, without gaps", () => {
    const sized = (n: number) => "a".repeat(n - 2); // JSON adds the two quotes
    const entries = [sized(30), sized(50), sized(10), sized(40)];
    assert.deepEqual(newestWithinBytes(entries, 50), [sized(10), sized(40)]);
    // The 50-byte entry does not fit after the newest two, so the 30-byte one is not
    // reached even though it would fit on its own.
    assert.deepEqual(newestWithinBytes(entries, 99), [sized(10), sized(40)]);
    assert.deepEqual(newestWithinBytes(entries, 130), entries);
    assert.deepEqual(newestWithinBytes(entries, 39), []);
    assert.deepEqual(newestWithinBytes([], 10), []);
    // Sized in UTF-8 bytes, as bufferedAmount is: 12 characters but 22 bytes.
    assert.deepEqual(newestWithinBytes(["é".repeat(10)], 21), []);
    assert.deepEqual(newestWithinBytes(["é".repeat(10)], 22), ["é".repeat(10)]);
  });
});
