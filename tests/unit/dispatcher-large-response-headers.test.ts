// A signed-in gemini.google.com/app answers with ~30 KB of response headers (rotated
// Set-Cookie values). undici's default 16 KB maxHeaderSize turned that into
// UND_ERR_HEADERS_OVERFLOW ("fetch failed"), so the dashboard rejected every valid
// Gemini Web cookie. The shared dispatcher options must accept browser-sized headers.

import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { Agent, fetch } from "undici";

const { getDispatcherOptions } = await import("../../open-sse/utils/proxyDispatcher.ts");

test("dispatcher options accept ~30 KB of response headers (signed-in Google pages)", async () => {
  const cookies = Array.from({ length: 20 }, (_, i) => `c${i}=${"x".repeat(1500)}; Path=/`);
  const server = createServer((_req, res) => {
    res.setHeader("Set-Cookie", cookies);
    res.end("ok");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  const agent = new Agent(getDispatcherOptions());
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`, { dispatcher: agent });
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "ok");
  } finally {
    await agent.close();
    server.close();
  }
});
