import { readdirSync, existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";

const PLUGIN_PREFIX_RE = /^(@[^/]+\/)?omniroute-cmd-/;

function getPluginDirs() {
  const prefix = join(homedir(), ".omniroute", "plugins");
  // `omniroute plugin install` uses `prefix` as an npm --prefix, so packages land in
  // `<prefix>/node_modules` (#21056).
  return [prefix, join(prefix, "node_modules"), process.env.OMNIROUTE_PLUGIN_PATH].filter(Boolean);
}

function isDir(path) {
  try {
    return statSync(path).isDirectory(); // follows symlinks (npm links local installs)
  } catch {
    return false;
  }
}

function listCandidates(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (!isDir(full)) continue;
    if (entry.name.startsWith("@")) {
      try {
        for (const sub of readdirSync(full)) out.push(join(full, sub));
      } catch {
        // ignore unreadable scope dir
      }
    } else {
      out.push(full);
    }
  }
  return out;
}

export async function discoverPlugins() {
  const found = [];
  for (const dir of getPluginDirs()) {
    if (!existsSync(dir)) continue;
    let candidates;
    try {
      candidates = listCandidates(dir);
    } catch {
      continue;
    }
    for (const candidate of candidates) {
      const pkgPath = join(candidate, "package.json");
      if (!existsSync(pkgPath)) continue;
      let pkg;
      try {
        pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      } catch {
        continue;
      }
      if (!pkg.name || !PLUGIN_PREFIX_RE.test(pkg.name)) continue;
      if (found.some((f) => f.name === pkg.name)) continue;
      found.push({
        name: pkg.name,
        version: pkg.version || "0.0.0",
        description: pkg.description || "",
        dir: candidate,
        pkg,
      });
    }
  }
  return found;
}

export function buildPluginContext(opts = {}) {
  return {
    apiFetch: async (...args) => {
      const { apiFetch } = await import("./api.mjs");
      return apiFetch(...args);
    },
    emit: async (...args) => {
      const { emit } = await import("./output.mjs");
      return emit(...args);
    },
    t: async (...args) => {
      const { t } = await import("./i18n.mjs");
      return t(...args);
    },
    withSpinner: async (...args) => {
      const { withSpinner } = await import("./spinner.mjs");
      return withSpinner(...args);
    },
    baseUrl: opts.baseUrl,
    apiKey: opts.apiKey,
  };
}

// Startup entry (#21056): `--version`/`-v` stays fast and never imports plugin code.
export async function loadCliPlugins(program, argv = process.argv, env = process.env) {
  if (argv.slice(2).some((a) => a === "--version" || a === "-v")) return 0;
  return loadPlugins(program, { baseUrl: env.OMNIROUTE_BASE_URL, apiKey: env.OMNIROUTE_API_KEY });
}

export async function loadPlugins(program, ctx = {}) {
  const plugins = await discoverPlugins();
  for (const p of plugins) {
    try {
      const entryPath = join(p.dir, p.pkg.main || "index.mjs");
      if (!existsSync(entryPath)) {
        process.stderr.write(`[plugin] ${p.name}: entry file not found (${entryPath})\n`);
        continue;
      }
      const mod = await import(pathToFileURL(entryPath).href);
      if (typeof mod.register === "function") {
        mod.register(program, buildPluginContext(ctx));
      } else {
        process.stderr.write(`[plugin] ${p.name}: no register() export — skipping\n`);
      }
    } catch (err) {
      process.stderr.write(`[plugin] Failed to load ${p.name}: ${err.message}\n`);
    }
  }
  return plugins.length;
}
