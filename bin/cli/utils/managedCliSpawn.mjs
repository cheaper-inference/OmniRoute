import path from "node:path";
import { resolveDataDir } from "../data-dir.mjs";
import {
  getManagedCliDefinition,
  hasManagedCliOverride,
  readManagedCliInstallation,
} from "../../../src/shared/services/managedCliRuntimeCore.mjs";
import { buildManagedCliInvocation } from "../../../src/shared/services/managedCliInvocation.mjs";

/** Resolve only OmniRoute-owned installations; explicit operator choices win. */
export function resolveManagedCliSpawn(toolId, platform = process.platform) {
  const definition = getManagedCliDefinition(toolId);
  if (!definition || hasManagedCliOverride(definition)) return null;
  const installation = readManagedCliInstallation(
    toolId,
    path.join(resolveDataDir(), "cli-runtimes"),
    platform
  );
  if (!installation) return null;
  try {
    return {
      ...buildManagedCliInvocation(installation, definition, { platform }),
      shell: undefined,
    };
  } catch {
    // A corrupt or unsupported managed entry must not suppress external discovery.
    return null;
  }
}
