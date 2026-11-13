// The singleton buffer reads INSPECTOR_MAX_BODY_KB once, when its module loads: set it first.
process.env.INSPECTOR_MAX_BODY_KB = "64";
const CAP = 64 * 1024;

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const { startHttpProxyServer } = await import("../../src/mitm/inspector/httpProxyServer.ts");
const { globalTrafficBuffer } = await import("../../src/mitm/inspector/buffer.ts");

async function withUpstream(handler: http.RequestListener) {
  const server = http.createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  return {
    port,
    close: () =>
      new Promise<void>((res) => {
        server.close(() => res());
        server.closeAllConnections();
      }),
  };
}

function get(
  proxyPort: number,
  upstreamPort: number,
  onResponse: (res: http.IncomingMessage) => void
) {
  return new Promise<{ status: number; bytes: number }>((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: proxyPort,
        path: `http://127.0.0.1:${upstreamPort}/stream`,
        headers: { host: `127.0.0.1:${upstreamPort}` },
      },
      (res) => {
        let bytes = 0;
        res.on("data", (c: Buffer) => (bytes += c.length));
        res.on("end", () => resolve({ status: res.statusCode ?? 0, bytes }));
        onResponse(res);
      }
    );
    req.once("error", reject);
    req.end();
  });
}

const lastEntry = async () => {
  await new Promise((r) => setTimeout(r, 50));
  return globalTrafficBuffer.list().at(-1);
};

test("the client gets the first chunk while the upstream is still open", async () => {
  let upstreamEnded = false;
  const upstream = await withUpstream((_req, res) => {
    res.writeHead(200, { "content-type": "text/event-stream" });
    res.write("data: first\n\n");
    setTimeout(() => {
      upstreamEnded = true;
      res.end("data: last\n\n");
    }, 1500);
  });
  const proxy = await startHttpProxyServer(0);
  try {
    let endedAtFirstChunk: boolean | null = null;
    const result = await get(proxy.port, upstream.port, (res) =>
      res.once("data", () => (endedAtFirstChunk ??= upstreamEnded))
    );
    assert.equal(result.status, 200);
    assert.equal(endedAtFirstChunk, false, "first chunk arrived only after the upstream ended");
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});

test("a client that stops reading stalls the upstream instead of filling proxy memory", async () => {
  globalTrafficBuffer.clear();
  const total = 96 * 1024 * 1024;
  const chunk = Buffer.from("lorem ipsum dolor sit amet ".repeat(2500)); // about 65 KB, words not one token
  let accepted = 0;
  const upstream = await withUpstream(async (_req, res) => {
    res.writeHead(200, { "content-type": "application/octet-stream" });
    while (accepted < total) {
      accepted += chunk.length;
      if (!res.write(chunk)) await new Promise((r) => res.once("drain", r));
    }
    res.end();
  });
  const proxy = await startHttpProxyServer(0);
  try {
    let paused: http.IncomingMessage | null = null;
    const done = get(proxy.port, upstream.port, (res) => {
      paused = res;
      res.pause();
    });
    await new Promise((r) => setTimeout(r, 1000));
    const acceptedWhilePaused = accepted;
    assert.ok(
      acceptedWhilePaused < total / 2,
      `upstream wrote ${acceptedWhilePaused} of ${total} bytes while the client was paused`
    );
    (paused as http.IncomingMessage | null)?.resume();
    const result = await done;
    assert.equal(result.status, 200);
    assert.ok(result.bytes >= total, "the client still receives every byte");
    const entry = await lastEntry();
    assert.equal(entry?.status, 200);
    assert.ok((entry?.responseSize ?? 0) >= total, "responseSize counts the whole body");
    assert.ok((entry?.responseBody ?? "").length <= CAP + 64, "capture stays near the cap");
    assert.match(entry?.responseBody ?? "", /truncated for performance/);
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});

test("a token cut by the capture limit leaves no raw head in the capture", async () => {
  globalTrafficBuffer.clear();
  // The masker needs 40 token characters. The token starts 38 bytes before the cap, so the cut
  // leaves a 38-character head that the masker would pass through raw.
  const token = "Ab3dE9gH".repeat(8);
  const body = "x ".repeat((CAP - 38) / 2) + token + " tail ".repeat(400);
  const upstream = await withUpstream((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(body);
  });
  const proxy = await startHttpProxyServer(0);
  try {
    const result = await get(proxy.port, upstream.port, () => {});
    assert.equal(result.bytes, body.length);
    const captured = (await lastEntry())?.responseBody ?? "";
    assert.equal(captured.includes("Ab3dE"), false, "no raw part of the token remains");
    assert.ok(captured.startsWith("x x x"), "the text before the token is kept");
    assert.match(captured, /truncated for performance/);
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});

test("a client that disconnects mid-stream makes the proxy abort the upstream read", async () => {
  let upstreamClosed = false;
  const upstream = await withUpstream((_req, res) => {
    res.writeHead(200, { "content-type": "text/event-stream" });
    const timer = setInterval(() => res.write("data: tick\n\n"), 20);
    res.on("close", () => {
      upstreamClosed = true;
      clearInterval(timer);
    });
  });
  const proxy = await startHttpProxyServer(0);
  try {
    const req = http.request({
      host: "127.0.0.1",
      port: proxy.port,
      path: `http://127.0.0.1:${upstream.port}/stream`,
      headers: { host: `127.0.0.1:${upstream.port}` },
    });
    req.once("error", () => {});
    req.end();
    await new Promise((r) => setTimeout(r, 300));
    req.destroy();
    for (let i = 0; i < 40 && !upstreamClosed; i++) await new Promise((r) => setTimeout(r, 50));
    assert.equal(upstreamClosed, true, "the upstream connection stayed open after the client left");
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});

test("an upstream body that breaks mid-stream never reaches the client as a clean end", async () => {
  const upstream = await withUpstream((_req, res) => {
    res.writeHead(200, { "content-type": "text/plain", "content-length": "1000" });
    res.write("partial");
    setTimeout(() => res.destroy(), 100);
  });
  const proxy = await startHttpProxyServer(0);
  try {
    const outcome = await new Promise<{ status: number; complete: boolean }>((resolve, reject) => {
      const req = http.request(
        {
          host: "127.0.0.1",
          port: proxy.port,
          path: `http://127.0.0.1:${upstream.port}/stream`,
          headers: { host: `127.0.0.1:${upstream.port}` },
        },
        (res) => {
          res.on("error", () => {});
          res.resume();
          res.once("close", () => resolve({ status: res.statusCode ?? 0, complete: res.complete }));
        }
      );
      req.once("error", reject);
      req.end();
    });
    // Either the proxy answered with an error status, or it cut the stream: both tell the client.
    assert.ok(
      outcome.status >= 500 || !outcome.complete,
      `got ${outcome.status}, complete=${outcome.complete}`
    );
  } finally {
    await proxy.stop();
    await upstream.close();
  }
});
