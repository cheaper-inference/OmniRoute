import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

import { resolveDataDir } from "@/lib/dataPaths";
import { ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";

import {
  clientPluginChange,
  getClientPlugins,
  getClientPluginWriteTarget,
  setClientPluginEnabled,
  uninstallCodexPlugin,
  uninstallKimiPlugin,
  updateHermesPlugin,
} from "./clientExtensions";
import { clientInstructionsId } from "./clientInstructions";
import { readPrivateConfigFile, writePrivateConfigFile } from "./privateConfigFile";

type Client = z.infer<typeof clientInstructionsId>;
const nativePlugin = z.strictObject({
  client: clientInstructionsId,
  name: clientPluginChange.shape.name,
});
type NativePlugin = z.infer<typeof nativePlugin>;
const maxEntries = 1000;
const libraryIndex = z.array(nativePlugin).max(maxEntries);
const fileLimit = 256 * 1024;
const clients = clientInstructionsId.options;

const unsupportedLifecycle: Record<Client, string> = {
  codex: "Update or remove this plugin in Codex or its marketplace.",
  hermes: "Use the Hermes plugin manager for updates and removal.",
  "kimi-code": "Kimi Code updates plug-ins in its interactive /plugins manager.",
  codebuddy: "Use the CodeBuddy plugin manager for updates and removal.",
};

export const clientPluginLibraryRequest = z.strictObject({
  action: z.enum(["import", "enable", "disable", "update", "uninstall"]),
  ids: z
    .array(z.string().regex(/^[a-f0-9]{64}$/))
    .min(1)
    .max(50),
  client: clientInstructionsId.optional(),
});

function pluginId({ client, name }: NativePlugin): string {
  return createHash("sha256")
    .update(JSON.stringify([client, name]))
    .digest("hex");
}

function readLibraryIndex() {
  const file = path.resolve(resolveDataDir(), "client-plugin-library.json");
  for (let dir = path.dirname(file); dir !== path.dirname(dir); dir = path.dirname(dir)) {
    const stat = fs.lstatSync(dir, { throwIfNoEntry: false });
    if (stat && !stat.isDirectory()) throw new Error("Linked plugin library directory");
  }
  const stat = fs.lstatSync(file, { throwIfNoEntry: false });
  if (!stat) return { file, entries: [] as NativePlugin[] };
  if (!stat.isFile() || stat.nlink !== 1 || stat.size > fileLimit)
    throw new Error("Invalid plugin library index");
  return { file, entries: libraryIndex.parse(JSON.parse(readPrivateConfigFile(file))) };
}

type NativeState = Awaited<ReturnType<typeof getClientPlugins>>[number];

async function discover() {
  const native = new Map<string, NativePlugin & { state: NativeState }>();
  const errors: Partial<Record<Client, string>> = {};
  const results = await Promise.allSettled(clients.map((client) => getClientPlugins(client)));
  for (const [index, result] of results.entries()) {
    const client = clients[index];
    if (result.status === "rejected") {
      errors[client] = "Could not read native plugin settings.";
      continue;
    }
    const counts = new Map<string, number>();
    for (const state of result.value) {
      counts.set(state.name, (counts.get(state.name) ?? 0) + 1);
    }
    for (const state of result.value) {
      const plugin = nativePlugin.safeParse({ client, name: state.name });
      if (!plugin.success || counts.get(state.name) !== 1) {
        errors[client] = "Some native plugin identifiers could not be read unambiguously.";
        continue;
      }
      native.set(pluginId(plugin.data), { ...plugin.data, state });
    }
  }
  return { native, errors };
}

type ClientAssignment = {
  enabled: boolean;
  canEnable: boolean;
  canDisable: boolean;
  canUpdate: boolean;
  canUninstall: boolean;
  reason?: string;
};

function describeClient(
  plugin: NativePlugin,
  state: NativeState | undefined,
  managed: boolean
): ClientAssignment {
  const enabled = state?.enabled === true;
  const canToggle = !!state?.canToggle && typeof state.enabled === "boolean";
  const canUpdate = managed && !!state?.canUpdate;
  const canUninstall =
    managed && !!state && (plugin.client === "kimi-code" || !!state.canUninstall);
  return {
    enabled,
    canEnable: canToggle && !enabled,
    canDisable: canToggle && enabled,
    canUpdate,
    canUninstall,
    reason: !state
      ? "The plugin could not be found in the native inventory."
      : !canToggle
        ? "Use the native plugin manager to change this plugin."
        : unsupportedLifecycle[plugin.client],
  };
}

export async function getClientPluginLibrary() {
  const { native, errors } = await discover();
  const index = readLibraryIndex();
  const managed = new Map(index.entries.map((plugin) => [pluginId(plugin), plugin]));
  const all = new Map<string, NativePlugin>([...managed, ...native]);
  const items = [...all].map(([id, plugin]) => ({
    id,
    name: plugin.name,
    sourceClient: plugin.client,
    managed: managed.has(id),
    clients: {
      [plugin.client]: describeClient(plugin, native.get(id)?.state, managed.has(id)),
    } as Partial<Record<Client, ClientAssignment>>,
  }));
  items.sort(
    (a, b) => a.name.localeCompare(b.name) || a.sourceClient.localeCompare(b.sourceClient)
  );
  return { items, errors };
}

export async function changeClientPluginLibrary(input: z.infer<typeof clientPluginLibraryRequest>) {
  const { action, ids, client } = clientPluginLibraryRequest.parse(input);
  const { native } = await discover();
  const index = readLibraryIndex();
  const managed = new Map(index.entries.map((plugin) => [pluginId(plugin), plugin]));
  const results: Array<{ id: string; ok: boolean; error?: string }> = [];
  let changedIndex = false;

  for (const id of new Set(ids)) {
    const plugin = native.get(id);
    if (!plugin || (client && plugin.client !== client)) {
      results.push({ id, ok: false, error: "Plugin is unavailable for the selected client." });
      continue;
    }
    try {
      if (action !== "import") {
        const target = getClientPluginWriteTarget(
          plugin.client,
          action === "update" || action === "uninstall" ? action : undefined
        );
        const writeGuard = ensureCliConfigWriteAllowed(target);
        if (writeGuard) {
          results.push({ id, ok: false, error: writeGuard });
          continue;
        }
      }
      if (action === "import") {
        if (!managed.has(id)) {
          if (managed.size >= maxEntries) throw new Error("Plugin library is full");
          managed.set(id, { client: plugin.client, name: plugin.name });
          changedIndex = true;
        }
      } else if (action === "enable" || action === "disable") {
        const state = await setClientPluginEnabled({
          client: plugin.client,
          name: plugin.name,
          enabled: action === "enable",
        });
        if (!state) {
          results.push({
            id,
            ok: false,
            error: "The native client does not support changing this plugin.",
          });
          continue;
        }
      } else if (action === "uninstall" && plugin.client === "kimi-code" && managed.has(id)) {
        uninstallKimiPlugin(plugin.name);
      } else if (
        action === "uninstall" &&
        plugin.client === "codex" &&
        managed.has(id) &&
        plugin.state.canUninstall
      ) {
        await uninstallCodexPlugin(plugin.name);
      } else if (
        action === "update" &&
        plugin.client === "hermes" &&
        managed.has(id) &&
        plugin.state.canUpdate
      ) {
        await updateHermesPlugin(plugin.name);
      } else {
        results.push({
          id,
          ok: false,
          error:
            action === "uninstall" && plugin.client === "kimi-code"
              ? "Adopt the plugin before removing its Kimi Code installation record."
              : unsupportedLifecycle[plugin.client],
        });
        continue;
      }
      results.push({ id, ok: true });
    } catch {
      results.push({ id, ok: false, error: "Could not verify the native plugin change." });
    }
  }

  if (changedIndex) {
    const content = JSON.stringify(libraryIndex.parse([...managed.values()]));
    writePrivateConfigFile(index.file, content);
    if (readPrivateConfigFile(index.file) !== content)
      throw new Error("Could not verify the saved plugin library index");
  }
  return { results, ...(await getClientPluginLibrary()) };
}
