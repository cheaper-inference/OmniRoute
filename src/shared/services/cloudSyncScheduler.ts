import { getConsistentMachineId } from "@/shared/utils/machineId";
import { isCloudEnabled } from "@/lib/db/settings";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getProcessStore } from "@/shared/utils/processSingleton";

const { dashboardPort } = getRuntimePorts();

const INTERNAL_BASE_URL =
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://localhost:${dashboardPort}`;

/**
 * Cloud sync scheduler
 */
export class CloudSyncScheduler {
  machineId: string | null;
  intervalMinutes: number;
  intervalId: ReturnType<typeof setInterval> | null;
  startupTimer: ReturnType<typeof setTimeout> | null;

  constructor(machineId: string | null = null, intervalMinutes = 15) {
    this.machineId = machineId;
    this.intervalMinutes = intervalMinutes;
    this.intervalId = null;
    this.startupTimer = null;
  }

  /**
   * Initialize machine ID if not provided
   */
  async initializeMachineId() {
    if (!this.machineId) {
      this.machineId = await getConsistentMachineId();
    }
  }

  /**
   * Start periodic sync (delays first sync to allow server to be ready)
   */
  async start() {
    if (this.intervalId || this.startupTimer) {
      return;
    }

    await this.initializeMachineId();

    // The boot path and a first request can start this concurrently; the await
    // above yields, so re-check before claiming the handles. Without this the
    // second caller overwrites the first pair and stop() cannot reach it.
    if (this.intervalId || this.startupTimer) {
      return;
    }

    // Delay first sync by 30 seconds to ensure server is ready
    this.startupTimer = setTimeout(() => {
      this.startupTimer = null;
      this.syncWithRetry().catch(() => {});
    }, 30000);
    this.startupTimer.unref?.();

    // Then sync periodically
    this.intervalId = setInterval(
      () => {
        this.syncWithRetry().catch(() => {});
      },
      this.intervalMinutes * 60 * 1000
    );
    this.intervalId.unref?.();
  }

  /**
   * Stop periodic sync
   */
  stop() {
    if (this.startupTimer) {
      clearTimeout(this.startupTimer);
      this.startupTimer = null;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Sync with retry logic (exponential backoff)
   */
  async syncWithRetry(maxRetries = 1) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.sync();
        return result;
      } catch (error) {
        if (attempt === maxRetries) {
          return null;
        }

        const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Max 10s
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Perform sync via internal API route (handles token update to db.json)
   */
  async sync() {
    // Check if cloud is enabled
    const enabled = await isCloudEnabled();
    if (!enabled) {
      return null;
    }

    await this.initializeMachineId();

    // Call internal API route which handles both sync and token update
    const response = await fetch(`${INTERNAL_BASE_URL}/api/sync/cloud`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ machineId: this.machineId, action: "sync" }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Sync failed");
    }

    const result = await response.json();
    return result;
  }

  /**
   * Check if scheduler is running
   */
  isRunning() {
    return this.intervalId !== null || this.startupTimer !== null;
  }
}

/**
 * One scheduler per process, kept outside module scope: a bundled server chunk can
 * load a second copy of this module, and a module-scope instance would be a second
 * scheduler with its own interval, while a status read through the other copy
 * reported "not running" for the one that is.
 */
export async function getCloudSyncScheduler(machineId: string | null = null, intervalMinutes = 15) {
  return getProcessStore<CloudSyncScheduler>(
    "cloudSyncScheduler.instance",
    () => new CloudSyncScheduler(machineId, intervalMinutes)
  );
}
