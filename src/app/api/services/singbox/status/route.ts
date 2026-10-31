import { getSupervisor } from "@/lib/services/registry";
import { getServiceRow } from "@/lib/db/versionManager";
import {
  getInstalledVersion,
  getLatestVersion,
  SINGBOX_DEFAULT_PORT,
} from "@/lib/services/installers/singbox";
import type { ServiceStatus } from "@/lib/services/types";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "singbox";

type ServiceRow = Awaited<ReturnType<typeof getServiceRow>>;

// The status body is assembled from small helpers so no single function carries
// every `??` fallback: live supervisor status wins, then the version_manager row,
// then the static default.

function runtimeFields(live: ServiceStatus | null) {
  if (!live) return { pid: null, health: "unknown", startedAt: null, adopted: false };
  return {
    pid: live.pid ?? null,
    health: live.health ?? "unknown",
    startedAt: live.startedAt ?? null,
    adopted: live.adopted ?? false,
  };
}

function mergedFields(live: ServiceStatus | null, row: ServiceRow) {
  return {
    state: live?.state ?? row?.status ?? "unknown",
    port: live?.port ?? row?.port ?? SINGBOX_DEFAULT_PORT,
    lastError: live?.lastError ?? row?.errorMessage ?? null,
  };
}

function versionFields(installed: string | null, latest: string | null, row: ServiceRow) {
  return {
    installedVersion: installed ?? row?.installedVersion ?? null,
    latestVersion: latest,
    updateAvailable: !!installed && !!latest && installed !== latest,
  };
}

function settingsFields(row: ServiceRow) {
  return {
    autoStart: row?.autoStart ?? false,
    autoRestartAdopted: row?.autoRestartAdopted ?? false,
  };
}

export async function GET(): Promise<Response> {
  try {
    const liveStatus = getSupervisor(TOOL)?.getStatus() ?? null;
    const row = await getServiceRow(TOOL);
    const runtime = runtimeFields(liveStatus);
    const merged = mergedFields(liveStatus, row);
    const versions = versionFields(await getInstalledVersion(), await getLatestVersion(), row);
    const settings = settingsFields(row);

    return Response.json({
      tool: TOOL,
      state: merged.state,
      pid: runtime.pid,
      port: merged.port,
      health: runtime.health,
      startedAt: runtime.startedAt,
      lastError: merged.lastError,
      installedVersion: versions.installedVersion,
      latestVersion: versions.latestVersion,
      updateAvailable: versions.updateAvailable,
      autoStart: settings.autoStart,
      adopted: runtime.adopted,
      autoRestartAdopted: settings.autoRestartAdopted,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
