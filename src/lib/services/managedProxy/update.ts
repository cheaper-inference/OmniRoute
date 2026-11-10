import path from "node:path";
import { readPrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import {
  managedListeners,
  managedRoot,
  readManagedManifest,
  withManagedLock,
  type ActivationDependencies,
} from "./manager";
import { installManagedCore } from "./install";
import {
  readCoreSelection,
  writeCoreSelection,
  clearCoreSelection,
  validateCoreSelection,
  type CoreSelection,
} from "./selection";
import type { ManagedCore } from "./config";

/** A binary change never rewrites sources, listener identities, assignments, or activation intent. */
export async function changeManagedCore(
  core: ManagedCore,
  input: CoreSelection,
  root = managedRoot(),
  dependencies?: ActivationDependencies
): Promise<void> {
  const selection = validateCoreSelection(core, input);
  const deps = dependencies || (await defaultDependencies());
  await withManagedLock(core, root, async () => {
    const previous = readCoreSelection(core, root);
    let manifest: string | null = null;
    try {
      manifest = readPrivateConfigFile(path.join(root, core, "sources.json"));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const entries = readManagedManifest(manifest);
    const listeners = managedListeners(core, entries);
    const config = path.join(root, core, "config.json");
    const running = deps.running?.(core) ?? false;
    if (running && !listeners.length)
      throw new Error("Managed running core has no saved listeners");
    const oldExecutable = running ? await deps.install(core, root, false, previous) : "";
    const executable = await deps.install(core, root, true, selection);
    if (entries.length) await deps.check(core, executable, config);
    try {
      if (running) await deps.stop(core);
      if (running) await deps.start(core, executable, config, listeners);
      writeCoreSelection(core, selection, root);
    } catch {
      await restorePreviousCore(
        core,
        root,
        previous,
        running,
        oldExecutable,
        config,
        listeners,
        deps
      );
      throw new Error("Managed core update failed; the previous selection was restored");
    }
  });
}

async function defaultDependencies(): Promise<ActivationDependencies> {
  const { allocatePort, checkNative, startManaged, stopManaged, isManagedRunning } =
    await import("./runtime");
  return {
    install: installManagedCore,
    check: checkNative,
    start: startManaged,
    stop: stopManaged,
    allocate: allocatePort,
    running: isManagedRunning,
  };
}

/** Roll back both the persisted selection and prior activation without changing listeners. */
async function restorePreviousCore(
  core: ManagedCore,
  root: string,
  previous: CoreSelection | null,
  running: boolean,
  executable: string,
  config: string,
  listeners: ReturnType<typeof managedListeners>,
  deps: ActivationDependencies
): Promise<void> {
  try {
    if (running) await deps.stop(core);
    if (previous) writeCoreSelection(core, previous, root);
    else await clearCoreSelection(core, root);
    if (running) await deps.start(core, executable, config, listeners);
  } catch {
    throw new Error("Managed core update failed and previous runtime could not be restored");
  }
}
