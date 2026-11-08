import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import http from "node:http";
import net from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import { fetch as undiciFetch, type Dispatcher } from "undici";

const previousDataDir = process.env.DATA_DIR;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-socks-cancellation-"));
process.env.DATA_DIR = dataDir;

// These helpers import the DB layer; isolate it before module initialization.
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { fetchWithConnectionProxy } =
  await import("../../open-sse/services/connectionProxyFetch.ts");
const { proxyFetch, runWithProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
const { clearDispatcherCache, createProxyDispatcher, getProxyRetryDispatcher } =
  await import("../../open-sse/utils/proxyDispatcher.ts");

test.after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

async function bounded<T>(promise: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("loopback transport did not progress")), 5000);
      }),
    ]);
  } finally {
    clearTimeout(timer!);
  }
}

type ObservedRequest = {
  response: http.ServerResponse;
  socket: net.Socket;
  closed: Promise<void>;
};

async function fixture(t: TestContext, connections?: number) {
  const oldLimit = process.env.OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS;
  const oldSocks = process.env.ENABLE_SOCKS5_PROXY;
  if (connections === undefined) delete process.env.OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS;
  else process.env.OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS = String(connections);
  process.env.ENABLE_SOCKS5_PROXY = "true";
  clearDispatcherCache();
  const sockets = new Set<net.Socket>();
  const dispatchers = new Set<Dispatcher>();
  const abort = new AbortController();
  const requests = new Map<string, ObservedRequest>();
  const waiting = new Map<string, ReturnType<typeof deferred<ObservedRequest>>>();
  const observeSocket = (socket: net.Socket) => {
    sockets.add(socket);
    socket.on("error", () => {});
    socket.on("close", () => sockets.delete(socket));
  };
  const originSockets = new Set<net.Socket>();
  let maxConcurrentOriginSockets = 0;
  const origin = http.createServer((request, response) => {
    request.resume();
    const closed = deferred<void>();
    response.once("close", () => closed.resolve());
    const observed = { response, socket: request.socket, closed: closed.promise };
    requests.set(request.url!, observed);
    if (request.url!.startsWith("/stream")) {
      response.writeHead(200, { "content-type": "text/event-stream" });
      response.write("data: started\n\n");
    } else if (request.url!.startsWith("/immediate")) {
      response.end('{"quota":42}');
    }
    waiting.get(request.url!)?.resolve(observed);
  });
  origin.on("connection", (socket) => {
    observeSocket(socket);
    originSockets.add(socket);
    maxConcurrentOriginSockets = Math.max(maxConcurrentOriginSockets, originSockets.size);
    socket.once("close", () => originSockets.delete(socket));
  });

  // A real SOCKS5 tunnel to this fixture's origin; never resolve or connect externally.
  const proxy = net.createServer((socket) => {
    observeSocket(socket);
    let buffer = Buffer.alloc(0);
    let greeted = false;
    const handshake = (chunk: Buffer) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (!greeted) {
        if (buffer.length < 2 || buffer.length < 2 + buffer[1]) return;
        buffer = buffer.subarray(2 + buffer[1]);
        socket.write(Buffer.from([5, 0]));
        greeted = true;
      }
      if (buffer.length < 5) return;
      const length = buffer[3] === 1 ? 10 : buffer[3] === 3 ? 7 + buffer[4] : 0;
      if (!length) {
        socket.destroy();
        return;
      }
      if (buffer.length < length) return;
      assert.equal(buffer.readUInt16BE(length - 2), (origin.address() as net.AddressInfo).port);
      socket.off("data", handshake);
      const extra = buffer.subarray(length);
      const remote = net.connect((origin.address() as net.AddressInfo).port, "127.0.0.1", () => {
        socket.write(Buffer.from([5, 0, 0, 1, 127, 0, 0, 1, 0, 0]));
        if (extra.length) remote.write(extra);
        socket.pipe(remote);
        remote.pipe(socket);
      });
      observeSocket(remote);
      socket.on("close", () => remote.destroy());
      remote.on("close", () => socket.destroy());
      remote.on("error", () => socket.destroy());
    };
    socket.on("data", handshake);
  });
  const close = (server: net.Server) =>
    new Promise<void>((resolve) => server.close(() => resolve()));
  t.after(async () => {
    abort.abort();
    await Promise.all([...dispatchers].map((dispatcher) => dispatcher.destroy()));
    clearDispatcherCache();
    for (const socket of sockets) socket.destroy();
    await Promise.all([close(proxy), close(origin)]);
    for (const [key, value] of [
      ["OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS", oldLimit],
      ["ENABLE_SOCKS5_PROXY", oldSocks],
    ]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  await new Promise<void>((resolve) => origin.listen(0, "127.0.0.1", resolve));
  await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
  const config = {
    type: "socks5",
    host: "127.0.0.1",
    port: (proxy.address() as net.AddressInfo).port,
  };
  const proxyUrl = `socks5://127.0.0.1:${config.port}`;
  const base = `http://transport-fixture.invalid:${(origin.address() as net.AddressInfo).port}`;
  const dispatcher = createProxyDispatcher(proxyUrl);
  dispatchers.add(dispatcher);
  const signal = (other?: AbortSignal) =>
    other ? AbortSignal.any([abort.signal, other]) : abort.signal;
  return {
    dispatcher,
    requests,
    maxConcurrentOriginSockets: () => maxConcurrentOriginSockets,
    wait: (path: string) => {
      if (requests.has(path)) return Promise.resolve(requests.get(path)!);
      if (!waiting.has(path)) waiting.set(path, deferred<ObservedRequest>());
      return bounded(waiting.get(path)!.promise);
    },
    stream: async (path: string) => {
      assert.equal(createProxyDispatcher(proxyUrl), dispatcher, "inference reuses the cached pool");
      const response = await bounded(
        runWithProxyContext(config, () =>
          proxyFetch(base + path, {
            method: "POST",
            body: "{}",
            signal: signal(),
          })
        )
      );
      const reader = response.body!.getReader();
      t.after(async () => {
        await reader.cancel().catch(() => {});
        reader.releaseLock();
      });
      assert.match(new TextDecoder().decode((await bounded(reader.read())).value), /data: started/);
      return reader;
    },
    quota: (path: string, timeout?: AbortSignal) =>
      fetchWithConnectionProxy(
        "isolated-transport-fixture",
        base + path,
        { signal: signal(timeout) },
        {
          resolveProxyForConnection: async () => {
            assert.equal(
              createProxyDispatcher(proxyUrl),
              dispatcher,
              "quota shares the inference pool"
            );
            return { proxy: config };
          },
        }
      ),
    fetch: async (path: string, retry = false) => {
      const selected = retry ? getProxyRetryDispatcher(proxyUrl) : dispatcher;
      dispatchers.add(selected);
      return undiciFetch(base + path, { dispatcher: selected, signal: signal() });
    },
  };
}

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});

async function finishStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  request: ObservedRequest
) {
  request.response.end("data: completed\n\n");
  let output = "";
  while (true) {
    const chunk = await bounded(reader.read());
    if (chunk.done) break;
    output += new TextDecoder().decode(chunk.value);
  }
  assert.match(output, /data: completed/);
}

test(
  "SOCKS: immediate quota GET completes while POST SSE remains active",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t);
    const stream = await f.stream("/stream");
    const response = await bounded(f.quota("/immediate", AbortSignal.timeout(1500)));
    assert.ok(response, "healthy quota must not wait for the active SSE to end");
    assert.deepEqual(await response.json(), { quota: 42 });
    assert.notEqual((await f.wait("/stream")).socket, (await f.wait("/immediate")).socket);
    await finishStream(stream, await f.wait("/stream"));
  }
);

test(
  "SOCKS: slow quota timeout leaves the neighboring SSE readable",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t);
    const stream = await f.stream("/stream");
    const quota = f.quota("/slow-quota", AbortSignal.timeout(1000));
    const slow = await f.wait("/slow-quota");
    assert.equal(await bounded(quota), null, "the real quota request times out without a response");
    await bounded(slow.closed);
    await finishStream(stream, await f.wait("/stream"));
    assert.notEqual(slow.socket, (await f.wait("/stream")).socket);
  }
);

test(
  "SOCKS: cancelling SSE preserves a sibling pending quota GET",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t);
    const stream = await f.stream("/stream");
    const quota = f.quota("/held-quota");
    const held = await f.wait("/held-quota");
    await stream.cancel();
    await bounded((await f.wait("/stream")).closed);
    held.response.end('{"quota":42}');
    const response = await bounded(quota);
    assert.ok(response, "SSE cancellation must not abort the pending quota reading");
    assert.deepEqual(await response.json(), { quota: 42 });
    assert.notEqual(held.socket, (await f.wait("/stream")).socket);
  }
);

test(
  "SOCKS: cancelling one parallel POST SSE preserves the other",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t);
    const first = await f.stream("/stream/first");
    const second = await f.stream("/stream/second");
    assert.notEqual(
      (await f.wait("/stream/first")).socket,
      (await f.wait("/stream/second")).socket
    );
    await first.cancel();
    await bounded((await f.wait("/stream/first")).closed);
    await finishStream(second, await f.wait("/stream/second"));
  }
);

for (const limit of [2, 32]) {
  test(
    `SOCKS: ${limit === 32 ? "default" : "configured"} pool caps concurrent sockets at ${limit}`,
    { timeout: 15000 },
    async (t) => {
      const f = await fixture(t, limit === 32 ? undefined : limit);
      const calls = Array.from({ length: limit }, (_, i) =>
        f.fetch(`/held/${i}`).then((r) => r.text())
      );
      const active = await Promise.all(calls.map((_, i) => f.wait(`/held/${i}`)));
      assert.equal(new Set(active.map((request) => request.socket)).size, limit);
      const overflow = f.fetch("/held/overflow").then((r) => r.text());
      active[0].response.end("released");
      assert.equal(await bounded(calls[0]), "released");
      const extra = await f.wait("/held/overflow");
      assert.ok(
        active.some((request) => request.socket === extra.socket),
        "queue reuses a freed socket"
      );
      for (const request of active.slice(1)) request.response.end("ok");
      extra.response.end("overflow");
      await bounded(Promise.all([...calls, overflow]));
      assert.equal(new Set([...f.requests.values()].map((request) => request.socket)).size, limit);
    }
  );
}

test(
  "SOCKS: sequential requests keep alive; retry pipelining zero forces fresh sockets",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t, 1);
    for (const path of ["/immediate/first", "/immediate/second"]) {
      const response = await bounded(f.fetch(path));
      assert.equal(response.headers.get("connection"), "keep-alive");
      await response.text();
    }
    const first = await f.wait("/immediate/first");
    assert.equal(first.socket, (await f.wait("/immediate/second")).socket);
    for (const path of ["/immediate/retry1", "/immediate/retry2"]) {
      const response = await bounded(f.fetch(path, true));
      assert.equal(
        response.headers.get("connection"),
        "close",
        "pipelining zero disables keep-alive"
      );
      await response.text();
    }
    const retry1 = await f.wait("/immediate/retry1");
    const retry2 = await f.wait("/immediate/retry2");
    assert.notEqual(first.socket, retry1.socket);
    assert.notEqual(retry1.socket, retry2.socket);
  }
);

test(
  "SOCKS: single-connection pool removes timed-out queued quota without cancelling SSE",
  { timeout: 15000 },
  async (t) => {
    const f = await fixture(t, 1);
    const stream = await f.stream("/stream");
    const quota = f.quota("/queued-quota", AbortSignal.timeout(1000));
    assert.equal(await bounded(quota), null);
    assert.equal(
      f.requests.has("/queued-quota"),
      false,
      "quota stays queued behind the sole active socket"
    );
    await finishStream(stream, await f.wait("/stream"));
    const response = await bounded(f.fetch("/immediate/after-timeout"));
    await response.text();
    assert.equal(
      f.requests.has("/queued-quota"),
      false,
      "cancelled queued quota is never sent later"
    );
    assert.equal(
      f.maxConcurrentOriginSockets(),
      1,
      "the pool never exceeds its sole concurrent socket"
    );
  }
);
