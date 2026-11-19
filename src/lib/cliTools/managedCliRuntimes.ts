import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  getManagedCliRoot,
  getManagedCliDefinition,
  listManagedCliDefinitions,
  hasManagedCliOverride,
  readManagedCliInstallation,
  inspectManagedCliInstallation,
  parseManagedCliVersion,
  compareManagedCliVersions,
  assertManagedCliPath,
  type ManagedCliDefinition,
  type ManagedCliInstallation,
  type ManagedCliPointer,
} from "@/shared/services/managedCliRuntime";
import { createLogger } from "@/shared/utils/logger";
import { fetchManagedCliLatestVersion, type ManagedCliRegistryFetch } from "./managedCliRegistry";
import { installManagedCliCandidate, probeManagedCliCandidate } from "./managedCliInstall";
import {
  ensureManagedCliDirectories,
  acquireManagedCliFileLock,
  activateManagedCliPointer,
} from "./managedCliStorage";
import { ManagedCliRuntimeError } from "./managedCliError";

export { ManagedCliRuntimeError } from "./managedCliError";

export interface ManagedCliRuntimeItem {
  id: string;
  name: string;
  packageName: string;
  installedVersion: string | null;
  latestVersion: string | null;
  installed: boolean;
  runnable: boolean;
  source: "managed" | "external" | "missing" | "override";
  commandPath: string | null;
  updateAvailable: boolean;
  canUpdate: boolean;
  checkedAt: string | null;
  error: string | null;
  reason: string | null;
}

export interface ManagedCliDetectedRuntime {
  installed: boolean;
  runnable: boolean;
  commandPath?: string | null;
  version?: string | null;
}

export interface ManagedCliRuntimeDependencies {
  root?: () => string;
  env?: () => NodeJS.ProcessEnv;
  platform?: () => NodeJS.Platform;
  now?: () => Date;
  detect?: (toolId: string) => Promise<ManagedCliDetectedRuntime>;
  fetch?: ManagedCliRegistryFetch;
  install?: (definition: ManagedCliDefinition, version: string, prefix: string) => Promise<void>;
  probe?: (
    installation: ManagedCliInstallation,
    definition: ManagedCliDefinition
  ) => Promise<string>;
  activate?: (
    root: string,
    definition: ManagedCliDefinition,
    pointer: ManagedCliPointer
  ) => Promise<void>;
  acquireLock?: (toolDir: string) => Promise<() => Promise<void>>;
}

type CheckedVersion = { latestVersion: string | null; checkedAt: string; error: string | null };
const globalState = globalThis as typeof globalThis & {
  __omnirouteManagedCliUpdates?: Set<string>;
};
const updateLocks = (globalState.__omnirouteManagedCliUpdates ??= new Set<string>());
const log = createLogger("managed-cli-runtimes");

function blockedReason(
  item: ManagedCliRuntimeItem,
  definition: ManagedCliDefinition
): string | null {
  if (item.source === "override") return "explicit_override";
  if (!item.installed) return "not_installed";
  if (!definition.updateSupported) return "update_unsupported";
  if (!item.runnable) return "not_runnable";
  if (!item.installedVersion) return "version_unknown";
  return null;
}

const BLOCK_MESSAGES: Record<string, string> = {
  explicit_override:
    "An explicit CLI executable override is configured. Manage that installation directly or remove the override first.",
  not_installed: "This CLI is not installed. Install it before requesting an update.",
  update_unsupported:
    "OpenClaw updates require coordinated gateway and service migration. Update OpenClaw using its supported deployment workflow.",
  not_runnable:
    "The current CLI could not be executed. Repair the existing installation before updating.",
  version_unknown: "The installed CLI version could not be determined safely.",
};

export function createManagedCliRuntimeManager(dependencies: ManagedCliRuntimeDependencies = {}) {
  const root = dependencies.root ?? getManagedCliRoot;
  const env = dependencies.env ?? (() => process.env);
  const platform = dependencies.platform ?? (() => os.platform());
  const now = dependencies.now ?? (() => new Date());
  const detect =
    dependencies.detect ??
    (async (toolId: string) =>
      (await import("@/shared/services/cliRuntime")).getCliRuntimeStatus(toolId));
  const install = dependencies.install ?? installManagedCliCandidate;
  const probe = dependencies.probe ?? probeManagedCliCandidate;
  const activate = dependencies.activate ?? activateManagedCliPointer;
  const acquireLock = dependencies.acquireLock ?? acquireManagedCliFileLock;
  const checks = new Map<string, CheckedVersion>();

  async function check(definition: ManagedCliDefinition): Promise<CheckedVersion> {
    let result: CheckedVersion;
    try {
      const latestVersion = await fetchManagedCliLatestVersion(definition, dependencies.fetch);
      result = { latestVersion, checkedAt: now().toISOString(), error: null };
    } catch {
      result = {
        latestVersion: null,
        checkedAt: now().toISOString(),
        error:
          "Could not check the official package registry. Try again when registry access is available.",
      };
      log.warn({ toolId: definition.id }, "CLI update check failed");
    }
    checks.set(definition.id, result);
    return result;
  }

  async function inventory(
    definition: ManagedCliDefinition,
    checkUpdates: boolean
  ): Promise<ManagedCliRuntimeItem> {
    const override = hasManagedCliOverride(definition, env());
    const managed = override ? null : readManagedCliInstallation(definition.id, root(), platform());
    let detected: ManagedCliDetectedRuntime;
    let detectionError: string | null = null;
    try {
      detected = await detect(definition.id);
    } catch {
      detected = {
        installed: Boolean(managed),
        runnable: false,
        commandPath: managed?.command ?? null,
      };
      detectionError = "Could not inspect the installed CLI runtime.";
    }
    const checked = checkUpdates ? await check(definition) : checks.get(definition.id);
    const installedVersion = parseManagedCliVersion(detected.version);
    const latestVersion = checked?.latestVersion ?? null;
    const normalizeCommandPath = (command: string) =>
      platform() === "win32" ? path.win32.normalize(command).toLowerCase() : path.resolve(command);
    const selectedManaged = Boolean(
      managed &&
      detected.commandPath &&
      normalizeCommandPath(managed.command) === normalizeCommandPath(detected.commandPath)
    );
    const item: ManagedCliRuntimeItem = {
      id: definition.id,
      name: definition.name,
      packageName: definition.packageName,
      installedVersion,
      latestVersion,
      installed: Boolean(detected.installed),
      runnable: Boolean(detected.runnable),
      source: override
        ? "override"
        : selectedManaged
          ? "managed"
          : detected.installed
            ? "external"
            : "missing",
      commandPath: detected.commandPath ?? null,
      updateAvailable: Boolean(
        installedVersion &&
        latestVersion &&
        compareManagedCliVersions(latestVersion, installedVersion) > 0
      ),
      canUpdate: false,
      checkedAt: checked?.checkedAt ?? null,
      error: detectionError ?? checked?.error ?? null,
      reason: null,
    };
    const blocked = blockedReason(item, definition);
    item.canUpdate = blocked === null;
    item.reason =
      blocked ??
      (item.error
        ? "check_failed"
        : latestVersion
          ? item.updateAvailable
            ? "update_available"
            : "up_to_date"
          : "unchecked");
    return item;
  }

  async function listManagedCliRuntimes({
    checkUpdates = false,
  }: { checkUpdates?: boolean } = {}): Promise<ManagedCliRuntimeItem[]> {
    log.debug({ checkUpdates }, "Reading managed CLI inventory");
    return Promise.all(
      listManagedCliDefinitions().map((definition) => inventory(definition, checkUpdates))
    );
  }

  async function installAndActivate(
    definition: ManagedCliDefinition,
    latestVersion: string
  ): Promise<ManagedCliInstallation> {
    const pointer: ManagedCliPointer = {
      version: latestVersion,
      installationId: `${latestVersion}-${randomUUID()}`,
      updatedAt: now().toISOString(),
    };
    const prefix = path.join(root(), definition.id, "versions", pointer.installationId);
    await fs.mkdir(prefix, { mode: 0o700 });
    assertManagedCliPath(root(), prefix);
    let activated = false;
    try {
      try {
        await install(definition, latestVersion, prefix);
      } catch {
        throw new ManagedCliRuntimeError(
          "install_failed",
          "The CLI update could not be installed. The previous version is still active. Check npm, network access, Node compatibility and data-directory permissions.",
          502
        );
      }
      let candidate: ManagedCliInstallation;
      try {
        candidate = inspectManagedCliInstallation(definition, root(), pointer, platform());
        if (parseManagedCliVersion(await probe(candidate, definition)) !== latestVersion)
          throw new Error("Unexpected executable version");
      } catch {
        throw new ManagedCliRuntimeError(
          "verification_failed",
          "The downloaded CLI did not pass version and executable verification. The previous version is still active.",
          502
        );
      }
      if (hasManagedCliOverride(definition, env()))
        throw new ManagedCliRuntimeError(
          "explicit_override",
          BLOCK_MESSAGES.explicit_override,
          409
        );
      try {
        await activate(root(), definition, pointer);
        activated = true;
      } catch {
        throw new ManagedCliRuntimeError(
          "activation_failed",
          "The verified CLI could not be activated. The previous version is still active.",
          500
        );
      }
      return candidate;
    } finally {
      if (
        !activated &&
        readManagedCliInstallation(definition.id, root(), platform())?.pointer.installationId !==
          pointer.installationId
      ) {
        try {
          assertManagedCliPath(root(), prefix);
          await fs.rm(prefix, { recursive: true, force: true });
        } catch {
          log.warn({ toolId: definition.id }, "Could not clean up an unactivated CLI candidate");
        }
      }
    }
  }

  async function updateManagedCliRuntime(toolId: string): Promise<ManagedCliRuntimeItem> {
    const definition = getManagedCliDefinition(toolId);
    if (!definition)
      throw new ManagedCliRuntimeError("unsupported_tool", "Unsupported CLI tool.", 404);
    const lockKey = `${path.resolve(root())}:${definition.id}`;
    if (updateLocks.has(lockKey))
      throw new ManagedCliRuntimeError(
        "update_in_progress",
        "This CLI already has an update in progress.",
        409
      );
    updateLocks.add(lockKey);
    let releaseFileLock: (() => Promise<void>) | undefined;
    try {
      let current = await inventory(definition, false);
      let blocked = blockedReason(current, definition);
      if (blocked) throw new ManagedCliRuntimeError(blocked, BLOCK_MESSAGES[blocked], 409);
      const toolDir = await ensureManagedCliDirectories(root(), definition.id);
      releaseFileLock = await acquireLock(toolDir);
      // Another server worker may have activated a newer version before this lock was acquired.
      current = await inventory(definition, false);
      blocked = blockedReason(current, definition);
      if (blocked) throw new ManagedCliRuntimeError(blocked, BLOCK_MESSAGES[blocked], 409);
      const checked = await check(definition);
      if (!checked.latestVersion)
        throw new ManagedCliRuntimeError("check_failed", checked.error!, 502);
      if (compareManagedCliVersions(checked.latestVersion, current.installedVersion!) <= 0)
        return inventory(definition, false);
      log.info(
        { toolId: definition.id, version: checked.latestVersion },
        "Installing managed CLI update"
      );
      const candidate = await installAndActivate(definition, checked.latestVersion);
      log.info(
        { toolId: definition.id, version: candidate.version },
        "Managed CLI update activated"
      );
      return {
        ...current,
        ...checked,
        installedVersion: candidate.version,
        installed: true,
        runnable: true,
        source: "managed",
        commandPath: candidate.command,
        updateAvailable: false,
        canUpdate: true,
        reason: "up_to_date",
        error: null,
      };
    } catch (error) {
      const failure =
        error instanceof ManagedCliRuntimeError
          ? error
          : new ManagedCliRuntimeError(
              "install_failed",
              "The CLI update could not be prepared. The previous version is still active. Check data-directory permissions and available storage.",
              500
            );
      log.error({ toolId: definition.id, code: failure.code }, "Managed CLI update failed");
      throw failure;
    } finally {
      try {
        await releaseFileLock?.();
      } catch {
        log.warn({ toolId: definition.id }, "Could not release the CLI update filesystem lock");
      } finally {
        updateLocks.delete(lockKey);
      }
    }
  }

  return { listManagedCliRuntimes, updateManagedCliRuntime };
}

const manager = createManagedCliRuntimeManager();
export const listManagedCliRuntimes = manager.listManagedCliRuntimes;
export const updateManagedCliRuntime = manager.updateManagedCliRuntime;
