/**
 * Version manager tool state persistence.
 *
 * Persistence lives behind VersionManagerRepository. The exports below keep their
 * original async shapes and run the SQLite-only legacy access in the caller's turn,
 * awaiting only where the original code awaited (the existence check before an
 * update and the read-back after a write). This facade owns the upsert defaults,
 * the "missing row" results and the embedded-service field whitelist.
 */

import type {
  VersionManagerRepository,
  VersionManagerTool,
} from "@/domain/persistence/versionManagerRepository";
import { versionManagerRepositories } from "./repositories/versionManagerRepositories";

const legacy = versionManagerRepositories.legacySync;

/** Async persistence contract for managed binaries and embedded service rows. */
export function getVersionManagerRepository(): VersionManagerRepository {
  return versionManagerRepositories.tools;
}

export async function getVersionManagerStatus(): Promise<VersionManagerTool[]> {
  return legacy.list();
}

export async function getVersionManagerTool(tool: string): Promise<VersionManagerTool | null> {
  return legacy.findByTool(tool);
}

export async function upsertVersionManagerTool(data: {
  tool: string;
  currentVersion?: string | null;
  installedVersion?: string | null;
  pinnedVersion?: string | null;
  binaryPath?: string | null;
  status?: string;
  pid?: number | null;
  port?: number;
  apiKey?: string | null;
  managementKey?: string | null;
  autoUpdate?: boolean;
  autoStart?: boolean;
  healthStatus?: string;
  configOverrides?: Record<string, unknown> | null;
  errorMessage?: string | null;
}): Promise<VersionManagerTool> {
  legacy.upsert({
    tool: data.tool,
    currentVersion: data.currentVersion ?? null,
    installedVersion: data.installedVersion ?? null,
    pinnedVersion: data.pinnedVersion ?? null,
    binaryPath: data.binaryPath ?? null,
    status: data.status ?? "not_installed",
    pid: data.pid ?? null,
    port: data.port ?? 8317,
    apiKey: data.apiKey ?? null,
    managementKey: data.managementKey ?? null,
    autoUpdate: data.autoUpdate !== undefined ? data.autoUpdate : true,
    autoStart: data.autoStart !== undefined ? data.autoStart : false,
    healthStatus: data.healthStatus ?? "unknown",
    configOverrides: data.configOverrides ?? null,
    errorMessage: data.errorMessage ?? null,
  });
  const result = await getVersionManagerTool(data.tool);
  if (!result) throw new Error("Failed to retrieve inserted version manager tool");
  return result;
}

export async function updateVersionManagerTool(
  tool: string,
  updates: Record<string, unknown>
): Promise<VersionManagerTool | null> {
  const existing = await getVersionManagerTool(tool);
  if (!existing) return null;

  legacy.update(tool, updates);
  return getVersionManagerTool(tool);
}

export async function deleteVersionManagerTool(tool: string): Promise<boolean> {
  return legacy.deleteByTool(tool);
}

export async function updateToolHealth(tool: string, healthStatus: string): Promise<boolean> {
  return legacy.setHealth(tool, healthStatus);
}

export async function updateToolVersion(
  tool: string,
  field: "current_version" | "installed_version",
  version: string
): Promise<boolean> {
  return legacy.setVersion(tool, field, version);
}

export async function setToolStatus(
  tool: string,
  status: string,
  pid?: number,
  errorMessage?: string
): Promise<boolean> {
  return legacy.setStatus(tool, status, pid, errorMessage);
}

/** Typed alias for getVersionManagerTool — preferred entry point for embedded services. */
export async function getServiceRow(tool: string): Promise<VersionManagerTool | null> {
  return getVersionManagerTool(tool);
}

const SERVICE_FIELD_WHITELIST: Set<string> = new Set([
  "logsBufferPath",
  "providerExpose",
  "lastSyncAt",
  "status",
  "pid",
  "port",
  "apiKey",
  "autoStart",
  "autoRestartAdopted",
  "autoUpdate",
  "healthStatus",
  "errorMessage",
  "currentVersion",
  "installedVersion",
  "binaryPath",
]);

/** Single-field update for embedded services; whitelisted to prevent SQL injection. */
export async function updateServiceField(
  tool: string,
  field: string,
  value: unknown
): Promise<VersionManagerTool | null> {
  if (!SERVICE_FIELD_WHITELIST.has(field)) {
    throw new Error(`updateServiceField: field "${field}" is not in the allowed list`);
  }
  return updateVersionManagerTool(tool, { [field]: value });
}
