import type { OpencodeServerStatus } from "@omniroute/open-sse/services/opencodeServerLauncher.ts";

/**
 * Projects the launcher status onto the shape the shared services UI
 * (ServiceStatusCard / useServiceStatus) reads, so the OpenCode tab reuses it.
 */
export function toServiceStatus(status: OpencodeServerStatus, lastError: string | null = null) {
  const port = Number(new URL(status.url).port) || 4096;
  return {
    tool: "opencode-server",
    state: status.running ? "running" : "stopped",
    pid: status.pid,
    port,
    health: status.running ? "ok" : "unknown",
    startedAt: null,
    lastError,
    installedVersion: status.version,
    latestVersion: null,
    updateAvailable: false,
    autoStart: false,
    adopted: false,
    autoRestartAdopted: false,
    url: status.url,
    managed: status.managed,
  };
}
