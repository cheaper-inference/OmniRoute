import test, { mock } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";

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

type MetricsBody = {
  host: { cpuPercent: number; cpuCount: number };
  process: { cpuPercent: number };
};

function fakeCpus(busyPerCore: number, idlePerCore: number, cores = 2): os.CpuInfo[] {
  return Array.from({ length: cores }, () => ({
    model: "fake",
    speed: 1000,
    times: { user: busyPerCore, nice: 0, sys: 0, idle: idlePerCore, irq: 0 },
  }));
}

test("GET /api/system/metrics derives host and process CPU from the delta between two samples", async (t) => {
  // A fresh module instance: the route keeps its previous sample in module state, and the smoke
  // test above already advanced it with the real clock.
  const { GET } = await import("../../src/app/api/system/metrics/route.ts?cpu-delta");

  let clock = 1_000_000;
  let busy = 100;
  let idle = 900;
  let processMicros = 1_000;
  t.mock.method(Date, "now", () => clock);
  t.mock.method(os, "cpus", () => fakeCpus(busy, idle));
  t.mock.method(process, "cpuUsage", (previous?: NodeJS.CpuUsage) => {
    const total = processMicros;
    if (!previous) return { user: total, system: 0 };
    return { user: total - (previous.user + previous.system), system: 0 };
  });

  const read = async () => (await (await GET()).json()) as MetricsBody;

  // First sample only records the baseline.
  const first = await read();
  assert.equal(first.host.cpuPercent, 0);
  assert.equal(first.process.cpuPercent, 0);
  assert.equal(first.host.cpuCount, 2);

  // 1000 ms later: each core did +300 busy and +100 idle ticks, so 75% busy overall.
  // The process burned 500 ms of CPU out of 2 cores x 1000 ms = 25%.
  clock += 1_000;
  busy += 300;
  idle += 100;
  processMicros += 500_000;
  const second = await read();
  assert.equal(second.host.cpuPercent, 75);
  assert.equal(second.process.cpuPercent, 25);

  // Inside the 400 ms window the cached values are returned, not a recomputation.
  clock += 100;
  busy += 200;
  processMicros += 100_000;
  const cached = await read();
  assert.equal(cached.host.cpuPercent, 75);
  assert.equal(cached.process.cpuPercent, 25);

  // The next sample spans the whole 1100 ms since the last recorded one: per core +200 busy and
  // +1000 idle ticks (1 - 1000/1200 = 16.7%), and 100 ms of process CPU over 2 x 1100 ms (4.5%).
  clock += 1_000;
  idle += 1_000;
  const third = await read();
  assert.equal(third.host.cpuPercent, 16.7);
  assert.equal(third.process.cpuPercent, 4.5);

  mock.restoreAll();
});
