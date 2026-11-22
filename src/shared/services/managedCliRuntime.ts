import os from "node:os";
import path from "node:path";
import { resolveDataDir } from "@/lib/dataPaths";
import * as core from "./managedCliRuntimeCore.mjs";

export interface ManagedCliDefinition {
  id: string;
  name: string;
  packageName: string;
  binary: string;
  envBinKey: string;
  updateSupported: boolean;
  lifecyclePackages: readonly string[];
}

export interface ManagedCliPointer {
  version: string;
  installationId: string;
  updatedAt: string;
}

export interface ManagedCliInstallation {
  command: string;
  prefix: string;
  version: string;
  executableEntryPath: string;
}

export interface ManagedCliSelection {
  definition: ManagedCliDefinition;
  installation: ManagedCliInstallation;
}

export const MANAGED_CLI_STABLE_VERSION = core.MANAGED_CLI_STABLE_VERSION;
export const assertManagedCliPath: (root: string, candidate: string) => void =
  core.assertManagedCliPath;
export const parseManagedCliVersion: (output: unknown) => string | null =
  core.parseManagedCliVersion;
export const compareManagedCliVersions: (left: string, right: string) => number =
  core.compareManagedCliVersions;
export const hasManagedCliOverride: (
  definition: ManagedCliDefinition,
  env?: NodeJS.ProcessEnv
) => boolean = core.hasManagedCliOverride;
export const getManagedCliDefinition: (toolId: string) => ManagedCliDefinition | undefined =
  core.getManagedCliDefinition;
export const listManagedCliDefinitions: () => readonly ManagedCliDefinition[] =
  core.listManagedCliDefinitions;
export const inspectManagedCliInstallation: (
  definition: ManagedCliDefinition,
  root: string,
  pointer: ManagedCliPointer,
  platform?: NodeJS.Platform
) => ManagedCliInstallation = core.inspectManagedCliInstallation;

export function getManagedCliRoot(): string {
  return path.join(resolveDataDir(), "cli-runtimes");
}

export function readManagedCliInstallation(
  toolId: string,
  root = getManagedCliRoot(),
  platform: NodeJS.Platform = os.platform()
): (ManagedCliInstallation & { pointer: ManagedCliPointer }) | null {
  return core.readManagedCliInstallation(toolId, root, platform);
}

/** Synchronous and side-effect free: callers keep explicit executable overrides. */
export function getManagedCliSelection(toolId: string): ManagedCliSelection | null {
  const definition = getManagedCliDefinition(toolId);
  if (!definition || hasManagedCliOverride(definition)) return null;
  const installation = readManagedCliInstallation(toolId);
  return installation ? { definition, installation } : null;
}

export function getManagedCliCommand(toolId: string): string | null {
  return getManagedCliSelection(toolId)?.installation.command ?? null;
}
