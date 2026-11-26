import { execFile } from "node:child_process";
import {
  cpSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  renameSync,
  rmSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { getCodexClientConfigHome } from "@/shared/services/cliRuntime";
import { isDeepStrictEqual, promisify } from "node:util";
import { applyEdits, modify, parse as parseJsonc, type ParseError } from "jsonc-parser";
import { parse as parseToml } from "smol-toml";
import { z } from "zod";

import { clientInstructionsId } from "./clientInstructions";
import { getHermesHome } from "./config-generator/hermesHome";
import { readPrivateConfigFile, writePrivateConfigFile } from "./privateConfigFile";

type Client = z.infer<typeof clientInstructionsId>;
type Plugin = {
  name: string;
  enabled: boolean | null;
  canToggle?: boolean;
  canUpdate?: boolean;
  canUninstall?: boolean;
};
type PluginCommand = (
  client: "codex" | "hermes",
  args: string[],
  home: string,
  timeout: number
) => Promise<{ stdout: string }>;
const run = promisify(execFile);
const nativeName = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/;
const hermesPlugins = z.array(
  z.object({
    name: z.string(),
    status: z.string(),
    source: z.string(),
    removed: z.union([z.boolean(), z.string()]).nullish(),
  })
);
const kimiPlugins = z.object({
  version: z.literal(1),
  plugins: z.array(z.object({ id: z.string(), enabled: z.boolean() })),
});
const record = z.record(z.string(), z.unknown());

export const clientPluginChange = z.strictObject({
  client: clientInstructionsId,
  name: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_.@-]{0,199}$/),
  enabled: z.boolean(),
});
export const clientSkillInstall = z.strictObject({
  client: clientInstructionsId,
  name: z.string().regex(nativeName),
});

function root(client: Client, home: string): string {
  if (client === "hermes") return getHermesHome();
  if (client === "codex") return getCodexClientConfigHome();
  if (client === "kimi-code") return process.env.KIMI_CODE_HOME || path.join(home, ".kimi-code");
  return process.env.CODEBUDDY_CONFIG_DIR || path.join(home, ".codebuddy");
}

function directory(dir: string): boolean {
  return lstatSync(dir, { throwIfNoEntry: false })?.isDirectory() ?? false;
}

function assertDirectoryChain(start: string) {
  for (let dir = start; dir !== path.dirname(dir); dir = path.dirname(dir)) {
    const stat = lstatSync(dir, { throwIfNoEntry: false });
    if (stat && !stat.isDirectory()) throw new Error("Linked client directories are unsupported");
  }
}

function skillNames(dir: string): string[] {
  if (!directory(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || entry.name.startsWith(".")) return [];
    const subdir = path.join(dir, entry.name);
    if (lstatSync(path.join(subdir, "SKILL.md"), { throwIfNoEntry: false })?.isFile()) {
      return [entry.name];
    }
    return skillNames(subdir);
  });
}

function optionalFile(file: string): string | undefined {
  const stat = lstatSync(file, { throwIfNoEntry: false });
  if (!stat) return;
  if (!stat.isFile() || stat.nlink !== 1 || stat.size > 1024 * 1024)
    throw new Error("Invalid client config file");
  return readPrivateConfigFile(file);
}

function readJsonc(raw: string) {
  const errors: ParseError[] = [];
  const value = record.parse(parseJsonc(raw, errors));
  if (errors.length) throw new Error("Invalid client JSON settings");
  return value;
}

function pluginConfigPath(client: Exclude<Client, "hermes">) {
  const preference =
    client === "codex"
      ? "config.toml"
      : client === "codebuddy"
        ? "settings.json"
        : "plugins/installed.json";
  const file = path.resolve(root(client, os.homedir()), preference);
  assertDirectoryChain(path.dirname(file));
  return file;
}

export function getClientPluginWriteTarget(client: Client, action?: "update" | "uninstall") {
  if (client === "hermes") return path.resolve(getHermesHome());
  const file = pluginConfigPath(client);
  return client === "codex" && action === "uninstall" ? path.dirname(file) : file;
}

export function getClientSkillDestination(client: Client) {
  return path.resolve(root(client, os.homedir()), "skills");
}

const runPluginCommand: PluginCommand = async (client, args, home, timeout) => {
  const env = { ...process.env };
  if (client === "codex") {
    env.CODEX_HOME = home;
    delete env.CODEX_API_KEY;
    delete env.OPENAI_API_KEY;
    delete env.CODEX_ACCESS_TOKEN;
    delete env.CHATGPT_ACCESS_TOKEN;
    delete env.OPENAI_IDENTITY_TOKEN_FILE;
  } else {
    env.HERMES_HOME = home;
    env.HERMES_NONINTERACTIVE = "1";
  }
  const executable = process.platform === "win32" ? `${client}.exe` : client;
  return run(executable, args, { env, timeout, windowsHide: true, cwd: home });
};

function codexCache(home: string, name: string) {
  const [plugin, marketplace, ...extra] = name.split("@");
  const localSegment = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,99}$/;
  if (
    extra.length ||
    !localSegment.test(plugin) ||
    !marketplace ||
    !localSegment.test(marketplace) ||
    /^(?:workspace-(?:directory|shared-with-me)|.*-remote)/i.test(marketplace)
  )
    return null;
  const cache = path.resolve(home, "plugins", "cache", marketplace, plugin);
  assertDirectoryChain(cache);
  return cache;
}

function hermesInstall(home: string, name: string) {
  if (!nativeName.test(name)) return null;
  const dir = path.resolve(home, "plugins");
  const plugin = path.join(dir, name);
  assertDirectoryChain(plugin);
  if (!directory(plugin)) return null;
  const source = optionalFile(path.join(dir, ".install-metadata.json"));
  if (!source) return null;
  const row = z
    .object({
      source: z.string().min(1),
      revision: z.string().regex(/^[a-f0-9]{40}$/i),
      pinned: z.boolean().optional(),
      allow_removed: z.boolean().optional(),
    })
    .safeParse(record.parse(JSON.parse(source))[name]);
  if (!row.success || row.data.pinned || row.data.allow_removed) return null;
  return row.data;
}

export async function getClientPlugins(
  client: Client,
  execute = runPluginCommand
): Promise<Plugin[]> {
  if (client === "hermes") {
    const home = path.resolve(getHermesHome());
    assertDirectoryChain(home);
    const { stdout } = await execute("hermes", ["plugins", "list", "--json"], home, 20_000);
    return hermesPlugins.parse(JSON.parse(stdout)).map((entry) => ({
      name: entry.name,
      enabled:
        entry.status === "enabled"
          ? true
          : entry.status === "disabled" || entry.status === "not enabled"
            ? false
            : null,
      canToggle: entry.source === "bundled" && !entry.removed,
      canUpdate:
        entry.source !== "bundled" &&
        ["enabled", "disabled", "not enabled"].includes(entry.status) &&
        !entry.removed &&
        hermesInstall(home, entry.name) !== null,
    }));
  }
  const raw = optionalFile(pluginConfigPath(client));
  if (client === "kimi-code") {
    return raw === undefined
      ? []
      : kimiPlugins.parse(JSON.parse(raw)).plugins.map((entry) => ({
          name: entry.id,
          enabled: entry.enabled,
          canToggle: clientPluginChange.shape.name.safeParse(entry.id).success,
        }));
  }
  if (raw === undefined) return [];
  const settings = client === "codex" ? parseToml(raw) : readJsonc(raw);
  const configured = record.parse(
    (client === "codex" ? settings.plugins : settings.enabledPlugins) ?? {}
  );
  return Object.entries(configured).map(([name, entry]) => {
    const enabled =
      typeof entry === "object" && entry !== null ? record.parse(entry).enabled : entry;
    const cache =
      client === "codex" ? codexCache(path.dirname(pluginConfigPath("codex")), name) : null;
    return {
      name,
      enabled: typeof enabled === "boolean" ? enabled : null,
      canToggle:
        typeof enabled === "boolean" && clientPluginChange.shape.name.safeParse(name).success,
      ...(cache && directory(cache) && readdirSync(cache).length ? { canUninstall: true } : {}),
    };
  });
}

export async function uninstallCodexPlugin(name: string, execute = runPluginCommand) {
  const home = path.dirname(pluginConfigPath("codex"));
  const cache = codexCache(home, name);
  if (
    !cache ||
    !directory(cache) ||
    !readdirSync(cache).length ||
    !(await getClientPlugins("codex")).some((entry) => entry.name === name && entry.canUninstall)
  ) {
    throw new Error("Codex plugin removal requires a configured local cached plugin");
  }
  const { stdout } = await execute(
    "codex",
    ["plugin", "remove", name, "--json", "-c", 'cli_auth_credentials_store="ephemeral"'],
    home,
    30_000
  );
  const result = z.object({ pluginId: z.string() }).parse(JSON.parse(stdout));
  if (
    result.pluginId !== name ||
    lstatSync(cache, { throwIfNoEntry: false }) ||
    (await getClientPlugins("codex")).some((entry) => entry.name === name)
  ) {
    throw new Error("Could not verify the Codex plugin removal");
  }
}

export async function updateHermesPlugin(name: string, execute = runPluginCommand) {
  const home = path.resolve(getHermesHome());
  const listed = await getClientPlugins("hermes", execute);
  const previous = hermesInstall(home, name);
  if (!previous || !listed.some((entry) => entry.name === name && entry.canUpdate)) {
    throw new Error("Hermes plugin update requires an unpinned tracked installation");
  }
  const { stdout } = await execute("hermes", ["plugins", "update", name], home, 90_000);
  const next = hermesInstall(home, name);
  if (
    !next ||
    next.source !== previous.source ||
    !(await getClientPlugins("hermes", execute)).some(
      (entry) => entry.name === name && entry.canUpdate
    ) ||
    (next.revision === previous.revision &&
      !/\b(?:already up to date|already at|is current)\b/i.test(stdout))
  ) {
    throw new Error("Could not verify the Hermes plugin update");
  }
}

export async function getClientExtensions(client: Client) {
  return clientExtensions(client, await getClientPlugins(client));
}

function clientExtensions(client: Client, plugins: Plugin[]) {
  const home = os.homedir();
  const dir = root(client, home);
  const installed = [...new Set(skillNames(path.join(dir, "skills")))].sort();
  const shared = path.join(home, ".agents", "skills");
  const skills = [
    ...installed.map((name) => ({ name, source: "client" as const })),
    ...[...new Set(skillNames(shared))].sort().map((name) => ({
      name,
      source: "shared" as const,
      installable:
        nativeName.test(name) && !installed.includes(name) && directory(path.join(shared, name)),
    })),
  ];
  return {
    client,
    skills,
    plugins,
    capabilities: { togglePlugin: true },
  };
}

export async function installClientSkill(input: z.infer<typeof clientSkillInstall>) {
  const { client, name } = clientSkillInstall.parse(input);
  const home = os.homedir();
  const shared = path.join(home, ".agents", "skills");
  const source = path.join(shared, name);
  const target = getClientSkillDestination(client);
  if (
    !directory(shared) ||
    !directory(source) ||
    !lstatSync(path.join(source, "SKILL.md")).isFile()
  ) {
    throw new Error("Select a regular skill in the shared directory");
  }
  for (let dir = target; dir !== path.dirname(dir); dir = path.dirname(dir)) {
    const stat = lstatSync(dir, { throwIfNoEntry: false });
    if (stat && !stat.isDirectory()) throw new Error("Linked client directories are unsupported");
  }
  const dest = path.join(target, name);
  if (lstatSync(dest, { throwIfNoEntry: false }))
    throw new Error("This skill already exists for the client");
  const before = await getClientExtensions(client);
  if (
    !before.skills.some(
      (skill) => skill.source === "shared" && skill.name === name && skill.installable
    )
  ) {
    throw new Error("This skill cannot be copied to the selected client");
  }
  mkdirSync(target, { recursive: true });
  const temp = mkdtempSync(path.join(target, ".omniroute-skill-"));
  const bundle = path.join(temp, name);
  let total = 0;
  try {
    cpSync(source, bundle, {
      recursive: true,
      dereference: false,
      filter(file) {
        const stat = lstatSync(file);
        if (!stat.isFile() && !stat.isDirectory())
          throw new Error("Linked skill files are unsupported");
        total += stat.size;
        if (total > 10 * 1024 * 1024) throw new Error("The skill bundle exceeds 10 MB");
        return true;
      },
    });
    if (lstatSync(dest, { throwIfNoEntry: false }))
      throw new Error("This skill already exists for the client");
    renameSync(bundle, dest);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
  if (!lstatSync(path.join(dest, "SKILL.md")).isFile())
    throw new Error("Skill installation is incomplete");
  return {
    ...before,
    skills: [
      ...before.skills.map((skill) =>
        skill.name === name ? { ...skill, installable: false } : skill
      ),
      { name, source: "client" as const },
    ],
  };
}

export async function updateClientPlugin(input: z.infer<typeof clientPluginChange>) {
  const plugins = await setClientPluginEnabled(input);
  if (!plugins) return null;
  return clientExtensions(input.client, plugins);
}

export async function setClientPluginEnabled(input: z.infer<typeof clientPluginChange>) {
  input = clientPluginChange.parse(input);
  const plugins = await getClientPlugins(input.client);
  const entry = plugins.find((plugin) => plugin.name === input.name);
  if (!entry?.canToggle || entry.enabled === null) return null;
  if (entry.enabled === input.enabled) return plugins;
  if (input.client === "hermes") {
    if (!nativeName.test(input.name)) return null;
    await runPluginCommand(
      "hermes",
      ["plugins", input.enabled ? "enable" : "disable", input.name],
      path.resolve(getHermesHome()),
      20_000
    );
  } else {
    const file = pluginConfigPath(input.client);
    const source = optionalFile(file);
    if (source === undefined) throw new Error("The plugin preferences changed. Refresh first");
    const edited = patchPluginPreference(
      input.client,
      source,
      input.name,
      entry.enabled,
      input.enabled
    );
    if (optionalFile(file) !== source)
      throw new Error("The plugin preferences changed. Refresh first");
    writePrivateConfigFile(file, edited);
  }
  const updated = await getClientPlugins(input.client);
  if (!updated.some((plugin) => plugin.name === input.name && plugin.enabled === input.enabled)) {
    throw new Error("The selected client did not report the requested plugin state");
  }
  return updated;
}

export function uninstallKimiPlugin(name: string) {
  const file = pluginConfigPath("kimi-code");
  const previous = optionalFile(file);
  if (previous === undefined) throw new Error("Kimi plugin preferences changed");
  const parsed = record.parse(JSON.parse(previous));
  const { plugins } = kimiPlugins.parse(parsed);
  const index = plugins.findIndex(({ id }) => id === name);
  if (index < 0 || plugins.filter(({ id }) => id === name).length !== 1)
    throw new Error("Kimi plugin preferences changed");
  const edited = applyEdits(previous, modify(previous, ["plugins", index], undefined, {}));
  const entries = z.array(record).parse(parsed.plugins);
  const expected = { ...parsed, plugins: entries.filter((_, i) => i !== index) };
  if (!isDeepStrictEqual(JSON.parse(edited), expected) || optionalFile(file) !== previous)
    throw new Error("Could not safely remove the Kimi plugin record");
  writePrivateConfigFile(file, edited);
  const saved = optionalFile(file);
  if (saved !== edited) {
    // A different readback may be a native concurrent update; preserve its contents.
    throw new Error("Could not verify Kimi plugin removal");
  }
}

function patchCodexPreference(source: string, name: string, before: boolean, enabled: boolean) {
  const model = parseToml(source);
  const entries = record.parse(model.plugins);
  const target = record.parse(entries[name]);
  if (target.enabled !== before) throw new Error("The plugin preferences changed. Refresh first");
  const sections = [...source.matchAll(/^[ \t]*(\[[^\r\n]+\])[ \t]*(?:#.*)?\r?$/gm)];
  const selected = sections.findIndex((section) =>
    isDeepStrictEqual(parseToml(section[1]), parseToml(`[plugins.${JSON.stringify(name)}]`))
  );
  if (selected < 0) throw new Error("Unsupported Codex plugin table syntax");
  const start = sections[selected].index;
  const end = sections[selected + 1]?.index ?? source.length;
  const content = source.slice(start, end);
  const edited =
    source.slice(0, start) +
    content.replace(/^([ \t]*enabled[ \t]*=[ \t]*)(true|false)\b/m, `$1${enabled}`) +
    source.slice(end);
  const expected = { ...model, plugins: { ...entries, [name]: { ...target, enabled } } };
  const parsed = parseToml(edited);
  const updated = record.parse(parsed.plugins);
  updated[name] = record.parse(updated[name]);
  if (!isDeepStrictEqual({ ...parsed, plugins: updated }, expected))
    throw new Error("Could not preserve the Codex plugin config");
  return edited;
}

function patchPluginPreference(
  client: Exclude<Client, "hermes">,
  source: string,
  name: string,
  before: boolean,
  enabled: boolean
) {
  const changed = () => new Error("The plugin preferences changed. Refresh first");
  if (client === "codex") return patchCodexPreference(source, name, before, enabled);
  const config = client === "kimi-code" ? record.parse(JSON.parse(source)) : readJsonc(source);
  let field: (string | number)[];
  let expected: Record<string, unknown>;
  if (client === "kimi-code") {
    const entries = z.array(z.record(z.string(), z.unknown())).parse(config.plugins);
    const index = entries.findIndex(({ id }) => id === name);
    if (index < 0 || entries[index].enabled !== before) throw changed();
    field = ["plugins", index, "enabled"];
    expected = {
      ...config,
      plugins: entries.map((entry, i) => (i === index ? { ...entry, enabled } : entry)),
    };
  } else {
    const entries = record.parse(config.enabledPlugins);
    if (entries[name] !== before) throw changed();
    field = ["enabledPlugins", name];
    expected = { ...config, enabledPlugins: { ...entries, [name]: enabled } };
  }
  const edited = applyEdits(
    source,
    modify(source, field, enabled, {
      formattingOptions: {
        insertSpaces: true,
        tabSize: 2,
        eol: source.includes("\r\n") ? "\r\n" : "\n",
      },
    })
  );
  if (!isDeepStrictEqual(client === "kimi-code" ? JSON.parse(edited) : readJsonc(edited), expected))
    throw new Error("Could not preserve the native plugin config");
  return edited;
}
