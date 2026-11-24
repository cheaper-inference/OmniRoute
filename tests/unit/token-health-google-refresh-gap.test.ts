import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

// Opt-in spacing (BG_REFRESH_GOOGLE_DELAY_MS) between background refreshes of
// Google OAuth accounts. The sweep checks connections in concurrent batches, so
// without it every expiring Google account hits the token endpoint at once.

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-google-gap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");
const { waitForGoogleRefreshSlot, __resetGoogleRefreshSlotsForTests } =
  await import("../../src/lib/tokenHealthGoogleGap.ts");

const GAP_MS = 300;
const COUNT = 3;

test.after(() => {
  tokenHealthCheck.stopTokenHealthCheck();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/** Start COUNT expired antigravity refreshes at once; return when the token endpoint saw each one. */
async function refreshStartTimes(): Promise<number[]> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  const starts: number[] = [];
  const server = http.createServer((_req, res) => {
    starts.push(Date.now());
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ access_token: "new-access", expires_in: 3600 }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  const originalUrl = OAUTH_ENDPOINTS.google.token;
  OAUTH_ENDPOINTS.google.token = `http://127.0.0.1:${port}/token`;
  try {
    const connections = [];
    for (let i = 0; i < COUNT; i++) {
      connections.push(
        await providersDb.createProviderConnection({
          provider: "antigravity",
          authType: "oauth",
          name: `Gap ${i}`,
          email: `gap${i}@example.com`,
          accessToken: "old-access",
          refreshToken: `rt-${i}`,
          expiresAt: new Date(Date.now() - 60_000).toISOString(),
          isActive: true,
        })
      );
    }
    await Promise.all(connections.map((c) => tokenHealthCheck.checkConnection(c)));
  } finally {
    OAUTH_ENDPOINTS.google.token = originalUrl;
    await new Promise((resolve) => server.close(resolve));
  }
  return starts.sort((a, b) => a - b);
}

test("flag unset: expiring Google accounts refresh back to back (no spacing)", async () => {
  delete process.env.BG_REFRESH_GOOGLE_DELAY_MS;
  const starts = await refreshStartTimes();
  assert.equal(starts.length, COUNT);
  assert.ok(starts[COUNT - 1] - starts[0] < GAP_MS, `unexpected spacing: ${starts}`);
});

test("flag on: Google refreshes start at least BG_REFRESH_GOOGLE_DELAY_MS apart", async () => {
  process.env.BG_REFRESH_GOOGLE_DELAY_MS = String(GAP_MS);
  try {
    const starts = await refreshStartTimes();
    assert.equal(starts.length, COUNT);
    for (let i = 1; i < COUNT; i++) {
      const gap = starts[i] - starts[i - 1];
      assert.ok(gap >= GAP_MS - 20, `gap ${i} was ${gap} ms, wanted >= ${GAP_MS - 20}: ${starts}`);
    }
  } finally {
    delete process.env.BG_REFRESH_GOOGLE_DELAY_MS;
  }
});

test("flag on: a host sleep past several pending slots still starts them a gap apart", async (t) => {
  const BASE = 12_000;
  process.env.BG_REFRESH_GOOGLE_DELAY_MS = String(BASE);
  t.mock.method(Math, "random", () => 0); // no jitter: the gap is exactly the base
  t.mock.timers.enable({ apis: ["setTimeout", "Date"], now: 1_000_000 });
  __resetGoogleRefreshSlotsForTests();
  const flush = async () => {
    for (let i = 0; i < 10; i++) await Promise.resolve();
  };
  try {
    const starts: number[] = [];
    // agy and gemini are Google OAuth accounts too, so they share the spacing.
    const pending = ["antigravity", "agy", "gemini"].map((provider) =>
      waitForGoogleRefreshSlot(provider).then(() => starts.push(Date.now()))
    );
    await flush();
    assert.deepEqual(starts, [1_000_000], "the first refresh starts at once");

    // The host sleeps 30 s: the clock jumps, and every pending wait is overdue on resume.
    t.mock.timers.setTime(1_030_000);
    t.mock.timers.tick(0);
    await flush();
    assert.deepEqual(starts, [1_000_000, 1_030_000], "only one overdue refresh starts on resume");

    t.mock.timers.tick(BASE);
    await Promise.all(pending);
    assert.deepEqual(starts, [1_000_000, 1_030_000, 1_042_000]);
  } finally {
    delete process.env.BG_REFRESH_GOOGLE_DELAY_MS;
    __resetGoogleRefreshSlotsForTests();
  }
});
