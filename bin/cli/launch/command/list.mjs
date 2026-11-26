// bin/cli/launch/command/list.mjs: `launch --list` rows and their text table.

import { toLaunchError } from "../core/errors.mjs";
import { displayNameOf } from "./shared.mjs";

/** Every registered adapter, loading lazy ones (registries without `loadAll` are eager). */
async function registryAdapters(registry) {
  if (typeof registry.loadAll === "function") return registry.loadAll();
  return registry.list();
}

function baseRow(registry, adapter) {
  return {
    id: adapter.id,
    displayName: displayNameOf(registry, adapter),
    tier: adapter.capabilities.tier,
    aliases: registry.aliasesOf ? registry.aliasesOf(adapter.id) : [],
    installed: false,
    version: null,
    command: null,
    launchable: false,
    reason: undefined,
  };
}

/** `{ bin }` when the tool resolves, null when it is not installed. */
async function resolveOrNull(adapter, { resolveBinary, platform, env }) {
  try {
    return { bin: await resolveBinary(adapter, { platform, env }) };
  } catch {
    return null;
  }
}

/** Row fields from probing a resolved binary: version + launchable, or the failure reason. */
async function probeFields(adapter, bin, { probeTool, platform, env }) {
  try {
    const probed = await probeTool(adapter, bin, { platform, env });
    return { version: probed.version ?? null, launchable: true };
  } catch (error) {
    return { reason: toLaunchError(error).message };
  }
}

async function toolRow(adapter, ctx) {
  const row = baseRow(ctx.registry, adapter);
  if (!adapter.capabilities.platforms.includes(ctx.platform)) {
    row.reason = `not supported on ${ctx.platform}`;
    return row;
  }
  const resolved = await resolveOrNull(adapter, ctx);
  if (!resolved) {
    row.reason = "not installed";
    return row;
  }
  row.installed = true;
  row.command = resolved.bin.command;
  return Object.assign(row, await probeFields(adapter, resolved.bin, ctx));
}

/** One row per registered tool for `launch --list`. */
export async function listLaunchTools(registry, deps = {}) {
  const platform = deps.platform ?? process.platform;
  const env = deps.env ?? process.env;
  const { resolveBinary, probeTool } = deps.resolveBinary ? deps : await loadResolveBin();
  const ctx = { registry, platform, env, resolveBinary, probeTool };
  const adapters = await registryAdapters(registry);
  const rows = await Promise.all(adapters.map((adapter) => toolRow(adapter, ctx)));
  return rows.map((r) => (r.reason === undefined ? { ...r, reason: null } : r));
}

export function renderList(rows) {
  const head = ["TOOL", "TIER", "INSTALLED", "VERSION", "NOTE"];
  const body = rows.map((r) => [
    r.id,
    r.tier,
    r.installed ? "yes" : "no",
    r.version ?? "-",
    r.launchable ? "" : (r.reason ?? ""),
  ]);
  const widths = head.map((h, i) => Math.max(h.length, ...body.map((row) => row[i].length)));
  const line = (cells) =>
    cells
      .map((c, i) => (i === cells.length - 1 ? c : c.padEnd(widths[i])))
      .join("  ")
      .trimEnd();
  return `${[line(head), ...body.map(line)].join("\n")}\n`;
}

// Lazy loaders stay last: the test loader rewrites dynamic import() in place, which shifts
// the coverage offsets of any code that follows it.

/** Binary resolution is only needed by `--list`. */
function loadResolveBin() {
  return import("../core/resolve-bin.mjs");
}
