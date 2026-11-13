/**
 * When the dashboard resets its connection after it sent the response headers, the API
 * bridge must close the client response. A bare pipe() never ends the client, so the
 * client waited for its own timeout. Before headers, the bridge still answers 502.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const bridge = await import("../../src/lib/apiBridgeServer.ts");

async function withBridge(
  dashboardHandler: http.RequestListener,
  fn: (apiPort: number) => Promise<void>
) {
  const dashboard = http.createServer(dashboardHandler);
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;
  const apiServer = bridge.createApiBridgeServer(dashboardPort);
  await new Promise<void>((resolve) => apiServer.listen(0, "127.0.0.1", resolve));
  const apiPort = (apiServer.address() as net.AddressInfo).port;
  try {
    await fn(apiPort);
  } finally {
    apiServer.close();
    apiServer.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
}

test("bridge closes the client response when the dashboard stream dies after headers", async () => {
  await withBridge(
    (_req, res) => {
      res.writeHead(200, { "content-type": "text/event-stream" });
      res.write("data: partial\n\n");
      setTimeout(() => res.socket?.destroy(), 50);
    },
    async (apiPort) => {
      const outcome = await new Promise<string>((resolve) => {
        const timer = setTimeout(() => resolve("hung"), 1500);
        const done = (value: string) => {
          clearTimeout(timer);
          resolve(value);
        };
        const req = http.request(
          { host: "127.0.0.1", port: apiPort, path: "/v1/chat/completions" },
          (res) => {
            res.on("data", () => {});
            res.on("end", () => done("end"));
            res.on("close", () => done("close"));
            res.on("error", () => done("error"));
          }
        );
        req.on("error", () => done("error"));
        req.end();
      });
      assert.notEqual(outcome, "hung", "client response must close, not hang");
    }
  );
});

test("bridge still answers 502 when the dashboard resets before headers", async () => {
  await withBridge(
    (req) => req.socket.destroy(),
    async (apiPort) => {
      const status = await new Promise<number>((resolve, reject) => {
        const req = http.request(
          { host: "127.0.0.1", port: apiPort, path: "/v1/models" },
          (res) => {
            res.resume();
            res.on("end", () => resolve(res.statusCode || 0));
          }
        );
        req.on("error", reject);
        req.end();
      });
      assert.equal(status, 502);
    }
  );
});
