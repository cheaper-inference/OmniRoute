import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "pending-provider-url-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const usage = await import("../../src/lib/usage/usageHistory.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

function start(metadata: Parameters<typeof usage.trackPendingRequest>[4] = {}) {
  const id = usage.trackPendingRequest("model", "provider", "connection", true, metadata);
  assert.ok(id);
  return id;
}

const url = `https://example.test/${"é".repeat(400)}?api_key=retained-url-test-placeholder&keep=public`;
const responses = { providerResponse: "provider result", clientResponse: "client result" };

test.beforeEach(() => usage.clearPendingRequests());
test.afterEach(() => usage.clearPendingRequests());
test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("insertion charges the retained redacted URL in UTF-8 bytes", () => {
  const emptyCharge = usage.getPendingRetainedBytes();
  const blank = start();
  const baseCharge = usage.getPendingRetainedBytes() - emptyCharge;
  const id = start({ providerUrl: url });
  const stored = usage.getPendingById().get(id)?.providerUrl;
  assert.ok(stored);
  assert.ok(!stored.includes("placeholder"));
  assert.ok(stored.includes("[REDACTED]"));
  assert.notEqual(Buffer.byteLength(stored), Buffer.byteLength(url));
  assert.ok(Buffer.byteLength(stored, "utf8") > stored.length);
  assert.equal(usage.getPendingRetainedBytes(), baseCharge * 2 + Buffer.byteLength(stored));
  assert.ok(usage.getPendingById().has(blank));
});

test("both metadata update APIs charge URL replacements and clears", () => {
  for (const byId of [false, true]) {
    usage.clearPendingRequests();
    const id = start();
    const baseCharge = usage.getPendingRetainedBytes();
    const update = (providerUrl: string | null) => {
      if (byId) usage.updatePendingRequestById(id, { providerUrl });
      else usage.updatePendingRequest("model", "provider", "connection", { providerUrl });
    };
    for (const next of [url, url, "https://example.test/short", null]) {
      update(next);
      const stored = usage.getPendingById().get(id)?.providerUrl;
      const expected =
        next === url
          ? url.replace("api_key=retained-url-test-placeholder", "redacted=[REDACTED]")
          : next;
      assert.equal(stored, expected);
      assert.equal(usage.getPendingRetainedBytes(), baseCharge + Buffer.byteLength(expected ?? ""));
    }
    usage.updatePendingRequestById(id, { stage: "dispatch", status: 200 });
    assert.equal(usage.getPendingRetainedBytes(), baseCharge);
  }
});

test("finalization debits the original URL, not terminal-only metadata", () => {
  const survivor = start({ providerUrl: url });
  const survivorCharge = usage.getPendingRetainedBytes();
  for (const original of [undefined, "https://example.test/original"]) {
    const id = start({ providerUrl: original });
    assert.equal(usage.finalizePendingRequestById(id, { ...responses, providerUrl: url }), true);
    assert.equal(usage.getPendingRetainedBytes(), survivorCharge);
    assert.ok(usage.getPendingById().has(survivor));
  }
  usage.trackPendingRequest("model", "provider", "connection", false, undefined, survivor);
  assert.equal(usage.getPendingRetainedBytes(), 0);
  start({ providerUrl: url });
  usage.clearPendingRequests();
  assert.equal(usage.getPendingRetainedBytes(), 0);
});

test("stale sweeping keeps the URL charged until the detail is removed", () => {
  const id = start({ providerUrl: url, clientRequest: "payload" });
  const detail = usage.getPendingById().get(id);
  assert.ok(detail?.providerUrl);
  const storedUrl = detail.providerUrl;
  const now = detail.startedAt + 1001;
  assert.equal(usage.sweepStalePendingRequests(now, 1000), 0);
  assert.equal(detail.clientRequest, undefined);
  assert.equal(detail.providerUrl, storedUrl);
  assert.equal(usage.getPendingRetainedBytes(), 256 + Buffer.byteLength(storedUrl));
  assert.equal(usage.sweepStalePendingRequests(now + 5 * 60 * 1000, 1000), 1);
  assert.equal(usage.getPendingById().size, 0);
  assert.equal(usage.getPendingRetainedBytes(), 0);
});

test("same-estimator module reload preserves the URL charge", async () => {
  const id = start({ providerUrl: url });
  const charge = usage.getPendingRetainedBytes();
  const moduleUrl = new URL("../../src/lib/usage/usageHistory.ts", import.meta.url);
  moduleUrl.searchParams.set("provider-url-test", "reload");
  const reloaded: typeof usage = await import(moduleUrl.href);
  assert.notEqual(reloaded.trackPendingRequest, usage.trackPendingRequest);
  assert.equal(reloaded.getPendingById(), usage.getPendingById());
  assert.equal(reloaded.getPendingRetainedBytes(), charge);
  assert.ok(reloaded.getPendingById().has(id));
  reloaded.updatePendingRequestById(id, { providerUrl: null });
  assert.equal(usage.getPendingRetainedBytes(), 256);
});

test("URL growth triggers eviction at the existing pending byte ceiling", () => {
  const ceiling = 256 * 1024 * 1024;
  const seed = start();
  // Shared bounded strings exercise the estimator without allocating a 256 MiB body.
  const block = "x".repeat(8 * 1024 * 1024);
  const chunks = [...Array<string>(31).fill(block), "y".repeat(block.length - 1024)];
  usage.updatePendingRequestStreamChunksById(seed, { provider: chunks });
  const target = start();
  const headroom = ceiling - usage.getPendingRetainedBytes();
  assert.ok(headroom > 0 && headroom < 2048);
  assert.ok(usage.getPendingById().has(seed));
  const providerUrl = `https://example.test/${"z".repeat(headroom + 256)}`;
  usage.updatePendingRequestById(target, { providerUrl });
  assert.equal(usage.getPendingById().has(seed), false);
  assert.ok(usage.getPendingById().has(target));
  assert.equal(usage.getPendingRetainedBytes(), 256 + Buffer.byteLength(providerUrl));
  assert.ok(usage.getPendingRetainedBytes() <= ceiling);
});
