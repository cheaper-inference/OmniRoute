import test from "node:test";
import assert from "node:assert/strict";

test("GET /api/system/metrics returns system host and process metrics", async () => {
  const { GET } = await import("../../src/app/api/system/metrics/route.ts");
  const response = await GET();

  assert.equal(response.status, 200);

  const data = (await response.json()) as {
    host: {
      cpuPercent: number;
      memory: {
        totalBytes: number;
        usedBytes: number;
        freeBytes: number;
        usedPercent: number;
      };
      cpuCount: number;
      platform: string;
    };
    process: {
      cpuPercent: number;
      memory: {
        rssBytes: number;
        heapUsedBytes: number;
        heapTotalBytes: number;
      };
      uptimeSeconds: number;
      pid: number;
    };
  };

  // Assert host metrics
  assert.ok(data.host, "host metrics should be defined");
  assert.equal(typeof data.host.cpuPercent, "number");
  assert.ok(data.host.cpuPercent >= 0 && data.host.cpuPercent <= 100);
  assert.ok(data.host.cpuCount > 0);
  assert.equal(typeof data.host.platform, "string");

  assert.ok(data.host.memory, "host memory should be defined");
  assert.ok(data.host.memory.totalBytes > 0);
  assert.ok(data.host.memory.usedBytes >= 0);
  assert.ok(data.host.memory.freeBytes >= 0);
  assert.ok(data.host.memory.usedPercent >= 0 && data.host.memory.usedPercent <= 100);

  // Assert process metrics
  assert.ok(data.process, "process metrics should be defined");
  assert.equal(typeof data.process.cpuPercent, "number");
  assert.ok(data.process.cpuPercent >= 0);

  assert.ok(data.process.memory, "process memory should be defined");
  assert.ok(data.process.memory.rssBytes > 0);
  assert.ok(data.process.memory.heapUsedBytes > 0);
  assert.ok(data.process.memory.heapTotalBytes > 0);

  assert.ok(data.process.uptimeSeconds >= 0);
  assert.ok(data.process.pid > 0);
});
