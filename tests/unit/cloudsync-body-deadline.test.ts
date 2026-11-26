import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { setImmediate } from "node:timers/promises";

test("cloud sync times out while reading a response body sent after the deadline", async (t) => {
  const timeoutMs = 1_000;
  const limitMs = timeoutMs + 100;
  const bodyDelayMs = 2_500;
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cloudsync-body-deadline-"));
  const env = {
    DATA_DIR: dataDir,
    CLOUD_URL: "https://cloud.example",
    CLOUD_SYNC_TIMEOUT_MS: String(timeoutMs),
  };
  for (const [name, value] of Object.entries(env)) {
    const previous = process.env[name];
    process.env[name] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[name];
      else process.env[name] = previous;
    });
  }
  const cloudSyncUrl = new URL("../../src/lib/cloudSync.ts?case=body-deadline", import.meta.url);
  const { syncToCloud } = await import(cloudSyncUrl.href);
  const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
  getDbInstance();
  t.after(() => {
    resetDbInstance();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  for (const status of [200, 503]) {
    await t.test(`HTTP ${status}`, async (t) => {
      const bodyReading = Promise.withResolvers<void>();
      t.mock.timers.enable({ apis: ["setTimeout"] });
      t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
        const body = new ReadableStream<Uint8Array>(
          {
            start(controller) {
              const bodyTimer = setTimeout(() => {
                controller.enqueue(new TextEncoder().encode('{"changes":{}}'));
                controller.close();
              }, bodyDelayMs);
              init.signal?.addEventListener(
                "abort",
                () => {
                  clearTimeout(bodyTimer);
                  controller.error(init.signal?.reason);
                },
                { once: true }
              );
            },
            pull() {
              bodyReading.resolve();
            },
          },
          { highWaterMark: 0 }
        );
        return new Response(body, { status });
      });

      const sync = syncToCloud("machine-1", null, { explicitEnable: true });
      await Promise.race([bodyReading.promise, sync]);
      t.mock.timers.tick(limitMs);
      const pending = Symbol("pending");
      const result = await Promise.race([sync, setImmediate(pending)]);

      // Finish the simulated response if the sync is still reading it.
      t.mock.timers.tick(bodyDelayMs - limitMs);
      await sync;

      assert.notEqual(result, pending, `Cloud sync still pending after ${limitMs} ms`);
      assert.deepEqual(result, { error: "Cloud sync timeout" });
    });
  }
});
