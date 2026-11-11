import fs from "node:fs";
import path from "node:path";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { renderManagedConfig, type ManagedCore } from "./config";
import { managedRoot, withManagedLock, readManagedManifest, managedListeners } from "./manager";
import { checkNative, startManaged, stopManaged, isManagedRunning } from "./runtime";
import { installManagedCore } from "./install";
import { ensureManagedDirectory } from "./directories";

/** Read a private config file, returning null only for a missing file. */
function readOptional(file: string): string | null {
  try {
    return readPrivateConfigFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Restore prior private contents or remove a file that did not previously exist. */
function restoreFile(file: string, contents: string | null): void {
  if (contents === null) fs.rmSync(file, { force: true });
  else writePrivateConfigFile(file, contents);
}

/**
 * Restart restored listeners without downloading a binary and report a sanitized rollback failure.
 */
async function restoreRemovedCore(
  core: ManagedCore,
  root: string,
  executable: string,
  configPath: string,
  entries: ReturnType<typeof readManagedManifest>
): Promise<void> {
  try {
    const restoredExecutable = executable || (await installManagedCore(core, root, false));
    await startManaged(core, restoredExecutable, configPath, managedListeners(core, entries));
  } catch {
    throw new Error(
      "Managed deletion failed; sources and configuration restored but prior core binary cannot restart"
    );
  }
}

/** Local registry deletion rebuilds listeners before the DB deletion, with rollback. */
export async function removeManagedProxy<T>(
  core: ManagedCore,
  id: string,
  commit: () => Promise<T>,
  root = managedRoot()
): Promise<T> {
  return withManagedLock(core, root, async () => {
    const directory = path.join(root, core);
    ensureManagedDirectory(directory);
    const manifestPath = path.join(directory, "sources.json");
    const configPath = path.join(directory, "config.json");
    const oldManifest = readOptional(manifestPath);
    const oldConfig = readOptional(configPath);
    const entries = readManagedManifest(oldManifest);
    const remaining = entries.filter((entry) => entry.id !== id);
    // An orphan still may own a live listener. Always stop/rebuild before deleting its row.
    const wasRunning = isManagedRunning(core);
    const executable =
      wasRunning && remaining.length ? await installManagedCore(core, root, false) : "";
    const candidate = path.join(directory, "delete-candidate.json");
    try {
      if (remaining.length) {
        writePrivateConfigFile(
          candidate,
          JSON.stringify(renderManagedConfig(core, managedListeners(core, remaining)))
        );
        if (wasRunning) await checkNative(core, executable, candidate);
      }
      await stopManaged(core);
      if (remaining.length) {
        writePrivateConfigFile(configPath, readPrivateConfigFile(candidate));
        if (wasRunning)
          await startManaged(core, executable, configPath, managedListeners(core, remaining));
      } else fs.rmSync(configPath, { force: true });
      writePrivateConfigFile(manifestPath, JSON.stringify({ version: 1, entries: remaining }));
      return await commit();
    } catch (error) {
      await stopManaged(core);
      restoreFile(manifestPath, oldManifest);
      restoreFile(configPath, oldConfig);
      // Without both persisted sources and config, restarting could resurrect orphan listeners.
      if (wasRunning && entries.length && oldConfig)
        await restoreRemovedCore(core, root, executable, configPath, entries);
      throw error;
    } finally {
      fs.rmSync(candidate, { force: true });
    }
  });
}
