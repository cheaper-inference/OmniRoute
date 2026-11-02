import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// A mirror that drops out for one sync must not lose its nodes: a partial
// fetch upserts the healthy feeds and keeps the unavailable feed's last
// rows; stale removal resumes once every feed answers. Real 127.0.0.1
// servers, through the production sync path.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mirror-partial-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const sub = await import("../../src/lib/proxySubscription/index.ts");

type FeedServer = {
  url: string;
  set: (status: number, body: string) => void;
  close: () => Promise<void>;
};

function startFeed(): Promise<FeedServer> {
  let status = 200;
  let body = "";
  return new Promise((resolve) => {
    const srv = http.createServer((_req, res) => {
      res.writeHead(status, { "Content-Type": "text/plain" });
      res.end(body);
    });
    srv.listen(0, "127.0.0.1", () => {
      const addr = srv.address() as { port: number };
      resolve({
        url: `http://127.0.0.1:${addr.port}/feed`,
        set: (nextStatus, nextBody) => {
          status = nextStatus;
          body = nextBody;
        },
        close: () => new Promise((done) => srv.close(() => done())),
      });
    });
  });
}

function poolHosts(id: string): string[] {
  const rows = core
    .getDbInstance()
    .prepare("SELECT host FROM proxy_registry WHERE subscription_id = ?")
    .all(id) as Array<{ host: string }>;
  return rows.map((r) => r.host).sort();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an unavailable mirror keeps its nodes until every feed answers again", async () => {
  const primary = await startFeed();
  const mirror = await startFeed();
  try {
    primary.set(200, "http://203.0.113.10:8080#alpha");
    mirror.set(200, "http://203.0.113.11:8080#beta");
    const created = await sub.createSubscription({
      name: "mirrored",
      url: primary.url,
      mirrorUrls: [mirror.url],
      enabled: true,
    } as never);
    const id = (created as { id: string }).id;

    await sub.syncSubscription(id);
    assert.deepEqual(poolHosts(id), ["203.0.113.10", "203.0.113.11"]);

    // 404 is a permanent error (no retry): the mirror is down for this sync.
    mirror.set(404, "gone");
    const partial = await sub.syncSubscription(id);
    assert.equal(partial.status, "ok");
    assert.deepEqual(poolHosts(id), ["203.0.113.10", "203.0.113.11"]);

    // Every feed answers again and the mirror changed its node: the stale
    // row goes now.
    mirror.set(200, "http://203.0.113.12:8080#gamma");
    await sub.syncSubscription(id);
    assert.deepEqual(poolHosts(id), ["203.0.113.10", "203.0.113.12"]);
  } finally {
    await primary.close();
    await mirror.close();
  }
});
