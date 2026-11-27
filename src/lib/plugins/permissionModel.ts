/**
 * Opt-in Node.js permission model for plugin child processes.
 *
 * With the `PLUGIN_PERMISSION_MODEL_ENABLED` feature flag on, `loadPlugin()` starts each
 * plugin host with Node's permission model, derived from the manifest's
 * `requires.permissions`:
 *
 * - file-system reads are limited to the generated host script and the plugin's own
 *   directory, plus the plugin's data directory when `file-read` or `file-write` is declared;
 * - file-system writes are allowed only in the plugin's data directory, and only when
 *   `file-write` is declared;
 * - child processes are allowed only when `exec` is declared;
 * - worker threads, native addons and WASI stay denied.
 *
 * `network` is not enforced: the Node.js permission model does not gate outbound network
 * access, so it stays a declaration. With the flag off nothing here runs and the plugin
 * host is spawned exactly as before.
 *
 * @module plugins/permissionModel
 */

import { dirname, join, resolve } from "path";
import type { Permission } from "./manifest";

export const PLUGIN_DATA_DIRNAME = "plugin-data";

/** Per-plugin writable directory: `plugin-data/<name>` next to the plugin root. */
export function getPluginDataDir(pluginRoot: string, name: string): string {
  return join(dirname(resolve(pluginRoot)), PLUGIN_DATA_DIRNAME, name);
}

/**
 * The flag that turns the permission model on. Every supported Node.js line accepts
 * `--permission` (22.x keeps `--experimental-permission` as an alias); the fallback only
 * matters for a runtime that predates the stable name.
 */
export function resolvePermissionFlag(
  allowedFlags: ReadonlySet<string> = process.allowedNodeEnvironmentFlags
): string {
  return allowedFlags.has("--permission") ? "--permission" : "--experimental-permission";
}

export interface PermissionModelArgsInput {
  hostScriptPath: string;
  pluginDir: string;
  dataDir: string;
  permissions: readonly Permission[];
  permissionFlag?: string;
}

/** Node.js CLI flags that sandbox one plugin host process. One path per flag. */
export function buildPermissionModelArgs(input: PermissionModelArgsInput): string[] {
  const { hostScriptPath, pluginDir, dataDir, permissions } = input;
  const canWrite = permissions.includes("file-write");
  const canReadData = canWrite || permissions.includes("file-read");
  const args = [
    input.permissionFlag ?? resolvePermissionFlag(),
    `--allow-fs-read=${hostScriptPath}`,
    `--allow-fs-read=${pluginDir}`,
  ];
  if (canReadData) args.push(`--allow-fs-read=${dataDir}`);
  if (canWrite) args.push(`--allow-fs-write=${dataDir}`);
  if (permissions.includes("exec")) args.push("--allow-child-process");
  return args;
}
