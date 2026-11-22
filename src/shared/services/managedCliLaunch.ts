import os from "node:os";
import path from "node:path";
import {
  getManagedCliRoot,
  hasManagedCliOverride,
  listManagedCliDefinitions,
  readManagedCliInstallation,
  type ManagedCliSelection,
} from "./managedCliRuntime";
import { buildManagedCliInvocation } from "./managedCliInvocation.mjs";

function buildSelectionInvocation(selection: ManagedCliSelection, args: string[]) {
  const invocation = buildManagedCliInvocation(selection.installation, selection.definition);
  return {
    command: invocation.command,
    args: [...invocation.argsPrefix, ...args],
    useShell: false as const,
  };
}

/** Resolve a verified shim selected by the caller, or look up the active installation. */
export function resolveManagedCliInvocation(
  commandPath: string,
  args: string[],
  selection?: ManagedCliSelection
): { command: string; args: string[]; useShell: false } | null {
  // The pointer can switch during discovery. The selected installation still owns its entry.
  if (selection?.installation.command === commandPath) {
    return buildSelectionInvocation(selection, args);
  }
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
    return buildSelectionInvocation({ definition, installation }, args);
  }
  return null;
}
