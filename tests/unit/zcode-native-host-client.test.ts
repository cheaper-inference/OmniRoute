import test from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { WebSocketServer, type WebSocket } from "ws";
import { encodeZcodeValue, decodeZcodeValue } from "../../open-sse/executors/zcodeProtocol.ts";
import { NativeZcodeHostClient } from "../../open-sse/executors/zcode/nativeHostClient.ts";

const frame = (header: unknown, payload: unknown = undefined) => {
  const body = Buffer.concat([encodeZcodeValue(header), encodeZcodeValue(payload)]);
  const out = Buffer.alloc(13 + body.length);
  out[0] = 1;
  out.writeUInt32BE(body.length, 9);
  body.copy(out, 13);
  return out;
};

async function fixture(onSocket: (socket: WebSocket) => void, capabilityStatus = 200) {
  const root = await mkdtemp(join(tmpdir(), "zcode-host-client-"));
  await mkdir(join(root, "run"));
  const wss = new WebSocketServer({ noServer: true });
  const server: Server = createServer((req, res) => {
    assert.equal(req.url, "/api/rpc-host-capability");
    assert.equal(req.method, "POST");
    assert.equal(req.headers.authorization, "Bearer FIXTURE_TOKEN");
    res.writeHead(capabilityStatus, { "content-type": "application/json" });
    res.end(JSON.stringify({ capability: "fixture-capability" }));
  });
  server.on("upgrade", (req, socket, head) => {
    assert.equal(req.url, "/ws/host");
    assert.equal(req.headers.authorization, "Bearer FIXTURE_TOKEN");
    assert.equal(req.headers["x-zcode-rpc-host-capability"], "fixture-capability");
    wss.handleUpgrade(req, socket, head, onSocket);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  await writeFile(join(root, "run/status.json"), JSON.stringify({ port: address.port }));
  await writeFile(join(root, "run/ingress-token"), "FIXTURE_TOKEN\n");
  return {
    root,
    async cleanup() {
      for (const peer of wss.clients) peer.terminate();
      await new Promise<void>((resolve) => wss.close(() => resolve()));
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await rm(root, { recursive: true, force: true });
    },
  };
}

test("binary handshake, split and coalesced replies, concurrent calls", async () => {
  const f = await fixture((socket) => {
    const init = frame([200]);
    socket.send(init.subarray(0, 5));
    socket.send(init.subarray(5));
    const ids: number[] = [];
    socket.on("message", (data) => {
      const raw = Buffer.from(data as Buffer);
      const h = decodeZcodeValue(raw.subarray(13));
      const header = h.value as [number, number, string, string];
      assert.equal(header[0], 100);
      ids.push(header[1]);
      if (ids.length === 2)
        socket.send(Buffer.concat([frame([201, ids[1]], "second"), frame([201, ids[0]], "first")]));
    });
  });
  const client = new NativeZcodeHostClient({
    serverRoot: f.root,
    startupTimeoutMs: 1000,
    requestTimeoutMs: 1000,
  });
  try {
    await Promise.all([client.start(), client.start()]);
    assert.deepEqual(
      await Promise.all([client.call("host", "one", []), client.call("host", "two", [])]),
      ["first", "second"]
    );
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("timeout, disconnect and close reject pending requests", async () => {
  const f = await fixture((socket) => {
    socket.send(frame([200]));
  });
  const client = new NativeZcodeHostClient({
    serverRoot: f.root,
    requestTimeoutMs: 40,
    startupTimeoutMs: 1000,
  });
  try {
    await client.start();
    await assert.rejects(client.call("host", "timeout", []), /timed out/i);
    const p1 = client.call("host", "one", []);
    const p2 = client.call("host", "two", []);
    const results = Promise.allSettled([p1, p2]);
    await client.close();
    assert.deepEqual(
      (await results).map((v) => v.status),
      ["rejected", "rejected"]
    );
    await client.close();
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("startup rejects promptly for denied capability and early socket close", async () => {
  const denied = await fixture(() => {}, 403);
  const c1 = new NativeZcodeHostClient({ serverRoot: denied.root, startupTimeoutMs: 500 });
  try {
    await assert.rejects(c1.start());
  } finally {
    await c1.close();
    await denied.cleanup();
  }
  const closed = await fixture((s) => s.close());
  const c2 = new NativeZcodeHostClient({ serverRoot: closed.root, startupTimeoutMs: 1000 });
  const then = Date.now();
  try {
    await assert.rejects(c2.start());
    assert.ok(Date.now() - then < 800);
  } finally {
    await c2.close();
    await closed.cleanup();
  }
});

test("structured RPC errors never expose server message or credentials", async () => {
  const f = await fixture((socket) => {
    socket.send(frame([200]));
    socket.on("message", (raw) => {
      const h = decodeZcodeValue(Buffer.from(raw as Buffer).subarray(13)).value as number[];
      socket.send(
        frame([202, h[1]], {
          message: "FIXTURE_TOKEN secret",
          code: "ERR_QUOTA",
          data: { code: 1310 },
        })
      );
    });
  });
  const client = new NativeZcodeHostClient({ serverRoot: f.root, startupTimeoutMs: 1000 });
  try {
    await client.start();
    await assert.rejects(
      client.call("host", "fail", []),
      (error: Error & { code?: unknown; providerCode?: unknown }) => {
        assert.equal(error.code, "ERR_QUOTA");
        assert.equal(error.providerCode, 1310);
        assert.doesNotMatch(JSON.stringify(error) + error.message, /FIXTURE_TOKEN|secret/);
        return true;
      }
    );
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("disconnect rejects every in-flight call and cannot restart a closed client", async () => {
  let peer: WebSocket | undefined;
  const f = await fixture((socket) => {
    peer = socket;
    socket.send(frame([200]));
  });
  const client = new NativeZcodeHostClient({
    serverRoot: f.root,
    startupTimeoutMs: 1000,
    requestTimeoutMs: 5000,
  });
  try {
    await client.start();
    const outcomes = Promise.allSettled([client.call("a", "one", []), client.call("a", "two", [])]);
    peer!.terminate();
    const results = await outcomes;
    assert.deepEqual(
      results.map((r) => r.status),
      ["rejected", "rejected"]
    );
    await assert.rejects(client.start(), /closed/i);
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("oversized declared frame and malformed frame fail without hanging", async () => {
  for (const invalid of [
    Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1]),
    frame([201, 1], undefined).subarray(0, 14),
  ]) {
    const f = await fixture((socket) => {
      socket.send(invalid);
    });
    const client = new NativeZcodeHostClient({ serverRoot: f.root, startupTimeoutMs: 80 });
    try {
      await assert.rejects(client.start());
    } finally {
      await client.close();
      await f.cleanup();
    }
  }
});

test("a stalled handshake times out and close interrupts startup", async () => {
  const f = await fixture(() => {});
  const c1 = new NativeZcodeHostClient({ serverRoot: f.root, startupTimeoutMs: 50 });
  try {
    await assert.rejects(c1.start(), /timed out/i);
  } finally {
    await c1.close();
  }
  const c2 = new NativeZcodeHostClient({ serverRoot: f.root, startupTimeoutMs: 2000 });
  try {
    const startup = c2.start();
    const rejected = assert.rejects(startup, /closed/i);
    await c2.close();
    await rejected;
  } finally {
    await c2.close();
    await f.cleanup();
  }
});

test("credentials echoed in error codes are removed", async () => {
  const f = await fixture((socket) => {
    socket.send(frame([200]));
    socket.on("message", (raw) => {
      const h = decodeZcodeValue(Buffer.from(raw as Buffer).subarray(13)).value as number[];
      socket.send(frame([202, h[1]], { code: "FIXTURE_TOKEN", data: { code: "FIXTURE_TOKEN" } }));
    });
  });
  const client = new NativeZcodeHostClient({ serverRoot: f.root, startupTimeoutMs: 1000 });
  try {
    await client.start();
    await assert.rejects(
      client.call("host", "fail", []),
      (error: Error & { code?: unknown; providerCode?: unknown }) => {
        assert.equal(error.code, undefined);
        assert.equal(error.providerCode, undefined);
        assert.doesNotMatch(JSON.stringify(error) + error.message, /FIXTURE_TOKEN/);
        return true;
      }
    );
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("concurrent native ERROR202 keeps safe method and codes without payload or arguments", async () => {
  const f = await fixture((socket) => {
    socket.send(frame([200]));
    socket.on("message", (raw) => {
      const h = decodeZcodeValue(Buffer.from(raw as Buffer).subarray(13)).value as [
        number,
        number,
        string,
        string,
      ];
      socket.send(
        h[3] === "getView"
          ? frame([201, h[1]], { available: true })
          : frame([202, h[1]], {
              message: "FIXTURE_TOKEN raw-payload-secret",
              code: "ERR_BUSY",
              data: { code: 1310, secret: "hidden-provider-value" },
            })
      );
    });
  });
  const client = new NativeZcodeHostClient({ serverRoot: f.root });
  try {
    const failed = assert.rejects(
      client.call("zcode-agent", "sendPrompt", [{ content: "private-prompt" }]),
      (error: Error) => {
        assert.match(error.message, /zcode-agent\.sendPrompt/);
        assert.match(error.message, /ERR_BUSY/);
        assert.match(error.message, /1310/);
        assert.doesNotMatch(
          error.message + JSON.stringify(error),
          /FIXTURE_TOKEN|raw-payload-secret|hidden-provider-value|private-prompt/
        );
        return true;
      }
    );
    const successful = client.call("model-selection", "getView", []);
    await failed;
    assert.deepEqual(await successful, { available: true });
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("ERROR202 preserves only the known lowercase model cancellation code", async () => {
  const f = await fixture((socket) => {
    socket.send(frame([200]));
    socket.on("message", (raw) => {
      const h = decodeZcodeValue(Buffer.from(raw as Buffer).subarray(13)).value as number[];
      socket.send(
        frame([202, h[1]], {
          code: "model_request_cancelled",
          message: "FIXTURE_TOKEN upstream secret",
          data: { code: "model_request_cancelled" },
        })
      );
    });
  });
  const client = new NativeZcodeHostClient({ serverRoot: f.root });
  try {
    await assert.rejects(
      client.call("zcode-agent", "sendPrompt", []),
      (error: Error & { code?: unknown; providerCode?: unknown }) => {
        assert.equal(error.code, "model_request_cancelled");
        assert.equal(error.providerCode, "model_request_cancelled");
        assert.doesNotMatch(error.message + JSON.stringify(error), /FIXTURE_TOKEN|upstream secret/);
        return true;
      }
    );
  } finally {
    await client.close();
    await f.cleanup();
  }
});

test("only the exact unusual-activity vendor refusal becomes a safe category", async () => {
  let count = 0;
  const f = await fixture((socket) => {
    socket.send(frame([200]));
    socket.on("message", (raw) => {
      const h = decodeZcodeValue(Buffer.from(raw as Buffer).subarray(13)).value as number[];
      socket.send(
        frame([202, h[1]], {
          code: -32603,
          message:
            count++ === 0
              ? "request has been blocked due to unusual activity."
              : "user quoted request has been blocked due to unusual activity.",
        })
      );
    });
  });
  const client = new NativeZcodeHostClient({ serverRoot: f.root });
  try {
    await assert.rejects(
      client.call("zcode-agent", "generateWorkspaceText", []),
      (error: Error & { providerReason?: string }) => {
        assert.equal(error.providerReason, "unusual_activity");
        assert.doesNotMatch(error.message, /request has been blocked/);
        return true;
      }
    );
    await assert.rejects(
      client.call("zcode-agent", "generateWorkspaceText", []),
      (error: Error & { providerReason?: string }) => {
        assert.equal(error.providerReason, undefined);
        return true;
      }
    );
  } finally {
    await client.close();
    await f.cleanup();
  }
});
