import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redis-atomic-"));

const { RedisQuotaStore, resetRedisClient, getRedisClient } =
  await import("../../src/lib/quota/redisQuotaStore.ts");
const { WINDOW_MS } = await import("../../src/lib/quota/dimensions.ts");

// Loopback RESP server: records every command ioredis sends. No Lua engine, so
// EVAL returns a canned [curr, prev] reply.
function startFakeRedis() {
  const commands: string[][] = [];
  const bulk = (s: string) => `$${Buffer.byteLength(s)}\r\n${s}\r\n`;
  const sockets = new Set<net.Socket>();
  const server = net.createServer((sock) => {
    sockets.add(sock);
    let buf = "";
    sock.on("data", (chunk) => {
      buf += chunk.toString("utf8");
      for (;;) {
        const m = /^\*(\d+)\r\n/.exec(buf);
        if (!m) return;
        let pos = m[0].length;
        const args: string[] = [];
        for (let i = 0; i < Number(m[1]); i++) {
          const h = /^\$(\d+)\r\n/.exec(buf.slice(pos));
          if (!h) return;
          const start = pos + h[0].length;
          if (buf.length < start + Number(h[1]) + 2) return;
          args.push(buf.slice(start, start + Number(h[1])));
          pos = start + Number(h[1]) + 2;
        }
        buf = buf.slice(pos);
        commands.push(args);
        const cmd = args[0].toUpperCase();
        if (cmd === "INFO") sock.write(bulk("redis_version:7.0.0\r\n"));
        else if (cmd === "EVAL") sock.write(`*2\r\n${bulk("300")}${bulk("1000")}`);
        else if (cmd === "INCRBYFLOAT") sock.write(bulk(args[2]));
        else if (cmd === "EXPIRE") sock.write(":1\r\n");
        else if (cmd === "MGET")
          sock.write(`*${args.length - 1}\r\n${"$-1\r\n".repeat(args.length - 1)}`);
        else sock.write("+OK\r\n");
      }
    });
  });
  return new Promise<{ url: string; commands: string[][]; close: () => Promise<void> }>((resolve) =>
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as net.AddressInfo;
      resolve({
        url: `redis://127.0.0.1:${port}`,
        commands,
        close: () =>
          new Promise((r) => {
            for (const s of sockets) s.destroy();
            server.close(() => r());
          }),
      });
    })
  );
}

test("consume charges the counter and sets its TTL in one atomic EVAL", async () => {
  const fake = await startFakeRedis();
  resetRedisClient();
  const dim = { poolId: "p1", unit: "tokens" as const, window: "hourly" as const };
  try {
    const store = new RedisQuotaStore(fake.url);
    const windowMs = WINDOW_MS[dim.window];
    const elapsedBefore = Date.now() % windowMs;
    const effective = await store.consume("key-a", dim, 100);
    const elapsedAfter = Date.now() % windowMs;

    const mutating = fake.commands
      .map((c) => c[0].toUpperCase())
      .filter((c) => c === "EVAL" || c === "INCRBYFLOAT" || c === "EXPIRE");
    assert.deepEqual(mutating, ["EVAL"], "charge and TTL must be one EVAL, not separate commands");

    const evalCmd = fake.commands.find((c) => c[0].toUpperCase() === "EVAL")!;
    assert.match(evalCmd[1], /INCRBYFLOAT/);
    assert.match(evalCmd[1], /EXPIRE/);
    assert.equal(evalCmd[2], "2", "current and previous bucket keys are KEYS");
    assert.equal(Number(evalCmd[5]), 100, "cost");
    assert.equal(Number(evalCmd[6]), Math.ceil((2 * windowMs) / 1000), "ttl seconds");

    // Canned EVAL reply is curr=300, prev=1000: effective = prev * (1 - elapsed/window) + curr.
    const lo = 1000 * (1 - elapsedAfter / windowMs) + 300;
    const hi = 1000 * (1 - elapsedBefore / windowMs) + 300;
    assert.ok(
      effective >= lo - 1e-6 && effective <= hi + 1e-6,
      `effective ${effective} not in [${lo}, ${hi}]`
    );
  } finally {
    const client = await getRedisClient(fake.url);
    client.quit().catch(() => {});
    resetRedisClient();
    await fake.close();
  }
});
