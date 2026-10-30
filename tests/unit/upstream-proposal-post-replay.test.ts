import assert from "node:assert/strict";
import http from "node:http";
import type { Socket } from "node:net";
import test from "node:test";
import proxyFetch, { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

type ObservedRequest = { method: string; body: string };
async function withProxy<T>(
  inspect: (proxyUrl: string, seen: ObservedRequest[], errors: string[]) => Promise<T>
): Promise<T> {
  const sockets = new Set<Socket>();
  const errors: string[] = [];
  const seen: ObservedRequest[] = [];
  const previousTls = process.env.ENABLE_TLS_FINGERPRINT;
  process.env.ENABLE_TLS_FINGERPRINT = "false";
  let reads = 0;
  const origin = http.createServer(async (request, response) => {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of request) chunks.push(Buffer.from(chunk));
      seen.push({
        method: request.method ?? "",
        body: Buffer.concat(chunks).toString("utf8"),
      });
      if (request.method === "GET" && ++reads === 2) {
        response.writeHead(200, { "content-type": "application/json" }).end('{"ok":true}');
      } else {
        // The whole request body is accepted before an ambiguous response-start EOF.
        response.destroy();
      }
    } catch (error) {
      errors.push(String(error));
      response.destroy();
    }
  });
  const proxy = http.createServer((_request, response) => {
    errors.push("unexpected forward-proxy egress");
    response.writeHead(502).end();
  });
  proxy.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("error", () => {});
    socket.on("close", () => sockets.delete(socket));
  });
  proxy.on("connect", (request, socket, head) => {
    if (request.url !== "accepted-generation.invalid:80") {
      errors.push("unexpected CONNECT destination");
      socket.destroy();
      return;
    }
    socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    if (head.length) socket.unshift(head);
    origin.emit("connection", socket);
  });
  try {
    await new Promise<void>((resolve) => proxy.listen(0, "127.0.0.1", resolve));
    const address = proxy.address();
    assert.ok(address && typeof address !== "string");
    return await inspect(`http://127.0.0.1:${address.port}`, seen, errors);
  } finally {
    clearDispatcherCache();
    for (const socket of sockets) socket.destroy();
    await new Promise<void>((resolve) => proxy.close(() => resolve()));
    if (previousTls === undefined) delete process.env.ENABLE_TLS_FINGERPRINT;
    else process.env.ENABLE_TLS_FINGERPRINT = previousTls;
  }
}

test(
  "real CONNECT proxy: accepted generation POST is not replayed after response-start socket EOF",
  { timeout: 15000 },
  async () => {
    await withProxy(async (proxyUrl, seen, errors) => {
      const payload = JSON.stringify({ input: "accepted generation must not be replayed" });
      await assert.rejects(
        runWithProxyContext(proxyUrl, () =>
          proxyFetch("http://accepted-generation.invalid/responses", {
            method: "POST",
            body: payload,
            signal: AbortSignal.timeout(5000),
          })
        ),
        (error: Error & { causeCode?: string }) => {
          assert.equal(error.causeCode, "UND_ERR_SOCKET", "preserve the actual transport code");
          return true;
        }
      );
      assert.deepEqual(
        seen,
        [{ method: "POST", body: payload }],
        "the origin must observe one generation, not two"
      );
      assert.deepEqual(errors, []);
    });
  }
);

test(
  "real CONNECT proxy: safe GET independently retains fresh-socket recovery",
  { timeout: 15000 },
  async () => {
    await withProxy(async (proxyUrl, seen, errors) => {
      const recovery = await runWithProxyContext(proxyUrl, () =>
        proxyFetch("http://accepted-generation.invalid/usage", {
          signal: AbortSignal.timeout(5000),
        })
      );
      assert.deepEqual(await recovery.json(), { ok: true });
      assert.deepEqual(seen, [
        { method: "GET", body: "" },
        { method: "GET", body: "" },
      ]);
      assert.deepEqual(errors, []);
    });
  }
);
