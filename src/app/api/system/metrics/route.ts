import { NextResponse } from "next/server";
import os from "node:os";

export const dynamic = "force-dynamic";

interface CpuSnapshot {
  total: number;
  idle: number;
}

let lastSample: {
  time: number;
  processCpu: NodeJS.CpuUsage;
  hostCpu: CpuSnapshot;
} | null = null;

let cachedMetrics = {
  hostCpuPercent: 0,
  processCpuPercent: 0,
};

function getHostCpuSnapshot(): CpuSnapshot {
  let total = 0;
  let idle = 0;
  const cpus = os.cpus() || [];
  for (const cpu of cpus) {
    for (const type in cpu.times) {
      total += cpu.times[type as keyof typeof cpu.times];
    }
    idle += cpu.times.idle;
  }
  return { total, idle };
}

function updateCpuMetrics() {
  const now = Date.now();
  const currentHost = getHostCpuSnapshot();
  const currentProcess = process.cpuUsage();

  if (!lastSample) {
    lastSample = {
      time: now,
      processCpu: currentProcess,
      hostCpu: currentHost,
    };
    return cachedMetrics;
  }

  const timeDeltaMs = now - lastSample.time;

  if (timeDeltaMs >= 400) {
    const hostTotalDelta = currentHost.total - lastSample.hostCpu.total;
    const hostIdleDelta = currentHost.idle - lastSample.hostCpu.idle;
    const hostCpuPercent =
      hostTotalDelta > 0
        ? Math.max(0, Math.min(100, Math.round((1 - hostIdleDelta / hostTotalDelta) * 1000) / 10))
        : cachedMetrics.hostCpuPercent;

    const processDelta = process.cpuUsage(lastSample.processCpu);
    const cpuCount = Math.max(1, (os.cpus() || []).length);
    const totalAvailableMicros = timeDeltaMs * 1000 * cpuCount;
    const processMicros = processDelta.user + processDelta.system;
    const processCpuPercent =
      totalAvailableMicros > 0
        ? Math.max(0, Math.min(100, Math.round((processMicros / totalAvailableMicros) * 1000) / 10))
        : cachedMetrics.processCpuPercent;

    cachedMetrics = {
      hostCpuPercent,
      processCpuPercent,
    };

    lastSample = {
      time: now,
      processCpu: currentProcess,
      hostCpu: currentHost,
    };
  }

  return cachedMetrics;
}

export async function GET() {
  const { hostCpuPercent, processCpuPercent } = updateCpuMetrics();

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = Math.max(0, totalMem - freeMem);
  const hostMemPercent = totalMem > 0 ? Math.round((usedMem / totalMem) * 1000) / 10 : 0;

  const procMem = process.memoryUsage();

  return NextResponse.json(
    {
      host: {
        cpuPercent: hostCpuPercent,
        memory: {
          totalBytes: totalMem,
          usedBytes: usedMem,
          freeBytes: freeMem,
          usedPercent: hostMemPercent,
        },
        cpuCount: (os.cpus() || []).length,
        platform: process.platform,
      },
      process: {
        cpuPercent: processCpuPercent,
        memory: {
          rssBytes: procMem.rss,
          heapUsedBytes: procMem.heapUsed,
          heapTotalBytes: procMem.heapTotal,
        },
        uptimeSeconds: Math.round(process.uptime()),
        pid: process.pid,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
