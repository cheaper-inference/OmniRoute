import os from "node:os";
import path from "node:path";
import {
  getManagedCliRoot,
  hasManagedCliOverride,
  listManagedCliDefinitions,
  readManagedCliInstallation,
} from "./managedCliRuntime";
import { buildManagedCliInvocation } from "./managedCliInvocation.mjs";

/** Translate only the exact active managed shim into its shell-free invocation. */
export function resolveManagedCliInvocation(
  commandPath: string,
  args: string[]
): { command: string; args: string[]; useShell: false } | null {
  const root = getManagedCliRoot();
  const relative = path.relative(root, commandPath);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    return null;
  }

  const platform = os.platform();
  const normalize = (value: string) =>
    platform === "win32" ? path.win32.normalize(value).toLowerCase() : path.normalize(value);
  for (const definition of listManagedCliDefinitions()) {
    if (hasManagedCliOverride(definition)) continue;
    const installation = readManagedCliInstallation(definition.id, root, platform);
    if (!installation || normalize(installation.command) !== normalize(commandPath)) continue;
    const invocation = buildManagedCliInvocation(installation, definition, { platform });
    return {
      command: invocation.command,
      args: [...invocation.argsPrefix, ...args],
      useShell: false,
    };
  }
  return null;
}
