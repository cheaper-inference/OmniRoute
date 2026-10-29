import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gam-json-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "gam-test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../../src/lib/db/core.ts");
const rotateRoute = await import("../../../src/app/api/gamification/rotate/route.ts");
const serversRoute = await import("../../../src/app/api/gamification/servers/route.ts");
const scoreRoute = await import("../../../src/app/api/gamification/federation/score/route.ts");
const servers = await import("../../../src/lib/gamification/servers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const malformed = (url: string, headers: Record<string, string> = {}) =>
  new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: "not-json",
  });

test("rotate: malformed JSON answers 400", async () => {
  const res = await rotateRoute.POST(
    malformed("http://localhost/api/gamification/rotate") as never
  );
  assert.equal(res.status, 400);
});

test("servers POST: malformed JSON answers 400", async () => {
  const res = await serversRoute.POST(
    malformed("http://localhost/api/gamification/servers") as never
  );
  assert.equal(res.status, 400);
});

test("federation score: malformed JSON answers 400", async () => {
  await servers.connectServer("peer", "https://peer.example", "peer-secret");
  const res = await scoreRoute.POST(
    malformed("http://localhost/api/gamification/federation/score", {
      authorization: "Bearer peer-secret",
    }) as never
  );
  assert.equal(res.status, 400);
});
